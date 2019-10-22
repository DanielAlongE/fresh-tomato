import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { routes } from './app.routes';
import { MoviesComponent } from './movies-page/movies.component';
import { GenresComponent } from './movies-page/genres.component';
import { MovieComponent } from './movies-page/movie.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { SeriesPageComponent } from './series-page/series-page.component';
import { MoviesTemplateComponent } from './movies-page/movies-template/movies-template.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { FavoriteButtonComponent } from './movies-page/movies-template/favorite-button/favorite-button.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MoviesPageComponent,
    MoviesComponent,
    GenresComponent,
    MovieComponent,
    SlideShowComponent,
    SeriesPageComponent,
    MoviesTemplateComponent,
    SearchPageComponent,
    FavoritePageComponent,
    FavoriteButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
