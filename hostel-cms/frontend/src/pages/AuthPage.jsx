import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const CATEGORIES = ['Plumbing', 'Electrical', 'Wi-Fi', 'Furniture', 'Cleanliness', 'Other']

export default function AuthPage() {
  const [tab, setTab] = useState('login')
  const { login } = useAuth()
  const navigate = useNavigate()

  // ── Login state ──
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginErr, setLoginErr] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // ── Register state ──
  const [regForm, setRegForm] = useState({
    name: '', email: '', password: '', role: 'student', roomNumber: ''
  })
  const [regErr, setRegErr] = useState('')
  const [regLoading, setRegLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginErr('')
    setLoginLoading(true)
    try {
      const { data } = await api.post('/auth/login', loginForm)
      login(data)
      navigate(data.role === 'admin' ? '/admin' : '/student')
    } catch (err) {
      setLoginErr(err.response?.data?.message || 'Cannot connect to server. Is the backend running?')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegErr('')
    setRegLoading(true)
    try {
      const { data } = await api.post('/auth/register', regForm)
      login(data)
      navigate(data.role === 'admin' ? '/admin' : '/student')
    } catch (err) {
      setRegErr(err.response?.data?.message || 'Cannot connect to server. Is the backend running?')
    } finally {
      setRegLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="auth-header">
          <h1>HostelCMS</h1>
          <p>Hostel Complaint Management System</p>
        </div>

        <div className="tab-row">
          <button className={`tab-btn ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>
            Login
          </button>
          <button className={`tab-btn ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>
            Register
          </button>
        </div>

        {/* ── LOGIN ── */}
        {tab === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email" placeholder="you@hostel.edu" required
                value={loginForm.email}
                onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password" placeholder="••••••••" required
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
            {loginErr && <div className="alert alert-error">{loginErr}</div>}
            <button className="btn btn-primary btn-block" type="submit" disabled={loginLoading}>
              {loginLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        )}

        {/* ── REGISTER ── */}
        {tab === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text" placeholder="John Doe" required
                value={regForm.name}
                onChange={e => setRegForm({ ...regForm, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email" placeholder="you@hostel.edu" required
                value={regForm.email}
                onChange={e => setRegForm({ ...regForm, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password" placeholder="Min 6 characters" required minLength={6}
                value={regForm.password}
                onChange={e => setRegForm({ ...regForm, password: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={regForm.role}
                onChange={e => setRegForm({ ...regForm, role: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {regForm.role === 'student' && (
              <div className="form-group">
                <label>Room Number</label>
                <input
                  type="text" placeholder="e.g. B-204"
                  value={regForm.roomNumber}
                  onChange={e => setRegForm({ ...regForm, roomNumber: e.target.value })}
                />
              </div>
            )}
            {regErr && <div className="alert alert-error">{regErr}</div>}
            <button className="btn btn-primary btn-block" type="submit" disabled={regLoading}>
              {regLoading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
