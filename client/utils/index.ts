import { AxiosError } from "axios";

export function getServerErrorMessage(error: unknown) {
  let message = "Sorry, something went wrong. Please try again later.";
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      message = error.response.data.message;
    }
  }
  return message;
}
