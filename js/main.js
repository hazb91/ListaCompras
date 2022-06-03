
let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = []; //Arreglo global para almacenar la lista de compras

let element = document.getElementById("totalPrecio");
element.innerHTML="Total en precio"

let txtNombre = document.getElementById("Name");
// txtNombre.value="Leche Semidescremanda";
// console.log(txtNombre.value);

let txtNumber = document.getElementById("Number");

let total = document.getElementById("precioTotal")

// let campos = document.getElementsByClassName("campo");
// campos[0].value = "Leche descremada deslactosada light = Agua";
// console.log(campos[0].value);
// console.log(campos);

// for (let i=0; i<campos.length; i++) {
//     campos[i].style.border="red thin solid" //SE hace aqui porque es un cambio programado, no estetico.
// } // for i

// let spans = document.getElementsByTagName("span");
// for (let i=0; i<spans.length; i++) {
//     console.log(spans[i].textContent);
// } //for i

let tabla = document.getElementById("tableListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

// cuerpoTabla[0].innerHTML = 
// `<tr>
//               <th scope="row">1</th>
//               <td>Leche descremada</td>
//               <td>3</td>
//               <td>23.00</td>
//             </tr> `;

function validarNombre(){
  if (txtNombre.value.length<3) {
    return false;
  }
  return true;
}

function validarCantidad() {
  if (isNaN(txtNumber.value)) {
    return false;
  }
  if (txtNumber.value.length<=0) {
    return false;
  }
  if (parseFloat(txtNumber.value)<=0) {
    return false;
  }
  return true;
  }


let agregar = document.getElementById("btnAgregar");
// console.log(agregar);

agregar.addEventListener ("click", (event) => {
  event.preventDefault();
  if ((! validarNombre()) || (! validarCantidad())) {
    
let lista = "";
  if(!validarNombre()) {
    txtNombre.style.border="red thin solid";
    lista += "<li>Se debe escribir un nombre valido</li>";
  }
  if(!validarCantidad()) {
    txtNumber.style.border="red thin solid";
    lista += "<li>Se debe escribir una cantidad valida</li>";
  }

  document.getElementById("alertValidacionesTexto").innerHTML=`Los campos deben llenarse correctamente.
  <ul> ${lista} </ul>`;

  document.getElementById("alertValidaciones").style.display="block";

    setTimeout(function() {
      document.getElementById("alertValidaciones").style.display="none";
    },
        5000
    );

    return false;
  }
  txtNombre.style.border="";
  txtNumber.style.border="";
 
  document.getElementById("alertValidaciones").style.display="none";
  contador++;
  document.getElementById("contadorProducto").innerHTML=contador;
  
  localStorage.setItem("contadorProducto", contador);//GUARDAR INFORMACION EN PAGINA WEB
  
  let precio =(Math.floor (Math.random() * 50)*100)/100;
  let cantidad = parseFloat(txtNumber.value);
  totalEnProductos += (cantidad<=0)?Math.ceil(cantidad):parseInt(cantidad);
  document.getElementById("productosTotal").innerHTML = totalEnProductos;
  
  localStorage.setItem("productosTotal", totalEnProductos);

  costoTotal += ( precio * cantidad);
  total.innerHTML = `${costoTotal.toFixed(2)}`;

  localStorage.setItem("costoTotal", costoTotal.toFixed(2));

  //JSON
  let elemento = `{
    "id": ${contador}, 
    "nombre": "${txtNombre.value}", 
    "cantidad": ${txtNumber.value}, 
    "precio":${precio}
  }`//Poner entre comillas nombre porque es un string

  datos.push(JSON.parse(elemento));
  //console.log(datos);

  localStorage.setItem("elementosTabla", JSON.stringify(datos));
  
  let tmp =
    `<tr>
      <th scope="row">${contador}</th>
      <td>${txtNombre.value}</td>
      <td>${txtNumber.value}</td>
      <td>${precio.toFixed(2)}</td>
    </tr> `;
  
  cuerpoTabla[0].innerHTML += tmp;
  txtNombre.value="";
  txtNumber.value="";
  txtNombre.focus();
}
);

txtNombre.addEventListener("blur", (event)=> {
  event.target.value = event.target.value.trim();
}
);

txtNumber.addEventListener("blur", (event)=> {
  event.target.value = event.target.value.trim();
}
);

window.addEventListener("load", function() {

  if(localStorage.getItem("contadorProducto")!=null) {
    contador = parseInt(localStorage.getItem("contadorProducto"));
    document.getElementById("contadorProducto").innerHTML=contador;
  } //if contador de productos
  // console.log(localStorage.getItem("contadorProducto"));

  if(localStorage.getItem("productosTotal")!=null) {
    totalEnProductos = parseInt(localStorage.getItem("productosTotal"));
    document.getElementById("productosTotal").innerHTML=totalEnProductos;
  } //if productos total
  // console.log(localStorage.getItem("productosTotal"));

  if(localStorage.getItem("costoTotal")!=null) {
    costoTotal = parseFloat(localStorage.getItem("costoTotal"));
    total.innerHTML=costoTotal;
  } //if costo total
  // console.log(localStorage.getItem("costoTotal"));

  if(localStorage.getItem("elementosTabla")!=null) {
    datos=JSON.parse(localStorage.getItem("elementosTabla"));
    datos.forEach(element => {
      cuerpoTabla[0].innerHTML += `<tr>
      <th scope="row">${element.id}</th>
      <td>${element.nombre}</td>
      <td>${element.cantidad}</td>
      <td>${element.precio}</td>
    </tr> `;
    });
  } //if elementosTabla 
}
);
