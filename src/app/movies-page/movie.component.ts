import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../core/tmdb/tmdb.service';

@Component({
  selector: 'app-movie',
  template: `<ng-content></ng-content>`,
  styles: []
})
export class MovieComponent implements OnInit {
  @Input() movie_id;
  data: any = {};
  isFetching = false;
  constructor( private tmdb: TmdbService ) { }

  ngOnInit() {
  }

  ngOnChanges(): void {

    this.isFetching = true;
    this.tmdb.getMovieById(this.movie_id).subscribe(movie => { 
      this.data = movie;
      this.isFetching = false;
      console.log(movie);
    });

  }

}
