import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../core/tmdb/tmdb.service';

@Component({
  selector: 'app-movie',
  template: `<ng-content></ng-content>`,
  styles: []
})
export class MovieComponent implements OnInit {
  @Input() movie_id;
  @Input() movieType: "movie"|"tv" = "movie";
  data: any = {};
  isFetching = false;
  cast = [];
  videos = [];
  get link() {
    return this.movieType === "tv" ? "series" : "movies";
  } 
  get topCast() {
    return this.cast.slice(0,10);
  }

  displayedColumns: string[] = ['name', 'value'];
  tableData = []

  constructor( private tmdb: TmdbService ) { }

  ngOnInit() {
    //this.makeTableData({});
  }

  makeTableData(movie: any): void {
  let keys = ["genres",
              "homepage",
              "status",
              "imdb_id",
              "popularity",
              "release_date",
              "budget",
              "revenue",
              "runtime"]

    //add more keys if movieType is tv
    if(this.movieType === 'tv'){
      let moreKeys = ["created_by",
                      "networks",
                      "episode_run_time",
                      "number_of_episodes",
                      "number_of_seasons",
                      "first_air_date",
                      "last_air_date"];

      keys.push(...moreKeys);
    }

  let data = [];

  keys.forEach(key=> {

    let name, value;

    name = key.toUpperCase().replace(/[_]+/g,' ');
    
    if(movie[key]){
      value = movie[key];

      data.push({name, value});      
    }

  })

  //console.log(this.tableData)
  this.tableData = [...data];

  }

  ngOnChanges(): void {

    this.isFetching = true;
    this.tmdb.getMovieById(this.movie_id, this.movieType).subscribe(movie => { 
      this.data = movie;
      this.isFetching = false;
      this.makeTableData(movie);

      console.log(this.data, this.movieType);
      //fetch cast
      this.fetchCast();
      this.fetchVideo();
    });

  }

  fetchCast(){
    this.tmdb.getMovieCredit(this.movie_id, this.movieType).subscribe(credit => {
      if(credit.cast){
        this.cast = [...credit.cast];
        //console.log("cast", this.cast)
      }
    })
  }

  fetchVideo(){
    this.tmdb.getMovieVideo(this.movie_id, this.movieType).subscribe(videos => {
      if(videos.results){
        this.videos = [...videos.results];
        console.log("videos", this.videos)
      }
    })
  }

}
