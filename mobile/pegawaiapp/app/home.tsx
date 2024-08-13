import React, { useEffect, useState } from 'react';
import { View ,Text, Button  } from 'react-native';
import { TabView, TabBar, SceneMap, TabBarProps, Route } from 'react-native-tab-view';
import axios from 'axios';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';

interface Employee {
  name: string;
  job_title: string;
  salary: number;
  department: string;
  joined_date: string;
}
interface Sales {
  name: string;
  sales: string;
}

const navigation = useNavigation();
const dataPegawaiTable: Array<Array<string | number | JSX.Element>> = []; // Menentukan tipe data untuk dataPegawaiTable
const dataSalesTable: Array<Array<string | number>> = []; // Menentukan tipe data untuk dataPegawaiTable
const deletePegawai = async (id: string) => {
  const url = 'http://localhost:8080/api/employees/delete/'+id;
    const headers = {
      'Content-Type': 'application/json',
    };
    const formData = {};
    axios.delete(url, { headers, withCredentials: true })
    .then(response => {
        const data = response.data;
        console.log(data);
    });
};

const deletesales = async (id: string) => {
  const url = 'http://localhost:8080/api/sales/delete/'+id;
    const headers = {
      'Content-Type': 'application/json',
    };
    const formData = {};
    axios.delete(url, { headers, withCredentials: true })
    .then(response => {
        const data = response.data;
        console.log(data);
    });
};
useEffect(() => {
    const url = 'http://localhost:8080/api/employees/list';
    const headers = {
      'Content-Type': 'application/json',
    };
    const formData = {};
    axios.post(url, formData, { headers, withCredentials: true })
    .then(response => {
        const data = response.data;
        data?.map((employee: Employee) => {
          const empId = employee.employee_id;
          const button = <Button title='edit' onPress={() => navigation.navigate('edit_pegawai', { empId })} /> <Button title='delete' onPress={() => deletePegawai(empId)} />;
            dataPegawaiTable.push([
              employee.name, 
              employee.job_title, 
              employee.salary, 
              employee.department, 
              employee.joined_date,
              // Ubah tipe data untuk menampung elemen React
              button
            ]); // Menambahkan JSX.Element ke tipe data
        });
    });

    axios.post('http://localhost:8080/api/sales/list', formData, { headers, withCredentials: true })
    .then(response => {
        const data = response.data;
        data?.map((sales: Sales) => {
          const saleId = sales.sales_id;
          const button = <Button title='edit' onPress={() => navigation.navigate('edit_sales', { saleId })} /> <Button title='delete' onPress={() => deletesales(saleId)} />;
            dataSalesTable.push([sales.name, sales.sales, button ]);
        });
    });
}, []);

const headPegawaiTable: Array<string> = ['Name', 'Jabatan', 'Salary', 'Department', 'Joined Date', 'Action']; // Menentukan tipe data untuk headPegawaiTable
const Pegawai = () => (
    <View style={{ flex: 1, backgroundColor: '#ff69b4' }}>
        <Button title='Add' onPress={() => navigation.navigate('create_pegawai' as never)} />
        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
            <Row data={headPegawaiTable} style={{ height: 40, backgroundColor: '#f1f8ff' }} />
            <Rows data={dataPegawaiTable} />
        </Table>
    </View>
);

const headSalesTable = ['Name', 'Sales','Action'];
const Sales = () => (
    <View style={{ flex: 1, backgroundColor: '#ff69b4' }}>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
            <Row data={headSalesTable} style={{ height: 40, backgroundColor: '#f1f8ff' }} />
            <Rows data={dataSalesTable} />
        </Table>
    </View>
);

const renderScene = SceneMap({
    first: Pegawai,
    second: Sales,
});

const renderTabBar = (props: TabBarProps<Route>) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#fff' }}
      style={{ backgroundColor: '#333' }}
    />
);

const App = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'home', title: 'Home' },
      { key: 'power', title: 'Power' },
    ]);
  
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    );
  };
  
  export default App;