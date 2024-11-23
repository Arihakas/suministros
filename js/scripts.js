// funcion para limpiar los campos, durante las pruebas no era necesario pero despues si resulta util, no logro devolver la pagina al estado incial.
window.onload = function() {
    limpiarCampos();
  }

function limpiarCampos() {
        // Limpiar todos los inputs de texto, números, y fechas
        document.querySelectorAll("input[type='text'], input[type='number'], input[type='date']").forEach(input => {
            input.value = ""; // Limpia el valor
        });
      
        // Limpiar los selects (dejarlos sin selección)
        document.querySelectorAll("select").forEach(select => {
            select.selectedIndex = -1; // Deselecciona cualquier opción
        });
      
        // Limpiar los textareas
        document.querySelectorAll("textarea").forEach(textarea => {
            textarea.value = ""; // Limpia el contenido
        });
      
        // Reiniciar los spans que muestran resultados
        document.querySelectorAll("span").forEach(span => {
            span.innerText = "0"; // Restaura el valor inicial
        });
    
    }
    
// funcion para cambiar la visivilidad de algunos elementos dependiendo del origen de la factura.
function actualizarOrigenFAC() {
    const origenFac = document.getElementById('origenFac').value;
    const salidaInqAnt = document.getElementById('salidaInqAnt-container');
    const diasProporcionalInqAnt = document.getElementById('diasProporcionalInqAnt-container');
    const importeProporcionalInqAnt = document.getElementById('importeProporcionalInqAnt-container');
    const existeInqAct = document.getElementById('existeInquilinoActual');
    
    if (origenFac === 'origenInqAnt') {
        salidaInqAnt.style.display = 'block';
        diasProporcionalInqAnt.style.display = 'block';
        importeProporcionalInqAnt.style.display = 'block';
        existeInqAct.style.display = 'block';
    } else {
        salidaInqAnt.style.display = 'none';
        diasProporcionalInqAnt.style.display = 'none';
        importeProporcionalInqAnt.style.display = 'none';
        existeInqAct.style.display = 'none';
    }
    
}

// funcion pra actualizar los campos de la forma de pago.
function actualizarFormaPago() {
    const formPago = document.getElementById('formPago').value;
    const camposIban = document.getElementById('camposIban');
    const contactoPagoCampo = document.getElementById('contactoPagoCampo');
    const camposEmpresa = document.getElementById('camposEmpresa');

    if (formPago === 'propietario' || formPago === 'inqAnterior' || formPago === 'administrador') {
        camposIban.style.display = 'block';
        contactoPagoCampo.style.display = 'none';
        camposEmpresa.style.display = 'none';
    } else if (formPago === 'contactarAdministrador') {
        camposIban.style.display = 'none';
        contactoPagoCampo.style.display = 'block';
        camposEmpresa.style.display = 'none';
    } else if (formPago === 'empresaSuministro') {
        camposIban.style.display = 'none';
        contactoPagoCampo.style.display = 'none';
        camposEmpresa.style.display = 'block';
    }

    if (formPago === 'propietario' || formPago === 'inqAnterior' || formPago === 'administrador') {
        camposIban.style.visibility = 'visible';
        contactoPagoCampo.style.visibility = 'hidden';
        camposEmpresa.style.visibility = 'hidden';
    } else if (formPago === 'contactarAdministrador') {
        camposIban.style.visibility = 'hidden';
        contactoPagoCampo.style.visibility = 'visible';
        camposEmpresa.style.visibility = 'hidden';
    } else if (formPago === 'empresaSuministro') {
        camposIban.style.visibility = 'hidden';
        contactoPagoCampo.style.visibility = 'hidden';
        camposEmpresa.style.visibility = 'visible';
    }
}        
        
// funcion para actualizar campos en caso deser necesario cambiar la titularidad.
function actualizarCambioTitularidad() {
    const cambioTitularidad = document.getElementById('cambioTitularidad').value;
    const OpcionesTitularidad = document.getElementById('OpcionesTitularidad');

    if (cambioTitularidad === 'si') {
        OpcionesTitularidad.style.display = 'block';
    } else {
        OpcionesTitularidad.style.display = 'none';
    }

}

// funcion para copiar mensaje.
function copiarTexto(id) {
    const mensaje = document.getElementById(id);
    mensaje.select();
    
    navigator.clipboard.writeText(mensaje.value)
        .then(() => {
            alert('Mensaje copiado');
        })
        .catch((error) => {
            console.error('Error al copiar el texto: ', error);
        });

}

