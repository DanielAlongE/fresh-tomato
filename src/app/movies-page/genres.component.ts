import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../core/tmdb/tmdb.service';

@Component({
  selector: 'app-genres',
  template: `<ng-content></ng-content>`,
  styles: []
})
export class GenresComponent implements OnInit {
  @Input() genreType: "movie" | "tv" = "movie";
  data: any[] = [];
  constructor(private tmdb: TmdbService) { }

  ngOnInit() {
    this.tmdb.getGenres(this.genreType).subscribe(res => {
      if(res.genres){
        this.data = [...res.genres]
      }
    })
  }

}
