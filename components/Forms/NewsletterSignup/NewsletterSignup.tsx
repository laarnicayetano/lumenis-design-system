import React from "react";
/**
 * Email sign-up block with consent line.
 */
export interface NewsletterSignupProps {
  heading?: string;
  cta?: string;
  consent?: string;
  tone?: "page" | "inverse";
  onSubmit?: (email: string) => void;
  style?: React.CSSProperties;
}
import { TextField } from "../TextField/TextField";
import { Button } from "../../Actions/Button/Button";
import { Headline } from "../../Typography/Headline/Headline";
export function NewsletterSignup({
  heading = "Science with us \u2014 reads for your inbox",
  cta = "Sign up",
  consent = "By signing up, you consent to receive Lumenis emails.",
  tone = "inverse",
  onSubmit,
  style,
  ...rest
}: NewsletterSignupProps) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const inverse = tone === "inverse";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        if (onSubmit) onSubmit(email);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        background: inverse ? "var(--surface-inverse)" : "var(--surface-page)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
        padding: "var(--space-8)",
        ...style,
      }}
      {...rest}
    >
      <Headline as="h2" size="small">
        {heading}
      </Headline>
      {sent ? (
        <p style={{ margin: 0, fontSize: "var(--text-body)" }}>
          Thank you — check your inbox to confirm.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "var(--space-5)",
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Email"
            type="email"
            required
            tone={tone}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: "1 1 280px" }}
          />
          <Button variant={inverse ? "inverse" : "primary"} size="sm">
            {cta}
          </Button>
        </div>
      )}
      <span
        style={{
          fontSize: "var(--text-caption)",
          letterSpacing: "var(--tracking-caption)",
          textTransform: "uppercase",
          opacity: 0.55,
        }}
      >
        *{consent}
      </span>
    </form>
  );
}
