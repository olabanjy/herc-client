import React, { Component } from "react";
import { getLoans, applyLoan } from "../services/loanService";
import { toast } from "react-toastify";

class Loans extends React.Component {
  state = {
    loans: [],
  };

  async componentDidMount() {
    const { data } = await getLoans();
    const loans = [...data];

    this.setState({ loans });
  }

  handleApply = async (loan, user) => {
    try {
      await applyLoan(loan.id, user);
      toast(`${user} just applied for ${loan.name}`);
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 404)
        toast.error("There was a problem applying for loan");
    }
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        {/* <LoansTable loans={this.state.loans} onApply={this.handleApply} /> */}
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
              <tr key={loan.id}>
                <td>{loan.name}</td>
                <td>{loan.price}</td>

                <td>
                  {user && (
                    <button
                      onClick={() => this.handleApply(loan, user.email)}
                      className="btn btn-primary btn-sm"
                    >
                      Apply
                    </button>
                  )}
                  {!user && (
                    <button className="btn btn-primary btn-sm">
                      Login to Apply
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

export default Loans;
