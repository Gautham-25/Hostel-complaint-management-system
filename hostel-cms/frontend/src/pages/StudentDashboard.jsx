import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import ComplaintCard from '../components/ComplaintCard'
import api from '../api/axios'

const CATEGORIES = ['Plumbing', 'Electrical', 'Wi-Fi', 'Furniture', 'Cleanliness', 'Other']

export default function StudentDashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState('submit')

  // ── Submit form ──
  const [form, setForm] = useState({ category: '', roomNumber: user?.roomNumber || '', description: '' })
  const [submitErr, setSubmitErr] = useState('')
  const [submitOk, setSubmitOk] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // ── My complaints ──
  const [complaints, setComplaints] = useState([])
  const [loadingList, setLoadingList] = useState(false)
  const [listErr, setListErr] = useState('')

  useEffect(() => {
    if (tab === 'list') fetchComplaints()
  }, [tab])

  const fetchComplaints = async () => {
    setLoadingList(true)
    setListErr('')
    try {
      const { data } = await api.get('/complaints/my')
      setComplaints(data)
    } catch {
      setListErr('Failed to load complaints.')
    } finally {
      setLoadingList(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitErr('')
    setSubmitOk('')
    setSubmitting(true)
    try {
      await api.post('/complaints', form)
      setSubmitOk('✅ Complaint submitted successfully!')
      setForm({ category: '', roomNumber: user?.roomNumber || '', description: '' })
    } catch (err) {
      setSubmitErr(err.response?.data?.message || 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <aside className="sidebar">
          <button
            className={`sidebar-btn ${tab === 'submit' ? 'active' : ''}`}
            onClick={() => setTab('submit')}
          >
            📝 Submit Complaint
          </button>
          <button
            className={`sidebar-btn ${tab === 'list' ? 'active' : ''}`}
            onClick={() => setTab('list')}
          >
            📋 My Complaints
          </button>
        </aside>

        <main className="main">

          {/* ── SUBMIT ── */}
          {tab === 'submit' && (
            <>
              <div className="section-header">
                <h2 className="section-title">Submit a Complaint</h2>
              </div>
              <form className="form-card" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    required
                  >
                    <option value="">Select category…</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Room Number</label>
                  <input
                    type="text" placeholder="e.g. B-204" required
                    value={form.roomNumber}
                    onChange={e => setForm({ ...form, roomNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe the issue in detail…" required
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                {submitErr && <div className="alert alert-error">{submitErr}</div>}
                {submitOk  && <div className="alert alert-success">{submitOk}</div>}
                <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit Complaint'}
                </button>
              </form>
            </>
          )}

          {/* ── MY COMPLAINTS ── */}
          {tab === 'list' && (
            <>
              <div className="section-header">
                <h2 className="section-title">My Complaints</h2>
                <button className="btn btn-ghost btn-sm" onClick={fetchComplaints}>↻ Refresh</button>
              </div>
              <div className="complaint-list">
                {loadingList && <p className="loading">Loading…</p>}
                {listErr && <div className="alert alert-error">{listErr}</div>}
                {!loadingList && !listErr && complaints.length === 0 && (
                  <p className="empty-state">No complaints submitted yet.</p>
                )}
                {complaints.map(c => (
                  <ComplaintCard key={c._id} complaint={c} />
                ))}
              </div>
            </>
          )}

        </main>
      </div>
    </>
  )
}
