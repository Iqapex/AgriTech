import React, { useState, useEffect } from 'react';
import { Pencil, User } from 'lucide-react';
import EducationModal from '../components/EducationModal';
import IntroductionModal from '../components/IntroductionModal';
import ProfessionalModal from '../components/ProfessionalModal';
import ExperienceModal from '../components/ExperienceModal';
import { useApi } from '../hooks/useApi';
import {jwtDecode} from 'jwt-decode'; // Use default export

// Types for profile data
interface Education {
  institute: string;
  degreeName?: string;
  startDate?: string;
  endDate?: string;
  course?: string;
  present?: boolean;
}

interface Professional {
  barCouncilNumber?: string;
  practiceArea?: string;
  extraCertificates?: string;
  languages?: string;
}

interface Experience {
  companyName: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  present?: boolean;
}

interface ProfileData {
  name: string;
  about: string;
  dob?: string;
  avatar?: string;
  education: Education[];
  professional: Professional;
  experience: Experience[];
}

const ProfileInfo: React.FC = () => {
  const { fetchData, loading, error } = useApi();
  const [userId, setUserId] = useState<string>('');
  
  // Get the authentication token from localStorage
  const authToken = localStorage.getItem('authToken');

  // Decode the JWT token to get the user ID and log token details
  useEffect(() => {
    if (authToken) {
      if (authToken.split('.').length !== 3) {
        console.error('Stored auth token is invalid or malformed');
        return;
      }
      try {
        const decodedToken: any = jwtDecode(authToken);
        console.log('Decoded Token:', decodedToken);
        setUserId(decodedToken.id);
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    } else {
      console.error('Auth token is not present in localStorage');
    }
  }, [authToken]);

  // Initial profile data state
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    about: '',
    avatar: '',
    education: [],
    professional: {} as Professional,
    experience: [],
  });

  // Modal states
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showProfessionalModal, setShowProfessionalModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  // Form data states
  const [introForm, setIntroForm] = useState({
    name: '',
    dob: '',
    about: '',
    avatar: '',
  });

  const [educationForm, setEducationForm] = useState<Education>({
    institute: '',
    degreeName: '',
    startDate: '',
    endDate: '',
    course: '',
    present: false,
  });

  const [professionalForm, setProfessionalForm] = useState<Professional>({
    barCouncilNumber: '',
    practiceArea: '',
    extraCertificates: '',
    languages: '',
  });

  const [experienceForm, setExperienceForm] = useState<Experience>({
    companyName: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    present: false,
  });

  // Fetch profile data on component mount with correct API endpoint
  useEffect(() => {
    const loadProfileData = async () => {
      if (!userId) {
        console.error('User ID is missing');
        return;
      }
      try {
        const data = await fetchData(`/users/${userId}`, "GET", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log('Profile data fetched:', data);
        setProfileData(data);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
      }
    };

    if (userId) {
      loadProfileData();
    }
  }, [userId, authToken, fetchData]);

  // Handle form submissions using the correct API endpoint and headers
  const handleIntroSubmit = async () => {
    const [firstname, lastname] = introForm.name.split(' ');

    try {
      const response = await fetchData(`/users/${userId}`, 'PUT', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname,
          lastname,
          birthDate: introForm.dob,
          summary: introForm.about,
          profilePic: introForm.avatar,
        }),
      });
      console.log('Intro update response:', response);
      setProfileData((prev) => ({
        ...prev,
        name: introForm.name,
        dob: introForm.dob,
        about: introForm.about,
        avatar: introForm.avatar,
      }));
      setShowIntroModal(false);
    } catch (err) {
      console.error('Failed to save intro:', err);
    }
  };
  
  const handleEducationSubmit = async () => {
    const newEducation = { ...educationForm };
    try {
      const response = await fetchData(`/users/${userId}`, 'PUT', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ education: [...(profileData.education || []), newEducation] }),
      });
      console.log('Education update response:', response);
      setProfileData((prev) => ({
        ...prev,
        education: [...(prev.education || []), newEducation],
      }));
      setShowEducationModal(false);
    } catch (err) {
      console.error('Failed to save education:', err);
    }
  };
  
  const handleProfessionalSubmit = async () => {
    const updatedProfessional = { ...professionalForm };
    try {
      const response = await fetchData(`/users/${userId}`, 'PUT', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfessional),
      });
      console.log('Professional update response:', response);
      setProfileData((prev) => ({
        ...prev,
        professional: updatedProfessional,
      }));
      setShowProfessionalModal(false);
    } catch (err) {
      console.error('Failed to save professional info:', err);
    }
  };
  
  const handleExperienceSubmit = async () => {
    const newExperience = { ...experienceForm };
    try {
      const response = await fetchData(`/users/${userId}`, 'PUT', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ experience: [...(profileData.experience || []), newExperience] }),
      });
      console.log('Experience update response:', response);
      setProfileData((prev) => ({
        ...prev,
        experience: [...(prev.experience || []), newExperience],
      }));
      setShowExperienceModal(false);
    } catch (err) {
      console.error('Failed to save experience:', err);
    }
  };
  
  // Handle image upload (ensure the endpoint matches your server configuration)
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetchData('/upload', 'POST', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });
      console.log('Image upload response:', response);
      setProfileData((prev) => ({ ...prev, avatar: response.url }));
      await fetchData(`/users/${userId}`, 'PUT', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profilePic: response.url }),
      });
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };
  

  return (
    <div className="min-h-screen bg-green-100 p-4 pt-24 px-24">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left sidebar */}
        <div className="w-full md:w-1/5 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <User className="text-white" size={32} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-green-600 py-1 border-b">
              <span>Introduction</span>
              <button onClick={() => setShowIntroModal(true)} className="text-green-500">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center text-green-600 py-1 border-b">
              <span>Education</span>
              <button onClick={() => setShowEducationModal(true)} className="text-green-500">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center text-green-600 py-1 border-b">
              <span>Professional</span>
              <button onClick={() => setShowProfessionalModal(true)} className="text-green-500">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center text-green-600 py-1 border-b">
              <span>Experience</span>
              <button onClick={() => setShowExperienceModal(true)} className="text-green-500">
                <Pencil size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-4/5 space-y-4">
          {/* Profile section */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <button
              onClick={() => setShowIntroModal(true)}
              className="absolute top-4 right-4 text-green-500"
            >
              <Pencil size={18} />
            </button>

            <div className="flex flex-col items-center">
              {profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <User className="text-white" size={40} />
                </div>
              )}

              <h2 className="text-xl font-semibold text-green-700 mb-2">
                {profileData.name || 'Name'}
              </h2>
              <p className="text-center text-gray-600 max-w-2xl">
                {profileData.about || 'About'}
              </p>
            </div>
          </div>

          {/* Education section */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-700">Education</h3>
              <button
                onClick={() => setShowEducationModal(true)}
                className="text-green-500"
              >
                <Pencil size={18} />
              </button>
            </div>

            {profileData.education.length > 0 ? (
              <div className="space-y-4">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-green-700">{edu.institute}</h4>
                    <p className="text-sm text-gray-600">{edu.degreeName}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} - {edu.present ? 'Present' : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No education information added yet
              </div>
            )}
          </div>

          {/* Professional section */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-700">Professional</h3>
              <button
                onClick={() => setShowProfessionalModal(true)}
                className="text-green-500"
              >
                <Pencil size={18} />
              </button>
            </div>

            {profileData.professional ? (
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  {profileData.professional.barCouncilNumber && (
                    <p className="text-sm text-gray-600">
                      Bar Council Number: {profileData.professional.barCouncilNumber}
                    </p>
                  )}
                  {profileData.professional.practiceArea && (
                    <p className="text-sm text-gray-600">
                      Practice Area: {profileData.professional.practiceArea}
                    </p>
                  )}
                  {profileData.professional.extraCertificates && (
                    <p className="text-sm text-gray-600">
                      Extra Certificates: {profileData.professional.extraCertificates}
                    </p>
                  )}
                  {profileData.professional.languages && (
                    <p className="text-sm text-gray-600">
                      Languages Known: {profileData.professional.languages}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No professional information added yet
              </div>
            )}
          </div>

          {/* Experience section */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-700">Experience</h3>
              <button
                onClick={() => setShowExperienceModal(true)}
                className="text-green-500"
              >
                <Pencil size={18} />
              </button>
            </div>

            {profileData.experience.length > 0 ? (
              <div className="space-y-4">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-green-700">{exp.companyName}</h4>
                    <p className="text-sm text-gray-600">{exp.role}</p>
                    <p className="text-xs text-gray-500">
                      {exp.startDate} - {exp.present ? 'Present' : exp.endDate}
                    </p>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No experience information added yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <IntroductionModal
        isOpen={showIntroModal}
        onClose={() => setShowIntroModal(false)}
        formData={introForm}
        onChange={setIntroForm}
        onSubmit={handleIntroSubmit}
        onImageUpload={handleImageUpload}
      />

      <EducationModal
        isOpen={showEducationModal}
        onClose={() => setShowEducationModal(false)}
        formData={educationForm}
        onChange={setEducationForm}
        onSubmit={handleEducationSubmit}
      />

      <ProfessionalModal
        isOpen={showProfessionalModal}
        onClose={() => setShowProfessionalModal(false)}
        formData={professionalForm}
        onChange={setProfessionalForm}
        onSubmit={handleProfessionalSubmit}
      />

      <ExperienceModal
        isOpen={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
        formData={experienceForm}
        onChange={setExperienceForm}
        onSubmit={handleExperienceSubmit}
      />
    </div>
  );
};

export default ProfileInfo;
