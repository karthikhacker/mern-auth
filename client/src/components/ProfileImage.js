import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions';
import {toastr} from 'react-redux-toastr';
import Spinner from './Spinner';
import axios from 'axios';

 class ProfileImage extends React.Component {
   state = {
     selectedFile : '',
     progress : '',
     errors : {}
   }
   componentDidMount(){
     this.props.getCurrentProfile();
   }
   handleFile = (e) => {
     this.setState({ selectedFile : e.target.files[0] })
   }
   fileUploadHandler = (e) => {
     e.preventDefault();
     const fd = new FormData();
     fd.append('file',this.state.selectedFile);
     axios.put('/api/upload',fd,{
       onUploadProgress : progressEvent => {
         var percentage = (progressEvent.loaded / progressEvent.total) * 100;
         var percentageUploaded = Math.round(percentage) + '%';
         this.setState({ progress : percentageUploaded })
       }
     })
     .then(res => {
       toastr.success('Image uploaded')
       this.props.history.push('/dashboard')
     })
     .catch(error => this.setState({ errors : error.response.data }));
   }
  render() {
    const { profile } = this.props.profile;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            {
               this.state.errors ? <p className="text-center text-danger">{this.state.errors.message}</p> : null
            }
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <h4 className="text-center"><strong>Upload profile image</strong></h4>
            {profile.user ? <img src={profile.user.profileImage} alt="profile" className="img-responsive"/> : <Spinner /> }
            <hr />
            <form>
              <div className="form-group">
                <input className="btn btn-default" type="file"  onChange={this.handleFile}/>
              </div>
              <button onClick={this.fileUploadHandler} className="btn btn-info btn-block">Upload</button>
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
export default connect(mapStateToProps,{getCurrentProfile})(ProfileImage);
