// import axios from 'axios';
// import { toast } from "react-toastify";

// export async function sendWhatsAppMessage (phone, template){
//     try {
//         const response = await apiGateWay.post(
//             'https://graph.facebook.com/v21.0/550622934805417/messages',
//             {
//                 messaging_product: 'whatsapp',
//                 to: phone,
//                 type: 'template',
//                 template: {
//                     name: template,
//                     language: { code: 'en_US' }
//                 }
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer YOUR_ACCESS_TOKEN`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         if (response.status == 201) {
//             toast.success("Message Sent Successfully");
//             return response.data;
//           }
//     }  catch (error) {
//         console.log(error);
//         toast.error("Failed to Send Message");
//       }
// }

import apiGateWay from "../ApiGateWay/apiGateWay";
import toast from "react-hot-toast";

const ACCESS_TOKEN =
  "EAASdBgpIZCCsBO5LpXgqdJ13pg5r8DOr8q46DhZAZAmbWUGfBmijW4ZC6uJSq0b7wHMuGsE6QidyVJ2pnGHdboNrEyQADZAQjob0LOGspDzold3nwAgF1vZBAFqyFkC5r7UW892dFtKkrqZBw5A40Kbc0vSaMR0G1ggVMhasmaav4fgMTqv6EjqtxeMDaxpZBAV4PQZDZDy";
const PHONE_NUMBER_ID = "550622934805417";
const API_URL = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;

export async function sendWPMessage(Phone, message) {
  try {
    const response = await apiGateWay.post(
      API_URL,
      {
        messaging_product: "whatsapp",
        to: Phone,
        type: "template",
        template: {
          name: message,
          language: { code: "en_US" },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status == 201) {
      toast.success("Message Sent Successfully");
      return response.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Send Message");
  }
}

// import apiGateWay from "../ApiGateWay/apiGateWay";
// import toast from 'react-hot-toast';

// const ACCESS_TOKEN = 'EAASdBgpIZCCsBO5LpXgqdJ13pg5r8DOr8q46DhZAZAmbWUGfBmijW4ZC6uJSq0b7wHMuGsE6QidyVJ2pnGHdboNrEyQADZAQjob0LOGspDzold3nwAgF1vZBAFqyFkC5r7UW892dFtKkrqZBw5A40Kbc0vSaMR0G1ggVMhasmaav4fgMTqv6EjqtxeMDaxpZBAV4PQZDZDy';
// const PHONE_NUMBER_ID = '550622934805417';
// const API_URL = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;

// export async function sendWPMessage(Phone, message) {
//     try {
//         const response = await apiGateWay.post(
//             API_URL,
//             {
//                 messaging_product: "whatsapp",
//                 to: Phone,
//                 type: "text",
//                 text: { body: message }
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${ACCESS_TOKEN}`,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );

//         console.log("WhatsApp API Response:", response.data);
//         toast.success("Message Sent Successfully");
//         return response.data;
//     } catch (error) {
//         console.error("Error sending message:", error.response?.data || error.message);
//         toast.error("Failed to Send Message");
//     }
// }
