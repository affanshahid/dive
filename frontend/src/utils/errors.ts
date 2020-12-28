export async function extractResponseError(err: Response): Promise<string> {
  return (await err.json()).message;
}

export async function extractError(err: any): Promise<string> {
  if (err instanceof Response) return await extractResponseError(err);
  else return err.message;
}

export async function throwErrorMessage(err: any): Promise<never> {
  throw new Error(await extractError(err));
}
