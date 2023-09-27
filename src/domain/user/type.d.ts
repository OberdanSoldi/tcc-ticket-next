export type IUserResponse = IUser[];

export interface IUser {
  id: string;
  role: UserRole;
  email: string;
  name: string;
}
