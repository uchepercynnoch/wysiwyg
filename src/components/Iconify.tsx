import React from 'react';

import Icon from '@mui/material/Icon';

interface IProps {
  name: string;
  width?: number;

  sx?: { [p: string]: unknown };
}

function Iconify({ name, width = 20, sx }: IProps) {
  return <Icon sx={{ fontSize: width, ...sx }}>{name}</Icon>;
}

export default Iconify;
