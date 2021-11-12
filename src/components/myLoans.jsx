import React, { Component, useState, useEffect } from "react";
import { getUserLoans } from "../services/loanService";
import auth from "../services/authService";

const MyLoans = ({ user }) => {
  let my_loans = [];
  const [user_loans, setLoans] = useState(my_loans);

  useEffect(() => {
    async function getLoans() {
      try {
        const result = await getUserLoans(user.email);
        console.log(result.data);
        setLoans(result.data);
      } catch (ex) {
        console.log(ex);
      }
    }
    getLoans();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th> Status </th>
          </tr>
        </thead>
        <tbody>
          {!user && <div>Login to see ur applied loans </div>}
          {user &&
            user_loans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan.loan_name}</td>
                <td>{loan.loan_price} </td>

                <td>
                  {(loan.approved = loan.approved ? "Approved" : "Pending")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLoans;
