import React from 'react';
import ReactDOM from 'react-dom/client';
import { Nav } from './Nav';
import { OptiLightHero } from './OptiLightHero';
import { ValueProps, PrismBand, ProductShowcase } from './Sections';
import { HowItWorks, Testimonial, OptiLightFAQ } from './Sectionsb';
import { ProviderCTA, OptiLightFooter, BookModal } from './OptiLightFooter';

/* The whole page sits inside [data-subbrand="optilight"] so --accent/
   --accent-contrast resolve to the OptiLIGHT blue instead of corporate
   black (see tokens/subbrands.css). */
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

const el = document.getElementById('root');
if (el) ReactDOM.createRoot(el).render(<OptiLightApp />);
