import { IconButton, Stack } from '@mui/material';
import { FormatListBulleted, FormatListNumbered, FormatQuote } from '@mui/icons-material';
import React, { useContext } from 'react';
import EditorContext from '../../../context/EditorContext';
import { IEditorContextProps } from '@app-react-app-context';
import { RichUtils } from 'draft-js';

const BulletAndQuoteButtons = () => {
  const { editorState, setEditorState } = useContext(EditorContext) as IEditorContextProps;

  const toggleBlockType = (blockType: string) => setEditorState(RichUtils.toggleBlockType(editorState, blockType));

  return (
    <Stack direction="row" spacing={2}>
      <IconButton onClick={() => toggleBlockType('unordered-list-item')}>
        <FormatListBulleted />
      </IconButton>
      <IconButton onClick={() => toggleBlockType('ordered-list-item')}>
        <FormatListNumbered />
      </IconButton>
      <IconButton onClick={() => toggleBlockType('blockquote')}>
        <FormatQuote />
      </IconButton>
    </Stack>
  );
};

export default BulletAndQuoteButtons;
