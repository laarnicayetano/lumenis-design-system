import { TextField, NewsletterSignup } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 300] as [number, number],
  name: "Fields & sign-up",
  subtitle: "Underlined inputs, light and inverse",
  padding: "20px",
};

export default function FormsSpecimen() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: 24,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <TextField label="Full name" placeholder="Dr. Evie Rose" />
        <TextField
          label="Work email"
          type="email"
          required
          placeholder="you@clinic.com"
        />
        <TextField label="How can we help?" multiline rows={2} />
      </div>
      <NewsletterSignup style={{ padding: "22px" }} />
    </div>
  );
}
