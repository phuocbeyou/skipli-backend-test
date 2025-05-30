import { db, admin } from '@functions-cloud/firebase.admin';

const COLLECTION_ACCESS = 'auth';

// 1. Save access code
export async function saveAccessCode(phoneNumber: string, accessCode: string): Promise<void> {
  const userRef = db.collection(COLLECTION_ACCESS).doc(phoneNumber);
  try {
    await userRef.set(
      {
        accessCode,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    throw new Error('Save access code failed');
  }
}

// 2. Get access code
export async function getAccessCode(phoneNumber: string): Promise<string | null> {
  const userRef = db.collection(COLLECTION_ACCESS).doc(phoneNumber);
  try {
    const doc = await userRef.get();
    if (!doc.exists) return null;
    return doc.data()?.accessCode ?? null;
  } catch (error) {
    throw new Error('Get access code failed');
  }
}

// 3. clean access code
export async function clearAccessCode(phoneNumber: string): Promise<void> {
  const userRef = db.collection(COLLECTION_ACCESS).doc(phoneNumber);
  try {
    await userRef.update({
      accessCode: '',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw new Error('Delete access code failed');
  }
}
