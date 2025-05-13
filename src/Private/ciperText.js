import { createTransform } from "redux-persist";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.REACT_APP_cryptography_key;


const ciperText = createTransform(
  (inboundState) => {

    try {
      const stringifiedState = JSON.stringify(inboundState);
      return CryptoJS.AES.encrypt(stringifiedState, SECRET_KEY).toString();
    } catch (error) {
      console.error("Error encrypting state", error);
      return inboundState;
    }
  },
  (outboundState) => {
    try {
      const bytes = CryptoJS.AES.decrypt(outboundState, SECRET_KEY);
      const decryptedState = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedState);
    } catch (error) {
      console.error("Error decrypting state", error);
      return outboundState;
    }
  }
);

export default ciperText;
