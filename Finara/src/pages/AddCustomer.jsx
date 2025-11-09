import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import GlassPanel from '../components/GlassPanel';
import SideNav from '../components/SideNav';
import api from '../services/api';
import '../styles/theme.css';

export default function AddCustomer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    kycId: '',
    panAadhaar: '',
    address: '',
    mobile: '',
    email: '',
    assetType: 'Gold',
    assetQuantity: '',
    assetValue: '',
    assetDetails: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate a wallet address from customer data (simple hash-based approach)
  const generateWalletAddress = (name, kycId, email) => {
    // Simple hash function to generate a deterministic wallet address
    const str = `${name}-${kycId}-${email}-${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Generate a 40-character hex string (Ethereum address format)
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return '0x' + hex.repeat(5).substring(0, 40);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Get bank address from context/localStorage - using hardcoded for now
      const bankAddress = localStorage.getItem('bankAddress') || '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65';
      
      // Generate wallet address for the customer
      const walletAddress = generateWalletAddress(formData.name, formData.kycId, formData.email);

      // Prepare customer data for API
      const customerData = {
        name: formData.name,
        accountId: formData.kycId,
        walletAddress: walletAddress
      };

      // Call API to create customer
      const result = await api.uploadCustomers(bankAddress, [customerData]);

      if (result.success) {
        // Success - navigate to customers list
        navigate('/customers');
      } else {
        setError(result.error || 'Failed to create customer');
      }
    } catch (err) {
      console.error('Error creating customer:', err);
      setError(err.message || 'An error occurred while creating the customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#000'}}>
      <SideNav active="customers" />
      
      <div style={{flex:1,padding:'32px 48px',paddingBottom:0,display:'flex',flexDirection:'column'}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <button className="btn" onClick={() => navigate('/dashboard')} style={{marginBottom:16,padding:'8px 16px'}}>
            ← Back to Dashboard
          </button>
          <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:8,color:'#fff'}}>Add New Customer</h1>
          <p className="small-muted" style={{fontSize:'1.05rem'}}>
            Onboard a new customer with KYC and asset details
          </p>
        </div>

        <GlassPanel style={{maxWidth:800,padding:40,marginBottom:32}}>
          {error && (
            <div style={{
              padding: '16px 20px',
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: 12,
              marginBottom: 24,
              color: '#ff6b6b'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Customer Information */}
            <div style={{marginBottom:32}}>
              <h3 style={{fontSize:'1.3rem',fontWeight:700,marginBottom:20,color:'var(--accent)'}}>
                👤 Customer Information
              </h3>
              
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
                <div>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Rajesh Kumar"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    KYC ID *
                  </label>
                  <input
                    type="text"
                    value={formData.kycId}
                    onChange={(e) => setFormData({...formData, kycId: e.target.value})}
                    placeholder="KYC-2025-001"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div style={{marginBottom:20}}>
                <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                  PAN / Aadhaar *
                </label>
                <input
                  type="text"
                  value={formData.panAadhaar}
                  onChange={(e) => setFormData({...formData, panAadhaar: e.target.value})}
                  placeholder="ABCDE1234F or 1234 5678 9012"
                  className="form-input"
                  required
                />
              </div>

              <div style={{marginBottom:20}}>
                <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Complete residential address"
                  className="form-input"
                  rows={3}
                  required
                />
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
                <div>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="+91 98765 43210"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="customer@email.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Asset Information */}
            <div style={{marginBottom:32}}>
              <h3 style={{fontSize:'1.3rem',fontWeight:700,marginBottom:20,color:'var(--accent)'}}>
                💎 Asset Information
              </h3>
              
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
                <div>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    Asset Type *
                  </label>
                  <select
                    value={formData.assetType}
                    onChange={(e) => setFormData({...formData, assetType: e.target.value})}
                    className="form-input"
                    required
                  >
                    <option value="Gold">Gold</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                  </select>
                </div>
                <div>
                  <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                    Asset Quantity *
                  </label>
                  <input
                    type="text"
                    value={formData.assetQuantity}
                    onChange={(e) => setFormData({...formData, assetQuantity: e.target.value})}
                    placeholder="100 grams / 1 property / 500 units"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div style={{marginBottom:20}}>
                <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                  Asset Value (₹) *
                </label>
                <input
                  type="number"
                  value={formData.assetValue}
                  onChange={(e) => setFormData({...formData, assetValue: e.target.value})}
                  placeholder="520000"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                  Asset Details *
                </label>
                <textarea
                  value={formData.assetDetails}
                  onChange={(e) => setFormData({...formData, assetDetails: e.target.value})}
                  placeholder="Vault ID / Property ID / Demat Number / Other identifying details"
                  className="form-input"
                  rows={3}
                  required
                />
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginTop:8}}>
                  e.g., Vault ID: HDFC-GOLD-2025-001 or Property ID: PROP-DL-456
                </div>
              </div>
            </div>

            {/* Submit */}
            <div style={{display:'flex',gap:16}}>
              <button 
                type="submit" 
                className="btn primary" 
                style={{flex:1,padding:'16px',fontSize:'1.05rem',fontWeight:600}}
                disabled={loading}
              >
                {loading ? 'Creating Customer...' : 'Create Customer Profile →'}
              </button>
              <button 
                type="button" 
                className="btn" 
                onClick={() => navigate('/dashboard')} 
                style={{padding:'16px 32px',fontSize:'1.05rem'}}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </GlassPanel>

        <Footer />
      </div>
    </div>
  );
}
