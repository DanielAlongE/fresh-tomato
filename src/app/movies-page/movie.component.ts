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
  get topCast() {
    return this.cast.slice(0,10);
  }

  displayedColumns: string[] = ['name', 'value'];
  tableData = [{name:'Sample', value:'One'}]

  constructor( private tmdb: TmdbService ) { }

  ngOnInit() {
    //this.makeTableData({});
  }

  makeTableData(movie: any): void {
  let keys = ["homepage",
              "status",
              "imdb_id",
              "popularity",
              "release_date",
              "revenue",
              "runtime"]

  let data = [];

  keys.forEach(key=> {

    let name, value;

    name = key.toUpperCase();
    
    value = movie[key] || "";

    data.push({name, value});
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

      //console.log(this.tableData);
      //fetch cast
      this.fetchCast();
    });

  }

  fetchCast(){
    this.tmdb.getMovieCredit(this.movie_id, this.movieType).subscribe(credit => {
      if(credit.cast){
        this.cast = [...credit.cast];
        console.log("cast", this.cast)
      }
    })
  }

}
