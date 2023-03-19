import React, { ChangeEvent, MouseEvent, useCallback, useRef, useState } from 'react';

import Editor from '@draft-js-plugins/editor';
import createCounterPlugin from '@draft-js-plugins/counter';
import { AtomicBlockUtils, ContentBlock, convertToRaw, EditorState, RichUtils } from 'draft-js';

import PageWrapper from '../containers/PageWrapper';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';

import { useDropzone } from 'react-dropzone';
import { Formik, FormikHelpers } from 'formik';

import AppDialog from '../components/AppDialog';
import MediaComponent from '../components/MediaComponent';
import AlignmentButtons from '../components/editor/toolbar/AlignmentButtons';
import HeaderSelect from '../components/editor/toolbar/HeaderSelect';
import BulletAndQuoteButtons from '../components/editor/toolbar/BulletAndQuoteButtons';
import BoldAndItalicsButtons from '../components/editor/toolbar/BoldAndItalicsButtons';
import LinkAndPictureButtons from '../components/editor/toolbar/LinkAndPictureButtons';
import ActionButtonPopover from '../components/editor/ActionButtonPopover';
import EmbedLinkForm from '../components/forms/EmbedLinkForm';
import { IEmbedLinkValues } from '@react-app-forms';
import EditorContext from '../context/EditorContext';
import { blockStyleFn } from '../utils';

const VIDEO_OPTIONS = ['Youtube', 'Twitch'];
const SOCIAL_OPTIONS = ['Facebook', 'Twitter'];
const WORDS_LIMIT = 1000;

const embedValues: IEmbedLinkValues = {
  company: '',
  url: '',
};

const counterPlugin = createCounterPlugin();
const { CharCounter } = counterPlugin;

function PageContainer() {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [showPicture, setShowPicture] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [showLink, setShowLink] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const editorRef = useRef<Editor>(null);
  const open = Boolean(anchorEl);

  const renderBlock = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === 'atomic') {
      const entityKey = contentBlock.getEntityAt(0);
      const entityData = editorState.getCurrentContent().getEntity(entityKey).getData();

      return {
        component: MediaComponent,
        editable: false,
        props: {
          src: { file: entityData.src },
        },
      };
    }
  };

  const insertMedia = useCallback(
    (type: string, value: any) => {
      const contentStateWithEntity = editorState.getCurrentContent().createEntity(type, 'IMMUTABLE', { src: value });
      setEditorState(
        AtomicBlockUtils.insertAtomicBlock(
          EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
          }),
          contentStateWithEntity.getLastCreatedEntityKey(),
          ' '
        )
      );
    },
    [editorState]
  );

  const handleDropFile = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.addEventListener(
          'load',
          function () {
            insertMedia('image', reader.result);
          },
          false
        );

        reader.readAsDataURL(file);
        setShowPicture(false);
      });
    },
    [insertMedia]
  );

  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDropFile,
    accept: {
      'image/png': ['.png', '.jpeg'],
    },
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleOpenPicture = () => {
    handleClose();
    setShowPicture(true);
  };
  const handleOpenVideo = () => {
    handleClose();
    setShowVideo(true);
  };
  const handleOpenLink = () => {
    handleClose();
    setShowLink(true);
  };

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        insertMedia('image', reader.result);
      },
      false
    );

    if (event.target.files) {
      reader.readAsDataURL(Array.prototype.slice.call(event.target.files)[0]);
    }
  };

  const handleInsertMedia = (values: IEmbedLinkValues, helpers: FormikHelpers<IEmbedLinkValues>) => {
    insertMedia(values.company, values.url);

    helpers.resetForm();

    if (showVideo) setShowVideo(false);
    if (showLink) setShowLink(false);
  };

  const handlePost = () => console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2));

  return (
    <PageWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            sx={{
              background: (theme) => (theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default),
            }}
          >
            <CardHeader title="Title" />
            <CardContent>
              <Paper sx={{ maxWidth: 700 }}>
                <EditorContext.Provider value={{ editorState, setEditorState }}>
                  <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
                    <HeaderSelect />
                    <LinkAndPictureButtons />
                    <AlignmentButtons />
                    <BoldAndItalicsButtons />
                    <BulletAndQuoteButtons />
                  </Stack>
                </EditorContext.Provider>
              </Paper>
              <Box onClick={focusEditor}>
                <Editor
                  ref={editorRef}
                  blockRendererFn={renderBlock}
                  blockStyleFn={blockStyleFn}
                  editorState={editorState}
                  handleKeyCommand={handleKeyCommand}
                  onChange={onChange}
                  placeholder="Click to start typing..."
                  plugins={[counterPlugin]}
                />
              </Box>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={handleClick} sx={{ border: '0.1px solid' }} size="small" color="success">
                <AddIcon />
              </IconButton>
              <ActionButtonPopover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onOpenPicture={handleOpenPicture}
                onOpenVideo={handleOpenVideo}
                onOpenLink={handleOpenLink}
              />
            </CardActions>
            <CardContent>
              <Box
                sx={{
                  bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : theme.palette.background.default),
                  p: 1,
                  display: 'flex',
                }}
              >
                <Box sx={{ flexGrow: 1 }} />

                <Typography variant="caption">
                  <CharCounter
                    //@ts-ignore
                    editorState={editorState}
                    limit={WORDS_LIMIT}
                  />
                  /{`${WORDS_LIMIT} words`}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Grid item xs={10} />
          <Grid item>
            <Button onClick={handlePost} color="success" variant="contained">
              Post
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <AppDialog fullWidth size="sm" show={showPicture} onClose={() => setShowPicture(false)}>
        <Box sx={{ borderStyle: 'dotted', border: '1px dotted', p: 5 }}>
          <Box component="div" {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography textAlign="center">Drag and drop image here, or click to select image</Typography>
          </Box>
        </Box>
      </AppDialog>
      <AppDialog fullWidth size="sm" show={showVideo} onClose={() => setShowVideo(false)}>
        <Formik initialValues={embedValues} onSubmit={handleInsertMedia}>
          <EmbedLinkForm options={VIDEO_OPTIONS} isOpen={showVideo} />
        </Formik>
      </AppDialog>
      <AppDialog fullWidth size="sm" show={showLink} onClose={() => setShowLink(false)}>
        <Formik initialValues={embedValues} onSubmit={handleInsertMedia}>
          <EmbedLinkForm options={SOCIAL_OPTIONS} isOpen={showLink} />
        </Formik>
      </AppDialog>
      <input
        id="fileInput"
        style={{ display: 'none' }}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleChangeImage}
      />
    </PageWrapper>
  );
}

export default PageContainer;
