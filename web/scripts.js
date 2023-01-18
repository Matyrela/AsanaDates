function jsHTMLInit(){
    eel.tokenExists()(function(exists){          
        if(exists == true){
            document.getElementById("TokenFiller").innerHTML = ""
        }else{
            document.getElementById("TokenFiller").innerHTML = "<h2>Token no esta definido!</h2><input type='text' id='tokenSet'><button onClick='jschangeToken()'>Actualizar Token!</button>"
        }
      })

    eel.GetNames()(function(Names){    
        TasksID = Names[1];
        navbar = document.getElementById("NamesNavBar");
        navbarinner = "";

        Names.forEach(element => {
            navbar.innerHTML = navbarinner + `
            <li>
            <a href="index.html#${element}" class="nav-link text-white">
              ${element}
            </a>
          </li>
            `;
            navbarinner = navbar.innerHTML;

        });

        MainPage = document.getElementById("MainPageNames");
        let innerBuilder = "";

        // Cargar las listas
        Names.forEach(element => {
            MainPageinner = MainPage.innerHTML;
            innerBuilder += MainPageinner;
            TasksArr = eel.GetTaskByName(element)();
            // Cargar los valores con una promesa
            TasksArr.then(
                function(value) {AddTasks(element,value, innerBuilder, MainPage);},
                function(error) {console.log("Hubo un error maestro!");}
            );
            
            
        });   
      })

    //    MainPage.innerHTML = innerBuilder;
}



function AddTasks(ProjectName, value, /*TasksIDs ,*/innerBuilder, MainPage) {
    let count = 0;
    MainPage.innerHTML += `<hr><div id="${ProjectName}" class="card rounded bg-dark" style="padding: 0 10px;"> <h2 class="mt-4" style="color: #ffffff"> ${ProjectName} </h2>`;
    value[0].forEach(i => {
        eel.getDates(value[1][count])().then(
        function (value) {
            AddTaskArr(ProjectName,i, value, innerBuilder, MainPage).then(
                function (value) {
                    innerBuilder += `</ul></div>`,innerBuilder += `</div>`
                    if (document.getElementById("delLoadingBar") != null) {
                        document.getElementById("delLoadingBar").innerHTML = "";
                    }
                }
            )
                }
            )
        count++;
    })
    innerBuilder = innerBuilder;
    MainPage.innerHTML += innerBuilder;
}



async function AddTaskArr (ProjectName, i, TaskDates, innerBuilder, MainPage) {
            //  Cargar cambios
            innerBuilder += `
                <div style="margin-left: 3%;">
                <h4 style="color: #ffffff;">${i}</h3>
                <ul style="margin-left: 1%; color: white;" id="${i}">
            `;
            c = 0;
            max = TaskDates.length - 1;

            TaskDates.forEach(d => {
                switch(c){
                    case 0:
                        innerBuilder = innerBuilder + `
                        <li style="color: LightGreen;">${d}</li>
                    `;
                    break;
                    case max:
                        case 0:
                            innerBuilder = innerBuilder + `
                            <li style="color: #C24641;">${d}</li>
                        `;
                        break;
                    default:
                        innerBuilder = innerBuilder + `
                        <li>${d}</li>
                    `;
                    break;
                }
                c += 1;
            })
            document.getElementById(ProjectName).innerHTML += innerBuilder;

            jsApiCallInit();
            
}

function jsApiCallInit(){
    NOApiCalls = eel.TotalApiCalls()();
    NOApiCalls.then(
        function(value) {ApiCallInjector(value);},
        function(error) {console.log("Hubo un error maestro!");}
    );
}

function ApiCallInjector(num){
    document.getElementById("APICalls").innerHTML = num;
}

function jsdates(){
    eel.getDates()(function(exists){          
        if(exists == true){
            document.getElementById("TokenFiller").innerHTML = ""
        }else{
            document.getElementById("TokenFiller").innerHTML = "<h2>Token no esta definido!</h2><input type='text' id='tokenSet'><button onClick='jschangeToken()'>Actualizar Token!</button>"
        }
      })
}

