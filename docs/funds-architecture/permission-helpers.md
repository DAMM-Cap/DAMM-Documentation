---
id: permission-helpers
title: Permission Helpers
sidebar_position: 6
---

# Permission Helpers

Since DAMM offers **non-custodial Protocol Owned Liquidity (PoL) services** with active management on top of Uniswap, the release of **Uniswap V4** — with its new features — required us to adapt our models and integrate with Zodiac.

However, we encountered challenges due to the way data is structured in Uniswap V4 and its current incompatibility with Zodiac V2. Specifically, to set proper permissions for Uniswap V4 calldata, we needed to verify **nested `abi.encode` structs**. This is a limitation of the **Zodiac Roles module**, which requires all logical branches to follow the same type structure.

To solve this, we developed **Permission Helpers**.
These contracts are designed to overcome the limitations of the Zodiac Roles system, which previously prevented proper permission management for Uniswap V4. Because of these constraints, the solution could not be implemented via the existing Zodiac JS SDK.

Our Permission Helpers act as **calldata struct decoders**, enabling precise transaction-level verification. They have been **audited by Certora**, one of the leading security firms in the space, and are **open-source under the MIT license**.

Repo: [https://github.com/DAMM-Cap/UniswapV4-Zodiac-Roles](https://github.com/DAMM-Cap/UniswapV4-Zodiac-Roles)

Audit Report: [https://github.com/DAMM-Cap/UniswapV4-Zodiac-Roles/tree/main/audits](https://github.com/DAMM-Cap/UniswapV4-Zodiac-Roles/tree/main/audits)
