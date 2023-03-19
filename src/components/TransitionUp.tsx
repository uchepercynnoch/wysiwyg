import React, { forwardRef } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

const TransitionUp = forwardRef(function Transition(
  props: TransitionProps & {
    children: JSX.Element;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide {...props} direction='up' ref={ref}>
      {props.children}
    </Slide>
  );
});

export default TransitionUp;
