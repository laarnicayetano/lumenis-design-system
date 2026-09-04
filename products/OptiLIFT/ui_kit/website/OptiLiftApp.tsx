import React from "react";
import { createRoot } from "react-dom/client";
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
const el = document.getElementById("root");
if (el) createRoot(el).render(<OptiLiftApp />);
