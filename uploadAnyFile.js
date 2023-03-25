// guide video https://www.youtube.com/watch?v=1y0-IfRW114

const { google } = require('googleapis');
const path = require('path')
const fs = require('fs')

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

const filePath = path.join(__dirname, 'asado.jpg')

async function uploadFile() {
  try {
    
    const response = await drive.files.create({
        requestBody: {
            name:'tastyasado.jpg',
            mimeType: 'image/jpg'
        },
        media:{
            mimeType: 'image/jpg',
            body:  fs.createReadStream(filePath)
        }
    })

    console.log(response.data)

  } catch (error) {
    console.log(error.message)
  }  
    
}

uploadFile();