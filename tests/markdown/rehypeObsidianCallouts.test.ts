import { describe, expect, it } from 'vitest';
import rehypeObsidianCallouts from '../../src/markdown/rehypeObsidianCallouts';

describe('rehypeObsidianCallouts', () => {
  it('turns folded Obsidian success callouts into closed details blocks', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'blockquote',
          properties: {},
          children: [
            {
              type: 'element',
              tagName: 'p',
              properties: {},
              children: [{ type: 'text', value: '[!success]- 参考答案与解析' }],
            },
            {
              type: 'element',
              tagName: 'p',
              properties: {},
              children: [{ type: 'text', value: '答案内容' }],
            },
          ],
        },
      ],
    };

    rehypeObsidianCallouts()(tree);

    const details = tree.children[0];
    expect(details.tagName).toBe('details');
    expect(details.properties.className).toEqual(['callout', 'callout-success']);
    expect(details.properties.open).toBeUndefined();
    expect(details.children[0].tagName).toBe('summary');
    expect(details.children[0].children[0].value).toBe('参考答案与解析');
    expect(details.children[1].properties.className).toEqual(['callout-body']);
  });
});
