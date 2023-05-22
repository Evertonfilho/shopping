import { ReactNode, createContext, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((c) => {
      if (c.find((item) => item.id === id) == null) {
        return [...c, { id, quantity: 1 }];
      } else {
        return c.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }else{
            return item;
          }
        });
      }
    });
  }

  return (
    <ShoppingCartContext.Provider value={{}}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
