import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './LandingForm.css'

class LandingForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  };

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = '';
        username.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        id='register-Form'
      >
        <div className='form-div' role='alert'>
          {error && <p className='error'>{error}</p>}
        </div>
        <div className='form-div'>
          <Label htmlFor='registration-username-input' className='hidden'>
            Choose a username<Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            placeholder='username'
            required
          />
        </div>
        <div className='form-div'>
          <Label htmlFor='registration-password-input' className='hidden'>
            Choose a password<Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            placeholder='password'
            required
          />
        </div>
        <footer>
          <Button type='submit' className='registration-button'>
            Sign up
          </Button>
          <br/>
          {' '}
          <Link to='/login'>Already have an account?</Link>
        </footer>
      </form>
    );
  }
}

export default LandingForm;
