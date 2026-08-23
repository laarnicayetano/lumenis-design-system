/* @ds-bundle: {"format":4,"namespace":"LumenisDesignSystem_f2c14a","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"TextLink","sourcePath":"components/actions/TextLink.jsx"},{"name":"HeroL","sourcePath":"components/brand/HeroL.jsx"},{"name":"Logotype","sourcePath":"components/brand/Logotype.jsx"},{"name":"InsightCard","sourcePath":"components/content/InsightCard.jsx"},{"name":"ProductCard","sourcePath":"components/content/ProductCard.jsx"},{"name":"Quote","sourcePath":"components/content/Quote.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"NewsletterSignup","sourcePath":"components/forms/NewsletterSignup.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"SplitLayout","sourcePath":"components/layout/SplitLayout.jsx"},{"name":"SplitPanel","sourcePath":"components/layout/SplitLayout.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"},{"name":"Eyebrow","sourcePath":"components/typography/Eyebrow.jsx"},{"name":"Headline","sourcePath":"components/typography/Headline.jsx"},{"name":"HighlightBox","sourcePath":"components/typography/HighlightBox.jsx"},{"name":"Prose","sourcePath":"components/typography/Prose.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"414a2627e5eb","components/actions/TextLink.jsx":"e558752d535f","components/brand/HeroL.jsx":"545b66875f4f","components/brand/Logotype.jsx":"1b1df085eb17","components/content/InsightCard.jsx":"d1cdea2dd0f9","components/content/ProductCard.jsx":"dd3a6cb6c7b1","components/content/Quote.jsx":"a0dfe5c2221c","components/content/StatBlock.jsx":"55d93e5b0e79","components/forms/NewsletterSignup.jsx":"4ab105ea8011","components/forms/TextField.jsx":"e9f395d5bfcc","components/icons/Icon.jsx":"afa1bc651b96","components/layout/SplitLayout.jsx":"4f12b8bd05d3","components/navigation/SiteFooter.jsx":"30420c320f29","components/navigation/SiteHeader.jsx":"cb5cd179b883","components/typography/Eyebrow.jsx":"ecb8cdd9ae59","components/typography/Headline.jsx":"0194b567060f","components/typography/HighlightBox.jsx":"89061d39d1d0","components/typography/Prose.jsx":"583e08c2f5bf","ui_kits/corporate-website/Contact.jsx":"b6000a691ea0","ui_kits/corporate-website/Home.jsx":"d1ecd70f07c2","ui_kits/corporate-website/ProductDetail.jsx":"e37a2c062ad2","ui_kits/corporate-website/shared.jsx":"7d70e916d233"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LumenisDesignSystem_f2c14a = window.LumenisDesignSystem_f2c14a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BUTTON_VARIANTS = {
  primary: {
    background: 'var(--lum-black)',
    color: 'var(--lum-white)',
    borderColor: 'var(--lum-black)'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--lum-black)',
    borderColor: 'var(--lum-black)'
  },
  inverse: {
    background: 'var(--lum-white)',
    color: 'var(--lum-black)',
    borderColor: 'var(--lum-white)'
  },
  'inverse-outline': {
    background: 'transparent',
    color: 'var(--lum-white)',
    borderColor: 'var(--lum-white)'
  },
  accent: {
    background: 'var(--accent)',
    color: 'var(--accent-contrast)',
    borderColor: 'var(--accent)'
  },
  'accent-outline': {
    background: 'transparent',
    color: 'var(--accent)',
    borderColor: 'var(--accent)'
  }
};
const BUTTON_SIZES = {
  md: {
    fontSize: 'var(--text-button)',
    padding: '18px 40px'
  },
  sm: {
    fontSize: 'var(--text-form)',
    padding: '13px 28px'
  }
};

/* Web CTA (p.35-40). All caps Arizona Sans Regular, squared, hairline border,
   metric kerning, 0 tracking. Hover fades; press dims further. */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  disabled,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-3)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-regular)',
      lineHeight: 'var(--leading-button)',
      textTransform: 'uppercase',
      letterSpacing: 0,
      textDecoration: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderStyle: 'solid',
      borderWidth: 'var(--border-width-hairline)',
      borderRadius: 'var(--radius-none)',
      opacity: disabled ? 0.35 : press ? 'var(--press-opacity)' : hover ? 'var(--hover-opacity)' : 1,
      transition: 'opacity var(--dur-fast) var(--ease-brand)',
      ...BUTTON_VARIANTS[variant],
      ...BUTTON_SIZES[size],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Text link with the brand's underline-on-hover behaviour. Used for nav,
   inline links, and the "READ MORE" style links in resource cards. */
