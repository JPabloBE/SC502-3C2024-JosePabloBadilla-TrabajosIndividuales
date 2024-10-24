function calcular() {
    let salarioBruto = parseFloat(document.getElementById('salario').value);
    
    if(isNaN(salarioBruto) || salarioBruto <= 0){
        document.getElementById('resultado').innerHTML = "Por favor, ingrese un salario válido.";
        return;
    }

    let cargasSociales = salarioBruto * 0.0934; 
    let impuestoRenta = calcularImpuestoRenta(salarioBruto);
    let salarioNeto = salarioBruto - cargasSociales - impuestoRenta;

    document.getElementById('resultado').innerHTML = `
        <p>Cargas Sociales: ₡${cargasSociales.toFixed(2)}</p>
        <p>Impuesto sobre la Renta: ₡${impuestoRenta.toFixed(2)}</p>
        <p>Salario Neto: ₡${salarioNeto.toFixed(2)}</p>
    `;
}

function calcularImpuestoRenta(salario) {
    if (salario <= 842000) {
        return 0;
    } else if (salario <= 1235000) {
        return (salario - 842000) * 0.10;
    } else {
        return (salario - 1235000) * 0.15 + (1235000 - 842000) * 0.10;
    }
}
