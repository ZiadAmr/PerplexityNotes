import { useNavigate } from "react-router";

import { getAuth, signOut } from 'firebase/auth'

import { auth } from '~/firebase'
import Modal from "~/modal/modal";

export function Navbar() {

    const navigate = useNavigate();

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        
        signOut(auth).then(()=>{
            navigate('/')
        }).catch((error) => {
            console.log(error.message)
        })
    }

    // useEffect(() => {
    //     if(auth.currentUser == null) navigate('/');
    // }, [auth])

    return (
        <nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-white bg-opacity-90 sticky top-3 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
            <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800 ">
                <a href="/main" className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"> Notes</a>
                <div className='hidden lg:block'>
                    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                            <a onClick={handleLogout}> Log out </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}