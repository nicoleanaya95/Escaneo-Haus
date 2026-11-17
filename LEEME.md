# Escaneo HAUS (prototipo de prueba)

App web instalable (PWA) para escanear facturas/DTE/OC desde el celular. Datos de prueba, sin conexión a nada de HAUS.

## Qué hace
- Elegís **proyecto** (PCZ, PCNC, CEA, AHCS, AHSB, CIT) y **tipo de documento**.
- **Foto** del documento (varias páginas, modo blanco y negro). Si la foto trae el **QR del DTE**, lo lee solo (código de generación + fecha).
- **Escanear QR en vivo** con la cámara (solo si la app abre desde un enlace https).
- **Subir el .json del DTE**: carga proveedor, NIT, NRC, fecha, número y montos exactos.
- **OCR** (para facturas físicas): propone los datos y los marca en ámbar para revisar.
- IVA 13 %: si escribís el total calcula base e IVA (y al revés); avisa si no cuadra.
- **Alertas de doble cobro/pago**: mismo código de generación (bloquea salvo confirmación), mismo proveedor + mismo N.º, mismo proveedor + mismo monto.
- No se borra: se **anula** con motivo. Historial de quién registró/modificó.
- **Exportar .zip**: Excel con columnas para la hoja Facturas, un PDF por documento (nombre = ID), JSON del DTE y respaldo.

## Archivos
- `index.html`: toda la app (logos, tipografía y lector de QR van adentro). Funciona sola; el OCR necesita la carpeta `ocr/`.
- `ocr/`: lector de texto (Tesseract, español), el mismo de la app de finanzas.
- `manifest.webmanifest`, `sw.js`, `icon-*.png`: para instalarla en el celular.

## Para probarla en el teléfono
La cámara en vivo y el modo instalable piden **https**. Opciones: publicarla en GitHub Pages (igual que la app de finanzas) o abrirla desde un enlace https privado. Sin https igual funciona "Tomar foto", subir JSON y exportar.
Al subir cambios, subir `VERSION` en `sw.js`.

## Dónde viven los datos
Solo en el teléfono (almacenamiento del navegador). Exportá seguido. El código no trae datos reales; los "ejemplos" son inventados (Exportar > Cargar ejemplos).

## Supuestos a confirmar
- Estructura del JSON del DTE y del QR de consulta (admin.factura.gob.sv) tomadas de memoria: validar con un DTE real.
- Código **CIT** para Citalá es un supuesto.
- IDs provisionales (`PCZ-FAC-AAAAMMDD-A101`); el definitivo lo daría el registro central.
- Aún no sube a SharePoint ni al Excel central: se exporta y se pega/sube a mano.
