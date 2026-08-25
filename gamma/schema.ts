type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export interface GammaLibraryScheam {
  primaryAccentColor: Color;
  secondaryAccentColor?: Color;
  linkColor: Color;
  buttonColor: Color;
  backgroundColor: Color;
  pageBackgroundColor: Color;
  border: {
    color: Color;
    size: "sm" | "md" | "lg";
  };
  heading: {
    font: string;
    fontWeight: "regular" | "light";
    color: Color;
    lineHeight: number;
    letterSpacing: number;
  };
  body: {
    font: string;
    fontWeight: "regular" | "light";
    color: Color;
    lineHeight: number;
    letterSpacing: number;
  };
}
