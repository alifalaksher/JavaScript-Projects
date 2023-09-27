const generateForm = document.querySelector(".image-generator");
const imgGallery = document.querySelector(".image-gallery");
const downloadBtn = document.querySelector(".download-btn");

const OPENAI_API_KEY = "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"; // Your OpenAI API key here

const updateImgCard = (imgArrayData) => {
  imgArrayData.forEach((imgObject, index) => {
    const imgCard = imgGallery.querySelectorAll(".img-card")[index];
    const imgElement = imgCard.querySelector("img");
    const aiImage = `data:image/jpeg;base64,${imgObject.b64_json}`;
    imgElement.src = aiImage;
    // console.log(aiImage)
    // console.log(imgElement.scr)
    if(aiImage){
      imgCard.classList.remove("loading")
    }
  });
};

const generatAIiamge = async (userPrompt, userImage) => {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: userPrompt,
      n: Number(userImage),
      size: "512x512",
      response_format: "b64_json",
    }),
  });
  // Throw an error message if the API response is unsuccessful
  if (!response.ok)
    throw new Error(
      "Failed to generate AI images. Make sure your API key is valid."
    );
  const { data } = await response.json();
  console.log(data);
  updateImgCard([...data]);
};

const handleFormSubmission = (e) => {
  e.preventDefault();
  const userPrompt = e.target[0].value;
  const userImage = e.target[1].value;

  const imgaeCardMaker = Array.from(
    { length: userImage },
    () =>
      `<div class="img-card loading">
        <img src="images/loader.svg" alt="image" /><a
          href="#"
          class="download-btn"
          ><img src="images/download.svg" alt="svg"
        /></a>
      </div>`
  ).join("");
  imgGallery.innerHTML = imgaeCardMaker;
  generatAIiamge(userPrompt, userImage);
};

generateForm.addEventListener("submit", handleFormSubmission);
