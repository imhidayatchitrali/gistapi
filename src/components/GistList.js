import React, { useContext, useEffect, useState } from 'react'
import { getPublicGists } from '../services/gistService';
import Gist from './Gist';
import { LoadinContext, MyContext } from '../MyContext';

const GistList = () => {
    const { data, setData } = useContext(MyContext);
    const { load, setLoad } = useContext(LoadinContext);
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        setLoad(true)
        getPublicGists().then((publicGists) => {
            setData(publicGists.data)
            setLoad(false)
            setSubmit(true)
        })
    }, [setSubmit]);

    console.log({ load: load })
    console.log({ submit: submit })
    console.log({ data: data })

    return (

        <>
            {load && <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><h1>Loading ...</h1></div>}
            {(!submit && data.length > 0) ?
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> <h1>No Gist Found</h1></div >
                : data?.map((gist, i) => <Gist gist={gist} key={gist.id} index={i} />)
            }
            {/* {data?.map((gist, i) => <Gist gist={gist} key={gist.id} index={i} />)} */}
        </>
    )
}

export default GistList
