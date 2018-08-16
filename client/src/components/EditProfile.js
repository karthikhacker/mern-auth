import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../actions';
import isEmpty from 'lodash/isEmpty';

 class EditProfile extends React.Component {
   state = {
     fullname : '',
     location : '',
     website : '',
     status : '',
     skills : ''
   }
   componentDidMount(){
     this.props.getCurrentProfile();
   }
   componentWillReceiveProps(nextProps){
     if(nextProps.profile.profile){
       const profile = nextProps.profile.profile;
       const skillsCsv = profile.skills.join(',');
       profile.fullname = !isEmpty(profile.fullname) ? profile.fullname : '';
       profile.location = !isEmpty(profile.location) ? profile.location : '';
       profile.website = !isEmpty(profile.website) ? profile.website : '';
       profile.status = !isEmpty(profile.status) ? profile.status : '';
       this.setState({
         fullname : profile.fullname,
         location : profile.location,
         status : profile.status,
         website : profile.website,
         skills : skillsCsv
       })
     }
   }
   handleFullname = (e) => {
     this.setState({ fullname : e.target.value });
   }
   handleLocation = (e) => {
     this.setState({ location : e.target.value });
   }
   handleStatus = (e) => {
     this.setState({ status : e.target.value });
   }
   handleWebsite = (e) => {
     this.setState({ website : e.target.value});
   }
   handleSkills = (e) => {
     this.setState({ skills : e.target.value });
   }

   handleSubmit = (e) => {
     e.preventDefault();
     const profileData = {
       fullname : this.state.fullname,
       location : this.state.location,
       status : this.state.status,
       website : this.state.website,
       skills : this.state.skills
     }
     this.props.createProfile(profileData,this.props.history);
   }

  render() {
    const options = [
      {label : 'Select your status', value : 0},
      {label : 'Product developer', value : 'Product developer'},
      {label : 'Frontend developer', value : 'Frontend developer'},
      {label : 'Backend developer', value : 'Backend developer'},
      {label : 'Fullstack developer', value : 'Fullstack developer'}
    ];
    const selectOption = options.map(option => (
      <option value={option.value} key={option.label}>{option.label}</option>
    ))
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <h3 className="text-center"><strong className="text-muted">Edit profile</strong></h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fullname}
                  onChange={this.handleFullname}
                  placeholder="Fullname"
                 />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.location}
                  onChange={this.handleLocation}
                  placeholder="Location"
                 />
              </div>
              <div className="form-group">
                <select value={this.state.status} className="form-control" onChange={this.handleStatus}>
                  {selectOption}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.website}
                  onChange={this.handleWebsite}
                  placeholder="Website"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.skills}
                  onChange={this.handleSkills}
                  placeholder="Add skills seperated by ',' "
                 />
              </div>
              <button className="btn btn-success btn-sm">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    profile : state.profile
  }
}
export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(EditProfile));
