<script lang="ts">
  interface Props {
    dimensions: string[];
    values: number[];
    caption?: string;
    size?: number;
  }
  let { dimensions, values, caption = '', size = 220 }: Props = $props();

  // Clamp values to [0, 5]
  let clamped = $derived(values.map((v: number) => Math.min(5, Math.max(0, v))));

  let cx = $derived(size / 2);
  let cy = $derived(size / 2);
  let maxR = $derived(size / 2 - 30);

  // Polygon points string
  let points = $derived(
    dimensions
      .map((_, i) => {
        const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
        const r = (clamped[i] / 5) * maxR;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ')
  );

  // Axis label positions
  let axisLabels = $derived(
    dimensions.map((label, i) => {
      const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
      const r = maxR + 16;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        label,
      };
    })
  );

  // Background rings (5 levels)
  let rings = $derived(
    [1, 2, 3, 4, 5].map((lvl) =>
      dimensions
        .map((_, i) => {
          const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
          const r = (lvl / 5) * maxR;
          return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
        })
        .join(' ')
    )
  );
</script>

<figure class="radar">
  <svg viewBox="0 0 {size} {size}" aria-label={caption}>
    <!-- background rings -->
    {#each rings as ring}
      <polygon points={ring} fill="none" stroke="var(--rule)" stroke-width="0.5" />
    {/each}
    <!-- axes -->
    {#each dimensions as _, i}
      {@const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2}
      <line
        x1={cx}
        y1={cy}
        x2={cx + maxR * Math.cos(angle)}
        y2={cy + maxR * Math.sin(angle)}
        stroke="var(--rule)"
        stroke-width="0.5"
      />
    {/each}
    <!-- data shape -->
    <polygon
      class="radar-shape"
      {points}
      fill="var(--accent-soft)"
      fill-opacity="0.35"
      stroke="var(--accent)"
      stroke-width="1.4"
    />
    <!-- labels -->
    {#each axisLabels as { x, y, label }}
      <text
        class="radar-axis-label"
        {x}
        {y}
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="var(--font-serif)"
        font-size="13"
        fill="var(--ink)"
      >
        {label}
      </text>
    {/each}
  </svg>
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
</figure>

<style>
  .radar {
    margin: 24px auto;
    text-align: center;
    max-width: 320px;
  }
  figcaption {
    margin-top: 8px;
    font-family: 'EB Garamond', serif;
    font-size: 12px;
    letter-spacing: 0.15em;
    color: var(--ink-soft);
  }
</style>
