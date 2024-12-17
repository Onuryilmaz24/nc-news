import { Link } from "react-router-dom"

export const HeaderNav = () => {



    return (
        <>
        <div className="border-2 h-[50px] m-8 border-red-500 flex items-center justify-between bg-red-500">
            {/* Header */}
            <Link to={"/"} className="w-32 flex items-center justify-center ml-5 shadow-md hover:scale-105 ease-in duration-300">
                <p className="font-extrabold text-2xl text-white px-2">NC-NEWS</p>
            </Link>
                {/* Topics Articles */}
            <div className="flex gap-4 items-center justify-center">
                <div className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300">
                    <p className="font-extrabold text-2xl text-white">Topics</p>
                </div>
                <div className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300">
                    <p className="font-extrabold text-2xl text-white">Articles</p>
                </div>
            </div>
                {/* UserPage LogIn / Sign Up */}
            <div className="flex gap-8 mr-8">
            <div className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300">
                    <p className="font-extrabold text-2xl text-white">User Page</p>
                </div>
                <div className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300">
                    <p className="font-extrabold text-2xl text-white">LogIn / Sign Up</p>
                </div>
            </div>
        </div>
        </>
    )
}

