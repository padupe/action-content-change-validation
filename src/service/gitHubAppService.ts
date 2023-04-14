import { info, setFailed, setOutput } from '@actions/core'
import { GitHubAppRepository } from '@repositories/GitHubAppRepository'
import { compareDate } from '@utils/compareDate'

const gitHubAppRepository = new GitHubAppRepository()

export async function gitHubAppService(
  directoryOrFile: string,
  pullRequestNumber: number,
  repoName: string,
  repoOwner: string,
): Promise<any> {
  const lastChangeDefaultBranch = await gitHubAppRepository.getLastModifiedDate(
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
    lastChangeDefaultBranch,
    lastUpdateBranchBasePR,
  )

  if (validateModified == false) {
    const username = await gitHubAppRepository.getUserLastModified(
      directoryOrFile,
      repoName,
      repoOwner,
    )

    const userRole = await gitHubAppRepository.getRoleForUser(
      repoOwner,
      username,
    )

    if (userRole === 'admin') {
      await gitHubAppRepository.createCommentAtPR(
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

    await gitHubAppRepository.createCommentAtPR(
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

  info(
    `There were no changes to "${directoryOrFile}", so this implementation complies with organization/repository guidelines.`,
  )

  return setOutput('result', 'success')
}
