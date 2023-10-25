import type { User } from "@/domain/User";

class UserConverter {
  convertToPortuguese(users: User[]): User[] {
    return users.map((it) => {
      switch (it.role.toLowerCase()) {
        case "admin":
          return {
            ...it,
            role: "Administrador",
          };
        case "user":
          return {
            ...it,
            role: "Usuário",
          };
        case "technician":
          return {
            ...it,
            role: "Técnico",
          };
        default:
          return it;
      }
    });
  }
}

const userConverter = new UserConverter();
export { userConverter };
