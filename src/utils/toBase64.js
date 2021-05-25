export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const mapToBase64 = async list => {
  const newList = [];
  for (const element of list) {
    const { file, ...rest } = element;
    const newFile = await toBase64(file);
    const newElement = {
      ...rest,
      file: newFile,
    };
    newList.push(newElement);
  }
  return newList;
};
