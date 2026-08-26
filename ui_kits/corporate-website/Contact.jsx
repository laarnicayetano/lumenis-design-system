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
  return React.createElement(
    SplitLayout,
    { ratio: "6fr 6fr", minHeight: "720px" },
    React.createElement(
      SplitPanel,
      { align: "space-between", pad: "var(--space-9) var(--page-gutter)" },
      React.createElement(Eyebrow, { style: { color: "var(--text-muted)" } }, "Contact"),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "var(--space-6)" } },
        React.createElement(
          Headline,
          { size: "title", heroL: "HELP" },
          "We\u2019re here to help with any questions",
        ),
        React.createElement(
          Prose,
          null,
          "Please fill out our form, and we\u2019ll get in touch shortly. For service and technical support, reach the Lumenis Global Service Organization directly.",
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: "var(--space-8)",
              paddingTop: "var(--space-6)",
              borderTop: "var(--border-width-hairline) solid var(--border-subtle)",
            },
          },
          React.createElement(
            "div",
            null,
            React.createElement(Eyebrow, { style: { color: "var(--text-muted)" } }, "Support"),
            React.createElement(Prose, { size: "small" }, "USService@lumenis.com"),
          ),
          React.createElement(
            "div",
            null,
            React.createElement(Eyebrow, { style: { color: "var(--text-muted)" } }, "Phone"),
            React.createElement(Prose, { size: "small" }, "877-586-3647"),
          ),
        ),
      ),
    ),
    React.createElement(
      SplitPanel,
      { tone: "inverse", align: "center", pad: "var(--space-9) var(--page-gutter)" },
      sent
        ? React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: "var(--space-5)" } },
            React.createElement(
              Headline,
              { size: "small", tone: "var(--text-inverse)" },
              "Thank you",
            ),
            React.createElement(
              Prose,
              { tone: "var(--text-inverse)" },
              "A Lumenis representative will be in touch shortly.",
            ),
            React.createElement(
              Button,
              { variant: "inverse-outline", size: "sm", onClick: () => setSent(false) },
              "Send another",
            ),
          )
        : React.createElement(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                setSent(true);
              },
              style: { display: "flex", flexDirection: "column", gap: "var(--space-6)" },
            },
            React.createElement(
              "div",
              { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" } },
              React.createElement(TextField, {
                label: "First name",
                tone: "inverse",
                required: true,
                placeholder: "Evie",
              }),
              React.createElement(TextField, {
                label: "Last name",
                tone: "inverse",
                required: true,
                placeholder: "Rose",
              }),
              React.createElement(TextField, {
                label: "Work email",
                type: "email",
                tone: "inverse",
                required: true,
                placeholder: "you@clinic.com",
              }),
              React.createElement(TextField, {
                label: "Practice",
                tone: "inverse",
                placeholder: "Aesthetic Clinic London",
              }),
            ),
            React.createElement(TextField, {
              label: "Area of interest",
              tone: "inverse",
              placeholder: "Aesthetics \xB7 Vision",
            }),
            React.createElement(TextField, {
              label: "How can we help?",
              tone: "inverse",
              multiline: true,
              rows: 4,
            }),
            React.createElement(
              Button,
              { variant: "inverse", style: { alignSelf: "flex-start" } },
              "Submit",
            ),
            React.createElement(
              Eyebrow,
              { style: { color: "rgba(255,255,255,.55)" } },
              "*By submitting, you consent to receive Lumenis emails.",
            ),
          ),
    ),
  );
}
