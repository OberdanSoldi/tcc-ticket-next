import MaterialReactTable, { type MRT_ColumnDef } from "material-react-table";
import React from "react";
import { Card, CardContent } from "@mui/material";
import type { Ticket } from "@/domain/Ticket";
import { ticketService } from "@/services/ticket-service";

import style from "./style.module.scss";
import { SeeFullTicket } from "./SeeFullTicket";

const HistoryTable: React.FC = () => {
  const isUserAdmin = true;
  const [tickets, setTickets] = React.useState<Ticket[]>([]);

  async function fetchTickets() {
    const response = await ticketService.getAllTickets();
    setTickets(response);
  }

  React.useEffect(() => {
    fetchTickets();
  }, []);

  function getStatusColor(status: string) {
    switch (status) {
      case "Aberto":
        return "statusSpanColumn-open";
      case "Fechado":
        return "statusSpanColumn-close";
      case "Em andamento":
        return "statusSpanColumn-inProgress";
      default:
        return "";
    }
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

  const tableColumns = isUserAdmin ? adminTableColumns : [];

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
            enableSorting={false}
            enableFilters={false}
            enableTopToolbar={false}
            enableEditing
            enableBottomToolbar={false}
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
