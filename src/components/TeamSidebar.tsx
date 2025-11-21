export default function TeamSidebar() {
  // Mock teams - replace with Supabase query
  const buyTeam = [{ role: 'Buyer Agent', name: 'Jane Doe', permissions: ['view', 'edit', 'esign'] }]
  const sellTeam = [{ role: 'Listing Agent', name: 'John Smith', permissions: ['view', 'comment', 'esign'] }]

  return (
    <div className="w-64 bg-gray-100 border-r p-4">
      <h3 className="font-semibold mb-2">Buy-Side Team</h3>
      {buyTeam.map((member, i) => (
        <div key={i} className="mb-2 p-2 bg-white rounded">
          <p>{member.name} - {member.role}</p>
          <p className="text-sm text-gray-500">Permissions: {member.permissions.join(', ')}</p>
        </div>
      ))}
      <h3 className="font-semibold mt-4 mb-2">Sell-Side Team</h3>
      {sellTeam.map((member, i) => (
        <div key={i} className="mb-2 p-2 bg-white rounded">
          <p>{member.name} - {member.role}</p>
          <p className="text-sm text-gray-500">Permissions: {member.permissions.join(', ')}</p>
        </div>
      ))}
    </div>
  )
}
