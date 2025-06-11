import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, changeUsername } from "../state/profile/UserSlice";
import Account from "../components/Account";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // lire le global state
  const { profile, loading, error } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const [newUsername, setNewUsername] = useState("");
  const [editableUserName, setEditableUserName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  //Si l'utilisateur est connecté (le token existe) mais que le profil n'a pas été récupéré, la fonction sera déclenchée.
  useEffect(() => {
    if (!token) {
      navigate("/Login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!profile && token) {
      dispatch(fetchUserProfile()); //useEffect permet de déclencher une action quand la page se charge
                                     //appelles dispatch(fetchUserProfile()) → ça lance la requête à l’API
    }
  }, [dispatch, profile, token]);

  useEffect(() => {
    if (profile) {
      setEditableUserName(profile.username || "");
      setNewUsername(profile.username || "");
    }
  }, [profile]);
  // Si le nouveau nom d'utilisateur est différent de l'ancien, la fonction changeUsername sera dispatché
  const handleSave = (e) => {
    e.preventDefault();
    if (editableUserName && editableUserName !== profile.username) {
      dispatch(changeUsername(editableUserName));
      console.log(`Username "${editableUserName}" has been sent to the API`);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableUserName(profile.username || "");
    setIsEditing(false);
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="main bg-dark ">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {profile?.firstName} {profile?.lastName}!
        </h1>
        {isEditing ? (
          <form onSubmit={handleSave} className="styled-form">
            <h2>Edit user info</h2>
            <div className="form-group">
              <label htmlFor="userName">User Name:</label>
              <input
                type="text"
                id="userName"
                value={editableUserName}
                onChange={(e) => setEditableUserName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={profile?.firstName || ""}
                className="no-edit"
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={profile?.lastName || ""}
                className="no-edit"
                readOnly
              />
            </div>

            <div className="form-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>

      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
};

export default Profile;
