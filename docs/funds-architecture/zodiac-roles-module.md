---
id: zodiac-roles-module
title: Zodiac Roles Module
sidebar_position: 3
---

# Zodiac Roles Module

The Zodiac Roles Module lets a Safe's multisig signers hand specific actions to operators without giving them full access. This permission system is a core part of the DAMM Toolkit.

:::note Who builds it
[Gnosis Guild](https://twitter.com/gnosisguild) develops and maintains the Zodiac Roles Module, not DAMM Capital. DAMM uses this industry-standard tool as part of its fund management infrastructure.
:::

## Overview

At DAMM, the Roles Module gives operators permission to allocate assets and interact with protocols, while the signers keep control. The result is a secure and efficient way to run a fund.

DAMM funds use [Zodiac Roles Module V2](https://github.com/gnosisguild/zodiac-modifier-roles), which adds features and security over earlier versions. Security firms including G0 Group and Omniscia have audited it several times. All audit reports are in the [project's documentation repository](https://github.com/gnosisguild/zodiac-modifier-roles/tree/main/packages/evm/docs).

The module is open source, audited, and widely used by DeFi treasury and fund managers.

## Key features

- **Granular permissions.** Set which contracts operators can call, and which functions.
- **Parameter scoping.** Limit not only which functions can be called, but which parameter values are allowed.
- **Allowances.** Cap how much value operators can move, and how often a function can be called in a given period.
- **Multi-module support.** Works with every Zodiac-compatible module.

## How DAMM funds use it

1. **Operational security.** Separate the duties of administrators and operators.
2. **Asset allocation.** Let fund managers allocate assets within set permissions and limits.
3. **Protocol interaction.** Create specialized roles for specific DeFi protocols.
4. **Risk management.** Cap the value that can go into any one protocol.
5. **Automated execution.** Let bots run specific functions without full access.
6. **Emergency response.** Assign **guardian roles** that can run emergency transactions, such as pulling funds from a protocol during a hack or critical exploit.

## Implementation

Roles and permissions are configured with the [Zodiac Roles SDK](https://www.npmjs.com/package/zodiac-roles-sdk), a TypeScript package for defining and managing role permissions in code. With it, administrators can:

- create and manage roles programmatically;
- define precise permission sets for each type of operator;
- update permissions as operations change;
- keep an auditable record of every permission change.

On top of it, DAMM uses its own **DAMM DeFi Kit**, an SDK built on the Zodiac Roles SDK. It adds:

- one-click fund deployment and configuration;
- native integrations with a wide range of DeFi protocols;
- automatic role assignment for operators and bots;
- streamlined workflows for fund upgrades and strategy changes.

This layered setup gives operators exactly the permissions they need, and lets DAMM launch and manage funds efficiently at scale.

## Further reading

The [official Zodiac Roles documentation](https://docs.roles.gnosisguild.org/) covers conditions, allowances, transaction unwrapping and the SDK in detail.
