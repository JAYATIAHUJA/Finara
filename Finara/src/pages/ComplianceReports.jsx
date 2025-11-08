import React, { useState } from 'react';
import SideNav from '../components/SideNav';
import GlassPanel from '../components/GlassPanel';
import Card from '../components/Card';
import Footer from '../components/Footer';
import '../styles/theme.css';

const kycQueue = [
  { id: 'KYC-001', name: 'Alice Johnson', wallet: '0xA1b2...c3D4', status: 'Pending', risk: 'Low' },
  { id: 'KYC-002', name: 'Bob Smith', wallet: '0xE5f6...g7H8', status: 'Pending', risk: 'Medium' },
  { id: 'KYC-003', name: 'Charlie Davis', wallet: '0xI9j0...k1L2', status: 'Under Review', risk: 'Low' },
];

const auditLogs = [
  { timestamp: '2025-11-08 14:32', action: 'Token Freeze', user: 'admin@bank.com', target: '0xA1b2...', txHash: '0xabc123...' },
  { timestamp: '2025-11-08 12:15', action: 'KYC Approved', user: 'compliance@bank.com', target: 'KYC-005', txHash: '0xdef456...' },
  { timestamp: '2025-11-07 18:45', action: 'Loan Liquidation', user: 'admin@bank.com', target: '#L042', txHash: '0xghi789...' },
  { timestamp: '2025-11-07 16:20', action: 'Account Unfreeze', user: 'compliance@bank.com', target: '0xC3d4...', txHash: '0xjkl012...' },
];

