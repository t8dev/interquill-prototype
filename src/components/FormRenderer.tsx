import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface FormField {
  value: number | string
  label: string
}

interface TrecForm {
  price: FormField
  closingDate: FormField
  optionPeriod: FormField
}

const initialForm: TrecForm = {
  price: { value: 500000, label: 'Sales Price' },
  closingDate: { value: '2025-12-21', label: 'Closing Date' },
  optionPeriod: { value: 10, label: 'Option Period (days)' }
}

export default function FormRenderer() {
  const [formData, setFormData] = useState<TrecForm>(initialForm)

  useEffect(() => {
    const channel = supabase.channel('form-changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'forms' }, (payload) => {
        setFormData(payload.new as TrecForm)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const updateField = (key: keyof TrecForm, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [key]: { ...prev[key], value }
    }))

    supabase
      .from('forms')
      .update({ [key]: { ...formData[key], value } })
      .eq('id', 'demo-trec')
  }

  return (
    <form className="space-y-6">
      {Object.entries(formData).map(([key, field]) => (
        <div key={key} className={`p-4 border-2 rounded-lg ${key === 'price' ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}>
          <label className="block text-sm font-semibold mb-2">{field.label}</label>
          {key === 'price' && (
            <input
              type="number"
              value={field.value as number}
              onChange={(e) => updateField(key as keyof TrecForm, parseInt(e.target.value) || 0)}
              className="w-full p-3 border rounded text-lg"
            />
          )}
          {key === 'closingDate' && (
            <input
              type="date"
              value={field.value as string}
              onChange={(e) => updateField(key as keyof TrecForm, e.target.value)}
              className="w-full p-3 border rounded text-lg"
            />
          )}
          {key === 'optionPeriod' && (
            <input
              type="number"
              value={field.value as number}
              onChange={(e) => updateField(key as keyof TrecForm, parseInt(e.target.value) || 0)}
              className="w-full p-3 border rounded text-lg"
            />
          )}
        </div>
      ))}
      <button type="button" className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg">
        Send Counter
      </button>
    </form>
  )
}
