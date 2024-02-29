import * as admin from "firebase-admin";


export default async function initAdmin() {
 
  // console.log('Service Account String:', serviceAccountString);
  
  if (admin.apps.length > 0) {
    return admin.app();
  }

 // Initialize Firebase Admin with credentials from environment variables
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
  
  if (!serviceAccount) {
    throw new Error('FIREBASE_ADMIN_SECRET environment variable is missing');
  }

 
  return admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    projectId: serviceAccount.projectId,
   
  });
}