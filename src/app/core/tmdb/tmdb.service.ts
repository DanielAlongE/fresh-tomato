import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

type sort_by =  "popularity" |
                "release_date" |
                "revenue" |
                "primary_release_date" |
                "original_title" |
                "vote_average" |
                "vote_count";

type sort_direction = "asc" | "desc";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  // https://image.tmdb.org/t/p/w185_and_h278_bestv2
  // https://image.tmdb.org/t/p/original/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg
  // https://api.themoviedb.org/3/discover/movie?api_key=f56190b212c02ed7d16f6b961b8526bb&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&year=2019
  /**
   https://image.tmdb.org/t/p/w300_and_h450_bestv2/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg 1x, 
   https://image.tmdb.org/t/p/w600_and_h900_bestv2/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg 2x
   https://api.themoviedb.org/3/search/movie?api_key=f56190b212c02ed7d16f6b961b8526bb&language=en-US&query=el&page=1&include_adult=false&year=2019
   */
  url = "https://api.themoviedb.org/3";
  api_key = "f56190b212c02ed7d16f6b961b8526bb";
  language = "en-US";
  img185 = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";
  img300 = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  img600 = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";



  constructor(private http: HttpClient) { }

  makeArgs(args: object, start = "?"): string {
    var params: string = "";
    var i = 0;
    var end = "";
    
    for(let key in args) {
    
    //add & to the string
    if(i>0 && args[key]!==""){
      params += '&';
    }
    
    //check if key has a value
    if(args[key]===""){
      end += "&" + key;
    }else{
      params += key + '=';
      params += Array.isArray(args[key]) ? args[key].join(',') : args[key];
    }
    
      i++;
    }

    if(params){
      params = start + params + end;
    }
  
    return params;
    
  }

  search(args: any = {}, searchType = "movie"): Observable<any> {

    let { api_key, language } = this;

    let query = args.query || "";

    let page = args.query || 1;

    let url = this.url + "/search/" + searchType + this.makeArgs({api_key, language, query, page});

    return this.http.get(url)
                .pipe(
                  map( movies => {
                    return this.prepareMovies(movies);
                  } )
                );    
  }

  getGenres( genreType: "movie" | "tv" = "movie"): Observable<any> {

    let { api_key, language } = this;

    let url = this.url + "/genre/" + genreType + "/list" + this.makeArgs({api_key, language});

    return this.http.get(url);    
  }


  getMovies(args: any = {}, discoverType: "movie"|"tv" = "movie"): Observable<any> {
    let extra: any = {}
    let { api_key, language } = this;

    let sort_by = args.sort_by || "popularity.desc";
    let page = args.page || 1;

    if(args.with_genres){
      extra.with_genres = args.with_genres;
    }


    let url = this.url + "/discover/" + discoverType + this.makeArgs({api_key, language, sort_by, page, ...extra});

    return this.http.get(url)
                .pipe(
                  map( movies => this.prepareMovies(movies) )
                );    
  }

  prepareMovies(movies: any){
    let results = movies.results || [];

    results = results.map(movie => this.prepareMovie(movie))

    return {...movies, results:[...results]}
  }

  getMovieById(movie_id: number, movieType: "movie"|"tv" = "movie"){

    let { api_key, language } = this;
    let url = this.url + `/${movieType}/` + movie_id + this.makeArgs({api_key, language});

    return this.http.get(url)
                .pipe(
                  map( movie => this.prepareMovieFull(movie) )
                );
  }

  getMovieCredit(movie_id: number, creditType: "movie"|"tv" = "movie"): Observable<any> {
    
    let { api_key } = this;
    let url = this.url + `/${creditType}/` + movie_id + "/credits" + this.makeArgs({api_key});

    return this.http.get(url);
  }

  prepareMovie(movie: any){

    let id = movie.id || 0;
    let title = movie.title || "";
    let tagline = movie.tagline || "";
    let status = movie.status || "";    
    let release_date = movie.release_date || "";  
    let budget = movie.budget || "";  
    let revenue = movie.revenue || "";  
    let backdrop_path =  movie.backdrop_path ? (this.img600 + movie.backdrop_path) : "https://picsum.photos/600";  
    let poster_path =  movie.poster_path ? (this.img300 + movie.poster_path) : "https://picsum.photos/300";  
    let popularity = movie.popularity || "";  
    let overview = movie.overview || "";  
    let imdb_id = movie.imdb_id || "";  
    let genres = movie.genres || "";  

    return {id, title, tagline, status, 
            release_date, budget, revenue, 
            backdrop_path, poster_path, popularity, 
            overview, imdb_id, genres};
  }


  prepareMovieFull(movie: any){

    let preparedMovie = this.prepareMovie(movie);

    return {...movie, ...preparedMovie}
  }


}