function TextLink({
  children,
  href = '#',
  tone = 'inherit',
  caps = false,
  size = 'body',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: size === 'caption' ? 'var(--text-caption)' : size === 'small' ? 'var(--text-form)' : 'var(--text-body)',
      textTransform: caps ? 'uppercase' : 'none',
      letterSpacing: caps ? 'var(--tracking-caption)' : 0,
      color: tone === 'inherit' ? 'inherit' : tone,
      textDecoration: 'none',
      borderBottom: '1px solid ' + (hover ? 'currentColor' : 'transparent'),
      paddingBottom: 2,
      transition: 'border-color var(--dur-fast) var(--ease-brand)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/brand/HeroL.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The Hero "L" as a type character: the wordmark's slanted serif L, set in
   Arizona Mix italic. Drop it in place of an L inside a headline —
   1-2 words per message, never repeated throughout (p.27-29). */
function HeroL({
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-mix)',
      fontStyle: 'italic',
      fontWeight: 'var(--weight-regular)',
      letterSpacing: '0.01em',
      ...style
    }
  }, rest), "L");
}
Object.assign(__ds_scope, { HeroL });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/HeroL.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logotype.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The Lumenis wordmark. Never recoloured, never restyled — only positive
   (black) or negative (white). Safety zone on all four sides = x (p.12). */
function Logotype({
  tone = 'black',
  variant = 'wordmark',
  width,
  safety = false,
  alt = 'Lumenis',
  style,
  ...rest
}) {
  const base = variant === 'symbol' ? 'logo-symbol' : 'logo-wordmark';
  const src = Logotype.assetBase + '/' + base + '-' + tone + '.svg';
  const w = width || (variant === 'symbol' ? 48 : 180);
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt,
    style: {
      display: 'block',
      width: w,
      height: 'auto',
      padding: safety ? 'calc(var(--logo-safety) * 0.5)' : 0,
      ...style
    }
  }, rest));
}

/* Consumers point this at wherever they copied assets/ to. */
Logotype.assetBase = 'assets';
Object.assign(__ds_scope, { Logotype });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logotype.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Form field (p.24): Arizona Sans Regular 16/22.4, sentence case label,
   underline-only input. Squared, no fill. */
function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  multiline,
  rows = 3,
  tone = 'page',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  const line = inverse ? 'rgba(255,255,255,.45)' : 'var(--border-subtle)';
  const shared = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-form)',
    lineHeight: 'var(--leading-form)',
    color: 'inherit',
    background: 'transparent',
    border: 0,
    borderBottom: 'var(--border-width-hairline) solid ' + line,
    borderRadius: 'var(--radius-none)',
    padding: '10px 0',
    outline: 'none',
    transition: 'border-color var(--dur-fast) var(--ease-brand)'
  };
  const Tag = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-caption)',
      textTransform: 'uppercase',
      opacity: 0.6
    }
  }, label, required ? ' *' : ''), /*#__PURE__*/React.createElement(Tag, _extends({
    type: multiline ? undefined : type,
    rows: multiline ? rows : undefined,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: e => {
      e.target.style.borderBottomColor = inverse ? 'var(--lum-white)' : 'var(--lum-black)';
    },
    onBlur: e => {
      e.target.style.borderBottomColor = line;
    },
    style: {
      ...shared,
      resize: multiline ? 'vertical' : undefined
    }
  }, rest)));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Line-icon wrapper. Lumenis' own icon illustrations were NOT supplied with
   this system, so glyphs come from Phosphor Icons (Thin/Light) — the closest
   match to the brand's 1pt/2pt even-stroke geometric line style.
   Host pages must load the CDN stylesheets once:
   https://unpkg.com/@phosphor-icons/web@2.1.1/src/light/style.css
   https://unpkg.com/@phosphor-icons/web@2.1.1/src/thin/style.css */
