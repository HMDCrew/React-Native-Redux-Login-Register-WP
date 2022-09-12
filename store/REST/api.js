import { createAsyncThunk } from '@reduxjs/toolkit';
import env from '../../constants/env'
import axios from 'axios'


export const getLoginToken = createAsyncThunk('store/login', async ({ user, passwd }) => {
    return await axios.post(env.SITE_URL + "wp-json/jwt-auth/v1/token", {
        username: user,
        password: passwd
    }).then((response) => response.data )
    .catch((error) => error.json() );
});