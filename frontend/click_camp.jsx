//React
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Root from './components/root';
import configureStore from './store/store';

//Testing
import { signup, login, logout } from './actions/session_actions'
import { fetchListing, fetchListings } from './actions/listing_actions'
import { fetchReservations, fetchReservation, deleteReservation, createReservation } from './util/reservation_api_util'


document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  //AJAX testing//
  window.fetchReservation = fetchReservation
  window.fetchReservations = fetchReservations
  //Create Reservation is throwing error on window!
  window.createReservation = createReservation
  window.deleteReservation = deleteReservation
  //End Testing

  //Redux Testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // window.fetchListings = fetchListings
  // window.fetchListing = fetchListing

  //End Testing

  //Backend Testing
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;
  //End Testing


  const root = document.getElementById('root');
  
  ReactDOM.render(<Root store={store} />, root);
});

  // let preloadedState = undefined;
  // if (window.currentUser) {
  //   preloadedState = {
  //     session: { currentUser: window.currentUser }
  //   };
  // }
