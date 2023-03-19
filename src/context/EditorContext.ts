import { createContext } from 'react';

import { IEditorContextProps } from '@app-react-app-context';

const EditorContext = createContext<IEditorContextProps | null>(null);

export default EditorContext;
