const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let app;

try {
  // Check if Firebase is already initialized
  app = admin.app();
} catch (error) {
  // Initialize Firebase with service account
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } else {
    console.warn('Firebase not configured - using mock authentication');
    // Create a mock admin object for development
    app = {
      auth: () => ({
        createUser: async (userRecord) => {
          console.log('Mock: Creating user', userRecord);
          return { uid: 'mock-uid-' + Date.now(), ...userRecord };
        },
        verifyIdToken: async (idToken) => {
          console.log('Mock: Verifying token', idToken);
          return { uid: 'mock-uid-12345', email: 'user@example.com' };
        },
        getUserByEmail: async (email) => {
          console.log('Mock: Getting user by email', email);
          return { uid: 'mock-uid-12345', email };
        }
      }),
      firestore: () => ({
        collection: (name) => ({
          doc: (id) => ({
            set: async (data) => {
              console.log(`Mock: Setting document ${name}/${id}`, data);
              return { id };
            },
            get: async () => {
              console.log(`Mock: Getting document ${name}/${id}`);
              return {
                exists: true,
                id,
                data: () => ({ id, createdAt: new Date() })
              };
            },
            update: async (data) => {
              console.log(`Mock: Updating document ${name}/${id}`, data);
              return { id };
            },
            delete: async () => {
              console.log(`Mock: Deleting document ${name}/${id}`);
              return true;
            }
          }),
          add: async (data) => {
            const id = 'mock-doc-' + Date.now();
            console.log(`Mock: Adding document to ${name}`, data);
            return { id };
          },
          where: () => ({
            get: async () => {
              console.log(`Mock: Querying collection ${name}`);
              return {
                empty: false,
                docs: [
                  {
                    id: 'mock-doc-1',
                    data: () => ({ id: 'mock-doc-1', createdAt: new Date() })
                  }
                ]
              };
            }
          })
        })
      })
    };
  }
}

// Export Firebase services
const auth = app.auth ? app.auth() : app.auth();
const firestore = app.firestore ? app.firestore() : app.firestore();

module.exports = {
  admin,
  auth,
  firestore,
  app
};
