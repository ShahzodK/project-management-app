import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalData } from '../../models/modal.model';

export interface FormValues {
  [name: string]: string,
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  public formValues: FormValues = {};

  @ViewChild('modalForm') modalForm!: NgForm;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
  ) {}


  ngOnInit(): void {
    this.data.formFields.forEach(field => {
      this.formValues[field.name as keyof FormValues] = field.value || '';
    });

    setTimeout(() => this.modalForm.setValue(this.formValues))
  }

  public save(form: NgForm): void {
    const isSame = this.data.formFields.every(field => field.value === this.formValues[field.name]);

    if (isSame) {
      this.dialogRef.close(false);
      return;
    }

    this.dialogRef.close(form.value);
  }
}
