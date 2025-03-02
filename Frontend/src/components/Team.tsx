
const Team = () => {
  const teamMembers = [
    {
      name: "Arjun Dutta",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Sattik Das",
      role: "Co-Founder & CTO",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Sneha Shaw",
      role: "CMO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Somdutta Biswas",
      role: "Co-Founder & Logistics",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const advisors = [
    {
      name: "Abhinab Das",
      role: "Co-Founder & EiR",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Shalini Biswas",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="team" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="fade-in-section">
          <h2 className="section-title">
            Our <span className="gradient-text">Team</span>
          </h2>
          <p className="section-subtitle">
            Meet the passionate individuals driving agricultural innovation
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Full-time Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="fade-in-section">
                <div className="card text-center group">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-green-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Part-time Team & Advisors</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {advisors.map((advisor, index) => (
                <div key={index} className="fade-in-section">
                  <div className="card text-center group">
                    <div className="w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full">
                      <img 
                        src={advisor.image} 
                        alt={advisor.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{advisor.name}</h3>
                    <p className="text-green-600">{advisor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;