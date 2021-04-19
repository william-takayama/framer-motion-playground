import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Hover from "./pages/Hover";
import Open from "./pages/Open";
import CarouselPage from "./pages/CarouselPage";
import NotFound from "./pages/NotFound";

function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/hover" exact component={Hover} />
        <Route path="/open" exact component={Open} />
        <Route path="/carousel" exact component={CarouselPage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
