import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {
  @Input() movie_id;
  @Input() movieType: "movie"|"tv" = "movie";
  @Input() genre;
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {

    //if call is from movies route

    if(this.movieType === "movie"){

      this.route.params.forEach((params: Params) => {
        
          if(params['id']){
            this.movie_id = params['id'];
          }
          
          if(params['genre']){
            this.genre = params['genre'];          
          }

      });

    }


  }

}
