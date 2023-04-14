import { getInput } from '@actions/core'
import { gitHubAppService } from './gitHubAppService'
import { gitHubPATService } from './gitHubPATService'

const authType = getInput('authStrategy')

export async function contentChangeValidation(
  directoryOrFile: string,
  pullRequestNumber: number,
  repoName: string,
  repoOwner: string,
): Promise<any> {
  if (authType === 'app') {
    await gitHubAppService(
      directoryOrFile,
      pullRequestNumber,
      repoName,
      repoOwner,
    )
  } else if (authType == 'pat') {
    await gitHubPATService(
      directoryOrFile,
      pullRequestNumber,
      repoName,
      repoOwner,
    )
  }
}
