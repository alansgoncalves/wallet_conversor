import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userData } from '../actions';
import '../App.css';
import Wallet from '../image/wallet.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentDidUpdate() {
    this.handleValidate();
  }

  handleValidate() {
    const { email, password, disabled } = this.state;
    const number = 6;
    const checkEmail = email.split('').includes('@') && email.split('.').includes('com');
    const checkPassword = password.length >= number;
    if (checkEmail && checkPassword && disabled) {
      this.setState({ disabled: false });
    } else if ((!checkEmail || !checkPassword) && !disabled) {
      this.setState({ disabled: true });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { dispatchEmail } = this.props;
    return (
      <div className="container">
        <div className="brand-logo">
          <img src={ Wallet } alt="" width="100px" />
        </div>
        <div className="brand-title">
          TRYBEWALLET
        </div>
        <div className="inputs">
          <p className="email-text">EMAIL</p>
          <label htmlFor="email">
            <input
              className="input-login1"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
              placeholder="example@test.com"
              TextField
              style={ { border: 'none' } }
              autoComplete="off"
            />
          </label>
          <br />
          <label htmlFor="password">
            <p className="password-text">SENHA</p>
            <input
              className="input-login2"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
              placeholder="Min 6 charaters long"
              TextField
              style={ { border: 'none' } }
              autoComplete="off"
            />
          </label>
        </div>
        <Link to="/carteira">
          <button
            className="btn-login"
            type="button"
            disabled={ disabled }
            onClick={ () => dispatchEmail(email) }
          >
            Entrar
          </button>
        </Link>
        <p className="link">
          Forgot password?
          <a href="#paracadastro"> or Sign up</a>
        </p>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(userData(email)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
