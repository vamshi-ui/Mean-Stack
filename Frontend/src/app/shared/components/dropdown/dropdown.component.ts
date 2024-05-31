import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { SharedModule } from '../../modules/shared.modules';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [SharedModule, NgClass],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropDownComponent implements OnInit, AfterViewInit {
  get control(): any {
    return this.controlContainer?.control?.get(this.formControlName);
  }

  constructor(
    private controlContainer: ControlContainer,

    private detectChanges: ChangeDetectorRef
  ) {}

  @Input() formControlName!: string;

  @Input() placeHolder!: string;

  @Input() isRequired!: boolean;

  @Input() filter = true;

  @Input() multiSelect = false;

  @Input() readOnly = false;

  @Input() showClear = true;

  @Input() dropdwnList!: any[];

  @Input() name!: string;

  @Input() id!: string;

  @Output() selectionChange = new EventEmitter();

  input!: string;

  onChange: any = () => {};

  onTouch: any = () => {};

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.detectChanges.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // Define what should happen in this component, if something changes outside

  writeValue(input: string) {
    this.input = input;
  }
}
