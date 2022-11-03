import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask } from "../actions";
import "../Header.css";
import Edit2 from "../image/edit2.png";
import Delete from "../image/delete.png";

class Tabela extends Component {
  delete(id) {
    const { dispatchDeleteExpense } = this.props;
    return (
      <input
        className="delete-button"
        type="image"
        src={Delete}
        alt=""
        data-testid="delete-btn"
        onClick={() => dispatchDeleteExpense(id)}
        width="27px"
      />
    );
  }

  edit(id) {
    const { expenses, editForm } = this.props;
    return (
      <input
        className="edit-button"
        type="image"
        src={Edit2}
        alt=""
        data-testid="edit-btn"
        onClick={() => editForm(expenses.find((expense) => expense.id === id))}
        width="39px"
        padding="10px"
      />
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-table">
        <tbody className="table-tr">
          <tr id="table-th">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moedas de conversão</th>
            <th>Editar | Excluir</th>
          </tr>
          {expenses.map(
            ({
              id,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates,
            }) => (
              <tr key={id.toFixed(2)}>
                <td aria-label="Descrição">{description}</td>
                <td aria-label="Tag">{tag}</td>
                <td aria-label="Método de pagamento">{method}</td>
                <td aria-label="Valor">{value}</td>
                <td aria-label="Moeda">{currency}</td>
                <td aria-label="Câmbio utilizado">
                  {Number(exchangeRates[currency].ask).toFixed(2)}
                </td>
                <td aria-label="Valor convertido">
                  {(
                    Number(exchangeRates[currency].ask) * Number(value)
                  ).toFixed(2)}
                </td>
                <td aria-label="Moedas de conversão">
                  {exchangeRates[currency].name}
                </td>
                <td aria-label="Editar | Excluir">
                  <div className="icons">
                    {this.edit(id)}
                    {this.delete(id)}
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpense: (id) => dispatch(deleteTask(id)),
});

Tabela.propTypes = {
  expenses: PropTypes.array,
  dispatchDeleteExpense: PropTypes.func,
  editForm: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
