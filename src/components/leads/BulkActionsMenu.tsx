import { useState, useRef } from 'react';
import { ChevronDown, Download, Trash2 } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ExportDialog } from '../common/ExportDialog';
import { useLeadStore } from '../../store/leadStore';

interface BulkActionsMenuProps {
  selectedCount: number;
  onExport: () => void;
  onDelete: () => void;
}

export function BulkActionsMenu({ selectedCount, onExport, onDelete }: BulkActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const leads = useLeadStore((state) => state.leads);

  useClickOutside(menuRef, () => setIsOpen(false));

  const getSelectedLeads = () => {
    const selectedCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .filter(checkbox => checkbox.getAttribute('data-lead-id'))
      .map(checkbox => checkbox.getAttribute('data-lead-id'));
    
    return leads.filter(lead => selectedCheckboxes.includes(lead.id));
  };

  const formatLeadData = (lead: any, fields: string[]) => {
    const data: Record<string, any> = {};

    fields.forEach(field => {
      switch (field) {
        // Company fields
        case 'companyName':
          data[field] = lead.companyName || '';
          break;
        case 'country':
        case 'city':
          data[field] = lead.location?.split(', ')[field === 'country' ? 1 : 0] || '';
          break;
        case 'website':
          data[field] = lead.website || '';
          break;
        case 'linkedin':
          data[field] = lead.linkedin || '';
          break;
        case 'industry':
          data[field] = lead.industry || '';
          break;

        // Person fields
        case 'firstName':
        case 'lastName':
          const primaryPerson = lead.persons?.find((p: any) => p.isPrimary)?.person;
          const [firstName = '', lastName = ''] = (primaryPerson?.name || '').split(' ');
          data[field] = field === 'firstName' ? firstName : lastName;
          break;
        case 'designation':
          data[field] = lead.persons?.[0]?.person?.designation || '';
          break;
        case 'email':
          const email = lead.persons?.[0]?.person?.email;
          data[field] = Array.isArray(email) ? email[0] : email || '';
          break;
        case 'phone':
          const phone = lead.persons?.[0]?.person?.phoneNumbers;
          data[field] = Array.isArray(phone) ? phone[0] : phone || '';
          break;

        // Job fields
        case 'jobTitle':
          data[field] = lead.jobTitle || '';
          break;
        case 'jobUrl':
          data[field] = lead.jobPostUrl || '';
          break;
        case 'jobNature':
          data[field] = lead.jobNature || '';
          break;
        case 'jobLocation':
          data[field] = lead.officeLocation || '';
          break;
        case 'workplaceModel':
          data[field] = lead.workplaceModel || '';
          break;
        case 'salary':
          data[field] = lead.salaryAmount ? 
            `${lead.salaryCurrency} ${lead.salaryAmount} (${lead.salaryType})` : '';
          break;
        case 'description':
          data[field] = lead.description || '';
          break;
        case 'notes':
          data[field] = lead.notes || '';
          break;
      }
    });

    return data;
  };

  const handleExport = (format: 'csv' | 'excel', fields: string[]) => {
    const selectedLeads = getSelectedLeads();
    const formattedData = selectedLeads.map(lead => formatLeadData(lead, fields));

    // Create headers with proper labels
    const fieldLabels: Record<string, string> = {
      companyName: 'Company Name',
      country: 'Country',
      city: 'City',
      website: 'Website',
      linkedin: 'LinkedIn',
      industry: 'Industry',
      firstName: 'First Name',
      lastName: 'Last Name',
      designation: 'Designation',
      email: 'Email',
      phone: 'Phone',
      jobTitle: 'Job Title',
      jobUrl: 'Job URL',
      jobNature: 'Job Nature',
      jobLocation: 'Job Location',
      workplaceModel: 'Workplace Model',
      salary: 'Salary',
      description: 'Description',
      notes: 'Notes'
    };

    let content = '';
    let fileName = '';
    let mimeType = '';

    if (format === 'csv') {
      // Create CSV content
      const headers = fields.map(field => fieldLabels[field]);
      content = [
        headers.join(','),
        ...formattedData.map(data => 
          fields.map(field => `"${(data[field] || '').replace(/"/g, '""')}"`)
            .join(',')
        )
      ].join('\n');
      fileName = 'leads-export.csv';
      mimeType = 'text/csv';
    } else {
      // Create Excel-compatible XML content
      const headers = fields.map(field => fieldLabels[field]);
      content = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Leads">
  <Table>
   <Row>
    ${headers.map(header => `<Cell><Data ss:Type="String">${header}</Data></Cell>`).join('')}
   </Row>
   ${formattedData.map(data => `
   <Row>
    ${fields.map(field => `<Cell><Data ss:Type="String">${data[field] || ''}</Data></Cell>`).join('')}
   </Row>`).join('')}
  </Table>
 </Worksheet>
</Workbook>`;
      fileName = 'leads-export.xlsx';
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setShowExportDialog(false);
    setIsOpen(false);
  };

  if (selectedCount === 0) {
    return (
      <button
        disabled
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-400 bg-gray-50 cursor-not-allowed"
      >
        <span>Bulk Actions</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span>Bulk Actions ({selectedCount})</span>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => {
                setShowExportDialog(true);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Selected
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        onExport={handleExport}
        selectedCount={selectedCount}
      />
    </div>
  );
}