import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const getDataForPage = (data, page) => {
    const pagination = {}
    pagination.max = page * 18;
    pagination.min = pagination.max - 18;
    pagination.data = data.slice(pagination.min, pagination.max)
    return pagination
  };
  

export const listPokemons = createAsyncThunk("pokemon/listPokemons", async(_, thunkAPI) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=18`);
        
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data) || error.message;

        return thunkAPI.rejectWithValue(message);
    }
} );

export const listDetails = createAsyncThunk("pokemon/listDetails", async(name ,thunkAPI) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data) || error.message;

        return thunkAPI.rejectWithValue(message);
    }
}) 

export const searchByName = createAsyncThunk("pokemon/searchByName", async(name ,thunkAPI) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data) || error.message;

        return thunkAPI.rejectWithValue(message);
    }
}) 

export const searchByType = createAsyncThunk("pokemon/searchByType", async({type, page} ,thunkAPI) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        console.log(response)
        return getDataForPage(response.data.pokemon, page).data;
    } catch (error) {
        const message = (error.response && error.response.data) || error.message;

        return thunkAPI.rejectWithValue(message);
    }
}) 

export const getTypes = createAsyncThunk("pokemon/getTypes", async(_ ,thunkAPI) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data) || error.message;

        return thunkAPI.rejectWithValue(message);
    }
}) 