export default function ChangeTracker() {
  // Mock changes - pull from Supabase audit log
  const changes = [
    { field: 'price', old: '$500,000', new: '$480,000', by: 'Seller', when: '2 min ago' },
    { field: 'optionPeriod', old: '10', new: '7', by: 'Seller', when: '3 min ago' }
  ]

  return (
    <div>
      <h4 className="font-semibold mb-2">Recent Changes</h4>
      {changes.map((change, i) => (
        <div key={i} className="text-sm p-2 bg-yellow-50 rounded mb-1">
          {change.by} changed {change.field}: {change.old} → {change.new} ({change.when})
        </div>
      ))}
    </div>
  )
}
