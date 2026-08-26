import React from 'react';
import ReactDOM from 'react-dom/client';
import { SiteHeader, SiteFooter } from '../../components';
import { NAV, FOOTER_COLUMNS } from './shared';
import { Home } from './Home';
import { Contact } from './Contact';
import { ProductDetail, type ProductId } from './ProductDetail';

type View = { page: 'home' | 'contact' | 'product'; id?: ProductId };

function CorporateApp() {
  const [view, setView] = React.useState<View>({ page: 'home' });
  const go = (page: string) => setView({ page: page === 'contact' ? 'contact' : 'home' });
  return (
    <div>
      <SiteHeader nav={NAV} active={view.page === 'home' ? 'aesthetics' : view.page} onNavigate={go} />
      {view.page === 'contact'
        ? <Contact />
        : view.page === 'product'
          ? <ProductDetail id={view.id} onBack={() => go('home')} />
          : <Home onOpenProduct={(id) => setView({ page: 'product', id: id as ProductId })} onNavigate={go} />}
      <SiteFooter columns={FOOTER_COLUMNS} social={['facebook-logo', 'instagram-logo', 'linkedin-logo', 'x-logo', 'youtube-logo']} policies={['Privacy Statement', 'Terms of Use', 'Safety Information', 'Patents']} />
    </div>
  );
}

const el = document.getElementById('root');
if (el) ReactDOM.createRoot(el).render(<CorporateApp />);
