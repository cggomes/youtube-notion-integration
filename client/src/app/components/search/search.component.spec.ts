import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SearchComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value on #field when input changes', () => {
    const compiled = fixture.debugElement;
    const input = compiled.query(By.css('input')).nativeElement;
    const value = 'Test';

    input.value = value;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.field)
      .withContext('search component should have value')
      .toBe('Test');
  });

  it('should call #writeValue and set #field', () => {
    const value = 'testdev';

    spyOn(component, 'onChange').and.callThrough();
    spyOn(component, 'onTouch').and.callThrough();

    component.writeValue(value);

    expect(component.onChange)
      .withContext('component #onChange must be called once with value')
      .toHaveBeenCalledOnceWith('testdev');
    expect(component.onTouch)
      .withContext('component #onTouch must be called once with value')
      .toHaveBeenCalledOnceWith('testdev');
    expect(component.field)
      .withContext('component #field must be equal to value')
      .toBe('testdev');
  });

  it('#onTouch should be NOT null when #registerOnChange is called', () => {
    const fnValue = () => {};
    component.onChange = null;

    expect(component.onChange).toBeNull();

    component.registerOnChange(fnValue);

    expect(component.onChange).toEqual(fnValue);
  });

  it('#onTouch should be NOT null when #registerOnTouched is called', () => {
    const fnValue = () => {};
    component.onTouch= null;

    expect(component.onTouch).toBeNull();

    component.registerOnTouched(fnValue);

    expect(component.onTouch).toEqual(fnValue);
  });
});
