import dbRequests
from account import Account

class Parent(Account):
    Cache = dbRequests.GET("Accounts","Parents")
    def __init__(self, name, username, email, password):
        super().__init__(name, username, email, password)
        self.students = []
        self.accountType = "Parent"
        for i in Parent.Cache.get("documents"):
            if i.get("Email")==email or i.get("Username")==username:
                del self
                return
        self.createAccount()
        Parent.Cache = dbRequests.GET("Accounts", "Parents")

    def createAccount(self):
        dbRequests.POST("Accounts", "Parents", {
            "Name": self.name,
            "Username": self.username,
            "Email": self.email,
            "Password:": self.password,
            "AccountType": self.accountType,
            "Children":self.students
        })