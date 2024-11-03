import { useState } from 'react';
import { Upload, X, AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { isValidEmail } from '../utils/validation';

export function EmailVerifierPage() {
  const [manualEmails, setManualEmails] = useState('');
  const [verificationResults, setVerificationResults] = useState<Array<{
    email: string;
    status: 'valid' | 'invalid';
    message?: string;
  }>>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleManualVerify = () => {
    const emails = manualEmails
      .split(/[\s,;]+/)
      .map(email => email.trim())
      .filter(Boolean);

    const results = emails.map(email => ({
      email,
      status: isValidEmail(email) ? 'valid' : 'invalid' as 'valid' | 'invalid',
      message: isValidEmail(email) 
        ? 'Email format is valid' 
        : 'Invalid email format'
    }));

    setVerificationResults(results);
  };

  const handleFileUpload = (file: File) => {
    // In a real app, we would process the file here
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/csv' || file.type.includes('spreadsheet'))) {
      handleFileUpload(file);
    }
  };

  const hasValidEmails = manualEmails
    .split(/[\s,;]+/)
    .map(email => email.trim())
    .filter(email => email && isValidEmail(email))
    .length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Email Verifier</h1>
        <p className="mt-1 text-sm text-gray-500">Verify email addresses individually or in bulk</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Manual Verification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Manual Verification</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="emails" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Email Addresses
                </label>
                <div className="relative">
                  <textarea
                    id="emails"
                    rows={6}
                    value={manualEmails}
                    onChange={(e) => setManualEmails(e.target.value)}
                    placeholder="Enter emails separated by commas, spaces, or new lines"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                  {manualEmails && (
                    <button
                      onClick={() => setManualEmails('')}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-gray-500">
                  Example: email@example.com, another@example.com
                </p>
              </div>

              <button
                onClick={handleManualVerify}
                disabled={!hasValidEmails}
                className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="h-4 w-4 mr-2" />
                Verify Emails
              </button>

              {verificationResults.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">Results</h3>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {verificationResults.map((result, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          result.status === 'valid' ? 'bg-green-50' : 'bg-red-50'
                        }`}
                      >
                        {result.status === 'valid' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${
                            result.status === 'valid' ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {result.email}
                          </p>
                          <p className={`text-xs ${
                            result.status === 'valid' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {result.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Verification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Bulk Verification</h2>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-500'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className={`h-10 w-10 ${
                    isDragging ? 'text-indigo-500' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFile ? selectedFile.name : 'Drop your file here'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports CSV and Excel files
                  </p>
                </div>
                <div className="flex justify-center">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Browse Files
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {selectedFile && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    // Handle file verification here
                    console.log('Verifying file:', selectedFile);
                  }}
                  className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Verify File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}