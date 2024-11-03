// Cargar datos desde localStorage
const ventamensual = JSON.parse(localStorage.getItem("ventamensual")) || [];
const gastomensual = JSON.parse(localStorage.getItem("gastomensual")) || [];

// Cargar datos desde un archivo JSON inicial
const cargarDatosDesdeJSON = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        // Solo se carga si localStorage está vacío
        if (ventamensual.length === 0 && gastomensual.length === 0) {
            ventamensual.push(...data.ventas);
            gastomensual.push(...data.gastos);
            localStorage.setItem("ventamensual", JSON.stringify(ventamensual));
            localStorage.setItem("gastomensual", JSON.stringify(gastomensual));
        }
    } catch (error) {
        console.error('Error al cargar los datos desde JSON:', error);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await cargarDatosDesdeJSON(); // Cargar datos desde el archivo JSON
    actualizarVenta(); // Actualizar la UI con datos de localStorage
    actualizarGasto(); // Actualizar la UI con datos de localStorage
    document.getElementById("ventaBtn").addEventListener("click", registrarVenta);
    document.getElementById("gastoBtn").addEventListener("click", registrarGasto);
    document.getElementById("balanceBtn").addEventListener("click", mostrarBalanceVentasYGastos);
});

// Función para registrar ventas
function registrarVenta() {
    let categoriaventa, montoventa;

    do {
        categoriaventa = prompt("Ingrese la categoría de la venta:");
    } while (!/^[a-zA-Z]+$/.test(categoriaventa.trim()));

    do {
        montoventa = parseFloat(prompt("Ingrese el monto de la venta:"));
    } while (isNaN(montoventa));

    let venta = { categoria: categoriaventa, monto: montoventa };
    ventamensual.push(venta);
    localStorage.setItem("ventamensual", JSON.stringify(ventamensual)); // Guardar en localStorage

    actualizarVenta(); // Actualizar UI
    Toastify({
        text: "Venta Registrada.",
        duration: 1500,
        position: "left",
        style: { background: "#ff4500", color: "#f5f5f5" },
    }).showToast();
}

// Función para registrar gastos
function registrarGasto() {
    let categoriagasto, montogasto;

    do {
        categoriagasto = prompt("Ingrese la categoría del gasto:");
    } while (!/^[a-zA-Z]+$/.test(categoriagasto.trim()));

    do {
        montogasto = parseFloat(prompt("Ingrese el monto del gasto:"));
    } while (isNaN(montogasto));

    let gasto = { categoria: categoriagasto, monto: montogasto };
    gastomensual.push(gasto);
    localStorage.setItem("gastomensual", JSON.stringify(gastomensual)); // Guardar en localStorage

    actualizarGasto(); // Actualizar UI
    Toastify({
        text: "Gasto Registrado.",
        duration: 1500,
        position: "right",
        style: { background: "#ff4500", color: "#f5f5f5" },
    }).showToast();
}

// Función para actualizar la visualización de ventas
const actualizarVenta = () => {
    const noVentas = document.querySelector("#no-ventas");
    const Ventas = document.querySelector("#reg-ventas");
    Ventas.innerHTML = "";

    if (ventamensual.length === 0) {
        noVentas.classList.remove("d-none");
        Ventas.classList.add("d-none");
    } else {
        noVentas.classList.add("d-none");
        Ventas.classList.remove("d-none");

        ventamensual.forEach((venta) => {
            let div = document.createElement("div");
            div.classList.add("reg-venta");
            div.innerHTML = `<h3>${venta.categoria} $${venta.monto}</h3>`;

            let button = document.createElement("button");
            button.classList.add("ventareg-btn");
            button.innerText = "✖️";
            button.addEventListener("click", () => {
                borrarVenta(venta);
            });

            div.appendChild(button);
            Ventas.appendChild(div);
        });
    }
    calcularTotalVentas();
};

// Función para calcular el total de ventas
function calcularTotalVentas() {
    const ventaTotal = document.querySelector("#ventas-total");
    const total = ventamensual.reduce((acc, venta) => acc + venta.monto, 0);
    ventaTotal.textContent = `$${total}`;
}

// Función para borrar una venta
const borrarVenta = (venta) => {
    const index = ventamensual.findIndex(item => item === venta);
    if (index !== -1) {
        ventamensual.splice(index, 1);
        localStorage.setItem("ventamensual", JSON.stringify(ventamensual)); // Actualizar localStorage
        actualizarVenta();
    }
};

// Función para actualizar la visualización de gastos
const actualizarGasto = () => {
    const noGastos = document.querySelector("#no-gastos");
    const Gastos = document.querySelector("#reg-gastos");
    Gastos.innerHTML = "";

    if (gastomensual.length === 0) {
        noGastos.classList.remove("d-none");
        Gastos.classList.add("d-none");
    } else {
        noGastos.classList.add("d-none");
        Gastos.classList.remove("d-none");

        gastomensual.forEach((gasto) => {
            let div = document.createElement("div");
            div.classList.add("reg-gasto");
            div.innerHTML = `<h3>${gasto.categoria} $${gasto.monto}</h3>`;

            let button = document.createElement("button");
            button.classList.add("gastoreg-btn");
            button.innerText = "✖️";
            button.addEventListener("click", () => {
                borrarGasto(gasto);
            });

            div.appendChild(button);
            Gastos.appendChild(div);
        });
    }
    calcularTotalGastos();
};

// Función para calcular el total de gastos
function calcularTotalGastos() {
    const gastoTotal = document.querySelector("#gastos-total");
    const total = gastomensual.reduce((acc, gasto) => acc + gasto.monto, 0);
    gastoTotal.textContent = `$${total}`;
}

// Función para borrar un gasto
const borrarGasto = (gasto) => {
    const index = gastomensual.findIndex(item => item === gasto);
    if (index !== -1) {
        gastomensual.splice(index, 1);
        localStorage.setItem("gastomensual", JSON.stringify(gastomensual)); // Actualizar localStorage
        actualizarGasto();
    }
};

// Función para mostrar el balance de ventas y gastos
function mostrarBalanceVentasYGastos() {
    let totalVentas = ventamensual.reduce((total, venta) => total + venta.monto, 0);
    let totalGastos = gastomensual.reduce((total, gasto) => total + gasto.monto, 0);
    let balance = totalVentas - totalGastos;

    Swal.fire({
        title: "Balance mensual",
        html: `Total Ventas: $${totalVentas}<br>Total Gastos: $${totalGastos}<br>Ganancia: $${balance}`,
        showCancelButton: true,
        confirmButtonText: "Cerrar caja",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            ventamensual.length = 0;
            gastomensual.length = 0;
            localStorage.setItem("ventamensual", JSON.stringify(ventamensual)); // Limpiar localStorage
            localStorage.setItem("gastomensual", JSON.stringify(gastomensual)); // Limpiar localStorage
            actualizarVenta();
            actualizarGasto();
            Swal.fire("Mes Finalizado", "", "success");
        }
    });
}

// Inicializa la visualización
cargarDatosDesdeJSON();