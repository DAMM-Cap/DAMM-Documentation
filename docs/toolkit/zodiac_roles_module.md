---
id: zodiac_roles_module
title: Zodiac Roles Module
sidebar_position: 4
---

# Zodiac Roles Module

The Zodiac Roles Module enables Safe multisig signers to delegate specific actions to operators without granting full access. This permission management system is a critical component of the DAMM toolkit.

> **Important:** The Zodiac Roles Module is developed and maintained by [Gnosis Guild](https://twitter.com/gnosisguild), not by DAMM Capital. DAMM leverages this industry-standard tool as part of its fund management infrastructure.

## Overview

At DAMM, the Roles Module is used to give operators permissions to allocate assets and interact with protocols while maintaining signer access control. This creates a secure and efficient operational structure for fund management.

DAMM funds use the [Zodiac Roles Module V2](https://github.com/gnosisguild/zodiac-modifier-roles), which offers enhanced features and improved security compared to legacy implementations. This module has been thoroughly audited multiple times by security firms including G0 Group and Omniscia, with all audit reports available in the [project's documentation repository](https://github.com/gnosisguild/zodiac-modifier-roles/tree/main/packages/evm/docs).

The Roles Module is widely adopted across the industry, with leading DeFi fund managers like [Karpatkey](https://karpatkey.com/) and other top organizations using it for secure fund management operations. Currently securing billions of dollars in Total Value Locked (TVL) across various DeFi protocols and DAOs, this broad adoption demonstrates the tool's reliability, security, and effectiveness for managing complex permission structures at scale.

## Key Features

- **Granular Permissions:** Define which contracts operators can interact with and which functions they can call  
- **Parameter Scoping:** Restrict not just which functions can be called, but also what parameter values are allowed  
- **Allowance Management:** Set spending limits to control how much value operators can transfer, and define call allowances to restrict how often specific functions can be executed within a given timeframe  
- **Multi-Module Support:** Works with all Zodiac-compatible modules  


## Use Cases in DAMM Funds

DAMM Funds leverage the Roles Module for several critical applications:

1. **Operational Security:** Separate duties between administrators and operators  
2. **Asset Allocation:** Allow fund managers to allocate assets with specific permissions and limits  
3. **Protocol Interaction:** Enable specialized roles for specific DeFi protocol interactions  
4. **Risk Management:** Limit the maximum value that can be deployed to specific protocols  
5. **Automated Execution:** Allow bots or automated systems to execute specific functions without full access  
6. **Emergency Response:** Designate **guardian roles** with the ability to execute emergency transactions, such as withdrawing funds from protocols during a hack or critical exploit scenario  


## Implementation

The configuration of roles and permissions is managed using the [Zodiac Roles SDK](https://www.npmjs.com/package/zodiac-roles-sdk), a TypeScript package that provides a programmatic interface for defining and managing role permissions.

Using this SDK, administrators can:
- Create and manage roles programmatically  
- Define precise permission sets for different operator types  
- Update permissions as operational requirements evolve  
- Maintain an auditable record of permission changes  

In addition, DAMM Capital leverages its proprietary **DAMM DeFi Kit**, an SDK built on top of the Zodiac Roles SDK. The DAMM DeFi Kit expands functionality by enabling:
- One-click fund deployment and configuration  
- Native integrations with a wide range of DeFi protocols  
- Automated role assignments for operators and bots  
- Streamlined workflows for fund upgrades and strategy management  

This layered approach provides both flexibility and automation, ensuring operators have exactly the permissions they need while enabling DAMM to efficiently launch and manage funds at scale.  

## Additional Resources

For comprehensive documentation on the Zodiac Roles Module, including detailed guides on conditions, allowances, transaction unwrapping, and the SDK, visit the [official Zodiac Roles documentation](https://docs.roles.gnosisguild.org/).