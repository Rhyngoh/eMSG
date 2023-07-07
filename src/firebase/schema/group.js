import { serverTimestamp } from "firebase/firestore";
const group = {
  id: 'groupId',      // This is the id of the group
  name: 'groupName',
  createdOn: serverTimestamp(),
  users: [],          // This is an array of user ids in this group
  private: true,
};

export default group;