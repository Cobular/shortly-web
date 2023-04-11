export interface Result {
  suffix: string;
  url: string;
}

export interface AddShortlinkResponse {
  error: string | null;
  result: Result | null;
}

export function is_result(x: unknown): x is Result {
  return typeof x === "object" && x !== null && "suffix" in x && "url" in x;
}

export function is_add_shortlink_response(
  x: unknown
): x is AddShortlinkResponse {
  const base =
    typeof x === "object" && x !== null && "error" in x && "result" in x;
  if (!base) return false;

  // If error is null, result must be a Result
  if (x.error === null) return is_result(x.result);

  // Otherwise, error must be a string and result must be null
  return typeof x.error === "string" && x.result === null;
}

export async function add_shortlink(
  fetch_fn: typeof fetch,
  long_url: string,
  short_suffix: string,
  base_url: string,
  api_key: string
): Promise<AddShortlinkResponse> {
  console.log("base_url", base_url);

  const res = await fetch_fn(`${base_url}/api/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${api_key}`,
    },
    body: new URLSearchParams({
      url: long_url,
      suffix: short_suffix,
    }),
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to add shortlink");
  }

  const link = await res.json();

  if (!is_add_shortlink_response(link)) {
    console.error(link);
    throw new Error("Failed to add shortlink");
  }

  return link;
}
