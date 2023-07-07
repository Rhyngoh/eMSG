import { serverTimestamp } from "firebase/firestore";
const message = {
  id: 'messageId',
  content: 'messageContents',
  createadOn: serverTimestamp(),
  group: 'groupId',
  user: 'userId',
};

export default message;