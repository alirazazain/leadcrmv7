import { useState, useRef } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { industries } from '../../data/industries';
import { useClickOutside } from '../../hooks/useClickOutside';
import { DeleteConfirmationDialog } from '../common/DeleteConfirmationDialog';

interface IndustrySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function IndustrySelect({ value, onChange, error }: IndustrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [newIndustry, setNewIndustry] = useState('');
  const [industryToDelete, setIndustryToDelete] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    setShowAddNew(false);
    setNewIndustry('');
  });

  const handleAddNewIndustry = () => {
    if (newIndustry.trim()) {
      const formattedIndustry = newIndustry.trim();
      if (!industries.includes(formattedIndustry)) {
        industries.push(formattedIndustry);
        industries.sort();
      }
      onChange(formattedIndustry);
      setNewIndustry('');
      setShowAddNew(false);
      setIsOpen(false);
    }
  };

  const handleDeleteIndustry = () => {
    if (industryToDelete) {
      const index = industries.indexOf(industryToDelete);
      if (index !== -1) {
        industries.splice(index, 1);
        if (value === industryToDelete) {
          onChange('');
        }
      }
      setIndustryToDelete(null);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
        Industry
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-full bg-white border ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          } rounded-lg shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <span className="block truncate">{value || 'Select industry'}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="max-h-60 overflow-auto">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="group relative flex items-center hover:bg-gray-100"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onChange(industry);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-900"
                  >
                    {industry}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndustryToDelete(industry);
                    }}
                    className="absolute right-2 p-1 text-gray-400 hover:text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            {!showAddNew ? (
              <button
                type="button"
                onClick={() => setShowAddNew(true)}
                className="w-full flex items-center px-4 py-2 text-sm text-indigo-600 hover:bg-gray-50 border-t border-gray-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Industry
              </button>
            ) : (
              <div className="p-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    placeholder="Enter industry name"
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleAddNewIndustry}
                    disabled={!newIndustry.trim()}
                    className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      <DeleteConfirmationDialog
        isOpen={!!industryToDelete}
        onClose={() => setIndustryToDelete(null)}
        onConfirm={handleDeleteIndustry}
        title="Delete Industry"
        message={`Are you sure you want to delete "${industryToDelete}" industry? This action cannot be undone.`}
      />
    </div>
  );
}