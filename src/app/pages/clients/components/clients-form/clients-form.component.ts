import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../interfaces/client';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent implements OnInit, OnChanges {
  @Output() onSubmit = new EventEmitter<Client>();
  @Input() initialValue!: Client;

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
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, Validators.required],
      gender: [null, Validators.required],
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
