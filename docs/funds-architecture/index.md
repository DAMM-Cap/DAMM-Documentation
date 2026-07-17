---
id: funds-architecture
title: Funds Architecture (technical)
sidebar_position: 1
---

# Funds Architecture (technical)

At it's core, DAMM has and always will be systems driven. The DAMM toolkit is the stack we have developed over the years to deploy and manage capital autonomosly on-chain while aiming to keep our asset management non-custodial.

To achieve this, we have integrated different components to merge the benefits of self-custody with DeFi empowerment, while maintaining the highest standards of security

Some components of the toolkit have been developed in-house, while others have been built by industry peers, or in collaboration with partners.

Funds in DAMM can be structured in different ways to balance risk, isolate strategies, and enable multi-strategy management.

### Mother-Child Structures

Funds can be organized in a mother-child hierarchy where one Safe (mother) **owns** multiple sub-Safes (children). This enables:

* Risk isolation across strategies
* Clear separation of responsibilities

![Mother-Child fund structure](/img/funds-arch-mother-child.png)

### Fund-to-Fund Structures

Funds can also deposit capital into other funds, receiving LP tokens in return. For example, a high-risk fund focusing on long-tail assets might allocate a portion of its capital to a low-risk stablecoin fund for risk management or short-term liquidity.

![Fund-to-Fund structure](/img/funds-arch-fund-to-fund.png)

> Combining mother-child and fund-to-fund structures enables complex, multi-strategy fund design.

On the following pages, you'll be able to explore the different components of the DAMM Toolkit and see how they connect to deliver best-in-class financial products for our clients.

* [Lagoon Deposit Module](/funds-architecture/lagoon-deposit-module)
* [Zodiac Roles Module](/funds-architecture/zodiac-roles-module)
* [Modular Capabilities](/funds-architecture/modular-capabilities)
* [Cross-Chain Deployment](/funds-architecture/cross-chain-deployment)
* [Permission Helpers](/funds-architecture/permission-helpers)
