import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../components/Card';
import Footer from '../components/Footer';
import GlassPanel from '../components/GlassPanel';
import SideNav from '../components/SideNav';
import api from '../services/api';
import '../styles/theme.css';

const portfolioData = [
  { month: 'Jan', tvl: 180, loans: 15, tokens: 850 },
  { month: 'Feb', tvl: 240, loans: 18, tokens: 1200 },
  { month: 'Mar', tvl: 320, loans: 22, tokens: 1600 },
  { month: 'Apr', tvl: 410, loans: 26, tokens: 2100 },
  { month: 'May', tvl: 480, loans: 28, tokens: 2450 },
  { month: 'Jun', tvl: 560, loans: 31, tokens: 2800 },
];

const assetDistribution = [
  { name: 'Gold', value: 450, color: '#FFD700' },
  { name: 'Real Estate', value: 320, color: '#9be12b' },
  { name: 'Stocks', value: 180, color: '#c7ff3a' },
  { name: 'Mutual Funds', value: 150, color: '#82ca9d' },
];

const recentActivity = [
  { event: '🪙 Token Minted', customer: 'Rajesh Kumar', amount: '520 GOLD', time: '2h ago', status: 'success' },
  { event: '💰 Loan Disbursed', customer: 'Priya Sharma', amount: '₹4,00,000', time: '4h ago', status: 'success' },
  { event: '✓ KYC Approved', customer: 'Amit Patel', amount: '—', time: '6h ago', status: 'info' },
  { event: '📊 Asset Tokenized', customer: 'Sneha Reddy', amount: '₹3.2L Gold', time: '8h ago', status: 'success' },
  { event: '🔒 Account Frozen', customer: 'Suspicious Activity', amount: '0xE5f6...', time: '1d ago', status: 'warning' },
];

const topCustomers = [
  { name: 'Rajesh Kumar', tvl: '₹12.5L', loans: 3, tokens: '1,250', risk: 'Low' },
  { name: 'Deepak Singh', tvl: '₹10.2L', loans: 2, tokens: '1,020', risk: 'Low' },
  { name: 'Amit Patel', tvl: '₹8.5L', loans: 4, tokens: '850', risk: 'Medium' },
];

