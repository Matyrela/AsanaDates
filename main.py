import eel
import asana
from functions import *
from time import sleep

def main():

    #eel.init("web")

    if(loadToken() == -1):
        return

    personal_access_token = loadToken()
    client = asana.Client.access_token(personal_access_token)

    #get projectID from file, if not exists get from API
    PID = ProjectID(client)
    TID = TaskID(client, PID)
    
    getDates(1203668073408658, client)



    GetTaskByName("Holis")

    #eel.start("index.html", size=(1200,800), mode='opera')


main()