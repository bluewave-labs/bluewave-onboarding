import React from 'react';
import { Box, Button, Chip, TextField, InputAdornment } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TextFieldComponents = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      <Box sx={{ flex: 1, minWidth: 200 }}>
        
        <TextField
          label = {labelText}
          fullWidth
          margin="normal"
          defaultValue="http://www.untitledui.com"
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          helperText="This is a hint text to help user."
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          defaultValue="olivia@untitledui.com"
          helperText="This is a hint text to help user."
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          defaultValue="olivia@untitledui.com"
          error
          helperText="This is an error message."
        />
        <TextField 
          label="Email"
          fullWidth
          margin="normal"
          defaultValue="olivia@untitledui.com"
          helperText="This is a hint text to help user."
        />
        <TextField
          label="Website"
          fullWidth
          margin="normal"
          defaultValue="www.untitledui.com"
          InputProps={{
            startAdornment: <InputAdornment position="start">http://</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" startIcon={<ContentCopyIcon />}>Copy</Button>
              </InputAdornment>
            ),
          }}
          helperText="This is a hint text to help user."
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          placeholder="Enter a description..."
          helperText="This is a hint text to help user."
        />
        
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          placeholder= " "
          helperText="This is a hint text to help user."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Design" onDelete={() => {}} />
                  <Chip label="Software" onDelete={() => {}} />
                </Box>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          placeholder="Enter a description..."
          error
          helperText="This is an error message."
        />
      </Box>
    </Box>
  );
};

export default TextFieldComponents;
