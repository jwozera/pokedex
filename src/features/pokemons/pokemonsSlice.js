import { createSlice } from "@reduxjs/toolkit";
import { getTypes, listDetails, listPokemons, searchByName, searchByType } from "./pokemonsAction";

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: "",
    type: "",
    currentPage: 1,
    searchTerm: "",
    pokemonsData: {
        count: 0,
        next: "",
        previous: "",
        results: []
    },
    pokemonsDataDetails: [],
    currentPokemon: {},
}

export const pokemonsSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.type= "";
            state.searchTerm= "";
            state.message = "";
            state.type = "";
            state.currentPage = 1
            state.currentPokemon = {};
            state.pokemonsData = {}
        },
        setType:(state, action) => {
            state.type = action.payload;
            state.searchTerm = "";
        },
        setCurrentPage:(state, action) => {
            state.currentPage = action.payload;
        }, 
        setSearchTerm:(state, action) => {
            state.searchTerm = action.payload;
            state.type = "";
        }, 
        updatePagination:(state, action) => {
            state.searchTerm = action.payload;
            state.type = "";
        }, 
    },
    extraReducers: (builder) => {
        builder.addCase(listPokemons.pending, (state) => {
            state.loading = true;
        })
        .addCase(listPokemons.fulfilled, (state, action) => {
            state.loading = false;
            state.pokemonsData = action.payload;
            state.success = true;
        })
        .addCase(listPokemons.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.pokemonsData = {};
        })
        .addCase(listDetails.pending,(state) => {
            state.lodading = true;  
        })
        .addCase(listDetails.fulfilled,(state, action) => {
            state.lodading = true;  
            state.pokemonsDataDetails.push(action.payload);
            state.success = true;
        })
        .addCase(listDetails.rejected,(state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.currentPokemon = {};
        })
        .addCase(searchByName.pending,(state) => {
            state.lodading = true;  
        })
        .addCase(searchByName.fulfilled,(state, action) => {
            if (action.payload.id) {
                state.lodading = true;  
                state.currentPokemon  = action.payload;
                state.success = true;
            }
        })
        .addCase(searchByName.rejected,(state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.currentPokemon = {};
        })
        .addCase(searchByType.pending,(state) => {
            state.lodading = true;  
        })
        .addCase(searchByType.fulfilled,(state, action) => {
            state.currentPage = action.meta.arg.page;
            state.lodading = true;  
            state.pokemonsData.results = action.payload.map( p => p.pokemon );
            state.success = true;
        })
        .addCase(searchByType.rejected,(state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.pokemonsData.results = [];
        })
        .addCase(getTypes.pending,(state) => {
            state.lodading = true;  
        })
        .addCase(getTypes.fulfilled,(state, action) => {
            state.lodading = true;  
            state.typesList = action.payload.results;
            state.success = true;
        })
        .addCase(getTypes.rejected,(state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.typesList = [];
        });
    }
})

export const { reset, setType, setSearchTerm, setCurrentPage } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;