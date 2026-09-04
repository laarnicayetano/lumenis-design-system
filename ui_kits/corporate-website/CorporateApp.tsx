import React from "react";
import { SiteHeader, SiteFooter } from "../../components";
import { NAV, FOOTER_COLUMNS } from "./shared";
import { Home } from "./Home";
import { Contact } from "./Contact";
import { ProductDetail } from "./ProductDetail";
interface View {
  page: string;
  id?: string;
}
function CorporateApp() {
  const [view, setView] = React.useState<View>({ page: "home" });
  const go = (page: string) => setView({ page: page === "contact" ? "contact" : "home" });
  return (
    <div>
      <SiteHeader
        nav={NAV}
        active={view.page === "home" ? "aesthetics" : view.page}
        onNavigate={go}
      />
      {view.page === "contact" ? (
        <Contact />
      ) : view.page === "product" ? (
        <ProductDetail id={view.id} onBack={() => go("home")} />
      ) : (
        <Home onOpenProduct={(id) => setView({ page: "product", id })} onNavigate={go} />
      )}
      <SiteFooter
        columns={FOOTER_COLUMNS}
        social={["facebook-logo", "instagram-logo", "linkedin-logo", "x-logo", "youtube-logo"]}
        policies={["Privacy Statement", "Terms of Use", "Safety Information", "Patents"]}
      />
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
if (el) globalThis.ReactDOM.createRoot(el).render(<CorporateApp />);
