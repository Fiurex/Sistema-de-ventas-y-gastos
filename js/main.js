let gastomensual = [];
let ventamensual = [];

let categoriaventa;
let montoventa;
let categoriagasto;
let montogasto;
let balanceMensual;

const menuPrincipal = ["Venta", "Gastos", "Balance"];
let opcionMenuPrincipal;

do {
    opcionMenuPrincipal = prompt(`Seleccione una opción:\n1. ${menuPrincipal[0]}\n2. ${menuPrincipal[1]}\n3. ${menuPrincipal[2]}`);
    // Convertir la opción a número si es válida
    opcionMenuPrincipal = parseInt(opcionMenuPrincipal);

    switch (opcionMenuPrincipal) {
        case 1: // Venta
            registrarVenta();
            break;

        case 2: // Gastos
            registrarGasto();
            break;

        case 3: // Balance mensual
            calcularBalanceMensual();
            break;

        default:
            break;
    }
} while (opcionMenuPrincipal !== 4);



function registrarVenta() {
    
    do {
        categoriaventa = prompt("Ingrese la categoría de la venta:");
    } while (!/^[a-zA-Z]+$/.test(categoriaventa.trim())); // Verificar que solo se ingresen letras (mayúsculas o minúsculas)

    do {
        montoventa = parseFloat(prompt("Ingrese el monto de la venta:"));
    } while (isNaN(montoventa)); // Verificar que se ingrese un número

    let venta = {
        categoria: categoriaventa,
        monto: montoventa
    };
    ventamensual.push(venta);
    console.log("Venta registrada:", venta);
}


function registrarGasto() {
    

    do {
        categoriagasto = prompt("Ingrese la categoría del gasto:");
    } while (!/^[a-zA-Z]+$/.test(categoriagasto.trim())); // Verificar que solo se ingresen letras (mayúsculas o minúsculas)
    
    do {
        montogasto = parseFloat(prompt("Ingrese el monto del gasto:"));
    } while (isNaN(montogasto)); // Verificar que se ingrese un número

    let gasto = {
        categoria: categoriagasto,
        monto: montogasto
    };
    gastomensual.push(gasto);
    console.log("Gasto registrado:", gasto);
}

function calcularBalanceMensual() {
    let totalVentas = ventamensual.reduce((total, venta) => total + venta.monto, 0);
    let totalGastos = gastomensual.reduce((total, gasto) => total + gasto.monto, 0);
    balanceMensual = totalVentas - totalGastos;
    mostrarbalance();
    prompt("Ver el balance en consola. Presione aceptar para volver al menu principal.");
}

function mostrarbalance(){
    console.log("Categorias de ventas: ", categoriaventa);
    console.log("Ventas totales: ", ventamensual);
    console.log("Categoria de gastos: ", categoriagasto);
    console.log("Gastos totales: ", gastomensual);
    console.log("Balance: ", balanceMensual);
}


