import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/LogIn/Login";
import Home from "./components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/" component={Login}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
