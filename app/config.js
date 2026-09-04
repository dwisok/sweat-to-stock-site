// Sweat-to-Stock — operator settings. Edit this file, commit, push: the app picks it up on next load.
window.S2S_CONFIG = {
  // Where a claim is sent. CLAIM_ENDPOINT (optional): an HTTPS URL that accepts a JSON POST of the claim.
  // If empty, the app opens a pre-filled e-mail to CLAIM_EMAIL (and lets the runner copy the claim as text).
  CLAIM_ENDPOINT: "",
  CLAIM_EMAIL: "dwisok@proton.me",

  // Payout rate. 1 ROAD = ROAD_USD USDG.  100 ROAD per km × quality → 1 clean km = 1 USDG.
  ROAD_USD: 0.01,
  // Smallest claim accepted (in ROAD). Keeps manual payouts manageable while the pool is small.
  MIN_CLAIM_ROAD: 500,
  // Promise shown to runners: time between a claim and the tokens in their wallet.
  PAYOUT_WINDOW: "48 h",

  // Block explorer for transaction hashes (tx hash is appended). Leave empty to show the hash without a link.
  EXPLORER_TX: "",

  // Stocks a runner can claim into (Stock Tokens on Robinhood Chain).
  STOCKS: [
    { tk: "AAPLx",  name: "Apple" },
    { tk: "NVDAx",  name: "Nvidia" },
    { tk: "TSLAx",  name: "Tesla" },
    { tk: "MSFTx",  name: "Microsoft" },
    { tk: "AMZNx",  name: "Amazon" },
    { tk: "GOOGLx", name: "Alphabet" },
    { tk: "METAx",  name: "Meta" },
    { tk: "NFLXx",  name: "Netflix" },
    { tk: "COINx",  name: "Coinbase" },
    { tk: "SPYx",   name: "S&P 500" }
  ],

  // Reward formula and anti-cheat thresholds.
  ROAD_PER_KM: 100,
  MIN_RUN_KM: 0.3,          // shorter runs are discarded
  MIN_RUN_MOVING_S: 120,    // and so are runs with less than 2 minutes of movement
  MAX_ACCURACY_M: 40,       // GPS fixes worse than this are ignored
  MAX_SPEED_MS: 8,          // faster than 28.8 km/h between two fixes = teleport
  PACE_MIN_S: 165,          // 2:45 /km — faster is not human
  PACE_MAX_S: 720,          // 12:00 /km — slower is a stroll, not a run
  CADENCE_MIN: 130,         // steps per minute
  CADENCE_MAX: 220,
  HISTORY_RUNS: 3           // runs needed before the history check kicks in
};
