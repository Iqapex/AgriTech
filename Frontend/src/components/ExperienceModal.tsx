import React from 'react';

interface ExperienceFormData {
  yearsOfExperience: string;
  preferredLegalSection: string;
  numberOfCases: string;
  numberOfCasesWon: string;
}

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ExperienceFormData;
  onChange: (data: ExperienceFormData) => void;
  onSubmit: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({
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
        <h3 className="text-xl font-semibold text-sky-700 mb-4 text-center">Experience</h3>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Years of Experience"
            className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.yearsOfExperience}
            onChange={(e) => onChange({...formData, yearsOfExperience: e.target.value})}
          />
          
          <input
            type="text"
            placeholder="Preferred Legal Section"
            className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.preferredLegalSection}
            onChange={(e) => onChange({...formData, preferredLegalSection: e.target.value})}
          />
          
          <input
            type="text"
            placeholder="Number of Cases"
            className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.numberOfCases}
            onChange={(e) => onChange({...formData, numberOfCases: e.target.value})}
          />
          
          <input
            type="text"
            placeholder="Number of Cases Solved"
            className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.numberOfCasesWon}
            onChange={(e) => onChange({...formData, numberOfCasesWon: e.target.value})}
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

export default ExperienceModal;