<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity';

  interface Props {
    conditions: string[];
    verdicts?: Record<string, string>;
    title?: string;
  }
  let { conditions, verdicts = {}, title = '勾选你满足的条件' }: Props = $props();

  // Track checked indices in a reactive Set; this avoids capturing `conditions`
  // in initial state (which would trigger `state_referenced_locally`).
  const checkedSet = new SvelteSet<number>();

  let activeKey = $derived(
    conditions.filter((_, i) => checkedSet.has(i)).join(',')
  );
  let verdict = $derived(verdicts[activeKey] ?? null);

  function setChecked(i: number, value: boolean) {
    if (value) checkedSet.add(i);
    else checkedSet.delete(i);
  }
</script>

<div class="checker">
  <p class="checker-title">{title}</p>
  <ul class="checker-list">
    {#each conditions as cond, i}
      <li>
        <label>
          <input
            type="checkbox"
            checked={checkedSet.has(i)}
            onchange={(e) => setChecked(i, (e.currentTarget as HTMLInputElement).checked)}
          />
          <span>{cond}</span>
        </label>
      </li>
    {/each}
  </ul>
  {#if verdict}
    <div class="checker-verdict">{verdict}</div>
  {/if}
</div>

<style>
  .checker {
    margin: 24px 0;
    padding: 16px 20px;
    background: var(--bg-soft);
    border-left: 2px solid var(--accent);
    font-size: 15px;
  }
  .checker-title {
    margin: 0 0 12px 0;
    font-family: 'EB Garamond', serif;
    font-size: 12px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .checker-list {
    display: grid;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .checker-list label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .checker-list input {
    accent-color: var(--accent);
  }
  .checker-verdict {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--rule);
    font-style: italic;
    color: var(--ink);
  }
</style>
