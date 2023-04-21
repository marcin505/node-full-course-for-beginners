// auth
fetch('http://localhost:3500/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: 'kurde', username: 'Darth' }),
});
fetch('http://localhost:3500/logout', { method: 'GET' });
fetch('http://localhost:3500/refresh', { method: 'GET' });
fetch('http://localhost:3500/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: 'kurde', username: 'Sonic' }),
});

// employees
fetch('http://localhost:3500/employees', {
  method: 'GET',
  headers: { Authorization: `Bearer ${temp1}` },
});
