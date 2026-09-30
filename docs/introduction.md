---
id: introduction
title: Introduction
sidebar_position: 2
---

# Introduction

DAMM Capital is the financial and technical arm for institutions adopting DeFi. We work in two verticals that share one engine: **tokenized funds** and **DeFi as a Service (DaaS)**.

We don't predict markets. We engineer systems that adapt to them. Strategies are modelled, simulated and back-tested before they touch capital. They then run through audited onchain infrastructure that we build in house.

## 1. Tokenized funds

Onchain, non-custodial funds with different risk profiles and uses. We build every fund in house on the **DAMM Toolkit**, our onchain fund architecture. All three core funds are live:

| Fund | Denomination | What it does |
|---|---|---|
| [DAMMstable](./funds/dammstable-arbitrum.mdx) | USD | A market-neutral fund that aims for the best risk-adjusted return on USD stablecoins. |
| [DAMMeth](./funds/dammeth.mdx) | ETH | A market-neutral fund that grows ETH holdings, measured in ETH. |
| [DAMMbtc](./funds/dammbtc.mdx) | BTC | A rule-based fund that grows BTC holdings, measured in BTC. Live, with new deposits capped. |

BTC is not native to Ethereum. Any BTC strategy on Ethereum and its L2s holds wrapped BTC, which adds risk compared with ETH or USD strategies.

All funds are private. Email [team@dammcap.finance](mailto:team@dammcap.finance) before you deposit. Full details are in [Funds](./funds/index.mdx) and [How to deposit](./deposit/index.mdx).

## 2. DeFi as a Service (DaaS)

DAMM is also the execution arm for institutions and clients that want DeFi in their operations. All infrastructure is self-custodial: **you custody, DAMM manages**.

We offer four services:

- **Liquidity management.** Market making on DEXs or CEXs. Always non-custodial, driven by mathematical models.
- **Curation.** Money-market creation for institutions, with proven models and infrastructure.
- **DeFi execution.** We integrate and build onchain financial products at lower cost. That can mean plugging in native onchain yield, or adapting TradFi strategies to DeFi.
- **Research.** Quantitative research on markets and yields, built for real-world use.

We deliver these with the components described in [Funds Architecture](./funds-architecture/index.mdx). They let us manage assets autonomously and efficiently while clients keep full self-custody.

Typical examples:

- Banks and fintechs offering DeFi products to their end users.
- Protocols (for example Pendle or Euler) that want tailored DeFi integrations.
- Crypto-native companies that want better liquidity for their token on DEXs, using DAMM's liquidity management models.

Partners don't have to use DAMM's risk framework. They can bring their own risk profile, and we provide the tooling, support and execution to implement it. To start, write to [team@dammcap.finance](mailto:team@dammcap.finance) with what you want to build.
