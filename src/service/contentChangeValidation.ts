import { info } from '@actions/core'
import { gitHubAppService } from './gitHubAppService'
import { gitHubPATService } from './gitHubPATService'
import { authType } from 'index'

export async function contentChangeValidation(
  directoryOrFile: string,
  pullRequestNumber: number,
  repoName: string,
  repoOwner: string,
): Promise<any> {
  if (authType == 'app') {
    info(`Call GitHub App Service`)
    await gitHubAppService(
      directoryOrFile,
      pullRequestNumber,
      repoName,
      repoOwner,
    )
  } else if (authType == 'pat') {
    info(`Call GitHub PAT Service`)
    await gitHubPATService(
      directoryOrFile,
      pullRequestNumber,
      repoName,
      repoOwner,
    )
  }
}
