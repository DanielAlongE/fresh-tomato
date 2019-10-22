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
import { ContainerComponent } from './container/container.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';

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
  MatProgressBarModule,
  MatButtonToggleModule,
  MatIconModule,
  MatChipsModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule,
  MatBadgeModule
];


@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    ...material
  ],
  exports: [
    ...material,
    ContainerComponent
  ]
})
export class SharedModule { }
