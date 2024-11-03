import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Building2, Globe, MapPin, Users, Briefcase, PenSquare } from 'lucide-react';
import { mockCompanies } from '../data/mockCompanies';
import { mockLeads } from '../data/mockLeads';
import { CreatePersonPanel } from '../components/person/CreatePersonPanel';
import { Person } from '../types';

export function CompanyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState(mockCompanies.find(c => c.id === id));
  const [isPersonPanelOpen, setIsPersonPanelOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [associatedLeads, setAssociatedLeads] = useState(
    mockLeads.filter(lead => lead.companyName === company?.name)
  );

  useEffect(() => {
    if (company) {
      setAssociatedLeads(mockLeads.filter(lead => lead.companyName === company.name));
    }
  }, [company]);

  if (!company) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Company not found</h2>
        <p className="mt-2 text-gray-600">The company you're looking for doesn't exist or has been removed.</p>
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

  const handlePersonSubmit = (personData: any) => {
    if (editingPerson) {
      // Update existing person
      const personIndex = company.people.findIndex(p => p.id === editingPerson.id);
      if (personIndex !== -1) {
        const updatedPerson: Person = {
          id: editingPerson.id,
          name: `${personData.firstName} ${personData.lastName}`,
          email: personData.emails,
          designation: personData.designation,
          phoneNumbers: personData.phoneNumbers,
          linkedin: personData.linkedin
        };
        company.people[personIndex] = updatedPerson;
      }
    } else {
      // Create new person
      const newPerson: Person = {
        id: crypto.randomUUID(),
        name: `${personData.firstName} ${personData.lastName}`,
        email: personData.emails,
        designation: personData.designation,
        phoneNumbers: personData.phoneNumbers,
        linkedin: personData.linkedin
      };
      company.people.push(newPerson);
    }
    
    setCompany({ ...company });
    setIsPersonPanelOpen(false);
    setEditingPerson(null);
  };

  const handleEditPerson = (person: Person) => {
    setEditingPerson(person);
    setIsPersonPanelOpen(true);
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
        <h1 className="text-2xl font-semibold text-gray-900">Company Details</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        {/* Company Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
              <div className="flex items-center gap-4 text-gray-500">
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {company.industry || 'Industry not specified'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {company.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {company.size || 'Size not specified'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              )}
              {company.linkedin && (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* People Section */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">People</h3>
            <button
              onClick={() => {
                setEditingPerson(null);
                setIsPersonPanelOpen(true);
              }}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Person
            </button>
          </div>

          {company.people.length === 0 ? (
            <p className="text-gray-500">No people added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.people.map((person) => (
                <div
                  key={person.id}
                  className="relative p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors duration-200"
                >
                  <button
                    onClick={() => handleEditPerson(person)}
                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <PenSquare className="h-4 w-4" />
                  </button>
                  <h4 className="font-medium text-gray-900">{person.name}</h4>
                  <p className="text-sm text-gray-500">{person.designation}</p>
                  <div className="mt-2 space-y-1">
                    {Array.isArray(person.email) ? (
                      person.email.map((email, index) => (
                        <a
                          key={index}
                          href={`mailto:${email}`}
                          className="block text-sm text-indigo-600 hover:text-indigo-500"
                        >
                          {email}
                        </a>
                      ))
                    ) : (
                      <a
                        href={`mailto:${person.email}`}
                        className="block text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        {person.email}
                      </a>
                    )}
                    {person.phoneNumbers?.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone}`}
                        className="block text-sm text-gray-600 hover:text-gray-800"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Published Jobs Section */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Published Jobs</h3>
            <Link
              to="/leads/create"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Lead
            </Link>
          </div>

          {associatedLeads.length === 0 ? (
            <p className="text-gray-500">No jobs published yet.</p>
          ) : (
            <div className="space-y-4">
              {associatedLeads.map((lead) => (
                <Link
                  key={lead.id}
                  to={`/leads/${lead.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{lead.jobTitle}</h4>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-500">
                          <span className="inline-flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {lead.jobNature}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="inline-flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {lead.workplaceModel}
                          </span>
                        </p>
                        {lead.salaryAmount && (
                          <p className="text-sm text-gray-500">
                            {lead.salaryCurrency} {lead.salaryAmount.toLocaleString()} ({lead.salaryType})
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        lead.status === 'HIRED'
                          ? 'bg-green-100 text-green-800'
                          : lead.status === 'IN_PROGRESS'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    `}>
                      {lead.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreatePersonPanel
        isOpen={isPersonPanelOpen}
        onClose={() => {
          setIsPersonPanelOpen(false);
          setEditingPerson(null);
        }}
        onSubmit={handlePersonSubmit}
        companyId={company.id}
        editingPerson={editingPerson}
      />
    </div>
  );
}