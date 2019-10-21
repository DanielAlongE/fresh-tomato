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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
