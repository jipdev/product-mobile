import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsFormComponent } from './products-form.component';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsFormComponent],
      providers: [FormBuilder, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const buildFormSpy = spyOn(component, 'buildForm').and.stub();

    component.ngOnInit();

    expect(buildFormSpy).toHaveBeenCalled();
  });

  it('should be buildForm', () => {
    const groupSpy = spyOn(formBuilder, 'group').and.stub().and.returnValue(new FormGroup({}));

    component.buildForm();

    expect(component.form).toBeDefined();
    expect(groupSpy).toHaveBeenCalledWith({
      name: [null, Validators.required],
      fabrication: [null, Validators.required],
      price: [null, Validators.required],
      size: [null, Validators.required],
    });
  });

  it('should be submit', () => {
    component.form = new FormGroup({
      test: new FormControl(1)
    });

    const markAllAsTouchedSpy = spyOn(component.form, 'markAllAsTouched').and.stub();
    const validSpy = spyOnProperty(component.form, 'valid', 'get').and.returnValue(true);
    const emitSpy = spyOn(component.onSubmit, 'emit').and.stub();

    component.submit();

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(validSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith({ test: 1 });
  });

  it('should be submit when form is invalid', () => {
    component.form = new FormGroup({
      test: new FormControl(null)
    });

    const markAllAsTouchedSpy = spyOn(component.form, 'markAllAsTouched').and.stub();
    const validSpy = spyOnProperty(component.form, 'valid', 'get').and.returnValue(false);
    const emitSpy = spyOn(component.onSubmit, 'emit').and.stub();

    component.submit();

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(validSpy).toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should be hasError return false', () => {
    component.form = new FormGroup({
      test: new FormControl(1, Validators.required)
    });

    component.form.markAllAsTouched();

    expect(component.hasError('test', 'required')).toBeFalse();
  });

  it('should be hasError return true', () => {
    component.form = new FormGroup({
      test: new FormControl(null, Validators.required)
    });

    component.form.markAllAsTouched();

    expect(component.hasError('test', 'required')).toBeTrue();
  });
});
