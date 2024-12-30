export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}
