import { writeFile, readFile } from "fs/promises";

export const save = async (data) => {
  const { pathname: databaseFile } = new URL(
    "../../database.json",
    import.meta.url
  );

  let pathNormalized = databaseFile.replace(/%20/gi, " ");

  if (process.platform === "win32") {
    pathNormalized = pathNormalized.substring(3, pathNormalized.length);
  }

  const curretData = JSON.parse(await readFile(pathNormalized));

  delete data.language;

  curretData.push(data);

  await writeFile(pathNormalized, JSON.stringify(curretData));
};
