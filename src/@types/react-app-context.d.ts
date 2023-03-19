declare module '@app-react-app-context' {
  import { EditorState } from 'draft-js';
  import { Dispatch, SetStateAction } from 'react';

  interface IEditorContextProps {
    editorState: EditorState;
    setEditorState: Dispatch<SetStateAction<EditorState>>;
  }
}
