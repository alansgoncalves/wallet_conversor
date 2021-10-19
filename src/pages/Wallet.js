import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchResponses } from '../actions';
import Tabela from '../components/Tabela';
import '../Header.css';

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
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.form = this.form.bind(this);
    this.change = this.change.bind(this);
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

  handleClick() {
    const { expenses, dispatchFetches } = this.props;
    dispatchFetches(this.state);
    this.setState({
      id: expenses.length + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
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
            <option value="Alimentação">Alimentação</option>
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
        <button id="btn" type="button" onClick={ this.handleClick }>Adicionar despesa</button>
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
          <img id="pic" src="https://lh3.googleusercontent.com/ogw/ADea4I4ptWQMWyPYpekWXyjK7UJZKOGlQRAQFstROsvkqg=s64-c-mo" alt="" width="50px" />
          <p className="parag-email">
            <span data-testid="email-field">
              { email }
            </span>
          </p>
          <p>
            <sapan className="name-trybe">TRYBEWALLET</sapan>
          </p>
          <p>
            <span>Despesa Total: </span>
            <span data-testid="total-field"><b>{ total$ || '0' }</b></span>
            <span className="total-expense" data-testid="header-currency-field"> BRL</span>
          </p>
        </div>
        { this.form() }
        <Tabela />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  loading: state.wallet.loading,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetches: (state) => dispatch(fetchResponses(state)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
  loading: PropTypes.bool,
  dispatchFetches: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
