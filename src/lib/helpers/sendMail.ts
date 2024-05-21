import type {
  EmailSuccessResponse,
  EmailErrorResponse,
  EmailData,
} from "../types/mailTypes";

import type {
  ServerSuccessResponse,
  ServerErrorResponse,
} from "../types/serverResponse";

export async function sendEmail(
  data: EmailData,
): Promise<EmailSuccessResponse | EmailErrorResponse> {
  const apiEndpoint = "http:localhost:3000/api/email";
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Here, we handle HTTP error statuses
      const responseData = (await response.json()) as
        | ServerSuccessResponse
        | ServerErrorResponse;
      if (!response.ok) {
        // Handle HTTP error statuses
        return {
          error: true,
          message:
            (responseData as ServerErrorResponse).message ||
            "Something went wrong!",
        };
      }
    }

    const responseData = (await response.json()) as
      | ServerSuccessResponse
      | ServerErrorResponse;

    if (!response.ok) {
      // Handle HTTP error statuses
      return {
        error: true,
        message:
          (responseData as ServerErrorResponse).message ||
          "Something went wrong!",
      };
    }

    return {
      message: responseData.message || "Your message sent successfully!",
    };
  } catch (err) {
    console.error(err);
    return {
      error: true,
      message: "Something went wrong while sending the email.",
    };
  }
}
