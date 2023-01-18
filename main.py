import eel
from functions import *
def main():
    eel.init("web")
    if(loadToken() == -1):
        return
    generateClient();    
    #get projectID from file, if not exists get from API
    PID = ProjectID()
    TID = TaskID(PID)
    eel.start("index.html", size=(1200,800))
main()