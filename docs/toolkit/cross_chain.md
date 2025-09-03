---
id: cross_chain
title: Cross-Chain Deployment
sidebar_position: 5
---

# Cross-Chain Deployment

Funds leverage Safe’s native multi-chain infrastructure to operate seamlessly across networks. Using deterministic deployment, funds can be launched simultaneously on multiple blockchains while maintaining the same address.

```mermaid
graph TD
    D[Safe Deployer] -->|Deploy Fund| C1[Ethereum]
    D -->|Deploy Fund| C2[Polygon]
    D -->|Deploy Fund| C3[Arbitrum]
    
    C1 -->|0xabc...| F1[Fund on ETH]
    C2 -->|0xabc...| F2[Fund on Polygon]
    C3 -->|0xabc...| F3[Fund on Arbitrum]

    classDef deployer fill:#1f2937,stroke:#a78bfa,color:#ffffff,stroke-width:1.2px
    classDef chain fill:#334155,stroke:#94a3b8,color:#ffffff,stroke-width:1.2px
    classDef fund fill:#0b3b2e,stroke:#22c55e,color:#ffffff,stroke-width:1.2px

    class D deployer
    class C1,C2,C3 chain
    class F1,F2,F3 fund
```

This cross-chain design, combined with bridges, enables:
- Unified fund management across networks  
- Flexible capital deployment  
- Secure cross-chain communication between funds  
