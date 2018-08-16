import { USER_SIGNUP_REQUEST, GET_ERRORS, SET_CURRENT_USER, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../constants';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const userSignup = (userData,history) => {
  return dispatch => {
    axios.post('/api/signup',userData)
    .then(res => {
      history.push('/signin')
      toastr.success('Signup success')
      dispatch({
        type : USER_SIGNUP_REQUEST,
        payload : res.data
      })
    })
    .catch(error => dispatch({
      type : GET_ERRORS,
      payload : error.response.data
    }))
  }
}

export const userSignin = (userData,history) => {
  return dispatch => {
    axios.post('/api/signin',userData)
    .then(res => {
      //success message
      toastr.success('Authenticated')
      //redirect to dashboard
      history.push('/dashboard');
      //save token to ls
      const { token } = res.data;
      localStorage.setItem('jwtToken',token);
      //set token to auth header
      setAuthToken(token);
      //decode token
      const jwtDecoded = jwtDecode(token);
      //set current user
      dispatch(setCurrentUser(jwtDecoded));
    })
    .catch(error => dispatch({
      type : GET_ERRORS,
      payload : error.response.data
    }))
  }
}

export const setCurrentUser = (token) => {
  return{
    type : SET_CURRENT_USER,
    payload : token
  }
}

export const createProfile = (profileData,history) => {
  return dispatch => {
    axios.post('/api/profile',profileData)
    .then(res => {
      toastr.success('Profile created')
      history.push('/dashboard')
    })
    .catch(error => dispatch({
      type : GET_ERRORS,
      payload : error.response.data
    }))
  }
}

export const deleteAccount = () => {
  return dispatch => {
    if(window.confirm('Are you sure ? ')){
      axios.delete('/api/delete').then(res => {
        toastr.info('Profile deleted')
        dispatch({
        type : SET_CURRENT_USER,
        payload : {}
      })
      }
    )
      .catch(error => dispatch({
        type : GET_ERRORS,
        payload : error.response.data
      }))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    //remove token from ls
    localStorage.removeItem('jwtToken');
    //set auth token to false
    setAuthToken(false);
    toastr.info('You are logged out');
    dispatch(setCurrentUser({}));

  }

}

export const getCurrentProfile = () => {
  return dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/currentprofile')
    .then(res => dispatch({
      type : GET_PROFILE,
      payload : res.data
    }))
    .catch(error => dispatch({
      type : GET_PROFILE,
      payload : {}
    }))
  }
}

export const setProfileLoading = () => {
  return{
    type : PROFILE_LOADING
  }
}

export const clearCurrentProfile  = () => {
  return{
    type : CLEAR_CURRENT_PROFILE
  }
}
