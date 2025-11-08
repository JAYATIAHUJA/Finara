import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';
import GlassPanel from '../components/GlassPanel';
import Card from '../components/Card';
import Footer from '../components/Footer';
import '../styles/theme.css';

export default function CustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTokenizeModal, setShowTokenizeModal] = useState(false);
  const [tokenData, setTokenData] = useState({
    assetType: 'Gold',
    assetValue: '',
    tokenName: '',
    tokenQuantity: ''
  });

  // Mock customer data
  const customer = {
    id: id,
    name: 'Rajesh Kumar',
    kycId: 'KYC-2025-001',
    kycStatus: 'Verified',
    panAadhaar: 'ABCDE1234F',
    mobile: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    address: 'Flat 301, Green Valley Apartments, Bangalore - 560078',
    joinedDate: '2025-11-08'
  };

  const assets = [
    { 
      type: 'Gold', 
      quantity: '100 grams', 
      value: '₹5,20,000', 
      details: 'Vault ID: HDFC-GOLD-2025-001',
      status: 'Tokenized',
      tokens: '520 GOLD'
    },
    { 
      type: 'Mutual Funds', 
      quantity: '500 units', 
      value: '₹2,80,000', 
      details: 'Demat: 1234567890',
      status: 'Not Tokenized',
      tokens: '-'
    }
  ];

  const loanHistory = [
    { id: 'LOAN001', amount: '₹4,00,000', collateral: '100 GOLD', status: 'Active', date: '2025-10-15' },
    { id: 'LOAN002', amount: '₹1,50,000', collateral: '50 GOLD', status: 'Repaid', date: '2025-08-20' }
  ];

  const handleTokenize = (e) => {
    e.preventDefault();
    // Mock tokenization
    alert(`Tokens minted successfully! Token: ${tokenData.tokenName}, Quantity: ${tokenData.tokenQuantity}`);
    setShowTokenizeModal(false);
  };

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#000'}}>
      <SideNav active="customers" />
      
      <div style={{flex:1,padding:'32px 48px',paddingBottom:0,display:'flex',flexDirection:'column'}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <button className="btn" onClick={() => navigate('/customers')} style={{marginBottom:16,padding:'8px 16px'}}>
            ← Back to Customers
          </button>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:8,color:'#fff'}}>{customer.name}</h1>
              <p className="small-muted" style={{fontSize:'1.05rem'}}>
                Customer ID: {customer.id}
              </p>
            </div>
            <div style={{
              padding:'6px 16px',
              borderRadius:20,
              background:'rgba(199,255,58,0.15)',
              color:'var(--accent)',
              fontSize:'0.9rem',
              fontWeight:600
            }}>
              ✓ {customer.kycStatus}
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <GlassPanel style={{padding:32,marginBottom:24}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'var(--accent)'}}>
            👤 Customer Information
          </h3>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>KYC ID</div>
                <div style={{fontSize:'1.05rem',color:'#fff',fontWeight:500}}>{customer.kycId}</div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>PAN / Aadhaar</div>
                <div style={{fontSize:'1.05rem',color:'#fff',fontWeight:500}}>{customer.panAadhaar}</div>
              </div>
              <div>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Joined Date</div>
                <div style={{fontSize:'1.05rem',color:'#fff',fontWeight:500}}>{customer.joinedDate}</div>
              </div>
            </div>
            <div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Mobile</div>
                <div style={{fontSize:'1.05rem',color:'#fff',fontWeight:500}}>{customer.mobile}</div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Email</div>
                <div style={{fontSize:'1.05rem',color:'#fff',fontWeight:500}}>{customer.email}</div>
              </div>
              <div>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Address</div>
                <div style={{fontSize:'1.05rem',color:'#fff',fontWeight:500,lineHeight:1.6}}>{customer.address}</div>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Assets & Tokenization */}
        <GlassPanel style={{padding:32,marginBottom:24}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
            <h3 style={{fontSize:'1.4rem',fontWeight:700,color:'var(--accent)'}}>
              💎 Assets & Tokenization
            </h3>
            <button className="btn primary" onClick={() => setShowTokenizeModal(true)}>
              + Tokenize Asset
            </button>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {assets.map((asset, i) => (
              <div key={i} style={{
                padding:24,
                background:'rgba(255,255,255,0.02)',
                borderRadius:12,
                border:'1px solid rgba(255,255,255,0.06)',
                display:'grid',
                gridTemplateColumns:'1fr 1fr 1fr 1fr 0.8fr',
                gap:16,
                alignItems:'center'
              }}>
                <div>
                  <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Asset Type</div>
                  <div style={{fontSize:'1.1rem',fontWeight:600,color:'#fff'}}>{asset.type}</div>
                </div>
                <div>
                  <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Quantity</div>
                  <div style={{fontSize:'1.05rem',color:'#fff'}}>{asset.quantity}</div>
                </div>
                <div>
                  <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Value</div>
                  <div style={{fontSize:'1.1rem',fontWeight:600,color:'var(--accent)'}}>{asset.value}</div>
                </div>
                <div>
                  <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Tokens</div>
                  <div style={{fontSize:'1.05rem',color:'#fff'}}>{asset.tokens}</div>
                </div>
                <div>
                  <div style={{
                    padding:'6px 12px',
                    borderRadius:20,
                    textAlign:'center',
                    background: asset.status === 'Tokenized' ? 'rgba(199,255,58,0.15)' : 'rgba(255,255,255,0.08)',
                    color: asset.status === 'Tokenized' ? 'var(--accent)' : 'rgba(255,255,255,0.6)',
                    fontSize:'0.85rem',
                    fontWeight:600
                  }}>
                    {asset.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Loan Actions & History */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:24,marginBottom:32}}>
          <GlassPanel style={{padding:28}}>
            <h3 style={{fontSize:'1.3rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Actions</h3>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <button className="btn primary" onClick={() => navigate(`/loan/create/${id}`)} style={{width:'100%',padding:'14px',justifyContent:'center'}}>
                💰 Create Loan
              </button>
              <button className="btn" onClick={() => navigate(`/customer/${id}/transactions`)} style={{width:'100%',padding:'14px',justifyContent:'center'}}>
                📊 View Transactions
              </button>
              <button className="btn" style={{width:'100%',padding:'14px',justifyContent:'center'}}>
                📄 Download Report
              </button>
            </div>
          </GlassPanel>

          <GlassPanel style={{padding:28}}>
            <h3 style={{fontSize:'1.3rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Loan History</h3>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {loanHistory.map((loan, i) => (
                <div key={i} style={{
                  padding:20,
                  background:'rgba(255,255,255,0.02)',
                  borderRadius:12,
                  border:'1px solid rgba(255,255,255,0.06)',
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center'
                }}>
                  <div>
                    <div style={{fontSize:'1.05rem',fontWeight:600,color:'#fff',marginBottom:4}}>{loan.id}</div>
                    <div style={{fontSize:'0.9rem',color:'var(--muted)'}}>
                      {loan.amount} • Collateral: {loan.collateral}
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{
                      padding:'6px 12px',
                      borderRadius:20,
                      background: loan.status === 'Active' ? 'rgba(199,255,58,0.15)' : 'rgba(255,255,255,0.08)',
                      color: loan.status === 'Active' ? 'var(--accent)' : 'rgba(255,255,255,0.6)',
                      fontSize:'0.85rem',
                      fontWeight:600,
                      marginBottom:4
                    }}>
                      {loan.status}
                    </div>
                    <div style={{fontSize:'0.85rem',color:'var(--muted)'}}>{loan.date}</div>
                  </div>
                </div>
              ))}
            </div>
            {loanHistory.length === 0 && (
              <div style={{textAlign:'center',padding:40,color:'var(--muted)'}}>
                No loan history available
              </div>
            )}
          </GlassPanel>
        </div>

        {/* Tokenization Modal */}
        {showTokenizeModal && (
          <div style={{
            position:'fixed',
            top:0,
            left:0,
            right:0,
            bottom:0,
            background:'rgba(0,0,0,0.8)',
            backdropFilter:'blur(8px)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            zIndex:1000,
            padding:20
          }}>
            <GlassPanel style={{maxWidth:600,width:'100%',padding:40}}>
              <h2 style={{fontSize:'2rem',fontWeight:700,marginBottom:24,color:'#fff'}}>🪙 Tokenize Asset</h2>
              
              <form onSubmit={handleTokenize}>
                <div style={{marginBottom:20}}>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    Asset Type *
                  </label>
                  <select
                    value={tokenData.assetType}
                    onChange={(e) => {
                      const type = e.target.value;
                      setTokenData({
                        ...tokenData, 
                        assetType: type,
                        tokenName: `${type.toUpperCase().replace(' ','')}-${Date.now().toString().slice(-4)}`
                      });
                    }}
                    className="form-input"
                    required
                  >
                    <option value="Gold">Gold</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                  </select>
                </div>

                <div style={{marginBottom:20}}>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    Asset Value (₹) *
                  </label>
                  <input
                    type="number"
                    value={tokenData.assetValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTokenData({
                        ...tokenData, 
                        assetValue: value,
                        tokenQuantity: value ? Math.floor(parseFloat(value) / 1000).toString() : ''
                      });
                    }}
                    placeholder="520000"
                    className="form-input"
                    required
                  />
                </div>

                <div style={{marginBottom:20}}>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    Token Name
                  </label>
                  <input
                    type="text"
                    value={tokenData.tokenName}
                    onChange={(e) => setTokenData({...tokenData, tokenName: e.target.value})}
                    placeholder="GOLD-2025"
                    className="form-input"
                    readOnly
                  />
                  <div style={{fontSize:'0.85rem',color:'var(--muted)',marginTop:8}}>
                    Auto-generated based on asset type
                  </div>
                </div>

                <div style={{marginBottom:32}}>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    Token Quantity
                  </label>
                  <input
                    type="text"
                    value={tokenData.tokenQuantity}
                    className="form-input"
                    readOnly
                  />
                  <div style={{fontSize:'0.85rem',color:'var(--muted)',marginTop:8}}>
                    Auto-calculated (1 token = ₹1000)
                  </div>
                </div>

                <div style={{display:'flex',gap:16}}>
                  <button type="submit" className="btn primary" style={{flex:1,padding:'16px',fontSize:'1.05rem',fontWeight:600}}>
                    Mint Tokens →
                  </button>
                  <button type="button" className="btn" onClick={() => setShowTokenizeModal(false)} style={{padding:'16px 32px',fontSize:'1.05rem'}}>
                    Cancel
                  </button>
                </div>
              </form>
            </GlassPanel>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
