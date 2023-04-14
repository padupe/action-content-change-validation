export interface IGitHubRepository {
  createCommentAtPR: (
    message: string,
    pullRequestNumber: number,
    repoName: string,
    repoOwner: string,
  ) => Promise<object>
  getBranchBase: (
    ullRequestNumber: number,
    repoName: string,
    repoOwner: string,
  ) => Promise<string>
  getLastCommitBranchBase: (
    branchRef: string,
    directoryOrFile: string,
    repoName: string,
    repoOwner: string,
  ) => Promise<Date>
  getLastModifiedDate: (
    directoryOrFile: string,
    repoName: string,
    repoOwner: string,
  ) => Promise<Date>
  getUserLastModified: (
    directoryOrFile: string,
    repoName: string,
    repoOwner: string,
  ) => Promise<string>
  getRoleForUser: (repoOwner: string, username: string) => Promise<string>
}
