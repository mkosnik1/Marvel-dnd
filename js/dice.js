const DICE_RE = /(\d*)[dk](\d+)(?:\s*([+-])\s*(\d+))?/i;
const DICE_COLOR = "#e23636";
const DICE_BASE_URL = "https://unpkg.com/@3d-dice/dice-box@1.1.4/dist/";

function parseExpression(value) {
  const match = String(value || "").replace(/\s/g, "").match(DICE_RE);
  if (!match) return null;
  return {
    count: Math.max(1, Math.min(12, Number(match[1] || 1))),
    sides: Math.max(2, Math.min(100, Number(match[2]))),
    modifier: (match[3] === "-" ? -1 : 1) * Number(match[4] || 0)
  };
}

function notation({ count, sides, modifier }) {
  return `${count}d${sides}${modifier > 0 ? `+${modifier}` : modifier < 0 ? modifier : ""}`;
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
  let diceBoxPromise;

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

  async function getDiceBox() {
    if (!diceBoxPromise) {
      stage.classList.add("is-loading");
      diceBoxPromise = (async () => {
        const { default: DiceBox } = await import(`${DICE_BASE_URL}dice-box.es.min.js`);
        const box = new DiceBox({
          container: "#diceBox",
          origin: DICE_BASE_URL,
          assetPath: "assets/",
          theme: "default",
          themeColor: DICE_COLOR,
          offscreen: false,
          scale: 5,
          gravity: 1.15,
          throwForce: 6,
          spinForce: 5,
          lightIntensity: 1.2,
          shadowTransparency: 0.72
        });
        await box.init();
        if (!surface.querySelector("canvas")) throw new Error("WebGL jest niedostępny.");
        return box;
      })().catch(error => {
        diceBoxPromise = undefined;
        throw error;
      }).finally(() => stage.classList.remove("is-loading"));
    }
    return diceBoxPromise;
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
    result.textContent = "Ładowanie stołu 3D…";
    showSurface();
    try {
      const box = await getDiceBox();
      result.textContent = "Kości lecą…";
      await box.roll(notation(current), { themeColor: DICE_COLOR });
      const groups = box.getRollResults();
      const rolls = groups.flatMap(group => group.rolls.map(die => Number(die.value)));
      const total = groups.reduce((sum, group) => sum + Number(group.value), 0);
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
