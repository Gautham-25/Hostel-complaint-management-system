// Helpers
export const leftClass = (status) => {
  if (status === 'Open') return 'left-blue'
  if (status === 'In Progress') return 'left-amber'
  return 'left-green'
}

export const badgeClass = (status) => {
  if (status === 'Open') return 'badge-open'
  if (status === 'In Progress') return 'badge-progress'
  return 'badge-resolved'
}

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

// Component
export default function ComplaintCard({ complaint, onEdit, onDelete }) {
  const { _id, category, roomNumber, studentName, description, adminRemark, status, createdAt, updatedAt } = complaint

  return (
    <div className={`complaint-card ${leftClass(status)}`}>
      <div className="cc-body">
        <div className="cc-top">
          <span className="cc-category">{category}</span>
          <span className="cc-room">Room {roomNumber}</span>
          {studentName && <span className="cc-student">— {studentName}</span>}
        </div>
        <p className="cc-desc">{description}</p>
        {adminRemark && <p className="cc-remark">💬 Admin: {adminRemark}</p>}
        <div className="cc-meta">
          <span>Submitted: {fmtDate(createdAt)}</span>
          <span>Updated: {fmtDate(updatedAt)}</span>
        </div>
      </div>

      <div className="cc-actions">
        <span className={`badge ${badgeClass(status)}`}>{status}</span>
        {onEdit && (
          <button className="btn btn-secondary btn-sm" onClick={() => onEdit(complaint)}>
            ✏️ Update
          </button>
        )}
        {onDelete && (
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(_id)}>
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  )
}
