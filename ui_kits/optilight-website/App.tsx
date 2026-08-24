import React from 'react';
import ReactDOM from 'react-dom/client';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { ValueProps, PrismBand, ProductShowcase } from './Sections';
import { HowItWorks, Testimonial, FAQ } from './Sectionsb';
import { ProviderCTA, Footer, BookModal } from './Footer';

/* The whole page sits inside [data-subbrand="optilight"] so --accent/
   --accent-contrast resolve to the OptiLIGHT blue instead of corporate
   black (see tokens/subbrands.css). */
function App() {
  const [modal, setModal] = React.useState(false);
  const book = () => setModal(true);
  return (
    <div data-subbrand="optilight">
      <Nav onBook={book} />
      <Hero onBook={book} />
      <ValueProps />
      <PrismBand />
      <ProductShowcase />
      <HowItWorks />
      <Testimonial />
      <FAQ />
      <ProviderCTA onBook={book} />
      <Footer />
      <BookModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

const el = document.getElementById('root');
if (el) ReactDOM.createRoot(el).render(<App />);
