import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignup } from '../actions';
import classnames from 'classnames';

 class Signup extends React.Component {
   state = {
     username : '',
     email : '',
     password : '',
     errors : {},
     successMessage : {},
     usernameError : '',
     emailError: '',
     passwordError : ''

   }
   componentDidMount(){
     if(this.props.auth.isAuthenticated){
       this.props.history.push('/dashboard');
     }
   }
   handleUsername = (e) => {
     this.setState({ username : e.target.value }, () => {this.validateUsername()});
   }
   handleEmail = (e) => {
     this.setState({ email : e.target.value }, () => {this.validateEmail()});
   }
   handlePassword = (e) => {
     this.setState({ password : e.target.value }, () => {this.validatePassword()});
   }
   validateUsername = () => {
     let { username } = this.state;
     let usernameError;
     if(username === ''){
       usernameError = 'Username is required';
     }else if(username.length < 3){
       usernameError = 'username should be atleast 3 characters long.';
     }else if(username.length > 20){
       usernameError = 'Username should be within 20 characters.';
     }
     this.setState({ usernameError });
     return !usernameError;
   }
   validateEmail = () => {
     let { email } = this.state;
     let emailError;
     if(email === ''){
       emailError = 'Email is required'
     }
     this.setState({ emailError });
     return !emailError
   }
   validatePassword = () => {
     let { password } = this.state;
     let passwordError;
     if(password === ''){
       passwordError = 'Password is required';
     }else if(password.length < 6 || password.length > 20){
       passwordError = 'Password must be between 6 to 20 characters';
     }
     this.setState({ passwordError });
     return !passwordError;
   }
   handleSubmit = (e) => {
     e.preventDefault();
     const validUsename = this.validateUsername();
     const validEmail = this.validateEmail();
     const validPassword = this.validatePassword();
     if(validUsename && validEmail && validPassword){
       const userData = {
         username : this.state.username,
         email : this.state.email,
         password : this.state.password
       }
       this.props.userSignup(userData,this.props.history);
     }
  }
   componentWillReceiveProps(nextProps){
     if(nextProps.user.user.success === true){
       this.setState({ successMessage : nextProps.user.user })
     }
     if(nextProps.errors){
       this.setState({ errors : nextProps.errors });
     }
   }
  renderAlert = () => {
    const { errors } = this.state;
    return <div className="alert alert-danger">
              <p className="text-muted text-center">{errors.message}</p>
           </div>
  }
  render() {
    //console.log(this.props.user);
    // console.log(this.state.successMessage);
    // console.log(this.state.errors);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            {this.state.errors.success === false ? this.renderAlert() : null}
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <h3 className="text-center">Signup</h3>
            <form onSubmit={this.handleSubmit}>
              <div className={classnames('form-group',{ 'has-error' : this.state.usernameError})}>
                <input
                   type="text"
                   className="form-control"
                   value={this.state.username}
                   onChange={this.handleUsername}
                   placeholder="username"
                 />
                 <span className="help-block">{this.state.usernameError}</span>
              </div>
              <div className={classnames('form-group',{'has-error' : this.state.emailError})}>
                <input
                   type="text"
                   className="form-control"
                   value={this.state.email}
                   onChange={this.handleEmail}
                   placeholder="Email"
                 />
                 <span className="help-block">{this.state.emailError}</span>
              </div>
              <div className={classnames('form-group',{'has-error' : this.state.passwordError})}>
                <input
                   type="password"
                   className="form-control"
                   value={this.state.password}
                   onChange={this.handlePassword}
                   placeholder="Password"
                 />
                 <span className="help-block">{this.state.passwordError}</span>
              </div>
              <button className="btn btn-success btn-sm">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  userSignup : PropTypes.func.isRequired,
  user : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
  return{
    user : state.user,
    auth : state.auth,
    errors : state.errors
  }
}
export default connect(mapStateToProps, { userSignup })(withRouter(Signup));
