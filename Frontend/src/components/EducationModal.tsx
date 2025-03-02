import React from 'react';

interface EducationFormData {
  schoolName: string;
  schoolYear: string;
  collegeName: string;
  degree: string;
  collegeYear: string;
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: EducationFormData;
  onChange: (data: EducationFormData) => void;
  onSubmit: () => void;
}

const EducationModal: React.FC<EducationModalProps> = ({
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
        <h3 className="text-xl font-semibold text-sky-700 mb-4 text-center">Education</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-sky-700 mb-2">School</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="School Name"
                className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.schoolName}
                onChange={(e) => onChange({...formData, schoolName: e.target.value})}
              />
              
              <input
                type="text"
                placeholder="Year of graduation"
                className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.schoolYear}
                onChange={(e) => onChange({...formData, schoolYear: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sky-700 mb-2">College</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="College Name"
                className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.collegeName}
                onChange={(e) => onChange({...formData, collegeName: e.target.value})}
              />
              
              <input
                type="text"
                placeholder="Degree Name"
                className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.degree}
                onChange={(e) => onChange({...formData, degree: e.target.value})}
              />
              
              <input
                type="text"
                placeholder="Year of graduation"
                className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.collegeYear}
                onChange={(e) => onChange({...formData, collegeYear: e.target.value})}
              />
            </div>
          </div>
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

export default EducationModal;