const api = "https://api.dictionaryapi.dev/api/v2/entries/en";
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const wordEle = document.querySelector("#word");
const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const wordMeaning = document.querySelector(".word-definition");
const results = document.querySelector(".result-container");
results.style.display = "none";
loading.style.display = "none";
errors.textContent = "";
const form = document.querySelector(".form-data");
const word = document.querySelector(".word-name");
const searchForword = async (wordName) => {
  loading.style.display = "block";
  errors.textContent = "";
  try {
    const response = await (await fetch(`${api}/${wordName}`)).json();
    loading.style.display = "none";
    wordEle.innerText = response[0].word;
    phonetics.innerText = response[0].phonetics[0].text;
    audio.src = response[0].phonetics[0].audio;
    wordMeaning.innerText = response[0].meanings[0].definitions[0].definition;
    const synonyms = response[0].meanings[0].definitions[0].synonyms;
    console.log(synonyms);
    let syn =[];
    syn = response[0].meanings;
    console.log(syn.length);
    if (
      syn.length == 1 &&
      response[0].meanings[0].definitions[0].synonyms !== undefined
    ) {
      const synonyms = response[0].meanings[0].definitions[0].synonyms;
      let synonymsData = "";
      for (let i = 0; i < synonyms.length; i++) {
        synonymsData += `<p class="pills">${synonyms[i]}<p>`;
      }
      document.querySelector(".synonyms").innerHTML = synonymsData;
    }
    else if(
      syn.length > 1 &&
      response[0].meanings[1].definitions[0].synonyms !== undefined
    ) {
      const synonyms = response[0].meanings[1].definitions[0].synonyms;
      let synonymsData = "";
      for (let i = 0; i < synonyms.length; i++) {
        synonymsData += `<p class="pills">${synonyms[i]}<p>`;
      }
      document.querySelector(".synonyms").innerHTML = synonymsData;
    }
    else {
      throw("no words");
    }
    console.log(response);
    results.style.display = "block";
  } catch (error) {
    loading.style.display = "none";
    results.style.display = "none";
    `<p class ="errors"> ${errors.textContent ="No Definition Found."}<p>`;
  }
};

// declare a function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  searchForword(word.value);
  console.log(word.value);
};

form.addEventListener("submit", (e) => handleSubmit(e));