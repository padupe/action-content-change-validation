import { getInput, info, setOutput } from '@actions/core'
import { GitHubAppRepository } from '@repositories/GitHubAppRepository'
import { GitHubPATRepository } from '@repositories/GitHubPATRepository'
import { compareDate } from 'utils'

const gitHubAppRepository = new GitHubAppRepository()
const gitHubPATRepository = new GitHubPATRepository()

const authType = getInput('authStrategy')

export async function contentChangeValidation(
  directoryOrFile: string,
  pullRequestNumber: number,
  repoName: string,
  repoOwner: string,
): Promise<any> {
  if (authType === 'app') {
    const lastModifiedDefaultBranch =
      await gitHubAppRepository.getLastModifiedDate(
        directoryOrFile,
        repoName,
        repoOwner,
      )

    const branchBasePR = await gitHubAppRepository.getBranchBase(
      pullRequestNumber,
      repoName,
      repoOwner,
    )

    const lastUpdateBranchBasePR =
      await gitHubAppRepository.getLastCommitBranchBase(
        branchBasePR,
        directoryOrFile,
        repoName,
        repoOwner,
      )

    const validateModified = compareDate(
      lastModifiedDefaultBranch,
      lastUpdateBranchBasePR,
    )

    if (validateModified == false) {
      await gitHubAppRepository.createCommentAtPR(
        `Changes were made to "${directoryOrFile}". These modifications are not allowed according to the organization/repository administrators.`,
        pullRequestNumber,
        repoName,
        repoOwner,
      )
      return false
    }

    info(
      `This implementation did not make changes to ${directoryOrFile}, as per the standards defined by the organization/administrators of the repository.`,
    )
    setOutput('Validation Status', 'Approved')
    return true
  } else if (authType == 'pat') {
    const lastModifiedDefaultBranch =
      await gitHubPATRepository.getLastModifiedDate(
        directoryOrFile,
        repoName,
        repoOwner,
      )

    const branchBasePR = await gitHubPATRepository.getBranchBase(
      pullRequestNumber,
      repoName,
      repoOwner,
    )

    const lastUpdateBranchBasePR =
      await gitHubPATRepository.getLastCommitBranchBase(
        branchBasePR,
        directoryOrFile,
        repoName,
        repoOwner,
      )

    const validateModified = compareDate(
      lastModifiedDefaultBranch,
      lastUpdateBranchBasePR,
    )

    if (validateModified == false) {
      await gitHubPATRepository.createCommentAtPR(
        `Changes were made to "${directoryOrFile}". These modifications are not allowed according to the organization/repository administrators.`,
        pullRequestNumber,
        repoName,
        repoOwner,
      )
      return false
    }

    info(
      `This implementation did not make changes to ${directoryOrFile}, as per the standards defined by the organization/administrators of the repository.`,
    )
    setOutput('Validation Status', 'Approved')
    return true
  }
}
