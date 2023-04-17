import { gitHubToken } from 'index'
import { createOctokitClient } from './octokit'

export const auth = createOctokitClient(gitHubToken)
