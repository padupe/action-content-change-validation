import { Octokit } from '@octokit/core'
import { gitHubAppToken } from '@utils/generateTokenforGitHubApp'
import { createOctokitClient } from './octokit'
import { getInput } from '@actions/core'

const gitHubPat = getInput('gitHubPersonalAccessToken', { required: false })

export function gitHubToken(authStrategy: string): Octokit {
  if (authStrategy == 'app') {
    return createOctokitClient(gitHubAppToken)
  }

  return createOctokitClient(gitHubPat)
}
