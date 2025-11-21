import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase' // Import from lib

// Mock TREC form schema - expand with full JSON
const trecForm = {
  price: { value: 500000, label: 'Sales Price' },
  closingDate: { value: '2025-12-21', label: 'Closing Date' },
  optionPeriod: { value: 10, label: 'Option Period (days)' }
}

export default function FormRenderer() {
  const [formData, setFormData] = useState(trecForm)

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase.channel('form-changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'forms' }, (payload) => {
        setFormData(payload.new)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const updateField = (key: string, value: any) => {
    const newData = { ...formData, [key]: { ...formData[key], value } }
    setFormData(newData)
    // Push to Supabase
    supabase.from('forms').update(newData).eq('id', 'demo-trec')
  }

  return (
    <form className="space-y-4">
      {Object.entries(formData).map(([key, field]) => (
        <div key={key} className={`p-3 border rounded ${key === 'price' ? 'border-red-300 bg-red-50' : ''}`}>
          <label className="block text-sm font-medium mb-1">{field.label}</label>
          {key === 'price' ? (
            <input
              type="number"
              value={field.value}
              onChange={(e) => updateField(key, parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          ) : key === 'closingDate' ? (
            <input
              type="date"
              value={field.value}
              onChange={(e) => updateField(key, e.target.value)}
              className="w-full p-2 border rounded"
            />
          ) : (
            <input
              type="number"
              value={field.value}
              onChange={(e) => updateField(key, parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          )}
        </div>
      ))}
      <button type="button" className="bg-green-600 text-white px-4 py-2 rounded">Send Counter</button>
    </form>
  )
}
