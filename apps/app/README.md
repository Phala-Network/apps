# [Phala App](https://app.phala.network)

## Environment variables

Copy `.env.example` to `.env.local` for local development. All variables are
public (`NEXT_PUBLIC_*`) and are inlined at build time.

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID used by RainbowKit. |
| `NEXT_PUBLIC_CHATWOOT_BASE_URL` | Chatwoot installation URL. Production: `https://chatwoot.phala.com`. |
| `NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN` | Chatwoot website inbox token. Production: `Ud2qxzNU336QoWUevzgNyGay`. |

The Chatwoot live-chat widget only renders when both Chatwoot variables are
set. Visitors are anonymous; when a wallet is connected its address is stored
on the Chatwoot contact as the `wallet_address` custom attribute.
