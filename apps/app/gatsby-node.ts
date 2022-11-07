import {CreatePagesArgs, CreateWebpackConfigArgs} from 'gatsby'

export const createPages = ({actions}: CreatePagesArgs) => {
  const {createRedirect} = actions
  createRedirect({
    fromPath: '/bridge',
    toPath: 'https://subbridge.io',
    isPermanent: true,
  })
}

export const onCreateWebpackConfig = ({
  stage,
  actions,
  getConfig,
}: CreateWebpackConfigArgs) => {
  if (stage === 'build-html') {
    if (stage === 'build-html') {
      actions.setWebpackConfig({
        externals: [
          ...getConfig().externals,
          {
            'node:zlib': 'commonjs zlib',
            'node:fs': 'commonjs fs',
            'node:crypto': 'commonjs crypto',
            'node:stream': 'commonjs stream',
            'node:buffer': 'commonjs buffer',
            'node:util': 'commonjs util',
            'node:http': 'commonjs http',
            'node:https': 'commonjs https',
            'node:net': 'commonjs net',
            'node:path': 'commonjs path',
            'node:url': 'commonjs url',
            'node:stream/web': 'commonjs stream/web',
            'node:process': 'commonjs process',
          },
        ],
      })
    }
  }
}
