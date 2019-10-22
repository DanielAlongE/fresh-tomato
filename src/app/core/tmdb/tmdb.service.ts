import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

type sort_by =  "popularity" |
                "release_date" |
                "revenue" |
                "primary_release_date" |
                "original_title" |
                "vote_average" |
                "vote_count";

type sort_direction = "asc" | "desc";

declare let window: any;

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
   https://api.themoviedb.org/3/tv/234/videos?api_key=f56190b212c02ed7d16f6b961b8526bb&language=en-US
   */
  url = "https://api.themoviedb.org/3";
  api_key = "f56190b212c02ed7d16f6b961b8526bb";
  language = "en-US";
  img185 = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";
  img300 = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  img600 = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
  imgFull = "https://image.tmdb.org/t/p/original"



  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) { }

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

    let page = args.page || 1;

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

    return this.http.get(url)
                    .pipe(
                      map( credit => this.prepareCredit(credit))
                    );
  }

  prepareCredit(credit){
    let cast;

    if(credit.cast){
      cast = credit.cast.map(c => {
        let profile_path = c.profile_path ? (this.img185 + c.profile_path) : "https://picsum.photos/200";
        return {...c, profile_path}
      })
    }

    return {...credit, cast}
  }

  prepareMovie(movie: any, movieType="movie"){

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
    let genres = movie.genres || [];  
    let backdrop = {};
    
        backdrop['small'] = movie.backdrop_path ? (this.img300 + movie.backdrop_path) : "https://picsum.photos/300";
        backdrop['medium'] = movie.backdrop_path ? (this.img600 + movie.backdrop_path) : "https://picsum.photos/600";
        backdrop['full'] = movie.backdrop_path ? (this.imgFull + movie.backdrop_path) : "https://picsum.photos/1024";

        genres = genres.map(g=>{
        return (typeof g === "object") ? ({...g, movieType:`${movieType === 'tv' ? 'series': 'movies'}`}) : g;
        })
        //console.log(backdrop)

    return {...movie,
            id, title, tagline, status, 
            release_date, budget, revenue, 
            backdrop_path, poster_path, popularity, 
            overview, imdb_id, genres,
            backdrop};
  }


  prepareMovieFull(movie: any, movieType="movie"){

    let preparedMovie = this.prepareMovie(movie, movieType);

    return {...movie, ...preparedMovie}
  }

  getMovieVideo(movie_id: number, movieType: "movie"|"tv" = "movie"): Observable<any> {
    
    let { api_key, language } = this;
    let url = this.url + `/${movieType}/` + movie_id + "/videos" + this.makeArgs({api_key, language});

    return this.http.get(url).pipe(
      map(videos => this.prepareVideos(videos))
    )
  }

  prepareVideos(videos) {
    let results = videos.results || [];

    results = results.map(video => {
      let url = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + video.key);

      return {...video, url}
    })

    return {...videos, results}
  }

  getFavorite(type: "series"| "movies"){
    let favorite = window.localStorage.getItem(type) || "[]";
    
    favorite = JSON.parse(favorite)

    //console.log({favorite})

    //window.localStorage.clear();

    return favorite;
  }

  addFavorite(value, type: "series"| "movies"){
    let favorite = this.getFavorite(type);

      favorite.push(+value);
    
    favorite = Array.from(new Set(favorite))

    let jsonString = JSON.stringify(favorite);

    window.localStorage.setItem(type, jsonString);

    return favorite;
  }

  removeFavorite(value, type: "series"| "movies"){
    let favorite: number[] = this.getFavorite(type);
    let movie_id = +value;

    favorite = favorite.filter(v => v!==movie_id);
    
    let jsonString = JSON.stringify(favorite);

    window.localStorage.setItem(type, jsonString);

    return favorite;
  }

  toggleFavorite(value, type: "series"| "movies"){
    let favorite = this.getFavorite(type);
    let movie_id = +value;

    //movie_id exists
    if(favorite.includes(movie_id)){
      return this.removeFavorite(movie_id, type);
    }//add new movie_id
    else{
      return this.addFavorite(movie_id, type);
    }
    
  }


}
