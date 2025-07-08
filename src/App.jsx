import { useState, useEffect } from 'react';

// Config with real faucets and chains
const config = {
  chains: [
    { 
      id: 'ethereum-goerli', 
      name: 'Ethereum Goerli', 
      logo: 'https://ethereum.org/img/icons/eth-logo.svg ' 
    },
    { 
      id: 'polygon-mumbai', 
      name: 'Polygon Mumbai', 
      logo: 'https://matic.network/icons/matic.svg ' 
    },
    { 
      id: 'binance-testnet', 
      name: 'Binance Smart Chain Testnet', 
      logo: 'https://bscstorage.org/static/media/logo.b6e91f8d.svg ' 
    },
    { 
      id: 'avalanche-fuji', 
      name: 'Avalanche Fuji', 
      logo: 'https://www.avax.network/images/logo-avax.svg ' 
    },
    { 
      id: 'fantom-testnet', 
      name: 'Fantom Testnet', 
      logo: 'https://ftmscan.com/images/svg/ftm_dark.svg ' 
    },
    { 
      id: 'arbitrum-goerli', 
      name: 'Arbitrum Goerli', 
      logo: 'https://offchainlabs.dev/img/arbitrum-logo.svg ' 
    },
    { 
      id: 'optimism-goerli', 
      name: 'Optimism Goerli', 
      logo: 'https://oplabscrypto.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F547cfb52-dba7-4712-ba77-5e3d3ff71fe2%2F5cb1ce0c-e379-49c2-a650-4edddc4c5676%2FOptimism.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT72L2GQZFYV52VRM%2F20240405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240405T021956Z&X-Amz-Expires=3600&X-Amz-Signature=9c9f55051131795246f201988e7d6118633562753826716959f6e903d6002e60&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3DUTF-8%27%27logo.png&x-id=GetObject'
    }
  ],
  faucets: [
    {
      chainId: 'ethereum-goerli',
      name: 'Goerli Faucet - Alchemy',
      description: 'Get free ETH on Ethereum Goerli using Alchemy',
      url: ' https://faucets.alchemy.com/ ',
      lastUpdated: '2024-04-01'
    },
    {
      chainId: 'ethereum-goerli',
      name: 'Goerli Faucet - Paradigm',
      description: 'Fast faucet for Ethereum Goerli testnet',
      url: 'https://faucet.paradigm.xyz/ ',
      lastUpdated: '2024-03-25'
    },
    {
      chainId: 'polygon-mumbai',
      name: 'Polygon Faucet',
      description: 'Get test MATIC tokens for Polygon Mumbai',
      url: 'https://faucet.polygon.technology/ ',
      lastUpdated: '2024-04-01'
    },
    {
      chainId: 'binance-testnet',
      name: 'BSC Testnet Faucet',
      description: 'Receive BNB test tokens for Binance Smart Chain testnet',
      url: 'https://testnet.binance.org/faucet-smart ',
      lastUpdated: '2024-03-30'
    },
    {
      chainId: 'avalanche-fuji',
      name: 'Avalanche Fuji Faucet',
      description: 'Test AVAX tokens faucet for Avalanche Fuji testnet',
      url: 'https://faucet.avax-test.network/ ',
      lastUpdated: '2024-03-28'
    },
    {
      chainId: 'fantom-testnet',
      name: 'Fantom Testnet Faucet',
      description: 'Get FTM test tokens for Fantom testnet',
      url: 'https://evm.fantom.foundation/ ',
      lastUpdated: '2024-03-20'
    },
    {
      chainId: 'arbitrum-goerli',
      name: 'Arbitrum Goerli Faucet',
      description: 'ETH faucet for Arbitrum Goerli testnet',
      url: 'https://faucet.arbitrum.io/ ',
      lastUpdated: '2024-03-15'
    },
    {
      chainId: 'optimism-goerli',
      name: 'Optimism Goerli Faucet',
      description: 'Get OP tokens for Optimism Goerli testnet',
      url: 'https://app.optimism.io/faucet ',
      lastUpdated: '2024-03-10'
    }
  ]
};

