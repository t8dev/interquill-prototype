import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './routes/Login.tsx'
import Transaction from './routes/Transaction.tsx'
import NewTransaction from './routes/NewTransaction.tsx'

function App() {
  // Mock auth - replace with real Supabase auth
  const user = { email: localStorage.getItem('userEmail') || null }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Interquill</h1>
        </div>
      </header>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/transactions" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={user ? <NewTransaction /> : <Navigate to="/login" />} />
        <Route path="/transaction/:id" element={user ? <Transaction /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
