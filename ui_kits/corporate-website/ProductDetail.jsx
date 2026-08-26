import React from "react";
import {
  SplitLayout,
  SplitPanel,
  TextLink,
  Eyebrow,
  Headline,
  Prose,
  Button,
  Icon,
  InsightCard,
} from "../../components";
import { Section, SectionHead, ImagePlate, INSIGHTS } from "./shared";
export const PRODUCT_DATA = {
  "stellar-m22": {
    name: "Stellar M22\u2122",
    market: "Aesthetics \xB7 Multi-application IPL platform",
    kicker: "Now with AI technology",
    headline: "The expert tool to elevate your practice",
    mix: "EXPERT",
    lede: "Stellar M22 is a powerful modular multi-application platform, inspired by the brightest constellation in the sky. Treat different indications across skin types, ages and genders \u2014 without disposables.",
    treatments: [
      "Skin rejuvenation",
      "Pigmentation",
      "Vascular lesions",
      "Acne",
      "Scar revision",
      "Tattoo removal",
    ],
    specs: [
      ["Modules", "Up to 4 applications"],
      ["Technologies", "IPL \xB7 ResurFX \xB7 Q-Switched Nd:YAG"],
      ["Disposables", "None required"],
      ["Indications", "30+ cleared"],
    ],
    claim: "Stimulates new collagen and elastin fibres to improve texture, tone and fine lines.",
  },
  optilight: {
    name: "OptiLIGHT",
    market: "Vision \xB7 Dry eye",
    kicker: "New age of dry eyes solution",
    headline: "A bright solution for dry eyes",
    mix: "BRIGHT",
    lede: "OptiLIGHT elevates dry eye management with Lumenis\u2019 patented Optimal Pulse Technology (OPT\u2122) and user-centered design.",
    treatments: ["Meibomian gland dysfunction", "Evaporative dry eye", "Ocular rosacea", "Demodex"],
    specs: [
      ["Technology", "Optimal Pulse Technology (OPT\u2122)"],
      ["Treatment time", "Under 15 minutes"],
      ["Sessions", "4 recommended"],
      ["Clearance", "FDA cleared"],
    ],
    claim:
      "The first and only IPL FDA-approved for dry eye management due to meibomian gland dysfunction.",
  },
  trilift: {
    name: "triLift",
    market: "Aesthetics \xB7 Facial muscle stimulation",
    kicker: "A new category in facial aesthetics",
    headline: "Back to yourself, naturally",
    mix: "NATURALLY",
    lede: "triLift is an innovative, non-invasive treatment combining three technologies in one device to produce the natural face-lift-like effect that patients desire.",
    treatments: [
      "Facial muscle stimulation",
      "Skin tightening",
      "Texture and tone",
      "Contour definition",
    ],
    specs: [
      ["Technologies", "DMSt \xB7 TriPollar\xAE RF \xB7 Micro-needling"],
      ["Downtime", "None"],
      ["Protocol", "4\u20136 sessions"],
      ["Areas", "Face \xB7 jawline \xB7 neck"],
    ],
    claim: "Stimulating the muscle layer beneath the skin \u2014 the foundation the face rests on.",
  },
  folix: {
    name: "FoLix\u2122",
    market: "Aesthetics \xB7 Hair loss",
    kicker: "Award-winning hair loss technology",
    headline: "Grow naturally",
    mix: "GROW",
    lede: "FoLix is a non-ablative fractional laser system using hair stimulation technology \u2014 effective, safe and simple treatment for women and men.",
    treatments: ["Androgenetic alopecia", "Thinning hair", "Post-transplant support"],
    specs: [
      ["Technology", "Non-ablative fractional laser"],
      ["Anaesthetic", "None required"],
      ["Protocol", "4 sessions, 4 weeks apart"],
      ["Recognition", "NewBeauty award, two years running"],
    ],
    claim: "No needles, no downtime, no topical regimen to maintain.",
  },
};
export function ProductDetail({ id = "stellar-m22", onBack }) {
  const p = PRODUCT_DATA[id] || PRODUCT_DATA["stellar-m22"];
  return React.createElement(
    "div",
    { "data-subbrand": id },
    React.createElement(
      SplitLayout,
      { ratio: "6fr 6fr", minHeight: "520px" },
      React.createElement(
        SplitPanel,
        { align: "space-between", pad: "var(--space-9) var(--page-gutter)" },
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "var(--space-3)" } },
          React.createElement(
            TextLink,
            {
              href: "#",
              caps: true,
              size: "caption",
              onClick: (e) => {
                e.preventDefault();
                onBack();
              },
            },
            "\u2190 All products",
          ),
          React.createElement(Eyebrow, { style: { color: "var(--accent)" } }, p.kicker),
        ),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "var(--space-6)" } },
          React.createElement(Headline, { size: "title", mix: p.mix }, p.headline),
          React.createElement(Prose, null, p.lede),
          React.createElement(
            "div",
            { style: { display: "flex", gap: "var(--space-4)" } },
            React.createElement(Button, { variant: "accent" }, "Book a demo"),
            React.createElement(Button, { variant: "secondary" }, "Download kit"),
          ),
        ),
      ),
      React.createElement(
        SplitPanel,
        { tone: "image", pad: "0" },
        React.createElement(ImagePlate, {
          label: p.name + " \u2014 device photography",
          ratio: "auto",
          style: { height: "100%" },
        }),
      ),
    ),
    React.createElement(
      Section,
      { pad: "var(--space-9) var(--page-gutter)" },
      React.createElement(
        "div",
        { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-10)" } },
        React.createElement(
          "div",
          null,
          React.createElement(SectionHead, null, "Treatments"),
          React.createElement(
            "ul",
            {
              style: {
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
              },
            },
            p.treatments.map((t) =>
              React.createElement(
                "li",
                {
                  key: t,
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-4)",
                    padding: "var(--space-4) 0",
                    borderBottom: "var(--border-width-hairline) solid var(--border-subtle)",
                    fontSize: "var(--text-body)",
                  },
                },
                React.createElement(Icon, { name: "sparkle", size: 20, tone: "var(--accent)" }),
                t,
              ),
            ),
          ),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(SectionHead, null, "At a glance"),
          React.createElement(
            "dl",
            {
              style: {
                margin: 0,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "var(--space-6)",
              },
            },
            p.specs.map(([k, v]) =>
              React.createElement(
                React.Fragment,
                { key: k },
                React.createElement(
                  "dt",
                  {
                    style: {
                      padding: "var(--space-4) 0",
                      borderBottom: "var(--border-width-hairline) solid var(--border-subtle)",
                      fontSize: "var(--text-caption)",
                      letterSpacing: "var(--tracking-caption)",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    },
                  },
                  k,
                ),
                React.createElement(
                  "dd",
                  {
                    style: {
                      margin: 0,
                      padding: "var(--space-4) 0",
                      borderBottom: "var(--border-width-hairline) solid var(--border-subtle)",
                      fontSize: "var(--text-form)",
                    },
                  },
                  v,
                ),
              ),
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      Section,
      { tone: "accent", pad: "var(--space-9) var(--page-gutter)" },
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "var(--space-9)",
            alignItems: "end",
          },
        },
        React.createElement(Headline, { size: "small", tone: "var(--accent-contrast)" }, p.claim),
        React.createElement(
          Button,
          { variant: "inverse", size: "sm", style: { justifySelf: "end" } },
          "See clinical studies",
        ),
      ),
    ),
    React.createElement(
      Section,
      null,
      React.createElement(SectionHead, { action: "View all" }, "Practitioner stories"),
      React.createElement(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-7)" },
        },
        INSIGHTS.map((i) =>
          React.createElement(InsightCard, { key: i.title, title: i.title, topics: i.topics }),
        ),
      ),
    ),
  );
}
