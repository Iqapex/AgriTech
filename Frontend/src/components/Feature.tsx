import { BarChart3, ShieldCheck, Users, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <BarChart3 size={24} />,
      title: "Market Linkage",
      description: "Connect farmers directly with buyers, eliminating middlemen and ensuring fair prices for agricultural produce."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Traceability",
      description: "Track products from farm to table with blockchain technology, ensuring transparency and building consumer trust."
    },
    {
      icon: <Zap size={24} />,
      title: "Price Prediction",
      description: "Leverage AI and machine learning to forecast market prices, helping farmers make informed decisions."
    },
    {
      icon: <Users size={24} />,
      title: "Agricultural Advisory",
      description: "Access expert advice from agricultural specialists and AI-powered recommendations for optimal farming practices."
    }
  ];

  return (
    <section id="features" className="section-padding bg-green-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="fade-in-section">
          <h2 className="section-title">
            Our <span className="gradient-text">Value Proposition</span>
          </h2>
          <p className="section-subtitle">
            Implementing better agricultural practices using our Agri-tech platform, empowering farmers with advanced techniques and methodologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="card fade-in-section">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;