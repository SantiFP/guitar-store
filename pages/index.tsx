import Item from "@/components/Item/Item";
import fs from "fs";
import path from "path";
import { ItemObj } from "@/Types/types";

export default function Home(props: { data: ItemObj[] }) {
  const { data } = props;
  return (
    <>
      <div className="lg:flex lg:flex-row lg:w-11/12 lg:mx-auto lg:flex-wrap">
        {data.map((el, i) => (
          <div
            className={`lg:w-1/3 lg:mt-5 ${i === data.length - 1 && "pb-6"}`}
            key={el.id}
          >
            <Item
              id={el.id}
              name={el.name}
              price={el.price}
              type={el.type}
              img={el.img}
              amount={el.amount}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), "guitarsApi", "guitarsApi.json");

    const fileContent = await fs.promises.readFile(filePath, "utf8");

    const data = JSON.parse(fileContent);

    return {
      props: {
        data,
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

// export async function getStaticProps() {
//   try {
//     const url = 'https://jsonplaceholder.typicode.com/posts';

//     const response = await new Promise((resolve, reject) => {
//       https.get(url, (res) => {
//         let data = '';

//         res.on('data', (chunk) => {
//           data += chunk;
//         });

//         res.on('end', () => {
//           resolve(JSON.parse(data));
//         });
//       }).on('error', (error) => {
//         reject(error);
//       });
//     });

//     return {
//       props: {
//         posts: response,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error.message);

//     return {
//       props: {
//         posts: [],
//       },
//     };
//   }
// }
