import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { userSignin } from '../actions';

 class Signin extends React.Component {
  state = {
    username : '',
    password : '',
    usernameError : '',
    passwordError : '',
    errors : {}
  }
  handleUsername = (e) => {
    this.setState({ username : e.target.value }, () => {this.validateUsername()});
  }
  handlePassword = (e) => {
    this.setState({ password : e.target.value }, () => {this.validatePassword() });
  }
  validateUsername = () => {
    const { username } = this.state;
    let usernameError;
    if(username === ''){
      usernameError = 'Username is required';
    }
    this.setState({ usernameError });
    return !usernameError;
  }
  validatePassword = () => {
    const { password } = this.state;
    let passwordError;
    if(password === ''){
      passwordError = 'Password is required';
    }
    this.setState({ passwordError });
    return !passwordError;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const validUsername = this.validateUsername();
    const validPassword = this.validatePassword();
    if(validUsername && validPassword){
      const userData = {
         username : this.state.username,
         password : this.state.password
      }
      this.props.userSignin(userData,this.props.history);
    }
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps){
     if(nextProps.auth.isAuthenticated === true){
        this.props.history.push('/dashboard');
     }
     if(nextProps.errors){
       this.setState({ errors : nextProps.errors })
     }
  }
  render() {
    return (
      <div className="container">
         <div className="row">
           <div className="col-sm-4 col-sm-offset-4">
             {
                this.state.errors.success === false ? <p className="text-danger text-center">{this.state.errors.message}</p> : null
             }
           </div>
           <div className="col-sm-4 col-sm-offset-4">
             <h3 className='text-center'>Login</h3>
             <form onSubmit={this.handleSubmit}>
               <div className={classnames('form-group',{'has-error' : this.state.usernameError})}>
                 <input
                   type="text"
                   className="form-control"
                   value={this.state.username}
                   onChange={this.handleUsername}
                   placeholder="Username"
                 />
                 <span className="help-block">{this.state.usernameError}</span>
               </div>
               <div className={classnames('form-group',{'has-error': this.state.passwordError})}>
                 <input
                   type="password"
                   className="form-control"
                   value={this.state.password}
                   onChange={this.handlePassword}
                   placeholder="Password"
                 />
                 <span className="help-block">{this.state.passwordError}</span>
               </div>
               <button className="btn btn-success btn-sm">Login</button>
             </form>
           </div>
         </div>
      </div>
    );
  }
}
Signin.propTypes = {
  auth : PropTypes.object.isRequired,
  userSignin : PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth,
    errors : state.errors
  }
}
export default connect(mapStateToProps, { userSignin })(withRouter(Signin));
