import axios, { AxiosError } from "axios";

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

export function getApiErrorMessage(error: unknown): string {
  if (!error) return "An unexpected error occurred.";

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      const data = error.response.data as any;
      const message =
        typeof data?.message === "string" ? data.message : undefined;

      if (status === 404) {
        return "Resource not found.";
      }

      if (status === 403) {
        if (message?.toLowerCase().includes("rate limit")) {
          return "GitHub API rate limit exceeded. Try again in a few minutes.";
        }

        return "Request forbidden. Please try again later.";
      }

      if (status >= 500) {
        return "GitHub is currently unavailable. Please try again later.";
      }

      return message || `Request failed with status ${status}.`;
    }

    if (error.request) {
      return "Network error. Please check your connection and try again.";
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
