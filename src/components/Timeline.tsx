import { smartDateShift } from '../lib/dates'

export default function Timeline() {
  const startDate = new Date('2025-11-21')
  const optionEnd = smartDateShift(startDate, 10) // 10 business days

  return (
    <div className="space-y-2">
      <h4 className="font-semibold">Transaction Timeline</h4>
      <div>Offer Accepted: Today</div>
      <div>Option Period Ends: {optionEnd.toDateString()}</div>
      <div>Closing: Dec 21, 2025</div>
      <button className="text-sm text-blue-600">Export to Calendar</button>
    </div>
  )
}
