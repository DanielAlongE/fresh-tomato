import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-series-page',
  template: `
    <app-movies-template [movie_id]="movie_id"  [movieType]="movieType" [genre]="genre"></app-movies-template>
  `,
  styles: []
})
export class SeriesPageComponent implements OnInit {
  movie_id;
  movieType: "movie"|"tv" = "tv";
  genre;
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      
      if(params['id']){
        this.movie_id = params['id'];
      }
      
      if(params['genre']){
        this.genre = params['genre'];          
      }
      
    })

  }
}
