interface Login {
  isLogin: boolean;
  form: Form;
  token: string | null;
  userId: string;
}

interface Form {
  email: string;
  password: string;
  repeatedPassword: string;
  rememberMe: boolean;
}
