<!--
  src/components/core/ReadingControls.svelte
  阅读控制面板 · 浮动在右下角
  · 宽度三档：窄 / 中 / 宽（电脑端可见）
  · 阅读模式：GitHub Markdown 风 + 跟随系统日间/夜间
  · 状态持久化到 localStorage
-->
<script lang="ts">
  import { onMount } from 'svelte';

  type Width = 'narrow' | 'medium' | 'wide';
  const WIDTHS: Record<Width, string> = {
    narrow: '640px',
    medium: '760px',
    wide: '920px',
  };

  let width = $state<Width>('medium');
  let readingMode = $state(false);
  let expanded = $state(false);

  function applyWidth(w: Width) {
    width = w;
    document.documentElement.style.setProperty('--content-max', WIDTHS[w]);
    localStorage.setItem('bb_width', w);
  }

  function applyReadingMode(on: boolean) {
    readingMode = on;
    document.body.classList.toggle('reading-mode', on);
    localStorage.setItem('bb_reading', on ? '1' : '0');
  }

  onMount(() => {
    const w = localStorage.getItem('bb_width') as Width | null;
    if (w && w in WIDTHS) applyWidth(w);
    const r = localStorage.getItem('bb_reading') === '1';
    if (r) applyReadingMode(true);
  });
</script>

<div class="reading-controls" class:expanded>
  <button class="rc-toggle"
          aria-label={expanded ? '收起阅读控制' : '展开阅读控制'}
          aria-expanded={expanded}
          onclick={() => (expanded = !expanded)}>
    {expanded ? '×' : 'Aa'}
  </button>

  {#if expanded}
    <div class="rc-panel">
      <div class="rc-group">
        <span class="rc-label">阅读模式</span>
        <button class:active={readingMode}
                onclick={() => applyReadingMode(!readingMode)}>
          {readingMode ? '已开启' : '关闭'}
        </button>
      </div>

      <div class="rc-group rc-width">
        <span class="rc-label">正文宽度</span>
        <div class="rc-segment">
          <button class:active={width === 'narrow'}  onclick={() => applyWidth('narrow')}  title="窄 640">窄</button>
          <button class:active={width === 'medium'}  onclick={() => applyWidth('medium')}  title="中 760">中</button>
          <button class:active={width === 'wide'}    onclick={() => applyWidth('wide')}    title="宽 920">宽</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .reading-controls {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 100;
    font-family: 'EB Garamond', serif;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  .rc-toggle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--ink);
    color: var(--bg);
    border: none;
    font-family: 'EB Garamond', serif;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.18s ease;
  }
  .rc-toggle:hover { transform: scale(1.06); }

  .expanded .rc-toggle {
    background: var(--accent);
    color: var(--bg);
  }

  .rc-panel {
    background: var(--bg);
    border: 2px solid var(--ink);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
    padding: 16px 18px;
    width: 230px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .rc-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .rc-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  .rc-group > button {
    border: 2px solid var(--ink);
    background: var(--bg);
    color: var(--ink);
    padding: 6px 12px;
    font-size: 13px;
    cursor: pointer;
    font-family: 'EB Garamond', serif;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .rc-group > button:hover { background: var(--bg-soft); }
  .rc-group > button.active {
    background: var(--ink);
    color: var(--bg);
  }

  .rc-segment {
    display: flex;
    border: 2px solid var(--ink);
  }
  .rc-segment button {
    flex: 1;
    border: none;
    border-right: 1px solid var(--ink);
    background: var(--bg);
    color: var(--ink);
    padding: 6px 8px;
    cursor: pointer;
    font-family: 'EB Garamond', serif;
    font-size: 13px;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .rc-segment button:last-child { border-right: none; }
  .rc-segment button:hover { background: var(--bg-soft); }
  .rc-segment button.active {
    background: var(--accent);
    color: var(--bg);
    font-weight: 700;
  }

  /* 移动端：隐藏正文宽度（无意义），保留阅读模式 */
  @media (max-width: 768px) {
    .rc-width { display: none; }
    .reading-controls { right: 16px; bottom: 16px; }
  }
</style>
