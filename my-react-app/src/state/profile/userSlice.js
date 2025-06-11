import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileApi, updateUsername } from "../profile/userAPI";

// L'asyncThunk (`fetchUserProfile`) effectue un appel API pour récupérer le profil de l'utilisateur en utilisant le token stocké dans l'état de l'authentification.
// the authentication token is retived from the Redux store.
//
// Il vérifie d'abord si l'utilisateur est connecté en récupérant le token de `getState()`.
// En cas de succès, il met à jour l'état avec les informations du profil.
// En cas d'échec, il renvoie un message d'erreur.

// L'asyncThunk (`changeUsername`) permet de modifier le nom d'utilisateur en envoyant une requête PUT avec le nouveau nom et le token.
// Si l'appel API réussit, il met à jour le nom d'utilisateur dans l'état.
// Le reducer met à jour l'état en fonction du cycle de vie de chaque appel API (en attente, réussi ou rejeté).
// En cas de rejet, l'état `error` est mis à jour avec l'erreur renvoyée par l'appel API.

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Get authentication token from state
      return await fetchProfileApi(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeUsername = createAsyncThunk(
  "user/changeUsername",
  async (newUsername, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await updateUsername(token, newUsername);
      return newUsername; // Update Redux state after successful API call
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = {
          ...action.payload,
          username: action.payload.userName,
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeUsername.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.username = action.payload; // Update username in state
        }
      })
      .addCase(changeUsername.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