export default function ComplianceReports(){
  const [selectedKYC, setSelectedKYC] = useState(null);

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#000'}}>
      <SideNav active="reports" />
      
      <div style={{flex:1,padding:'32px 48px',paddingBottom:0,display:'flex',flexDirection:'column'}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:8,color:'#fff'}}>Compliance & Reports</h1>
          <p className="small-muted" style={{fontSize:'1.05rem'}}>
            Manage KYC approvals, freeze controls, and export audit logs
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,marginBottom:32}}>
          <Card>
            <div style={{fontSize:'2rem',marginBottom:12}}>📋</div>
            <div className="small-muted" style={{marginBottom:8,fontSize:'0.9rem'}}>Pending KYC</div>
            <div style={{display:'flex',alignItems:'baseline',gap:12}}>
              <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)'}}>3</div>
            </div>
          </Card>
          <Card>
            <div style={{fontSize:'2rem',marginBottom:12}}>✓</div>
            <div className="small-muted" style={{marginBottom:8,fontSize:'0.9rem'}}>Approved Today</div>
            <div style={{display:'flex',alignItems:'baseline',gap:12}}>
              <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>7</div>
            </div>
          </Card>
          <Card>
            <div style={{fontSize:'2rem',marginBottom:12}}>🔒</div>
            <div className="small-muted" style={{marginBottom:8,fontSize:'0.9rem'}}>Frozen Accounts</div>
            <div style={{display:'flex',alignItems:'baseline',gap:12}}>
              <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>2</div>
            </div>
          </Card>
          <Card>
            <div style={{fontSize:'2rem',marginBottom:12}}>📊</div>
            <div className="small-muted" style={{marginBottom:8,fontSize:'0.9rem'}}>Total Audits</div>
            <div style={{display:'flex',alignItems:'baseline',gap:12}}>
              <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>142</div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,marginBottom:32}}>
          {/* KYC Approval Queue */}
          <GlassPanel style={{padding:28}}>
            <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'#fff'}}>KYC Approval Queue</h3>
            <div className="small-muted" style={{marginBottom:20}}>Review pending KYC applications and approve or freeze accounts</div>
            
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {kycQueue.map((kyc, i) => (
                <div key={i} style={{
                  padding:20,
                  background:'rgba(255,255,255,0.02)',
                  borderRadius:12,
                  border:'1px solid rgba(255,255,255,0.06)',
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center'
                }}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'1.05rem',fontWeight:600,color:'#fff',marginBottom:4}}>{kyc.name}</div>
                    <div style={{fontSize:'0.85rem',color:'var(--muted)'}}>
                      {kyc.id} • {kyc.wallet}
                    </div>
                  </div>
                  <div style={{display:'flex',gap:12,alignItems:'center'}}>
                    <div style={{
                      padding:'4px 12px',
                      borderRadius:20,
                      background: kyc.risk === 'Low' ? 'rgba(155,225,43,0.15)' : 'rgba(255,200,58,0.15)',
                      color: kyc.risk === 'Low' ? 'var(--accent)' : '#ffc83a',
                      fontSize:'0.85rem',
                      fontWeight:600
                    }}>
                      {kyc.risk} Risk
                    </div>
                    <div style={{
                      padding:'4px 12px',
                      borderRadius:20,
                      background:'rgba(199,255,58,0.15)',
                      color:'var(--accent)',
                      fontSize:'0.85rem',
                      fontWeight:600
                    }}>
                      {kyc.status}
                    </div>
                  </div>
                  <div style={{display:'flex',gap:8,marginLeft:16}}>
                    <button className="btn primary" style={{fontSize:'0.9rem',padding:'8px 16px'}}>✓ Approve</button>
                    <button className="btn" style={{fontSize:'0.9rem',padding:'8px 16px'}}>✕ Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* Freeze Controls */}
          <GlassPanel style={{padding:28}}>
            <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Freeze Controls</h3>
            <div className="small-muted" style={{marginBottom:20}}>Freeze/unfreeze tokens or accounts</div>
            
            <div style={{marginBottom:20}}>
              <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                Wallet Address
              </label>
              <input 
                type="text" 
                placeholder="0x..." 
                className="form-input"
              />
            </div>
            
            <div style={{marginBottom:24}}>
              <label style={{display:'block',marginBottom:8,fontSize:'0.95rem',fontWeight:500,color:'rgba(255,255,255,0.9)'}}>
                Reason
              </label>
              <select className="form-input">
                <option>Suspicious Activity</option>
                <option>Regulatory Hold</option>
                <option>Court Order</option>
                <option>Risk Assessment</option>
              </select>
            </div>
            
            <button className="btn primary" style={{width:'100%',marginBottom:12,padding:'14px',justifyContent:'center'}}>
              🔒 Freeze Account
            </button>
            <button className="btn" style={{width:'100%',padding:'14px',justifyContent:'center'}}>
              🔓 Unfreeze Account
            </button>
          </GlassPanel>
        </div>

        {/* Audit Logs */}
        <GlassPanel style={{padding:28,marginBottom:32}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
            <div>
              <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:8,color:'#fff'}}>Audit Logs</h3>
              <div className="small-muted">Exportable CSV/PDF with signed on-chain references</div>
            </div>
            <div style={{display:'flex',gap:12}}>
              <button className="btn" style={{padding:'12px 20px'}}>📄 Export CSV</button>
              <button className="btn primary" style={{padding:'12px 20px'}}>📕 Export PDF</button>
            </div>
          </div>
          
          <div style={{overflowX:'auto'}}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{padding:'12px 16px'}}>Timestamp</th>
                  <th>Action</th>
                  <th>User</th>
                  <th>Target</th>
                  <th>Tx Hash</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, i) => (
                  <tr key={i}>
                    <td style={{padding:'12px 16px',color:'var(--muted)'}}>{log.timestamp}</td>
                    <td style={{fontWeight:600,color:'#fff'}}>{log.action}</td>
                    <td style={{color:'var(--muted)'}}>{log.user}</td>
                    <td style={{color:'#fff'}}>{log.target}</td>
                    <td style={{color:'var(--muted)',fontFamily:'monospace',fontSize:'0.9rem'}}>{log.txHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>

        <Footer />
      </div>
    </div>
  );
}
