import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TmdbService } from '../core/tmdb/tmdb.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: []
})
export class SearchPageComponent implements OnInit {
  searchType = "movie";
  query = "";
  isSearching = false;
  data: any[] = [];
  page = 1;
  get link() {
    return this.searchType === "tv" ? "series" : "movies";
  } 

  constructor(private tmdb: TmdbService, private route: ActivatedRoute ) { }

  ngOnInit() {

    //if call is from movies route

      this.route.params.forEach((params: Params) => {
        
          if(params['type']){
            this.searchType = params['type'] === "series" ? "tv" : "movie";
          }
          
          if(params['query']){
            this.query = params['query'];          
          }
      });
  }

  clear(){
    this.page = 1;
    this.data = [];
  }

  handleSearch(clear = true){

    

    if(this.isSearching){
      return;
    }

    if(clear){
      this.clear();      
    }
    
    let {searchType, query, page} = this;


    if(query){

      this.isSearching = true;
      this.tmdb.search({query, page}, searchType).subscribe(movies => {
        if(movies.results){
          this.data.push(...movies.results);
          this.page += 1;
  
          //console.log(movies.results)
        }

        this.isSearching = false;
      })            
    }
  }

}
