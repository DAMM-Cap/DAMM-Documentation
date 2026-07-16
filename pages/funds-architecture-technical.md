> For the complete documentation index, see [llms.txt](https://damm-capital.gitbook.io/damm-capital-docs/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://damm-capital.gitbook.io/damm-capital-docs/funds-architecture-technical.md).

# Funds Architecture (technical)

At it's core, DAMM has and always will be systems driven. The DAMM toolkit is the stack we have developed over the years to deploy and manage capital autonomosly on-chain while aiming to keep our asset management non-custodial.

To achieve this, we have integrated different components to merge the benefits of self-custody with DeFi empowerment, while maintaining the highest standards of security

Some components of the toolkit have been developed in-house, while others have been built by industry peers, or in collaboration with partners.

Funds in DAMM can be structured in different ways to balance risk, isolate strategies, and enable multi-strategy management.

### Mother-Child Structures <a href="#mother-child-structures" id="mother-child-structures"></a>

Funds can be organized in a mother-child hierarchy where one Safe (mother) **owns** multiple sub-Safes (children). This enables:

* Risk isolation across strategies
* Clear separation of responsibilities

<figure><img src="/files/fm0a1uaTCIRmmqMogfk5" alt=""><figcaption></figcaption></figure>

### Fund-to-Fund Structures <a href="#fund-to-fund-structures" id="fund-to-fund-structures"></a>

Funds can also deposit capital into other funds, receiving LP tokens in return. For example, a high-risk fund focusing on long-tail assets might allocate a portion of its capital to a low-risk stablecoin fund for risk management or short-term liquidity.

<figure><img src="/files/Z7bOOGHkCe9MXDoOiZ0C" alt=""><figcaption></figcaption></figure>

> Combining mother-child and fund-to-fund structures enables complex, multi-strategy fund design.

On the following pages, you’ll be able to explore the different components of the DAMM Toolkit and see how they connect to deliver best-in-class financial products for our clients.

* [Lagoon Deposit Module](/damm-capital-docs/funds-architecture-technical/lagoon-deposit-module.md)
* [Zodiac Roles Module](/damm-capital-docs/funds-architecture-technical/zodiac-roles-module.md)Zodiac Roles Module
* [Modular Capabilities](/damm-capital-docs/funds-architecture-technical/modular-capabilities.md)Modular Capabilities
* [Cross-Chain Deployment](/damm-capital-docs/funds-architecture-technical/cross-chain-deployment.md)Cross-chain deployment
