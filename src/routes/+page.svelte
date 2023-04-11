<script lang="ts">
  import Input from "$lib/components/input.svelte";
  import { add_shortlink } from "$lib/utils/shortlyApi";
  import { api_key_store, base_url_store } from "$lib/utils/stores";
  import { writable } from "svelte/store";

  import type { PageData, ActionData } from "./$types";
  import { get_store_value } from "svelte/internal";


  export let form: ActionData | null;

  let long_url_store = writable<string>("");
  let short_url_store = writable<string>("");
</script>

<svelte:head>
  <title>Shortly Web</title>
</svelte:head>

<h2 class="card-title">Shortly Web</h2>
<div class="flex flex-col gap-4">
  <form method="POST">
    <div>
      <p>Config</p>
      <div class="flex flex-row gap-2">
        <Input
          type="text"
          placeholder="Base URL"
          label="Base URL"
          value_store="{base_url_store}"
          id="base_url"
          required
        />
        <Input
          type="password"
          placeholder="Admin Key"
          label="Admin Key"
          value_store="{api_key_store}"
          id="api_key"
          required
        />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <Input
        type="text"
        placeholder="Long URL"
        label="Long URL"
        required
        value_store="{long_url_store}"
        id="long_url"
      />
      <Input
        type="text"
        placeholder="Short URL"
        label="Short URL"
        required
        value_store="{short_url_store}"
        id="short_suffix"
      />
      <button type="submit" class="btn btn-primary">Shorten!</button>
    </div>
  </form>

  <div class="toast">
    {#if form?.error !== undefined && form?.error !== null}
      <div class="alert alert-error">
        <div class="alert-title">Error</div>
        <div class="alert-description">{form.error}</div>
      </div>
    {/if}

    {#if form !== null && form?.result !== undefined && form?.result !== null}
      <div class="alert alert-success">
        <div
          class="alert-description cursor-pointer"
          on:click="{() =>
            navigator.clipboard.writeText(
              `${get_store_value(base_url_store)}/${form.result.suffix}`
            )}"
          on:keydown="{(e) => {
            if (e.key === 'Enter') {
              navigator.clipboard.writeText(
                `${get_store_value(base_url_store)}/${form.result.suffix}`
              );
            }
          }}"
        >
          Click to copy: <span class="font-mono">{$base_url_store}/{form.result.suffix}</span>
        </div>
      </div>
    {/if}
  </div>
</div>
