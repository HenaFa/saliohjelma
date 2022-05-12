import React, { useEffect, useState } from "react"

function Asiakas(props)
{
    const [asiakas, setAsiakas] = useState([]);

    const fetchLinkki = (info, linkki) =>
    {
        return fetch(linkki).then(response => response.json())
    }

    useEffect(() =>
    {
        fetchLinkki('useEffect', props.customerLink)
            .then(data => setAsiakas(data))
    }, []);

    return (
        <>{`${asiakas.firstname} ${asiakas.lastname} `}</>
    )
}

export default Asiakas;