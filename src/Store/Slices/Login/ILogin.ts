interface Login {
  isLogin: boolean;
  form: Form;
  token: string | null;
}

interface Form {
  email: string;
  password: string;
  repeatedPassword: string;
  rememberMe: boolean;
}
