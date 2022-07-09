import React from "react"
import IconCross from '../img/icons/icon_cross.png';
import IconHandshake from '../img/icons/icon_handshake.png';
import IconEarth from '../img/icons/icon_earth.png';

const HomeAdvantage = () => (

    <section id="home_advantages" className="with-padding">
        <div className="advantage-list">
            <div className="advantage-item">
                <div className="item-icon">
                    <img src={IconCross} alt="Mistakes To Avoid"/>
                </div>
                <div className="item-title">
                    Mistakes To Avoid
                </div>
                <div className="item-description">
                    We understand how exciting it can be
                    to think about all those little details like
                    how many lights you are going to have
                    in your newly extended kitchen.
                </div>
            </div>
            <div className="advantage-item">
                <div className="item-icon">
                    <img src={IconHandshake} alt="Exactly The Right Deals"/>
                </div>
                <div className="item-title">
                    Exactly The Right Deals
                </div>
                <div className="item-description">
                    We understand how exciting it can be
                    to think about all those little details like
                    how many lights you are going to have
                    in your newly extended kitchen.
                </div>
            </div>
            <div className="advantage-item">
                <div className="item-icon">
                    <img src={IconEarth} alt="A Better Building World"/>
                </div>
                <div className="item-title">
                    A Better Building World
                </div>
                <div className="item-description">
                    We understand how exciting it can be
                    to think about all those little details like
                    how many lights you are going to have
                    in your newly extended kitchen.
                </div>
            </div>
        </div>
    </section>
)

export default HomeAdvantage;