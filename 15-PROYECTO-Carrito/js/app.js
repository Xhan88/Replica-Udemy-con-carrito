//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agreges un curso precionando "Agregar Al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminaCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //recetear el arreglo

        limpiarHTML();//eliminamos todo el HTML
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();


    if( e. target.classList.contains('agregar-carrito') ) {
       const cursoSeleccionado = e.target.parentElement.parentElement;
       leerDatosCurso(cursoSeleccionado);
    }
    
}

//Eliminar un curso del carrito
function eliminaCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articuoosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

       carritoHTML();// iterar sobre el carrito y mostrar su HTML

    }
}

//lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);

    //crear un objeto con el contenbido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya esta en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            }else{
                return curso;// retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos]

    } else {
    //agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    }




    console.log(articulosCarrito);

    carritoHTML();
}

//muestrame el carrito de compras en el HTML
function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
           <td>
           <a href="#" class="borrar-curso" data-id="${id}" > X </a>
           </td>
        `;

        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });



}

//elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';


while(contenedorCarrito.firstChild){
      contenedorCarrito.removeChild(contenedorCarrito.firstChild)

   }
}