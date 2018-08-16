import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import user from './user';
import errors from './errors';
import auth from './auth';
import profile from './profile';
export default combineReducers({
  user,
  errors,
  auth,
  profile,
  toastr: toastrReducer
})
