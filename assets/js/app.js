/*
This is a test database, in a real case a stricter security protocol would be used, this should be on the server side and not on the client side, this is just a test
*/

database = JSON.parse(localStorage.getItem("loginsystem"));

if (!database) {
    loadinitialdatafromdatabase()
}

function savedatabasedata() {
    localStorage.setItem("loginsystem", JSON.stringify(database))
}

function loadinitialdatafromdatabase() {
    database = {
        adriangonzalez: {
            password: "AdrianGonzalez",
        },
        augustoiphar: {
            password: "AugustoIphar",
        },
        hernanscioscia: {
            password: "HernanScioscia",
        },
        gustavocardenas: {
            password: "GustavoCardenas",
        },
        monserratgutierrez: {
            password: "MonserratGutierrez",
        },
        diegolopez: {
            password: "DiegoLopez",
        },
        camilaocceli: {
            password: "CamilaOcceli",
        },
        fernandotapia: {
            password: "FernandoTapia",
        },
        emiliocamarillo: {
            password: "EmilioCamarillo",
        },
        abnerham: {
            password: "AbnerHam",
        },
    };
}

























async function menu() {
    optionmenu = -1
    await swal.fire({
        title: "Menú",
        showConfirmButton: false,
        html:
            `
        <button class="swal2-confirm swal2-styled" onclick='optionmenu=0;Swal.close()'>Registrar nuevo usuario</button>
        <br>
        <button class="swal2-confirm swal2-styled" onclick='optionmenu=1;Swal.close()'>Iniciar sesión</button>
        `
    })
    switch (optionmenu) {
        case 0:
            registernewuser();
            break;
        case 1:
            login();
            break;
        default:
            await menu();
            break;
    }
}

async function registernewuser() {
    optionregisternewuser = -1;
    await swal.fire({
        title: "Registrar nuevo usuario",
        showConfirmButton: false,
        html:
            `
        <input class="swal2-input" placeholder="Nombre de usuario" id="username">
        <input class="swal2-input" type="password" placeholder="Contraseña" id="password">
        <br>
        <br>
        <button class="swal2-confirm swal2-styled" onclick='optionregisternewuser=0;Swal.clickConfirm()'>Crear nuevo usuario</button>
        <button class="swal2-confirm swal2-styled" onclick='optionregisternewuser=1;Swal.close()'>Cancelar</button>
        `,
        preConfirm: () => {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            if (!username) {
                Swal.showValidationMessage("Ingrese el nombre de usuario")
                return false
            }
            if (!password) {
                Swal.showValidationMessage("Ingrese su contraseña")
                return false
            }
            database[username] = {}
            database[username].password = password
            savedatabasedata();
            return true
        },
    });
    switch (optionregisternewuser) {
        case 0:
            menu();

            break;
        case 1:
            menu()

        default:
            break;
    }
}

async function login() {
    let { value: data } = await swal.fire({
        title: "Bienvenido a ABIAH",
        confirmButtonText: "Iniciar sesión",
        html:
            `
        <div style="margin: 5px">
        <input class="swal2-input" placeholder="Nombre de usuario" id="username">
        <input class="swal2-input" type="password" placeholder="Contraseña" id="password">
        </div>
        `,
        preConfirm: () => {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            if (!username) {
                Swal.showValidationMessage("Ingrese el nombre de usuario")
                return false
            }
            if (!password) {
                Swal.showValidationMessage("Ingrese su contraseña")
                return false
            }
            let data = database[username]
            if (!data) {
                Swal.showValidationMessage("El nombre de usuario es incorrecto o no existe")
                return false
            }
            if (data.password != password) {
                Swal.showValidationMessage("La contraseña es incorrecta o el usuario no existe")
                return false
            }
            return data
        },
    });
    return data;
}