import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './styles/theme.css'
import NavBar from './components/NavBar'
import Landing from './pages/Landing'
import BankLogin from './pages/BankLogin'
import Dashboard from './pages/Dashboard'
import BankAdmin from './pages/BankAdmin'
import AddCustomer from './pages/AddCustomer'
import CustomerProfile from './pages/CustomerProfile'
import CustomersList from './pages/CustomersList'
import CreateLoan from './pages/CreateLoan'
import LoansList from './pages/LoansList'
import CustomerPortal from './pages/CustomerPortal'
import InvestorDashboard from './pages/InvestorDashboard'
import ComplianceReports from './pages/ComplianceReports'

function App(){
  return (
    <Router>
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'#000'}}>
        <Routes>
          {/* Landing Page - No NavBar */}
          <Route path="/" element={<Landing onExplore={(route) => window.location.href = `/${route}`} />} />
          
          {/* Bank Flow - With NavBar */}
          <Route path="/login" element={<><NavBar /><BankLogin /></>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bank" element={<BankAdmin />} />
          
          {/* Customer Management - No NavBar (has SideNav) */}
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customer/add" element={<AddCustomer />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
          
          {/* Loan Management - No NavBar (has SideNav) */}
          <Route path="/loans" element={<LoansList />} />
          <Route path="/loan/create/:customerId" element={<CreateLoan />} />
          
          {/* Other Pages - With NavBar */}
          <Route path="/customer-portal" element={<><NavBar /><CustomerPortal /></>} />
          <Route path="/investor" element={<><NavBar /><InvestorDashboard /></>} />
          
          {/* Reports - No NavBar (has SideNav) */}
          <Route path="/compliance" element={<ComplianceReports />} />
          <Route path="/reports" element={<ComplianceReports />} />
          
          {/* Redirect old routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
