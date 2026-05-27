<script lang="ts">
  /**
   * ScrollReveal · 元素进入视口时淡入 + 8px 上移。
   * 单次触发（不会反复隐藏/显示），尊重 prefers-reduced-motion。
   * Svelte 5 runes 语法。
   */
  import { onMount } from 'svelte';

  interface Props {
    /** 延迟（毫秒）—— 同一组卡片错峰用 */
    delay?: number;
    /** 阈值：默认 0.15 */
    threshold?: number;
    children?: any;
  }
  let { delay = 0, threshold = 0.15, children }: Props = $props();

  let el: HTMLDivElement;
  let visible = $state(false);

  onMount(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      visible = true;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTimeout(() => (visible = true), delay);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  });
</script>

<div bind:this={el} class="hk-reveal" class:visible aria-hidden="false">
  {@render children?.()}
</div>

<style>
  .hk-reveal {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 480ms ease-out, transform 480ms ease-out;
    will-change: opacity, transform;
  }
  .hk-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .hk-reveal { opacity: 1; transform: none; transition: none; }
  }
</style>
