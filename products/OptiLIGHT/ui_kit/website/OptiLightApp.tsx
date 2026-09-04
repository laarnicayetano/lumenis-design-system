import React from "react";
import { Nav } from "./Nav";
import { OptiLightHero } from "./OptiLightHero";
import { ValueProps, PrismBand, ProductShowcase } from "./Sections";
import { HowItWorks, Testimonial, OptiLightFAQ } from "./Sectionsb";
import { ProviderCTA, OptiLightFooter, BookModal } from "./OptiLightFooter";
function OptiLightApp() {
  const [modal, setModal] = React.useState(false);
  const book = () => setModal(true);
  return (
    <div data-subbrand="optilight">
      <Nav onBook={book} />
      <OptiLightHero onBook={book} />
      <ValueProps />
      <PrismBand />
      <ProductShowcase />
      <HowItWorks />
      <Testimonial />
      <OptiLightFAQ />
      <ProviderCTA onBook={book} />
      <OptiLightFooter />
      <BookModal open={modal} onClose={() => setModal(false)} />
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
if (el) globalThis.ReactDOM.createRoot(el).render(<OptiLightApp />);
