import { Box, Spinner } from "@chakra-ui/react";
import React, { useState, useContext, useEffect, ReactElement } from "react";

export type ContextType = {
  favorites: string[];
  addToFavorites: Function;
  removeFromFavorites: Function;
};

export const FavoritesContext = React.createContext<ContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

export function useFavorites() {
  return useContext(FavoritesContext);
}

interface Props {
  children: ReactElement;
}

const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("items")!);
    if (localItems !== null) {
      setFavorites(localItems);
    }
    setLoading(false);
  }, []);

  const updateLocalStorage = (list: any) => {
    localStorage.setItem("items", JSON.stringify(list));
  };
  const addToFavorites = (id: string) => {
    setFavorites([...favorites, id]);
    localStorage.setItem("items", JSON.stringify([...favorites, id]));
  };
  const removeFromFavorites = (id: string) => {
    let newItems = favorites.filter((item: any) => item !== id);
    setFavorites([...newItems]);
    updateLocalStorage([...newItems]);
  };
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  if (loading) {
    return (
      <Box height="100vh" justifyContent="center">
        <Spinner />
      </Box>
    );
  }
  return (
    <FavoritesContext.Provider value={value}>
      {!loading && children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
