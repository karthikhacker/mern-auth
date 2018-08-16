import { USER_SIGNUP_REQUEST } from '../constants';

const initialState = {
   user : {}

}

export default (state = initialState,action) => {
  switch(action.type){
    case USER_SIGNUP_REQUEST:
     return{
       ...state,
       user : action.payload
      
     }
    default:
     return state;
  }
}
