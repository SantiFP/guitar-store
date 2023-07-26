import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { cartActions } from "@/store";

const Cart: React.FC<{ onClose: () => void }> = (props) => {
  const cart = useSelector((state: RootState) => state.cart);
  const total = cart.reduce((acc, el) => acc + el.price, 0);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Modal onClose={props.onClose}>
      <div className="flex flex-row-reverse pb-12">
        <div onClick={props.onClose} className="w-fit ">
          <img
            className="w-10 h-10 ml-auto lg:cursor-pointer"
            src="/out.png"
            alt="delete"
          />
        </div>
        <p className="text-center font-semibold w-11/12 text-lg">
          {cart.length === 0 ? "EMPTY CART" : "YOUR CART"}
        </p>
      </div>
      {cart.map((el) => {
        return (
          <div
            key={el.id}
            className="flex flex-row text-xl justify-between border-b-[0.09rem] pb-4 pt-2 border-black border-solid"
          >
            <p>{el.name}</p>
            <div className="flex flex-row">
              <p className="pr-3">X{el.amount}</p>
              <p className="pr-4">${el.price}</p>
              <img
                onClick={() =>
                  dispatch(
                    cartActions.removeFromCart({
                      name: el.name,
                      id: el.id,
                      amount: el.amount,
                      price: el.price,
                    })
                  )
                }
                className="w-8 h-8"
                src="/borrar.png"
                alt="delete"
              />
            </div>
          </div>
        );
      })}
      <div>
        <p>Total: ${total}</p>
      </div>
    </Modal>
  );
};
export default Cart;
