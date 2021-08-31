import {generate} from '@graphql-codegen/cli'
import execa from 'execa'
import {series} from 'gulp'
import {resolve} from 'path'

export const codegen = async (): Promise<void> => {
  await generate({
    generates: {
      './src/ethereum/interfaces/index.ts': {
        documents: resolve(__dirname, 'src/ethereum', 'documents.graphql'),
        schema: resolve(__dirname, 'src/ethereum', 'schema.graphql'),
        config: {
          scalars: {
            BigInt: 'string',
            Bytes: 'string',
          },
          strictScalars: true,
        },
        plugins: [
          'typescript',
          'typescript-operations',
          'typescript-graphql-request',
        ],
      },
      './src/substrate/interfaces/index.ts': {
        documents: resolve(__dirname, 'src/substrate', 'documents.graphql'),
        schema: resolve(__dirname, 'src/substrate', 'schema.graphql'),
        config: {
          scalars: {
            BigFloat: 'string',
          },
          strictScalars: true,
        },
        plugins: [
          'typescript',
          'typescript-operations',
          'typescript-graphql-request',
        ],
      },
    },
  })
}

export const typescript = async (): Promise<void> => {
  await execa('npx', ['tsc', '--build'], {cwd: __dirname, stdio: 'inherit'})
}

export const prepublish = series(codegen, typescript)
