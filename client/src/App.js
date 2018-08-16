import React, { Component } from 'react';
import './App.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import ProfilePage from './components/ProfilePage';
import ProfileImage from './components/ProfileImage';
import PrivateRoute from './components/PrivateRoute';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ReduxToastr from 'react-redux-toastr';
import jwtDecode from 'jwt-decode';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions';

const store = createStore(rootReducer,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
//set current user
if(localStorage.jwtToken){
  //set token header
  setAuthToken(localStorage.jwtToken);
  const jwtDecoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecoded));
}
class App extends Component {
  render() {
    return (
     <Provider store={store}>
       <Router>
         <section>
           <Navbar />
           <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="bounceIn"
            transitionOut="bounceOut"
            progressBar
            closeOnToastrClick/>
           <Switch>
             <Route exact path="/" component={Home}/>
             <Route exact path="/signup" component={Signup}/>
             <Route exact path="/signin" component={Signin}/>
             <PrivateRoute exact path="/dashboard" component={Dashboard}/>
             <PrivateRoute exact path="/createprofile" component={CreateProfile}/>
             <PrivateRoute exact path="/editprofile" component={EditProfile}/>
             <PrivateRoute exact path="/profilepage" component={ProfilePage}/>
             <PrivateRoute exact path="/uploadimage" component={ProfileImage}/>
           </Switch>
         </section>
       </Router>
     </Provider>

    );
  }
}

export default App;
