import React from 'react';

import { ListItemButton, Popover } from '@mui/material';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { InsertPhoto, Share, Videocam } from '@mui/icons-material';

import ListItemText from '@mui/material/ListItemText';

interface IActionButtonPopover {
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onOpenPicture: () => void;
  onOpenVideo: () => void;
  onOpenLink: () => void;
}

function ActionButtonPopover(props: IActionButtonPopover) {
  return (
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <List sx={{ width: 300, bgcolor: 'background.paper' }}>
        <ListItemButton onClick={props.onOpenPicture}>
          <ListItemAvatar>
            <Avatar>
              <InsertPhoto />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Picture" secondary="jpeg, png" />
        </ListItemButton>
        <ListItemButton onClick={props.onOpenVideo}>
          <ListItemAvatar>
            <Avatar>
              <Videocam />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Video" secondary="Embed a Youtube video" />
        </ListItemButton>
        <ListItemButton onClick={props.onOpenLink}>
          <ListItemAvatar>
            <Avatar>
              <Share />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Social" secondary="Embed a Facebook link" />
        </ListItemButton>
      </List>
    </Popover>
  );
}

export default ActionButtonPopover;
