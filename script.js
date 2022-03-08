"use strict";

const film = document.getElementById("film");
const res = document.querySelector(".res");

const getData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let optionAll = document.createElement("option");
      optionAll.innerHTML = "All";
      film.append(optionAll);
      data.forEach(function (item) {
        let option = document.createElement("option");
        option.innerHTML = item.name;
        option.value = item.name;
        film.append(option);
      });

      const all = function () {
        res.innerHTML = "";
        data.forEach(function (item) {
          let divCard = document.createElement("div");
          divCard.className = "div_card";
          res.append(divCard);
          for (let key in item) {
            let newSelect = JSON.parse(JSON.stringify(item), (key, value) =>
              key === "photo" ? "<img src= " + item.photo + " >" : value
            );
            let div = document.createElement("div");
            div.id = "div";
            div.innerHTML = "<b>" + key + "</b>" + ": " + newSelect[key];
            divCard.append(div);
          }
        });
      };
      all();
      const result = function () {
        res.innerHTML = "";
        let select = data[event.target.options.selectedIndex - 1];
        let divCard = document.createElement("div");
        divCard.className = "div_card";
        res.append(divCard);
        for (let key in select) {
          let newSelect = JSON.parse(JSON.stringify(select), (key, value) =>
            key === "photo" ? "<img src= " + select.photo + " >" : value
          );

          let div = document.createElement("div");
          div.id = "div";
          div.innerHTML = "<b>" + key + "</b>" + ": " + newSelect[key];
          divCard.append(div);
        }
        if (event.target.options.selectedIndex == 0) {
          all();
        }
      };

      film.addEventListener("change", result);
    });
};

getData("dbHeroes.json");
