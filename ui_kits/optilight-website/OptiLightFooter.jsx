import React from "react";
import {
  Headline,
  Prose,
  Eyebrow,
  Button,
  Rays,
  Logotype,
  Icon,
  Card,
  TextField,
} from "../../components";
export function ProviderCTA({ onBook }) {
  return React.createElement(
    "section",
    {
      id: "providers",
      style: {
        position: "relative",
        overflow: "hidden",
        background: "var(--lum-black)",
        padding: "var(--space-10) var(--page-gutter)",
      },
    },
    React.createElement(Rays, {
      tone: "blue",
      clear: "center",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.85,
      },
    }),
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          textAlign: "center",
          maxWidth: 760,
          margin: "0 auto",
        },
      },
      React.createElement(
        Eyebrow,
        {
          style: { color: "var(--lum-white)", marginBottom: "var(--space-5)" },
        },
        "A bright solution for dry eyes",
      ),
      React.createElement(
        Headline,
        {
          tone: "var(--lum-white)",
          style: { marginBottom: "var(--space-5)" },
        },
        "Find an OptiLIGHT provider near you",
      ),
      React.createElement(
        Prose,
        {
          tone: "rgba(255,255,255,.8)",
          maxWidth: "34ch",
          style: { margin: "0 auto var(--space-7)" },
        },
        "Connect with a certified eye-care professional and take the first step toward lasting dry-eye comfort.",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "var(--space-4)",
            justifyContent: "center",
            flexWrap: "wrap",
          },
        },
        React.createElement(Button, { variant: "accent", onClick: onBook }, "Find a provider"),
        React.createElement(Button, { variant: "inverse", onClick: onBook }, "Talk to our team"),
      ),
    ),
  );
}
const FOOTER_COLUMNS = [
  {
    title: "Treatment",
    links: ["The Treatment", "Technology", "Results", "FAQ"],
  },
  {
    title: "For Pros",
    links: ["Become a provider", "Clinical evidence", "Training", "Support"],
  },
  {
    title: "Company",
    links: ["About Lumenis", "Newsroom", "Careers", "Contact"],
  },
];
export function OptiLightFooter() {
  return React.createElement(
    "footer",
    {
      style: {
        background: "var(--surface-page)",
        borderTop: "var(--border-width-hairline) solid var(--border-subtle)",
        padding: "var(--space-8) var(--page-gutter) var(--space-6)",
      },
    },
    React.createElement(
      "div",
      { style: { maxWidth: "var(--page-max)", margin: "0 auto" } },
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "var(--space-6)",
            marginBottom: "var(--space-8)",
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(Logotype, { variant: "wordmark", tone: "black", width: 100 }),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--text-muted)",
                maxWidth: 280,
                marginTop: "var(--space-4)",
                lineHeight: 1.6,
              },
            },
            "OptiLIGHT\u2122 by Lumenis \u2014 establishing light as a healing energy for the management of dry eye disease.",
          ),
        ),
        FOOTER_COLUMNS.map((col) =>
          React.createElement(
            "div",
            { key: col.title },
            React.createElement(
              Eyebrow,
              {
                style: {
                  color: "var(--text-muted)",
                  marginBottom: "var(--space-4)",
                },
              },
              col.title,
            ),
            React.createElement(
              "ul",
              {
                style: {
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                },
              },
              col.links.map((l) =>
                React.createElement(
                  "li",
                  { key: l },
                  React.createElement(
                    "a",
                    {
                      href: "#",
                      onClick: (e) => e.preventDefault(),
                      style: {
                        fontFamily: "var(--font-sans)",
                        fontSize: 14.5,
                        color: "var(--text-primary)",
                        textDecoration: "none",
                      },
                    },
                    l,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            paddingTop: "var(--space-5)",
            borderTop: "var(--border-width-hairline) solid var(--border-subtle)",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontFamily: "var(--font-sans)",
              fontSize: 12.5,
              color: "var(--text-muted)",
            },
          },
          "\xA9 2026 Lumenis Be Ltd. OptiLIGHT\u2122 and OPT\u2122 are trademarks of Lumenis. For professional use.",
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: "var(--space-5)",
              fontFamily: "var(--font-sans)",
              fontSize: 12.5,
              color: "var(--text-muted)",
            },
          },
          React.createElement(
            "a",
            {
              href: "#",
              onClick: (e) => e.preventDefault(),
              style: { color: "inherit" },
            },
            "Privacy",
          ),
          React.createElement(
            "a",
            {
              href: "#",
              onClick: (e) => e.preventDefault(),
              style: { color: "inherit" },
            },
            "Terms",
          ),
          React.createElement(
            "a",
            {
              href: "#",
              onClick: (e) => e.preventDefault(),
              style: { color: "inherit" },
            },
            "Indications & safety",
          ),
        ),
      ),
    ),
  );
}
export function BookModal({ open, onClose }) {
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    if (open) setDone(false);
  }, [open]);
  if (!open) return null;
  return React.createElement(
    "div",
    {
      onClick: onClose,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(10,12,16,.5)",
        backdropFilter: "var(--blur-glass)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-5)",
      },
    },
    React.createElement(
      Card,
      {
        padding: "0",
        style: { width: "100%", maxWidth: 460, overflow: "hidden" },
        onClick: (e) => e.stopPropagation(),
      },
      React.createElement(
        "div",
        {
          style: {
            position: "relative",
            height: 96,
            background: "var(--lum-blue)",
            overflow: "hidden",
          },
        },
        React.createElement(Rays, {
          tone: "blue",
          style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.6,
          },
        }),
        React.createElement(
          "button",
          {
            onClick: onClose,
            "aria-label": "Close",
            style: {
              position: "absolute",
              top: 14,
              right: 14,
              color: "var(--lum-white)",
              background: "rgba(255,255,255,.18)",
              border: "none",
              borderRadius: "var(--radius-pill)",
              width: 32,
              height: 32,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          React.createElement(Icon, { name: "x", size: 18 }),
        ),
        React.createElement(
          "div",
          {
            style: {
              position: "absolute",
              left: 24,
              bottom: 16,
              color: "var(--lum-white)",
            },
          },
          React.createElement(Eyebrow, { style: { color: "inherit" } }, "OptiLIGHT\u2122"),
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "var(--font-mix)",
                fontSize: 22,
                textTransform: "uppercase",
              },
            },
            done ? "You're all set" : "Find a provider",
          ),
        ),
      ),
      React.createElement(
        "div",
        { style: { padding: "var(--space-6)" } },
        done
          ? React.createElement(
              "div",
              { style: { textAlign: "center", padding: "14px 0 6px" } },
              React.createElement(
                "div",
                {
                  style: {
                    width: 54,
                    height: 54,
                    borderRadius: "var(--radius-pill)",
                    background: "#eef4ff",
                    color: "var(--lum-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--space-4)",
                  },
                },
                React.createElement(Icon, { name: "check", size: 28 }),
              ),
              React.createElement(
                "h3",
                {
                  style: {
                    fontFamily: "var(--font-sans)",
                    fontSize: 20,
                    margin: "0 0 8px",
                  },
                },
                "Request received",
              ),
              React.createElement(
                "p",
                {
                  style: {
                    fontFamily: "var(--font-sans)",
                    fontSize: 14.5,
                    color: "var(--text-muted)",
                    margin: "0 auto var(--space-5)",
                    maxWidth: 300,
                  },
                },
                "A certified OptiLIGHT provider near you will reach out within two business days.",
              ),
              React.createElement(
                Button,
                {
                  variant: "accent",
                  style: { width: "100%", justifyContent: "center" },
                  onClick: onClose,
                },
                "Done",
              ),
            )
          : React.createElement(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  setDone(true);
                },
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                },
              },
              React.createElement(TextField, {
                label: "Full name",
                required: true,
                placeholder: "Jane Doe",
              }),
              React.createElement(TextField, {
                label: "Email",
                type: "email",
                required: true,
                placeholder: "jane@email.com",
              }),
              React.createElement(TextField, {
                label: "ZIP / postal code",
                required: true,
                placeholder: "Search providers near you",
              }),
              React.createElement(
                Button,
                {
                  variant: "accent",
                  type: "submit",
                  style: {
                    width: "100%",
                    justifyContent: "center",
                    marginTop: 4,
                  },
                },
                "Request a consultation",
              ),
              React.createElement(
                "p",
                {
                  style: {
                    fontFamily: "var(--font-sans)",
                    fontSize: 11.5,
                    color: "var(--text-muted)",
                    textAlign: "center",
                    margin: 0,
                  },
                },
                "For professional referral only. Not medical advice.",
              ),
            ),
      ),
    ),
  );
}
