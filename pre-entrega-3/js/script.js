const autos = [
    { marca: 'Toyota', modelo: 'Corolla', combustible: 'Gasolina' },
    { marca: 'Mazda', modelo: '3', combustible: 'Gasolina' },
    { marca: 'Honda', modelo: 'Civic', combustible: 'Gasolina' },
    { marca: 'BMW', modelo: '116d', combustible: 'Diesel' },
    { marca: 'Audi', modelo: 'A4', combustible: 'Diesel' }
];

if (!localStorage.getItem('autos')) {
    localStorage.setItem('autos', JSON.stringify(autos));
}

function getAutos() {
    return JSON.parse(localStorage.getItem('autos'));
}

document.getElementById('simuladorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const monto = parseInt(document.getElementById('monto').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);

    if (isNaN(monto) || isNaN(cuotas)) {
        alert('Por favor, ingresa valores válidos.');
        return;
    }

    const porcentajeCuotas = cuotas * 3;
    const totalIntereses = Math.round(monto * cuotas / 50);
    const totalPrestamo = monto + totalIntereses;
    const montoCuota = Math.round(totalPrestamo / cuotas);

    document.getElementById('montoPrestamo').textContent = `Valor de auto: $${monto.toLocaleString()}`;
    document.getElementById('cuotasPrestamo').textContent = `Cuotas: ${cuotas} cuotas`;
    document.getElementById('porcentajeCuotas').textContent = `Porcentaje de cuotas: ${porcentajeCuotas}%`;
    document.getElementById('totalIntereses').textContent = `Intereses: $${totalIntereses.toLocaleString()}`;
    document.getElementById('totalPrestamo').textContent = `Total a pagar: $${totalPrestamo.toLocaleString()}`;
    document.getElementById('montoCuota').textContent = `Total a pagar en ${cuotas} cuotas de $${montoCuota.toLocaleString()}`;

    const simulacion = {
        monto,
        cuotas,
        porcentajeCuotas,
        totalIntereses,
        totalPrestamo,
        montoCuota
    };
    localStorage.setItem('ultimaSimulacion', JSON.stringify(simulacion));

    document.getElementById('resultados').style.display = 'block';
});

document.getElementById('elegirAutoBtn').addEventListener('click', function() {
    const tipoCombustible = document.getElementById('tipoCombustible').value.toLowerCase();

    if (tipoCombustible === "") {
        alert('Por favor, selecciona un tipo de combustible.');
        return;
    }

    const autosFiltrados = getAutos().filter(auto => auto.combustible.toLowerCase() === tipoCombustible);

    if (autosFiltrados.length > 0) {
        let mensajeAutos = "Autos disponibles con " + tipoCombustible + ":\n";
        autosFiltrados.forEach((auto, index) => {
            mensajeAutos += `${index + 1}. ${auto.marca} ${auto.modelo} (${auto.combustible})\n`;
        });

        const eleccion = parseInt(prompt(mensajeAutos + "\nElige el número del auto que deseas:")) - 1;

        if (eleccion >= 0 && eleccion < autosFiltrados.length) {
            const autoElegido = autosFiltrados[eleccion];

            const autoElegidoDiv = document.getElementById('autoElegido');
            autoElegidoDiv.querySelector('p').textContent = `Auto elegido: ${autoElegido.marca} ${autoElegido.modelo} (${autoElegido.combustible})`;
            autoElegidoDiv.style.display = 'block';

            localStorage.setItem('autoElegido', JSON.stringify(autoElegido));
        } else {
            alert("Opción inválida. Por favor, selecciona nuevamente.");
        }
    } else {
        alert("No tenemos autos con ese tipo de combustible.");
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const ultimaSimulacion = JSON.parse(localStorage.getItem('ultimaSimulacion'));
    if (ultimaSimulacion) {
        document.getElementById('montoPrestamo').textContent = `Valor de auto: $${ultimaSimulacion.monto.toLocaleString()}`;
        document.getElementById('cuotasPrestamo').textContent = `Cuotas: ${ultimaSimulacion.cuotas} cuotas`;
        document.getElementById('porcentajeCuotas').textContent = `Porcentaje de cuotas: ${ultimaSimulacion.porcentajeCuotas}%`;
        document.getElementById('totalIntereses').textContent = `Intereses: $${ultimaSimulacion.totalIntereses.toLocaleString()}`;
        document.getElementById('totalPrestamo').textContent = `Total a pagar: $${ultimaSimulacion.totalPrestamo.toLocaleString()}`;
        document.getElementById('montoCuota').textContent = `Total a pagar en ${ultimaSimulacion.cuotas} cuotas de $${ultimaSimulacion.montoCuota.toLocaleString()}`;
        document.getElementById('resultados').style.display = 'block';
    }

    const autoElegido = JSON.parse(localStorage.getItem('autoElegido'));
    if (autoElegido) {
        const autoElegidoDiv = document.getElementById('autoElegido');
        autoElegidoDiv.querySelector('p').textContent = `Auto elegido: ${autoElegido.marca} ${autoElegido.modelo} (${autoElegido.combustible})`;
        autoElegidoDiv.style.display = 'block';
    }
});
