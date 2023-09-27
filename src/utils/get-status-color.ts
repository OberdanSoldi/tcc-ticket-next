export function getStatusColor(status: string) {
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
