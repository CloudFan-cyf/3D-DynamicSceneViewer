import React from 'react';
import { Button, Box } from '@mui/material';

function CameraSwitcher({ switchCamera }) {
  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, display: 'flex', gap: 1 }}>
      <Button variant="contained" onClick={() => switchCamera('free')}>自由视角</Button>
      <Button variant="contained" onClick={() => switchCamera('firstPerson')}>第一人称视角</Button>
      <Button variant="contained" onClick={() => switchCamera('thirdPerson')}>第三人称越肩视角</Button>
      <Button variant="contained" onClick={() => switchCamera('fixed')}>场景摄像头视角</Button>
    </Box>
  );
}

export default CameraSwitcher;
