from flask import Flask, request, redirect, url_for, session, render_template, jsonify
from authlib.integrations.flask_client import OAuth
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import dbRequests, student, teacher, course
import json

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
    html_error = error_message if error_message else ''
    return render_template('login.html', html_error=html_error)

@app.route('/login')
def login():
    return auth0.authorize_redirect(redirect_uri='http://127.0.0.1:5000/callback')

@app.route('/callback')
def callback_handling():
    #print("HI")
    #resp = auth0.authorize_access_token()
    #session['jwt_payload'] = resp.json()
    #email = session['jwt_payload']['email']
    email = "kattyyu29@gmail.com"
    role = 'teacher'
    password = 'password'
    users[email] = ""
    user = User(email, role)
    users_db[email] = user
    student.Student(email, email, email, password)  # don't have their password
    
    login_user(user)
    return redirect('/dashboard')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        role = request.form['role']  # assuming you have a role field in your registration form

        users[email] = password
        user = User(email, role)
        users_db[email] = user
            
        if role == 'student':
            student.Student(name, email, email, password)  # no username
            return redirect('/')
        elif role == 'teacher':
            teacher.Teacher(name, email, email, password)
            return redirect('/')
    return render_template('register.html')


@app.route('/login_direct', methods=['POST'])
def login_direct():
    email = request.form['email']
    password = request.form['password']
    role = request.form['role']
    """
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
    """
    role = "Students" if role == "student" else role
    role = "Teachers" if role == "teacher" else role
    if dbRequests.LOGIN(email, password, role):
        user = User(email, role)
        if login_user(user):
            return redirect('/dashboard')
    else:
        session['error'] = 'Invalid credentials, please try again!'
        return redirect('/')

@app.route('/dashboard')
@login_required
def dashboard():
    role = "Students" if current_user.role == "student" else role
    role = "Teachers" if current_user.role == "teacher" else role
    person = dbRequests.getUserByKey("Email", current_user.id, role)
    name = person.get("Name")
    if current_user.role == 'student':
        return render_template('student_dashboard.html', name=name)
    elif current_user.role == 'teacher':
        return render_template('teacher_dashboard.html', name=name)
    else:
        return redirect(url_for('login'))

@app.route('/games')
@login_required
def games():
    pass

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/')


# Route for creating a classroom
@app.route('/create-classroom', methods=['GET', 'POST'])
@login_required
def create_classroom():
    if current_user.role != 'teacher':
        return jsonify({'error': 'Only teachers can create classrooms'}), 403
    
    if request.method == 'POST':
        classname = request.form['classname']
        subject = request.form['subject']
        selected_students = request.form.getlist('students[]')  # Get list of selected students
        teacher = current_user.id
        print(classname, subject, selected_students, teacher)
        course.Course(classname, subject, teacher, selected_students)
        return redirect('/dashboard') 
        
    else:  # GET request
        students = dbRequests.getAllStudents("Students")
        return render_template('create_classroom.html', students=students)


# Route for rendering the student's classrooms page
@app.route('/student-classrooms')
@login_required
def student_classrooms():
    student = dbRequests.getUserByKey("Email", current_user.id, "Students")
    courses = student.get("Courses")
    course_links = []
    for course in courses:
        course_data = json.loads(course)
        course_name = course_data.get("name")
        course_links.append({'name': course_name, 'link': url_for('classroom', room=course_name)})
    return render_template('student_classrooms.html', classrooms=course_links)

@app.route('/room/<room>')
@login_required
def classroom(room):
    return render_template('classroom.html', room=room)

@app.route('/math-games')
@login_required
def math_game():
    return render_template('MathGame.html')

@app.route('/island')
@login_required
def island():
    return render_template('island.html')

if __name__ == '__main__':
    app.run(debug=True)
