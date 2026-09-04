import React from "react";
import { createRoot } from "react-dom/client";
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
const el = document.getElementById("root");
if (el) createRoot(el).render(<OptiLightApp />);
