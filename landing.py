from flask import Flask, request, redirect, url_for, session, render_template, jsonify
from authlib.integrations.flask_client import OAuth
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.secret_key = 'super_secret_key'

login_manager = LoginManager(app)
users = {}  # Storing user passwords

class User(UserMixin):
    def __init__(self, id, role):
        self.id = id
        self.role = role

# Placeholder; hard-coded users
users_db = {}

@login_manager.user_loader
def load_user(user_id):
    return users_db.get(user_id)

oauth = OAuth(app)
auth0 = oauth.register(
    'auth0',
    client_id='bfM9hKkvCNpiBlyRbHLUyh9kZ2QXMSLo',
    client_secret='jq7Kic1ODao8UgafAzYfEyS5PGa7GCQZtyuVVK4ID9SIpsctnuDAE8kecZRACFSw',
    api_base_url='https://dev-0wsvj6mwv3yd6l6h.us.auth0.com',
    access_token_url='https://dev-0wsvj6mwv3yd6l6h.us.auth0.com/oauth/token',
    authorize_url="https://dev-0wsvj6mwv3yd6l6h.us.auth0.com/authorize",
    client_kwargs={'scope': 'openid profile email'},
)

@app.route('/')
def index():
    error_message = session.pop('error', None)
    html_error = f'<div style="color: red; text-align: center; margin-bottom: 20px; margin-top: 10px;">{error_message}</div>' if error_message else ''
    return render_template('login.html', html_error=html_error)

@app.route('/login')
def login():
    return auth0.authorize_redirect(redirect_url='http://localhost:5000/callback')

@app.route('/callback')
def callback_handling():
    resp = auth0.authorize_access_token()
    session['jwt_payload'] = resp.json()
    email = session['jwt_payload']['email']
    role = 'student' if email.startswith('student') else 'teacher'
    user = User(email, role)
    login_user(user)
    session.clear()
    return redirect('/dashboard')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        role = request.form['role']  # assuming you have a role field in your registration form
        if email not in users:
            users[email] = generate_password_hash(password)
            user = User(email, role)
            users_db[email] = user
            return redirect('/')  # Redirect to the login page after successful registration
        else:
            session['error'] = 'Email already exists!'
            return redirect(url_for('register'))
    return render_template('register.html')


@app.route('/login_direct', methods=['POST'])
def login_direct():
    email = request.form['email']
    password = request.form['password']
    if check_password_hash(users.get(email, ''), password):
        role = 'student' if email.startswith('student') else 'teacher'
        user = User(email, role)
        if login_user(user):
            return redirect('/dashboard')
        else:
            return redirect(url_for('login'))
    else:
        session['error'] = 'Invalid credentials, please try again!'
        return redirect('/')

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.role == 'student':
        return render_template('student_dashboard.html')
    elif current_user.role == 'teacher':
        return render_template('teacher_dashboard.html')
    else:
        return redirect(url_for('login'))

@app.route('/games')
@login_required
def games():
    #
    pass

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/')

# Route for rendering the create classroom page
@app.route('/create-classroom', methods=['GET'])
@login_required
def render_create_classroom():
    if current_user.role != 'teacher':
        return jsonify({'error': 'Only teachers can create classrooms'}), 403
    
    return render_template('create_classroom.html')

# Route for creating a classroom
@app.route('/create-classroom', methods=['POST'])
@login_required
def create_classroom():
    if current_user.role != 'teacher':
        return jsonify({'error': 'Only teachers can create classrooms'}), 403
    
    # Extract data from the POST request
    data = request.json
    teacher_email = current_user.id
    subject = data.get('subject')
    students = data.get('students', [])
    
    # Here you would connect to MongoDB and insert the classroom data
    
    # For demonstration purposes, let's return the received data
    return jsonify({
        'teacher_email': teacher_email,
        'subject': subject,
        'students': students
    })

# Route for rendering the student's classrooms page
@app.route('/student-classrooms')
@login_required
def render_student_classrooms():
    if current_user.role != 'student':
        return jsonify({'error': 'Only students can view their classrooms'}), 403
    
    # Placeholder: Render student classrooms template
    return render_template('student_classrooms.html')

@app.route('/island')
@login_required
def render_island():
    return render_template('island.html')

if __name__ == '__main__':
    app.run(debug=True)
