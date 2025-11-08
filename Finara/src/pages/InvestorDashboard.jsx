import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import GlassPanel from '../components/GlassPanel';
import Card from '../components/Card';
import Footer from '../components/Footer';
import '../styles/theme.css';

const marketData = [
  { time: '09:00', price: 102 },
  { time: '10:00', price: 105 },
  { time: '11:00', price: 103 },
  { time: '12:00', price: 108 },
  { time: '13:00', price: 112 },
  { time: '14:00', price: 110 },
  { time: '15:00', price: 115 },
];

const portfolioAllocation = [
  { name: 'Gold Tokens', value: 45, color: '#c7ff3a' },
  { name: 'Real Estate', value: 30, color: '#9be12b' },
  { name: 'Stock Tokens', value: 25, color: '#6ea81f' },
];

const activeOrders = [
  { type: 'Buy', asset: 'Gold Token', amount: '25 GOLD', price: '₹102', status: 'Pending' },
  { type: 'Sell', asset: 'Real Estate', amount: '10 RE', price: '₹320', status: 'Filled' },
  { type: 'Buy', asset: 'Stock Token', amount: '50 STK', price: '₹85', status: 'Pending' },
];

const availableAssets = [
  { id: 1, type: 'Gold', owner: 'Rajesh Kumar', quantity: '520 GOLD', price: '₹5,20,000', yield: '3.2%' },
  { id: 2, type: 'Mutual Funds', owner: 'Priya Sharma', quantity: '280 MF', price: '₹2,80,000', yield: '4.1%' },
  { id: 3, type: 'Real Estate', owner: 'Amit Patel', quantity: '125 RE', price: '₹6,25,000', yield: '5.5%' },
];

