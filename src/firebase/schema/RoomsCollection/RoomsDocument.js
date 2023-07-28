import { serverTimestamp } from "firebase/firestore";

const roomsDocument = {
  id: 'roomsID',
  name: 'roomsName',
  created_on: serverTimestamp(),
  private: false,
  room_picture: 'roomPicture',
};

export default roomsDocument;