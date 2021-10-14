(() => {
  const canvas = document.querySelector("#jsCanvas");
  const colors = document.querySelector("#jsColors");
  const range = document.querySelector("#jsRange");
  const mode = document.querySelector("#jsMode");
  const saveBtn = document.querySelector("#jsSave");

  // canvas 크기 설정
  let canvasWidth;
  let canvasHeight;
  function resizeCanvas() {
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }

  // canvas의 context를 변수로 만든다.
  const ctx = canvas.getContext("2d");
  // CanvasRenderingContext2D가 가지고 있는 값 중에 설정
  ctx.lineWidth = 2.5;
  ctx.strokeStyle;
  ctx.fillStyle;

  let painting = false;
  let filling = false;
  let currentBtn = document.querySelector(".control__color:first-child");

  const startPainting = () => {
    painting = true;
  };
  const stopPainting = () => {
    painting = false;
  };

  function onMouseMove(event) {
    event.preventDefault();
    const posX = event.offsetX;
    const posY = event.offsetY;

    // false 때 경로이동하다가, true 때 line과 stroke 생성
    if (!painting || filling) {
      // beginPath없으면 선 색 바꿀 때 다 바뀌어 버림,,,
      ctx.beginPath();
      ctx.moveTo(posX, posY);
    } else {
      ctx.lineTo(posX, posY);
      ctx.stroke();
    }
  }
  function onTouchMove(event) {
    event.preventDefault();
    const posX = event.touches[0].clientX - 1;
    const posY = event.touches[0].clientY - 1;

    // false 때 경로이동하다가, true 때 line과 stroke 생성
    if (!painting || filling) {
      // beginPath없으면 선 색 바꿀 때 다 바뀌어 버림,,,
      ctx.beginPath();
      ctx.moveTo(posX, posY);
    } else {
      ctx.lineTo(posX, posY);
      ctx.stroke();
    }
  }
  function onTouchStart(event) {
    event.preventDefault();
    startPainting();
    ctx.beginPath();
  }

  function onMouseDown(event) {
    event.preventDefault();
    startPainting();
  }

  // change mode
  function changeMode() {
    if (filling) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
  }
  function handleCanvasClick() {
    if (filling) {
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
  }

  // change color
  function changeColor(event) {
    if (event.target.classList.contains("control__color")) {
      ctx.strokeStyle = event.target.style.backgroundColor;
      ctx.fillStyle = ctx.strokeStyle;
      changeBtn(event);
    }
  }
  function changeBtn(event) {
    currentBtn.classList.remove("color--border");
    currentBtn = event.target;
    currentBtn.classList.add("color--border");
  }

  // change thickness
  function handleRange(event) {
    ctx.lineWidth = event.target.valueAsNumber;
  }

  // 우클릭 방지
  function handleCM(event) {
    event.preventDefault();
  }

  // save
  function handleSaveClick() {
    // toDataURL("image/png") 가 defalt
    const images = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = images;
    link.download = "perfect🍊";
    link.click();
  }

  // Add Events
  if (canvas) {
    // 움직임
    canvas.addEventListener("mousemove", onMouseMove);
    // 마우스 누름
    canvas.addEventListener("mousedown", onMouseDown);
    // 마우스 땜
    canvas.addEventListener("mouseup", stopPainting);
    // 나감
    canvas.addEventListener("mouseleave", stopPainting);
    // 클릭
    canvas.addEventListener("click", handleCanvasClick);
    // 우클릭
    canvas.addEventListener("contextmenu", handleCM);

    // mobile
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchend", stopPainting);
  }

  if (colors) {
    colors.addEventListener("click", changeColor);
  }

  if (range) {
    // range는 input event로 감지
    range.addEventListener("input", handleRange);
  }

  if (mode) {
    mode.addEventListener("click", changeMode);
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }

  // 화면 크기 변화
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
})();
