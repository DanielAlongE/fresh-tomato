import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
  <div class="app-container" fxFlex="80" fxFlex.md="90" fxFlex.sm="90" fxFlex.xs="90">
    <ng-content></ng-content>
  </div>
  `,
  styles: [`
    .app-container {
      margin-left: auto;
      margin-right: auto;
    }
  `]
})
export class ContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
