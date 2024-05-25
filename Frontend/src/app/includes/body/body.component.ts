import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent implements OnInit, OnDestroy {
  constructor(
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  @Input() collapsed = false;

  @Input() screenWidth = 0;

  @Input() isMobile = false;

  getBodyClass(): string {
    let styleClass = '';

    // if(!this.sso.isUser()){

    //   styleClass = 'body-full-screen';

    // }else

    if (this.isMobile) {
      styleClass = 'body-mobile-full-screen';
    } else if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }
}
