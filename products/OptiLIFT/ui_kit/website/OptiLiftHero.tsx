import React from "react";
import { Badge, Headline, Prose, Button } from "../../../../components";
export function OptiLiftHero() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        gap: "var(--space-8)",
        padding: "var(--space-9) var(--page-gutter)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-5)",
          alignItems: "flex-start",
        }}
      >
        <Badge tone="accent">By Lumenis</Badge>
        <Headline heroL="LIFT">Restore your natural lift</Headline>
        <Prose size="subtitle" tone="var(--text-muted)" maxWidth="30ch">
          OptiLIFT delivers non-invasive facial contouring through advanced optical energy — no
          downtime, no surgery, visible results.
        </Prose>
        <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-3)" }}>
          <Button variant="accent">See how it works</Button>
          <Button variant="secondary">Watch the demo</Button>
        </div>
      </div>
      <img
        src="../../assets/product/grey-bg/lumenis_02.764.webp"
        style={{ width: "100%" }}
        alt="OptiLIFT device"
      />
    </section>
  );
}
