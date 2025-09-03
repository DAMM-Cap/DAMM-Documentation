---
id: fund_architecture
title: Fund Architecture
sidebar_position: 3
---

# Fund Architecture

Funds in DAMM can be structured in different ways to balance risk, isolate strategies, and enable multi-strategy management.

## Mother-Child Structures

Funds can be organized in a mother-child hierarchy where one Safe (mother) **owns** multiple sub-Safes (children). This enables:
- Risk isolation across strategies  
- Clear separation of responsibilities  

```mermaid
graph TD
    MS[Mother Safe] -->|Owns| S1[Child Safe 1]
    MS -->|Owns| S2[Child Safe 2]
    MS -->|Owns| S3[Child Safe 3]

    S1 -->|Executes| STR1[Strategy: Market Making]
    S2 -->|Executes| STR2[Strategy: Lending / Rates]
    S3 -->|Executes| STR3[Strategy: Options / Vol]

    classDef mother fill:#1f2937,stroke:#94a3b8,color:#ffffff,stroke-width:1.2px
    classDef child fill:#334155,stroke:#a3a3a3,color:#ffffff,stroke-width:1.2px
    classDef strategy fill:#0b3b2e,stroke:#22c55e,color:#ffffff,stroke-width:1.2px

    class MS mother
    class S1,S2,S3 child
    class STR1,STR2,STR3 strategy
```

## Fund-to-Fund Structures

Funds can also deposit capital into other funds, receiving LP tokens in return. For example, a high-risk fund focusing on long-tail assets might allocate a portion of its capital to a low-risk stablecoin fund for risk management or liquidity.

```mermaid
graph TD
    F1[High Risk Fund] -->|Deposits| F2[Stablecoin Fund]
    F1 -->|Holds| A1[Long Tail Assets]
    F1 -->|Holds| A2[LP Tokens]

    classDef fund fill:#1f2937,stroke:#94a3b8,color:#ffffff,stroke-width:1.2px
    classDef asset fill:#0b3b2e,stroke:#22c55e,color:#ffffff,stroke-width:1.2px

    class F1,F2 fund
    class A1,A2 asset
```

> Combining mother-child and fund-to-fund structures enables complex, multi-strategy fund design.