export default function InvestorDashboard(){
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('portfolio');

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo login - accept any email with password "demo123"
    if (loginForm.password === 'demo123') {
      setIsLoggedIn(true);
    } else {
      alert('Demo credentials: Any email with password "demo123"');
    }
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
                top:'-60px',
                right:'-60px',
                width:'220px',
                height:'220px',
                background:'radial-gradient(circle, rgba(199,255,58,0.1) 0%, transparent 70%)',
                borderRadius:'50%',
                pointerEvents:'none'
              }}></div>
              <div style={{
                position:'absolute',
                bottom:'-40px',
                left:'-40px',
                width:'170px',
                height:'170px',
                background:'radial-gradient(circle, rgba(155,225,43,0.08) 0%, transparent 70%)',
                borderRadius:'50%',
                pointerEvents:'none'
              }}></div>

              <div style={{textAlign:'center',marginBottom:40,position:'relative'}}>
                <div style={{
                  fontSize:'4rem',
                  marginBottom:20,
                  filter:'drop-shadow(0 4px 12px rgba(199,255,58,0.2))'
                }}>💼</div>
                <h2 style={{fontSize:'2.2rem',fontWeight:700,marginBottom:12,color:'#fff',letterSpacing:'-0.02em'}}>
                  Investor Portal
                </h2>
                <p className="small-muted" style={{fontSize:'1.05rem',lineHeight:1.6}}>
                  Access marketplace and manage your investment portfolio
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div style={{marginBottom:24}}>
                  <label style={{display:'block',marginBottom:10,fontWeight:600,color:'#fff',fontSize:'0.95rem'}}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="investor@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
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
                  <div style={{marginTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <label style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.9rem',color:'rgba(255,255,255,0.7)',cursor:'pointer'}}>
                      <input type="checkbox" style={{width:16,height:16,cursor:'pointer'}} />
                      Remember me
                    </label>
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
                  Login to Dashboard
                </button>

                <div style={{
                  padding:'16px',
                  background:'rgba(199,255,58,0.05)',
                  border:'1px solid rgba(199,255,58,0.15)',
                  borderRadius:12,
                  marginBottom:20
                }}>
                  <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.7)',marginBottom:6}}>
                    🔐 <strong style={{color:'#fff'}}>Demo Access</strong>
                  </div>
                  <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.6)'}}>
                    Email: <span style={{color:'var(--accent)',fontWeight:600,fontFamily:'monospace'}}>any email</span>
                    {' • '}
                    Password: <span style={{color:'var(--accent)',fontWeight:600,fontFamily:'monospace'}}>demo123</span>
                  </div>
                </div>

                <div style={{textAlign:'center',fontSize:'0.9rem',color:'var(--muted)'}}>
                  New investor? <a href="#" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600}}>Register Account</a>
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
            Investor Dashboard
          </h1>
          <p className="small-muted" style={{fontSize:'1.05rem'}}>
            Trade tokenized assets, track your portfolio, and analyze market trends
          </p>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:12,marginBottom:32,borderBottom:'1px solid rgba(255,255,255,0.1)',paddingBottom:12}}>
          {['portfolio', 'marketplace', 'orders', 'analytics'].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'btn primary' : 'btn'}
              onClick={() => setActiveTab(tab)}
              style={{padding:'10px 24px',fontSize:'1rem',textTransform:'capitalize'}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,marginBottom:32}}>
              <Card>
                <div style={{fontSize:'2rem',marginBottom:8}}>💰</div>
                <div className="small-muted" style={{fontSize:'0.9rem',marginBottom:8}}>Portfolio Value</div>
                <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)'}}>₹58.4L</div>
                <div style={{fontSize:'0.85rem',color:'#82ca9d',marginTop:4}}>+12.4% YTD</div>
              </Card>
              <Card>
                <div style={{fontSize:'2rem',marginBottom:8}}>📈</div>
                <div className="small-muted" style={{fontSize:'0.9rem',marginBottom:8}}>Unrealized P/L</div>
                <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)'}}>+₹3.1L</div>
                <div style={{fontSize:'0.85rem',color:'#82ca9d',marginTop:4}}>+5.6%</div>
              </Card>
              <Card>
                <div style={{fontSize:'2rem',marginBottom:8}}>💵</div>
                <div className="small-muted" style={{fontSize:'0.9rem',marginBottom:8}}>Realized P/L</div>
                <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>+₹1.2L</div>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginTop:4}}>From 8 trades</div>
              </Card>
              <Card>
                <div style={{fontSize:'2rem',marginBottom:8}}>📊</div>
                <div className="small-muted" style={{fontSize:'0.9rem',marginBottom:8}}>Avg Yield</div>
                <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)'}}>4.2%</div>
                <div style={{fontSize:'0.85rem',color:'var(--muted)',marginTop:4}}>Annual return</div>
              </Card>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24}}>
              <GlassPanel style={{padding:28}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
                  <div>
                    <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:4,color:'#fff'}}>Live Market</h3>
                    <div className="small-muted">Real-time price action — Gold Token (GOLD)</div>
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <button className="btn" style={{fontSize:'0.85rem',padding:'6px 12px'}}>1H</button>
                    <button className="btn primary" style={{fontSize:'0.85rem',padding:'6px 12px'}}>1D</button>
                    <button className="btn" style={{fontSize:'0.85rem',padding:'6px 12px'}}>1W</button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={marketData}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="var(--muted)" style={{fontSize:12}} />
                    <YAxis stroke="var(--muted)" style={{fontSize:12}} domain={[100, 120]} />
                    <Tooltip 
                      contentStyle={{background:'rgba(11,15,18,0.95)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,color:'#fff'}}
                    />
                    <Area type="monotone" dataKey="price" stroke="var(--accent)" fillOpacity={1} fill="url(#priceGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </GlassPanel>

              <div style={{display:'flex',flexDirection:'column',gap:24}}>
                <GlassPanel style={{padding:28}}>
                  <h4 style={{fontSize:'1.2rem',fontWeight:700,marginBottom:16,color:'#fff'}}>Portfolio Allocation</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={portfolioAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {portfolioAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{background:'rgba(11,15,18,0.95)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,color:'#fff'}}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{marginTop:12}}>
                    {portfolioAllocation.map((asset, i) => (
                      <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom: i < portfolioAllocation.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none'}}>
                        <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <div style={{width:12,height:12,borderRadius:3,background:asset.color}}></div>
                          <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.7)'}}>{asset.name}</div>
                        </div>
                        <div style={{fontWeight:600,fontSize:'0.95rem',color:'#fff'}}>{asset.value}%</div>
                      </div>
                    ))}
                  </div>
                </GlassPanel>

                <GlassPanel style={{padding:28}}>
                  <h4 style={{fontSize:'1.2rem',fontWeight:700,marginBottom:16,color:'#fff'}}>Quick Actions</h4>
                  <div style={{display:'flex',flexDirection:'column',gap:10}}>
                    <button className="btn primary" style={{width:'100%',padding:'12px',fontSize:'0.95rem'}} onClick={() => setActiveTab('marketplace')}>
                      🏪 Browse Marketplace
                    </button>
                    <button className="btn" style={{width:'100%',padding:'12px',fontSize:'0.95rem'}} onClick={() => setActiveTab('orders')}>
                      📋 View Orders
                    </button>
                    <button className="btn" style={{width:'100%',padding:'12px',fontSize:'0.95rem',marginTop:8}} onClick={() => setIsLoggedIn(false)}>
                      🚪 Logout
                    </button>
                  </div>
                </GlassPanel>
              </div>
            </div>
          </>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div>
            <div style={{marginBottom:24}}>
              <h3 style={{fontSize:'1.6rem',fontWeight:700,color:'#fff',marginBottom:8}}>Available Assets</h3>
              <p className="small-muted">Buy tokenized assets from verified sellers</p>
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              {availableAssets.map((asset) => (
                <GlassPanel key={asset.id} style={{padding:28}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
                    <div style={{flex:1}}>
                      <h4 style={{fontSize:'1.3rem',fontWeight:700,color:'#fff',marginBottom:8}}>{asset.type}</h4>
                      <div style={{display:'flex',gap:16,marginBottom:16}}>
                        <div>
                          <div className="small-muted" style={{marginBottom:4}}>Seller</div>
                          <div style={{fontSize:'0.95rem',fontWeight:600,color:'#fff'}}>{asset.owner}</div>
                        </div>
                        <div>
                          <div className="small-muted" style={{marginBottom:4}}>Quantity</div>
                          <div style={{fontSize:'0.95rem',fontWeight:600,color:'#fff'}}>{asset.quantity}</div>
                        </div>
                        <div>
                          <div className="small-muted" style={{marginBottom:4}}>Expected Yield</div>
                          <div style={{fontSize:'0.95rem',fontWeight:600,color:'var(--accent)'}}>{asset.yield}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)',marginBottom:12}}>{asset.price}</div>
                      <div style={{display:'flex',gap:12}}>
                        <button className="btn primary" style={{padding:'12px 24px',fontSize:'1rem'}}>
                          💰 Buy Now
                        </button>
                        <button className="btn" style={{padding:'12px 24px',fontSize:'1rem'}}>
                          📊 Details
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <GlassPanel style={{padding:32}}>
            <h3 style={{fontSize:'1.6rem',fontWeight:700,marginBottom:24,color:'#fff'}}>Active Orders</h3>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {activeOrders.map((order, i) => (
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
                    <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
                      <span style={{
                        fontWeight:700,
                        fontSize:'1.1rem',
                        color: order.type === 'Buy' ? 'var(--accent)' : '#ff8a65'
                      }}>{order.type}</span>
                      <span style={{
                        padding:'4px 12px',
                        borderRadius:6,
                        background: order.status === 'Filled' ? 'rgba(130,202,157,0.1)' : 'rgba(255,193,58,0.1)',
                        color: order.status === 'Filled' ? '#82ca9d' : '#ffc13a',
                        fontSize:'0.85rem',
                        fontWeight:600
                      }}>{order.status}</span>
                    </div>
                    <div style={{fontSize:'0.95rem',color:'var(--muted)'}}>
                      {order.asset} • {order.amount} @ {order.price}
                    </div>
                  </div>
                  <button className="btn" style={{padding:'10px 20px',fontSize:'0.9rem'}}>
                    Cancel Order
                  </button>
                </div>
              ))}
            </div>
          </GlassPanel>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <GlassPanel style={{padding:32}}>
            <h3 style={{fontSize:'1.6rem',fontWeight:700,marginBottom:24,color:'#fff'}}>Portfolio Analytics</h3>
            <div style={{textAlign:'center',padding:'80px 20px',color:'var(--muted)'}}>
              <div style={{fontSize:'4rem',marginBottom:16}}>📊</div>
              <div style={{fontSize:'1.2rem',marginBottom:12}}>Advanced Analytics Coming Soon</div>
              <div>Track performance, risk metrics, and generate reports</div>
            </div>
          </GlassPanel>
        )}
      </div>
      <Footer />
    </div>
  );
}
