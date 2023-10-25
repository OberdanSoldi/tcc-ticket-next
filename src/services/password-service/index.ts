import { EXTERNAL_API_URL } from "@/config/clientEnvScheme";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

class PasswordService {
  private readonly _EXTERNAL_API_URL = EXTERNAL_API_URL!;

  public async requestReset(email: string) {
    try {
      await fetchWrapper.post(
        `${this._EXTERNAL_API_URL}/auth/forgot-password`,
        { email }
      );
    } catch (ex) {
      throw ex;
    }
  }

  public async resetPassword(
    id: string,
    password: string,
    confirmationPassword: string
  ) {
    try {
      await fetchWrapper.post(
        `${this._EXTERNAL_API_URL}/auth/reset-password/${id}`,
        {
          password,
          passwordConfirm: confirmationPassword,
        }
      );
    } catch (ex) {
      throw ex;
    }
  }
}

const passwordService = new PasswordService();
export { passwordService };
