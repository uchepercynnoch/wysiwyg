import { IconButton, Stack } from '@mui/material';
import { InsertLink, InsertPhoto } from '@mui/icons-material';
import React, { useContext } from 'react';
import { RichUtils } from 'draft-js';
import EditorContext from '../../../context/EditorContext';
import { IEditorContextProps } from '@app-react-app-context';

const LinkAndPictureButtons = () => {
  const { editorState, setEditorState } = useContext(EditorContext) as IEditorContextProps;
  const handleInsertPicture = () => {
    const $fileInput = document.getElementById('fileInput');

    if ($fileInput) $fileInput.click();
  };

  const handleLinkClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'LINK'));
  };

  return (
    <Stack direction="row" spacing={2}>
      <IconButton onClick={handleLinkClick}>
        <InsertLink />
      </IconButton>
      <IconButton onClick={handleInsertPicture}>
        <InsertPhoto />
      </IconButton>
    </Stack>
  );
};

export default LinkAndPictureButtons;
