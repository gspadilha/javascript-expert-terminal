import { writeFile, readFile } from "fs/promises";

const readDatabase = async () => {
  const { pathname: databaseFile } = new URL(
    "../../database.json",
    import.meta.url
  );

  let pathNormalized = databaseFile.replace(/%20/gi, " ");

  if (process.platform === "win32") {
    pathNormalized = pathNormalized.substring(3, pathNormalized.length);
  }

  const data = [...JSON.parse(await readFile(pathNormalized))];

  return {
    data,
    pathNormalized,
  };
};

export const save = async (newData) => {
  const { data, pathNormalized } = await readDatabase();

  delete newData.language;

  data.push(newData);

  await writeFile(pathNormalized, JSON.stringify(data));
};

export const maxId = async () => {
  const { data } = await readDatabase();

  const arr = data.map((item) => Number(item.id));

  const max = Math.max(...arr);

  return max === undefined ? 1 : max + 1;
};
