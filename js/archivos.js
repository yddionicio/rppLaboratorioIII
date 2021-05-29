
window.addEventListener("load", () => {
    addOptions(document.getElementById("Año"));
    Get();
    let boton = document.getElementById("boton");
    boton.addEventListener("click", form);
})

function form() {
    document.getElementById("idCerrar").onclick = (e) => {
        e.preventDefault();
        document.getElementById("form").className = "invisible";
    }
    document.getElementById("form").className = "visible";
    let boton = document.getElementById("idAlta");
    boton.onclick = GetFormData;
}

function addOptions(select) {

    for (let i = 2000; i < 2021; i++) {
        var option = document.createElement("option");
        option.text = i;
        option.value = i;
        select.add(option);
    }
}

function Get() {

    fetch('http://localhost:3000/autos')
        .then(response => {
            let contenedor = document.getElementById("contenedor_carga");
            contenedor.style.visibility = 'hidden';
            contenedor.style.opacity = '0';

            if (response.status == 200) {
                // console.log(response.json());
                response.json().then(function (data) {
                    console.log(data);

                    let listaAutos = data;

                    for (let i = 0; i < listaAutos.length; i++) {

                        //defino los elementos 
                        let tbody = document.getElementById("tbody");
                        let trow = document.createElement("tr");
                        let make = document.createElement("td");
                        let model = document.createElement("td");
                        let year = document.createElement("td");
                        let select = document.createElement("select");

                        //otorgo valores
                        make.appendChild(document.createTextNode(listaAutos[i].make));
                        model.appendChild(document.createTextNode(listaAutos[i].model));
                        year.appendChild(select);
                        addOptions(select);
                        select.value = listaAutos[i].year;
                        select.onchange = (e) => {

                            PostModificar(e.target.value, e.target.parentNode.parentNode.id);

                        }

                        //agrego los campos a la fila
                        trow.id = listaAutos[i].id;
                        trow.appendChild(make);
                        trow.appendChild(model);
                        trow.appendChild(year);

                        //agrego la fila a la tabla body
                        tbody.appendChild(trow);
                    }
                })
            }
            else {
                console.error(request.responseText);
            }
        });
}

function GetFormData(e) {

    e.preventDefault();
    let make = document.getElementById("idMarca");
    let model = document.getElementById("idModelo");
    let year = document.getElementById("Año");

    let data = {
        make: make.value,
        model: model.value,
        year: year.value
    }

    let valyear = ValidarAño(year) 
    let valmake = ValidarMake(make);
    let valmodel = ValidarModel(model);

    if (valyear && valmake && valmodel) {

        document.getElementById("form").className = "invisible";
        PostAlta(data);
    }
}

function PostAlta(auto) {

    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4) {

            let contenedor = document.getElementById("contenedor_carga");
            contenedor.style.visibility = 'hidden';
            contenedor.style.opacity = '0';

            if (request.status == 200) {

                //defino los elementos 
                let tbody = document.getElementById("tbody");
                let trow = document.createElement("tr");
                let make = document.createElement("td");
                let model = document.createElement("td");
                let year = document.createElement("td");
                let select = document.createElement("select");

                //otorgo valores
                make.appendChild(document.createTextNode(auto.make));
                model.appendChild(document.createTextNode(auto.model));
                year.appendChild(select);
                addOptions(select);
                select.value = auto.year;
                select.onchange = (e) => {
                    PostModificar(e.target.value, e.target.parentNode.parentNode.id);
                }

                //agrego los campos a la fila
                trow.id = tbody.childElementCount + 1;
                trow.appendChild(make);
                trow.appendChild(model);
                trow.appendChild(year);

                //agrego la fila a la tabla body
                tbody.appendChild(trow);
            }
            else {
                console.error(request.responseText);
            }
        }
        else {
            let contenedor = document.getElementById("contenedor_carga");
            contenedor.style.visibility = 'visible';
            contenedor.style.opacity = '100';
        }
    }
    request.open("POST", "http://localhost:3000/nuevoAuto");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(auto));
}

function PostModificar(year, id) {

    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4) {

            let contenedor = document.getElementById("contenedor_carga");
            contenedor.style.visibility = 'hidden';
            contenedor.style.opacity = '0';

            if (request.status == 200) {
                console.log("OK");
            }
            else {
                console.error(request.responseText);
            }
        }
        else {
            let contenedor = document.getElementById("contenedor_carga");
            contenedor.style.visibility = 'visible';
            contenedor.style.opacity = '100';
        }
    }
    request.open("POST", "http://localhost:3000/editarYear");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(JSON.stringify({ year, id }));
}


function ValidarMake(make) {

    let resultado = make.value.length >= 3;

    if (resultado) {
        make.className = "Ok";
    }
    else {
        make.className = "Error";
    }
    return resultado;
}

function ValidarModel(model) {

    let resultado = model.value.length >= 3;

    if (resultado) {
        model.className = "Ok";
    }
    else {
        model.className = "Error";
    }
    return resultado;
}

function ValidarAño(Año) {

    let resultado = Año.value >= 2000 && Año.value <= 2020;

    if (resultado) {
        Año.className = "Ok";
    }
    else {
        Año.className = "Error";
    }
    return resultado;
}
