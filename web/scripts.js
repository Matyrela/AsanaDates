function jsHTMLInit(){
    eel.tokenExists()(function(exists){          
        if(exists == true){
            document.getElementById("TokenFiller").innerHTML = ""
        }else{
            document.getElementById("TokenFiller").innerHTML = "<h2>Token no esta definido!</h2><input type='text' id='tokenSet'><button onClick='jschangeToken()'>Actualizar Token!</button>"
        }
      })

    eel.GetNames()(function(Names){    
        Tasks = Names;
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
            tasks = eel.GetTaskByName(element)();
            //Aqui estuvo Z
            tasks.then(
                function(value) {test(element,value, innerBuilder, MainPage);},
                function(error) {console.log("Hubo un error maestro!");}
            );
            
            
        });   
      })

      MainPage.innerHTML = innerBuilder;
}



function test(element, el, innerBuilder, MainPage) {
    innerBuilder += `
    <div id="${element}">
        <h2 class="mt-4" style="color: #ffffff"> ${element} </h2>
    `;
    el.forEach(i => {
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
                innerBuilder += `</div><hr>`;
                MainPage.innerHTML += innerBuilder;
                
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

