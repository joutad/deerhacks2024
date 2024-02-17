import json

import pymongo
from bson import ObjectId

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
        self.updateTeacher()
        self.students = []
        self.quizzes = []
        self.addStudents(studentEmails)

    def updateTeacher(self):
        TeacherList =dbRequests.GET("Accounts","Teachers")
        for i in TeacherList.get("documents"):
            if i.get("Email") == self.teacher:
                i.get("Courses").append(json.dumps(self.__dict__))
                print(i)
                print(dbRequests.PATCH("Accounts", "Teachers", {"Email": self.teacher}, {"$set": {"Courses": i.get("Courses")}}))

    def addStudents(self,studentEmails):
        accounts = dbRequests.GET("Accounts","Students").get("documents")
        for i in accounts:
            for j in studentEmails:
                if j == i.get("Email"):
                    self.students.append(i.get("Email"))
                    i.get("Courses").append(json.dumps(self.__dict__))
                    id=i.pop("_id")
                    dbRequests.PATCH("Accounts","Students",{"Email":i.get("Email")},{"$set": {"Courses": i.get("Courses")}})


course = Course("Math","Math","kylesmith@ocdsb.ca",["jimgalagher@ocdsb.ca","kylesmith@ocdsb.ca"])
accounts = dbRequests.GET("Accounts","Students").get("documents")
print(accounts)