import DiceBox from "../vendor/dice-box/dice-box-threejs.es.js";

const DICE_RE = /(\d*)[dk](\d+)(?:\s*([+-])\s*(\d+))?/i;

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

function libraryExpression({ count, sides, modifier }) {
  return `${count}d${sides}${modifier > 0 ? `+${modifier}` : modifier < 0 ? `${modifier}` : ""}`;
}

export function initDiceRoller() {
  const dialog = document.getElementById("diceDialog");
  const launcher = document.getElementById("diceLauncher");
  const title = document.getElementById("diceTitle");
  const instruction = document.getElementById("diceInstruction");
  const stage = document.getElementById("diceStage");
  const result = document.getElementById("diceResult");
  const manual = document.getElementById("manualRollBtn");
  const virtual = document.getElementById("virtualRollBtn");
  let current = { count: 1, sides: 20, modifier: 0 };
  let currentLabel = "Własny rzut";
  let diceBox;
  let diceBoxReady;

  function ensureDiceBox() {
    if (!diceBoxReady) {
      diceBox = new DiceBox("#diceCanvas", {
        assetPath: new URL("../vendor/dice-box/", import.meta.url).href,
        sounds: false,
        shadows: true,
        theme_surface: "green-felt",
        theme_colorset: "white",
        theme_customColorset: {
          name: "Marvel",
          foreground: "#f8fbff",
          background: "#214a78",
          outline: "#86c2ff",
          texture: "none"
        },
        theme_material: "plastic",
        onRollComplete: onRollComplete
      });
      diceBoxReady = diceBox.initialize().catch(error => {
        diceBoxReady = undefined;
        throw error;
      });
    }
    return diceBoxReady;
  }

  function prepare(expression, label = "Rzut kością") {
    current = parseExpression(expression) || { count: 1, sides: 20, modifier: 0 };
    currentLabel = label;
    title.textContent = label;
    instruction.textContent = `Rzuć ${formatExpression(current)}. Możesz użyć własnych kości albo wykonać rzut tutaj.`;
    stage.classList.remove("is-rolling");
    if (diceBox?.initialized) diceBox.clearDice();
    result.textContent = "";
    if (!dialog.open) dialog.showModal();
  }

  function showManual() {
    stage.classList.remove("is-rolling");
    if (diceBox?.initialized) diceBox.clearDice();
    result.textContent = "Rzut rozstrzygasz przy stole.";
  }

  function onRollComplete(data) {
    const rolls = data.sets.flatMap(set => set.rolls.map(roll => roll.value));
    result.innerHTML = `<span>${rolls.join(" + ")}${current.modifier ? ` ${current.modifier > 0 ? "+" : "−"} ${Math.abs(current.modifier)}` : ""}</span><strong>${data.total}</strong>`;
    stage.classList.remove("is-rolling");
    virtual.disabled = false;
    window.dispatchEvent(new CustomEvent("marvel:dice-roll", {
      detail: { label: currentLabel, expression: formatExpression(current), rolls, total: data.total }
    }));
  }

  async function rollVirtual() {
    virtual.disabled = true;
    result.textContent = "Przygotowuję stół…";
    stage.classList.add("is-rolling");
    try {
      await ensureDiceBox();
      result.textContent = "Kości lecą…";
      await diceBox.roll(libraryExpression(current));
    } catch (error) {
      console.error("Dice roller failed:", error);
      stage.classList.remove("is-rolling");
      virtual.disabled = false;
      result.textContent = "Nie udało się uruchomić rzutu. Spróbuj ponownie albo rzuć ręcznie.";
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
