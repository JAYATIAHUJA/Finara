import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';
import GlassPanel from '../components/GlassPanel';
import Footer from '../components/Footer';
import '../styles/theme.css';

export default function CreateLoan() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    collateralToken: 'GOLD',
    collateralAmount: '',
    ltv: '75',
    loanAmount: '',
    interestRate: '12',
    tenure: '12'
  });

  // Mock available tokens
  const availableTokens = [
    { symbol: 'GOLD', balance: 520, value: '₹5,20,000' },
    { symbol: 'MF', balance: 280, value: '₹2,80,000' }
  ];

  const calculateLoanAmount = () => {
    if (formData.collateralAmount && formData.ltv) {
      const tokenValue = formData.collateralToken === 'GOLD' ? 520000 : 280000;
      const collateralValue = (parseFloat(formData.collateralAmount) / (formData.collateralToken === 'GOLD' ? 520 : 280)) * tokenValue;
      return Math.floor(collateralValue * (parseFloat(formData.ltv) / 100));
    }
    return 0;
  };

  const calculateEMI = () => {
    const principal = calculateLoanAmount();
    const rate = parseFloat(formData.interestRate) / 100 / 12;
    const tenure = parseInt(formData.tenure);
    if (principal && rate && tenure) {
      const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      return Math.round(emi);
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loanId = 'LOAN' + Math.floor(Math.random() * 10000);
    alert(`Loan disbursed successfully! Loan ID: ${loanId}`);
    navigate(`/loan/${loanId}`);
  };

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#000'}}>
      <SideNav active="loans" />
      
      <div style={{flex:1,padding:'32px 48px',paddingBottom:0,display:'flex',flexDirection:'column'}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <button className="btn" onClick={() => navigate(`/customer/${customerId}`)} style={{marginBottom:16,padding:'8px 16px'}}>
            ← Back to Customer Profile
          </button>
          <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:8,color:'#fff'}}>Create New Loan</h1>
          <p className="small-muted" style={{fontSize:'1.05rem'}}>
            Issue a collateralized loan against tokenized assets
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,marginBottom:32}}>
          {/* Loan Form */}
          <GlassPanel style={{padding:40}}>
            <form onSubmit={handleSubmit}>
              <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:24,color:'var(--accent)'}}>
                💰 Loan Configuration
              </h3>

              {/* Collateral Selection */}
              <div style={{marginBottom:24}}>
                <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                  Select Collateral Token *
                </label>
                <select
                  value={formData.collateralToken}
                  onChange={(e) => setFormData({...formData, collateralToken: e.target.value, collateralAmount: ''})}
                  className="form-input"
                  required
                >
                  {availableTokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol} - {token.balance} tokens available ({token.value})
                    </option>
                  ))}
                </select>
              </div>

              {/* Collateral Amount */}
              <div style={{marginBottom:24}}>
                <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                  Collateral Amount (Tokens) *
                </label>
                <input
                  type="number"
                  value={formData.collateralAmount}
                  onChange={(e) => setFormData({...formData, collateralAmount: e.target.value})}
                  placeholder="100"
                  max={availableTokens.find(t => t.symbol === formData.collateralToken)?.balance}
                  className="form-input"
                  required
                />
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginTop:8}}>
                  Max: {availableTokens.find(t => t.symbol === formData.collateralToken)?.balance} tokens
                </div>
              </div>

              {/* LTV Ratio */}
              <div style={{marginBottom:24}}>
                <label style={{display:'block',marginBottom:12,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                  Loan-to-Value Ratio (LTV): {formData.ltv}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={formData.ltv}
                  onChange={(e) => setFormData({...formData, ltv: e.target.value})}
                  style={{width:'100%',accentColor:'var(--accent)'}}
                />
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.85rem',color:'var(--muted)',marginTop:8}}>
                  <span>50% (Safe)</span>
                  <span>70%</span>
                  <span>90% (Risky)</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div style={{marginBottom:24}}>
                <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                  Interest Rate (% per annum) *
                </label>
                <input
                  type="number"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                  placeholder="12"
                  min="1"
                  max="36"
                  step="0.5"
                  className="form-input"
                  required
                />
              </div>

              {/* Tenure */}
              <div style={{marginBottom:32}}>
                <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                  Loan Tenure (Months) *
                </label>
                <select
                  value={formData.tenure}
                  onChange={(e) => setFormData({...formData, tenure: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="60">60 months</option>
                </select>
              </div>

              {/* Submit */}
              <button type="submit" className="btn primary" style={{width:'100%',padding:'16px',fontSize:'1.05rem',fontWeight:600}}>
                Disburse Loan →
              </button>
            </form>
          </GlassPanel>

          {/* Loan Summary */}
          <div style={{display:'flex',flexDirection:'column',gap:20}}>
            <GlassPanel style={{padding:28}}>
              <h3 style={{fontSize:'1.3rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Loan Summary</h3>
              
              <div style={{marginBottom:16}}>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Loan Amount</div>
                <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)'}}>
                  ₹{calculateLoanAmount().toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{padding:16,background:'rgba(255,255,255,0.02)',borderRadius:12,marginBottom:16}}>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:4}}>Monthly EMI</div>
                <div style={{fontSize:'1.5rem',fontWeight:600,color:'#fff'}}>
                  ₹{calculateEMI().toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{fontSize:'0.9rem',color:'var(--muted)',lineHeight:1.8}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span>Collateral:</span>
                  <span style={{color:'#fff',fontWeight:600}}>{formData.collateralAmount || 0} {formData.collateralToken}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span>LTV Ratio:</span>
                  <span style={{color:'#fff',fontWeight:600}}>{formData.ltv}%</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span>Interest Rate:</span>
                  <span style={{color:'#fff',fontWeight:600}}>{formData.interestRate}% p.a.</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span>Tenure:</span>
                  <span style={{color:'#fff',fontWeight:600}}>{formData.tenure} months</span>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel style={{padding:20,background:'rgba(199,255,58,0.04)',border:'1px solid rgba(199,255,58,0.12)'}}>
              <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:8}}>⚠️ Important</div>
              <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.9)',lineHeight:1.6}}>
                Collateral tokens will be locked in the smart contract until full repayment. Liquidation may occur if LTV exceeds 100%.
              </div>
            </GlassPanel>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
