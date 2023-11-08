"use client";
import MaterialReactTable, { type MRT_ColumnDef } from "material-react-table";
import React from "react";
import { Card, CardContent } from "@mui/material";
import type { Ticket } from "@/domain/Ticket";
import { ticketService } from "@/services/ticket-service";
import { SeeFullTicket } from "./SeeFullTicket";
import { getStatusColor } from "@/utils/get-status-color";
import { userService } from "@/services/user-service";
import { UserRole } from "@/domain/enums/UserRole";

import style from "./style.module.scss";

const HistoryTable: React.FC = () => {
  const [userRole, setUserRole] = React.useState<UserRole>();
  const [tickets, setTickets] = React.useState<Ticket[]>([]);

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
    const tickets = await ticketService.getAllTickets();
    setTickets(tickets);
  }

  async function fetchUserTickets() {
    const tickets = await userService.getTicketsCreatedByUser();
    setTickets(tickets);
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export { HistoryTable };
