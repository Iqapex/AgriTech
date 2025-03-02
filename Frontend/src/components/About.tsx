const About = () => {
    return (
      <section id="about" className="section-padding bg-white p-6 sm:p-8 md:p-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Title and Subtitle */}
          <div className="fade-in-section text-center sm:text-left">
            <h2 className="section-title text-3xl sm:text-4xl font-bold mb-4">
              About <span className="gradient-text">Green Life IQPONICS</span>
            </h2>
            <p className="section-subtitle text-gray-600 text-lg sm:text-xl">
              A leading Agri-tech innovation platform dedicated to solving farmer supply-demand challenges
            </p>
          </div>
  
          {/* Grid Layout for Image and Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mt-8 sm:mt-12">
            {/* Image Section */}
            <div className="fade-in-section order-2 md:order-1">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Sustainable Farming" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-green-700 font-bold text-xl">500+</p>
                  <p className="text-gray-600 text-sm">Associated Farmers</p>
                </div>
              </div>
            </div>
  
            {/* Content Section */}
            <div className="fade-in-section order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                Our company is dedicated to solving farmer supply-demand challenges and ensuring fair pricing for their produce. 
                We provide comprehensive support through our cutting-edge technology platform for market linkage with traceability.
              </p>
              
              {/* Features List */}
              <div className="space-y-4">
                {/* Tech Support */}
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Tech Support</h4>
                    <p className="text-gray-600">Access to cutting-edge agricultural technology and support</p>
                  </div>
                </div>
                
                {/* Agricultural Doctors */}
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Agricultural Doctors</h4>
                    <p className="text-gray-600">Expert advice from agricultural specialists</p>
                  </div>
                </div>
                
                {/* Farming Cost Analysis */}
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Farming Cost Analysis</h4>
                    <p className="text-gray-600">Tools to analyze and optimize farming costs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;