import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, createTheme } from "@mui/material";

import { HomePage } from "./pages/HomePage";

const theme = createTheme();

function App() {
  // const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
