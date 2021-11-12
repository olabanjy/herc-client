import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/loans/";

function loanUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getLoans() {
  return http.get(apiEndpoint);
}

export function getLoan(loanId) {
  return http.get(loanUrl(loanId));
}

export function applyLoan(loan, user) {
  console.log(loan, user);

  const payload = {
    user: user,
    loan: loan,
  };
  return http.post(`${apiEndpoint}applied-loans/`, payload);
}

export function getUserLoans(user) {
  console.log(user);
  return http.get(`${apiEndpoint}user-applied-loans/${user}/`);
}

export function getAppliedLoans() {
  return http.get(`${apiEndpoint}applied-loans/`);
}

export function approveLoan(loan) {
  console.log(loan);
  const payload = {
    approved: true,
  };
  return http.patch(`${apiEndpoint}applied-loan/${loan}/`, payload);
}
