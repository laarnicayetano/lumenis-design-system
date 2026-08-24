import { Checkbox, Radio, Select, Switch } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 260] as [number, number],
  name: "Selection controls",
  subtitle: "Checkbox, radio, select & switch",
  padding: "20px",
};

export default function ControlsSpecimen() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1.2fr",
        gap: 24,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Checkbox label="Send clinical updates" checked readOnly />
        <Checkbox label="Unavailable option" disabled />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Radio name="skinType" label="Type II" readOnly />
        <Radio name="skinType" label="Type III" checked readOnly />
        <Switch label="Enable OPT mode" checked />
      </div>
      <Select
        label="Practice type"
        placeholder="Choose one"
        options={["Dermatology", "Med spa", "Plastic surgery"]}
      />
    </div>
  );
}
