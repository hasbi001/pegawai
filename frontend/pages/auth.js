import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

export const signIn = async (req,res) => {
    const url = 'http://localhost:8080/api/auth/signin';

    const headers = {
      'Content-Type': 'application/json',
    };
    
    const data = req.body;
    console.table(data);
    const response = await axios.post(url, data, { headers });

    if (response.status = 200) {
      res.status(200).json({ url :'/pages/pegawai'});
    }
}

export const signOut = async (req,res) => {
    const url = 'http://localhost:8080/api/auth/signout';

    const headers = {
      'Content-Type': 'application/json',
    };
    
    const data = {};

    const response = await axios.post(url, data, { headers });

    if (response.status = 200) {
      res.status(200).json({ url :'/'});
    }
}