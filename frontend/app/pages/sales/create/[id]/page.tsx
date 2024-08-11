'use client';


import Link from 'next/link';
import {
  BookmarkIcon,
  AtSymbolIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { useState, FormEvent, useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

interface Employee {
    employee_id: number;
    name: string;
    job_title: string;
    salary: number;
    department: string;
    joined_date: string;
  }

export default function Form({ params }: { params: { id: string } }) {
    const id = params.id;

    const initialState = { message: null, errors: {} };
    const router = useRouter();
    const [name, setName] = useState('');
    const [jobtitle, setJobtitle] = useState('');
    const [salary, setSalary] = useState('');
    const [department, setDepartment] = useState('');
    const [joindate, setJoindate] = useState('');
    const [sales, setSales] = useState('');

    // const [employees, setEmployees] = useState<Employee | null>(null);
    useEffect(() => {
        const url = `http://localhost:8080/api/employees/view/${id}`;
        const headers = {
          'Content-Type': 'application/json',
        };
        const formData = {};
        axios.get(url, { headers, withCredentials: true })
        .then(response => {
            const data = response.data;
            const tgl = data.joined_date ? new Date(data.joined_date) : null;
            const monthlist = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            const join = (tgl?.getFullYear() ?? '2024') + '-' + monthlist[tgl?.getMonth() ?? 0] + '-' + (tgl?.getDate() ?? '01');
            setName(data.name ?? '');
            setJobtitle(data.job_title ?? '');
            setSalary(data.salary ? data.salary.toString() : '0');
            setDepartment(data.department ?? '');
            setJoindate(join);
        });
       
    }, []);
    
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const url = 'http://localhost:8080/api/sales/create';
        const headers = {
          'Content-Type': 'application/json',
        };
        const formData = {
          employeeId: id,
          sales: sales
        }
        
        try {
          const response = await axios.post(url, formData, { headers, withCredentials: true });
          console.log(response.data);
          router.push('/pages/pegawai');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Error saat menambahkan :', error.message);
          } else {
            console.error('Error tidak dikenal:', error);
          }
        }
      }
  return (
    <div>
      <h1 className="text-2xl">Sales Form Create</h1>
      <div className="card">
        <div className='card-title'>
            <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> {name}
        </div>
        <div className="card-content">
            <form onSubmit={onSubmit}>
            
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* sales */}
                    <div className="mb-4">
                        <label htmlFor="sales" className="mb-2 block text-sm font-medium">
                            Sales
                        </label>
                        <div className="relative">
                            <input
                            id="sales"
                            name="sales"
                            type="number"
                            placeholder="0"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            
                            value={sales}
                            onChange={(e) => setSales(e.target.value)}
                            required
                            />
                            <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
        </div>
      </div>
    </div>
  );
}