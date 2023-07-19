import React from 'react'

/***
* @param {String} type - type of button
* @param {String} classExtend - any classes that you want to add to extend the existing ones
* @param {function} onClick - click event
* @param {any} children - anything between the tags
*/


function Button({type, classExtend, onClick, children}) {
    return (
        <button 
        type={type} 
        onClick={onClick}
        className={`m-0 bg-gray-500 hover:bg-gray-700 transition w-fit py-2 px-10 rounded ring-1 ring-gray-300 ${classExtend}`}>
            {children}
        </button>
    )
}

export default Button