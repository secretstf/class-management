import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Box } from "@mui/material";
import "../styles/globals.css"; // Import global CSS styles

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Box width={"100vw"} height={"100vh"}>
        <Header />
        <Box width={"100vw"} sx={{paddingTop: '64px', height:'calc(100vh - 64px)', backgroundColor: 'inherit'}}>
          <Component {...pageProps} />
        </Box>
      </Box>
    </ClerkProvider>
  );
}

export default MyApp;