function Icon({
  name,
  scale = 'small',
  size,
  tone = 'currentColor',
  style,
  ...rest
}) {
  const weight = scale === 'large' ? 'ph-thin' : 'ph-light';
  const px = size || (scale === 'large' ? 96 : 24);
  return /*#__PURE__*/React.createElement("i", _extends({
    className: weight + ' ph-' + name,
    "aria-hidden": "true",
    style: {
      fontSize: px,
      lineHeight: 1,
      color: tone,
      display: 'inline-block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/layout/SplitLayout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The base Lumenis composition (p.63-64): the format splits horizontally or
   vertically; one half carries type on white, black or a single accent, the
   other carries photography. */
function SplitLayout({
  children,
  direction = 'row',
  ratio = '1fr 1fr',
  reverse = false,
  gap = 0,
  minHeight = '620px',
  style,
  ...rest
}) {
  const tracks = reverse ? ratio.split(' ').reverse().join(' ') : ratio;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: direction === 'row' ? tracks : '1fr',
      gridTemplateRows: direction === 'column' ? tracks : 'auto',
      gap,
      minHeight,
      ...style
    }
  }, rest), children);
}
const PANEL_TONES = {
  page: {
    background: 'var(--surface-page)',
    color: 'var(--text-primary)'
  },
  inverse: {
    background: 'var(--surface-inverse)',
    color: 'var(--text-inverse)'
  },
  accent: {
    background: 'var(--accent)',
    color: 'var(--accent-contrast)'
  },
  image: {
    background: 'var(--surface-image)',
    color: 'var(--text-primary)'
  }
};
function SplitPanel({
  children,
  tone = 'page',
  align = 'flex-end',
  pad = 'var(--space-9)',
  image,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: align,
      gap: 'var(--space-5)',
      padding: pad,
      backgroundImage: image ? 'url(' + image + ')' : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      ...PANEL_TONES[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { SplitLayout, SplitPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SplitLayout.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Corporate header (guidelines p.58, lumenis.com): hairline rule under a
   single row — wordmark left, all-caps nav right, locale and Patients split
   off to the far right. No fills, no shadows. */
function SiteHeader({
  nav = [],
  active,
  locale = 'Global, English',
  onNavigate,
  tone = 'page',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-9)',
      padding: '0 var(--page-gutter)',
      height: 88,
      background: inverse ? 'var(--surface-inverse)' : 'var(--surface-page)',
      color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
      borderBottom: 'var(--border-width-hairline) solid ' + (inverse ? 'var(--border-hairline-inverse)' : 'var(--border-subtle)'),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(nav[0] && nav[0].id);
    },
    style: {
      display: 'block',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logotype, {
    tone: inverse ? 'white' : 'black',
    width: 132
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      marginLeft: 'auto'
    }
  }, nav.map(item => /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    key: item.id,
    href: item.href || '#',
    caps: true,
    size: "caption",
    onClick: e => {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(item.id);
      }
    },
    style: {
      borderBottomColor: active === item.id ? 'currentColor' : 'transparent',
      opacity: active && active !== item.id ? 0.55 : 1
    }
  }, item.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      paddingLeft: 'var(--space-6)',
      borderLeft: 'var(--border-width-hairline) solid ' + (inverse ? 'rgba(255,255,255,.3)' : 'var(--border-subtle)')
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: "#",
    caps: true,
    size: "caption"
  }, "Patients"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-caption)',
      textTransform: 'uppercase',
      opacity: 0.55
    }
  }, locale)));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/typography/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Caption / spec / kicker: all caps, 75-80% of paragraph size (p.24). */
function Eyebrow({
  children,
  tone = 'inherit',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-caption)',
      lineHeight: 'var(--leading-caption)',
      letterSpacing: 'var(--tracking-caption)',
      textTransform: 'var(--case-caption)',
      color: tone === 'inherit' ? 'inherit' : tone,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/InsightCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Resource-hub article tile: image, topic tags in caps, sentence-case title,
   READ MORE link. Hairline rule above; no card fill. */
function InsightCard({
  title,
  topics = [],
  image,
  href = '#',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '16 / 9',
      background: 'var(--surface-image)',
      overflow: 'hidden'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-caption)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      opacity: 0.5
    }
  }, "Article image")), topics.length ? /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    style: {
      color: 'var(--text-muted)'
    }
  }, topics.join(' · ')) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-regular)',
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--leading-subtitle)',
      textWrap: 'pretty'
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: href,
    caps: true,
    size: "caption"
  }, "Read more"));
}
Object.assign(__ds_scope, { InsightCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/InsightCard.jsx", error: String((e && e.message) || e) }); }

// components/content/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Product tile from the OUR PRODUCTS grid: device shot on the photography
   grey, name beneath in caps. No card fill, no radius, no shadow. */
function ProductCard({
  name,
  market,
  image,
  href = '#',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      textDecoration: 'none',
      color: 'inherit',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '252 / 391',
      background: 'var(--surface-image)',
      overflow: 'hidden'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      transform: hover ? 'scale(1.03)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-brand)'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-caption)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      opacity: 0.5
    }
  }, "Device image")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-subtitle)',
      lineHeight: 1.1,
      textTransform: 'uppercase',
      borderBottom: '1px solid ' + (hover ? 'currentColor' : 'transparent'),
      alignSelf: 'flex-start',
      transition: 'border-color var(--dur-fast) var(--ease-brand)'
    }
  }, name), market ? /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    style: {
      color: 'var(--text-muted)'
    }
  }, market) : null));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/content/Quote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Practitioner testimonial (p.58): large sentence-case quote, attribution in
   caps beneath a short hairline. No quote-mark graphics, no avatar. */
