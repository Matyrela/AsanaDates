import eel
import datetime
import asana

def generateClient():
    personal_access_token = loadToken()
    global client
    client = asana.Client.access_token(personal_access_token)
    

@eel.expose
def tokenExists():
    config = open("config/config.conf" , "r")
    data = config.readline()
    token = data[14:-1]
    if(token == ""):
        return False
    return True

@eel.expose
def GetNames():
    config = open("config/config.conf" , "r")
    data = config.read()
    LData = data.split("\n")
    LData = LData[1].split(",")

    Names = []
    count = 0
    for a in LData:
        if(count % 2 != 0):
            Names.append(a)
        count = count + 1

    return Names

@eel.expose
def GetTasks():
    config = open("config/config.conf" , "r")
    data = config.read()
    LData = data.split("\n")
    LData = LData[1].split(",")

    Names = []
    count = 0
    for a in LData:
        if(count % 2 != 0):
            Names.append(a)
        count = count + 1

    return Names

@eel.expose
def changeToken(newToken):
    config = open("config/config.conf" , "w")
    data = config.readline()
    data = data.split("\n")

    data[0] = "AccessToken = " + newToken
    for text in data:
        config.write(text + "\n")
    config.close

    return True


def loadToken():
    config = open("config/config.conf" , "r")
    data = config.readline()
    if("AccessToken" not in data):
        print("Config file fail")
        config.close()
        config = open("config/config.conf" , "w")
        config.write("AccessToken = ")
        config.close()
        return -1
        
    return data[14:-1]

def ProjectID():
    config = open("config/config.conf" , "r")
    data = config.read()
    if("PID" not in data):
        config.close()
        config = open("config/config.conf" , "w")
        print("Getting gid of proyects...")
        asanaData = client.get("/projects", "")

        text = "PID = "
        for p in asanaData:
            text = text + p["gid"] + "," + p["name"] + ","
        conf = text[:-1]
        config.write(data + conf + "\n")
        config.close()
    
    config.close()
    config = open("config/config.conf" , "r")
    data = config.read()
    LPID = []
    data = data.split("\n")
    pids= data[1][6:]
    config.close()
    if("," not in pids):
        LPID.append(pids)
        return LPID
    else:
        LPID = pids.split(",")
        return LPID

def TaskID(PID):
    config = open("config/config.conf" , "r")
    data = config.read()
    Names = []
    for names in range(0,len(PID)):
        if(names % 2 != 0):
            Names.append(PID[names])

    if("TID" not in data):
        config.close()
        config = open("config/config.conf" , "w")
        print("Getting gid of tasks...")
        count = 0
        toFile = ""
        for projects in PID:
            text = ""
            conf = ""
            LasanaData = []
            if(count % 2 == 0):
                url = "/projects/" + projects + "/tasks"
                LasanaData.append(client.get(url, ""))
                text = "TID:" + PID[count + 1]
            text = text + " = "
            if(count % 2 == 0):
                for asanaData in LasanaData:
                    for p in asanaData:
                        text = text + p["gid"] + "," + p["name"] + "," # Status  + " - " + p[""]
                    conf = text[:-1]
                    toFile = toFile + conf + "\n"
            count = count + 1
        config.write(data + toFile)
    config.close()
    with open("config/config.conf", "r") as fp:
            lines = fp.readlines()
            TaskList = []
            c = 0
            for line in lines:
                if line.find("TID:") != -1:
                    line = line[line.find("=") + 2:-1]
                    line = Names[c] + "," + line
                    TaskList.append(line)
                    c = c + 1
            return TaskList

@eel.expose
def GetTaskByName(PID):
    with open("config/config.conf", "r") as fp:
        lines = fp.readlines()
        for line in lines:
            if line.find(":" + PID) != -1:
                cut = 7 + len(PID)
                line = line[cut:]
                line = line[:-1]
                tasks = line.split(",")
                TasksNames = []
                TasksID = []
                Tasks = []
                count = 0
                for cosita in tasks:
                    if(count % 2 != 0):
                        TasksNames.append(cosita)
                    else:
                        TasksID.append(cosita)
                    count = count + 1

                Tasks.append(TasksNames)
                Tasks.append(TasksID)
                
                return Tasks
@eel.expose
def getDates(TID):
    url = "/tasks/" + str(TID) + "/stories"
    AsanaData = client.get(url, "")
    Story = []
    created = AsanaData[0]["created_at"]
    created = created.split("T")
    created = created[0]
    created = created.split("-")
    created = datetime.datetime(int(created[0]), int(created[1]), int(created[2]))

    Story.append("Created at " + created.strftime('%B %d %Y'))

    for p in range(0,len(AsanaData)):
        name = str(AsanaData[p]["created_by"]["name"])
        if("due" in str(AsanaData[p]["text"])):
            change = str(AsanaData[p]["text"])

            change = change[len(name) + 2:]
            change = "C" + change
            Story.append(change)

    return Story
