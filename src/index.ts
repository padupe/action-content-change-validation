import { getInput, info, setFailed } from '@actions/core'
import * as gitHub from '@actions/github'
import { contentChangeValidation } from './service/contentChangeValidation'

const gitHubToken = getInput('gitHubToken')

async function run(): Promise<void> {
  try {
    info('Start Proccess')
    if (gitHubToken) {
      const pullRequestNumber = Number(gitHub.context.ref.split('/')[2])
      const repoOwner = gitHub.context.payload.repository?.owner.login
      const repoName = gitHub.context.payload.repository?.name
      const dirOrFile = getInput('directoryOrFile')

      info(
        `pullRequestNumber: ${pullRequestNumber},\nrepoOwner: ${repoOwner},\nrepoName: ${repoName}, \ndirOrFile: ${dirOrFile}`,
      )

      await contentChangeValidation(
        dirOrFile,
        pullRequestNumber,
        repoName as string,
        repoOwner as string,
      )
    } else {
      setFailed('"gitHubToken" is required!')
    }
  } catch (error) {
    setFailed(`Error at action: ${error}.`)
  }
}

void run()
