import { serverTimestamp } from "firebase/firestore";

const messagesDocument = {
  content: 'content',
  id: 'messagesID',
  created_on: serverTimestamp(),
  modified_on: serverTimestamp(),
  user_id: 'userID',
  room_id: 'roomsID',
  visibility: 0,  // 0 = fully visible, 1 = only visible to user, 2 = deleted (not visible)
  reactionCount: 0,   // aggregate of reactions
  replyCount: 0,      // aggregate of replies
};

export default messagesDocument;