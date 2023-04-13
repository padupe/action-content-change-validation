import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/core'
import { getInput } from '@actions/core'

export const gitHubApp = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    installationId: Number(getInput('installationId', { required: false })),
    appId: Number(getInput('appId', { required: false })),
    privateKey: getInput('privateKey', { required: false }).replace(
      /\\n/g,
      '\n',
    ),
  },
})
