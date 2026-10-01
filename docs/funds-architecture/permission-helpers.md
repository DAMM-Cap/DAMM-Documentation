---
id: permission-helpers
title: Permission Helpers
sidebar_position: 6
---

# Permission Helpers

DAMM offers **non-custodial protocol-owned liquidity (PoL) services**, with active management on Uniswap. When **Uniswap V4** launched with new features, we had to adapt our models and integrate it with Zodiac.

That raised a problem. Uniswap V4 structures its data in a way Zodiac Roles V2 could not handle. To set proper permissions on Uniswap V4 calldata, we needed to verify **nested `abi.encode` structs**. The Zodiac Roles module can't do this, because it requires every logical branch to share the same type structure. For the same reason, the existing Zodiac JS SDK could not solve it.

So we built **Permission Helpers**: contracts that work around these limits and make proper permission management for Uniswap V4 possible. They act as **calldata struct decoders**, so each transaction can be verified precisely.

The Permission Helpers are **audited by Certora**, one of the leading security firms in the space, and are **open source under the MIT license**.

- Repository: [github.com/DAMM-Cap/UniswapV4-Zodiac-Roles](https://github.com/DAMM-Cap/UniswapV4-Zodiac-Roles)
- Audit report: [UniswapV4-Zodiac-Roles/audits](https://github.com/DAMM-Cap/UniswapV4-Zodiac-Roles/tree/main/audits)

For a full walkthrough of the approach, read our research article: [Providing Liquidity on Uniswap V4 While Preserving Self-Custody](https://dammcap.finance/research/uniswap-v4-zodiac-roles-verifiers/).
