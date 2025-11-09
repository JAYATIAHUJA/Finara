import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import GlassPanel from '../components/GlassPanel';
import SideNav from '../components/SideNav';
import api from '../services/api';
import '../styles/theme.css';

export default function CustomersList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Get bank address from context/localStorage - using hardcoded for now
      const bankAddress = localStorage.getItem('bankAddress') || '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65';
      
      const result = await api.getCustomers(bankAddress);
      
      if (result.success) {
        // Transform API data to match the display format
        const transformedCustomers = (result.data || []).map(customer => ({
          id: customer.account_id || customer.wallet_address?.slice(0, 10) + '...',
          name: customer.name,
          kyc: customer.kyc_verified ? 'Verified' : 'Pending',
          asset: 'N/A', // Asset info not in customer table
          value: 'N/A', // Asset value not in customer table
          loans: 0, // Would need to fetch from loans table
          date: new Date(customer.verified_at || customer.created_at).toLocaleDateString(),
          walletAddress: customer.wallet_address,
          accountId: customer.account_id
        }));
        setCustomers(transformedCustomers);
      } else {
        setError(result.error || 'Failed to fetch customers');
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.message || 'An error occurred while fetching customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.accountId && c.accountId.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <button 
            className="btn" 
            onClick={fetchCustomers} 
            disabled={loading}
            style={{padding:'14px 28px',fontSize:'1rem'}}
            title="Refresh customer list"
          >
            🔄 Refresh
          </button>
          <button className="btn primary" onClick={() => navigate('/customer/add')} style={{padding:'14px 28px',fontSize:'1rem'}}>
            + Add Customer
          </button>
        </div>

        {/* Customers Table */}
        <GlassPanel style={{padding:0,marginBottom:32}}>
          {error && (
            <div style={{
              padding: '16px 20px',
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: 12,
              margin: 20,
              color: '#ff6b6b'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {loading ? (
            <div style={{padding:60,textAlign:'center',color:'var(--muted)'}}>
              <div style={{fontSize:'3rem',marginBottom:16}}>⏳</div>
              <div style={{fontSize:'1.1rem'}}>Loading customers...</div>
            </div>
          ) : (
            <div style={{overflowX:'auto'}}>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{padding:'16px 24px'}}>Customer ID</th>
                    <th>Name</th>
                    <th>KYC Status</th>
                    <th>Wallet Address</th>
                    <th>Joined Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td style={{padding:'16px 24px'}}>
                        <div style={{fontWeight:600,color:'var(--accent)',fontFamily:'monospace'}}>
                          {customer.accountId || customer.id}
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
                      <td>
                        <div style={{fontFamily:'monospace',fontSize:'0.85rem',color:'var(--muted)'}}>
                          {customer.walletAddress ? `${customer.walletAddress.slice(0, 6)}...${customer.walletAddress.slice(-4)}` : 'N/A'}
                        </div>
                      </td>
                      <td style={{color:'var(--muted)'}}>{customer.date}</td>
                      <td>
                        <button 
                          className="btn" 
                          onClick={() => navigate(`/customer/${customer.walletAddress || customer.id}`)}
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
          )}
          
          {!loading && filteredCustomers.length === 0 && (
            <div style={{padding:60,textAlign:'center',color:'var(--muted)'}}>
              <div style={{fontSize:'3rem',marginBottom:16}}>🔍</div>
              <div style={{fontSize:'1.1rem'}}>No customers found</div>
              {customers.length === 0 && (
                <div style={{fontSize:'0.9rem',marginTop:8}}>
                  <button 
                    className="btn primary" 
                    onClick={() => navigate('/customer/add')}
                    style={{marginTop:16,padding:'12px 24px'}}
                  >
                    Add Your First Customer
                  </button>
                </div>
              )}
            </div>
          )}
        </GlassPanel>

        <Footer />
      </div>
    </div>
  );
}
