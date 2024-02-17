import json

import dbRequests
from teacher import Teacher
from student import Student
from quiz import Quiz
import pickle

class Course:
    def __init__(self, name, subject, teacher, studentEmails=None):
        if studentEmails is None:
            studentEmails = []
        self.name = name
        self.subject = subject
        self.teacher = teacher
        self.students = []
        self.quizzes = []
        self.addStudents(studentEmails)

    def addStudents(self,studentEmails):
        accounts = dbRequests.GET("Accounts","Students").get("documents")
        for i in accounts:
            for j in studentEmails:
                if j == i.get("Email"):
                    self.students.append(i.get("_id"))
                    i.get("Courses").append(json.dumps(self.__dict__))
                    print((i))
                    dbRequests.PATCH(i.get("_id"),i)


course = Course("Math","Math","Kyle",["jimgalagher@ocdsb.ca","markgregory@gmail.com"])