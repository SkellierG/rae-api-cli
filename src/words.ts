import type { ErrorResponse, WordEntryResponse, WordsParams } from "./interface/api.js";

export async function getWords(params: WordsParams): Promise<WordEntryResponse | null> {
  try {
    if (!params.palabra) throw new Error("this fetch needs a param")

    const response: Response = await fetch(`https://rae-api.com/api/words/${params.palabra}`);

    if (!response.ok) throw new Error(response.status + " " + response.statusText);

    const responseJson: ErrorResponse = await response.json() as ErrorResponse;

    if (!responseJson.ok) throw new Error(responseJson.error);

    return responseJson as unknown as WordEntryResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
}
