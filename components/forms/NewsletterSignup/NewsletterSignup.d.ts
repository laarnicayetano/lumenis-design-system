/**
 * Email sign-up block with consent line.
 */
export interface NewsletterSignupProps {
  heading?: string;
  cta?: string;
  consent?: string;
  tone?: 'page' | 'inverse';
  onSubmit?: (email: string) => void;
  style?: React.CSSProperties;
}

export function NewsletterSignup(props: NewsletterSignupProps): JSX.Element;
