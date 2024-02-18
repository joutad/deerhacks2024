import json
import dbRequests


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
                dbRequests.PATCH("Accounts", "Teachers", {"Email": self.teacher}, {"$set": {"Courses": i.get("Courses")}})

    def addStudents(self,studentEmails):
        accounts = dbRequests.GET("Accounts","Students").get("documents")
        for i in accounts:
            for j in studentEmails:
                if j.split("(")[1].split(")")[0] == i.get("Email"):
                    self.students.append(i.get("Email"))
                    i.get("Courses").append(json.dumps(self.__dict__))
                    id=i.pop("_id")
                    dbRequests.PATCH("Accounts","Students",{"Email":i.get("Email")},{"$set": {"Courses": i.get("Courses")}})
