var Io = Object.defineProperty;
var Ls = Object.getOwnPropertySymbols;
var Oo = Object.prototype.hasOwnProperty,
  Mo = Object.prototype.propertyIsEnumerable;
var Is = (e, t, n) =>
    t in e
      ? Io(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Os = (e, t) => {
    for (var n in t || (t = {})) Oo.call(t, n) && Is(e, n, t[n]);
    if (Ls) for (var n of Ls(t)) Mo.call(t, n) && Is(e, n, t[n]);
    return e;
  };
function es(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const Fo =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ro = es(Fo);
function pr(e) {
  return !!e || e === "";
}
function ts(e) {
  if (F(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = he(s) ? Ho(s) : ts(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else {
    if (he(e)) return e;
    if (ae(e)) return e;
  }
}
const So = /;(?![^(]*\))/g,
  No = /:(.+)/;
function Ho(e) {
  const t = {};
  return (
    e.split(So).forEach((n) => {
      if (n) {
        const s = n.split(No);
        s.length > 1 && (t[s[0].trim()] = s[1].trim());
      }
    }),
    t
  );
}
function ct(e) {
  let t = "";
  if (he(e)) t = e;
  else if (F(e))
    for (let n = 0; n < e.length; n++) {
      const s = ct(e[n]);
      s && (t += s + " ");
    }
  else if (ae(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const be = (e) =>
    he(e)
      ? e
      : e == null
      ? ""
      : F(e) || (ae(e) && (e.toString === vr || !H(e.toString)))
      ? JSON.stringify(e, _r, 2)
      : String(e),
  _r = (e, t) =>
    t && t.__v_isRef
      ? _r(e, t.value)
      : mt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : gr(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ae(t) && !F(t) && !br(t)
      ? String(t)
      : t,
  Q = {},
  gt = [],
  Oe = () => {},
  Bo = () => !1,
  Uo = /^on[^a-z]/,
  Wt = (e) => Uo.test(e),
  ns = (e) => e.startsWith("onUpdate:"),
  xe = Object.assign,
  ss = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  jo = Object.prototype.hasOwnProperty,
  q = (e, t) => jo.call(e, t),
  F = Array.isArray,
  mt = (e) => vn(e) === "[object Map]",
  gr = (e) => vn(e) === "[object Set]",
  H = (e) => typeof e == "function",
  he = (e) => typeof e == "string",
  rs = (e) => typeof e == "symbol",
  ae = (e) => e !== null && typeof e == "object",
  mr = (e) => ae(e) && H(e.then) && H(e.catch),
  vr = Object.prototype.toString,
  vn = (e) => vr.call(e),
  Do = (e) => vn(e).slice(8, -1),
  br = (e) => vn(e) === "[object Object]",
  os = (e) =>
    he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Lt = es(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  bn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Ko = /-(\w)/g,
  Ne = bn((e) => e.replace(Ko, (t, n) => (n ? n.toUpperCase() : ""))),
  Wo = /\B([A-Z])/g,
  yt = bn((e) => e.replace(Wo, "-$1").toLowerCase()),
  xn = bn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Fn = bn((e) => (e ? `on${xn(e)}` : "")),
  Nt = (e, t) => !Object.is(e, t),
  Rn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  nn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  qo = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Ms;
const zo = () =>
  Ms ||
  (Ms =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
let Ue;
class Vo {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        Ue &&
        ((this.parent = Ue),
        (this.index = (Ue.scopes || (Ue.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active)
      try {
        return (Ue = this), t();
      } finally {
        Ue = this.parent;
      }
  }
  on() {
    Ue = this;
  }
  off() {
    Ue = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      this.active = !1;
    }
  }
}
function Jo(e, t = Ue) {
  t && t.active && t.effects.push(e);
}
const is = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  xr = (e) => (e.w & Ge) > 0,
  yr = (e) => (e.n & Ge) > 0,
  Yo = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ge;
  },
  Xo = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        xr(r) && !yr(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~Ge),
          (r.n &= ~Ge);
      }
      t.length = n;
    }
  },
  jn = new WeakMap();
let Pt = 0,
  Ge = 1;
const Dn = 30;
let Se;
const rt = Symbol(""),
  Kn = Symbol("");
class ls {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Jo(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Se,
      n = Ze;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Se),
        (Se = this),
        (Ze = !0),
        (Ge = 1 << ++Pt),
        Pt <= Dn ? Yo(this) : Fs(this),
        this.fn()
      );
    } finally {
      Pt <= Dn && Xo(this),
        (Ge = 1 << --Pt),
        (Se = this.parent),
        (Ze = n),
        (this.parent = void 0);
    }
  }
  stop() {
    this.active && (Fs(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Fs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Ze = !0;
const wr = [];
function wt() {
  wr.push(Ze), (Ze = !1);
}
function $t() {
  const e = wr.pop();
  Ze = e === void 0 ? !0 : e;
}
function Ee(e, t, n) {
  if (Ze && Se) {
    let s = jn.get(e);
    s || jn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = is())), $r(r);
  }
}
function $r(e, t) {
  let n = !1;
  Pt <= Dn ? yr(e) || ((e.n |= Ge), (n = !xr(e))) : (n = !e.has(Se)),
    n && (e.add(Se), Se.deps.push(e));
}
function Ke(e, t, n, s, r, o) {
  const i = jn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && F(e))
    i.forEach((u, f) => {
      (f === "length" || f >= s) && l.push(u);
    });
  else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        F(e)
          ? os(n) && l.push(i.get("length"))
          : (l.push(i.get(rt)), mt(e) && l.push(i.get(Kn)));
        break;
      case "delete":
        F(e) || (l.push(i.get(rt)), mt(e) && l.push(i.get(Kn)));
        break;
      case "set":
        mt(e) && l.push(i.get(rt));
        break;
    }
  if (l.length === 1) l[0] && Wn(l[0]);
  else {
    const u = [];
    for (const f of l) f && u.push(...f);
    Wn(is(u));
  }
}
function Wn(e, t) {
  for (const n of F(e) ? e : [...e])
    (n !== Se || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const Zo = es("__proto__,__v_isRef,__isVue"),
  kr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(rs)
  ),
  Qo = cs(),
  Go = cs(!1, !0),
  ei = cs(!0),
  Rs = ti();
function ti() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = z(this);
        for (let o = 0, i = this.length; o < i; o++) Ee(s, "get", o + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(z)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        wt();
        const s = z(this)[t].apply(this, n);
        return $t(), s;
      };
    }),
    e
  );
}
function cs(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && o === (e ? (t ? mi : Ar) : t ? Pr : Tr).get(s))
      return s;
    const i = F(s);
    if (!e && i && q(Rs, r)) return Reflect.get(Rs, r, o);
    const l = Reflect.get(s, r, o);
    return (rs(r) ? kr.has(r) : Zo(r)) || (e || Ee(s, "get", r), t)
      ? l
      : de(l)
      ? !i || !os(r)
        ? l.value
        : l
      : ae(l)
      ? e
        ? Lr(l)
        : wn(l)
      : l;
  };
}
const ni = Cr(),
  si = Cr(!0);
