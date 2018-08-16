import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../actions';
import isEmpty from 'lodash/isEmpty';
import Spinner from './Spinner';

 class Dashboard extends React.Component {
   componentDidMount(){
     this.props.getCurrentProfile();
   }
   onDelete = (e) => {
     e.preventDefault();
     this.props.deleteAccount();
   }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if(profile === null || loading){
      dashboardContent = <Spinner />
    }else{
      if(profile.user){
        dashboardContent = (
          <div className="jumbotron">
            <p className="text-center">
              <img src={profile.user.profileImage} alt={profile.user.username} className="img-dashboard"/>
            </p>
            <p className="text-center">
              welcome , <Link to="/profilepage">{ user.username }</Link></p>
            <p className="text-center">
            <Link  to="/editprofile">Edit profile</Link>  |  <Link to="/uploadimage">Upload profile image</Link>
            </p>
            <br />
            <p className="text-center">
              <button onClick={this.onDelete} className="btn btn-danger btn-sm">Delete my account</button>
            </p>
          </div>
        )
      }else{
        //create profile
        dashboardContent = (
          <div className="jumbotron">
            <p className="text-center">
              <img src={user.profileImage} alt={user.username} className="img-dashboard"/>
            </p>
            <p className="text-primary">Welcome, {user.username}</p>
            <p className="text-muted">You dont have a profile   <Link to="/createprofile">Create profile</Link> </p>
          </div>
        )
      }
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="text-center text-muted"><strong>Dashboard</strong></h3>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired,
  getCurrentProfile : PropTypes.func.isRequired,
  deleteAccount : PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth,
    profile : state.profile
  }
}
export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
