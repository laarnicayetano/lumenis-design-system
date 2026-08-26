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

export function ProviderCTA({ onBook }: { onBook: () => void }) {
  return (
    <section
      id="providers"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--lum-black)",
        padding: "var(--space-10) var(--page-gutter)",
      }}
    >
      <Rays
        tone="blue"
        clear="center"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <Eyebrow
          style={{ color: "var(--lum-white)", marginBottom: "var(--space-5)" }}
        >
          A bright solution for dry eyes
        </Eyebrow>
        <Headline
          tone="var(--lum-white)"
          style={{ marginBottom: "var(--space-5)" }}
        >
          Find an OptiLIGHT provider near you
        </Headline>
        <Prose
          tone="rgba(255,255,255,.8)"
          maxWidth="34ch"
          style={{ margin: "0 auto var(--space-7)" }}
        >
          Connect with a certified eye-care professional and take the first step
          toward lasting dry-eye comfort.
        </Prose>
        <div
          style={{
            display: "flex",
            gap: "var(--space-4)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button variant="accent" onClick={onBook}>
            Find a provider
          </Button>
          <Button variant="inverse" onClick={onBook}>
            Talk to our team
          </Button>
        </div>
      </div>
    </section>
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
  return (
    <footer
      style={{
        background: "var(--surface-page)",
        borderTop: "var(--border-width-hairline) solid var(--border-subtle)",
        padding: "var(--space-8) var(--page-gutter) var(--space-6)",
      }}
    >
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "var(--space-6)",
            marginBottom: "var(--space-8)",
          }}
        >
          <div>
            <Logotype variant="wordmark" tone="black" width={100} />
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--text-muted)",
                maxWidth: 280,
                marginTop: "var(--space-4)",
                lineHeight: 1.6,
              }}
            >
              OptiLIGHT™ by Lumenis — establishing light as a healing energy for
              the management of dry eye disease.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <Eyebrow
                style={{
                  color: "var(--text-muted)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {col.title}
              </Eyebrow>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 14.5,
                        color: "var(--text-primary)",
                        textDecoration: "none",
                      }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            paddingTop: "var(--space-5)",
            borderTop:
              "var(--border-width-hairline) solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12.5,
              color: "var(--text-muted)",
            }}
          >
            © 2026 Lumenis Be Ltd. OptiLIGHT™ and OPT™ are trademarks of
            Lumenis. For professional use.
          </div>
          <div
            style={{
              display: "flex",
              gap: "var(--space-5)",
              fontFamily: "var(--font-sans)",
              fontSize: 12.5,
              color: "var(--text-muted)",
            }}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ color: "inherit" }}
            >
              Privacy
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ color: "inherit" }}
            >
              Terms
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ color: "inherit" }}
            >
              Indications & safety
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function BookModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    if (open) setDone(false);
  }, [open]);
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(10,12,16,.5)",
        backdropFilter: "var(--blur-glass)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-5)",
      }}
    >
      <Card
        padding="0"
        style={{ width: "100%", maxWidth: 460, overflow: "hidden" }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div
          style={{
            position: "relative",
            height: 96,
            background: "var(--lum-blue)",
            overflow: "hidden",
          }}
        >
          <Rays
            tone="blue"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.6,
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
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
            }}
          >
            <Icon name="x" size={18} />
          </button>
          <div
            style={{
              position: "absolute",
              left: 24,
              bottom: 16,
              color: "var(--lum-white)",
            }}
          >
            <Eyebrow style={{ color: "inherit" }}>OptiLIGHT™</Eyebrow>
            <div
              style={{
                fontFamily: "var(--font-mix)",
                fontSize: 22,
                textTransform: "uppercase",
              }}
            >
              {done ? "You're all set" : "Find a provider"}
            </div>
          </div>
        </div>
        <div style={{ padding: "var(--space-6)" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "14px 0 6px" }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "var(--radius-pill)",
                  background: "#eef4ff",
                  color: "var(--lum-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto var(--space-4)",
                }}
              >
                <Icon name="check" size={28} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 20,
                  margin: "0 0 8px",
                }}
              >
                Request received
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14.5,
                  color: "var(--text-muted)",
                  margin: "0 auto var(--space-5)",
                  maxWidth: 300,
                }}
              >
                A certified OptiLIGHT provider near you will reach out within
                two business days.
              </p>
              <Button
                variant="accent"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={onClose}
              >
                Done
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              <TextField label="Full name" required placeholder="Jane Doe" />
              <TextField
                label="Email"
                type="email"
                required
                placeholder="jane@email.com"
              />
              <TextField
                label="ZIP / postal code"
                required
                placeholder="Search providers near you"
              />
              <Button
                variant="accent"
                type="submit"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 4,
                }}
              >
                Request a consultation
              </Button>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11.5,
                  color: "var(--text-muted)",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                For professional referral only. Not medical advice.
              </p>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}
