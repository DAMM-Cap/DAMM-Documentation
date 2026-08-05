---
id: funds
title: Funds
sidebar_position: 1
---

# Funds

DAMM Capital operates tokenized, non-custodial funds built on
[Lagoon](https://docs.lagoon.finance/overview/readme) vault infrastructure and
Safe smart accounts. Capital is deployed by DAMM's trading systems under
on-chain permission policies ([Zodiac Roles](../funds-architecture/zodiac-roles-module.md)),
shares are ERC-20 tokens priced by NAV, and entries and exits are processed
through request-based subscriptions and redemptions.

## Flagship funds

| Fund | Denomination | Chain | Strategy |
|---|---|---|---|
| [DAMMstable](./dammstable-arbitrum.mdx) | USD (USDT0) | Arbitrum | Market-neutral stablecoin yield: algorithmic liquidity provision, overcollateralized lending, fixed income |
| [DAMMeth](./dammeth.mdx) | ETH (WETH) | Ethereum | Market-neutral ETH yield: LST/LRT liquidity provision, lending, fixed income, staking |
| [DAMMbtc](./dammbtc.mdx) | BTC (WBTC) | Ethereum | BTC-native yield: rule-based concentrated-liquidity market making on correlated BTC pairs |

All funds are **whitelist-gated**: reading fund data is open to everyone, but
depositing or redeeming requires an approved address. Request access via
[team@dammcap.finance](mailto:team@dammcap.finance) or our
[Telegram group](https://t.me/+6ntEC5sU7tM4Yjlh).

:::note Execution vehicles
The algorithmic execution funds (DAMMethAlgo, DAMMbtcAlgo) are internal
vehicles the flagship funds allocate into — they are not directly investable.
Their on-chain data is public like everything else; see
[Integrations](../integrations/index.mdx).
:::

## Where to find what

- **Fund objective, terms, addresses** — each fund page in this section.
- **Live share price, TVL, and your position** — each fund's page on the
  [Lagoon app](https://app.lagoon.finance) (connect your wallet to see your
  shares and value).
- **Programmatic access to fund data** — the [Integrations](../integrations/index.mdx)
  section: copy-paste API guides per fund.
- **How the vault layer works** (asynchronous deposits and redemptions,
  valuation, roles, security) — [Lagoon's documentation](https://docs.lagoon.finance).
- **How DAMM's execution stack works** — [Funds Architecture](../funds-architecture/index.md).
