import React, { useEffect, useState } from 'react';

import { collection, addDoc, query, where, getDocs, documentId, updateDoc, serverTimestamp, doc } from "firebase/firestore"; 
import { db } from '../firebase'

import { getAuth } from "firebase/auth";

export default function Modal ({ isOpen, onClose, noteID }) {
    if (!isOpen) return null;
    
    const [noteKey, setNoteKey] = useState(-1)
    const [noteTitle, setNoteTitle] = useState("")
    const [noteNote, setNoteNote] = useState("")
    
    const [factCheck, setFactCheck] = useState("")
    const [citations, setCitations] = useState([])
    
    const API_KEY = "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"
    const options = {
        method: 'POST',
        headers: {Authorization: 'Bearer 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', 'Content-Type': 'application/json'},
        body: `{"model":"sonar","messages":[{"role":"system","content":"Be precise and concise. Fact check the content of the message."},{"role":"user","content":"${noteNote}"}]}`
    };

    const auth = getAuth();

    const getData = async () => {
        const url = 'https://api.perplexity.ai/chat/completions'

        console.log("Function running")
        try{
            const response = await fetch(url, options)
            if(!response.ok) {
                throw new Error(`Response Status: ${response.status}`)
            }

            const json = await response.json();
            console.log(json)

            setFactCheck(json.choices[0].message.content)
            setCitations(json.citations)
            console.log(factCheck)
        } catch (error) {
            console.error(error.message)
        }

    }

    useEffect(() => {

        if(!isOpen) return;

        // getData()
        console.log("Use effect is running")

        if(noteID == -1) return;

        // const q = query(collection(db, "notes", auth.currentUser.uid, "entries"), where("id", "==", noteID))

        const fetchNote = async () => {
            if(!auth.currentUser) return;
            console.log(noteID)
            const q = query(
                collection(db, "notes", auth.currentUser.uid, "entries"),
                where(documentId(), '==', noteID)
            )

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setNoteTitle(doc.data().title)
                setNoteNote(doc.data().note)
            })
        };

        fetchNote();
    }, [noteID])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const user = getAuth().currentUser;
        if (!user) {
            console.error("User not authenticated");
            return;
        } else {
            console.log(user)
        }

        if(noteID == -1){
            try {
                const noteCollectionRef = collection(db, "notes", user.uid, "entries");
                const docRef = await addDoc(noteCollectionRef, {
                    title: noteTitle,
                    note: noteNote
                });
    
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e)
            }
        } else {
            const noteCollectionRef = doc(db, 'notes', user.uid, 'entries', noteID)
            const update = await updateDoc(noteCollectionRef, {
                title: noteTitle,
                note: noteNote
            })
        }

        onClose()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative space-y-6">
                {/* Close Button */}
                <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl focus:outline-none"
                onClick={onClose}
                >
                &times;
                </button>

                {/* Title Input */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    name="title"
                    defaultValue={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
                    placeholder="Enter title"
                />
                </div>

                {/* Note Textarea */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea
                    rows={4}
                    name="note"
                    defaultValue={noteNote}
                    onChange={(e) => setNoteNote(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
                    placeholder="Write your note here..."
                />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                <button
                    className="rounded-md bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 transition-shadow shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                    type="button"
                    onClick={handleSubmit}
                >
                    Save
                </button>
                <button
                    className="rounded-md bg-slate-600 hover:bg-slate-500 text-white text-sm px-4 py-2 transition-shadow shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
                    type="button"
                    onClick={getData}
                >
                    Fact Check
                </button>
                </div>

                {/* Fact Check Result */}
                {factCheck && (
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-800">
                    <p><strong>Fact Check:</strong> {factCheck}</p>
                </div>
                )}

                {/* Citations */}
                {citations.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Citations:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {citations.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                )}
            </div>
        </div>

    );
}