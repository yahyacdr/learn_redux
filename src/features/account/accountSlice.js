const initialAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialAccount, action) {
  switch (action.type) {
    case "action/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "action/withdrawal":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return { ...state, loan: action.payload };
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
