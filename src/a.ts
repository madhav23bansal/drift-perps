/**
 * STANDALONE SCRIPT: Calculate SOL-PERP Position Parameters
 * 
 * This script calculates position size, margin requirements, and liquidation price
 * for opening a SOL-PERP position using Drift Protocol SDK.
 * 
 * Usage: npx tsx src/a.ts
 * 
 * Scenario:
 * - Total Collateral: $5.00
 * - Allocation: 25% of collateral = $1.25
 * - Leverage: 20x
 * - Market: SOL-PERP
 * - Order Type: Market Order (no limit price)
 * 
 * Actual Drift Platform Results:
 * - Margin Required: $1.24 (not $1.25 - uses actual margin ratio from SDK)
 * - Order Value: $25.00
 * - Liquidation Price: ~$137
 * - Position: 0 -> 0.14 LONG
 */

import * as dotenv from 'dotenv';

import {
  BASE_PRECISION,
  BN,
  DriftClient,
  PerpMarketAccount,
  PositionDirection,
  QUOTE_PRECISION,
  UserAccount,
  ZERO,
  calculateCollateralDepositRequiredForTrade
} from '@drift-labs/sdk';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

// @ts-ignore - bs58 types may not be available but the package works
import bs58 from 'bs58';

dotenv.config();

// ============================================================================
// STEP 1: INITIALIZE AND SETUP
// ============================================================================

