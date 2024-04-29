const gastomensual = JSON.parse(localStorage.getItem("gastomensual")) || [];
console.log(gastomensual);
const ventamensual = JSON.parse(localStorage.getItem("ventamensual")) || [];
console.log(ventamensual);

let categoriaventa;
let montoventa;
let categoriagasto;
let montogasto;
let balanceMensual;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ventaBtn").addEventListener("click", registrarVenta);
    document.getElementById("gastoBtn").addEventListener("click", registrarGasto);
    document.getElementById("balanceBtn").addEventListener("click", mostrarBalanceVentasYGastos);

});

document.getElementById("ventaBtn").addEventListener("click", registrarVenta);
document.getElementById("gastoBtn").addEventListener("click", registrarGasto);
document.getElementById("balanceBtn").addEventListener("click", mostrarBalanceVentasYGastos);

const noVentas = document.querySelector("#no-ventas");
const noGastos = document.querySelector("#no-gastos");
const Ventas = document.querySelector("#reg-ventas");
const Gastos = document.querySelector("#reg-gastos");
const ventaTotal = document.querySelector("#ventas-total");
const gastoTotal = document.querySelector("#gastos-total");


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

    const ventaItem = document.createElement("div");
    ventaItem.textContent = `${venta.categoria}: $${venta.monto}`;
    Ventas.appendChild(ventaItem);

    calcularTotalVentas();
    actualizarVenta();

    Toastify({
        text: "Venta Registrada.",
        duration: 1500,
        position: "left",
        style: {
          background: "#ff4500",
          color: "#f5f5f5",
        },
        onClick: function(){} // Callback after click
      }).showToast();

}

function calcularTotalVentas() {
    let total = 0;
    ventamensual.forEach(venta => {
        total += venta.monto;
    });
    ventaTotal.textContent = `$${total}`;
}

const actualizarVenta = () => {
    if (ventamensual.length === 0) {
        noVentas.classList.remove("d-none");
        Ventas.classList.add("d-none");
    } else {
        noVentas.classList.add("d-none");
        Ventas.classList.remove("d-none");

        Ventas.innerHTML = "";
        ventamensual.forEach((venta) => {
            let div = document.createElement("div");
            div.classList.add("reg-venta");
            div.innerHTML = `
                <h3>${venta.categoria} $ ${venta.monto}</h3>`;

            let button = document.createElement("button");
            button.classList.add("ventareg-btn");
            button.innerText = "✖️";
            button.addEventListener("click", () => {
                borrarVenta(venta);
            })

            div.appendChild(button);
            Ventas.appendChild(div);

        })
    }
    calcularTotalVentas();
    localStorage.setItem("ventamensual", JSON.stringify(ventamensual));
}

const borrarVenta = (venta) => {
    const index = ventamensual.findIndex(item => item === venta); 

    if (index !== -1) {
        ventamensual.splice(index, 1);
        actualizarVenta(); 
    }
};

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

    const gastoItem = document.createElement("div");
    gastoItem.textContent = `${gasto.categoria}: $${gasto.monto}`;
    Gastos.appendChild(gastoItem);

    calcularTotalGastos();
    actualizarGasto();

    Toastify({
        text: "Gasto Registrado.",
        duration: 1500,
        position: "right",
        style: {
          background: "#ff4500",
          color: "#f5f5f5",
        },
        onClick: function(){} // Callback after click
      }).showToast();

}

function calcularTotalGastos() {
    let total = 0;
    gastomensual.forEach(gasto => {
        total += gasto.monto;
    });
    gastoTotal.textContent = `$${total}`;
}

const actualizarGasto = () => {
    if (gastomensual.length === 0) {
        noGastos.classList.remove("d-none");
        Gastos.classList.add("d-none");
    } else {
        noGastos.classList.add("d-none");
        Gastos.classList.remove("d-none");

        Gastos.innerHTML = "";
        gastomensual.forEach((gasto) => {
            let div = document.createElement("div");
            div.classList.add("reg-gasto");
            div.innerHTML = `
                <h3>${gasto.categoria} $ ${gasto.monto}</h3>`;

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
    localStorage.setItem("gastomensual", JSON.stringify(gastomensual));
}

const borrarGasto = (gasto) => {
    const index = gastomensual.findIndex(item => item === gasto); 

    if (index !== -1) {
        gastomensual.splice(index, 1);
        actualizarGasto(); 
    }
};


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
            actualizarVenta();
            actualizarGasto();
            Swal.fire("Mes Finalizado", "", "success");
        }
    });
    
}


actualizarGasto();
actualizarVenta();

