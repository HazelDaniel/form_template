"use strict";
export const canvas = document.getElementById("signature-pad");
let ctx = canvas.getContext("2d");
let drawTimes = 0;
export function clearSignature() {
  drawTimes = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function saveSignature() {
  if (!drawTimes) return "";
  return canvas.toDataURL();
}

document.addEventListener("DOMContentLoaded", () => {
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("touchstart", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("touchend", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);

  function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getPosition(e);
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const [x, y] = getPosition(e);

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
    drawTimes++;
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return [clientX - rect.left, clientY - rect.top];
  }
});
