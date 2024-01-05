// inorder to generate qr code first we should have to install qrcode using npm i qrcode
// step one write a data to be hidden in the qrcode
import QRCode from "qrcode"
import express from "express"
import { qrmodel } from "../db/index"
import { json } from "body-parser"
export const  qrcode =async (req:express.Request , res:express.Response) => {
  try {
    const { name, age, department } = req.body;
    const data = {
      names: name,
      ages: age,
      departments: department,
    };
    // this helps to change into json string
    //Converting data into a JSON string before encoding
    // it into a QR code ensures that the data can be easily read
    // by the scanner and processed by the application that receives it
    const StringData = JSON.stringify(data);
                    // METHOD ONE
    // this helps to encode the data
    // const qrcode = QRCode.toString(StringData, { type: "terminal" }, function (err, url) {
    //   if (err) return console.log("error occurred");
    //   console.log(url);
    // });
    // QRCode.toString(StringData, { type: "terminal" }, function (err, url) {
    //   if (err) {
    //     console.log("error occurred");
    //   } else {
    //     console.log(url);
    //     return res.status(200).json(url)
    //   }
    // });

    // Print the QR code to terminal
    QRCode.toString(StringData, { type: "terminal" }, function (err, qrcode) {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        console.log(qrcode);
        return res.status(200).json(qrcode);
      }
    });

                // METHOD TWO
    // Converting the data into base64
    QRCode.toDataURL(StringData, function (err, qrcode) {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        console.log(qrcode);
        return res.status(200).json(qrcode);
      }
    });
    
  } catch (error) {
    console.log(error);
  }
  
}
