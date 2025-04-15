import Register from "./components/Register";

import { BrowserRouter, Route, Switch} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import ipConfig from "./ipConfig.json";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";
import Login from "./components/Login";
import theme from "./theme";            // <- This is your custom MUI theme



export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping  */}
        <BrowserRouter>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/thanks" component={Thanks} />
            <Route path="/" component={Products} />
            
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
