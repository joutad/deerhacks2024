from account import Account
import dbRequests
class Teacher(Account):
    Cache = dbRequests.GET("Accounts","Teachers")
    def __init__(self, name, username, email, password):
        super().__init__(name, username, email, password)
        self.games = []
        self.courses = []
        self.accountType="Teacher"
        for i in Teacher.Cache.get("documents"):
            if i.get("Email")==email or i.get("Username")==username:
                del self
                return
        self.createAccount()

    def createAccount(self):
        dbRequests.POST("Accounts", "Teachers", {
            "Name": self.name,
            "Username": self.username,
            "Email": self.email,
            "Password:": self.password,
            "AccountType":self.accountType,
            "Courses": self.courses,
            "Games Available": self.games
        })
