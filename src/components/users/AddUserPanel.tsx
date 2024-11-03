import { useState, useEffect } from 'react';
import { X, Shield, AtSign, KeyRound } from 'lucide-react';
import { mockRoles } from '../../data/mockRoles';
import { mockUsers } from '../../data/mockUsers';
import { User } from '../../types';

interface AddUserPanelProps {
  isOpen: boolean;
  onClose: () => void;
  editingUser?: User | null;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  password: string;
  confirmPassword: string;
  description: string;
}

export function AddUserPanel({ isOpen, onClose, editingUser }: AddUserPanelProps) {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    role: '',
    username: '',
    password: '',
    confirmPassword: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingUser) {
      const [firstName, lastName] = editingUser.name.split(' ');
      setFormData({
        firstName,
        lastName,
        role: editingUser.role,
        username: editingUser.email.split('@')[0],
        password: '',
        confirmPassword: '',
        description: editingUser.description || ''
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        role: '',
        username: '',
        password: '',
        confirmPassword: '',
        description: ''
      });
    }
  }, [editingUser]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!editingUser) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const userData = {
      id: editingUser?.id || crypto.randomUUID(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: `${formData.username}@example.com`,
      role: formData.role,
      description: formData.description
    };

    if (editingUser) {
      // Update existing user
      const index = mockUsers.findIndex(u => u.id === editingUser.id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...userData };
      }
    } else {
      // Add new user
      mockUsers.push(userData as User);
    }

    onClose();
  };

  const getColorForRole = (roleName: string) => {
    const role = mockRoles.find(r => r.name.toLowerCase() === roleName.toLowerCase());
    switch (role?.color) {
      case 'purple': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'blue': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'green': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl animate-slide-left">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {editingUser ? 'Update user details' : 'Create a new user account'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, firstName: e.target.value }));
                        if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }));
                      }}
                      className={`mt-1 block w-full px-4 py-2.5 border ${
                        errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200`}
                    />
                    {errors.firstName && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, lastName: e.target.value }));
                        if (errors.lastName) setErrors(prev => ({ ...prev, lastName: '' }));
                      }}
                      className={`mt-1 block w-full px-4 py-2.5 border ${
                        errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200`}
                    />
                    {errors.lastName && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Role & Permissions
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {mockRoles.map(role => (
                    <label
                      key={role.id}
                      className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.role === role.name.toLowerCase()
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.name.toLowerCase()}
                        checked={formData.role === role.name.toLowerCase()}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, role: e.target.value }));
                          if (errors.role) setErrors(prev => ({ ...prev, role: '' }));
                        }}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorForRole(role.name)}`}>
                              {role.name}
                            </span>
                          </div>
                          <div className={`h-4 w-4 rounded-full border-2 ${
                            formData.role === role.name.toLowerCase()
                              ? 'border-indigo-500 bg-indigo-500'
                              : 'border-gray-300'
                          }`}>
                            {formData.role === role.name.toLowerCase() && (
                              <div className="h-full w-full rounded-full bg-white scale-[0.4]" />
                            )}
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{role.description}</p>
                      </div>
                    </label>
                  ))}
                  {errors.role && (
                    <p className="text-sm text-red-600">{errors.role}</p>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Account Information
                </h3>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, username: e.target.value }));
                        if (errors.username) setErrors(prev => ({ ...prev, username: '' }));
                      }}
                      className={`block w-full pl-10 pr-12 py-2.5 border ${
                        errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">@example.com</span>
                    </div>
                  </div>
                  {errors.username && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.username}</p>
                  )}
                </div>

                {!editingUser && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password<span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyRound className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          value={formData.password}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, password: e.target.value }));
                            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                          }}
                          className={`block w-full pl-10 pr-3 py-2.5 border ${
                            errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200`}
                          placeholder="Minimum 8 characters"
                        />
                      </div>
                      {errors.password && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password<span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyRound className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
                            if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                          }}
                          className={`block w-full pl-10 pr-3 py-2.5 border ${
                            errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200`}
                          placeholder="Re-enter password"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Brief description about the user..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                {editingUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}