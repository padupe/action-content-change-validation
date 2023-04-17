import { Octokit } from '@octokit/core'

export function createOctokitClient(token: string): Octokit {
  const octokit = new Octokit({
    auth: token,
  })

  return octokit
}
