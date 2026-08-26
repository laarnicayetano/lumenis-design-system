import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./Header";
import { OptiLiftHero } from "./OptiLiftHero";
import { Technology } from "./Technology";
import { Results } from "./Results";
import { OptiLiftFAQ } from "./OptiLiftFAQ";
import { ProviderForm } from "./ProviderForm";
import { OptiLiftFooter } from "./OptiLiftFooter";
function OptiLiftApp() {
  return React.createElement(
    "div",
    { "data-subbrand": "optilift" },
    React.createElement(Header, null),
    React.createElement(OptiLiftHero, null),
    React.createElement(Technology, null),
    React.createElement(Results, null),
    React.createElement(OptiLiftFAQ, null),
    React.createElement(ProviderForm, null),
    React.createElement(OptiLiftFooter, null),
  );
}
const el = document.getElementById("root");
if (el) ReactDOM.createRoot(el).render(React.createElement(OptiLiftApp, null));
