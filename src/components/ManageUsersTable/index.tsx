import type { User } from "@/domain/User";
import { Card, CardContent } from "@mui/material";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";

import style from "./style.module.scss";
import React from "react";
import { userService } from "@/services/user-service";
import { DeleteUser } from "./DeleteUser";
import { BottomToolbar } from "./BottomToolbar";

const ManageUsersTable: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  async function fetchUsers() {
    const response = await userService.getUsers();
    setUsers(response);
  }

  const tableColumns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Cargo",
    },
  ];

  const fakeData: User[] = [
    {
      email: "email@example.com",
      name: "John Doe",
      role: "Administrador",
      id: "2",
    },
    {
      email: "email@example.com",
      name: "John Doe",
      role: "Administrador",
      id: "3",
    },
    {
      email: "email@example.com",
      name: "John Doe",
      role: "Administrador",
      id: "1",
    },
  ];

  return (
    <div className={style.wrapper}>
      <Card className={style.container}>
        <CardContent>
          <h2>Gerenciar Usuários</h2>
        </CardContent>
        <CardContent>
          <MaterialReactTable
            columns={tableColumns}
            data={users}
            enableColumnActions={false}
            enableColumnFilters={false}
            enableSorting={false}
            enableFilters={false}
            enableTopToolbar={false}
            enableBottomToolbar={true}
            enableRowActions={true}
            enableStickyHeader
            muiTableContainerProps={{ sx: { maxHeight: "550px" } }}
            renderBottomToolbar={({ table }) => <BottomToolbar table={table} />}
            renderRowActions={({ row, table }) => (
              <DeleteUser fetchUsers={fetchUsers} row={row} table={table} />
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export { ManageUsersTable };
