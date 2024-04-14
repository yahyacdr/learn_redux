const initialAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdrawal":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.loanPurpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

export function withdrawal(amount) {
  return { type: "account/withdrawal", payload: amount };
}

export function requestLoan(loan, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: { loan: loan, loanPurpose: loanPurpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
