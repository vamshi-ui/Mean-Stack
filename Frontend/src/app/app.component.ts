import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BodyComponent } from './includes/body/body.component';
import { SidenavComponent } from './includes/sidenav/sidenav.component';
import { HeaderComponent } from './includes/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    SidebarModule,
    BodyComponent,
    SidenavComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  privilages: any;
  isSideNavCollapsed = false;
  screenWidth = 0;
  mobileScreenWidth = 0;
  isMobile = false;
  message: any = null;
  currentYear: number = new Date().getFullYear();

  constructor() {
    this.mobileScreenWidth = window.innerWidth;

    if (this.mobileScreenWidth < 768) {
      this.isMobile = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobileScreenWidth = window.innerWidth;

    if (this.mobileScreenWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit() {}

  onToggleSideNav(data: any): void {
    this.screenWidth = data.screenWidth;

    this.isSideNavCollapsed = data.collapsed;
  }
}
