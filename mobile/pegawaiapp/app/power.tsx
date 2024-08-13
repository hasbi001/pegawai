import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Index() {
    const handleSubmit = async () => {

    }

    return (
        <div>
            <Button title="Log Out" onPress={handleSubmit} />
        </div>
    );
}