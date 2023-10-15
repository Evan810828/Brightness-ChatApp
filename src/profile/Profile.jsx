import My from "./my/My";
import Friends from "./friends/Friend";

export default function Profile(params) {
    return(
        <div className='w-full min-h-screen h-max px-36 py-20 flex flex-col items-center bg-[#006DF0]'>
            <div className="bg-white rounded-xl shadow-lg w-full px-16 mb-8">
                <My />
            </div>
            <div className="bg-white rounded-lg shadow-lg w-full px-16">
                <Friends />
            </div>
        </div>
    )
}