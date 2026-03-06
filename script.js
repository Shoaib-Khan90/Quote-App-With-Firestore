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
  if (quoteinput.value.trim() === "") {
    alert("Plz add the item")
    return;
  }
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
"px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300";

deletebtn.className =
"px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300";

li.className =
"flex justify-between items-center mt-5 px-4 py-3 w-full rounded-xl text-lg uppercase bg-gray-100 text-green-700 shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-green-200 hover:to-green-300 transition-all duration-300";

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

  if (!newQuote) 
    return;

   const confirmEdit = prompt("Are you sure you want to edit this? (yes / no)");

  if (confirmEdit.toLowerCase() !== "yes") {
    alert("Edit cancelled!");
    return;
  }

  await updateDoc(doc(db, "quotes", id), {
    quote: newQuote,
  });

  getquote();
}

async function deleteQuote(id) {
  alert("Are you sure you want to delete this item")
  await deleteDoc(doc(db, "quotes", id)
);
  getquote();
}

setTimeout(()=>{
  getquote()
},1000)

