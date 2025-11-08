import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassPanel from '../components/GlassPanel';
import Footer from '../components/Footer';
import '../styles/theme.css';

export default function BankLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - in production, validate with backend
    if (formData.email && formData.password) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'#000'}}>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
        <GlassPanel style={{maxWidth:480,width:'100%',padding:48}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:12,color:'#fff'}}>Bank Login</h1>
            <p className="small-muted" style={{fontSize:'1.05rem'}}>
              Access your banking dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:24}}>
              <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                Bank ID / Email
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="bank@finara.com"
                style={{
                  width:'100%',
                  padding:'14px 16px',
                  fontSize:'1rem',
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  borderRadius:10,
                  color:'#fff',
                  outline:'none',
                  transition:'all 0.3s'
                }}
                onFocus={(e) => e.target.style.border = '1px solid var(--accent)'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.12)'}
                required
              />
            </div>

            <div style={{marginBottom:32}}>
              <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                style={{
                  width:'100%',
                  padding:'14px 16px',
                  fontSize:'1rem',
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  borderRadius:10,
                  color:'#fff',
                  outline:'none',
                  transition:'all 0.3s'
                }}
                onFocus={(e) => e.target.style.border = '1px solid var(--accent)'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.12)'}
                required
              />
            </div>

            <button type="submit" className="btn primary" style={{width:'100%',padding:'16px',fontSize:'1.1rem',fontWeight:600}}>
              Login to Dashboard →
            </button>

            <div style={{marginTop:24,textAlign:'center'}}>
              <a href="#" style={{color:'var(--accent)',fontSize:'0.95rem',textDecoration:'none'}}>
                Forgot Password?
              </a>
            </div>
          </form>

          <div style={{marginTop:32,padding:20,background:'rgba(199,255,58,0.04)',borderRadius:12,border:'1px solid rgba(199,255,58,0.1)'}}>
            <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:8}}>Demo Credentials</div>
            <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.8)'}}>
              Email: <span style={{color:'var(--accent)'}}>demo@bank.com</span><br/>
              Password: <span style={{color:'var(--accent)'}}>demo123</span>
            </div>
          </div>
        </GlassPanel>
      </div>
      <Footer />
    </div>
  );
}
