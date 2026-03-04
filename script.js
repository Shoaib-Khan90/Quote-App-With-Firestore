import {
  firebaseConfig,
  initializeApp,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc
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
    getquote(); 
  } catch (error) {
    console.error("Error:", error);
  }
}


async function getquote() {
  quotelist.innerHTML = "";

  const querySnapshot = await getDocs(quoteCollection);

  querySnapshot.forEach((docSnap) => {
    const li = document.createElement("li");
    li.textContent = docSnap.data().quote;

    const editbtn = document.createElement("button");
    const deletebtn = document.createElement("button");

    editbtn.textContent = "Edit";
    deletebtn.textContent = "Delete";

     editbtn.className =
      "border-none w-30 rounded-2xl text-xl ml-40  p-2 ml-5 bg-pink-200 text-yellow-600";
        deletebtn.className =
      "border-none w-30 rounded-2xl text-xl p-2 ml-5 bg-pink-200 text-yellow-600";
      li.className = 
       " mt-10 uppercase items-center border-none w-full h-15 rounded-2xl text-2xl p-2 bg-gray-200 text-green-600  mb-4 hover:scale-105 transition duration-300";

    editbtn.addEventListener("click", () => {
      editQuote(docSnap.id, docSnap.data().quote);
    });

    deletebtn.addEventListener("click", () => {
      deleteQuote(docSnap.id);
    });

    li.appendChild(editbtn);
    li.appendChild(deletebtn);
    quotelist.appendChild(li);
  });
}

getquote();


async function editQuote(id, oldQuote) {
  const newQuote = prompt("Enter new quote", oldQuote);

  if (!newQuote) return;

  await updateDoc(doc(db, "quotes", id), {
    quote: newQuote,
  });

  getquote();
}

async function deleteQuote(id) {
  await deleteDoc(doc(db, "quotes", id)
);
  getquote();
}

setTimeout(()=>{
  getquote()
},1000)