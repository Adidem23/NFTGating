import { useState } from 'react';
import { ethers } from 'ethers';
import abi from '../Abi/GameItem.json';
import axios from 'axios';




const Form = () => {

    // contract Address : 0xa5a58Fb486eFB7e47B00311039A558650ea40718

    const [NFTName, setNFTName] = useState(" ");
    const [NFTDesc, setNFTDesc] = useState(" ");
    const [File, setFile] = useState(null);
    const [IpfsHash, setIpfsHash] = useState("");

    const changeName = (e) => {
        setNFTName(e.target.value)
    }

    const changeDesc = (e) => {
        setNFTDesc(e.target.value);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageContent = e.target.result;
                setFile(imageContent);
            };

            reader.readAsDataURL(file);
        }
    };
    const SendNFt = async (e) => {

        e.preventDefault();
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const Signers = provider.getSigner();
        const ContractAdd = "0xa5a58Fb486eFB7e47B00311039A558650ea40718";
        const contractabi = abi.abi;
        const contractinstance = new ethers.Contract(ContractAdd, contractabi, Signers);

        const account = await ethereum.request({
            method: "eth_requestAccounts",
        });

        console.log("Balanace of : " + await contractinstance.balanceOf(account[0]));


        if (await contractinstance.balanceOf(account[0]) == 0) {

            const pinataMetadata = JSON.stringify({
                name: NFTName,
                description: NFTDesc,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftGAe90ARYAfDK_zv-EtoxGFy4AHTU8PCDmZ0bg9lpoQISTbMvqSbg1ZBmEL7V-dY66Y&usqp=CAU"
            });


            const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMzdkOTE0ZC01MjA4LTRkOGQtYmJmNS04Zjg0Yjg0ZDgzZjMiLCJlbWFpbCI6ImFkaXR5YXN1cnlhd2Fuc2hpNTQ1MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWUzNDk3ZDYyMWQxZjlhMTIxZmIiLCJzY29wZWRLZXlTZWNyZXQiOiIzNTkxYTdhNzM0ODFkYzZhMGZhMzEzYTIzZDVlYjQ4MGM5ZjkxZDE3ODRiNDE4Y2JlNzI1MmM0MGM5ZTlkMWUwIiwiaWF0IjoxNjkxNjkzOTY1fQ.wYGUrY0SZkBOqjPHnElhgSGy0F9xNdNLXMgDehgIkJE"

            const response = axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", pinataMetadata, {
                headers: {
                    'Content-Type': 'application/json',
                    pinata_api_key: 'ee3497d621d1f9a121fb',
                    'Authorization': `Bearer ${JWT}`,
                    pinata_secret_api_key: ' 3591a7a73481dc6a0fa313a23d5eb480c9f91d1784b418cbe7252c40c9e9d1e0 ',
                },
            }).then((response) => {
                setIpfsHash(response.data.IpfsHash);
            }).catch((err) => {
                console.log("Error: " + err);
            })

            const account = await ethereum.request({
                method: "eth_requestAccounts",
            });

            const MintNft = await contractinstance.awardItem(account[0], IpfsHash);

            if (MintNft) {
                console.log("NFT Minted Successfully" + MintNft);
                console.log("Balanace of : " + await contractinstance.balanceOf(account[0]));
            } else {
                console.log("NFT Not Minted");
            }
        } else {
            console.log('You own Nft');
        }


    }


    return (
        <div style={{ border: '3px solid red', display: 'block', margin: 'auto', width: 'fit-content' }}>

            <p>Name of NFT : </p>
            <input type='text' onChange={changeName} />

            <br />


            <p>Description of NFT : </p>
            <input type='text' onChange={changeDesc} />

            <br />
            <br />

            <p>Enter Image File : </p>
            <input type='file' onChange={handleFileChange} />

            <br />
            <br />

            <button onClick={SendNFt}>Submit</button>

        </div>
    )
}

export default Form