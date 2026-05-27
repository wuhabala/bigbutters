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
        dimensions: ['A', 'B'],
        values: [-3, 99],
      },
    });
    const polygon = container.querySelector('polygon.radar-shape');
    expect(polygon).toBeTruthy();
    const pts = polygon!.getAttribute('points')!;
    expect(pts).not.toContain('NaN');
  });
});
