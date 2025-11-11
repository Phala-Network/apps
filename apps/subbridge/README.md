# SubBridge - Service Discontinued

SubBridge has been permanently discontinued as part of the Phala Network parachain sunset.

## What Happened?

The Phala Network parachain has completed its sunset process, and all bridge operations between Phala and other chains have been disabled.

For more details, please refer to the [governance referendum](https://phala.subsquare.io/democracy/referenda/77).

## New L2 Bridge

For bridging assets on Phala's Layer 2 network, please visit our new bridge service:

**[bridge.phala.network](https://bridge.phala.network)**

## Technical Details

This app has been migrated to Next.js App Router and simplified to show only a static announcement page.

### Structure

- `app/` - Next.js App Router pages
- `components/` - React components
- `public/` - Static assets

### Development

```bash
bun install
bun run dev
```

### Build

```bash
bun run build
```

The app is configured for static export (`output: 'export'` in `next.config.js`).
