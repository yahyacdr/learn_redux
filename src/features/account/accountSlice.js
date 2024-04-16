import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// export default function accountReducer(state = initialAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload };
//     case "account/withdrawal":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       // LATER
//       return {
//         ...state,
//         loan: action.payload.loan,
//         loanPurpose: action.payload.loanPurpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     default:
//       return state;
//   }
// }

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "account/deposit", payload: data.rates.USD });
      });
  };
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdrawal(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },
  },
});

export const { withdrawal, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

// export function withdrawal(amount) {
//   return { type: "account/withdrawal", payload: amount };
// }

// export function requestLoan(loan, loanPurpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { loan: loan, loanPurpose: loanPurpose },
//   };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
