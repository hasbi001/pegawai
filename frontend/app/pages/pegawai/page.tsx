"use client";
import { useEffect, useState } from 'react';
import axios from "axios";
import Link from 'next/link';
import { PencilIcon, UserPlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Employee {
  employee_id: number;
  name: string;
  job_title: string;
  salary: number;
  department: string;
  joined_date: string;
}

export default function Page() {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const url = 'http://localhost:8080/api/employees/list';
        const headers = {
          'Content-Type': 'application/json',
        };
        const formData = {};
        axios.post(url, formData, { headers, withCredentials: true })
        .then(response => setEmployees(response.data));
    }, []);

    const deleteKlik = (id: string) => {
        const url = 'http://localhost:8080/api/employees/delete/'+id;
        const headers = {
            'Content-Type': 'application/json',
          };
        axios.delete(url,{ headers, withCredentials: true });
        location.reload();
    };

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Pegawai</h1>
                <Link href={`/pages/pegawai/create`} className="rounded-md border p-2 hover:bg-gray-100 text-right">
                            <UserPlusIcon className="w-5" />
                        </Link>
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nama
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Jabatan
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Salary
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Department
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Join Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                    Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {employees?.map((employee) => (
                <tr
                  key={employee.employee_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      
                      <p>{employee.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {employee.job_title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {employee.salary}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {employee.department}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {employee.joined_date}
                  </td>
                  
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                        <Link href={`/pages/pegawai/${employee.employee_id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
                            <PencilIcon className="w-5" />
                        </Link>
                        <button className="rounded-md border p-2 hover:bg-gray-100" onClick={() => deleteKlik(employee.employee_id.toString())}>
                            <span className="sr-only">Delete</span>
                            <TrashIcon className="w-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}