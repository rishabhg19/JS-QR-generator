/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import('inquirer').then((module) => {
    const inquirer = module.default;
    const qr = require('qr-image');
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter URL:',
          name: 'url',
        },
      ])
      .then((input) => {
        console.log(input.name);
        const qr_png = qr.imageSync(input.url, { type: 'png'});
        const fs = require('fs');
        fs.writeFileSync('qrcode.png', qr_png);
        fs.writeFile("URL.text", input.url, (err) => {
            if (err) throw err;
            console.log("URL written to .text file");
        })
        console.log('QR Code saved');
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  }).catch((error) => {
    console.error('Error occurred while importing inquirer:', error);
  });
  