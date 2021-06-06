//Codigo para generar información de categorias y almacenarlas en un arreglo.
var textosDePrueba=[
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
    "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
    "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
    "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
    "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
]

var categorias = [];
(()=>{
  //Este arreglo es para generar textos de prueba
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
  
  //Genera dinamicamente los JSON de prueba para esta evaluacion,
  //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

  
  let contador = 1;
  for (let i=0;i<5;i++){//Generar 5 categorias
      let categoria = {
          nombreCategoria:"Categoria "+i,
          descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          aplicaciones:[]
      };
      for (let j=0;j<10;j++){//Generar 10 apps por categoria
          let aplicacion = {
              codigo:contador,
              nombre:"App "+contador,
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              icono:`img/app-icons/${contador}.webp`,
              instalada:contador%3==0?true:false,
              app:"app/demo.apk",
              calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
              descargas:1000,
              desarrollador:`Desarrollador ${(i+1)*(j+1)}`,
              imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
              comentarios:[
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
              ]
          };
          contador++;
          categoria.aplicaciones.push(aplicacion);
      }
      categorias.push(categoria);
  }
  
//   console.log(categorias);
})();

if(!alertify.myAlert){
    //define a new dialog
    alertify.dialog('myAlert',function factory(){
      return{
        main:function(message){
          this.message = message;
        },
        setup:function(){
            return { 
              buttons:[{text: "cool!", key:27/*Esc*/}],
              focus: { element:0 }
            };
        },
        prepare:function(){
          this.setContent(this.message);
        }
    }});
  }
  //launch it.
 //lertify.myAlert("Browser dialogs made easy!");




//* Guardar Json a Localstorage
localStorage = window.localStorage
indiceApp = null

if (localStorage.getItem("categorias") == null) {
    localStorage.setItem("categorias", JSON.stringify(categorias));
} else {
    categorias = JSON.parse(localStorage.getItem("categorias"));
}


//* Cargar el Select list
for (const i in categorias) {
    // console.log(categorias[i].nombreCategoria);
    nombreCat = categorias[i].nombreCategoria //*obtiene el nombre del arreglo
    document.getElementById('categoria').innerHTML +=
    `<option value="${nombreCat}">${nombreCat}</option> ` 
}


//* Cargar Apps

function cargarAplicaciones(){
    document.getElementById('apps').innerHTML = '';
    nomCatSelec = document.getElementById('categoria').value; //* Valor del select list
    // console.log(categorias);

    categorias.forEach(function(app, i) {
        // console.log(app.nombreCategoria);
        nomeCat = app.nombreCategoria

        if (nomCatSelec == nomeCat) { //* Compara los nombres del arreglo con el valor del select list
            apk = app.aplicaciones
            for (let i in apk) {
                // console.log(apk[i].nombre);
                calif = apk[i].calificacion
                star = '';
                for (let i = 0; i < calif; i++) {
                    star += `<i class="fas fa-star"></i>`;
                  }
                  for (let i = 0; i < 5 - calif; i++) {
                   star += `<i class="far fa-star"></i>`;
                  }

                document.getElementById('apps').innerHTML +=
                 `<div class="col-12 col-lg-3 col-md-6 col-sm-6 col-xl-2 p-3">
                    <div class="card m-1 card-color">
                         <img src="${apk[i].icono}" class="card-img-top" alt="apks" onclick="detalleApp(${i})" data-bs-toggle="modal" data-bs-target="#detalleModal">
                         <div class="card-body">
                             <h5 class="card-title">${apk[i].nombre}</h5>
                             <p class="card-text">${apk[i].desarrollador}</p>
                            <span class="card-text ico-star">${star}</span><br>
                           <span class="btn-delete"><i onclick="deleteApp(${i})" class="fas fa-trash-alt"></i></span>
                         </div>
                     </div>
                 </div> 
                 `
            }         
        }
    });
}cargarAplicaciones();



