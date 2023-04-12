interface Login {
  isLogin: boolean;
  form: Form;
}

interface Form {
  email: string;
  password: string;
  repeatedPassword: string;
  rememberMe: boolean;
}
