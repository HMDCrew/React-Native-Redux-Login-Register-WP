import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import axios from 'axios'

import env from '../../constants/env'

export const getLoginToken = createAsyncThunk('store/login', async ({ user, passwd }) => {
    
    const login_data = await AsyncStorage.getItem('login-data');

    if (null !== login_data) {

        return JSON.parse(login_data);

    } else {
        return await axios.post(env.SITE_URL + "wp-json/jwt-auth/v1/token", {
            username: user,
            password: passwd
        }).then((response) => {
            AsyncStorage.setItem('login-data', JSON.stringify(response.data))
            return response.data
        })
    }
});