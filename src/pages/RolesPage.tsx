import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Plus } from 'lucide-react';
import { mockRoles } from '../data/mockRoles';

export function RolesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoles = mockRoles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'blue':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'green':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
        <p className="mt-1 text-sm text-gray-500">Manage user roles and their permissions</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Add New Role Card - Moved to first position */}
        <button
          onClick={() => navigate('/users/roles/new')}
          className="group relative bg-gradient-to-br from-indigo-50 to-white rounded-lg shadow-sm border-2 border-dashed border-indigo-200 hover:border-indigo-500 hover:shadow-md transition-all duration-200 p-6 text-center flex flex-col items-center justify-center min-h-[280px]"
        >
          <div className="transform group-hover:-translate-y-1 transition-transform duration-200">
            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors duration-200">
              <Plus className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Role</h3>
            <p className="text-sm text-gray-500 max-w-[200px] mx-auto">
              Define a new role with custom permissions and capabilities
            </p>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="inline-flex items-center text-sm text-indigo-600 font-medium">
              Get Started
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </button>

        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:border-indigo-500 transition-colors duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(role.color)}`}>
                  <Shield className="h-4 w-4 mr-2" />
                  {role.name}
                </div>
                <button
                  onClick={() => navigate(`/users/roles/${role.id}`)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {role.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capabilities
                </h4>
                <ul className="space-y-2">
                  {role.capabilities.map((capability, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}