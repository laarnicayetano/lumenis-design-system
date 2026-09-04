import React from "react";
import { Headline, Prose, Eyebrow, Quote, Icon, Rays } from "../../../../components";
const STEPS = [
  {
    n: "01",
    t: "Consult",
    d: "An eye-care professional confirms OptiLIGHT is right for your dry-eye disease.",
  },
  {
    n: "02",
    t: "Treat",
    d: "Gentle pulses of light are applied around the eye in a short in-office session.",
  },
  {
    n: "03",
    t: "Relief",
    d: "Across a series of sessions, tear quality and day-to-day comfort improve.",
  },
];
export function HowItWorks() {
  return (
    <section id="results" style={{ padding: "var(--space-10) var(--page-gutter)" }}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "var(--space-5)",
            marginBottom: "var(--space-8)",
          }}
        >
          <Headline as="h2" size="small" mix="TREATMENT" style={{ maxWidth: 520 }}>
            How a course of treatment works
          </Headline>
          <Prose size="small" tone="var(--text-muted)" maxWidth="26ch">
            A typical plan is four sessions, spaced a few weeks apart, tailored by your provider.
          </Prose>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            borderTop: "var(--border-width-hairline) solid var(--border-subtle)",
          }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              style={{
                padding: "34px 28px 34px " + (i > 0 ? "28px" : "0"),
                borderRight:
                  i < 2 ? "var(--border-width-hairline) solid var(--border-subtle)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mix)",
                  fontSize: 40,
                  color: "var(--lum-blue)",
                  marginBottom: "var(--space-5)",
                }}
              >
                {s.n}
              </div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 21, margin: "0 0 10px" }}>
                {s.t}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--text-muted)",
                  margin: 0,
                  maxWidth: 280,
                }}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Testimonial() {
  return (
    <section style={{ background: "var(--lum-blue)", position: "relative", overflow: "hidden" }}>
      <Rays
        tone="blue"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "var(--space-10) var(--page-gutter)",
        }}
      >
        <div style={{ maxWidth: 820 }}>
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: "var(--space-5)",
              color: "var(--lum-white)",
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" size={20} />
            ))}
          </div>
          <Quote tone="inverse" style={{ maxWidth: "46ch", marginBottom: 0 }}>
            "For the first time my patients describe their eyes as comfortable again. OptiLIGHT made
            light-based therapy feel precise, calm and genuinely elegant."
          </Quote>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              color: "var(--lum-white)",
              marginTop: "var(--space-6)",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                overflow: "hidden",
                background: "rgba(255,255,255,.2)",
              }}
            >
              <img
                src="../../../../assets/photography/people-warm-closeup.webp"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>Dr. A. Moreau</div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "rgba(255,255,255,.8)",
                }}
              >
                Ophthalmologist · Dry-Eye Clinic
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const FAQS = [
  {
    q: "What is OptiLIGHT used for?",
    a: "OptiLIGHT is an Intense Pulsed Light device cleared for the management of dry eye disease. It is delivered by a trained eye-care professional.",
  },
  {
    q: "Does the treatment hurt?",
    a: "Most patients describe a gentle, warm flicker of light. A cooling applicator keeps the experience comfortable, and there is no downtime afterward.",
  },
  {
    q: "How many sessions will I need?",
    a: "A typical course is four sessions spaced a few weeks apart, though your provider will tailor the plan to your needs.",
  },
  {
    q: "Who can be treated?",
    a: "OptiLIGHT is intended for appropriate skin types and is determined by your provider during consultation. It is for professional use only.",
  },
];
interface FAQItemProps {
  q: string;
  a: string;
  open: boolean;
  onClick: () => void;
}
function FAQItem({ q, a, open, onClick }: FAQItemProps) {
  return (
    <div style={{ borderBottom: "var(--border-width-hairline) solid var(--border-subtle)" }}>
      <button
        onClick={onClick}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "var(--space-5)",
          padding: "24px 0",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {q}
        </span>
        <span
          style={{
            color: "var(--lum-blue)",
            flexShrink: 0,
            transition: "transform var(--dur-fast) var(--ease-brand)",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          <Icon name="plus" size={22} />
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 260 : 0,
          overflow: "hidden",
          transition: "max-height var(--dur-base) var(--ease-brand)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15.5,
            lineHeight: 1.65,
            color: "var(--text-muted)",
            margin: 0,
            paddingBottom: "var(--space-5)",
            maxWidth: 680,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}
export function OptiLightFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: "var(--space-10) var(--page-gutter)", background: "#f7f8fa" }}>
      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.8fr 1.2fr",
          gap: "var(--space-8)",
        }}
      >
        <div>
          <Eyebrow style={{ color: "var(--lum-blue)", marginBottom: "var(--space-4)" }}>
            Questions
          </Eyebrow>
          <Headline as="h2" size="small" style={{ maxWidth: 300 }}>
            Good to know
          </Headline>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <FAQItem
              key={f.q}
              {...f}
              open={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
