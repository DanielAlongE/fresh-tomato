import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../core/tmdb/tmdb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styles: []
})
export class MoviesComponent implements OnInit {
  @Input() sort_by;
  @Input() discoverType: "movie"|"tv" = "movie";
  @Input() genre;
  data: any[] = [];
  isFetching = false;
  page = 1;

  constructor(private tmdb: TmdbService) { }

  ngOnInit() {

      //this.fetchMovies();

  }

  clear(){
    this.page = 1;
    this.data = [];
  }

  getArgs(){
    let { sort_by, genre, page } = this;
    let args: any = {};

    if(sort_by){
      args.sort_by = sort_by;
    }

    if(genre){
      args.with_genres = genre;
    }

    args.page = page;

    console.log({args});

    return args;
  }

  fetchMovies(){

    if(this.isFetching){
      return;
    }

    this.isFetching = true;
    let args = this.getArgs();

    this.tmdb.getMovies( args, this.discoverType ).subscribe(movies => {

      if(movies.results){
        this.data.push(...movies.results);
        this.isFetching = false;
        this.page += 1;
      }
      
    });
  }

  ngOnChanges(): void {
    //console.log("ngOnChanges", this.genre);
    this.clear();
    this.fetchMovies();
  }

}
