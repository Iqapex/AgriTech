const About = () => {
    return (
      <section id="about" className="section-padding bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and Subtitle */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              About <span className="gradient-text">Green Life IQPONICS</span>
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto">
              A leading Agri-tech innovation platform dedicated to solving farmer supply-demand challenges
            </p>
          </div>
  
          {/* Grid Layout for Image and Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Section */}
            <div className="relative md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Sustainable Farming" 
                className="rounded-lg shadow-xl w-full md:h-[580px] h-auto object-cover md:max-w-none"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg animate-float">
                <p className="text-green-700 font-bold text-xl">500+</p>
                <p className="text-gray-600 text-sm">Associated Farmers</p>
              </div>
            </div>
  
            {/* Content Section */}
            <div className="lg:order-2">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Our Mission</h3>
              <p className="text-gray-600 mb-8 text-lg sm:text-xl">
                Our company is dedicated to solving farmer supply-demand challenges and ensuring fair pricing for their produce. 
                We provide comprehensive support through our cutting-edge technology platform for market linkage with traceability.
              </p>
              
              {/* Features List */}
              <div className="space-y-6">
                {/* Tech Support */}
                <div className="flex items-start hover:bg-green-200 p-4 rounded-lg transition-all duration-300">
                  <div className="bg-green-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg sm:text-xl">Tech Support</h4>
                    <p className="text-gray-600">Access to cutting-edge agricultural technology and support</p>
                  </div>
                </div>
                
                {/* Agricultural Doctors */}
                <div className="flex items-start hover:bg-green-200 p-4 rounded-lg transition-all duration-300">
                  <div className="bg-green-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg sm:text-xl">Agricultural Doctors</h4>
                    <p className="text-gray-600">Expert advice from agricultural specialists</p>
                  </div>
                </div>
                
                {/* Farming Cost Analysis */}
                <div className="flex items-start hover:bg-green-200 p-4 rounded-lg transition-all duration-300">
                  <div className="bg-green-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg sm:text-xl">Farming Cost Analysis</h4>
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