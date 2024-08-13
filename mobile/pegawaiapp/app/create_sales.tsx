import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Form: React.FC<{ navigation: any; route: { params: { empId: string } } > = ({ navigation, route }) => {
    
  const [name, setName] = useState('');
  const [jobtitle, setJobtitle] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [joineddate, setJoineddate] = useState('');
  const [sales, setSales] = useState('');
  const { empId } = route.params;
  useEffect(()=>{
    
    const url = 'http://localhost:8080/api/employees/view/'+empId;
    const headers = {
      'Content-Type': 'application/json',
    };
    const formData = {};
    axios.post(url, formData, { headers, withCredentials: true })
    .then(response => {
        const data = response.data;
        setName(data.name);
        setJobtitle(data.job_title);
        setSalary(data.salary);
        setDepartment(data.department);
        setJoineddate(data.joined_date);
    });
  },[]);
  const handleSubmit = async () => {
    // Handle form submission here
    const url = 'http://localhost:8080/api/auth/signout';
    const headers = {
        'Content-Type': 'application/json',
    };
    const formData = {
        employeeId: empId,
        sales: sales
    }
    console.log(formData);
    try {
        const response = await axios.post(url, formData, { headers, withCredentials: true });
        console.log(response.data);
        // Tambahkan logika untuk menangani respons sukses di sini
        // revalidatePath('/pages/pegawai');
        navigation.navigate('/' as never);
    } catch (error) {
        if (axios.isAxiosError(error)) {
        console.error('Error saat tambah data pegawai:', error.message);
        // Tambahkan logika untuk menampilkan pesan error ke pengguna
        } else {
        console.error('Error tidak dikenal:', error);
        }
    }
  };

  return (
    <View style={styles.container}>
        <h3>Create Form Sales</h3>
      <Text style={styles.label}>Sales:</Text>
      <TextInput
        style={styles.input}
        value={sales}
        onChangeText={(text) => setSales(text)}
        placeholder="Masukkan jumlah sales"
      />


      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Form;