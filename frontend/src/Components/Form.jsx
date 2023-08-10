import React, { useState } from 'react';

const Form = () => {

    const [NFTName, setNFTName] = useState(" ");
    const [NFTDesc, setNFTDesc] = useState(" ");
    const [File, setFile] = useState(" ");


    const changeName = (e) => {
        setNFTName(e.target.value)
    }

    const changeDesc = (e) => {
        setNFTDesc(e.target.value);
    }


    const SendNFt = (e) => {
        e.preventDefault();
    }


    return (
        <div style={{ border: '3px solid red', display: 'block', margin: 'auto', width: 'fit-content' }}>

            <p>Name of NFT : </p>
            <input type='text' onChange={changeName} />

            <br />
            <br />

            <p>Description of NFT : </p>
            <input type='text' onChange={changeDesc} />

            <br />
            <br />

            <p>Enter Image File : </p>
            <input type='file' />

            <br />
            <br />

            <button onClick={SendNFt}>Submit</button>

        </div>
    )
}

export default Form