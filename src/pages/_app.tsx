import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "configs/theme";
import Template from "templates/Template";
import { ToastContainer } from "react-toastify";
import { useStore } from "app/store";
import { persistStore } from "redux-persist";
import "react-toastify/dist/ReactToastify.min.css";
import "@assets/styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@atoms/Loading";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "createEmotionCache";
import { Theme } from "@mui/system";

export const APP_VERSION = "1.0.0";

const App = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);
  let persistor = persistStore(store);

  const { locale } = useRouter();

  const direction = locale === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    const doc_body = document.body;
    if (direction === "rtl") {
      doc_body.className = "fa-font-family";
    } else {
      doc_body.className = "";
    }
    doc_body.dir = direction;
  }, [direction]);

  const themeHandler = () => {
    let result: Theme = {
      ...theme,
      direction,
    };

    if (direction === "rtl") {
      result = {
        ...theme,
        typography: {
          fontFamily: ["iransansxv", "iransansx", "tahoma"],
        },
        direction,
      };
    }

    return result;
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <CacheProvider value={createEmotionCache(direction)}>
          <ThemeProvider theme={themeHandler()}>
            <CssBaseline />
            <ToastContainer limit={3} rtl={direction === "rtl"} />
            <Template>
              <Component {...pageProps} />
            </Template>
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
