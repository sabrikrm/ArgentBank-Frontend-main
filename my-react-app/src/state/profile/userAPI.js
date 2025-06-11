//will make 2 api calls:to get the user's profile + "put" methode to change the pseudo name
// La séparation des appels API dans un fichier dédié rend ces appels réutilisables, facilite les tests et la maintenance, et isole la logique réseau de la gestion d'état.

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
      Authorization: `Bearer ${token}`, // Ensure token is sent
    },
    body: JSON.stringify({ userName: newUsername }),
  });

  if (!response.ok) {
    throw new Error("Failed to update username");
  }

  return response.json();
};
