import { add_shortlink } from "$lib/utils/shortlyApi";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  /**
   * Make the request to the shortly API to add a new link.
   */
  default: async ({ request, fetch }) => {
    const data = await request.formData();

    const long_url = data.get("long_url");
    const short_suffix = data.get("short_suffix");
    const base_url = data.get("base_url");
    const api_key = data.get("api_key");

    if (!long_url || !short_suffix || !base_url || !api_key) {
      return fail(400, { error: "Missing required fields" });
    }

    try {
      console.log("long_url", long_url);
      
      const shortlink = await add_shortlink(
        fetch,
        long_url.toString(),
        short_suffix.toString(),
        base_url.toString(),
        api_key.toString()
      );

      console.log("shortlink", shortlink);

      return shortlink;
    } catch (e) {
      console.error();

      if (e instanceof Error) return fail(500, { error: e.message });
      else return fail(500, { error: "Unknown error" });
    }
  },
} satisfies Actions;
