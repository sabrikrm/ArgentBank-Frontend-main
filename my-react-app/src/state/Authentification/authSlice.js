import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "./authAPI";

// l'asyncThunk (`loginUser`) effectue un appel API pour authentifier l'utilisateur et récupérer un token qui sera stocké dans le localStorage.
// L'état initial vérifie si un utilisateur est déjà connecté en cherchant un token dans `localStorage`.
// Le reducer va prendre l'action dispatché (`logout`) ainsi que l'état initial et supprimera le token de `localStorage`,
// tout en mettant à jour l'état pour déconnecter l'utilisateur.

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUserAPI(credentials);

      localStorage.setItem("token", data.body?.token || "");

      return {
        user: data.body,
        token: data.body?.token || "",
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  }, // Les extra reducers mettent à jour l'état en fonction du cycle de vie (en attente, réussi, rejeté) du thunk asynchrone loginUser, garantissant ainsi un flux clair depuis l'initiation de l'appel API jusqu'au succès ou à l'échec.
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
