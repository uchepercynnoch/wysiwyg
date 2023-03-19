import { ContentBlock } from 'draft-js';

export const blockStyleFn = (contentBlock: ContentBlock) => {
  const type = contentBlock.getType();

  if (type === 'left') {
    return 'align-left';
  }

  if (type === 'right') {
    return 'align-right';
  }

  if (type === 'center') {
    return 'align-center';
  }

  return '';
};
