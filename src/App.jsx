import { useState, useEffect } from 'react';

// Config with real faucets and chains
const config = {
chains: [
  { id: 'ethereum-goerli', name: 'Ethereum Goerli', logo: '/images/ethereum-eth-logo.png' },
  { id: 'polygon-mumbai', name: 'Polygon Mumbai', logo: '/images/polygon-matic-logo.png' },
  { id: 'binance-testnet', name: 'Binance Smart Chain Testnet', logo: '/images/bnb-bnb-logo.png' },
  { id: 'avalanche-fuji', name: 'Avalanche Fuji', logo: '/images/avalanche-avax-logo.png' },
  { id: 'fantom-testnet', name: 'Fantom Testnet', logo: '/images/fantom-ftm-logo.png' },
  { id: 'arbitrum-goerli', name: 'Arbitrum Goerli', logo: '/images/arbitrum-arb-logo.png' },
  { id: 'optimism-goerli', name: 'Optimism Goerli', logo: '/images/optimism-ethereum-op-logo.png' },
  { id: 'solana-devnet', name: 'Solana Devnet', logo: '/images/solana-sol-logo.png' },
  { id: 'cardano-testnet', name: 'Cardano Testnet', logo: '/images/cardano-ada-logo.png' },
  { id: 'near-testnet', name: 'NEAR Testnet', logo: '/images/near-protocol-near-logo.png' },
  { id: 'harmony-testnet', name: 'Harmony Testnet', logo: '/images/harmony-one-logo.png' },
  { id: 'celo-alfajores', name: 'Celo Alfajores', logo: '/images/celo-celo-logo.png' },
  { id: 'algorand-testnet', name: 'Algorand Testnet', logo: '/images/algorand-algo-logo.png' },
  { id: 'tezos-testnet', name: 'Tezos Testnet', logo: '/images/tezos-xtz-logo.png' },
  { id: 'flow-testnet', name: 'Flow Testnet', logo: '/images/flow-flow-logo.png' },
  { id: 'starknet-testnet', name: 'StarkNet Testnet', logo: '/images/starknet-strk-logo.png' }
],
  faucets: [
    { chainId: 'ethereum-goerli', name: 'Goerli Faucet - Alchemy', description: 'Get free ETH on Ethereum Goerli using Alchemy', url: ' https://faucets.alchemy.com/ ', lastUpdated: '2024-04-01' },
    { chainId: 'ethereum-goerli', name: 'Goerli Faucet - Paradigm', description: 'Fast faucet for Ethereum Goerli testnet', url: 'https://faucet.paradigm.xyz/ ', lastUpdated: '2024-03-25' },
    { chainId: 'polygon-mumbai', name: 'Polygon Faucet', description: 'Get test MATIC tokens for Polygon Mumbai testnet', url: 'https://faucet.polygon.technology/ ', lastUpdated: '2024-04-01' },
    { chainId: 'binance-testnet', name: 'BSC Testnet Faucet', description: 'Receive BNB test tokens for Binance Smart Chain testnet', url: 'https://testnet.binance.org/faucet-smart ', lastUpdated: '2024-03-30' },
    { chainId: 'avalanche-fuji', name: 'Avalanche Fuji Faucet', description: 'Test AVAX tokens faucet for Avalanche Fuji testnet', url: 'https://faucet.avax-test.network/ ', lastUpdated: '2024-03-28' },
    { chainId: 'fantom-testnet', name: 'Fantom Testnet Faucet', description: 'Get FTM test tokens for Fantom testnet', url: 'https://evm.fantom.foundation/ ', lastUpdated: '2024-03-20' },
    { chainId: 'arbitrum-goerli', name: 'Arbitrum Goerli Faucet', description: 'ETH faucet for Arbitrum Goerli testnet', url: 'https://faucet.arbitrum.io/ ', lastUpdated: '2024-03-15' },
    { chainId: 'optimism-goerli', name: 'Optimism Goerli Faucet', description: 'Get OP tokens for Optimism Goerli testnet', url: 'https://app.optimism.io/faucet ', lastUpdated: '2024-03-10' },

    // Add these faucets to your existing config.faucets array:

// More Ethereum Goerli faucets
{ chainId: 'ethereum-goerli', name: 'Goerli PoW Faucet', description: 'Proof of Work faucet for Ethereum Goerli', url: 'https://goerli-faucet.pk910.de/', lastUpdated: '2024-03-28' },
{ chainId: 'ethereum-goerli', name: 'Chainlink Goerli Faucet', description: 'Get ETH and LINK tokens for Goerli', url: 'https://faucets.chain.link/goerli', lastUpdated: '2024-03-26' },
{ chainId: 'ethereum-goerli', name: 'QuickNode Goerli Faucet', description: 'Fast and reliable Goerli ETH faucet', url: 'https://faucet.quicknode.com/ethereum/goerli', lastUpdated: '2024-03-24' },
{ chainId: 'ethereum-goerli', name: 'Infura Goerli Faucet', description: 'Infura powered Goerli testnet faucet', url: 'https://www.infura.io/faucet/goerli', lastUpdated: '2024-03-22' },
{ chainId: 'ethereum-goerli', name: 'Moralis Goerli Faucet', description: 'Get Goerli ETH via Moralis', url: 'https://moralis.io/faucet/', lastUpdated: '2024-03-20' },

// More Polygon Mumbai faucets
{ chainId: 'polygon-mumbai', name: 'Alchemy Polygon Faucet', description: 'Alchemy powered Mumbai testnet faucet', url: 'https://mumbaifaucet.com/', lastUpdated: '2024-03-30' },
{ chainId: 'polygon-mumbai', name: 'QuickNode Mumbai Faucet', description: 'Get MATIC tokens for Mumbai testnet', url: 'https://faucet.quicknode.com/polygon/mumbai', lastUpdated: '2024-03-28' },
{ chainId: 'polygon-mumbai', name: 'Polygon Faucet 2', description: 'Alternative Mumbai MATIC faucet', url: 'https://faucet.matic.network/', lastUpdated: '2024-03-26' },
{ chainId: 'polygon-mumbai', name: 'Paradigm Mumbai Faucet', description: 'Fast Mumbai testnet faucet', url: 'https://faucet.paradigm.xyz/mumbai', lastUpdated: '2024-03-24' },
{ chainId: 'polygon-mumbai', name: 'All That Node Mumbai', description: 'Mumbai faucet by All That Node', url: 'https://www.allthatnode.com/faucet/polygon.dsrv', lastUpdated: '2024-03-22' },

// More Binance Smart Chain faucets
{ chainId: 'binance-testnet', name: 'BSC Testnet Faucet 2', description: 'Alternative BNB testnet faucet', url: 'https://testnet.bnbchain.org/faucet-smart', lastUpdated: '2024-03-28' },
{ chainId: 'binance-testnet', name: 'QuickNode BSC Faucet', description: 'Get BNB for BSC testnet', url: 'https://faucet.quicknode.com/binance-smart-chain/bnb-testnet', lastUpdated: '2024-03-26' },
{ chainId: 'binance-testnet', name: 'Moralis BSC Faucet', description: 'BSC testnet faucet via Moralis', url: 'https://moralis.io/faucet/bsc-testnet/', lastUpdated: '2024-03-24' },
{ chainId: 'binance-testnet', name: 'All That Node BSC', description: 'BSC testnet faucet by All That Node', url: 'https://www.allthatnode.com/faucet/bsc.dsrv', lastUpdated: '2024-03-22' },

// More Avalanche Fuji faucets
{ chainId: 'avalanche-fuji', name: 'Avalanche Core Faucet', description: 'Official Avalanche Core wallet faucet', url: 'https://core.app/tools/testnet-faucet/', lastUpdated: '2024-03-28' },
{ chainId: 'avalanche-fuji', name: 'All That Node Fuji', description: 'Fuji testnet faucet by All That Node', url: 'https://www.allthatnode.com/faucet/avalanche.dsrv', lastUpdated: '2024-03-26' },
{ chainId: 'avalanche-fuji', name: 'ChainLink Fuji Faucet', description: 'Get AVAX and LINK for Fuji testnet', url: 'https://faucets.chain.link/fuji', lastUpdated: '2024-03-24' },
{ chainId: 'avalanche-fuji', name: 'Paradigm Fuji Faucet', description: 'Fast Fuji testnet faucet', url: 'https://faucet.paradigm.xyz/fuji', lastUpdated: '2024-03-22' },

// More Fantom testnet faucets
{ chainId: 'fantom-testnet', name: 'Fantom Testnet Faucet 2', description: 'Alternative FTM testnet faucet', url: 'https://faucet.fantom.network/', lastUpdated: '2024-03-26' },
{ chainId: 'fantom-testnet', name: 'SpookySwap Faucet', description: 'Get FTM from SpookySwap', url: 'https://faucet.spookyswap.finance/', lastUpdated: '2024-03-24' },
{ chainId: 'fantom-testnet', name: 'All That Node Fantom', description: 'Fantom testnet faucet by All That Node', url: 'https://www.allthatnode.com/faucet/fantom.dsrv', lastUpdated: '2024-03-22' },

// More Arbitrum Goerli faucets
{ chainId: 'arbitrum-goerli', name: 'Arbitrum Bridge Faucet', description: 'Bridge ETH to Arbitrum Goerli', url: 'https://bridge.arbitrum.io/', lastUpdated: '2024-03-24' },
{ chainId: 'arbitrum-goerli', name: 'Paradigm Arbitrum Faucet', description: 'Fast Arbitrum Goerli faucet', url: 'https://faucet.paradigm.xyz/arbitrum', lastUpdated: '2024-03-22' },
{ chainId: 'arbitrum-goerli', name: 'QuickNode Arbitrum Faucet', description: 'Get ETH for Arbitrum Goerli', url: 'https://faucet.quicknode.com/arbitrum/goerli', lastUpdated: '2024-03-20' },

// More Optimism Goerli faucets
{ chainId: 'optimism-goerli', name: 'Optimism Superchain Faucet', description: 'Superchain testnet faucet', url: 'https://console.optimism.io/faucet', lastUpdated: '2024-03-22' },
{ chainId: 'optimism-goerli', name: 'Paradigm Optimism Faucet', description: 'Fast Optimism Goerli faucet', url: 'https://faucet.paradigm.xyz/optimism', lastUpdated: '2024-03-20' },
{ chainId: 'optimism-goerli', name: 'QuickNode Optimism Faucet', description: 'Get ETH for Optimism Goerli', url: 'https://faucet.quicknode.com/optimism/goerli', lastUpdated: '2024-03-18' },

// Additional chains and their faucets
{ chainId: 'solana-devnet', name: 'Solana Devnet Faucet', description: 'Get SOL tokens for Solana devnet', url: 'https://faucet.solana.com/', lastUpdated: '2024-03-30' },
{ chainId: 'solana-devnet', name: 'QuickNode Solana Faucet', description: 'Fast Solana devnet faucet', url: 'https://faucet.quicknode.com/solana/devnet', lastUpdated: '2024-03-28' },
{ chainId: 'solana-devnet', name: 'All That Node Solana', description: 'Solana devnet faucet by All That Node', url: 'https://www.allthatnode.com/faucet/solana.dsrv', lastUpdated: '2024-03-26' },

{ chainId: 'cardano-testnet', name: 'Cardano Testnet Faucet', description: 'Get ADA for Cardano testnet', url: 'https://testnets.cardano.org/en/testnets/cardano/tools/faucet/', lastUpdated: '2024-03-28' },
{ chainId: 'cardano-testnet', name: 'Cardano Faucet 2', description: 'Alternative Cardano testnet faucet', url: 'https://faucet.preprod.worldofcardano.io/', lastUpdated: '2024-03-26' },

{ chainId: 'near-testnet', name: 'NEAR Testnet Faucet', description: 'Get NEAR tokens for testnet', url: 'https://near-faucet.io/', lastUpdated: '2024-03-30' },
{ chainId: 'near-testnet', name: 'NEAR Wallet Faucet', description: 'Official NEAR wallet faucet', url: 'https://wallet.testnet.near.org/', lastUpdated: '2024-03-28' },

{ chainId: 'harmony-testnet', name: 'Harmony Testnet Faucet', description: 'Get ONE tokens for Harmony testnet', url: 'https://faucet.pops.one/', lastUpdated: '2024-03-26' },
{ chainId: 'harmony-testnet', name: 'Harmony Faucet 2', description: 'Alternative Harmony testnet faucet', url: 'https://faucet.harmony.one/', lastUpdated: '2024-03-24' },

{ chainId: 'celo-alfajores', name: 'Celo Alfajores Faucet', description: 'Get CELO tokens for Alfajores testnet', url: 'https://faucet.celo.org/', lastUpdated: '2024-03-28' },
{ chainId: 'celo-alfajores', name: 'Celo Faucet 2', description: 'Alternative Celo testnet faucet', url: 'https://celo.org/developers/faucet', lastUpdated: '2024-03-26' },

{ chainId: 'algorand-testnet', name: 'Algorand Testnet Faucet', description: 'Get ALGO tokens for testnet', url: 'https://testnet.algoexplorer.io/dispenser', lastUpdated: '2024-03-30' },
{ chainId: 'algorand-testnet', name: 'Algorand Dispenser', description: 'Official Algorand testnet dispenser', url: 'https://dispenser.testnet.aws.algodev.network/', lastUpdated: '2024-03-28' },

{ chainId: 'tezos-testnet', name: 'Tezos Testnet Faucet', description: 'Get XTZ tokens for Tezos testnet', url: 'https://faucet.tzalpha.net/', lastUpdated: '2024-03-26' },
{ chainId: 'tezos-testnet', name: 'Tezos Faucet 2', description: 'Alternative Tezos testnet faucet', url: 'https://faucet.marigold.dev/', lastUpdated: '2024-03-24' },

{ chainId: 'flow-testnet', name: 'Flow Testnet Faucet', description: 'Get FLOW tokens for testnet', url: 'https://testnet-faucet.onflow.org/', lastUpdated: '2024-03-28' },
{ chainId: 'flow-testnet', name: 'Flow Faucet 2', description: 'Alternative Flow testnet faucet', url: 'https://faucet.flow.com/', lastUpdated: '2024-03-26' },

{ chainId: 'starknet-testnet', name: 'StarkNet Testnet Faucet', description: 'Get ETH for StarkNet testnet', url: 'https://faucet.goerli.starknet.io/', lastUpdated: '2024-03-30' },
{ chainId: 'starknet-testnet', name: 'StarkNet Faucet 2', description: 'Alternative StarkNet testnet faucet', url: 'https://starknet-faucet.vercel.app/', lastUpdated: '2024-03-28' }
  ]
};

