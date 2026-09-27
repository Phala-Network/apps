export const WALLET_ADDRESS_ATTRIBUTE = 'wallet_address'

export interface ChatwootConfig {
  baseUrl: string
  websiteToken: string
}

// Returns null (widget disabled) unless both values are set and the base URL
// is a valid http(s) URL.
export function getChatwootConfig(
  baseUrl: string | undefined,
  websiteToken: string | undefined,
): ChatwootConfig | null {
  const token = websiteToken?.trim()
  if (!baseUrl || !token) {
    return null
  }

  let url: URL
  try {
    url = new URL(baseUrl.trim())
  } catch {
    return null
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return null
  }

  return {
    baseUrl: `${url.origin}${url.pathname}`.replace(/\/+$/, ''),
    websiteToken: token,
  }
}

export type WalletAttributeAction =
  | {type: 'set'; walletAddress: string}
  | {type: 'delete'}
  | null

// Decides how to bring the contact's wallet_address attribute in line with
// the connected wallet. Deletion only happens for an address this session set,
// so visitors without a wallet trigger no attribute calls.
export function getWalletAttributeAction(
  syncedAddress: string | undefined,
  currentAddress: string | undefined,
): WalletAttributeAction {
  if (currentAddress) {
    return currentAddress === syncedAddress
      ? null
      : {type: 'set', walletAddress: currentAddress}
  }
  return syncedAddress ? {type: 'delete'} : null
}
