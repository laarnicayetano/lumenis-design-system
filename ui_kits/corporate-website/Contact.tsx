import React from "react";
import {
  SplitLayout,
  SplitPanel,
  Eyebrow,
  Headline,
  Prose,
  Button,
  TextField,
} from "../../components";
export function Contact() {
  const [sent, setSent] = React.useState(false);
  return (
    <SplitLayout ratio="6fr 6fr" minHeight="720px">
      <SplitPanel align="space-between" pad="var(--space-9) var(--page-gutter)">
        <Eyebrow style={{ color: "var(--text-muted)" }}>Contact</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <Headline size="title" heroL="HELP">
            We’re here to help with any questions
          </Headline>
          <Prose>
            Please fill out our form, and we’ll get in touch shortly. For service and technical
            support, reach the Lumenis Global Service Organization directly.
          </Prose>
          <div
            style={{
              display: "flex",
              gap: "var(--space-8)",
              paddingTop: "var(--space-6)",
              borderTop: "var(--border-width-hairline) solid var(--border-subtle)",
            }}
          >
            <div>
              <Eyebrow style={{ color: "var(--text-muted)" }}>Support</Eyebrow>
              <Prose size="small">USService@lumenis.com</Prose>
            </div>
            <div>
              <Eyebrow style={{ color: "var(--text-muted)" }}>Phone</Eyebrow>
              <Prose size="small">877-586-3647</Prose>
            </div>
          </div>
        </div>
      </SplitPanel>
      <SplitPanel tone="inverse" align="center" pad="var(--space-9) var(--page-gutter)">
        {sent ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            <Headline size="small" tone="var(--text-inverse)">
              Thank you
            </Headline>
            <Prose tone="var(--text-inverse)">
              A Lumenis representative will be in touch shortly.
            </Prose>
            <Button variant="inverse-outline" size="sm" onClick={() => setSent(false)}>
              Send another
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
              <TextField label="First name" tone="inverse" required placeholder="Evie" />
              <TextField label="Last name" tone="inverse" required placeholder="Rose" />
              <TextField
                label="Work email"
                type="email"
                tone="inverse"
                required
                placeholder="you@clinic.com"
              />
              <TextField label="Practice" tone="inverse" placeholder="Aesthetic Clinic London" />
            </div>
            <TextField label="Area of interest" tone="inverse" placeholder="Aesthetics · Vision" />
            <TextField label="How can we help?" tone="inverse" multiline rows={4} />
            <Button variant="inverse" style={{ alignSelf: "flex-start" }}>
              Submit
            </Button>
            <Eyebrow style={{ color: "rgba(255,255,255,.55)" }}>
              *By submitting, you consent to receive Lumenis emails.
            </Eyebrow>
          </form>
        )}
      </SplitPanel>
    </SplitLayout>
  );
}
