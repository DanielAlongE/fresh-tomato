import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from 'src/app/core/tmdb/tmdb.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styles: []
})
export class FavoriteButtonComponent implements OnInit {
  @Input() movie_id;
  @Input() type: "movies"|"series" = "movies";
  isFavorite = false;

  constructor(private tmdb: TmdbService) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
   
    let favorite: number[] = this.tmdb.getFavorite(this.type)

    this.doFavorite(this.movie_id, favorite);
        
  }

  doFavorite(movie_id, favorite){
    if(favorite.includes(+movie_id)){
      this.isFavorite = true;
    }else{
      this.isFavorite = false;
    }
  }

  toggleFavorite(){
    let favorite: number[] = this.tmdb.toggleFavorite(this.movie_id, this.type);

    this.doFavorite(this.movie_id, favorite);

  }

}
