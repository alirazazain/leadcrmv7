import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndustrySelect } from './IndustrySelect';

interface CompanyData {
  id: string;
  name: string;
  website: string;
  linkedin: string;
  country: string;
  city: string;
  industry: string;
  companySize: string;
}

interface CreateCompanyFormProps {
  onSubmit: (data: CompanyData) => void;
}

const companySizeOptions = [
  '1-10',
  '10-25',
  '25-50',
  '50-100',
  '100-500',
  '500-1000',
  '1000+'
];

export function CreateCompanyForm({ onSubmit }: CreateCompanyFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CompanyData>({
    id: crypto.randomUUID(),
    name: '',
    website: '',
    linkedin: '',
    country: '',
    city: '',
    industry: '',
    companySize: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CompanyData, string>>>({});

  const handleChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CompanyData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    
    if (formData.website && !formData.website.startsWith('https://')) {
      newErrors.website = 'Website URL must start with https://';
    }
    
    if (formData.linkedin && !formData.linkedin.startsWith('https://')) {
      newErrors.linkedin = 'LinkedIn URL must start with https://';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Company size is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      navigate('/companies');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Company Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
            ${errors.name ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
          required
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <IndustrySelect
          value={formData.industry}
          onChange={(value) => handleChange('industry', value)}
          error={errors.industry}
        />
      </div>

      <div>
        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
          Company Size<span className="text-red-500">*</span>
        </label>
        <select
          id="companySize"
          value={formData.companySize}
          onChange={(e) => handleChange('companySize', e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.companySize ? 'border-red-300 bg-red-50' : 'border-gray-300'
          } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          required
        >
          <option value="">Select company size</option>
          {companySizeOptions.map(size => (
            <option key={size} value={size}>{size} employees</option>
          ))}
        </select>
        {errors.companySize && (
          <p className="mt-1.5 text-sm text-red-600">{errors.companySize}</p>
        )}
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Company Website
        </label>
        <input
          type="url"
          id="website"
          value={formData.website}
          onChange={(e) => handleChange('website', e.target.value)}
          className={`mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
            ${errors.website ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
          placeholder="https://example.com"
        />
        {errors.website && (
          <p className="mt-1.5 text-sm text-red-600">{errors.website}</p>
        )}
      </div>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
          LinkedIn URL
        </label>
        <input
          type="url"
          id="linkedin"
          value={formData.linkedin}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          className={`mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
            ${errors.linkedin ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
          placeholder="https://linkedin.com/company/example"
        />
        {errors.linkedin && (
          <p className="mt-1.5 text-sm text-red-600">{errors.linkedin}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="country"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className={`mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
              ${errors.country ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
            required
          />
          {errors.country && (
            <p className="mt-1.5 text-sm text-red-600">{errors.country}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className={`mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
              ${errors.city ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
            required
          />
          {errors.city && (
            <p className="mt-1.5 text-sm text-red-600">{errors.city}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate('/companies')}
          className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Create Company
        </button>
      </div>
    </form>
  );
}