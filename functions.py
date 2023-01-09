import eel
import datetime

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

def ProjectID(client):
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

def TaskID(client, PID):
    config = open("config/config.conf" , "r")
    data = config.read()
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
                        text = text + p["gid"] + "," + p["name"] + ","
                    conf = text[:-1]
                    toFile = toFile + conf + "\n"
            count = count + 1
        config.write(data + toFile)
    config.close()
    config = open("config/config.conf" , "r")
    data = config.read()
    LTID = []
    data = data.split("\n")
    pids= data[1][6:]
    if("," not in pids):
        LTID.append(pids)
        return LTID
    else:
        LTID = pids.split(",")
        return LTID

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
                TaskList = []
                count = 0
                for cosita in tasks:
                    if(count % 2 != 0):
                        TaskList.append(cosita)
                    count = count + 1
                
                return TaskList

def getDates(TID, client):
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

            change = change[len(name) + 1:]
            Story.append(change)

    print(Story)
    return Story