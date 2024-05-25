import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Menu, MenuModule } from 'primeng/menu';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SidebarModule, SidenavComponent, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') menu!: Menu;

  @Input() collapsed = false;

  @Input() screenWidth = 0;

  @Input() isMobile = false;

  sidebarVisible = false;

  items = [
    {
      label: 'Profile',

      icon: 'pi pi-user',

      tooltip: 'Profile',
    },

    {
      label: 'Mobile No.',

      icon: 'pi pi-mobile',

      tooltip: 'Mobile No.',
    },

    {
      icon: 'pi pi-id-card',

      label: 'employeeId',

      tooltip: 'Employee Id',
    },

    {
      icon: 'pi pi-sign-out',

      label: 'Logout',

      tooltip: 'Logout',

      command: () => {
      },
    },
  ];

  welcomeUser!: string | null;

  constructor() {}

  ngOnInit(): void {
  }

  getHeadClass(): string {
    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }


  getCurrentGreeting(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

}
