import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {
  movie_id;
  genre;
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      
        this.movie_id = params['id'];
        this.genre = params['genre'];
      
    })

  }

}
