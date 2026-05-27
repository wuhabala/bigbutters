import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import ConceptAnchor from '../../src/components/core/ConceptAnchor.svelte';

describe('ConceptAnchor', () => {
  it('renders the concept text inline', () => {
    const { getByText } = render(ConceptAnchor, {
      props: {
        concept: '规训',
        definition: '一种纪律化的权力技术',
      },
    });
    expect(getByText('规训')).toBeTruthy();
  });

  it('toggles popup on click', async () => {
    const { container, queryByText } = render(ConceptAnchor, {
      props: { concept: '规训', definition: '权力技术' },
    });
    expect(queryByText('权力技术')).toBeFalsy();
    const btn = container.querySelector('.concept-anchor') as HTMLElement;
    await fireEvent.click(btn);
    expect(queryByText('权力技术')).toBeTruthy();
  });
});
