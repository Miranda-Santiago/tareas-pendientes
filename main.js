//'' comillas simples
// query selector conecta con el html
const fecha = document.querySelector('#fecha');
/////////////////////////////////////////////
const lista = document.querySelector('#lista');
/////////////////////////////////////////////
const elemento = document.querySelector('#elemento');//es el elemento o tarea que se agrega
/////////////////////////////////////////////
const input = document.querySelector('#input');
/////////////////////////////////////////////
const botonAgregar = document.querySelector('#botonAgregar');
/////////////////////////////////////////////
const check = 'bi-record-circle';
const tachado='tachado';
const uncheck='bi-circle';
let LIST;
let id;

const FECHA = new Date();
fecha.innerHTML =FECHA.toLocaleDateString('es-MX',{
    weekday: 'long', 
    month:'short',
    day:'numeric'
});
//DOM: permite que el navegador interactue con elementos de html
// funcion agregar tarea 
function agregarTarea(tarea,id,hecho,eliminar) {
    if (eliminar) {
        return
    };
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = ` <li id="elemento">
                    <i id="${id}" data="hecho" class="bi ${realizado} "></i>
                    <p class="tarea-lista text ${LINE} ">${tarea}</p>
                    <i id="${id}" data="eliminar" class="bi-trash3 "></i>
                </li>` //backticks, elementos extraidos de html a js bi-trash3
                lista.insertAdjacentHTML ("beforeend",elemento);//insertar algo antes de terminar la lista//
                
};
function tareaRealizada(element) {
    element.classList.toggle(check);//elemento con check o uncheck
    element.classList.toggle(uncheck);

    element.parentNode.querySelector('.text').classList.toggle(tachado);//parentNode es una dirrecion, va al elemento mas cercano y selecciona la clase texto, agregando la clase tachado cuando la tarea este lista//
    LIST[element.id].realizado = LIST[element.id].realizado ? false :  true;


}
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
    
};
botonAgregar.addEventListener("click",()=>{
    const tarea = input.value;//se guarda la tarea con esta constante
    if (tarea) {
        agregarTarea(tarea,id,false,false);
        LIST.push({
            nombre : tarea,
            id : id,
            hecho : false,
            eliminar : false,
        });
        localStorage.setItem("TODO",JSON.stringify(LIST));
        id++;
        input.value = "";
    }

});

lista.addEventListener("click",function (event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData == "hecho") {
        tareaRealizada(element);
    } else if (elementData == "eliminar"){
        tareaEliminada(element);  
    };
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;   
}

function cargarLista(array) {
    array.foreach(
        function (item) {
            agregarTarea(item.nombre,item.id,item.hecho,item.eliminar);
        }
    )  
};