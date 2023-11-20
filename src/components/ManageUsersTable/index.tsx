import type { User } from "@/domain/User";
import { Card, CardContent } from "@mui/material";

import style from "./style.module.scss";
import React from "react";
import { userService } from "@/services/user-service";
import { DeleteUser } from "./DeleteUser";
import { BottomToolbar } from "./BottomToolbar";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";

const ManageUsersTable: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const response = await userService.getUsers();
    setUsers(response);
    setLoading(false);
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
            state={{ isLoading: loading }}
            muiCircularProgressProps={{
              color: "secondary",
              thickness: 5,
              size: 55,
            }}
            muiSkeletonProps={{
              animation: "pulse",
              height: 28,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export { ManageUsersTable };
