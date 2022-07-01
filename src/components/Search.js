import React from "react"

function Search(){
    return (
        <div className="px-5">
            <div className="flex">
                <button className="shrink w-[25rem] h-[4rem] border-4 border-gray-300">POST A JOB</button>
                <button className="shrink w-[25rem] h-[4rem] border-4 border-gray-300">FIND A BUILDER</button>
            </div>
            <div className="h-[15rem] bg-blue-400 mt-2 px-[30rem] py-[2rem]">
                <div className="flex justify-between">
                    <h1>Need a builder? Tell us about your job</h1>
                    <h3>Step 1 of 3</h3>
                </div>
                <div className="flex">
                    <input type="text" className="mr-2 rounded"/>
                    <input type="text" className="mr-2 rounded"/>
                    <button>NEXT STEP</button>
                </div>
            </div>
        </div>
    )
}

export default Search;