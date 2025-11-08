import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import GlassPanel from '../components/GlassPanel';
import Card from '../components/Card';
import Footer from '../components/Footer';
import '../styles/theme.css';

// Mock customer data (in real app, this would come from authentication)
const mockCustomerData = {
  id: 'CUST-2024-001',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@email.com',
  mobile: '+91 98765 43210',
  accountNumber: '1234567890',
  kycStatus: 'Approved',
  panNumber: 'ABCDE1234F',
  aadhaarNumber: '****-****-5678',
  address: '123 MG Road, Bangalore, Karnataka 560001',
  joinedDate: '15 Jan 2024',
  wallet: '0xA1b2C3d4E5f6G7h8I9j0',
};

const mockAssets = [
  {
    id: 'ASSET-001',
    type: 'Gold',
    quantity: '520g',
    value: '₹5,20,000',
    tokenized: true,
    tokens: 520,
    tokenSymbol: 'GOLD',
    purchaseDate: '10 Feb 2024',
    verificationDoc: 'Gold-Certificate.pdf',
    status: 'Active',
    listingStatus: 'Not Listed',
    matches: []
  },
  {
    id: 'ASSET-002',
    type: 'Mutual Funds',
    quantity: '280 Units',
    value: '₹2,80,000',
    tokenized: true,
    tokens: 280,
    tokenSymbol: 'MF',
    purchaseDate: '25 Mar 2024',
    verificationDoc: 'MF-Statement.pdf',
    status: 'Active',
    listingStatus: 'Listed',
    matches: [
      { buyer: 'Amit Patel', interest: 'Full Asset', offer: '₹2,85,000', status: 'Pending' },
      { buyer: 'Priya Sharma', interest: '50%', offer: '₹1,42,000', status: 'Pending' }
    ]
  },
  {
    id: 'ASSET-003',
    type: 'Real Estate',
    quantity: '250 sq ft',
    value: '₹12,50,000',
    tokenized: false,
    tokens: 0,
    tokenSymbol: 'RE',
    purchaseDate: '05 Jan 2024',
    verificationDoc: 'Property-Deed.pdf',
    status: 'Pending Verification',
    listingStatus: 'Not Listed',
    matches: []
  }
];

const mockLoans = [
  {
    id: 'LOAN-001',
    amount: '₹4,00,000',
    collateral: '520 GOLD',
    ltv: '77%',
    interestRate: '8.5%',
    tenure: '24 months',
    emi: '₹18,200',
    status: 'Active',
    disbursedDate: '15 Mar 2024',
    nextEmiDate: '15 Dec 2024',
    remainingEmis: 21
  }
];

