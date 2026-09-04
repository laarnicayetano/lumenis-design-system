import React from "react";
import {
  SplitLayout,
  SplitPanel,
  Eyebrow,
  Headline,
  Prose,
  Button,
  StatBlock,
  ProductCard,
  Icon,
  Quote,
  InsightCard,
  NewsletterSignup,
} from "../../components";
import { Section, SectionHead, ImagePlate, PRODUCTS, INSIGHTS } from "./shared";
interface HomeProps {
  onOpenProduct: (id: string) => void;
  onNavigate: (page: string) => void;
}
export function Home({ onOpenProduct, onNavigate }: HomeProps) {
  return (
    <div>
      <SplitLayout ratio="6fr 6fr" minHeight="560px">
        <SplitPanel align="space-between" pad="var(--space-9) var(--page-gutter)">
          <Eyebrow style={{ color: "var(--text-muted)" }}>60 years pushing boundaries</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <Headline heroL="EMPOWERING">Empowering you, your way</Headline>
            <Prose size="subtitle" style={{ maxWidth: "30ch" }}>
              Minimally invasive, energy-based solutions for the Aesthetic and Vision markets.
            </Prose>
            <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
              <Button onClick={() => onOpenProduct("stellar-m22")}>Discover more</Button>
              <Button variant="secondary" onClick={() => onNavigate("contact")}>
                Talk to us
              </Button>
            </div>
          </div>
        </SplitPanel>
        <SplitPanel tone="image" pad="0">
          <ImagePlate
            label="Hero photography — practitioner"
            ratio="auto"
            style={{ height: "100%" }}
          />
        </SplitPanel>
      </SplitLayout>
      <Section tone="inverse" pad="var(--space-9) var(--page-gutter)">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr) 1.4fr",
            gap: "var(--space-8)",
            alignItems: "start",
          }}
        >
          <StatBlock value="88+" label="Countries" detail="Worldwide" />
          <StatBlock value="90k+" label="Devices" detail="Installed worldwide" />
          <StatBlock value="60+" label="Years" detail="Of industry leadership" />
          <StatBlock value="500+" label="Clinical" detail="Publications" />
          <Prose size="small" style={{ opacity: 0.8 }}>
            Lumenis develops life-changing, minimally invasive solutions for the Aesthetic and
            Vision markets. We are BeautyTech pioneers, empowering people by broadening the horizons
            of health.
          </Prose>
        </div>
      </Section>
      <Section>
        <SectionHead action="View all products">Our products</SectionHead>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "var(--space-6)" }}
        >
          {PRODUCTS.map((p) => (
            <ProductCard
              key={p.name}
              name={p.name}
              market={p.market}
              onClick={(e) => {
                e.preventDefault();
                onOpenProduct(p.sub);
              }}
            />
          ))}
        </div>
      </Section>
      <div data-subbrand="optilight">
        <SplitLayout ratio="6fr 6fr" minHeight="420px">
          <SplitPanel tone="accent" align="space-between" pad="var(--space-9) var(--page-gutter)">
            <Icon name="eye" scale="large" size={72} tone="var(--accent-contrast)" />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
              <Headline size="title" mix="BRIGHT" tone="var(--accent-contrast)">
                A bright solution for dry eyes
              </Headline>
              <Button variant="inverse" size="sm">
                Learn more
              </Button>
            </div>
          </SplitPanel>
          <SplitPanel tone="page" align="space-between" pad="var(--space-9) var(--page-gutter)">
            <Quote attribution="Evie Rose" role="Aesthetic Clinic, London">
              Lumenis products have been such a success in my clinic, achieving amazing results with
              my clients and are extremely cost effective.
            </Quote>
            <div
              style={{
                display: "flex",
                gap: "var(--space-8)",
                paddingTop: "var(--space-6)",
                borderTop: "var(--border-width-hairline) solid var(--border-subtle)",
              }}
            >
              {[
                ["first-aid-kit", "Clinic"],
                ["user-circle", "Customer"],
                ["sparkle", "Treatment"],
                ["hand-heart", "After-care"],
              ].map(([n, l]) => (
                <div
                  key={l}
                  style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
                >
                  <Icon name={n} size={28} />
                  <Eyebrow style={{ color: "var(--text-muted)" }}>{l}</Eyebrow>
                </div>
              ))}
            </div>
          </SplitPanel>
        </SplitLayout>
      </div>
      <Section>
        <SectionHead action="Visit the hub">Resources</SectionHead>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-7)" }}
        >
          {INSIGHTS.map((i) => (
            <InsightCard key={i.title} title={i.title} topics={i.topics} />
          ))}
        </div>
      </Section>
      <NewsletterSignup style={{ padding: "var(--space-9) var(--page-gutter)" }} />
    </div>
  );
}
