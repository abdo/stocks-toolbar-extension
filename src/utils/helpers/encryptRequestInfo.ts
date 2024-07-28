import CryptoJS from "crypto-js";
import { encryptKey } from "../../keys.ignore";

const encryptRequestInfo = (info: string) =>
  CryptoJS.AES.encrypt(info, encryptKey).toString();
export default encryptRequestInfo;
