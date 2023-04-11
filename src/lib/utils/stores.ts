import { PersistentStore } from "./persistantStore";

export const base_url_store = new PersistentStore<string>("base_url", "");
export const api_key_store = new PersistentStore<string>("api_key", "");