import type { Ticket } from "@/domain/Ticket";

export const mockedData: Ticket[] = [
  {
    assigned_to: "John Doe",
    title: "This is a ticket title",
    computer_id: "123456",
    created_by: "Jane Doe",
    date: new Date().toLocaleDateString(),
    description: "This is a ticket description",
    id: "123456",
    priority: "High",
    status: "Open",
    problemType: "Hardware",
  },
  {
    assigned_to: "John Doe II",
    title: "This is a ticket title",
    computer_id: "234234",
    created_by: "Jane Doe II",
    date: new Date().toLocaleDateString(),
    description: "This is a ticket description",
    id: "7890",
    priority: "High",
    status: "Open",
    problemType: "Software",
  },
];
