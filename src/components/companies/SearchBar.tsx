import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { mockCompanies } from '../../data/mockCompanies';

interface SearchResult {
  type: 'company' | 'person';
  id: string;
  title: string;
  subtitle?: string;
  companyId: string;
  matchedField: string;
}

interface SearchBarProps {
  onCompanySelect: (companyId: string) => void;
}

export function SearchBar({ onCompanySelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchCompanies = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const query = searchQuery.toLowerCase();

    mockCompanies.forEach((company) => {
      // Search in company name
      if (company.name.toLowerCase().includes(query)) {
        searchResults.push({
          type: 'company',
          id: `company-${company.id}`,
          title: company.name,
          subtitle: company.location,
          companyId: company.id,
          matchedField: 'name'
        });
      }

      // Search in people
      company.people?.forEach((person) => {
        if (person.name.toLowerCase().includes(query)) {
          searchResults.push({
            type: 'person',
            id: `person-${person.id}`,
            title: person.name,
            subtitle: `${person.designation} at ${company.name}`,
            companyId: company.id,
            matchedField: 'person'
          });
        }
      });
    });

    // Limit results per category
    const groupedResults = searchResults.reduce((acc, result) => {
      if (!acc[result.type]) {
        acc[result.type] = [];
      }
      if (acc[result.type].length < 5) {
        acc[result.type].push(result);
      }
      return acc;
    }, {} as Record<string, SearchResult[]>);

    setResults(Object.values(groupedResults).flat());
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setIsLoading(true);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchCompanies(value);
      setIsLoading(false);
    }, 300);

    setShowResults(true);
  };

  const handleResultClick = (result: SearchResult) => {
    onCompanySelect(result.companyId);
    setShowResults(false);
    setQuery('');
  };

  const highlightMatch = (text: string, query: string) => {
    if (!text || !query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={i} className="bg-yellow-100 font-medium">{part}</span> : 
        part
    );
  };

  return (
    <div className="relative flex-1" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search companies and people..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setShowResults(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {showResults && (query || isLoading) && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent"></div>
                <span className="ml-2">Searching...</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {['company', 'person'].map(type => {
                const typeResults = results.filter(r => r.type === type);
                if (typeResults.length === 0) return null;

                return (
                  <div key={type} className="py-2">
                    <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      {type === 'company' ? 'Companies' : 'People'}
                    </div>
                    {typeResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      >
                        <div className="font-medium text-gray-900">
                          {highlightMatch(result.title, query)}
                        </div>
                        {result.subtitle && (
                          <div className="text-gray-500">
                            {highlightMatch(result.subtitle, query)}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}