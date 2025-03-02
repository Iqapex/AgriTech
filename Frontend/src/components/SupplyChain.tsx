import { useState } from 'react';
import { Info } from 'lucide-react';

const SupplyChain = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  
  const supplyChainNodes = [
    { 
      id: 1, 
      title: "Farmers/Seeds", 
      description: "Farmers register crops with detailed information about cultivation practices, location, and harvest dates.",
      icon: "🌱"
    },
    { 
      id: 2, 
      title: "Processor", 
      description: "Processing facilities record quality checks, batch IDs, and processing methods in the blockchain.",
      icon: "⚙️"
    },
    { 
      id: 3, 
      title: "Logistics", 
      description: "Transportation details including timestamps, routes, and handling conditions are tracked in real-time.",
      icon: "🚚"
    },
    { 
      id: 4, 
      title: "Buyer", 
      description: "Buyers can verify product origin, quality, and journey before making purchasing decisions.",
      icon: "💼"
    },
    { 
      id: 5, 
      title: "Distributor", 
      description: "Distribution centers log storage conditions, inventory management, and outbound shipments.",
      icon: "🏭"
    },
    { 
      id: 6, 
      title: "Retailer", 
      description: "Retailers scan products to confirm authenticity and provide customers with product journey information.",
      icon: "🏪"
    },
    { 
      id: 7, 
      title: "Consumer", 
      description: "Consumers can scan QR codes to view the complete journey of their food from farm to table.",
      icon: "👨‍👩‍👧"
    }
  ];

  return (
    <section className="section-padding bg-blue-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="fade-in-section">
          <h2 className="section-title text-white">
            <span className="text-green-300">Supply Chain</span> Value Chain
          </h2>
          <p className="section-subtitle text-blue-100">
            Organized, Connected, Secured, Auditable, Verifiable information on the Blockchain
          </p>
        </div>

        <div className="fade-in-section mt-12">
          <div className="relative rounded-xl bg-blue-800 p-6 shadow-xl">
            {/* Supply Chain Flow */}
            <div className="flex flex-wrap justify-between items-center mb-12 relative">
              {/* Connecting Line */}
              <div className="absolute top-12 left-0 right-0 h-1 bg-green-400 z-0 hidden md:block"></div>
              
              {supplyChainNodes.map((node) => (
                <div 
                  key={node.id} 
                  className="flex flex-col items-center mb-8 md:mb-0 relative z-10"
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <div 
                    className={`w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center mb-3 transition-all duration-300 cursor-pointer ${activeNode === node.id ? 'bg-green-500 scale-110 shadow-lg' : 'hover:bg-blue-600'}`}
                  >
                    <span className="text-4xl">{node.icon}</span>
                  </div>
                  <p className="text-sm font-medium text-center text-blue-100">{node.title}</p>
                  
                  {/* Info popup */}
                  <div 
                    className={`absolute top-full mt-2 bg-white text-gray-800 p-4 rounded-lg shadow-xl w-64 transition-all duration-300 z-20 ${
                      activeNode === node.id ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                  >
                    <div className="flex items-start">
                      <Info size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-sm">{node.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Data Flow Visualization */}
            <div className="grid grid-cols-7 gap-2 mt-8">
              {supplyChainNodes.map((node) => (
                <div key={`data-${node.id}`} className="flex flex-col items-center">
                  <div className={`w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mb-2 transition-all duration-300 ${activeNode === node.id ? 'bg-green-500' : ''}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                    </svg>
                  </div>
                  <p className="text-xs text-blue-200 text-center">Data Point</p>
                </div>
              ))}
            </div>

            {/* Blockchain Representation */}
            <div className="mt-12 flex items-center justify-center">
              <div className="flex space-x-2 overflow-x-auto pb-4 max-w-full">
                {[1, 2, 3, 4, 5, 6].map((block) => (
                  <div 
                    key={`block-${block}`} 
                    className={`flex-shrink-0 w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center border-2 ${activeNode === block ? 'border-green-400' : 'border-blue-600'} transition-all duration-300`}
                  >
                    <span className="text-xs font-mono text-blue-200">BLOCK {block}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-blue-100 font-medium">
              Our blockchain-based supply chain ensures complete transparency and traceability from farm to table, 
              building trust among all stakeholders and ensuring quality at every step.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-blue-800 p-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                <h4 className="font-semibold text-green-300">Cultivation</h4>
                <p className="text-sm text-blue-200">Farm data recorded</p>
              </div>
              <div className="bg-blue-800 p-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                <h4 className="font-semibold text-green-300">Processing</h4>
                <p className="text-sm text-blue-200">Quality checks</p>
              </div>
              <div className="bg-blue-800 p-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                <h4 className="font-semibold text-green-300">Distribution</h4>
                <p className="text-sm text-blue-200">Logistics tracking</p>
              </div>
              <div className="bg-blue-800 p-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                <h4 className="font-semibold text-green-300">Retail</h4>
                <p className="text-sm text-blue-200">Consumer verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplyChain;