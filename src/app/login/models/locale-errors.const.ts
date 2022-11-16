export const signUpErrorsLocale = {
  name: {
    required: 'auth.forms.errors.client.name.required',
    minLength: 'auth.forms.errors.client.name.minlength',
  },
  email: {
    required: 'auth.forms.errors.client.email.required',
    email: 'auth.forms.errors.client.email.email',
  },
  password: {
    required: 'auth.forms.errors.client.password.required',
    enough_chars: 'auth.forms.errors.client.password.enough_chars',
    lowercase: 'auth.forms.errors.client.password.lowercase',
    uppercase: 'auth.forms.errors.client.password.uppercase',
    numeric: 'auth.forms.errors.client.password.numeric',
    specials: 'auth.forms.errors.client.password.specials',
  },
};

export const signInErrorsLocale = {
  email: {
    required: 'auth.forms.errors.client.email.required',
    email: 'auth.forms.errors.client.email.email',
  },
  password: {
    required: 'auth.forms.errors.client.password.required',
  },
};
