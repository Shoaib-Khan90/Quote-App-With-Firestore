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

  try {
    await addDoc(quoteCollection, {
      quote: quoteinput.value,
      time: serverTimestamp(),
    });

    quoteinput.value = "";
    quotelist.innerHTML = "";   // clear list
    getquote();                 // reload list
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getquote() {
  const querySnapshot = await getDocs(quoteCollection);

  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().quote;
    li.className = "mt-3 text-xl text-gray-700";

    quotelist.appendChild(li);
  });
}

getquote();