import DetailedItem from "@/components/Item/DetailedItem";
import { GetStaticPropsContext } from "next";
import fs from "fs";
import path from "path";

const Details = (props: {
  returnedItem: {
    name: string;
    price: number;
    description: string;
    img: string;
  };
}) => {
  const { name, price, description, img } = props.returnedItem;
  return (
    <DetailedItem
      name={name}
      price={price}
      description={description}
      img={img}
    />
  );
};
export default Details;

export const getStaticPaths = async () => {
  try {
    const filePath = path.join(process.cwd(), "guitarsApi", "guitarsApi.json");
    const fileContent = await fs.promises.readFile(filePath, "utf8");

    const data = JSON.parse(fileContent);

    return {
      fallback: false,
      paths: data.map((el: any) => ({ params: { ItemId: el.id.toString() } })),
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.ItemId;

  try {
    const filePath = path.join(process.cwd(), "guitarsApi", "guitarsApi.json");
    const fileContent = await fs.promises.readFile(filePath, "utf8");

    const data = JSON.parse(fileContent);

    const selectedItem = data.find((el: any) => el.id.toString() === id);
    const returnedItem = {
      name: selectedItem.name,
      price: selectedItem.price,
      description: selectedItem.description,
      img: selectedItem.img,
    };

    return {
      props: {
        returnedItem,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};
