
const Solutions = () => {
  const solutions = [
    {
      number: "01",
      title: "Improve Agricultural Practices",
      description: "Implement advanced agricultural techniques and methodologies through our platform to enhance productivity and sustainability in farming operations."
    },
    {
      number: "02",
      title: "Facilitate Market Linkages",
      description: "Create a robust market linkage system to provide farmers with better access to markets, thereby increasing their opportunities for selling produce at fair prices with traceability."
    },
    {
      number: "03",
      title: "Enable Price Prediction",
      description: "Develop data-driven models for predicting mandi rates, empowering farmers with insights into market trends to make informed decisions about crop sales."
    },
    {
      number: "04",
      title: "Enhance Monitoring Capabilities",
      description: "Implement IoT tech for real-time monitoring of agricultural parameters such as humidity and weather forecasts, enabling proactive management of risks."
    }
  ];

  return (
    <section id="solutions" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="fade-in-section">
          <h2 className="section-title">
            Our <span className="gradient-text">Solutions</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive solutions designed to address the challenges faced by farmers and revolutionize agricultural practices
          </p>
        </div>

        <div className="space-y-8 mt-12">
          {solutions.map((solution, index) => (
            <div key={index} className="fade-in-section">
              <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl hover:bg-green-200 transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">
                    {solution.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{solution.title}</h3>
                  <p className="text-gray-600">{solution.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;