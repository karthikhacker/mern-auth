import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../constants';

const initialState = {
  profile : {},
  loading: false
}

export default (state = initialState,action) => {
  switch(action.type){
    case PROFILE_LOADING:
     return{
       ...state,
       loading : true
     }
    case GET_PROFILE:
     return{
       ...state,
       profile : action.payload,
       loading : false
     }
    case CLEAR_CURRENT_PROFILE:
     return{
       ...state,
       profile : {}
     }
    default:
     return state;
  }
}
