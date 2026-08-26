import ReactDOM from 'react-dom/client';
import { Header } from './Header';
import { OptiLiftHero } from './OptiLiftHero';
import { Technology } from './Technology';
import { Results } from './Results';
import { OptiLiftFAQ } from './OptiLiftFAQ';
import { ProviderForm } from './ProviderForm';
import { OptiLiftFooter } from './OptiLiftFooter';

/* The whole page sits inside [data-subbrand="optilift"] so --accent/
   --accent-contrast resolve to the OptiLIFT violet instead of corporate
   black (see tokens/subbrands.css). */
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

const el = document.getElementById('root');
if (el) ReactDOM.createRoot(el).render(<OptiLiftApp />);
