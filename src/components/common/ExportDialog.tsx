import { useState } from 'react';
import { FileSpreadsheet, FileText, ChevronDown } from 'lucide-react';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'csv' | 'excel', fields: string[]) => void;
  selectedCount: number;
}

interface Preset {
  id: string;
  name: string;
  fields: string[];
}

const COMPANY_FIELDS = [
  { id: 'companyName', label: 'Company Name' },
  { id: 'country', label: 'Country' },
  { id: 'city', label: 'City' },
  { id: 'website', label: 'Website' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'industry', label: 'Industry' },
];

const PERSON_FIELDS = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'designation', label: 'Designation' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'country', label: 'Country' },
  { id: 'city', label: 'City' },
];

const JOB_FIELDS = [
  { id: 'jobTitle', label: 'Job Title' },
  { id: 'jobUrl', label: 'Job URL' },
  { id: 'jobNature', label: 'Job Nature' },
  { id: 'jobLocation', label: 'Job Location' },
  { id: 'workplaceModel', label: 'Workplace Model' },
  { id: 'salary', label: 'Salary' },
  { id: 'description', label: 'Description' },
  { id: 'notes', label: 'Notes' },
];

const DEFAULT_PRESET: Preset = {
  id: 'default',
  name: 'Default',
  fields: ['companyName', 'country', 'city', 'firstName', 'lastName', 'email', 'jobTitle', 'jobNature'],
};

export function ExportDialog({ isOpen, onClose, onExport, selectedCount }: ExportDialogProps) {
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set(DEFAULT_PRESET.fields));
  const [showPresetMenu, setShowPresetMenu] = useState(false);
  const [presets, setPresets] = useState<Preset[]>(() => {
    const savedPresets = localStorage.getItem('exportPresets');
    return savedPresets ? JSON.parse(savedPresets) : [DEFAULT_PRESET];
  });
  const [presetName, setPresetName] = useState('');
  const [showSavePreset, setShowSavePreset] = useState(false);

  const toggleField = (fieldId: string) => {
    const newSelected = new Set(selectedFields);
    if (newSelected.has(fieldId)) {
      newSelected.delete(fieldId);
    } else {
      newSelected.add(fieldId);
    }
    setSelectedFields(newSelected);
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) return;

    const newPreset: Preset = {
      id: crypto.randomUUID(),
      name: presetName,
      fields: Array.from(selectedFields),
    };

    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem('exportPresets', JSON.stringify(updatedPresets));
    setPresetName('');
    setShowSavePreset(false);
  };

  const handleLoadPreset = (preset: Preset) => {
    setSelectedFields(new Set(preset.fields));
    setShowPresetMenu(false);
  };

  const handleDeletePreset = (presetId: string) => {
    const updatedPresets = presets.filter(p => p.id !== presetId);
    setPresets(updatedPresets);
    localStorage.setItem('exportPresets', JSON.stringify(updatedPresets));
  };

  if (!isOpen) return null;

  const renderFieldGroup = (title: string, fields: { id: string; label: string }[]) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {fields.map(field => (
          <label
            key={field.id}
            className="flex items-center space-x-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedFields.has(field.id)}
              onChange={() => toggleField(field.id)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span>{field.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Export {selectedCount} Lead{selectedCount !== 1 ? 's' : ''}</h2>
            <div className="relative">
              <button
                onClick={() => setShowPresetMenu(!showPresetMenu)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Presets
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>

              {showPresetMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {presets.map(preset => (
                      <div
                        key={preset.id}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <button
                          onClick={() => handleLoadPreset(preset)}
                          className="flex-grow text-left"
                        >
                          {preset.name}
                        </button>
                        {preset.id !== 'default' && (
                          <button
                            onClick={() => handleDeletePreset(preset.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="border-t border-gray-100">
                      <button
                        onClick={() => setShowSavePreset(true)}
                        className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100"
                      >
                        Save Current Selection
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            {showSavePreset ? (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preset Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter preset name"
                  />
                  <button
                    onClick={handleSavePreset}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowSavePreset(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}

            {renderFieldGroup('Company Details', COMPANY_FIELDS)}
            {renderFieldGroup('Persons Details', PERSON_FIELDS)}
            {renderFieldGroup('Job Details', JOB_FIELDS)}
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => onExport('csv', Array.from(selectedFields))}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FileText className="h-5 w-5 mr-2" />
                Export as CSV
              </button>
              <button
                onClick={() => onExport('excel', Array.from(selectedFields))}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FileSpreadsheet className="h-5 w-5 mr-2" />
                Export as Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}