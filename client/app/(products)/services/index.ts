import { env } from "@/config/env";
import axios from "axios";

export const upload = async (formData: FormData): Promise<UploadResponse> => {
  const response = await axios.post(
    `${env.API_GATEWAY}/converter/office-to-pdf`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

interface UploadResponse {
  message: string;
  jobId: string;
}
