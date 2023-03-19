import { FormControl, NativeSelect } from '@mui/material';
import AppSelectInput from '../../forms/AppSelectInput';
import React from 'react';

const HeaderSelect = () => (
  <FormControl sx={{ width: 200 }} variant="standard">
    <NativeSelect input={<AppSelectInput />}>
      <option>Paragraph</option>
    </NativeSelect>
  </FormControl>
);

export default HeaderSelect;
