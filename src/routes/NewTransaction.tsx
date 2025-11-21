import { Link } from 'react-router-dom'

export default function NewTransaction() {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <Link to="/transaction/demo-trec" className="bg-blue-600 text-white px-4 py-2 rounded">
        Open Demo TREC Contract
      </Link>
    </div>
  )
}
