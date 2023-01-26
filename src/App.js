import Home from "pages/Home";
import { ThemeProvider } from "styled-components";
import theme from "styles/ColorTheme";
import GlobalStyles from "./styles/Globla";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
}

export default App;
