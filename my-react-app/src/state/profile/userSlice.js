import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileApi, updateUsername } from "../profile/userAPI";

// L'asyncThunk (`fetchUserProfile`) effectue un appel API pour récupérer le profil de l'utilisateur en utilisant le token stocké dans l'état de l'authentification.
// fais un appel POST à /user/profile (backend)

//  récupères le token stocké dans authSlice avec getState()

//  ajoutes ce token dans le header Authorization: Bearer <token>

// récupères la réponse (JSON avec les infos de l’utilisateur)


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
      return newUsername; // update redux
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


// gères 3 états possibles : pending, fulfilled, rejected

// Quand la requête réussit,mets les infos utilisateur dans userInfo

export default userSlice.reducer;
