import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Form = () => {
    const navigation = useNavigation();
  const [name, setName] = useState('');
  const [jobtitle, setJobtitle] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [joineddate, setJoineddate] = useState('');

  const handleSubmit = async () => {
    // Handle form submission here
    const url = 'http://localhost:8080/api/employees/create';
        const headers = {
          'Content-Type': 'application/json',
        };
        const formData = {
          name: name,
          job_title: jobtitle,
          salary: salary,
          department: department,
          join_date: joineddate
        }
        console.log(formData);
        try {
          const response = await axios.post(url, formData, { headers, withCredentials: true });
          console.log(response.data);
          // Tambahkan logika untuk menangani respons sukses di sini
          // revalidatePath('/pages/pegawai');
          navigation.navigate('home' as never);
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
        <h3>Create Form Pegawai</h3>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Masukkan nama pegawai"
      />

      <Text style={styles.label}>Jabatan:</Text>
      <TextInput
        style={styles.input}
        value={jobtitle}
        onChangeText={(text) => setJobtitle(text)}
        placeholder="Masukkan jabatan pegawai"
      />

      <Text style={styles.label}>Salary:</Text>
      <TextInput
        style={styles.input}
        value={salary}
        onChangeText={(text) => setSalary(text)}
        placeholder="Masukkan salary pegawai"
      />

      <Text style={styles.label}>Department:</Text>
      <TextInput
        style={styles.input}
        value={department}
        onChangeText={(text) => setDepartment(text)}
        placeholder="Masukkan departemen pegawai"
      />
      
      <Text style={styles.label}>Department:</Text>
      <TextInput
        style={styles.input}
        value={department}
        onChangeText={(text) => setDepartment(text)}
        placeholder="Masukkan departemen pegawai"
      />
      
      <Text style={styles.label}>Join Date:</Text>
      <TextInput
        style={styles.input}
        value={joineddate}
        onChangeText={(text) => setJoineddate(text)}
        placeholder="Masukkan tanggal bergabung pegawai"
        keyboardType="default"
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