import { Box, Typography, useTheme, useMediaQuery, } from '@mui/material'
import Form from './Form';

export default function LoginPage() {
  const theme = useTheme();
  const isNonModalScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center">
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          sx={{
            "&:hover": {
              color: "primaryLight",
              cursor: "pointer",
            },
          }}
        >
          Social-Network
        </Typography>
      </Box>

      <Box width={isNonModalScreens ? "50%" : "93%`"}
        p='2rem'
        m='2rem auto'
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant='h5' sx={{mb: "1.5rem"}}>
        Welcome to , the social media for !
        </Typography>
        <Form/>
      </Box>
    </Box>
  )
}
