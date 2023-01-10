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

        Names.forEach(element => {
            MainPageinner = MainPage.innerHTML;
            innerBuilder += MainPageinner;
            TasksArr = eel.GetTaskByName(element)();
            //Aqui estuvo Z
            TasksArr.then(
                function(value) {AddTasks(element,value, innerBuilder, MainPage);},
                function(error) {console.log("Hubo un error maestro!");}
            );
            
            
        });   
      })

      MainPage.innerHTML = innerBuilder;
}



function AddTasks(ProjectName, TasksArr, /*TasksIDs ,*/innerBuilder, MainPage) {
    innerBuilder += `
    <div id="${ProjectName}">
        <h2 class="mt-4" style="color: #ffffff"> ${ProjectName} </h2>
    `;

    count = 0;
    TasksArr[0].forEach(i => {
        TaskDates = eel.getDates(TasksArr[1][count])();
        console.log(TaskDates);

        innerBuilder = innerBuilder + `
        <div style="margin-left: 3%;">
            <h4 style="color: #ffffff;">${i}</h3>
        
            <ul style="margin-left: 1%; color: white;" id="${i}">
            `;
            TaskDates.forEach(d => {
                innerBuilder = innerBuilder + `
                    <li>${d}</li>
                `;
            })
            //------------------------------------------------------------

        innerBuilder = innerBuilder + `  
            </ul>
        </div>
        `;
        
        count = count + 1;
    })
    innerBuilder += `<hr></div>`;
    MainPage.innerHTML += innerBuilder;
}

function AddDates(element, el, innerBuilder, MainPage){
    
}

/*
tasks.forEach(i => {
                    innerBuilder = innerBuilder + `
                    <div style="margin-left: 3%;">
                        <h4 style="color: #ffffff;">${i}</h3>
                    </div>
                    <ul style="margin-left: 6%; color: white;">
                        <li>Creada: 26/6</li>
                        <li>26/6 --> 27/6</li>
                        <li>27/6 --> 30/6</li>
                        <li>30/6 --> 5/7</li>
                        <li>Finaliza: 5/7</li>
                    </ul>
                    `;
                })
/*


/*
    <div style="margin-left: 3%;">
        <h4 style="color: #ffffff;">Tarea Ejemplo</h3>
    </div>
    <ul style="margin-left: 6%; color: white;">
        <li>Creada: 26/6</li>
        <li>26/6 --> 27/6</li>
        <li>27/6 --> 30/6</li>
        <li>30/6 --> 5/7</li>
        <li>Finaliza: 5/7</li>
    </ul>
    <hr style="color:#ffffff">
*/

function jsdates(){
    eel.getDates()(function(exists){          
        if(exists == true){
            document.getElementById("TokenFiller").innerHTML = ""
        }else{
            document.getElementById("TokenFiller").innerHTML = "<h2>Token no esta definido!</h2><input type='text' id='tokenSet'><button onClick='jschangeToken()'>Actualizar Token!</button>"
        }
      })
}

