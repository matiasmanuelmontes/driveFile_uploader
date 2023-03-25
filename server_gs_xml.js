
// se deben instalar las dependencia de xml-writer y de axios

let XMLWriter = require('xml-writer');
const axios = require('axios'); 

require('http').createServer( async function(req, res) {

  // obtengo los datos de google sheets
 
        let excelData1 = await axios.get(`https://sheet.best/api/sheets/1aa3366a-849c-4e02-a050-54679b2b5176`)
        let excelData = excelData1.data

        let keys = Object.keys(excelData[0])
        let values = Object.values(excelData)


        // trabajo para pasar los datos de Google sheets pasarlos a xml

    let xml = new XMLWriter();

    xml.startDocument().startElement('personas');

     for (let i = 0 ; i < values.length; i++){ 

    xml.startElement('persona');

      for (let j = 0 ; j < keys.length; j++){  

   
     /* xml.writeElement('Nombre', excelData[i].Nombre);
    xml.writeElement('Edad', excelData[i].Edad);
    xml.writeElement('Puesto', excelData[i].Puesto);
    xml.writeElement('Mail', excelData[i].Mail); */  

     xml.writeElement( keys[j], values[i][keys[j]]  ) 

      }  

    xml.endElement();

     };

    xml.endElement();



  // ya se puede ver el xml en su seccion del output en consola y tambien en la url http://localhost:4900/

    console.log(xml.output)

   // res.writeHead(200,{'content-type': 'application/xml', 'Access-Control-Allow-Origin': '*'});

    res.end(xml.toString(), 'utf8');

}).listen(4900);

console.log(' el servidor se esta ejecutando');