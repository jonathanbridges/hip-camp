import React from 'react';
import { Link } from 'react-router-dom';

import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import ReservationShow from '../reservations/reservation_show'

let overlay;
let cal;
let calOffset;

class ListingShowDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      camper_id: this.props.currentUser === undefined ? null : this.props.currentUser.id,
      startDate: null,
      endDate: null,
      focusedInput: null,
      reservation: null,
      focused: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusReservation = this.focusReservation.bind(this);
  }

  componentDidMount() {
    // Allows calendar to become sticky when scrolled to
    if (
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
      let observer = new IntersectionObserver(entries => {
        if (entries[0].boundingClientRect.y < 500) {
          document.body.classList.add("cal-not-at-top");
        } else {
          document.body.classList.remove("cal-not-at-top");
        }
      });
      observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
    }
  }
  
  componentDidUpdate(prevProps) {
    // Adds user id to state if user didn't log in until visiting listing page
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState({
        camper_id: this.props.currentUser.id
      });
    }
  }

  focusReservation() {
    // show overlay when user clicks in reservation details
    if (this.state.focused === false) {
      overlay = document.querySelector('#listing-overlay');
      overlay.style.display = 'block';

    // helper function to find position of calendar box
      const offset = (el) => {
        var rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
      }

      cal = document.getElementById('login-wrapper');
      calOffset = offset(cal);
      
      // scroll to calendar on focus
      window.scrollTo({
        top: calOffset.top - 100,
        left: 0,
        behavior: 'smooth'
      });

      this.setState({
        focused: true
      });

    } else if (this.state.focused === true) {
      // removes overlay if user clicks out of calendar
      overlay = document.querySelector('#listing-overlay');
      overlay.style.display = 'none';

      this.setState({
        focused: false
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if ((this.state.startDate === null || this.state.endDate === null) && this.props.currentUser !== undefined) {
      alert("Please select a date.")
      return
    }

    let formattedReservation = {
      camper_id: this.state.camper_id,
      listing_id: this.props.listing.id,
      check_in: this.state.startDate._d,
      check_out: this.state.endDate._d,
    }

    // alert(`You're about to book ${this.state.endDate._d.getDate() - this.state.startDate._d.getDate()} days!  `)
    this.props.createReservation(formattedReservation)
      .then(this.setState({
        startDate: null,
        endDate: null,
        focusedInput: null,
        reservation: formattedReservation
      }));
      document.getElementById('login-wrapper').style.display = 'none';
//  = "You're confirmed!")
//       .then(document.getElementById("pending").setAttribute("id", "confirmed")
    // );
  }

  myFunction() {
    console.log()
  }

  render () {

    // Once valid start and end dates have been set, append subtotal and prompt to page

    let subtotalDiv;
    let promptDiv;
    let sub;

    if (this.state.endDate && this.state.startDate) {
      
      const checkIn = this.state.startDate._d.getTime();
      const checkOut = this.state.endDate._d.getTime();
      const duration = (checkOut - checkIn) / (1000 * 3600 * 24);

      sub = duration * this.props.listing.cost;

      subtotalDiv = (
        <div className="subtotal-wrapper">
          <p>Subtotal</p>
          <p>{`$${sub}`}</p>
        </div>
      )

      promptDiv = (
        <div className="prompt">
          <p>Don't worry, you won't be charged yet.</p>
        </div>
      )
    } else {
      subtotalDiv = (<div></div>)
      promptDiv = (<div></div>)
    }

    let calendar;
    // render checkout component differently based off login status
    if (this.props.currentUser === undefined) {
      calendar = (
        <div id="login-wrapper btn-main" onClick={() => this.props.openModal('login')}>
          <div id="top-of-site-pixel-anchor"></div>
          <div className="calendar-wrapper">
            <div id="listing-overlay"></div>
            <div className="price-row">
              <strong className="day-rate">{`$${this.props.listing.cost}`}</strong>
              <p className="price-deets">per night</p>
            </div>
            <DateRangePicker
              numberOfMonths={1}
              showClearDates={true}
              enableOutsideDays={true}
              startDateId="startDate"
              endDateId="endDate"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }) }}
              focusedInput={this.state.focusedInput}
              onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
            />
            <a onClick={this.handleSubmit} className="btn-main checkout-btn" id="show-book">Log in to Book</a>
          </div>
        </div>
      )
    } else {
      calendar = (
        <div id="login-wrapper" onClick={this.focusReservation}>
          {/* 1px anchor for sticky calendar section */}
          <div id="top-of-site-pixel-anchor"></div>
          <div id="listing-overlay" onClick={this.focusReservation}></div>
          <div className="calendar-wrapper">
            <div className="price-row">
              <strong className="day-rate">{`$${this.props.listing.cost}`}</strong>
              <p className="price-deets">per night</p>
            </div>
            <DateRangePicker
              numberOfMonths={1}
              showClearDates={true}
              enableOutsideDays={true}
              startDateId="startDate"
              endDateId="endDate"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => { 
                if (startDate === null) return;
                this.setState({ startDate, endDate }) 
              }}
              focusedInput={this.state.focusedInput}
              onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
            />
            {subtotalDiv}
            <a onClick={this.handleSubmit} className="btn-main checkout-btn" id="show-book"><i className="fas fa-bolt"></i>&nbsp;&nbsp;Instant Book</a>
            {promptDiv}
          </div>
        </div>
      )
    }
  
    return (
    <div className="show-content-bottom">
      <div className="show-content-left">
        <div>
          <div className="show-name">
            <h1>{this.props.listing.name}</h1>
            <div className="verified">
              <i className="fas fa-check"></i>  
            </div>
          </div>
        </div>
        <div className="tile-recommend">
          <i className="fas fa-thumbs-up"></i>
          <strong>{` ${Math.floor(Math.random() * (1 + 100 - 85)) + 85}%`}</strong>
          <span className="recommend-text"><strong className="strong-verified"> Recommend</strong>{` - ${Math.floor(Math.random() * (1 + 200 - 12)) + 12} Reviews`}</span>
        </div>

        {/* Host Information */}
        <div className="show-host-desc">
          <img className="host-ava" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/host1.jpg" alt=""/>
          <div className="host-details">
            <p className="hosted-by">Hosted by</p>
            <p className="host-name">Myrna H.</p>
          </div>
          <p className="show-description" id="show-small">{this.props.listing.description}</p>
        </div>

        {/* Info Cards */}
        <section className = "show-info-section">
          <div className="info-wrapper">

            {/* Card 1 */}
            <div className="info">
              <h2 className="show-title">Campsite area</h2>
              <div className="info-deets">
                <i className="fas fa-campground"></i>
                <p>Bring your own tents</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-map-marker-alt"></i>
                <p>1 site</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-users"></i>
                <p>8 guests</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-walking"></i>
                <p>Short walk</p>
              </div>
              <div className="info-deets">
                <i className="fab fa-accessible-icon"></i>
                <p>ADA access</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="info">
              <h2 className="show-title">Essentials</h2>
              <div className="info-deets">
                <i className="fas fa-fire-alt"></i>
                <p>Campfires allowed</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-dog"></i>
                <p>Pets allowed</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-toilet-paper"></i>
                <p>Toilet available</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-shower"></i>
                <p>Shower available</p>
              </div>
            </div>
          
            {/* Card 3 */}
            <div className="info">
              <h2 className="show-title">Activities</h2>
              <div className="info-deets">
                <i className="fas fa-biking"></i>
                <p>Mountain biking</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-swimmer"></i>
                <p>Swimming</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-hiking"></i>
                <p>Hiking</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-quidditch"></i>
                <p>Quidditch</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-volleyball-ball"></i>
                <p>Volleyball</p>
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <div className="details-row">
          <div>
            <label>Details</label>
          </div>
          <div>
            <ul className="show-ul">
              <li><strong className="show-strong">Check in:</strong> After 2PM</li>
              <li><strong className="show-strong">Check out:</strong> Before 12PM</li>
              <li><strong className="show-strong">Cancellation Policy:</strong> Flexible</li>
            </ul>
          </div>
          <div>
            <ul className="show-ul">
              <li><strong className="show-strong">On arrival:</strong> Meet and greet</li>
              <li><strong className="show-strong">Minimum nights:</strong> 1 night</li>
              <li><strong className="show-strong">Accepts Bookings:</strong> 12 months out</li>
            </ul>
          </div>
        </div>
          
      </div>

      {/* Reservation Section */}
      <div className="listing-reservation-wrapper">
        <div className="show-content-right" id="pending">
          {calendar}
        </div>
        {/* Reservation after booking */}
        <div className="reservation-new">
          <ReservationShow reservation={this.state.reservation} listing={this.props.listing} />
        </div>
      </div>

     

    </div>
    )
  };
}

export default ListingShowDetails;