// funcion interna que me surgio a la hora de crear el mensaje, 
// originalmente iba a hacerlo dentro de la funcion calcular()
// pero pense que era mas claro separadas y me permitiria modificar el mensaje mas facilmente
function generarMensaje(importeProporcionalInq, importeProporcionalProp, importeTotal, diasProporcionalInq, diasProporcionalProp) {
    let formPago = document.getElementById('formPago').value;
    const cambioTitularidad = document.getElementById('cambioTitularidad').value;
    const quienRealizaCambio = document.getElementById('quienRealizaCambio') ? document.getElementById('quienRealizaCambio').value : '';
    const origenFac = document.getElementById('origenFac').value;
    const fechaInicio = document.getElementById('inicioFac').value;
    const fechaFin = document.getElementById('finFac').value;
    const entradaInq = document.getElementById('entradaInq').value;
    
    let mensajeInq = '';
    let mensajeProp = '';

    // Mensaje para el inquilino
  
    if (origenFac === 'origenProp'){
        mensajeInq = `Estimado inquilino\n\nContactamos con usted para informar que la propiedad nos ha remitido una factura con ciclo de facturación del ${fechaInicio} al ${fechaFin}, con importe de ${importeTotal.toFixed(2)} €.\nComo usted recibió las llaves de la vivienda el ${entradaInq} le corresponden ${diasProporcionalInq.innerText} días, por lo que le corresponde el importe de ${importeProporcionalInq.toFixed(2)} €.\n`;
    }   else {
        mensajeInq = `Estimado inquilino\n\nContactamos con usted para informar que el inquilino anterior nos ha remitido una factura con ciclo de facturación del ${fechaInicio} al ${fechaFin}, con importe de ${importeTotal.toFixed(2)} €.\nComo usted recibió las llaves de la vivienda el ${entradaInq} le corresponden ${diasProporcionalInq.innerText} días, por lo que le corresponde el importe de ${importeProporcionalInq.toFixed(2)} €.\n`;
    }
    
    // forma de pago
    if (formPago === 'propietario' || formPago === 'inqAnterior' || formPago === 'administrador') {
        const iban = document.getElementById('iban').value;
        if (formPago === 'inqAnterior') {
            formPago = 'inquilino anterior';
        }
        mensajeInq += `Puede hacer el abono en el siguiente IBAN del ${formPago}: ${iban}.\n`;

    } else if (formPago === 'contactarAdministrador') {
        const telefono = document.getElementById('telefonoPago').value;
        const email = document.getElementById('correoPago').value;
        mensajeInq += `Para realizar el abono de puede ponerse en contacto con el administrador en el teléfono ${telefono}`;
        if (email != '') {
            mensajeInq += ` o en el correo ${email}`;
        }

    } else if (formPago === 'empresaSuministro') {
        const empresaNombre = document.getElementById('empresaNombre').value;
        const empresaTelefono = document.getElementById('empresaTelefono').value;
        mensajeInq += `Para realizar el abono de puede ponerse en contacto con ${empresaNombre} en el teléfono ${empresaTelefono}.\n`;
        
    }

    // cambio de titularidad
    if (cambioTitularidad === 'si') {
        if (quienRealizaCambio === 'propietario') {
            mensajeInq += `\nAprovechamos a recordar la importancia de realizar el cambio de titularidad de los suministros, la propiedad se encargara de realizar dicho cambio de titularidad o cambio de domiciliación bancaria del suministro para que usted pueda tener un mejor control del consumo y mayor comodidad.\n\nRogamos nos remita el comprobante del abono.\n\nUn saludo.`;
        } else {

            const contactarCon = document.getElementById('contactarCon').value;
            const telefonoCambio = document.getElementById('telefonoCambio').value;
            const correoCambio = document.getElementById('correoCambio').value;

            if (contactarCon === 'administrador') {
                mensajeInq += `\nAprovechamos a recordar la importancia de realizar el cambio de titularidad de los suministros para poder tener un mejor control del consumo y mayor comodidad, contactando con el administrador en el teléfono ${telefonoCambio}`;    
            } else {
                mensajeInq += `\nAprovechamos a recordar la importancia de realizar el cambio de titularidad de los suministros para poder tener un mejor control del consumo y mayor comodidad, contactando con la empresa del suministro en el teléfono ${telefonoCambio}`;    
            }

            if (correoCambio != '') {
                mensajeInq += ` o en el correo ${correoCambio}`;
            }

            mensajeInq += `\n\nRogamos nos remita el comprobante del abono y la confirmación del cambio de titularidad\n\nUn saludo.`;
        }
    }   else {
        mensajeInq += `\nRogamos nos remita el comprobante del abono.\n\nUn saludo.`;
    }

    // Mensaje para el propietario

    if (importeProporcionalProp > 0) {


        if (origenFac === 'origenInq'){
            mensajeProp = `Estimada propiedad\n\nContactamos con usted para informar que su ultimo inquilino nos ha remitido una factura con ciclo de facturación del ${fechaInicio} al ${fechaFin} , con importe de ${importeTotal.toFixed(2)} €.\nComo el inquilino abandono la vivienda el ${salidaInqAnt} le corresponden ${diasProporcionalProp.innerText} días, por lo que le corresponde el importe de ${importeProporcionalProp.toFixed(2)} €.`;
        }   else {
            const salidaInqAnt = document.getElementById('salidaInqAnt').value;
            mensajeProp = `Estimada propiedad\n\nContactamos con usted para informar que su inquilino anterior nos ha remitido una factura con ciclo de facturación del ${fechaInicio} al ${fechaFin}, con importe de ${importeTotal.toFixed(2)} €.\nComo el inquilino abandono la vivienda el ${salidaInqAnt} y el actual entro el ${entradaInq} le corresponden ${diasProporcionalProp.innerText} días, por lo que le corresponde el importe de ${importeProporcionalProp.toFixed(2)} €.`;
        }
        // forma de pago
        if (formPago === 'inqAnterior' || formPago === 'administrador') {
            const ibanPagoProp = document.getElementById('iban').value;
            if (formPago === 'inqAnterior') {
                formPago = 'inquilino anterior';
            }
            mensajeProp += `\nPuede hacer el abono en el siguiente IBAN del ${formPago}: ${ibanPagoProp}.\n`;
    
        } else if (formPago === 'contactarAdministrador') {
            const telefono = document.getElementById('telefonoPago').value;
            const email = document.getElementById('correoPago').value;
            mensajeProp += `\nPara realizar el abono de puede ponerse en contacto con el administrador en el teléfono ${telefono}`;
            if (email != '') {
                mensajeProp += ` o en el correo ${email}`;
            }
    
        } else if (formPago === 'empresaSuministro') {
            const empresaNombre = document.getElementById('empresaNombre').value;
            const empresaTelefono = document.getElementById('empresaTelefono').value;
            mensajeProp += `\nPara realizar el abono de puede ponerse en contacto con ${empresaNombre} en el teléfono ${empresaTelefono}.`;
            
        }
        
        // cambio de titularidad
        if (cambioTitularidad === 'si') {
            if (quienRealizaCambio === 'inquilino') {

                mensajeProp += `\nRecordamos la importancia de realizar el cambio de titularidad de los suministros ya que su ultimo inquilino ya no le pertenecen estos importes, el inquilino se encargara de realizar dicho cambio de titularidad o cambio de domiciliacion bancaria del suministro para mayor comodidad para usted.\n\nRogamos nos remita el comprobante del abono.\n\nUn saludo.`;

            } else {
    
                const contactarConProp = document.getElementById('contactarCon').value;
                const telefonoCambioProp = document.getElementById('telefonoCambio').value;
                const correoCambioProp = document.getElementById('correoCambio').value;
    
                if (contactarConProp === 'administrador') {
                
                    mensajeProp += `\nRecordamos la importancia de realizar el cambio de titularidad de los suministros ya que su ultimo inquilino ya no le pertenecen estos importes.\nPuede realizar el cambio contactando con con el administrador en el teléfono ${telefonoCambioProp}`;    
                    
                    if (correoCambioProp != '') {
                        mensajeProp += ` o en el correo ${correoCambioProp}`;
                    }

                    mensajeProp += `\n\nRogamos nos remita el comprobante del abono y la confirmación del cambio de titularidad\n\nUn saludo.`;

                } else {
                    
                    mensajeProp += `\nRecordamos la importancia de realizar el cambio de titularidad de los suministros ya que su ultimo inquilino ya no le pertenecen estos importes\nPuede realizar el cambio contactando con la empresa del suministro en el teléfono ${telefonoCambioProp}`;    
                    
                    if (correoCambioProp != '') {
                        mensajeProp += ` o en el correo ${correoCambioProp}`;
                    }
                    mensajeProp += `\n\nRogamos nos remita el comprobante del abono y la confirmacion del cambio de titularidad\n\nUn saludo.`;
                }
    

    
                
            }
        }   else {
            mensajeProp += `\nRogamos nos remita el comprobante del abono\n\nUn saludo.`;
        }


    }

    // Mostrar los mensajes en los textareas
    document.getElementById('mensajeInq').value = mensajeInq;
    document.getElementById('mensajeProp').value = mensajeProp;
}

