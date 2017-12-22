import React from 'react';
import * as authService from '../../services/authService';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      form: {
        name: '',
        email: '',
        password: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let form = {...this.state.form};
    form[event.target.name] = event.target.value;

    return this.setState({form});
  }

  handleSubmit(event) {
    event.preventDefault();
    authService.register(this.state.form).then(response => {
      this.setState({
        form: {
          name: '',
          email: '',
          password: ''
        }
      });
    }).catch(error => error);
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <div className="box">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input value={this.state.form.name} className="input" type="text"
                             placeholder="Name" name="name"
                             onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input value={this.state.form.email} className="input" type="text"
                             placeholder="Email" name="email"
                             onChange={this.handleChange}/>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input value={this.state.form.password} className="input" type="password"
                             placeholder="Password" name="password"
                             onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-link">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
