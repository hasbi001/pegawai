import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { signIn } from '@/auth';
import axios from "axios";

export const signIn = async (post: { username: string; password: string }) => {
    const url = 'http://localhost:8080/api/auth/signin';

    const headers = {
      'Content-Type': 'application/json',
    };
    
    const data = {
      username: post.username,
      password: post.password,
    };

    const response = await axios.post(url, data, { headers });

    if (response.status = 200) {
      redirect('/dashboard/pegawai');
    }
}

export const signOut = async () => {
    const url = 'http://localhost:8080/api/auth/signout';

    const headers = {
      'Content-Type': 'application/json',
    };
    
    const data = {};

    const response = await axios.post(url, data, { headers });

    if (response.status = 200) {
      redirect('/app/page');
    }
}
