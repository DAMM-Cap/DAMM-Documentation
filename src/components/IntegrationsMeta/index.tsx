import React, {useState} from 'react';
import styles from './styles.module.css';

/**
 * Small presentational components shared by the Integrations pages.
 * Theme-aware: everything is styled off Infima variables, so light/dark
 * both work without extra rules.
 */

export function ApiPills({
  items,
}: {
  items: {label: string; value: string}[];
}): React.ReactElement {
  return (
    <div className={styles.pillRow}>
      {items.map((p) => (
        <span key={p.label} className={styles.pill}>
          {p.label} <b>{p.value}</b>
        </span>
      ))}
    </div>
  );
}

function CopyButton({text}: {text: string}): React.ReactElement {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
      title="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        });
      }}>
      {copied ? '✓' : '⧉'}
    </button>
  );
}

export type MetaItem = {
  k: string;
  v: string;
  href?: string;
  copy?: string;
};

export function VaultMeta({items}: {items: MetaItem[]}): React.ReactElement {
  return (
    <div className={styles.metaGrid}>
      {items.map((it) => (
        <div key={it.k} className={styles.cell}>
          <div className={styles.k}>{it.k}</div>
          <div className={styles.v}>
            {it.href ? (
              <a href={it.href} target="_blank" rel="noopener noreferrer">
                {it.v}
              </a>
            ) : (
              it.v
            )}
            {it.copy ? <CopyButton text={it.copy} /> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
