import React from 'react'

function GroupsBar() {
    const openSidebar = () => {

    }
    return (
        <>
            <button className="absolute peer text-white text-4xl top-5 left-4 curosr-pointer">
                <span className='px-2 bg-gray-500 rounded-md' onClick={openSidebar}>Click Here</span>
            </button>
            <section className='z-20 fixed bg-gray-500 rounded top-0 bottom-0 lg:left-0 left-[-80%] peer-focus:left-0 peer:transition ease-out delay-150 duration-200 p-2 w-4/5 lg:w-1/5 overflow-y-auto'>
                <div className="text-gray-100 text-xl">
                    <div className="p-2.5 mt-1 flex intems-center">
                        <h1 className="font-bold text-gray-200">Temp Text</h1>
                    </div>

                    <hr className="my-2 text-gray-600" />
                </div>

                <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700"></div>
            </section>
        </>
    )
}

export default GroupsBar
