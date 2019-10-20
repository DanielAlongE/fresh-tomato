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
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const material: any[] = [
  FlexLayoutModule,
  MatGridListModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatTabsModule,
  MatProgressBarModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...material
  ],
  exports: [
    ...material
  ]
})
export class SharedModule { }
