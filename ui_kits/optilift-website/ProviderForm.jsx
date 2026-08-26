import React from "react";
import { Headline, Prose, TextField, Select, Checkbox, Button } from "../../components";
export function ProviderForm() {
  const [sent, setSent] = React.useState(false);
  const [consent, setConsent] = React.useState(false);
  return React.createElement(
    "section",
    {
      id: "provider-form",
      style: { padding: "var(--space-9) var(--page-gutter)", background: "var(--surface-image)" },
    },
    React.createElement(
      "div",
      { style: { maxWidth: 480, margin: "0 auto", textAlign: "center" } },
      React.createElement(
        Headline,
        { as: "h2", size: "small", align: "center", style: { marginBottom: "var(--space-3)" } },
        "Find a provider near you",
      ),
      React.createElement(
        Prose,
        { tone: "var(--text-muted)", style: { margin: "0 auto var(--space-7)" } },
        "Tell us where you are and we'll connect you with a certified OptiLIFT provider.",
      ),
      sent
        ? React.createElement(
            Prose,
            { tone: "var(--accent)", size: "subtitle" },
            "Thanks \u2014 a provider will reach out within 2 business days.",
          )
        : React.createElement(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                setSent(true);
              },
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-5)",
                textAlign: "left",
              },
            },
            React.createElement(TextField, {
              label: "Full name",
              placeholder: "Jane Doe",
              required: true,
            }),
            React.createElement(TextField, {
              label: "ZIP code",
              placeholder: "90210",
              required: true,
            }),
            React.createElement(Select, {
              label: "Preferred treatment",
              placeholder: "Choose one",
              options: ["Face & neck", "Face only", "Not sure yet"],
            }),
            React.createElement(Checkbox, {
              label: "I'd like to receive email updates",
              checked: consent,
              onChange: () => setConsent(!consent),
            }),
            React.createElement(Button, { type: "submit", variant: "accent" }, "Request a match"),
          ),
    ),
  );
}
