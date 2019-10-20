import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
  // ...
} from '@angular/animations';
import { transAnimation } from '../shared/animations';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styles: [],
  animations: [
    trigger("openClose", [
      state('open', style({
        height: '200px',
        width: '100%',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        width: '20%',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ]),
    trigger("kill", [
      transition('* => *', [
        useAnimation(transAnimation, {
          params: {
            height: "200px",
            opacity: 0,
            backgroundColor: 'red',
            time: '0.5s'
          }
        })
      ])
    ])
  ]
})
export class SlideShowComponent implements OnInit {
  isOpen = false;
  isKill = false;
  count = [1,2];
  constructor() { }

  toggle(){
    this.isOpen = !this.isOpen;
  }

  kill(){
    this.isKill = !this.isKill;
  }

  increase(){
    this.count.push(1);
  }

  decrease(){
    this.count.pop();
  }

  ngOnInit() {

    //setInterval(()=>this.toggle(), 1500)

  }

}
