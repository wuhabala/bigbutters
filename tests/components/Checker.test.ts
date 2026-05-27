import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Checker from '../../src/components/core/Checker.svelte';

describe('Checker', () => {
  it('renders all conditions as checkboxes', () => {
    const { container } = render(Checker, {
      props: {
        conditions: ['公开处决', '群众围观', '即时反馈'],
      },
    });
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(3);
  });

  it('shows result panel after toggling', async () => {
    const { container, getByText } = render(Checker, {
      props: {
        conditions: ['A', 'B'],
        verdicts: { '': '无', 'A': 'A 命中', 'B': 'B 命中', 'A,B': '两个都命中' },
      },
    });
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    await fireEvent.click(checkbox);
    expect(getByText('A 命中')).toBeTruthy();
  });
});
