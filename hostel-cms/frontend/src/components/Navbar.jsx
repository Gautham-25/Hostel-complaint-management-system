import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ isAdmin = false }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        HostelCMS
        {isAdmin && <span className="admin-badge">Admin</span>}
      </div>
      <div className="navbar-right">
        <span className="navbar-user">
          {isAdmin ? `Admin: ${user?.name}` : `Hi, ${user?.name}`}
        </span>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
