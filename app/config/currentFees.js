const CurrentFees = {
  stashAway: {
    first25k: 0.008,
    next25k: 0.007,
    next50k: 0.006,
    next150k: 0.005,
    next250k: 0.004,
    next500k: 0.003,
    above1m: 0.002
  },
  traditionalAdvisors: {
    initialFee: 0.05,
    annualFee: 0.02
  }
}

module.exports = CurrentFees;
