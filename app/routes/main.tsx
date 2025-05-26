import { useNavigate } from 'react-router';
import { db } from '~/firebase'
import { Navbar } from '~/navbar/navbar';
import { Card } from '~/card/card';
import { useEffect, useState } from 'react';
import Modal from '~/modal/modal';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function loader() {
    return null;
}

export default function main() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(null)
    const [notes, setNotes] = useState([])
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState(search)

    const [open, setOpen] = useState(false)
    const [selectedNote, setSelectedNote] = useState(-1);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 300)

        return () => clearTimeout(timer);
    }, [search])

    useEffect(() => {

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if(!currentUser){
                navigate('/')
                return
            }

            setUser(currentUser);
            console.log("Search, ", search)
            await loadNotes(currentUser.uid);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [debouncedSearch])

    const loadNotes = async (uid) => {
        const querySnapshot = await getDocs(collection(db, "notes", uid, "entries"));
        var list = [];
        querySnapshot.forEach(doc => {
            list.push({
                key:doc.id,
                ...doc.data()
            })
        })

        if(search != ""){
            list = list.filter((value) => {
                return value.title.toLowerCase().includes(search.toLowerCase()) || value.note.toLowerCase().includes(search.toLowerCase())
            })
        }
        
        setNotes(list);
    }
    
    const onNoteClick = (key) => {
        setOpen(true)
        setSelectedNote(key)
    } 
    
    const handleCreateNew = async (e) => {
        setOpen(true)
        setSelectedNote(-1)
    }

    if (loading) return <div> Loading ... </div>;

    var cards = notes.map((item) => {
        return (
            <div key={item.key} onClick={()=>onNoteClick(item.key)} className='justify-center max-w-lg'>
                <Card keyNum={item.key} title={item.title} excerpt={item.note} loadNotes={loadNotes}/>
            </div>
        )
    });

    return (
        <div>
            <Navbar />
            <div className='flex justify-between items-center mx-10 mt-10 mb-4 px-10 w-full max-w-screen-lg mx-auto'>
                <button type='button' className='w-11 h-11 bg-slate-800 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-slate-700' onClick={handleCreateNew}>
                    <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M1.22229 5.00019H8.77785M5.00007 8.77797V1.22241' stroke='white' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round'></path>
                    </svg>
                </button>
                
                <form className='flex items-center gap-2'>
                    <input onChange={(e)=>setSearch(e.target.value)} type="text" className="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
                    <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  type="submit">
                        Search
                    </button>
                </form>
            </div>
            <div className='flex flex-wrap justify-center mt-10 mx-10'>

                <div className='flex flex-wrap justify-center mt-10 mx-10'>
                    {cards}
                </div>
            </div>

            <Modal isOpen={open} onClose={()=>{setOpen(false); loadNotes(user.uid)}} noteID={selectedNote} />
        </div>
    )
}