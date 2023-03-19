import React, { useEffect } from 'react';

import { Form, useFormikContext } from 'formik';

import { Button, Grid, MenuItem, TextField } from '@mui/material';

import { IEmbedLinkValues } from '@react-app-forms';

interface IProps {
  options: readonly string[];
  isOpen?: boolean;
}

function EmbedLinkForm(props: IProps) {
  const { values, handleChange, resetForm } = useFormikContext<IEmbedLinkValues>();

  const { isOpen } = props;
  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            value={values.company}
            onChange={handleChange}
            name="company"
            select
            variant="outlined"
            margin="normal"
          >
            {props.options.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} hidden={!values.company.length}>
          <TextField
            fullWidth
            size="small"
            name="url"
            variant="outlined"
            margin="normal"
            value={values.url}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="outlined">
            Insert
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}

export default EmbedLinkForm;
