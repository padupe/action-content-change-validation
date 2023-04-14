import { gitHubService } from './gitHubService'

export async function contentChangeValidation(
  directoryOrFile: string,
  pullRequestNumber: number,
  repoName: string,
  repoOwner: string,
): Promise<any> {
  await gitHubService(directoryOrFile, pullRequestNumber, repoName, repoOwner)
}