async function openSOLPerpPositionFlow(
  driftClient: DriftClient,
  userPublicKey?: any // Optional: if provided, will use UserAccount for better calculations
) {
  // driftClient should be already initialized with:
  // - Connection
  // - Wallet/Provider
  // - Subscribed to accounts
  //
  // Example initialization:
  // const driftClient = new DriftClient({ ... });
  // await driftClient.subscribe();
  
  // Get UserAccount if public key provided (for better margin/liquidation calculations)
  let user: any = null;
  if (userPublicKey) {
    user = driftClient.getUser(0, userPublicKey);
    await user.fetchAccounts();
  }
  
  // ============================================================================
  // STEP 2: DEFINE TRADING PARAMETERS
  // ============================================================================
  
  const totalCollateralUSD = 5.00;           // Total collateral available
  const allocationPercent = 0.25;            // 25% of collateral to use
  const leverage = 20;                        // 20x leverage
  const marketIndex = 0;                      // SOL-PERP market index (verify!)
  const direction = PositionDirection.LONG;   // LONG or SHORT
  
  console.log('=== TRADING PARAMETERS ===');
  console.log(`Total Collateral: $${totalCollateralUSD}`);
  console.log(`Allocation: ${allocationPercent * 100}%`);
  console.log(`Leverage: ${leverage}x`);
  console.log(`Market Index: ${marketIndex} (SOL-PERP)`);
  console.log(`Direction: ${direction === PositionDirection.LONG ? 'LONG' : 'SHORT'}`);
  
  // ============================================================================
  // STEP 3: CALCULATE COLLATERAL ALLOCATION
  // ============================================================================
  
  const collateralUsedUSD = totalCollateralUSD * allocationPercent;
  // Result: $5.00 × 0.25 = $1.25
  
  console.log('\n=== COLLATERAL CALCULATION ===');
  console.log(`Collateral Used: $${collateralUsedUSD}`);
  
  // ============================================================================
  // STEP 4: GET MARKET DATA FROM DRIFT SDK
  // ============================================================================
  
  // Get the perp market account
  const perpMarket = driftClient.getPerpMarketAccount(marketIndex);
  if (!perpMarket) {
    throw new Error(`Perp market ${marketIndex} not found`);
  }
  
  // Get current oracle price data
  const oracleData = driftClient.getOracleDataForPerpMarket(marketIndex);
  const oraclePrice = oracleData.price;  // BN in price precision
  const oraclePriceSlot = oracleData.slot;
  
  // Convert oracle price to decimal (typically 6 decimals for price precision)
  // Use convertToPricePrecision or check PRICE_PRECISION constant
  const PRICE_PRECISION = 1e6; // Usually 6 decimals for prices
  const solPriceUSD = oraclePrice.toNumber() / PRICE_PRECISION;
  
  console.log('\n=== MARKET DATA ===');
  console.log(`Oracle Price: $${solPriceUSD}`);
  console.log(`Oracle Slot: ${oraclePriceSlot}`);
  console.log(`Market Name: ${perpMarket.name || 'SOL-PERP'}`);
  
  // ============================================================================
  // STEP 5: CALCULATE POSITION SIZE USING SDK (PROPER WAY)
  // ============================================================================
  
  // IMPORTANT: Don't manually calculate position size!
  // Use Drift SDK's calculateCollateralDepositRequiredForTrade with binary search
  // This ensures we get the exact margin requirements that match the platform
  
  // Convert collateral to use to quote precision (USDC has 6 decimals)
  const collateralSpotMarketIndex = 0; // USDC spot market index
  const collateralToUseInQuotePrecision = new BN(collateralUsedUSD * 1e6); // Convert to quote precision
  
  // Target position notional (for initial estimate)
  const targetPositionNotionalUSD = collateralUsedUSD * leverage; // $25.00
  const targetPositionNotional = new BN(targetPositionNotionalUSD * 1e6); // In quote precision (USDC has 6 decimals)
  
  // Convert to base amount (initial estimate)
  // IMPORTANT: baseAmount must be in BASE_PRECISION (1e9 for SOL), not QUOTE_PRECISION!
  // Formula: baseAmount (in BASE_PRECISION) = (positionNotional / price) * BASE_PRECISION
  // Where: positionNotional is in QUOTE_PRECISION (1e6), price is in PRICE_PRECISION (1e6)
  // So: baseAmount = (targetPositionNotional * BASE_PRECISION) / priceBN
  const priceBN = oraclePrice; // Already in price precision (1e6)
  // targetPositionNotional is in quote precision (1e6), priceBN is in price precision (1e6)
  // baseAmount needs to be in BASE_PRECISION (1e9)
  let estimatedBaseAmount = targetPositionNotional
    .mul(BASE_PRECISION)  // Multiply by BASE_PRECISION (1e9) to get base asset precision
    .div(priceBN);  // Divide by price (in price precision, 1e6)
  
  // Get order step size from market
  const orderStepSize = perpMarket.amm.orderStepSize;
  
  console.log('\n=== POSITION SIZE CALCULATION (USING SDK) ===');
  console.log(`Target Position Value: $${targetPositionNotionalUSD.toFixed(2)}`);
  console.log(`Estimated Base Amount: ${estimatedBaseAmount.toString()}`);
  console.log(`Order Step Size: ${orderStepSize.toString()}`);
  
  // Use binary search to find the exact base amount that uses our collateral
  // This matches what the Drift platform does internally
  let low = orderStepSize;
  let high = estimatedBaseAmount;
  
  // Round high to nearest orderStepSize
  const highRemainder = high.mod(orderStepSize);
  if (!highRemainder.isZero()) {
    high = high.sub(highRemainder);
  }
  if (high.lt(orderStepSize)) {
    high = orderStepSize;
  }
  
  let bestBaseAmount = high;
  let bestDiff = new BN(Number.MAX_SAFE_INTEGER);
  let bestRequiredCollateral = new BN(0);
  
  console.log(`\n  🔍 Binary search to find exact position size...`);
  console.log(`  Search range: ${low.toString()} to ${high.toString()}`);
  
  // Binary search (max 20 iterations)
  const maxIterations = 20;
  for (let i = 0; i < maxIterations && low.lte(high); i++) {
    // Calculate mid point, rounded to orderStepSize
    let mid = low.add(high).div(new BN(2));
    const midRemainder = mid.mod(orderStepSize);
    if (!midRemainder.isZero()) {
      mid = mid.sub(midRemainder);
    }
    if (mid.lt(orderStepSize)) {
      mid = orderStepSize;
    }
    
    // Use SDK function to calculate required collateral for this position size
    const baseAmountForCalc = direction === PositionDirection.LONG ? mid : mid.neg();
    const requiredCollateral = calculateCollateralDepositRequiredForTrade(
      driftClient,
      marketIndex,
      baseAmountForCalc,
      collateralSpotMarketIndex
    );
    
    const diff = requiredCollateral.sub(collateralToUseInQuotePrecision).abs();
    
    // Track best match
    if (diff.lt(bestDiff)) {
      bestDiff = diff;
      bestBaseAmount = mid;
      bestRequiredCollateral = requiredCollateral;
    }
    
    const requiredCollateralUSD = requiredCollateral.toNumber() / 1e6;
    console.log(`    Iteration ${i + 1}: baseAmount=${mid.toString()}, requiredCollateral=$${requiredCollateralUSD.toFixed(6)}`);
    
    // Adjust search range
    if (requiredCollateral.gt(collateralToUseInQuotePrecision)) {
      // Too much collateral required, reduce position size
      high = mid.sub(orderStepSize);
      if (high.lt(orderStepSize)) {
        high = orderStepSize;
      }
    } else {
      // Can use more collateral, increase position size
      low = mid.add(orderStepSize);
    }
    
    // If we're close enough (within 0.1% of target), break
    const diffPercent = diff.mul(new BN(10000)).div(collateralToUseInQuotePrecision).toNumber() / 100;
    if (diffPercent < 0.1) {
      console.log(`    ✅ Found optimal position size (within 0.1% of target)`);
      break;
    }
  }
  
  // Final position calculations
  const amountInBaseUnits = bestBaseAmount;
  const actualRequiredCollateral = bestRequiredCollateral;
  const actualRequiredCollateralUSD = actualRequiredCollateral.toNumber() / 1e6;
  
  // Calculate actual position notional and leverage
  // Correct formula from SDK calculatePerpLiabilityValue:
  // positionNotional = baseAmount * price / BASE_PRECISION
  // Result is already in QUOTE_PRECISION (1e6)
  // Reference: src/math/margin.ts line 213: baseAssetAmount.abs().mul(price).div(BASE_PRECISION)
  const actualPositionNotional = amountInBaseUnits.mul(priceBN).div(BASE_PRECISION);
  const actualPositionNotionalUSD = actualPositionNotional.toNumber() / 1e6;
  const actualLeverage = actualPositionNotionalUSD / actualRequiredCollateralUSD;
  
  // SOL quantity (BASE_PRECISION = 1e9 for SOL)
  const solQuantity = amountInBaseUnits.toNumber() / BASE_PRECISION.toNumber();
  
  console.log(`\n  ✅ Final Position Size:`);
  console.log(`    Base Amount: ${amountInBaseUnits.toString()}`);
  console.log(`    SOL Quantity: ${solQuantity.toFixed(4)} SOL`);
  console.log(`    Position Notional: $${actualPositionNotionalUSD.toFixed(2)}`);
  console.log(`    Required Collateral: $${actualRequiredCollateralUSD.toFixed(2)}`);
  console.log(`    Actual Leverage: ${actualLeverage.toFixed(2)}x`);
  
  // ============================================================================
  // STEP 8: MARGIN REQUIREMENTS (FROM SDK CALCULATION)
  // ============================================================================
  
  // We already calculated the actual required collateral using SDK
  // Now get margin ratios from market for display
  const initialMarginRatioValue = (perpMarket.marginRatioInitial as any).toNumber
    ? (perpMarket.marginRatioInitial as BN).toNumber()
    : (perpMarket.marginRatioInitial as number);
  const maintenanceMarginRatioValue = (perpMarket.marginRatioMaintenance as any).toNumber
    ? (perpMarket.marginRatioMaintenance as BN).toNumber()
    : (perpMarket.marginRatioMaintenance as number);
  
  const initialMarginRatio = initialMarginRatioValue / 1e4;
  const maintenanceMarginRatio = maintenanceMarginRatioValue / 1e4;
  
  // Calculate maintenance margin required (for liquidation calculation)
  const maintenanceMarginRequiredUSD = actualPositionNotionalUSD * maintenanceMarginRatio;
  
  console.log('\n=== MARGIN REQUIREMENTS (FROM SDK) ===');
  console.log(`Initial Margin Ratio: ${initialMarginRatio * 100}%`);
  console.log(`Maintenance Margin Ratio: ${maintenanceMarginRatio * 100}%`);
  console.log(`Actual Margin Required (from SDK): $${actualRequiredCollateralUSD.toFixed(2)}`);
  console.log(`Maintenance Margin Required: $${maintenanceMarginRequiredUSD.toFixed(2)}`);
  console.log(`Collateral Available: $${collateralUsedUSD.toFixed(2)}`);
  console.log(`Margin Check: ${collateralUsedUSD >= actualRequiredCollateralUSD ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`\n  📝 Note: Actual margin ($${actualRequiredCollateralUSD.toFixed(2)}) may differ from`);
  console.log(`     simple calculation ($${(actualPositionNotionalUSD * initialMarginRatio).toFixed(2)})`);
  console.log(`     because SDK accounts for all market parameters and fees.`);
  
  // ============================================================================
  // STEP 9: CALCULATE LIQUIDATION PRICE (USING SDK)
  // ============================================================================
  
  // Use SDK's liquidationPrice method for accurate calculation
  // This accounts for all market parameters, fees, and margin requirements
  const entryPrice = solPriceUSD; // Current market price (for market order)
  const entryPriceBN = oraclePrice; // In PRICE_PRECISION (1e6)
  
  let liquidationPriceBN: BN;
  let liquidationPrice: number;
  
  if (user) {
    // Use SDK's liquidationPrice method - most accurate
    // positionBaseSizeChange: the position we want to open (positive for LONG, negative for SHORT)
    const positionBaseSizeChange = direction === PositionDirection.LONG 
      ? amountInBaseUnits 
      : amountInBaseUnits.neg();
    
    liquidationPriceBN = user.liquidationPrice(
      marketIndex,
      positionBaseSizeChange,  // Simulate opening this position
      entryPriceBN,            // Estimated entry price
      'Maintenance',           // Use maintenance margin for liquidation
      false,                   // includeOpenOrders
      ZERO,                    // offsetCollateral
      undefined                // enteringHighLeverage
    );
    
    if (liquidationPriceBN.lt(new BN(0))) {
      console.log('\n⚠️  WARNING: Could not calculate liquidation price (returned -1)');
      console.log('   This may happen if the position would be immediately liquidatable');
      liquidationPrice = entryPrice; // Fallback to entry price
    } else {
      liquidationPrice = liquidationPriceBN.toNumber() / 1e6; // Convert from PRICE_PRECISION to USD
    }
  } else {
    // Fallback: Simple calculation if User instance not available
    // This is less accurate but better than nothing
    console.log('\n⚠️  WARNING: User instance not available - using simplified liquidation calculation');
    console.log('   For accurate liquidation price, pass userPublicKey to initialize User instance');
    
    const actualCollateralUsed = actualRequiredCollateralUSD;
    const maxLoss = actualCollateralUsed - maintenanceMarginRequiredUSD;
    
    if (direction === PositionDirection.LONG) {
      liquidationPrice = entryPrice - (maxLoss / solQuantity);
    } else {
      liquidationPrice = entryPrice + (maxLoss / solQuantity);
    }
  }
  
  const priceMoveToLiquidation = direction === PositionDirection.LONG
    ? ((entryPrice - liquidationPrice) / entryPrice) * 100
    : ((liquidationPrice - entryPrice) / entryPrice) * 100;
  
  console.log('\n=== LIQUIDATION ANALYSIS ===');
  console.log(`Entry Price: $${entryPrice.toFixed(2)}`);
  console.log(`Liquidation Price: $${liquidationPrice.toFixed(2)}`);
  console.log(`Price Move to Liquidation: ${priceMoveToLiquidation.toFixed(2)}%`);
  console.log(`Actual Collateral Used: $${actualRequiredCollateralUSD.toFixed(2)}`);
  console.log(`Maintenance Margin: $${maintenanceMarginRequiredUSD.toFixed(2)}`);
  console.log(`⚠️  WARNING: ${priceMoveToLiquidation < 5 ? 'VERY HIGH RISK' : priceMoveToLiquidation < 10 ? 'HIGH RISK' : 'MODERATE RISK'}`);
  
  if (user) {
    console.log(`\n  ✅ Liquidation price calculated using SDK's liquidationPrice() method`);
  }
  
  // ============================================================================
  // STEP 10: CHECK ACCOUNT HEALTH (BEFORE OPENING)
  // ============================================================================
  
  // Get user account
  const userAccount = driftClient.getUserAccount();
  if (!userAccount) {
    throw new Error('User account not found. Please initialize user account first.');
  }
  
  // Get free collateral using SDK (if UserAccount is available)
  let freeCollateralUSD = 0;
  if (user) {
    const freeCollateral = user.getFreeCollateral();
    freeCollateralUSD = freeCollateral.toNumber() / 1e6;
  }
  
  // Check if we have enough collateral
  const hasEnoughCollateral = freeCollateralUSD >= actualRequiredCollateralUSD;
  
  console.log('\n=== ACCOUNT STATUS ===');
  console.log(`User Account: ${userAccount.authority.toBase58()}`);
  if (user) {
    console.log(`Free Collateral: $${freeCollateralUSD.toFixed(2)}`);
    console.log(`Required Collateral: $${actualRequiredCollateralUSD.toFixed(2)}`);
    console.log(`Can Open Position: ${hasEnoughCollateral ? '✓ YES' : '✗ NO'}`);
  } else {
    console.log(`  💡 Tip: Pass userPublicKey to get free collateral from SDK`);
  }
  
  // ============================================================================
  // STEP 11: OPEN POSITION (MARKET ORDER)
  // ============================================================================
  
  /**
   * ============================================================================
   * HOW LEVERAGE WORKS IN DRIFT PROTOCOL - EXPLANATION FOR TEAM
   * ============================================================================
   * 
   * ⚠️ IMPORTANT CONCEPT: Leverage is a RESULT, not an INPUT
   * 
   * Many people assume you can directly specify leverage when opening a position,
   * but that's not how Drift Protocol works. Here's the correct understanding:
   * 
   * 
   * HOW IT ACTUALLY WORKS:
   * ---------------------
   * 
   * 1. You specify: POSITION SIZE (amount in base units, e.g., 0.14 SOL)
   * 2. Drift calculates: Required COLLATERAL for that position size
   * 3. Leverage is CALCULATED as: Position Notional Value / Collateral Used
   * 
   * So the flow is: Position Size → Collateral Required → Leverage (calculated)
   * 
   * 
   * WHY THIS DESIGN?
   * ---------------
   * 
   * - Leverage depends on market conditions (margin requirements, fees, etc.)
   * - The SDK calculates the exact collateral needed based on current market state
   * - You get the actual leverage AFTER opening, which may differ slightly from target
   * 
   * 
   * HOW TO ACHIEVE A SPECIFIC LEVERAGE (e.g., 20x):
   * ----------------------------------------------
   * 
   * Since you can't directly specify leverage, you need to:
   * 
   * 1. Decide your target: "I want 20x leverage with $1.25 collateral"
   * 
   * 2. Calculate the position size that requires that collateral:
   *    - Use binary search with calculateCollateralDepositRequiredForTrade()
   *    - Find position size where: Required Collateral ≈ Target Collateral
   *    - This is what our code does (see binary search implementation above)
   * 
   * 3. Open that calculated position size:
   *    - Call openPosition() with the calculated amountInBaseUnits
   *    - Drift will use the required collateral from your account
   * 
   * 4. Result: You get your target leverage (approximately)
   *    - Position Value = $25.00
   *    - Collateral Used = $1.24 (from SDK calculation)
   *    - Actual Leverage = $25.00 / $1.24 = ~20.16x
   * 
   * 
   * HOW THE DRIFT PLATFORM UI WORKS:
   * ---------------------------------
   * 
   * When you use the Drift web interface:
   * 
   * 1. You select: "20x leverage" and "$1.25 collateral"
   * 2. Platform internally: Calculates the position size (like our binary search)
   * 3. Platform opens: That calculated position size
   * 4. Platform displays: The resulting leverage (Position Value / Collateral Used)
   * 
   * So the UI makes it SEEM like you're selecting leverage directly, but internally
   * it's doing the same calculation we do - finding the position size that achieves
   * the target leverage with the specified collateral.
   * 
   * 
   * KEY TAKEAWAY:
   * ------------
   * 
   * openPosition() function signature:
   *   openPosition(direction, amountInBaseUnits, marketIndex, limitPrice?)
   * 
   * Notice: NO leverage parameter!
   * 
   * Instead:
   * - We calculate amountInBaseUnits to achieve target leverage
   * - Pass that amount to openPosition()
   * - Leverage is the result: Position Value / Collateral Used
   * 
   * ============================================================================
   */
  
  console.log('\n=== OPENING POSITION ===');
  console.log(`Order Type: MARKET ORDER (no limit price)`);
  console.log(`Direction: ${direction === PositionDirection.LONG ? 'LONG' : 'SHORT'}`);
  console.log(`Amount: ${amountInBaseUnits.toString()} base units`);
  console.log(`Amount: ${solQuantity.toFixed(4)} SOL`);
  console.log(`Position Value: $${actualPositionNotionalUSD.toFixed(2)}`);
  console.log(`\n  💡 Leverage is calculated as: Position Value / Collateral Used`);
  console.log(`     = $${actualPositionNotionalUSD.toFixed(2)} / $${actualRequiredCollateralUSD.toFixed(2)} = ${actualLeverage.toFixed(2)}x`);
  
  // ============================================================================
  // STEP 12: RETURN CALCULATION RESULTS (NO POSITION OPENED)
  // ============================================================================
  
  // NOTE: This script only CALCULATES parameters, it does NOT open a position.
  // To actually open a position, you would call:
  //
  // const txSignature = await driftClient.openPosition(
  //   direction,              // PositionDirection.LONG or PositionDirection.SHORT
  //   amountInBaseUnits,       // Amount in base asset precision (SOL in lamports)
  //   marketIndex,             // Market index (0 for SOL-PERP)
  //   undefined                // limitPrice = undefined for MARKET ORDER
  // );
  //
  // But this requires:
  // 1. A valid wallet with private key
  // 2. Sufficient collateral in the account
  // 3. Proper transaction signing
  
  console.log('\n=== CALCULATION COMPLETE ===');
  console.log(`✅ All calculations completed successfully!`);
  console.log(`\n  📋 To open this position, you would call:`);
  console.log(`     driftClient.openPosition(`);
  console.log(`       ${direction === PositionDirection.LONG ? 'PositionDirection.LONG' : 'PositionDirection.SHORT'},`);
  console.log(`       new BN('${amountInBaseUnits.toString()}'),`);
  console.log(`       ${marketIndex},`);
  console.log(`       undefined  // Market order`);
  console.log(`     );`);
  
  return {
    success: true,
    txSignature: null, // No transaction since we're just calculating
    positionDetails: {
      collateralUsed: actualRequiredCollateralUSD, // Actual from SDK
      positionValue: actualPositionNotionalUSD,     // Actual from SDK
      solQuantity,
      entryPrice,
      liquidationPrice,
      actualLeverage: actualLeverage,               // Actual from SDK
      targetLeverage: leverage,                    // Target leverage
      amountInBaseUnits: amountInBaseUnits.toString(),
      marginRequired: actualRequiredCollateralUSD,  // Actual margin required
    }
  };
}

