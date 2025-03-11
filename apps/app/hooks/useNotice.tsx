import {Close} from '@mui/icons-material'
import {Box, IconButton, Typography} from '@mui/material'
import {isFuture, isPast} from 'date-fns'
import {useRouter} from 'next/router'
import {useSnackbar} from 'notistack'
import {useEffect, useRef} from 'react'

// Define the Notice type with required properties
interface Notice {
  id: string
  title: string
  content: string
  startDate: Date
  endDate: Date
  priority?: number // Higher number = higher priority
}

// List of all possible notices
const notices: Notice[] = [
  {
    id: 'ias-upgrade',
    title: 'Intel IAS Support Ends',
    content:
      "Intel IAS support ends in early April. All miners must upgrade to DCAP to continue mining. A 7-day cooling-down period during your upgrade will affect miner's revenue and pool APR. Pool owners and delegators Please coordinate in advance to ensure pool's stability.",
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-04-30'),
    priority: 1,
  },

  // Add more notices as needed
]

const STORAGE_KEY = 'phala-app:notice-shown'

export function useNotice() {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  const {pathname} = useRouter()
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    let noticeShown: string[] = []
    try {
      noticeShown = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]',
      ) as string[]
    } catch (error) {}

    // Filter for active notices (current date is between start and end dates)
    const activeNotices = notices.filter(
      (notice) =>
        isPast(notice.startDate) &&
        isFuture(notice.endDate) &&
        !noticeShown.includes(notice.id) &&
        !(notice.id === 'ias-upgrade' && pathname.includes('staking')),
    )

    // Sort by priority (highest first)
    const sortedNotices = activeNotices.sort(
      (a, b) => (b.priority || 0) - (a.priority || 0),
    )
    console.log(sortedNotices)

    setTimeout(() => {
      for (const notice of sortedNotices) {
        console.log(notice)
        const snackbarId = enqueueSnackbar(
          <Box maxWidth={400}>
            <Typography variant="subtitle1" component="div">
              {notice.title}
            </Typography>
            <Typography variant="caption" component="div">
              {notice.content}
            </Typography>
          </Box>,
          {
            variant: 'default',
            persist: true,
            action: (
              <IconButton
                size="small"
                onClick={() => {
                  closeSnackbar(snackbarId)
                }}
              >
                <Close />
              </IconButton>
            ),
            onClose: () => {
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify([...noticeShown, notice.id]),
              )
            },
          },
        )
      }
    }, 1000)
  }, [enqueueSnackbar, pathname, closeSnackbar])
}
