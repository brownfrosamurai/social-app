import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

import { Form } from '../../components';

const Auth = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1200px)');
  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        textAlign='center'
        p='1rem 6%'
      >
        <Typography fontSize='32px' fontWeight='bold' color='primary' >
          Social App
        </Typography>

      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p='2rem'
        margin='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography variant='h5' fontWeight='500' sx={{ mb: '1.5rem' }} textAlign='center'>
          Welcome to social app
        </Typography>
        <Form />

      </Box>
    </Box>

  )
}

export default Auth