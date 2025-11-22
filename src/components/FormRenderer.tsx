import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

type Field = { value: string | number; label: string }

type FormData = {
  price: Field
  closingDate: Field
  optionPeriod: Field
}

const initial: FormData = {
  price: { value: 500000, label: 'Sales Price' },
  closingDate: { value: '2025-12-21', label: 'Closing Date' },
  optionPeriod: { value: 10, label: 'Option Period (days)' }
}

export default function FormRenderer() {
  const [formData, setFormData] = useState<FormData>(initial)

  useEffect(() => {
    const channel = supabase
      .channel('form-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'forms' },
        (payload) => setFormData(payload.new as FormData)
      )
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const updateField = (key: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [key]: { ...prev[key], value } }))
  }

  return (
    <form className="space-y-8 max-w-2xl">
      {(Object.keys(formData) as (keyof FormData)[]).map(key => (
        <div
          key={key}
          className={`p-6 border-4 rounded-xl transition-all ${
            key === 'price' ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        >
          <label className="block text-lg font-semibold mb-3">
            {formData[key].label}
          </label>

          {key === 'closingDate' ? (
            <input
              type="date"
              value={formData[key].value as string}
              onChange={e => updateField(key, e.target.value)}
              className="w-full p-4 text-xl border rounded-lg"
            />
          ) : (
            <input
              type={key === 'optionPeriod' ? 'number' : 'text'}
              value={formData[key].value}
              onChange={e => updateField(key, e.target.value)}
              className="w-full p-4 text-xl border rounded-lg"
            />
          )}
        </div>
      ))}

      <button
        type="button"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-2xl py-6 rounded-xl"
      >
        Send Counter
      </button>
    </form>
  )
}
