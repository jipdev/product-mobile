import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit, OnChanges {
  @Output() onSubmit = new EventEmitter<Product>();
  @Input() initialValue!: Product;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('initialValue' in changes && this.initialValue) {
      this.updateForm();
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      fabrication: [null, Validators.required],
      price: [null, Validators.required],
      size: [null, Validators.required],
    });
  }

  updateForm(): void {
    this.form.patchValue(this.initialValue);
    this.form.updateValueAndValidity();
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).touched && this.form.get(field).hasError(error);
  }
}
