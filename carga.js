function filtrar() {
     document.getElementById("imagen").src = "";
     cargaarticulos();
}

function cargaarticulos() {
     fetch('articulos.json')
          .then(respuesta => respuesta.json())
          .then(articulos => {
               var dato = document.getElementById("f").value.toUpperCase();
               var filtrado = articulos.productos.filter(function (elemento) {
                    return elemento.descripcion.indexOf(dato) != -1;
               });

               // Dejamos solamente el titulo
               tabla.innerHTML = titulos.innerHTML;
               var linea = 1;
               var foto;
               for (let valor of filtrado) {
                    const fila = document.createElement('tr');
                    foto = valor.foto;
                    fila.onclick = (function (foto, linea) {
                         return function () {
                              muestrafoto(foto, linea);
                         };
                    })(foto, linea);
                    fila.innerHTML += `
                     <td>${valor.codigo}</td>
                     <td>${valor.descripcion}</td>
                     <td>${valor.stock}</td>
                     <td>${valor.precio}</td>`;
                    tabla.appendChild(fila);
                    linea++;
               }
          })

}

function muestrafoto(foto, linea) {
     for (var i = 1; i < tabla.rows.length; i++) {
          tabla.getElementsByTagName("tr")[i].style.backgroundColor = "white";
     };
     tabla.getElementsByTagName("tr")[linea].style.backgroundColor = 'green';
     document.getElementById("imagen").src = "./imagenes/" + foto;
}


window.onload = function () {
     fetch('./textos.json')
          .then(respuesta => respuesta.json())
          .then(textos => {
               idiomas = textos.idiomas;
          })
          .catch(error => console.log('Error en la carga de idiomas:' + error.message))
};

function cambiaidioma(idiomaactual) {
     var pais = idiomas.find(abuscar => abuscar.idioma === idiomaactual);
     console.log(pais);
     for (var clave in pais) {
          console.log("la clave es :" + clave + " y vale :" + pais[clave]);
          if (clave != "idioma")
               document.getElementById(clave).innerHTML = pais[clave]
          else {
               document.getElementById("es").style.backgroundColor = 'white';
               document.getElementById("en").style.backgroundColor = 'white';
               document.getElementById("fr").style.backgroundColor = 'white';
               document.getElementById(pais[clave]).style.backgroundColor = 'green';
          }
     }
}

function verOpcCambiaridioma(idiomaClicado) {

     console.log('VEROPC =', idiomaClicado);

     switch (idiomaClicado) {
          case 'es':
               cambiaidioma('es');
               break;
          case 'en':
               cambiaidioma('en');

               break;
          case 'fr':
               cambiaidioma('fr');

               break;

          default:
               break;
     }

}

const tabla = document.getElementById("lista-articulos");
const titulos = document.getElementById("titulos");
var idiomas;
cargaarticulos();