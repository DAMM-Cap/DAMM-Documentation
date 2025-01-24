---
id: oracles
title: Oracles
sidebar_position: 4
---

The DAMM Protocol uses the [Euler v2 Oracle Standard (ERC-7726)](https://github.com/euler-xyz/euler-price-oracle) for fund valuation. The system consists of:
- Configurable price sources for each asset pair
- Supports both push and pull-based oracle implementations
- Manages oracle adapter registry and permissions

### Fund Valuation Oracle
---

A specialized oracle that calculates a fund's total value by:
1. Aggregating direct asset holdings
2. Including child fund valuations (for parent funds)
3. Converting all values to the fund's unit of account

**Important Caveat**: Fund valuation currently requires all positions to be closed and assets to be liquid. The oracle cannot price:
- Open DeFi positions (lending, LP positions, etc)
- Illiquid or locked assets
- Complex derivatives

However, the oracle system is designed to be extensible:
- New oracle adapters can be developed to price complex positions
- The router's configuration can be updated to use different price sources
- Existing oracles can be replaced without protocol upgrades
- Custom oracles can be added for specific DeFi positions or strategies




