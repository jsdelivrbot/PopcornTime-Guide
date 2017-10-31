import _ from "lodash";
import React, { Component } from "react";
import LazyLoad from 'react-lazyload';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNumberOfPages, fetchAllMovies } from "../actions";
import MoviesPage from "./movies_page";


/* <img src={post.images.banner} alt="Banner" style={{height:"50px",width:"auto"}}/> */
class MoviesIndex extends Component {
  componentDidMount() {
    this.props.fetchNumberOfPages();
  }

  renderMovies() {
    return _.map(this.props.pages, page => {
      return (

            <LazyLoad height={2000} offset={-100} once className="list-group-item" key={page}>
              <MoviesPage sentPage={page} />
            </LazyLoad>

      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <button className="btn btn-primary" onClick={() => {
            this.props.fetchAllMovies(this.props.pages);
          }}>
            Get all movies on state
          </button>
        </div>
        <h3>Movies</h3>
        <ul className="list-group">
          {this.renderMovies()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pages: state.movieGuide.numberOfPages
  };
}

export default connect(mapStateToProps, { fetchNumberOfPages, fetchAllMovies })(MoviesIndex);
