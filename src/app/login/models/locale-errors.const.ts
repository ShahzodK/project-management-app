export const signUpErrorsLocale = {
  name: {
    required: 'login-module.signup-errors.name.required',
    minLength: 'login-module.signup-errors.name.minlength',
  },
  email: {
    required: 'login-module.signup-errors.email.required',
    email: 'login-module.signup-errors.email.email',
  },
  password: {
    required: 'login-module.signup-errors.password.required',
    enough_chars: 'login-module.signup-errors.password.enough_chars',
    lowercase: 'login-module.signup-errors.password.lowercase',
    uppercase: 'login-module.signup-errors.password.uppercase',
    numeric: 'login-module.signup-errors.password.numeric',
    specials: 'login-module.signup-errors.password.specials'
  }
};

export const signInErrorsLocale = {
  email: {
    required: 'login-module.signin-errors.email.required',
    email: 'login-module.signin-errors.email.email',
  },
  password: {
    required: 'login-module.signin-errors.password.required',
  },
};
