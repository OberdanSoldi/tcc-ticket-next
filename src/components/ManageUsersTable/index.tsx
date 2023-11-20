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
              thickness: 3,
              size: 40,
            }}
            muiSkeletonProps={{
              animation: "pulse",
              height: 1,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export { ManageUsersTable };
