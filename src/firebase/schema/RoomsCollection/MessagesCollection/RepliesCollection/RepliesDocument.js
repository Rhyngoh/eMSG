import { serverTimestamp } from "firebase/firestore";

// Similar to MessagesDocument but without replies field

const repliesDocument = {
  content: 'content',
  id: 'repliesID',      // Key used in ThreadsCollection
  created_on: serverTimestamp(),
  modified_on: serverTimestamp(),
  user_id: 'userID',
  room_id: 'roomsID',
  visibility: 0,  // 0 = fully visible, 1 = only visible to user, 2 = deleted (not visible)
  reactionCount: 0,   // aggregate of reactions
};

export default repliesDocument;