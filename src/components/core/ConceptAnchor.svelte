<script lang="ts">
  interface Props {
    concept: string;
    definition: string;
    source?: string;
  }
  let { concept, definition, source = '' }: Props = $props();

  let open = $state(false);
  let wrap: HTMLElement | undefined = $state();

  function toggle() {
    open = !open;
  }

  // 评审 #8: Escape 关闭 + 点击外部关闭（无障碍 disclosure 行为）
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      open = false;
    }
  }

  function handleDocumentClick(e: MouseEvent) {
    if (!open || !wrap) return;
    if (!wrap.contains(e.target as Node)) {
      open = false;
    }
  }

  $effect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('click', handleDocumentClick);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('click', handleDocumentClick);
      };
    }
  });
</script>

<span class="concept-anchor-wrap" bind:this={wrap}>
  <button class="concept-anchor" onclick={toggle} aria-expanded={open} type="button">
    {concept}
  </button>
  {#if open}
    <span class="concept-popup" role="tooltip">
      <strong>{concept}</strong>
      <em>{definition}</em>
      {#if source}<small>— {source}</small>{/if}
    </span>
  {/if}
</span>

<style>
  .concept-anchor-wrap {
    position: relative;
    display: inline;
  }
  .concept-anchor {
    background: none;
    border: 0;
    border-bottom: 1px dotted var(--accent);
    color: var(--ink);
    cursor: pointer;
    font: inherit;
    padding: 0 2px;
  }
  .concept-anchor:hover {
    color: var(--accent);
  }
  .concept-popup {
    position: absolute;
    left: 0;
    top: 100%;
    transform: translateY(4px);
    background: var(--bg-soft);
    border: 1px solid var(--rule);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    padding: 12px 16px;
    width: min(280px, calc(100vw - 32px));   /* 评审 #8: 窄屏不溢出 */
    max-width: 280px;
    z-index: 10;
    font-size: 14px;
    line-height: 1.6;
    color: var(--ink);
    display: block;
  }
  .concept-popup strong {
    display: block;
    color: var(--accent);
    margin-bottom: 4px;
  }
  .concept-popup em {
    font-style: italic;
    color: var(--ink-soft);
    display: block;
    margin-bottom: 4px;
  }
  .concept-popup small {
    display: block;
    font-family: 'EB Garamond', serif;
    font-size: 11px;
    color: var(--ink-faint);
    letter-spacing: 0.1em;
  }
</style>
