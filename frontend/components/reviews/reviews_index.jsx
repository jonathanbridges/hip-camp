import React from 'react'
import Review from './review';
import PulseLoaderAnimation from '../loader/pulse_loader';

class ReviewsIndex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      reviewing: false,
      text: '',
      recommends: null,
      errors: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRecommendChange = this.handleRecommendChange.bind(this);
    this.validate = this.validate.bind(this);

  }

  componentDidMount() {
    // setTimeout(() => this.setState({loading: false}), 1000);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({reviewing: true})
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleRecommendChange(e) {
    this.setState({
      recommends: e.target.value
    });
  }

  handleCreate(e) {
    e.preventDefault();

    const errors = this.validate();
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    let formatted = {
      text: this.state.text,
      recommends: this.state.recommends,
      listing_id: this.props.listing.id,
      reviewer_id: this.props.currentUser.id
    }

    this.props.createReview(formatted)
      .then(this.props.fetchReviews)
      .then(this.setState({ 
          reviewing: false, 
          text: '',
          recommends: null
        })
      );
  }

  validate() {
    const errors = [];

    if (this.state.text.length < 8) {
      errors.push("Review can't be empty");
    }
    if (this.state.text.length > 255) {
      errors.push("Review must be 255 characters or less.");
    }
    if (this.state.recommends === null) {
      errors.push("Select a Recommend Option");
    }
  
    return errors;
  }


  render() {
    if (this.props.reviews.length === undefined) {
      return (
        <div className="review-loader"><PulseLoaderAnimation /></div>
      )
    }

    let reviews = [];
    if (this.props.reviews.length > 0) {
      this.props.reviews.forEach(review => {
        if (review.listing_id === this.props.listing.id) {
          reviews.push(
            <Review
              review = {review}
              key = {review.id}
              currentUser={this.props.currentUser}
            />
          )
        }
      }, this)
    }

    let userReview;

    if (this.state.reviewing === false) {
      userReview = (
        <div className="review-index-header">
          <p className="review-index">{`${reviews.length}`} written reviews</p>
          <button className="btn-main" onClick={this.handleSubmit}>Leave a Review</button>
        </div>
      )
    } else {
      let errors = this.state.errors;
      userReview = (
        <div className="review-index-header">
          <form className="review-form" onSubmit={this.handleCreate}>
            <p>Your Review of {this.props.listing.name}:</p>
            <textarea value={this.state.text} onChange={this.handleChange} />
            <div className="radio">
              <p>Recommend?</p>
              <input type="radio" id="recommend" value="true" 
                checked={this.state.recommends === 'true'}
                onChange={this.handleRecommendChange} />
              <label for="recommend">
                <i className="fas fa-thumbs-up tile-recommend" aria-hidden="true"></i>
              </label>
              <input type="radio" id="norecommend" value="true"
                checked={this.state.recommends === 'true'}
                onChange={this.handleRecommendChange} />
              <label for="norecommend">
                <i className="fas fa-thumbs-down tile-recommend" aria-hidden="true"></i>
              </label>
            </div>
            <input className="btn-main" type="submit" value="Create Review" />
            {errors.map(error => (
              <p className="review-error" key={error}>{error}</p>
            ))}
          </form>
        </div>
      )
    }



    return (
      <div>
        {userReview}
        {reviews}
      </div>
    )
  }
}

export default ReviewsIndex;