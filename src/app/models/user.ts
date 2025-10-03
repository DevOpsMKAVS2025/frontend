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