export default function App() {
  const [selectedChain, setSelectedChain] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [faucets, setFaucets] = useState(config.faucets);

  // SEO Meta Tags + Structured Data
  useEffect(() => {
    document.title = "Testnet Faucet Hub - Get Free Crypto Testnet Tokens";

    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Discover and access testnet faucets for all major blockchain networks.";

    const siteUrl = "https://your-site.vercel.app ";

    const ogTitle = document.querySelector("meta[property='og:title']") || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = "Testnet Faucet Hub - Get Free Crypto Testnet Tokens";
    document.head.appendChild(ogTitle);

    const ogDescription = document.querySelector("meta[property='og:description']") || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = "Discover and access testnet faucets for all major blockchain networks.";
    document.head.appendChild(ogDescription);

    const schemaOrgJsonLd = `
    {
      "@context": "https://schema.org ",
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

  const filteredFaucets = faucets.filter(faucet => {
    const matchesChain = selectedChain ? faucet.chainId === selectedChain : true;
    const matchesSearch = searchQuery
      ? faucet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faucet.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesChain && matchesSearch;
  });

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

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-purple-300 transition-colors">Home</a>
            <a href="#" className="hover:text-purple-300 transition-colors">About</a>
            <a href="#" className="hover:text-purple-300 transition-colors">Contact</a>
          </nav>
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
            <div className="md:col-span-2 relative">
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
            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none appearance-none"
            >
              <option value="">All Chains</option>
              {config.chains.map(chain => (
                <option key={chain.id} value={chain.id}>{chain.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Faucet Cards */}
        <div className="max-w-6xl mx-auto">
          {filteredFaucets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaucets.map((faucet, index) => {
                const chainInfo = config.chains.find(c => c.id === faucet.chainId);
                return (
                  <div key={index} className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <img src={chainInfo.logo} alt={chainInfo.name} className="w-8 h-8 rounded-full mr-3" />
                        <span className="font-medium">{chainInfo.name}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{faucet.name}</h3>
                      <p className="text-gray-300 mb-4">{faucet.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <a href={faucet.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all">
                          Visit Faucet
                          <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L15 12L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                        <span className="text-xs text-gray-500">Updated: {faucet.lastUpdated}</span>
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
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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