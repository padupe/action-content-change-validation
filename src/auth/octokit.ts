import { Octokit } from '@octokit/core'
import { gitHubToken } from '../index'

export const gitHubAuthToken = new Octokit({
  auth: gitHubToken,
})
