import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, NgIf, NgClass } from '@angular/common';

import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  ViewChild,
  Input,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ACTIVE_NAVDATA, NAVDATA_CONST } from '../../shared/constants/navdata.constants';
import { IRoutes } from '../../shared/interfaces/common-interfaces';
import { fadeInOut, INavbarData } from './helper';
import { navbarData, updateNavbarData } from './nav-data';
import { SublevelMenuComponent } from './sublevel-menu.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
  imports: [
    CommonModule,
    SublevelMenuComponent,
    BadgeModule,
    NgIf,
    NgClass,
    RouterLink,
    ButtonModule,
  ],
})
export class SidenavComponent implements OnInit {
  @ViewChild('menu') menu: any;

  items = [
    {
      label: 'Navigate',

      items: [
        {
          label: 'Angular',

          icon: 'pi pi-external-link',

          url: 'http://angular.io',
        },

        {
          label: 'Router',

          icon: 'pi pi-upload',

          routerLink: '/fileupload',
        },
      ],
    },
  ];

  @Input() isCollapsed = false;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = false;

  screenWidth = 0;

  navData = navbarData;

  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 768) {
      this.collapsed = false;

      this.onToggleSideNav.emit({
        collapsed: this.collapsed,

        screenWidth: this.screenWidth,
      });
    }
  }

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    updateNavbarData(NAVDATA_CONST.operator);
    this.navData = navbarData;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;

    this.onToggleSideNav.emit({
      collapsed: this.collapsed,

      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;

    this.onToggleSideNav.emit({
      collapsed: this.collapsed,

      screenWidth: this.screenWidth,
    });
  }

  handleClick(item: INavbarData): void {
    // this.sso.screenName.next(item.label);

    this.shrinkItems(item);

    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    const navWithChild = ACTIVE_NAVDATA;

    if (navWithChild.some((nav: IRoutes) => nav.routeLink === data.routeLink)) {
      // If the current data has child items, check if any of them match the current route

      const hasActiveChild = navWithChild.some(
        (nav: IRoutes) =>
          nav.routeLink === data.routeLink &&
          nav.items.includes(this.router.url.split('?')[0])
      );

      return hasActiveChild ? 'active' : '';
    } else {
      // If the current data doesn't have child items, check if the route matches

      return this.router.url.split('?')[0] === data.routeLink ? 'active' : '';
    }
  }

  shrinkItems(item: INavbarData): void {
    // this.sso.screenName.next(item.label);

    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
