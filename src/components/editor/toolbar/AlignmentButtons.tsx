import React, { useContext } from 'react';

import { IconButton, Stack } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import EditorContext from '../../../context/EditorContext';

import { RichUtils } from 'draft-js';

import { IEditorContextProps } from '@app-react-app-context';

const AlignmentButtons = () => {
  const { editorState, setEditorState } = useContext(EditorContext) as IEditorContextProps;

  const toggleBlockType = (blockType: string) => setEditorState(RichUtils.toggleBlockType(editorState, blockType));

  return (
    <Stack direction="row" spacing={2}>
      <IconButton onClick={() => toggleBlockType('left')}>
        <FormatAlignLeftIcon />
      </IconButton>
      <IconButton onClick={() => toggleBlockType('right')}>
        <FormatAlignRightIcon />
      </IconButton>
      <IconButton onClick={() => toggleBlockType('center')}>
        <FormatAlignCenterIcon />
      </IconButton>
    </Stack>
  );
};

export default AlignmentButtons;
