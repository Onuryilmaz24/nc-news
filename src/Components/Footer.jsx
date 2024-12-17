

export const Footer = () => {



    return (
        <>
        <div className="border-2 h-[50px] m-8 border-black flex items-center justify-between fixed bottom-0 left-0 right-0">
            <div className="w-32 flex items-center justify-center ml-5">
                <p className="font-thin italic underline ">NC-NEWS</p>
            </div>
            <div className="flex gap-4 items-center justify-center">
                <div className="flex items-center justify-center">
                    <p className="font-thin  italic">Created by Onur Yilmaz</p>
                </div>
            </div>
                {/* UserPage LogIn / Sign Up */}
            <div className="flex gap-8 mr-8">
            <div className="flex items-center justify-center">
                    <p className="font-thin italic">All Rights Reserved</p>
                </div>
            </div>
        </div>
        </>
    )
}
