import {
  firebaseConfig,
  initializeApp,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "./Firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const quotebtn = document.getElementById("quotebtn");
const quoteinput = document.getElementById("quoteinput");
const quotelist = document.getElementById("quotelist");

const quoteCollection = collection(db, "quotes");

quotebtn.addEventListener("click", addquote);

async function addquote() {
  if (quoteinput.value.trim() === "") return;

  await addDoc(quoteCollection, {
    quote: quoteinput.value,
    time: serverTimestamp(),
  });

  quoteinput.value = "";
  quotelist.innerHTML = "";
  getquote();
}

async function getquote() {
  const querySnapshot = await getDocs(quoteCollection);

  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().quote;

    quotelist.appendChild(li);
  });
}

getquote();