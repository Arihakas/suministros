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
// al añadir opciones, decidi cambiar esta funcion porque me parecio mas logico como esta ahora.
function actualizarOrigenFAC() {
    const origenFac = document.getElementById('origenFac').value;
    const existeInqAct = document.getElementById('existeInquilinoActual');

    if (origenFac === 'origenInqAnt' || origenFac === 'origenProp') {
        existeInqAct.style.display = 'block';
    } else {
        existeInqAct.style.display = 'none';
    }
}
/* No borre esta funcion original porque podria reutilizarla para algo mas tarde.
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

    if (origenFac === 'origenInq') {
        existeInqAct.style.display = 'none';
    } else {
        existeInqAct.style.display = 'block';
    }
}
*/

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

function generarMensaje(importeProporcionalInq,importeProporcionalProp,importeTotal,diasProporcionalInq,diasProporcionalProp, diasInquilinoAnterior, importeProporcionalInqAnt){
    
    //constantes
    const cambioTitularidad = document.getElementById('cambioTitularidad').value;
    const quienRealizaCambio = document.getElementById('quienRealizaCambio') ? document.getElementById('quienRealizaCambio').value : '';
    const origenFac = document.getElementById('origenFac').value;
    const fechaInicio = document.getElementById('inicioFac').value;
    const fechaFin = document.getElementById('finFac').value;
    const entradaInq = document.getElementById('entradaInq').value;
    const fechaSalidaInqAnt = document.getElementById('salidaInqAnt').value;
    const titular = document.getElementById('titularIban').value; 

    //variables
    let formPago = document.getElementById('formPago').value;
    let mensajeInq = '';
    let mensajeProp = '';

    //mensaje propietario
    // separo en varias lineas el mensaje para que me resulte mas comodo visualmente tratarlo.

    if (importeProporcionalProp>0) {

        if (origenFac=== 'origenInq') {

            mensajeProp = `Estimada propiedad\n\n`;
            mensajeProp += `Contactamos con usted para informar que su inquilino nos ha remitido una factura con ciclo de facturación del ${fechaInicio} al ${fechaFin},`;
            mensajeProp += ` con importe de ${importeTotal.toFixed(2)} €.\n`;
            mensajeProp += `Como el inquilino entro a la vivienda el ${entradaInq} le corresponden ${diasProporcionalProp.innerText} días, `;
            mensajeProp += `por lo que le corresponde el importe de ${importeProporcionalProp.toFixed(2)} €`;
            
        } else {
            mensajeProp = `Estimada propiedad\n\n`;
            mensajeProp += `Contactamos con usted para informar que su inquilino anterior nos ha remitido una factura con ciclo de facturación del ${fechaInicio} al ${fechaFin}, `;
            mensajeProp += `con importe de ${importeTotal.toFixed(2)} €.\n`;
            mensajeProp += `Como el inquilino abandono la vivienda el ${fechaSalidaInqAnt} y el actual entro el ${entradaInq} le corresponden ${diasProporcionalProp.innerText} días, `;
            mensajeProp += `por lo que le corresponde el importe de ${importeProporcionalProp.toFixed(2)} €.`;
        }
        // forma de pago
        if (formPago === 'inqAnterior' || formPago === 'administrador' || formPago === 'inqActual'){
            const ibanPagoProp = document.getElementById('iban').value;
            if (formPago === 'inqAnterior') {
                formPago = 'inquilino anterior';
            } else if (formPago === 'inqActual'){
                formPago = 'inquilino actual';
            }
            mensajeProp += `\nPuede hacer el abono en el siguiente IBAN del ${formPago}:\n ${ibanPagoProp}.\n ${titular}`;
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

    // Mensaje para el inquilino
    formPago = document.getElementById('formPago').value;
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
            mensajeInq += `Puede hacer el abono en el siguiente IBAN del ${formPago}:\n ${iban}.\n ${titular}\n`;
    
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

    // Mostrar los mensajes en los textareas
    document.getElementById('mensajeInq').value = mensajeInq;
    document.getElementById('mensajeProp').value = mensajeProp;
}

// funcion de calculo del importe y los dias proporcionales

function calcular() {
    //constantes
    const origen = document.getElementById('origenFac').value;
    const hayInq = document.querySelector('input[name="inqAhora"]:checked').value;
    const importe = parseFloat(document.getElementById('importe').value);
    const fechaInicio = new Date(document.getElementById('inicioFac').value);
    const fechaFin = new Date(document.getElementById('finFac').value);
    const fechaSalidaInqAnt = document.getElementById('salidaInqAnt').value ? new Date(document.getElementById('salidaInqAnt').value) : null;
    const diasTotales = ((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si
    const fechaEntradaInq = document.getElementById('entradaInq').value ? new Date(document.getElementById('entradaInq').value) : null;
    const spanInquilinoAnterior = document.getElementById('importeProporcionalInqAnt');

    //variables
    let importeProporcionalInq = 0;
    let importeProporcionalProp = 0;
    let importeProporcionalInqAnt= 0;
    let diasInquilinoAnterior = 0;
    let diasInquilinoActual = 0;
    let diasPropietario = 0;
 
    switch (origen){
        case 'origenInqAnt':

            //origen de la factura, inquilino anterior.
            if (hayInq=== 'si'){
                //caso en el que hay inquilino actual en la vivienda.
                diasInquilinoAnterior = ((fechaSalidaInqAnt - fechaInicio) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si
                diasInquilinoActual = ((fechaFin - fechaEntradaInq) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si

                if (diasInquilinoActual <= 0) {
                    diasInquilinoActual = 0;

                }
                //compruebo si al propietario le corresponde algun tramo de la factura y ajusto dias e importe del propietario

                if (diasTotales === diasInquilinoAnterior + diasInquilinoActual){
                    diasPropietario = 0;
                    importeProporcionalProp = 0;
                } else if(diasTotales > (diasInquilinoAnterior + diasInquilinoActual)){
                    diasPropietario = diasTotales-diasInquilinoActual-diasInquilinoAnterior;
                    importeProporcionalProp = (importe * diasPropietario) / diasTotales;
                }
                importeProporcionalInqAnt = (importe * diasInquilinoAnterior) / diasTotales;
                importeProporcionalInq = (importe * diasInquilinoActual) / diasTotales;

                if (importeProporcionalInqAnt > 0 ){
                    spanInquilinoAnterior.innerText = importeProporcionalInqAnt.toFixed(2);
                    spanInquilinoAnterior.parentElement.style.display = 'block';
                } else {
                    spanInquilinoAnterior.parentElement.style.display = 'none';

                }
                document.getElementById('diasProporcionalInqAnt').innerText = diasInquilinoAnterior.toFixed(0);
                document.getElementById('diasProporcionalProp').innerText = diasPropietario.toFixed(0);
                document.getElementById('diasProporcionalInq').innerText = diasInquilinoActual.toFixed(0);
                document.getElementById('importeProporcionalInq').innerText = importeProporcionalInq.toFixed(2);
                document.getElementById('importeProporcionalProp').innerText = importeProporcionalProp.toFixed(2); 


            } else {
                //caso en el que no hay inquilino actual

                diasInquilinoAnterior = ((fechaSalidaInqAnt - fechaInicio) / (1000 * 60 * 60 * 24))+1;//le sumo uno porque no cuenta el ultimo dia pero en las facturas si
                diasPropietario = diasTotales-diasInquilinoAnterior;
                importeProporcionalProp = (importe * diasPropietario) / diasTotales;
                importeProporcionalInqAnt = (importe * diasInquilinoAnterior) / diasTotales;

                if (importeProporcionalInqAnt > 0) {
                    spanInquilinoAnterior.innerText = importeProporcionalInqAnt.toFixed(2);
                    spanInquilinoAnterior.parentElement.style.display = 'block';
                } else {
                    spanInquilinoAnterior.parentElement.style.display = 'none';
                }
                importeProporcionalInq = 0;
                diasInquilinoActual = 0;
                
                document.getElementById('diasProporcionalInqAnt').innerText = diasInquilinoAnterior.toFixed(0);
                document.getElementById('diasProporcionalProp').innerText = diasPropietario.toFixed(0);
                document.getElementById('diasProporcionalInq').innerText = diasInquilinoActual.toFixed(0);
                document.getElementById('importeProporcionalInq').innerText = importeProporcionalInq.toFixed(2);
                document.getElementById('importeProporcionalProp').innerText = importeProporcionalProp.toFixed(2); 

            }

            break;
        
        case 'origenProp':
            //origen de la factura, propietario.
            if (hayInq === 'si') {
                //caso en el que hay inquilino actual en la vivienda.

                //compruebo que hay inquilino anterior.
                if (fechaSalidaInqAnt!==null){


                    diasInquilinoAnterior = ((fechaSalidaInqAnt - fechaInicio) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si
                    diasInquilinoActual = ((fechaFin - fechaEntradaInq) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si

                    //compruebo si al propietario le corresponde algun tramo de la factura y ajusto dias e importe del propietario
                    if (diasTotales === diasInquilinoAnterior + diasInquilinoActual) {

                        diasPropietario = 0;
                        importeProporcionalProp = 0;

                    } else if (diasTotales > (diasInquilinoAnterior + diasInquilinoActual)) {

                        diasPropietario = diasTotales-diasInquilinoActual-diasInquilinoAnterior;
                        importeProporcionalProp = (importe * diasPropietario) / diasTotales;

                    }

                    importeProporcionalInqAnt = (importe * diasInquilinoAnterior) / diasTotales;
                    importeProporcionalInq = (importe * diasInquilinoActual) / diasTotales;

                    if (importeProporcionalInqAnt > 0) {
                        spanInquilinoAnterior.innerText = importeProporcionalInqAnt.toFixed(2);
                        spanInquilinoAnterior.parentElement.style.display = 'block';
                    } else {
                        spanInquilinoAnterior.parentElement.style.display = 'none';
                    }

                    document.getElementById('diasProporcionalInqAnt').innerText = diasInquilinoAnterior.toFixed(0);
                    document.getElementById('diasProporcionalProp').innerText = diasPropietario.toFixed(0);
                    document.getElementById('diasProporcionalInq').innerText = diasInquilinoActual.toFixed(0);
                    document.getElementById('importeProporcionalInq').innerText = importeProporcionalInq.toFixed(2);
                    document.getElementById('importeProporcionalProp').innerText = importeProporcionalProp.toFixed(2);
                    
                } else {
                    
                    importeProporcionalInqAnt = 0;
                    diasInquilinoAnterior = 0;
                    document.getElementById('diasProporcionalInqAnt').innerText = diasInquilinoAnterior.toFixed(0);
                    spanInquilinoAnterior.innerText = importeProporcionalInqAnt.toFixed(2);
                    spanInquilinoAnterior.parentElement.style.display = 'none';
                    document.getElementById('diasProporcionalInqAnt').style.display = 'none';

                    diasInquilinoActual = ((fechaFin - fechaEntradaInq) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si
                    importeProporcionalInq = (importe * diasInquilinoActual) / diasTotales;
                    
                    if (diasTotales === diasInquilinoActual){

                        diasPropietario = 0;
                        importeProporcionalProp = 0;

                    } else {

                        diasPropietario = diasTotales-diasInquilinoActual;
                        importeProporcionalProp = (importe * diasPropietario) / diasTotales;

                    }

                    document.getElementById('diasProporcionalProp').innerText = diasPropietario.toFixed(0);
                    document.getElementById('diasProporcionalInq').innerText = diasInquilinoActual.toFixed(0);
                    document.getElementById('importeProporcionalInq').innerText = importeProporcionalInq.toFixed(2);
                    document.getElementById('importeProporcionalProp').innerText = importeProporcionalProp.toFixed(2);

                }

            }
       
            break;

        case 'origenInq':
            //origen de la factura, inquilino actual.
            
            //compruebo si algun tramo le corresponde al inquilino actual
            if (fechaFin < fechaEntradaInq) {
                
                diasInquilinoActual = 0;
                importeProporcionalInq = 0;
                //compruebo que hay inquilino anterior.
                if (fechaSalidaInqAnt!==null){

                    diasInquilinoAnterior = ((fechaSalidaInqAnt - fechaInicio) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si
                    importeProporcionalInqAnt = (importe * diasInquilinoAnterior) / diasTotales;
                   
                    //compruebo si al propietario le corresponde algun tramo de la factura y ajusto dias e importe del propietario
                    if (diasTotales === diasInquilinoAnterior) {

                        diasPropietario = 0;
                        importeProporcionalProp = 0;
    
                    } else if (diasTotales > diasInquilinoAnterior) {

                        diasPropietario = diasTotales-diasInquilinoAnterior;
                        importeProporcionalProp = (importe * diasPropietario) / diasTotales;
    
                    }
                
                } else {

                    diasInquilinoAnterior = 0;
                    importeProporcionalInqAnt = 0;

                    diasPropietario = diasTotales;
                    importeProporcionalProp = importe;

                }
            } else {

                diasInquilinoActual = ((fechaFin - fechaEntradaInq) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si
                importeProporcionalInq = (importe * diasInquilinoActual) / diasTotales;
                
                //compruebo que hay inquilino anterior.
                if (fechaSalidaInqAnt!==null){

                    diasInquilinoAnterior = ((fechaSalidaInqAnt - fechaInicio) / (1000 * 60 * 60 * 24))+1; //le sumo uno porque no cuenta el ultimo dia pero en las facturas si
                    importeProporcionalInqAnt = (importe * diasInquilinoAnterior) / diasTotales;

                    //compruebo si al propietario le corresponde algun tramo de la factura y ajusto dias e importe del propietario
                    if (diasTotales === (diasInquilinoAnterior+diasInquilinoActual)) {

                        diasPropietario = 0;
                        importeProporcionalProp = 0;
                        
                    } else if (diasTotales > (diasInquilinoAnterior+diasInquilinoActual)) {
                    
                        diasPropietario = diasTotales-diasInquilinoAnterior-diasInquilinoActual;
                        importeProporcionalProp = (importe * diasPropietario) / diasTotales;
                    }
                
                } else {

                    diasInquilinoAnterior = 0;
                    importeProporcionalInqAnt = 0;

                    //compruebo si al propietario le corresponde algun tramo de la factura y ajusto dias e importe del propietario
                    if (diasTotales === (diasInquilinoAnterior+diasInquilinoActual)) {

                        diasPropietario = 0;
                        importeProporcionalProp = 0;
                        
                    } else if (diasTotales > (diasInquilinoAnterior+diasInquilinoActual)) {
                    
                        diasPropietario = diasTotales-diasInquilinoAnterior-diasInquilinoActual;
                        importeProporcionalProp = (importe * diasPropietario) / diasTotales;
                    }

                }

            }
                document.getElementById('diasProporcionalProp').innerText = diasPropietario.toFixed(0);
                document.getElementById('diasProporcionalInq').innerText = diasInquilinoActual.toFixed(0);
                document.getElementById('importeProporcionalInq').innerText = importeProporcionalInq.toFixed(2);
                document.getElementById('importeProporcionalProp').innerText = importeProporcionalProp.toFixed(2);
                document.getElementById('diasProporcionalInqAnt').innerText = diasInquilinoAnterior.toFixed(0);
                document.getElementById('importeProporcionalInqAnt').innerText = importeProporcionalInqAnt.toFixed(2);
                       
            break;

    }

    generarMensaje(importeProporcionalInq, importeProporcionalProp, importe, diasProporcionalInq, diasProporcionalProp, diasInquilinoAnterior, importeProporcionalInqAnt);


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
    const origenFac = document.getElementById('origenFac').value;

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
