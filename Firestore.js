import { getFirestore, 
    setDoc, 
    addDoc, 
    collection, 
    serverTimestamp, 
    getDocs, 
    doc, 
    updateDoc, 
} 
from "./Firebase.js"
import {app} from "./script.js" 

const db = getFirestore(app); 
console.log("db=",db) 

let h1 = document.getElementById("h1") 
let quotebtn = document.getElementById("quotebtn") 
let quotelist = document.getElementById("quotelist")

quotebtn.addEventListener("click",addquote) 

let quoteinput = document.getElementById("quoteinput") 

const quoteCollection = collection(db, "quotes"); 

async function addquote() { 

    await addDoc(quoteCollection,{ 
    quote : quoteinput.value, time : serverTimestamp(), 
  }) 
} 

    async function getquote() { 
    const querySnapshot = await getDocs(quoteCollection); 

    querySnapshot.forEach((doc) => { 

        console.log("id=>",doc.id, " => ", doc.data().quote); 

        const li =document.createElement("li") 

        li.textContent = doc.data().quote + ""; 

        const editbtn = document.createElement("button") 

        editbtn.textContent = "Edit"; 

        editbtn.addEventListener("click" , function(){ 

            edit(doc.id,doc.data().quote) }) 

            const deletebtn = document.createElement("button") 

            deletebtn.textContent = "Delete" 

            li.appendChild(editbtn) 

            li.appendChild(deletebtn) 

            quotelist.appendChild(li) }) }; 

            getquote()