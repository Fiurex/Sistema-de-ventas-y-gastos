let gastomensual = [];
let ventamensual = [];

const menuPrincipal = ["Venta", "Gastos", "Balance mensual"];
const subMenuVenta = ["Registrar venta", "Cerrar caja del día", "Cerrar ventas del mes"];
const subMenuGastos = ["Registrar gasto", "Cerrar gastos del día", "Cerrar gastos del mes"];

let opcionMenuPrincipal;

do {
    opcionMenuPrincipal = prompt(`Seleccione una opción:\n1. ${menuPrincipal[0]}\n2. ${menuPrincipal[1]}\n3. ${menuPrincipal[2]}\nIngrese 'salir' para salir.`);
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
} while (opcionMenuPrincipal !== 'salir');

function registrarVenta() {
    let categoriaventa;
    let montoventa;

    do {
        categoriaventa = prompt("Ingrese la categoría de la venta:");
    } while (!/^[a-zA-Z]+$/.test(categoriaventa)); // Verificar que solo se ingresen letras

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
    let categoriagasto;
    let montogasto;

    do {
        categoriagasto = prompt("Ingrese la categoría del gasto:");
    } while (!/^[a-zA-Z]+$/.test(categoriagasto)); // Verificar que solo se ingresen letras

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
    let balanceMensual = totalVentas - totalGastos;
    console.log("Balance Mensual:", balanceMensual);
}



