import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { SharedModule } from '../../modules/shared.modules';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [SharedModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements AfterViewInit {
  get control(): any {
    return this.controlContainer?.control?.get(this.formControlName);
  }

  constructor(
    @Optional() private controlContainer: ControlContainer,
    private detectChanges: ChangeDetectorRef
  ) {}

  @Input() formControlName!: string;

  @Input() isAmount = false;

  @Input() placeHolder!: string;

  @Input() isRequired!: boolean;

  @Input() inpType: string = 'text';

  @Input() maxLength!: string;

  @Input() minLength!: string;

  @Input() className!: string;

  @Input() customDirective!: string;

  @Input() readOnly = false;

  @Output() controlValue = new EventEmitter();

  @Output() inputEvent = new EventEmitter();

  @Output() pasteValue = new EventEmitter();

  @Input() inpValue!: string | number;

  @Input() errMsg!: string;

  @Input() patternErrMsg!: string;

  // errorMessages = lfMessage;

  input!: string;

  // Define what should happen in this component, if something changes outside

  onChange: any = () => {};

  onTouch: any = () => {};

  ngAfterViewInit(): void {
    this.detectChanges.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(input: string) {
    this.input = input;
  }
}
