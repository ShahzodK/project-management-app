import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PasswordStrengthErrors, PasswordStrengthErrorsKey } from '../models/auth.model';

export function passwordStrengthValidator(): ValidatorFn {
  const getErrors = (errors: PasswordStrengthErrors): PasswordStrengthErrors => {
    const errorsNames = Object.keys(errors) as PasswordStrengthErrorsKey[];

    return errorsNames.reduce((accumulator, errorName) => {
      if (!errors[errorName]) return accumulator;

      return { ...accumulator, [errorName]: true };
    }, {});
  };

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasEnoughChars = value.length >= 8;

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const hasSpecials = /[!@#$%^&*(),.?":{}|<>]/g.test(value);

    const isValidPassword =
      hasEnoughChars && hasUpperCase && hasLowerCase && hasNumeric && hasSpecials;

    const errors = {
      hasEnoughChars: !hasEnoughChars,
      hasUpperCase: !hasUpperCase,
      hasLowerCase: !hasLowerCase,
      hasNumeric: !hasNumeric,
      hasSpecials: !hasSpecials,
    };

    return !isValidPassword ? getErrors(errors) : null;
  };
}
