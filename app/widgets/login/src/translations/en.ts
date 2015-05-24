module LoginTranslations {
  export var en = {
    login: {
      title: 'Login',
      userName: 'user name',
      password: 'password',
      submit: 'login',
      error: {
        userName: {
          required: 'Please enter an user name'
        },
        password: {
          required: 'Please enter a password'
        }
      }
    },
    register: {
      title: 'Register',
      email: 'email',
      userName: 'user name',
      password: 'password',
      confirmPassword: 'confirm password',
      register: 'register',
      error: {
        email: {
          required: 'Please enter an email',
          email: 'The provided email is incorrect'
        },
        userName: {
          required: 'Please enter an user name'
        },
        password: {
          required: 'Please enter a password'
        },
        confirmPassword: {
          required: 'Please retype your password',
          match: 'Your entered passwords do not match'
        }
      }
    }
  };
}
