import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { SeriesPageComponent } from './series-page/series-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';


export const routes: Routes = [
    {path:'favorites', component:FavoritePageComponent},
//    {path:'search/:type/:query', component:SearchPageComponent},
    {path:'search', component:SearchPageComponent},
    {path:'series/genre/:genre', component:SeriesPageComponent},
    {path:'series/:id', component:SeriesPageComponent},
    {path:'series', component:SeriesPageComponent},
    {path:'movies/genre/:genre', component:MoviesPageComponent},
    {path:'movies/:id', component:MoviesPageComponent},
    {path:'movies', component:MoviesPageComponent},
    {path:'', component:HomePageComponent},
    {path:'**', redirectTo:'/'}
];