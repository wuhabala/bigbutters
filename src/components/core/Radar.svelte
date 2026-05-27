<script lang="ts">
  interface Props {
    dimensions: string[];
    values: number[];
    caption?: string;
    size?: number;
  }
  let { dimensions, values, caption = '', size = 220 }: Props = $props();

  // Input validation (评审 #7：dimensions 与 values 长度不一致、非有限值、维度不足时安全降级)
  let validDimensions = $derived(Array.isArray(dimensions) ? dimensions : []);
  let validValues = $derived(Array.isArray(values) ? values : []);
  let mismatch = $derived(validDimensions.length !== validValues.length);
  let tooFew = $derived(validDimensions.length < 3);
  let hasError = $derived(mismatch || tooFew);

  // Clamp values to [0, 5]; non-finite → 0
  let clamped = $derived(
    validValues.map((v: number) => {
      if (!Number.isFinite(v)) return 0;
      return Math.min(5, Math.max(0, v));
    })
  );

  let cx = $derived(size / 2);
  let cy = $derived(size / 2);
  let maxR = $derived(size / 2 - 30);

  // Polygon points string
  let points = $derived(
    validDimensions
      .map((_, i) => {
        const angle = (Math.PI * 2 * i) / validDimensions.length - Math.PI / 2;
        const r = (clamped[i] / 5) * maxR;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ')
  );

  // Axis label positions
  let axisLabels = $derived(
    validDimensions.map((label, i) => {
      const angle = (Math.PI * 2 * i) / validDimensions.length - Math.PI / 2;
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
      validDimensions
        .map((_, i) => {
          const angle = (Math.PI * 2 * i) / validDimensions.length - Math.PI / 2;
          const r = (lvl / 5) * maxR;
          return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
        })
        .join(' ')
    )
  );
</script>

<figure class="radar">
  {#if hasError}
    <div class="radar-error" role="img" aria-label="Radar 配置错误">
      <strong>Radar 配置错误</strong>
      {#if tooFew}<span>· 至少需要 3 个维度（当前 {validDimensions.length}）</span>{/if}
      {#if mismatch}<span>· dimensions 与 values 长度需一致（{validDimensions.length} vs {validValues.length}）</span>{/if}
    </div>
  {:else}
  <svg viewBox="0 0 {size} {size}" aria-label={caption}>
    <!-- background rings -->
    {#each rings as ring}
      <polygon points={ring} fill="none" stroke="var(--rule)" stroke-width="0.5" />
    {/each}
    <!-- axes -->
    {#each validDimensions as _, i}
      {@const angle = (Math.PI * 2 * i) / validDimensions.length - Math.PI / 2}
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
  {/if}
  {#if caption && !hasError}
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
  .radar-error {
    border: 1px dashed var(--accent);
    padding: 12px 16px;
    color: var(--accent);
    font-size: 13px;
    font-family: 'EB Garamond', serif;
    text-align: left;
  }
  .radar-error strong { display: block; margin-bottom: 4px; }
  .radar-error span { display: block; opacity: 0.8; }
</style>
