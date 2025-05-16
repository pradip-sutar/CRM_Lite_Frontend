import { createTransform } from "redux-persist";
import CryptoJS from "crypto-js";

const secretKey = "your-secret-key";

const ciperText = createTransform(
  (inboundState, key) => {
    try {
      const stringified = JSON.stringify(inboundState);
      return CryptoJS.AES.encrypt(stringified, secretKey).toString();
    } catch (e) {
      console.error("Encryption failed:", e);
      return inboundState;
    }
  },

  (outboundState, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(outboundState, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (e) {
      console.error("Decryption failed:", e);
      return {};
    }
  }
);

export default ciperText;
