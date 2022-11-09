export const signUpErrorsLocale = {
  name: {
    required: 'login-module.form-errors.name.required',
    minLength: 'login-module.form-errors.name.minlength',
  },
  email: {
    required: 'login-module.form-errors.email.required',
    email: 'login-module.form-errors.email.email',
  },
  password: {
    required: 'login-module.form-errors.password-signup.required',
    enough_chars: 'login-module.form-errors.password-signup.enough_chars',
    lowercase: 'login-module.form-errors.password-signup.lowercase',
    uppercase: 'login-module.form-errors.password-signup.uppercase',
    numeric: 'login-module.form-errors.password-signup.numeric',
    specials: 'login-module.form-errors.password-signup.specials',
  },
};

export const signInErrorsLocale = {
  email: {
    required: 'login-module.form-errors.email.required',
    email: 'login-module.form-errors.email.email',
  },
  password: {
    required: 'login-module.form-errors.password-signin.required',
  },
};
