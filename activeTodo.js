const backGround = document.querySelector("#moon");
let Addbtn = document.querySelector("#btn");
const inputfieldColor = document.querySelector("input");
const inputSection = document.querySelector(".input-section");
const mainBodyContainer = document.querySelector(".main-body-container");
const footerContainers = document.querySelector(".footer-items");

const itemsAddedContainer = document.querySelector(".items-container");
const itemsCounter = document.querySelector("#itemsNo");
const noBtn = document.querySelector("#Allno");
const activeBtn = document.querySelector("#activeno");
const completedBtn = document.querySelector("#completedNo");
const clearCompletedTask = document.querySelector("#clearedCompleted");

let flag;
const textArr = [];
let paraRemoved = [];
let storedArr = [];

let backgroundChange = function (change) {
  Addbtn.classList.toggle(change);
  inputfieldColor.classList.toggle(change);
  mainBodyContainer.classList.toggle("backGround");
  radiobtn.classList.toggle(change);
  inputSection.classList.toggle(change);
  backGround.classList.toggle(change);
  footerContainers.classList.toggle(change);
  if (
    backGround.classList.contains("darkColor") &&
    inputSection.classList.contains(change)
  ) {
    backGround.src = "images/icon-sun.svg";
    inputSection.style.background = "hsl(237, 14%, 26%)";
    backGround.style.background = "url(images/icon-sun.svg)";
    document.body.style.backgroundColor = "black";
    dra.style.background = "hsl(237, 14%, 26%)";
  } else {
    backGround.src = "images/icon-moon.svg";
    backGround.style.background = "url(images/icon-moon.svg)";
    inputSection.style.background = "";
    document.body.style.backgroundColor = "white";
    dra.style.background = "white";
  }

  if (Addbtn.classList.contains(change)) {
    flag = true;
  } else {
    flag = false;
  }

  itemsbackground();
};

const createHTMLElements = function () {
  if (inputfieldColor.value) {
    const inputValue = inputfieldColor.value;
    const htmlAdded = `<div class="added">
        <div class="check-para">
            <div><img src="images/icon-check.svg" alt="" class="imgsize image-background"></div>
            <p class="para-width">  ${inputValue}</p>
        </div>
        <div>
            <img src="images/icon-cross.svg" alt="" class="imgsize crossImage">
        </div>
        </div>`;

    itemsAddedContainer.insertAdjacentHTML("afterbegin", htmlAdded);

    inputfieldColor.value = "";
  }
  itemsbackground();
  displayCross();

  updateCounter();
};

const updateCounter = function () {
  const itemsLength = itemsAddedContainer.querySelectorAll(".added");
  itemsCounter.textContent = `${itemsLength.length} items left`;
};

const itemsbackground = function () {
  const items = itemsAddedContainer.querySelectorAll(".added");

  const inputItemsDisplay = function () {
    const paragraphCol = itemsAddedContainer.querySelectorAll(".added");
    [...paragraphCol].forEach(function (para) {
      para.classList.add("paraColor");
    });
  };

  const inputItemsDisplay1 = function () {
    const paragraphCol = itemsAddedContainer.querySelectorAll(".added");
    [...paragraphCol].forEach(function (para) {
      para.classList.remove("paraColor");
    });
  };

  items.forEach(function (el) {
    if (flag === true) {
      el.style.backgroundColor = "hsl(237, 14%, 26%)";
      inputItemsDisplay();
    } else if (flag === false) {
      el.style.backgroundColor = "white";
      inputItemsDisplay1();
    }
  });
};

Addbtn.addEventListener("click", createHTMLElements);

backGround.addEventListener("click", function () {
  backgroundChange("darkColor");
});

itemsAddedContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".crossImage");
  if (!clicked) return;
  clicked.parentElement.parentElement.remove();
  updateCounter();
});

itemsAddedContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".image-background");
  if (!clicked) return;
  clicked.parentElement.nextElementSibling.classList.toggle("lineThrough");

  itemsLeft();
});

const itemsLeft = function () {
  const paragraphLineThrough =
    itemsAddedContainer.querySelectorAll(".para-width");
  const lineThroughItems = itemsAddedContainer.querySelectorAll(".lineThrough");
  itemsCounter.textContent = `${
    paragraphLineThrough.length - lineThroughItems.length
  } items left`;
};

