import { serverTimestamp } from "firebase/firestore";
const VISIBILITY = Object.freeze({
  ALL:0,
  VISIBLE_TO_USER:1,
  HIDDEN:2
});

const message = {
  id: 'messageId',      // This is the id of the message
  content: 'messageContents',
  createdOn: serverTimestamp(),
  group: 'groupId',
  user: 'userId',
  visibility: VISIBILITY.ALL,        // Default to 0 = visible to all, 1 = visible to only you, 2 = hidden from all (deleted)
};

export default message;