export default function App() {
  const [selectedChain, setSelectedChain] = useState('');
  const [faucets, setFaucets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize data
  useEffect(() => {
    setFaucets(config.faucets);
  }, []);

  // Filter faucets based on selected chain and search query
  const filteredFaucets = faucets.filter(faucet => {
    const matchesChain = selectedChain ? faucet.chainId === selectedChain : true;
    const matchesSearch = searchQuery 
      ? faucet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faucet.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesChain && matchesSearch;
  });

  // Google Analytics Tracking ID (replace with yours)
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your GA4 ID

  // Inject Google Analytics script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    // Track page view
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  // SEO Meta Tags + Structured Data
  useEffect(() => {
    const siteUrl = " https://your-site.vercel.app "; // Replace with your live URL after deployment
    document.title = "Testnet Faucet Hub - Get Free Crypto Testnet Tokens";
    
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Discover and access testnet faucets for all major blockchain networks. Get free test tokens for Ethereum, Polygon, Binance, Avalanche, Fantom and more.";

    // Open Graph tags
    const ogTitle = document.querySelector("meta[property='og:title']") || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = "Testnet Faucet Hub - Get Free Crypto Testnet Tokens";
    document.head.appendChild(ogTitle);

    const ogDescription = document.querySelector("meta[property='og:description']") || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = "Discover and access testnet faucets for all major blockchain networks.";
    document.head.appendChild(ogDescription);

    const ogImage = document.querySelector("meta[property='og:image']") || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.content = "https://placehold.co/600x400?text=Testnet+Faucet+Hub";
    document.head.appendChild(ogImage);

    const ogUrl = document.querySelector("meta[property='og:url']") || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.content = siteUrl;
    document.head.appendChild(ogUrl);

    // Structured Data (JSON-LD)
    const schemaOrgJsonLd = `
    {
      "@context": " https://schema.org ",
      "@type": "WebSite",
      "url": "${siteUrl}",
      "name": "Testnet Faucet Hub",
      "description": "Discover and access testnet faucets for all major blockchain networks.",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${siteUrl}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Testnet Faucet Hub",
        "logo": {
          "@type": "ImageObject",
          "url": "https://placehold.co/128x128?text=Logo"
        }
      }
    }
    `;

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.innerHTML = schemaOrgJsonLd;
    document.head.appendChild(script);

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-30 backdrop-blur-md sticky top-0 z-50 border-b border-purple-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Testnet Faucet Hub</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-purple-300 transition-colors">Home</a>
            <a href="#" className="hover:text-purple-300 transition-colors">About</a>
            <a href="#" className="hover:text-purple-300 transition-colors">Contact</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
            Get Free Testnet Crypto Tokens
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Access testnet faucets for all major blockchain networks. Perfect for developers and testers.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search faucets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 pl-10 rounded-lg bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all appearance-none"
              >
                <option value="">All Chains</option>
                {config.chains.map(chain => (
                  <option key={chain.id} value={chain.id}>{chain.name}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Faucet Cards */}
        <div className="max-w-6xl mx-auto">
          {filteredFaucets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaucets.map((faucet, index) => {
                const chainInfo = config.chains.find(c => c.id === faucet.chainId);
                return (
                  <div 
                    key={index} 
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <img src={chainInfo.logo} alt={chainInfo.name} className="w-8 h-8 rounded-full mr-3" />
                        <span className="font-medium">{chainInfo.name}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{faucet.name}</h3>
                      <p className="text-gray-300 mb-4">{faucet.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <a 
                          href={faucet.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all"
                        >
                          Visit Faucet
                          <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L15 12L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                        <span className="text-xs text-gray-500">
                          Updated: {faucet.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="mx-auto w-16 h-16 text-gray-600 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.172 14.828C9.562 15.218 9.562 15.85 9.172 16.24C8.782 16.63 8.149 16.63 7.759 16.24L4.928 13.409C4.538 13.019 4.538 12.387 4.928 11.997L11.997 4.928C12.387 4.538 13.019 4.538 13.409 4.928L16.24 7.759C16.63 8.149 16.63 8.782 16.24 9.172C15.85 9.562 15.218 9.562 14.828 9.172L9.172 14.828Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2H18V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="text-xl font-semibold mb-2">No faucets found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-30 backdrop-blur-md mt-24 pt-12 pb-6 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-bold">Testnet Faucet Hub</span>
              </div>
              <p className="text-gray-400 mt-2">Your one-stop destination for crypto testnet faucets.</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Testnet Faucet Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}