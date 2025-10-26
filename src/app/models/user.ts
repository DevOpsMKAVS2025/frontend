export enum UserRole{
  Guest = "Guest",
  Host = "Host",
}
export interface LoginCredentials {
  email: string,
  password: string
}
export interface UserData{
  userId: string,
  userEmail: string,
  userRole: UserRole,
  username: string,
}

export interface AccessTokenResponse {
  accessToken: string
}
export interface Principal {
  id: string;
  role: string;
  email: string;
  username: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  username: string;
  type: string;
}
