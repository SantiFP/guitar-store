import fs from "fs";
import path from "path";
import { ItemObj } from "@/Types/types";
import Item from "@/components/Item/Item";

const Gadgets = (props: { gadgets: ItemObj[] }) => {
  const { gadgets } = props;
  return (
    <>
      <div className="lg:flex lg:flex-row lg:w-10/12 lg:mx-auto lg:flex-wrap">
        {gadgets.map((el,i) => (
          <div className={`lg:w-1/3 lg:mt-5 ${i === gadgets.length -1 && 'pb-6'}`} key={el.id}>
            <Item
              id={el.id}
              name={el.name}
              price={el.price}
              type={el.type}
              img={el.img}
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default Gadgets;

export async function getStaticProps() {
  try {
    const filePath = path.join(
      process.cwd(),
      "guitarsApi",
      "guitarsApi.json"
    );

    const fileContent = await fs.promises.readFile(filePath, "utf8");

    const data = JSON.parse(fileContent);

    const gadgets = data.filter((el: ItemObj) =>
      el.type === "gadget" ? el : null
    );

    return {
      props: {
        gadgets,
      },
    };
  } catch (error) {
    console.error("Error fetching data");

    return {
      props: {
        data: null,
      },
    };
  }
}