// funcion de calculo del importe y los dias proporcionales
function calcular() {

    //variables
    const opcionInquilino = document.querySelector('input[name="inqAhora"]:checked').value;
    const importe = parseFloat(document.getElementById('importe').value);
    const fechaInicio = new Date(document.getElementById('inicioFac').value);
    const fechaFin = new Date(document.getElementById('finFac').value);
    const fechaEntradaInq = new Date(document.getElementById('entradaInq').value);
    let importeProporcionalInq = 0;
    let importeProporcionalProp = 0;
    const fechaSalidaInqAnt = document.getElementById('salidaInqAnt').value ? new Date(document.getElementById('salidaInqAnt').value) : null;
    let diasInquilinoAnterior = 0;
    let importeProporcionalInqAnt= 0;
    const spanInquilinoAnterior = document.getElementById('importeProporcionalInqAnt');
    const diasTotales = ((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si
    let diasInquilinoActual = 0;
    let diasPropietario = 0;

    if (fechaSalidaInqAnt) {
        console.log('opcionInquilino');
        diasInquilinoAnterior = ((fechaSalidaInqAnt - fechaInicio) / (1000 * 60 * 60 * 24))+1;//le sumo uno porque no cuenta el ultimo dia pero en las facturas si
        diasPropietario = ((fechaEntradaInq - fechaSalidaInqAnt) / (1000 * 60 * 60 * 24))-1;//le resto uno para ajustar a lo que la factura realmente refleja
        diasInquilinoActual = ((fechaFin - fechaEntradaInq) / (1000 * 60 * 60 * 24))+1;//le sumo uno porque no cuenta el ultimo dia pero en las facturas si
        importeProporcionalInqAnt = (importe * diasInquilinoAnterior) / diasTotales;
        document.getElementById('diasProporcionalInqAnt').innerText = diasInquilinoAnterior.toFixed(0);

    } else {

        diasPropietario = (fechaEntradaInq - fechaInicio) / (1000 * 60 * 60 * 24);
        diasInquilinoActual = ((fechaFin - fechaEntradaInq) / (1000 * 60 * 60 * 24))+1;//le sumo uno porque no cuenta el ultimo dia pero en las facturas si
    }
    importeProporcionalInq = (importe * diasInquilinoActual) / diasTotales;
    importeProporcionalProp = (importe * diasPropietario) / diasTotales;

    if (fechaSalidaInqAnt) {
        diasInquilinoAnterior = (fechaSalidaInqAnt - fechaInicio) / (1000 * 60 * 60 * 24);
	    importeProporcionalInqAnt= importe-importeProporcionalInq-importeProporcionalProp;

    }
    if (importeProporcionalInqAnt > 0) {
        spanInquilinoAnterior.innerText = importeProporcionalInqAnt.toFixed(2);
        spanInquilinoAnterior.parentElement.style.display = 'block';
    } else {
        spanInquilinoAnterior.parentElement.style.display = 'none';
    }

    document.getElementById('importeProporcionalInq').innerText = importeProporcionalInq.toFixed(2);
    document.getElementById('importeProporcionalProp').innerText = importeProporcionalProp.toFixed(2);
    document.getElementById('diasProporcionalProp').innerText = diasPropietario.toFixed(0);
    document.getElementById('diasProporcionalInq').innerText = diasInquilinoActual.toFixed(0);

    generarMensaje(importeProporcionalInq, importeProporcionalProp, importe, diasProporcionalInq, diasProporcionalProp);
    ajustarTamañoTextarea('mensajeInq');
    ajustarTamañoTextarea('mensajeProp');

}

// Función para ajustar el tamaño del textarea al contenido
function ajustarTamañoTextarea(id) {
    const textarea = document.getElementById(id);
    textarea.style.height = 'auto';  // Resetea la altura antes de ajustar
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta la altura al contenido
}

// Funcion para determinar si hay inquilino actual o no si la factura la envia el inquilino anterior, ocultando los campos relativos al inquilino actual.
function existeInquilinoActual() {
    const opcionInquilino = document.querySelector('input[name="inqAhora"]:checked').value;
    const fecha = document.getElementById('entradaInq-container');
    const diasInq = document.getElementById('diasInqOcultar');
    const importeInq = document.getElementById('importeInqOcultar');

    if (opcionInquilino === 'si') {
        fecha.style.display = 'block';
        diasInq.style.display = 'block';
        importeInq.style.display = 'block';
    } else {
        fecha.style.display = 'none';
        diasInq.style.display = 'none';
        importeInq.style.display = 'none';
    }
}