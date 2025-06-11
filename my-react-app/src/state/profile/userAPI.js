
export const fetchProfileApi = async (token) => {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user profile");
  }

  return data.body; // returns { firstName, lastName, email, etc. }
};

export const updateUsername = async (token, newUsername) => {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`, // verifie token envoyé
    },
    body: JSON.stringify({ userName: newUsername }),
  });

  if (!response.ok) {
    throw new Error("Failed to update username");
  }

  return response.json();
};
