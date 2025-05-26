import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'
import { getAuth } from "firebase/auth";
export function Card({keyNum, title, excerpt, loadNotes}) {
    const auth = getAuth();

    const deleteCard = () => {
        if(!auth.currentUser) return;
        
        console.log(keyNum)

       deleteDoc(doc(db, 'notes', auth.currentUser.uid, 'entries', keyNum))
       loadNotes(auth.currentUser.uid)
    }

    return (
            <div className="m-1 block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 justify-between relative">
                <button 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteCard();
                    }}
                > 
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                    </svg>
                </button>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900"> {title} </h5>
                <p className="font-normal text-gray-700"> {excerpt} </p>
            </div>
    )
}

