import { serverTimestamp } from "firebase/firestore";

const rolesDocument = {
  name: 'rolesName',    // unique, key
  permissions: null,    // permissions object
  created_on: serverTimestamp(),
  modified_on: serverTimestamp(),
};

export default rolesDocument;