import React, { useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { capitalize } from "../helpers"
import Analytics from "../pages/Analytics/";
import Unidades from "../pages/Unidades/";
import Predios from "../pages/Predios/";
import Predio from "../pages/Predio/";
import Proprietarios from "../pages/Proprietarios/";

export default function Main(props){
    const { page, params } = props;
    const getComponent = (page) => {
        console.log(page)
        switch(page){
            case "analytics":
                return <Analytics {...props} />
            case "proprietarios":
                return <Proprietarios {...props} />
            case "unidades":
                return <Unidades {...props}/>
            case "predios":
                return <Predios {...props} />
            case "predio":
                return <Predio {...props} />
            default:
                return <div></div>
        }
    }

    let title = "Admin - " + capitalize(page)
    title += params.id ? " - " + params.id : "" 

    return (
        <>
            <Helmet title={title} />
            <div className="right_col" role="main">

                <div className="clearfix"></div>
                {getComponent(page)}

            </div>
        </>
    )
}