import React from "react";
import ReactDOM from "react-dom/client";
import { SiteHeader, SiteFooter } from "../../components";
import { NAV, FOOTER_COLUMNS } from "./shared";
import { Home } from "./Home";
import { Contact } from "./Contact";
import { ProductDetail } from "./ProductDetail";
function CorporateApp() {
  const [view, setView] = React.useState({ page: "home" });
  const go = (page) => setView({ page: page === "contact" ? "contact" : "home" });
  return React.createElement(
    "div",
    null,
    React.createElement(SiteHeader, {
      nav: NAV,
      active: view.page === "home" ? "aesthetics" : view.page,
      onNavigate: go,
    }),
    view.page === "contact"
      ? React.createElement(Contact, null)
      : view.page === "product"
        ? React.createElement(ProductDetail, { id: view.id, onBack: () => go("home") })
        : React.createElement(Home, {
            onOpenProduct: (id) => setView({ page: "product", id }),
            onNavigate: go,
          }),
    React.createElement(SiteFooter, {
      columns: FOOTER_COLUMNS,
      social: ["facebook-logo", "instagram-logo", "linkedin-logo", "x-logo", "youtube-logo"],
      policies: ["Privacy Statement", "Terms of Use", "Safety Information", "Patents"],
    }),
  );
}
const el = document.getElementById("root");
if (el) ReactDOM.createRoot(el).render(React.createElement(CorporateApp, null));
