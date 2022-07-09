import React from "react"
import fabLogo from "../images/fabLogo.png"

function NavBar() {
    return (
        <nav className="bg-white" id="navbar">
            <div className="navbar-wrap flex flex-nowrap justify-between items-center px-5 h-[115px] border-b-4 border-[#d8d8d8]">
                <a href="/" className="inline-block mt-[10px] h-full max-h-[100px] max-w-[120px] md:max-w-[150px] lg:max-w-[158px] md:min-w-[150px] lg:min-w-[158px]">
                    <img src={fabLogo} alt="FIND-A-BUILDER.COM" title="FIND-A-BUILDER.COM a better building world" className="h-full w-full"/>
                </a>
                <div className="navbar-collapse">
                    <ul className="navbar-nav flex flex-nowrap flex-col md:flex-row justify-end h-full">
                        <li className="nav-item h-full dropdown home">
                            <a href="#" className="nav-link flex flex-nowrap flex-col justify-center h-full px-[25px]" aria-current="page">
                                <span className="home-img"></span>
                            </a>
                        </li>
                        <li className="nav-item h-full">
                            <a href="#" className="nav-link flex flex-nowrap flex-col justify-center h-full px-[25px]">
                                <span className="lg:text-sm">How it</span>
                                <span>WORKS</span>
                            </a>
                        </li>
                        <li className="nav-item h-full">
                            <a href="#" className="nav-link flex flex-nowrap flex-col justify-center h-full px-[25px]">
                                <span className="lg:text-sm">Join our</span>
                                <span>SPECIALISTS</span>
                            </a>
                        </li>
                        <li className="nav-item h-full">
                            <a href="#" className="nav-link flex flex-nowrap flex-col justify-center h-full px-[25px]">
                                <span className="lg:text-sm">Give</span>
                                <span>FEEDBACK</span>
                            </a>
                        </li>
                        <li className="nav-item h-full">
                            <a href="#" className="nav-buttons flex flex-nowrap flex-col-reverse justify-center h-full">
                                <button className="btn-new reg">REGISTER</button>
                                <button className="btn-new btn-primary sign lg:mb-2.5">SIGN IN</button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default NavBar;