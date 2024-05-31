import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SharedModule } from '../../modules/shared.modules';
import { DatePipe, NgClass } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';

@Component({
  selector: 'app-common-table-base',
  standalone: true,
  imports: [SharedModule, NgClass, ActionButtonsComponent, DatePipe],
  templateUrl: './common-table-base.component.html',
  styleUrl: './common-table-base.component.scss',
})
export class CommonTableBaseComponent implements OnInit, OnChanges {
  @ViewChildren(OverlayPanel) overlayPanels!: QueryList<OverlayPanel>;

  @Input() totalRecords: number = 0;

  @Input() lazy: boolean = false;

  @Input() isExcel: boolean = false;

  @ViewChild('menuLink') menuLink!: Menu;

  @Input() displayedColumns: any[] = [];

  @Input() tableData: any = [];

  dateMatchModeOptions: any = ['equals'];

  matchModeOptions: any = ['contains'];

  fields: any = [];

  @Input() isCheckbox = false;

  filterFields: any;

  selectedRows: any;

  @Output() confirmClick = new EventEmitter();

  @Output() rejectClick = new EventEmitter();

  @Output() requestClick = new EventEmitter();

  @Output() issueClick = new EventEmitter();

  @Output() configureClick = new EventEmitter();

  @Output() deleteClick = new EventEmitter();

  @Output() editClick = new EventEmitter();

  @Output() viewClick = new EventEmitter();

  @Output() activateClick = new EventEmitter();

  @Output() selectedRecords = new EventEmitter();

  @Output() onPageChange = new EventEmitter();

  @Output() linkClick = new EventEmitter();

  @Output() exportExcel = new EventEmitter();

  @ViewChild('dt1') dt1: any;

  objectkeys = Object.keys;

  mobileScreenWidth!: number;

  isMobile!: boolean;

  first: number = 0;

  rows: number = 30;

  rowsperPageOptions = [20, 30, 40, 50];

  constructor() {}

  ngOnInit(): void {
    this.onResize(null);
  }

  ngOnChanges(): void {
    // console.log(this.displayedColumns);

    // console.log(this.tableData);

    this.fields = this.displayedColumns?.map((item: any) =>
      item?.sortColumn ? item.sortColumn : item.field
    );
  }

  toggleOverlay(event: MouseEvent, index: number): void {
    this.overlayPanels.forEach((panel, i) => {
      if (index == i) {
        panel.toggle(event);
      }
    });
  }

  filterGlobal() {
    this.dt1.filterGlobal(this.filterFields, 'contains');
  }

  clear(table: any) {
    table.filters = {};

    table.clear();

    this.displayedColumns.forEach((data) => {
      data?.['dateValue'] ? (data['dateValue'] = null) : null;
    });
  }

  customFilter(event: any, col: any) {
    if (event) {
      const value = event;

      if (value === '') {
        this.dt1.filter('', col.field, 'equals');
      } else {
        this.dt1.filter(this.formatDate(value), col.field, 'contains');

        this.overlayPanels.forEach((panel, i) => {
          if (col.dateIndex == i) {
            panel.toggle(event);
          }
        });
      }
    }
  }

