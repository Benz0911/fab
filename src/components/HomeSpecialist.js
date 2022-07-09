import React from "react"

const HomeSpecialist = () => (
    <section id="home_specialists">
        <div className="specialists-wrap">
            <div className="specialists-column">
                <div className="specialists-title">
                    <h2>We Provide Every Type Of Specialist For Your Projects</h2>
                    <div className="title_bottom_blue_line"></div>
                </div>
                <div className="specialists-description">
                    Find a Builder offers every type of
                    building specialist - from architect to
                    zinc roofer - so our clients can find
                    exactly the expertise they want.
                </div>
            </div>
            <div className="specialists-column">
                <div className="specialists-links">
                    <ul>
                        <li>
                            <a href="./directory/plumbing-heating-gas-engineer" title="Plumber">Plumbers</a></li>
                        <li>
                            <a href="./directory/general-builder" title="Builder">
                                Builder
                            </a>
                        </li>
                        <li>
                            <a href="./directory/carpenter-or-joiner" title="Carpenter">
                                Carpenter
                            </a>
                        </li>
                        <li>
                            <a href="./directory/commercial-and-residential-cleaning-cleaner" title="Cleaner">
                                Cleaner
                            </a>
                        </li>
                        <li>
                            <a href="./directory/stonework-mason" title="Mason">
                                Mason
                            </a>
                        </li>
                        <li>
                            <a href="./directory/window-cleaner" title="Window Cleaner">
                                Window Cleaner
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="specialists-buttons to-mobile-only">
                <a href="#" className="btn-new btn-primary">SHOW MORE</a>
            </div>
        </div>
    </section>
)

export default HomeSpecialist;