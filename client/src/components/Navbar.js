import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, clearCurrentProfile, getCurrentProfile } from '../actions';

 class Navbar extends React.Component {
   componentDidMount(){
     this.props.getCurrentProfile();
   }
   onLogout = () => {
     this.props.clearCurrentProfile();
     this.props.logoutUser();
   }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;
    console.log(profile);
    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/profilepage"><img src={profile.user ? profile.user.profileImage : null} alt={user.username} className="navbar-image"/>
            {user.username}
          </Link>
        </li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><a className="logout" onClick={this.onLogout}>Logout</a></li>
      </ul>
    );
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/signin">Signin</Link></li>
      </ul>
    )
    return (
      <nav className="navbar navbar-default">
         <div className="container">
           <div className="navbar-header">
             <Link to="/" className="navbar-brand">MERN AUTH</Link>
           </div>
           {isAuthenticated ? userLinks : guestLinks }
         </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  auth : PropTypes.object.isRequired,
  logoutUser : PropTypes.func.isRequired,
  getCurrentProfile : PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth,
    profile : state.profile
  }
}
export default connect(mapStateToProps,{ logoutUser, clearCurrentProfile, getCurrentProfile })(Navbar);
