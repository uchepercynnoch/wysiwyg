import React, { forwardRef } from 'react';

import { Slide } from '@mui/material';

import { TransitionProps } from '@mui/material/transitions';

const TransitionUp = forwardRef(function Transition(
  props: TransitionProps & {
    children: JSX.Element;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide {...props} direction="up" ref={ref}>
      {props.children}
    </Slide>
  );
});

export default TransitionUp;
