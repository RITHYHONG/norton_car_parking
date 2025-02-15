class RateLimit {
  private attempts: Map<string, { count: number; timestamp: number }> = new Map()
  private readonly maxAttempts: number
  private readonly timeWindow: number

  constructor(maxAttempts = 3, timeWindow = 5 * 60 * 1000) { // 5 minutes default
    this.maxAttempts = maxAttempts
    this.timeWindow = timeWindow
  }

  check(key: string): { allowed: boolean; remainingTime?: number } {
    const now = Date.now()
    const record = this.attempts.get(key)

    if (!record) {
      this.attempts.set(key, { count: 1, timestamp: now })
      return { allowed: true }
    }

    if (now - record.timestamp > this.timeWindow) {
      this.attempts.set(key, { count: 1, timestamp: now })
      return { allowed: true }
    }

    if (record.count >= this.maxAttempts) {
      const remainingTime = this.timeWindow - (now - record.timestamp)
      return { allowed: false, remainingTime }
    }

    record.count++
    return { allowed: true }
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

export const loginRateLimit = new RateLimit()
