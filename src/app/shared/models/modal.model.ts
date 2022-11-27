export interface FormField {
  label: string;
  name: string;
  value?: string;
}

export interface ModalData {
  title: string;
  formFields: FormField[],
}

export type ColumnResult = {
  title: string;
}

export type TaskResult = {
  title: string;
  description: string;
}

export type BoardResult = {
  title: string;
}

export type ModalResult<T> = T | false
