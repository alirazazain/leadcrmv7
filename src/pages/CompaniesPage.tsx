import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Filter, ChevronLeft, ChevronRight, Trash2, PenSquare } from 'lucide-react';
import { mockCompanies } from '../data/mockCompanies';
import { SearchBar } from '../components/companies/SearchBar';
import { CompanyFilters } from '../components/companies/CompanyFilters';
import { BulkActionsMenu } from '../components/companies/BulkActionsMenu';
import { DeleteConfirmationDialog } from '../components/common/DeleteConfirmationDialog';
import { SelectAllDialog } from '../components/common/SelectAllDialog';

export function CompaniesPage() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const [deleteCompanyId, setDeleteCompanyId] = useState<string | null>(null);
  const [selectAllDialogOpen, setSelectAllDialogOpen] = useState(false);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);

  const handleCompanyClick = (companyId: string) => {
    navigate(`/companies/${companyId}`);
  };

  const handleEditClick = (e: React.MouseEvent, companyId: string) => {
    e.stopPropagation();
    navigate(`/companies/${companyId}/edit`);
  };

  const handleDeleteClick = (e: React.MouseEvent, companyId: string) => {
    e.stopPropagation();
    setDeleteCompanyId(companyId);
  };

  const handleDeleteConfirm = () => {
    if (deleteCompanyId) {
      const index = mockCompanies.findIndex(c => c.id === deleteCompanyId);
      if (index !== -1) {
        mockCompanies.splice(index, 1);
      }
      setDeleteCompanyId(null);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent, companyId: string) => {
    e.stopPropagation();
    const newSelected = new Set(selectedCompanies);
    if (newSelected.has(companyId)) {
      newSelected.delete(companyId);
    } else {
      newSelected.add(companyId);
    }
    setSelectedCompanies(newSelected);
  };

  const handleSelectAllClick = () => {
    if (selectedCompanies.size === mockCompanies.length) {
      setSelectedCompanies(new Set());
    } else {
      setSelectAllDialogOpen(true);
    }
  };

  const handleSelectPage = () => {
    const newSelected = new Set(mockCompanies.map(company => company.id));
    setSelectedCompanies(newSelected);
    setSelectAllDialogOpen(false);
  };

  const handleSelectAll = () => {
    const newSelected = new Set(mockCompanies.map(company => company.id));
    setSelectedCompanies(newSelected);
    setSelectAllDialogOpen(false);
  };

  const handleBulkExport = () => {
    console.log('Exporting companies:', Array.from(selectedCompanies));
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteDialog(true);
  };

  const handleBulkDeleteConfirm = () => {
    selectedCompanies.forEach(id => {
      const index = mockCompanies.findIndex(c => c.id === id);
      if (index !== -1) {
        mockCompanies.splice(index, 1);
      }
    });
    setSelectedCompanies(new Set());
    setShowBulkDeleteDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your companies and their details</p>
            </div>
            <Link
              to="/companies/create"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Company
            </Link>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SearchBar onCompanySelect={handleCompanyClick} />
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 ${
                  showFilters ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <BulkActionsMenu
                selectedCount={selectedCompanies.size}
                onExport={handleBulkExport}
                onDelete={handleBulkDelete}
              />
            </div>
          </div>

          {showFilters && (
            <div className="mt-6">
              <CompanyFilters onFiltersChange={() => {}} />
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    checked={selectedCompanies.size > 0 && selectedCompanies.size === mockCompanies.length}
                    onChange={handleSelectAllClick}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCompanies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                    No companies yet
                  </td>
                </tr>
              ) : (
                mockCompanies.map((company) => (
                  <tr
                    key={company.id}
                    onClick={() => handleCompanyClick(company.id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap w-8" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        checked={selectedCompanies.has(company.id)}
                        onChange={(e) => handleCheckboxClick(e as any, company.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{company.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{company.industry || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{company.size || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => handleEditClick(e, company.id)}
                          className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <PenSquare className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, company.id)}
                          className="p-1 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{mockCompanies.length}</span> of{' '}
                <span className="font-medium">{mockCompanies.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={!!deleteCompanyId}
        onClose={() => setDeleteCompanyId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Company"
        message="Are you sure you want to delete this company? This action cannot be undone."
      />

      <DeleteConfirmationDialog
        isOpen={showBulkDeleteDialog}
        onClose={() => setShowBulkDeleteDialog(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Companies"
        message={`Are you sure you want to delete ${selectedCompanies.size} selected companies? This action cannot be undone.`}
      />

      <SelectAllDialog
        isOpen={selectAllDialogOpen}
        onClose={() => setSelectAllDialogOpen(false)}
        onSelectPage={handleSelectPage}
        onSelectAll={handleSelectAll}
        currentPageCount={mockCompanies.length}
        totalCount={mockCompanies.length}
      />
    </div>
  );
}