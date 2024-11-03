import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CreateCompanyForm } from '../components/company/CreateCompanyForm';
import { mockCompanies } from '../data/mockCompanies';

export function EditCompanyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState(mockCompanies.find(c => c.id === id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCompany = mockCompanies.find(c => c.id === id);
    setCompany(foundCompany);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Company not found</h2>
        <p className="mt-2 text-gray-600">The company you're trying to edit doesn't exist or has been removed.</p>
        <Link
          to="/companies"
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Companies
        </Link>
      </div>
    );
  }

  const handleSubmit = (updatedCompany: any) => {
    const index = mockCompanies.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCompanies[index] = {
        ...mockCompanies[index],
        ...updatedCompany,
        id: company.id,
      };
    }
    navigate('/companies');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/companies"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Companies
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Edit Company</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <CreateCompanyForm onSubmit={handleSubmit} initialData={company} />
        </div>
      </div>
    </div>
  );
}