function Quote({
  children,
  attribution,
  role,
  tone = 'page',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("blockquote", _extends({
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
      maxWidth: '46ch',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-subtitle)',
      lineHeight: 'var(--leading-subtitle)',
      textWrap: 'pretty'
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 1,
      background: 'currentColor',
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, attribution, role ? ' — ' + role : '')));
}
Object.assign(__ds_scope, { Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Quote.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Proof-point figure from the WHY LUMENIS band: oversized numeral, caps
   label beneath, separated by hairline rules. */
function StatBlock({
  value,
  label,
  detail,
  tone = 'inherit',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      color: tone === 'inherit' ? 'inherit' : tone,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-title-sm)',
      lineHeight: 'var(--leading-title)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, label), detail ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-form)',
      lineHeight: 'var(--leading-form)',
      opacity: 0.7
    }
  }, detail) : null));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Corporate footer (p.58, lumenis.com): black field, white wordmark, columns
   of all-caps headings over sentence-case links, legal row on a hairline. */
function SiteFooter({
  columns = [],
  social = [],
  legal = 'Copyright © 2010- Lumenis Be Ltd. All Rights Reserved',
  policies = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      padding: 'var(--space-9) var(--page-gutter) var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-9)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '220px repeat(' + Math.max(columns.length, 1) + ', 1fr)',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logotype, {
    tone: "white",
    width: 168
  }), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    style: {
      opacity: 0.55
    }
  }, col.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, col.links.map(l => /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    key: l,
    href: "#",
    size: "small",
    style: {
      opacity: 0.85
    }
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      paddingTop: 'var(--space-5)',
      borderTop: 'var(--border-width-hairline) solid rgba(255,255,255,.25)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    style: {
      opacity: 0.55
    }
  }, legal), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      marginLeft: 'auto'
    }
  }, policies.map(p => /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    key: p,
    href: "#",
    size: "caption",
    caps: true,
    style: {
      opacity: 0.7
    }
  }, p))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, social.map(s => /*#__PURE__*/React.createElement("i", {
    key: s,
    className: 'ph-light ph-' + s,
    style: {
      fontSize: 20,
      opacity: 0.8
    },
    "aria-hidden": "true"
  })))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/typography/Headline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const HEADLINE_SIZES = {
  display: {
    fontSize: 'var(--text-display)',
    lineHeight: 'var(--leading-display)'
  },
  title: {
    fontSize: 'var(--text-title)',
    lineHeight: 'var(--leading-title)'
  },
  small: {
    fontSize: 'var(--text-title-sm)',
    lineHeight: 'var(--leading-title)'
  }
};

/* Uppercase title with exactly ONE emphasis treatment:
   heroL — swap the L of the chosen word for the Hero "L", or
   mix   — set the chosen word in Arizona Mix.
   Never both (p.28). */
