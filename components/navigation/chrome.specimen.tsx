import { SiteHeader, SiteFooter } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 360] as [number, number],
  name: "Header & footer",
  subtitle: "Corporate site chrome",
  padding: "0px",
};

const NAV = [
  { id: "aesthetics", label: "Aesthetics" },
  { id: "vision", label: "Vision" },
  { id: "resources", label: "Resources" },
  { id: "about", label: "About" },
  { id: "support", label: "Support" },
  { id: "contact", label: "Contact" },
];

const FOOTER_COLUMNS = [
  { title: "Company", links: ["About Lumenis", "Leadership", "Careers", "Partner Zone"] },
  { title: "Aesthetics", links: ["Hair Removal", "Body", "Skin", "Hair Loss"] },
  { title: "Vision", links: ["Dry Eye", "Glaucoma", "Retina"] },
];

const SOCIAL = ["facebook-logo", "instagram-logo", "linkedin-logo", "youtube-logo"];
const POLICIES = ["Privacy Statement", "Terms of Use"];

export default function ChromeSpecimen() {
  return (
    <div style={{ transform: "scale(.55)", transformOrigin: "top left", width: "1272px" }}>
      <SiteHeader active="aesthetics" nav={NAV} />
      <SiteFooter columns={FOOTER_COLUMNS} social={SOCIAL} policies={POLICIES} />
    </div>
  );
}
