import { Link } from "react-router-dom"

export const ErrorPage = () => {

    return (
        <>
        <div className="flex justify-center items-center flex-col">
            <h1 className="w-full text-center mb-10 mt-20 text-3xl font-extrabold italic">Oops ... Can not found-404. </h1>
            <Link to={"/"}><button className="border-2 w-40 rounded-full align-middle bg-red-500 text-white font-bold">Return Home Page</button></Link>
        </div>
        </>
    )
}