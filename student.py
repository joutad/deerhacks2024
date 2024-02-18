from account import Account
import dbRequests
class Student(Account):
    Cache=dbRequests.GET("Accounts","Students")
    def __init__(self, name, username, email, password):
        super().__init__(name, username, email, password)
        self.courses = []
        self.games = []
        self.accountType = "Student"
        for i in Student.Cache.get("documents"):
            if i.get("Email")==email or i.get("Username")==username:
                del self
                return
        self.createAccount()

    def createAccount(self):
        dbRequests.POST("Accounts", "Students", {
            "Name": self.name,
            "Username": self.username,
            "Email": self.email,
            "Password:": self.password,
            "AccountType": self.accountType,
            "Learning Points": 0,
            "Courses": self.courses,
            "Games Available": self.games
        })
    