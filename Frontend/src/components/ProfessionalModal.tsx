import React from 'react';

interface ProfessionalFormData {
  barCouncilNumber: string;
  practiceArea: string;
  extraCertificates: string;
  languages: string;
}

interface ProfessionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ProfessionalFormData;
  onChange: (data: ProfessionalFormData) => void;
  onSubmit: () => void;
}

const ProfessionalModal: React.FC<ProfessionalModalProps> = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-sky-700 mb-4 text-center">Professional</h3>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Bar Council Registration Number"
            className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.barCouncilNumber}
            onChange={(e) => onChange({...formData, barCouncilNumber: e.target.value})}
          />
          
          <input
            type="text"
            placeholder="Area of practice"
            className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.practiceArea}
            onChange={(e) => onChange({...formData, practiceArea: e.target.value})}
          />
          
          <input
            type="text"
            placeholder="Extra Certificates"
            className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.extraCertificates}
            onChange={(e) => onChange({...formData, extraCertificates: e.target.value})}
          />
          
          <input
            type="text"
            placeholder="Languages Known"
            className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.languages}
            onChange={(e) => onChange({...formData, languages: e.target.value})}
          />
        </div>
        
        <div className="mt-6">
          <button
            onClick={onSubmit}
            className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition"
          >
            Enter
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ProfessionalModal;