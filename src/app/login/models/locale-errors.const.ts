export const signUpErrorsLocale = {
  name: {
    required: 'auth.errors.client.name.required',
    minLength: 'auth.errors.client.name.minlength',
  },
  email: {
    required: 'auth.errors.client.email.required',
    email: 'auth.errors.client.email.email',
  },
  password: {
    required: 'auth.errors.client.password.required',
    enough_chars: 'auth.errors.client.password.enough_chars',
    lowercase: 'auth.errors.client.password.lowercase',
    uppercase: 'auth.errors.client.password.uppercase',
    numeric: 'auth.errors.client.password.numeric',
    specials: 'auth.errors.client.password.specials',
  },
};

export const signInErrorsLocale = {
  email: {
    required: 'auth.errors.client.email.required',
    email: 'auth.errors.client.email.email',
  },
  password: {
    required: 'auth.errors.client.password.required',
  },
};
