import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTask } from '../actions';
import '../Header.css';
import Edit2 from '../image/edit2.png';
import Delete from '../image/delete.png';

class Tabela extends Component {
  delete(id) {
    const { dispatchDeleteExpense } = this.props;
    return (
      <img
        src={ Delete }
        alt=""
        data-testid="delete-btn"
        onClick={ () => dispatchDeleteExpense(id) }
        width="27px"
      />
    );
  }

  edit(id) {
    const { expenses, editForm } = this.props;
    return (
      <button
        type="button"
        data-testid="edit-btn"
        onClick={ () => editForm(expenses.find((expense) => expense.id === id)) }
      >
        Editar
      </button>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-table">
        <table className="table-tr">
          <tr id="table-th">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moedas de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <br />
          { expenses.map(({
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates,
          }) => (
            <tr key={ id.toFixed(2) }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ currency }</td>
              <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>
                {
                  (Number(exchangeRates[currency].ask) * Number(value))
                    .toFixed(2)
                }
              </td>
              <td>{ exchangeRates[currency].name }</td>
              <td>
                <img src={ Edit2 } alt="" width="40px" />
                { this.delete(id) }
              </td>
            </tr>
          ))}
        </table>
      </div>
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
