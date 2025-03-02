import React from 'react';

interface IntroFormData {
  name: string;
  lastName: string;
  dob: string;
  about: string;
}

interface IntroductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: IntroFormData;
  onChange: (data: IntroFormData) => void;
  onSubmit: () => void;
}

const IntroductionModal: React.FC<IntroductionModalProps> = ({
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
        <h3 className="text-xl font-semibold text-sky-700 mb-4 text-center">Introduction</h3>
        
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={formData.name}
              onChange={(e) => onChange({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={formData.lastName}
              onChange={(e) => onChange({...formData, lastName: e.target.value})}
            />
          </div>
          
          <div>
            <input
              type="date"
              placeholder="Date of Birth"
              className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={formData.dob}
              onChange={(e) => onChange({...formData, dob: e.target.value})}
            />
          </div>
          
          <div>
            <textarea
              placeholder="Something about you..."
              className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[100px]"
              value={formData.about}
              onChange={(e) => onChange({...formData, about: e.target.value})}
            />
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

export default IntroductionModal;