import {VAULT_CONTRACT_ADDRESS, explorerUrl} from '@/config'
import {
  type Claimed,
  type Deposit,
  useClaimedsQuery,
  useDepositsQuery,
} from '@/lib/vaultQueries'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material'
import {toCurrency} from '@phala/lib'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import vphaIcon from '@phala/ui/icons/asset/vpha.png'
import Image from 'next/image'
import {useState} from 'react'
import {formatUnits} from 'viem'
import {useAccount} from 'wagmi'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vault-tabpanel-${index}`}
      aria-labelledby={`vault-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{py: 3}}>{children}</Box>}
    </div>
  )
}

const VaultClaims = () => {
  const {address: raw} = useAccount()
  const address = raw && '0xb29eaEA575bd4bae7d9a301446e6204C3A23AdF1'
  const [tabValue, setTabValue] = useState(0)
  const pageSize = 20

  const {
    data: depositsData,
    isLoading: depositsLoading,
    error: depositsError,
  } = useDepositsQuery(address, 1, pageSize)

  const {
    data: claimedsData,
    isLoading: claimedsLoading,
    error: claimedsError,
  } = useClaimedsQuery(address, 1, pageSize)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(Number.parseInt(timestamp) * 1000).toLocaleString()
  }

  const formatTransactionHash = (hash: string) => {
    return `${hash.slice(0, 8)}...`
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`
  }

  const getExplorerLink = (hash: string) => {
    return `${explorerUrl}/tx/${hash}`
  }

  const getAddressExplorerLink = (address: string) => {
    return `${explorerUrl}/address/${address}`
  }

  const viewAllLink = `${explorerUrl}/advanced-filter?fadd=${address}&eladd=${VAULT_CONTRACT_ADDRESS}`

  if (!address) {
    return (
      <Paper sx={{p: 3, mt: 2}}>
        <Typography variant="h6" gutterBottom>
          Vault Claims
        </Typography>
        <Typography color="text.secondary">
          Connect your wallet to view your vault deposits and claims
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{mt: 2}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Deposits" />
          <Tab label="Claims" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{px: 2}}>
          <Typography variant="h6" gutterBottom>
            Deposit History
          </Typography>
        </Box>
        {depositsLoading ? (
          <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
            <CircularProgress />
          </Box>
        ) : depositsError ? (
          <Alert severity="error" sx={{mb: 2}}>
            Error loading deposits:{' '}
            {depositsError instanceof Error
              ? depositsError.message
              : 'Unknown error'}
          </Alert>
        ) : depositsData?.deposits.length === 0 ? (
          <Typography color="text.secondary" sx={{p: 3, textAlign: 'center'}}>
            No deposits found for this address
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                      Transaction
                    </TableCell>
                    <TableCell sx={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                      Date
                    </TableCell>
                    <TableCell sx={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                      PHA
                    </TableCell>
                    <TableCell sx={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                      vPHA
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {depositsData?.deposits.map((deposit: Deposit) => (
                    <TableRow key={deposit.id}>
                      <TableCell sx={{whiteSpace: 'nowrap'}}>
                        <Link
                          href={getExplorerLink(deposit.transactionHash_)}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{textDecoration: 'none'}}
                        >
                          {formatTransactionHash(deposit.transactionHash_)}
                        </Link>
                      </TableCell>
                      <TableCell sx={{whiteSpace: 'nowrap'}}>
                        {formatTimestamp(deposit.timestamp_)}
                      </TableCell>
                      <TableCell sx={{whiteSpace: 'nowrap'}}>
                        <Box
                          sx={{display: 'flex', alignItems: 'center', gap: 1}}
                        >
                          <Image
                            src={phaIcon}
                            width={16}
                            height={16}
                            alt="PHA"
                          />
                          {toCurrency(formatUnits(BigInt(deposit.assets), 18))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{whiteSpace: 'nowrap'}}>
                        <Box
                          sx={{display: 'flex', alignItems: 'center', gap: 1}}
                        >
                          <Image
                            src={vphaIcon}
                            width={16}
                            height={16}
                            alt="vPHA"
                          />
                          {toCurrency(formatUnits(BigInt(deposit.shares), 18))}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
              <Button
                component={Link}
                href={viewAllLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="text"
                color="primary"
              >
                View All
              </Button>
            </Box>
          </>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{px: 2}}>
          <Typography variant="h6" gutterBottom>
            Claim History
          </Typography>
        </Box>
        {claimedsLoading ? (
          <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
            <CircularProgress />
          </Box>
        ) : claimedsError ? (
          <Alert severity="error" sx={{mb: 2}}>
            Error loading claims:{' '}
            {claimedsError instanceof Error
              ? claimedsError.message
              : 'Unknown error'}
          </Alert>
        ) : claimedsData?.claimeds.length === 0 ? (
          <Typography color="text.secondary" sx={{p: 3, textAlign: 'center'}}>
            No claims found for this address
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                      Transaction
                    </TableCell>
                    <TableCell sx={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                      Date
                    </TableCell>
                    <TableCell sx={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                      PHA
                    </TableCell>
                    <TableCell sx={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                      Receiver
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claimedsData?.claimeds.map((claimed: Claimed) => (
                    <TableRow key={claimed.id}>
                      <TableCell sx={{whiteSpace: 'nowrap'}}>
                        <Link
                          href={getExplorerLink(claimed.transactionHash_)}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{textDecoration: 'none'}}
                        >
                          {formatTransactionHash(claimed.transactionHash_)}
                        </Link>
                      </TableCell>
                      <TableCell sx={{whiteSpace: 'nowrap'}}>
                        {formatTimestamp(claimed.timestamp_)}
                      </TableCell>
                      <TableCell sx={{whiteSpace: 'nowrap'}}>
                        <Box
                          sx={{display: 'flex', alignItems: 'center', gap: 1}}
                        >
                          <Image
                            src={phaIcon}
                            width={16}
                            height={16}
                            alt="PHA"
                          />
                          {toCurrency(formatUnits(BigInt(claimed.assets), 18))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{whiteSpace: 'nowrap'}}>
                        <Link
                          href={getAddressExplorerLink(claimed.receiver)}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{textDecoration: 'none'}}
                        >
                          {formatAddress(claimed.receiver)}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
              <Button
                component={Link}
                href={viewAllLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                color="primary"
              >
                View All
              </Button>
            </Box>
          </>
        )}
      </TabPanel>
    </Paper>
  )
}

export default VaultClaims
