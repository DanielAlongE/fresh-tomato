import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';


export const routes: Routes = [
    {path:'movies/genre/:genre', component:MoviesPageComponent},
    {path:'movies/:id', component:MoviesPageComponent},
    {path:'movies', component:MoviesPageComponent},
    {path:'', component:HomePageComponent},
    {path:'**', redirectTo:'/'}
];