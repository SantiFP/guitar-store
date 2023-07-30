import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const PaymentForm = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [selectedCard, setSelectedCard] = useState<string>("");

  const selectRef = useRef<HTMLSelectElement>(null);

  const router = useRouter();

  // if (cart.length === 0) {
  //   router.replace("/");
  //   return;
  // }

  const paymentHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectRef.current?.value || !selectedCard) {
      return;
    };

  };
  return (
    <>
      <div className="selectPlan">
        <p>Seleccione plan de pago:</p>
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
                  className="w-5 bg-black"
                  type="radio"
                  id="visa"
                  name="payment"
                  value="Visa"
                  onChange={() => setSelectedCard("Visa")}
                />
                <label htmlFor="visa">
                  <img className="w-20 h-20 " src="/visa.png" alt="" />
                </label>
              </div>

              <div className="cardDivs">
                <input
                  type="radio"
                  id="mastercard"
                  name="payment"
                  value="Mastercard"
                  className="w-5"
                  onChange={() => setSelectedCard("Master")}
                />
                <label className="-mt-3" htmlFor="mastercard">
                  <img className="w-24 h-12" src="mastercard.png" alt="" />
                </label>
              </div>

              <div className="cardDivs pt-3">
                <input
                  className="w-5"
                  type="radio"
                  id="diners"
                  name="payment"
                  value="Diners"
                  onChange={() => setSelectedCard("Diners")}
                />
                <label htmlFor="diners">
                  <img className="w-26 h-12" src="/diners.png" alt="" />
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

        <div className="flex justify-center mt-4">
          <button className="buyButton">COMPRAR</button>
        </div>
      </form>
    </>
  );
};
export default PaymentForm;
