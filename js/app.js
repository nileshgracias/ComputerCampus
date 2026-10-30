"use strict";
const training = document.getElementById("training");
const plan = document.getElementById("plan");
const storageKey = "computercampus-device-v1";
const valid = new Set(["mouse", "touchpad", "both"]);
document.getElementById("open-training").addEventListener("click", () => {
  training.hidden = false;
  training.scrollIntoView({ behavior: "smooth", block: "start" });
});
try {
  const saved = localStorage.getItem(storageKey);
  if (valid.has(saved)) document.querySelector('input[name="device"][value="' + saved + '"]').checked = true;
} catch (_) { /* Browser storage may be disabled. */ }
document.getElementById("save-device").addEventListener("click", () => {
  const selected = document.querySelector('input[name="device"]:checked');
  if (!selected) { plan.textContent = "Bitte wähle zuerst deine Ausstattung aus."; return; }
  const device = selected.value;
  try { localStorage.setItem(storageKey, device); } catch (_) { /* Session-only selection. */ }
  const steps = device === "both"
    ? ["Maus-Training", "Touchpad-Training", "Gerätevergleich"]
    : device === "mouse" ? ["Maus-Training"] : ["Touchpad-Training"];
  plan.replaceChildren();
  const heading = document.createElement("strong");
  heading.textContent = "Dein Trainingsplan:";
  const list = document.createElement("ul");
  for (const step of steps) {
    const item = document.createElement("li");
    item.textContent = step + " (wird entwickelt)";
    list.appendChild(item);
  }
  const note = document.createElement("p");
  note.textContent = "Die praktische Bedienung und Abschlussmission ergänzen wir als Nächstes.";
  plan.append(heading, list, note);
});