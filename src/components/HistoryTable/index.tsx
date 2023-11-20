"use client";
import React from "react";
import { Card, CardContent } from "@mui/material";
import type { Ticket } from "@/domain/Ticket";
import { ticketService } from "@/services/ticket-service";
import { SeeFullTicket } from "./SeeFullTicket";
import { getStatusColor } from "@/utils/get-status-color";
import { userService } from "@/services/user-service";
import { UserRole } from "@/domain/enums/UserRole";

import style from "./style.module.scss";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";

const HistoryTable: React.FC = () => {
  const [userRole, setUserRole] = React.useState<UserRole>();
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    userService.getUserRole().then((role) => {
      setUserRole(role);
    });
  }, []);

  React.useEffect(() => {
    if (userRole !== undefined) {
      (async () => {
        switch (userRole) {
          case UserRole.ADMIN:
          case UserRole.TECHNICIAN:
            await fetchAllTickets();
            break;
          case UserRole.USER:
            await fetchUserTickets();
            break;
          default:
            return;
        }
      })();
    }
  }, [userRole]);

  async function fetchAllTickets() {
    setLoading(true);
    const tickets = await ticketService.getAllTickets();
    setTickets(tickets);
    setLoading(false);
  }

  async function fetchUserTickets() {
    setLoading(true);
    const tickets = await userService.getTicketsCreatedByUser();
    setTickets(tickets);
    setLoading(false);
  }

  const adminTableColumns: MRT_ColumnDef<Ticket>[] = [
    {
      accessorKey: "title",
      header: "Título",
    },
    {
      accessorKey: "problemType",
      header: "Tipo",
    },
    {
      accessorKey: "priority",
      header: "Prioridade",
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell }) => {
        return (
          <span
            className={`statusSpanColumn ${
              style[getStatusColor(cell.getValue<string>())]
            }`}
          >
            {cell.getValue<string>()}
          </span>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Data",
    },
  ];

  const tableColumns = adminTableColumns;

  return (
    <div className={style.wrapper}>
      <Card className={style.card}>
        <CardContent>
          <h2>Histórico de tickets</h2>
        </CardContent>
        <CardContent>
          <MaterialReactTable
            columns={tableColumns}
            data={tickets}
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
            enableFilters={false}
            enableTopToolbar={false}
            enableEditing
            enableStickyHeader
            enableStickyFooter
            enableBottomToolbar={false}
            localization={{
              noRecordsToDisplay: "Nenhum ticket encontrado",
            }}
            muiTableContainerProps={{ sx: { maxHeight: "550px" } }}
            renderRowActions={({ row, table }) => (
              <SeeFullTicket row={row} table={table} />
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

export { HistoryTable };
