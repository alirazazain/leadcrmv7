import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { mockRoles } from '../data/mockRoles';

export function EditRolePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [role, setRole] = useState(mockRoles.find(r => r.id === id));
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    capabilities: role?.capabilities || [],
    color: role?.color || 'gray'
  });
  const [newCapability, setNewCapability] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (id !== 'new') {
      const foundRole = mockRoles.find(r => r.id === id);
      if (foundRole) {
        setRole(foundRole);
        setFormData({
          name: foundRole.name,
          description: foundRole.description,
          capabilities: foundRole.capabilities,
          color: foundRole.color
        });
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.capabilities.length === 0) {
      newErrors.capabilities = 'At least one capability is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (id === 'new') {
      mockRoles.push({
        id: crypto.randomUUID(),
        ...formData
      });
    } else if (role) {
      const index = mockRoles.findIndex(r => r.id === role.id);
      if (index !== -1) {
        mockRoles[index] = {
          ...mockRoles[index],
          ...formData
        };
      }
    }

    navigate('/users/roles');
  };

  const handleAddCapability = () => {
    if (newCapability.trim()) {
      setFormData(prev => ({
        ...prev,
        capabilities: [...prev.capabilities, newCapability.trim()]
      }));
      setNewCapability('');
      setErrors(prev => ({ ...prev, capabilities: '' }));
    }
  };

  const handleRemoveCapability = (index: number) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/users/roles"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Roles
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">
          {id === 'new' ? 'Create Role' : 'Edit Role'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Role Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`mt-1 block w-full rounded-lg shadow-sm ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              } focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`mt-1 block w-full rounded-lg shadow-sm ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              } focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              Color Theme
            </label>
            <select
              id="color"
              value={formData.color}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              className="mt-1 block w-full rounded-lg shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="purple">Purple</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="gray">Gray</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capabilities<span className="text-red-500">*</span>
            </label>
            <div className="mt-1 space-y-2">
              {formData.capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{capability}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCapability(index)}
                    className="p-1 text-gray-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCapability}
                  onChange={(e) => setNewCapability(e.target.value)}
                  placeholder="Add new capability"
                  className="flex-1 rounded-lg shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddCapability}
                  disabled={!newCapability.trim()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
              {errors.capabilities && (
                <p className="text-sm text-red-600">{errors.capabilities}</p>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/users/roles')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {id === 'new' ? 'Create Role' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}