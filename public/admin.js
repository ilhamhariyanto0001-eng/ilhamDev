let token = '';
document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/auth/login', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if(data.token){
    token = data.token;
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  } else {
    alert('Login failed');
  }
});

document.getElementById('projectForm').addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('/api/projects', {
    method:'POST',
    headers:{'Authorization':`Bearer ${token}`},
    body: formData
  });
  if(res.ok){
    alert('Project added');
    e.target.reset();
  } else {
    alert('Failed');
  }
});
