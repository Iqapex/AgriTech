import React from 'react';

interface IntroFormData {
  name: string;
  dob: string; // Make `dob` required
  about: string;
  avatar: string;
}

interface IntroductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: IntroFormData;
  onChange: (data: IntroFormData) => void;
  onSubmit: () => void;
  onImageUpload: (file: File) => void;
}

const IntroductionModal: React.FC<IntroductionModalProps> = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  onImageUpload,
}) => {
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">Introduction</h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.name}
            onChange={(e) => onChange({ ...formData, name: e.target.value })}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.dob}
            onChange={(e) => onChange({ ...formData, dob: e.target.value })}
          />
          <textarea
            placeholder="About You"
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
            value={formData.about}
            onChange={(e) => onChange({ ...formData, about: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={onSubmit}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Save
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