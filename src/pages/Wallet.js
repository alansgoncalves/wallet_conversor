import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchResponses, editTask } from '../actions';
import Tabela from '../components/Tabela';
import '../Header.css';

const Alimentacao = 'Alimentação';
let btnName = false;

class Wallet extends Component {
  constructor(props) {
    super(props);

    const { expenses } = this.props;
    this.state = {
      id: expenses.length,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
      exchangeRates: {},
    };
    this.form = this.form.bind(this);
    this.change = this.change.bind(this);
    this.editForm = this.editForm.bind(this);
    this.submitChange = this.submitChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatchFetches } = this.props;
    dispatchFetches();
  }

  change({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  editForm(form) {
    this.setState({
      id: form.id,
      value: form.value,
      description: form.description,
      currency: form.currency,
      method: form.method,
      tag: form.tag,
      exchangeRates: form.exchangeRates,
    });
    btnName = true;
  }

  handleClick() {
    const { expenses, dispatchFetches } = this.props;
    dispatchFetches(this.state);
    this.setState({
      id: expenses.length + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
      exchangeRates: {},
    });
    btnName = false;
  }

  submitChange() {
    const { expenses, dispatchChangeExpense } = this.props;
    dispatchChangeExpense(this.state);
    this.setState({
      id: expenses.length + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
      exchangeRates: {},
    });
    btnName = false;
  }

  form() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value" id="label-task">
          Valor
          <input type="text" value={ value } autoComplete="off" id="value" onChange={ this.change } />
        </label>
        <label htmlFor="currency">
          Moeda
          <select value={ currency } id="currency" onChange={ this.change }>
            {currencies.map((coin, index) => (
              <option key={ index } value={ coin }>
                { coin }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method" className="label-task">
          Método de Pagamento
          <select value={ method } id="method" onChange={ this.change }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select value={ tag } id="tag" onChange={ this.change }>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value={ Alimentacao }>Alimentação</option>
            <option value="Saúde">Saúde</option>
            <option value="Transporte">Transporte</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            value={ description }
            id="description"
            onChange={ this.change }
            autoComplete="off"
          />
        </label>
        { btnName
          ? <button id="btn" type="button" onClick={ this.submitChange }>Corrigir despesa</button>
          : <button id="btn" type="button" onClick={ this.handleClick }>Adicionar despesa</button>}
      </form>
    );
  }

  render() {
    const { email, expenses } = this.props;
    const total$ = expenses.reduce((acc, { exchangeRates, currency, value }) => (
      acc + (Number(exchangeRates[currency].ask) * Number(value))
    ), 0).toFixed(2);
    return (
      <header>
        <div className="tasks1">
        <img id="pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJQojzcGqO6y17GCiXa5T-Zv0V3FXkzUQNdfzWAn1-lTSzBCQV_1mWgxgsRi0k2lQICs&usqp=CAU" alt="" width="40px" height="40px" />
          <p className="parag-email">
            <span data-testid="email-field">
              { email }
            </span>
          </p>
          <p>
            <span className="name-trybe">TRYBEWALLET</span>
          </p>
          <p>
            <span>Despesa Total: </span>
            <span data-testid="total-field"><b>{ total$ || '0' }</b></span>
            <span className="total-expense" data-testid="header-currency-field"> BRL</span>
          </p>
        </div>
        { this.form() }
        <Tabela editForm={ this.editForm } />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  loading: state.wallet.loading,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetches: (state) => dispatch(fetchResponses(state)),
  dispatchChangeExpense: (state) => dispatch(editTask(state)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
  loading: PropTypes.bool,
  dispatchFetches: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
