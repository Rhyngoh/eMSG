import { serverTimestamp } from "firebase/firestore";

// Threads Documents are 1-1 with Users
// Thread Documents are 1-many per user

const threadDocument = {
  message_id: 'messageID',
  room_id: 'roomID',
  modified_on: serverTimestamp(),
}

export default threadDocument;