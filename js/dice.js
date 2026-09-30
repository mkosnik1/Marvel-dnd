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
  const result = document.getElementById("diceResult");
  const manual = document.getElementById("manualRollBtn");
  const virtual = document.getElementById("virtualRollBtn");
  let current = { count: 1, sides: 20, modifier: 0 };
  let currentLabel = "Własny rzut";

  function prepare(expression, label = "Rzut kością") {
    current = parseExpression(expression) || { count: 1, sides: 20, modifier: 0 };
    currentLabel = label;
    title.textContent = label;
    instruction.textContent = `Rzuć ${formatExpression(current)}. Możesz użyć własnych kości albo wykonać rzut tutaj.`;
    stage.innerHTML = "";
    result.textContent = "";
    if (!dialog.open) dialog.showModal();
  }

  function showManual() {
    stage.innerHTML = `<div class="manual-card"><strong>${formatExpression(current)}</strong><span>Rzuć ${current.count === 1 ? `kością k${current.sides}` : `${current.count} kośćmi k${current.sides}`} i ${current.modifier > 0 ? `dodaj ${current.modifier}` : current.modifier < 0 ? `odejmij ${Math.abs(current.modifier)}` : "nie dodawaj modyfikatora"}.</span></div>`;
    result.textContent = "Rzut rozstrzygasz przy stole.";
  }

  function rollVirtual() {
    const rolls = Array.from({ length: current.count }, () => randomDie(current.sides));
    stage.innerHTML = rolls.map((value, index) => `<div class="flying-die" style="--i:${index}" aria-label="Wynik ${value} na kości k${current.sides}"><span>k${current.sides}</span><strong>${value}</strong></div>`).join("");
    result.textContent = "Kości lecą…";
    window.setTimeout(() => {
      const subtotal = rolls.reduce((sum, value) => sum + value, 0);
      const total = subtotal + current.modifier;
      result.innerHTML = `<span>${rolls.join(" + ")}${current.modifier ? ` ${current.modifier > 0 ? "+" : "−"} ${Math.abs(current.modifier)}` : ""}</span><strong>${total}</strong>`;
      window.dispatchEvent(new CustomEvent("marvel:dice-roll", { detail: { label: currentLabel, expression: formatExpression(current), rolls, total } }));
    }, 900);
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
