import { Button, Stack } from '@mui/material';
import React, { useContext } from 'react';
import { RichUtils } from 'draft-js';
import EditorContext from '../../../context/EditorContext';
import { IEditorContextProps } from '@app-react-app-context';

const BoldAndItalicsButtons = () => {
  const { editorState, setEditorState } = useContext(EditorContext) as IEditorContextProps;

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  return (
    <Stack direction="row">
      <Button color="inherit" onClick={handleBoldClick}>
        <b>B</b>
      </Button>
      <Button color="inherit" onClick={handleItalicClick}>
        <em>I</em>
      </Button>
    </Stack>
  );
};

export default BoldAndItalicsButtons;
