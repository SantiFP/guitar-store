const DetailedItem = (props: {
  name: string;
  price: number;
  description: string;
  img: string;
}) => {
  const { name, price, description, img } = props;
  return (
    <>
      <div className="w-5/6 mx-auto flex flex-col space-y-3 items-center mt-10 lg:flex-row lg:space-y-0 lg:space-x-8">
        <img className="w-80 h-80" src={img} alt="item" />
        <div className="pt-2 flex flex-col items-center space-y-4 lg:p-0">
          <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-8">
            <p>Nombre: {name}</p>
            <p>Precio: ${price}</p>
          </div>
          <div>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailedItem;
