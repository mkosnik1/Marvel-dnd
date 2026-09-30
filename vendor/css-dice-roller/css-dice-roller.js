var E = Object.defineProperty;
var x = (o, t, a) => t in o ? E(o, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : o[t] = a;
var l = (o, t, a) => x(o, typeof t != "symbol" ? t + "" : t, a);
const b = () => ({ faceCount: 4, faceTransforms: {
  4: [
    { type: "rotateX", value: -90 },
    { type: "rotateZ", value: 180 },
    { type: "translateZ", value: 20.412 },
    { type: "translateY", value: -14.433 }
  ],
  1: [{ type: "rotateY", value: 0 }, { type: "rotateX", value: 19.471 }, { type: "translateZ", value: 20.412 }, { type: "translateY", value: -14.433 }],
  2: [{ type: "rotateY", value: 120 }, { type: "rotateX", value: 19.471 }, { type: "translateZ", value: 20.412 }, { type: "translateY", value: -14.433 }],
  3: [{ type: "rotateY", value: 240 }, { type: "rotateX", value: 19.471 }, { type: "translateZ", value: 20.412 }, { type: "translateY", value: -14.433 }]
}, viewRotations: {
  4: { x: 90, y: 0, z: 180 },
  1: { x: -19.471, y: 0 },
  2: { x: -19.471, y: -120 },
  3: { x: -19.471, y: -240 }
} }), Y = () => ({ faceCount: 6, faceTransforms: {
  1: [{ type: "rotateY", value: 0 }, { type: "rotateX", value: 0 }, { type: "translateZ", value: 50 }],
  2: [{ type: "rotateY", value: 90 }, { type: "translateZ", value: 50 }],
  3: [{ type: "rotateY", value: 180 }, { type: "translateZ", value: 50 }],
  4: [{ type: "rotateY", value: 270 }, { type: "translateZ", value: 50 }],
  5: [{ type: "rotateX", value: 90 }, { type: "translateZ", value: 50 }],
  6: [{ type: "rotateX", value: -90 }, { type: "translateZ", value: 50 }]
}, viewRotations: {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: 0, y: -180 },
  4: { x: 0, y: -270 },
  5: { x: -90, y: 0 },
  6: { x: 90, y: 0 }
} }), w = () => {
  const e = {}, n = {};
  for (let s = 0; s < 4; s++) {
    const i = s * 90;
    e[s + 1] = [
      { type: "rotateY", value: i },
      { type: "rotateX", value: 35.264 },
      { type: "translateZ", value: 40.825 },
      { type: "translateY", value: -14.433 }
    ], n[s + 1] = { x: -35.264, y: -i }, e[s + 5] = [
      { type: "rotateY", value: i },
      { type: "rotateX", value: -35.264 },
      { type: "rotateZ", value: 180 },
      // Spin to point down
      { type: "translateZ", value: 40.825 },
      { type: "translateY", value: -14.433 }
    ], n[s + 5] = { x: 35.264, y: -i, z: 180 };
  }
  return { faceCount: 8, faceTransforms: e, viewRotations: n };
}, P = () => {
  const e = {}, n = {};
  e[1] = [
    { type: "rotateX", value: 90 },
    { type: "translateY", value: -5.02 },
    { type: "translateZ", value: 68.819 }
  ], n[1] = { x: -90, y: 0 }, e[2] = [
    { type: "rotateX", value: -90 },
    { type: "translateY", value: -5.02 },
    { type: "translateZ", value: 68.819 }
  ], n[2] = { x: 90, y: 0 };
  for (let s = 0; s < 5; s++) {
    const i = s * 72, r = i + 36;
    e[s + 3] = [
      { type: "rotateY", value: i },
      { type: "rotateX", value: 26.565 },
      { type: "rotateZ", value: 180 },
      { type: "translateY", value: -5.02 },
      { type: "translateZ", value: 68.819 }
    ], n[s + 3] = { x: -26.565, y: -i, z: 180 }, e[s + 8] = [
      { type: "rotateY", value: r },
      { type: "rotateX", value: -26.565 },
      { type: "translateY", value: -5.02 },
      { type: "translateZ", value: 68.819 }
    ], n[s + 8] = { x: 26.565, y: -r };
  }
  return { faceCount: 12, faceTransforms: e, viewRotations: n };
}, R = () => {
  const n = {}, s = {};
  for (let i = 0; i < 5; i++) {
    const r = i * 72, h = r + 36;
    n[i + 1] = [
      { type: "rotateY", value: r },
      { type: "rotateX", value: 52.622 },
      { type: "translateZ", value: 75.57 },
      { type: "translateY", value: -14.433 }
    ], s[i + 1] = { x: -52.622, y: -r }, n[i + 6] = [
      { type: "rotateY", value: r },
      { type: "rotateX", value: 10.812 },
      { type: "rotateZ", value: 180 },
      { type: "translateZ", value: 75.57 },
      { type: "translateY", value: -14.433 }
    ], s[i + 6] = { x: -10.812, y: -r, z: 180 }, n[i + 11] = [
      { type: "rotateY", value: h },
      { type: "rotateX", value: -10.812 },
      { type: "translateZ", value: 75.57 },
      { type: "translateY", value: -14.433 }
    ], s[i + 11] = { x: 10.812, y: -h }, n[i + 16] = [
      { type: "rotateY", value: h },
      { type: "rotateX", value: -52.622 },
      { type: "rotateZ", value: 180 },
      { type: "translateZ", value: 75.57 },
      { type: "translateY", value: -14.433 }
    ], s[i + 16] = { x: 52.622, y: -h, z: 180 };
  }
  return { faceCount: 20, faceTransforms: n, viewRotations: s };
}, C = () => {
  const o = {}, t = {};
  for (let s = 0; s < 5; s++) {
    const i = -s * 72;
    o[s + 1] = [
      { type: "rotateY", value: i },
      { type: "translateZ", value: 3 },
      { type: "translateY", value: -31 },
      { type: "rotateX", value: 45 }
    ], t[s + 1] = { x: -45, y: -i };
    const r = (s + 1) * 72;
    o[s + 6] = [
      { type: "rotateY", value: r },
      { type: "translateZ", value: -3 },
      { type: "translateY", value: 31 },
      { type: "rotateZ", value: 180 },
      { type: "rotateY", value: 180 },
      { type: "rotateX", value: 45 }
    ], t[s + 6] = { x: 45, y: -(r + 180) };
  }
  return { faceCount: 10, faceTransforms: o, viewRotations: t };
}, p = {
  d4: b(),
  d6: Y(),
  d8: w(),
  d10: C(),
  d12: P(),
  d20: R()
};
class X {
  constructor(t, a, e) {
    l(this, "element");
    l(this, "tumbleElement");
    l(this, "resultElement");
    l(this, "type");
    l(this, "settings");
    l(this, "currentResult");
    l(this, "dragElement");
    l(this, "manualRotation", { x: 0, y: 0 });
    l(this, "isDragging", !1);
    l(this, "startPointerPos", { x: 0, y: 0 });
    l(this, "dragThreshold", 5);
    // px
    l(this, "hasExceededThreshold", !1);
    if (!p[t])
      throw new Error(`Unsupported die type: ${t}`);
    this.type = t, this.settings = { ...e }, this.currentResult = 1, this.element = document.createElement("div"), this.element.className = `dice-wrapper ${t}`, this.tumbleElement = document.createElement("div"), this.tumbleElement.className = "dice-tumble", this.resultElement = document.createElement("div"), this.resultElement.className = "dice-result", this.dragElement = document.createElement("div"), this.dragElement.className = "dice-drag-container", this.dragElement.style.width = "100%", this.dragElement.style.height = "100%", this.dragElement.style.transformStyle = "preserve-3d", this.tumbleElement.appendChild(this.resultElement), this.dragElement.appendChild(this.tumbleElement), this.element.appendChild(this.dragElement), a.appendChild(this.element), this.setupEvents(), this.applySettings(), this.createFaces(), this.setResult(1);
  }
  setupEvents() {
    this.element.addEventListener("pointerdown", this.handlePointerDown.bind(this)), window.addEventListener("pointermove", this.handlePointerMove.bind(this)), window.addEventListener("pointerup", this.handlePointerUp.bind(this));
  }
  handlePointerDown(t) {
    this.settings.dragEnabled && (this.isDragging = !0, this.hasExceededThreshold = !1, this.startPointerPos = { x: t.clientX, y: t.clientY }, this.element.setPointerCapture(t.pointerId), this.dragElement.style.transition = "none", this.element.classList.add("is-dragging"));
  }
  handlePointerMove(t) {
    if (!this.isDragging || !this.settings.dragEnabled) return;
    const a = t.clientX - this.startPointerPos.x, e = t.clientY - this.startPointerPos.y;
    if (!this.hasExceededThreshold)
      if (Math.sqrt(a * a + e * e) > this.dragThreshold)
        this.hasExceededThreshold = !0;
      else
        return;
    const n = 0.5 * (150 / this.settings.scale), s = (this.manualRotation.x % 360 + 360) % 360, i = s > 90 && s < 270;
    this.manualRotation.y += (i ? -a : a) * n, this.manualRotation.x -= e * n, this.updateDragTransform(), this.startPointerPos = { x: t.clientX, y: t.clientY };
  }
  handlePointerUp() {
    this.isDragging && (this.isDragging = !1, this.element.classList.remove("is-dragging"), this.dragElement.style.transition = "");
  }
  updateDragTransform() {
    this.dragElement.style.transform = `rotateX(${this.manualRotation.x}deg) rotateY(${this.manualRotation.y}deg)`;
  }
  createFaces() {
    this.resultElement.innerHTML = "";
    const t = p[this.type], a = this.settings.scale / 200;
    let e = "";
    switch (this.type) {
      case "d4":
      case "d8":
      case "d20":
        e = "50,0 0,100 100,100";
        break;
      case "d6":
        e = "0,0 100,0 100,100 0,100";
        break;
      case "d10":
        e = "50,0 100,80.65 50,100 0,80.65";
        break;
      case "d12":
        e = "50,0 100,38.2 80.9,100 19.1,100 0,38.2";
        break;
    }
    for (let n = 1; n <= t.faceCount; n++) {
      const s = document.createElement("div");
      s.className = "die-face", s.setAttribute("data-face", n.toString());
      const i = document.createElement("div");
      i.className = "face-bg", s.appendChild(i);
      const r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      r.setAttribute("viewBox", "0 0 100 100"), r.setAttribute("preserveAspectRatio", "none"), r.setAttribute("overflow", "visible");
      const h = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      h.setAttribute("points", e), h.classList.add("face-shape"), r.appendChild(h), s.appendChild(r);
      const d = document.createElement("div");
      d.className = "face-content", this.updateFaceContent(d, n), s.appendChild(d);
      const m = t.faceTransforms[n] || [];
      let c = "";
      for (const u of m) {
        const y = u.value;
        switch (u.type) {
          case "rotateX":
            c += ` rotateX(${y}deg)`;
            break;
          case "rotateY":
            c += ` rotateY(${y}deg)`;
            break;
          case "rotateZ":
            c += ` rotateZ(${y}deg)`;
            break;
          case "translateZ":
            c += ` translateZ(${y * a}px)`;
            break;
          case "translateY":
            c += ` translateY(${y * a}px)`;
            break;
          case "translateX":
            c += ` translateX(${y * a}px)`;
            break;
          case "scale":
            c += ` scale(${y})`;
            break;
        }
      }
      c += " scale(1.01)", s.style.transform = c, this.resultElement.appendChild(s);
    }
  }
  async roll() {
    const t = Math.floor(Math.random() * p[this.type].faceCount) + 1;
    if (this.settings.animation === "none")
      return this.setResult(t), t;
    if (this.settings.randomizeAnimation) {
      const a = ["roll-standard", "roll-chaotic", "roll-float"], e = a[Math.floor(Math.random() * a.length)];
      this.element.style.setProperty("--dice-animation-name", e);
    } else
      this.element.style.setProperty("--dice-animation-name", `roll-${this.settings.animation}`);
    return this.settings.animation === "demo" && this.element.style.setProperty("--dice-animation-duration", "10s"), this.element.classList.add("is-rolling"), (this.manualRotation.x !== 0 || this.manualRotation.y !== 0) && (this.manualRotation = { x: 0, y: 0 }, this.dragElement.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)", this.updateDragTransform()), await new Promise((a) => setTimeout(a, this.settings.speed * 1e3)), this.settings.animation !== "demo" && this.element.classList.remove("is-rolling"), this.setResult(t), new Promise((a) => {
      let e = !1;
      const n = (i) => {
        i.target === this.resultElement && i.propertyName === "transform" && (e || (e = !0, this.resultElement.removeEventListener("transitionend", n), a(t)));
      }, s = setTimeout(() => {
        e || (e = !0, this.resultElement.removeEventListener("transitionend", n), a(t));
      }, 800);
      this.resultElement.addEventListener("transitionend", (i) => {
        n(i), e && clearTimeout(s);
      });
    });
  }
  setResult(t) {
    this.currentResult = t;
    const e = p[this.type].viewRotations[t];
    if (!e) {
      this.resultElement.style.transform = "rotateX(0deg) rotateY(0deg)";
      return;
    }
    let n = "";
    e.z && (n += `rotateZ(${-e.z}deg) `), n += `rotateX(${e.x}deg) rotateY(${e.y}deg)`, this.resultElement.style.transform = n;
  }
  updateSettings(t) {
    const a = this.settings.scale;
    this.settings = { ...this.settings, ...t }, this.applySettings(), t.scale !== void 0 && t.scale !== a ? (this.createFaces(), this.setResult(this.currentResult)) : t.faceLabels !== void 0 && this.resultElement.querySelectorAll(".die-face").forEach((n) => {
      const s = parseInt(n.getAttribute("data-face") || "0"), i = n.querySelector(".face-content");
      i && s > 0 && this.updateFaceContent(i, s);
    });
  }
  updateFaceContent(t, a) {
    var n;
    const e = (n = this.settings.faceLabels) == null ? void 0 : n[a];
    e !== void 0 ? t.innerHTML = e : t.textContent = a.toString();
  }
  applySettings() {
    this.element.style.setProperty("--dice-size", `${this.settings.scale}px`), this.element.style.setProperty("--dice-animation-duration", `${this.settings.speed}s`), this.element.style.setProperty("--dice-text-scale", `${this.settings.textScale ?? 1}`), Array.from(this.element.classList).forEach((t) => {
      t.startsWith("theme-") && this.element.classList.remove(t);
    }), this.element.classList.add(this.settings.theme), this.element.classList.toggle("drag-mode", this.settings.dragEnabled), this.settings.dragEnabled || (this.manualRotation = { x: 0, y: 0 }, this.updateDragTransform()), this.settings.baseColor && (this.element.style.setProperty("--dice-color", this.settings.baseColor), this.element.style.setProperty("--dice-color-glow", `${this.settings.baseColor}66`), this.element.style.setProperty("--dice-color-bright", this.settings.baseColor), this.element.style.setProperty("--dice-color-dark", this.settings.baseColor)), this.settings.secondaryColor && this.element.style.setProperty("--dice-secondary-color", this.settings.secondaryColor), this.settings.textColor && this.element.style.setProperty("--dice-text-color", this.settings.textColor), this.settings.animation === "demo" ? (this.element.style.setProperty("--dice-animation-name", "roll-demo"), this.element.style.setProperty("--dice-animation-duration", "10s"), this.element.classList.add("is-rolling")) : this.element.classList.remove("is-rolling"), this.element.classList.toggle("is-spinning-always", !!this.settings.constantSpin);
  }
  get result() {
    return this.currentResult;
  }
  setPosition(t, a, e) {
    this.element.style.position = "absolute", this.element.style.top = t, this.element.style.left = a, this.element.style.margin = "0", e && (this.element.style.transform = e);
  }
  resetPosition() {
    this.element.style.position = "", this.element.style.top = "", this.element.style.left = "", this.element.style.margin = "", this.element.style.transform = "";
  }
  remove() {
    this.element.remove();
  }
}
class M {
  constructor(t, a = 110) {
    l(this, "dice", []);
    l(this, "container");
    l(this, "settings");
    this.container = t, this.settings = {
      theme: "theme-glass",
      baseColor: "#10b981",
      scale: a,
      animation: "standard",
      layoutMode: "grid",
      randomizeAnimation: !1,
      constantSpin: !1,
      speed: 2.5,
      dragEnabled: !1,
      textScale: 1
    };
  }
  addDie(t, a = 1) {
    const e = [];
    for (let n = 0; n < a; n++) {
      const s = new X(t, this.container, this.settings);
      this.dice.push(s), e.push(s);
    }
    return this.rearrange(), e;
  }
  async rearrange() {
    const t = this.container.getBoundingClientRect(), a = t.width / 2, e = t.height / 2, n = this.dice.length, s = this.settings.scale;
    if (this.settings.layoutMode === "grid") {
      this.container.style.display = "flex", this.dice.forEach((i) => i.resetPosition());
      return;
    }
    if (this.container.style.display = "block", this.container.style.position = "relative", this.settings.layoutMode === "circle") {
      const i = Math.min(t.width, t.height) * 0.35;
      this.dice.forEach((r, h) => {
        const d = h / n * Math.PI * 2, m = a + Math.cos(d) * i - s / 2, c = e + Math.sin(d) * i - s / 2;
        r.setPosition(`${c}px`, `${m}px`);
      });
    } else this.settings.layoutMode === "pool" && this.dice.forEach((i, r) => {
      const h = (1 + Math.sqrt(5)) / 2, d = r + 1, c = Math.sqrt(d) * s * 0.6, u = d * 2 * Math.PI / (h * h), y = a + Math.cos(u) * c - s / 2, g = e + Math.sin(u) * c - s / 2, v = (Math.sin(d * 13) * 10).toFixed(1), f = (Math.cos(d * 17) * 10).toFixed(1);
      i.setPosition(`${g}px`, `${y}px`, `rotateX(${v}deg) rotateY(${f}deg)`);
    });
  }
  clear() {
    this.dice.forEach((t) => {
      try {
        t.remove();
      } catch (a) {
        console.error("Error removing die:", a);
      }
    }), this.dice = [], this.container.innerHTML = "";
  }
  async rollAll() {
    if (this.dice.length === 0) return [];
    const t = this.dice.map((a) => a.roll());
    try {
      return await Promise.all(t);
    } catch (a) {
      return console.error("Error rolling dice:", a), this.dice.map((e) => e.result);
    }
  }
  updateSettings(t) {
    const a = this.settings.layoutMode, e = this.settings.scale;
    this.settings = { ...this.settings, ...t }, this.dice.forEach((n) => n.updateSettings(t)), (this.settings.layoutMode !== a || this.settings.scale !== e) && this.rearrange();
  }
  getSettings() {
    return { ...this.settings };
  }
  getDiceCount() {
    return this.dice.length;
  }
}
export {
  M as DiceRoller,
  X as Die,
  p as GEOMETRIES
};
