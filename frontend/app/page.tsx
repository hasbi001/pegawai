import Image from "next/image";
import Head from "next/head";
import  LoginForm  from "./ui/login-form";

export default function Home() {
  return (
    <>
        <Head>Pegawai</Head>
        <main className="flex items-center justify-center md:h-screen">
            <LoginForm />
        </main>
    </>
  );
}
