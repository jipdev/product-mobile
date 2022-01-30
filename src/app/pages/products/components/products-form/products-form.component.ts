import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Product>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      fabrication: [null, Validators.required],
      price: [null, Validators.required],
      size: [null, Validators.required],
    });
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
