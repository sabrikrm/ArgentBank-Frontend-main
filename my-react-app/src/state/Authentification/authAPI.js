// La séparation des appels API dans un fichier dédié rend ces appels réutilisables, facilite les tests et la maintenance, et isole la logique réseau de la gestion d'état.

export const loginUserAPI = async (credentials) => {
  const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials), // Ensure credentials are sent correctly
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // Return the whole response (contains token and user details)
};