function Headline({
  children,
  as: Tag = 'h1',
  size = 'display',
  align = 'left',
  heroL,
  mix,
  tone = 'inherit',
  style,
  ...rest
}) {
  const text = typeof children === 'string' ? children.toUpperCase() : '';
  const target = (heroL || mix || '').toUpperCase();
  let content = children;
  if (text && target && text.indexOf(target) !== -1) {
    const i = text.indexOf(target);
    const emphasised = heroL ? target.split('L').map((chunk, n) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: n
    }, n > 0 ? /*#__PURE__*/React.createElement(__ds_scope.HeroL, null) : null, chunk)) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mix)'
      }
    }, target);
    content = [text.slice(0, i), /*#__PURE__*/React.createElement(React.Fragment, {
      key: "e"
    }, emphasised), text.slice(i + target.length)];
  }
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-regular)',
      textTransform: 'var(--case-title)',
      letterSpacing: 'var(--tracking-title)',
      textAlign: align,
      color: tone === 'inherit' ? 'inherit' : tone,
      textWrap: 'balance',
      ...HEADLINE_SIZES[size],
      ...style
    }
  }, rest), content);
}
Object.assign(__ds_scope, { Headline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/Headline.jsx", error: String((e && e.message) || e) }); }

// components/forms/NewsletterSignup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* "Science with us — reads for your inbox" sign-up block (p.58): headline,
   single email field, CTA, consent line in caps. */
function NewsletterSignup({
  heading = 'Science with us — reads for your inbox',
  cta = 'Sign up',
  consent = 'By signing up, you consent to receive Lumenis emails.',
  tone = 'inverse',
  onSubmit,
  style,
  ...rest
}) {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("form", _extends({
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
      if (onSubmit) onSubmit(email);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      background: inverse ? 'var(--surface-inverse)' : 'var(--surface-page)',
      color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
      padding: 'var(--space-8)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Headline, {
    as: "h2",
    size: "small"
  }, heading), sent ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body)'
    }
  }, "Thank you \u2014 check your inbox to confirm.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TextField, {
    label: "Email",
    type: "email",
    required: true,
    tone: tone,
    value: email,
    onChange: e => setEmail(e.target.value),
    style: {
      flex: '1 1 280px'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: inverse ? 'inverse' : 'primary',
    size: "sm"
  }, cta)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-caption)',
      textTransform: 'uppercase',
      opacity: 0.55
    }
  }, "*", consent));
}
Object.assign(__ds_scope, { NewsletterSignup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/NewsletterSignup.jsx", error: String((e && e.message) || e) }); }

// components/typography/HighlightBox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The "box" highlight treatment (p.23): a squared rule around 1-2 words of a
   headline. Social and digital advertising only, in small amounts. */
function HighlightBox({
  children,
  tone,
  filled = false,
  style,
  ...rest
}) {
  const c = tone || 'var(--accent)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-block',
      padding: '0.02em 0.16em 0.06em',
      border: 'var(--border-width-hairline) solid ' + c,
      borderRadius: 'var(--radius-none)',
      background: filled ? c : 'transparent',
      color: filled ? 'var(--accent-contrast)' : 'inherit',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { HighlightBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/HighlightBox.jsx", error: String((e && e.message) || e) }); }

// components/typography/Prose.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Body copy. Paragraph 18/25, form 16/22.4, subtitle 28/32.5 (p.24). */
const PROSE_SIZES = {
  subtitle: {
    fontSize: 'var(--text-subtitle)',
    lineHeight: 'var(--leading-subtitle)'
  },
  body: {
    fontSize: 'var(--text-body)',
    lineHeight: 'var(--leading-body)'
  },
  small: {
    fontSize: 'var(--text-form)',
    lineHeight: 'var(--leading-form)'
  }
};
function Prose({
  children,
  size = 'body',
  tone = 'inherit',
  maxWidth = '58ch',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-regular)',
      color: tone === 'inherit' ? 'inherit' : tone,
      maxWidth,
      textWrap: 'pretty',
      ...PROSE_SIZES[size],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Prose });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/Prose.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate-website/Contact.jsx
try { (() => {
function Contact() {
  const [sent, setSent] = React.useState(false);
  const {
    TextField
  } = window.LumenisDesignSystem_f2c14a;
  return /*#__PURE__*/React.createElement(SplitLayout, {
    ratio: "6fr 6fr",
    minHeight: "720px"
  }, /*#__PURE__*/React.createElement(SplitPanel, {
    align: "space-between",
    pad: "var(--space-9) var(--page-gutter)"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Contact"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    size: "title",
    heroL: "HELP"
  }, "We\u2019re here to help with any questions"), /*#__PURE__*/React.createElement(Prose, null, "Please fill out our form, and we\u2019ll get in touch shortly. For service and technical support, reach the Lumenis Global Service Organization directly."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      paddingTop: 'var(--space-6)',
      borderTop: 'var(--border-width-hairline) solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Support"), /*#__PURE__*/React.createElement(Prose, {
    size: "small"
  }, "care@lumenis.com")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Phone"), /*#__PURE__*/React.createElement(Prose, {
    size: "small"
  }, "0124 382 482"))))), /*#__PURE__*/React.createElement(SplitPanel, {
    tone: "inverse",
    align: "center",
    pad: "var(--space-9) var(--page-gutter)"
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    size: "small",
    tone: "var(--text-inverse)"
  }, "Thank you"), /*#__PURE__*/React.createElement(Prose, {
    tone: "var(--text-inverse)"
  }, "A Lumenis representative will be in touch shortly."), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse-outline",
    size: "sm",
    onClick: () => setSent(false)
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "First name",
    tone: "inverse",
    required: true,
    placeholder: "Evie"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Last name",
    tone: "inverse",
    required: true,
    placeholder: "Rose"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Work email",
    type: "email",
    tone: "inverse",
    required: true,
    placeholder: "you@clinic.com"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Practice",
    tone: "inverse",
    placeholder: "Aesthetic Clinic London"
  })), /*#__PURE__*/React.createElement(TextField, {
    label: "Area of interest",
    tone: "inverse",
    placeholder: "Aesthetics \xB7 Vision"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "How can we help?",
    tone: "inverse",
    multiline: true,
    rows: 4
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    style: {
      alignSelf: 'flex-start'
    }
  }, "Submit"), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      color: 'rgba(255,255,255,.55)'
    }
  }, "*By submitting, you consent to receive Lumenis emails."))));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate-website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate-website/Home.jsx
