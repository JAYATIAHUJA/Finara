import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';
import GlassPanel from '../components/GlassPanel';
import Footer from '../components/Footer';
import '../styles/theme.css';

export default function LoansList() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');

  const loans = [
    { id: 'LOAN001', customer: 'Rajesh Kumar', customerId: 'CUST001', amount: '₹4,00,000', collateral: '100 GOLD', status: 'Active', ltv: '80%', emi: '₹35,200', date: '2025-10-15' },
    { id: 'LOAN002', customer: 'Amit Patel', customerId: 'CUST003', amount: '₹6,50,000', collateral: '150 MF', status: 'Active', ltv: '75%', emi: '₹57,100', date: '2025-10-20' },
    { id: 'LOAN003', customer: 'Deepak Singh', customerId: 'CUST005', amount: '₹2,80,000', collateral: '80 GOLD', status: 'Repaid', ltv: '70%', emi: '₹24,600', date: '2025-09-10' },
    { id: 'LOAN004', customer: 'Sneha Reddy', customerId: 'CUST004', amount: '₹2,40,000', collateral: '60 GOLD', status: 'Active', ltv: '75%', emi: '₹21,000', date: '2025-11-01' },
    { id: 'LOAN005', customer: 'Rajesh Kumar', customerId: 'CUST001', amount: '₹1,50,000', collateral: '50 GOLD', status: 'Repaid', ltv: '60%', emi: '₹13,200', date: '2025-08-20' }
  ];

  const filteredLoans = filterStatus === 'All' 
    ? loans 
    : loans.filter(l => l.status === filterStatus);

  const stats = {
    total: loans.length,
    active: loans.filter(l => l.status === 'Active').length,
    repaid: loans.filter(l => l.status === 'Repaid').length,
    totalDisbursed: '₹17.2L'
  };

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#000'}}>
      <SideNav active="loans" />
      
      <div style={{flex:1,padding:'32px 48px',paddingBottom:0,display:'flex',flexDirection:'column'}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:8,color:'#fff'}}>Active Loans</h1>
          <p className="small-muted" style={{fontSize:'1.05rem'}}>
            Monitor and manage all loans
          </p>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,marginBottom:32}}>
          <GlassPanel style={{padding:24}}>
            <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:8}}>Total Loans</div>
            <div style={{fontSize:'2.5rem',fontWeight:700,color:'#fff'}}>{stats.total}</div>
          </GlassPanel>
          <GlassPanel style={{padding:24}}>
            <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:8}}>Active</div>
            <div style={{fontSize:'2.5rem',fontWeight:700,color:'var(--accent)'}}>{stats.active}</div>
          </GlassPanel>
          <GlassPanel style={{padding:24}}>
            <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:8}}>Repaid</div>
            <div style={{fontSize:'2.5rem',fontWeight:700,color:'#fff'}}>{stats.repaid}</div>
          </GlassPanel>
          <GlassPanel style={{padding:24}}>
            <div style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:8}}>Total Disbursed</div>
            <div style={{fontSize:'2.5rem',fontWeight:700,color:'var(--accent)'}}>{stats.totalDisbursed}</div>
          </GlassPanel>
        </div>

        {/* Filters */}
        <div style={{display:'flex',gap:12,marginBottom:24}}>
          {['All', 'Active', 'Repaid'].map((status) => (
            <button
              key={status}
              className={filterStatus === status ? 'btn primary' : 'btn'}
              onClick={() => setFilterStatus(status)}
              style={{padding:'10px 20px',fontSize:'0.95rem'}}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Loans Table */}
        <GlassPanel style={{padding:0,marginBottom:32}}>
          <div style={{overflowX:'auto'}}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{padding:'16px 24px'}}>Loan ID</th>
                  <th>Customer</th>
                  <th>Loan Amount</th>
                  <th>Collateral</th>
                  <th>LTV</th>
                  <th>Monthly EMI</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td style={{padding:'16px 24px'}}>
                      <div style={{fontWeight:600,color:'var(--accent)',fontFamily:'monospace'}}>
                        {loan.id}
                      </div>
                    </td>
                    <td>
                      <div style={{fontWeight:600,color:'#fff'}}>{loan.customer}</div>
                      <div style={{fontSize:'0.85rem',color:'var(--muted)'}}>{loan.customerId}</div>
                    </td>
                    <td style={{fontWeight:600,color:'#fff',fontSize:'1.05rem'}}>{loan.amount}</td>
                    <td style={{color:'var(--muted)'}}>{loan.collateral}</td>
                    <td>
                      <div style={{
                        display:'inline-block',
                        padding:'4px 12px',
                        borderRadius:20,
                        background:'rgba(255,255,255,0.08)',
                        color:'#fff',
                        fontSize:'0.85rem',
                        fontWeight:600
                      }}>
                        {loan.ltv}
                      </div>
                    </td>
                    <td style={{fontWeight:600,color:'#fff'}}>{loan.emi}</td>
                    <td>
                      <div style={{
                        display:'inline-block',
                        padding:'4px 12px',
                        borderRadius:20,
                        background: loan.status === 'Active' ? 'rgba(199,255,58,0.15)' : 'rgba(255,255,255,0.08)',
                        color: loan.status === 'Active' ? 'var(--accent)' : 'rgba(255,255,255,0.6)',
                        fontSize:'0.85rem',
                        fontWeight:600
                      }}>
                        {loan.status}
                      </div>
                    </td>
                    <td style={{color:'var(--muted)'}}>{loan.date}</td>
                    <td>
                      <div style={{display:'flex',gap:8}}>
                        <button 
                          className="btn" 
                          onClick={() => navigate(`/loan/${loan.id}`)}
                          style={{padding:'8px 16px',fontSize:'0.9rem'}}
                        >
                          View
                        </button>
                        {loan.status === 'Active' && (
                          <button 
                            className="btn primary" 
                            onClick={() => navigate(`/loan/${loan.id}/repay`)}
                            style={{padding:'8px 16px',fontSize:'0.9rem'}}
                          >
                            Repay
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLoans.length === 0 && (
            <div style={{padding:60,textAlign:'center',color:'var(--muted)'}}>
              <div style={{fontSize:'3rem',marginBottom:16}}>💰</div>
              <div style={{fontSize:'1.1rem'}}>No {filterStatus.toLowerCase()} loans found</div>
            </div>
          )}
        </GlassPanel>

        <Footer />
      </div>
    </div>
  );
}
