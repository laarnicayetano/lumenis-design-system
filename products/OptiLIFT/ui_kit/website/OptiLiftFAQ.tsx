import React from "react";
import { Headline, Prose, Tabs } from "../../../../components";
const FAQS: Record<string, string> = {
  "What to expect":
    "Sessions take about 30 minutes with no anesthesia required. Most patients describe a warm, comfortable sensation.",
  Downtime:
    "None. You can resume normal activities, including makeup application, immediately after treatment.",
  "Results timeline":
    "Initial tightening is visible right away; full collagen remodeling results develop over 60\u201390 days.",
};
export function OptiLiftFAQ() {
  const [tab, setTab] = React.useState("What to expect");
  return (
    <section
      id="faq"
      style={{ padding: "var(--space-9) var(--page-gutter)", maxWidth: 720, margin: "0 auto" }}
    >
      <Headline as="h2" size="small" style={{ marginBottom: "var(--space-6)" }}>
        Common questions
      </Headline>
      <Tabs tabs={Object.keys(FAQS)} active={tab} onChange={setTab} />
      <Prose style={{ marginTop: "var(--space-6)" }}>{FAQS[tab]}</Prose>
    </section>
  );
}
