import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

/* ------------------------------------------------------------------ */
/* DAMM ring mark (isotype), inline so it inherits currentColor.       */
/* ------------------------------------------------------------------ */
export function DammMark({size = 28, className}: {size?: number; className?: string}) {
  return (
    <svg
      viewBox="0 0 225 225"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}>
      <path d="M152.3,92.5c-3.5-5.4-8.4-9.6-14.9-12.4c-6.5-2.8-14.2-4.2-23.1-4.2H73.7v56.8h21.5V91.8H113c3.4,0,6.4,0.4,9.1,1.3c2.7,0.9,5.1,2.1,7,3.8c2,1.6,3.5,3.6,4.6,6c1.1,2.4,1.6,5.1,1.6,8.1v2.4c0,3-0.6,5.7-1.6,8.1c-1.1,2.4-2.6,4.4-4.6,6c-2,1.6-4.3,2.9-7,3.8c-2.7,0.9-5.8,1.3-9.1,1.3H95.2v16h19.1c8.9,0,16.7-1.4,23.1-4.2c6.5-2.8,11.4-6.9,14.9-12.3c3.4-5.4,5.2-12,5.2-19.8C157.5,104.5,155.8,97.9,152.3,92.5z" />
      <path d="M57.4,56.3H29.1V28h28.4V56.3zM34.5,50.9H52V33.4H34.5V50.9z" />
      <path d="M197.1,196.6h-28.4v-28.4h28.4V196.6zM174.2,191.1h17.5v-17.5h-17.5V191.1z" />
      <path d="M112.5,9.6c-11.3,0-22.2,1.8-32.3,5.2v6.8c10.1-3.6,21-5.6,32.3-5.6c53.3,0,96.4,43.2,96.4,96.4c0,11.5-2,22.6-5.7,32.8h6.8c3.5-10.3,5.4-21.3,5.4-32.8C215.4,55.7,169.3,9.6,112.5,9.6zM16.1,112.5c0-11.9,2.1-23.2,6.1-33.7h-6.8c-3.7,10.6-5.7,21.9-5.7,33.7c0,56.8,46.1,102.9,102.9,102.9c11.9,0,23.3-2,34-5.8v-6.8c-10.6,4-22,6.2-34,6.2C59.3,208.9,16.1,165.8,16.1,112.5z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow label: mono, uppercase, letter-spaced.                      */
/* ------------------------------------------------------------------ */
export function Eyebrow({children}: {children: React.ReactNode}) {
  return <div className={styles.eyebrow}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Private-deposit notice. Used on every fund page, the funds index    */
/* and every deposit guide. The only confirmed process: email first.   */
/* ------------------------------------------------------------------ */
export function DepositNotice({fund}: {fund?: string}) {
  const subject = fund ? `?subject=${encodeURIComponent(`${fund} deposit`)}` : '';
  return (
    <aside className={styles.notice} role="note" aria-label="Private deposits">
      <div className={styles.noticeHead}>
        <span className={styles.pixelOn} aria-hidden="true" />
        <span>Private fund · email before you deposit</span>
      </div>
      <p className={styles.noticeBody}>
        {fund ? <>Deposits into {fund} are private. </> : <>Deposits into DAMM funds are private. </>}
        Before you deposit, email{' '}
        <a href={`mailto:team@dammcap.finance${subject}`}>team@dammcap.finance</a>. Only
        approved addresses can deposit or redeem, so a deposit sent without contacting us first
        will not go through.
      </p>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Deposit walkthrough video. Checks at build time (via the local      */
/* damm-static-videos plugin) which files exist in static/video, and   */
/* falls back to text if the video is missing or fails to load.        */
/* ------------------------------------------------------------------ */
export function DepositVideo({
  name,
  title,
}: {
  /** Base file name inside static/video, e.g. "dammstable-deposit". */
  name: string;
  title: string;
}) {
  let files: string[] = [];
  try {
    const data = usePluginData('damm-static-videos') as {files?: string[]} | undefined;
    files = data?.files ?? [];
  } catch {
    files = [];
  }
  const hasMp4 = files.includes(`${name}.mp4`);
  const hasWebm = files.includes(`${name}.webm`);
  const hasPoster = files.includes(`${name}-poster.jpg`);
  const mp4 = useBaseUrl(`/video/${name}.mp4`);
  const webm = useBaseUrl(`/video/${name}.webm`);
  const poster = useBaseUrl(`/video/${name}-poster.jpg`);
  const [failed, setFailed] = useState(false);

  const available = (hasMp4 || hasWebm) && !failed;

  return (
    <figure className={styles.video}>
      <div className={styles.videoChrome}>
        <span className={styles.pixel} aria-hidden="true" />
        <span className={styles.pixel} aria-hidden="true" />
        <span className={styles.videoLabel}>{title}</span>
      </div>
      {available ? (
        <video
          className={styles.videoEl}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          poster={hasPoster ? poster : undefined}
          aria-label={title}
          onError={() => setFailed(true)}>
          {hasWebm ? <source src={webm} type="video/webm" /> : null}
          {hasMp4 ? (
            <source src={mp4} type="video/mp4" onError={() => setFailed(true)} />
          ) : null}
          The video could not be played in this browser. Follow the written steps below.
        </video>
      ) : (
        <div className={styles.videoFallback}>
          <DammMark size={40} className={styles.videoMark} />
          <p>
            The video walkthrough is not available yet. The written steps below cover the full
            flow.
          </p>
        </div>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Async deposit / redemption cycle (ERC-7540 on Lagoon).              */
/* Built from DAMM primitives: pixels = capital, ring = the vault.     */
/* ------------------------------------------------------------------ */
export function SettlementCycle() {
  const steps = [
    {
      n: '01',
      t: 'Request',
      d: 'You send assets with a deposit request. They wait in the vault’s pending area. No shares yet, no yield yet. You can still cancel.',
    },
    {
      n: '02',
      t: 'Settlement',
      d: 'DAMM updates the fund’s NAV. Every pending request is processed together at that same price.',
    },
    {
      n: '03',
      t: 'Claim',
      d: 'Your shares are ready. Claim them, or leave them in the vault: they earn from settlement onward either way.',
    },
  ];
  return (
    <figure className={styles.cycle} aria-label="How a deposit moves through the vault">
      <svg
        className={styles.cycleSvg}
        viewBox="0 0 720 150"
        role="img"
        aria-labelledby="cycle-title">
        <title id="cycle-title">
          Deposit request, then NAV settlement, then shares ready to claim
        </title>
        {/* timeline */}
        <line x1="80" y1="75" x2="296" y2="75" className={styles.cyLine} />
        <line x1="424" y1="75" x2="640" y2="75" className={styles.cyLine} />
        <line x1="80" y1="75" x2="296" y2="75" className={styles.cyFlow} />
        <line x1="424" y1="75" x2="640" y2="75" className={styles.cyFlow} />
        {/* request: wallet pixel */}
        <g transform="translate(60 75)">
          <rect x="-14" y="-14" width="28" height="28" className={styles.cyPixel} />
          <rect x="-7" y="-7" width="14" height="14" className={styles.cyPixelOn} />
        </g>
        {/* settlement: the ring with two gaps */}
        <g transform="translate(360 75)">
          <path d="M -17.6 -51.1 A 54 54 0 0 1 51.1 17.6" className={styles.cyRing} />
          <path d="M 17.6 51.1 A 54 54 0 0 1 -51.1 -17.6" className={styles.cyRing} />
          <rect x="-44" y="-44" width="14.6" height="14.6" className={styles.cyPixel} />
          <rect x="29.4" y="29.4" width="14.6" height="14.6" className={styles.cyPixelOn} />
          <text x="0" y="6" textAnchor="middle" className={styles.cyMath}>
            NAV
          </text>
        </g>
        {/* claim: share pixels */}
        <g transform="translate(660 75)">
          <rect x="-14" y="-14" width="28" height="28" className={styles.cyPixel} />
          <rect x="-24" y="-24" width="10" height="10" className={styles.cyPixelOn} />
          <rect x="14" y="14" width="10" height="10" className={styles.cyPixelOn} />
          <rect x="-7" y="-7" width="14" height="14" className={styles.cyPixelOn} />
        </g>
        <text x="60" y="130" textAnchor="middle" className={styles.cyLab}>
          01 · REQUEST
        </text>
        <text x="360" y="145" textAnchor="middle" className={styles.cyLab}>
          02 · SETTLEMENT
        </text>
        <text x="660" y="130" textAnchor="middle" className={styles.cyLab}>
          03 · CLAIM
        </text>
        <text x="210" y="62" textAnchor="middle" className={styles.cyNote}>
          pending
        </text>
        <text x="510" y="62" textAnchor="middle" className={styles.cyNote}>
          claimable
        </text>
      </svg>
      <ol className={styles.cycleSteps}>
        {steps.map((s) => (
          <li key={s.n}>
            <span className={styles.cycleN}>{s.n}</span>
            <strong>{s.t}</strong>
            <span>{s.d}</span>
          </li>
        ))}
      </ol>
      <figcaption className={styles.caption}>
        Redemptions follow the same three steps in reverse: request with your shares, wait for
        settlement, claim your assets. On DAMMstable and DAMMeth, a redemption request cannot
        be cancelled.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Fund cards grid (overview, funds index, deposit index).             */
/* ------------------------------------------------------------------ */
type Fund = {
  name: string;
  unit: string;
  line: string;
  meta: string;
  status: string;
  to: string;
  cta?: string;
};

export const FUNDS: Fund[] = [
  {
    name: 'DAMMstable',
    unit: 'USD',
    line: 'Market-neutral stablecoin yield across blue-chip DeFi protocols.',
    meta: 'USD₮0 · Arbitrum',
    status: 'Live',
    to: '/funds/dammstable-arbitrum',
  },
  {
    name: 'DAMMeth',
    unit: 'ETH',
    line: 'Market-neutral yield engineered for long-term ETH accumulation.',
    meta: 'ETH / WETH · Ethereum',
    status: 'Live',
    to: '/funds/dammeth',
  },
  {
    name: 'DAMMbtc',
    unit: 'BTC',
    line: 'Rule-based yield engineered for long-term BTC accumulation.',
    meta: 'WBTC · Ethereum',
    status: 'Live · deposits capped',
    to: '/funds/dammbtc',
  },
];

export function FundGrid({
  links,
  cta = 'Read more',
}: {
  links?: Partial<Record<string, string>>;
  cta?: string;
}) {
  return (
    <div className={styles.fundGrid}>
      {FUNDS.map((f) => (
        <Link key={f.name} to={links?.[f.name] ?? f.to} className={styles.fundCard}>
          <div className={styles.fundTop}>
            <span className={styles.fundUnit}>{f.unit}</span>
            <span className={styles.fundStatus}>
              <span className={styles.dot} aria-hidden="true" />
              {f.status}
            </span>
          </div>
          <div className={styles.fundName}>{f.name}</div>
          <p className={styles.fundLine}>{f.line}</p>
          <div className={styles.fundMeta}>{f.meta}</div>
          <div className={styles.fundCta}>
            {cta} <span className={styles.arrow}>→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Key-value spec ledger, for short fact lists.                        */
/* ------------------------------------------------------------------ */
export function Ledger({rows}: {rows: [string, React.ReactNode][]}) {
  return (
    <dl className={styles.ledger}>
      {rows.map(([k, v]) => (
        <div key={k} className={styles.ledgerRow}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Overview hero: tick-ruler frame, formula annotations, the ring.     */
/* ------------------------------------------------------------------ */
export function DocHero({
  eyebrow,
  title,
  muted,
  lead,
}: {
  eyebrow: string;
  title: string;
  muted?: string;
  lead: React.ReactNode;
}) {
  const ticks = Array.from({length: 11}, (_, i) => i * 10);
  return (
    <header className={styles.hero}>
      <svg className={styles.ruler} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        {ticks.map((t) => (
          <line
            key={t}
            x1={t}
            x2={t}
            y1={0}
            y2={t % 50 === 0 ? 8 : 4}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <line x1={0} x2={100} y1={0} y2={0} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className={styles.fx} style={{left: '22%'}} aria-hidden="true">
        ΔP = Σ wᵢ · rᵢ
      </span>
      <span className={styles.fx} style={{left: '78%'}} aria-hidden="true">
        x · y = k
      </span>
      <DammMark size={320} className={styles.heroMark} />
      <div className={styles.heroIn}>
        <div className={styles.heroEye}>
          <span className={styles.dot} aria-hidden="true" />
          {eyebrow}
        </div>
        <h1 className={styles.heroTitle}>
          {title}
          {muted ? <span className={styles.heroMuted}> {muted}</span> : null}
        </h1>
        <p className={styles.heroLead}>{lead}</p>
      </div>
    </header>
  );
}
