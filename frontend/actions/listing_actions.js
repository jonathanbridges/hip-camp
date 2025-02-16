import * as APIUtil from '../util/listing_api_util';

export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS';
export const RECEIVE_LISTING = 'RECEIVE_LISTING';

export const receiveListings = listings => ({
  type: RECEIVE_LISTINGS,
  listings
});

// pass in reviews, authors, as arguments ({ listing, reviews, authors })
export const receiveListing = listing => ({
  type: RECEIVE_LISTING,
  listing,
  // reviews,
  // authors,
});

// Pass filters in as arguments to anon func and invocation of fetchListings
export const fetchListings = (filters) => dispatch => (
  APIUtil.fetchListings(filters).then(listings => (
    dispatch(receiveListings(listings))
  ))
);

export const fetchListing = id => dispatch => (
  APIUtil.fetchListing(id).then(payload => (
    dispatch(receiveListing(payload))
  ))
);