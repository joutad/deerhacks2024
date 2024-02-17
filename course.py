from teacher import Teacher
from student import Student
from quiz import Quiz

class Course:
    def __init__(self, name, subject, teacher):
        self.name = name
        self.subject = subject
        self.teacher = teacher
        self.students = []
        self.quizzes = []
