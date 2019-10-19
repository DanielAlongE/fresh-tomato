import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const material: any[] = [
  MatGridListModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ...material
  ],
  exports: [
    ...material,
    FlexLayoutModule
  ]
})
export class SharedModule { }
