const DICE_RE = /(\d*)[dk](\d+)(?:\s*([+-])\s*(\d+))?/i;
import { DiceRoller } from "../vendor/css-dice-roller/css-dice-roller.js";

const DICE_COLOR = "#e23636";

function parseExpression(value) {
  const match = String(value || "").replace(/\s/g, "").match(DICE_RE);
  if (!match) return null;
  return {
    count: Math.max(1, Math.min(12, Number(match[1] || 1))),
    sides: Math.max(2, Math.min(100, Number(match[2]))),
    modifier: (match[3] === "-" ? -1 : 1) * Number(match[4] || 0)
  };
}

function formatExpression({ count, sides, modifier }) {
  return `${count}k${sides}${modifier > 0 ? ` + ${modifier}` : modifier < 0 ? ` - ${Math.abs(modifier)}` : ""}`;
}

function randomDie(sides) {
  const range = Math.floor(0x100000000 / sides) * sides;
  const buffer = new Uint32Array(1);
  do { crypto.getRandomValues(buffer); } while (buffer[0] >= range);
  return (buffer[0] % sides) + 1;
}

export function initDiceRoller() {
  const dialog = document.getElementById("diceDialog");
  const launcher = document.getElementById("diceLauncher");
  const title = document.getElementById("diceTitle");
  const instruction = document.getElementById("diceInstruction");
  const stage = document.getElementById("diceStage");
  const surface = document.getElementById("diceBox");
  const fallback = document.getElementById("diceFallback");
  const result = document.getElementById("diceResult");
  const manual = document.getElementById("manualRollBtn");
  const virtual = document.getElementById("virtualRollBtn");
  let current = { count: 1, sides: 20, modifier: 0 };
  let currentLabel = "Własny rzut";
  let roller;

  function showSurface() {
    surface.hidden = false;
    fallback.hidden = true;
  }

  function showFallback(message, isError = false) {
    surface.hidden = true;
    fallback.hidden = false;
    fallback.classList.toggle("error", isError);
    fallback.innerHTML = message;
  }

  function getRoller() {
    if (!roller) roller = new DiceRoller(surface);
    roller.clear();
    const visibleDice = current.count * (current.sides === 100 ? 2 : 1);
    roller.updateSettings({
      theme: "theme-solid", baseColor: DICE_COLOR, textColor: "#ffffff",
      scale: visibleDice > 8 ? 46 : visibleDice > 4 ? 58 : visibleDice > 2 ? 72 : 100,
      animation: "chaotic", speed: 1.7, layoutMode: "grid", dragEnabled: false
    });
    roller.addDie(current.sides === 100 ? "d10" : `d${current.sides}`, visibleDice);
    return roller;
  }

  function prepare(expression, label = "Rzut kością") {
    current = parseExpression(expression) || { count: 1, sides: 20, modifier: 0 };
    currentLabel = label;
    title.textContent = label;
    instruction.textContent = `Rzuć ${formatExpression(current)}. Możesz użyć własnych kości albo wykonać rzut 3D tutaj.`;
    showFallback(`<span class="dice-placeholder-icon">◈</span><span>Wybierz rzut ręczny albo uruchom kości 3D.</span>`);
    result.textContent = "";
    if (!dialog.open) dialog.showModal();
  }

  function showManual() {
    showFallback(`<div class="manual-card"><strong>${formatExpression(current)}</strong><span>Rzuć ${current.count === 1 ? `kością k${current.sides}` : `${current.count} kośćmi k${current.sides}`} i ${current.modifier > 0 ? `dodaj ${current.modifier}` : current.modifier < 0 ? `odejmij ${Math.abs(current.modifier)}` : "nie dodawaj modyfikatora"}.</span></div>`);
    result.textContent = "Rzut rozstrzygasz przy stole.";
  }

  function publishResult(rolls, total) {
    result.innerHTML = `<span>${rolls.join(" + ")}${current.modifier ? ` ${current.modifier > 0 ? "+" : "−"} ${Math.abs(current.modifier)}` : ""}</span><strong>${total}</strong>`;
    window.dispatchEvent(new CustomEvent("marvel:dice-roll", { detail: { label: currentLabel, expression: formatExpression(current), rolls, total } }));
  }

  async function rollVirtual() {
    virtual.disabled = true;
    result.textContent = "Przygotowanie kości…";
    showSurface();
    try {
      const dice = getRoller();
      result.textContent = "Kości lecą…";
      const faces = await dice.rollAll();
      const rolls = current.sides === 100
        ? Array.from({ length: current.count }, (_, index) => {
          const tens = faces[index * 2] % 10;
          const units = faces[index * 2 + 1] % 10;
          return tens * 10 + units || 100;
        })
        : faces;
      const total = rolls.reduce((sum, value) => sum + value, 0) + current.modifier;
      publishResult(rolls, total);
    } catch (error) {
      console.error("Nie udało się uruchomić kości 3D", error);
      const rolls = Array.from({ length: current.count }, () => randomDie(current.sides));
      const total = rolls.reduce((sum, value) => sum + value, 0) + current.modifier;
      showFallback("<strong>Tryb 3D jest niedostępny.</strong><span>Wynik został bezpiecznie wylosowany bez animacji.</span>", true);
      publishResult(rolls, total);
    } finally {
      virtual.disabled = false;
    }
  }

  launcher.addEventListener("click", () => prepare("1d20", "Własny rzut"));
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-roll]");
    if (trigger) prepare(trigger.dataset.roll, trigger.dataset.rollLabel || "Rzut kością");
  }, true);
  manual.addEventListener("click", showManual);
  virtual.addEventListener("click", rollVirtual);
  document.getElementById("customDiceBtn").addEventListener("click", () => {
    const count = Number(document.getElementById("diceCount").value);
    const sides = Number(document.getElementById("diceSides").value);
    const modifier = Number(document.getElementById("diceModifier").value);
    prepare(`${count}d${sides}${modifier >= 0 ? "+" : ""}${modifier}`, "Własny rzut");
  });
}