function Cr(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (Ht(i) && de(i) && !de(r)) return !1;
    if (
      !e &&
      !Ht(r) &&
      (Ir(r) || ((r = z(r)), (i = z(i))), !F(n) && de(i) && !de(r))
    )
      return (i.value = r), !0;
    const l = F(n) && os(s) ? Number(s) < n.length : q(n, s),
      u = Reflect.set(n, s, r, o);
    return (
      n === z(o) && (l ? Nt(r, i) && Ke(n, "set", s, r) : Ke(n, "add", s, r)), u
    );
  };
}
function ri(e, t) {
  const n = q(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ke(e, "delete", t, void 0), s;
}
function oi(e, t) {
  const n = Reflect.has(e, t);
  return (!rs(t) || !kr.has(t)) && Ee(e, "has", t), n;
}
function ii(e) {
  return Ee(e, "iterate", F(e) ? "length" : rt), Reflect.ownKeys(e);
}
const Er = { get: Qo, set: ni, deleteProperty: ri, has: oi, ownKeys: ii },
  li = {
    get: ei,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  ci = xe({}, Er, { get: Go, set: si }),
  us = (e) => e,
  yn = (e) => Reflect.getPrototypeOf(e);
function Jt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = z(e),
    o = z(t);
  t !== o && !n && Ee(r, "get", t), !n && Ee(r, "get", o);
  const { has: i } = yn(r),
    l = s ? us : n ? ds : Bt;
  if (i.call(r, t)) return l(e.get(t));
  if (i.call(r, o)) return l(e.get(o));
  e !== r && e.get(t);
}
function Yt(e, t = !1) {
  const n = this.__v_raw,
    s = z(n),
    r = z(e);
  return (
    e !== r && !t && Ee(s, "has", e),
    !t && Ee(s, "has", r),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function Xt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ee(z(e), "iterate", rt), Reflect.get(e, "size", e)
  );
}
function Ss(e) {
  e = z(e);
  const t = z(this);
  return yn(t).has.call(t, e) || (t.add(e), Ke(t, "add", e, e)), this;
}
function Ns(e, t) {
  t = z(t);
  const n = z(this),
    { has: s, get: r } = yn(n);
  let o = s.call(n, e);
  o || ((e = z(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? Nt(t, i) && Ke(n, "set", e, t) : Ke(n, "add", e, t), this
  );
}
function Hs(e) {
  const t = z(this),
    { has: n, get: s } = yn(t);
  let r = n.call(t, e);
  r || ((e = z(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && Ke(t, "delete", e, void 0), o;
}
function Bs() {
  const e = z(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Ke(e, "clear", void 0, void 0), n;
}
function Zt(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      l = z(i),
      u = t ? us : e ? ds : Bt;
    return (
      !e && Ee(l, "iterate", rt), i.forEach((f, h) => s.call(r, u(f), u(h), o))
    );
  };
}
function Qt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = z(r),
      i = mt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      u = e === "keys" && i,
      f = r[e](...s),
      h = n ? us : t ? ds : Bt;
    return (
      !t && Ee(o, "iterate", u ? Kn : rt),
      {
        next() {
          const { value: v, done: w } = f.next();
          return w
            ? { value: v, done: w }
            : { value: l ? [h(v[0]), h(v[1])] : h(v), done: w };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ve(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function ui() {
  const e = {
      get(o) {
        return Jt(this, o);
      },
      get size() {
        return Xt(this);
      },
      has: Yt,
      add: Ss,
      set: Ns,
      delete: Hs,
      clear: Bs,
      forEach: Zt(!1, !1),
    },
    t = {
      get(o) {
        return Jt(this, o, !1, !0);
      },
      get size() {
        return Xt(this);
      },
      has: Yt,
      add: Ss,
      set: Ns,
      delete: Hs,
      clear: Bs,
      forEach: Zt(!1, !0),
    },
    n = {
      get(o) {
        return Jt(this, o, !0);
      },
      get size() {
        return Xt(this, !0);
      },
      has(o) {
        return Yt.call(this, o, !0);
      },
      add: Ve("add"),
      set: Ve("set"),
      delete: Ve("delete"),
      clear: Ve("clear"),
      forEach: Zt(!0, !1),
    },
    s = {
      get(o) {
        return Jt(this, o, !0, !0);
      },
      get size() {
        return Xt(this, !0);
      },
      has(o) {
        return Yt.call(this, o, !0);
      },
      add: Ve("add"),
      set: Ve("set"),
      delete: Ve("delete"),
      clear: Ve("clear"),
      forEach: Zt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Qt(o, !1, !1)),
        (n[o] = Qt(o, !0, !1)),
        (t[o] = Qt(o, !1, !0)),
        (s[o] = Qt(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [ai, fi, di, hi] = ui();
function as(e, t) {
  const n = t ? (e ? hi : di) : e ? fi : ai;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(q(n, r) && r in s ? n : s, r, o);
}
const pi = { get: as(!1, !1) },
  _i = { get: as(!1, !0) },
  gi = { get: as(!0, !1) },
  Tr = new WeakMap(),
  Pr = new WeakMap(),
  Ar = new WeakMap(),
  mi = new WeakMap();
function vi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function bi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : vi(Do(e));
}
function wn(e) {
  return Ht(e) ? e : fs(e, !1, Er, pi, Tr);
}
function xi(e) {
  return fs(e, !1, ci, _i, Pr);
}
function Lr(e) {
  return fs(e, !0, li, gi, Ar);
}
function fs(e, t, n, s, r) {
  if (!ae(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = bi(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return r.set(e, l), l;
}
function vt(e) {
  return Ht(e) ? vt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ht(e) {
  return !!(e && e.__v_isReadonly);
}
function Ir(e) {
  return !!(e && e.__v_isShallow);
}
function Or(e) {
  return vt(e) || Ht(e);
}
function z(e) {
  const t = e && e.__v_raw;
  return t ? z(t) : e;
}
function It(e) {
  return nn(e, "__v_skip", !0), e;
}
const Bt = (e) => (ae(e) ? wn(e) : e),
  ds = (e) => (ae(e) ? Lr(e) : e);
function Mr(e) {
  Ze && Se && ((e = z(e)), $r(e.dep || (e.dep = is())));
}
function Fr(e, t) {
  (e = z(e)), e.dep && Wn(e.dep);
}
function de(e) {
  return !!(e && e.__v_isRef === !0);
}
function $n(e) {
  return Rr(e, !1);
}
function yi(e) {
  return Rr(e, !0);
}
function Rr(e, t) {
  return de(e) ? e : new wi(e, t);
}
class wi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : z(t)),
      (this._value = n ? t : Bt(t));
  }
  get value() {
    return Mr(this), this._value;
  }
  set value(t) {
    (t = this.__v_isShallow ? t : z(t)),
      Nt(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : Bt(t)),
        Fr(this));
  }
}
function k(e) {
  return de(e) ? e.value : e;
}
const $i = {
  get: (e, t, n) => k(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return de(r) && !de(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Sr(e) {
  return vt(e) ? e : new Proxy(e, $i);
}
function Nr(e) {
  const t = F(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Ci(e, n);
  return t;
}
class ki {
  constructor(t, n, s) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function Ci(e, t, n) {
  const s = e[t];
  return de(s) ? s : new ki(e, t, n);
}
class Ei {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new ls(t, () => {
        this._dirty || ((this._dirty = !0), Fr(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = z(this);
    return (
      Mr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Ti(e, t, n = !1) {
  let s, r;
  const o = H(e);
  return (
    o ? ((s = e), (r = Oe)) : ((s = e.get), (r = e.set)),
    new Ei(s, r, o || !r, n)
  );
}
Promise.resolve();
function Qe(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    kn(o, t, n);
  }
  return r;
}
function Me(e, t, n, s) {
  if (H(e)) {
    const o = Qe(e, t, n, s);
    return (
      o &&
        mr(o) &&
        o.catch((i) => {
          kn(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(Me(e[o], t, n, s));
  return r;
}
function kn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let h = 0; h < f.length; h++) if (f[h](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Qe(u, null, 10, [e, i, l]);
      return;
    }
  }
  Pi(e, n, r, s);
}
function Pi(e, t, n, s = !0) {
  console.error(e);
}
let sn = !1,
  qn = !1;
const Ce = [];
let De = 0;
const Ot = [];
let At = null,
  ht = 0;
const Mt = [];
let Ye = null,
  pt = 0;
const Hr = Promise.resolve();
let hs = null,
  zn = null;
function Br(e) {
  const t = hs || Hr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ai(e) {
  let t = De + 1,
    n = Ce.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    Ut(Ce[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function Ur(e) {
  (!Ce.length || !Ce.includes(e, sn && e.allowRecurse ? De + 1 : De)) &&
    e !== zn &&
    (e.id == null ? Ce.push(e) : Ce.splice(Ai(e.id), 0, e), jr());
}
function jr() {
  !sn && !qn && ((qn = !0), (hs = Hr.then(Kr)));
}
function Li(e) {
  const t = Ce.indexOf(e);
  t > De && Ce.splice(t, 1);
}
function Dr(e, t, n, s) {
  F(e)
    ? n.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? s + 1 : s)) && n.push(e),
    jr();
}
function Ii(e) {
  Dr(e, At, Ot, ht);
}
function Oi(e) {
  Dr(e, Ye, Mt, pt);
}
function ps(e, t = null) {
  if (Ot.length) {
    for (
      zn = t, At = [...new Set(Ot)], Ot.length = 0, ht = 0;
      ht < At.length;
      ht++
    )
      At[ht]();
    (At = null), (ht = 0), (zn = null), ps(e, t);
  }
}
function rn(e) {
  if (Mt.length) {
    const t = [...new Set(Mt)];
    if (((Mt.length = 0), Ye)) {
      Ye.push(...t);
      return;
    }
    for (Ye = t, Ye.sort((n, s) => Ut(n) - Ut(s)), pt = 0; pt < Ye.length; pt++)
      Ye[pt]();
    (Ye = null), (pt = 0);
  }
}
const Ut = (e) => (e.id == null ? 1 / 0 : e.id);
function Kr(e) {
  (qn = !1), (sn = !0), ps(e), Ce.sort((n, s) => Ut(n) - Ut(s));
  const t = Oe;
  try {
    for (De = 0; De < Ce.length; De++) {
      const n = Ce[De];
      n && n.active !== !1 && Qe(n, null, 14);
    }
  } finally {
    (De = 0),
      (Ce.length = 0),
      rn(),
      (sn = !1),
      (hs = null),
      (Ce.length || Ot.length || Mt.length) && Kr(e);
  }
}
function Mi(e, t, ...n) {
  const s = e.vnode.props || Q;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const h = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: v, trim: w } = s[h] || Q;
    w ? (r = n.map((P) => P.trim())) : v && (r = n.map(qo));
  }
  let l,
    u = s[(l = Fn(t))] || s[(l = Fn(Ne(t)))];
  !u && o && (u = s[(l = Fn(yt(t)))]), u && Me(u, e, 6, r);
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Me(f, e, 6, r);
  }
}
function Wr(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!H(e)) {
    const u = (f) => {
      const h = Wr(f, t, !0);
      h && ((l = !0), xe(i, h));
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !o && !l
    ? (s.set(e, null), null)
    : (F(o) ? o.forEach((u) => (i[u] = null)) : xe(i, o), s.set(e, i), i);
}
function _s(e, t) {
  return !e || !Wt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      q(e, t[0].toLowerCase() + t.slice(1)) || q(e, yt(t)) || q(e, t));
}
let Ie = null,
  Cn = null;
function on(e) {
  const t = Ie;
  return (Ie = e), (Cn = (e && e.type.__scopeId) || null), t;
}
function qr(e) {
  Cn = e;
}
function zr() {
  Cn = null;
}
function je(e, t = Ie, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && Ys(-1);
    const o = on(t),
      i = e(...r);
    return on(o), s._d && Ys(1), i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Sn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: u,
    emit: f,
    render: h,
    renderCache: v,
    data: w,
    setupState: P,
    ctx: M,
    inheritAttrs: V,
  } = e;
  let g, y;
  const K = on(e);
  try {
    if (n.shapeFlag & 4) {
      const B = r || s;
      (g = Le(h.call(B, B, v, o, P, w, M))), (y = u);
    } else {
      const B = t;
      (g = Le(
        B.length > 1 ? B(o, { attrs: u, slots: l, emit: f }) : B(o, null)
      )),
        (y = t.props ? u : Fi(u));
    }
  } catch (B) {
    (St.length = 0), kn(B, e, 1), (g = N(We));
  }
  let I = g;
  if (y && V !== !1) {
    const B = Object.keys(y),
      { shapeFlag: X } = I;
    B.length && X & 7 && (i && B.some(ns) && (y = Ri(y, i)), (I = Dt(I, y)));
  }
  return (
    n.dirs && (I.dirs = I.dirs ? I.dirs.concat(n.dirs) : n.dirs),
    n.transition && (I.transition = n.transition),
    (g = I),
    on(K),
    g
  );
}
const Fi = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Wt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ri = (e, t) => {
    const n = {};
    for (const s in e) (!ns(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Si(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: u } = t,
    f = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return s ? Us(s, i, f) : !!i;
    if (u & 8) {
      const h = t.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        const w = h[v];
        if (i[w] !== s[w] && !_s(f, w)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? Us(s, i, f)
        : !0
      : !!i;
  return !1;
}
function Us(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !_s(n, o)) return !0;
  }
  return !1;
}
function Ni({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Hi = (e) => e.__isSuspense;
function Vr(e, t) {
  t && t.pendingBranch
    ? F(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Oi(e);
}
function Bi(e, t) {
  if (pe) {
    let n = pe.provides;
    const s = pe.parent && pe.parent.provides;
    s === n && (n = pe.provides = Object.create(s)), (n[e] = t);
  }
}
function Ft(e, t, n = !1) {
  const s = pe || Ie;
  if (s) {
    const r =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && H(t) ? t.call(s.proxy) : t;
  }
}
function Jr(e, t) {
  return gs(e, null, t);
}
const js = {};
function ot(e, t, n) {
  return gs(e, t, n);
}
function gs(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = Q
) {
  const l = pe;
  let u,
    f = !1,
    h = !1;
  if (
    (de(e)
      ? ((u = () => e.value), (f = Ir(e)))
      : vt(e)
      ? ((u = () => e), (s = !0))
      : F(e)
      ? ((h = !0),
        (f = e.some(vt)),
        (u = () =>
          e.map((y) => {
            if (de(y)) return y.value;
            if (vt(y)) return _t(y);
            if (H(y)) return Qe(y, l, 2);
          })))
      : H(e)
      ? t
        ? (u = () => Qe(e, l, 2))
        : (u = () => {
            if (!(l && l.isUnmounted)) return v && v(), Me(e, l, 3, [w]);
          })
      : (u = Oe),
    t && s)
  ) {
    const y = u;
    u = () => _t(y());
  }
  let v,
    w = (y) => {
      v = g.onStop = () => {
        Qe(y, l, 4);
      };
    };
  if (Kt)
    return (w = Oe), t ? n && Me(t, l, 3, [u(), h ? [] : void 0, w]) : u(), Oe;
  let P = h ? [] : js;
  const M = () => {
    if (!!g.active)
      if (t) {
        const y = g.run();
        (s || f || (h ? y.some((K, I) => Nt(K, P[I])) : Nt(y, P))) &&
          (v && v(), Me(t, l, 3, [y, P === js ? void 0 : P, w]), (P = y));
      } else g.run();
  };
  M.allowRecurse = !!t;
  let V;
  r === "sync"
    ? (V = M)
    : r === "post"
    ? (V = () => $e(M, l && l.suspense))
    : (V = () => {
        !l || l.isMounted ? Ii(M) : M();
      });
  const g = new ls(u, V);
  return (
    t
      ? n
        ? M()
        : (P = g.run())
      : r === "post"
      ? $e(g.run.bind(g), l && l.suspense)
      : g.run(),
    () => {
      g.stop(), l && l.scope && ss(l.scope.effects, g);
    }
  );
}
function Ui(e, t, n) {
  const s = this.proxy,
    r = he(e) ? (e.includes(".") ? Yr(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  H(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = pe;
  bt(this);
  const l = gs(r, o.bind(s), n);
  return i ? bt(i) : lt(), l;
}
function Yr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function _t(e, t) {
  if (!ae(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), de(e))) _t(e.value, t);
  else if (F(e)) for (let n = 0; n < e.length; n++) _t(e[n], t);
  else if (gr(e) || mt(e))
    e.forEach((n) => {
      _t(n, t);
    });
  else if (br(e)) for (const n in e) _t(e[n], t);
  return e;
}
function ie(e) {
  return H(e) ? { setup: e, name: e.name } : e;
}
const ln = (e) => !!e.type.__asyncLoader,
  Xr = (e) => e.type.__isKeepAlive;
function ji(e, t) {
  Zr(e, "a", t);
}
function Di(e, t) {
  Zr(e, "da", t);
}
function Zr(e, t, n = pe) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((En(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Xr(r.parent.vnode) && Ki(s, t, n, r), (r = r.parent);
  }
}
function Ki(e, t, n, s) {
  const r = En(t, e, s, !0);
  Tn(() => {
    ss(s[t], r);
  }, n);
}
function En(e, t, n = pe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          wt(), bt(n);
          const l = Me(t, n, e, i);
          return lt(), $t(), l;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const qe =
    (e) =>
    (t, n = pe) =>
      (!Kt || e === "sp") && En(e, t, n),
  Wi = qe("bm"),
  kt = qe("m"),
  qi = qe("bu"),
  Qr = qe("u"),
  zi = qe("bum"),
  Tn = qe("um"),
  Vi = qe("sp"),
  Ji = qe("rtg"),
  Yi = qe("rtc");
function Xi(e, t = pe) {
  En("ec", e, t);
}
let Vn = !0;
function Zi(e) {
  const t = eo(e),
    n = e.proxy,
    s = e.ctx;
  (Vn = !1), t.beforeCreate && Ds(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: u,
    inject: f,
    created: h,
    beforeMount: v,
    mounted: w,
    beforeUpdate: P,
    updated: M,
    activated: V,
    deactivated: g,
    beforeDestroy: y,
    beforeUnmount: K,
    destroyed: I,
    unmounted: B,
    render: X,
    renderTracked: Z,
    renderTriggered: U,
    errorCaptured: le,
    serverPrefetch: ne,
    expose: re,
    inheritAttrs: _e,
    components: D,
    directives: oe,
    filters: ye,
  } = t;
  if ((f && Qi(f, s, null, e.appContext.config.unwrapInjectedRef), i))
    for (const se in i) {
      const G = i[se];
      H(G) && (s[se] = G.bind(n));
    }
  if (r) {
    const se = r.call(n, n);
    ae(se) && (e.data = wn(se));
  }
  if (((Vn = !0), o))
    for (const se in o) {
      const G = o[se],
        He = H(G) ? G.bind(n, n) : H(G.get) ? G.get.bind(n, n) : Oe,
        In = !H(G) && H(G.set) ? G.set.bind(n) : Oe,
        Ct = j({ get: He, set: In });
      Object.defineProperty(s, se, {
        enumerable: !0,
        configurable: !0,
        get: () => Ct.value,
        set: (at) => (Ct.value = at),
      });
    }
  if (l) for (const se in l) Gr(l[se], s, n, se);
  if (u) {
    const se = H(u) ? u.call(n) : u;
    Reflect.ownKeys(se).forEach((G) => {
      Bi(G, se[G]);
    });
  }
  h && Ds(h, e, "c");
  function we(se, G) {
    F(G) ? G.forEach((He) => se(He.bind(n))) : G && se(G.bind(n));
  }
  if (
    (we(Wi, v),
    we(kt, w),
    we(qi, P),
    we(Qr, M),
    we(ji, V),
    we(Di, g),
    we(Xi, le),
    we(Yi, Z),
    we(Ji, U),
    we(zi, K),
    we(Tn, B),
    we(Vi, ne),
    F(re))
  )
    if (re.length) {
      const se = e.exposed || (e.exposed = {});
      re.forEach((G) => {
        Object.defineProperty(se, G, {
          get: () => n[G],
          set: (He) => (n[G] = He),
        });
      });
    } else e.exposed || (e.exposed = {});
  X && e.render === Oe && (e.render = X),
    _e != null && (e.inheritAttrs = _e),
    D && (e.components = D),
    oe && (e.directives = oe);
}
function Qi(e, t, n = Oe, s = !1) {
  F(e) && (e = Jn(e));
  for (const r in e) {
    const o = e[r];
    let i;
    ae(o)
      ? "default" in o
        ? (i = Ft(o.from || r, o.default, !0))
        : (i = Ft(o.from || r))
      : (i = Ft(o)),
      de(i) && s
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (l) => (i.value = l),
          })
        : (t[r] = i);
  }
}
function Ds(e, t, n) {
  Me(F(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Gr(e, t, n, s) {
  const r = s.includes(".") ? Yr(n, s) : () => n[s];
  if (he(e)) {
    const o = t[e];
    H(o) && ot(r, o);
  } else if (H(e)) ot(r, e.bind(n));
  else if (ae(e))
    if (F(e)) e.forEach((o) => Gr(o, t, n, s));
    else {
      const o = H(e.handler) ? e.handler.bind(n) : t[e.handler];
      H(o) && ot(r, o, e);
    }
}
function eo(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let u;
  return (
    l
      ? (u = l)
      : !r.length && !n && !s
      ? (u = t)
      : ((u = {}), r.length && r.forEach((f) => cn(u, f, i, !0)), cn(u, t, i)),
    o.set(t, u),
    u
  );
}
function cn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && cn(e, o, n, !0), r && r.forEach((i) => cn(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = Gi[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Gi = {
  data: Ks,
  props: nt,
  emits: nt,
  methods: nt,
  computed: nt,
  beforeCreate: ve,
  created: ve,
  beforeMount: ve,
  mounted: ve,
  beforeUpdate: ve,
  updated: ve,
  beforeDestroy: ve,
  beforeUnmount: ve,
  destroyed: ve,
  unmounted: ve,
  activated: ve,
  deactivated: ve,
  errorCaptured: ve,
  serverPrefetch: ve,
  components: nt,
  directives: nt,
  watch: tl,
  provide: Ks,
  inject: el,
};
function Ks(e, t) {
  return t
    ? e
      ? function () {
          return xe(
            H(e) ? e.call(this, this) : e,
            H(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function el(e, t) {
  return nt(Jn(e), Jn(t));
}
function Jn(e) {
  if (F(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function nt(e, t) {
  return e ? xe(xe(Object.create(null), e), t) : t;
}
function tl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = xe(Object.create(null), e);
  for (const s in t) n[s] = ve(e[s], t[s]);
  return n;
}
function nl(e, t, n, s = !1) {
  const r = {},
    o = {};
  nn(o, Pn, 1), (e.propsDefaults = Object.create(null)), to(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : xi(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function sl(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = z(r),
    [u] = e.propsOptions;
  let f = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const h = e.vnode.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        let w = h[v];
        const P = t[w];
        if (u)
          if (q(o, w)) P !== o[w] && ((o[w] = P), (f = !0));
          else {
            const M = Ne(w);
            r[M] = Yn(u, l, M, P, e, !1);
          }
        else P !== o[w] && ((o[w] = P), (f = !0));
      }
    }
  } else {
    to(e, t, r, o) && (f = !0);
    let h;
    for (const v in l)
      (!t || (!q(t, v) && ((h = yt(v)) === v || !q(t, h)))) &&
        (u
          ? n &&
            (n[v] !== void 0 || n[h] !== void 0) &&
            (r[v] = Yn(u, l, v, void 0, e, !0))
          : delete r[v]);
    if (o !== l)
      for (const v in o) (!t || (!q(t, v) && !0)) && (delete o[v], (f = !0));
  }
  f && Ke(e, "set", "$attrs");
}
function to(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let u in t) {
      if (Lt(u)) continue;
      const f = t[u];
      let h;
      r && q(r, (h = Ne(u)))
        ? !o || !o.includes(h)
          ? (n[h] = f)
          : ((l || (l = {}))[h] = f)
        : _s(e.emitsOptions, u) ||
          ((!(u in s) || f !== s[u]) && ((s[u] = f), (i = !0)));
    }
  if (o) {
    const u = z(n),
      f = l || Q;
    for (let h = 0; h < o.length; h++) {
      const v = o[h];
      n[v] = Yn(r, u, v, f[v], e, !q(f, v));
    }
  }
  return i;
}
function Yn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = q(i, "default");
    if (l && s === void 0) {
      const u = i.default;
      if (i.type !== Function && H(u)) {
        const { propsDefaults: f } = r;
        n in f ? (s = f[n]) : (bt(r), (s = f[n] = u.call(null, t)), lt());
      } else s = u;
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === yt(n)) && (s = !0));
  }
  return s;
}
function no(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let u = !1;
  if (!H(e)) {
    const h = (v) => {
      u = !0;
      const [w, P] = no(v, t, !0);
      xe(i, w), P && l.push(...P);
    };
    !n && t.mixins.length && t.mixins.forEach(h),
      e.extends && h(e.extends),
      e.mixins && e.mixins.forEach(h);
  }
  if (!o && !u) return s.set(e, gt), gt;
  if (F(o))
    for (let h = 0; h < o.length; h++) {
      const v = Ne(o[h]);
      Ws(v) && (i[v] = Q);
    }
  else if (o)
    for (const h in o) {
      const v = Ne(h);
      if (Ws(v)) {
        const w = o[h],
          P = (i[v] = F(w) || H(w) ? { type: w } : w);
        if (P) {
          const M = Vs(Boolean, P.type),
            V = Vs(String, P.type);
          (P[0] = M > -1),
            (P[1] = V < 0 || M < V),
            (M > -1 || q(P, "default")) && l.push(v);
        }
      }
    }
  const f = [i, l];
  return s.set(e, f), f;
}
function Ws(e) {
  return e[0] !== "$";
}
function qs(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function zs(e, t) {
  return qs(e) === qs(t);
}
function Vs(e, t) {
  return F(t) ? t.findIndex((n) => zs(n, e)) : H(t) && zs(t, e) ? 0 : -1;
}
const so = (e) => e[0] === "_" || e === "$stable",
  ms = (e) => (F(e) ? e.map(Le) : [Le(e)]),
  rl = (e, t, n) => {
    const s = je((...r) => ms(t(...r)), n);
    return (s._c = !1), s;
  },
  ro = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (so(r)) continue;
      const o = e[r];
      if (H(o)) t[r] = rl(r, o, s);
      else if (o != null) {
        const i = ms(o);
        t[r] = () => i;
      }
    }
  },
  oo = (e, t) => {
    const n = ms(t);
    e.slots.default = () => n;
  },
  ol = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = z(t)), nn(t, "_", n)) : ro(t, (e.slots = {}));
    } else (e.slots = {}), t && oo(e, t);
    nn(e.slots, Pn, 1);
  },
  il = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = Q;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (xe(r, t), !n && l === 1 && delete r._)
        : ((o = !t.$stable), ro(t, r)),
        (i = t);
    } else t && (oo(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !so(l) && !(l in i) && delete r[l];
  };
function Re(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let u = l.dir[s];
    u && (wt(), Me(u, n, 8, [e.el, l, e, t]), $t());
  }
}
function io() {
  return {
    app: null,
    config: {
      isNativeTag: Bo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let ll = 0;
function cl(e, t) {
  return function (s, r = null) {
    r != null && !ae(r) && (r = null);
    const o = io(),
      i = new Set();
    let l = !1;
    const u = (o.app = {
      _uid: ll++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Al,
      get config() {
        return o.config;
      },
      set config(f) {},
      use(f, ...h) {
        return (
          i.has(f) ||
            (f && H(f.install)
              ? (i.add(f), f.install(u, ...h))
              : H(f) && (i.add(f), f(u, ...h))),
          u
        );
      },
      mixin(f) {
        return o.mixins.includes(f) || o.mixins.push(f), u;
      },
      component(f, h) {
        return h ? ((o.components[f] = h), u) : o.components[f];
      },
      directive(f, h) {
        return h ? ((o.directives[f] = h), u) : o.directives[f];
      },
      mount(f, h, v) {
        if (!l) {
          const w = N(s, r);
          return (
            (w.appContext = o),
            h && t ? t(w, f) : e(w, f, v),
            (l = !0),
            (u._container = f),
            (f.__vue_app__ = u),
            xs(w.component) || w.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return (o.provides[f] = h), u;
      },
    });
    return u;
  };
}
function un(e, t, n, s, r = !1) {
  if (F(e)) {
    e.forEach((w, P) => un(w, t && (F(t) ? t[P] : t), n, s, r));
    return;
  }
  if (ln(s) && !r) return;
  const o = s.shapeFlag & 4 ? xs(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: l, r: u } = e,
    f = t && t.r,
    h = l.refs === Q ? (l.refs = {}) : l.refs,
    v = l.setupState;
  if (
    (f != null &&
      f !== u &&
      (he(f)
        ? ((h[f] = null), q(v, f) && (v[f] = null))
        : de(f) && (f.value = null)),
    H(u))
  )
    Qe(u, l, 12, [i, h]);
  else {
    const w = he(u),
      P = de(u);
    if (w || P) {
      const M = () => {
        if (e.f) {
          const V = w ? h[u] : u.value;
          r
            ? F(V) && ss(V, o)
            : F(V)
            ? V.includes(o) || V.push(o)
            : w
            ? (h[u] = [o])
            : ((u.value = [o]), e.k && (h[e.k] = u.value));
        } else
          w
            ? ((h[u] = i), q(v, u) && (v[u] = i))
            : de(u) && ((u.value = i), e.k && (h[e.k] = i));
      };
      i ? ((M.id = -1), $e(M, n)) : M();
    }
  }
}
let Je = !1;
const Gt = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  Nn = (e) => e.nodeType === 8;
function ul(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: s,
        nextSibling: r,
        parentNode: o,
        remove: i,
        insert: l,
        createComment: u,
      },
    } = e,
    f = (g, y) => {
      if (!y.hasChildNodes()) {
        n(null, g, y), rn();
        return;
      }
      (Je = !1),
        h(y.firstChild, g, null, null, null),
        rn(),
        Je && console.error("Hydration completed but contains mismatches.");
    },
    h = (g, y, K, I, B, X = !1) => {
      const Z = Nn(g) && g.data === "[",
        U = () => M(g, y, K, I, B, Z),
        { type: le, ref: ne, shapeFlag: re } = y,
        _e = g.nodeType;
      y.el = g;
      let D = null;
      switch (le) {
        case jt:
          _e !== 3
            ? (D = U())
            : (g.data !== y.children && ((Je = !0), (g.data = y.children)),
              (D = r(g)));
          break;
        case We:
          _e !== 8 || Z ? (D = U()) : (D = r(g));
          break;
        case Rt:
          if (_e !== 1) D = U();
          else {
            D = g;
            const oe = !y.children.length;
            for (let ye = 0; ye < y.staticCount; ye++)
              oe && (y.children += D.outerHTML),
                ye === y.staticCount - 1 && (y.anchor = D),
                (D = r(D));
            return D;
          }
          break;
        case fe:
          Z ? (D = P(g, y, K, I, B, X)) : (D = U());
          break;
        default:
          if (re & 1)
            _e !== 1 || y.type.toLowerCase() !== g.tagName.toLowerCase()
              ? (D = U())
              : (D = v(g, y, K, I, B, X));
          else if (re & 6) {
            y.slotScopeIds = B;
            const oe = o(g);
            if (
              (t(y, oe, null, K, I, Gt(oe), X), (D = Z ? V(g) : r(g)), ln(y))
            ) {
              let ye;
              Z
                ? ((ye = N(fe)),
                  (ye.anchor = D ? D.previousSibling : oe.lastChild))
                : (ye = g.nodeType === 3 ? qt("") : N("div")),
                (ye.el = g),
                (y.component.subTree = ye);
            }
          } else
            re & 64
              ? _e !== 8
                ? (D = U())
                : (D = y.type.hydrate(g, y, K, I, B, X, e, w))
              : re & 128 &&
                (D = y.type.hydrate(g, y, K, I, Gt(o(g)), B, X, e, h));
      }
      return ne != null && un(ne, null, I, y), D;
    },
    v = (g, y, K, I, B, X) => {
      X = X || !!y.dynamicChildren;
      const { type: Z, props: U, patchFlag: le, shapeFlag: ne, dirs: re } = y,
        _e = (Z === "input" && re) || Z === "option";
      if (_e || le !== -1) {
        if ((re && Re(y, null, K, "created"), U))
          if (_e || !X || le & 48)
            for (const oe in U)
              ((_e && oe.endsWith("value")) || (Wt(oe) && !Lt(oe))) &&
                s(g, oe, null, U[oe], !1, void 0, K);
          else U.onClick && s(g, "onClick", null, U.onClick, !1, void 0, K);
        let D;
        if (
          ((D = U && U.onVnodeBeforeMount) && Te(D, K, y),
          re && Re(y, null, K, "beforeMount"),
          ((D = U && U.onVnodeMounted) || re) &&
            Vr(() => {
              D && Te(D, K, y), re && Re(y, null, K, "mounted");
            }, I),
          ne & 16 && !(U && (U.innerHTML || U.textContent)))
        ) {
          let oe = w(g.firstChild, y, g, K, I, B, X);
          for (; oe; ) {
            Je = !0;
            const ye = oe;
            (oe = oe.nextSibling), i(ye);
          }
        } else
          ne & 8 &&
            g.textContent !== y.children &&
            ((Je = !0), (g.textContent = y.children));
      }
      return g.nextSibling;
    },
    w = (g, y, K, I, B, X, Z) => {
      Z = Z || !!y.dynamicChildren;
      const U = y.children,
        le = U.length;
      for (let ne = 0; ne < le; ne++) {
        const re = Z ? U[ne] : (U[ne] = Le(U[ne]));
        if (g) g = h(g, re, I, B, X, Z);
        else {
          if (re.type === jt && !re.children) continue;
          (Je = !0), n(null, re, K, null, I, B, Gt(K), X);
        }
      }
      return g;
    },
    P = (g, y, K, I, B, X) => {
      const { slotScopeIds: Z } = y;
      Z && (B = B ? B.concat(Z) : Z);
      const U = o(g),
        le = w(r(g), y, U, K, I, B, X);
      return le && Nn(le) && le.data === "]"
        ? r((y.anchor = le))
        : ((Je = !0), l((y.anchor = u("]")), U, le), le);
    },
    M = (g, y, K, I, B, X) => {
      if (((Je = !0), (y.el = null), X)) {
        const le = V(g);
        for (;;) {
          const ne = r(g);
          if (ne && ne !== le) i(ne);
          else break;
        }
      }
      const Z = r(g),
        U = o(g);
      return i(g), n(null, y, U, Z, K, I, Gt(U), B), Z;
    },
    V = (g) => {
      let y = 0;
      for (; g; )
        if (
          ((g = r(g)), g && Nn(g) && (g.data === "[" && y++, g.data === "]"))
        ) {
          if (y === 0) return r(g);
          y--;
        }
      return g;
    };
  return [f, h];
}
const $e = Vr;
function al(e) {
  return fl(e, ul);
}
function fl(e, t) {
  const n = zo();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: u,
      setText: f,
      setElementText: h,
      parentNode: v,
      nextSibling: w,
      setScopeId: P = Oe,
      cloneNode: M,
      insertStaticContent: V,
    } = e,
    g = (
      c,
      a,
      d,
      _ = null,
      p = null,
      x = null,
      C = !1,
      b = null,
      $ = !!a.dynamicChildren
    ) => {
      if (c === a) return;
      c && !Tt(c, a) && ((_ = Vt(c)), ze(c, p, x, !0), (c = null)),
        a.patchFlag === -2 && (($ = !1), (a.dynamicChildren = null));
      const { type: m, ref: A, shapeFlag: E } = a;
      switch (m) {
        case jt:
          y(c, a, d, _);
          break;
        case We:
          K(c, a, d, _);
          break;
        case Rt:
          c == null && I(a, d, _, C);
          break;
        case fe:
          oe(c, a, d, _, p, x, C, b, $);
          break;
        default:
          E & 1
            ? Z(c, a, d, _, p, x, C, b, $)
            : E & 6
            ? ye(c, a, d, _, p, x, C, b, $)
            : (E & 64 || E & 128) && m.process(c, a, d, _, p, x, C, b, $, ft);
      }
      A != null && p && un(A, c && c.ref, x, a || c, !a);
    },
    y = (c, a, d, _) => {
      if (c == null) s((a.el = l(a.children)), d, _);
      else {
        const p = (a.el = c.el);
        a.children !== c.children && f(p, a.children);
      }
    },
    K = (c, a, d, _) => {
      c == null ? s((a.el = u(a.children || "")), d, _) : (a.el = c.el);
    },
    I = (c, a, d, _) => {
      [c.el, c.anchor] = V(c.children, a, d, _, c.el, c.anchor);
    },
    B = ({ el: c, anchor: a }, d, _) => {
      let p;
      for (; c && c !== a; ) (p = w(c)), s(c, d, _), (c = p);
      s(a, d, _);
    },
    X = ({ el: c, anchor: a }) => {
      let d;
      for (; c && c !== a; ) (d = w(c)), r(c), (c = d);
      r(a);
    },
    Z = (c, a, d, _, p, x, C, b, $) => {
      (C = C || a.type === "svg"),
        c == null ? U(a, d, _, p, x, C, b, $) : re(c, a, p, x, C, b, $);
    },
    U = (c, a, d, _, p, x, C, b) => {
      let $, m;
      const {
        type: A,
        props: E,
        shapeFlag: L,
        transition: O,
        patchFlag: W,
        dirs: te,
      } = c;
      if (c.el && M !== void 0 && W === -1) $ = c.el = M(c.el);
      else {
        if (
          (($ = c.el = i(c.type, x, E && E.is, E)),
          L & 8
            ? h($, c.children)
            : L & 16 &&
              ne(c.children, $, null, _, p, x && A !== "foreignObject", C, b),
          te && Re(c, null, _, "created"),
          E)
        ) {
          for (const ee in E)
            ee !== "value" &&
              !Lt(ee) &&
              o($, ee, null, E[ee], x, c.children, _, p, Be);
          "value" in E && o($, "value", null, E.value),
            (m = E.onVnodeBeforeMount) && Te(m, _, c);
        }
        le($, c, c.scopeId, C, _);
      }
      te && Re(c, null, _, "beforeMount");
      const Y = (!p || (p && !p.pendingBranch)) && O && !O.persisted;
      Y && O.beforeEnter($),
        s($, a, d),
        ((m = E && E.onVnodeMounted) || Y || te) &&
          $e(() => {
            m && Te(m, _, c), Y && O.enter($), te && Re(c, null, _, "mounted");
          }, p);
    },
    le = (c, a, d, _, p) => {
      if ((d && P(c, d), _)) for (let x = 0; x < _.length; x++) P(c, _[x]);
      if (p) {
        let x = p.subTree;
        if (a === x) {
          const C = p.vnode;
          le(c, C, C.scopeId, C.slotScopeIds, p.parent);
        }
      }
    },
    ne = (c, a, d, _, p, x, C, b, $ = 0) => {
      for (let m = $; m < c.length; m++) {
        const A = (c[m] = b ? Xe(c[m]) : Le(c[m]));
        g(null, A, a, d, _, p, x, C, b);
      }
    },
    re = (c, a, d, _, p, x, C) => {
      const b = (a.el = c.el);
      let { patchFlag: $, dynamicChildren: m, dirs: A } = a;
      $ |= c.patchFlag & 16;
      const E = c.props || Q,
        L = a.props || Q;
      let O;
      d && tt(d, !1),
        (O = L.onVnodeBeforeUpdate) && Te(O, d, a, c),
        A && Re(a, c, d, "beforeUpdate"),
        d && tt(d, !0);
      const W = p && a.type !== "foreignObject";
      if (
        (m
          ? _e(c.dynamicChildren, m, b, d, _, W, x)
          : C || He(c, a, b, null, d, _, W, x, !1),
        $ > 0)
      ) {
        if ($ & 16) D(b, a, E, L, d, _, p);
        else if (
          ($ & 2 && E.class !== L.class && o(b, "class", null, L.class, p),
          $ & 4 && o(b, "style", E.style, L.style, p),
          $ & 8)
        ) {
          const te = a.dynamicProps;
          for (let Y = 0; Y < te.length; Y++) {
            const ee = te[Y],
              Ae = E[ee],
              dt = L[ee];
            (dt !== Ae || ee === "value") &&
              o(b, ee, Ae, dt, p, c.children, d, _, Be);
          }
        }
        $ & 1 && c.children !== a.children && h(b, a.children);
      } else !C && m == null && D(b, a, E, L, d, _, p);
      ((O = L.onVnodeUpdated) || A) &&
        $e(() => {
          O && Te(O, d, a, c), A && Re(a, c, d, "updated");
        }, _);
    },
    _e = (c, a, d, _, p, x, C) => {
      for (let b = 0; b < a.length; b++) {
        const $ = c[b],
          m = a[b],
          A =
            $.el && ($.type === fe || !Tt($, m) || $.shapeFlag & 70)
              ? v($.el)
              : d;
        g($, m, A, null, _, p, x, C, !0);
      }
    },
    D = (c, a, d, _, p, x, C) => {
      if (d !== _) {
        for (const b in _) {
          if (Lt(b)) continue;
          const $ = _[b],
            m = d[b];
          $ !== m && b !== "value" && o(c, b, m, $, C, a.children, p, x, Be);
        }
        if (d !== Q)
          for (const b in d)
            !Lt(b) && !(b in _) && o(c, b, d[b], null, C, a.children, p, x, Be);
        "value" in _ && o(c, "value", d.value, _.value);
      }
    },
    oe = (c, a, d, _, p, x, C, b, $) => {
      const m = (a.el = c ? c.el : l("")),
        A = (a.anchor = c ? c.anchor : l(""));
      let { patchFlag: E, dynamicChildren: L, slotScopeIds: O } = a;
      O && (b = b ? b.concat(O) : O),
        c == null
          ? (s(m, d, _), s(A, d, _), ne(a.children, d, A, p, x, C, b, $))
          : E > 0 && E & 64 && L && c.dynamicChildren
          ? (_e(c.dynamicChildren, L, d, p, x, C, b),
            (a.key != null || (p && a === p.subTree)) && lo(c, a, !0))
          : He(c, a, d, A, p, x, C, b, $);
    },
    ye = (c, a, d, _, p, x, C, b, $) => {
      (a.slotScopeIds = b),
        c == null
          ? a.shapeFlag & 512
            ? p.ctx.activate(a, d, _, C, $)
            : Ln(a, d, _, p, x, C, $)
          : we(c, a, $);
    },
    Ln = (c, a, d, _, p, x, C) => {
      const b = (c.component = wl(c, _, p));
      if ((Xr(c) && (b.ctx.renderer = ft), $l(b), b.asyncDep)) {
        if ((p && p.registerDep(b, se), !c.el)) {
          const $ = (b.subTree = N(We));
          K(null, $, a, d);
        }
        return;
      }
      se(b, c, a, d, p, x, C);
    },
    we = (c, a, d) => {
      const _ = (a.component = c.component);
      if (Si(c, a, d))
        if (_.asyncDep && !_.asyncResolved) {
          G(_, a, d);
          return;
        } else (_.next = a), Li(_.update), _.update();
      else (a.component = c.component), (a.el = c.el), (_.vnode = a);
    },
    se = (c, a, d, _, p, x, C) => {
      const b = () => {
          if (c.isMounted) {
            let { next: A, bu: E, u: L, parent: O, vnode: W } = c,
              te = A,
              Y;
            tt(c, !1),
              A ? ((A.el = W.el), G(c, A, C)) : (A = W),
              E && Rn(E),
              (Y = A.props && A.props.onVnodeBeforeUpdate) && Te(Y, O, A, W),
              tt(c, !0);
            const ee = Sn(c),
              Ae = c.subTree;
            (c.subTree = ee),
              g(Ae, ee, v(Ae.el), Vt(Ae), c, p, x),
              (A.el = ee.el),
              te === null && Ni(c, ee.el),
              L && $e(L, p),
              (Y = A.props && A.props.onVnodeUpdated) &&
                $e(() => Te(Y, O, A, W), p);
          } else {
            let A;
            const { el: E, props: L } = a,
              { bm: O, m: W, parent: te } = c,
              Y = ln(a);
            if (
              (tt(c, !1),
              O && Rn(O),
              !Y && (A = L && L.onVnodeBeforeMount) && Te(A, te, a),
              tt(c, !0),
              E && Mn)
            ) {
              const ee = () => {
                (c.subTree = Sn(c)), Mn(E, c.subTree, c, p, null);
              };
              Y
                ? a.type.__asyncLoader().then(() => !c.isUnmounted && ee())
                : ee();
            } else {
              const ee = (c.subTree = Sn(c));
              g(null, ee, d, _, c, p, x), (a.el = ee.el);
            }
            if ((W && $e(W, p), !Y && (A = L && L.onVnodeMounted))) {
              const ee = a;
              $e(() => Te(A, te, ee), p);
            }
            a.shapeFlag & 256 && c.a && $e(c.a, p),
              (c.isMounted = !0),
              (a = d = _ = null);
          }
        },
        $ = (c.effect = new ls(b, () => Ur(c.update), c.scope)),
        m = (c.update = $.run.bind($));
      (m.id = c.uid), tt(c, !0), m();
    },
    G = (c, a, d) => {
      a.component = c;
      const _ = c.vnode.props;
      (c.vnode = a),
        (c.next = null),
        sl(c, a.props, _, d),
        il(c, a.children, d),
        wt(),
        ps(void 0, c.update),
        $t();
    },
    He = (c, a, d, _, p, x, C, b, $ = !1) => {
      const m = c && c.children,
        A = c ? c.shapeFlag : 0,
        E = a.children,
        { patchFlag: L, shapeFlag: O } = a;
      if (L > 0) {
        if (L & 128) {
          Ct(m, E, d, _, p, x, C, b, $);
          return;
        } else if (L & 256) {
          In(m, E, d, _, p, x, C, b, $);
          return;
        }
      }
      O & 8
        ? (A & 16 && Be(m, p, x), E !== m && h(d, E))
        : A & 16
        ? O & 16
          ? Ct(m, E, d, _, p, x, C, b, $)
          : Be(m, p, x, !0)
        : (A & 8 && h(d, ""), O & 16 && ne(E, d, _, p, x, C, b, $));
    },
    In = (c, a, d, _, p, x, C, b, $) => {
      (c = c || gt), (a = a || gt);
      const m = c.length,
        A = a.length,
        E = Math.min(m, A);
      let L;
      for (L = 0; L < E; L++) {
        const O = (a[L] = $ ? Xe(a[L]) : Le(a[L]));
        g(c[L], O, d, null, p, x, C, b, $);
      }
      m > A ? Be(c, p, x, !0, !1, E) : ne(a, d, _, p, x, C, b, $, E);
    },
    Ct = (c, a, d, _, p, x, C, b, $) => {
      let m = 0;
      const A = a.length;
      let E = c.length - 1,
        L = A - 1;
      for (; m <= E && m <= L; ) {
        const O = c[m],
          W = (a[m] = $ ? Xe(a[m]) : Le(a[m]));
        if (Tt(O, W)) g(O, W, d, null, p, x, C, b, $);
        else break;
        m++;
      }
      for (; m <= E && m <= L; ) {
        const O = c[E],
          W = (a[L] = $ ? Xe(a[L]) : Le(a[L]));
        if (Tt(O, W)) g(O, W, d, null, p, x, C, b, $);
        else break;
        E--, L--;
      }
      if (m > E) {
        if (m <= L) {
          const O = L + 1,
            W = O < A ? a[O].el : _;
          for (; m <= L; )
            g(null, (a[m] = $ ? Xe(a[m]) : Le(a[m])), d, W, p, x, C, b, $), m++;
        }
      } else if (m > L) for (; m <= E; ) ze(c[m], p, x, !0), m++;
      else {
        const O = m,
          W = m,
          te = new Map();
        for (m = W; m <= L; m++) {
          const ke = (a[m] = $ ? Xe(a[m]) : Le(a[m]));
          ke.key != null && te.set(ke.key, m);
        }
        let Y,
          ee = 0;
        const Ae = L - W + 1;
        let dt = !1,
          Ts = 0;
        const Et = new Array(Ae);
        for (m = 0; m < Ae; m++) Et[m] = 0;
        for (m = O; m <= E; m++) {
          const ke = c[m];
          if (ee >= Ae) {
            ze(ke, p, x, !0);
            continue;
          }
          let Fe;
          if (ke.key != null) Fe = te.get(ke.key);
          else
            for (Y = W; Y <= L; Y++)
              if (Et[Y - W] === 0 && Tt(ke, a[Y])) {
                Fe = Y;
                break;
              }
          Fe === void 0
            ? ze(ke, p, x, !0)
            : ((Et[Fe - W] = m + 1),
              Fe >= Ts ? (Ts = Fe) : (dt = !0),
              g(ke, a[Fe], d, null, p, x, C, b, $),
              ee++);
        }
        const Ps = dt ? dl(Et) : gt;
        for (Y = Ps.length - 1, m = Ae - 1; m >= 0; m--) {
          const ke = W + m,
            Fe = a[ke],
            As = ke + 1 < A ? a[ke + 1].el : _;
          Et[m] === 0
            ? g(null, Fe, d, As, p, x, C, b, $)
            : dt && (Y < 0 || m !== Ps[Y] ? at(Fe, d, As, 2) : Y--);
        }
      }
    },
    at = (c, a, d, _, p = null) => {
      const { el: x, type: C, transition: b, children: $, shapeFlag: m } = c;
      if (m & 6) {
        at(c.component.subTree, a, d, _);
        return;
      }
      if (m & 128) {
        c.suspense.move(a, d, _);
        return;
      }
      if (m & 64) {
        C.move(c, a, d, ft);
        return;
      }
      if (C === fe) {
        s(x, a, d);
        for (let E = 0; E < $.length; E++) at($[E], a, d, _);
        s(c.anchor, a, d);
        return;
      }
      if (C === Rt) {
        B(c, a, d);
        return;
      }
      if (_ !== 2 && m & 1 && b)
        if (_ === 0) b.beforeEnter(x), s(x, a, d), $e(() => b.enter(x), p);
        else {
          const { leave: E, delayLeave: L, afterLeave: O } = b,
            W = () => s(x, a, d),
            te = () => {
              E(x, () => {
                W(), O && O();
              });
            };
          L ? L(x, W, te) : te();
        }
      else s(x, a, d);
    },
    ze = (c, a, d, _ = !1, p = !1) => {
      const {
        type: x,
        props: C,
        ref: b,
        children: $,
        dynamicChildren: m,
        shapeFlag: A,
        patchFlag: E,
        dirs: L,
      } = c;
      if ((b != null && un(b, null, d, c, !0), A & 256)) {
        a.ctx.deactivate(c);
        return;
      }
      const O = A & 1 && L,
        W = !ln(c);
      let te;
      if ((W && (te = C && C.onVnodeBeforeUnmount) && Te(te, a, c), A & 6))
        Lo(c.component, d, _);
      else {
        if (A & 128) {
          c.suspense.unmount(d, _);
          return;
        }
        O && Re(c, null, a, "beforeUnmount"),
          A & 64
            ? c.type.remove(c, a, d, p, ft, _)
            : m && (x !== fe || (E > 0 && E & 64))
            ? Be(m, a, d, !1, !0)
            : ((x === fe && E & 384) || (!p && A & 16)) && Be($, a, d),
          _ && Cs(c);
      }
      ((W && (te = C && C.onVnodeUnmounted)) || O) &&
        $e(() => {
          te && Te(te, a, c), O && Re(c, null, a, "unmounted");
        }, d);
    },
    Cs = (c) => {
      const { type: a, el: d, anchor: _, transition: p } = c;
      if (a === fe) {
        Ao(d, _);
        return;
      }
      if (a === Rt) {
        X(c);
        return;
      }
      const x = () => {
        r(d), p && !p.persisted && p.afterLeave && p.afterLeave();
      };
      if (c.shapeFlag & 1 && p && !p.persisted) {
        const { leave: C, delayLeave: b } = p,
          $ = () => C(d, x);
        b ? b(c.el, x, $) : $();
      } else x();
    },
    Ao = (c, a) => {
      let d;
      for (; c !== a; ) (d = w(c)), r(c), (c = d);
      r(a);
    },
    Lo = (c, a, d) => {
      const { bum: _, scope: p, update: x, subTree: C, um: b } = c;
      _ && Rn(_),
        p.stop(),
        x && ((x.active = !1), ze(C, c, a, d)),
        b && $e(b, a),
        $e(() => {
          c.isUnmounted = !0;
        }, a),
        a &&
          a.pendingBranch &&
          !a.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === a.pendingId &&
          (a.deps--, a.deps === 0 && a.resolve());
    },
    Be = (c, a, d, _ = !1, p = !1, x = 0) => {
      for (let C = x; C < c.length; C++) ze(c[C], a, d, _, p);
    },
    Vt = (c) =>
      c.shapeFlag & 6
        ? Vt(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : w(c.anchor || c.el),
    Es = (c, a, d) => {
      c == null
        ? a._vnode && ze(a._vnode, null, null, !0)
        : g(a._vnode || null, c, a, null, null, null, d),
        rn(),
        (a._vnode = c);
    },
    ft = {
      p: g,
      um: ze,
      m: at,
      r: Cs,
      mt: Ln,
      mc: ne,
      pc: He,
      pbc: _e,
      n: Vt,
      o: e,
    };
  let On, Mn;
  return (
    t && ([On, Mn] = t(ft)), { render: Es, hydrate: On, createApp: cl(Es, On) }
  );
}
function tt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function lo(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (F(s) && F(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = Xe(r[o])), (l.el = i.el)),
        n || lo(i, l));
    }
}
function dl(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const f = e[s];
    if (f !== 0) {
      if (((r = n[n.length - 1]), e[r] < f)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < f ? (o = l + 1) : (i = l);
      f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const hl = (e) => e.__isTeleport,
  co = "components";
function an(e, t) {
  return _l(co, e, !0, t) || e;
}
const pl = Symbol();
function _l(e, t, n = !0, s = !1) {
  const r = Ie || pe;
  if (r) {
    const o = r.type;
    if (e === co) {
      const l = Tl(o);
      if (l && (l === t || l === Ne(t) || l === xn(Ne(t)))) return o;
    }
    const i = Js(r[e] || o[e], t) || Js(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Js(e, t) {
  return e && (e[t] || e[Ne(t)] || e[xn(Ne(t))]);
}
const fe = Symbol(void 0),
  jt = Symbol(void 0),
  We = Symbol(void 0),
  Rt = Symbol(void 0),
  St = [];
let it = null;
function T(e = !1) {
  St.push((it = e ? null : []));
}
function gl() {
  St.pop(), (it = St[St.length - 1] || null);
}
let fn = 1;
function Ys(e) {
  fn += e;
}
function uo(e) {
  return (
    (e.dynamicChildren = fn > 0 ? it || gt : null),
    gl(),
    fn > 0 && it && it.push(e),
    e
  );
}
function R(e, t, n, s, r, o) {
  return uo(S(e, t, n, s, r, o, !0));
}
function ge(e, t, n, s, r) {
  return uo(N(e, t, n, s, r, !0));
}
function dn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Tt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Pn = "__vInternal",
  ao = ({ key: e }) => (e != null ? e : null),
  tn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? he(e) || de(e) || H(e)
        ? { i: Ie, r: e, k: t, f: !!n }
        : e
      : null;
function S(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === fe ? 0 : 1,
  i = !1,
  l = !1
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ao(t),
    ref: t && tn(t),
    scopeId: Cn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    l
      ? (vs(u, n), o & 128 && e.normalize(u))
      : n && (u.shapeFlag |= he(n) ? 8 : 16),
    fn > 0 &&
      !i &&
      it &&
      (u.patchFlag > 0 || o & 6) &&
      u.patchFlag !== 32 &&
      it.push(u),
    u
  );
}
const N = ml;
function ml(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === pl) && (e = We), dn(e))) {
    const l = Dt(e, t, !0);
    return n && vs(l, n), l;
  }
  if ((Pl(e) && (e = e.__vccOpts), t)) {
    t = vl(t);
    let { class: l, style: u } = t;
    l && !he(l) && (t.class = ct(l)),
      ae(u) && (Or(u) && !F(u) && (u = xe({}, u)), (t.style = ts(u)));
  }
  const i = he(e) ? 1 : Hi(e) ? 128 : hl(e) ? 64 : ae(e) ? 4 : H(e) ? 2 : 0;
  return S(e, t, n, s, r, i, o, !0);
}
function vl(e) {
  return e ? (Or(e) || Pn in e ? xe({}, e) : e) : null;
}
function Dt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    l = t ? bs(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && ao(l),
    ref:
      t && t.ref ? (n && r ? (F(r) ? r.concat(tn(t)) : [r, tn(t)]) : tn(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== fe ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Dt(e.ssContent),
    ssFallback: e.ssFallback && Dt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function qt(e = " ", t = 0) {
  return N(jt, null, e, t);
}
function rf(e, t) {
  const n = N(Rt, null, e);
  return (n.staticCount = t), n;
}
function J(e = "", t = !1) {
  return t ? (T(), ge(We, null, e)) : N(We, null, e);
}
function Le(e) {
  return e == null || typeof e == "boolean"
    ? N(We)
    : F(e)
    ? N(fe, null, e.slice())
    : typeof e == "object"
    ? Xe(e)
    : N(jt, null, String(e));
}
function Xe(e) {
  return e.el === null || e.memo ? e : Dt(e);
}
function vs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (F(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), vs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Pn in t)
        ? (t._ctx = Ie)
        : r === 3 &&
          Ie &&
          (Ie.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    H(t)
      ? ((t = { default: t, _ctx: Ie }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [qt(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function bs(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ct([t.class, s.class]));
      else if (r === "style") t.style = ts([t.style, s.style]);
      else if (Wt(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(F(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Te(e, t, n, s = null) {
  Me(e, t, 7, [n, s]);
}
function An(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (F(e) || he(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (ae(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, u = i.length; l < u; l++) {
        const f = i[l];
        r[l] = t(e[f], f, l, o && o[l]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
function ue(e, t, n = {}, s, r) {
  if (Ie.isCE) return N("slot", t === "default" ? null : { name: t }, s && s());
  let o = e[t];
  o && o._c && (o._d = !1), T();
  const i = o && fo(o(n)),
    l = ge(
      fe,
      { key: n.key || `_${t}` },
      i || (s ? s() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    l
  );
}
function fo(e) {
  return e.some((t) =>
    dn(t) ? !(t.type === We || (t.type === fe && !fo(t.children))) : !0
  )
    ? e
    : null;
}
const Xn = (e) => (e ? (ho(e) ? xs(e) || e.proxy : Xn(e.parent)) : null),
  hn = xe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Xn(e.parent),
    $root: (e) => Xn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => eo(e),
    $forceUpdate: (e) => () => Ur(e.update),
    $nextTick: (e) => Br.bind(e.proxy),
    $watch: (e) => Ui.bind(e),
  }),
  bl = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: l,
        appContext: u,
      } = e;
      let f;
      if (t[0] !== "$") {
        const P = i[t];
        if (P !== void 0)
          switch (P) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (s !== Q && q(s, t)) return (i[t] = 1), s[t];
          if (r !== Q && q(r, t)) return (i[t] = 2), r[t];
          if ((f = e.propsOptions[0]) && q(f, t)) return (i[t] = 3), o[t];
          if (n !== Q && q(n, t)) return (i[t] = 4), n[t];
          Vn && (i[t] = 0);
        }
      }
      const h = hn[t];
      let v, w;
      if (h) return t === "$attrs" && Ee(e, "get", t), h(e);
      if ((v = l.__cssModules) && (v = v[t])) return v;
      if (n !== Q && q(n, t)) return (i[t] = 4), n[t];
      if (((w = u.config.globalProperties), q(w, t))) return w[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return r !== Q && q(r, t)
        ? ((r[t] = n), !0)
        : s !== Q && q(s, t)
        ? ((s[t] = n), !0)
        : q(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== Q && q(e, i)) ||
        (t !== Q && q(t, i)) ||
        ((l = o[0]) && q(l, i)) ||
        q(s, i) ||
        q(hn, i) ||
        q(r.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? this.set(e, t, n.get(), null)
          : n.value != null && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  },
  xl = io();
let yl = 0;
function wl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || xl,
    o = {
      uid: yl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Vo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: no(s, r),
      emitsOptions: Wr(s, r),
      emit: null,
      emitted: null,
      propsDefaults: Q,
      inheritAttrs: s.inheritAttrs,
      ctx: Q,
      data: Q,
      props: Q,
      attrs: Q,
      slots: Q,
      refs: Q,
      setupState: Q,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Mi.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let pe = null;
const bt = (e) => {
    (pe = e), e.scope.on();
  },
  lt = () => {
    pe && pe.scope.off(), (pe = null);
  };
function ho(e) {
  return e.vnode.shapeFlag & 4;
}
let Kt = !1;
function $l(e, t = !1) {
  Kt = t;
  const { props: n, children: s } = e.vnode,
    r = ho(e);
  nl(e, n, r, t), ol(e, s);
  const o = r ? kl(e, t) : void 0;
  return (Kt = !1), o;
}
function kl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = It(new Proxy(e.ctx, bl)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? El(e) : null);
    bt(e), wt();
    const o = Qe(s, e, 0, [e.props, r]);
    if (($t(), lt(), mr(o))) {
      if ((o.then(lt, lt), t))
        return o
          .then((i) => {
            Xs(e, i, t);
          })
          .catch((i) => {
            kn(i, e, 0);
          });
      e.asyncDep = o;
    } else Xs(e, o, t);
  } else po(e, t);
}
function Xs(e, t, n) {
  H(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ae(t) && (e.setupState = Sr(t)),
    po(e, n);
}
let Zs;
function po(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Zs && !s.render) {
      const r = s.template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: u } = s,
          f = xe(xe({ isCustomElement: o, delimiters: l }, i), u);
        s.render = Zs(r, f);
      }
    }
    e.render = s.render || Oe;
  }
  bt(e), wt(), Zi(e), $t(), lt();
}
function Cl(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Ee(e, "get", "$attrs"), t[n];
    },
  });
}
function El(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Cl(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function xs(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Sr(It(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in hn) return hn[n](e);
        },
      }))
    );
}
function Tl(e) {
  return (H(e) && e.displayName) || e.name;
}
function Pl(e) {
  return H(e) && "__vccOpts" in e;
}
const j = (e, t) => Ti(e, t, Kt);
function ut(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? ae(t) && !F(t)
      ? dn(t)
        ? N(e, null, [t])
        : N(e, t)
      : N(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && dn(n) && (n = [n]),
      N(e, t, n));
}
const Al = "3.2.31",
  Ll = "http://www.w3.org/2000/svg",
  st = typeof document != "undefined" ? document : null,
  Qs = st && st.createElement("template"),
  Il = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? st.createElementNS(Ll, e)
        : st.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => st.createTextNode(e),
    createComment: (e) => st.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => st.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));

        );
      else {
        Qs.innerHTML = s ? `<svg>${e}</svg>` : e;
        const l = Qs.content;
        if (s) {
          const u = l.firstChild;
          for (; u.firstChild; ) l.appendChild(u.firstChild);
          l.removeChild(u);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Ol(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Ml(e, t, n) {
  const s = e.style,
    r = he(n);
  if (n && !r) {
    for (const o in n) Zn(s, o, n[o]);
    if (t && !he(t)) for (const o in t) n[o] == null && Zn(s, o, "");
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = o);
  }
}
const Gs = /\s*!important$/;
function Zn(e, t, n) {
  if (F(n)) n.forEach((s) => Zn(e, t, s));
  else if (t.startsWith("--")) e.setProperty(t, n);
  else {
    const s = Fl(e, t);
    Gs.test(n)
      ? e.setProperty(yt(s), n.replace(Gs, ""), "important")
      : (e[s] = n);
  }
}
const er = ["Webkit", "Moz", "ms"],
  Hn = {};
function Fl(e, t) {
  const n = Hn[t];
  if (n) return n;
  let s = Ne(t);
  if (s !== "filter" && s in e) return (Hn[t] = s);
  s = xn(s);
  for (let r = 0; r < er.length; r++) {
    const o = er[r] + s;
    if (o in e) return (Hn[t] = o);
  }
  return t;
}
const tr = "http://www.w3.org/1999/xlink";
function Rl(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(tr, t.slice(6, t.length))
      : e.setAttributeNS(tr, t, n);
  else {
    const o = Ro(t);
    n == null || (o && !pr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Sl(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const l = n == null ? "" : n;
    (e.value !== l || e.tagName === "OPTION") && (e.value = l),
      n == null && e.removeAttribute(t);
    return;
  }
  if (n === "" || n == null) {
    const l = typeof e[t];
    if (l === "boolean") {
      e[t] = pr(n);
      return;
    } else if (n == null && l === "string") {
      (e[t] = ""), e.removeAttribute(t);
      return;
    } else if (l === "number") {
      try {
        e[t] = 0;
      } catch {}
      e.removeAttribute(t);
      return;
    }
  }
  try {
    e[t] = n;
  } catch {}
}
let pn = Date.now,
  _o = !1;
if (typeof window != "undefined") {
  pn() > document.createEvent("Event").timeStamp &&
    (pn = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  _o = !!(e && Number(e[1]) <= 53);
}
let Qn = 0;
const Nl = Promise.resolve(),
  Hl = () => {
    Qn = 0;
  },
  Bl = () => Qn || (Nl.then(Hl), (Qn = pn()));
function Ul(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function jl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Dl(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, u] = Kl(t);
    if (s) {
      const f = (o[t] = Wl(s, r));
      Ul(e, l, f, u);
    } else i && (jl(e, l, i, u), (o[t] = void 0));
  }
}
const nr = /(?:Once|Passive|Capture)$/;
function Kl(e) {
  let t;
  if (nr.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(nr)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [yt(e.slice(2)), t];
}
function Wl(e, t) {
  const n = (s) => {
    const r = s.timeStamp || pn();
    (_o || r >= n.attached - 1) && Me(ql(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Bl()), n;
}
function ql(e, t) {
  if (F(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const sr = /^on[a-z]/,
  zl = (e, t, n, s, r = !1, o, i, l, u) => {
    t === "class"
      ? Ol(e, s, r)
      : t === "style"
      ? Ml(e, n, s)
      : Wt(t)
      ? ns(t) || Dl(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Vl(e, t, s, r)
        )
      ? Sl(e, t, s, o, i, l, u)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Rl(e, t, s, r));
  };
function Vl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && sr.test(t) && H(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (sr.test(t) && he(n))
    ? !1
    : t in e;
}
const Jl = xe({ patchProp: zl }, Il);
let Bn,
  rr = !1;
function Yl() {
  return (Bn = rr ? Bn : al(Jl)), (rr = !0), Bn;
}
const Xl = (...e) => {
  const t = Yl().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Zl(s);
      if (r) return n(r, !0, r instanceof SVGElement);
    }),
    t
  );
};
function Zl(e) {
  return he(e) ? document.querySelector(e) : e;
}
var Ql =
  '{"lang":"en-US","title":"\u57FA\u4E8EElementPlus\u4E8C\u6B21\u5C01\u88C5\u4E1A\u52A1\u7EC4\u4EF6","description":"A VitePress site","base":"/","head":[],"themeConfig":{"nav":[{"text":"\u9996\u9875","link":"/"},{"text":"\u7EC4\u4EF6\u793A\u4F8B","link":"https://lingdeqingyuan.github.io/element-components/#/","target":"_blank"}],"sidebar":[{"text":"\u4ECB\u7ECD","link":"/intro/"},{"text":"\u5FEB\u901F\u4E0A\u624B","link":"/quickStart/"},{"text":"\u56FE\u6807\u9009\u62E9\u5668","link":"/chooseIcon/"},{"text":"\u7701\u5E02\u533A\u9009\u62E9","link":"/chooseArea/"},{"text":"\u8D8B\u52BF\u6807\u8BB0","link":"/trend/"},{"text":"\u65F6\u95F4\u9009\u62E9","link":"/chooseTime/"},{"text":"\u57CE\u5E02\u9009\u62E9","link":"/chooseCity/"},{"text":"\u8FDB\u5EA6\u6761","link":"/progress/"},{"text":"\u8868\u5355","link":"/form/"},{"text":"\u5F39\u51FA\u6846\u8868\u5355","link":"/modalForm/"},{"text":"\u8868\u683C","link":"/table/"}]},"locales":{},"langs":{},"scrollOffset":90}';
const go = /^https?:/i,
  Pe = typeof window != "undefined";
function Gl(e, t) {
  t.sort((n, s) => {
    const r = s.split("/").length - n.split("/").length;
    return r !== 0 ? r : s.length - n.length;
  });
  for (const n of t) if (e.startsWith(n)) return n;
}
function or(e, t) {
  const n = Gl(t, Object.keys(e));
  return n ? e[n] : void 0;
}
function ec(e) {
  const { locales: t } = e.themeConfig || {},
    n = e.locales;
  return t && n
    ? Object.keys(t).reduce(
        (s, r) => ((s[r] = { label: t[r].label, lang: n[r].lang }), s),
        {}
      )
    : {};
}
function tc(e, t) {
  t = nc(e, t);
  const n = or(e.locales || {}, t),
    s = or(e.themeConfig.locales || {}, t);
  return Object.assign({}, e, n, {
    themeConfig: Object.assign({}, e.themeConfig, s, { locales: {} }),
    lang: (n || e).lang,
    locales: {},
    langs: ec(e),
  });
}
function nc(e, t) {
  if (!Pe) return t;
  const n = e.base,
    s = n.endsWith("/") ? n.slice(0, -1) : n;
  return t.slice(s.length);
}
const mo = Symbol(),
  zt = yi(sc(Ql));
function sc(e) {
  return JSON.parse(e);
}
function rc(e) {
  const t = j(() => tc(zt.value, e.path));
  return {
    site: t,
    theme: j(() => t.value.themeConfig),
    page: j(() => e.data),
    frontmatter: j(() => e.data.frontmatter),
    lang: j(() => t.value.lang),
    localePath: j(() => {
      const { langs: n, lang: s } = t.value,
        r = Object.keys(n).find((o) => n[o].lang === s);
      return xt(r || "/");
    }),
    title: j(() =>
      e.data.title ? e.data.title + " | " + t.value.title : t.value.title
    ),
    description: j(() => e.data.description || t.value.description),
  };
}
function me() {
  const e = Ft(mo);
  if (!e) throw new Error("vitepress data not properly injected in app");
  return e;
}
function oc(e, t) {
  return `${e}${t}`.replace(/\/+/g, "/");
}
function xt(e) {
  return go.test(e) ? e : oc(zt.value.base, e);
}
function vo(e) {
  let t = e.replace(/\.html$/, "");
  if (((t = decodeURIComponent(t)), t.endsWith("/") && (t += "index"), Pe)) {
    const n = "/";
    t = t.slice(n.length).replace(/\//g, "_") + ".md";
    const s = __VP_HASH_MAP__[t.toLowerCase()];
    t = `${n}assets/${t}.${s}.js`;
  } else t = `./${t.slice(1).replace(/\//g, "_")}.md.js`;
  return t;
}
const bo = Symbol(),
  ir = "http://a.com",
  xo = {
    relativePath: "",
    title: "404",
    description: "Not Found",
    headers: [],
    frontmatter: {},
    lastUpdated: 0,
  },
  ic = () => ({ path: "/", component: null, data: xo });
function lc(e, t) {
  const n = wn(ic());
  function s(i = Pe ? location.href : "/") {
    const l = new URL(i, ir);
    return (
      !l.pathname.endsWith("/") &&
        !l.pathname.endsWith(".html") &&
        ((l.pathname += ".html"), (i = l.pathname + l.search + l.hash)),
      Pe &&
        (history.replaceState(
          { scrollPosition: window.scrollY },
          document.title
        ),
        history.pushState(null, "", i)),
      o(i)
    );
  }
  let r = null;
  async function o(i, l = 0, u = !1) {
    const f = new URL(i, ir),
      h = (r = f.pathname);
    try {
      let v = e(h);
      if (
        ("then" in v && typeof v.then == "function" && (v = await v), r === h)
      ) {
        r = null;
        const { default: w, __pageData: P } = v;
        if (!w) throw new Error(`Invalid route component: ${w}`);
        (n.path = h),
          (n.component = It(w)),
          (n.data = It(JSON.parse(P))),
          Pe &&
            Br(() => {
              if (f.hash && !l) {
                let M = null;
                try {
                  M = document.querySelector(decodeURIComponent(f.hash));
                } catch (V) {
                  console.warn(V);
                }
                if (M) {
                  lr(M, f.hash);
                  return;
                }
              }
              window.scrollTo(0, l);
            });
      }
    } catch (v) {
      if ((v.message.match(/fetch/) || console.error(v), !u))
        try {
          const w = await fetch(
            "https://lingdeqingyuan.github.io/element-components-doc/hashmap.json"
          );
          (window.__VP_HASH_MAP__ = await w.json()), await o(i, l, !0);
          return;
        } catch {}
      r === h &&
        ((r = null),
        (n.path = h),
        (n.component = t ? It(t) : null),
        (n.data = xo));
    }
  }
  return (
    Pe &&
      (window.addEventListener(
        "click",
        (i) => {
          const l = i.target.closest("a");
          if (l) {
            const {
                href: u,
                protocol: f,
                hostname: h,
                pathname: v,
                hash: w,
                target: P,
              } = l,
              M = window.location,
              V = v.match(/\.\w+$/);
            !i.ctrlKey &&
              !i.shiftKey &&
              !i.altKey &&
              !i.metaKey &&
              P !== "_blank" &&
              f === M.protocol &&
              h === M.hostname &&
              !(V && V[0] !== ".html") &&
              (i.preventDefault(),
              v === M.pathname
                ? w &&
                  w !== M.hash &&
                  (history.pushState(null, "", w),
                  window.dispatchEvent(new Event("hashchange")),
                  lr(l, w, l.classList.contains("header-anchor")))
                : s(u));
          }
        },
        { capture: !0 }
      ),
      window.addEventListener("popstate", (i) => {
        o(location.href, (i.state && i.state.scrollPosition) || 0);
      }),
      window.addEventListener("hashchange", (i) => {
        i.preventDefault();
      })),
    { route: n, go: s }
  );
}
function cc() {
  const e = Ft(bo);
  if (!e) throw new Error("useRouter() is called without provider.");
  return e;
}
function et() {
  return cc().route;
}
function lr(e, t, n = !1) {
  let s = null;
  try {
    s = e.classList.contains("header-anchor")
      ? e
      : document.querySelector(decodeURIComponent(t));
  } catch (r) {
    console.warn(r);
  }
  if (s) {
    let r = zt.value.scrollOffset;
    typeof r == "string" &&
      (r = document.querySelector(r).getBoundingClientRect().bottom + 24);
    const o = parseInt(window.getComputedStyle(s).paddingTop, 10),
      i = window.scrollY + s.getBoundingClientRect().top - r + o;
    !n || Math.abs(i - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, i)
      : window.scrollTo({ left: 0, top: i, behavior: "smooth" });
  }
}
function uc(e, t) {
  let n = [],
    s = !0;
  const r = (o) => {
    if (s) {
      s = !1;
      return;
    }
    const i = [],
      l = Math.min(n.length, o.length);
    for (let u = 0; u < l; u++) {
      let f = n[u];
      const [h, v, w = ""] = o[u];
      if (f.tagName.toLocaleLowerCase() === h) {
        for (const P in v)
          f.getAttribute(P) !== v[P] && f.setAttribute(P, v[P]);
        for (let P = 0; P < f.attributes.length; P++) {
          const M = f.attributes[P].name;
          M in v || f.removeAttribute(M);
        }
        f.innerHTML !== w && (f.innerHTML = w);
      } else
        document.head.removeChild(f), (f = cr(o[u])), document.head.append(f);
      i.push(f);
    }
    n.slice(l).forEach((u) => document.head.removeChild(u)),
      o.slice(l).forEach((u) => {
        const f = cr(u);
        document.head.appendChild(f), i.push(f);
      }),
      (n = i);
  };
  Jr(() => {
    const o = e.data,
      i = t.value,
      l = o && o.title,
      u = o && o.description,
      f = o && o.frontmatter.head;
    (document.title = (l ? l + " | " : "") + i.title),
      document
        .querySelector("meta[name=description]")
        .setAttribute("content", u || i.description),
      r([...(f ? fc(f) : [])]);
  });
}
function cr([e, t, n]) {
  const s = document.createElement(e);
  for (const r in t) s.setAttribute(r, t[r]);
  return n && (s.innerHTML = n), s;
}
function ac(e) {
  return e[0] === "meta" && e[1] && e[1].name === "description";
}
function fc(e) {
  return e.filter((t) => !ac(t));
}
const dc = ie({
  name: "VitePressContent",
  setup() {
    const e = et();
    return () =>
      ut("div", { style: { position: "relative" } }, [
        e.component ? ut(e.component) : null,
      ]);
  },
});
var ce = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t) n[s] = r;
  return n;
};
const hc = /#.*$/,
  pc = /(index)?\.(md|html)$/,
  _n = /\/$/,
  _c = /^[a-z]+:/i;
function ys(e) {
  return Array.isArray(e);
}
function ws(e) {
  return _c.test(e);
}
function gc(e, t) {
  if (t === void 0) return !1;
  const n = ur(`/${e.data.relativePath}`),
    s = ur(t);
  return n === s;
}
function ur(e) {
  return decodeURI(e).replace(hc, "").replace(pc, "");
}
function mc(e, t) {
  const n = e.endsWith("/"),
    s = t.startsWith("/");
  return n && s ? e.slice(0, -1) + t : !n && !s ? `${e}/${t}` : e + t;
}
function Gn(e) {
  return /^\//.test(e) ? e : `/${e}`;
}
function yo(e) {
  return e.replace(/(index)?(\.(md|html))?$/, "") || "/";
}
function vc(e) {
  return e === !1 || e === "auto" || ys(e);
}
function bc(e) {
  return e.children !== void 0;
}
function xc(e) {
  return ys(e) ? e.length === 0 : !e;
}
function $s(e, t) {
  if (vc(e)) return e;
  t = Gn(t);
  for (const n in e) if (t.startsWith(Gn(n))) return e[n];
  return "auto";
}
function wo(e) {
  return e.reduce(
    (t, n) => (
      n.link && t.push({ text: n.text, link: yo(n.link) }),
      bc(n) && (t = [...t, ...wo(n.children)]),
      t
    ),
    []
  );
}
function $o(e) {
  const t = et(),
    n = ws(e.value.link);
  return {
    props: j(() => {
      const r = ar(`/${t.data.relativePath}`);
      let o = !1;
      if (e.value.activeMatch) o = new RegExp(e.value.activeMatch).test(r);
      else {
        const i = ar(e.value.link);
        o = i === "/" ? i === r : r.startsWith(i);
      }
      return {
        class: { active: o, isExternal: n },
        href: n ? e.value.link : xt(e.value.link),
        target: e.value.target || (n ? "_blank" : null),
        rel: e.value.rel || (n ? "noopener noreferrer" : null),
        "aria-label": e.value.ariaLabel,
      };
    }),
    isExternal: n,
  };
}
function ar(e) {
  return e
    .replace(/#.*$/, "")
    .replace(/\?.*$/, "")
    .replace(/\.(html|md)$/, "")
    .replace(/\/index$/, "/");
}
const yc = {},
  wc = {
    class: "icon outbound",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    x: "0px",
    y: "0px",
    viewBox: "0 0 100 100",
    width: "15",
    height: "15",
  },
  $c = S(
    "path",
    {
      fill: "currentColor",
      d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z",
    },
    null,
    -1
  ),
  kc = S(
    "polygon",
    {
      fill: "currentColor",
      points:
        "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9",
    },
    null,
    -1
  ),
  Cc = [$c, kc];
function Ec(e, t) {
  return T(), R("svg", wc, Cc);
}
var ks = ce(yc, [["render", Ec]]);
const Tc = { class: "nav-link" },
  Pc = ie({
    props: { item: null },
    setup(e) {
      const n = Nr(e),
        { props: s, isExternal: r } = $o(n.item);
      return (o, i) => (
        T(),
        R("div", Tc, [
          S(
            "a",
            bs({ class: "item" }, k(s)),
            [
              qt(be(e.item.text) + " ", 1),
              k(r) ? (T(), ge(ks, { key: 0 })) : J("", !0),
            ],
            16
          ),
        ])
      );
    },
  });
var gn = ce(Pc, [["__scopeId", "data-v-b8818f8c"]]);
const Ac = { key: 0, class: "home-hero" },
  Lc = { key: 0, class: "figure" },
  Ic = ["src", "alt"],
  Oc = { key: 1, id: "main-title", class: "title" },
  Mc = { key: 2, class: "tagline" },
  Fc = ie({
    setup(e) {
      const { site: t, frontmatter: n } = me(),
        s = j(() => {
          const {
            heroImage: i,
            heroText: l,
            tagline: u,
            actionLink: f,
            actionText: h,
          } = n.value;
          return i || l || u || (f && h);
        }),
        r = j(() => n.value.heroText || t.value.title),
        o = j(() => n.value.tagline || t.value.description);
      return (i, l) =>
        k(s)
          ? (T(),
            R("header", Ac, [
              k(n).heroImage
                ? (T(),
                  R("figure", Lc, [
                    S(
                      "img",
                      {
                        class: "image",
                        src: k(xt)(k(n).heroImage),
                        alt: k(n).heroAlt,
                      },
                      null,
                      8,
                      Ic
                    ),
                  ]))
                : J("", !0),
              k(r) ? (T(), R("h1", Oc, be(k(r)), 1)) : J("", !0),
              k(o) ? (T(), R("p", Mc, be(k(o)), 1)) : J("", !0),
              k(n).actionLink && k(n).actionText
                ? (T(),
                  ge(
                    gn,
                    {
                      key: 3,
                      item: { link: k(n).actionLink, text: k(n).actionText },
                      class: "action",
                    },
                    null,
                    8,
                    ["item"]
                  ))
                : J("", !0),
              k(n).altActionLink && k(n).altActionText
                ? (T(),
                  ge(
                    gn,
                    {
                      key: 4,
                      item: {
                        link: k(n).altActionLink,
                        text: k(n).altActionText,
                      },
                      class: "action alt",
                    },
                    null,
                    8,
                    ["item"]
                  ))
                : J("", !0),
            ]))
          : J("", !0);
    },
  });
var Rc = ce(Fc, [["__scopeId", "data-v-370f18c0"]]);
const Sc = { key: 0, class: "home-features" },
  Nc = { class: "wrapper" },
  Hc = { class: "container" },
  Bc = { class: "features" },
  Uc = { key: 0, class: "title" },
  jc = { key: 1, class: "details" },
  Dc = ie({
    setup(e) {
      const { frontmatter: t } = me(),
        n = j(() => t.value.features && t.value.features.length > 0),
        s = j(() => (t.value.features ? t.value.features : []));
      return (r, o) =>
        k(n)
          ? (T(),
            R("div", Sc, [
              S("div", Nc, [
                S("div", Hc, [
                  S("div", Bc, [
                    (T(!0),
                    R(
                      fe,
                      null,
                      An(
                        k(s),
                        (i, l) => (
                          T(),
                          R("section", { key: l, class: "feature" }, [
                            i.title
                              ? (T(), R("h2", Uc, be(i.title), 1))
                              : J("", !0),
                            i.details
                              ? (T(), R("p", jc, be(i.details), 1))
                              : J("", !0),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                ]),
              ]),
            ]))
          : J("", !0);
    },
  });
var Kc = ce(Dc, [["__scopeId", "data-v-e39c13e0"]]);
const Wc = { key: 0, class: "footer" },
  qc = { class: "container" },
  zc = { class: "text" },
  Vc = ie({
    setup(e) {
      const { frontmatter: t } = me();
      return (n, s) =>
        k(t).footer
          ? (T(),
            R("footer", Wc, [S("div", qc, [S("p", zc, be(k(t).footer), 1)])]))
          : J("", !0);
    },
  });
var Jc = ce(Vc, [["__scopeId", "data-v-30918238"]]);
const Yc = { class: "home", "aria-labelledby": "main-title" },
  Xc = { class: "home-content" },
  Zc = ie({
    setup(e) {
      return (t, n) => {
        const s = an("Content");
        return (
          T(),
          R("main", Yc, [
            N(Rc),
            ue(t.$slots, "hero", {}, void 0, !0),
            N(Kc),
            S("div", Xc, [N(s)]),
            ue(t.$slots, "features", {}, void 0, !0),
            N(Jc),
            ue(t.$slots, "footer", {}, void 0, !0),
          ])
        );
      };
    },
  });
var Qc = ce(Zc, [["__scopeId", "data-v-10122c92"]]);
const Gc = ["href", "aria-label"],
  eu = ["src"],
  tu = ie({
    setup(e) {
      const { site: t, theme: n, localePath: s } = me();
      return (r, o) => (
        T(),
        R(
          "a",
          {
            class: "nav-bar-title",
            href: k(s),
            "aria-label": `${k(t).title}, back to home`,
          },
          [
            k(n).logo
              ? (T(),
                R(
                  "img",
                  { key: 0, class: "logo", src: k(xt)(k(n).logo), alt: "Logo" },
                  null,
                  8,
                  eu
                ))
              : J("", !0),
            qt(" " + be(k(t).title), 1),
          ],
          8,
          Gc
        )
      );
    },
  });
var nu = ce(tu, [["__scopeId", "data-v-cc01ef16"]]);
function su() {
  const { site: e, localePath: t, theme: n } = me();
  return j(() => {
    const s = e.value.langs,
      r = Object.keys(s);
    if (r.length < 2) return null;
    const i = et().path.replace(t.value, ""),
      l = r.map((f) => ({ text: s[f].label, link: `${f}${i}` }));
    return { text: n.value.selectText || "Languages", items: l };
  });
}
const ru = ["GitHub", "GitLab", "Bitbucket"].map((e) => [
  e,
  new RegExp(e, "i"),
]);
function ou() {
  const { site: e } = me();
  return j(() => {
    const t = e.value.themeConfig,
      n = t.docsRepo || t.repo;
    if (!n) return null;
    const s = iu(n);
    return { text: lu(s, t.repoLabel), link: s };
  });
}
function iu(e) {
  return go.test(e) ? e : `https://github.com/${e}`;
}
function lu(e, t) {
  if (t) return t;
  const n = e.match(/^https?:\/\/[^/]+/);
  if (!n) return "Source";
  const s = ru.find(([r, o]) => o.test(n[0]));
  return s && s[0] ? s[0] : "Source";
}
const cu = (e) => (qr("data-v-bbc27490"), (e = e()), zr(), e),
  uu = { class: "nav-dropdown-link-item" },
  au = cu(() => S("span", { class: "arrow" }, null, -1)),
  fu = { class: "text" },
  du = { class: "icon" },
  hu = ie({
    props: { item: null },
    setup(e) {
      const n = Nr(e),
        { props: s, isExternal: r } = $o(n.item);
      return (o, i) => (
        T(),
        R("div", uu, [
          S(
            "a",
            bs({ class: "item" }, k(s)),
            [
              au,
              S("span", fu, be(e.item.text), 1),
              S("span", du, [k(r) ? (T(), ge(ks, { key: 0 })) : J("", !0)]),
            ],
            16
          ),
        ])
      );
    },
  });
var pu = ce(hu, [["__scopeId", "data-v-bbc27490"]]);
const _u = ["aria-label"],
  gu = { class: "button-text" },
  mu = { class: "dialog" },
  vu = ie({
    props: { item: null },
    setup(e) {
      const t = et(),
        n = $n(!1);
      ot(
        () => t.path,
        () => {
          n.value = !1;
        }
      );
      function s() {
        n.value = !n.value;
      }
      return (r, o) => (
        T(),
        R(
          "div",
          { class: ct(["nav-dropdown-link", { open: n.value }]) },
          [
            S(
              "button",
              { class: "button", "aria-label": e.item.ariaLabel, onClick: s },
              [
                S("span", gu, be(e.item.text), 1),
                S(
                  "span",
                  { class: ct(["button-arrow", n.value ? "down" : "right"]) },
                  null,
                  2
                ),
              ],
              8,
              _u
            ),
            S("ul", mu, [
              (T(!0),
              R(
                fe,
                null,
                An(
                  e.item.items,
                  (i) => (
                    T(),
                    R("li", { key: i.text, class: "dialog-item" }, [
                      N(pu, { item: i }, null, 8, ["item"]),
                    ])
                  )
                ),
                128
              )),
            ]),
          ],
          2
        )
      );
    },
  });
var fr = ce(vu, [["__scopeId", "data-v-56bf3a3f"]]);
const bu = { key: 0, class: "nav-links" },
  xu = { key: 1, class: "item" },
  yu = { key: 2, class: "item" },
  wu = ie({
    setup(e) {
      const { theme: t } = me(),
        n = su(),
        s = ou(),
        r = j(() => t.value.nav || s.value || n.value);
      return (o, i) =>
        k(r)
          ? (T(),
            R("nav", bu, [
              k(t).nav
                ? (T(!0),
                  R(
                    fe,
                    { key: 0 },
                    An(
                      k(t).nav,
                      (l) => (
                        T(),
                        R("div", { key: l.text, class: "item" }, [
                          l.items
                            ? (T(),
                              ge(fr, { key: 0, item: l }, null, 8, ["item"]))
                            : (T(),
                              ge(gn, { key: 1, item: l }, null, 8, ["item"])),
                        ])
                      )
                    ),
                    128
                  ))
                : J("", !0),
              k(n)
                ? (T(),
                  R("div", xu, [N(fr, { item: k(n) }, null, 8, ["item"])]))
                : J("", !0),
              k(s)
                ? (T(),
                  R("div", yu, [N(gn, { item: k(s) }, null, 8, ["item"])]))
                : J("", !0),
            ]))
          : J("", !0);
    },
  });
var ko = ce(wu, [["__scopeId", "data-v-eab3edfe"]]);
const $u = { emits: ["toggle"] },
  ku = S(
    "svg",
    {
      class: "icon",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      role: "img",
      viewBox: "0 0 448 512",
    },
    [
      S("path", {
        fill: "currentColor",
        d: "M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z",
        class: "",
      }),
    ],
    -1
  ),
  Cu = [ku];
function Eu(e, t, n, s, r, o) {
  return (
    T(),
    R(
      "div",
      {
        class: "sidebar-button",
        onClick: t[0] || (t[0] = (i) => e.$emit("toggle")),
      },
      Cu
    )
  );
}
var Tu = ce($u, [["render", Eu]]);
const Pu = (e) => (qr("data-v-675d8756"), (e = e()), zr(), e),
  Au = { class: "nav-bar" },
  Lu = Pu(() => S("div", { class: "flex-grow" }, null, -1)),
  Iu = { class: "nav" },
  Ou = ie({
    emits: ["toggle"],
    setup(e) {
      return (t, n) => (
        T(),
        R("header", Au, [
          N(Tu, { onToggle: n[0] || (n[0] = (s) => t.$emit("toggle")) }),
          N(nu),
          Lu,
          S("div", Iu, [N(ko)]),
          ue(t.$slots, "search", {}, void 0, !0),
        ])
      );
    },
  });
var Mu = ce(Ou, [["__scopeId", "data-v-675d8756"]]);
function Fu() {
  let e = null,
    t = null;
  const n = Bu(s, 300);
  function s() {
    const i = Ru(),
      l = Su(i);
    for (let u = 0; u < l.length; u++) {
      const f = l[u],
        h = l[u + 1],
        [v, w] = Hu(u, f, h);
      if (v) {
        history.replaceState(null, document.title, w || " "), r(w);
        return;
      }
    }
  }
  function r(i) {
    if (
      (o(t), o(e), (t = document.querySelector(`.sidebar a[href="${i}"]`)), !t)
    )
      return;
    t.classList.add("active");
    const l = t.closest(".sidebar-links > ul > li");
    l && l !== t.parentElement
      ? ((e = l.querySelector("a")), e && e.classList.add("active"))
      : (e = null);
  }
  function o(i) {
    i && i.classList.remove("active");
  }
  kt(() => {
    s(), window.addEventListener("scroll", n);
  }),
    Qr(() => {
      r(decodeURIComponent(location.hash));
    }),
    Tn(() => {
      window.removeEventListener("scroll", n);
    });
}
function Ru() {
  return [].slice.call(
    document.querySelectorAll(".sidebar a.sidebar-link-item")
  );
}
function Su(e) {
  return [].slice
    .call(document.querySelectorAll(".header-anchor"))
    .filter((t) => e.some((n) => n.hash === t.hash));
}
function Nu() {
  return document.querySelector(".nav-bar").offsetHeight;
}
function dr(e) {
  const t = Nu();
  return e.parentElement.offsetTop - t - 15;
}
function Hu(e, t, n) {
  const s = window.scrollY;
  return e === 0 && s === 0
    ? [!0, null]
    : s < dr(t)
    ? [!1, null]
    : !n || s < dr(n)
    ? [!0, decodeURIComponent(t.hash)]
    : [!1, null];
}
function Bu(e, t) {
  let n,
    s = !1;
  return () => {
    n && clearTimeout(n),
      s
        ? (n = setTimeout(e, t))
        : (e(),
          (s = !0),
          setTimeout(() => {
            s = !1;
          }, t));
  };
}
function Uu() {
  const e = et(),
    { site: t } = me();
  return (
    Fu(),
    j(() => {
      const n = e.data.headers,
        s = e.data.frontmatter.sidebar,
        r = e.data.frontmatter.sidebarDepth;
      if (s === !1) return [];
      if (s === "auto") return hr(n, r);
      const o = $s(t.value.themeConfig.sidebar, e.data.relativePath);
      return o === !1 ? [] : o === "auto" ? hr(n, r) : o;
    })
  );
}
function hr(e, t) {
  const n = [];
  if (e === void 0) return [];
  let s;
  return (
    e.forEach(({ level: r, title: o, slug: i }) => {
      if (r - 1 > t) return;
      const l = { text: o, link: `#${i}` };
      r === 2
        ? ((s = l), n.push(l))
        : s && (s.children || (s.children = [])).push(l);
    }),
    n
  );
}
const Co = (e) => {
  const t = et(),
    { site: n, frontmatter: s } = me(),
    r = e.depth || 1,
    o = s.value.sidebarDepth || 1 / 0,
    i = t.data.headers,
    l = e.item.text,
    u = ju(n.value.base, e.item.link),
    f = e.item.children,
    h = gc(t, e.item.link),
    v = r < o ? Eo(h, f, i, r + 1) : null;
  return ut("li", { class: "sidebar-link" }, [
    ut(
      u ? "a" : "p",
      { class: { "sidebar-link-item": !0, active: h }, href: u },
      l
    ),
    v,
  ]);
};
function ju(e, t) {
  return t === void 0 || t.startsWith("#") ? t : mc(e, t);
}
function Eo(e, t, n, s = 1) {
  return t && t.length > 0
    ? ut(
        "ul",
        { class: "sidebar-links" },
        t.map((r) => ut(Co, { item: r, depth: s }))
      )
    : e && n
    ? Eo(!1, Du(n), void 0, s)
    : null;
}
function Du(e) {
  return To(Ku(e));
}
function Ku(e) {
  e = e.map((n) => Object.assign({}, n));
  let t;
  return (
    e.forEach((n) => {
      n.level === 2 ? (t = n) : t && (t.children || (t.children = [])).push(n);
    }),
    e.filter((n) => n.level === 2)
  );
}
function To(e) {
  return e.map((t) => ({
    text: t.title,
    link: `#${t.slug}`,
    children: t.children ? To(t.children) : void 0,
  }));
}
const Wu = { key: 0, class: "sidebar-links" },
  qu = ie({
    setup(e) {
      const t = Uu();
      return (n, s) =>
        k(t).length > 0
          ? (T(),
            R("ul", Wu, [
              (T(!0),
              R(
                fe,
                null,
                An(
                  k(t),
                  (r) => (T(), ge(k(Co), { item: r }, null, 8, ["item"]))
                ),
                256
              )),
            ]))
          : J("", !0);
    },
  });
const zu = ie({
  props: { open: { type: Boolean } },
  setup(e) {
    return (t, n) => (
      T(),
      R(
        "aside",
        { class: ct(["sidebar", { open: e.open }]) },
        [
          N(ko, { class: "nav" }),
          ue(t.$slots, "sidebar-top", {}, void 0, !0),
          N(qu),
          ue(t.$slots, "sidebar-bottom", {}, void 0, !0),
        ],
        2
      )
    );
  },
});
var Vu = ce(zu, [["__scopeId", "data-v-83e92a68"]]);
const Ju = /bitbucket.org/;
function Yu() {
  const { page: e, theme: t, frontmatter: n } = me(),
    s = j(() => {
      const {
          repo: o,
          docsDir: i = "",
          docsBranch: l = "master",
          docsRepo: u = o,
          editLinks: f,
        } = t.value,
        h = n.value.editLink != null ? n.value.editLink : f,
        { relativePath: v } = e.value;
      return !h || !v || !o ? null : Xu(o, u, i, l, v);
    }),
    r = j(() => t.value.editLinkText || "Edit this page");
  return { url: s, text: r };
}
function Xu(e, t, n, s, r) {
  return Ju.test(e) ? Qu(e, t, n, s, r) : Zu(e, t, n, s, r);
}
function Zu(e, t, n, s, r) {
  return (
    (ws(t) ? t : `https://github.com/${t}`).replace(_n, "") +
    `/edit/${s}/` +
    (n ? n.replace(_n, "") + "/" : "") +
    r
  );
}
function Qu(e, t, n, s, r) {
  return (
    (ws(t) ? t : e).replace(_n, "") +
    `/src/${s}/` +
    (n ? n.replace(_n, "") + "/" : "") +
    r +
    `?mode=edit&spa=0&at=${s}&fileviewer=file-view-default`
  );
}
const Gu = { class: "edit-link" },
  ea = ["href"],
  ta = ie({
    setup(e) {
      const { url: t, text: n } = Yu();
      return (s, r) => (
        T(),
        R("div", Gu, [
          k(t)
            ? (T(),
              R(
                "a",
                {
                  key: 0,
                  class: "link",
                  href: k(t),
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                [qt(be(k(n)) + " ", 1), N(ks, { class: "icon" })],
                8,
                ea
              ))
            : J("", !0),
        ])
      );
    },
  });
var na = ce(ta, [["__scopeId", "data-v-1ed99556"]]);
const sa = { key: 0, class: "last-updated" },
  ra = { class: "prefix" },
  oa = { class: "datetime" },
  ia = ie({
    setup(e) {
      const { theme: t, page: n } = me(),
        s = j(() => {
          const i = t.value.lastUpdated;
          return i !== void 0 && i !== !1 && n.value.lastUpdated !== 0;
        }),
        r = j(() => {
          const i = t.value.lastUpdated;
          return i === !0 ? "Last Updated" : i;
        }),
        o = $n("");
      return (
        kt(() => {
          Jr(() => {
            o.value = new Date(n.value.lastUpdated).toLocaleString("en-US");
          });
        }),
        (i, l) =>
          k(s)
            ? (T(),
              R("p", sa, [
                S("span", ra, be(k(r)) + ":", 1),
                S("span", oa, be(o.value), 1),
              ]))
            : J("", !0)
      );
    },
  });
var la = ce(ia, [["__scopeId", "data-v-abce3432"]]);
const ca = { class: "page-footer" },
  ua = { class: "edit" },
  aa = { class: "updated" },
  fa = ie({
    setup(e) {
      const { page: t } = me();
      return (n, s) => (
        T(),
        R("footer", ca, [
          S("div", ua, [N(na)]),
          S("div", aa, [
            k(t).lastUpdated ? (T(), ge(la, { key: 0 })) : J("", !0),
          ]),
        ])
      );
    },
  });
var da = ce(fa, [["__scopeId", "data-v-07c132fc"]]);
function ha() {
  const { page: e, theme: t } = me(),
    n = j(() => yo(Gn(e.value.relativePath))),
    s = j(() => {
      const u = $s(t.value.sidebar, n.value);
      return ys(u) ? wo(u) : [];
    }),
    r = j(() => s.value.findIndex((u) => u.link === n.value)),
    o = j(() => {
      if (
        t.value.nextLinks !== !1 &&
        r.value > -1 &&
        r.value < s.value.length - 1
      )
        return s.value[r.value + 1];
    }),
    i = j(() => {
      if (t.value.prevLinks !== !1 && r.value > 0) return s.value[r.value - 1];
    }),
    l = j(() => !!o.value || !!i.value);
  return { next: o, prev: i, hasLinks: l };
}
const pa = {},
  _a = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  ga = S(
    "path",
    {
      d: "M19,11H7.4l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-7,7c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3l7,7c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.4,13H19c0.6,0,1-0.4,1-1S19.6,11,19,11z",
    },
    null,
    -1
  ),
  ma = [ga];
function va(e, t) {
  return T(), R("svg", _a, ma);
}
var ba = ce(pa, [["render", va]]);
const xa = {},
  ya = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  wa = S(
    "path",
    {
      d: "M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z",
    },
    null,
    -1
  ),
  $a = [wa];
function ka(e, t) {
  return T(), R("svg", ya, $a);
}
var Ca = ce(xa, [["render", ka]]);
const Ea = { key: 0, class: "next-and-prev-link" },
  Ta = { class: "container" },
  Pa = { class: "prev" },
  Aa = ["href"],
  La = { class: "text" },
  Ia = { class: "next" },
  Oa = ["href"],
  Ma = { class: "text" },
  Fa = ie({
    setup(e) {
      const { hasLinks: t, prev: n, next: s } = ha();
      return (r, o) =>
        k(t)
          ? (T(),
            R("div", Ea, [
              S("div", Ta, [
                S("div", Pa, [
                  k(n)
                    ? (T(),
                      R(
                        "a",
                        { key: 0, class: "link", href: k(xt)(k(n).link) },
                        [
                          N(ba, { class: "icon icon-prev" }),
                          S("span", La, be(k(n).text), 1),
                        ],
                        8,
                        Aa
                      ))
                    : J("", !0),
                ]),
                S("div", Ia, [
                  k(s)
                    ? (T(),
                      R(
                        "a",
                        { key: 0, class: "link", href: k(xt)(k(s).link) },
                        [
                          S("span", Ma, be(k(s).text), 1),
                          N(Ca, { class: "icon icon-next" }),
                        ],
                        8,
                        Oa
                      ))
                    : J("", !0),
                ]),
              ]),
            ]))
          : J("", !0);
    },
  });
var Ra = ce(Fa, [["__scopeId", "data-v-38ede35f"]]);
const Sa = { class: "page" },
  Na = { class: "container" },
  Ha = ie({
    setup(e) {
      return (t, n) => {
        const s = an("Content");
        return (
          T(),
          R("main", Sa, [
            S("div", Na, [
              ue(t.$slots, "top", {}, void 0, !0),
              N(s, { class: "content" }),
              N(da),
              N(Ra),
              ue(t.$slots, "bottom", {}, void 0, !0),
            ]),
          ])
        );
      };
    },
  });
var Ba = ce(Ha, [["__scopeId", "data-v-7eddb2c4"]]);
const Ua = { key: 0, id: "ads-container" },
  ja = ie({
    setup(e) {
      const t = () => null,
        n = t,
        s = t,
        r = t,
        o = et(),
        { site: i, page: l, theme: u, frontmatter: f } = me(),
        h = j(() => !!f.value.customLayout),
        v = j(() => !!f.value.home),
        w = j(() => Object.keys(i.value.langs).length > 1),
        P = j(() => {
          const I = u.value;
          return f.value.navbar === !1 || I.navbar === !1
            ? !1
            : i.value.title || I.logo || I.repo || I.nav;
        }),
        M = $n(!1),
        V = j(() =>
          f.value.home || f.value.sidebar === !1
            ? !1
            : !xc($s(u.value.sidebar, o.data.relativePath))
        ),
        g = (I) => {
          M.value = typeof I == "boolean" ? I : !M.value;
        },
        y = g.bind(null, !1);
      ot(o, y);
      const K = j(() => [
        {
          "no-navbar": !P.value,
          "sidebar-open": M.value,
          "no-sidebar": !V.value,
        },
      ]);
      return (I, B) => {
        const X = an("Content"),
          Z = an("Debug");
        return (
          T(),
          R(
            fe,
            null,
            [
              S(
                "div",
                { class: ct(["theme", k(K)]) },
                [
                  k(P)
                    ? (T(),
                      ge(
                        Mu,
                        { key: 0, onToggle: g },
                        {
                          search: je(() => [
                            ue(I.$slots, "navbar-search", {}, () => [
                              k(u).algolia
                                ? (T(),
                                  ge(
                                    k(r),
                                    {
                                      key: 0,
                                      options: k(u).algolia,
                                      multilang: k(w),
                                    },
                                    null,
                                    8,
                                    ["options", "multilang"]
                                  ))
                                : J("", !0),
                            ]),
                          ]),
                          _: 3,
                        }
                      ))
                    : J("", !0),
                  N(
                    Vu,
                    { open: M.value },
                    {
                      "sidebar-top": je(() => [ue(I.$slots, "sidebar-top")]),
                      "sidebar-bottom": je(() => [
                        ue(I.$slots, "sidebar-bottom"),
                      ]),
                      _: 3,
                    },
                    8,
                    ["open"]
                  ),
                  S("div", {
                    class: "sidebar-mask",
                    onClick: B[0] || (B[0] = (U) => g(!1)),
                  }),
                  k(h)
                    ? (T(), ge(X, { key: 1 }))
                    : k(v)
                    ? ue(I.$slots, "home", { key: 2 }, () => [
                        N(Qc, null, {
                          hero: je(() => [ue(I.$slots, "home-hero")]),
                          features: je(() => [ue(I.$slots, "home-features")]),
                          footer: je(() => [ue(I.$slots, "home-footer")]),
                          _: 3,
                        }),
                      ])
                    : (T(),
                      ge(
                        Ba,
                        { key: 3 },
                        {
                          top: je(() => [
                            ue(I.$slots, "page-top-ads", {}, () => [
                              k(u).carbonAds && k(u).carbonAds.carbon
                                ? (T(),
                                  R("div", Ua, [
                                    (T(),
                                    ge(
                                      k(n),
                                      {
                                        key: "carbon" + k(l).relativePath,
                                        code: k(u).carbonAds.carbon,
                                        placement: k(u).carbonAds.placement,
                                      },
                                      null,
                                      8,
                                      ["code", "placement"]
                                    )),
                                  ]))
                                : J("", !0),
                            ]),
                            ue(I.$slots, "page-top"),
                          ]),
                          bottom: je(() => [
                            ue(I.$slots, "page-bottom"),
                            ue(I.$slots, "page-bottom-ads", {}, () => [
                              k(u).carbonAds && k(u).carbonAds.custom
                                ? (T(),
                                  ge(
                                    k(s),
                                    {
                                      key: "custom" + k(l).relativePath,
                                      code: k(u).carbonAds.custom,
                                      placement: k(u).carbonAds.placement,
                                    },
                                    null,
                                    8,
                                    ["code", "placement"]
                                  ))
                                : J("", !0),
                            ]),
                          ]),
                          _: 3,
                        }
                      )),
                ],
                2
              ),
              N(Z),
            ],
            64
          )
        );
      };
    },
  }),
  Da = { class: "theme" },
  Ka = S("h1", null, "404", -1),
  Wa = ["href"],
  qa = ie({
    setup(e) {
      const { site: t } = me(),
        n = [
          "There's nothing here.",
          "How did we get here?",
          "That's a Four-Oh-Four.",
          "Looks like we've got some broken links.",
        ];
      function s() {
        return n[Math.floor(Math.random() * n.length)];
      }
      return (r, o) => (
        T(),
        R("div", Da, [
          Ka,
          S("blockquote", null, be(s()), 1),
          S(
            "a",
            { href: k(t).base, "aria-label": "go to home" },
            "Take me home.",
            8,
            Wa
          ),
        ])
      );
    },
  }),
  za = { Layout: ja, NotFound: qa };
var mn = Os({}, za);
const Un = new Set(),
  Po = () => document.createElement("link"),
  Va = (e) => {
    const t = Po();
    (t.rel = "prefetch"), (t.href = e), document.head.appendChild(t);
  },
  Ja = (e) => {
    const t = new XMLHttpRequest();
    t.open("GET", e, (t.withCredentials = !0)), t.send();
  };
let en;
const Ya =
  Pe &&
  (en = Po()) &&
  en.relList &&
  en.relList.supports &&
  en.relList.supports("prefetch")
    ? Va
    : Ja;
function Xa() {
  if (!Pe || !window.IntersectionObserver) return;
  let e;
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return;
  const t = window.requestIdleCallback || setTimeout;
  let n = null;
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((o) => {
        o.forEach((i) => {
          if (i.isIntersecting) {
            const l = i.target;
            n.unobserve(l);
            const { pathname: u } = l;
            if (!Un.has(u)) {
              Un.add(u);
              const f = vo(u);
              Ya(f);
            }
          }
        });
      })),
      t(() => {
        document.querySelectorAll("#app a").forEach((o) => {
          const { target: i, hostname: l, pathname: u } = o,
            f = u.match(/\.\w+$/);
          (f && f[0] !== ".html") ||
            (i !== "_blank" &&
              l === location.hostname &&
              (u !== location.pathname ? n.observe(o) : Un.add(u)));
        });
      });
  };
  kt(s);
  const r = et();
  ot(() => r.path, s),
    Tn(() => {
      n && n.disconnect();
    });
}
const Za = ie({
    setup(e, { slots: t }) {
      const n = $n(!1);
      return (
        kt(() => {
          n.value = !0;
        }),
        () => (n.value && t.default ? t.default() : null)
      );
    },
  }),
  Qa = mn.NotFound || (() => "404 Not Found"),
  Ga = {
    name: "VitePressApp",
    setup() {
      const { site: e } = me();
      return (
        kt(() => {
          ot(
            () => e.value.lang,
            (t) => {
              document.documentElement.lang = t;
            },
            { immediate: !0 }
          );
        }),
        Xa(),
        () => ut(mn.Layout)
      );
    },
  };
function ef() {
  const e = nf(),
    t = tf();
  t.provide(bo, e);
  const n = rc(e.route);
  return (
    t.provide(mo, n),
    Pe && uc(e.route, n.site),
    t.component("Content", dc),
    t.component("ClientOnly", Za),
    t.component("Debug", () => null),
    Object.defineProperty(t.config.globalProperties, "$frontmatter", {
      get() {
        return n.frontmatter.value;
      },
    }),
    mn.enhanceApp && mn.enhanceApp({ app: t, router: e, siteData: zt }),
    { app: t, router: e }
  );
}
function tf() {
  return Xl(Ga);
}
function nf() {
  let e = Pe,
    t;
  return lc((n) => {
    let s = vo(n);
    return (
      e && (t = s),
      (e || t === s) && (s = s.replace(/\.js$/, ".lean.js")),
      Pe ? ((e = !1), import(s)) : require(s)
    );
  }, Qa);
}
if (Pe) {
  const { app: e, router: t } = ef();
  t.go().then(() => {
    e.mount("#app");
  });
}
export { ce as _, rf as a, R as c, ef as createApp, T as o, $n as r };
