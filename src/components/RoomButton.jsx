import React from 'react'
import { useAuthContext } from '@/context/AuthContext';

function RoomButton({name, roomId}) {
    const {currentRoom, setCurrentRoom } = useAuthContext();

    const handleClick = (e) =>{
        console.log('Clicked room: ', e.target.id)
        setCurrentRoom(e.target.id)
    }

    return (
        <li onClick={handleClick} id={roomId} className={`${roomId === currentRoom && '!bg-slate-500'} bg-slate-300 p-2  hover:bg-slate-400 transition-colors shadow-md rounded block w-full space-x-3`}>
            <img src={'https://picsum.photos/300'} width={300} height={300} className="ring-1 w-10 inline rounded-full object-center"/>
            <span>{name}</span>
        </li>
    )
}

export default RoomButton
