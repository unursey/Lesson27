"use strict";

const film = document.getElementById("film");
const res = document.querySelector(".res");
var selectElem = document.getElementById("select");

const getData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let moviesArr = {};
      let removeDublicate;
      data.forEach(function (item) {
        [].concat(item.movies).forEach(function (item) {
          if (item !== undefined) {
            moviesArr[item] = true;
          }
        });
        removeDublicate = Object.keys(moviesArr);
      });
      console.log(moviesArr);
      console.log(removeDublicate);

      let optionAll = document.createElement("option");
      optionAll.innerHTML = "All";
      film.append(optionAll);
      removeDublicate.forEach(function (item) {
        let option = document.createElement("option");
        option.innerHTML = item;
        option.value = item;
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
        let select = film.value;

        const newData = data.filter(function (val) {
          return !(
            val.movies === "" ||
            typeof val.movies == "undefined" ||
            val.movies === null
          );
        });

        newData.forEach(function (item, index) {
          item["movies"].forEach(function (item2) {
            if (item2 == select) {
              console.log(index);

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
            }
          });
        });

        if (film.selectedIndex == 0) {
          all();
        }
      };

      film.addEventListener("change", result);
    });
};

getData("dbHeroes.json");
