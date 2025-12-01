import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface FormField {
  value: number | string;
  label: string;
}

interface TrecForm {
  price: FormField;
  closingDate: FormField;
  optionPeriod: FormField;
}

const initialForm: TrecForm = {
  price: { value: 500000, label: 'Sales Price' },
  closingDate: { value: '2025-12-21', label: 'Closing Date' },
  optionPeriod: { value: 10, label: 'Option Period (days)' }
};

export default function FormRenderer() {
  const [formData, setFormData] = useState<TrecForm>(initialForm);

  useEffect(() => {
    // Wrap async subscribe in sync function
    const setupSubscription = async () => {
      const channel = supabase.channel('form-changes')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'forms' }, (payload) => {
          setFormData(payload.new as TrecForm);
        })
        .subscribe();  // This returns Promise<"ok" | "timed out" | "error">

      // Wait for subscription to resolve (optional, for error handling)
      await channel;
    };

    setupSubscription();

    // Return sync cleanup
    return () => {
      supabase.removeChannel(supabase.channel('form-changes'));
    };
  }, []);

  const updateField = (key: keyof TrecForm, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [key]: { ...prev[key], value }
    }));

    // Mock Supabase update for prototype (replace with real later)
    console.log('Updating field:', key, value);
  };

  return (
    <form className="space-y-4">
      {Object.entries(formData).map(([key, field]) => {
        const typedKey = key as keyof TrecForm;
        return (
          <div key={key} className={`p-3 border rounded ${key === 'price' ? 'border-red-300 bg-red-50' : ''}`}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            {key === 'price' ? (
              <input
                type="number"
                value={field.value}
                onChange={(e) => updateField(typedKey, parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded"
              />
            ) : key === 'closingDate' ? (
              <input
                type="date"
                value={field.value as string}
                onChange={(e) => updateField(typedKey, e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <input
                type="number"
                value={field.value}
                onChange={(e) => updateField(typedKey, parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        );
      })}
      <button type="button" className="bg-green-600 text-white px-4 py-2 rounded">Send Counter</button>
    </form>
  );
}
