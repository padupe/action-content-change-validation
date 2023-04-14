import { info, setFailed, setOutput } from '@actions/core'
import { GitHubPATRepository } from '@repositories/index'
import { compareDate } from '@utils/compareDate'

const gitHubPATRepository = new GitHubPATRepository()

export async function gitHubPATService(
  directoryOrFile: string,
  pullRequestNumber: number,
  repoName: string,
  repoOwner: string,
): Promise<any> {
  const lastChangeDefaultBranch = await gitHubPATRepository.getLastModifiedDate(
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
    lastChangeDefaultBranch,
    lastUpdateBranchBasePR,
  )

  if (validateModified == false) {
    const username = await gitHubPATRepository.getUserLastModified(
      directoryOrFile,
      repoName,
      repoOwner,
    )

    const userRole = await gitHubPATRepository.getRoleForUser(
      repoOwner,
      username,
    )

    if (userRole === 'admin') {
      await gitHubPATRepository.createCommentAtPR(
        `Changes were made to "${directoryOrFile}". These modifications are not allowed according to the organization/repository administrators.
        Even though it is a change proposed by an Administrator, it is recommended that it be validated by another user.`,
        pullRequestNumber,
        repoName,
        repoOwner,
      )

      info(
        `Changes were made to "${directoryOrFile}", however, the responsible user is an Administrator. Review by another organization/repository administrator is recommended.`,
      )

      return setOutput('result', 'pending')
    }

    await gitHubPATRepository.createCommentAtPR(
      `Changes were made to "${directoryOrFile}". These modifications are not allowed according to the organization/repository administrators.`,
      pullRequestNumber,
      repoName,
      repoOwner,
    )

    setFailed(
      `Changes were made to "${directoryOrFile}". These modifications are not allowed according to the organization/repository administrators.`,
    )

    return setOutput('result', 'failure')
  }

  return setOutput('result', 'success')
}
