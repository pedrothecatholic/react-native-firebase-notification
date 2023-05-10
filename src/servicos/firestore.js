import firestore from '@react-native-firebase/firestore';
import { collection, getDocs, query } from 'firebase/firestore';

export async function salvarPost(data) {
  try {
    const result = await firestore().collection('posts').add(data);
    return result.id;
  } catch (error) {
    console.log('Erro add post:', error);
    return 'erro';
  }
}

export async function salvarToken(data) {
  try {
    const tokens = await firestore()
      .collection('tokens')
      .where('userId', '===', data.userId)
      .get();
    if (tokens.docs.length > 0) {
      await firestore().collection(tokens).doc(tokens.docs[0].id).update(data);
    }
    const result = await firestore().collection('tokens').add(data);
    return result.id;
  } catch (error) {
    console.log('Erro ao adicionar token:', error);
    return 'erro';
  }
}

export async function pegarTokens() {
  try {
    const tokensRef = query(collection(db, 'tokens'));
    const querySnapshot = await getDocs(tokensRef);
    const tokens = [];
    querySnapshot.forEach((doc) => {
      tokens.push(doc.data().token);
    });

    return tokens;
  } catch (error) {
    console.log(error);
  }
}

export async function pegarPostsTempoReal(setposts) {
  firestore()
    .collection('posts')
    .onSnapshot((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setposts(posts);
    });
}

export async function atualizarPost(postID, data) {
  try {
    await firestore().collection('posts').doc(postID).update(data);
    return 'ok';
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

export async function deletarPost(postID) {
  try {
    await firestore().collection('posts').doc(postID).delete();
    return 'ok';
  } catch (error) {
    console.log(error);
    return 'error';
  }
}