export default function BankAdmin(){
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('6M');
  const [analytics, setAnalytics] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // TODO: Replace with actual bank address from context/login
  const bankAddress = '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch analytics
        const analyticsResult = await api.getBankAnalytics(bankAddress);
        if (analyticsResult.success) {
          setAnalytics(analyticsResult.data);
        }

        // Fetch activity feed
        const activityResult = await api.getBankActivity(bankAddress);
        if (activityResult.success) {
          setActivity(activityResult.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [bankAddress]);

  // Show loading state
  if (loading && !analytics) {
    return (
      <div style={{display:'flex',minHeight:'100vh',background:'#000',alignItems:'center',justifyContent:'center'}}>
        <div style={{color:'#fff',fontSize:'1.2rem'}}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#000'}}>
      <SideNav active="bank" />
      
      <div style={{flex:1,padding:'32px 48px',paddingBottom:0,display:'flex',flexDirection:'column'}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:8,color:'#fff'}}>Bank Console</h1>
          <p className="small-muted" style={{fontSize:'1.05rem'}}>
            Complete overview of tokenization, lending, and compliance operations
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{display:'flex',gap:16,marginBottom:32,flexWrap:'wrap'}}>
          <button className="btn primary" onClick={() => navigate('/customer/add')} style={{padding:'14px 28px',fontSize:'1rem'}}>
            + Onboard Customer
          </button>
          <button className="btn" style={{padding:'14px 28px',fontSize:'1rem'}}>
            🪙 Mint Tokens
          </button>
          <button className="btn" style={{padding:'14px 28px',fontSize:'1rem'}}>
            💰 Create Loan
          </button>
          <button className="btn" onClick={() => navigate('/reports')} style={{padding:'14px 28px',fontSize:'1rem'}}>
            📊 Export Report
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,marginBottom:32}}>
          <Card>
            <div style={{fontSize:'2rem',marginBottom:12}}>💰</div>
            <div className="small-muted" style={{marginBottom:8,fontSize:'0.9rem'}}>Total Value Locked</div>
            <div style={{display:'flex',alignItems:'baseline',gap:12}}>
              <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)'}}>
                ₹{analytics?.stats?.totalValueLocked ? (analytics.stats.totalValueLocked / 100000).toFixed(1) : '0'}L
              </div>
              <div style={{fontSize:'0.9rem',color:'#82ca9d',fontWeight:600}}>
                {analytics?.stats?.tvlChangePercent ? `+${analytics.stats.tvlChangePercent}%` : '--'}
              </div>
            </div>
          </Card>
          <Card>
            <div style={{fontSize:'2rem',marginBottom:12}}>👥</div>
            <div className="small-muted" style={{marginBottom:8,fontSize:'0.9rem'}}>Active Customers</div>
            <div style={{display:'flex',alignItems:'baseline',gap:12}}>
              <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>
                {analytics?.stats?.totalCustomers || 0}
              </div>
              <div style={{fontSize:'0.9rem',color:'#82ca9d',fontWeight:600}}>
                {analytics?.stats?.newCustomersThisMonth ? `+${analytics.stats.newCustomersThisMonth}` : '--'}
              </div>
            </div>
          </Card>
          <Card>
            <div style={{fontSize:'2rem',marginBottom:12}}>🪙</div>
            <div className="small-muted" style={{marginBottom:8,fontSize:'0.9rem'}}>Tokens Minted</div>
            <div style={{display:'flex',alignItems:'baseline',gap:12}}>
              <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>
                {analytics?.stats?.totalTokensMinted ? (analytics.stats.totalTokensMinted / 1000).toFixed(1) : '0'}K
              </div>
              <div style={{fontSize:'0.9rem',color:'#82ca9d',fontWeight:600}}>
                {analytics?.stats?.tokensChangePercent ? `+${analytics.stats.tokensChangePercent}%` : '--'}
              </div>
            </div>
          </Card>
          <Card>
            <div style={{fontSize:'2rem',marginBottom:12}}>💵</div>
            <div className="small-muted" style={{marginBottom:8,fontSize:'0.9rem'}}>Active Loans</div>
            <div style={{display:'flex',alignItems:'baseline',gap:12}}>
              <div style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>
                {analytics?.stats?.activeLoans || 0}
              </div>
              <div style={{fontSize:'0.9rem',color:'#82ca9d',fontWeight:600}}>
                {analytics?.stats?.loansChangePercent ? `+${analytics.stats.loansChangePercent}%` : '--'}
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,marginBottom:32}}>
          {/* Portfolio Growth */}
          <GlassPanel style={{padding:28}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <div>
                <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:8,color:'#fff'}}>Portfolio Growth</h3>
                <div className="small-muted">Total Value Locked & Loan Volume</div>
              </div>
              <div style={{display:'flex',gap:8}}>
                {['1M', '3M', '6M', '1Y'].map((range) => (
                  <button
                    key={range}
                    className={timeRange === range ? 'btn primary' : 'btn'}
                    onClick={() => setTimeRange(range)}
                    style={{padding:'6px 14px',fontSize:'0.85rem'}}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorTVL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="var(--muted)" style={{fontSize:12}} />
                <YAxis stroke="var(--muted)" style={{fontSize:12}} />
                <Tooltip 
                  contentStyle={{background:'rgba(11,15,18,0.95)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,color:'#fff',padding:12}}
                />
                <Area type="monotone" dataKey="tvl" stroke="var(--accent)" fillOpacity={1} fill="url(#colorTVL)" strokeWidth={2} name="TVL (₹L)" />
                <Area type="monotone" dataKey="loans" stroke="#82ca9d" fillOpacity={1} fill="url(#colorLoans)" strokeWidth={2} name="Loans" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassPanel>

          {/* Asset Distribution */}
          <GlassPanel style={{padding:28}}>
            <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Asset Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={assetDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {assetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{background:'rgba(11,15,18,0.95)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,color:'#fff'}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:16}}>
              {assetDistribution.map((asset, i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{width:12,height:12,borderRadius:'50%',background:asset.color}}></div>
                    <span style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.8)'}}>{asset.name}</span>
                  </div>
                  <span style={{fontSize:'0.9rem',fontWeight:600,color:'#fff'}}>₹{asset.value}L</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Bottom Section */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:32}}>
          {/* Recent Activity */}
          <GlassPanel style={{padding:28}}>
            <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Recent Activity</h3>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {activity.length > 0 ? activity.slice(0, 5).map((act, i) => (
                <div key={i} style={{
                  padding:16,
                  background:'rgba(255,255,255,0.02)',
                  borderRadius:12,
                  border:'1px solid rgba(255,255,255,0.06)',
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center'
                }}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'1rem',fontWeight:600,color:'#fff',marginBottom:4}}>
                      {act.type === 'token_mint' && '🪙 Token Minted'}
                      {act.type === 'loan_disbursed' && '💰 Loan Disbursed'}
                      {act.type === 'customer_added' && '✓ Customer Added'}
                      {!['token_mint', 'loan_disbursed', 'customer_added'].includes(act.type) && '📊 Activity'}
                    </div>
                    <div style={{fontSize:'0.9rem',color:'var(--muted)'}}>
                      {act.customer_name || act.wallet_address?.slice(0, 10) + '...'} • {act.amount || '--'}
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:'0.85rem',color:'var(--muted)'}}>
                      {new Date(act.created_at).toLocaleString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              )) : (
                <div style={{textAlign:'center',padding:'40px 0',color:'var(--muted)'}}>
                  No recent activity
                </div>
              )}
            </div>
          </GlassPanel>

          {/* Top Customers */}
          <GlassPanel style={{padding:28}}>
            <h3 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:20,color:'#fff'}}>Top Customers by TVL</h3>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {topCustomers.map((customer, i) => (
                <div key={i} style={{
                  padding:20,
                  background:'rgba(255,255,255,0.02)',
                  borderRadius:12,
                  border:'1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                    <div style={{fontSize:'1.05rem',fontWeight:600,color:'#fff'}}>{customer.name}</div>
                    <div style={{fontSize:'1.1rem',fontWeight:700,color:'var(--accent)'}}>{customer.tvl}</div>
                  </div>
                  <div style={{display:'flex',gap:20,fontSize:'0.9rem'}}>
                    <div>
                      <span style={{color:'var(--muted)'}}>Loans:</span>{' '}
                      <span style={{color:'#fff',fontWeight:600}}>{customer.loans}</span>
                    </div>
                    <div>
                      <span style={{color:'var(--muted)'}}>Tokens:</span>{' '}
                      <span style={{color:'#fff',fontWeight:600}}>{customer.tokens}</span>
                    </div>
                    <div>
                      <span style={{color:'var(--muted)'}}>Risk:</span>{' '}
                      <span style={{
                        color: customer.risk === 'Low' ? 'var(--accent)' : '#ffc83a',
                        fontWeight:600
                      }}>{customer.risk}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <Footer />
      </div>
    </div>
  );
}
