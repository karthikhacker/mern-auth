import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions';
import isEmpty from 'lodash/isEmpty';
import Spinner from  './Spinner';

 class ProfilePage extends React.Component {
   componentDidMount(){
     this.props.getCurrentProfile();
   }
  render() {
    //console.log(this.props.profile.profile.skills);
    const { profile, loading } = this.props.profile;
    const skills = profile.skills ? profile.skills.map((skill,index) => (
      <label className="label label-info" key={index}>{skill}</label>
    ))
    : null
    let profileContent;
    if(profile === null || loading){
      profileContent = <Spinner />
    }else{
       if(profile.user){
         profileContent = (
           <div className="profile-page">
             <p className="text-center">
               <img src={profile.user.profileImage} alt={profile.user.username} className="profileImage"/>
             </p>
             <p className="text-center text-muted">{profile.fullname}, {profile.location}</p>
             {skills ? <p className="text-center text-muted "><em>Skills</em> {skills}</p> : null}
             {profile.status ? <p className="text-center"><em className="text-muted">Status</em>  <em className="text-primary">{profile.status}</em></p> : null}
             {profile.website ? <p className="text-center"><em className="text-muted">Website</em> <em className="text-primary">{profile.website}</em></p> : null}
           </div>
         )
       }else{
         profileContent = (
           <div className="page-header">
             <h3 className="text-center">oops! it seem's you dont have a  profile</h3>
             <p className="text-center"><Link to="/createprofile">create one</Link></p>
           </div>
         )
       }
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {profileContent}
          </div>
        </div>
      </div>
    );
  }
}
ProfilePage.propTypes = {
  profile : PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
  return{
    profile : state.profile
  }
}
export default connect(mapStateToProps,{getCurrentProfile})(ProfilePage);
