import React, { Component } from "react";
import {
  getLoans,
  applyLoan,
  getAppliedLoans,
  approveLoan,
} from "../services/loanService";
import { toast } from "react-toastify";

class AppliedLoans extends React.Component {
  state = {
    loans: [],
  };

  async componentDidMount() {
    const { data } = await getAppliedLoans();
    const loans = [...data];

    this.setState({ loans });
  }

  handleApprove = async (loan) => {
    try {
      await approveLoan(loan);
      //   await applyLoan(loan);
      toast("loan approved");
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 404)
        toast.error("There was a problem approving this loan");
    }
  };

  render() {
    const { user } = this.props;
    console.log(user);
    if (!user.is_moderator) {
      return <div> Only a Moderator can approve loan </div>;
    } else {
      return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.loans.map((loan) => (
                <tr key={loan._id}>
                  <td>{loan.loan_name}</td>
                  <td>{loan.loan_price}</td>

                  <td>
                    {loan.approved && (
                      <button disabled className="btn btn-secondary btn-sm">
                        Already Approved
                      </button>
                    )}
                    {!loan.approved && user && user.is_moderator && (
                      <button
                        onClick={() => this.handleApprove(loan._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Approve
                      </button>
                    )}
                    {!user && !user.is_moderator && (
                      <button disabled className="btn btn-primary btn-sm">
                        Dont Touch
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default AppliedLoans;
