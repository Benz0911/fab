import React from "react"
import fabLogo from "../images/fabLogo.png"

function NavBar() {
    return (
        <nav className="bg-white sm:px-4 py-2.5 rounded dark:bg-gray-800 border-b-[7px] border-b-zinc-300">
            <div className="flex flex-wrap justify-between items-center">
                <a href="https://flowbite.com/" className="flex items-center">
                    <img src={fabLogo} className="mr-3 h-[7.5rem]" alt="Flowbite Logo" />
                </a>
                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-[6rem] md:mt-0 md:text-sm md:font-medium md:text-2xl">
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
                    </li>
                    <li className="align-middle">
                        <a href="#" className="flex flex-col block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                            <span>How it</span>
                            <span>WORKS</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex flex-col block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                            <span>Join our</span>
                            <span>SPECIALISTS</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex flex-col block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                            <span>Give</span>
                            <span>FEEDBACK</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex flex-col block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                <button className="bg-sky-900 text-white rounded w-40 h-12">SIGN IN</button>
                                <button className="bg-sky-300 text-white rounded w-40 h-12 mt-3">REGISTER</button>
                        </a>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default NavBar;