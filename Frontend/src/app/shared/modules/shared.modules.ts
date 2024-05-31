import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { TableModule } from 'primeng/table';

import { TooltipModule } from 'primeng/tooltip';

import { BreadcrumbModule } from 'primeng/breadcrumb';

import { ButtonModule } from 'primeng/button';

import { CheckboxModule } from 'primeng/checkbox';

import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { InputTextModule } from 'primeng/inputtext';

import { MultiSelectModule } from 'primeng/multiselect';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MenuModule } from 'primeng/menu';


import { DropdownModule } from 'primeng/dropdown';

import { MessagesModule } from 'primeng/messages';

import { InputComponent } from '../components/input/input.component';

import { InputTextareaModule } from 'primeng/inputtextarea';


import { PrimeNGConfig } from 'primeng/api';

import { RippleModule } from 'primeng/ripple';

import { TabMenuModule } from 'primeng/tabmenu';

import { PanelModule } from 'primeng/panel';

import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { BadgeModule } from 'primeng/badge';

import { TabViewModule } from 'primeng/tabview';

import { DividerModule } from 'primeng/divider';








import { ChartModule } from 'primeng/chart';

import { SelectButtonModule } from 'primeng/selectbutton';

import { CalendarModule } from 'primeng/calendar';

import { InputSwitchModule } from 'primeng/inputswitch';

import { ChipModule } from 'primeng/chip';

import { MessageModule } from 'primeng/message';

import { TreeTableModule } from 'primeng/treetable';

import { TagModule } from 'primeng/tag';

import {AccordionModule} from 'primeng/accordion';







import {OverlayPanelModule} from 'primeng/overlaypanel';





const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {

  primeConfig.ripple = true;

};



const commonSharedComponents = [

//   CommonTableBaseComponent,

//   ActionButtonsComponent,


//   BreadCrumbComponent,

//   DropDownComponent,

  InputComponent,

//   ButtonComponent,




];



const commonSharedModules = [

  InputTextModule,

  DynamicDialogModule,

  ButtonModule,

  TabMenuModule,

  MenuModule,

  PanelModule,

  ConfirmDialogModule,

  CheckboxModule,

  BadgeModule,

  TabViewModule,

  DividerModule,


  FormsModule,

  ReactiveFormsModule,


  ChartModule,

  SelectButtonModule,

  CalendarModule,

  InputSwitchModule,

  ChipModule,

  TagModule,

  AccordionModule,

  TreeTableModule,

  TableModule,

  MessagesModule,

  MessageModule,

  MultiSelectModule,

  InputTextareaModule,

  DropdownModule,


  OverlayPanelModule,

  TooltipModule

];



@NgModule({

  imports: [

    CommonModule,

    BreadcrumbModule,

    RippleModule,

    commonSharedModules

  ],

  declarations: [


  ],

  providers: [

    {

      provide: APP_INITIALIZER,

      useFactory: initializeAppFactory,

      deps: [PrimeNGConfig],

      multi: true,

    },

  ],

  exports: [


    commonSharedModules

  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],



})



export class SharedModule {}

