import React from 'react';

/**
 * On/off toggle with a sentence-case inline label.
 */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

/* The other shape allowed to break the squared language — a toggle's sliding
   affordance depends on the pill track. Outlined off-state, accent fill on. */
export function Switch({ checked = false, onChange, label, disabled, tone = 'page', style, ...rest }: SwitchProps) {
  const inverse = tone === 'inverse';
  const line = inverse ? 'rgba(255,255,255,.45)' : 'var(--border-subtle)';
  const toggle = () => { if (!disabled && onChange) onChange(!checked); };
  return (
    <label
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-form)', lineHeight: 'var(--leading-form)',
        color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        ...style,
      }}
    >
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } }}
        style={{
          width: 36, height: 20, borderRadius: 'var(--radius-pill)', flexShrink: 0, position: 'relative',
          border: 'var(--border-width-hairline) solid ' + (checked ? 'var(--accent)' : line),
          background: checked ? 'var(--accent)' : 'transparent',
          transition: 'background var(--dur-fast) var(--ease-brand), border-color var(--dur-fast) var(--ease-brand)',
        }}
        {...rest}
      >
        <span
          style={{
            position: 'absolute', top: 1, left: checked ? 17 : 1, width: 16, height: 16, borderRadius: '50%',
            background: checked ? 'var(--accent-contrast)' : (inverse ? 'var(--lum-white)' : 'var(--lum-black)'),
            transition: 'left var(--dur-fast) var(--ease-brand)',
          }}
        />
      </span>
      {label}
    </label>
  );
}
