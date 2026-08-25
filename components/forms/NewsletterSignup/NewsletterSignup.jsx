import React from "react";
import { TextField } from "../TextField/TextField";
import { Button } from "../../actions/Button/Button";
import { Headline } from "../../typography/Headline/Headline";
export function NewsletterSignup({
  heading = "Science with us \u2014 reads for your inbox",
  cta = "Sign up",
  consent = "By signing up, you consent to receive Lumenis emails.",
  tone = "inverse",
  onSubmit,
  style,
  ...rest
}) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const inverse = tone === "inverse";
  return React.createElement(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
        if (onSubmit) onSubmit(email);
      },
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        background: inverse ? "var(--surface-inverse)" : "var(--surface-page)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
        padding: "var(--space-8)",
        ...style,
      },
      ...rest,
    },
    React.createElement(Headline, { as: "h2", size: "small" }, heading),
    sent
      ? React.createElement(
          "p",
          { style: { margin: 0, fontSize: "var(--text-body)" } },
          "Thank you \u2014 check your inbox to confirm.",
        )
      : React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "flex-end",
              gap: "var(--space-5)",
              flexWrap: "wrap",
            },
          },
          React.createElement(TextField, {
            label: "Email",
            type: "email",
            required: true,
            tone,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            style: { flex: "1 1 280px" },
          }),
          React.createElement(
            Button,
            { variant: inverse ? "inverse" : "primary", size: "sm" },
            cta,
          ),
        ),
    React.createElement(
      "span",
      {
        style: {
          fontSize: "var(--text-caption)",
          letterSpacing: "var(--tracking-caption)",
          textTransform: "uppercase",
          opacity: 0.55,
        },
      },
      "*",
      consent,
    ),
  );
}
