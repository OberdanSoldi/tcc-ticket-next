import { Card, CardContent } from "@mui/material";
import type { Ticket } from "@/domain/Ticket";
import { TicketTableActions } from "./TicketTableActions";
import { getStatusColor } from "@/utils/get-status-color";
import { ticketService } from "@/services/ticket-service";
import React from "react";

import style from "./style.module.scss";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";

const ManageTicketsTable: React.FC = () => {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  async function fetchTickets() {
    setLoading(true);
    const response = await ticketService.getAllTickets();
    setTickets(response.filter((ticket) => ticket.status !== "Fechado"));
    setLoading(false);
  }

  React.useEffect(() => {
    fetchTickets();
  }, []);

  const tableColumns: MRT_ColumnDef<Ticket>[] = [
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

  return (
    <div className={style.wrapper}>
      <Card className={style.container}>
        <CardContent>
          <h2>Gerenciar Tickets</h2>
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
            enableStickyHeader
            enableBottomToolbar={false}
            muiTableContainerProps={{ sx: { maxHeight: "550px" } }}
            localization={{
              noRecordsToDisplay: "Nenhum ticket encontrado",
            }}
            renderRowActions={({ row, table }) => (
              <TicketTableActions
                fetchTickets={fetchTickets}
                row={row}
                table={table}
              />
            )}
            state={{ isLoading: loading }}
            muiCircularProgressProps={{
              color: "secondary",
              thickness: 5,
              size: 40,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export { ManageTicketsTable };