try { (() => {
function Home({
  onOpenProduct,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SplitLayout, {
    ratio: "6fr 6fr",
    minHeight: "560px"
  }, /*#__PURE__*/React.createElement(SplitPanel, {
    align: "space-between",
    pad: "var(--space-9) var(--page-gutter)"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      color: 'var(--text-muted)'
    }
  }, "60 years pushing boundaries"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    heroL: "EMPOWERING"
  }, "Empowering you, your way"), /*#__PURE__*/React.createElement(Prose, {
    size: "subtitle",
    style: {
      maxWidth: '30ch'
    }
  }, "Minimally invasive, energy-based solutions for the Aesthetic and Vision markets."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onOpenProduct('stellar-m22')
  }, "Discover more"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate('contact')
  }, "Talk to us")))), /*#__PURE__*/React.createElement(SplitPanel, {
    tone: "image",
    pad: "0"
  }, /*#__PURE__*/React.createElement(ImagePlate, {
    label: "Hero photography \u2014 practitioner",
    ratio: "auto",
    style: {
      height: '100%'
    }
  }))), /*#__PURE__*/React.createElement(Section, {
    tone: "inverse",
    pad: "var(--space-9) var(--page-gutter)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr) 1.4fr',
      gap: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "88+",
    label: "Countries",
    detail: "Worldwide"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "90k+",
    label: "Devices",
    detail: "Installed worldwide"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "60+",
    label: "Years",
    detail: "Of industry leadership"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "500+",
    label: "Clinical",
    detail: "Publications"
  }), /*#__PURE__*/React.createElement(Prose, {
    size: "small",
    style: {
      opacity: 0.8
    }
  }, "Lumenis develops life-changing, minimally invasive solutions for the Aesthetic and Vision markets. We are BeautyTech pioneers, empowering people by broadening the horizons of health."))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHead, {
    action: "View all products"
  }, "Our products"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: 'var(--space-6)'
    }
  }, PRODUCTS.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.name,
    name: p.name,
    market: p.market,
    onClick: e => {
      e.preventDefault();
      onOpenProduct(p.sub);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    "data-subbrand": "optilight"
  }, /*#__PURE__*/React.createElement(SplitLayout, {
    ratio: "6fr 6fr",
    minHeight: "420px"
  }, /*#__PURE__*/React.createElement(SplitPanel, {
    tone: "accent",
    align: "space-between",
    pad: "var(--space-9) var(--page-gutter)"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    scale: "large",
    size: 72,
    tone: "var(--accent-contrast)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    size: "title",
    mix: "BRIGHT",
    tone: "var(--accent-contrast)"
  }, "A bright solution for dry eyes"), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "sm"
  }, "Learn more"))), /*#__PURE__*/React.createElement(SplitPanel, {
    tone: "page",
    align: "space-between",
    pad: "var(--space-9) var(--page-gutter)"
  }, /*#__PURE__*/React.createElement(Quote, {
    attribution: "Evie Rose",
    role: "Aesthetic Clinic, London"
  }, "Lumenis products have been such a success in my clinic, achieving amazing results with my clients and are extremely cost effective."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      paddingTop: 'var(--space-6)',
      borderTop: 'var(--border-width-hairline) solid var(--border-subtle)'
    }
  }, [['first-aid-kit', 'Clinic'], ['user-circle', 'Customer'], ['sparkle', 'Treatment'], ['hand-heart', 'After-care']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n,
    size: 28
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      color: 'var(--text-muted)'
    }
  }, l))))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHead, {
    action: "Visit the hub"
  }, "Resources"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-7)'
    }
  }, INSIGHTS.map(i => /*#__PURE__*/React.createElement(InsightCard, {
    key: i.title,
    title: i.title,
    topics: i.topics
  })))), /*#__PURE__*/React.createElement(NewsletterSignup, {
    style: {
      padding: 'var(--space-9) var(--page-gutter)'
    }
  }));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate-website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate-website/ProductDetail.jsx
