import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movies-template',
  templateUrl: './movies-template.component.html',
  styleUrls: ['./movies-template.component.css']
})
export class MoviesTemplateComponent implements OnInit {
  @Input() movie_id;
  @Input() movieType: "movie"|"tv" = "movie";
  @Input() genre;
  constructor() { }

  ngOnInit() {
  }

}
