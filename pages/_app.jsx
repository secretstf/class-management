import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import { Box } from '@mui/material';

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Header />
      <Box px='8px' py='16px'>
        <Component {...pageProps} />
      </Box>
    </ClerkProvider>
  )
}

export default MyApp