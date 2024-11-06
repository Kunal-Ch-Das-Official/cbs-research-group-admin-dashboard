import React from "react";
import style from "./NotFound.module.css";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <section className={style.page404}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <h5 className="text-center text-9xl text-gray-600 font-bold">
                                404
                            </h5>
                            <div className={style.fourZerofourBg}></div>

                            <div className={style.contantBox404}>
                                <h3 className={style.h2}>
                                    Look like you're lost
                                </h3>

                                <p>the page you are looking for not avaible!</p>

                                <Link
                                    to={"/admin-panel"}
                                    className={style.link404}
                                >
                                    Go to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
