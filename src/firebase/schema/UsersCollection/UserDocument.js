import { serverTimestamp } from "firebase/firestore";

const userDocument = {
  display_name: 'displayName',
  room_ids: [],
  id: 'userDocumentID',
  username: 'username',
  email: 'email',
  created_on: serverTimestamp(),
  profile_pic: 'profilePic',
  modified_on: serverTimestamp(),
};

export default userDocument;