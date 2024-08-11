import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Logo from '@/app/ui/logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import axios from "axios";
import LogoutButton from '@/app/ui/dashboard/logoutbutton';

export default function SideNav() {

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
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </Link> */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <LogoutButton />
      </div>
    </div>
  );
}