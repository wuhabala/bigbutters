import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Radar from '../../src/components/core/Radar.svelte';

describe('Radar', () => {
  it('renders three axis labels when dimensions length is 3', () => {
    const { container } = render(Radar, {
      props: {
        dimensions: ['君主', '规训', '生命'],
        values: [2, 5, 1],
        caption: 'test',
      },
    });
    const labels = container.querySelectorAll('.radar-axis-label');
    expect(labels.length).toBe(3);
    expect(labels[0].textContent).toContain('君主');
  });

  it('clamps out-of-range values to [0, 5]', () => {
    const { container } = render(Radar, {
      props: {
        dimensions: ['A', 'B', 'C'],
        values: [-3, 99, 50],
      },
    });
    const polygon = container.querySelector('polygon.radar-shape');
    expect(polygon).toBeTruthy();
    const pts = polygon!.getAttribute('points')!;
    expect(pts).not.toContain('NaN');
  });

  it('shows error state when dimensions has fewer than 3 entries', () => {
    const { container } = render(Radar, {
      props: { dimensions: ['A', 'B'], values: [1, 2] },
    });
    const err = container.querySelector('.radar-error');
    expect(err).toBeTruthy();
    expect(err!.textContent).toContain('至少需要 3 个维度');
    // SVG should not render in error state
    expect(container.querySelector('polygon.radar-shape')).toBeFalsy();
  });

  it('shows error state when dimensions.length !== values.length', () => {
    const { container } = render(Radar, {
      props: { dimensions: ['A', 'B', 'C'], values: [1, 2] },
    });
    const err = container.querySelector('.radar-error');
    expect(err).toBeTruthy();
    expect(err!.textContent).toContain('长度需一致');
  });

  it('treats NaN values as 0', () => {
    const { container } = render(Radar, {
      props: {
        dimensions: ['A', 'B', 'C'],
        values: [NaN, 3, Infinity],
      },
    });
    const polygon = container.querySelector('polygon.radar-shape');
    expect(polygon).toBeTruthy();
    const pts = polygon!.getAttribute('points')!;
    expect(pts).not.toContain('NaN');
    expect(pts).not.toContain('Infinity');
  });
});
