export async function extractResponseError(err: Response): Promise<string> {
  return (await err.json()).message;
}
