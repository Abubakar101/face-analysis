import axios from "axios";

const params = {
  url: `https://api-us.faceplusplus.com/facepp/v3/detect?`,
  api_key: `api_key=Bf1XAtfGUPU8m6zqcmWGyBZ9yqhuBRNF`,
  api_secret: `api_secret=Sge5iA6CQ6gOhlY3LpcAO1tUFM6mF_x7`,
  image_url: `image_url=`,
  return_attributes: `return_attributes=gender,age,emotion,ethnicity,beauty`
};

const constructURL = type => {
  const URL = `${params.url}${params.api_key}&${params.api_secret}&${
    params.return_attributes
  }`;

  return type === "url" ? `${URL}&${params.image_url}` : URL;
};

const facePlusAPI = {
  sendImageFile: async imageFile => {
    const url = constructURL();
    const formData = new FormData();

    await formData.append("image_file", imageFile);

    const res = await axios({
      method: "POST",
      url,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    });

    if (res.status === 200) {
      return res.data.faces;
    }
  },

  sendImageLink: async imgUrl => {
    const URL = constructURL("url") + imgUrl;
    const res = await axios.post(URL);

    if (res.status === 200) {
      return res.data.faces;
    }
  }
};

export default facePlusAPI;
