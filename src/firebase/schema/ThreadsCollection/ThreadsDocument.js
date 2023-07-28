// Threads Documents are 1-1 with Users
// Thread Documents are 1-many per user

const threadsDocument = {
  user_id: 'userID',
  thread_id: 'threadID',
  threads: [],
};

export default threadsDocument;