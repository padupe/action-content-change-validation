export function compareDate(baseDate: Date, pullRequestDate: Date): boolean {
  const base = new Date(baseDate)
  const pullRequest = new Date(pullRequestDate)

  let result = false

  if (base == pullRequest) {
    result = true
  }

  return result
}
