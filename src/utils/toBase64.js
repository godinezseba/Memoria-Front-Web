export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const mapToBase64 = list => (
  Promise.all(list.map(async (element) => {
    const { file, ...rest } = element;
    if (file) {
      const newFile = await toBase64(file);
      return {
        ...rest,
        file: newFile,
      };
    }
    return element;
  }))
);
