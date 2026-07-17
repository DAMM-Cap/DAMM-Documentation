---
id: lagoon-deposit-module
title: Lagoon Deposit Module
sidebar_position: 2
---

# Lagoon Deposit Module

The **Lagoon Deposit Module**, developed by [Lagoon Finance](https://docs.lagoon.finance/), enables DAMM Funds to tokenize and manage deposits using [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540), an extension of [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626).

While ERC-4626 defines a standard interface for tokenized vaults, **ERC-7540 introduces support for asynchronous deposits and withdrawals**, decoupling user requests from settlement. This design allows funds to batch process entries and exits, ensuring more efficient management, fairer share pricing, and stronger protections against front-running or volatility-driven mispricing.

### Asynchronous Deposits and Withdrawals

Lagoon introduces a two-phase process for both deposits and withdrawals, separating the **request** from the **settlement**:

1. **Request Phase**
   * **Deposits:** When users request a deposit, their assets are moved into a **pending silo**. At this stage, no shares are minted and **funds do not earn yield while pending**. Yield accrual only begins once the deposit has been settled and incorporated into the fund. Importantly, **deposit requests can be cancelled** by the user prior to settlement.
   * **Withdrawals:** Users can also request withdrawals, which are recorded in the pending silo. Unlike deposits, **withdrawal requests cannot be cancelled**, ensuring predictable liquidity and settlement processes for the fund.
2. **Settlement & Claim Phase**
   * **Settlement:** The fund's Net Asset Value (NAV) is provided by an oracle, which the fund manager has the flexibility to choose. This could be a **centralized oracle** operated by the manager or a **decentralized oracle** maintained by an external network. Settlement frequency is also **not fixed**—fund operators decide how often NAV is updated and requests are processed. This could be **once a day, multiple times per day, or even every few minutes**, depending on the fund's design and strategy.
   * **Claiming:** After settlement, users must explicitly claim their shares (for deposits) or assets (for withdrawals). Until claimed, they remain in the pending silo indefinitely. **Shares inside the pending silo continue accruing yield**, ensuring users are not penalized for delayed claiming.

This asynchronous model provides several key benefits:

* **Batch Efficiency:** Reduces gas costs and operational overhead by settling multiple requests at once.
* **Fair Valuation:** NAV-based pricing at settlement ensures all participants are treated equally.
* **Security:** Explicit claims protect users, while request rules (**cancelable deposits**, **non-cancelable withdrawals**) balance flexibility with predictability.

### Optional Synchronous Flow

While Lagoon is primarily designed around asynchronous flows, **version 0.5 and above** introduces support for an optional **synchronous deposit and withdrawal flow**.

When synchronous flows are enabled, the fund's Net Asset Value (NAV) is set by the oracle, and this NAV has a **time-to-live (TTL)** parameter configured in the vault. During the TTL period, deposits and withdrawals can be executed synchronously—meaning assets are transferred and shares are minted (or redeemed) in a single step.

In this mode, the Lagoon fund behaves just like a standard [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626) vault for deposits and withdrawals, with operations happening instantly and without delay.

### Whitelisting

Lagoon funds support an **address whitelisting** mechanism that allows fund managers to control who can deposit into and withdraw from the fund:

* **Whitelisted Access:** Only approved wallet addresses are permitted to make deposits or withdrawals.
* **Composability Preserved:** This restriction applies only to entry and exit of the fund. Once shares are minted, they remain fully transferable and tradable by any address, ensuring full DeFi composability.
* **Configurable Access:** Funds may be deployed with or without whitelists. This means they can be fully public and open to anyone, or restricted to a private set of liquidity providers (LPs) only.

This flexibility allows DAMM Funds to operate both **open-access public funds** and **private, permissioned funds**, depending on the strategy and investor requirements.

### Fees

Lagoon supports a flexible fee model that can be tailored to the needs of each fund:

* **Assets Under Management (AUM) Fee:** A yearly fee, expressed as a percentage of the total assets managed by the fund. This fee is taken by **diluting existing shareholders**, distributing new shares to the manager proportionally to the fee owed.
* **Performance Fee:** A fee based on the profits generated. Lagoon uses a **high-watermark fee structure**, ensuring that performance fees are only applied on new net gains and never on the same profits twice.

Both **AUM and performance fees are charged at each settlement of the fund**, ensuring fees are applied consistently as the strategy operates.

While not natively supported within Lagoon, **entrance and exit fees** can also be implemented through peripheral solutions. These external mechanisms can apply a surcharge on deposits or a deduction on withdrawals, allowing funds to discourage short-term movements or cover transaction overhead.

This fee structure ensures that DAMM Funds can balance operational costs, incentivize performance, and maintain fair treatment of investors.

### Why DAMM Uses Lagoon

DAMM Funds leverage the Lagoon Deposit Module because it provides:

* **Scalable Entry/Exit:** Handles deposits and withdrawals across multiple users without bottlenecks.
* **Robust Risk Controls:** Decoupling request and settlement phases prevents mispricing and exploits during volatile conditions.
* **Operational Modularity:** Lagoon is designed to integrate directly with Safe and Zodiac infrastructure while staying narrowly focused on deposits, withdrawals, and share pricing. It does not interfere with strategy execution or fund administration, ensuring a clean separation of responsibilities.
* **Proven Security:** Lagoon has undergone multiple audits and currently secures **hundreds of millions in TVL**, demonstrating its reliability and resilience in production environments.

### Additional Resources

For more information on the Lagoon Deposit Module, including technical specifications, integration guides, and developer references, visit the [official Lagoon Finance documentation](https://docs.lagoon.finance/).

You can also explore:

* [ERC-7540 Standard](https://eips.ethereum.org/EIPS/eip-7540) — the underlying specification enabling asynchronous deposits and withdrawals.
* [ERC-4626 Standard](https://eips.ethereum.org/EIPS/eip-4626) — the base vault standard that ERC-7540 extends.
