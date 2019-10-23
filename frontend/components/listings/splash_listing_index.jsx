import React from 'react';
import ListingIndexItem from './listing_index_item';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import PulseLoaderAnimation from '../loader/pulse_loader';

class SplashListingIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }

    setTimeout(() => this.setState({ loading: false }), 500);
  }

  componentDidMount() {
    this.props.fetchListings()
  }
  
  render() {

    if (this.state.loading) {
      return (
        <div className='loader'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      );
    }

    let listings = this.props.listings.map(listing => <ListingIndexItem listing={listing} key={listing.id} />)

    return (
      // Header Section
      <div className="index">
        <div className="home-wrapper">
          <h2 className="home-title">Find yourself outside.</h2>
          <div className="home-subtext">
            <h3>Book unique camping experiences on over <strong>300,000</strong></h3>
            <h3>campsites, ranches, vineyards, public parks, and more.</h3>
          </div>  
        </div>

        {/* Featured Sites Section  */}
        <h2 className="discover-subtext">Featured Campsites:</h2>
        <div className="featured-camping">
          <div className="featured-site">
            {listings[0]}
            <div className="featured-span"><i className="fas fa-arrow-up"></i>High Demand</div>
          </div>
          <div className="featured-site">
            {listings[5]}
            <div className="featured-span"><span>🔥</span>Campfire favorite</div>
          </div>
          <div className="featured-site">
            {listings[7]}
            <div className="featured-span"><i className="fas fa-bolt"></i>Instant Book</div>
          </div>
        </div>

        <div className="featured-border-wrapper">
          <div className="featured-border"></div>
        </div>

        {/* Testimonial Section */}
        <section className="splash-testimonial">
          <div className="testimonial-container">
            <div className="testimonial-content">
              <figure className="testimonial-image-container">
                <img alt="Hipcamp host Terry" className="testimonial-image" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/testimonial.jpg" />
              </figure>
              <div className="quotes-wrapper">
                <h1>Terry, ClickCamp Host says:</h1>
                <blockquote>
                  “Hipcamp has helped us earn some much needed side income to supplement our working ranch. Hipcamp staff are all very helpful and approachable, and they always respond to our inquiries immediately. We are big fans of this service and we can't recommend it highly enough to other landowners like ourselves!”
                </blockquote>
                <Link to="/discover/9" className="testimonial-host-link">Host of Leaning Leanto in California</Link>
                <div className="testimonial-cta">
                  <Link to="/discover" className="btn-main testimonial-discover-btn">Discover Camping</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Removing Search Bar until Feature is Implemented :/ */}
        {/* Search Bar */}
        {/* <div className="search-wrapper">
          <form className="search-main">
            <div className="listing-search-input">
              <span className="input-i">
                <i className="fas fa-search"></i>
              </span>
              <input type="search" name="listings" id="listings" autoComplete="off" spellCheck="false" dir="auto" placeholder="San Francisco" />
            </div>
            <div className="dates-btn">
              <span className="input-i">
                <i className="far fa-calendar"></i>
              </span>
              <span className="value">Enter Dates </span>
            </div>
            <div className="categories-btn">
              <span className="input-i">
                <i className="fas fa-campground"></i>
              </span>
              <span className="value">All camping</span>
              <span className="input-i-chev">
                <i className="fas fa-chevron-down"></i>   
              </span>         
            </div>
            <Link to={`/discover`}>
              <button className= "search-btn" type="submit">Search</button>
            </Link>
          </form>
        </div> */}
        {/* <div className="campgrounds-wrapper">

          <h2 className="discover-subtext">Discover Camping...</h2>
          <section className="index-discover-campgrounds">
            <div className="index-dc-row">
              {listings}
            </div>
          </section>
        </div> */}

        <Footer />
      </div>
    );
  }
}

export default SplashListingIndex;
