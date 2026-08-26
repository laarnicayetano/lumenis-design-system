import React from "react";
import { Nav } from "./Nav";
import { OptiLightHero } from "./OptiLightHero";
import { ValueProps, PrismBand, ProductShowcase } from "./Sections";
import { HowItWorks, Testimonial, OptiLightFAQ } from "./Sectionsb";
import { ProviderCTA, OptiLightFooter, BookModal } from "./OptiLightFooter";
function OptiLightApp() {
  const [modal, setModal] = React.useState(false);
  const book = () => setModal(true);
  return React.createElement(
    "div",
    { "data-subbrand": "optilight" },
    React.createElement(Nav, { onBook: book }),
    React.createElement(OptiLightHero, { onBook: book }),
    React.createElement(ValueProps, null),
    React.createElement(PrismBand, null),
    React.createElement(ProductShowcase, null),
    React.createElement(HowItWorks, null),
    React.createElement(Testimonial, null),
    React.createElement(OptiLightFAQ, null),
    React.createElement(ProviderCTA, { onBook: book }),
    React.createElement(OptiLightFooter, null),
    React.createElement(BookModal, { open: modal, onClose: () => setModal(false) }),
  );
}
const el = document.getElementById("root");
if (el) globalThis.ReactDOM.createRoot(el).render(React.createElement(OptiLightApp, null));
