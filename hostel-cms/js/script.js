let currentType = '';

function openModal(type) {
  currentType = type;
  const isStudent = type === 'student';

  const accentColor = isStudent ? '#2563eb' : '#f97316';
  const badgeBg = isStudent ? '#eff6ff' : '#fff7ed';
  const badgeColor = isStudent ? '#2563eb' : '#f97316';
  const label = isStudent ? '🎓 Student Portal' : '🛡️ Admin Portal';
  const placeholder = isStudent ? 'student@hostel.edu' : 'admin@hostel.edu';
  const desc = isStudent
    ? 'Sign in to submit and track your hostel complaints.'
    : 'Admin access to view and resolve all student complaints.';

  document.getElementById('modalContent').innerHTML = `
    <span class="modal-badge" style="background:${badgeBg}; color:${badgeColor}">${label}</span>
    <h2>Welcome Back</h2>
    <p>${desc}</p>

    <div class="form-group">
      <label class="form-label">Email</label>
      <input class="form-input" type="email" id="emailInput" placeholder="${placeholder}" />
    </div>

    <div class="form-group">
      <label class="form-label">Password</label>
      <input class="form-input" type="password" id="passwordInput" placeholder="Enter your password" />
    </div>

    <button class="form-submit" style="background:${accentColor}" onclick="handleLogin()">
      Sign In
    </button>
  `;

  document.getElementById('modalOverlay').classList.add('open');
}

function handleLogin() {
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  const isStudent = currentType === 'student';
  const icon = isStudent ? '🎓' : '🛡️';
  const dest = isStudent ? 'Student Dashboard' : 'Admin Dashboard';

  document.getElementById('modalContent').innerHTML = `
    <div style="text-align:center; padding: 20px 0">
      <div style="font-size: 3rem; margin-bottom: 16px">${icon}</div>
      <h2 style="margin-bottom: 10px">Login Successful!</h2>
      <p>Redirecting to your ${dest}…</p>
    </div>
  `;

  setTimeout(closeModal, 1800);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// Close modal when clicking the backdrop
document.getElementById('modalOverlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});
