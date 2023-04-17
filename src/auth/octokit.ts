import { Octokit } from '@octokit/core'
import { getInput } from '@actions/core'

export const gitHubAuthToken = new Octokit({
  auth: getInput('gitHubToken'),
})
