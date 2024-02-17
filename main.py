import dbRequests
import student
import parent
import teacher
import course
import quiz

Jim = student.Student("Jim","jimbro123","jimgalagher@ocdsb.ca","123456")
Joel = student.Student("Joel","jojo3","jcher2@ocdsb.ca","124906")
Mark= parent.Parent("Mark","markhamilfan","markgregory@gmail.com","696969")
Mark.addChild(Jim.email)
Kyle = teacher.Teacher("Kyle","Kyler69","kylesmith@ocdsb.ca","456789")
Math = course.Course("Math","Math",Kyle.email,[Jim.email,Joel.email])
print(dbRequests.GET("Accounts","Students"))
print(dbRequests.GET("Accounts","Parents"))
print(dbRequests.GET("Accounts","Teachers"))