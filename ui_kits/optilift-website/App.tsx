import ReactDOM from 'react-dom/client';
import { Header } from './Header';
import { Hero } from './Hero';
import { Technology } from './Technology';
import { Results } from './Results';
import { FAQ } from './FAQ';
import { ProviderForm } from './ProviderForm';
import { Footer } from './Footer';

/* The whole page sits inside [data-subbrand="optilift"] so --accent/
   --accent-contrast resolve to the OptiLIFT violet instead of corporate
   black (see tokens/subbrands.css). */
function App() {
  return (
    <div data-subbrand="optilift">
      <Header />
      <Hero />
      <Technology />
      <Results />
      <FAQ />
      <ProviderForm />
      <Footer />
    </div>
  );
}

const el = document.getElementById('root');
if (el) ReactDOM.createRoot(el).render(<App />);
