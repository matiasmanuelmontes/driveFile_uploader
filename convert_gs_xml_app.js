const { google } = require('googleapis');
const path = require('path')
const fs = require('fs')

// se deben instalar las dependencia de xml-writer, axios y googleapis

let XMLWriter = require('xml-writer');
const axios = require('axios'); 

// la URL desde donde se tiene el google sheet esta en: https://docs.google.com/spreadsheets/d/1ulO9OXnwR19GUzj5di1yhtCe8zNiCYz7easxhcI5OtA/edit#gid=0

async function uploadFileFinal() {

  // obtengo los datos de google sheets
 
        let excelData1 = await axios.get(`https://sheet.best/api/sheets/1aa3366a-849c-4e02-a050-54679b2b5176`)
        let excelData = excelData1.data

        let keys = Object.keys(excelData[0])
        let values = Object.values(excelData)


        // trabajo para pasar los datos de Google sheets pasarlos a xml

    var xml = new XMLWriter();

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

    // me conecto con drive y le envio el contenido del xml

const CLIENT_ID = '622724313164-p5m9cbkkk3lips1pdte2jtacjdgpeqtv.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04sVB8wqU11ELCgYIARAAGAQSNwF-L9IrXDw232rPYUaQI1g8QiFFHJyezeBS4oZ-mvWoak7JFAXtpM4F2aWRM9wy6G9LyivgMwU';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI 
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

//const filePath = path.join(__dirname, 'asado.jpg')

async function uploadFile() {
  try {

    //console.log(xml)
    
    const response = await drive.files.create({
        requestBody: {
            name:'gsToXmlFile.xml',
            mimeType:'application/xml'
        },
        media:{
            mimeType: 'application/xml',
            body:  xml.output
        }
    })

    console.log(response.data)

  } catch (error) {
    console.log(error.message)
  }  
    
}

uploadFile();

}

uploadFileFinal();