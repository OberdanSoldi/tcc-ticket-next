export interface Ticket {
  id: string;
  computer_id: string;
  date: Date;
  status: string;
  assigned_to: string;
  created_by: string;
  description: string;
  priority: string;
}
