import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchComponent,
      multi: true,
    }
  ]
})
export class SearchComponent implements ControlValueAccessor {

  field = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(value: string) {
    this.field = value;
    this.onChange(value);
    this.onTouch(value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
