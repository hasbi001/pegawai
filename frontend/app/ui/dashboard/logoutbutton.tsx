'use client';

import { PowerIcon } from '@heroicons/react/24/outline';
import axios from "axios";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const url = 'http://localhost:8080/api/auth/signout';
      const response = await axios.post(url, {}, { withCredentials: true });
      
      if (response.status === 200) {
        window.location.href ='/';
      } else {
        console.error('Gagal logout');
      }
    } catch (error) {
      console.error('Error saat logout:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}