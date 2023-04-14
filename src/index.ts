import { getInput, info, setFailed } from '@actions/core'
import * as gitHub from '@actions/github'
import { contentChangeValidation } from '@service/contentChangeValidation'

export const authType = getInput('authType')
info(`authType: ${authType}`)

async function run(): Promise<void> {
  try {
    info('Start Proccess')
    if (authType) {
      const pullRequestNumber = Number(gitHub.context.ref.split('/')[2])
      const repoOwner = gitHub.context.payload.repository?.owner.login
      const repoName = gitHub.context.payload.repository?.name
      const dirOrFile = getInput('directoryOrFile')

      await contentChangeValidation(
        dirOrFile,
        pullRequestNumber,
        repoName as string,
        repoOwner as string,
      )
    } else {
      setFailed(
        'Authentication type not specified. This parameter is mandatory.',
      )
    }
  } catch (error) {
    setFailed(`Error at action: ${error}.`)
  }
}

void run()
