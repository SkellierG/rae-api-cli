import type { ErrorResponse, WordOnlyResponse } from "./interface/api.js";

export async function getDaily(): Promise<WordOnlyResponse | null> {
  try {
    const response: Response = await fetch("https://rae-api.com/api/daly/");

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const responseJson: ErrorResponse = await response.json() as ErrorResponse;

    if (!responseJson.ok) throw new Error(responseJson.error)

    return responseJson as unknown as WordOnlyResponse;

  } catch (error: any) {
    console.error(error);
    return null;
  }
}
