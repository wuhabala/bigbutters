const CALLOUT_RE = /^\[!([A-Za-z][\w-]*)\]([+-]?)(?:\s+)?/;

function isElement(node, tagName) {
  return node?.type === 'element' && node.tagName === tagName;
}

function textNode(value) {
  return { type: 'text', value };
}

function cleanClassName(type) {
  return type.toLowerCase().replace(/[^\w-]/g, '-');
}

function extractMarker(firstParagraph) {
  const firstChild = firstParagraph.children?.[0];
  if (firstChild?.type !== 'text') return null;

  const match = firstChild.value.match(CALLOUT_RE);
  if (!match) return null;

  firstChild.value = firstChild.value.slice(match[0].length).trimStart();
  const titleChildren = firstParagraph.children.filter(child => (
    child.type !== 'text' || child.value.length > 0
  ));

  return {
    type: cleanClassName(match[1]),
    fold: match[2],
    titleChildren,
  };
}

function calloutTitle(type) {
  return type.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function transformNode(node) {
  if (!node || !Array.isArray(node.children)) return;

  node.children = node.children.map(child => {
    transformNode(child);

    if (!isElement(child, 'blockquote')) return child;

    const firstParagraph = child.children?.find(grandChild => isElement(grandChild, 'p'));
    if (!firstParagraph) return child;

    const marker = extractMarker(firstParagraph);
    if (!marker) return child;

    const bodyChildren = child.children.filter(grandChild => grandChild !== firstParagraph);
    const summaryChildren = marker.titleChildren.length > 0
      ? marker.titleChildren
      : [textNode(calloutTitle(marker.type))];
    const detailsProperties = {
      className: ['callout', `callout-${marker.type}`],
      'data-callout': marker.type,
    };

    if (marker.fold !== '-') {
      detailsProperties.open = true;
    }

    return {
      type: 'element',
      tagName: 'details',
      properties: detailsProperties,
      children: [
        {
          type: 'element',
          tagName: 'summary',
          properties: { className: ['callout-title'] },
          children: summaryChildren,
        },
        {
          type: 'element',
          tagName: 'div',
          properties: { className: ['callout-body'] },
          children: bodyChildren,
        },
      ],
    };
  });
}

export default function rehypeObsidianCallouts() {
  return tree => transformNode(tree);
}
