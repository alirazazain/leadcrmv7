import { useState } from 'react';
import { mockTeams } from '../../data/mockTeams';

interface CreateTeamFormProps {
  onTeamCreated?: () => void;
}

export function CreateTeamForm({ onTeamCreated }: CreateTeamFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Team name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTeam = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      members: []
    };

    mockTeams.unshift(newTeam); // Add to beginning of array
    setFormData({ name: '', description: '' }); // Reset form
    setErrors({});
    onTeamCreated?.(); // Notify parent component
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Team Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, name: e.target.value }));
            if (errors.name) {
              setErrors(prev => ({ ...prev, name: '' }));
            }
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
          } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Brief description of the team's purpose..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Team
      </button>
    </form>
  );
}