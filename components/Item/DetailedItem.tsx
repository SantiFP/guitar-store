const DetailedItem = (props: {
  name: string;
  price: number;
  description: string;
  img: string;
}) => {
  const { name, price, description, img } = props;
  return (
    <>
      <div className="detailsDiv">
        <img className="w-80 h-80" src={img} alt="item" />
        <div className="details">
          <div className="nameAndPrice">
            <p>Nombre: {name}</p>
            <p>Precio: ${price}</p>
          </div>
            <p>{description}</p>
        </div>
      </div>
    </>
  );
};
export default DetailedItem;
