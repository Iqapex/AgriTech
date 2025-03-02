import React, { useState } from 'react';
import { Pencil, User } from 'lucide-react';
import EducationModal from '../components/EducationModal';
import IntroductionModal from '../components/IntroductionModal';
import ProfessionalModal from '../components/ProfessionalModal';
import ExperienceModal from '../components/ExperienceModal';

// Types for profile data
interface Education {
  schoolName: string;
  collegeName?: string;
  schoolYear?: string;
  collegeYear?: string;
  degree?: string;
}

interface Professional {
  barCouncilNumber?: string;
  practiceArea?: string;
  extraCertificates?: string;
  languages?: string;
}

interface Experience {
  yearsOfExperience?: string;
  preferredLegalSection?: string;
  numberOfCases?: string;
  numberOfCasesWon?: string;
}

interface ProfileData {
  name: string;
  about: string;
  dob?: string;
  avatar?: string;
  education: Education[];
  professional: Professional[];
  experience: Experience[];
}

const ProfileInfo: React.FC = () => {
  // Initial profile data
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    about: '',
    avatar: '',
    education: [],
    professional: [],
    experience: []
  });

  // Modal states
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showProfessionalModal, setShowProfessionalModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  // Form data states
  const [introForm, setIntroForm] = useState({
    name: '',
    lastName: '',
    dob: '',
    about: ''
  });

  const [educationForm, setEducationForm] = useState({
    schoolName: '',
    schoolYear: '',
    collegeName: '',
    degree: '',
    collegeYear: ''
  });

  const [professionalForm, setProfessionalForm] = useState({
    barCouncilNumber: '',
    practiceArea: '',
    extraCertificates: '',
    languages: ''
  });

  const [experienceForm, setExperienceForm] = useState({
    yearsOfExperience: '',
    preferredLegalSection: '',
    numberOfCases: '',
    numberOfCasesWon: ''
  });

  // Handle form submissions
  const handleIntroSubmit = () => {
    setProfileData({
      ...profileData,
      name: `${introForm.name} ${introForm.lastName}`.trim(),
      dob: introForm.dob,
      about: introForm.about
    });
    setShowIntroModal(false);
  };

  const handleEducationSubmit = () => {
    const newEducation = {
      schoolName: educationForm.schoolName,
      schoolYear: educationForm.schoolYear,
      collegeName: educationForm.collegeName,
      collegeYear: educationForm.collegeYear,
      degree: educationForm.degree
    };
    
    setProfileData({
      ...profileData,
      education: [...profileData.education, newEducation]
    });
    setShowEducationModal(false);
  };

  const handleProfessionalSubmit = () => {
    const newProfessional = {
      barCouncilNumber: professionalForm.barCouncilNumber,
      practiceArea: professionalForm.practiceArea,
      extraCertificates: professionalForm.extraCertificates,
      languages: professionalForm.languages
    };
    
    setProfileData({
      ...profileData,
      professional: [...profileData.professional, newProfessional]
    });
    setShowProfessionalModal(false);
  };

  const handleExperienceSubmit = () => {
    const newExperience = {
      yearsOfExperience: experienceForm.yearsOfExperience,
      preferredLegalSection: experienceForm.preferredLegalSection,
      numberOfCases: experienceForm.numberOfCases,
      numberOfCasesWon: experienceForm.numberOfCasesWon
    };
    
    setProfileData({
      ...profileData,
      experience: [...profileData.experience, newExperience]
    });
    setShowExperienceModal(false);
  };

  return (
    <div className="min-h-screen bg-sky-100 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left sidebar */}
        <div className="w-full md:w-1/5 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mb-2">
              <User className="text-white" size={32} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sky-600 py-1 border-b">
              <span>Introduction</span>
              <button onClick={() => setShowIntroModal(true)} className="text-sky-500">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center text-sky-600 py-1 border-b">
              <span>Education</span>
              <button onClick={() => setShowEducationModal(true)} className="text-sky-500">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center text-sky-600 py-1 border-b">
              <span>Professional</span>
              <button onClick={() => setShowProfessionalModal(true)} className="text-sky-500">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center text-sky-600 py-1 border-b">
              <span>Experience</span>
              <button onClick={() => setShowExperienceModal(true)} className="text-sky-500">
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
              className="absolute top-4 right-4 text-sky-500"
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
                <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center mb-4">
                  <User className="text-white" size={40} />
                </div>
              )}
              
              <h2 className="text-xl font-semibold text-sky-700 mb-2">
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
              <h3 className="text-lg font-semibold text-sky-700">Education</h3>
              <button 
                onClick={() => setShowEducationModal(true)} 
                className="text-sky-500"
              >
                <Pencil size={18} />
              </button>
            </div>
            
            {profileData.education.length > 0 ? (
              <div className="space-y-4">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-sky-500 pl-4">
                    {edu.collegeName && (
                      <div className="mb-2">
                        <h4 className="font-medium text-sky-700">{edu.collegeName}</h4>
                        <p className="text-sm text-gray-600">{edu.degree}</p>
                        <p className="text-xs text-gray-500">{edu.collegeYear}</p>
                      </div>
                    )}
                    {edu.schoolName && (
                      <div>
                        <h4 className="font-medium text-sky-700">{edu.schoolName}</h4>
                        <p className="text-xs text-gray-500">{edu.schoolYear}</p>
                      </div>
                    )}
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
              <h3 className="text-lg font-semibold text-sky-700">Professional</h3>
              <button 
                onClick={() => setShowProfessionalModal(true)} 
                className="text-sky-500"
              >
                <Pencil size={18} />
              </button>
            </div>
            
            {profileData.professional.length > 0 ? (
              <div className="space-y-4">
                {profileData.professional.map((prof, index) => (
                  <div key={index} className="border-l-4 border-sky-500 pl-4">
                    {prof.barCouncilNumber && (
                      <p className="text-sm text-gray-600">Bar Council Number: {prof.barCouncilNumber}</p>
                    )}
                    {prof.practiceArea && (
                      <p className="text-sm text-gray-600">Practice Area: {prof.practiceArea}</p>
                    )}
                    {prof.extraCertificates && (
                      <p className="text-sm text-gray-600">Extra Certificates: {prof.extraCertificates}</p>
                    )}
                    {prof.languages && (
                      <p className="text-sm text-gray-600">Languages Known: {prof.languages}</p>
                    )}
                  </div>
                ))}
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
              <h3 className="text-lg font-semibold text-sky-700">Experience</h3>
              <button 
                onClick={() => setShowExperienceModal(true)} 
                className="text-sky-500"
              >
                <Pencil size={18} />
              </button>
            </div>
            
            {profileData.experience.length > 0 ? (
              <div className="space-y-4">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-sky-500 pl-4">
                    {exp.yearsOfExperience && (
                      <p className="text-sm text-gray-600">Years of Experience: {exp.yearsOfExperience}</p>
                    )}
                    {exp.preferredLegalSection && (
                      <p className="text-sm text-gray-600">Preferred Legal Section: {exp.preferredLegalSection}</p>
                    )}
                    {exp.numberOfCases && (
                      <p className="text-sm text-gray-600">Number of Cases: {exp.numberOfCases}</p>
                    )}
                    {exp.numberOfCasesWon && (
                      <p className="text-sm text-gray-600">Number of Cases Solved: {exp.numberOfCasesWon}</p>
                    )}
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