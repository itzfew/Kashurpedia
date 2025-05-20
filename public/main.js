
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKvGPZZvjnAaEpRPOTSY0rLLaLG74rdA8",
  authDomain: "kashurpedia.firebaseapp.com",
  databaseURL: "https://kashurpedia-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kashurpedia",
  storageBucket: "kashurpedia.firebasestorage.app",
  messagingSenderId: "27142359347",
  appId: "1:27142359347:web:67ed5904cca6f570db1646",
  measurementId: "G-HGL5ZSK9MQ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById('search').addEventListener('input', searchArticles);

function showCreateForm() {
  document.getElementById('createForm').style.display = 'block';
}

function saveArticle() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  if (title && content) {
    set(ref(db, 'articles/' + title), {
      title,
      content
    }).then(() => {
      alert('Article saved!');
      location.reload();
    });
  }
}

function searchArticles() {
  const term = document.getElementById('search').value.toLowerCase();
  const results = document.getElementById('results');
  results.innerHTML = '';
  get(child(ref(db), 'articles')).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      Object.values(data).forEach(article => {
        if (article.title.toLowerCase().includes(term)) {
          const div = document.createElement('div');
          div.innerHTML = `<h3>${article.title}</h3><p>${article.content}</p>`;
          results.appendChild(div);
        }
      });
    }
  });
}
