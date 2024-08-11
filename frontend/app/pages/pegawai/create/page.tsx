'use client';


import Link from 'next/link';
import {
  CalendarDaysIcon,
  BuildingLibraryIcon,
  AtSymbolIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { useState, FormEvent } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const router = useRouter();
    const [name, setName] = useState('');
    const [jobtitle, setJobtitle] = useState('');
    const [salary, setSalary] = useState('');
    const [department, setDepartment] = useState('');
    const [joindate, setJoindate] = useState('');

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const url = 'http://localhost:8080/api/employees/create';
        const headers = {
          'Content-Type': 'application/json',
        };
        const formData = {
          name: name,
          job_title: jobtitle,
          salary: salary,
          department: department,
          join_date: joindate
        }
        console.log(formData);
        try {
          const response = await axios.post(url, formData, { headers, withCredentials: true });
          console.log(response.data);
          // Tambahkan logika untuk menangani respons sukses di sini
          // revalidatePath('/pages/pegawai');
          router.push('/pages/pegawai');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Error saat login:', error.message);
            // Tambahkan logika untuk menampilkan pesan error ke pengguna
          } else {
            console.error('Error tidak dikenal:', error);
          }
        }
      }
  return (
    <form onSubmit={onSubmit}>
        <h1 className="text-2xl">Pegawai Form Create</h1>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Pegawai Name */}
        <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Masukkan nama pegawai"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          
        </div>

        {/* Jabatan */}
        <div className="mb-4">
            <label htmlFor="jobtitle" className="mb-2 block text-sm font-medium">
                Jabatan
            </label>
            <div className="relative">
              <input
                id="jobtitle"
                name="jobtitle"
                type="text"
                placeholder="Masukan jabatan pegawai"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={jobtitle}
                onChange={(e) => setJobtitle(e.target.value)}
                required
              />
              <BriefcaseIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>

        {/* Salary */}
        <div className="mb-4">
            <label htmlFor="salary" className="mb-2 block text-sm font-medium">
                Salary
            </label>
            <div className="relative">
              <input
                id="salary"
                name="salary"
                type="number"
                placeholder="Masukan jabatan pegawai"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>

        {/* Department */}
        <div className="mb-4">
            <label htmlFor="department" className="mb-2 block text-sm font-medium">
                Department
            </label>
            <div className="relative">
              <input
                id="department"
                name="department"
                type="text"
                placeholder="Masukan jabatan pegawai"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
        <div className="mb-4">
            <label htmlFor="joindate" className="mb-2 block text-sm font-medium">
                Join Date
            </label>
            <div className="relative">
              <input
                id="joindate"
                name="joindate"
                type="date"
                placeholder="Masukan jabatan pegawai"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={joindate}
                onChange={(e) => setJoindate(e.target.value)}
                required
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/pages/pegawai"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
