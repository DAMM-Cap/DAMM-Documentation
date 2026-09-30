---
id: lagoon-deposit-module
title: Lagoon Deposit Module
sidebar_position: 2
---

# Lagoon Deposit Module

The **Lagoon Deposit Module**, built by [Lagoon Finance](https://docs.lagoon.finance/), lets DAMM funds tokenize and manage deposits. It uses [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540), an extension of the [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626) vault standard.

ERC-4626 defines a standard interface for tokenized vaults. **ERC-7540 adds asynchronous deposits and withdrawals**: a user's request is separate from its settlement. That lets a fund process entries and exits in batches. The result is simpler management, fairer share pricing, and better protection against front-running and mispricing in volatile markets.

For a plain-language, step-by-step version for depositors, see [How to deposit](../deposit/index.mdx).

## Asynchronous deposits and withdrawals

Lagoon splits both deposits and withdrawals into two phases: the **request** and the **settlement**.

### 1. Request phase

- **Deposits.** When you request a deposit, your assets move into a **pending silo**. No shares are minted yet, and **pending funds do not earn yield**. Yield starts only once the deposit is settled into the fund. **You can cancel a deposit request** while it is still pending in the current round, meaning until the fund's next NAV update is proposed. After that point the request is locked in and will be settled.
- **Withdrawals.** Withdrawal requests are also recorded in the pending silo. On Lagoon v0.5 funds (DAMMstable, DAMMeth), **withdrawal requests cannot be cancelled**. This keeps the fund's liquidity and settlement predictable. Lagoon v0.6 funds (DAMMbtc) add a cancel function: a withdrawal request can be cancelled until the next NAV update is proposed, which may come before settlement.

### 2. Settlement and claim phase

- **Settlement.** An oracle provides the fund's net asset value (NAV). The fund manager chooses the oracle. It can be a **centralized oracle** run by the manager or a **decentralized oracle** run by an external network. Settlement frequency is **not fixed** either. The fund operator decides how often to update NAV and process requests: once a day, several times a day, or even every few minutes, depending on the fund's design.
- **Claiming.** After settlement, users claim their shares (for deposits) or assets (for withdrawals). Until claimed, they are held by the vault contract for you, with no time limit. **Settled shares keep earning yield while they wait to be claimed**, so claiming late costs nothing. Settled withdrawal assets are fixed at the settlement NAV.

### Why this model

- **Batch efficiency.** Settling many requests at once cuts gas costs and operational overhead.
- **Fair valuation.** Everyone who settles together gets the same NAV-based price.
- **Security.** Explicit claims protect users. The request rules (deposits can be cancelled until the next NAV update is proposed; withdrawals are final on v0.5 funds and cancellable only until the next NAV update on v0.6) balance flexibility with predictability.

## Optional synchronous flow

Lagoon is built around asynchronous flows. From **version 0.5** it also supports an optional **synchronous deposit**: the oracle sets the fund's NAV, and while that NAV is within its **time-to-live (TTL)**, a deposit mints shares in the same transaction.

**Version 0.6 adds synchronous redemptions**, so a v0.6 fund with a valid NAV behaves like a standard [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626) vault, with no waiting.

DAMM funds currently run fully asynchronous: deposits and withdrawals are settled at the next NAV update.

## Whitelisting

Lagoon funds can restrict who may enter and exit through an **address whitelist**:

- **Whitelisted access.** Only approved wallet addresses can deposit or withdraw.
- **Composability preserved.** The restriction applies only to entering and leaving the fund. Once minted, shares are fully transferable and tradable by any address, so they stay composable across DeFi.
- **Configurable.** A fund can run with or without a whitelist. It can be fully public, or limited to a private set of liquidity providers.

This lets DAMM run both **open public funds** and **private, permissioned funds**. All three DAMM funds (DAMMstable, DAMMeth and DAMMbtc) currently run in whitelist mode. To be approved, email [team@dammcap.finance](mailto:team@dammcap.finance) before you deposit.

## Fees

Lagoon supports a flexible fee model:

- **Assets under management (AUM) fee.** A yearly fee, as a percentage of the fund's total assets. It is taken by **diluting existing shareholders**: the manager receives new shares in proportion to the fee owed.
- **Performance fee.** A fee on profits. Lagoon uses a **high-water mark**, so the fee applies only to new net gains and never to the same profit twice.

**Both fees are charged at each settlement**, so they apply consistently as the strategy runs.

Lagoon v0.6 supports **entry and exit fees** natively. They are taken from shares when a deposit or withdrawal settles. Older v0.5 vaults (DAMMstable, DAMMeth) can only add them through external contracts. Entry and exit fees can add a surcharge on deposits or a deduction on withdrawals, to discourage short-term flows or cover transaction costs. All DAMM funds currently charge 0% entry and 0% exit fees.

## Why DAMM uses Lagoon

- **Scalable entry and exit.** Handles deposits and withdrawals for many users without bottlenecks.
- **Strong risk controls.** Separating request from settlement prevents mispricing and exploits in volatile markets.
- **Clean separation.** Lagoon plugs straight into Safe and Zodiac, and it only handles deposits, withdrawals and share pricing. It stays out of strategy execution and fund administration.
- **Proven security.** Lagoon has been audited several times and secures **over $100M in TVL** in production.

## Further reading

- [Lagoon Finance documentation](https://docs.lagoon.finance/): technical specs, integration guides and developer references.
- [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540): the standard behind asynchronous deposits and withdrawals.
- [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626): the base vault standard that ERC-7540 extends.
