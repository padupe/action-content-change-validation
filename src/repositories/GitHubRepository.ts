import { Octokit } from '@octokit/core'
import { IGitHubRepository } from './IGitHubRepository'
import { setFailed } from '@actions/core'
import { authType } from 'index'
import { gitHubToken } from '@auth/auth'

const gitHubAuth = gitHubToken(authType)

export class GitHubRepository implements IGitHubRepository {
  private readonly repository: Octokit

  constructor() {
    this.repository = gitHubAuth
  }

  async createCommentAtPR(
    message: string,
    pullRequestNumber: number,
    repoName: string,
    repoOwner: string,
  ): Promise<object> {
    const messagePr = await this.repository.request(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
      {
        owner: repoOwner,
        repo: repoName,
        issue_number: pullRequestNumber,
        body: message,
      },
    )

    if (messagePr.status !== 201) {
      setFailed(`Error creating comment on pull request ${pullRequestNumber}.`)
    }

    return messagePr.data
  }

  async getBranchBase(
    pullRequestNumber: number,
    repoName: string,
    repoOwner: string,
  ): Promise<string> {
    const baseBranch = await this.repository.request(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}',
      {
        owner: repoOwner,
        repo: repoName,
        pull_number: pullRequestNumber,
      },
    )

    return baseBranch.data.head.ref
  }

  async getLastCommitBranchBase(
    branchRef: string,
    directoryOrFile: string,
    repoName: string,
    repoOwner: string,
  ): Promise<Date> {
    const commits = await this.repository.request(
      'GET /repos/{owner}/{repo}/commits?path={directoryOrFile}&sha={branchRef}',
      {
        branchRef: branchRef,
        directoryOrFile: directoryOrFile,
        owner: repoOwner,
        repo: repoName,
      },
    )

    const lastCommit = commits?.data[0]

    if (!lastCommit) {
      setFailed('Failure at "getLastCommitBranchDefault".')
    }

    return lastCommit.commit.author.date
  }

  async getLastModifiedDate(
    directoryOrFile: string,
    repoName: string,
    repoOwner: string,
  ): Promise<Date> {
    const date = await this.repository.request(
      'GET /repos/{owner}/{repo}/commits?path={directoryOrFile}',
      {
        owner: repoOwner,
        repo: repoName,
        directoryOrFile: directoryOrFile,
      },
    )

    const modified = date?.data[0]

    if (!modified) {
      setFailed('Failure at "getLastModifiedDate".')
    }

    return modified.commit.author.date
  }

  async getUserLastModified(
    directoryOrFile: string,
    repoName: string,
    repoOwner: string,
  ): Promise<string> {
    const user = await this.repository.request(
      'GET /repos/{owner}/{repo}/commits?path={directoryOrFile}',
      {
        owner: repoOwner,
        repo: repoName,
        directoryOrFile: directoryOrFile,
      },
    )

    const modified = user?.data[0]

    if (!modified) {
      setFailed('Failure at "getUserLastModified".')
    }

    return modified.author.link
  }

  async getRoleForUser(repoOwner: string, username: string): Promise<string> {
    const user = await this.repository.request(
      'GET /orgs/{org}/memberships/{username}',
      {
        org: repoOwner,
        username,
      },
    )

    if (!user) {
      setFailed('Failure at "getRoleForUser"')
    }

    return user.data.role
  }
}
