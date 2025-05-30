import { admin } from '@functions-cloud/firebase.admin';
import axios from 'axios';

import type {GithubUser} from '@models/github.model'

const db = admin.firestore();
const LIKES_COLLECTION = 'github_likes';

// 1. Search users
export async function searchGithubUsers(q: string, page = 1, per_page = 30): Promise<GithubUser[]> {
  const res = await axios.get('https://api.github.com/search/users', {
    params: { q, page, per_page },
  });
  return res.data.items.map((u: any) => ({
    login: u.login,
    id: u.id,
    avatar_url: u.avatar_url,
    html_url: u.html_url,
  }));
}

// 2. Find profile by ID
export async function findGithubUserProfile(id: number): Promise<GithubUser> {
  const res = await axios.get(`https://api.github.com/user/${id}`);
  const u = res.data;
  return {
    login: u.login,
    id: u.id,
    avatar_url: u.avatar_url,
    html_url: u.html_url,
    public_repos: u.public_repos,
    followers: u.followers,
  };
}

// 3. Like a user
export async function likeGithubUser(phone: string, github_user_id: number): Promise<void> {
  const docRef = db.collection(LIKES_COLLECTION).doc(phone);
  await docRef.set(
    { githubUserIds: admin.firestore.FieldValue.arrayUnion(github_user_id) },
    { merge: true }
  );
}

// 4. Get favorites
export async function getUserProfile(phone: string): Promise<GithubUser[]> {
  const doc = await db.collection(LIKES_COLLECTION).doc(phone).get();
  if (!doc.exists) return [];
  const ids: number[] = doc.data()?.githubUserIds || [];
  // fetch all profiles in parallel
  const profiles = await Promise.all(ids.map((id) => findGithubUserProfile(id)));
  return profiles;
}
