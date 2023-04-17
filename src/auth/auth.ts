import { getInput } from '@actions/core'
import { createOctokitClient } from './octokit'

export const auth = createOctokitClient(getInput('gitHubToken'))
