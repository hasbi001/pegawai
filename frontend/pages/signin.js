// import type { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

export default function handler(req,res) {
    const url = 'http://localhost:8080/api/auth/signin';

    // const headers = {
    //   'Content-Type': 'application/json',
    // };
    
    const data = req.body;
    console.log("data");
    // res.json({ message: "masuk" });
    // const response = await axios.post(url, data, { headers });

    // if (response.status = 200) {
    //   res.status(200).json({ url :'/pages/pegawai'});
    // }
    // else
    // {
    //     res.status(200).json({ url :'/'});
    // }
}