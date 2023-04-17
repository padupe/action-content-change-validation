export function compareDate(baseDate: Date, pullRequestDate: Date): boolean {
  const base = baseDate
  const pullRequest = pullRequestDate

  let result = false

  if (base == pullRequest) {
    result = true
  }

  return result
}
