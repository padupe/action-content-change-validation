import { getInput } from '@actions/core'
import fetch from 'node-fetch'
import { signJWT } from './jsonwebtoken'

interface TokenForGitHubApp {
  token: string
  expires_at: string
}

export let gitHubAppToken: string

export async function generateTokenForGitHubApp(): Promise<string> {
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 2 * 60,
    iss: Number(getInput('appId', { required: false })),
  }

  const privateKey = getInput('privateKey', { required: false }).replace(
    /\\n/g,
    '\n',
  )

  const installationId = Number(getInput('installationId', { required: false }))

  const jwt = signJWT(payload, privateKey, { algorithm: 'RS256' })

  const response = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/vnd.github.v3+json',
      },
    },
  )

  const data = (await response.json()) as TokenForGitHubApp

  gitHubAppToken = data.token

  return data.token
}
