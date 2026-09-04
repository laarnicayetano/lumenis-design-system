import React from "react";
import { Headline, Prose, TextField, Select, Checkbox, Button } from "../../../../components";
export function ProviderForm() {
  const [sent, setSent] = React.useState(false);
  const [consent, setConsent] = React.useState(false);
  return (
    <section
      id="provider-form"
      style={{ padding: "var(--space-9) var(--page-gutter)", background: "var(--surface-image)" }}
    >
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <Headline as="h2" size="small" align="center" style={{ marginBottom: "var(--space-3)" }}>
          Find a provider near you
        </Headline>
        <Prose tone="var(--text-muted)" style={{ margin: "0 auto var(--space-7)" }}>
          Tell us where you are and we'll connect you with a certified OptiLIFT provider.
        </Prose>
        {sent ? (
          <Prose tone="var(--accent)" size="subtitle">
            Thanks — a provider will reach out within 2 business days.
          </Prose>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
              textAlign: "left",
            }}
          >
            <TextField label="Full name" placeholder="Jane Doe" required />
            <TextField label="ZIP code" placeholder="90210" required />
            <Select
              label="Preferred treatment"
              placeholder="Choose one"
              options={["Face & neck", "Face only", "Not sure yet"]}
            />
            <Checkbox
              label="I'd like to receive email updates"
              checked={consent}
              onChange={() => setConsent(!consent)}
            />
            <Button type="submit" variant="accent">
              Request a match
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
