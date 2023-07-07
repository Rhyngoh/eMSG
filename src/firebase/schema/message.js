import { serverTimestamp } from "firebase/firestore";
const message = {
  id: 'messageId',      // This is the id of the message
  content: 'messageContents',
  createdOn: serverTimestamp(),
  group: 'groupId',
  user: 'userId',
  visibility: 0,        // Default to 0 = visible to all, 1 = visible to only you, 2 = hidden from all (deleted)
};

export default message;