export default function CustomerPortal(){
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ accountNumber: '', password: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [sellModal, setSellModal] = useState(false);
  const [sellForm, setSellForm] = useState({ price: '', percentage: '100' });

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo login - accept any account number with password "demo123"
    if (loginForm.password === 'demo123') {
      setIsLoggedIn(true);
    } else {
      alert('Demo credentials: Any account number with password "demo123"');
    }
  };

  const handleSellAsset = (asset) => {
    setSelectedAsset(asset);
    setSellForm({ price: asset.value.replace('₹', '').replace(',', ''), percentage: '100' });
    setSellModal(true);
  };

  const submitSellListing = () => {
    alert(`Asset listed for sale!\nAsset: ${selectedAsset.type}\nPercentage: ${sellForm.percentage}%\nPrice: ₹${sellForm.price}`);
    setSellModal(false);
  };

  if (!isLoggedIn) {
    return (
      <div style={{minHeight:'100vh',background:'#000',display:'flex',flexDirection:'column'}}>
        <NavBar />
        <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
          <div style={{width:'100%',maxWidth:'520px'}}>
            <GlassPanel style={{padding:'56px 48px',position:'relative',overflow:'hidden'}}>
              {/* Decorative Elements */}
              <div style={{
                position:'absolute',
                top:'-50px',
                right:'-50px',
                width:'200px',
                height:'200px',
                background:'radial-gradient(circle, rgba(199,255,58,0.08) 0%, transparent 70%)',
                borderRadius:'50%',
                pointerEvents:'none'
              }}></div>
              <div style={{
                position:'absolute',
                bottom:'-30px',
                left:'-30px',
                width:'150px',
                height:'150px',
                background:'radial-gradient(circle, rgba(155,225,43,0.06) 0%, transparent 70%)',
                borderRadius:'50%',
                pointerEvents:'none'
              }}></div>

              <div style={{textAlign:'center',marginBottom:40,position:'relative'}}>
                <div style={{
                  fontSize:'4rem',
                  marginBottom:20,
                  filter:'drop-shadow(0 4px 12px rgba(199,255,58,0.2))'
                }}>👤</div>
                <h2 style={{fontSize:'2.2rem',fontWeight:700,marginBottom:12,color:'#fff',letterSpacing:'-0.02em'}}>
                  Customer Portal
                </h2>
                <p className="small-muted" style={{fontSize:'1.05rem',lineHeight:1.6}}>
                  Manage your assets, view KYC details, and access loans
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div style={{marginBottom:24}}>
                  <label style={{display:'block',marginBottom:10,fontWeight:600,color:'#fff',fontSize:'0.95rem'}}>
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your account number"
                    value={loginForm.accountNumber}
                    onChange={(e) => setLoginForm({...loginForm, accountNumber: e.target.value})}
                    required
                    style={{
                      width:'100%',
                      padding:'16px 18px',
                      fontSize:'1rem',
                      background:'rgba(255,255,255,0.04)',
                      border:'1px solid rgba(255,255,255,0.12)',
                      borderRadius:12,
                      color:'#fff',
                      transition:'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  />
                </div>

                <div style={{marginBottom:32}}>
                  <label style={{display:'block',marginBottom:10,fontWeight:600,color:'#fff',fontSize:'0.95rem'}}>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    required
                    style={{
                      width:'100%',
                      padding:'16px 18px',
                      fontSize:'1rem',
                      background:'rgba(255,255,255,0.04)',
                      border:'1px solid rgba(255,255,255,0.12)',
                      borderRadius:12,
                      color:'#fff',
                      transition:'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  />
                  <div style={{marginTop:10,textAlign:'right'}}>
                    <a href="#" style={{fontSize:'0.9rem',color:'var(--accent)',textDecoration:'none'}}>
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn primary" 
                  style={{
                    width:'100%',
                    padding:'16px',
                    fontSize:'1.05rem',
                    fontWeight:600,
                    marginBottom:24,
                    background:'linear-gradient(135deg, var(--accent) 0%, #9be12b 100%)',
                    border:'none',
                    boxShadow:'0 4px 16px rgba(199,255,58,0.25)',
                    transition:'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 24px rgba(199,255,58,0.35)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 16px rgba(199,255,58,0.25)';
                  }}
                >
                  Login to Portal
                </button>

                <div style={{
                  padding:'16px',
                  background:'rgba(199,255,58,0.05)',
                  border:'1px solid rgba(199,255,58,0.15)',
                  borderRadius:12,
                  marginBottom:20
                }}>
                  <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.7)',marginBottom:6}}>
                    🔐 <strong style={{color:'#fff'}}>Demo Credentials</strong>
                  </div>
                  <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.6)'}}>
                    Account: <span style={{color:'var(--accent)',fontWeight:600,fontFamily:'monospace'}}>any number</span>
                    {' • '}
                    Password: <span style={{color:'var(--accent)',fontWeight:600,fontFamily:'monospace'}}>demo123</span>
                  </div>
                </div>

                <div style={{textAlign:'center',fontSize:'0.9rem',color:'var(--muted)'}}>
                  New customer? <a href="#" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600}}>Contact Bank</a>
                </div>
              </form>
            </GlassPanel>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div style={{minHeight:'100vh',background:'#000',paddingTop:'90px',display:'flex',flexDirection:'column'}}>
      <NavBar />
      <div style={{flex:1,padding:'40px 48px',maxWidth:'1400px',width:'100%',margin:'0 auto'}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:8,color:'#fff'}}>
            Welcome back, {mockCustomerData.name}
          </h1>
          <p className="small-muted" style={{fontSize:'1.05rem'}}>
            Account: {mockCustomerData.accountNumber} • Joined {mockCustomerData.joinedDate}
          </p>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:12,marginBottom:32,borderBottom:'1px solid rgba(255,255,255,0.1)',paddingBottom:12}}>
          {['overview', 'assets', 'kyc', 'loans', 'marketplace'].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'btn primary' : 'btn'}
              onClick={() => setActiveTab(tab)}
              style={{padding:'10px 24px',fontSize:'1rem',textTransform:'capitalize'}}
            >
              {tab === 'kyc' ? 'KYC Details' : tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,marginBottom:32}}>
              <Card>
                <div style={{fontSize:'2rem',marginBottom:8}}>💼</div>
                <div className="small-muted" style={{fontSize:'0.9rem',marginBottom:8}}>Total Assets Value</div>
                <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)'}}>₹20.5L</div>
              </Card>
              <Card>
                <div style={{fontSize:'2rem',marginBottom:8}}>🪙</div>
                <div className="small-muted" style={{fontSize:'0.9rem',marginBottom:8}}>Tokenized Assets</div>
                <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>800</div>
              </Card>
              <Card>
                <div style={{fontSize:'2rem',marginBottom:8}}>💰</div>
                <div className="small-muted" style={{fontSize:'0.9rem',marginBottom:8}}>Active Loans</div>
                <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>1</div>
              </Card>
              <Card>
                <div style={{fontSize:'2rem',marginBottom:8}}>✅</div>
                <div className="small-muted" style={{fontSize:'0.9rem',marginBottom:8}}>KYC Status</div>
                <div style={{fontSize:'1.3rem',fontWeight:700,color:'var(--accent)'}}>Approved</div>
              </Card>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24}}>
              <GlassPanel style={{padding:28}}>
                <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Your Assets</h3>
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  {mockAssets.map((asset) => (
                    <div key={asset.id} style={{
                      padding:20,
                      background:'rgba(255,255,255,0.02)',
                      borderRadius:12,
                      border:'1px solid rgba(255,255,255,0.06)'
                    }}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:12}}>
                        <div>
                          <div style={{fontSize:'1.15rem',fontWeight:600,color:'#fff',marginBottom:4}}>{asset.type}</div>
                          <div style={{fontSize:'0.9rem',color:'var(--muted)'}}>{asset.quantity}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <div style={{fontSize:'1.3rem',fontWeight:700,color:'var(--accent)'}}>{asset.value}</div>
                          {asset.tokenized && (
                            <div style={{fontSize:'0.85rem',color:'var(--muted)',marginTop:4}}>
                              {asset.tokens} {asset.tokenSymbol} tokens
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{display:'flex',gap:12,alignItems:'center'}}>
                        <span style={{
                          padding:'4px 10px',
                          borderRadius:6,
                          fontSize:'0.8rem',
                          fontWeight:600,
                          background: asset.status === 'Active' ? 'rgba(199,255,58,0.1)' : 'rgba(255,193,58,0.1)',
                          color: asset.status === 'Active' ? 'var(--accent)' : '#ffc13a'
                        }}>{asset.status}</span>
                        {asset.tokenized && (
                          <span style={{
                            padding:'4px 10px',
                            borderRadius:6,
                            fontSize:'0.8rem',
                            fontWeight:600,
                            background:'rgba(130,202,157,0.1)',
                            color:'#82ca9d'
                          }}>Tokenized</span>
                        )}
                        {asset.listingStatus === 'Listed' && (
                          <span style={{
                            padding:'4px 10px',
                            borderRadius:6,
                            fontSize:'0.8rem',
                            fontWeight:600,
                            background:'rgba(58,144,255,0.1)',
                            color:'#3a90ff'
                          }}>Listed for Sale</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel style={{padding:28}}>
                <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Quick Actions</h3>
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  <button className="btn primary" style={{width:'100%',padding:'14px',fontSize:'1rem'}} onClick={() => setActiveTab('assets')}>
                    📊 View All Assets
                  </button>
                  <button className="btn" style={{width:'100%',padding:'14px',fontSize:'1rem'}} onClick={() => setActiveTab('marketplace')}>
                    🏪 Browse Marketplace
                  </button>
                  <button className="btn" style={{width:'100%',padding:'14px',fontSize:'1rem'}} onClick={() => setActiveTab('loans')}>
                    💰 My Loans
                  </button>
                  <button className="btn" style={{width:'100%',padding:'14px',fontSize:'1rem'}} onClick={() => setActiveTab('kyc')}>
                    📋 KYC Details
                  </button>
                  <button className="btn" style={{width:'100%',padding:'14px',fontSize:'1rem',marginTop:12}} onClick={() => setIsLoggedIn(false)}>
                    🚪 Logout
                  </button>
                </div>
              </GlassPanel>
            </div>
          </>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div style={{display:'flex',flexDirection:'column',gap:24}}>
            {mockAssets.map((asset) => (
              <GlassPanel key={asset.id} style={{padding:28}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:24}}>
                  <div>
                    <h3 style={{fontSize:'1.6rem',fontWeight:700,color:'#fff',marginBottom:8}}>{asset.type}</h3>
                    <div style={{display:'flex',gap:12,alignItems:'center'}}>
                      <span style={{fontSize:'0.95rem',color:'var(--muted)'}}>ID: {asset.id}</span>
                      <span style={{
                        padding:'4px 10px',
                        borderRadius:6,
                        fontSize:'0.8rem',
                        fontWeight:600,
                        background: asset.status === 'Active' ? 'rgba(199,255,58,0.1)' : 'rgba(255,193,58,0.1)',
                        color: asset.status === 'Active' ? 'var(--accent)' : '#ffc13a'
                      }}>{asset.status}</span>
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)',marginBottom:4}}>{asset.value}</div>
                    {asset.tokenized && (
                      <div style={{fontSize:'0.95rem',color:'#82ca9d',fontWeight:600}}>
                        {asset.tokens} {asset.tokenSymbol} Tokens
                      </div>
                    )}
                  </div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:24}}>
                  <div>
                    <div className="small-muted" style={{marginBottom:6}}>Quantity</div>
                    <div style={{fontSize:'1.05rem',fontWeight:600,color:'#fff'}}>{asset.quantity}</div>
                  </div>
                  <div>
                    <div className="small-muted" style={{marginBottom:6}}>Purchase Date</div>
                    <div style={{fontSize:'1.05rem',fontWeight:600,color:'#fff'}}>{asset.purchaseDate}</div>
                  </div>
                  <div>
                    <div className="small-muted" style={{marginBottom:6}}>Verification</div>
                    <div style={{fontSize:'1.05rem',fontWeight:600,color:'#fff'}}>{asset.verificationDoc}</div>
                  </div>
                </div>

                <div style={{display:'flex',gap:12,marginBottom:20}}>
                  {asset.status === 'Active' && asset.tokenized && asset.listingStatus === 'Not Listed' && (
                    <button className="btn primary" onClick={() => handleSellAsset(asset)}>
                      🏷️ List for Sale
                    </button>
                  )}
                  {asset.listingStatus === 'Listed' && (
                    <button className="btn" style={{background:'rgba(255,100,100,0.1)',color:'#ff6464'}}>
                      ❌ Remove Listing
                    </button>
                  )}
                  <button className="btn">📄 View Certificate</button>
                  <button className="btn">📊 Transaction History</button>
                </div>

                {/* Matches Section */}
                {asset.matches && asset.matches.length > 0 && (
                  <div style={{
                    marginTop:20,
                    paddingTop:20,
                    borderTop:'1px solid rgba(255,255,255,0.1)'
                  }}>
                    <h4 style={{fontSize:'1.2rem',fontWeight:700,color:'#fff',marginBottom:16}}>
                      🎯 Interested Buyers ({asset.matches.length})
                    </h4>
                    <div style={{display:'flex',flexDirection:'column',gap:12}}>
                      {asset.matches.map((match, i) => (
                        <div key={i} style={{
                          padding:16,
                          background:'rgba(58,144,255,0.05)',
                          border:'1px solid rgba(58,144,255,0.2)',
                          borderRadius:12
                        }}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <div>
                              <div style={{fontSize:'1.05rem',fontWeight:600,color:'#fff',marginBottom:4}}>
                                👤 {match.buyer}
                              </div>
                              <div style={{fontSize:'0.9rem',color:'var(--muted)'}}>
                                Interested in: <span style={{color:'#fff',fontWeight:600}}>{match.interest}</span>
                              </div>
                            </div>
                            <div style={{textAlign:'right'}}>
                              <div style={{fontSize:'1.2rem',fontWeight:700,color:'var(--accent)',marginBottom:8}}>
                                {match.offer}
                              </div>
                              <div style={{display:'flex',gap:8}}>
                                <button className="btn primary" style={{padding:'8px 16px',fontSize:'0.9rem'}}>
                                  ✓ Accept
                                </button>
                                <button className="btn" style={{padding:'8px 16px',fontSize:'0.9rem'}}>
                                  ✕ Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassPanel>
            ))}
          </div>
        )}

        {/* KYC Tab */}
        {activeTab === 'kyc' && (
          <GlassPanel style={{padding:40}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:32}}>
              <div>
                <h3 style={{fontSize:'1.8rem',fontWeight:700,color:'#fff',marginBottom:8}}>KYC Details</h3>
                <div className="small-muted">Your verified identity information</div>
              </div>
              <span style={{
                padding:'10px 20px',
                borderRadius:10,
                fontSize:'1rem',
                fontWeight:700,
                background:'rgba(199,255,58,0.15)',
                color:'var(--accent)'
              }}>✓ {mockCustomerData.kycStatus}</span>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:24}}>
              <div>
                <div className="small-muted" style={{marginBottom:8}}>Full Name</div>
                <div style={{fontSize:'1.15rem',fontWeight:600,color:'#fff',marginBottom:20}}>{mockCustomerData.name}</div>

                <div className="small-muted" style={{marginBottom:8}}>Email Address</div>
                <div style={{fontSize:'1.15rem',fontWeight:600,color:'#fff',marginBottom:20}}>{mockCustomerData.email}</div>

                <div className="small-muted" style={{marginBottom:8}}>Mobile Number</div>
                <div style={{fontSize:'1.15rem',fontWeight:600,color:'#fff',marginBottom:20}}>{mockCustomerData.mobile}</div>

                <div className="small-muted" style={{marginBottom:8}}>Customer ID</div>
                <div style={{fontSize:'1.15rem',fontWeight:600,color:'#fff'}}>{mockCustomerData.id}</div>
              </div>

              <div>
                <div className="small-muted" style={{marginBottom:8}}>PAN Number</div>
                <div style={{fontSize:'1.15rem',fontWeight:600,color:'#fff',marginBottom:20}}>{mockCustomerData.panNumber}</div>

                <div className="small-muted" style={{marginBottom:8}}>Aadhaar Number</div>
                <div style={{fontSize:'1.15rem',fontWeight:600,color:'#fff',marginBottom:20}}>{mockCustomerData.aadhaarNumber}</div>

                <div className="small-muted" style={{marginBottom:8}}>Registered Address</div>
                <div style={{fontSize:'1.15rem',fontWeight:600,color:'#fff',marginBottom:20}}>{mockCustomerData.address}</div>

                <div className="small-muted" style={{marginBottom:8}}>Wallet Address</div>
                <div style={{fontSize:'0.95rem',fontWeight:600,color:'var(--accent)',fontFamily:'monospace'}}>{mockCustomerData.wallet}</div>
              </div>
            </div>
          </GlassPanel>
        )}

        {/* Loans Tab */}
        {activeTab === 'loans' && (
          <div>
            {mockLoans.map((loan) => (
              <GlassPanel key={loan.id} style={{padding:32,marginBottom:24}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:24}}>
                  <div>
                    <h3 style={{fontSize:'1.6rem',fontWeight:700,color:'#fff',marginBottom:8}}>Loan {loan.id}</h3>
                    <span style={{
                      padding:'6px 14px',
                      borderRadius:8,
                      fontSize:'0.9rem',
                      fontWeight:600,
                      background:'rgba(130,202,157,0.1)',
                      color:'#82ca9d'
                    }}>{loan.status}</span>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:'2.2rem',fontWeight:700,color:'var(--accent)'}}>{loan.amount}</div>
                    <div style={{fontSize:'0.95rem',color:'var(--muted)',marginTop:4}}>Disbursed: {loan.disbursedDate}</div>
                  </div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,marginBottom:24}}>
                  <div>
                    <div className="small-muted" style={{marginBottom:8}}>Collateral</div>
                    <div style={{fontSize:'1.1rem',fontWeight:600,color:'#fff'}}>{loan.collateral}</div>
                  </div>
                  <div>
                    <div className="small-muted" style={{marginBottom:8}}>LTV Ratio</div>
                    <div style={{fontSize:'1.1rem',fontWeight:600,color:'#fff'}}>{loan.ltv}</div>
                  </div>
                  <div>
                    <div className="small-muted" style={{marginBottom:8}}>Interest Rate</div>
                    <div style={{fontSize:'1.1rem',fontWeight:600,color:'#fff'}}>{loan.interestRate}</div>
                  </div>
                  <div>
                    <div className="small-muted" style={{marginBottom:8}}>Tenure</div>
                    <div style={{fontSize:'1.1rem',fontWeight:600,color:'#fff'}}>{loan.tenure}</div>
                  </div>
                </div>

                <div style={{
                  padding:20,
                  background:'rgba(199,255,58,0.05)',
                  border:'1px solid rgba(199,255,58,0.2)',
                  borderRadius:12,
                  marginBottom:20
                }}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <div className="small-muted" style={{marginBottom:6}}>Next EMI Payment</div>
                      <div style={{fontSize:'1.4rem',fontWeight:700,color:'var(--accent)'}}>{loan.emi}</div>
                      <div style={{fontSize:'0.9rem',color:'var(--muted)',marginTop:4}}>Due on {loan.nextEmiDate}</div>
                    </div>
                    <button className="btn primary" style={{padding:'12px 28px',fontSize:'1rem'}}>
                      💳 Pay Now
                    </button>
                  </div>
                </div>

                <div style={{fontSize:'0.95rem',color:'var(--muted)'}}>
                  Remaining EMIs: <span style={{color:'#fff',fontWeight:600}}>{loan.remainingEmis}</span>
                </div>
              </GlassPanel>
            ))}
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <GlassPanel style={{padding:32}}>
            <h3 style={{fontSize:'1.8rem',fontWeight:700,color:'#fff',marginBottom:24}}>Asset Marketplace</h3>
            <div className="small-muted" style={{marginBottom:32}}>
              Browse and purchase tokenized assets from other customers
            </div>
            <div style={{textAlign:'center',padding:'60px 20px',color:'var(--muted)'}}>
              <div style={{fontSize:'4rem',marginBottom:16}}>🏪</div>
              <div style={{fontSize:'1.2rem',marginBottom:12}}>Marketplace Coming Soon</div>
              <div>Buy and sell tokenized assets with verified customers</div>
            </div>
          </GlassPanel>
        )}
      </div>

      {/* Sell Asset Modal */}
      {sellModal && (
        <div style={{
          position:'fixed',
          top:0,
          left:0,
          right:0,
          bottom:0,
          background:'rgba(0,0,0,0.85)',
          backdropFilter:'blur(8px)',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          zIndex:9999,
          padding:20
        }} onClick={() => setSellModal(false)}>
          <GlassPanel style={{padding:40,maxWidth:560,width:'100%'}} onClick={(e) => e.stopPropagation()}>
            <h3 style={{fontSize:'1.8rem',fontWeight:700,color:'#fff',marginBottom:24}}>
              List Asset for Sale
            </h3>

            <div style={{marginBottom:24,padding:20,background:'rgba(255,255,255,0.02)',borderRadius:12}}>
              <div style={{fontSize:'1.15rem',fontWeight:600,color:'#fff',marginBottom:8}}>
                {selectedAsset?.type}
              </div>
              <div style={{color:'var(--muted)'}}>
                {selectedAsset?.quantity} • {selectedAsset?.tokens} {selectedAsset?.tokenSymbol} tokens
              </div>
            </div>

            <div style={{marginBottom:20}}>
              <label style={{display:'block',marginBottom:8,fontWeight:600,color:'#fff'}}>
                Selling Percentage
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={sellForm.percentage}
                onChange={(e) => setSellForm({...sellForm, percentage: e.target.value})}
                style={{width:'100%',marginBottom:8}}
              />
              <div style={{fontSize:'1.3rem',fontWeight:700,color:'var(--accent)',textAlign:'center'}}>
                {sellForm.percentage}% of Asset
              </div>
            </div>

            <div style={{marginBottom:24}}>
              <label style={{display:'block',marginBottom:8,fontWeight:600,color:'#fff'}}>
                Asking Price (₹)
              </label>
              <input
                type="number"
                className="form-input"
                value={sellForm.price}
                onChange={(e) => setSellForm({...sellForm, price: e.target.value})}
                placeholder="Enter price"
                style={{width:'100%',padding:'14px 16px',fontSize:'1.1rem'}}
              />
            </div>

            <div style={{display:'flex',gap:12}}>
              <button 
                className="btn primary" 
                onClick={submitSellListing}
                style={{flex:1,padding:'14px',fontSize:'1rem'}}
              >
                List for Sale
              </button>
              <button 
                className="btn" 
                onClick={() => setSellModal(false)}
                style={{padding:'14px 24px',fontSize:'1rem'}}
              >
                Cancel
              </button>
            </div>
          </GlassPanel>
        </div>
      )}

      <Footer />
    </div>
  );
}