try { (() => {
const PRODUCT_DATA = {
  'stellar-m22': {
    name: 'Stellar M22™',
    market: 'Aesthetics · Multi-application IPL platform',
    kicker: 'Now with AI technology',
    headline: 'The expert tool to elevate your practice',
    mix: 'EXPERT',
    lede: 'Stellar M22 is a powerful modular multi-application platform, inspired by the brightest constellation in the sky. Treat different indications across skin types, ages and genders — without disposables.',
    treatments: ['Skin rejuvenation', 'Pigmentation', 'Vascular lesions', 'Acne', 'Scar revision', 'Tattoo removal'],
    specs: [['Modules', 'Up to 4 applications'], ['Technologies', 'IPL · ResurFX · Q-Switched Nd:YAG'], ['Disposables', 'None required'], ['Indications', '30+ cleared']],
    claim: 'Stimulates new collagen and elastin fibres to improve texture, tone and fine lines.'
  },
  optilight: {
    name: 'OptiLIGHT',
    market: 'Vision · Dry eye',
    kicker: 'New age of dry eyes solution',
    headline: 'A bright solution for dry eyes',
    mix: 'BRIGHT',
    lede: 'OptiLIGHT elevates dry eye management with Lumenis’ patented Optimal Pulse Technology (OPT™) and user-centered design.',
    treatments: ['Meibomian gland dysfunction', 'Evaporative dry eye', 'Ocular rosacea', 'Demodex'],
    specs: [['Technology', 'Optimal Pulse Technology (OPT™)'], ['Treatment time', 'Under 15 minutes'], ['Sessions', '4 recommended'], ['Clearance', 'FDA cleared']],
    claim: 'The first and only IPL FDA-approved for dry eye management due to meibomian gland dysfunction.'
  },
  trilift: {
    name: 'triLift',
    market: 'Aesthetics · Facial muscle stimulation',
    kicker: 'A new category in facial aesthetics',
    headline: 'Back to yourself, naturally',
    mix: 'NATURALLY',
    lede: 'triLift is an innovative, non-invasive treatment combining three technologies in one device to produce the natural face-lift-like effect that patients desire.',
    treatments: ['Facial muscle stimulation', 'Skin tightening', 'Texture and tone', 'Contour definition'],
    specs: [['Technologies', 'DMSt · TriPollar® RF · Micro-needling'], ['Downtime', 'None'], ['Protocol', '4–6 sessions'], ['Areas', 'Face · jawline · neck']],
    claim: 'Stimulating the muscle layer beneath the skin — the foundation the face rests on.'
  },
  folix: {
    name: 'FoLix™',
    market: 'Aesthetics · Hair loss',
    kicker: 'Award-winning hair loss technology',
    headline: 'Grow naturally',
    mix: 'GROW',
    lede: 'FoLix is a non-ablative fractional laser system using hair stimulation technology — effective, safe and simple treatment for women and men.',
    treatments: ['Androgenetic alopecia', 'Thinning hair', 'Post-transplant support'],
    specs: [['Technology', 'Non-ablative fractional laser'], ['Anaesthetic', 'None required'], ['Protocol', '4 sessions, 4 weeks apart'], ['Recognition', 'NewBeauty award, two years running']],
    claim: 'No needles, no downtime, no topical regimen to maintain.'
  }
};
function ProductDetail({
  id = 'stellar-m22',
  onBack
}) {
  const p = PRODUCT_DATA[id] || PRODUCT_DATA['stellar-m22'];
  return /*#__PURE__*/React.createElement("div", {
    "data-subbrand": id
  }, /*#__PURE__*/React.createElement(SplitLayout, {
    ratio: "6fr 6fr",
    minHeight: "520px"
  }, /*#__PURE__*/React.createElement(SplitPanel, {
    align: "space-between",
    pad: "var(--space-9) var(--page-gutter)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    href: "#",
    caps: true,
    size: "caption",
    onClick: e => {
      e.preventDefault();
      onBack();
    }
  }, "\u2190 All products"), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      color: 'var(--accent)'
    }
  }, p.kicker)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    size: "title",
    mix: p.mix
  }, p.headline), /*#__PURE__*/React.createElement(Prose, null, p.lede), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent"
  }, "Book a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Download kit")))), /*#__PURE__*/React.createElement(SplitPanel, {
    tone: "image",
    pad: "0"
  }, /*#__PURE__*/React.createElement(ImagePlate, {
    label: p.name + ' — device photography',
    ratio: "auto",
    style: {
      height: '100%'
    }
  }))), /*#__PURE__*/React.createElement(Section, {
    pad: "var(--space-9) var(--page-gutter)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, null, "Treatments"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column'
    }
  }, p.treatments.map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) 0',
      borderBottom: 'var(--border-width-hairline) solid var(--border-subtle)',
      fontSize: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 20,
    tone: "var(--accent)"
  }), t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, null, "At a glance"), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      columnGap: 'var(--space-6)'
    }
  }, p.specs.map(([k, v]) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: k
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      padding: 'var(--space-4) 0',
      borderBottom: 'var(--border-width-hairline) solid var(--border-subtle)',
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-caption)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      padding: 'var(--space-4) 0',
      borderBottom: 'var(--border-width-hairline) solid var(--border-subtle)',
      fontSize: 'var(--text-form)'
    }
  }, v))))))), /*#__PURE__*/React.createElement(Section, {
    tone: "accent",
    pad: "var(--space-9) var(--page-gutter)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 'var(--space-9)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    size: "small",
    tone: "var(--accent-contrast)"
  }, p.claim), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "sm",
    style: {
      justifySelf: 'end'
    }
  }, "See clinical studies"))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHead, {
    action: "View all"
  }, "Practitioner stories"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-7)'
    }
  }, INSIGHTS.map(i => /*#__PURE__*/React.createElement(InsightCard, {
    key: i.title,
    title: i.title,
    topics: i.topics
  })))));
}
Object.assign(window, {
  ProductDetail,
  PRODUCT_DATA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate-website/ProductDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate-website/shared.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  SiteHeader,
  SiteFooter,
  Headline,
  Prose,
  Eyebrow,
  Button,
  TextLink,
  ProductCard,
  InsightCard,
  Quote,
  StatBlock,
  NewsletterSignup,
  SplitLayout,
  SplitPanel,
  Icon,
  Logotype
} = window.LumenisDesignSystem_f2c14a;
Logotype.assetBase = '../../assets';
const NAV = [{
  id: 'aesthetics',
  label: 'Aesthetics'
}, {
  id: 'vision',
  label: 'Vision'
}, {
  id: 'resources',
  label: 'Resources'
}, {
  id: 'about',
  label: 'About'
}, {
  id: 'support',
  label: 'Support'
}, {
  id: 'contact',
  label: 'Contact'
}];
const FOOTER_COLUMNS = [{
  title: 'Company',
  links: ['About Lumenis', 'Lumenis Leadership', 'Careers', 'Lumenis App', 'Partner Zone']
}, {
  title: 'Aesthetics',
  links: ['Facial Muscle Stimulation', 'Hair Removal', 'Body', 'Hair Loss', 'Skin', 'Women’s Health']
}, {
  title: 'Vision',
  links: ['Dry Eye', 'Glaucoma', 'Retina']
}, {
  title: 'Patients',
  links: ['triLift', 'TreatMyDryEye', 'Aesthetipedia', 'SmoothGlo']
}];
const PRODUCTS = [{
  name: 'FoLix™',
  market: 'Aesthetics · Hair loss',
  sub: 'folix'
}, {
  name: 'triLift',
  market: 'Aesthetics · Facial stimulation',
  sub: 'trilift'
}, {
  name: 'Stellar M22™',
  market: 'Aesthetics · IPL platform',
  sub: 'stellar-m22'
}, {
  name: 'SPLENDOR X',
  market: 'Aesthetics · Hair removal',
  sub: 'splendorx'
}, {
  name: 'OptiLIGHT',
  market: 'Vision · Dry eye',
  sub: 'optilight'
}, {
  name: 'Digital Duet',
  market: 'Vision · SLT + YAG',
  sub: 'digital-duet'
}];
const INSIGHTS = [{
  title: 'FoLix Named Best Laser Treatment for Hair Loss Two Years Running',
  topics: ['FoLix', 'Hair Loss', 'News']
}, {
  title: 'Lumenis OptiLIFT Receives Health Canada Approval for Evaporative Dry Eye Disease',
  topics: ['Dry Eye', 'News']
}, {
  title: 'Redefining Dry Eye Care: A Boutique Practice Case Study',
  topics: ['Blog', 'Dry Eye']
}];
function Section({
  children,
  tone = 'page',
  pad = 'var(--space-10) var(--page-gutter)',
  style,
  ...rest
}) {
  const tones = {
    page: {
      background: 'var(--surface-page)',
      color: 'var(--text-primary)'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)'
    },
    image: {
      background: 'var(--surface-image)',
      color: 'var(--text-primary)'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--accent-contrast)'
    }
  };
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      padding: pad,
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
function SectionHead({
  children,
  action,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      paddingBottom: 'var(--space-6)',
      marginBottom: 'var(--space-8)',
      borderBottom: 'var(--border-width-hairline) solid ' + (tone === 'inverse' ? 'rgba(255,255,255,.25)' : 'var(--border-subtle)')
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    as: "h2",
    size: "small"
  }, children), action ? /*#__PURE__*/React.createElement(TextLink, {
    href: "#",
    caps: true,
    size: "caption"
  }, action) : null);
}
function ImagePlate({
  label = 'Photography',
  ratio = '4 / 3',
  tone = 'image',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: tone === 'dark' ? 'var(--lum-shine-grey)' : 'var(--surface-image)',
      display: 'grid',
      placeItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-caption)',
      textTransform: 'uppercase',
      color: tone === 'dark' ? 'rgba(255,255,255,.6)' : 'var(--text-muted)',
      opacity: 0.7
    }
  }, label));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  Headline,
  Prose,
  Eyebrow,
  Button,
  TextLink,
  ProductCard,
  InsightCard,
  Quote,
  StatBlock,
  NewsletterSignup,
  SplitLayout,
  SplitPanel,
  Icon,
  Logotype,
  NAV,
  FOOTER_COLUMNS,
  PRODUCTS,
  INSIGHTS,
  Section,
  SectionHead,
  ImagePlate
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate-website/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.HeroL = __ds_scope.HeroL;

__ds_ns.Logotype = __ds_scope.Logotype;

__ds_ns.InsightCard = __ds_scope.InsightCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.NewsletterSignup = __ds_scope.NewsletterSignup;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.SplitLayout = __ds_scope.SplitLayout;

__ds_ns.SplitPanel = __ds_scope.SplitPanel;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Headline = __ds_scope.Headline;

__ds_ns.HighlightBox = __ds_scope.HighlightBox;

__ds_ns.Prose = __ds_scope.Prose;

})();
