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
    quote: quoteinput.value = "",
    time: serverTimestamp(),
  });

  quoteinput.value = "";
  quotelist.innerHTML = "";
  getquote();
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
    const deletebtn = document.createElement("button")
    const editbtn = document.createElement("button")
    editbtn.textContent = "Edit"
    deletebtn.textContent = "Delete"
     editbtn.className =
      "border-none w-30 rounded-2xl text-xl ml-40  p-2 ml-5 bg-pink-200 text-yellow-600";
        deletebtn.className =
      "border-none w-30 rounded-2xl text-xl p-2 ml-5 bg-pink-200 text-yellow-600";
      li.className = 
       " mt-10 ml-35 items-center border-none w-130 h-15 rounded-2xl text-2xl p-2 bg-gray-200 text-green-600  mb-4 hover:scale-105 transition duration-300";
      
    li.appendChild(editbtn)
    li.appendChild(deletebtn)
    li.className = "mt-3 text-xl text-gray-700";
    quotelist.appendChild(li);
  });
}

getquote();