const activeDisplay = function () {
  const lineThroughItems = itemsAddedContainer.querySelectorAll(".lineThrough");

  [...lineThroughItems].forEach(function (el) {
    if (el.classList.contains("lineThrough")) {
      el.parentElement.parentElement.classList.toggle("invisibledisplay");
    }
  });
};
let flag2;

activeBtn.addEventListener("click", function () {
  const lineThroughItems = itemsAddedContainer.querySelectorAll(".lineThrough");
  const paragraphLineThrough =
    itemsAddedContainer.querySelectorAll(".para-width");
  activeDisplay();

  const allDeleteBtn = itemsAddedContainer.querySelectorAll(".crossImage");
  [...allDeleteBtn].forEach((el) => el.classList.toggle("invisibledisplay"));

  itemsCounter.textContent = `${
    paragraphLineThrough.length - lineThroughItems.length
  } items active`;

  noBtn.style.color = "";
  clearCompletedTask.style.color = "";
  completedBtn.style.color = "";
  activeBtn.style.color = "blue";

  const added = itemsAddedContainer.querySelectorAll(".added");
});

const arr = function (paragraphLineThrough) {
  storedArr = [];
  [...paragraphLineThrough].forEach((pa) => storedArr.push(pa.textContent));
};

// const addSort = function (added) {
//   let itemsArr = [];

//   [...added].map((ad, i) => itemsArr.push(ad));
//   const itemSor = itemsArr.sort((a, b) => b-a);

//   console.log(itemSor);

// };

const displayCross = function () {
  const allDeleteBtn = itemsAddedContainer.querySelectorAll(".crossImage");
  [...allDeleteBtn].forEach((el) => el.classList.remove("invisibledisplay"));
};

completedBtn.addEventListener("click", function () {
  const paragraphLineThrough =
    itemsAddedContainer.querySelectorAll(".para-width");
  const lineThroughItems = itemsAddedContainer.querySelectorAll(".lineThrough");
  [...paragraphLineThrough].forEach(function (para, i) {
    if (!para.classList.contains("lineThrough")) {
      para.parentElement.parentElement.classList.toggle("invisibledisplay");
    }
  });

  itemsCounter.textContent = `${lineThroughItems.length} items completed`;

  noBtn.style.color = "";
  clearCompletedTask.style.color = "";
  activeBtn.style.color = "";
  completedBtn.style.color = "blue";

  drag();
});

clearCompletedTask.addEventListener("click", function () {
  const paragraphLineThrough =
    itemsAddedContainer.querySelectorAll(".para-width");
  [...paragraphLineThrough].forEach(function (para, i) {
    if (para.classList.contains("lineThrough")) {
      para.parentElement.parentElement.remove();
    }
  });

  noBtn.style.color = "";
  activeBtn.style.color = "";
  completedBtn.style.color = "";
  clearCompletedTask.style.color = "blue";
});

noBtn.addEventListener("click", function () {
  const paragraphLineThrough =
    itemsAddedContainer.querySelectorAll(".para-width");
  [...paragraphLineThrough].forEach(function (para, i) {
    para.parentElement.parentElement.classList.remove("invisibledisplay");

    if (!para.classList.contains("lineThrough"))
      itemsCounter.textContent = `${i + 1} items left`;
  });
  displayCross();
  noBtn.style.color = "blue";
  activeBtn.style.color = "";
  clearCompletedTask.style.color = "";
  completedBtn.style.color = "";
});

radiobtn.addEventListener("click", function () {
  if (radiobtn) {
    itemsAddedContainer.addEventListener("mousedown", function (event) {
      clicked = event.target.closest(".added");
      if (!clicked) return;
      let shiftX = event.clientX - clicked.getBoundingClientRect().left;
      let shiftY = event.clientY - clicked.getBoundingClientRect().top;
      clicked.style.position = "absolute";
      clicked.style.zIndex = 1000;
      document.body.append(clicked);
      moveAt(event.pageX, event.pageY);
      function moveAt(pageX, pageY) {
        clicked.style.left = pageX - shiftX + "px";
        clicked.style.top = pageY - shiftY + "px";
      }
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
      dra.addEventListener("mousemove", onMouseMove);
      clicked.keyup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        clicked.onmouseup = null;
      };
    });
  }
});
