import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../core/tmdb/tmdb.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  movies = [];
  constructor(private tmdb:TmdbService) { }

  ngOnInit() {

    //this.tmdb.getGenres()

    //this.tmdb.getMovieById(1412,'tv').subscribe(tv => console.log(tv))
    //this.tmdb.getMovieCredit(1412,'tv').subscribe(credit => console.log("credit", credit))

    //this.tmdb.getMovieById(420818).subscribe(movie => console.log(movie))
    this.tmdb.
    //search({query:'woman'})
    getMovies({})
    .subscribe(movies => {
      console.log(movies)

      if(movies.results){
        this.movies.push(...movies.results)
      }
      
    } );
  }

}
