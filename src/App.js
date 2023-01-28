import Router from "routes/Router";
import { ThemeProvider } from "styled-components";
import theme from "styles/ColorTheme";
import GlobalStyles from "./styles/Globla";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
