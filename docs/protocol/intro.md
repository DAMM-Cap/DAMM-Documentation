---
id: intro
title: Introduction
sidebar_position: 1
---

# Introduction

The DAMM Protocol is an Automated Liquidity Management (ALM) protocol that enables the creation and operation of decentralized mutual funds on the blockchain. Built on top of [Safe](https://safe.global/) (formerly Gnosis Safe) and the [Euler v2 Oracle Standard (ERC-7726)](https://github.com/euler-xyz/euler-price-oracle), it provides a robust framework for professional fund managers to deploy various investment strategies while maintaining high security standards and operational flexibility.

The protocol's primary purpose is to bridge the gap between traditional fund management and decentralized finance (DeFi) by providing:
- Segregated investment strategies through parent-child fund relationships
- Brokerage system for customizable access control and differential fee structures
- Support for any basket of digital assets
- Easily integrate with any DeFi protocol
- Deposits are tokenized into composable fund share tokens (ERC-4626)

### Core Principles
---

The DAMM Protocol was designed around three fundamental principles:

1. **EOA-Like Capabilities**
   - Funds should have the same capabilities as externally owned accounts (EOAs)
   - No restrictions on which protocols or assets can be integrated

2. **Off-Chain Asset Management**
   - All asset management logic and decision-making happens off-chain
   - On-chain components focus on execution, security, and accounting
   - Enables rapid strategy adaptation without protocol upgrades

3. **Flexible Decentralization**
   - Supports varying degrees of decentralization based on fund requirements
   - Configurable permission systems for different roles
   - Immutable by default