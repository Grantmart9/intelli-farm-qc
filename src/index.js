/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 17/08/2021 - 13:19:37
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 17/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

// core styles
import "scss/volt.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";
import "tailwind.css";

import { HomePage } from "pages/HomePage";
import { ScrollToTop } from "components/ScrollToTop";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({});
window.theme = theme;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <ScrollToTop />
      <HomePage />
    </HashRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
