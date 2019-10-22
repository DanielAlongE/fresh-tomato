import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../core/tmdb/tmdb.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styles: []
})
export class FavoritePageComponent implements OnInit {
  series = []
  movies = []
  constructor(private tmdb: TmdbService) { }

  ngOnInit() {
    this.refreshFavorites();
  }

  refreshFavorites(){
    this.series = this.tmdb.getFavorite("series");
    this.movies = this.tmdb.getFavorite("movies");    
  }

  remove(movie_id, type){
    this.tmdb.removeFavorite(movie_id, type);
    this.refreshFavorites();
  }

}
