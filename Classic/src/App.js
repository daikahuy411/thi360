import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { Route, Switch } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from "./configs/AppConfig";
import Interceptor from "services/interceptor";
import { useHistory, Link } from "react-router-dom";

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

const DebugRouter = ({ children }) => {
  const { location } = useHistory();
  console.log(
    `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(
      location.state
    )}`
  );

  return children;
};

function App() {
  new Interceptor().initialize();
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={THEME_CONFIG.currentTheme}
          insertionPoint="styles-insertion-point"
        >
          <Router>
            <DebugRouter>
              <Switch>
                <Route path="/" component={Views} />
              </Switch>
            </DebugRouter>
          </Router>
        </ThemeSwitcherProvider>
      </Provider>
    </div>
  );
}

export default App;
