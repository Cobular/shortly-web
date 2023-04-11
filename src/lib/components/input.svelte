<script lang="ts">
  import type { PersistentStore } from "$lib/utils/persistantStore";
  import type { Writable } from "svelte/store";

  export let label: string;
  export let placeholder: string;
  export let type: "text" | "password" = "text";
  export let value_store: Writable<string>;
  export let required: boolean = false;
  export let id: string | undefined = undefined;

  function typeAction(node: HTMLInputElement) {
      node.type = type;
  }
  
  let input_id = id ?? Math.random().toString(36).substr(2, 9);
</script>

<div class="form-control w-full max-w-xs">
  <label class="label" for={input_id} >
    <span class="label-text">{label}</span>
  </label>
  <input id={input_id} name={input_id} use:typeAction placeholder={placeholder} bind:value={$value_store} {required} class="input input-bordered w-full max-w-xs"/>
</div>