> For the complete documentation index, see [llms.txt](https://damm-capital.gitbook.io/damm-capital-docs/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://damm-capital.gitbook.io/damm-capital-docs/funds-architecture-technical/modular-capabilities.md).

# Modular Capabilities

DAMM Funds extend their functionality through Safe-compatible modules. These modules are composable and can be included individually or in combination depending on the fund’s needs.

### [Transaction Management](http://localhost:3000/toolkit/zodiac_roles_module) <a href="#transaction-management" id="transaction-management"></a>

Operators use the **Zodiac Roles Module** to transact on behalf of the fund, enabling secure and permissioned interaction with DeFi protocols.

### [Deposits and Withdrawals](http://localhost:3000/toolkit/lagoon_deposit_module) <a href="#deposits-and-withdrawals" id="deposits-and-withdrawals"></a>

The **Lagoon Deposit Module** allows investors to invest in the fund or withdraw their capital. Users receive shares for deposits and can redeem them when exiting.

### [Transaction Delay](http://localhost:3000/toolkit/zodiac_delay_module.md) <a href="#transaction-delay" id="transaction-delay"></a>

The **Zodiac Delay Module** adds a mandatory delay before sensitive transactions are executed, creating a review period for stakeholders.

> Modular capabilities let funds scale securely, while remaining flexible in design.
