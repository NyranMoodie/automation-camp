import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SnipcartProvider } from "use-snipcart";
import { UserProvider } from "@auth0/nextjs-auth0";
import { PageWithLayout } from "../modules/Layout";
import FavoritesProvider from "../context/FavorateContext";
type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <FavoritesProvider>
      <UserProvider>
        <ChakraProvider>
          <SnipcartProvider>
            {getLayout(<Component {...pageProps} />)}
          </SnipcartProvider>
        </ChakraProvider>
      </UserProvider>
    </FavoritesProvider>
  );
}

export default MyApp;
