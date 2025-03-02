
const Achievements = () => {
  const stats = [
    { label: "Associated Farmers", value: "500+" },
    { label: "Surveyed Areas", value: "50+ Acres" },
    { label: "Vendor Contracts", value: "10" },
    { label: "Platform Interests", value: "50+" }
  ];

  const achievements = [
    {
      title: "Incubation Programme",
      description: "Offered by Institute of Data Engineering, Analytics & Science Foundation, Technology Innovation Hub (IDEAS-TIH) at Indian Statistical Institute, Kolkata"
    },
    {
      title: "Selected for KRISHIBOOT 6.0",
      description: "ICAR-NAARM, 3rd June, 2024 - Rajendranagar, Hyderabad"
    },
    {
      title: "Winner of STPI BLR CONTEST",
      description: "2nd July, 2024, Seed Funding Stage-1.0"
    }
  ];

  return (
    <section className="section-padding bg-green-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="fade-in-section">
          <h2 className="section-title">
            Our <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Milestones and recognition in our journey of agricultural innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="fade-in-section">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Metrics</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-green-100 hover:bg-green-200 transition-all duration-300">
                    <p className="text-3xl font-bold text-green-700">{stat.value}</p>
                    <p className="text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="fade-in-section">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Recognition</h3>
              
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4 py-2 rounded-md bg-green-100 hover:bg-green-200 transition-all duration-300">
                    <h4 className="text-lg font-semibold text-gray-800">{achievement.title}</h4>
                    <p className="text-gray-600 mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;