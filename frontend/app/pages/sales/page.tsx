"use client";
import { useEffect, useState } from 'react';
import axios from "axios";
import Link from 'next/link';
import { PencilIcon, UserPlusIcon, TrashIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';

interface Sales {
  sales_id: number;
  employeeId: number;
  name: string;
  sales: string;
  createdAt: string;
}

export default function Page() {
    const [sales, setSales] = useState<Sales[]>([]);

    useEffect(() => {
        const url = 'http://localhost:8080/api/sales/list';
        const headers = {
          'Content-Type': 'application/json',
        };
        const formData = {};
        axios.post(url, formData, { headers, withCredentials: true })
        .then(response => setSales(response.data));
    }, []);

    const deleteKlik = (id: string) => {
        const url = 'http://localhost:8080/api/sales/delete/'+id;
        const headers = {
            'Content-Type': 'application/json',
          };
        axios.delete(url,{ headers, withCredentials: true });
        location.reload();
    };

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Sales</h1>
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Nama
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Sales
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Created At
                        </th>
                        <th scope="col" className="relative py-3 pl-6 pr-3">
                            Action
                        </th>
                    </tr>
                </thead>
            <tbody className="bg-white">
              {sales?.map((salesVal) => (
                <tr
                  key={salesVal.sales_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      
                      <p>{salesVal.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {salesVal.sales}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {salesVal.createdAt}
                  </td>
                  
                  
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                        
                        <Link href={`/pages/sales/edit/${salesVal.sales_id}`} className="rounded-md border p-2 hover:bg-gray-100">
                            <PencilIcon className="w-5" />
                        </Link>
                        <button className="rounded-md border p-2 hover:bg-gray-100" onClick={() => deleteKlik(salesVal.sales_id.toString())}>
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