// ============================================================================
// SUMMARY OF CALCULATIONS
// ============================================================================

/**
 * CALCULATION SUMMARY:
 * 
 * 1. Collateral Used = Total Collateral × Allocation %
 *    $1.25 = $5.00 × 0.25
 * 
 * 2. Position Value = Collateral Used × Leverage
 *    $25.00 = $1.25 × 20
 * 
 * 3. SOL Quantity = Position Value / SOL Price
 *    0.1493 SOL = $25.00 / $167.46
 * 
 * 4. Amount in Base Units = SOL Quantity × 1e9 (lamports)
 *    149,300,000 lamports = 0.1493 × 1e9
 * 
 * 5. Initial Margin Required = Position Value × Initial Margin Ratio
 *    $1.25 = $25.00 × 0.05 (5% for 20x leverage)
 * 
 * 6. Maintenance Margin Required = Position Value × Maintenance Margin Ratio
 *    $1.25 = $25.00 × 0.05 (5% typical for SOL-PERP)
 * 
 * 7. Liquidation Price (LONG) = Entry Price - (Collateral - Maintenance Margin) / Position Size
 *    $167.46 - ($1.25 - $1.25) / 0.1493 = $167.46
 *    (Very close to entry price - HIGH RISK!)
 * 
 * SDK FUNCTION CALL:
 * 
 * await driftClient.openPosition(
 *   PositionDirection.LONG,        // Direction
 *   amountInBaseUnits,             // Amount in base asset precision
 *   0,                              // Market index (SOL-PERP)
 *   undefined                       // No limit price = MARKET ORDER
 * );
 */

