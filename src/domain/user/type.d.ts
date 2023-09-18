export interface IUserResponse {
  users: User[];
}

export interface IUser {
  id: string;
  role: UserRole;
  email: string;
  name: string;
}
