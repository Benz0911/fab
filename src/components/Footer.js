import React from "react"

const HomeAdvantage = () => (
    <div id="footer">
        <div className="footer-wrap">
            <div className="column footer-about">
                <div className="column-title">About Find A Builder</div>
                <div className="column-content">
                    <div className="footer-about_info">
                        Find a Builder offers professional plumbers, builders, electricians, carpenters and every other
                        type of building specialist to the home improver and small developer.
                    </div>
                    <div className="footer-about_contacts">
                        <div className="footer-phone">
                            <a className="contact-link" href="tel:02030789711" title="020 3078 9711">
                                <i className="fas fa-phone contact-icon"></i>
                                <span>020 3078 9711</span>
                            </a>
                        </div>
                        <div className="footer-email">
                            <a className="contact-link" href="mailto:info@find-a-builder.com" title="info@find-a-builder.com">
                                <i className="fas fa-envelope contact-icon"></i>
                                <span>info@find-a-builder.com</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <div className="column footer-menu">
                <div className="footer-menu_pages">
                    <div className="column-title">Pages</div>
                    <div className="column-content">
                        <ul>
                            <li><a href="./" title="Home">Home</a></li>
                            <li><a href="./static/about-us" title="About Us">About Us</a></li>
                            <li><a href="./static/terms" title="Terms &amp; Conditions">Terms
                                &amp; Conditions</a></li>
                            <li><a href="./static/privacy" title="Privacy Policy">Privacy
                                Policy</a></li>
                            <li><a href="./static/code-of-practice">Code Of Practice</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-menu_specialists">
                    <div className="column-title">Types Of Specialists</div>
                    <div className="column-content">
                        <ul>
                            <li>
                                <a href="./directory/plumbing-heating-gas-engineer" title="Plumber">
                                    Plumber
                                </a>
                            </li>
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
                            <li>
                                <a href="./directory" title="See full list">
                                    See full list
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="column footer-action">
                <div className="column-title">Which Would You Like?</div>
                <div className="column-content">
                    <div className="footer-action_buttons">
                        <a href="/post-a-job" className="footer-button" title="Post A Job">Post A Job</a>
                        <a href="/find-a-builder" className="footer-button" title="Find A Builder">Find A
                            Builder</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default HomeAdvantage;