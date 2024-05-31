import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../modules/shared.modules';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [SharedModule, NgClass],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss',
})
export class ActionButtonsComponent implements OnInit {
  @Input() action: any;

  @Input() rowData: any;

  @Input() col: any;

  @Output() actionClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

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

  rowCss(cssClass: string, condition: boolean): string {
    return condition ? cssClass : '';
  }
}