//* detalle por cada App
function detalleApp(i){
    // console.log('app',i);
    indiceApp = i
    nomCatSelec = document.getElementById('categoria').value; //* Valor del select list    
    categorias.forEach(function(app) {
        nomeCat = app.nombreCategoria
              
        if (nomCatSelec == nomeCat) {
            calif = app.aplicaciones[i].calificacion
            
            star = '';
            cali = '';
           
            if(calif >= 3){            
                for (let i = 0; i < calif; i++) {
                    star += `<i class="fas fa-star" style= "color: #17a9a9 ;" ></i>`;
                    cali = ` <span style= "color: #17a9a9 ;">${calif}.0</span>`
                }
                for (let i = 0; i < 5 - calif; i++) {
                    star += `<i class="far fa-star" style= "color: #17a9a9 ;"></i>`;
                    
                }
            }else{
                 for (let i = 0; i < calif; i++) {
                     star += `<i class="fas fa-star" style="color: rgb(189, 10, 10);"></i>`;
                     cali = ` <span style= "color: rgb(189, 10, 10);">${calif}.0</span>`
                 }
                 for (let i = 0; i < 5 - calif; i++) {
                     star += `<i class="far fa-star" style="color: rgb(189, 10, 10);"></i>`;
                 }

             }
                                   
                  nombApp = app.aplicaciones[i].nombre
                  desApp = app.aplicaciones[i].desarrollador
                  descApp = app.aplicaciones[i].descripcion
                  icoApp = app.aplicaciones[i].icono
                  
                  Comment = app.aplicaciones[i].comentarios
                  imgC = app.aplicaciones[i].imagenes

                  install = app.aplicaciones[i].instalada
                //   console.log(install);

                //*boton de instalar app
                  if (install == true) {
                    document.getElementById('btn-install').style.display = 'none'
                    // alert('Esta App Ya esta instalada')
                    alertify.myAlert("Esta App Ya esta instalada!");

                }else{
                    document.getElementById('btn-install').style.display = 'block'
                }
                                    
            usuari = ""; 
            for (const c in Comment) {
                user = Comment[c].usuario
                comUser = Comment[c].comentario
                //  console.log(user);
                 usuari += `<div class="col-4">
                                <div class="card-body">
                                    <img class="img2" src="/img/user.webp" alt="">
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="card-body detalle2">
                                    <h5 class="card-title">${user}</h5>
                                    <!-- <h6 class="card-subtitle mb-2 text-muted">Desarrolador 1</h6> -->
                                    <p class="card-text">${comUser}</p>
                                </div>
                            </div>
                            `
                for (const k in imgC) {
                    // console.log(imgC[k]);
                    imgCa = imgC[k]
                    // console.log(imgCa);
                    document.getElementById('detalle-app').innerHTML =
                    ` <div class="col-12">    
                    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <img src="${imgC[0]}" class="d-block w-100" alt="${imgC[0]}">
                          </div>
                          <div class="carousel-item">
                            <img src="${imgC[1]}" class="d-block w-100" alt="${imgC[1]}">
                          </div>
                          <div class="carousel-item">
                            <img src="${imgC[2]}" class="d-block w-100" alt="${imgC[2]}">
                          </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="card-body">
                                <img class="img1" src="${icoApp}" alt="">
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="card-body detalle1">
                                <h5 class="card-title">${nombApp}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${desApp}</h6>
                                <p>${descApp}</p>
                                <span>$99.99</span><br>
                                <div class="calif-detalle1">
                                    <span>${star}</span>
                                    <span>${cali}</span>
                                </div>
                            </div>
                        </div>
                    </div><hr>

                    <div class="row" id="user">
                        ${usuari}
                    </div>

                </div>

                    `
                }
            }
          
        }
    });
}

function btnInstall(){
    alertify.myAlert("Instalado App ...!");
    // alert('Instalado App ...')
}



//* Generar Select list de apps
for (let i = 1; i < 51; i++) {
    document.getElementById('list-app').innerHTML += 
    `<option value="/img/app-icons/${i}.webp">App${i}</option> `    
}


//* Guardar una app
function newApp(){
    listApps = document.getElementById('list-app').value;
    nameApp = document.getElementById('name-app').value;
    devApp = document.getElementById('dev-app').value;
    califApp = document.getElementById('calif-app').value;
    console.log(listApps);
    descApp='Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, commodi.'

    nomCat = document.getElementById('categoria').value; //* Valor del select list    
    i = indiceApp;
    
    categorias.forEach(function(app) {
        // console.log(app.nombreCategoria);
        nomeCat = app.nombreCategoria
        // console.log(nomeCat);
        contador=Math.floor((Math.random() * (11-5))+5);
        if (nomCat == nomeCat) { //* Compara los nombres del arreglo con el valor del select list
            apk = app.aplicaciones
            console.log(apk);

                app = {
                    codigo: contador*10,
                    nombre: nameApp,
                    descripcion:descApp ,
                    icono: listApps,
                    instalada: contador%3==0?true:false,
                    app: "app/demo.apk",
                    calificacion: califApp,
                    descargas: '500',
                    desarrollador:'Desarrolador: '+devApp,
                    imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
                    comentarios:[
                        {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                        {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                        {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
                    ]
            
                }
                    apk.push(app)
                    localStorage.setItem("categorias", JSON.stringify(categorias));
                    cargarAplicaciones()                    
        }
    });

}


//*Eliminar una app
function deleteApp(i){

    nomCat = document.getElementById('categoria').value; //* Valor del select list    
    
    categorias.forEach(function(apps) {
        nomeCat = apps.nombreCategoria
        contador=Math.floor((Math.random() * (11-5))+5);
        if (nomCat == nomeCat) { //* Compara los nombres del arreglo con el valor del select list
            apli = apps.aplicaciones
            //apks = apps.aplicaciones[i]
            // console.log(apks,i);
            apli.splice(i, 1)
            cargarAplicaciones()
            localStorage.setItem("categorias", JSON.stringify(categorias));
        }
    });
}



 