  formatDate(date: any) {
    let month = date.getMonth() + 1;

    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  isDate(_date: string): boolean {
    const _regExp = new RegExp(
      '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$'
    );

    return _regExp.test(_date);
  }

  isEditEnabled(rowData: any) {
    if (
      rowData.hasOwnProperty('statusKey') &&
      (rowData['statusKey'] == 1 || rowData['statusKey'] == 2)
    ) {
      return true;
    } else {
      return false;
    }
  }

  isConfigEnabled(rowData: any) {
    if (rowData.hasOwnProperty('statusKey') && rowData['statusKey'] == 0) {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobileScreenWidth = window.innerWidth;

    if (this.mobileScreenWidth <= 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  populateMobileActionMenu(col: any, rowData: any): MenuItem[] {
    return col.header.map((action: string) => {
      let icon: string = this.getIconForAction(action, rowData);

      let label = action;

      if (action === 'configure' && this.isConfigEnabled(rowData)) {
        icon = 'pi pi-cog';

        label = 'configure';
      } else if (action === 'configure' && this.isEditEnabled(rowData)) {
        icon = 'pi pi-pencil';

        label = 'edit';
      }

      return {
        label:
          action === 'activate'
            ? rowData['isActive']
              ? 'Deactivate'
              : 'Activate'
            : label,

        icon: icon,

        styleClass: this.getRowCss(col, rowData, action),

        command: () => this.handleAction({ action, rowData }),
      };
    });
  }

  getIconForAction(action: string, rowData: any): string {
    if (action === 'accept') {
      return 'pi pi-check';
    } else if (action === 'reject') {
      return 'pi pi-times';
    } else if (action === 'request') {
      return 'pi pi-question';
    } else if (action === 'configure') {
      return 'pi pi-cog';
    } else if (action === 'edit') {
      return 'pi pi-pencil';
    } else if (action === 'delete') {
      return 'pi pi-trash';
    } else if (action === 'activate') {
      return rowData['isActive'] ? 'pi pi-times' : 'pi pi-check';
    }

    return '';
  }

  handleAction(data: { action: string; rowData: any }): void {
    if (data?.action === 'accept') {
      this.confirmClick.emit(data.rowData);
    } else if (data?.action === 'reject') {
      this.rejectClick.emit(data.rowData);
    } else if (data?.action === 'request') {
      this.requestClick.emit(data.rowData);
    } else if (data?.action === 'issue') {
      this.issueClick.emit(data.rowData);
    } else if (data?.action === 'view') {
      this.viewClick.emit(data.rowData);
    } else if (
      data?.action === 'configure' &&
      this.isConfigEnabled(data.rowData)
    ) {
      this.configureClick.emit(data.rowData);
    } else if (
      data?.action === 'configure' &&
      this.isEditEnabled(data.rowData)
    ) {
      this.editClick.emit(data.rowData);
    } else if (data?.action === 'edit') {
      this.editClick.emit(data.rowData);
    } else if (data?.action === 'delete') {
      this.deleteClick.emit(data.rowData);
    } else if (data?.action === 'activate') {
      // Toggle the 'isActive' property

      this.isMobile
        ? (data.rowData['isActive'] = !data.rowData['isActive'])
        : null;

      this.activateClick.emit(data.rowData);
    }
  }

  handleHeaderCheckboxChange() {
    this.selectedRecords.emit(this.selectedRows);
  }

  onChange(event: any) {
    // console.log(event);

    this.first = Math.round(event.first / event.rows);

    this.onPageChange.emit(event);
  }

  isArray(obj: any): boolean {
    return Array.isArray(obj);
  }

  isObject(obj: any): boolean {
    return typeof obj === 'object' && obj !== null && !(obj instanceof Array);
  }

  rowCss(cssClass: string, condition: boolean): string {
    return condition ? cssClass : '';
  }

  hasTimeZoneOffset(timestamp: string): boolean {
    // Check for the presence of a timezone offset

    return false;
  }

  getRowCss(col: any, rowData: any, action: string): string {
    switch (action) {
      case 'accept':
        return this.rowCss(
          col?.rowStyleClass,

          col?.acceptStyleCondition?.(rowData, action)
        );

      case 'view':
        return this.rowCss(
          col?.rowStyleClass,

          col?.viewStyleCondition?.(rowData, action)
        );

      case 'reject':
        return this.rowCss(
          col?.rowStyleClass,

          col?.rejectStyleCondition?.(rowData, action)
        );

      case 'request':
        return this.rowCss(
          col?.rowStyleClass,

          col?.requestStyleCondition?.(rowData, action)
        );

      case 'issue':
        return this.rowCss(
          col?.rowStyleClass,

          col?.issueStyleCondition?.(rowData, action)
        );

      case 'configure':
        return this.rowCss(
          col?.rowStyleClass,

          col?.configureStyleCondition?.(rowData, action)
        );

      case 'edit':
        return this.rowCss(
          col?.rowStyleClass,

          col?.editStyleCondition?.(rowData, action)
        );

      case 'delete':
        return this.rowCss(
          col?.rowStyleClass,

          col?.deleteStyleCondition?.(rowData, action)
        );

      default:
        return ''; // Handle other actions if necessary
    }

    return ''; // Default return if no condition matched
  }
}
