import { Tabs } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 140] as [number, number],
  name: "Tabs",
  subtitle: "Underline tab bar",
  padding: "20px",
};

export default function TabsSpecimen() {
  return (
    <Tabs
      tabs={[
        { id: "overview", label: "Overview" },
        { id: "results", label: "Clinical results" },
        { id: "specs", label: "Specs" },
      ]}
      active="overview"
    />
  );
}
