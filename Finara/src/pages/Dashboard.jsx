import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';
import GlassPanel from '../components/GlassPanel';
import Card from '../components/Card';
import Footer from '../components/Footer';
import '../styles/theme.css';

export default function BankDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');

  const stats = [
    { label: 'Customers Onboarded', value: '248', change: '+12%', icon: '👥' },
    { label: 'Tokenized Assets', value: '₹24.8M', change: '+18%', icon: '💎' },
    { label: 'Active Loans', value: '142', change: '+8%', icon: '💰' },
    { label: 'Total Tokens Minted', value: '1.2M', change: '+22%', icon: '🪙' }
  ];

  const recentCustomers = [
    { name: 'Rajesh Kumar', kyc: 'Verified', asset: 'Gold', value: '₹5.2L', date: '2025-11-08' },
    { name: 'Priya Sharma', kyc: 'Pending', asset: 'Real Estate', value: '₹45L', date: '2025-11-08' },
    { name: 'Amit Patel', kyc: 'Verified', asset: 'Mutual Funds', value: '₹8.5L', date: '2025-11-07' },
    { name: 'Sneha Reddy', kyc: 'Verified', asset: 'Gold', value: '₹3.2L', date: '2025-11-07' }
  ];

  const recentLoans = [
    { customer: 'Rajesh Kumar', amount: '₹4.0L', collateral: '100 GOLD', status: 'Active', ltv: '80%' },
    { customer: 'Amit Patel', amount: '₹6.5L', collateral: '150 MF', status: 'Active', ltv: '75%' },
    { customer: 'Deepak Singh', amount: '₹2.8L', collateral: '80 GOLD', status: 'Repaid', ltv: '70%' }
  ];

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#000'}}>
      <SideNav active="dashboard" />
      
      <div style={{flex:1,padding:'32px 48px',paddingBottom:0,display:'flex',flexDirection:'column'}}>
        {/* Header */}
        <div style={{marginBottom:40}}>
          <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:8,color:'#fff'}}>Bank Dashboard</h1>
          <p className="small-muted" style={{fontSize:'1.05rem'}}>
            Manage customers, assets, loans, and tokenization
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{display:'flex',gap:16,marginBottom:32,flexWrap:'wrap'}}>
          <button className="btn primary" onClick={() => navigate('/customer/add')} style={{padding:'14px 28px',fontSize:'1rem'}}>
            + Add Customer
          </button>
          <button className="btn" onClick={() => navigate('/customers')} style={{padding:'14px 28px',fontSize:'1rem'}}>
            📋 View Customers
          </button>
          <button className="btn" onClick={() => navigate('/loans')} style={{padding:'14px 28px',fontSize:'1rem'}}>
            💰 Manage Loans
          </button>
          <button className="btn" onClick={() => navigate('/reports')} style={{padding:'14px 28px',fontSize:'1rem'}}>
            📊 Reports
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,marginBottom:32}}>
          {stats.map((stat, i) => (
            <Card key={i}>
              <div style={{fontSize:'2rem',marginBottom:12}}>{stat.icon}</div>
              <div className="small-muted" style={{marginBottom:8,fontSize:'0.9rem'}}>{stat.label}</div>
              <div style={{display:'flex',alignItems:'baseline',gap:12}}>
                <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>{stat.value}</div>
                <div style={{fontSize:'0.9rem',color:'var(--accent)',fontWeight:600}}>{stat.change}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:32}}>
          {/* Recent Customers */}
          <GlassPanel style={{padding:28}}>
            <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Recent Customers</h3>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {recentCustomers.map((customer, i) => (
                <div key={i} style={{
                  padding:16,
                  background:'rgba(255,255,255,0.02)',
                  borderRadius:12,
                  border:'1px solid rgba(255,255,255,0.06)',
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center'
                }}>
                  <div>
                    <div style={{fontSize:'1.05rem',fontWeight:600,color:'#fff',marginBottom:4}}>{customer.name}</div>
                    <div style={{fontSize:'0.85rem',color:'var(--muted)'}}>
                      {customer.asset} • {customer.value}
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{
                      fontSize:'0.8rem',
                      padding:'4px 12px',
                      borderRadius:20,
                      background: customer.kyc === 'Verified' ? 'rgba(199,255,58,0.15)' : 'rgba(255,165,0,0.15)',
                      color: customer.kyc === 'Verified' ? 'var(--accent)' : 'orange',
                      marginBottom:4
                    }}>
                      {customer.kyc}
                    </div>
                    <div style={{fontSize:'0.8rem',color:'var(--muted)'}}>{customer.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn" onClick={() => navigate('/customers')} style={{width:'100%',marginTop:20}}>
              View All Customers →
            </button>
          </GlassPanel>

          {/* Recent Loans */}
          <GlassPanel style={{padding:28}}>
            <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Recent Loans</h3>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {recentLoans.map((loan, i) => (
                <div key={i} style={{
                  padding:16,
                  background:'rgba(255,255,255,0.02)',
                  borderRadius:12,
                  border:'1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                    <div style={{fontSize:'1.05rem',fontWeight:600,color:'#fff'}}>{loan.customer}</div>
                    <div style={{
                      fontSize:'0.8rem',
                      padding:'4px 12px',
                      borderRadius:20,
                      background: loan.status === 'Active' ? 'rgba(199,255,58,0.15)' : 'rgba(255,255,255,0.08)',
                      color: loan.status === 'Active' ? 'var(--accent)' : 'rgba(255,255,255,0.6)'
                    }}>
                      {loan.status}
                    </div>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.9rem'}}>
                    <div>
                      <span style={{color:'var(--muted)'}}>Amount:</span>{' '}
                      <span style={{color:'#fff',fontWeight:600}}>{loan.amount}</span>
                    </div>
                    <div>
                      <span style={{color:'var(--muted)'}}>LTV:</span>{' '}
                      <span style={{color:'var(--accent)',fontWeight:600}}>{loan.ltv}</span>
                    </div>
                  </div>
                  <div style={{fontSize:'0.85rem',color:'var(--muted)',marginTop:4}}>
                    Collateral: {loan.collateral}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn" onClick={() => navigate('/loans')} style={{width:'100%',marginTop:20}}>
              View All Loans →
            </button>
          </GlassPanel>
        </div>

        <Footer />
      </div>
    </div>
  );
}
