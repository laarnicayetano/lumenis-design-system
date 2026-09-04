import React from "react";
import { Header } from "./Header";
import { OptiLiftHero } from "./OptiLiftHero";
import { Technology } from "./Technology";
import { Results } from "./Results";
import { OptiLiftFAQ } from "./OptiLiftFAQ";
import { ProviderForm } from "./ProviderForm";
import { OptiLiftFooter } from "./OptiLiftFooter";
function OptiLiftApp() {
  return (
    <div data-subbrand="optilift">
      <Header />
      <OptiLiftHero />
      <Technology />
      <Results />
      <OptiLiftFAQ />
      <ProviderForm />
      <OptiLiftFooter />
    </div>
  );
}
// React/ReactDOM load from a <script> tag (see index.html), not an npm
// import, so this is the only way to type the global they attach.
declare global {
  // eslint-disable-next-line no-var -- `var` is required for a `declare global` ambient binding.
  var ReactDOM: {
    createRoot(container: Element | DocumentFragment): { render(children: React.ReactNode): void };
  };
}
const el = document.getElementById("root");
if (el) globalThis.ReactDOM.createRoot(el).render(<OptiLiftApp />);
