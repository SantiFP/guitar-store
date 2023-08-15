import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { removeCart } from "@/store/getCart";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [noCard, setNoCard] = useState<boolean>(false);
  const [noPaymentMethod, setNoPaymentMethod] = useState<boolean>(false);
  const total = cart.reduce((acc, el) => acc + el.price, 0);
  const selectRef = useRef<HTMLSelectElement>(null);
  const name = useSelector((state: RootState) => state.login.name);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // if (cart.length === 0) {
  //   router.replace("/");
  //   return;
  // }

  const paymentHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) {
      setNoCard(true);
      return;
    }
    if (!selectRef.current?.value) {
      setNoPaymentMethod(true);
      setNoCard(false);
      return;
    }

    setNoPaymentMethod(false);
    setNoCard(false);
    const fees = total / Number(selectRef.current?.value[0]);

    Swal.fire({
      title: `Confirma la compra de ${cart.length} ${
        cart.length === 1 ? "item" : "items"
      } en ${
        selectRef.current?.value
      } de $${fees} con tarjeta ${selectedCard}?`,
      html: `<p>Total: $${total}</p>
      <p>Esta acción no se puede deshacer</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar compra",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "¡Compra confirmada!",
          "La compra se ha realizado con éxito.",
          "success"
        );
        dispatch(removeCart(name));
        router.push("/");
      }
    });
  };
  return (
    <>
      <div className="selectPlan">
        <p>Tarjeta de crédito hasta en 12 cuotas sin recargo</p>
        <p className="text-xs pt-2">
          15% de descuento con pago con tarjeta Visa
        </p>
      </div>
      <form onSubmit={paymentHandler} className=" pb-6 bg-white text-black">
        <div className="lg:flex lg:flex-row">
          <div className="cards">
            <div>
              <div className="cardDivs">
                <input
                  className="w-5 cursor-auto lg:cursor-pointer"
                  type="radio"
                  id="visa"
                  name="payment"
                  value="Visa"
                  onChange={() => setSelectedCard("Visa")}
                />
                <label htmlFor="visa">
                  <img
                    className="w-20 h-20 cursor-auto lg:cursor-pointer"
                    src="/visa.png"
                    alt=""
                  />
                </label>
              </div>

              <div className="cardDivs">
                <input
                  type="radio"
                  id="mastercard"
                  name="payment"
                  value="Mastercard"
                  className="w-5 cursor-auto lg:cursor-pointer"
                  onChange={() => setSelectedCard("Master")}
                />
                <label className="-mt-3" htmlFor="mastercard">
                  <img
                    className="w-24 h-12 cursor-auto lg:cursor-pointer"
                    src="mastercard.png"
                    alt=""
                  />
                </label>
              </div>

              <div className="cardDivs pt-3">
                <input
                  className="w-5 cursor-auto lg:cursor-pointer"
                  type="radio"
                  id="diners"
                  name="payment"
                  value="Diners"
                  onChange={() => setSelectedCard("Diners")}
                />
                <label htmlFor="diners">
                  <img
                    className="w-26 h-12 cursor-auto lg:cursor-pointer"
                    src="/diners.png"
                    alt=""
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="paymentDiv">
            <div className="selectContainer">
              <select ref={selectRef} className="selectFees">
                <option className="text-lg" value="">
                  Seleccione una opción
                </option>
                <option value="1 pago">1 pago</option>
                <option value="4 cuotas">4 cuotas</option>
                <option value="8 cuotas">8 cuotas</option>
                <option value="12 cuotas">12 cuotas</option>
              </select>
              <p className="payMethod">Método de pago</p>
            </div>
          </div>
        </div>

        {noCard && (
          <p className="text-red-500 text-center -mt-6">
            Selecciona una tarjeta de crédito
          </p>
        )}
        {noPaymentMethod && (
          <p className="text-red-500 text-center -mt-6">
            Selecciona un método de pago
          </p>
        )}

        <div className="flex justify-center mt-4">
          <button className="buyButton">COMPRAR</button>
        </div>
      </form>
    </>
  );
};
export default PaymentForm;
