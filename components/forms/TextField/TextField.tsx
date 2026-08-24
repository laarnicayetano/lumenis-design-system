import React from 'react';

/**
 * Bordered, softly-rounded text or textarea field.
 */
export interface TextFieldProps {
  /** All-caps field label. */
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  /** Render a textarea instead of an input. */
  multiline?: boolean;
  rows?: number;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

/* Form field (p.24): Arizona Sans Regular 16/22.4, sentence case label.
   Bordered box with a soft radius (tokens/surfaces.css) rather than the
   print rule's underline-only treatment — a border-radius can't read on a
   bottom-only rule, and a boxed field pairs better with the accent focus
   glow below. Focus uses --shadow-accent instead of a colour-only change. */
export function TextField({ label, value, onChange, placeholder, type = 'text', required, multiline, rows = 3, tone = 'page', style, ...rest }: TextFieldProps) {
  const inverse = tone === 'inverse';
  const line = inverse ? 'rgba(255,255,255,.3)' : 'var(--border-subtle)';
  const shared: React.CSSProperties = {
    width: '100%', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-form)', lineHeight: 'var(--leading-form)',
    color: 'inherit', background: inverse ? 'rgba(255,255,255,.06)' : 'var(--surface-page)',
    border: 'var(--border-width-hairline) solid ' + line, borderRadius: 'var(--radius-sm)',
    padding: '10px 14px', outline: 'none', boxShadow: 'none',
    transition: 'border-color var(--dur-fast) var(--ease-brand), box-shadow var(--dur-fast) var(--ease-brand)',
  };
  const Tag = (multiline ? 'textarea' : 'input') as 'textarea' | 'input';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)', ...style }}>
      <span style={{ fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', opacity: 0.6 }}>
        {label}{required ? ' *' : ''}
      </span>
      <Tag
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = 'var(--shadow-accent)'; }}
        onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.target.style.borderColor = line; e.target.style.boxShadow = 'none'; }}
        style={{ ...shared, resize: multiline ? 'vertical' : undefined }}
        {...rest}
      />
    </label>
  );
}
