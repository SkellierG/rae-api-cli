import type { ErrorResponse, RandomParams, WordOnlyResponse } from "./interface/api.js";

export async function getRandom(params: RandomParams): Promise<WordOnlyResponse | null> {
  try {
    let url_params: string = ""

    if (params.min_length) url_params += "min_length=" + params.min_length + "&";

    if (params.max_length) url_params += "max_length=" + params.max_length + "&";

    const response: Response = await fetch(`https://rae-api.com/api/random?${url_params}`);

    if (!response.ok) throw new Error(response.status + " " + response.statusText);

    const responseJson: ErrorResponse = await response.json() as ErrorResponse;

    if (!responseJson.ok) throw new Error(responseJson.error);

    return responseJson as unknown as WordOnlyResponse;

  } catch (error: any) {
    console.error(error);
    return null;
  }
}
