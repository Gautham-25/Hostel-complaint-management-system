import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ComplaintCard from '../components/ComplaintCard'
import api from '../api/axios'

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [pageTitle, setPageTitle] = useState('All Complaints')

  // ── Modal ──
  const [modal, setModal] = useState(null)
  const [modalErr, setModalErr] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchComplaints() }, [filter])

  const fetchComplaints = async () => {
    setLoading(true)
    try {
      const url = filter ? `/complaints?status=${encodeURIComponent(filter)}` : '/complaints'
      const { data } = await api.get(url)
      setComplaints(data)
    } catch {
      // leave empty
    } finally {
      setLoading(false)
    }
  }

  const applyFilter = (status, title) => {
    setFilter(status)
    setPageTitle(title)
  }

  const openModal = (c) => {
    setModal({ _id: c._id, status: c.status, adminRemark: c.adminRemark || '' })
    setModalErr('')
  }

  const saveUpdate = async () => {
    setSaving(true)
    setModalErr('')
    try {
      await api.put(`/complaints/${modal._id}`, {
        status: modal.status,
        adminRemark: modal.adminRemark,
      })
      setModal(null)
      fetchComplaints()
    } catch (err) {
      setModalErr(err.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this complaint?')) return
    try {
      await api.delete(`/complaints/${id}`)
      fetchComplaints()
    } catch {
      alert('Delete failed.')
    }
  }

  const count = (s) => complaints.filter(c => c.status === s).length

  return (
    <>
      <Navbar isAdmin />
      <div className="dashboard">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <button className={`sidebar-btn ${filter === '' ? 'active' : ''}`} onClick={() => applyFilter('', 'All Complaints')}>
            📋 All
          </button>
          <button className={`sidebar-btn ${filter === 'Open' ? 'active' : ''}`} onClick={() => applyFilter('Open', 'Open Complaints')}>
            🔵 Open
          </button>
          <button className={`sidebar-btn ${filter === 'In Progress' ? 'active' : ''}`} onClick={() => applyFilter('In Progress', 'In Progress')}>
            🟡 In Progress
          </button>
          <button className={`sidebar-btn ${filter === 'Resolved' ? 'active' : ''}`} onClick={() => applyFilter('Resolved', 'Resolved')}>
            🟢 Resolved
          </button>
        </aside>

        <main className="main">

          {/* ── STATS ── */}
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">{complaints.length}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-box blue">
              <div className="stat-number">{count('Open')}</div>
              <div className="stat-label">Open</div>
            </div>
            <div className="stat-box amber">
              <div className="stat-number">{count('In Progress')}</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-box green">
              <div className="stat-number">{count('Resolved')}</div>
              <div className="stat-label">Resolved</div>
            </div>
          </div>

          {/* ── LIST ── */}
          <div className="section-header">
            <h2 className="section-title">{pageTitle}</h2>
            <button className="btn btn-ghost btn-sm" onClick={fetchComplaints}>↻ Refresh</button>
          </div>

          <div className="complaint-list">
            {loading && <p className="loading">Loading…</p>}
            {!loading && complaints.length === 0 && (
              <p className="empty-state">No complaints found.</p>
            )}
            {complaints.map(c => (
              <ComplaintCard
                key={c._id}
                complaint={c}
                onEdit={openModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      </div>

      {/* ── UPDATE MODAL ── */}
      {modal && (
        <div
          className="modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null) }}
        >
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <h3 className="modal-title">Update Complaint</h3>

            <div className="form-group">
              <label>Status</label>
              <select
                value={modal.status}
                onChange={e => setModal({ ...modal, status: e.target.value })}
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="form-group">
              <label>Admin Remark</label>
              <textarea
                placeholder="Add a resolution note…"
                value={modal.adminRemark}
                onChange={e => setModal({ ...modal, adminRemark: e.target.value })}
              />
            </div>

            {modalErr && <div className="alert alert-error">{modalErr}</div>}

            <button className="btn btn-primary btn-block" onClick={saveUpdate} disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
