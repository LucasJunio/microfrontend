/**
 * Prepare a img to upload, with component ImgUpload
 * @argument {object}  object with files
 * @argument {number}  id user
 * @argument {string}  product product target
 * @returns FormData
 *
 */

const createObjectDocuments = (
  values = undefined,
  id = undefined,
  product = undefined
) => {
  if (!!values && !!id && !!product) {
    let formData = new FormData();
    Object.keys(values).forEach((key, index) => {
      if (!!values[key]?.name) {
        return formData.append("file", values[key]);
      }
    });

    const itens = Object.keys(values).map((key, index) => {
      if (!!values[key]) {
        return {
          categorie: values[key].category,
          filename: values[key].name,
        };
      }
    });

    itens.forEach((value) => {
      !value && itens.pop(value);
    });

    const bodyObject = {
      idClient: id,
      product: product,
      itens,
    };
    formData.append("info", JSON.stringify(bodyObject));
    return formData;
  }

  return undefined;
};

export { createObjectDocuments };
