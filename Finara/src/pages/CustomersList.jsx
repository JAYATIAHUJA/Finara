import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';
import GlassPanel from '../components/GlassPanel';
import Footer from '../components/Footer';
import '../styles/theme.css';

export default function CustomersList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { id: 'CUST001', name: 'Rajesh Kumar', kyc: 'Verified', asset: 'Gold', value: '₹5.2L', loans: 1, date: '2025-11-08' },
    { id: 'CUST002', name: 'Priya Sharma', kyc: 'Pending', asset: 'Real Estate', value: '₹45L', loans: 0, date: '2025-11-08' },
    { id: 'CUST003', name: 'Amit Patel', kyc: 'Verified', asset: 'Mutual Funds', value: '₹8.5L', loans: 2, date: '2025-11-07' },
    { id: 'CUST004', name: 'Sneha Reddy', kyc: 'Verified', asset: 'Gold', value: '₹3.2L', loans: 1, date: '2025-11-07' },
    { id: 'CUST005', name: 'Deepak Singh', kyc: 'Verified', asset: 'Stocks', value: '₹12L', loans: 3, date: '2025-11-06' }
  ];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#000'}}>
      <SideNav active="customers" />
      
      <div style={{flex:1,padding:'32px 48px',paddingBottom:0,display:'flex',flexDirection:'column'}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:8,color:'#fff'}}>All Customers</h1>
          <p className="small-muted" style={{fontSize:'1.05rem'}}>
            Manage and view all onboarded customers
          </p>
        </div>

        {/* Search & Actions */}
        <div style={{display:'flex',gap:16,marginBottom:24}}>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex:1,
              padding:'14px 20px',
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.12)',
              borderRadius:12,
              color:'#fff',
              fontSize:'1rem',
              outline:'none'
            }}
          />
          <button className="btn primary" onClick={() => navigate('/customer/add')} style={{padding:'14px 28px',fontSize:'1rem'}}>
            + Add Customer
          </button>
        </div>

        {/* Customers Table */}
        <GlassPanel style={{padding:0,marginBottom:32}}>
          <div style={{overflowX:'auto'}}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{padding:'16px 24px'}}>Customer ID</th>
                  <th>Name</th>
                  <th>KYC Status</th>
                  <th>Asset Type</th>
                  <th>Asset Value</th>
                  <th>Active Loans</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td style={{padding:'16px 24px'}}>
                      <div style={{fontWeight:600,color:'var(--accent)',fontFamily:'monospace'}}>
                        {customer.id}
                      </div>
                    </td>
                    <td>
                      <div style={{fontWeight:600,color:'#fff'}}>{customer.name}</div>
                    </td>
                    <td>
                      <div style={{
                        display:'inline-block',
                        padding:'4px 12px',
                        borderRadius:20,
                        background: customer.kyc === 'Verified' ? 'rgba(199,255,58,0.15)' : 'rgba(255,165,0,0.15)',
                        color: customer.kyc === 'Verified' ? 'var(--accent)' : 'orange',
                        fontSize:'0.85rem',
                        fontWeight:600
                      }}>
                        {customer.kyc}
                      </div>
                    </td>
                    <td>{customer.asset}</td>
                    <td style={{fontWeight:600,color:'#fff'}}>{customer.value}</td>
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
                        {customer.loans}
                      </div>
                    </td>
                    <td style={{color:'var(--muted)'}}>{customer.date}</td>
                    <td>
                      <button 
                        className="btn" 
                        onClick={() => navigate(`/customer/${customer.id}`)}
                        style={{padding:'8px 16px',fontSize:'0.9rem'}}
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCustomers.length === 0 && (
            <div style={{padding:60,textAlign:'center',color:'var(--muted)'}}>
              <div style={{fontSize:'3rem',marginBottom:16}}>🔍</div>
              <div style={{fontSize:'1.1rem'}}>No customers found</div>
            </div>
          )}
        </GlassPanel>

        <Footer />
      </div>
    </div>
  );
}
