import { Octokit } from '@octokit/core'
import { getInput } from '@actions/core'

export const gitHubPAT = new Octokit({
  auth: getInput('gitHubPersonalAccessToken'),
})
