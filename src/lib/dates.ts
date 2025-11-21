// Smart Texas business day calculator (excludes weekends + federal holidays)
const holidays = ['2025-01-01', '2025-07-04', '2025-11-27', '2025-12-25'] // Mock 2025 holidays

export function smartDateShift(start: Date, days: number): Date {
  let target = new Date(start)
  target.setDate(start.getDate() + days)

  while (days > 0) {
    target.setDate(target.getDate() + 1)
    const day = target.getDay()
    const dateStr = target.toISOString().split('T')[0]
    if (day !== 0 && day !== 6 && !holidays.includes(dateStr)) {
      days--
    }
  }
  return target
}
