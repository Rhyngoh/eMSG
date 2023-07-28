import React from 'react'

/***
* @param {String} type - type of button
* @param {String} classExtend - any classes that you want to add to extend the existing ones (for colors and adding spacing)
* @param {String} classOverwrite - classes that are to overwrite existing classes (reserve for margin, padding, and the like)
* @param {function} onClick - click event
* @param {any} children - anything between the tags
*/


function Button({type, classExtend, classOverwrite, onClick, children}) {

    const overwriteClasses = classOverwrite?.split(' ').map(c => `!${c}`).join(' ')

    return (
        <button 
        type={type} 
        onClick={onClick}
        className={`m-0 bg-gray-500 hover:bg-gray-700 transition w-fit py-2 px-10 rounded ring-1 ring-gray-300 ${classExtend} ${overwriteClasses}`}>
            {children}
        </button>
    )
}

export default Button