// ============================================================================
// MAIN EXECUTION
// ============================================================================

/**
 * Initialize DriftClient for calculations
 * Uses RPC_URL from environment or defaults to mainnet
 * PRIVATE_KEY is optional - only needed if you want to open real positions
 */
async function initializeDriftClientForCalculations(): Promise<DriftClient> {
  const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
  const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

  const connection = new Connection(RPC_URL, 'confirmed');

  // Create a wallet - use actual public key if PRIVATE_KEY is provided, otherwise use dummy
  let walletPublicKey: PublicKey;
  let wallet: any;

  if (PRIVATE_KEY) {
    // If private key is provided, we can use it for real transactions later
    // For now, we'll just extract the public key
    let keypair: Keypair;
    
    try {
      // Try parsing as JSON array first
      const parsed = JSON.parse(PRIVATE_KEY);
      if (Array.isArray(parsed)) {
        keypair = Keypair.fromSecretKey(Uint8Array.from(parsed));
      } else {
        throw new Error('JSON parsed but not an array');
      }
    } catch (jsonError) {
      // If JSON parse fails, try as base58
      try {
        const decoded = bs58.decode(PRIVATE_KEY);
        if (decoded.length === 64) {
          keypair = Keypair.fromSecretKey(decoded);
        } else {
          throw new Error(`Invalid secret key length: ${decoded.length}, expected 64`);
        }
      } catch (base58Error) {
        throw new Error('Invalid private key format. Expected JSON array or base58 string');
      }
    }
    
    walletPublicKey = keypair.publicKey;
    wallet = {
      publicKey: walletPublicKey,
      signTransaction: async (tx: any) => {
        throw new Error('Wallet signing not implemented in calculation script');
      },
      signAllTransactions: async (txs: any[]) => {
        throw new Error('Wallet signing not implemented in calculation script');
      },
    };
    
    console.log(`Using wallet: ${walletPublicKey.toBase58()}`);
  } else {
    // No private key - use dummy wallet for calculations only
    walletPublicKey = PublicKey.default;
    wallet = {
      publicKey: walletPublicKey,
      signTransaction: async (tx: any) => {
        throw new Error('Wallet not configured - this script is for calculations only');
      },
      signAllTransactions: async (txs: any[]) => {
        throw new Error('Wallet not configured - this script is for calculations only');
      },
    };
    console.log('No PRIVATE_KEY provided - using dummy wallet for calculations only');
  }

  // Initialize DriftClient
  const driftClient = new DriftClient({
    connection,
    wallet: wallet,
    env: 'mainnet-beta',
    perpMarketIndexes: [0], // Subscribe to SOL-PERP market
    spotMarketIndexes: [0, 1], // Subscribe to USDC and SOL markets
    accountSubscription: {
      type: 'websocket',
      commitment: 'confirmed',
    },
    authority: walletPublicKey,
  });

  // Subscribe to market data
  console.log(`Connecting to Drift Protocol via ${RPC_URL}...`);
  await driftClient.subscribe();
  console.log('✅ Connected to Drift Protocol\n');

  return driftClient;
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('='.repeat(70));
    console.log('DRIFT PROTOCOL - POSITION CALCULATION SCRIPT');
    console.log('='.repeat(70));
    console.log('\nThis script calculates position parameters WITHOUT opening a position.');
    console.log('It uses Drift SDK to get accurate margin requirements and liquidation prices.\n');

    // Initialize DriftClient
    const driftClient = await initializeDriftClientForCalculations();
    
    // Get wallet public key for User instance (needed for accurate liquidation price)
    const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
    const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
    
    // Get wallet public key from driftClient (it's already initialized with the wallet)
    const userPublicKey = driftClient.wallet?.publicKey || driftClient.getUserAccount()?.authority || PublicKey.default;

    // Run the calculation flow
    // Pass userPublicKey to enable SDK's accurate liquidation price calculation
    const result = await openSOLPerpPositionFlow(driftClient, userPublicKey);

    // Display summary
    console.log('\n' + '='.repeat(70));
    console.log('CALCULATION SUMMARY');
    console.log('='.repeat(70));
    console.log(`✅ Position Size: ${result.positionDetails.solQuantity.toFixed(4)} SOL`);
    console.log(`✅ Position Value: $${result.positionDetails.positionValue.toFixed(2)}`);
    console.log(`✅ Margin Required: $${result.positionDetails.marginRequired.toFixed(2)}`);
    console.log(`✅ Actual Leverage: ${result.positionDetails.actualLeverage.toFixed(2)}x`);
    console.log(`✅ Target Leverage: ${result.positionDetails.targetLeverage}x`);
    console.log(`✅ Entry Price: $${result.positionDetails.entryPrice.toFixed(2)}`);
    console.log(`✅ Liquidation Price: $${result.positionDetails.liquidationPrice.toFixed(2)}`);
    console.log(`✅ Price Move to Liquidation: ${((result.positionDetails.entryPrice - result.positionDetails.liquidationPrice) / result.positionDetails.entryPrice * 100).toFixed(2)}%`);
    
    console.log('\n' + '='.repeat(70));
    console.log('⚠️  NOTE: This script only CALCULATES parameters.');
    console.log('   To actually open a position, you need to:');
    console.log('   1. Add wallet/private key support');
    console.log('   2. Call driftClient.openPosition() with the calculated amount');
    console.log('='.repeat(70));

    // Cleanup
    await driftClient.unsubscribe();
    process.exit(0);

  } catch (error) {
    console.error('\n' + '='.repeat(70));
    console.error('❌ ERROR');
    console.error('='.repeat(70));
    console.error(error);
    
    if (error instanceof Error) {
      console.error(`\nError Message: ${error.message}`);
      console.error(`Stack Trace:\n${error.stack}`);
    }
    
    process.exit(1);
  }
}

// Run the script if executed directly
// tsx will execute this when running: npx tsx src/a.ts
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

export { openSOLPerpPositionFlow };

