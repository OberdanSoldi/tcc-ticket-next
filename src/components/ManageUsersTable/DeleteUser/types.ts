import { User } from "@/domain/User";
import { MRT_Row, MRT_TableInstance } from "material-react-table";

export interface DeleteUserProps {
  row: MRT_Row<User>;
  table: MRT_TableInstance<User>;
  fetchUsers: () => void;
}
