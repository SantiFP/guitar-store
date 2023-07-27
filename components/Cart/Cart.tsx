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
          {!cart.length ? "CARRO VACÍO" : "TU CARRITO"}
        </p>
      </div>

      <div className="flex flex-row">
        {cart.length > 0 && (
          <div className="text-xs w-[30%] lg:hidden">
            <ul>
              <li key="n">N. - Nombre</li>
              <li key="c">C. - Cantidad</li>
              <li key="t">T. - Total</li>
            </ul>
          </div>
        )}

        <div className={`" text-center w-[32%] ${cart.length === 0 && 'w-full'}  lg:w-full"`}>
          {cart.length == 1 ? (
            <div>
              <span>Tienes </span>
              <span className="itemsNumber">{cart.length}</span>
              Item
            </div>
          ) : (
            <div>
              <span>Tienes </span>
              <span className="itemsNumber">{cart.length}</span>
              Items
            </div>
          )}
        </div>
      </div>

      {cart.length > 0 && (
        <>
          <div className="hidden lg:flex cartDiv text-2xl">
            <p className=" w-[75%]">Nombre</p>
            <div className="flex flex-row lg:w-[25%]">
              <p className=" lg:text-left lg:w-[42%]">Cantidad</p>
              <p className=" lg:w-[42%] lg:text-left">Total</p>
              <div className="lg:w-[16%]"></div>
            </div>
          </div>

          <div className="cartDiv text-2xl lg:hidden  ">
            <p className=" w-[60%]">N.</p>
            <div className="flex flex-row w-[40%]">
              <p className=" w-1/3 ">C.</p>
              <p className=" w-1/3  ">T.</p>
              <div className="w-1/3 "></div>
            </div>
          </div>
        </>
      )}

      {cart.map((el) => {
        return (
          <div key={el.id} className="cartDiv">
            <p className="w-[60%] lg:w-[75%]">{el.name}</p>
            <div className="flex flex-row w-[40%] lg:w-[25%]">
              <p className=" w-1/3 lg:w-[42%] text-right pr-5">X{el.amount}</p>
              <p className=" w-1/3 lg:w-[42%]">${el.price}</p>
              <div className=" w-1/3 flex  justify-end lg:justify-center lg:w-[16%] ">
                <img
                  className="w-8 h-8 lg:cursor-pointer"
                  src="/borrar.png"
                  alt="delete"
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
                />
              </div>
            </div>
          </div>
        );
      })}
      {cart.length > 0 && (
        <div>
          <p>Total: ${total}</p>
        </div>
      )}
    </Modal>
  );
};
export default Cart;
