import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const TextFieldComponents =() => {
    return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Website"
              type="url"
              placeholder="www.untitledui.com"
              helperText="This is a hint text to help user."
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              placeholder="olivia@untitledui.com"
              helperText="This is a hint text to help user."
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              placeholder="olivia@untitledui.com"
              helperText="This is an error message."
              error
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              placeholder="olivia@untitledui.com"
              helperText="This is a hint to help user."
            />
          </Grid>
         
          <Grid item xs={12}>
            <TextField
              label="Website"
              type="url"
              placeholder="http://www.untitledui.com"
              helperText="This is a hint text to help user."
            />
          </Grid>
        </Grid>
      );
    };

export default TextFieldComponents;