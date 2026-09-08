const FIXES = [
  ["psychicznez", "psychicz"],
  ["magiaz", "magicz"],
  ["krazntrac", "koncentrac"],
  ["komórka mocya", "komórki mocy"],
  ["komórka mocyu", "komórki mocy"],
  ["komórka mocyów", "komórek mocy"],
  ["Rękawica uderzeniowas", "Rękawice uderzeniowe"],
  ["Disprzewaga", "utrudnienie"]
];

function fix(value) {
  let text = String(value ?? "");
  for (const [from, to] of FIXES) text = text.split(from).join(to);
  return text;
}

export function cleanupRenderedCard(...roots) {
  for (const root of roots) {
    if (!root) continue;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) node.nodeValue = fix(node.nodeValue);
    root.querySelectorAll("[data-tip]").forEach(element => {
      element.dataset.tip = fix(element.dataset.tip);
    });
    root.querySelectorAll("[title]").forEach(element => {
      element.title = fix(element.title);
    });
  }
}
