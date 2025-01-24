---
id: design
title: Protocol Design
sidebar_position: 2
---

A **Fund** is the fundamental building block of the protocol. Funds pool together user deposits, tokenizing them as LP shares. Operators then deploy this capital across various DeFi protocols to generate yield for the fund's shareholders.

```mermaid
graph LR
    %% User Deposit Flow
    U[User] -->|Deposits & Receives LP Tokens| F[Fund]
    
    %% Operator Management
    O[Operators] -->|Investment Decisions| F
    
    %% Investment Flow
    F -->|Deploy Capital| P1[Lending Protocol]
    F -->|Deploy Capital| P2[DEX Protocol]
    F -->|Deploy Capital| P3[Options Protocol]
    
    %% Styling
    classDef user fill:#ffd,stroke:#333,stroke-width:2px
    classDef fund fill:#f9f,stroke:#333,stroke-width:2px
    classDef operator fill:#bbf,stroke:#333,stroke-width:2px
    classDef protocol fill:#fdb,stroke:#333,stroke-width:1px
    
    class U user
    class F fund
    class O operator
    class P1,P2,P3 protocol
```

## Safe-Based
---

Each Fund in the DAMM Protocol is a Safe multisig smart wallet. Modules are natively added to the Safe to extend the fund's capabilities:

- **Transaction Module**: Enables permissioned transaction execution by operators, with configurable transaction hooks
- **Deposit Module (Periphery)**: Tokenizes the fund's assets by minting ERC-4626 compliant LP tokens, enabling composability with other DeFi protocols
- **Callback Handler**: Manages position tracking, permissions, and asset registry across the fund

```mermaid
graph TD
    %% Main Fund Components
    Fund[Fund Safe] --> CB[Fund Callback Handler]
    Fund --> TM[Transaction Module]
    Fund --> P[Deposit Module]
    
    %% Callback Handler Components
    CB --> PT[Position Tracking]
    CB --> AR[Asset Registry]
    CB --> PC[Permission Control]
    
    %% Transaction Module Components
    TM --> HR[Hook Registry]
    
    %% Periphery Module Components
    P --> FSV[Fund Share Vault]
    P --> UOA[Unit of Account Token]
    
    %% Styling
    classDef core fill:#f9f,stroke:#333,stroke-width:2px
    classDef module fill:#bbf,stroke:#333,stroke-width:2px
    classDef component fill:#dfd,stroke:#333,stroke-width:1px
    
    class Fund core
    class CB,TM,P module
    class PT,AR,PC,HR,FSV,UOA component
```

## Hierarchical Funds
---

The DAMM Protocol uses a parent-child hierarchy to segregate investment strategies:
- **Parent Fund**: Handles capital deposits/withdrawals and distributes funds to child strategies
- **Child Funds**: Execute specific investment strategies with isolated risk

> Child funds are identical to parent funds in architecture except that they do not have a Deposit Module (Periphery). They are not intended to be used by users directly. They are only intended to be used by operators to execute investment strategies.

```mermaid
graph TD
    %% User Interaction
    U[Users] -->|Deposit/Withdraw| PF[Parent Fund]
    
    %% Child Funds
    PF -->|Deploy Capital| CF1[Child Fund 1]
    PF -->|Deploy Capital| CF2[Child Fund 2]
    PF -->|Deploy Capital| CF3[Child Fund 3]
    
    %% Strategy Labels
    CF1 --> S1[Strategy: Lending]
    CF2 --> S2[Strategy: DEX Trading]
    CF3 --> S3[Strategy: Options]
    
    %% Styling
    classDef user fill:#ffd,stroke:#333,stroke-width:2px
    classDef parent fill:#f9f,stroke:#333,stroke-width:2px
    classDef child fill:#bbf,stroke:#333,stroke-width:2px
    classDef strategy fill:#dfd,stroke:#333,stroke-width:1px
    
    class U user
    class PF parent
    class CF1,CF2,CF3 child
    class S1,S2,S3 strategy
```

## Cross-Chain Capabilities
---

The DAMM Protocol leverages Safe's native cross-chain infrastructure to enable truly cross-chain investment funds. Through Safe's deterministic deployment system, funds can be launched simultaneously across multiple blockchain networks while maintaining the same address on each chain.

```mermaid
graph TD
    %% Safe Deployer
    D[Safe Deployer] -->|Deploy Fund| C1[Ethereum]
    D -->|Deploy Fund| C2[Polygon]
    D -->|Deploy Fund| C3[Arbitrum]
    
    %% Resulting Funds with Same Address
    C1 -->|0xabc...| F1[Fund on ETH]
    C2 -->|0xabc...| F2[Fund on Polygon]
    C3 -->|0xabc...| F3[Fund on Arbitrum]

    
    %% Styling
    classDef deployer fill:#f9f,stroke:#333,stroke-width:2px
    classDef chain fill:#dfd,stroke:#333,stroke-width:1px
    classDef fund fill:#bbf,stroke:#333,stroke-width:1px
    
    class D deployer
    class C1,C2,C3 chain
    class F1,F2,F3 fund
```

This cross-chain architecture, combined with bridge protocols, enables:
- Unified fund management across multiple networks
- Cross-chain capital deployment
- Cross-chain communication between funds

### Supported Networks

#### Mainnets
- Aurora
- Arbitrum
- Avalanche
- Base
- Blast
- BNB Chain
- Celo
- Ethereum
- Gnosis Chain
- Linea
- Mantle
- Optimism
- Polygon
- Polygon zkEVM
- Scroll
- World Chain
- X Layer
- zkSync Era

#### Testnets
- Base Sepolia
- Ethereum Sepolia

