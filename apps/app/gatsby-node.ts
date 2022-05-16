import {CreatePagesArgs} from 'gatsby'

export const createPages = ({actions}: CreatePagesArgs) => {
  const {createRedirect} = actions
  createRedirect({
    fromPath: '/bridge',
    toPath: 'https://subbridge.io',
    isPermanent: true,
  })
}
