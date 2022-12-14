import usePolkadotApi from '@/hooks/usePolkadotApi'
import usePoolIntro, {PoolIntro} from '@/hooks/usePoolIntro'
import useSignAndSend from '@/hooks/useSignAndSend'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import {getDecimalPattern} from '@phala/util'
import {stringToHex} from '@polkadot/util'
import Decimal from 'decimal.js'
import {FC, useEffect, useMemo, useState} from 'react'

const OwnerSettings: FC<{
  basePool: BasePoolCommonFragment
}> = ({basePool}) => {
  const {id, kind, stakePool} = basePool
  const isVault = kind === 'Vault'
  const color = isVault ? 'secondary' : 'primary'
  const api = usePolkadotApi()
  const [introLoaded, setIntroLoaded] = useState(false)
  const poolIntro = usePoolIntro(basePool.id)
  const signAndSend = useSignAndSend()
  const [commissionLoading, setCommissionLoading] = useState(false)
  const [commissionString, setCommissionString] = useState(
    new Decimal(basePool.commission).times(100).toString()
  )
  const [capacityLoading, setCapacityLoading] = useState(false)
  const [capacityString, setCapacityString] = useState(() =>
    stakePool?.capacity ? new Decimal(stakePool.capacity).toString() : ''
  )

  const [telegramString, setTelegramString] = useState('')
  const [discordString, setDiscordString] = useState('')
  const [wechatString, setWechatString] = useState('')
  const [twitterString, setTwitterString] = useState('')
  const [emailString, setEmailString] = useState('')
  const [forumString, setForumString] = useState('')
  const [annString, setAnnString] = useState('')
  const [saveIntroLoading, setSaveIntroLoading] = useState(false)

  const commissionValid = useMemo(() => {
    try {
      const commission = new Decimal(commissionString)
      return commission.gte(0) && commission.lte(100)
    } catch (err) {
      return false
    }
  }, [commissionString])

  const setCommission = () => {
    if (!api) return
    const commission = new Decimal(commissionString).times(1e4).toHex()
    const extrinsic = isVault
      ? api.tx.phalaVault.setPayoutPref(basePool.id, commission)
      : api.tx.phalaStakePoolv2.setPayoutPref(basePool.id, commission)
    setCommissionLoading(true)
    signAndSend(extrinsic).finally(() => {
      setCommissionLoading(false)
    })
  }

  const setCapacity = () => {
    if (!api) return
    const capacity = new Decimal(capacityString).times(1e12).toHex()
    const extrinsic = api.tx.phalaStakePoolv2.setCap(basePool.id, capacity)
    setCapacityLoading(true)
    signAndSend(extrinsic).finally(() => {
      setCapacityLoading(false)
    })
  }

  const saveIntro = () => {
    if (!api) return
    setSaveIntroLoading(true)
    const description: PoolIntro = {
      telegram: telegramString,
      discord: discordString,
      wechat: wechatString,
      twitter: twitterString,
      email: emailString,
      forum: forumString,
      ann: annString,
      version: 1,
    }
    const hex = stringToHex(JSON.stringify(description))
    return signAndSend(
      api.tx.phalaBasePool.setPoolDescription(basePool.id, hex)
    ).finally(() => {
      setSaveIntroLoading(false)
    })
  }

  useEffect(() => {
    if (!poolIntro || introLoaded) return
    setTelegramString(poolIntro.telegram || '')
    setDiscordString(poolIntro.discord || '')
    setWechatString(poolIntro.wechat || '')
    setTwitterString(poolIntro.twitter || '')
    setEmailString(poolIntro.email || '')
    setForumString(poolIntro.forum || '')
    setAnnString(poolIntro.ann || '')
    setIntroLoaded(true)
  }, [poolIntro, introLoaded])

  return (
    <>
      <DialogTitle>{`${kind} #${id} Settings`}</DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Commission"
              placeholder="0.00"
              disabled={commissionLoading}
              value={commissionString}
              InputProps={{
                endAdornment: '%',
                sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
              }}
              inputProps={{
                inputMode: 'decimal',
                pattern: getDecimalPattern(4),
              }}
              fullWidth
              color={color}
              size="small"
              onChange={(e) => {
                if (!e.target.validity.patternMismatch) {
                  setCommissionString(e.target.value)
                }
              }}
            />
            <LoadingButton
              onClick={setCommission}
              disabled={!commissionValid}
              loading={commissionLoading}
              color={color}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Stack>

          {!isVault && (
            <Stack direction="row" spacing={2}>
              <TextField
                label="Capacity"
                placeholder="0.00"
                disabled={capacityLoading}
                value={capacityString}
                InputProps={{
                  endAdornment: 'PHA',
                  sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
                }}
                inputProps={{
                  inputMode: 'decimal',
                  pattern: getDecimalPattern(4),
                }}
                fullWidth
                color={color}
                size="small"
                onChange={(e) => {
                  if (!e.target.validity.patternMismatch) {
                    setCapacityString(e.target.value)
                  }
                }}
              />
              <LoadingButton
                onClick={setCapacity}
                disabled={!capacityString}
                loading={capacityLoading}
                color={color}
                variant="contained"
              >
                Save
              </LoadingButton>
            </Stack>
          )}
        </Stack>

        <Typography variant="h6" mt={3}>
          Intro
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={2} mt={0.5}>
          <Grid xs={6}>
            <TextField
              disabled={!introLoaded || saveIntroLoading}
              fullWidth
              label="Telegram"
              placeholder="@"
              value={telegramString}
              inputProps={{maxLength: 30}}
              color={color}
              size="small"
              onChange={(e) => {
                setTelegramString(e.target.value)
              }}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              disabled={!introLoaded || saveIntroLoading}
              fullWidth
              label="Discord"
              value={discordString}
              inputProps={{maxLength: 30}}
              color={color}
              size="small"
              onChange={(e) => {
                setDiscordString(e.target.value)
              }}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              disabled={!introLoaded || saveIntroLoading}
              fullWidth
              label="Wechat"
              value={wechatString}
              inputProps={{maxLength: 30}}
              color={color}
              size="small"
              onChange={(e) => {
                setWechatString(e.target.value)
              }}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              disabled={!introLoaded || saveIntroLoading}
              fullWidth
              placeholder="@"
              label="Twitter"
              value={twitterString}
              inputProps={{maxLength: 30}}
              color={color}
              size="small"
              onChange={(e) => {
                setTwitterString(e.target.value)
              }}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              disabled={!introLoaded || saveIntroLoading}
              fullWidth
              label="Email"
              value={emailString}
              inputProps={{maxLength: 30}}
              color={color}
              size="small"
              onChange={(e) => {
                setEmailString(e.target.value)
              }}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              disabled={!introLoaded || saveIntroLoading}
              fullWidth
              label="Phala Forum"
              value={forumString}
              inputProps={{maxLength: 30}}
              color={color}
              size="small"
              onChange={(e) => {
                setForumString(e.target.value)
              }}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              disabled={!introLoaded || saveIntroLoading}
              fullWidth
              multiline
              rows={4}
              label="Announcement"
              value={annString}
              inputProps={{maxLength: 240}}
              color={color}
              size="small"
              onChange={(e) => {
                setAnnString(e.target.value)
              }}
              helperText={`${annString.length}/240`}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            disabled={!introLoaded}
            onClick={saveIntro}
            loading={saveIntroLoading}
            color={color}
            variant="contained"
          >
            Save Intro
          </LoadingButton>
        </Stack>
      </DialogContent>
    </>
  )
}

export default OwnerSettings
