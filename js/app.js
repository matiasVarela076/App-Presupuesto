const ingresos = [
    new Ingreso('Ejemplo Ingreso', 300)
   
];

const egresos = [
    new Egreso('Ejemplo Egreso', 100)
   
];

let cargarApp = ()=>{
    cargarCabecero();   //Funcion para cargar las otras funciones
    cargarIngresos();
    cargarEgresos();
}



let totalIngreso =() =>{

    let totalIngresos = 0;
for(let ingreso of ingresos){
 totalIngresos+= ingreso.valor;  
}
return totalIngresos;   
}
                             //Calculamos el ingreso y egreso total

let totalEgreso =() =>{

    let totalEgresos = 0;
for(let egreso of egresos){
 totalEgresos+= egreso.valor;  
}
return totalEgresos;   
}
let cargarCabecero = () =>{
 let presupuesto = totalIngreso() - totalEgreso();
 let porcentajeEgreso =  totalEgreso() / totalIngreso();
 document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
 document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
 document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngreso());
 document.getElementById('egresos').innerHTML = formatoMoneda(totalEgreso());
}

let formatoMoneda = (valor) =>{  //Funcion para dar formato a la moneda
   return valor.toLocaleString('es-AR', {style:'currency', currency: 'ARS', minimumFractionDigits: 2});
}

let formatoPorcentaje = (valor) =>{  //Funcion para dar formato al porcentaje
    return valor.toLocaleString('es-AR', {style:'percent', currency: 'ARS', minimumFractionDigits: 2});
 }

 const cargarIngresos= ()=>{
     let ingresosHTML = '';
     for(ingreso of ingresos){
         ingresosHTML += crearIngresosHTML(ingreso);
     }
     document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
    
 }

 const crearIngresosHTML=(ingreso) =>{
     let ingresoHTML = `
     <div class="elemento limpiarEstilos">
                                  <div class="elemento_descripcion">${ingreso.descripcion}</div>
                                  <div class="derecha limpiarEstilos ">
                                      <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                                      <div class="elemento_eliminar">
                                          <button class = "elemento_eliminar--btn">
                                            <ion-icon name="close-circle-outline" onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>  
                                          </button>
                                      </div>
                                  </div>
                              </div> `;
                              return ingresoHTML;
 }

  const eliminarIngreso=(id) =>{  
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso === ingreso.id); //Si el ingreso es igual al id
    ingresos.splice(indiceEliminar, 1); //Eliminamos el indice
    cargarCabecero();
    cargarIngresos();     //Y refrescamos la pagina otra vez sin el indice eliminado   
}


 const cargarEgresos=() => {
    let egresosHTML = '';
    for(egreso of egresos){
        egresosHTML+= crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
 }

 const crearEgresosHTML= (egreso)=>{
    let egresoHTML = ` 
    <div class="elemento limpiarEstilos"> 
    <div class="elemento_descripcion">${egreso.descripcion} </div>
      <div class="derecha limpiarEstilos">
          <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
          <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgreso())}</div>
          <div class="elemento_eliminar">
              <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
              </button>
          </div>
      </div>
</div>`;
return egresoHTML;

 }

 const eliminarEgreso =(id) =>{  
    let indiceEliminar = egresos.findIndex(egreso => egreso === egreso.id); //Si el ingreso es igual al id
    egresos.splice(indiceEliminar, 1); //Eliminamos el indice
    cargarCabecero();
    cargarEgresos();     //Y refrescamos la pagina otra vez sin el indice eliminado   
}

let agregarDato = () =>{

let forma = document.forms['forma'];
let tipo = forma['tipo'];     //Recuperamos los valores del formulario HTML
let valor = forma['valor'];
let descripcion = forma['descripcion'];

if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){   
                ingresos.push(new Ingreso(descripcion.value, +valor.value));  
          /*Se crea un nuevo objeto 
            dependendiendo si es ingreso egreso*/
                
                cargarCabecero();          // y Se vuelve a refrescar la pagina        
                cargarIngresos();
        }else if(tipo.value === 'egreso'){                              
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }

}
                                                                          
}

