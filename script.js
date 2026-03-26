const weatherKey = window.weatherKey;

let city = '';
const k = 273.15;

document.getElementById('botonBusqueda').addEventListener('click', () => {
    city = document.getElementById('ciudadEntrada').value; 
    if (city !== '') {
        executeFetch();
        document.getElementById('ciudadEntrada').value = "";

    }
});

function executeFetch(env ) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`)
  .then(response => response.json())
  .then(response => mostrarClima(response))

}



function mostrarClima(response) {
console.log(response);
const div = document.getElementById('resultado');
div.innerHTML = '';
const nombreCiudad = response.name;
const temperatura = response.main.temp - k;
const descripcion = response.weather[0].description;
const humedad = response.main.humidity;
const sensacionTermica = response.main.feels_like - k;

const datosPrincipales = `
        <h2 class="aparecer">Weather in ${nombreCiudad}</h2>
    
    <div class="infoClima aparecer">
      
    
        <h2 class="temperatura aparecer">     <svg width="100" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
       <!-- Sol -->
      <circle cx="50" cy="50" r="18" fill="#FFD700" />
     <!-- Rayos del sol -->
     <g stroke="#FFD700" stroke-width="4">
     <line x1="50" y1="20" x2="50" y2="5" />
     <line x1="50" y1="80" x2="50" y2="95" />
     <line x1="20" y1="50" x2="5" y2="50" />
     <line x1="80" y1="50" x2="95" y2="50" />
     <line x1="30" y1="30" x2="18" y2="18" />
     <line x1="70" y1="30" x2="82" y2="18" />
     <line x1="30" y1="70" x2="18" y2="82" />
      <line x1="70" y1="70" x2="82" y2="82" />
     </g>
     <!-- Nube -->
      <g fill="#FFFFFF">
      <ellipse cx="60" cy="60" rx="18" ry="12" />
      <ellipse cx="45" cy="62" rx="14" ry="10" />
      <ellipse cx="70" cy="65" rx="12" ry="9" />
      </g>
      </svg>

      ${temperatura.toFixed(2)} °C</h2>
        
        
        
        <p class="descripcion"> ${descripcion}</p>
       
    </div>

    <div id= "datos" class="aparecer">

        <div class="datoHumedad">    
           
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 18C11.5597 18 11.1318 17.8547 10.7825 17.5867C10.4332 17.3187 10.1821 16.9429 10.0681 16.5176" stroke="#c2a8f8" stroke-linecap="round"/>
            <path d="M10.4243 4.67868C11.0553 3.60606 11.3707 3.06975 11.8223 2.98822C11.9398 2.967 12.0602 2.967 12.1777 2.98822C12.6293 3.06975 12.9447 3.60606 13.5757 4.67868L15.244 7.51482C16.41 9.49693 17.3197 11.619 17.9515 13.8301V13.8301C18.9781 17.4232 16.2801 21 12.5432 21H11.4568C7.71989 21 5.02193 17.4232 6.04854 13.8301V13.8301C6.6803 11.619 7.59004 9.49693 8.75599 7.51482L10.4243 4.67868Z" stroke="#c2a8f8"/>
            </svg>
            <p class="humedad">Humidity: <br> <bold> ${humedad} % </bold></p>

        </div>
        
        <div class="datoSensacionTermica" >
            <svg fill="#c2a8f8" width="40px" height="40px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

            <g>

             <path d="M50,82.3c7.6,0,13.8-6.2,13.8-13.8c0-4.4-2-8.4-5.5-11V26c0-2.2-0.9-4.3-2.4-5.9c-1.6-1.6-3.7-2.4-5.9-2.4   c-4.6,0-8.3,3.7-8.3,8.3v31.5c-3.4,2.6-5.5,6.6-5.5,11C36.2,76.1,42.4,82.3,50,82.3z M44.8,60.3l0.9-0.6V48.2H50v-4h-4.3v-1.8H50   v-4h-4.3v-1.8H50v-4h-4.3v-1.8H50v-4h-4.3V26c0-2.4,1.9-4.3,4.3-4.3c1.1,0,2.2,0.4,3,1.3c0.8,0.8,1.3,1.9,1.3,3v33.6l0.9,0.6   c2.8,1.8,4.5,4.9,4.5,8.2c0,5.4-4.4,9.8-9.8,9.8s-9.8-4.4-9.8-9.8C40.2,65.1,41.9,62.1,44.8,60.3z"/>

             <path d="M50,76.6c4.5,0,8.1-3.6,8.1-8.1c0-3.8-2.6-6.9-6.1-7.8v-8.1h-4v8.1c-3.5,0.9-6.1,4.1-6.1,7.8C41.9,73,45.5,76.6,50,76.6z    M50,64.4c2.3,0,4.1,1.8,4.1,4.1s-1.8,4.1-4.1,4.1s-4.1-1.8-4.1-4.1S47.7,64.4,50,64.4z"/>

            </g>

            </svg>    
            <p class="sensacionTermica">Feels like: <br> <bold> ${sensacionTermica.toFixed(2)} °C </bold></p>
        </div>

    
    
    
    </div>


`
obtenerConsejoIA(response);
div.innerHTML = datosPrincipales;

}



document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll('.rounded');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action; 

            if (action && actionMap[action]) {
                actionMap[action]();
            } else {
                console.error(`Error: No se encontró la función para la acción: ${action}`);
            }
        });
    });
});

async function obtenerConsejoIA(datosClima) {
    const divIA = document.getElementById('respuestaIA'); 
    if (!divIA) return; 
    
    divIA.innerHTML = 'Loading text...';

    try {
        const response = await fetch('https://weathercode.diegoandrezenriquez.workers.dev/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ciudad: datosClima.name,
                temp: (datosClima.main.temp - 273.15).toFixed(1),
                desc: datosClima.weather[0].description
            })
        });

        const data = await response.json();

        let textoFinal = "";
        
        if (data.result && data.result.response) {
            textoFinal = data.result.response;
        } else if (data.response) {
            textoFinal = data.response;
        } else if (data.error) {
            textoFinal = "Error: " + data.error;
        } else {
            textoFinal = "La IA respondió, pero el formato es desconocido.";
        }

        divIA.innerHTML = `<p class="ia-text"> ${textoFinal}</p>`;

    } catch (error) {
        console.error("Error en la llamada:", error);
        divIA.innerHTML = `<p style="color:red">Error de conexión con la IA</p>`;
    }
}


//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}