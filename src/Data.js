import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AdditionalInfo from './Additional';
import Slider from './slider';
import Loader from "react-loader-spinner";

const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=3';

class Data extends Component {
  state = {
    movies: [],
    movieId: null,
    isLoading: true,
  };

  onClick = e => {
    this.setState({
      movieId: e.target.id
    });
    console.log(e.target.id);
  };

  componentDidMount = () => {
    async function movies(){
      const response = await fetch(url);
      const data = await response.json();
      return data;}
      movies().then(data=> 


      {
        let movies = data.results.map(item => {
          return (
            <Link to={`/movieInfo/ ${item.id}`}>
              <div className="overlay" onClick={this.onClick}>
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title}
                  id={item.id}
                />
              </div>
            </Link>
          );
        })

        this.setState({
          movies: movies,
          isLoading: false,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { movies, movieId } = this.state;

    return (
      <div className="carousel">
        {this.state.isLoading
          ? <Loader type="Puff" color="#00BFFF" height="100" width="100" />
          : <div>
            <Slider movie={movies} />

          </div>
        }
      </div>
    );
  }
}

export default Data;