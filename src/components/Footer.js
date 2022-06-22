import React from "react"

const HomeAdvantage = () => (
    <div 
    className='h-[20rem] flex flex-row p-9'
    >
        <div className="basis-1/4">
            <h3>
                ABOUT FIND A BUILDER
            </h3>
            <p>
            Find a Builder offers professional plumbers, builders, electricians, carpenters and every other type of building specialist to the home improver and small developer.
            </p>
        </div>

        <div className="basis-1/4">
            <h3>
                PAGES
            </h3>
            <ul>
                <li><a>Home</a></li>
                <li><a>About Us</a></li>
                <li><a>Terms & Conditions</a></li>
                <li><a>Privacy Policy</a></li>
                <li><a>Code Of Practice</a></li>
            </ul>
        </div>

        <div className="basis-1/4">
            <h3>
                TYPES OF SPECIALISTS
            </h3>
            <ul>
                <li><a>Plumbers </a></li>
                <li><a>Builder </a></li>
                <li><a>Carpenter </a></li>
                <li><a>Cleaner </a></li>
                <li><a>Mason </a></li>
                <li><a>Window Cleaner</a></li> 
            </ul>
        </div>

        <div className="basis-1/4 flex flex-col">
            <h3>
                WHICH WOULD YOU LIKE?
            </h3>
            <button className="bg-sky-900 text-white rounded w-40 h-12">SIGN IN</button>
            <button className="bg-sky-300 text-white rounded w-40 h-12 mt-3">REGISTER</button>
        </div>
        
    </div>
)

export default HomeAdvantage;