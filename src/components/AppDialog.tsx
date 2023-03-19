import React, { memo, ReactNode, useRef } from 'react';
import { AppBar, Dialog, DialogContent, DialogTitle, IconButton, Toolbar } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import TransitionUp from './TransitionUp';

interface IProps {
  show: boolean;
  children: ReactNode;
  ActionComponent?: ReactNode;
  onClose: () => void;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  fullScreen?: boolean;
  contentHeight?: number;
}

function AppDialog(props: IProps) {
  const ref = useRef<HTMLElement>(null);
  return (
    <div>
      <Dialog
        open={props.show}
        TransitionComponent={TransitionUp}
        keepMounted
        onClose={props.onClose}
        aria-describedby="app-modal"
        maxWidth={props.size}
        fullWidth={props.fullWidth}
        fullScreen={props.fullScreen}
        scroll="paper"
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent ref={ref} sx={{ height: props.contentHeight }}>
          {props.children}
        </DialogContent>
        {props.ActionComponent && props.ActionComponent}
      </Dialog>
    </div>
  );
}

export default memo(AppDialog);
