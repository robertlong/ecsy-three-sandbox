// This is ammo.js, a port of Bullet Physics to JavaScript. zlib licensed.

var Ammo = (function () {
  var _scriptDir =
    typeof document !== "undefined" && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== "undefined") _scriptDir = _scriptDir || __filename;
  return function (Ammo) {
    Ammo = Ammo || {};

    var b;
    b || (b = typeof Ammo !== "undefined" ? Ammo : {});
    var ba;
    b.ready = new Promise(function (a) {
      ba = a;
    });
    var ca = {},
      da;
    for (da in b) b.hasOwnProperty(da) && (ca[da] = b[da]);
    var ea = !1,
      fa = !1,
      ha = !1,
      ia = !1;
    ea = "object" === typeof window;
    fa = "function" === typeof importScripts;
    ha =
      "object" === typeof process &&
      "object" === typeof process.versions &&
      "string" === typeof process.versions.node;
    ia = !ea && !ha && !fa;
    var ja = "",
      ka,
      la,
      ma,
      na;
    if (ha)
      (ja = fa ? require("path").dirname(ja) + "/" : __dirname + "/"),
        (ka = function (a, c) {
          ma || (ma = require("fs"));
          na || (na = require("path"));
          a = na.normalize(a);
          return ma.readFileSync(a, c ? null : "utf8");
        }),
        (la = function (a) {
          a = ka(a, !0);
          a.buffer || (a = new Uint8Array(a));
          assert(a.buffer);
          return a;
        }),
        1 < process.argv.length && process.argv[1].replace(/\\/g, "/"),
        process.argv.slice(2),
        process.on("uncaughtException", function (a) {
          throw a;
        }),
        process.on("unhandledRejection", oa),
        (b.inspect = function () {
          return "[Emscripten Module object]";
        });
    else if (ia)
      "undefined" != typeof read &&
        (ka = function (a) {
          return read(a);
        }),
        (la = function (a) {
          if ("function" === typeof readbuffer)
            return new Uint8Array(readbuffer(a));
          a = read(a, "binary");
          assert("object" === typeof a);
          return a;
        }),
        "undefined" !== typeof print &&
          ("undefined" === typeof console && (console = {}),
          (console.log = print),
          (console.warn = console.error =
            "undefined" !== typeof printErr ? printErr : print));
    else if (ea || fa)
      fa
        ? (ja = self.location.href)
        : document.currentScript && (ja = document.currentScript.src),
        _scriptDir && (ja = _scriptDir),
        (ja =
          0 !== ja.indexOf("blob:")
            ? ja.substr(0, ja.lastIndexOf("/") + 1)
            : ""),
        (ka = function (a) {
          var c = new XMLHttpRequest();
          c.open("GET", a, !1);
          c.send(null);
          return c.responseText;
        }),
        fa &&
          (la = function (a) {
            var c = new XMLHttpRequest();
            c.open("GET", a, !1);
            c.responseType = "arraybuffer";
            c.send(null);
            return new Uint8Array(c.response);
          });
    var pa = b.print || console.log.bind(console),
      qa = b.printErr || console.warn.bind(console);
    for (da in ca) ca.hasOwnProperty(da) && (b[da] = ca[da]);
    ca = null;
    var ra;
    b.wasmBinary && (ra = b.wasmBinary);
    var noExitRuntime;
    b.noExitRuntime && (noExitRuntime = b.noExitRuntime);
    "object" !== typeof WebAssembly && qa("no native wasm support detected");
    var sa,
      ua = new WebAssembly.Table({
        initial: 930,
        maximum: 930,
        element: "anyfunc",
      }),
      va = !1;
    function assert(a, c) {
      a || oa("Assertion failed: " + c);
    }
    var wa =
        "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0,
      xa,
      ya,
      za,
      Aa,
      Ba,
      Ca,
      Da = b.INITIAL_MEMORY || 67108864;
    if (
      (sa = b.wasmMemory
        ? b.wasmMemory
        : new WebAssembly.Memory({ initial: Da / 65536, maximum: Da / 65536 }))
    )
      xa = sa.buffer;
    Da = xa.byteLength;
    var Ea = xa;
    xa = Ea;
    b.HEAP8 = ya = new Int8Array(Ea);
    b.HEAP16 = new Int16Array(Ea);
    b.HEAP32 = Aa = new Int32Array(Ea);
    b.HEAPU8 = za = new Uint8Array(Ea);
    b.HEAPU16 = new Uint16Array(Ea);
    b.HEAPU32 = new Uint32Array(Ea);
    b.HEAPF32 = Ba = new Float32Array(Ea);
    b.HEAPF64 = Ca = new Float64Array(Ea);
    Aa[7848] = 5274432;
    function Fa(a) {
      for (; 0 < a.length; ) {
        var c = a.shift();
        if ("function" == typeof c) c(b);
        else {
          var d = c.Xy;
          "number" === typeof d
            ? void 0 === c.Ey
              ? b.dynCall_v(d)
              : b.dynCall_vi(d, c.Ey)
            : d(void 0 === c.Ey ? null : c.Ey);
        }
      }
    }
    var Ga = [],
      Ha = [],
      Ia = [],
      Ja = [],
      Ka = !1;
    function La() {
      var a = b.preRun.shift();
      Ga.unshift(a);
    }
    var Ma = 0,
      Na = null,
      Oa = null;
    b.preloadedImages = {};
    b.preloadedAudios = {};
    function oa(a) {
      if (b.onAbort) b.onAbort(a);
      a += "";
      pa(a);
      qa(a);
      va = !0;
      throw new WebAssembly.RuntimeError(
        "abort(" + a + "). Build with -s ASSERTIONS=1 for more info."
      );
    }
    function Pa(a) {
      var c = Qa;
      return String.prototype.startsWith ? c.startsWith(a) : 0 === c.indexOf(a);
    }
    function Ra() {
      return Pa("data:application/octet-stream;base64,");
    }
    var Qa = "ammo.wasm.wasm";
    if (!Ra()) {
      var Sa = Qa;
      Qa = b.locateFile ? b.locateFile(Sa, ja) : ja + Sa;
    }
    function Ta() {
      try {
        if (ra) return new Uint8Array(ra);
        if (la) return la(Qa);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        oa(a);
      }
    }
    function Ua() {
      return ra || (!ea && !fa) || "function" !== typeof fetch || Pa("file://")
        ? new Promise(function (a) {
            a(Ta());
          })
        : fetch(Qa, { credentials: "same-origin" })
            .then(function (a) {
              if (!a.ok)
                throw "failed to load wasm binary file at '" + Qa + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Ta();
            });
    }
    var Va = {
      1960: function (a, c, d, e, g, n, F, aa) {
        a = b.getCache(b.ConcreteContactResultCallback)[a];
        if (!a.hasOwnProperty("addSingleResult"))
          throw "a JSImplementation must implement all functions, you forgot ConcreteContactResultCallback::addSingleResult.";
        return a.addSingleResult(c, d, e, g, n, F, aa);
      },
      2520: function (a, c, d, e) {
        a = b.getCache(b.DebugDrawer)[a];
        if (!a.hasOwnProperty("drawLine"))
          throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawLine.";
        a.drawLine(c, d, e);
      },
      2745: function (a, c, d, e, g, n) {
        a = b.getCache(b.DebugDrawer)[a];
        if (!a.hasOwnProperty("drawContactPoint"))
          throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawContactPoint.";
        a.drawContactPoint(c, d, e, g, n);
      },
      3002: function (a, c) {
        a = b.getCache(b.DebugDrawer)[a];
        if (!a.hasOwnProperty("reportErrorWarning"))
          throw "a JSImplementation must implement all functions, you forgot DebugDrawer::reportErrorWarning.";
        a.reportErrorWarning(c);
      },
      3249: function (a, c, d) {
        a = b.getCache(b.DebugDrawer)[a];
        if (!a.hasOwnProperty("draw3dText"))
          throw "a JSImplementation must implement all functions, you forgot DebugDrawer::draw3dText.";
        a.draw3dText(c, d);
      },
      3476: function (a, c) {
        a = b.getCache(b.DebugDrawer)[a];
        if (!a.hasOwnProperty("setDebugMode"))
          throw "a JSImplementation must implement all functions, you forgot DebugDrawer::setDebugMode.";
        a.setDebugMode(c);
      },
      3705: function (a) {
        a = b.getCache(b.DebugDrawer)[a];
        if (!a.hasOwnProperty("getDebugMode"))
          throw "a JSImplementation must implement all functions, you forgot DebugDrawer::getDebugMode.";
        return a.getDebugMode();
      },
    };
    Ha.push({
      Xy: function () {
        Wa();
      },
    });
    var Xa = [];
    function Ya(a, c) {
      Xa.length = 0;
      var d;
      for (c >>= 2; (d = za[a++]); )
        Xa.push(105 > d ? Ca[++c >> 1] : Aa[c]), ++c;
      return Xa;
    }
    var Za = {
      f: function () {
        oa();
      },
      c: function (a, c, d) {
        c = Ya(c, d);
        return Va[a].apply(null, c);
      },
      a: function (a, c, d) {
        c = Ya(c, d);
        return Va[a].apply(null, c);
      },
      d: function (a, c, d) {
        za.copyWithin(a, c, c + d);
      },
      e: function () {
        oa("OOM");
      },
      b: function (a) {
        var c = Date.now();
        Aa[a >> 2] = (c / 1e3) | 0;
        Aa[(a + 4) >> 2] = ((c % 1e3) * 1e3) | 0;
        return 0;
      },
      memory: sa,
      table: ua,
    };
    (function () {
      function a(g) {
        b.asm = g.exports;
        Ma--;
        b.monitorRunDependencies && b.monitorRunDependencies(Ma);
        0 == Ma &&
          (null !== Na && (clearInterval(Na), (Na = null)),
          Oa && ((g = Oa), (Oa = null), g()));
      }
      function c(g) {
        a(g.instance);
      }
      function d(g) {
        return Ua()
          .then(function (n) {
            return WebAssembly.instantiate(n, e);
          })
          .then(g, function (n) {
            qa("failed to asynchronously prepare wasm: " + n);
            oa(n);
          });
      }
      var e = { a: Za };
      Ma++;
      b.monitorRunDependencies && b.monitorRunDependencies(Ma);
      if (b.instantiateWasm)
        try {
          return b.instantiateWasm(e, a);
        } catch (g) {
          return (
            qa("Module.instantiateWasm callback failed with error: " + g), !1
          );
        }
      (function () {
        if (
          ra ||
          "function" !== typeof WebAssembly.instantiateStreaming ||
          Ra() ||
          Pa("file://") ||
          "function" !== typeof fetch
        )
          return d(c);
        fetch(Qa, { credentials: "same-origin" }).then(function (g) {
          return WebAssembly.instantiateStreaming(g, e).then(c, function (n) {
            qa("wasm streaming compile failed: " + n);
            qa("falling back to ArrayBuffer instantiation");
            return d(c);
          });
        });
      })();
      return {};
    })();
    var Wa = (b.___wasm_call_ctors = function () {
      return (Wa = b.___wasm_call_ctors = b.asm.g).apply(null, arguments);
    });
    b.___em_js__array_bounds_check_error = function () {
      return (b.___em_js__array_bounds_check_error = b.asm.h).apply(
        null,
        arguments
      );
    };
    var $a = (b._emscripten_bind_btCollisionWorld_getDispatcher_0 = function () {
        return ($a = b._emscripten_bind_btCollisionWorld_getDispatcher_0 =
          b.asm.i).apply(null, arguments);
      }),
      ab = (b._emscripten_bind_btCollisionWorld_rayTest_3 = function () {
        return (ab = b._emscripten_bind_btCollisionWorld_rayTest_3 =
          b.asm.j).apply(null, arguments);
      }),
      bb = (b._emscripten_bind_btCollisionWorld_getPairCache_0 = function () {
        return (bb = b._emscripten_bind_btCollisionWorld_getPairCache_0 =
          b.asm.k).apply(null, arguments);
      }),
      cb = (b._emscripten_bind_btCollisionWorld_getDispatchInfo_0 = function () {
        return (cb = b._emscripten_bind_btCollisionWorld_getDispatchInfo_0 =
          b.asm.l).apply(null, arguments);
      }),
      db = (b._emscripten_bind_btCollisionWorld_addCollisionObject_1 = function () {
        return (db = b._emscripten_bind_btCollisionWorld_addCollisionObject_1 =
          b.asm.m).apply(null, arguments);
      }),
      eb = (b._emscripten_bind_btCollisionWorld_addCollisionObject_2 = function () {
        return (eb = b._emscripten_bind_btCollisionWorld_addCollisionObject_2 =
          b.asm.n).apply(null, arguments);
      }),
      fb = (b._emscripten_bind_btCollisionWorld_addCollisionObject_3 = function () {
        return (fb = b._emscripten_bind_btCollisionWorld_addCollisionObject_3 =
          b.asm.o).apply(null, arguments);
      }),
      gb = (b._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = function () {
        return (gb = b._emscripten_bind_btCollisionWorld_removeCollisionObject_1 =
          b.asm.p).apply(null, arguments);
      }),
      hb = (b._emscripten_bind_btCollisionWorld_getBroadphase_0 = function () {
        return (hb = b._emscripten_bind_btCollisionWorld_getBroadphase_0 =
          b.asm.q).apply(null, arguments);
      }),
      ib = (b._emscripten_bind_btCollisionWorld_convexSweepTest_5 = function () {
        return (ib = b._emscripten_bind_btCollisionWorld_convexSweepTest_5 =
          b.asm.r).apply(null, arguments);
      }),
      jb = (b._emscripten_bind_btCollisionWorld_contactPairTest_3 = function () {
        return (jb = b._emscripten_bind_btCollisionWorld_contactPairTest_3 =
          b.asm.s).apply(null, arguments);
      }),
      kb = (b._emscripten_bind_btCollisionWorld_contactTest_2 = function () {
        return (kb = b._emscripten_bind_btCollisionWorld_contactTest_2 =
          b.asm.t).apply(null, arguments);
      }),
      lb = (b._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = function () {
        return (lb = b._emscripten_bind_btCollisionWorld_updateSingleAabb_1 =
          b.asm.u).apply(null, arguments);
      }),
      mb = (b._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = function () {
        return (mb = b._emscripten_bind_btCollisionWorld_setDebugDrawer_1 =
          b.asm.v).apply(null, arguments);
      }),
      nb = (b._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = function () {
        return (nb = b._emscripten_bind_btCollisionWorld_getDebugDrawer_0 =
          b.asm.w).apply(null, arguments);
      }),
      ob = (b._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = function () {
        return (ob = b._emscripten_bind_btCollisionWorld_debugDrawWorld_0 =
          b.asm.x).apply(null, arguments);
      }),
      pb = (b._emscripten_bind_btCollisionWorld_debugDrawObject_3 = function () {
        return (pb = b._emscripten_bind_btCollisionWorld_debugDrawObject_3 =
          b.asm.y).apply(null, arguments);
      }),
      qb = (b._emscripten_bind_btCollisionWorld___destroy___0 = function () {
        return (qb = b._emscripten_bind_btCollisionWorld___destroy___0 =
          b.asm.z).apply(null, arguments);
      }),
      rb = (b._emscripten_bind_btCollisionShape_setLocalScaling_1 = function () {
        return (rb = b._emscripten_bind_btCollisionShape_setLocalScaling_1 =
          b.asm.A).apply(null, arguments);
      }),
      sb = (b._emscripten_bind_btCollisionShape_getLocalScaling_0 = function () {
        return (sb = b._emscripten_bind_btCollisionShape_getLocalScaling_0 =
          b.asm.B).apply(null, arguments);
      }),
      tb = (b._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = function () {
        return (tb = b._emscripten_bind_btCollisionShape_calculateLocalInertia_2 =
          b.asm.C).apply(null, arguments);
      }),
      ub = (b._emscripten_bind_btCollisionShape_setMargin_1 = function () {
        return (ub = b._emscripten_bind_btCollisionShape_setMargin_1 =
          b.asm.D).apply(null, arguments);
      }),
      vb = (b._emscripten_bind_btCollisionShape_getMargin_0 = function () {
        return (vb = b._emscripten_bind_btCollisionShape_getMargin_0 =
          b.asm.E).apply(null, arguments);
      }),
      wb = (b._emscripten_bind_btCollisionShape___destroy___0 = function () {
        return (wb = b._emscripten_bind_btCollisionShape___destroy___0 =
          b.asm.F).apply(null, arguments);
      }),
      xb = (b._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = function () {
        return (xb = b._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 =
          b.asm.G).apply(null, arguments);
      }),
      yb = (b._emscripten_bind_btCollisionObject_getCollisionShape_0 = function () {
        return (yb = b._emscripten_bind_btCollisionObject_getCollisionShape_0 =
          b.asm.H).apply(null, arguments);
      }),
      zb = (b._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = function () {
        return (zb = b._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 =
          b.asm.I).apply(null, arguments);
      }),
      Ab = (b._emscripten_bind_btCollisionObject_setActivationState_1 = function () {
        return (Ab = b._emscripten_bind_btCollisionObject_setActivationState_1 =
          b.asm.J).apply(null, arguments);
      }),
      Bb = (b._emscripten_bind_btCollisionObject_forceActivationState_1 = function () {
        return (Bb = b._emscripten_bind_btCollisionObject_forceActivationState_1 =
          b.asm.K).apply(null, arguments);
      }),
      Cb = (b._emscripten_bind_btCollisionObject_activate_0 = function () {
        return (Cb = b._emscripten_bind_btCollisionObject_activate_0 =
          b.asm.L).apply(null, arguments);
      }),
      Db = (b._emscripten_bind_btCollisionObject_activate_1 = function () {
        return (Db = b._emscripten_bind_btCollisionObject_activate_1 =
          b.asm.M).apply(null, arguments);
      }),
      Eb = (b._emscripten_bind_btCollisionObject_isActive_0 = function () {
        return (Eb = b._emscripten_bind_btCollisionObject_isActive_0 =
          b.asm.N).apply(null, arguments);
      }),
      Fb = (b._emscripten_bind_btCollisionObject_isKinematicObject_0 = function () {
        return (Fb = b._emscripten_bind_btCollisionObject_isKinematicObject_0 =
          b.asm.O).apply(null, arguments);
      }),
      Gb = (b._emscripten_bind_btCollisionObject_isStaticObject_0 = function () {
        return (Gb = b._emscripten_bind_btCollisionObject_isStaticObject_0 =
          b.asm.P).apply(null, arguments);
      }),
      Hb = (b._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 = function () {
        return (Hb = b._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 =
          b.asm.Q).apply(null, arguments);
      }),
      Ib = (b._emscripten_bind_btCollisionObject_getRestitution_0 = function () {
        return (Ib = b._emscripten_bind_btCollisionObject_getRestitution_0 =
          b.asm.R).apply(null, arguments);
      }),
      Jb = (b._emscripten_bind_btCollisionObject_getFriction_0 = function () {
        return (Jb = b._emscripten_bind_btCollisionObject_getFriction_0 =
          b.asm.S).apply(null, arguments);
      }),
      Kb = (b._emscripten_bind_btCollisionObject_getRollingFriction_0 = function () {
        return (Kb = b._emscripten_bind_btCollisionObject_getRollingFriction_0 =
          b.asm.T).apply(null, arguments);
      }),
      Lb = (b._emscripten_bind_btCollisionObject_setRestitution_1 = function () {
        return (Lb = b._emscripten_bind_btCollisionObject_setRestitution_1 =
          b.asm.U).apply(null, arguments);
      }),
      Mb = (b._emscripten_bind_btCollisionObject_setFriction_1 = function () {
        return (Mb = b._emscripten_bind_btCollisionObject_setFriction_1 =
          b.asm.V).apply(null, arguments);
      }),
      Nb = (b._emscripten_bind_btCollisionObject_setRollingFriction_1 = function () {
        return (Nb = b._emscripten_bind_btCollisionObject_setRollingFriction_1 =
          b.asm.W).apply(null, arguments);
      }),
      Ob = (b._emscripten_bind_btCollisionObject_getWorldTransform_0 = function () {
        return (Ob = b._emscripten_bind_btCollisionObject_getWorldTransform_0 =
          b.asm.X).apply(null, arguments);
      }),
      Pb = (b._emscripten_bind_btCollisionObject_getCollisionFlags_0 = function () {
        return (Pb = b._emscripten_bind_btCollisionObject_getCollisionFlags_0 =
          b.asm.Y).apply(null, arguments);
      }),
      Qb = (b._emscripten_bind_btCollisionObject_setCollisionFlags_1 = function () {
        return (Qb = b._emscripten_bind_btCollisionObject_setCollisionFlags_1 =
          b.asm.Z).apply(null, arguments);
      }),
      Sb = (b._emscripten_bind_btCollisionObject_setWorldTransform_1 = function () {
        return (Sb = b._emscripten_bind_btCollisionObject_setWorldTransform_1 =
          b.asm._).apply(null, arguments);
      }),
      Tb = (b._emscripten_bind_btCollisionObject_setCollisionShape_1 = function () {
        return (Tb = b._emscripten_bind_btCollisionObject_setCollisionShape_1 =
          b.asm.$).apply(null, arguments);
      }),
      Ub = (b._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = function () {
        return (Ub = b._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 =
          b.asm.aa).apply(null, arguments);
      }),
      Vb = (b._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = function () {
        return (Vb = b._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 =
          b.asm.ba).apply(null, arguments);
      }),
      Wb = (b._emscripten_bind_btCollisionObject_getUserIndex_0 = function () {
        return (Wb = b._emscripten_bind_btCollisionObject_getUserIndex_0 =
          b.asm.ca).apply(null, arguments);
      }),
      Xb = (b._emscripten_bind_btCollisionObject_setUserIndex_1 = function () {
        return (Xb = b._emscripten_bind_btCollisionObject_setUserIndex_1 =
          b.asm.da).apply(null, arguments);
      }),
      Yb = (b._emscripten_bind_btCollisionObject_getUserPointer_0 = function () {
        return (Yb = b._emscripten_bind_btCollisionObject_getUserPointer_0 =
          b.asm.ea).apply(null, arguments);
      }),
      Zb = (b._emscripten_bind_btCollisionObject_setUserPointer_1 = function () {
        return (Zb = b._emscripten_bind_btCollisionObject_setUserPointer_1 =
          b.asm.fa).apply(null, arguments);
      }),
      $b = (b._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = function () {
        return ($b = b._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 =
          b.asm.ga).apply(null, arguments);
      }),
      ac = (b._emscripten_bind_btCollisionObject___destroy___0 = function () {
        return (ac = b._emscripten_bind_btCollisionObject___destroy___0 =
          b.asm.ha).apply(null, arguments);
      }),
      bc = (b._emscripten_bind_btDynamicsWorld_addAction_1 = function () {
        return (bc = b._emscripten_bind_btDynamicsWorld_addAction_1 =
          b.asm.ia).apply(null, arguments);
      }),
      cc = (b._emscripten_bind_btDynamicsWorld_removeAction_1 = function () {
        return (cc = b._emscripten_bind_btDynamicsWorld_removeAction_1 =
          b.asm.ja).apply(null, arguments);
      }),
      dc = (b._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = function () {
        return (dc = b._emscripten_bind_btDynamicsWorld_getSolverInfo_0 =
          b.asm.ka).apply(null, arguments);
      }),
      ec = (b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 = function () {
        return (ec = b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 =
          b.asm.la).apply(null, arguments);
      }),
      fc = (b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 = function () {
        return (fc = b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 =
          b.asm.ma).apply(null, arguments);
      }),
      hc = (b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 = function () {
        return (hc = b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 =
          b.asm.na).apply(null, arguments);
      }),
      ic = (b._emscripten_bind_btDynamicsWorld_getDispatcher_0 = function () {
        return (ic = b._emscripten_bind_btDynamicsWorld_getDispatcher_0 =
          b.asm.oa).apply(null, arguments);
      }),
      jc = (b._emscripten_bind_btDynamicsWorld_rayTest_3 = function () {
        return (jc = b._emscripten_bind_btDynamicsWorld_rayTest_3 =
          b.asm.pa).apply(null, arguments);
      }),
      kc = (b._emscripten_bind_btDynamicsWorld_getPairCache_0 = function () {
        return (kc = b._emscripten_bind_btDynamicsWorld_getPairCache_0 =
          b.asm.qa).apply(null, arguments);
      }),
      lc = (b._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = function () {
        return (lc = b._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 =
          b.asm.ra).apply(null, arguments);
      }),
      mc = (b._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = function () {
        return (mc = b._emscripten_bind_btDynamicsWorld_addCollisionObject_1 =
          b.asm.sa).apply(null, arguments);
      }),
      nc = (b._emscripten_bind_btDynamicsWorld_addCollisionObject_2 = function () {
        return (nc = b._emscripten_bind_btDynamicsWorld_addCollisionObject_2 =
          b.asm.ta).apply(null, arguments);
      }),
      oc = (b._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = function () {
        return (oc = b._emscripten_bind_btDynamicsWorld_addCollisionObject_3 =
          b.asm.ua).apply(null, arguments);
      }),
      pc = (b._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 = function () {
        return (pc = b._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 =
          b.asm.va).apply(null, arguments);
      }),
      qc = (b._emscripten_bind_btDynamicsWorld_getBroadphase_0 = function () {
        return (qc = b._emscripten_bind_btDynamicsWorld_getBroadphase_0 =
          b.asm.wa).apply(null, arguments);
      }),
      rc = (b._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = function () {
        return (rc = b._emscripten_bind_btDynamicsWorld_convexSweepTest_5 =
          b.asm.xa).apply(null, arguments);
      }),
      sc = (b._emscripten_bind_btDynamicsWorld_contactPairTest_3 = function () {
        return (sc = b._emscripten_bind_btDynamicsWorld_contactPairTest_3 =
          b.asm.ya).apply(null, arguments);
      }),
      tc = (b._emscripten_bind_btDynamicsWorld_contactTest_2 = function () {
        return (tc = b._emscripten_bind_btDynamicsWorld_contactTest_2 =
          b.asm.za).apply(null, arguments);
      }),
      uc = (b._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = function () {
        return (uc = b._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 =
          b.asm.Aa).apply(null, arguments);
      }),
      vc = (b._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = function () {
        return (vc = b._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 =
          b.asm.Ba).apply(null, arguments);
      }),
      wc = (b._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = function () {
        return (wc = b._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 =
          b.asm.Ca).apply(null, arguments);
      }),
      xc = (b._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = function () {
        return (xc = b._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 =
          b.asm.Da).apply(null, arguments);
      }),
      yc = (b._emscripten_bind_btDynamicsWorld_debugDrawObject_3 = function () {
        return (yc = b._emscripten_bind_btDynamicsWorld_debugDrawObject_3 =
          b.asm.Ea).apply(null, arguments);
      }),
      zc = (b._emscripten_bind_btDynamicsWorld___destroy___0 = function () {
        return (zc = b._emscripten_bind_btDynamicsWorld___destroy___0 =
          b.asm.Fa).apply(null, arguments);
      }),
      Ac = (b._emscripten_bind_btTypedConstraint_enableFeedback_1 = function () {
        return (Ac = b._emscripten_bind_btTypedConstraint_enableFeedback_1 =
          b.asm.Ga).apply(null, arguments);
      }),
      Bc = (b._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = function () {
        return (Bc = b._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 =
          b.asm.Ha).apply(null, arguments);
      }),
      Cc = (b._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 = function () {
        return (Cc = b._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 =
          b.asm.Ia).apply(null, arguments);
      }),
      Dc = (b._emscripten_bind_btTypedConstraint_getParam_2 = function () {
        return (Dc = b._emscripten_bind_btTypedConstraint_getParam_2 =
          b.asm.Ja).apply(null, arguments);
      }),
      Ec = (b._emscripten_bind_btTypedConstraint_setParam_3 = function () {
        return (Ec = b._emscripten_bind_btTypedConstraint_setParam_3 =
          b.asm.Ka).apply(null, arguments);
      }),
      Fc = (b._emscripten_bind_btTypedConstraint___destroy___0 = function () {
        return (Fc = b._emscripten_bind_btTypedConstraint___destroy___0 =
          b.asm.La).apply(null, arguments);
      }),
      Gc = (b._emscripten_bind_btConcaveShape_setLocalScaling_1 = function () {
        return (Gc = b._emscripten_bind_btConcaveShape_setLocalScaling_1 =
          b.asm.Ma).apply(null, arguments);
      }),
      Hc = (b._emscripten_bind_btConcaveShape_getLocalScaling_0 = function () {
        return (Hc = b._emscripten_bind_btConcaveShape_getLocalScaling_0 =
          b.asm.Na).apply(null, arguments);
      }),
      Ic = (b._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = function () {
        return (Ic = b._emscripten_bind_btConcaveShape_calculateLocalInertia_2 =
          b.asm.Oa).apply(null, arguments);
      }),
      Jc = (b._emscripten_bind_btConcaveShape___destroy___0 = function () {
        return (Jc = b._emscripten_bind_btConcaveShape___destroy___0 =
          b.asm.Pa).apply(null, arguments);
      }),
      Kc = (b._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = function () {
        return (Kc = b._emscripten_bind_btCapsuleShape_btCapsuleShape_2 =
          b.asm.Qa).apply(null, arguments);
      }),
      Lc = (b._emscripten_bind_btCapsuleShape_setMargin_1 = function () {
        return (Lc = b._emscripten_bind_btCapsuleShape_setMargin_1 =
          b.asm.Ra).apply(null, arguments);
      }),
      Mc = (b._emscripten_bind_btCapsuleShape_getMargin_0 = function () {
        return (Mc = b._emscripten_bind_btCapsuleShape_getMargin_0 =
          b.asm.Sa).apply(null, arguments);
      }),
      Nc = (b._emscripten_bind_btCapsuleShape_getUpAxis_0 = function () {
        return (Nc = b._emscripten_bind_btCapsuleShape_getUpAxis_0 =
          b.asm.Ta).apply(null, arguments);
      }),
      Oc = (b._emscripten_bind_btCapsuleShape_getRadius_0 = function () {
        return (Oc = b._emscripten_bind_btCapsuleShape_getRadius_0 =
          b.asm.Ua).apply(null, arguments);
      }),
      Pc = (b._emscripten_bind_btCapsuleShape_getHalfHeight_0 = function () {
        return (Pc = b._emscripten_bind_btCapsuleShape_getHalfHeight_0 =
          b.asm.Va).apply(null, arguments);
      }),
      Qc = (b._emscripten_bind_btCapsuleShape_setLocalScaling_1 = function () {
        return (Qc = b._emscripten_bind_btCapsuleShape_setLocalScaling_1 =
          b.asm.Wa).apply(null, arguments);
      }),
      Rc = (b._emscripten_bind_btCapsuleShape_getLocalScaling_0 = function () {
        return (Rc = b._emscripten_bind_btCapsuleShape_getLocalScaling_0 =
          b.asm.Xa).apply(null, arguments);
      }),
      Sc = (b._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = function () {
        return (Sc = b._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 =
          b.asm.Ya).apply(null, arguments);
      }),
      Tc = (b._emscripten_bind_btCapsuleShape___destroy___0 = function () {
        return (Tc = b._emscripten_bind_btCapsuleShape___destroy___0 =
          b.asm.Za).apply(null, arguments);
      }),
      Uc = (b._emscripten_bind_btIDebugDraw_drawLine_3 = function () {
        return (Uc = b._emscripten_bind_btIDebugDraw_drawLine_3 =
          b.asm._a).apply(null, arguments);
      }),
      Vc = (b._emscripten_bind_btIDebugDraw_drawContactPoint_5 = function () {
        return (Vc = b._emscripten_bind_btIDebugDraw_drawContactPoint_5 =
          b.asm.$a).apply(null, arguments);
      }),
      Wc = (b._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = function () {
        return (Wc = b._emscripten_bind_btIDebugDraw_reportErrorWarning_1 =
          b.asm.ab).apply(null, arguments);
      }),
      Xc = (b._emscripten_bind_btIDebugDraw_draw3dText_2 = function () {
        return (Xc = b._emscripten_bind_btIDebugDraw_draw3dText_2 =
          b.asm.bb).apply(null, arguments);
      }),
      Yc = (b._emscripten_bind_btIDebugDraw_setDebugMode_1 = function () {
        return (Yc = b._emscripten_bind_btIDebugDraw_setDebugMode_1 =
          b.asm.cb).apply(null, arguments);
      }),
      Zc = (b._emscripten_bind_btIDebugDraw_getDebugMode_0 = function () {
        return (Zc = b._emscripten_bind_btIDebugDraw_getDebugMode_0 =
          b.asm.db).apply(null, arguments);
      }),
      $c = (b._emscripten_bind_btIDebugDraw___destroy___0 = function () {
        return ($c = b._emscripten_bind_btIDebugDraw___destroy___0 =
          b.asm.eb).apply(null, arguments);
      }),
      ad = (b._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 = function () {
        return (ad = b._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 =
          b.asm.fb).apply(null, arguments);
      }),
      bd = (b._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 = function () {
        return (bd = b._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 =
          b.asm.gb).apply(null, arguments);
      }),
      cd = (b._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 = function () {
        return (cd = b._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 =
          b.asm.hb).apply(null, arguments);
      }),
      dd = (b._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = function () {
        return (dd = b._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 =
          b.asm.ib).apply(null, arguments);
      }),
      ed = (b._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = function () {
        return (ed = b._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 =
          b.asm.jb).apply(null, arguments);
      }),
      fd = (b._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = function () {
        return (fd = b._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 =
          b.asm.kb).apply(null, arguments);
      }),
      gd = (b._emscripten_bind_btTriangleMeshShape___destroy___0 = function () {
        return (gd = b._emscripten_bind_btTriangleMeshShape___destroy___0 =
          b.asm.lb).apply(null, arguments);
      }),
      hd = (b._emscripten_bind_btGhostObject_btGhostObject_0 = function () {
        return (hd = b._emscripten_bind_btGhostObject_btGhostObject_0 =
          b.asm.mb).apply(null, arguments);
      }),
      id = (b._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = function () {
        return (id = b._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 =
          b.asm.nb).apply(null, arguments);
      }),
      jd = (b._emscripten_bind_btGhostObject_getOverlappingObject_1 = function () {
        return (jd = b._emscripten_bind_btGhostObject_getOverlappingObject_1 =
          b.asm.ob).apply(null, arguments);
      }),
      kd = (b._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = function () {
        return (kd = b._emscripten_bind_btGhostObject_setAnisotropicFriction_2 =
          b.asm.pb).apply(null, arguments);
      }),
      ld = (b._emscripten_bind_btGhostObject_getCollisionShape_0 = function () {
        return (ld = b._emscripten_bind_btGhostObject_getCollisionShape_0 =
          b.asm.qb).apply(null, arguments);
      }),
      md = (b._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = function () {
        return (md = b._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 =
          b.asm.rb).apply(null, arguments);
      }),
      nd = (b._emscripten_bind_btGhostObject_setActivationState_1 = function () {
        return (nd = b._emscripten_bind_btGhostObject_setActivationState_1 =
          b.asm.sb).apply(null, arguments);
      }),
      od = (b._emscripten_bind_btGhostObject_forceActivationState_1 = function () {
        return (od = b._emscripten_bind_btGhostObject_forceActivationState_1 =
          b.asm.tb).apply(null, arguments);
      }),
      pd = (b._emscripten_bind_btGhostObject_activate_0 = function () {
        return (pd = b._emscripten_bind_btGhostObject_activate_0 =
          b.asm.ub).apply(null, arguments);
      }),
      qd = (b._emscripten_bind_btGhostObject_activate_1 = function () {
        return (qd = b._emscripten_bind_btGhostObject_activate_1 =
          b.asm.vb).apply(null, arguments);
      }),
      rd = (b._emscripten_bind_btGhostObject_isActive_0 = function () {
        return (rd = b._emscripten_bind_btGhostObject_isActive_0 =
          b.asm.wb).apply(null, arguments);
      }),
      sd = (b._emscripten_bind_btGhostObject_isKinematicObject_0 = function () {
        return (sd = b._emscripten_bind_btGhostObject_isKinematicObject_0 =
          b.asm.xb).apply(null, arguments);
      }),
      td = (b._emscripten_bind_btGhostObject_isStaticObject_0 = function () {
        return (td = b._emscripten_bind_btGhostObject_isStaticObject_0 =
          b.asm.yb).apply(null, arguments);
      }),
      ud = (b._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = function () {
        return (ud = b._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 =
          b.asm.zb).apply(null, arguments);
      }),
      vd = (b._emscripten_bind_btGhostObject_getRestitution_0 = function () {
        return (vd = b._emscripten_bind_btGhostObject_getRestitution_0 =
          b.asm.Ab).apply(null, arguments);
      }),
      wd = (b._emscripten_bind_btGhostObject_getFriction_0 = function () {
        return (wd = b._emscripten_bind_btGhostObject_getFriction_0 =
          b.asm.Bb).apply(null, arguments);
      }),
      xd = (b._emscripten_bind_btGhostObject_getRollingFriction_0 = function () {
        return (xd = b._emscripten_bind_btGhostObject_getRollingFriction_0 =
          b.asm.Cb).apply(null, arguments);
      }),
      yd = (b._emscripten_bind_btGhostObject_setRestitution_1 = function () {
        return (yd = b._emscripten_bind_btGhostObject_setRestitution_1 =
          b.asm.Db).apply(null, arguments);
      }),
      zd = (b._emscripten_bind_btGhostObject_setFriction_1 = function () {
        return (zd = b._emscripten_bind_btGhostObject_setFriction_1 =
          b.asm.Eb).apply(null, arguments);
      }),
      Ad = (b._emscripten_bind_btGhostObject_setRollingFriction_1 = function () {
        return (Ad = b._emscripten_bind_btGhostObject_setRollingFriction_1 =
          b.asm.Fb).apply(null, arguments);
      }),
      Bd = (b._emscripten_bind_btGhostObject_getWorldTransform_0 = function () {
        return (Bd = b._emscripten_bind_btGhostObject_getWorldTransform_0 =
          b.asm.Gb).apply(null, arguments);
      }),
      Cd = (b._emscripten_bind_btGhostObject_getCollisionFlags_0 = function () {
        return (Cd = b._emscripten_bind_btGhostObject_getCollisionFlags_0 =
          b.asm.Hb).apply(null, arguments);
      }),
      Dd = (b._emscripten_bind_btGhostObject_setCollisionFlags_1 = function () {
        return (Dd = b._emscripten_bind_btGhostObject_setCollisionFlags_1 =
          b.asm.Ib).apply(null, arguments);
      }),
      Ed = (b._emscripten_bind_btGhostObject_setWorldTransform_1 = function () {
        return (Ed = b._emscripten_bind_btGhostObject_setWorldTransform_1 =
          b.asm.Jb).apply(null, arguments);
      }),
      Fd = (b._emscripten_bind_btGhostObject_setCollisionShape_1 = function () {
        return (Fd = b._emscripten_bind_btGhostObject_setCollisionShape_1 =
          b.asm.Kb).apply(null, arguments);
      }),
      Gd = (b._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = function () {
        return (Gd = b._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 =
          b.asm.Lb).apply(null, arguments);
      }),
      Hd = (b._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = function () {
        return (Hd = b._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 =
          b.asm.Mb).apply(null, arguments);
      }),
      Id = (b._emscripten_bind_btGhostObject_getUserIndex_0 = function () {
        return (Id = b._emscripten_bind_btGhostObject_getUserIndex_0 =
          b.asm.Nb).apply(null, arguments);
      }),
      Jd = (b._emscripten_bind_btGhostObject_setUserIndex_1 = function () {
        return (Jd = b._emscripten_bind_btGhostObject_setUserIndex_1 =
          b.asm.Ob).apply(null, arguments);
      }),
      Kd = (b._emscripten_bind_btGhostObject_getUserPointer_0 = function () {
        return (Kd = b._emscripten_bind_btGhostObject_getUserPointer_0 =
          b.asm.Pb).apply(null, arguments);
      }),
      Ld = (b._emscripten_bind_btGhostObject_setUserPointer_1 = function () {
        return (Ld = b._emscripten_bind_btGhostObject_setUserPointer_1 =
          b.asm.Qb).apply(null, arguments);
      }),
      Md = (b._emscripten_bind_btGhostObject_getBroadphaseHandle_0 = function () {
        return (Md = b._emscripten_bind_btGhostObject_getBroadphaseHandle_0 =
          b.asm.Rb).apply(null, arguments);
      }),
      Nd = (b._emscripten_bind_btGhostObject___destroy___0 = function () {
        return (Nd = b._emscripten_bind_btGhostObject___destroy___0 =
          b.asm.Sb).apply(null, arguments);
      }),
      Od = (b._emscripten_bind_btConeShape_btConeShape_2 = function () {
        return (Od = b._emscripten_bind_btConeShape_btConeShape_2 =
          b.asm.Tb).apply(null, arguments);
      }),
      Pd = (b._emscripten_bind_btConeShape_setLocalScaling_1 = function () {
        return (Pd = b._emscripten_bind_btConeShape_setLocalScaling_1 =
          b.asm.Ub).apply(null, arguments);
      }),
      Qd = (b._emscripten_bind_btConeShape_getLocalScaling_0 = function () {
        return (Qd = b._emscripten_bind_btConeShape_getLocalScaling_0 =
          b.asm.Vb).apply(null, arguments);
      }),
      Rd = (b._emscripten_bind_btConeShape_calculateLocalInertia_2 = function () {
        return (Rd = b._emscripten_bind_btConeShape_calculateLocalInertia_2 =
          b.asm.Wb).apply(null, arguments);
      }),
      Sd = (b._emscripten_bind_btConeShape___destroy___0 = function () {
        return (Sd = b._emscripten_bind_btConeShape___destroy___0 =
          b.asm.Xb).apply(null, arguments);
      }),
      Td = (b._emscripten_bind_btActionInterface_updateAction_2 = function () {
        return (Td = b._emscripten_bind_btActionInterface_updateAction_2 =
          b.asm.Yb).apply(null, arguments);
      }),
      Ud = (b._emscripten_bind_btActionInterface___destroy___0 = function () {
        return (Ud = b._emscripten_bind_btActionInterface___destroy___0 =
          b.asm.Zb).apply(null, arguments);
      }),
      Vd = (b._emscripten_bind_btVector3_btVector3_0 = function () {
        return (Vd = b._emscripten_bind_btVector3_btVector3_0 = b.asm._b).apply(
          null,
          arguments
        );
      }),
      Wd = (b._emscripten_bind_btVector3_btVector3_3 = function () {
        return (Wd = b._emscripten_bind_btVector3_btVector3_3 = b.asm.$b).apply(
          null,
          arguments
        );
      }),
      Xd = (b._emscripten_bind_btVector3_length_0 = function () {
        return (Xd = b._emscripten_bind_btVector3_length_0 = b.asm.ac).apply(
          null,
          arguments
        );
      }),
      Yd = (b._emscripten_bind_btVector3_x_0 = function () {
        return (Yd = b._emscripten_bind_btVector3_x_0 = b.asm.bc).apply(
          null,
          arguments
        );
      }),
      Zd = (b._emscripten_bind_btVector3_y_0 = function () {
        return (Zd = b._emscripten_bind_btVector3_y_0 = b.asm.cc).apply(
          null,
          arguments
        );
      }),
      $d = (b._emscripten_bind_btVector3_z_0 = function () {
        return ($d = b._emscripten_bind_btVector3_z_0 = b.asm.dc).apply(
          null,
          arguments
        );
      }),
      ae = (b._emscripten_bind_btVector3_setX_1 = function () {
        return (ae = b._emscripten_bind_btVector3_setX_1 = b.asm.ec).apply(
          null,
          arguments
        );
      }),
      be = (b._emscripten_bind_btVector3_setY_1 = function () {
        return (be = b._emscripten_bind_btVector3_setY_1 = b.asm.fc).apply(
          null,
          arguments
        );
      }),
      ce = (b._emscripten_bind_btVector3_setZ_1 = function () {
        return (ce = b._emscripten_bind_btVector3_setZ_1 = b.asm.gc).apply(
          null,
          arguments
        );
      }),
      de = (b._emscripten_bind_btVector3_setValue_3 = function () {
        return (de = b._emscripten_bind_btVector3_setValue_3 = b.asm.hc).apply(
          null,
          arguments
        );
      }),
      ee = (b._emscripten_bind_btVector3_normalize_0 = function () {
        return (ee = b._emscripten_bind_btVector3_normalize_0 = b.asm.ic).apply(
          null,
          arguments
        );
      }),
      fe = (b._emscripten_bind_btVector3_rotate_2 = function () {
        return (fe = b._emscripten_bind_btVector3_rotate_2 = b.asm.jc).apply(
          null,
          arguments
        );
      }),
      ge = (b._emscripten_bind_btVector3_dot_1 = function () {
        return (ge = b._emscripten_bind_btVector3_dot_1 = b.asm.kc).apply(
          null,
          arguments
        );
      }),
      he = (b._emscripten_bind_btVector3_op_mul_1 = function () {
        return (he = b._emscripten_bind_btVector3_op_mul_1 = b.asm.lc).apply(
          null,
          arguments
        );
      }),
      ie = (b._emscripten_bind_btVector3_op_add_1 = function () {
        return (ie = b._emscripten_bind_btVector3_op_add_1 = b.asm.mc).apply(
          null,
          arguments
        );
      }),
      je = (b._emscripten_bind_btVector3_op_sub_1 = function () {
        return (je = b._emscripten_bind_btVector3_op_sub_1 = b.asm.nc).apply(
          null,
          arguments
        );
      }),
      ke = (b._emscripten_bind_btVector3___destroy___0 = function () {
        return (ke = b._emscripten_bind_btVector3___destroy___0 =
          b.asm.oc).apply(null, arguments);
      }),
      le = (b._emscripten_bind_btVehicleRaycaster_castRay_3 = function () {
        return (le = b._emscripten_bind_btVehicleRaycaster_castRay_3 =
          b.asm.pc).apply(null, arguments);
      }),
      me = (b._emscripten_bind_btVehicleRaycaster___destroy___0 = function () {
        return (me = b._emscripten_bind_btVehicleRaycaster___destroy___0 =
          b.asm.qc).apply(null, arguments);
      }),
      ne = (b._emscripten_bind_btQuadWord_x_0 = function () {
        return (ne = b._emscripten_bind_btQuadWord_x_0 = b.asm.rc).apply(
          null,
          arguments
        );
      }),
      oe = (b._emscripten_bind_btQuadWord_y_0 = function () {
        return (oe = b._emscripten_bind_btQuadWord_y_0 = b.asm.sc).apply(
          null,
          arguments
        );
      }),
      pe = (b._emscripten_bind_btQuadWord_z_0 = function () {
        return (pe = b._emscripten_bind_btQuadWord_z_0 = b.asm.tc).apply(
          null,
          arguments
        );
      }),
      qe = (b._emscripten_bind_btQuadWord_w_0 = function () {
        return (qe = b._emscripten_bind_btQuadWord_w_0 = b.asm.uc).apply(
          null,
          arguments
        );
      }),
      re = (b._emscripten_bind_btQuadWord_setX_1 = function () {
        return (re = b._emscripten_bind_btQuadWord_setX_1 = b.asm.vc).apply(
          null,
          arguments
        );
      }),
      se = (b._emscripten_bind_btQuadWord_setY_1 = function () {
        return (se = b._emscripten_bind_btQuadWord_setY_1 = b.asm.wc).apply(
          null,
          arguments
        );
      }),
      te = (b._emscripten_bind_btQuadWord_setZ_1 = function () {
        return (te = b._emscripten_bind_btQuadWord_setZ_1 = b.asm.xc).apply(
          null,
          arguments
        );
      }),
      ue = (b._emscripten_bind_btQuadWord_setW_1 = function () {
        return (ue = b._emscripten_bind_btQuadWord_setW_1 = b.asm.yc).apply(
          null,
          arguments
        );
      }),
      ve = (b._emscripten_bind_btQuadWord___destroy___0 = function () {
        return (ve = b._emscripten_bind_btQuadWord___destroy___0 =
          b.asm.zc).apply(null, arguments);
      }),
      we = (b._emscripten_bind_btCylinderShape_btCylinderShape_1 = function () {
        return (we = b._emscripten_bind_btCylinderShape_btCylinderShape_1 =
          b.asm.Ac).apply(null, arguments);
      }),
      xe = (b._emscripten_bind_btCylinderShape_setMargin_1 = function () {
        return (xe = b._emscripten_bind_btCylinderShape_setMargin_1 =
          b.asm.Bc).apply(null, arguments);
      }),
      ye = (b._emscripten_bind_btCylinderShape_getMargin_0 = function () {
        return (ye = b._emscripten_bind_btCylinderShape_getMargin_0 =
          b.asm.Cc).apply(null, arguments);
      }),
      ze = (b._emscripten_bind_btCylinderShape_setLocalScaling_1 = function () {
        return (ze = b._emscripten_bind_btCylinderShape_setLocalScaling_1 =
          b.asm.Dc).apply(null, arguments);
      }),
      Ae = (b._emscripten_bind_btCylinderShape_getLocalScaling_0 = function () {
        return (Ae = b._emscripten_bind_btCylinderShape_getLocalScaling_0 =
          b.asm.Ec).apply(null, arguments);
      }),
      Be = (b._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = function () {
        return (Be = b._emscripten_bind_btCylinderShape_calculateLocalInertia_2 =
          b.asm.Fc).apply(null, arguments);
      }),
      Ce = (b._emscripten_bind_btCylinderShape___destroy___0 = function () {
        return (Ce = b._emscripten_bind_btCylinderShape___destroy___0 =
          b.asm.Gc).apply(null, arguments);
      }),
      De = (b._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 = function () {
        return (De = b._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 =
          b.asm.Hc).apply(null, arguments);
      }),
      Ee = (b._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = function () {
        return (Ee = b._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 =
          b.asm.Ic).apply(null, arguments);
      }),
      Fe = (b._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = function () {
        return (Fe = b._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 =
          b.asm.Jc).apply(null, arguments);
      }),
      Ge = (b._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = function () {
        return (Ge = b._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 =
          b.asm.Kc).apply(null, arguments);
      }),
      He = (b._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = function () {
        return (He = b._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 =
          b.asm.Lc).apply(null, arguments);
      }),
      Ie = (b._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = function () {
        return (Ie = b._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 =
          b.asm.Mc).apply(null, arguments);
      }),
      Je = (b._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = function () {
        return (Je = b._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 =
          b.asm.Nc).apply(null, arguments);
      }),
      Ke = (b._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = function () {
        return (Ke = b._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 =
          b.asm.Oc).apply(null, arguments);
      }),
      Le = (b._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = function () {
        return (Le = b._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 =
          b.asm.Pc).apply(null, arguments);
      }),
      Me = (b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 = function () {
        return (Me = b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 =
          b.asm.Qc).apply(null, arguments);
      }),
      Ne = (b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = function () {
        return (Ne = b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 =
          b.asm.Rc).apply(null, arguments);
      }),
      Oe = (b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = function () {
        return (Oe = b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 =
          b.asm.Sc).apply(null, arguments);
      }),
      Pe = (b._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 = function () {
        return (Pe = b._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 =
          b.asm.Tc).apply(null, arguments);
      }),
      Qe = (b._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = function () {
        return (Qe = b._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 =
          b.asm.Uc).apply(null, arguments);
      }),
      Re = (b._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = function () {
        return (Re = b._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 =
          b.asm.Vc).apply(null, arguments);
      }),
      Se = (b._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = function () {
        return (Se = b._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 =
          b.asm.Wc).apply(null, arguments);
      }),
      Te = (b._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = function () {
        return (Te = b._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 =
          b.asm.Xc).apply(null, arguments);
      }),
      Ue = (b._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = function () {
        return (Ue = b._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 =
          b.asm.Yc).apply(null, arguments);
      }),
      Ve = (b._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = function () {
        return (Ve = b._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 =
          b.asm.Zc).apply(null, arguments);
      }),
      We = (b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = function () {
        return (We = b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 =
          b.asm._c).apply(null, arguments);
      }),
      Xe = (b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 = function () {
        return (Xe = b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 =
          b.asm.$c).apply(null, arguments);
      }),
      Ye = (b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 = function () {
        return (Ye = b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 =
          b.asm.ad).apply(null, arguments);
      }),
      Ze = (b._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 = function () {
        return (Ze = b._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 =
          b.asm.bd).apply(null, arguments);
      }),
      $e = (b._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = function () {
        return ($e = b._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 =
          b.asm.cd).apply(null, arguments);
      }),
      af = (b._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = function () {
        return (af = b._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 =
          b.asm.dd).apply(null, arguments);
      }),
      bf = (b._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = function () {
        return (bf = b._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 =
          b.asm.ed).apply(null, arguments);
      }),
      cf = (b._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = function () {
        return (cf = b._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 =
          b.asm.fd).apply(null, arguments);
      }),
      df = (b._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = function () {
        return (df = b._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 =
          b.asm.gd).apply(null, arguments);
      }),
      ef = (b._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = function () {
        return (ef = b._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 =
          b.asm.hd).apply(null, arguments);
      }),
      ff = (b._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = function () {
        return (ff = b._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 =
          b.asm.id).apply(null, arguments);
      }),
      gf = (b._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = function () {
        return (gf = b._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 =
          b.asm.jd).apply(null, arguments);
      }),
      hf = (b._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = function () {
        return (hf = b._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 =
          b.asm.kd).apply(null, arguments);
      }),
      jf = (b._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 = function () {
        return (jf = b._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 =
          b.asm.ld).apply(null, arguments);
      }),
      kf = (b._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = function () {
        return (kf = b._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 =
          b.asm.md).apply(null, arguments);
      }),
      lf = (b._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = function () {
        return (lf = b._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 =
          b.asm.nd).apply(null, arguments);
      }),
      mf = (b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 = function () {
        return (mf = b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 =
          b.asm.od).apply(null, arguments);
      }),
      nf = (b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 = function () {
        return (nf = b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 =
          b.asm.pd).apply(null, arguments);
      }),
      of = (b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 = function () {
        return (of = b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 =
          b.asm.qd).apply(null, arguments);
      }),
      pf = (b._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = function () {
        return (pf = b._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 =
          b.asm.rd).apply(null, arguments);
      }),
      qf = (b._emscripten_bind_btConvexShape_setLocalScaling_1 = function () {
        return (qf = b._emscripten_bind_btConvexShape_setLocalScaling_1 =
          b.asm.sd).apply(null, arguments);
      }),
      rf = (b._emscripten_bind_btConvexShape_getLocalScaling_0 = function () {
        return (rf = b._emscripten_bind_btConvexShape_getLocalScaling_0 =
          b.asm.td).apply(null, arguments);
      }),
      sf = (b._emscripten_bind_btConvexShape_calculateLocalInertia_2 = function () {
        return (sf = b._emscripten_bind_btConvexShape_calculateLocalInertia_2 =
          b.asm.ud).apply(null, arguments);
      }),
      tf = (b._emscripten_bind_btConvexShape_setMargin_1 = function () {
        return (tf = b._emscripten_bind_btConvexShape_setMargin_1 =
          b.asm.vd).apply(null, arguments);
      }),
      uf = (b._emscripten_bind_btConvexShape_getMargin_0 = function () {
        return (uf = b._emscripten_bind_btConvexShape_getMargin_0 =
          b.asm.wd).apply(null, arguments);
      }),
      vf = (b._emscripten_bind_btConvexShape___destroy___0 = function () {
        return (vf = b._emscripten_bind_btConvexShape___destroy___0 =
          b.asm.xd).apply(null, arguments);
      }),
      wf = (b._emscripten_bind_btDispatcher_getNumManifolds_0 = function () {
        return (wf = b._emscripten_bind_btDispatcher_getNumManifolds_0 =
          b.asm.yd).apply(null, arguments);
      }),
      xf = (b._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 = function () {
        return (xf = b._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 =
          b.asm.zd).apply(null, arguments);
      }),
      yf = (b._emscripten_bind_btDispatcher___destroy___0 = function () {
        return (yf = b._emscripten_bind_btDispatcher___destroy___0 =
          b.asm.Ad).apply(null, arguments);
      }),
      zf = (b._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 = function () {
        return (zf = b._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 =
          b.asm.Bd).apply(null, arguments);
      }),
      Af = (b._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 = function () {
        return (Af = b._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 =
          b.asm.Cd).apply(null, arguments);
      }),
      Bf = (b._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 = function () {
        return (Bf = b._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 =
          b.asm.Dd).apply(null, arguments);
      }),
      Cf = (b._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = function () {
        return (Cf = b._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 =
          b.asm.Ed).apply(null, arguments);
      }),
      Df = (b._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 = function () {
        return (Df = b._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 =
          b.asm.Fd).apply(null, arguments);
      }),
      Ef = (b._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = function () {
        return (Ef = b._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 =
          b.asm.Gd).apply(null, arguments);
      }),
      Ff = (b._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = function () {
        return (Ff = b._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 =
          b.asm.Hd).apply(null, arguments);
      }),
      Gf = (b._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = function () {
        return (Gf = b._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 =
          b.asm.Id).apply(null, arguments);
      }),
      Hf = (b._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = function () {
        return (Hf = b._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 =
          b.asm.Jd).apply(null, arguments);
      }),
      If = (b._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = function () {
        return (If = b._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 =
          b.asm.Kd).apply(null, arguments);
      }),
      Jf = (b._emscripten_bind_btGeneric6DofConstraint_getParam_2 = function () {
        return (Jf = b._emscripten_bind_btGeneric6DofConstraint_getParam_2 =
          b.asm.Ld).apply(null, arguments);
      }),
      Kf = (b._emscripten_bind_btGeneric6DofConstraint_setParam_3 = function () {
        return (Kf = b._emscripten_bind_btGeneric6DofConstraint_setParam_3 =
          b.asm.Md).apply(null, arguments);
      }),
      Lf = (b._emscripten_bind_btGeneric6DofConstraint___destroy___0 = function () {
        return (Lf = b._emscripten_bind_btGeneric6DofConstraint___destroy___0 =
          b.asm.Nd).apply(null, arguments);
      }),
      Mf = (b._emscripten_bind_btStridingMeshInterface_setScaling_1 = function () {
        return (Mf = b._emscripten_bind_btStridingMeshInterface_setScaling_1 =
          b.asm.Od).apply(null, arguments);
      }),
      Nf = (b._emscripten_bind_btStridingMeshInterface___destroy___0 = function () {
        return (Nf = b._emscripten_bind_btStridingMeshInterface___destroy___0 =
          b.asm.Pd).apply(null, arguments);
      }),
      Of = (b._emscripten_bind_btMotionState_getWorldTransform_1 = function () {
        return (Of = b._emscripten_bind_btMotionState_getWorldTransform_1 =
          b.asm.Qd).apply(null, arguments);
      }),
      Pf = (b._emscripten_bind_btMotionState_setWorldTransform_1 = function () {
        return (Pf = b._emscripten_bind_btMotionState_setWorldTransform_1 =
          b.asm.Rd).apply(null, arguments);
      }),
      Qf = (b._emscripten_bind_btMotionState___destroy___0 = function () {
        return (Qf = b._emscripten_bind_btMotionState___destroy___0 =
          b.asm.Sd).apply(null, arguments);
      }),
      Rf = (b._emscripten_bind_ConvexResultCallback_hasHit_0 = function () {
        return (Rf = b._emscripten_bind_ConvexResultCallback_hasHit_0 =
          b.asm.Td).apply(null, arguments);
      }),
      Sf = (b._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = function () {
        return (Sf = b._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 =
          b.asm.Ud).apply(null, arguments);
      }),
      Tf = (b._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = function () {
        return (Tf = b._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 =
          b.asm.Vd).apply(null, arguments);
      }),
      Uf = (b._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = function () {
        return (Uf = b._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 =
          b.asm.Wd).apply(null, arguments);
      }),
      Vf = (b._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 = function () {
        return (Vf = b._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 =
          b.asm.Xd).apply(null, arguments);
      }),
      Wf = (b._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 = function () {
        return (Wf = b._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 =
          b.asm.Yd).apply(null, arguments);
      }),
      Xf = (b._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = function () {
        return (Xf = b._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 =
          b.asm.Zd).apply(null, arguments);
      }),
      Yf = (b._emscripten_bind_ConvexResultCallback___destroy___0 = function () {
        return (Yf = b._emscripten_bind_ConvexResultCallback___destroy___0 =
          b.asm._d).apply(null, arguments);
      }),
      Zf = (b._emscripten_bind_ContactResultCallback_addSingleResult_7 = function () {
        return (Zf = b._emscripten_bind_ContactResultCallback_addSingleResult_7 =
          b.asm.$d).apply(null, arguments);
      }),
      $f = (b._emscripten_bind_ContactResultCallback___destroy___0 = function () {
        return ($f = b._emscripten_bind_ContactResultCallback___destroy___0 =
          b.asm.ae).apply(null, arguments);
      }),
      ag = (b._emscripten_bind_btSoftBodySolver___destroy___0 = function () {
        return (ag = b._emscripten_bind_btSoftBodySolver___destroy___0 =
          b.asm.be).apply(null, arguments);
      }),
      bg = (b._emscripten_bind_RayResultCallback_hasHit_0 = function () {
        return (bg = b._emscripten_bind_RayResultCallback_hasHit_0 =
          b.asm.ce).apply(null, arguments);
      }),
      cg = (b._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 = function () {
        return (cg = b._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 =
          b.asm.de).apply(null, arguments);
      }),
      dg = (b._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = function () {
        return (dg = b._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 =
          b.asm.ee).apply(null, arguments);
      }),
      eg = (b._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 = function () {
        return (eg = b._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 =
          b.asm.fe).apply(null, arguments);
      }),
      fg = (b._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = function () {
        return (fg = b._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 =
          b.asm.ge).apply(null, arguments);
      }),
      gg = (b._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = function () {
        return (gg = b._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 =
          b.asm.he).apply(null, arguments);
      }),
      hg = (b._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 = function () {
        return (hg = b._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 =
          b.asm.ie).apply(null, arguments);
      }),
      ig = (b._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = function () {
        return (ig = b._emscripten_bind_RayResultCallback_get_m_collisionObject_0 =
          b.asm.je).apply(null, arguments);
      }),
      jg = (b._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = function () {
        return (jg = b._emscripten_bind_RayResultCallback_set_m_collisionObject_1 =
          b.asm.ke).apply(null, arguments);
      }),
      kg = (b._emscripten_bind_RayResultCallback___destroy___0 = function () {
        return (kg = b._emscripten_bind_RayResultCallback___destroy___0 =
          b.asm.le).apply(null, arguments);
      }),
      lg = (b._emscripten_bind_btMatrix3x3_setEulerZYX_3 = function () {
        return (lg = b._emscripten_bind_btMatrix3x3_setEulerZYX_3 =
          b.asm.me).apply(null, arguments);
      }),
      mg = (b._emscripten_bind_btMatrix3x3_getRotation_1 = function () {
        return (mg = b._emscripten_bind_btMatrix3x3_getRotation_1 =
          b.asm.ne).apply(null, arguments);
      }),
      ng = (b._emscripten_bind_btMatrix3x3_getRow_1 = function () {
        return (ng = b._emscripten_bind_btMatrix3x3_getRow_1 = b.asm.oe).apply(
          null,
          arguments
        );
      }),
      og = (b._emscripten_bind_btMatrix3x3___destroy___0 = function () {
        return (og = b._emscripten_bind_btMatrix3x3___destroy___0 =
          b.asm.pe).apply(null, arguments);
      }),
      pg = (b._emscripten_bind_btScalarArray_size_0 = function () {
        return (pg = b._emscripten_bind_btScalarArray_size_0 = b.asm.qe).apply(
          null,
          arguments
        );
      }),
      qg = (b._emscripten_bind_btScalarArray_at_1 = function () {
        return (qg = b._emscripten_bind_btScalarArray_at_1 = b.asm.re).apply(
          null,
          arguments
        );
      }),
      rg = (b._emscripten_bind_btScalarArray___destroy___0 = function () {
        return (rg = b._emscripten_bind_btScalarArray___destroy___0 =
          b.asm.se).apply(null, arguments);
      }),
      sg = (b._emscripten_bind_Material_get_m_kLST_0 = function () {
        return (sg = b._emscripten_bind_Material_get_m_kLST_0 = b.asm.te).apply(
          null,
          arguments
        );
      }),
      tg = (b._emscripten_bind_Material_set_m_kLST_1 = function () {
        return (tg = b._emscripten_bind_Material_set_m_kLST_1 = b.asm.ue).apply(
          null,
          arguments
        );
      }),
      ug = (b._emscripten_bind_Material_get_m_kAST_0 = function () {
        return (ug = b._emscripten_bind_Material_get_m_kAST_0 = b.asm.ve).apply(
          null,
          arguments
        );
      }),
      vg = (b._emscripten_bind_Material_set_m_kAST_1 = function () {
        return (vg = b._emscripten_bind_Material_set_m_kAST_1 = b.asm.we).apply(
          null,
          arguments
        );
      }),
      wg = (b._emscripten_bind_Material_get_m_kVST_0 = function () {
        return (wg = b._emscripten_bind_Material_get_m_kVST_0 = b.asm.xe).apply(
          null,
          arguments
        );
      }),
      xg = (b._emscripten_bind_Material_set_m_kVST_1 = function () {
        return (xg = b._emscripten_bind_Material_set_m_kVST_1 = b.asm.ye).apply(
          null,
          arguments
        );
      }),
      yg = (b._emscripten_bind_Material_get_m_flags_0 = function () {
        return (yg = b._emscripten_bind_Material_get_m_flags_0 =
          b.asm.ze).apply(null, arguments);
      }),
      zg = (b._emscripten_bind_Material_set_m_flags_1 = function () {
        return (zg = b._emscripten_bind_Material_set_m_flags_1 =
          b.asm.Ae).apply(null, arguments);
      }),
      Ag = (b._emscripten_bind_Material___destroy___0 = function () {
        return (Ag = b._emscripten_bind_Material___destroy___0 =
          b.asm.Be).apply(null, arguments);
      }),
      Bg = (b._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = function () {
        return (Bg = b._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 =
          b.asm.Ce).apply(null, arguments);
      }),
      Cg = (b._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 = function () {
        return (Cg = b._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 =
          b.asm.De).apply(null, arguments);
      }),
      Dg = (b._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = function () {
        return (Dg = b._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 =
          b.asm.Ee).apply(null, arguments);
      }),
      Eg = (b._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = function () {
        return (Eg = b._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 =
          b.asm.Fe).apply(null, arguments);
      }),
      Fg = (b._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = function () {
        return (Fg = b._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 =
          b.asm.Ge).apply(null, arguments);
      }),
      Gg = (b._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = function () {
        return (Gg = b._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 =
          b.asm.He).apply(null, arguments);
      }),
      Hg = (b._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = function () {
        return (Hg = b._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 =
          b.asm.Ie).apply(null, arguments);
      }),
      Ig = (b._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = function () {
        return (Ig = b._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 =
          b.asm.Je).apply(null, arguments);
      }),
      Jg = (b._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = function () {
        return (Jg = b._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 =
          b.asm.Ke).apply(null, arguments);
      }),
      Kg = (b._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = function () {
        return (Kg = b._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 =
          b.asm.Le).apply(null, arguments);
      }),
      Lg = (b._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = function () {
        return (Lg = b._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 =
          b.asm.Me).apply(null, arguments);
      }),
      Mg = (b._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = function () {
        return (Mg = b._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 =
          b.asm.Ne).apply(null, arguments);
      }),
      Ng = (b._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = function () {
        return (Ng = b._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 =
          b.asm.Oe).apply(null, arguments);
      }),
      Og = (b._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = function () {
        return (Og = b._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 =
          b.asm.Pe).apply(null, arguments);
      }),
      Pg = (b._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = function () {
        return (Pg = b._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 =
          b.asm.Qe).apply(null, arguments);
      }),
      Qg = (b._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = function () {
        return (Qg = b._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 =
          b.asm.Re).apply(null, arguments);
      }),
      Rg = (b._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 = function () {
        return (Rg = b._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 =
          b.asm.Se).apply(null, arguments);
      }),
      Sg = (b._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = function () {
        return (Sg = b._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 =
          b.asm.Te).apply(null, arguments);
      }),
      Tg = (b._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 = function () {
        return (Tg = b._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 =
          b.asm.Ue).apply(null, arguments);
      }),
      Ug = (b._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 = function () {
        return (Ug = b._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 =
          b.asm.Ve).apply(null, arguments);
      }),
      Vg = (b._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 = function () {
        return (Vg = b._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 =
          b.asm.We).apply(null, arguments);
      }),
      Wg = (b._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 = function () {
        return (Wg = b._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 =
          b.asm.Xe).apply(null, arguments);
      }),
      Xg = (b._emscripten_bind_btDispatcherInfo___destroy___0 = function () {
        return (Xg = b._emscripten_bind_btDispatcherInfo___destroy___0 =
          b.asm.Ye).apply(null, arguments);
      }),
      Yg = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 = function () {
        return (Yg = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 =
          b.asm.Ze).apply(null, arguments);
      }),
      Zg = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 = function () {
        return (Zg = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 =
          b.asm._e).apply(null, arguments);
      }),
      $g = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 = function () {
        return ($g = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 =
          b.asm.$e).apply(null, arguments);
      }),
      ah = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 = function () {
        return (ah = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 =
          b.asm.af).apply(null, arguments);
      }),
      bh = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 = function () {
        return (bh = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 =
          b.asm.bf).apply(null, arguments);
      }),
      ch = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 = function () {
        return (ch = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 =
          b.asm.cf).apply(null, arguments);
      }),
      dh = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 = function () {
        return (dh = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 =
          b.asm.df).apply(null, arguments);
      }),
      eh = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 = function () {
        return (eh = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 =
          b.asm.ef).apply(null, arguments);
      }),
      fh = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 = function () {
        return (fh = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 =
          b.asm.ff).apply(null, arguments);
      }),
      gh = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 = function () {
        return (gh = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 =
          b.asm.gf).apply(null, arguments);
      }),
      hh = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 = function () {
        return (hh = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 =
          b.asm.hf).apply(null, arguments);
      }),
      ih = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 = function () {
        return (ih = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 =
          b.asm.jf).apply(null, arguments);
      }),
      jh = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 = function () {
        return (jh = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 =
          b.asm.kf).apply(null, arguments);
      }),
      kh = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 = function () {
        return (kh = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 =
          b.asm.lf).apply(null, arguments);
      }),
      lh = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 = function () {
        return (lh = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 =
          b.asm.mf).apply(null, arguments);
      }),
      mh = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 = function () {
        return (mh = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 =
          b.asm.nf).apply(null, arguments);
      }),
      nh = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 = function () {
        return (nh = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 =
          b.asm.of).apply(null, arguments);
      }),
      oh = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 = function () {
        return (oh = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 =
          b.asm.pf).apply(null, arguments);
      }),
      ph = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 = function () {
        return (ph = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 =
          b.asm.qf).apply(null, arguments);
      }),
      qh = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 = function () {
        return (qh = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 =
          b.asm.rf).apply(null, arguments);
      }),
      rh = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 = function () {
        return (rh = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 =
          b.asm.sf).apply(null, arguments);
      }),
      sh = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 = function () {
        return (sh = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 =
          b.asm.tf).apply(null, arguments);
      }),
      th = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 = function () {
        return (th = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 =
          b.asm.uf).apply(null, arguments);
      }),
      uh = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 = function () {
        return (uh = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 =
          b.asm.vf).apply(null, arguments);
      }),
      vh = (b._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 = function () {
        return (vh = b._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 =
          b.asm.wf).apply(null, arguments);
      }),
      wh = (b._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = function () {
        return (wh = b._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 =
          b.asm.xf).apply(null, arguments);
      }),
      xh = (b._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 = function () {
        return (xh = b._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 =
          b.asm.yf).apply(null, arguments);
      }),
      yh = (b._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = function () {
        return (yh = b._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 =
          b.asm.zf).apply(null, arguments);
      }),
      zh = (b._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = function () {
        return (zh = b._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 =
          b.asm.Af).apply(null, arguments);
      }),
      Ah = (b._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = function () {
        return (Ah = b._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 =
          b.asm.Bf).apply(null, arguments);
      }),
      Bh = (b._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = function () {
        return (Bh = b._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 =
          b.asm.Cf).apply(null, arguments);
      }),
      Ch = (b._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = function () {
        return (Ch = b._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 =
          b.asm.Df).apply(null, arguments);
      }),
      Dh = (b._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = function () {
        return (Dh = b._emscripten_bind_btConvexTriangleMeshShape___destroy___0 =
          b.asm.Ef).apply(null, arguments);
      }),
      Eh = (b._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 = function () {
        return (Eh = b._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 =
          b.asm.Ff).apply(null, arguments);
      }),
      Fh = (b._emscripten_bind_btBroadphaseInterface___destroy___0 = function () {
        return (Fh = b._emscripten_bind_btBroadphaseInterface___destroy___0 =
          b.asm.Gf).apply(null, arguments);
      }),
      Gh = (b._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 = function () {
        return (Gh = b._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 =
          b.asm.Hf).apply(null, arguments);
      }),
      Hh = (b._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 = function () {
        return (Hh = b._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 =
          b.asm.If).apply(null, arguments);
      }),
      Ih = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 = function () {
        return (Ih = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 =
          b.asm.Jf).apply(null, arguments);
      }),
      Jh = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = function () {
        return (Jh = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 =
          b.asm.Kf).apply(null, arguments);
      }),
      Kh = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = function () {
        return (Kh = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 =
          b.asm.Lf).apply(null, arguments);
      }),
      Lh = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = function () {
        return (Lh = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 =
          b.asm.Mf).apply(null, arguments);
      }),
      Mh = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 = function () {
        return (Mh = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 =
          b.asm.Nf).apply(null, arguments);
      }),
      Nh = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 = function () {
        return (Nh = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 =
          b.asm.Of).apply(null, arguments);
      }),
      Oh = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = function () {
        return (Oh = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 =
          b.asm.Pf).apply(null, arguments);
      }),
      Ph = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = function () {
        return (Ph = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 =
          b.asm.Qf).apply(null, arguments);
      }),
      Qh = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 = function () {
        return (Qh = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 =
          b.asm.Rf).apply(null, arguments);
      }),
      Rh = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = function () {
        return (Rh = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 =
          b.asm.Sf).apply(null, arguments);
      }),
      Sh = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 = function () {
        return (Sh = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 =
          b.asm.Tf).apply(null, arguments);
      }),
      Th = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 = function () {
        return (Th = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 =
          b.asm.Uf).apply(null, arguments);
      }),
      Uh = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 = function () {
        return (Uh = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 =
          b.asm.Vf).apply(null, arguments);
      }),
      Vh = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 = function () {
        return (Vh = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 =
          b.asm.Wf).apply(null, arguments);
      }),
      Wh = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 = function () {
        return (Wh = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 =
          b.asm.Xf).apply(null, arguments);
      }),
      Xh = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 = function () {
        return (Xh = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 =
          b.asm.Yf).apply(null, arguments);
      }),
      Yh = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 = function () {
        return (Yh = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 =
          b.asm.Zf).apply(null, arguments);
      }),
      Zh = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 = function () {
        return (Zh = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 =
          b.asm._f).apply(null, arguments);
      }),
      $h = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 = function () {
        return ($h = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 =
          b.asm.$f).apply(null, arguments);
      }),
      ai = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 = function () {
        return (ai = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 =
          b.asm.ag).apply(null, arguments);
      }),
      bi = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 = function () {
        return (bi = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 =
          b.asm.bg).apply(null, arguments);
      }),
      ci = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 = function () {
        return (ci = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 =
          b.asm.cg).apply(null, arguments);
      }),
      di = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 = function () {
        return (di = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 =
          b.asm.dg).apply(null, arguments);
      }),
      ei = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 = function () {
        return (ei = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 =
          b.asm.eg).apply(null, arguments);
      }),
      fi = (b._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = function () {
        return (fi = b._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 =
          b.asm.fg).apply(null, arguments);
      }),
      gi = (b._emscripten_bind_btCollisionConfiguration___destroy___0 = function () {
        return (gi = b._emscripten_bind_btCollisionConfiguration___destroy___0 =
          b.asm.gg).apply(null, arguments);
      }),
      hi = (b._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = function () {
        return (hi = b._emscripten_bind_btPersistentManifold_btPersistentManifold_0 =
          b.asm.hg).apply(null, arguments);
      }),
      ii = (b._emscripten_bind_btPersistentManifold_getBody0_0 = function () {
        return (ii = b._emscripten_bind_btPersistentManifold_getBody0_0 =
          b.asm.ig).apply(null, arguments);
      }),
      ji = (b._emscripten_bind_btPersistentManifold_getBody1_0 = function () {
        return (ji = b._emscripten_bind_btPersistentManifold_getBody1_0 =
          b.asm.jg).apply(null, arguments);
      }),
      ki = (b._emscripten_bind_btPersistentManifold_getNumContacts_0 = function () {
        return (ki = b._emscripten_bind_btPersistentManifold_getNumContacts_0 =
          b.asm.kg).apply(null, arguments);
      }),
      li = (b._emscripten_bind_btPersistentManifold_getContactPoint_1 = function () {
        return (li = b._emscripten_bind_btPersistentManifold_getContactPoint_1 =
          b.asm.lg).apply(null, arguments);
      }),
      mi = (b._emscripten_bind_btPersistentManifold___destroy___0 = function () {
        return (mi = b._emscripten_bind_btPersistentManifold___destroy___0 =
          b.asm.mg).apply(null, arguments);
      }),
      ni = (b._emscripten_bind_btCompoundShape_btCompoundShape_0 = function () {
        return (ni = b._emscripten_bind_btCompoundShape_btCompoundShape_0 =
          b.asm.ng).apply(null, arguments);
      }),
      oi = (b._emscripten_bind_btCompoundShape_btCompoundShape_1 = function () {
        return (oi = b._emscripten_bind_btCompoundShape_btCompoundShape_1 =
          b.asm.og).apply(null, arguments);
      }),
      pi = (b._emscripten_bind_btCompoundShape_addChildShape_2 = function () {
        return (pi = b._emscripten_bind_btCompoundShape_addChildShape_2 =
          b.asm.pg).apply(null, arguments);
      }),
      qi = (b._emscripten_bind_btCompoundShape_removeChildShape_1 = function () {
        return (qi = b._emscripten_bind_btCompoundShape_removeChildShape_1 =
          b.asm.qg).apply(null, arguments);
      }),
      ri = (b._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = function () {
        return (ri = b._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 =
          b.asm.rg).apply(null, arguments);
      }),
      si = (b._emscripten_bind_btCompoundShape_getNumChildShapes_0 = function () {
        return (si = b._emscripten_bind_btCompoundShape_getNumChildShapes_0 =
          b.asm.sg).apply(null, arguments);
      }),
      ti = (b._emscripten_bind_btCompoundShape_getChildShape_1 = function () {
        return (ti = b._emscripten_bind_btCompoundShape_getChildShape_1 =
          b.asm.tg).apply(null, arguments);
      }),
      ui = (b._emscripten_bind_btCompoundShape_updateChildTransform_2 = function () {
        return (ui = b._emscripten_bind_btCompoundShape_updateChildTransform_2 =
          b.asm.ug).apply(null, arguments);
      }),
      vi = (b._emscripten_bind_btCompoundShape_updateChildTransform_3 = function () {
        return (vi = b._emscripten_bind_btCompoundShape_updateChildTransform_3 =
          b.asm.vg).apply(null, arguments);
      }),
      wi = (b._emscripten_bind_btCompoundShape_setMargin_1 = function () {
        return (wi = b._emscripten_bind_btCompoundShape_setMargin_1 =
          b.asm.wg).apply(null, arguments);
      }),
      xi = (b._emscripten_bind_btCompoundShape_getMargin_0 = function () {
        return (xi = b._emscripten_bind_btCompoundShape_getMargin_0 =
          b.asm.xg).apply(null, arguments);
      }),
      yi = (b._emscripten_bind_btCompoundShape_setLocalScaling_1 = function () {
        return (yi = b._emscripten_bind_btCompoundShape_setLocalScaling_1 =
          b.asm.yg).apply(null, arguments);
      }),
      zi = (b._emscripten_bind_btCompoundShape_getLocalScaling_0 = function () {
        return (zi = b._emscripten_bind_btCompoundShape_getLocalScaling_0 =
          b.asm.zg).apply(null, arguments);
      }),
      Ai = (b._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = function () {
        return (Ai = b._emscripten_bind_btCompoundShape_calculateLocalInertia_2 =
          b.asm.Ag).apply(null, arguments);
      }),
      Bi = (b._emscripten_bind_btCompoundShape___destroy___0 = function () {
        return (Bi = b._emscripten_bind_btCompoundShape___destroy___0 =
          b.asm.Bg).apply(null, arguments);
      }),
      Ci = (b._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 = function () {
        return (Ci = b._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 =
          b.asm.Cg).apply(null, arguments);
      }),
      Di = (b._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = function () {
        return (Di = b._emscripten_bind_ClosestConvexResultCallback_hasHit_0 =
          b.asm.Dg).apply(null, arguments);
      }),
      Ei = (b._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = function () {
        return (Ei = b._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 =
          b.asm.Eg).apply(null, arguments);
      }),
      Fi = (b._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 = function () {
        return (Fi = b._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 =
          b.asm.Fg).apply(null, arguments);
      }),
      Gi = (b._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = function () {
        return (Gi = b._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 =
          b.asm.Gg).apply(null, arguments);
      }),
      Hi = (b._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = function () {
        return (Hi = b._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 =
          b.asm.Hg).apply(null, arguments);
      }),
      Ii = (b._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 = function () {
        return (Ii = b._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 =
          b.asm.Ig).apply(null, arguments);
      }),
      Ji = (b._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = function () {
        return (Ji = b._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 =
          b.asm.Jg).apply(null, arguments);
      }),
      Ki = (b._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = function () {
        return (Ki = b._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 =
          b.asm.Kg).apply(null, arguments);
      }),
      Li = (b._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = function () {
        return (Li = b._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 =
          b.asm.Lg).apply(null, arguments);
      }),
      Mi = (b._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 = function () {
        return (Mi = b._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 =
          b.asm.Mg).apply(null, arguments);
      }),
      Ni = (b._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 = function () {
        return (Ni = b._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 =
          b.asm.Ng).apply(null, arguments);
      }),
      Oi = (b._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = function () {
        return (Oi = b._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 =
          b.asm.Og).apply(null, arguments);
      }),
      Pi = (b._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = function () {
        return (Pi = b._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 =
          b.asm.Pg).apply(null, arguments);
      }),
      Qi = (b._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 = function () {
        return (Qi = b._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 =
          b.asm.Qg).apply(null, arguments);
      }),
      Ri = (b._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = function () {
        return (Ri = b._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 =
          b.asm.Rg).apply(null, arguments);
      }),
      Si = (b._emscripten_bind_ClosestConvexResultCallback___destroy___0 = function () {
        return (Si = b._emscripten_bind_ClosestConvexResultCallback___destroy___0 =
          b.asm.Sg).apply(null, arguments);
      }),
      Ti = (b._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 = function () {
        return (Ti = b._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 =
          b.asm.Tg).apply(null, arguments);
      }),
      Ui = (b._emscripten_bind_AllHitsRayResultCallback_hasHit_0 = function () {
        return (Ui = b._emscripten_bind_AllHitsRayResultCallback_hasHit_0 =
          b.asm.Ug).apply(null, arguments);
      }),
      Vi = (b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 = function () {
        return (Vi = b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 =
          b.asm.Vg).apply(null, arguments);
      }),
      Wi = (b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 = function () {
        return (Wi = b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 =
          b.asm.Wg).apply(null, arguments);
      }),
      Xi = (b._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 = function () {
        return (Xi = b._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 =
          b.asm.Xg).apply(null, arguments);
      }),
      Yi = (b._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 = function () {
        return (Yi = b._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 =
          b.asm.Yg).apply(null, arguments);
      }),
      Zi = (b._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 = function () {
        return (Zi = b._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 =
          b.asm.Zg).apply(null, arguments);
      }),
      $i = (b._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = function () {
        return ($i = b._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 =
          b.asm._g).apply(null, arguments);
      }),
      aj = (b._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 = function () {
        return (aj = b._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 =
          b.asm.$g).apply(null, arguments);
      }),
      bj = (b._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 = function () {
        return (bj = b._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 =
          b.asm.ah).apply(null, arguments);
      }),
      cj = (b._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 = function () {
        return (cj = b._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 =
          b.asm.bh).apply(null, arguments);
      }),
      dj = (b._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 = function () {
        return (dj = b._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 =
          b.asm.ch).apply(null, arguments);
      }),
      ej = (b._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 = function () {
        return (ej = b._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 =
          b.asm.dh).apply(null, arguments);
      }),
      fj = (b._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 = function () {
        return (fj = b._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 =
          b.asm.eh).apply(null, arguments);
      }),
      gj = (b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 = function () {
        return (gj = b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 =
          b.asm.fh).apply(null, arguments);
      }),
      hj = (b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 = function () {
        return (hj = b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 =
          b.asm.gh).apply(null, arguments);
      }),
      ij = (b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 = function () {
        return (ij = b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 =
          b.asm.hh).apply(null, arguments);
      }),
      jj = (b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 = function () {
        return (jj = b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 =
          b.asm.ih).apply(null, arguments);
      }),
      kj = (b._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 = function () {
        return (kj = b._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 =
          b.asm.jh).apply(null, arguments);
      }),
      lj = (b._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 = function () {
        return (lj = b._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 =
          b.asm.kh).apply(null, arguments);
      }),
      mj = (b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 = function () {
        return (mj = b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 =
          b.asm.lh).apply(null, arguments);
      }),
      nj = (b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 = function () {
        return (nj = b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 =
          b.asm.mh).apply(null, arguments);
      }),
      oj = (b._emscripten_bind_AllHitsRayResultCallback___destroy___0 = function () {
        return (oj = b._emscripten_bind_AllHitsRayResultCallback___destroy___0 =
          b.asm.nh).apply(null, arguments);
      }),
      pj = (b._emscripten_bind_tMaterialArray_size_0 = function () {
        return (pj = b._emscripten_bind_tMaterialArray_size_0 = b.asm.oh).apply(
          null,
          arguments
        );
      }),
      qj = (b._emscripten_bind_tMaterialArray_at_1 = function () {
        return (qj = b._emscripten_bind_tMaterialArray_at_1 = b.asm.ph).apply(
          null,
          arguments
        );
      }),
      rj = (b._emscripten_bind_tMaterialArray___destroy___0 = function () {
        return (rj = b._emscripten_bind_tMaterialArray___destroy___0 =
          b.asm.qh).apply(null, arguments);
      }),
      sj = (b._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 = function () {
        return (sj = b._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 =
          b.asm.rh).apply(null, arguments);
      }),
      tj = (b._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = function () {
        return (tj = b._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 =
          b.asm.sh).apply(null, arguments);
      }),
      uj = (b._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = function () {
        return (uj = b._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 =
          b.asm.th).apply(null, arguments);
      }),
      vj = (b._emscripten_bind_btEmptyShape_btEmptyShape_0 = function () {
        return (vj = b._emscripten_bind_btEmptyShape_btEmptyShape_0 =
          b.asm.uh).apply(null, arguments);
      }),
      wj = (b._emscripten_bind_btEmptyShape_setLocalScaling_1 = function () {
        return (wj = b._emscripten_bind_btEmptyShape_setLocalScaling_1 =
          b.asm.vh).apply(null, arguments);
      }),
      xj = (b._emscripten_bind_btEmptyShape_getLocalScaling_0 = function () {
        return (xj = b._emscripten_bind_btEmptyShape_getLocalScaling_0 =
          b.asm.wh).apply(null, arguments);
      }),
      yj = (b._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = function () {
        return (yj = b._emscripten_bind_btEmptyShape_calculateLocalInertia_2 =
          b.asm.xh).apply(null, arguments);
      }),
      zj = (b._emscripten_bind_btEmptyShape___destroy___0 = function () {
        return (zj = b._emscripten_bind_btEmptyShape___destroy___0 =
          b.asm.yh).apply(null, arguments);
      }),
      Aj = (b._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = function () {
        return (Aj = b._emscripten_bind_btConstraintSetting_btConstraintSetting_0 =
          b.asm.zh).apply(null, arguments);
      }),
      Bj = (b._emscripten_bind_btConstraintSetting_get_m_tau_0 = function () {
        return (Bj = b._emscripten_bind_btConstraintSetting_get_m_tau_0 =
          b.asm.Ah).apply(null, arguments);
      }),
      Cj = (b._emscripten_bind_btConstraintSetting_set_m_tau_1 = function () {
        return (Cj = b._emscripten_bind_btConstraintSetting_set_m_tau_1 =
          b.asm.Bh).apply(null, arguments);
      }),
      Dj = (b._emscripten_bind_btConstraintSetting_get_m_damping_0 = function () {
        return (Dj = b._emscripten_bind_btConstraintSetting_get_m_damping_0 =
          b.asm.Ch).apply(null, arguments);
      }),
      Ej = (b._emscripten_bind_btConstraintSetting_set_m_damping_1 = function () {
        return (Ej = b._emscripten_bind_btConstraintSetting_set_m_damping_1 =
          b.asm.Dh).apply(null, arguments);
      }),
      Fj = (b._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = function () {
        return (Fj = b._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 =
          b.asm.Eh).apply(null, arguments);
      }),
      Gj = (b._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = function () {
        return (Gj = b._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 =
          b.asm.Fh).apply(null, arguments);
      }),
      Hj = (b._emscripten_bind_btConstraintSetting___destroy___0 = function () {
        return (Hj = b._emscripten_bind_btConstraintSetting___destroy___0 =
          b.asm.Gh).apply(null, arguments);
      }),
      Ij = (b._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = function () {
        return (Ij = b._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 =
          b.asm.Hh).apply(null, arguments);
      }),
      Jj = (b._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = function () {
        return (Jj = b._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 =
          b.asm.Ih).apply(null, arguments);
      }),
      Kj = (b._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = function () {
        return (Kj = b._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 =
          b.asm.Jh).apply(null, arguments);
      }),
      Lj = (b._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = function () {
        return (Lj = b._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 =
          b.asm.Kh).apply(null, arguments);
      }),
      Mj = (b._emscripten_bind_LocalShapeInfo___destroy___0 = function () {
        return (Mj = b._emscripten_bind_LocalShapeInfo___destroy___0 =
          b.asm.Lh).apply(null, arguments);
      }),
      Nj = (b._emscripten_bind_btRigidBody_btRigidBody_1 = function () {
        return (Nj = b._emscripten_bind_btRigidBody_btRigidBody_1 =
          b.asm.Mh).apply(null, arguments);
      }),
      Oj = (b._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = function () {
        return (Oj = b._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 =
          b.asm.Nh).apply(null, arguments);
      }),
      Pj = (b._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = function () {
        return (Pj = b._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 =
          b.asm.Oh).apply(null, arguments);
      }),
      Qj = (b._emscripten_bind_btRigidBody_setSleepingThresholds_2 = function () {
        return (Qj = b._emscripten_bind_btRigidBody_setSleepingThresholds_2 =
          b.asm.Ph).apply(null, arguments);
      }),
      Rj = (b._emscripten_bind_btRigidBody_getLinearDamping_0 = function () {
        return (Rj = b._emscripten_bind_btRigidBody_getLinearDamping_0 =
          b.asm.Qh).apply(null, arguments);
      }),
      Sj = (b._emscripten_bind_btRigidBody_getAngularDamping_0 = function () {
        return (Sj = b._emscripten_bind_btRigidBody_getAngularDamping_0 =
          b.asm.Rh).apply(null, arguments);
      }),
      Tj = (b._emscripten_bind_btRigidBody_setDamping_2 = function () {
        return (Tj = b._emscripten_bind_btRigidBody_setDamping_2 =
          b.asm.Sh).apply(null, arguments);
      }),
      Uj = (b._emscripten_bind_btRigidBody_setMassProps_2 = function () {
        return (Uj = b._emscripten_bind_btRigidBody_setMassProps_2 =
          b.asm.Th).apply(null, arguments);
      }),
      Vj = (b._emscripten_bind_btRigidBody_getLinearFactor_0 = function () {
        return (Vj = b._emscripten_bind_btRigidBody_getLinearFactor_0 =
          b.asm.Uh).apply(null, arguments);
      }),
      Wj = (b._emscripten_bind_btRigidBody_setLinearFactor_1 = function () {
        return (Wj = b._emscripten_bind_btRigidBody_setLinearFactor_1 =
          b.asm.Vh).apply(null, arguments);
      }),
      Xj = (b._emscripten_bind_btRigidBody_applyTorque_1 = function () {
        return (Xj = b._emscripten_bind_btRigidBody_applyTorque_1 =
          b.asm.Wh).apply(null, arguments);
      }),
      Yj = (b._emscripten_bind_btRigidBody_applyLocalTorque_1 = function () {
        return (Yj = b._emscripten_bind_btRigidBody_applyLocalTorque_1 =
          b.asm.Xh).apply(null, arguments);
      }),
      Zj = (b._emscripten_bind_btRigidBody_applyForce_2 = function () {
        return (Zj = b._emscripten_bind_btRigidBody_applyForce_2 =
          b.asm.Yh).apply(null, arguments);
      }),
      ak = (b._emscripten_bind_btRigidBody_applyCentralForce_1 = function () {
        return (ak = b._emscripten_bind_btRigidBody_applyCentralForce_1 =
          b.asm.Zh).apply(null, arguments);
      }),
      bk = (b._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = function () {
        return (bk = b._emscripten_bind_btRigidBody_applyCentralLocalForce_1 =
          b.asm._h).apply(null, arguments);
      }),
      ck = (b._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = function () {
        return (ck = b._emscripten_bind_btRigidBody_applyTorqueImpulse_1 =
          b.asm.$h).apply(null, arguments);
      }),
      dk = (b._emscripten_bind_btRigidBody_applyImpulse_2 = function () {
        return (dk = b._emscripten_bind_btRigidBody_applyImpulse_2 =
          b.asm.ai).apply(null, arguments);
      }),
      ek = (b._emscripten_bind_btRigidBody_applyCentralImpulse_1 = function () {
        return (ek = b._emscripten_bind_btRigidBody_applyCentralImpulse_1 =
          b.asm.bi).apply(null, arguments);
      }),
      fk = (b._emscripten_bind_btRigidBody_updateInertiaTensor_0 = function () {
        return (fk = b._emscripten_bind_btRigidBody_updateInertiaTensor_0 =
          b.asm.ci).apply(null, arguments);
      }),
      gk = (b._emscripten_bind_btRigidBody_getLinearVelocity_0 = function () {
        return (gk = b._emscripten_bind_btRigidBody_getLinearVelocity_0 =
          b.asm.di).apply(null, arguments);
      }),
      hk = (b._emscripten_bind_btRigidBody_getAngularVelocity_0 = function () {
        return (hk = b._emscripten_bind_btRigidBody_getAngularVelocity_0 =
          b.asm.ei).apply(null, arguments);
      }),
      ik = (b._emscripten_bind_btRigidBody_setLinearVelocity_1 = function () {
        return (ik = b._emscripten_bind_btRigidBody_setLinearVelocity_1 =
          b.asm.fi).apply(null, arguments);
      }),
      jk = (b._emscripten_bind_btRigidBody_setAngularVelocity_1 = function () {
        return (jk = b._emscripten_bind_btRigidBody_setAngularVelocity_1 =
          b.asm.gi).apply(null, arguments);
      }),
      kk = (b._emscripten_bind_btRigidBody_getMotionState_0 = function () {
        return (kk = b._emscripten_bind_btRigidBody_getMotionState_0 =
          b.asm.hi).apply(null, arguments);
      }),
      lk = (b._emscripten_bind_btRigidBody_setMotionState_1 = function () {
        return (lk = b._emscripten_bind_btRigidBody_setMotionState_1 =
          b.asm.ii).apply(null, arguments);
      }),
      mk = (b._emscripten_bind_btRigidBody_getAngularFactor_0 = function () {
        return (mk = b._emscripten_bind_btRigidBody_getAngularFactor_0 =
          b.asm.ji).apply(null, arguments);
      }),
      nk = (b._emscripten_bind_btRigidBody_setAngularFactor_1 = function () {
        return (nk = b._emscripten_bind_btRigidBody_setAngularFactor_1 =
          b.asm.ki).apply(null, arguments);
      }),
      ok = (b._emscripten_bind_btRigidBody_upcast_1 = function () {
        return (ok = b._emscripten_bind_btRigidBody_upcast_1 = b.asm.li).apply(
          null,
          arguments
        );
      }),
      pk = (b._emscripten_bind_btRigidBody_getAabb_2 = function () {
        return (pk = b._emscripten_bind_btRigidBody_getAabb_2 = b.asm.mi).apply(
          null,
          arguments
        );
      }),
      qk = (b._emscripten_bind_btRigidBody_applyGravity_0 = function () {
        return (qk = b._emscripten_bind_btRigidBody_applyGravity_0 =
          b.asm.ni).apply(null, arguments);
      }),
      rk = (b._emscripten_bind_btRigidBody_getGravity_0 = function () {
        return (rk = b._emscripten_bind_btRigidBody_getGravity_0 =
          b.asm.oi).apply(null, arguments);
      }),
      sk = (b._emscripten_bind_btRigidBody_setGravity_1 = function () {
        return (sk = b._emscripten_bind_btRigidBody_setGravity_1 =
          b.asm.pi).apply(null, arguments);
      }),
      tk = (b._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = function () {
        return (tk = b._emscripten_bind_btRigidBody_getBroadphaseProxy_0 =
          b.asm.qi).apply(null, arguments);
      }),
      uk = (b._emscripten_bind_btRigidBody_clearForces_0 = function () {
        return (uk = b._emscripten_bind_btRigidBody_clearForces_0 =
          b.asm.ri).apply(null, arguments);
      }),
      vk = (b._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = function () {
        return (vk = b._emscripten_bind_btRigidBody_setAnisotropicFriction_2 =
          b.asm.si).apply(null, arguments);
      }),
      wk = (b._emscripten_bind_btRigidBody_getCollisionShape_0 = function () {
        return (wk = b._emscripten_bind_btRigidBody_getCollisionShape_0 =
          b.asm.ti).apply(null, arguments);
      }),
      xk = (b._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = function () {
        return (xk = b._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 =
          b.asm.ui).apply(null, arguments);
      }),
      yk = (b._emscripten_bind_btRigidBody_setActivationState_1 = function () {
        return (yk = b._emscripten_bind_btRigidBody_setActivationState_1 =
          b.asm.vi).apply(null, arguments);
      }),
      zk = (b._emscripten_bind_btRigidBody_forceActivationState_1 = function () {
        return (zk = b._emscripten_bind_btRigidBody_forceActivationState_1 =
          b.asm.wi).apply(null, arguments);
      }),
      Ak = (b._emscripten_bind_btRigidBody_activate_0 = function () {
        return (Ak = b._emscripten_bind_btRigidBody_activate_0 =
          b.asm.xi).apply(null, arguments);
      }),
      Bk = (b._emscripten_bind_btRigidBody_activate_1 = function () {
        return (Bk = b._emscripten_bind_btRigidBody_activate_1 =
          b.asm.yi).apply(null, arguments);
      }),
      Ck = (b._emscripten_bind_btRigidBody_isActive_0 = function () {
        return (Ck = b._emscripten_bind_btRigidBody_isActive_0 =
          b.asm.zi).apply(null, arguments);
      }),
      Dk = (b._emscripten_bind_btRigidBody_isKinematicObject_0 = function () {
        return (Dk = b._emscripten_bind_btRigidBody_isKinematicObject_0 =
          b.asm.Ai).apply(null, arguments);
      }),
      Ek = (b._emscripten_bind_btRigidBody_isStaticObject_0 = function () {
        return (Ek = b._emscripten_bind_btRigidBody_isStaticObject_0 =
          b.asm.Bi).apply(null, arguments);
      }),
      Fk = (b._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = function () {
        return (Fk = b._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 =
          b.asm.Ci).apply(null, arguments);
      }),
      Gk = (b._emscripten_bind_btRigidBody_getRestitution_0 = function () {
        return (Gk = b._emscripten_bind_btRigidBody_getRestitution_0 =
          b.asm.Di).apply(null, arguments);
      }),
      Hk = (b._emscripten_bind_btRigidBody_getFriction_0 = function () {
        return (Hk = b._emscripten_bind_btRigidBody_getFriction_0 =
          b.asm.Ei).apply(null, arguments);
      }),
      Ik = (b._emscripten_bind_btRigidBody_getRollingFriction_0 = function () {
        return (Ik = b._emscripten_bind_btRigidBody_getRollingFriction_0 =
          b.asm.Fi).apply(null, arguments);
      }),
      Jk = (b._emscripten_bind_btRigidBody_setRestitution_1 = function () {
        return (Jk = b._emscripten_bind_btRigidBody_setRestitution_1 =
          b.asm.Gi).apply(null, arguments);
      }),
      Kk = (b._emscripten_bind_btRigidBody_setFriction_1 = function () {
        return (Kk = b._emscripten_bind_btRigidBody_setFriction_1 =
          b.asm.Hi).apply(null, arguments);
      }),
      Lk = (b._emscripten_bind_btRigidBody_setRollingFriction_1 = function () {
        return (Lk = b._emscripten_bind_btRigidBody_setRollingFriction_1 =
          b.asm.Ii).apply(null, arguments);
      }),
      Mk = (b._emscripten_bind_btRigidBody_getWorldTransform_0 = function () {
        return (Mk = b._emscripten_bind_btRigidBody_getWorldTransform_0 =
          b.asm.Ji).apply(null, arguments);
      }),
      Nk = (b._emscripten_bind_btRigidBody_getCollisionFlags_0 = function () {
        return (Nk = b._emscripten_bind_btRigidBody_getCollisionFlags_0 =
          b.asm.Ki).apply(null, arguments);
      }),
      Ok = (b._emscripten_bind_btRigidBody_setCollisionFlags_1 = function () {
        return (Ok = b._emscripten_bind_btRigidBody_setCollisionFlags_1 =
          b.asm.Li).apply(null, arguments);
      }),
      Pk = (b._emscripten_bind_btRigidBody_setWorldTransform_1 = function () {
        return (Pk = b._emscripten_bind_btRigidBody_setWorldTransform_1 =
          b.asm.Mi).apply(null, arguments);
      }),
      Qk = (b._emscripten_bind_btRigidBody_setCollisionShape_1 = function () {
        return (Qk = b._emscripten_bind_btRigidBody_setCollisionShape_1 =
          b.asm.Ni).apply(null, arguments);
      }),
      Rk = (b._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = function () {
        return (Rk = b._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 =
          b.asm.Oi).apply(null, arguments);
      }),
      Sk = (b._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = function () {
        return (Sk = b._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 =
          b.asm.Pi).apply(null, arguments);
      }),
      Tk = (b._emscripten_bind_btRigidBody_getUserIndex_0 = function () {
        return (Tk = b._emscripten_bind_btRigidBody_getUserIndex_0 =
          b.asm.Qi).apply(null, arguments);
      }),
      Uk = (b._emscripten_bind_btRigidBody_setUserIndex_1 = function () {
        return (Uk = b._emscripten_bind_btRigidBody_setUserIndex_1 =
          b.asm.Ri).apply(null, arguments);
      }),
      Vk = (b._emscripten_bind_btRigidBody_getUserPointer_0 = function () {
        return (Vk = b._emscripten_bind_btRigidBody_getUserPointer_0 =
          b.asm.Si).apply(null, arguments);
      }),
      Wk = (b._emscripten_bind_btRigidBody_setUserPointer_1 = function () {
        return (Wk = b._emscripten_bind_btRigidBody_setUserPointer_1 =
          b.asm.Ti).apply(null, arguments);
      }),
      Xk = (b._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = function () {
        return (Xk = b._emscripten_bind_btRigidBody_getBroadphaseHandle_0 =
          b.asm.Ui).apply(null, arguments);
      }),
      Yk = (b._emscripten_bind_btRigidBody___destroy___0 = function () {
        return (Yk = b._emscripten_bind_btRigidBody___destroy___0 =
          b.asm.Vi).apply(null, arguments);
      }),
      Zk = (b._emscripten_bind_btIndexedMeshArray_size_0 = function () {
        return (Zk = b._emscripten_bind_btIndexedMeshArray_size_0 =
          b.asm.Wi).apply(null, arguments);
      }),
      $k = (b._emscripten_bind_btIndexedMeshArray_at_1 = function () {
        return ($k = b._emscripten_bind_btIndexedMeshArray_at_1 =
          b.asm.Xi).apply(null, arguments);
      }),
      al = (b._emscripten_bind_btIndexedMeshArray___destroy___0 = function () {
        return (al = b._emscripten_bind_btIndexedMeshArray___destroy___0 =
          b.asm.Yi).apply(null, arguments);
      }),
      bl = (b._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = function () {
        return (bl = b._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 =
          b.asm.Zi).apply(null, arguments);
      }),
      cl = (b._emscripten_bind_btDbvtBroadphase___destroy___0 = function () {
        return (cl = b._emscripten_bind_btDbvtBroadphase___destroy___0 =
          b.asm._i).apply(null, arguments);
      }),
      dl = (b._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = function () {
        return (dl = b._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 =
          b.asm.$i).apply(null, arguments);
      }),
      el = (b._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = function () {
        return (el = b._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 =
          b.asm.aj).apply(null, arguments);
      }),
      fl = (b._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = function () {
        return (fl = b._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 =
          b.asm.bj).apply(null, arguments);
      }),
      gl = (b._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = function () {
        return (gl = b._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 =
          b.asm.cj).apply(null, arguments);
      }),
      hl = (b._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = function () {
        return (hl = b._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 =
          b.asm.dj).apply(null, arguments);
      }),
      il = (b._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 = function () {
        return (il = b._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 =
          b.asm.ej).apply(null, arguments);
      }),
      jl = (b._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = function () {
        return (jl = b._emscripten_bind_btHeightfieldTerrainShape___destroy___0 =
          b.asm.fj).apply(null, arguments);
      }),
      kl = (b._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 = function () {
        return (kl = b._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 =
          b.asm.gj).apply(null, arguments);
      }),
      ll = (b._emscripten_bind_btDefaultSoftBodySolver___destroy___0 = function () {
        return (ll = b._emscripten_bind_btDefaultSoftBodySolver___destroy___0 =
          b.asm.hj).apply(null, arguments);
      }),
      ml = (b._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 = function () {
        return (ml = b._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 =
          b.asm.ij).apply(null, arguments);
      }),
      nl = (b._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = function () {
        return (nl = b._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 =
          b.asm.jj).apply(null, arguments);
      }),
      ol = (b._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = function () {
        return (ol = b._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 =
          b.asm.kj).apply(null, arguments);
      }),
      pl = (b._emscripten_bind_btCollisionDispatcher___destroy___0 = function () {
        return (pl = b._emscripten_bind_btCollisionDispatcher___destroy___0 =
          b.asm.lj).apply(null, arguments);
      }),
      ql = (b._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = function () {
        return (ql = b._emscripten_bind_btAxisSweep3_btAxisSweep3_2 =
          b.asm.mj).apply(null, arguments);
      }),
      rl = (b._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = function () {
        return (rl = b._emscripten_bind_btAxisSweep3_btAxisSweep3_3 =
          b.asm.nj).apply(null, arguments);
      }),
      sl = (b._emscripten_bind_btAxisSweep3_btAxisSweep3_4 = function () {
        return (sl = b._emscripten_bind_btAxisSweep3_btAxisSweep3_4 =
          b.asm.oj).apply(null, arguments);
      }),
      tl = (b._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = function () {
        return (tl = b._emscripten_bind_btAxisSweep3_btAxisSweep3_5 =
          b.asm.pj).apply(null, arguments);
      }),
      ul = (b._emscripten_bind_btAxisSweep3___destroy___0 = function () {
        return (ul = b._emscripten_bind_btAxisSweep3___destroy___0 =
          b.asm.qj).apply(null, arguments);
      }),
      vl = (b._emscripten_bind_VoidPtr___destroy___0 = function () {
        return (vl = b._emscripten_bind_VoidPtr___destroy___0 = b.asm.rj).apply(
          null,
          arguments
        );
      }),
      wl = (b._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = function () {
        return (wl = b._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 =
          b.asm.sj).apply(null, arguments);
      }),
      xl = (b._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 = function () {
        return (xl = b._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 =
          b.asm.tj).apply(null, arguments);
      }),
      yl = (b._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = function () {
        return (yl = b._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 =
          b.asm.uj).apply(null, arguments);
      }),
      zl = (b._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = function () {
        return (zl = b._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 =
          b.asm.vj).apply(null, arguments);
      }),
      Al = (b._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 = function () {
        return (Al = b._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 =
          b.asm.wj).apply(null, arguments);
      }),
      Bl = (b._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = function () {
        return (Bl = b._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 =
          b.asm.xj).apply(null, arguments);
      }),
      Cl = (b._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = function () {
        return (Cl = b._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 =
          b.asm.yj).apply(null, arguments);
      }),
      Dl = (b._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 = function () {
        return (Dl = b._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 =
          b.asm.zj).apply(null, arguments);
      }),
      El = (b._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = function () {
        return (El = b._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 =
          b.asm.Aj).apply(null, arguments);
      }),
      Fl = (b._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 = function () {
        return (Fl = b._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 =
          b.asm.Bj).apply(null, arguments);
      }),
      Gl = (b._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 = function () {
        return (Gl = b._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 =
          b.asm.Cj).apply(null, arguments);
      }),
      Hl = (b._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 = function () {
        return (Hl = b._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 =
          b.asm.Dj).apply(null, arguments);
      }),
      Il = (b._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = function () {
        return (Il = b._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 =
          b.asm.Ej).apply(null, arguments);
      }),
      Jl = (b._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 = function () {
        return (Jl = b._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 =
          b.asm.Fj).apply(null, arguments);
      }),
      Kl = (b._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = function () {
        return (Kl = b._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 =
          b.asm.Gj).apply(null, arguments);
      }),
      Ll = (b._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = function () {
        return (Ll = b._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 =
          b.asm.Hj).apply(null, arguments);
      }),
      Ml = (b._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 = function () {
        return (Ml = b._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 =
          b.asm.Ij).apply(null, arguments);
      }),
      Nl = (b._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = function () {
        return (Nl = b._emscripten_bind_btSoftBodyWorldInfo___destroy___0 =
          b.asm.Jj).apply(null, arguments);
      }),
      Ol = (b._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = function () {
        return (Ol = b._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 =
          b.asm.Kj).apply(null, arguments);
      }),
      Pl = (b._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 = function () {
        return (Pl = b._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 =
          b.asm.Lj).apply(null, arguments);
      }),
      Ql = (b._emscripten_bind_btConeTwistConstraint_setLimit_2 = function () {
        return (Ql = b._emscripten_bind_btConeTwistConstraint_setLimit_2 =
          b.asm.Mj).apply(null, arguments);
      }),
      Rl = (b._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = function () {
        return (Rl = b._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 =
          b.asm.Nj).apply(null, arguments);
      }),
      Sl = (b._emscripten_bind_btConeTwistConstraint_setDamping_1 = function () {
        return (Sl = b._emscripten_bind_btConeTwistConstraint_setDamping_1 =
          b.asm.Oj).apply(null, arguments);
      }),
      Tl = (b._emscripten_bind_btConeTwistConstraint_enableMotor_1 = function () {
        return (Tl = b._emscripten_bind_btConeTwistConstraint_enableMotor_1 =
          b.asm.Pj).apply(null, arguments);
      }),
      Ul = (b._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = function () {
        return (Ul = b._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 =
          b.asm.Qj).apply(null, arguments);
      }),
      Vl = (b._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 = function () {
        return (Vl = b._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 =
          b.asm.Rj).apply(null, arguments);
      }),
      Wl = (b._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = function () {
        return (Wl = b._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 =
          b.asm.Sj).apply(null, arguments);
      }),
      Xl = (b._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 = function () {
        return (Xl = b._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 =
          b.asm.Tj).apply(null, arguments);
      }),
      Yl = (b._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = function () {
        return (Yl = b._emscripten_bind_btConeTwistConstraint_enableFeedback_1 =
          b.asm.Uj).apply(null, arguments);
      }),
      Zl = (b._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = function () {
        return (Zl = b._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 =
          b.asm.Vj).apply(null, arguments);
      }),
      $l = (b._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 = function () {
        return ($l = b._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 =
          b.asm.Wj).apply(null, arguments);
      }),
      am = (b._emscripten_bind_btConeTwistConstraint_getParam_2 = function () {
        return (am = b._emscripten_bind_btConeTwistConstraint_getParam_2 =
          b.asm.Xj).apply(null, arguments);
      }),
      bm = (b._emscripten_bind_btConeTwistConstraint_setParam_3 = function () {
        return (bm = b._emscripten_bind_btConeTwistConstraint_setParam_3 =
          b.asm.Yj).apply(null, arguments);
      }),
      cm = (b._emscripten_bind_btConeTwistConstraint___destroy___0 = function () {
        return (cm = b._emscripten_bind_btConeTwistConstraint___destroy___0 =
          b.asm.Zj).apply(null, arguments);
      }),
      dm = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = function () {
        return (dm = b._emscripten_bind_btHingeConstraint_btHingeConstraint_2 =
          b.asm._j).apply(null, arguments);
      }),
      em = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = function () {
        return (em = b._emscripten_bind_btHingeConstraint_btHingeConstraint_3 =
          b.asm.$j).apply(null, arguments);
      }),
      fm = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = function () {
        return (fm = b._emscripten_bind_btHingeConstraint_btHingeConstraint_4 =
          b.asm.ak).apply(null, arguments);
      }),
      gm = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = function () {
        return (gm = b._emscripten_bind_btHingeConstraint_btHingeConstraint_5 =
          b.asm.bk).apply(null, arguments);
      }),
      hm = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = function () {
        return (hm = b._emscripten_bind_btHingeConstraint_btHingeConstraint_6 =
          b.asm.ck).apply(null, arguments);
      }),
      im = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = function () {
        return (im = b._emscripten_bind_btHingeConstraint_btHingeConstraint_7 =
          b.asm.dk).apply(null, arguments);
      }),
      jm = (b._emscripten_bind_btHingeConstraint_setLimit_4 = function () {
        return (jm = b._emscripten_bind_btHingeConstraint_setLimit_4 =
          b.asm.ek).apply(null, arguments);
      }),
      km = (b._emscripten_bind_btHingeConstraint_setLimit_5 = function () {
        return (km = b._emscripten_bind_btHingeConstraint_setLimit_5 =
          b.asm.fk).apply(null, arguments);
      }),
      lm = (b._emscripten_bind_btHingeConstraint_enableAngularMotor_3 = function () {
        return (lm = b._emscripten_bind_btHingeConstraint_enableAngularMotor_3 =
          b.asm.gk).apply(null, arguments);
      }),
      mm = (b._emscripten_bind_btHingeConstraint_setAngularOnly_1 = function () {
        return (mm = b._emscripten_bind_btHingeConstraint_setAngularOnly_1 =
          b.asm.hk).apply(null, arguments);
      }),
      nm = (b._emscripten_bind_btHingeConstraint_enableMotor_1 = function () {
        return (nm = b._emscripten_bind_btHingeConstraint_enableMotor_1 =
          b.asm.ik).apply(null, arguments);
      }),
      om = (b._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = function () {
        return (om = b._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 =
          b.asm.jk).apply(null, arguments);
      }),
      pm = (b._emscripten_bind_btHingeConstraint_setMotorTarget_2 = function () {
        return (pm = b._emscripten_bind_btHingeConstraint_setMotorTarget_2 =
          b.asm.kk).apply(null, arguments);
      }),
      qm = (b._emscripten_bind_btHingeConstraint_enableFeedback_1 = function () {
        return (qm = b._emscripten_bind_btHingeConstraint_enableFeedback_1 =
          b.asm.lk).apply(null, arguments);
      }),
      rm = (b._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = function () {
        return (rm = b._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 =
          b.asm.mk).apply(null, arguments);
      }),
      sm = (b._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = function () {
        return (sm = b._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 =
          b.asm.nk).apply(null, arguments);
      }),
      tm = (b._emscripten_bind_btHingeConstraint_getParam_2 = function () {
        return (tm = b._emscripten_bind_btHingeConstraint_getParam_2 =
          b.asm.ok).apply(null, arguments);
      }),
      um = (b._emscripten_bind_btHingeConstraint_setParam_3 = function () {
        return (um = b._emscripten_bind_btHingeConstraint_setParam_3 =
          b.asm.pk).apply(null, arguments);
      }),
      wm = (b._emscripten_bind_btHingeConstraint___destroy___0 = function () {
        return (wm = b._emscripten_bind_btHingeConstraint___destroy___0 =
          b.asm.qk).apply(null, arguments);
      }),
      xm = (b._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = function () {
        return (xm = b._emscripten_bind_btConeShapeZ_btConeShapeZ_2 =
          b.asm.rk).apply(null, arguments);
      }),
      ym = (b._emscripten_bind_btConeShapeZ_setLocalScaling_1 = function () {
        return (ym = b._emscripten_bind_btConeShapeZ_setLocalScaling_1 =
          b.asm.sk).apply(null, arguments);
      }),
      zm = (b._emscripten_bind_btConeShapeZ_getLocalScaling_0 = function () {
        return (zm = b._emscripten_bind_btConeShapeZ_getLocalScaling_0 =
          b.asm.tk).apply(null, arguments);
      }),
      Am = (b._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = function () {
        return (Am = b._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 =
          b.asm.uk).apply(null, arguments);
      }),
      Bm = (b._emscripten_bind_btConeShapeZ___destroy___0 = function () {
        return (Bm = b._emscripten_bind_btConeShapeZ___destroy___0 =
          b.asm.vk).apply(null, arguments);
      }),
      Cm = (b._emscripten_bind_btConeShapeX_btConeShapeX_2 = function () {
        return (Cm = b._emscripten_bind_btConeShapeX_btConeShapeX_2 =
          b.asm.wk).apply(null, arguments);
      }),
      Dm = (b._emscripten_bind_btConeShapeX_setLocalScaling_1 = function () {
        return (Dm = b._emscripten_bind_btConeShapeX_setLocalScaling_1 =
          b.asm.xk).apply(null, arguments);
      }),
      Em = (b._emscripten_bind_btConeShapeX_getLocalScaling_0 = function () {
        return (Em = b._emscripten_bind_btConeShapeX_getLocalScaling_0 =
          b.asm.yk).apply(null, arguments);
      }),
      Fm = (b._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = function () {
        return (Fm = b._emscripten_bind_btConeShapeX_calculateLocalInertia_2 =
          b.asm.zk).apply(null, arguments);
      }),
      Gm = (b._emscripten_bind_btConeShapeX___destroy___0 = function () {
        return (Gm = b._emscripten_bind_btConeShapeX___destroy___0 =
          b.asm.Ak).apply(null, arguments);
      }),
      Hm = (b._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = function () {
        return (Hm = b._emscripten_bind_btTriangleMesh_btTriangleMesh_0 =
          b.asm.Bk).apply(null, arguments);
      }),
      Im = (b._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = function () {
        return (Im = b._emscripten_bind_btTriangleMesh_btTriangleMesh_1 =
          b.asm.Ck).apply(null, arguments);
      }),
      Jm = (b._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = function () {
        return (Jm = b._emscripten_bind_btTriangleMesh_btTriangleMesh_2 =
          b.asm.Dk).apply(null, arguments);
      }),
      Km = (b._emscripten_bind_btTriangleMesh_addTriangle_3 = function () {
        return (Km = b._emscripten_bind_btTriangleMesh_addTriangle_3 =
          b.asm.Ek).apply(null, arguments);
      }),
      Lm = (b._emscripten_bind_btTriangleMesh_addTriangle_4 = function () {
        return (Lm = b._emscripten_bind_btTriangleMesh_addTriangle_4 =
          b.asm.Fk).apply(null, arguments);
      }),
      Mm = (b._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = function () {
        return (Mm = b._emscripten_bind_btTriangleMesh_findOrAddVertex_2 =
          b.asm.Gk).apply(null, arguments);
      }),
      Nm = (b._emscripten_bind_btTriangleMesh_addIndex_1 = function () {
        return (Nm = b._emscripten_bind_btTriangleMesh_addIndex_1 =
          b.asm.Hk).apply(null, arguments);
      }),
      Om = (b._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 = function () {
        return (Om = b._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 =
          b.asm.Ik).apply(null, arguments);
      }),
      Pm = (b._emscripten_bind_btTriangleMesh_setScaling_1 = function () {
        return (Pm = b._emscripten_bind_btTriangleMesh_setScaling_1 =
          b.asm.Jk).apply(null, arguments);
      }),
      Qm = (b._emscripten_bind_btTriangleMesh___destroy___0 = function () {
        return (Qm = b._emscripten_bind_btTriangleMesh___destroy___0 =
          b.asm.Kk).apply(null, arguments);
      }),
      Rm = (b._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = function () {
        return (Rm = b._emscripten_bind_btConvexHullShape_btConvexHullShape_0 =
          b.asm.Lk).apply(null, arguments);
      }),
      Sm = (b._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = function () {
        return (Sm = b._emscripten_bind_btConvexHullShape_btConvexHullShape_1 =
          b.asm.Mk).apply(null, arguments);
      }),
      Tm = (b._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = function () {
        return (Tm = b._emscripten_bind_btConvexHullShape_btConvexHullShape_2 =
          b.asm.Nk).apply(null, arguments);
      }),
      Um = (b._emscripten_bind_btConvexHullShape_addPoint_1 = function () {
        return (Um = b._emscripten_bind_btConvexHullShape_addPoint_1 =
          b.asm.Ok).apply(null, arguments);
      }),
      Vm = (b._emscripten_bind_btConvexHullShape_addPoint_2 = function () {
        return (Vm = b._emscripten_bind_btConvexHullShape_addPoint_2 =
          b.asm.Pk).apply(null, arguments);
      }),
      Wm = (b._emscripten_bind_btConvexHullShape_setMargin_1 = function () {
        return (Wm = b._emscripten_bind_btConvexHullShape_setMargin_1 =
          b.asm.Qk).apply(null, arguments);
      }),
      Xm = (b._emscripten_bind_btConvexHullShape_getMargin_0 = function () {
        return (Xm = b._emscripten_bind_btConvexHullShape_getMargin_0 =
          b.asm.Rk).apply(null, arguments);
      }),
      Ym = (b._emscripten_bind_btConvexHullShape_getNumVertices_0 = function () {
        return (Ym = b._emscripten_bind_btConvexHullShape_getNumVertices_0 =
          b.asm.Sk).apply(null, arguments);
      }),
      Zm = (b._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 = function () {
        return (Zm = b._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 =
          b.asm.Tk).apply(null, arguments);
      }),
      $m = (b._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = function () {
        return ($m = b._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 =
          b.asm.Uk).apply(null, arguments);
      }),
      an = (b._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = function () {
        return (an = b._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 =
          b.asm.Vk).apply(null, arguments);
      }),
      bn = (b._emscripten_bind_btConvexHullShape_setLocalScaling_1 = function () {
        return (bn = b._emscripten_bind_btConvexHullShape_setLocalScaling_1 =
          b.asm.Wk).apply(null, arguments);
      }),
      cn = (b._emscripten_bind_btConvexHullShape_getLocalScaling_0 = function () {
        return (cn = b._emscripten_bind_btConvexHullShape_getLocalScaling_0 =
          b.asm.Xk).apply(null, arguments);
      }),
      dn = (b._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = function () {
        return (dn = b._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 =
          b.asm.Yk).apply(null, arguments);
      }),
      en = (b._emscripten_bind_btConvexHullShape___destroy___0 = function () {
        return (en = b._emscripten_bind_btConvexHullShape___destroy___0 =
          b.asm.Zk).apply(null, arguments);
      }),
      fn = (b._emscripten_bind_btVehicleTuning_btVehicleTuning_0 = function () {
        return (fn = b._emscripten_bind_btVehicleTuning_btVehicleTuning_0 =
          b.asm._k).apply(null, arguments);
      }),
      gn = (b._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = function () {
        return (gn = b._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 =
          b.asm.$k).apply(null, arguments);
      }),
      hn = (b._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = function () {
        return (hn = b._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 =
          b.asm.al).apply(null, arguments);
      }),
      jn = (b._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 = function () {
        return (jn = b._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 =
          b.asm.bl).apply(null, arguments);
      }),
      kn = (b._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 = function () {
        return (kn = b._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 =
          b.asm.cl).apply(null, arguments);
      }),
      ln = (b._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = function () {
        return (ln = b._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 =
          b.asm.dl).apply(null, arguments);
      }),
      mn = (b._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 = function () {
        return (mn = b._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 =
          b.asm.el).apply(null, arguments);
      }),
      nn = (b._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 = function () {
        return (nn = b._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 =
          b.asm.fl).apply(null, arguments);
      }),
      on = (b._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 = function () {
        return (on = b._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 =
          b.asm.gl).apply(null, arguments);
      }),
      pn = (b._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 = function () {
        return (pn = b._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 =
          b.asm.hl).apply(null, arguments);
      }),
      qn = (b._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = function () {
        return (qn = b._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 =
          b.asm.il).apply(null, arguments);
      }),
      rn = (b._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = function () {
        return (rn = b._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 =
          b.asm.jl).apply(null, arguments);
      }),
      sn = (b._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 = function () {
        return (sn = b._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 =
          b.asm.kl).apply(null, arguments);
      }),
      tn = (b._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 = function () {
        return (tn = b._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 =
          b.asm.ll).apply(null, arguments);
      }),
      un = (b._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 = function () {
        return (un = b._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 =
          b.asm.ml).apply(null, arguments);
      }),
      vn = (b._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 = function () {
        return (vn = b._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 =
          b.asm.nl).apply(null, arguments);
      }),
      wn = (b._emscripten_bind_btShapeHull_btShapeHull_1 = function () {
        return (wn = b._emscripten_bind_btShapeHull_btShapeHull_1 =
          b.asm.ol).apply(null, arguments);
      }),
      xn = (b._emscripten_bind_btShapeHull_buildHull_1 = function () {
        return (xn = b._emscripten_bind_btShapeHull_buildHull_1 =
          b.asm.pl).apply(null, arguments);
      }),
      yn = (b._emscripten_bind_btShapeHull_numVertices_0 = function () {
        return (yn = b._emscripten_bind_btShapeHull_numVertices_0 =
          b.asm.ql).apply(null, arguments);
      }),
      zn = (b._emscripten_bind_btShapeHull_getVertexPointer_0 = function () {
        return (zn = b._emscripten_bind_btShapeHull_getVertexPointer_0 =
          b.asm.rl).apply(null, arguments);
      }),
      An = (b._emscripten_bind_btShapeHull___destroy___0 = function () {
        return (An = b._emscripten_bind_btShapeHull___destroy___0 =
          b.asm.sl).apply(null, arguments);
      }),
      Bn = (b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = function () {
        return (Bn = b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 =
          b.asm.tl).apply(null, arguments);
      }),
      Cn = (b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = function () {
        return (Cn = b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 =
          b.asm.ul).apply(null, arguments);
      }),
      Dn = (b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = function () {
        return (Dn = b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 =
          b.asm.vl).apply(null, arguments);
      }),
      En = (b._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = function () {
        return (En = b._emscripten_bind_btDefaultMotionState_getWorldTransform_1 =
          b.asm.wl).apply(null, arguments);
      }),
      Fn = (b._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = function () {
        return (Fn = b._emscripten_bind_btDefaultMotionState_setWorldTransform_1 =
          b.asm.xl).apply(null, arguments);
      }),
      Gn = (b._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = function () {
        return (Gn = b._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 =
          b.asm.yl).apply(null, arguments);
      }),
      Hn = (b._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 = function () {
        return (Hn = b._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 =
          b.asm.zl).apply(null, arguments);
      }),
      In = (b._emscripten_bind_btDefaultMotionState___destroy___0 = function () {
        return (In = b._emscripten_bind_btDefaultMotionState___destroy___0 =
          b.asm.Al).apply(null, arguments);
      }),
      Jn = (b._emscripten_bind_btWheelInfo_btWheelInfo_1 = function () {
        return (Jn = b._emscripten_bind_btWheelInfo_btWheelInfo_1 =
          b.asm.Bl).apply(null, arguments);
      }),
      Kn = (b._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = function () {
        return (Kn = b._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 =
          b.asm.Cl).apply(null, arguments);
      }),
      Ln = (b._emscripten_bind_btWheelInfo_updateWheel_2 = function () {
        return (Ln = b._emscripten_bind_btWheelInfo_updateWheel_2 =
          b.asm.Dl).apply(null, arguments);
      }),
      Mn = (b._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 = function () {
        return (Mn = b._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 =
          b.asm.El).apply(null, arguments);
      }),
      Nn = (b._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = function () {
        return (Nn = b._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 =
          b.asm.Fl).apply(null, arguments);
      }),
      On = (b._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 = function () {
        return (On = b._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 =
          b.asm.Gl).apply(null, arguments);
      }),
      Pn = (b._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = function () {
        return (Pn = b._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 =
          b.asm.Hl).apply(null, arguments);
      }),
      Qn = (b._emscripten_bind_btWheelInfo_get_m_engineForce_0 = function () {
        return (Qn = b._emscripten_bind_btWheelInfo_get_m_engineForce_0 =
          b.asm.Il).apply(null, arguments);
      }),
      Rn = (b._emscripten_bind_btWheelInfo_set_m_engineForce_1 = function () {
        return (Rn = b._emscripten_bind_btWheelInfo_set_m_engineForce_1 =
          b.asm.Jl).apply(null, arguments);
      }),
      Sn = (b._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = function () {
        return (Sn = b._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 =
          b.asm.Kl).apply(null, arguments);
      }),
      Tn = (b._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = function () {
        return (Tn = b._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 =
          b.asm.Ll).apply(null, arguments);
      }),
      Un = (b._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = function () {
        return (Un = b._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 =
          b.asm.Ml).apply(null, arguments);
      }),
      Vn = (b._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = function () {
        return (Vn = b._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 =
          b.asm.Nl).apply(null, arguments);
      }),
      Wn = (b._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 = function () {
        return (Wn = b._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 =
          b.asm.Ol).apply(null, arguments);
      }),
      Xn = (b._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = function () {
        return (Xn = b._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 =
          b.asm.Pl).apply(null, arguments);
      }),
      Yn = (b._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 = function () {
        return (Yn = b._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 =
          b.asm.Ql).apply(null, arguments);
      }),
      Zn = (b._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 = function () {
        return (Zn = b._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 =
          b.asm.Rl).apply(null, arguments);
      }),
      $n = (b._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = function () {
        return ($n = b._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 =
          b.asm.Sl).apply(null, arguments);
      }),
      ao = (b._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = function () {
        return (ao = b._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 =
          b.asm.Tl).apply(null, arguments);
      }),
      bo = (b._emscripten_bind_btWheelInfo_get_m_steering_0 = function () {
        return (bo = b._emscripten_bind_btWheelInfo_get_m_steering_0 =
          b.asm.Ul).apply(null, arguments);
      }),
      co = (b._emscripten_bind_btWheelInfo_set_m_steering_1 = function () {
        return (co = b._emscripten_bind_btWheelInfo_set_m_steering_1 =
          b.asm.Vl).apply(null, arguments);
      }),
      eo = (b._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = function () {
        return (eo = b._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 =
          b.asm.Wl).apply(null, arguments);
      }),
      fo = (b._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 = function () {
        return (fo = b._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 =
          b.asm.Xl).apply(null, arguments);
      }),
      go = (b._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = function () {
        return (go = b._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 =
          b.asm.Yl).apply(null, arguments);
      }),
      ho = (b._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = function () {
        return (ho = b._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 =
          b.asm.Zl).apply(null, arguments);
      }),
      io = (b._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 = function () {
        return (io = b._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 =
          b.asm._l).apply(null, arguments);
      }),
      jo = (b._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 = function () {
        return (jo = b._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 =
          b.asm.$l).apply(null, arguments);
      }),
      ko = (b._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = function () {
        return (ko = b._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 =
          b.asm.am).apply(null, arguments);
      }),
      lo = (b._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 = function () {
        return (lo = b._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 =
          b.asm.bm).apply(null, arguments);
      }),
      mo = (b._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = function () {
        return (mo = b._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 =
          b.asm.cm).apply(null, arguments);
      }),
      no = (b._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = function () {
        return (no = b._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 =
          b.asm.dm).apply(null, arguments);
      }),
      oo = (b._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 = function () {
        return (oo = b._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 =
          b.asm.em).apply(null, arguments);
      }),
      po = (b._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 = function () {
        return (po = b._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 =
          b.asm.fm).apply(null, arguments);
      }),
      qo = (b._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = function () {
        return (qo = b._emscripten_bind_btWheelInfo_get_m_worldTransform_0 =
          b.asm.gm).apply(null, arguments);
      }),
      ro = (b._emscripten_bind_btWheelInfo_set_m_worldTransform_1 = function () {
        return (ro = b._emscripten_bind_btWheelInfo_set_m_worldTransform_1 =
          b.asm.hm).apply(null, arguments);
      }),
      so = (b._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = function () {
        return (so = b._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 =
          b.asm.im).apply(null, arguments);
      }),
      to = (b._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = function () {
        return (to = b._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 =
          b.asm.jm).apply(null, arguments);
      }),
      uo = (b._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = function () {
        return (uo = b._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 =
          b.asm.km).apply(null, arguments);
      }),
      vo = (b._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 = function () {
        return (vo = b._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 =
          b.asm.lm).apply(null, arguments);
      }),
      wo = (b._emscripten_bind_btWheelInfo_get_m_rotation_0 = function () {
        return (wo = b._emscripten_bind_btWheelInfo_get_m_rotation_0 =
          b.asm.mm).apply(null, arguments);
      }),
      xo = (b._emscripten_bind_btWheelInfo_set_m_rotation_1 = function () {
        return (xo = b._emscripten_bind_btWheelInfo_set_m_rotation_1 =
          b.asm.nm).apply(null, arguments);
      }),
      yo = (b._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = function () {
        return (yo = b._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 =
          b.asm.om).apply(null, arguments);
      }),
      zo = (b._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = function () {
        return (zo = b._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 =
          b.asm.pm).apply(null, arguments);
      }),
      Ao = (b._emscripten_bind_btWheelInfo_get_m_brake_0 = function () {
        return (Ao = b._emscripten_bind_btWheelInfo_get_m_brake_0 =
          b.asm.qm).apply(null, arguments);
      }),
      Bo = (b._emscripten_bind_btWheelInfo_set_m_brake_1 = function () {
        return (Bo = b._emscripten_bind_btWheelInfo_set_m_brake_1 =
          b.asm.rm).apply(null, arguments);
      }),
      Co = (b._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 = function () {
        return (Co = b._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 =
          b.asm.sm).apply(null, arguments);
      }),
      Do = (b._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 = function () {
        return (Do = b._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 =
          b.asm.tm).apply(null, arguments);
      }),
      Eo = (b._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 = function () {
        return (Eo = b._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 =
          b.asm.um).apply(null, arguments);
      }),
      Fo = (b._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 = function () {
        return (Fo = b._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 =
          b.asm.vm).apply(null, arguments);
      }),
      Go = (b._emscripten_bind_btWheelInfo_get_m_skidInfo_0 = function () {
        return (Go = b._emscripten_bind_btWheelInfo_get_m_skidInfo_0 =
          b.asm.wm).apply(null, arguments);
      }),
      Ho = (b._emscripten_bind_btWheelInfo_set_m_skidInfo_1 = function () {
        return (Ho = b._emscripten_bind_btWheelInfo_set_m_skidInfo_1 =
          b.asm.xm).apply(null, arguments);
      }),
      Io = (b._emscripten_bind_btWheelInfo___destroy___0 = function () {
        return (Io = b._emscripten_bind_btWheelInfo___destroy___0 =
          b.asm.ym).apply(null, arguments);
      }),
      Jo = (b._emscripten_bind_btVector4_btVector4_0 = function () {
        return (Jo = b._emscripten_bind_btVector4_btVector4_0 = b.asm.zm).apply(
          null,
          arguments
        );
      }),
      Ko = (b._emscripten_bind_btVector4_btVector4_4 = function () {
        return (Ko = b._emscripten_bind_btVector4_btVector4_4 = b.asm.Am).apply(
          null,
          arguments
        );
      }),
      Lo = (b._emscripten_bind_btVector4_w_0 = function () {
        return (Lo = b._emscripten_bind_btVector4_w_0 = b.asm.Bm).apply(
          null,
          arguments
        );
      }),
      Mo = (b._emscripten_bind_btVector4_setValue_4 = function () {
        return (Mo = b._emscripten_bind_btVector4_setValue_4 = b.asm.Cm).apply(
          null,
          arguments
        );
      }),
      No = (b._emscripten_bind_btVector4_length_0 = function () {
        return (No = b._emscripten_bind_btVector4_length_0 = b.asm.Dm).apply(
          null,
          arguments
        );
      }),
      Oo = (b._emscripten_bind_btVector4_x_0 = function () {
        return (Oo = b._emscripten_bind_btVector4_x_0 = b.asm.Em).apply(
          null,
          arguments
        );
      }),
      Po = (b._emscripten_bind_btVector4_y_0 = function () {
        return (Po = b._emscripten_bind_btVector4_y_0 = b.asm.Fm).apply(
          null,
          arguments
        );
      }),
      Qo = (b._emscripten_bind_btVector4_z_0 = function () {
        return (Qo = b._emscripten_bind_btVector4_z_0 = b.asm.Gm).apply(
          null,
          arguments
        );
      }),
      Ro = (b._emscripten_bind_btVector4_setX_1 = function () {
        return (Ro = b._emscripten_bind_btVector4_setX_1 = b.asm.Hm).apply(
          null,
          arguments
        );
      }),
      So = (b._emscripten_bind_btVector4_setY_1 = function () {
        return (So = b._emscripten_bind_btVector4_setY_1 = b.asm.Im).apply(
          null,
          arguments
        );
      }),
      To = (b._emscripten_bind_btVector4_setZ_1 = function () {
        return (To = b._emscripten_bind_btVector4_setZ_1 = b.asm.Jm).apply(
          null,
          arguments
        );
      }),
      Uo = (b._emscripten_bind_btVector4_normalize_0 = function () {
        return (Uo = b._emscripten_bind_btVector4_normalize_0 = b.asm.Km).apply(
          null,
          arguments
        );
      }),
      Vo = (b._emscripten_bind_btVector4_rotate_2 = function () {
        return (Vo = b._emscripten_bind_btVector4_rotate_2 = b.asm.Lm).apply(
          null,
          arguments
        );
      }),
      Wo = (b._emscripten_bind_btVector4_dot_1 = function () {
        return (Wo = b._emscripten_bind_btVector4_dot_1 = b.asm.Mm).apply(
          null,
          arguments
        );
      }),
      Xo = (b._emscripten_bind_btVector4_op_mul_1 = function () {
        return (Xo = b._emscripten_bind_btVector4_op_mul_1 = b.asm.Nm).apply(
          null,
          arguments
        );
      }),
      Yo = (b._emscripten_bind_btVector4_op_add_1 = function () {
        return (Yo = b._emscripten_bind_btVector4_op_add_1 = b.asm.Om).apply(
          null,
          arguments
        );
      }),
      Zo = (b._emscripten_bind_btVector4_op_sub_1 = function () {
        return (Zo = b._emscripten_bind_btVector4_op_sub_1 = b.asm.Pm).apply(
          null,
          arguments
        );
      }),
      $o = (b._emscripten_bind_btVector4___destroy___0 = function () {
        return ($o = b._emscripten_bind_btVector4___destroy___0 =
          b.asm.Qm).apply(null, arguments);
      }),
      ap = (b._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 = function () {
        return (ap = b._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 =
          b.asm.Rm).apply(null, arguments);
      }),
      bp = (b._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = function () {
        return (bp = b._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 =
          b.asm.Sm).apply(null, arguments);
      }),
      cp = (b._emscripten_bind_Anchor_get_m_node_0 = function () {
        return (cp = b._emscripten_bind_Anchor_get_m_node_0 = b.asm.Tm).apply(
          null,
          arguments
        );
      }),
      dp = (b._emscripten_bind_Anchor_set_m_node_1 = function () {
        return (dp = b._emscripten_bind_Anchor_set_m_node_1 = b.asm.Um).apply(
          null,
          arguments
        );
      }),
      ep = (b._emscripten_bind_Anchor_get_m_local_0 = function () {
        return (ep = b._emscripten_bind_Anchor_get_m_local_0 = b.asm.Vm).apply(
          null,
          arguments
        );
      }),
      fp = (b._emscripten_bind_Anchor_set_m_local_1 = function () {
        return (fp = b._emscripten_bind_Anchor_set_m_local_1 = b.asm.Wm).apply(
          null,
          arguments
        );
      }),
      gp = (b._emscripten_bind_Anchor_get_m_body_0 = function () {
        return (gp = b._emscripten_bind_Anchor_get_m_body_0 = b.asm.Xm).apply(
          null,
          arguments
        );
      }),
      hp = (b._emscripten_bind_Anchor_set_m_body_1 = function () {
        return (hp = b._emscripten_bind_Anchor_set_m_body_1 = b.asm.Ym).apply(
          null,
          arguments
        );
      }),
      ip = (b._emscripten_bind_Anchor_get_m_influence_0 = function () {
        return (ip = b._emscripten_bind_Anchor_get_m_influence_0 =
          b.asm.Zm).apply(null, arguments);
      }),
      jp = (b._emscripten_bind_Anchor_set_m_influence_1 = function () {
        return (jp = b._emscripten_bind_Anchor_set_m_influence_1 =
          b.asm._m).apply(null, arguments);
      }),
      kp = (b._emscripten_bind_Anchor_get_m_c0_0 = function () {
        return (kp = b._emscripten_bind_Anchor_get_m_c0_0 = b.asm.$m).apply(
          null,
          arguments
        );
      }),
      lp = (b._emscripten_bind_Anchor_set_m_c0_1 = function () {
        return (lp = b._emscripten_bind_Anchor_set_m_c0_1 = b.asm.an).apply(
          null,
          arguments
        );
      }),
      mp = (b._emscripten_bind_Anchor_get_m_c1_0 = function () {
        return (mp = b._emscripten_bind_Anchor_get_m_c1_0 = b.asm.bn).apply(
          null,
          arguments
        );
      }),
      np = (b._emscripten_bind_Anchor_set_m_c1_1 = function () {
        return (np = b._emscripten_bind_Anchor_set_m_c1_1 = b.asm.cn).apply(
          null,
          arguments
        );
      }),
      op = (b._emscripten_bind_Anchor_get_m_c2_0 = function () {
        return (op = b._emscripten_bind_Anchor_get_m_c2_0 = b.asm.dn).apply(
          null,
          arguments
        );
      }),
      pp = (b._emscripten_bind_Anchor_set_m_c2_1 = function () {
        return (pp = b._emscripten_bind_Anchor_set_m_c2_1 = b.asm.en).apply(
          null,
          arguments
        );
      }),
      qp = (b._emscripten_bind_Anchor___destroy___0 = function () {
        return (qp = b._emscripten_bind_Anchor___destroy___0 = b.asm.fn).apply(
          null,
          arguments
        );
      }),
      rp = (b._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 = function () {
        return (rp = b._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 =
          b.asm.gn).apply(null, arguments);
      }),
      sp = (b._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 = function () {
        return (sp = b._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 =
          b.asm.hn).apply(null, arguments);
      }),
      tp = (b._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 = function () {
        return (tp = b._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 =
          b.asm.jn).apply(null, arguments);
      }),
      up = (b._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 = function () {
        return (up = b._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 =
          b.asm.kn).apply(null, arguments);
      }),
      vp = (b._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 = function () {
        return (vp = b._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 =
          b.asm.ln).apply(null, arguments);
      }),
      wp = (b._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 = function () {
        return (wp = b._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 =
          b.asm.mn).apply(null, arguments);
      }),
      xp = (b._emscripten_bind_btVehicleRaycasterResult___destroy___0 = function () {
        return (xp = b._emscripten_bind_btVehicleRaycasterResult___destroy___0 =
          b.asm.nn).apply(null, arguments);
      }),
      yp = (b._emscripten_bind_btVector3Array_size_0 = function () {
        return (yp = b._emscripten_bind_btVector3Array_size_0 = b.asm.on).apply(
          null,
          arguments
        );
      }),
      zp = (b._emscripten_bind_btVector3Array_at_1 = function () {
        return (zp = b._emscripten_bind_btVector3Array_at_1 = b.asm.pn).apply(
          null,
          arguments
        );
      }),
      Ap = (b._emscripten_bind_btVector3Array___destroy___0 = function () {
        return (Ap = b._emscripten_bind_btVector3Array___destroy___0 =
          b.asm.qn).apply(null, arguments);
      }),
      Bp = (b._emscripten_bind_btConstraintSolver___destroy___0 = function () {
        return (Bp = b._emscripten_bind_btConstraintSolver___destroy___0 =
          b.asm.rn).apply(null, arguments);
      }),
      Cp = (b._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 = function () {
        return (Cp = b._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 =
          b.asm.sn).apply(null, arguments);
      }),
      Dp = (b._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = function () {
        return (Dp = b._emscripten_bind_btRaycastVehicle_applyEngineForce_2 =
          b.asm.tn).apply(null, arguments);
      }),
      Ep = (b._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = function () {
        return (Ep = b._emscripten_bind_btRaycastVehicle_setSteeringValue_2 =
          b.asm.un).apply(null, arguments);
      }),
      Fp = (b._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 = function () {
        return (Fp = b._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 =
          b.asm.vn).apply(null, arguments);
      }),
      Gp = (b._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = function () {
        return (Gp = b._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 =
          b.asm.wn).apply(null, arguments);
      }),
      Hp = (b._emscripten_bind_btRaycastVehicle_addWheel_7 = function () {
        return (Hp = b._emscripten_bind_btRaycastVehicle_addWheel_7 =
          b.asm.xn).apply(null, arguments);
      }),
      Ip = (b._emscripten_bind_btRaycastVehicle_getNumWheels_0 = function () {
        return (Ip = b._emscripten_bind_btRaycastVehicle_getNumWheels_0 =
          b.asm.yn).apply(null, arguments);
      }),
      Jp = (b._emscripten_bind_btRaycastVehicle_getRigidBody_0 = function () {
        return (Jp = b._emscripten_bind_btRaycastVehicle_getRigidBody_0 =
          b.asm.zn).apply(null, arguments);
      }),
      Kp = (b._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = function () {
        return (Kp = b._emscripten_bind_btRaycastVehicle_getWheelInfo_1 =
          b.asm.An).apply(null, arguments);
      }),
      Lp = (b._emscripten_bind_btRaycastVehicle_setBrake_2 = function () {
        return (Lp = b._emscripten_bind_btRaycastVehicle_setBrake_2 =
          b.asm.Bn).apply(null, arguments);
      }),
      Mp = (b._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = function () {
        return (Mp = b._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 =
          b.asm.Cn).apply(null, arguments);
      }),
      Np = (b._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = function () {
        return (Np = b._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 =
          b.asm.Dn).apply(null, arguments);
      }),
      Op = (b._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 = function () {
        return (Op = b._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 =
          b.asm.En).apply(null, arguments);
      }),
      Pp = (b._emscripten_bind_btRaycastVehicle_rayCast_1 = function () {
        return (Pp = b._emscripten_bind_btRaycastVehicle_rayCast_1 =
          b.asm.Fn).apply(null, arguments);
      }),
      Qp = (b._emscripten_bind_btRaycastVehicle_updateVehicle_1 = function () {
        return (Qp = b._emscripten_bind_btRaycastVehicle_updateVehicle_1 =
          b.asm.Gn).apply(null, arguments);
      }),
      Rp = (b._emscripten_bind_btRaycastVehicle_resetSuspension_0 = function () {
        return (Rp = b._emscripten_bind_btRaycastVehicle_resetSuspension_0 =
          b.asm.Hn).apply(null, arguments);
      }),
      Sp = (b._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = function () {
        return (Sp = b._emscripten_bind_btRaycastVehicle_getSteeringValue_1 =
          b.asm.In).apply(null, arguments);
      }),
      Tp = (b._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 = function () {
        return (Tp = b._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 =
          b.asm.Jn).apply(null, arguments);
      }),
      Up = (b._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = function () {
        return (Up = b._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 =
          b.asm.Kn).apply(null, arguments);
      }),
      Vp = (b._emscripten_bind_btRaycastVehicle_setPitchControl_1 = function () {
        return (Vp = b._emscripten_bind_btRaycastVehicle_setPitchControl_1 =
          b.asm.Ln).apply(null, arguments);
      }),
      Wp = (b._emscripten_bind_btRaycastVehicle_updateSuspension_1 = function () {
        return (Wp = b._emscripten_bind_btRaycastVehicle_updateSuspension_1 =
          b.asm.Mn).apply(null, arguments);
      }),
      Xp = (b._emscripten_bind_btRaycastVehicle_updateFriction_1 = function () {
        return (Xp = b._emscripten_bind_btRaycastVehicle_updateFriction_1 =
          b.asm.Nn).apply(null, arguments);
      }),
      Yp = (b._emscripten_bind_btRaycastVehicle_getRightAxis_0 = function () {
        return (Yp = b._emscripten_bind_btRaycastVehicle_getRightAxis_0 =
          b.asm.On).apply(null, arguments);
      }),
      Zp = (b._emscripten_bind_btRaycastVehicle_getUpAxis_0 = function () {
        return (Zp = b._emscripten_bind_btRaycastVehicle_getUpAxis_0 =
          b.asm.Pn).apply(null, arguments);
      }),
      $p = (b._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = function () {
        return ($p = b._emscripten_bind_btRaycastVehicle_getForwardAxis_0 =
          b.asm.Qn).apply(null, arguments);
      }),
      aq = (b._emscripten_bind_btRaycastVehicle_getForwardVector_0 = function () {
        return (aq = b._emscripten_bind_btRaycastVehicle_getForwardVector_0 =
          b.asm.Rn).apply(null, arguments);
      }),
      bq = (b._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = function () {
        return (bq = b._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 =
          b.asm.Sn).apply(null, arguments);
      }),
      cq = (b._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = function () {
        return (cq = b._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 =
          b.asm.Tn).apply(null, arguments);
      }),
      dq = (b._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 = function () {
        return (dq = b._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 =
          b.asm.Un).apply(null, arguments);
      }),
      eq = (b._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = function () {
        return (eq = b._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 =
          b.asm.Vn).apply(null, arguments);
      }),
      fq = (b._emscripten_bind_btRaycastVehicle_updateAction_2 = function () {
        return (fq = b._emscripten_bind_btRaycastVehicle_updateAction_2 =
          b.asm.Wn).apply(null, arguments);
      }),
      gq = (b._emscripten_bind_btRaycastVehicle___destroy___0 = function () {
        return (gq = b._emscripten_bind_btRaycastVehicle___destroy___0 =
          b.asm.Xn).apply(null, arguments);
      }),
      hq = (b._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = function () {
        return (hq = b._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 =
          b.asm.Yn).apply(null, arguments);
      }),
      iq = (b._emscripten_bind_btCylinderShapeX_setMargin_1 = function () {
        return (iq = b._emscripten_bind_btCylinderShapeX_setMargin_1 =
          b.asm.Zn).apply(null, arguments);
      }),
      jq = (b._emscripten_bind_btCylinderShapeX_getMargin_0 = function () {
        return (jq = b._emscripten_bind_btCylinderShapeX_getMargin_0 =
          b.asm._n).apply(null, arguments);
      }),
      kq = (b._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = function () {
        return (kq = b._emscripten_bind_btCylinderShapeX_setLocalScaling_1 =
          b.asm.$n).apply(null, arguments);
      }),
      lq = (b._emscripten_bind_btCylinderShapeX_getLocalScaling_0 = function () {
        return (lq = b._emscripten_bind_btCylinderShapeX_getLocalScaling_0 =
          b.asm.ao).apply(null, arguments);
      }),
      mq = (b._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = function () {
        return (mq = b._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 =
          b.asm.bo).apply(null, arguments);
      }),
      nq = (b._emscripten_bind_btCylinderShapeX___destroy___0 = function () {
        return (nq = b._emscripten_bind_btCylinderShapeX___destroy___0 =
          b.asm.co).apply(null, arguments);
      }),
      oq = (b._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = function () {
        return (oq = b._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 =
          b.asm.eo).apply(null, arguments);
      }),
      pq = (b._emscripten_bind_btCylinderShapeZ_setMargin_1 = function () {
        return (pq = b._emscripten_bind_btCylinderShapeZ_setMargin_1 =
          b.asm.fo).apply(null, arguments);
      }),
      qq = (b._emscripten_bind_btCylinderShapeZ_getMargin_0 = function () {
        return (qq = b._emscripten_bind_btCylinderShapeZ_getMargin_0 =
          b.asm.go).apply(null, arguments);
      }),
      rq = (b._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = function () {
        return (rq = b._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 =
          b.asm.ho).apply(null, arguments);
      }),
      sq = (b._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = function () {
        return (sq = b._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 =
          b.asm.io).apply(null, arguments);
      }),
      tq = (b._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = function () {
        return (tq = b._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 =
          b.asm.jo).apply(null, arguments);
      }),
      uq = (b._emscripten_bind_btCylinderShapeZ___destroy___0 = function () {
        return (uq = b._emscripten_bind_btCylinderShapeZ___destroy___0 =
          b.asm.ko).apply(null, arguments);
      }),
      vq = (b._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = function () {
        return (vq = b._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 =
          b.asm.lo).apply(null, arguments);
      }),
      wq = (b._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = function () {
        return (wq = b._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 =
          b.asm.mo).apply(null, arguments);
      }),
      xq = (b._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = function () {
        return (xq = b._emscripten_bind_btConvexPolyhedron_get_m_faces_0 =
          b.asm.no).apply(null, arguments);
      }),
      yq = (b._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = function () {
        return (yq = b._emscripten_bind_btConvexPolyhedron_set_m_faces_1 =
          b.asm.oo).apply(null, arguments);
      }),
      zq = (b._emscripten_bind_btConvexPolyhedron___destroy___0 = function () {
        return (zq = b._emscripten_bind_btConvexPolyhedron___destroy___0 =
          b.asm.po).apply(null, arguments);
      }),
      Aq = (b._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 = function () {
        return (Aq = b._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 =
          b.asm.qo).apply(null, arguments);
      }),
      Bq = (b._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = function () {
        return (Bq = b._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 =
          b.asm.ro).apply(null, arguments);
      }),
      Cq = (b._emscripten_bind_tAnchorArray_size_0 = function () {
        return (Cq = b._emscripten_bind_tAnchorArray_size_0 = b.asm.so).apply(
          null,
          arguments
        );
      }),
      Dq = (b._emscripten_bind_tAnchorArray_at_1 = function () {
        return (Dq = b._emscripten_bind_tAnchorArray_at_1 = b.asm.to).apply(
          null,
          arguments
        );
      }),
      Eq = (b._emscripten_bind_tAnchorArray_clear_0 = function () {
        return (Eq = b._emscripten_bind_tAnchorArray_clear_0 = b.asm.uo).apply(
          null,
          arguments
        );
      }),
      Fq = (b._emscripten_bind_tAnchorArray_push_back_1 = function () {
        return (Fq = b._emscripten_bind_tAnchorArray_push_back_1 =
          b.asm.vo).apply(null, arguments);
      }),
      Gq = (b._emscripten_bind_tAnchorArray_pop_back_0 = function () {
        return (Gq = b._emscripten_bind_tAnchorArray_pop_back_0 =
          b.asm.wo).apply(null, arguments);
      }),
      Hq = (b._emscripten_bind_tAnchorArray___destroy___0 = function () {
        return (Hq = b._emscripten_bind_tAnchorArray___destroy___0 =
          b.asm.xo).apply(null, arguments);
      }),
      Iq = (b._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 = function () {
        return (Iq = b._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 =
          b.asm.yo).apply(null, arguments);
      }),
      Jq = (b._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = function () {
        return (Jq = b._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 =
          b.asm.zo).apply(null, arguments);
      }),
      Kq = (b._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = function () {
        return (Kq = b._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 =
          b.asm.Ao).apply(null, arguments);
      }),
      Lq = (b._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = function () {
        return (Lq = b._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 =
          b.asm.Bo).apply(null, arguments);
      }),
      Mq = (b._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 = function () {
        return (Mq = b._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 =
          b.asm.Co).apply(null, arguments);
      }),
      Nq = (b._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = function () {
        return (Nq = b._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 =
          b.asm.Do).apply(null, arguments);
      }),
      Oq = (b._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = function () {
        return (Oq = b._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 =
          b.asm.Eo).apply(null, arguments);
      }),
      Pq = (b._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = function () {
        return (Pq = b._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 =
          b.asm.Fo).apply(null, arguments);
      }),
      Qq = (b._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = function () {
        return (Qq = b._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 =
          b.asm.Go).apply(null, arguments);
      }),
      Rq = (b._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 = function () {
        return (Rq = b._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 =
          b.asm.Ho).apply(null, arguments);
      }),
      Sq = (b._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 = function () {
        return (Sq = b._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 =
          b.asm.Io).apply(null, arguments);
      }),
      Tq = (b._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = function () {
        return (Tq = b._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 =
          b.asm.Jo).apply(null, arguments);
      }),
      Uq = (b._emscripten_bind_RaycastInfo_get_m_isInContact_0 = function () {
        return (Uq = b._emscripten_bind_RaycastInfo_get_m_isInContact_0 =
          b.asm.Ko).apply(null, arguments);
      }),
      Vq = (b._emscripten_bind_RaycastInfo_set_m_isInContact_1 = function () {
        return (Vq = b._emscripten_bind_RaycastInfo_set_m_isInContact_1 =
          b.asm.Lo).apply(null, arguments);
      }),
      Wq = (b._emscripten_bind_RaycastInfo_get_m_groundObject_0 = function () {
        return (Wq = b._emscripten_bind_RaycastInfo_get_m_groundObject_0 =
          b.asm.Mo).apply(null, arguments);
      }),
      Xq = (b._emscripten_bind_RaycastInfo_set_m_groundObject_1 = function () {
        return (Xq = b._emscripten_bind_RaycastInfo_set_m_groundObject_1 =
          b.asm.No).apply(null, arguments);
      }),
      Yq = (b._emscripten_bind_RaycastInfo___destroy___0 = function () {
        return (Yq = b._emscripten_bind_RaycastInfo___destroy___0 =
          b.asm.Oo).apply(null, arguments);
      }),
      Zq = (b._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 = function () {
        return (Zq = b._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 =
          b.asm.Po).apply(null, arguments);
      }),
      $q = (b._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = function () {
        return ($q = b._emscripten_bind_btMultiSphereShape_setLocalScaling_1 =
          b.asm.Qo).apply(null, arguments);
      }),
      ar = (b._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = function () {
        return (ar = b._emscripten_bind_btMultiSphereShape_getLocalScaling_0 =
          b.asm.Ro).apply(null, arguments);
      }),
      br = (b._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = function () {
        return (br = b._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 =
          b.asm.So).apply(null, arguments);
      }),
      cr = (b._emscripten_bind_btMultiSphereShape___destroy___0 = function () {
        return (cr = b._emscripten_bind_btMultiSphereShape___destroy___0 =
          b.asm.To).apply(null, arguments);
      }),
      dr = (b._emscripten_bind_btSoftBody_btSoftBody_4 = function () {
        return (dr = b._emscripten_bind_btSoftBody_btSoftBody_4 =
          b.asm.Uo).apply(null, arguments);
      }),
      er = (b._emscripten_bind_btSoftBody_checkLink_2 = function () {
        return (er = b._emscripten_bind_btSoftBody_checkLink_2 =
          b.asm.Vo).apply(null, arguments);
      }),
      fr = (b._emscripten_bind_btSoftBody_checkFace_3 = function () {
        return (fr = b._emscripten_bind_btSoftBody_checkFace_3 =
          b.asm.Wo).apply(null, arguments);
      }),
      gr = (b._emscripten_bind_btSoftBody_appendMaterial_0 = function () {
        return (gr = b._emscripten_bind_btSoftBody_appendMaterial_0 =
          b.asm.Xo).apply(null, arguments);
      }),
      hr = (b._emscripten_bind_btSoftBody_appendNode_2 = function () {
        return (hr = b._emscripten_bind_btSoftBody_appendNode_2 =
          b.asm.Yo).apply(null, arguments);
      }),
      ir = (b._emscripten_bind_btSoftBody_appendLink_4 = function () {
        return (ir = b._emscripten_bind_btSoftBody_appendLink_4 =
          b.asm.Zo).apply(null, arguments);
      }),
      jr = (b._emscripten_bind_btSoftBody_appendFace_4 = function () {
        return (jr = b._emscripten_bind_btSoftBody_appendFace_4 =
          b.asm._o).apply(null, arguments);
      }),
      kr = (b._emscripten_bind_btSoftBody_appendTetra_5 = function () {
        return (kr = b._emscripten_bind_btSoftBody_appendTetra_5 =
          b.asm.$o).apply(null, arguments);
      }),
      lr = (b._emscripten_bind_btSoftBody_appendAnchor_4 = function () {
        return (lr = b._emscripten_bind_btSoftBody_appendAnchor_4 =
          b.asm.ap).apply(null, arguments);
      }),
      mr = (b._emscripten_bind_btSoftBody_addForce_1 = function () {
        return (mr = b._emscripten_bind_btSoftBody_addForce_1 = b.asm.bp).apply(
          null,
          arguments
        );
      }),
      nr = (b._emscripten_bind_btSoftBody_addForce_2 = function () {
        return (nr = b._emscripten_bind_btSoftBody_addForce_2 = b.asm.cp).apply(
          null,
          arguments
        );
      }),
      or = (b._emscripten_bind_btSoftBody_addAeroForceToNode_2 = function () {
        return (or = b._emscripten_bind_btSoftBody_addAeroForceToNode_2 =
          b.asm.dp).apply(null, arguments);
      }),
      pr = (b._emscripten_bind_btSoftBody_getTotalMass_0 = function () {
        return (pr = b._emscripten_bind_btSoftBody_getTotalMass_0 =
          b.asm.ep).apply(null, arguments);
      }),
      qr = (b._emscripten_bind_btSoftBody_setTotalMass_2 = function () {
        return (qr = b._emscripten_bind_btSoftBody_setTotalMass_2 =
          b.asm.fp).apply(null, arguments);
      }),
      rr = (b._emscripten_bind_btSoftBody_setMass_2 = function () {
        return (rr = b._emscripten_bind_btSoftBody_setMass_2 = b.asm.gp).apply(
          null,
          arguments
        );
      }),
      sr = (b._emscripten_bind_btSoftBody_transform_1 = function () {
        return (sr = b._emscripten_bind_btSoftBody_transform_1 =
          b.asm.hp).apply(null, arguments);
      }),
      tr = (b._emscripten_bind_btSoftBody_translate_1 = function () {
        return (tr = b._emscripten_bind_btSoftBody_translate_1 =
          b.asm.ip).apply(null, arguments);
      }),
      ur = (b._emscripten_bind_btSoftBody_rotate_1 = function () {
        return (ur = b._emscripten_bind_btSoftBody_rotate_1 = b.asm.jp).apply(
          null,
          arguments
        );
      }),
      vr = (b._emscripten_bind_btSoftBody_scale_1 = function () {
        return (vr = b._emscripten_bind_btSoftBody_scale_1 = b.asm.kp).apply(
          null,
          arguments
        );
      }),
      wr = (b._emscripten_bind_btSoftBody_generateClusters_1 = function () {
        return (wr = b._emscripten_bind_btSoftBody_generateClusters_1 =
          b.asm.lp).apply(null, arguments);
      }),
      xr = (b._emscripten_bind_btSoftBody_generateClusters_2 = function () {
        return (xr = b._emscripten_bind_btSoftBody_generateClusters_2 =
          b.asm.mp).apply(null, arguments);
      }),
      yr = (b._emscripten_bind_btSoftBody_generateBendingConstraints_2 = function () {
        return (yr = b._emscripten_bind_btSoftBody_generateBendingConstraints_2 =
          b.asm.np).apply(null, arguments);
      }),
      zr = (b._emscripten_bind_btSoftBody_upcast_1 = function () {
        return (zr = b._emscripten_bind_btSoftBody_upcast_1 = b.asm.op).apply(
          null,
          arguments
        );
      }),
      Ar = (b._emscripten_bind_btSoftBody_setAnisotropicFriction_2 = function () {
        return (Ar = b._emscripten_bind_btSoftBody_setAnisotropicFriction_2 =
          b.asm.pp).apply(null, arguments);
      }),
      Br = (b._emscripten_bind_btSoftBody_getCollisionShape_0 = function () {
        return (Br = b._emscripten_bind_btSoftBody_getCollisionShape_0 =
          b.asm.qp).apply(null, arguments);
      }),
      Cr = (b._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 = function () {
        return (Cr = b._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 =
          b.asm.rp).apply(null, arguments);
      }),
      Dr = (b._emscripten_bind_btSoftBody_setActivationState_1 = function () {
        return (Dr = b._emscripten_bind_btSoftBody_setActivationState_1 =
          b.asm.sp).apply(null, arguments);
      }),
      Er = (b._emscripten_bind_btSoftBody_forceActivationState_1 = function () {
        return (Er = b._emscripten_bind_btSoftBody_forceActivationState_1 =
          b.asm.tp).apply(null, arguments);
      }),
      Fr = (b._emscripten_bind_btSoftBody_activate_0 = function () {
        return (Fr = b._emscripten_bind_btSoftBody_activate_0 = b.asm.up).apply(
          null,
          arguments
        );
      }),
      Gr = (b._emscripten_bind_btSoftBody_activate_1 = function () {
        return (Gr = b._emscripten_bind_btSoftBody_activate_1 = b.asm.vp).apply(
          null,
          arguments
        );
      }),
      Hr = (b._emscripten_bind_btSoftBody_isActive_0 = function () {
        return (Hr = b._emscripten_bind_btSoftBody_isActive_0 = b.asm.wp).apply(
          null,
          arguments
        );
      }),
      Ir = (b._emscripten_bind_btSoftBody_isKinematicObject_0 = function () {
        return (Ir = b._emscripten_bind_btSoftBody_isKinematicObject_0 =
          b.asm.xp).apply(null, arguments);
      }),
      Jr = (b._emscripten_bind_btSoftBody_isStaticObject_0 = function () {
        return (Jr = b._emscripten_bind_btSoftBody_isStaticObject_0 =
          b.asm.yp).apply(null, arguments);
      }),
      Kr = (b._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = function () {
        return (Kr = b._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 =
          b.asm.zp).apply(null, arguments);
      }),
      Lr = (b._emscripten_bind_btSoftBody_getRestitution_0 = function () {
        return (Lr = b._emscripten_bind_btSoftBody_getRestitution_0 =
          b.asm.Ap).apply(null, arguments);
      }),
      Mr = (b._emscripten_bind_btSoftBody_getFriction_0 = function () {
        return (Mr = b._emscripten_bind_btSoftBody_getFriction_0 =
          b.asm.Bp).apply(null, arguments);
      }),
      Nr = (b._emscripten_bind_btSoftBody_getRollingFriction_0 = function () {
        return (Nr = b._emscripten_bind_btSoftBody_getRollingFriction_0 =
          b.asm.Cp).apply(null, arguments);
      }),
      Or = (b._emscripten_bind_btSoftBody_setRestitution_1 = function () {
        return (Or = b._emscripten_bind_btSoftBody_setRestitution_1 =
          b.asm.Dp).apply(null, arguments);
      }),
      Pr = (b._emscripten_bind_btSoftBody_setFriction_1 = function () {
        return (Pr = b._emscripten_bind_btSoftBody_setFriction_1 =
          b.asm.Ep).apply(null, arguments);
      }),
      Qr = (b._emscripten_bind_btSoftBody_setRollingFriction_1 = function () {
        return (Qr = b._emscripten_bind_btSoftBody_setRollingFriction_1 =
          b.asm.Fp).apply(null, arguments);
      }),
      Rr = (b._emscripten_bind_btSoftBody_getWorldTransform_0 = function () {
        return (Rr = b._emscripten_bind_btSoftBody_getWorldTransform_0 =
          b.asm.Gp).apply(null, arguments);
      }),
      Sr = (b._emscripten_bind_btSoftBody_getCollisionFlags_0 = function () {
        return (Sr = b._emscripten_bind_btSoftBody_getCollisionFlags_0 =
          b.asm.Hp).apply(null, arguments);
      }),
      Tr = (b._emscripten_bind_btSoftBody_setCollisionFlags_1 = function () {
        return (Tr = b._emscripten_bind_btSoftBody_setCollisionFlags_1 =
          b.asm.Ip).apply(null, arguments);
      }),
      Ur = (b._emscripten_bind_btSoftBody_setWorldTransform_1 = function () {
        return (Ur = b._emscripten_bind_btSoftBody_setWorldTransform_1 =
          b.asm.Jp).apply(null, arguments);
      }),
      Vr = (b._emscripten_bind_btSoftBody_setCollisionShape_1 = function () {
        return (Vr = b._emscripten_bind_btSoftBody_setCollisionShape_1 =
          b.asm.Kp).apply(null, arguments);
      }),
      Wr = (b._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = function () {
        return (Wr = b._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 =
          b.asm.Lp).apply(null, arguments);
      }),
      Xr = (b._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = function () {
        return (Xr = b._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 =
          b.asm.Mp).apply(null, arguments);
      }),
      Yr = (b._emscripten_bind_btSoftBody_getUserIndex_0 = function () {
        return (Yr = b._emscripten_bind_btSoftBody_getUserIndex_0 =
          b.asm.Np).apply(null, arguments);
      }),
      Zr = (b._emscripten_bind_btSoftBody_setUserIndex_1 = function () {
        return (Zr = b._emscripten_bind_btSoftBody_setUserIndex_1 =
          b.asm.Op).apply(null, arguments);
      }),
      $r = (b._emscripten_bind_btSoftBody_getUserPointer_0 = function () {
        return ($r = b._emscripten_bind_btSoftBody_getUserPointer_0 =
          b.asm.Pp).apply(null, arguments);
      }),
      as = (b._emscripten_bind_btSoftBody_setUserPointer_1 = function () {
        return (as = b._emscripten_bind_btSoftBody_setUserPointer_1 =
          b.asm.Qp).apply(null, arguments);
      }),
      bs = (b._emscripten_bind_btSoftBody_getBroadphaseHandle_0 = function () {
        return (bs = b._emscripten_bind_btSoftBody_getBroadphaseHandle_0 =
          b.asm.Rp).apply(null, arguments);
      }),
      cs = (b._emscripten_bind_btSoftBody_get_m_cfg_0 = function () {
        return (cs = b._emscripten_bind_btSoftBody_get_m_cfg_0 =
          b.asm.Sp).apply(null, arguments);
      }),
      ds = (b._emscripten_bind_btSoftBody_set_m_cfg_1 = function () {
        return (ds = b._emscripten_bind_btSoftBody_set_m_cfg_1 =
          b.asm.Tp).apply(null, arguments);
      }),
      es = (b._emscripten_bind_btSoftBody_get_m_nodes_0 = function () {
        return (es = b._emscripten_bind_btSoftBody_get_m_nodes_0 =
          b.asm.Up).apply(null, arguments);
      }),
      gs = (b._emscripten_bind_btSoftBody_set_m_nodes_1 = function () {
        return (gs = b._emscripten_bind_btSoftBody_set_m_nodes_1 =
          b.asm.Vp).apply(null, arguments);
      }),
      hs = (b._emscripten_bind_btSoftBody_get_m_faces_0 = function () {
        return (hs = b._emscripten_bind_btSoftBody_get_m_faces_0 =
          b.asm.Wp).apply(null, arguments);
      }),
      is = (b._emscripten_bind_btSoftBody_set_m_faces_1 = function () {
        return (is = b._emscripten_bind_btSoftBody_set_m_faces_1 =
          b.asm.Xp).apply(null, arguments);
      }),
      js = (b._emscripten_bind_btSoftBody_get_m_materials_0 = function () {
        return (js = b._emscripten_bind_btSoftBody_get_m_materials_0 =
          b.asm.Yp).apply(null, arguments);
      }),
      ks = (b._emscripten_bind_btSoftBody_set_m_materials_1 = function () {
        return (ks = b._emscripten_bind_btSoftBody_set_m_materials_1 =
          b.asm.Zp).apply(null, arguments);
      }),
      ls = (b._emscripten_bind_btSoftBody_get_m_anchors_0 = function () {
        return (ls = b._emscripten_bind_btSoftBody_get_m_anchors_0 =
          b.asm._p).apply(null, arguments);
      }),
      ms = (b._emscripten_bind_btSoftBody_set_m_anchors_1 = function () {
        return (ms = b._emscripten_bind_btSoftBody_set_m_anchors_1 =
          b.asm.$p).apply(null, arguments);
      }),
      ns = (b._emscripten_bind_btSoftBody___destroy___0 = function () {
        return (ns = b._emscripten_bind_btSoftBody___destroy___0 =
          b.asm.aq).apply(null, arguments);
      }),
      ps = (b._emscripten_bind_btIntArray_size_0 = function () {
        return (ps = b._emscripten_bind_btIntArray_size_0 = b.asm.bq).apply(
          null,
          arguments
        );
      }),
      qs = (b._emscripten_bind_btIntArray_at_1 = function () {
        return (qs = b._emscripten_bind_btIntArray_at_1 = b.asm.cq).apply(
          null,
          arguments
        );
      }),
      rs = (b._emscripten_bind_btIntArray___destroy___0 = function () {
        return (rs = b._emscripten_bind_btIntArray___destroy___0 =
          b.asm.dq).apply(null, arguments);
      }),
      ss = (b._emscripten_bind_Config_get_kVCF_0 = function () {
        return (ss = b._emscripten_bind_Config_get_kVCF_0 = b.asm.eq).apply(
          null,
          arguments
        );
      }),
      ts = (b._emscripten_bind_Config_set_kVCF_1 = function () {
        return (ts = b._emscripten_bind_Config_set_kVCF_1 = b.asm.fq).apply(
          null,
          arguments
        );
      }),
      us = (b._emscripten_bind_Config_get_kDP_0 = function () {
        return (us = b._emscripten_bind_Config_get_kDP_0 = b.asm.gq).apply(
          null,
          arguments
        );
      }),
      vs = (b._emscripten_bind_Config_set_kDP_1 = function () {
        return (vs = b._emscripten_bind_Config_set_kDP_1 = b.asm.hq).apply(
          null,
          arguments
        );
      }),
      xs = (b._emscripten_bind_Config_get_kDG_0 = function () {
        return (xs = b._emscripten_bind_Config_get_kDG_0 = b.asm.iq).apply(
          null,
          arguments
        );
      }),
      ys = (b._emscripten_bind_Config_set_kDG_1 = function () {
        return (ys = b._emscripten_bind_Config_set_kDG_1 = b.asm.jq).apply(
          null,
          arguments
        );
      }),
      zs = (b._emscripten_bind_Config_get_kLF_0 = function () {
        return (zs = b._emscripten_bind_Config_get_kLF_0 = b.asm.kq).apply(
          null,
          arguments
        );
      }),
      As = (b._emscripten_bind_Config_set_kLF_1 = function () {
        return (As = b._emscripten_bind_Config_set_kLF_1 = b.asm.lq).apply(
          null,
          arguments
        );
      }),
      Bs = (b._emscripten_bind_Config_get_kPR_0 = function () {
        return (Bs = b._emscripten_bind_Config_get_kPR_0 = b.asm.mq).apply(
          null,
          arguments
        );
      }),
      Cs = (b._emscripten_bind_Config_set_kPR_1 = function () {
        return (Cs = b._emscripten_bind_Config_set_kPR_1 = b.asm.nq).apply(
          null,
          arguments
        );
      }),
      Ds = (b._emscripten_bind_Config_get_kVC_0 = function () {
        return (Ds = b._emscripten_bind_Config_get_kVC_0 = b.asm.oq).apply(
          null,
          arguments
        );
      }),
      Es = (b._emscripten_bind_Config_set_kVC_1 = function () {
        return (Es = b._emscripten_bind_Config_set_kVC_1 = b.asm.pq).apply(
          null,
          arguments
        );
      }),
      Fs = (b._emscripten_bind_Config_get_kDF_0 = function () {
        return (Fs = b._emscripten_bind_Config_get_kDF_0 = b.asm.qq).apply(
          null,
          arguments
        );
      }),
      Gs = (b._emscripten_bind_Config_set_kDF_1 = function () {
        return (Gs = b._emscripten_bind_Config_set_kDF_1 = b.asm.rq).apply(
          null,
          arguments
        );
      }),
      Hs = (b._emscripten_bind_Config_get_kMT_0 = function () {
        return (Hs = b._emscripten_bind_Config_get_kMT_0 = b.asm.sq).apply(
          null,
          arguments
        );
      }),
      Is = (b._emscripten_bind_Config_set_kMT_1 = function () {
        return (Is = b._emscripten_bind_Config_set_kMT_1 = b.asm.tq).apply(
          null,
          arguments
        );
      }),
      Js = (b._emscripten_bind_Config_get_kCHR_0 = function () {
        return (Js = b._emscripten_bind_Config_get_kCHR_0 = b.asm.uq).apply(
          null,
          arguments
        );
      }),
      Ks = (b._emscripten_bind_Config_set_kCHR_1 = function () {
        return (Ks = b._emscripten_bind_Config_set_kCHR_1 = b.asm.vq).apply(
          null,
          arguments
        );
      }),
      Ls = (b._emscripten_bind_Config_get_kKHR_0 = function () {
        return (Ls = b._emscripten_bind_Config_get_kKHR_0 = b.asm.wq).apply(
          null,
          arguments
        );
      }),
      Ms = (b._emscripten_bind_Config_set_kKHR_1 = function () {
        return (Ms = b._emscripten_bind_Config_set_kKHR_1 = b.asm.xq).apply(
          null,
          arguments
        );
      }),
      Ns = (b._emscripten_bind_Config_get_kSHR_0 = function () {
        return (Ns = b._emscripten_bind_Config_get_kSHR_0 = b.asm.yq).apply(
          null,
          arguments
        );
      }),
      Os = (b._emscripten_bind_Config_set_kSHR_1 = function () {
        return (Os = b._emscripten_bind_Config_set_kSHR_1 = b.asm.zq).apply(
          null,
          arguments
        );
      }),
      Ps = (b._emscripten_bind_Config_get_kAHR_0 = function () {
        return (Ps = b._emscripten_bind_Config_get_kAHR_0 = b.asm.Aq).apply(
          null,
          arguments
        );
      }),
      Qs = (b._emscripten_bind_Config_set_kAHR_1 = function () {
        return (Qs = b._emscripten_bind_Config_set_kAHR_1 = b.asm.Bq).apply(
          null,
          arguments
        );
      }),
      Rs = (b._emscripten_bind_Config_get_kSRHR_CL_0 = function () {
        return (Rs = b._emscripten_bind_Config_get_kSRHR_CL_0 = b.asm.Cq).apply(
          null,
          arguments
        );
      }),
      Ss = (b._emscripten_bind_Config_set_kSRHR_CL_1 = function () {
        return (Ss = b._emscripten_bind_Config_set_kSRHR_CL_1 = b.asm.Dq).apply(
          null,
          arguments
        );
      }),
      Ts = (b._emscripten_bind_Config_get_kSKHR_CL_0 = function () {
        return (Ts = b._emscripten_bind_Config_get_kSKHR_CL_0 = b.asm.Eq).apply(
          null,
          arguments
        );
      }),
      Us = (b._emscripten_bind_Config_set_kSKHR_CL_1 = function () {
        return (Us = b._emscripten_bind_Config_set_kSKHR_CL_1 = b.asm.Fq).apply(
          null,
          arguments
        );
      }),
      Vs = (b._emscripten_bind_Config_get_kSSHR_CL_0 = function () {
        return (Vs = b._emscripten_bind_Config_get_kSSHR_CL_0 = b.asm.Gq).apply(
          null,
          arguments
        );
      }),
      Ws = (b._emscripten_bind_Config_set_kSSHR_CL_1 = function () {
        return (Ws = b._emscripten_bind_Config_set_kSSHR_CL_1 = b.asm.Hq).apply(
          null,
          arguments
        );
      }),
      Xs = (b._emscripten_bind_Config_get_kSR_SPLT_CL_0 = function () {
        return (Xs = b._emscripten_bind_Config_get_kSR_SPLT_CL_0 =
          b.asm.Iq).apply(null, arguments);
      }),
      Ys = (b._emscripten_bind_Config_set_kSR_SPLT_CL_1 = function () {
        return (Ys = b._emscripten_bind_Config_set_kSR_SPLT_CL_1 =
          b.asm.Jq).apply(null, arguments);
      }),
      Zs = (b._emscripten_bind_Config_get_kSK_SPLT_CL_0 = function () {
        return (Zs = b._emscripten_bind_Config_get_kSK_SPLT_CL_0 =
          b.asm.Kq).apply(null, arguments);
      }),
      $s = (b._emscripten_bind_Config_set_kSK_SPLT_CL_1 = function () {
        return ($s = b._emscripten_bind_Config_set_kSK_SPLT_CL_1 =
          b.asm.Lq).apply(null, arguments);
      }),
      at = (b._emscripten_bind_Config_get_kSS_SPLT_CL_0 = function () {
        return (at = b._emscripten_bind_Config_get_kSS_SPLT_CL_0 =
          b.asm.Mq).apply(null, arguments);
      }),
      bt = (b._emscripten_bind_Config_set_kSS_SPLT_CL_1 = function () {
        return (bt = b._emscripten_bind_Config_set_kSS_SPLT_CL_1 =
          b.asm.Nq).apply(null, arguments);
      }),
      ct = (b._emscripten_bind_Config_get_maxvolume_0 = function () {
        return (ct = b._emscripten_bind_Config_get_maxvolume_0 =
          b.asm.Oq).apply(null, arguments);
      }),
      dt = (b._emscripten_bind_Config_set_maxvolume_1 = function () {
        return (dt = b._emscripten_bind_Config_set_maxvolume_1 =
          b.asm.Pq).apply(null, arguments);
      }),
      et = (b._emscripten_bind_Config_get_timescale_0 = function () {
        return (et = b._emscripten_bind_Config_get_timescale_0 =
          b.asm.Qq).apply(null, arguments);
      }),
      ft = (b._emscripten_bind_Config_set_timescale_1 = function () {
        return (ft = b._emscripten_bind_Config_set_timescale_1 =
          b.asm.Rq).apply(null, arguments);
      }),
      gt = (b._emscripten_bind_Config_get_viterations_0 = function () {
        return (gt = b._emscripten_bind_Config_get_viterations_0 =
          b.asm.Sq).apply(null, arguments);
      }),
      ht = (b._emscripten_bind_Config_set_viterations_1 = function () {
        return (ht = b._emscripten_bind_Config_set_viterations_1 =
          b.asm.Tq).apply(null, arguments);
      }),
      it = (b._emscripten_bind_Config_get_piterations_0 = function () {
        return (it = b._emscripten_bind_Config_get_piterations_0 =
          b.asm.Uq).apply(null, arguments);
      }),
      jt = (b._emscripten_bind_Config_set_piterations_1 = function () {
        return (jt = b._emscripten_bind_Config_set_piterations_1 =
          b.asm.Vq).apply(null, arguments);
      }),
      kt = (b._emscripten_bind_Config_get_diterations_0 = function () {
        return (kt = b._emscripten_bind_Config_get_diterations_0 =
          b.asm.Wq).apply(null, arguments);
      }),
      lt = (b._emscripten_bind_Config_set_diterations_1 = function () {
        return (lt = b._emscripten_bind_Config_set_diterations_1 =
          b.asm.Xq).apply(null, arguments);
      }),
      mt = (b._emscripten_bind_Config_get_citerations_0 = function () {
        return (mt = b._emscripten_bind_Config_get_citerations_0 =
          b.asm.Yq).apply(null, arguments);
      }),
      nt = (b._emscripten_bind_Config_set_citerations_1 = function () {
        return (nt = b._emscripten_bind_Config_set_citerations_1 =
          b.asm.Zq).apply(null, arguments);
      }),
      ot = (b._emscripten_bind_Config_get_collisions_0 = function () {
        return (ot = b._emscripten_bind_Config_get_collisions_0 =
          b.asm._q).apply(null, arguments);
      }),
      pt = (b._emscripten_bind_Config_set_collisions_1 = function () {
        return (pt = b._emscripten_bind_Config_set_collisions_1 =
          b.asm.$q).apply(null, arguments);
      }),
      qt = (b._emscripten_bind_Config___destroy___0 = function () {
        return (qt = b._emscripten_bind_Config___destroy___0 = b.asm.ar).apply(
          null,
          arguments
        );
      }),
      rt = (b._emscripten_bind_Node_get_m_x_0 = function () {
        return (rt = b._emscripten_bind_Node_get_m_x_0 = b.asm.br).apply(
          null,
          arguments
        );
      }),
      st = (b._emscripten_bind_Node_set_m_x_1 = function () {
        return (st = b._emscripten_bind_Node_set_m_x_1 = b.asm.cr).apply(
          null,
          arguments
        );
      }),
      tt = (b._emscripten_bind_Node_get_m_q_0 = function () {
        return (tt = b._emscripten_bind_Node_get_m_q_0 = b.asm.dr).apply(
          null,
          arguments
        );
      }),
      ut = (b._emscripten_bind_Node_set_m_q_1 = function () {
        return (ut = b._emscripten_bind_Node_set_m_q_1 = b.asm.er).apply(
          null,
          arguments
        );
      }),
      vt = (b._emscripten_bind_Node_get_m_v_0 = function () {
        return (vt = b._emscripten_bind_Node_get_m_v_0 = b.asm.fr).apply(
          null,
          arguments
        );
      }),
      wt = (b._emscripten_bind_Node_set_m_v_1 = function () {
        return (wt = b._emscripten_bind_Node_set_m_v_1 = b.asm.gr).apply(
          null,
          arguments
        );
      }),
      xt = (b._emscripten_bind_Node_get_m_f_0 = function () {
        return (xt = b._emscripten_bind_Node_get_m_f_0 = b.asm.hr).apply(
          null,
          arguments
        );
      }),
      yt = (b._emscripten_bind_Node_set_m_f_1 = function () {
        return (yt = b._emscripten_bind_Node_set_m_f_1 = b.asm.ir).apply(
          null,
          arguments
        );
      }),
      zt = (b._emscripten_bind_Node_get_m_n_0 = function () {
        return (zt = b._emscripten_bind_Node_get_m_n_0 = b.asm.jr).apply(
          null,
          arguments
        );
      }),
      At = (b._emscripten_bind_Node_set_m_n_1 = function () {
        return (At = b._emscripten_bind_Node_set_m_n_1 = b.asm.kr).apply(
          null,
          arguments
        );
      }),
      Bt = (b._emscripten_bind_Node_get_m_im_0 = function () {
        return (Bt = b._emscripten_bind_Node_get_m_im_0 = b.asm.lr).apply(
          null,
          arguments
        );
      }),
      Ct = (b._emscripten_bind_Node_set_m_im_1 = function () {
        return (Ct = b._emscripten_bind_Node_set_m_im_1 = b.asm.mr).apply(
          null,
          arguments
        );
      }),
      Dt = (b._emscripten_bind_Node_get_m_area_0 = function () {
        return (Dt = b._emscripten_bind_Node_get_m_area_0 = b.asm.nr).apply(
          null,
          arguments
        );
      }),
      Et = (b._emscripten_bind_Node_set_m_area_1 = function () {
        return (Et = b._emscripten_bind_Node_set_m_area_1 = b.asm.or).apply(
          null,
          arguments
        );
      }),
      Ft = (b._emscripten_bind_Node___destroy___0 = function () {
        return (Ft = b._emscripten_bind_Node___destroy___0 = b.asm.pr).apply(
          null,
          arguments
        );
      }),
      Gt = (b._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 = function () {
        return (Gt = b._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 =
          b.asm.qr).apply(null, arguments);
      }),
      Ht = (b._emscripten_bind_btGhostPairCallback___destroy___0 = function () {
        return (Ht = b._emscripten_bind_btGhostPairCallback___destroy___0 =
          b.asm.rr).apply(null, arguments);
      }),
      It = (b._emscripten_bind_btOverlappingPairCallback___destroy___0 = function () {
        return (It = b._emscripten_bind_btOverlappingPairCallback___destroy___0 =
          b.asm.sr).apply(null, arguments);
      }),
      Jt = (b._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 = function () {
        return (Jt = b._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 =
          b.asm.tr).apply(null, arguments);
      }),
      Kt = (b._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 = function () {
        return (Kt = b._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 =
          b.asm.ur).apply(null, arguments);
      }),
      Lt = (b._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = function () {
        return (Lt = b._emscripten_bind_btKinematicCharacterController_setUpAxis_1 =
          b.asm.vr).apply(null, arguments);
      }),
      Mt = (b._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 = function () {
        return (Mt = b._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 =
          b.asm.wr).apply(null, arguments);
      }),
      Nt = (b._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 = function () {
        return (Nt = b._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 =
          b.asm.xr).apply(null, arguments);
      }),
      Ot = (b._emscripten_bind_btKinematicCharacterController_warp_1 = function () {
        return (Ot = b._emscripten_bind_btKinematicCharacterController_warp_1 =
          b.asm.yr).apply(null, arguments);
      }),
      Pt = (b._emscripten_bind_btKinematicCharacterController_preStep_1 = function () {
        return (Pt = b._emscripten_bind_btKinematicCharacterController_preStep_1 =
          b.asm.zr).apply(null, arguments);
      }),
      Qt = (b._emscripten_bind_btKinematicCharacterController_playerStep_2 = function () {
        return (Qt = b._emscripten_bind_btKinematicCharacterController_playerStep_2 =
          b.asm.Ar).apply(null, arguments);
      }),
      Rt = (b._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 = function () {
        return (Rt = b._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 =
          b.asm.Br).apply(null, arguments);
      }),
      St = (b._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = function () {
        return (St = b._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 =
          b.asm.Cr).apply(null, arguments);
      }),
      Tt = (b._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = function () {
        return (Tt = b._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 =
          b.asm.Dr).apply(null, arguments);
      }),
      Ut = (b._emscripten_bind_btKinematicCharacterController_canJump_0 = function () {
        return (Ut = b._emscripten_bind_btKinematicCharacterController_canJump_0 =
          b.asm.Er).apply(null, arguments);
      }),
      Vt = (b._emscripten_bind_btKinematicCharacterController_jump_0 = function () {
        return (Vt = b._emscripten_bind_btKinematicCharacterController_jump_0 =
          b.asm.Fr).apply(null, arguments);
      }),
      Wt = (b._emscripten_bind_btKinematicCharacterController_setGravity_1 = function () {
        return (Wt = b._emscripten_bind_btKinematicCharacterController_setGravity_1 =
          b.asm.Gr).apply(null, arguments);
      }),
      Xt = (b._emscripten_bind_btKinematicCharacterController_getGravity_0 = function () {
        return (Xt = b._emscripten_bind_btKinematicCharacterController_getGravity_0 =
          b.asm.Hr).apply(null, arguments);
      }),
      Yt = (b._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = function () {
        return (Yt = b._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 =
          b.asm.Ir).apply(null, arguments);
      }),
      Zt = (b._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = function () {
        return (Zt = b._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 =
          b.asm.Jr).apply(null, arguments);
      }),
      $t = (b._emscripten_bind_btKinematicCharacterController_getGhostObject_0 = function () {
        return ($t = b._emscripten_bind_btKinematicCharacterController_getGhostObject_0 =
          b.asm.Kr).apply(null, arguments);
      }),
      au = (b._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = function () {
        return (au = b._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 =
          b.asm.Lr).apply(null, arguments);
      }),
      bu = (b._emscripten_bind_btKinematicCharacterController_onGround_0 = function () {
        return (bu = b._emscripten_bind_btKinematicCharacterController_onGround_0 =
          b.asm.Mr).apply(null, arguments);
      }),
      cu = (b._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = function () {
        return (cu = b._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 =
          b.asm.Nr).apply(null, arguments);
      }),
      du = (b._emscripten_bind_btKinematicCharacterController_updateAction_2 = function () {
        return (du = b._emscripten_bind_btKinematicCharacterController_updateAction_2 =
          b.asm.Or).apply(null, arguments);
      }),
      eu = (b._emscripten_bind_btKinematicCharacterController___destroy___0 = function () {
        return (eu = b._emscripten_bind_btKinematicCharacterController___destroy___0 =
          b.asm.Pr).apply(null, arguments);
      }),
      fu = (b._emscripten_bind_btSoftBodyArray_size_0 = function () {
        return (fu = b._emscripten_bind_btSoftBodyArray_size_0 =
          b.asm.Qr).apply(null, arguments);
      }),
      gu = (b._emscripten_bind_btSoftBodyArray_at_1 = function () {
        return (gu = b._emscripten_bind_btSoftBodyArray_at_1 = b.asm.Rr).apply(
          null,
          arguments
        );
      }),
      hu = (b._emscripten_bind_btSoftBodyArray___destroy___0 = function () {
        return (hu = b._emscripten_bind_btSoftBodyArray___destroy___0 =
          b.asm.Sr).apply(null, arguments);
      }),
      iu = (b._emscripten_bind_btFaceArray_size_0 = function () {
        return (iu = b._emscripten_bind_btFaceArray_size_0 = b.asm.Tr).apply(
          null,
          arguments
        );
      }),
      ju = (b._emscripten_bind_btFaceArray_at_1 = function () {
        return (ju = b._emscripten_bind_btFaceArray_at_1 = b.asm.Ur).apply(
          null,
          arguments
        );
      }),
      ku = (b._emscripten_bind_btFaceArray___destroy___0 = function () {
        return (ku = b._emscripten_bind_btFaceArray___destroy___0 =
          b.asm.Vr).apply(null, arguments);
      }),
      lu = (b._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = function () {
        return (lu = b._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 =
          b.asm.Wr).apply(null, arguments);
      }),
      mu = (b._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = function () {
        return (mu = b._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 =
          b.asm.Xr).apply(null, arguments);
      }),
      nu = (b._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = function () {
        return (nu = b._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 =
          b.asm.Yr).apply(null, arguments);
      }),
      ou = (b._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = function () {
        return (ou = b._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 =
          b.asm.Zr).apply(null, arguments);
      }),
      pu = (b._emscripten_bind_btStaticPlaneShape___destroy___0 = function () {
        return (pu = b._emscripten_bind_btStaticPlaneShape___destroy___0 =
          b.asm._r).apply(null, arguments);
      }),
      qu = (b._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 = function () {
        return (qu = b._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 =
          b.asm.$r).apply(null, arguments);
      }),
      ru = (b._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 = function () {
        return (ru = b._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 =
          b.asm.as).apply(null, arguments);
      }),
      su = (b._emscripten_bind_btOverlappingPairCache___destroy___0 = function () {
        return (su = b._emscripten_bind_btOverlappingPairCache___destroy___0 =
          b.asm.bs).apply(null, arguments);
      }),
      tu = (b._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = function () {
        return (tu = b._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 =
          b.asm.cs).apply(null, arguments);
      }),
      uu = (b._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = function () {
        return (uu = b._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 =
          b.asm.ds).apply(null, arguments);
      }),
      vu = (b._emscripten_bind_btIndexedMesh___destroy___0 = function () {
        return (vu = b._emscripten_bind_btIndexedMesh___destroy___0 =
          b.asm.es).apply(null, arguments);
      }),
      wu = (b._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 = function () {
        return (wu = b._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 =
          b.asm.fs).apply(null, arguments);
      }),
      xu = (b._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 = function () {
        return (xu = b._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 =
          b.asm.gs).apply(null, arguments);
      }),
      yu = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 = function () {
        return (yu = b._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 =
          b.asm.hs).apply(null, arguments);
      }),
      zu = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 = function () {
        return (zu = b._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 =
          b.asm.is).apply(null, arguments);
      }),
      Au = (b._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = function () {
        return (Au = b._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 =
          b.asm.js).apply(null, arguments);
      }),
      Bu = (b._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 = function () {
        return (Bu = b._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 =
          b.asm.ks).apply(null, arguments);
      }),
      Cu = (b._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = function () {
        return (Cu = b._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 =
          b.asm.ls).apply(null, arguments);
      }),
      Du = (b._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = function () {
        return (Du = b._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 =
          b.asm.ms).apply(null, arguments);
      }),
      Eu = (b._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 = function () {
        return (Eu = b._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 =
          b.asm.ns).apply(null, arguments);
      }),
      Fu = (b._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 = function () {
        return (Fu = b._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 =
          b.asm.os).apply(null, arguments);
      }),
      Gu = (b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 = function () {
        return (Gu = b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 =
          b.asm.ps).apply(null, arguments);
      }),
      Hu = (b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 = function () {
        return (Hu = b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 =
          b.asm.qs).apply(null, arguments);
      }),
      Iu = (b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 = function () {
        return (Iu = b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 =
          b.asm.rs).apply(null, arguments);
      }),
      Ju = (b._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = function () {
        return (Ju = b._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 =
          b.asm.ss).apply(null, arguments);
      }),
      Ku = (b._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 = function () {
        return (Ku = b._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 =
          b.asm.ts).apply(null, arguments);
      }),
      Lu = (b._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = function () {
        return (Lu = b._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 =
          b.asm.us).apply(null, arguments);
      }),
      Mu = (b._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = function () {
        return (Mu = b._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 =
          b.asm.vs).apply(null, arguments);
      }),
      Nu = (b._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 = function () {
        return (Nu = b._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 =
          b.asm.ws).apply(null, arguments);
      }),
      Ou = (b._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = function () {
        return (Ou = b._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 =
          b.asm.xs).apply(null, arguments);
      }),
      Pu = (b._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = function () {
        return (Pu = b._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 =
          b.asm.ys).apply(null, arguments);
      }),
      Qu = (b._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 = function () {
        return (Qu = b._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 =
          b.asm.zs).apply(null, arguments);
      }),
      Ru = (b._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = function () {
        return (Ru = b._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 =
          b.asm.As).apply(null, arguments);
      }),
      Su = (b._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = function () {
        return (Su = b._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 =
          b.asm.Bs).apply(null, arguments);
      }),
      Tu = (b._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 = function () {
        return (Tu = b._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 =
          b.asm.Cs).apply(null, arguments);
      }),
      Uu = (b._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = function () {
        return (Uu = b._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 =
          b.asm.Ds).apply(null, arguments);
      }),
      Vu = (b._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = function () {
        return (Vu = b._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 =
          b.asm.Es).apply(null, arguments);
      }),
      Wu = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 = function () {
        return (Wu = b._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 =
          b.asm.Fs).apply(null, arguments);
      }),
      Xu = (b._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = function () {
        return (Xu = b._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 =
          b.asm.Gs).apply(null, arguments);
      }),
      Yu = (b._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = function () {
        return (Yu = b._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 =
          b.asm.Hs).apply(null, arguments);
      }),
      Zu = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 = function () {
        return (Zu = b._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 =
          b.asm.Is).apply(null, arguments);
      }),
      $u = (b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 = function () {
        return ($u = b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 =
          b.asm.Js).apply(null, arguments);
      }),
      av = (b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = function () {
        return (av = b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 =
          b.asm.Ks).apply(null, arguments);
      }),
      bv = (b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 = function () {
        return (bv = b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 =
          b.asm.Ls).apply(null, arguments);
      }),
      cv = (b._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 = function () {
        return (cv = b._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 =
          b.asm.Ms).apply(null, arguments);
      }),
      dv = (b._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 = function () {
        return (dv = b._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 =
          b.asm.Ns).apply(null, arguments);
      }),
      ev = (b._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 = function () {
        return (ev = b._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 =
          b.asm.Os).apply(null, arguments);
      }),
      fv = (b._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = function () {
        return (fv = b._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 =
          b.asm.Ps).apply(null, arguments);
      }),
      gv = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 = function () {
        return (gv = b._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 =
          b.asm.Qs).apply(null, arguments);
      }),
      hv = (b._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = function () {
        return (hv = b._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 =
          b.asm.Rs).apply(null, arguments);
      }),
      iv = (b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 = function () {
        return (iv = b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 =
          b.asm.Ss).apply(null, arguments);
      }),
      jv = (b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 = function () {
        return (jv = b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 =
          b.asm.Ts).apply(null, arguments);
      }),
      kv = (b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 = function () {
        return (kv = b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 =
          b.asm.Us).apply(null, arguments);
      }),
      lv = (b._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 = function () {
        return (lv = b._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 =
          b.asm.Vs).apply(null, arguments);
      }),
      mv = (b._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = function () {
        return (mv = b._emscripten_bind_btFixedConstraint_btFixedConstraint_4 =
          b.asm.Ws).apply(null, arguments);
      }),
      nv = (b._emscripten_bind_btFixedConstraint_enableFeedback_1 = function () {
        return (nv = b._emscripten_bind_btFixedConstraint_enableFeedback_1 =
          b.asm.Xs).apply(null, arguments);
      }),
      ov = (b._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = function () {
        return (ov = b._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 =
          b.asm.Ys).apply(null, arguments);
      }),
      pv = (b._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 = function () {
        return (pv = b._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 =
          b.asm.Zs).apply(null, arguments);
      }),
      qv = (b._emscripten_bind_btFixedConstraint_getParam_2 = function () {
        return (qv = b._emscripten_bind_btFixedConstraint_getParam_2 =
          b.asm._s).apply(null, arguments);
      }),
      rv = (b._emscripten_bind_btFixedConstraint_setParam_3 = function () {
        return (rv = b._emscripten_bind_btFixedConstraint_setParam_3 =
          b.asm.$s).apply(null, arguments);
      }),
      sv = (b._emscripten_bind_btFixedConstraint___destroy___0 = function () {
        return (sv = b._emscripten_bind_btFixedConstraint___destroy___0 =
          b.asm.at).apply(null, arguments);
      }),
      tv = (b._emscripten_bind_btTransform_btTransform_0 = function () {
        return (tv = b._emscripten_bind_btTransform_btTransform_0 =
          b.asm.bt).apply(null, arguments);
      }),
      uv = (b._emscripten_bind_btTransform_btTransform_2 = function () {
        return (uv = b._emscripten_bind_btTransform_btTransform_2 =
          b.asm.ct).apply(null, arguments);
      }),
      vv = (b._emscripten_bind_btTransform_setIdentity_0 = function () {
        return (vv = b._emscripten_bind_btTransform_setIdentity_0 =
          b.asm.dt).apply(null, arguments);
      }),
      wv = (b._emscripten_bind_btTransform_setOrigin_1 = function () {
        return (wv = b._emscripten_bind_btTransform_setOrigin_1 =
          b.asm.et).apply(null, arguments);
      }),
      xv = (b._emscripten_bind_btTransform_setRotation_1 = function () {
        return (xv = b._emscripten_bind_btTransform_setRotation_1 =
          b.asm.ft).apply(null, arguments);
      }),
      yv = (b._emscripten_bind_btTransform_getOrigin_0 = function () {
        return (yv = b._emscripten_bind_btTransform_getOrigin_0 =
          b.asm.gt).apply(null, arguments);
      }),
      zv = (b._emscripten_bind_btTransform_getRotation_0 = function () {
        return (zv = b._emscripten_bind_btTransform_getRotation_0 =
          b.asm.ht).apply(null, arguments);
      }),
      Av = (b._emscripten_bind_btTransform_getBasis_0 = function () {
        return (Av = b._emscripten_bind_btTransform_getBasis_0 =
          b.asm.it).apply(null, arguments);
      }),
      Bv = (b._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = function () {
        return (Bv = b._emscripten_bind_btTransform_setFromOpenGLMatrix_1 =
          b.asm.jt).apply(null, arguments);
      }),
      Cv = (b._emscripten_bind_btTransform_inverse_0 = function () {
        return (Cv = b._emscripten_bind_btTransform_inverse_0 = b.asm.kt).apply(
          null,
          arguments
        );
      }),
      Dv = (b._emscripten_bind_btTransform_op_mul_1 = function () {
        return (Dv = b._emscripten_bind_btTransform_op_mul_1 = b.asm.lt).apply(
          null,
          arguments
        );
      }),
      Ev = (b._emscripten_bind_btTransform___destroy___0 = function () {
        return (Ev = b._emscripten_bind_btTransform___destroy___0 =
          b.asm.mt).apply(null, arguments);
      }),
      Fv = (b._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = function () {
        return (Fv = b._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 =
          b.asm.nt).apply(null, arguments);
      }),
      Gv = (b._emscripten_bind_ClosestRayResultCallback_hasHit_0 = function () {
        return (Gv = b._emscripten_bind_ClosestRayResultCallback_hasHit_0 =
          b.asm.ot).apply(null, arguments);
      }),
      Hv = (b._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = function () {
        return (Hv = b._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 =
          b.asm.pt).apply(null, arguments);
      }),
      Iv = (b._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = function () {
        return (Iv = b._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 =
          b.asm.qt).apply(null, arguments);
      }),
      Jv = (b._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 = function () {
        return (Jv = b._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 =
          b.asm.rt).apply(null, arguments);
      }),
      Kv = (b._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = function () {
        return (Kv = b._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 =
          b.asm.st).apply(null, arguments);
      }),
      Lv = (b._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = function () {
        return (Lv = b._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 =
          b.asm.tt).apply(null, arguments);
      }),
      Mv = (b._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 = function () {
        return (Mv = b._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 =
          b.asm.ut).apply(null, arguments);
      }),
      Nv = (b._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = function () {
        return (Nv = b._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 =
          b.asm.vt).apply(null, arguments);
      }),
      Ov = (b._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = function () {
        return (Ov = b._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 =
          b.asm.wt).apply(null, arguments);
      }),
      Pv = (b._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 = function () {
        return (Pv = b._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 =
          b.asm.xt).apply(null, arguments);
      }),
      Qv = (b._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 = function () {
        return (Qv = b._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 =
          b.asm.yt).apply(null, arguments);
      }),
      Rv = (b._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = function () {
        return (Rv = b._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 =
          b.asm.zt).apply(null, arguments);
      }),
      Sv = (b._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = function () {
        return (Sv = b._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 =
          b.asm.At).apply(null, arguments);
      }),
      Tv = (b._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = function () {
        return (Tv = b._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 =
          b.asm.Bt).apply(null, arguments);
      }),
      Uv = (b._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 = function () {
        return (Uv = b._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 =
          b.asm.Ct).apply(null, arguments);
      }),
      Vv = (b._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = function () {
        return (Vv = b._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 =
          b.asm.Dt).apply(null, arguments);
      }),
      Wv = (b._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = function () {
        return (Wv = b._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 =
          b.asm.Et).apply(null, arguments);
      }),
      Xv = (b._emscripten_bind_ClosestRayResultCallback___destroy___0 = function () {
        return (Xv = b._emscripten_bind_ClosestRayResultCallback___destroy___0 =
          b.asm.Ft).apply(null, arguments);
      }),
      Yv = (b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 = function () {
        return (Yv = b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 =
          b.asm.Gt).apply(null, arguments);
      }),
      Zv = (b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 = function () {
        return (Zv = b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 =
          b.asm.Ht).apply(null, arguments);
      }),
      $v = (b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 = function () {
        return ($v = b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 =
          b.asm.It).apply(null, arguments);
      }),
      aw = (b._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 = function () {
        return (aw = b._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 =
          b.asm.Jt).apply(null, arguments);
      }),
      bw = (b._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 = function () {
        return (bw = b._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 =
          b.asm.Kt).apply(null, arguments);
      }),
      cw = (b._emscripten_bind_ConcreteContactResultCallback___destroy___0 = function () {
        return (cw = b._emscripten_bind_ConcreteContactResultCallback___destroy___0 =
          b.asm.Lt).apply(null, arguments);
      }),
      dw = (b._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = function () {
        return (dw = b._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 =
          b.asm.Mt).apply(null, arguments);
      }),
      ew = (b._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = function () {
        return (ew = b._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 =
          b.asm.Nt).apply(null, arguments);
      }),
      fw = (b._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = function () {
        return (fw = b._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 =
          b.asm.Ot).apply(null, arguments);
      }),
      gw = (b._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = function () {
        return (gw = b._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 =
          b.asm.Pt).apply(null, arguments);
      }),
      hw = (b._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 = function () {
        return (hw = b._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 =
          b.asm.Qt).apply(null, arguments);
      }),
      iw = (b._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = function () {
        return (iw = b._emscripten_bind_btBvhTriangleMeshShape___destroy___0 =
          b.asm.Rt).apply(null, arguments);
      }),
      jw = (b._emscripten_bind_btConstCollisionObjectArray_size_0 = function () {
        return (jw = b._emscripten_bind_btConstCollisionObjectArray_size_0 =
          b.asm.St).apply(null, arguments);
      }),
      kw = (b._emscripten_bind_btConstCollisionObjectArray_at_1 = function () {
        return (kw = b._emscripten_bind_btConstCollisionObjectArray_at_1 =
          b.asm.Tt).apply(null, arguments);
      }),
      lw = (b._emscripten_bind_btConstCollisionObjectArray___destroy___0 = function () {
        return (lw = b._emscripten_bind_btConstCollisionObjectArray___destroy___0 =
          b.asm.Ut).apply(null, arguments);
      }),
      mw = (b._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = function () {
        return (mw = b._emscripten_bind_btSliderConstraint_btSliderConstraint_3 =
          b.asm.Vt).apply(null, arguments);
      }),
      nw = (b._emscripten_bind_btSliderConstraint_btSliderConstraint_5 = function () {
        return (nw = b._emscripten_bind_btSliderConstraint_btSliderConstraint_5 =
          b.asm.Wt).apply(null, arguments);
      }),
      ow = (b._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = function () {
        return (ow = b._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 =
          b.asm.Xt).apply(null, arguments);
      }),
      pw = (b._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = function () {
        return (pw = b._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 =
          b.asm.Yt).apply(null, arguments);
      }),
      qw = (b._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = function () {
        return (qw = b._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 =
          b.asm.Zt).apply(null, arguments);
      }),
      rw = (b._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = function () {
        return (rw = b._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 =
          b.asm._t).apply(null, arguments);
      }),
      sw = (b._emscripten_bind_btSliderConstraint_enableFeedback_1 = function () {
        return (sw = b._emscripten_bind_btSliderConstraint_enableFeedback_1 =
          b.asm.$t).apply(null, arguments);
      }),
      tw = (b._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = function () {
        return (tw = b._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 =
          b.asm.au).apply(null, arguments);
      }),
      uw = (b._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 = function () {
        return (uw = b._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 =
          b.asm.bu).apply(null, arguments);
      }),
      vw = (b._emscripten_bind_btSliderConstraint_getParam_2 = function () {
        return (vw = b._emscripten_bind_btSliderConstraint_getParam_2 =
          b.asm.cu).apply(null, arguments);
      }),
      ww = (b._emscripten_bind_btSliderConstraint_setParam_3 = function () {
        return (ww = b._emscripten_bind_btSliderConstraint_setParam_3 =
          b.asm.du).apply(null, arguments);
      }),
      xw = (b._emscripten_bind_btSliderConstraint___destroy___0 = function () {
        return (xw = b._emscripten_bind_btSliderConstraint___destroy___0 =
          b.asm.eu).apply(null, arguments);
      }),
      yw = (b._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 = function () {
        return (yw = b._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 =
          b.asm.fu).apply(null, arguments);
      }),
      zw = (b._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = function () {
        return (zw = b._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 =
          b.asm.gu).apply(null, arguments);
      }),
      Aw = (b._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 = function () {
        return (Aw = b._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 =
          b.asm.hu).apply(null, arguments);
      }),
      Bw = (b._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 = function () {
        return (Bw = b._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 =
          b.asm.iu).apply(null, arguments);
      }),
      Cw = (b._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = function () {
        return (Cw = b._emscripten_bind_btPairCachingGhostObject_setActivationState_1 =
          b.asm.ju).apply(null, arguments);
      }),
      Dw = (b._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = function () {
        return (Dw = b._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 =
          b.asm.ku).apply(null, arguments);
      }),
      Ew = (b._emscripten_bind_btPairCachingGhostObject_activate_0 = function () {
        return (Ew = b._emscripten_bind_btPairCachingGhostObject_activate_0 =
          b.asm.lu).apply(null, arguments);
      }),
      Fw = (b._emscripten_bind_btPairCachingGhostObject_activate_1 = function () {
        return (Fw = b._emscripten_bind_btPairCachingGhostObject_activate_1 =
          b.asm.mu).apply(null, arguments);
      }),
      Gw = (b._emscripten_bind_btPairCachingGhostObject_isActive_0 = function () {
        return (Gw = b._emscripten_bind_btPairCachingGhostObject_isActive_0 =
          b.asm.nu).apply(null, arguments);
      }),
      Hw = (b._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = function () {
        return (Hw = b._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 =
          b.asm.ou).apply(null, arguments);
      }),
      Iw = (b._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = function () {
        return (Iw = b._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 =
          b.asm.pu).apply(null, arguments);
      }),
      Jw = (b._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = function () {
        return (Jw = b._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 =
          b.asm.qu).apply(null, arguments);
      }),
      Kw = (b._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = function () {
        return (Kw = b._emscripten_bind_btPairCachingGhostObject_getRestitution_0 =
          b.asm.ru).apply(null, arguments);
      }),
      Lw = (b._emscripten_bind_btPairCachingGhostObject_getFriction_0 = function () {
        return (Lw = b._emscripten_bind_btPairCachingGhostObject_getFriction_0 =
          b.asm.su).apply(null, arguments);
      }),
      Mw = (b._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 = function () {
        return (Mw = b._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 =
          b.asm.tu).apply(null, arguments);
      }),
      Nw = (b._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = function () {
        return (Nw = b._emscripten_bind_btPairCachingGhostObject_setRestitution_1 =
          b.asm.uu).apply(null, arguments);
      }),
      Ow = (b._emscripten_bind_btPairCachingGhostObject_setFriction_1 = function () {
        return (Ow = b._emscripten_bind_btPairCachingGhostObject_setFriction_1 =
          b.asm.vu).apply(null, arguments);
      }),
      Pw = (b._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = function () {
        return (Pw = b._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 =
          b.asm.wu).apply(null, arguments);
      }),
      Qw = (b._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = function () {
        return (Qw = b._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 =
          b.asm.xu).apply(null, arguments);
      }),
      Rw = (b._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 = function () {
        return (Rw = b._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 =
          b.asm.yu).apply(null, arguments);
      }),
      Sw = (b._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = function () {
        return (Sw = b._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 =
          b.asm.zu).apply(null, arguments);
      }),
      Tw = (b._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 = function () {
        return (Tw = b._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 =
          b.asm.Au).apply(null, arguments);
      }),
      Uw = (b._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 = function () {
        return (Uw = b._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 =
          b.asm.Bu).apply(null, arguments);
      }),
      Vw = (b._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = function () {
        return (Vw = b._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 =
          b.asm.Cu).apply(null, arguments);
      }),
      Ww = (b._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 = function () {
        return (Ww = b._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 =
          b.asm.Du).apply(null, arguments);
      }),
      Xw = (b._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = function () {
        return (Xw = b._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 =
          b.asm.Eu).apply(null, arguments);
      }),
      Yw = (b._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = function () {
        return (Yw = b._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 =
          b.asm.Fu).apply(null, arguments);
      }),
      Zw = (b._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = function () {
        return (Zw = b._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 =
          b.asm.Gu).apply(null, arguments);
      }),
      $w = (b._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = function () {
        return ($w = b._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 =
          b.asm.Hu).apply(null, arguments);
      }),
      ax = (b._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 = function () {
        return (ax = b._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 =
          b.asm.Iu).apply(null, arguments);
      }),
      bx = (b._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = function () {
        return (bx = b._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 =
          b.asm.Ju).apply(null, arguments);
      }),
      cx = (b._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = function () {
        return (cx = b._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 =
          b.asm.Ku).apply(null, arguments);
      }),
      dx = (b._emscripten_bind_btPairCachingGhostObject___destroy___0 = function () {
        return (dx = b._emscripten_bind_btPairCachingGhostObject___destroy___0 =
          b.asm.Lu).apply(null, arguments);
      }),
      ex = (b._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = function () {
        return (ex = b._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 =
          b.asm.Mu).apply(null, arguments);
      }),
      fx = (b._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = function () {
        return (fx = b._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 =
          b.asm.Nu).apply(null, arguments);
      }),
      gx = (b._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 = function () {
        return (gx = b._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 =
          b.asm.Ou).apply(null, arguments);
      }),
      hx = (b._emscripten_bind_btManifoldPoint_getDistance_0 = function () {
        return (hx = b._emscripten_bind_btManifoldPoint_getDistance_0 =
          b.asm.Pu).apply(null, arguments);
      }),
      ix = (b._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = function () {
        return (ix = b._emscripten_bind_btManifoldPoint_get_m_localPointA_0 =
          b.asm.Qu).apply(null, arguments);
      }),
      jx = (b._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = function () {
        return (jx = b._emscripten_bind_btManifoldPoint_set_m_localPointA_1 =
          b.asm.Ru).apply(null, arguments);
      }),
      kx = (b._emscripten_bind_btManifoldPoint_get_m_localPointB_0 = function () {
        return (kx = b._emscripten_bind_btManifoldPoint_get_m_localPointB_0 =
          b.asm.Su).apply(null, arguments);
      }),
      lx = (b._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = function () {
        return (lx = b._emscripten_bind_btManifoldPoint_set_m_localPointB_1 =
          b.asm.Tu).apply(null, arguments);
      }),
      mx = (b._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = function () {
        return (mx = b._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 =
          b.asm.Uu).apply(null, arguments);
      }),
      nx = (b._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 = function () {
        return (nx = b._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 =
          b.asm.Vu).apply(null, arguments);
      }),
      ox = (b._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = function () {
        return (ox = b._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 =
          b.asm.Wu).apply(null, arguments);
      }),
      px = (b._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = function () {
        return (px = b._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 =
          b.asm.Xu).apply(null, arguments);
      }),
      qx = (b._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = function () {
        return (qx = b._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 =
          b.asm.Yu).apply(null, arguments);
      }),
      rx = (b._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = function () {
        return (rx = b._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 =
          b.asm.Zu).apply(null, arguments);
      }),
      sx = (b._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = function () {
        return (sx = b._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 =
          b.asm._u).apply(null, arguments);
      }),
      tx = (b._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = function () {
        return (tx = b._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 =
          b.asm.$u).apply(null, arguments);
      }),
      ux = (b._emscripten_bind_btManifoldPoint___destroy___0 = function () {
        return (ux = b._emscripten_bind_btManifoldPoint___destroy___0 =
          b.asm.av).apply(null, arguments);
      }),
      vx = (b._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = function () {
        return (vx = b._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 =
          b.asm.bv).apply(null, arguments);
      }),
      wx = (b._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = function () {
        return (wx = b._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 =
          b.asm.cv).apply(null, arguments);
      }),
      xx = (b._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = function () {
        return (xx = b._emscripten_bind_btPoint2PointConstraint_setPivotA_1 =
          b.asm.dv).apply(null, arguments);
      }),
      yx = (b._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = function () {
        return (yx = b._emscripten_bind_btPoint2PointConstraint_setPivotB_1 =
          b.asm.ev).apply(null, arguments);
      }),
      zx = (b._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = function () {
        return (zx = b._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 =
          b.asm.fv).apply(null, arguments);
      }),
      Ax = (b._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 = function () {
        return (Ax = b._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 =
          b.asm.gv).apply(null, arguments);
      }),
      Bx = (b._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = function () {
        return (Bx = b._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 =
          b.asm.hv).apply(null, arguments);
      }),
      Cx = (b._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = function () {
        return (Cx = b._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 =
          b.asm.iv).apply(null, arguments);
      }),
      Dx = (b._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 = function () {
        return (Dx = b._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 =
          b.asm.jv).apply(null, arguments);
      }),
      Ex = (b._emscripten_bind_btPoint2PointConstraint_getParam_2 = function () {
        return (Ex = b._emscripten_bind_btPoint2PointConstraint_getParam_2 =
          b.asm.kv).apply(null, arguments);
      }),
      Fx = (b._emscripten_bind_btPoint2PointConstraint_setParam_3 = function () {
        return (Fx = b._emscripten_bind_btPoint2PointConstraint_setParam_3 =
          b.asm.lv).apply(null, arguments);
      }),
      Gx = (b._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = function () {
        return (Gx = b._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 =
          b.asm.mv).apply(null, arguments);
      }),
      Hx = (b._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = function () {
        return (Hx = b._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 =
          b.asm.nv).apply(null, arguments);
      }),
      Ix = (b._emscripten_bind_btPoint2PointConstraint___destroy___0 = function () {
        return (Ix = b._emscripten_bind_btPoint2PointConstraint___destroy___0 =
          b.asm.ov).apply(null, arguments);
      }),
      Jx = (b._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 = function () {
        return (Jx = b._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 =
          b.asm.pv).apply(null, arguments);
      }),
      Kx = (b._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = function () {
        return (Kx = b._emscripten_bind_btSoftBodyHelpers_CreateRope_5 =
          b.asm.qv).apply(null, arguments);
      }),
      Lx = (b._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = function () {
        return (Lx = b._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 =
          b.asm.rv).apply(null, arguments);
      }),
      Mx = (b._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = function () {
        return (Mx = b._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 =
          b.asm.sv).apply(null, arguments);
      }),
      Nx = (b._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = function () {
        return (Nx = b._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 =
          b.asm.tv).apply(null, arguments);
      }),
      Ox = (b._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = function () {
        return (Ox = b._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 =
          b.asm.uv).apply(null, arguments);
      }),
      Px = (b._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = function () {
        return (Px = b._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 =
          b.asm.vv).apply(null, arguments);
      }),
      Qx = (b._emscripten_bind_btSoftBodyHelpers___destroy___0 = function () {
        return (Qx = b._emscripten_bind_btSoftBodyHelpers___destroy___0 =
          b.asm.wv).apply(null, arguments);
      }),
      Rx = (b._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = function () {
        return (Rx = b._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 =
          b.asm.xv).apply(null, arguments);
      }),
      Sx = (b._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 = function () {
        return (Sx = b._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 =
          b.asm.yv).apply(null, arguments);
      }),
      Tx = (b._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = function () {
        return (Tx = b._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 =
          b.asm.zv).apply(null, arguments);
      }),
      Ux = (b._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = function () {
        return (Ux = b._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 =
          b.asm.Av).apply(null, arguments);
      }),
      Vx = (b._emscripten_bind_btBroadphaseProxy___destroy___0 = function () {
        return (Vx = b._emscripten_bind_btBroadphaseProxy___destroy___0 =
          b.asm.Bv).apply(null, arguments);
      }),
      Wx = (b._emscripten_bind_tNodeArray_size_0 = function () {
        return (Wx = b._emscripten_bind_tNodeArray_size_0 = b.asm.Cv).apply(
          null,
          arguments
        );
      }),
      Xx = (b._emscripten_bind_tNodeArray_at_1 = function () {
        return (Xx = b._emscripten_bind_tNodeArray_at_1 = b.asm.Dv).apply(
          null,
          arguments
        );
      }),
      Yx = (b._emscripten_bind_tNodeArray___destroy___0 = function () {
        return (Yx = b._emscripten_bind_tNodeArray___destroy___0 =
          b.asm.Ev).apply(null, arguments);
      }),
      Zx = (b._emscripten_bind_btBoxShape_btBoxShape_1 = function () {
        return (Zx = b._emscripten_bind_btBoxShape_btBoxShape_1 =
          b.asm.Fv).apply(null, arguments);
      }),
      $x = (b._emscripten_bind_btBoxShape_setMargin_1 = function () {
        return ($x = b._emscripten_bind_btBoxShape_setMargin_1 =
          b.asm.Gv).apply(null, arguments);
      }),
      ay = (b._emscripten_bind_btBoxShape_getMargin_0 = function () {
        return (ay = b._emscripten_bind_btBoxShape_getMargin_0 =
          b.asm.Hv).apply(null, arguments);
      }),
      by = (b._emscripten_bind_btBoxShape_setLocalScaling_1 = function () {
        return (by = b._emscripten_bind_btBoxShape_setLocalScaling_1 =
          b.asm.Iv).apply(null, arguments);
      }),
      cy = (b._emscripten_bind_btBoxShape_getLocalScaling_0 = function () {
        return (cy = b._emscripten_bind_btBoxShape_getLocalScaling_0 =
          b.asm.Jv).apply(null, arguments);
      }),
      dy = (b._emscripten_bind_btBoxShape_calculateLocalInertia_2 = function () {
        return (dy = b._emscripten_bind_btBoxShape_calculateLocalInertia_2 =
          b.asm.Kv).apply(null, arguments);
      }),
      ey = (b._emscripten_bind_btBoxShape___destroy___0 = function () {
        return (ey = b._emscripten_bind_btBoxShape___destroy___0 =
          b.asm.Lv).apply(null, arguments);
      }),
      fy = (b._emscripten_bind_btFace_get_m_indices_0 = function () {
        return (fy = b._emscripten_bind_btFace_get_m_indices_0 =
          b.asm.Mv).apply(null, arguments);
      }),
      gy = (b._emscripten_bind_btFace_set_m_indices_1 = function () {
        return (gy = b._emscripten_bind_btFace_set_m_indices_1 =
          b.asm.Nv).apply(null, arguments);
      }),
      hy = (b._emscripten_bind_btFace_get_m_plane_1 = function () {
        return (hy = b._emscripten_bind_btFace_get_m_plane_1 = b.asm.Ov).apply(
          null,
          arguments
        );
      }),
      iy = (b._emscripten_bind_btFace_set_m_plane_2 = function () {
        return (iy = b._emscripten_bind_btFace_set_m_plane_2 = b.asm.Pv).apply(
          null,
          arguments
        );
      }),
      jy = (b._emscripten_bind_btFace___destroy___0 = function () {
        return (jy = b._emscripten_bind_btFace___destroy___0 = b.asm.Qv).apply(
          null,
          arguments
        );
      }),
      ky = (b._emscripten_bind_DebugDrawer_DebugDrawer_0 = function () {
        return (ky = b._emscripten_bind_DebugDrawer_DebugDrawer_0 =
          b.asm.Rv).apply(null, arguments);
      }),
      ly = (b._emscripten_bind_DebugDrawer_drawLine_3 = function () {
        return (ly = b._emscripten_bind_DebugDrawer_drawLine_3 =
          b.asm.Sv).apply(null, arguments);
      }),
      my = (b._emscripten_bind_DebugDrawer_drawContactPoint_5 = function () {
        return (my = b._emscripten_bind_DebugDrawer_drawContactPoint_5 =
          b.asm.Tv).apply(null, arguments);
      }),
      ny = (b._emscripten_bind_DebugDrawer_reportErrorWarning_1 = function () {
        return (ny = b._emscripten_bind_DebugDrawer_reportErrorWarning_1 =
          b.asm.Uv).apply(null, arguments);
      }),
      oy = (b._emscripten_bind_DebugDrawer_draw3dText_2 = function () {
        return (oy = b._emscripten_bind_DebugDrawer_draw3dText_2 =
          b.asm.Vv).apply(null, arguments);
      }),
      py = (b._emscripten_bind_DebugDrawer_setDebugMode_1 = function () {
        return (py = b._emscripten_bind_DebugDrawer_setDebugMode_1 =
          b.asm.Wv).apply(null, arguments);
      }),
      qy = (b._emscripten_bind_DebugDrawer_getDebugMode_0 = function () {
        return (qy = b._emscripten_bind_DebugDrawer_getDebugMode_0 =
          b.asm.Xv).apply(null, arguments);
      }),
      ry = (b._emscripten_bind_DebugDrawer___destroy___0 = function () {
        return (ry = b._emscripten_bind_DebugDrawer___destroy___0 =
          b.asm.Yv).apply(null, arguments);
      }),
      sy = (b._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 = function () {
        return (sy = b._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 =
          b.asm.Zv).apply(null, arguments);
      }),
      ty = (b._emscripten_bind_btCapsuleShapeX_setMargin_1 = function () {
        return (ty = b._emscripten_bind_btCapsuleShapeX_setMargin_1 =
          b.asm._v).apply(null, arguments);
      }),
      uy = (b._emscripten_bind_btCapsuleShapeX_getMargin_0 = function () {
        return (uy = b._emscripten_bind_btCapsuleShapeX_getMargin_0 =
          b.asm.$v).apply(null, arguments);
      }),
      vy = (b._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = function () {
        return (vy = b._emscripten_bind_btCapsuleShapeX_getUpAxis_0 =
          b.asm.aw).apply(null, arguments);
      }),
      wy = (b._emscripten_bind_btCapsuleShapeX_getRadius_0 = function () {
        return (wy = b._emscripten_bind_btCapsuleShapeX_getRadius_0 =
          b.asm.bw).apply(null, arguments);
      }),
      xy = (b._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = function () {
        return (xy = b._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 =
          b.asm.cw).apply(null, arguments);
      }),
      yy = (b._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = function () {
        return (yy = b._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 =
          b.asm.dw).apply(null, arguments);
      }),
      zy = (b._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = function () {
        return (zy = b._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 =
          b.asm.ew).apply(null, arguments);
      }),
      Ay = (b._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = function () {
        return (Ay = b._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 =
          b.asm.fw).apply(null, arguments);
      }),
      By = (b._emscripten_bind_btCapsuleShapeX___destroy___0 = function () {
        return (By = b._emscripten_bind_btCapsuleShapeX___destroy___0 =
          b.asm.gw).apply(null, arguments);
      }),
      Cy = (b._emscripten_bind_btQuaternion_btQuaternion_4 = function () {
        return (Cy = b._emscripten_bind_btQuaternion_btQuaternion_4 =
          b.asm.hw).apply(null, arguments);
      }),
      Dy = (b._emscripten_bind_btQuaternion_setValue_4 = function () {
        return (Dy = b._emscripten_bind_btQuaternion_setValue_4 =
          b.asm.iw).apply(null, arguments);
      }),
      Ey = (b._emscripten_bind_btQuaternion_setEulerZYX_3 = function () {
        return (Ey = b._emscripten_bind_btQuaternion_setEulerZYX_3 =
          b.asm.jw).apply(null, arguments);
      }),
      Fy = (b._emscripten_bind_btQuaternion_setRotation_2 = function () {
        return (Fy = b._emscripten_bind_btQuaternion_setRotation_2 =
          b.asm.kw).apply(null, arguments);
      }),
      Gy = (b._emscripten_bind_btQuaternion_normalize_0 = function () {
        return (Gy = b._emscripten_bind_btQuaternion_normalize_0 =
          b.asm.lw).apply(null, arguments);
      }),
      Hy = (b._emscripten_bind_btQuaternion_length2_0 = function () {
        return (Hy = b._emscripten_bind_btQuaternion_length2_0 =
          b.asm.mw).apply(null, arguments);
      }),
      Iy = (b._emscripten_bind_btQuaternion_length_0 = function () {
        return (Iy = b._emscripten_bind_btQuaternion_length_0 = b.asm.nw).apply(
          null,
          arguments
        );
      }),
      Jy = (b._emscripten_bind_btQuaternion_dot_1 = function () {
        return (Jy = b._emscripten_bind_btQuaternion_dot_1 = b.asm.ow).apply(
          null,
          arguments
        );
      }),
      Ky = (b._emscripten_bind_btQuaternion_normalized_0 = function () {
        return (Ky = b._emscripten_bind_btQuaternion_normalized_0 =
          b.asm.pw).apply(null, arguments);
      }),
      Ly = (b._emscripten_bind_btQuaternion_getAxis_0 = function () {
        return (Ly = b._emscripten_bind_btQuaternion_getAxis_0 =
          b.asm.qw).apply(null, arguments);
      }),
      My = (b._emscripten_bind_btQuaternion_inverse_0 = function () {
        return (My = b._emscripten_bind_btQuaternion_inverse_0 =
          b.asm.rw).apply(null, arguments);
      }),
      Ny = (b._emscripten_bind_btQuaternion_getAngle_0 = function () {
        return (Ny = b._emscripten_bind_btQuaternion_getAngle_0 =
          b.asm.sw).apply(null, arguments);
      }),
      Oy = (b._emscripten_bind_btQuaternion_getAngleShortestPath_0 = function () {
        return (Oy = b._emscripten_bind_btQuaternion_getAngleShortestPath_0 =
          b.asm.tw).apply(null, arguments);
      }),
      Py = (b._emscripten_bind_btQuaternion_angle_1 = function () {
        return (Py = b._emscripten_bind_btQuaternion_angle_1 = b.asm.uw).apply(
          null,
          arguments
        );
      }),
      Qy = (b._emscripten_bind_btQuaternion_angleShortestPath_1 = function () {
        return (Qy = b._emscripten_bind_btQuaternion_angleShortestPath_1 =
          b.asm.vw).apply(null, arguments);
      }),
      Ry = (b._emscripten_bind_btQuaternion_op_add_1 = function () {
        return (Ry = b._emscripten_bind_btQuaternion_op_add_1 = b.asm.ww).apply(
          null,
          arguments
        );
      }),
      Sy = (b._emscripten_bind_btQuaternion_op_sub_1 = function () {
        return (Sy = b._emscripten_bind_btQuaternion_op_sub_1 = b.asm.xw).apply(
          null,
          arguments
        );
      }),
      Ty = (b._emscripten_bind_btQuaternion_op_mul_1 = function () {
        return (Ty = b._emscripten_bind_btQuaternion_op_mul_1 = b.asm.yw).apply(
          null,
          arguments
        );
      }),
      Uy = (b._emscripten_bind_btQuaternion_op_mulq_1 = function () {
        return (Uy = b._emscripten_bind_btQuaternion_op_mulq_1 =
          b.asm.zw).apply(null, arguments);
      }),
      Vy = (b._emscripten_bind_btQuaternion_op_div_1 = function () {
        return (Vy = b._emscripten_bind_btQuaternion_op_div_1 = b.asm.Aw).apply(
          null,
          arguments
        );
      }),
      Wy = (b._emscripten_bind_btQuaternion_x_0 = function () {
        return (Wy = b._emscripten_bind_btQuaternion_x_0 = b.asm.Bw).apply(
          null,
          arguments
        );
      }),
      Xy = (b._emscripten_bind_btQuaternion_y_0 = function () {
        return (Xy = b._emscripten_bind_btQuaternion_y_0 = b.asm.Cw).apply(
          null,
          arguments
        );
      }),
      Yy = (b._emscripten_bind_btQuaternion_z_0 = function () {
        return (Yy = b._emscripten_bind_btQuaternion_z_0 = b.asm.Dw).apply(
          null,
          arguments
        );
      }),
      Zy = (b._emscripten_bind_btQuaternion_w_0 = function () {
        return (Zy = b._emscripten_bind_btQuaternion_w_0 = b.asm.Ew).apply(
          null,
          arguments
        );
      }),
      $y = (b._emscripten_bind_btQuaternion_setX_1 = function () {
        return ($y = b._emscripten_bind_btQuaternion_setX_1 = b.asm.Fw).apply(
          null,
          arguments
        );
      }),
      az = (b._emscripten_bind_btQuaternion_setY_1 = function () {
        return (az = b._emscripten_bind_btQuaternion_setY_1 = b.asm.Gw).apply(
          null,
          arguments
        );
      }),
      bz = (b._emscripten_bind_btQuaternion_setZ_1 = function () {
        return (bz = b._emscripten_bind_btQuaternion_setZ_1 = b.asm.Hw).apply(
          null,
          arguments
        );
      }),
      cz = (b._emscripten_bind_btQuaternion_setW_1 = function () {
        return (cz = b._emscripten_bind_btQuaternion_setW_1 = b.asm.Iw).apply(
          null,
          arguments
        );
      }),
      dz = (b._emscripten_bind_btQuaternion___destroy___0 = function () {
        return (dz = b._emscripten_bind_btQuaternion___destroy___0 =
          b.asm.Jw).apply(null, arguments);
      }),
      ez = (b._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = function () {
        return (ez = b._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 =
          b.asm.Kw).apply(null, arguments);
      }),
      fz = (b._emscripten_bind_btCapsuleShapeZ_setMargin_1 = function () {
        return (fz = b._emscripten_bind_btCapsuleShapeZ_setMargin_1 =
          b.asm.Lw).apply(null, arguments);
      }),
      gz = (b._emscripten_bind_btCapsuleShapeZ_getMargin_0 = function () {
        return (gz = b._emscripten_bind_btCapsuleShapeZ_getMargin_0 =
          b.asm.Mw).apply(null, arguments);
      }),
      hz = (b._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = function () {
        return (hz = b._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 =
          b.asm.Nw).apply(null, arguments);
      }),
      iz = (b._emscripten_bind_btCapsuleShapeZ_getRadius_0 = function () {
        return (iz = b._emscripten_bind_btCapsuleShapeZ_getRadius_0 =
          b.asm.Ow).apply(null, arguments);
      }),
      jz = (b._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = function () {
        return (jz = b._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 =
          b.asm.Pw).apply(null, arguments);
      }),
      kz = (b._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = function () {
        return (kz = b._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 =
          b.asm.Qw).apply(null, arguments);
      }),
      lz = (b._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = function () {
        return (lz = b._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 =
          b.asm.Rw).apply(null, arguments);
      }),
      mz = (b._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = function () {
        return (mz = b._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 =
          b.asm.Sw).apply(null, arguments);
      }),
      nz = (b._emscripten_bind_btCapsuleShapeZ___destroy___0 = function () {
        return (nz = b._emscripten_bind_btCapsuleShapeZ___destroy___0 =
          b.asm.Tw).apply(null, arguments);
      }),
      oz = (b._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = function () {
        return (oz = b._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 =
          b.asm.Uw).apply(null, arguments);
      }),
      pz = (b._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = function () {
        return (pz = b._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 =
          b.asm.Vw).apply(null, arguments);
      }),
      qz = (b._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 = function () {
        return (qz = b._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 =
          b.asm.Ww).apply(null, arguments);
      }),
      rz = (b._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 = function () {
        return (rz = b._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 =
          b.asm.Xw).apply(null, arguments);
      }),
      sz = (b._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = function () {
        return (sz = b._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 =
          b.asm.Yw).apply(null, arguments);
      }),
      tz = (b._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = function () {
        return (tz = b._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 =
          b.asm.Zw).apply(null, arguments);
      }),
      uz = (b._emscripten_bind_btContactSolverInfo___destroy___0 = function () {
        return (uz = b._emscripten_bind_btContactSolverInfo___destroy___0 =
          b.asm._w).apply(null, arguments);
      }),
      vz = (b._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 = function () {
        return (vz = b._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 =
          b.asm.$w).apply(null, arguments);
      }),
      wz = (b._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 = function () {
        return (wz = b._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 =
          b.asm.ax).apply(null, arguments);
      }),
      xz = (b._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 = function () {
        return (xz = b._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 =
          b.asm.bx).apply(null, arguments);
      }),
      yz = (b._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = function () {
        return (yz = b._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 =
          b.asm.cx).apply(null, arguments);
      }),
      zz = (b._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = function () {
        return (zz = b._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 =
          b.asm.dx).apply(null, arguments);
      }),
      Az = (b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 = function () {
        return (Az = b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 =
          b.asm.ex).apply(null, arguments);
      }),
      Bz = (b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 = function () {
        return (Bz = b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 =
          b.asm.fx).apply(null, arguments);
      }),
      Cz = (b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 = function () {
        return (Cz = b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 =
          b.asm.gx).apply(null, arguments);
      }),
      Dz = (b._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 = function () {
        return (Dz = b._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 =
          b.asm.hx).apply(null, arguments);
      }),
      Ez = (b._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = function () {
        return (Ez = b._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 =
          b.asm.ix).apply(null, arguments);
      }),
      Fz = (b._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = function () {
        return (Fz = b._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 =
          b.asm.jx).apply(null, arguments);
      }),
      Gz = (b._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = function () {
        return (Gz = b._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 =
          b.asm.kx).apply(null, arguments);
      }),
      Hz = (b._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = function () {
        return (Hz = b._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 =
          b.asm.lx).apply(null, arguments);
      }),
      Iz = (b._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 = function () {
        return (Iz = b._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 =
          b.asm.mx).apply(null, arguments);
      }),
      Jz = (b._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 = function () {
        return (Jz = b._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 =
          b.asm.nx).apply(null, arguments);
      }),
      Kz = (b._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 = function () {
        return (Kz = b._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 =
          b.asm.ox).apply(null, arguments);
      }),
      Lz = (b._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 = function () {
        return (Lz = b._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 =
          b.asm.px).apply(null, arguments);
      }),
      Mz = (b._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = function () {
        return (Mz = b._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 =
          b.asm.qx).apply(null, arguments);
      }),
      Nz = (b._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = function () {
        return (Nz = b._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 =
          b.asm.rx).apply(null, arguments);
      }),
      Oz = (b._emscripten_bind_btSphereShape_btSphereShape_1 = function () {
        return (Oz = b._emscripten_bind_btSphereShape_btSphereShape_1 =
          b.asm.sx).apply(null, arguments);
      }),
      Pz = (b._emscripten_bind_btSphereShape_setMargin_1 = function () {
        return (Pz = b._emscripten_bind_btSphereShape_setMargin_1 =
          b.asm.tx).apply(null, arguments);
      }),
      Qz = (b._emscripten_bind_btSphereShape_getMargin_0 = function () {
        return (Qz = b._emscripten_bind_btSphereShape_getMargin_0 =
          b.asm.ux).apply(null, arguments);
      }),
      Rz = (b._emscripten_bind_btSphereShape_setLocalScaling_1 = function () {
        return (Rz = b._emscripten_bind_btSphereShape_setLocalScaling_1 =
          b.asm.vx).apply(null, arguments);
      }),
      Sz = (b._emscripten_bind_btSphereShape_getLocalScaling_0 = function () {
        return (Sz = b._emscripten_bind_btSphereShape_getLocalScaling_0 =
          b.asm.wx).apply(null, arguments);
      }),
      Tz = (b._emscripten_bind_btSphereShape_calculateLocalInertia_2 = function () {
        return (Tz = b._emscripten_bind_btSphereShape_calculateLocalInertia_2 =
          b.asm.xx).apply(null, arguments);
      }),
      Uz = (b._emscripten_bind_btSphereShape___destroy___0 = function () {
        return (Uz = b._emscripten_bind_btSphereShape___destroy___0 =
          b.asm.yx).apply(null, arguments);
      }),
      Vz = (b._emscripten_bind_Face_get_m_n_1 = function () {
        return (Vz = b._emscripten_bind_Face_get_m_n_1 = b.asm.zx).apply(
          null,
          arguments
        );
      }),
      Wz = (b._emscripten_bind_Face_set_m_n_2 = function () {
        return (Wz = b._emscripten_bind_Face_set_m_n_2 = b.asm.Ax).apply(
          null,
          arguments
        );
      }),
      Xz = (b._emscripten_bind_Face_get_m_normal_0 = function () {
        return (Xz = b._emscripten_bind_Face_get_m_normal_0 = b.asm.Bx).apply(
          null,
          arguments
        );
      }),
      Yz = (b._emscripten_bind_Face_set_m_normal_1 = function () {
        return (Yz = b._emscripten_bind_Face_set_m_normal_1 = b.asm.Cx).apply(
          null,
          arguments
        );
      }),
      Zz = (b._emscripten_bind_Face_get_m_ra_0 = function () {
        return (Zz = b._emscripten_bind_Face_get_m_ra_0 = b.asm.Dx).apply(
          null,
          arguments
        );
      }),
      $z = (b._emscripten_bind_Face_set_m_ra_1 = function () {
        return ($z = b._emscripten_bind_Face_set_m_ra_1 = b.asm.Ex).apply(
          null,
          arguments
        );
      }),
      aA = (b._emscripten_bind_Face___destroy___0 = function () {
        return (aA = b._emscripten_bind_Face___destroy___0 = b.asm.Fx).apply(
          null,
          arguments
        );
      }),
      bA = (b._emscripten_bind_tFaceArray_size_0 = function () {
        return (bA = b._emscripten_bind_tFaceArray_size_0 = b.asm.Gx).apply(
          null,
          arguments
        );
      }),
      cA = (b._emscripten_bind_tFaceArray_at_1 = function () {
        return (cA = b._emscripten_bind_tFaceArray_at_1 = b.asm.Hx).apply(
          null,
          arguments
        );
      }),
      dA = (b._emscripten_bind_tFaceArray___destroy___0 = function () {
        return (dA = b._emscripten_bind_tFaceArray___destroy___0 =
          b.asm.Ix).apply(null, arguments);
      }),
      eA = (b._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = function () {
        return (eA = b._emscripten_bind_LocalConvexResult_LocalConvexResult_5 =
          b.asm.Jx).apply(null, arguments);
      }),
      fA = (b._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = function () {
        return (fA = b._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 =
          b.asm.Kx).apply(null, arguments);
      }),
      gA = (b._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = function () {
        return (gA = b._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 =
          b.asm.Lx).apply(null, arguments);
      }),
      hA = (b._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 = function () {
        return (hA = b._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 =
          b.asm.Mx).apply(null, arguments);
      }),
      iA = (b._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = function () {
        return (iA = b._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 =
          b.asm.Nx).apply(null, arguments);
      }),
      jA = (b._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = function () {
        return (jA = b._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 =
          b.asm.Ox).apply(null, arguments);
      }),
      kA = (b._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = function () {
        return (kA = b._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 =
          b.asm.Px).apply(null, arguments);
      }),
      lA = (b._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = function () {
        return (lA = b._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 =
          b.asm.Qx).apply(null, arguments);
      }),
      mA = (b._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = function () {
        return (mA = b._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 =
          b.asm.Rx).apply(null, arguments);
      }),
      nA = (b._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = function () {
        return (nA = b._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 =
          b.asm.Sx).apply(null, arguments);
      }),
      oA = (b._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = function () {
        return (oA = b._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 =
          b.asm.Tx).apply(null, arguments);
      }),
      pA = (b._emscripten_bind_LocalConvexResult___destroy___0 = function () {
        return (pA = b._emscripten_bind_LocalConvexResult___destroy___0 =
          b.asm.Ux).apply(null, arguments);
      }),
      qA = (b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = function () {
        return (qA = b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP =
          b.asm.Vx).apply(null, arguments);
      }),
      rA = (b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = function () {
        return (rA = b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP =
          b.asm.Wx).apply(null, arguments);
      }),
      sA = (b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = function () {
        return (sA = b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM =
          b.asm.Xx).apply(null, arguments);
      }),
      tA = (b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = function () {
        return (tA = b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM =
          b.asm.Yx).apply(null, arguments);
      }),
      uA = (b._emscripten_enum_PHY_ScalarType_PHY_FLOAT = function () {
        return (uA = b._emscripten_enum_PHY_ScalarType_PHY_FLOAT =
          b.asm.Zx).apply(null, arguments);
      }),
      vA = (b._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = function () {
        return (vA = b._emscripten_enum_PHY_ScalarType_PHY_DOUBLE =
          b.asm._x).apply(null, arguments);
      }),
      wA = (b._emscripten_enum_PHY_ScalarType_PHY_INTEGER = function () {
        return (wA = b._emscripten_enum_PHY_ScalarType_PHY_INTEGER =
          b.asm.$x).apply(null, arguments);
      }),
      xA = (b._emscripten_enum_PHY_ScalarType_PHY_SHORT = function () {
        return (xA = b._emscripten_enum_PHY_ScalarType_PHY_SHORT =
          b.asm.ay).apply(null, arguments);
      }),
      yA = (b._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = function () {
        return (yA = b._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 =
          b.asm.by).apply(null, arguments);
      }),
      zA = (b._emscripten_enum_PHY_ScalarType_PHY_UCHAR = function () {
        return (zA = b._emscripten_enum_PHY_ScalarType_PHY_UCHAR =
          b.asm.cy).apply(null, arguments);
      });
    b._malloc = function () {
      return (b._malloc = b.asm.dy).apply(null, arguments);
    };
    b._free = function () {
      return (b._free = b.asm.ey).apply(null, arguments);
    };
    b.dynCall_vi = function () {
      return (b.dynCall_vi = b.asm.fy).apply(null, arguments);
    };
    b.dynCall_v = function () {
      return (b.dynCall_v = b.asm.gy).apply(null, arguments);
    };
    b.UTF8ToString = function (a, c) {
      if (a) {
        var d = a + c;
        for (c = a; za[c] && !(c >= d); ) ++c;
        if (16 < c - a && za.subarray && wa) a = wa.decode(za.subarray(a, c));
        else {
          for (d = ""; a < c; ) {
            var e = za[a++];
            if (e & 128) {
              var g = za[a++] & 63;
              if (192 == (e & 224))
                d += String.fromCharCode(((e & 31) << 6) | g);
              else {
                var n = za[a++] & 63;
                e =
                  224 == (e & 240)
                    ? ((e & 15) << 12) | (g << 6) | n
                    : ((e & 7) << 18) | (g << 12) | (n << 6) | (za[a++] & 63);
                65536 > e
                  ? (d += String.fromCharCode(e))
                  : ((e -= 65536),
                    (d += String.fromCharCode(
                      55296 | (e >> 10),
                      56320 | (e & 1023)
                    )));
              }
            } else d += String.fromCharCode(e);
          }
          a = d;
        }
      } else a = "";
      return a;
    };
    var AA;
    Oa = function BA() {
      AA || CA();
      AA || (Oa = BA);
    };
    function CA() {
      function a() {
        if (!AA && ((AA = !0), (b.calledRun = !0), !va)) {
          Ka = !0;
          Fa(Ha);
          Fa(Ia);
          ba(b);
          if (b.onRuntimeInitialized) b.onRuntimeInitialized();
          if (b.postRun)
            for (
              "function" == typeof b.postRun && (b.postRun = [b.postRun]);
              b.postRun.length;

            ) {
              var c = b.postRun.shift();
              Ja.unshift(c);
            }
          Fa(Ja);
        }
      }
      if (!(0 < Ma)) {
        if (b.preRun)
          for (
            "function" == typeof b.preRun && (b.preRun = [b.preRun]);
            b.preRun.length;

          )
            La();
        Fa(Ga);
        0 < Ma ||
          (b.setStatus
            ? (b.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  b.setStatus("");
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    b.run = CA;
    if (b.preInit)
      for (
        "function" == typeof b.preInit && (b.preInit = [b.preInit]);
        0 < b.preInit.length;

      )
        b.preInit.pop()();
    noExitRuntime = !0;
    CA();
    function f() {}
    f.prototype = Object.create(f.prototype);
    f.prototype.constructor = f;
    f.prototype.iy = f;
    f.jy = {};
    b.WrapperObject = f;
    function h(a) {
      return (a || f).jy;
    }
    b.getCache = h;
    function k(a, c) {
      var d = h(c),
        e = d[a];
      if (e) return e;
      e = Object.create((c || f).prototype);
      e.hy = a;
      return (d[a] = e);
    }
    b.wrapPointer = k;
    b.castObject = function (a, c) {
      return k(a.hy, c);
    };
    b.NULL = k(0);
    b.destroy = function (a) {
      if (!a.__destroy__)
        throw "Error: Cannot destroy object. (Did you create it yourself?)";
      a.__destroy__();
      delete h(a.iy)[a.hy];
    };
    b.compare = function (a, c) {
      return a.hy === c.hy;
    };
    b.getPointer = function (a) {
      return a.hy;
    };
    b.getClass = function (a) {
      return a.iy;
    };
    var DA = 0,
      EA = 0,
      FA = 0,
      GA = [],
      HA = 0;
    function IA() {
      if (HA) {
        for (var a = 0; a < GA.length; a++) b._free(GA[a]);
        GA.length = 0;
        b._free(DA);
        DA = 0;
        EA += HA;
        HA = 0;
      }
      DA || ((EA += 128), (DA = b._malloc(EA)), assert(DA));
      FA = 0;
    }
    function JA(a, c) {
      assert(DA);
      a = a.length * c.BYTES_PER_ELEMENT;
      a = (a + 7) & -8;
      FA + a >= EA
        ? (assert(0 < a), (HA += a), (c = b._malloc(a)), GA.push(c))
        : ((c = DA + FA), (FA += a));
      return c;
    }
    function KA(a, c, d) {
      d >>>= 0;
      switch (c.BYTES_PER_ELEMENT) {
        case 2:
          d >>>= 1;
          break;
        case 4:
          d >>>= 2;
          break;
        case 8:
          d >>>= 3;
      }
      for (var e = 0; e < a.length; e++) c[d + e] = a[e];
    }
    function LA(a) {
      if ("string" === typeof a) {
        for (var c = 0, d = 0; d < a.length; ++d) {
          var e = a.charCodeAt(d);
          55296 <= e &&
            57343 >= e &&
            (e = (65536 + ((e & 1023) << 10)) | (a.charCodeAt(++d) & 1023));
          127 >= e ? ++c : (c = 2047 >= e ? c + 2 : 65535 >= e ? c + 3 : c + 4);
        }
        c = Array(c + 1);
        e = c.length;
        d = 0;
        if (0 < e) {
          e = d + e - 1;
          for (var g = 0; g < a.length; ++g) {
            var n = a.charCodeAt(g);
            if (55296 <= n && 57343 >= n) {
              var F = a.charCodeAt(++g);
              n = (65536 + ((n & 1023) << 10)) | (F & 1023);
            }
            if (127 >= n) {
              if (d >= e) break;
              c[d++] = n;
            } else {
              if (2047 >= n) {
                if (d + 1 >= e) break;
                c[d++] = 192 | (n >> 6);
              } else {
                if (65535 >= n) {
                  if (d + 2 >= e) break;
                  c[d++] = 224 | (n >> 12);
                } else {
                  if (d + 3 >= e) break;
                  c[d++] = 240 | (n >> 18);
                  c[d++] = 128 | ((n >> 12) & 63);
                }
                c[d++] = 128 | ((n >> 6) & 63);
              }
              c[d++] = 128 | (n & 63);
            }
          }
          c[d] = 0;
        }
        a = JA(c, ya);
        KA(c, ya, a);
      }
      return a;
    }
    function MA(a) {
      if ("object" === typeof a) {
        var c = JA(a, Ba);
        KA(a, Ba, c);
        return c;
      }
      return a;
    }
    function NA() {
      throw "cannot construct a btCollisionWorld, no constructor in IDL";
    }
    NA.prototype = Object.create(f.prototype);
    NA.prototype.constructor = NA;
    NA.prototype.iy = NA;
    NA.jy = {};
    b.btCollisionWorld = NA;
    NA.prototype.getDispatcher = function () {
      return k($a(this.hy), OA);
    };
    NA.prototype.rayTest = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      ab(e, a, c, d);
    };
    NA.prototype.getPairCache = function () {
      return k(bb(this.hy), PA);
    };
    NA.prototype.getDispatchInfo = function () {
      return k(cb(this.hy), l);
    };
    NA.prototype.addCollisionObject = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === c ? db(e, a) : void 0 === d ? eb(e, a, c) : fb(e, a, c, d);
    };
    NA.prototype.removeCollisionObject = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      gb(c, a);
    };
    NA.prototype.getBroadphase = function () {
      return k(hb(this.hy), QA);
    };
    NA.prototype.convexSweepTest = function (a, c, d, e, g) {
      var n = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      ib(n, a, c, d, e, g);
    };
    NA.prototype.contactPairTest = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      jb(e, a, c, d);
    };
    NA.prototype.contactTest = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      kb(d, a, c);
    };
    NA.prototype.updateSingleAabb = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      lb(c, a);
    };
    NA.prototype.setDebugDrawer = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      mb(c, a);
    };
    NA.prototype.getDebugDrawer = function () {
      return k(nb(this.hy), RA);
    };
    NA.prototype.debugDrawWorld = function () {
      ob(this.hy);
    };
    NA.prototype.debugDrawObject = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      pb(e, a, c, d);
    };
    NA.prototype.__destroy__ = function () {
      qb(this.hy);
    };
    function m() {
      throw "cannot construct a btCollisionShape, no constructor in IDL";
    }
    m.prototype = Object.create(f.prototype);
    m.prototype.constructor = m;
    m.prototype.iy = m;
    m.jy = {};
    b.btCollisionShape = m;
    m.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      rb(c, a);
    };
    m.prototype.getLocalScaling = function () {
      return k(sb(this.hy), p);
    };
    m.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      tb(d, a, c);
    };
    m.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ub(c, a);
    };
    m.prototype.getMargin = function () {
      return vb(this.hy);
    };
    m.prototype.__destroy__ = function () {
      wb(this.hy);
    };
    function q() {
      throw "cannot construct a btCollisionObject, no constructor in IDL";
    }
    q.prototype = Object.create(f.prototype);
    q.prototype.constructor = q;
    q.prototype.iy = q;
    q.jy = {};
    b.btCollisionObject = q;
    q.prototype.setAnisotropicFriction = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      xb(d, a, c);
    };
    q.prototype.getCollisionShape = function () {
      return k(yb(this.hy), m);
    };
    q.prototype.setContactProcessingThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      zb(c, a);
    };
    q.prototype.setActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ab(c, a);
    };
    q.prototype.forceActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Bb(c, a);
    };
    q.prototype.activate = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      void 0 === a ? Cb(c) : Db(c, a);
    };
    q.prototype.isActive = function () {
      return !!Eb(this.hy);
    };
    q.prototype.isKinematicObject = function () {
      return !!Fb(this.hy);
    };
    q.prototype.isStaticObject = function () {
      return !!Gb(this.hy);
    };
    q.prototype.isStaticOrKinematicObject = function () {
      return !!Hb(this.hy);
    };
    q.prototype.getRestitution = function () {
      return Ib(this.hy);
    };
    q.prototype.getFriction = function () {
      return Jb(this.hy);
    };
    q.prototype.getRollingFriction = function () {
      return Kb(this.hy);
    };
    q.prototype.setRestitution = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Lb(c, a);
    };
    q.prototype.setFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Mb(c, a);
    };
    q.prototype.setRollingFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Nb(c, a);
    };
    q.prototype.getWorldTransform = function () {
      return k(Ob(this.hy), r);
    };
    q.prototype.getCollisionFlags = function () {
      return Pb(this.hy);
    };
    q.prototype.setCollisionFlags = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Qb(c, a);
    };
    q.prototype.setWorldTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Sb(c, a);
    };
    q.prototype.setCollisionShape = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Tb(c, a);
    };
    q.prototype.setCcdMotionThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ub(c, a);
    };
    q.prototype.setCcdSweptSphereRadius = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Vb(c, a);
    };
    q.prototype.getUserIndex = function () {
      return Wb(this.hy);
    };
    q.prototype.setUserIndex = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Xb(c, a);
    };
    q.prototype.getUserPointer = function () {
      return k(Yb(this.hy), SA);
    };
    q.prototype.setUserPointer = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Zb(c, a);
    };
    q.prototype.getBroadphaseHandle = function () {
      return k($b(this.hy), t);
    };
    q.prototype.__destroy__ = function () {
      ac(this.hy);
    };
    function u() {
      throw "cannot construct a btDynamicsWorld, no constructor in IDL";
    }
    u.prototype = Object.create(NA.prototype);
    u.prototype.constructor = u;
    u.prototype.iy = u;
    u.jy = {};
    b.btDynamicsWorld = u;
    u.prototype.addAction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      bc(c, a);
    };
    u.prototype.removeAction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      cc(c, a);
    };
    u.prototype.getSolverInfo = function () {
      return k(dc(this.hy), v);
    };
    u.prototype.setInternalTickCallback = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === c ? ec(e, a) : void 0 === d ? fc(e, a, c) : hc(e, a, c, d);
    };
    u.prototype.getDispatcher = function () {
      return k(ic(this.hy), OA);
    };
    u.prototype.rayTest = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      jc(e, a, c, d);
    };
    u.prototype.getPairCache = function () {
      return k(kc(this.hy), PA);
    };
    u.prototype.getDispatchInfo = function () {
      return k(lc(this.hy), l);
    };
    u.prototype.addCollisionObject = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === c ? mc(e, a) : void 0 === d ? nc(e, a, c) : oc(e, a, c, d);
    };
    u.prototype.removeCollisionObject = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      pc(c, a);
    };
    u.prototype.getBroadphase = function () {
      return k(qc(this.hy), QA);
    };
    u.prototype.convexSweepTest = function (a, c, d, e, g) {
      var n = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      rc(n, a, c, d, e, g);
    };
    u.prototype.contactPairTest = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      sc(e, a, c, d);
    };
    u.prototype.contactTest = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      tc(d, a, c);
    };
    u.prototype.updateSingleAabb = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      uc(c, a);
    };
    u.prototype.setDebugDrawer = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      vc(c, a);
    };
    u.prototype.getDebugDrawer = function () {
      return k(wc(this.hy), RA);
    };
    u.prototype.debugDrawWorld = function () {
      xc(this.hy);
    };
    u.prototype.debugDrawObject = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      yc(e, a, c, d);
    };
    u.prototype.__destroy__ = function () {
      zc(this.hy);
    };
    function TA() {
      throw "cannot construct a btTypedConstraint, no constructor in IDL";
    }
    TA.prototype = Object.create(f.prototype);
    TA.prototype.constructor = TA;
    TA.prototype.iy = TA;
    TA.jy = {};
    b.btTypedConstraint = TA;
    TA.prototype.enableFeedback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ac(c, a);
    };
    TA.prototype.getBreakingImpulseThreshold = function () {
      return Bc(this.hy);
    };
    TA.prototype.setBreakingImpulseThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Cc(c, a);
    };
    TA.prototype.getParam = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return Dc(d, a, c);
    };
    TA.prototype.setParam = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Ec(e, a, c, d);
    };
    TA.prototype.__destroy__ = function () {
      Fc(this.hy);
    };
    function UA() {
      throw "cannot construct a btConcaveShape, no constructor in IDL";
    }
    UA.prototype = Object.create(m.prototype);
    UA.prototype.constructor = UA;
    UA.prototype.iy = UA;
    UA.jy = {};
    b.btConcaveShape = UA;
    UA.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Gc(c, a);
    };
    UA.prototype.getLocalScaling = function () {
      return k(Hc(this.hy), p);
    };
    UA.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Ic(d, a, c);
    };
    UA.prototype.__destroy__ = function () {
      Jc(this.hy);
    };
    function VA(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = Kc(a, c);
      h(VA)[this.hy] = this;
    }
    VA.prototype = Object.create(m.prototype);
    VA.prototype.constructor = VA;
    VA.prototype.iy = VA;
    VA.jy = {};
    b.btCapsuleShape = VA;
    VA.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Lc(c, a);
    };
    VA.prototype.getMargin = function () {
      return Mc(this.hy);
    };
    VA.prototype.getUpAxis = function () {
      return Nc(this.hy);
    };
    VA.prototype.getRadius = function () {
      return Oc(this.hy);
    };
    VA.prototype.getHalfHeight = function () {
      return Pc(this.hy);
    };
    VA.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Qc(c, a);
    };
    VA.prototype.getLocalScaling = function () {
      return k(Rc(this.hy), p);
    };
    VA.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Sc(d, a, c);
    };
    VA.prototype.__destroy__ = function () {
      Tc(this.hy);
    };
    function RA() {
      throw "cannot construct a btIDebugDraw, no constructor in IDL";
    }
    RA.prototype = Object.create(f.prototype);
    RA.prototype.constructor = RA;
    RA.prototype.iy = RA;
    RA.jy = {};
    b.btIDebugDraw = RA;
    RA.prototype.drawLine = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Uc(e, a, c, d);
    };
    RA.prototype.drawContactPoint = function (a, c, d, e, g) {
      var n = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      Vc(n, a, c, d, e, g);
    };
    RA.prototype.reportErrorWarning = function (a) {
      var c = this.hy;
      IA();
      a = a && "object" === typeof a ? a.hy : LA(a);
      Wc(c, a);
    };
    RA.prototype.draw3dText = function (a, c) {
      var d = this.hy;
      IA();
      a && "object" === typeof a && (a = a.hy);
      c = c && "object" === typeof c ? c.hy : LA(c);
      Xc(d, a, c);
    };
    RA.prototype.setDebugMode = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Yc(c, a);
    };
    RA.prototype.getDebugMode = function () {
      return Zc(this.hy);
    };
    RA.prototype.__destroy__ = function () {
      $c(this.hy);
    };
    function WA(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = void 0 === a ? ad() : bd(a);
      h(WA)[this.hy] = this;
    }
    WA.prototype = Object.create(f.prototype);
    WA.prototype.constructor = WA;
    WA.prototype.iy = WA;
    WA.jy = {};
    b.btDefaultCollisionConfiguration = WA;
    WA.prototype.__destroy__ = function () {
      cd(this.hy);
    };
    function XA() {
      throw "cannot construct a btTriangleMeshShape, no constructor in IDL";
    }
    XA.prototype = Object.create(UA.prototype);
    XA.prototype.constructor = XA;
    XA.prototype.iy = XA;
    XA.jy = {};
    b.btTriangleMeshShape = XA;
    XA.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      dd(c, a);
    };
    XA.prototype.getLocalScaling = function () {
      return k(ed(this.hy), p);
    };
    XA.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      fd(d, a, c);
    };
    XA.prototype.__destroy__ = function () {
      gd(this.hy);
    };
    function w() {
      this.hy = hd();
      h(w)[this.hy] = this;
    }
    w.prototype = Object.create(q.prototype);
    w.prototype.constructor = w;
    w.prototype.iy = w;
    w.jy = {};
    b.btGhostObject = w;
    w.prototype.getNumOverlappingObjects = function () {
      return id(this.hy);
    };
    w.prototype.getOverlappingObject = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(jd(c, a), q);
    };
    w.prototype.setAnisotropicFriction = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      kd(d, a, c);
    };
    w.prototype.getCollisionShape = function () {
      return k(ld(this.hy), m);
    };
    w.prototype.setContactProcessingThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      md(c, a);
    };
    w.prototype.setActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      nd(c, a);
    };
    w.prototype.forceActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      od(c, a);
    };
    w.prototype.activate = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      void 0 === a ? pd(c) : qd(c, a);
    };
    w.prototype.isActive = function () {
      return !!rd(this.hy);
    };
    w.prototype.isKinematicObject = function () {
      return !!sd(this.hy);
    };
    w.prototype.isStaticObject = function () {
      return !!td(this.hy);
    };
    w.prototype.isStaticOrKinematicObject = function () {
      return !!ud(this.hy);
    };
    w.prototype.getRestitution = function () {
      return vd(this.hy);
    };
    w.prototype.getFriction = function () {
      return wd(this.hy);
    };
    w.prototype.getRollingFriction = function () {
      return xd(this.hy);
    };
    w.prototype.setRestitution = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yd(c, a);
    };
    w.prototype.setFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      zd(c, a);
    };
    w.prototype.setRollingFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ad(c, a);
    };
    w.prototype.getWorldTransform = function () {
      return k(Bd(this.hy), r);
    };
    w.prototype.getCollisionFlags = function () {
      return Cd(this.hy);
    };
    w.prototype.setCollisionFlags = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Dd(c, a);
    };
    w.prototype.setWorldTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ed(c, a);
    };
    w.prototype.setCollisionShape = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Fd(c, a);
    };
    w.prototype.setCcdMotionThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Gd(c, a);
    };
    w.prototype.setCcdSweptSphereRadius = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Hd(c, a);
    };
    w.prototype.getUserIndex = function () {
      return Id(this.hy);
    };
    w.prototype.setUserIndex = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Jd(c, a);
    };
    w.prototype.getUserPointer = function () {
      return k(Kd(this.hy), SA);
    };
    w.prototype.setUserPointer = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ld(c, a);
    };
    w.prototype.getBroadphaseHandle = function () {
      return k(Md(this.hy), t);
    };
    w.prototype.__destroy__ = function () {
      Nd(this.hy);
    };
    function YA(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = Od(a, c);
      h(YA)[this.hy] = this;
    }
    YA.prototype = Object.create(m.prototype);
    YA.prototype.constructor = YA;
    YA.prototype.iy = YA;
    YA.jy = {};
    b.btConeShape = YA;
    YA.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pd(c, a);
    };
    YA.prototype.getLocalScaling = function () {
      return k(Qd(this.hy), p);
    };
    YA.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Rd(d, a, c);
    };
    YA.prototype.__destroy__ = function () {
      Sd(this.hy);
    };
    function ZA() {
      throw "cannot construct a btActionInterface, no constructor in IDL";
    }
    ZA.prototype = Object.create(f.prototype);
    ZA.prototype.constructor = ZA;
    ZA.prototype.iy = ZA;
    ZA.jy = {};
    b.btActionInterface = ZA;
    ZA.prototype.updateAction = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Td(d, a, c);
    };
    ZA.prototype.__destroy__ = function () {
      Ud(this.hy);
    };
    function p(a, c, d) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      this.hy =
        void 0 === a
          ? Vd()
          : void 0 === c
          ? _emscripten_bind_btVector3_btVector3_1(a)
          : void 0 === d
          ? _emscripten_bind_btVector3_btVector3_2(a, c)
          : Wd(a, c, d);
      h(p)[this.hy] = this;
    }
    p.prototype = Object.create(f.prototype);
    p.prototype.constructor = p;
    p.prototype.iy = p;
    p.jy = {};
    b.btVector3 = p;
    p.prototype.length = p.prototype.length = function () {
      return Xd(this.hy);
    };
    p.prototype.x = p.prototype.x = function () {
      return Yd(this.hy);
    };
    p.prototype.y = p.prototype.y = function () {
      return Zd(this.hy);
    };
    p.prototype.z = p.prototype.z = function () {
      return $d(this.hy);
    };
    p.prototype.setX = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ae(c, a);
    };
    p.prototype.setY = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      be(c, a);
    };
    p.prototype.setZ = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ce(c, a);
    };
    p.prototype.setValue = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      de(e, a, c, d);
    };
    p.prototype.normalize = p.prototype.normalize = function () {
      ee(this.hy);
    };
    p.prototype.rotate = p.prototype.rotate = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return k(fe(d, a, c), p);
    };
    p.prototype.dot = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return ge(c, a);
    };
    p.prototype.op_mul = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(he(c, a), p);
    };
    p.prototype.op_add = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(ie(c, a), p);
    };
    p.prototype.op_sub = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(je(c, a), p);
    };
    p.prototype.__destroy__ = function () {
      ke(this.hy);
    };
    function $A() {
      throw "cannot construct a btVehicleRaycaster, no constructor in IDL";
    }
    $A.prototype = Object.create(f.prototype);
    $A.prototype.constructor = $A;
    $A.prototype.iy = $A;
    $A.jy = {};
    b.btVehicleRaycaster = $A;
    $A.prototype.castRay = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      le(e, a, c, d);
    };
    $A.prototype.__destroy__ = function () {
      me(this.hy);
    };
    function aB() {
      throw "cannot construct a btQuadWord, no constructor in IDL";
    }
    aB.prototype = Object.create(f.prototype);
    aB.prototype.constructor = aB;
    aB.prototype.iy = aB;
    aB.jy = {};
    b.btQuadWord = aB;
    aB.prototype.x = aB.prototype.x = function () {
      return ne(this.hy);
    };
    aB.prototype.y = aB.prototype.y = function () {
      return oe(this.hy);
    };
    aB.prototype.z = aB.prototype.z = function () {
      return pe(this.hy);
    };
    aB.prototype.w = function () {
      return qe(this.hy);
    };
    aB.prototype.setX = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      re(c, a);
    };
    aB.prototype.setY = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      se(c, a);
    };
    aB.prototype.setZ = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      te(c, a);
    };
    aB.prototype.setW = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ue(c, a);
    };
    aB.prototype.__destroy__ = function () {
      ve(this.hy);
    };
    function bB(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = we(a);
      h(bB)[this.hy] = this;
    }
    bB.prototype = Object.create(m.prototype);
    bB.prototype.constructor = bB;
    bB.prototype.iy = bB;
    bB.jy = {};
    b.btCylinderShape = bB;
    bB.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      xe(c, a);
    };
    bB.prototype.getMargin = function () {
      return ye(this.hy);
    };
    bB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ze(c, a);
    };
    bB.prototype.getLocalScaling = function () {
      return k(Ae(this.hy), p);
    };
    bB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Be(d, a, c);
    };
    bB.prototype.__destroy__ = function () {
      Ce(this.hy);
    };
    function x(a, c, d, e) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      this.hy = De(a, c, d, e);
      h(x)[this.hy] = this;
    }
    x.prototype = Object.create(u.prototype);
    x.prototype.constructor = x;
    x.prototype.iy = x;
    x.jy = {};
    b.btDiscreteDynamicsWorld = x;
    x.prototype.setGravity = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ee(c, a);
    };
    x.prototype.getGravity = function () {
      return k(Fe(this.hy), p);
    };
    x.prototype.addRigidBody = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === c
        ? Ge(e, a)
        : void 0 === d
        ? _emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_2(e, a, c)
        : He(e, a, c, d);
    };
    x.prototype.removeRigidBody = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ie(c, a);
    };
    x.prototype.addConstraint = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      void 0 === c ? Je(d, a) : Ke(d, a, c);
    };
    x.prototype.removeConstraint = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Le(c, a);
    };
    x.prototype.stepSimulation = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      return void 0 === c
        ? Me(e, a)
        : void 0 === d
        ? Ne(e, a, c)
        : Oe(e, a, c, d);
    };
    x.prototype.setContactAddedCallback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pe(c, a);
    };
    x.prototype.setContactProcessedCallback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Qe(c, a);
    };
    x.prototype.setContactDestroyedCallback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Re(c, a);
    };
    x.prototype.getDispatcher = function () {
      return k(Se(this.hy), OA);
    };
    x.prototype.rayTest = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Te(e, a, c, d);
    };
    x.prototype.getPairCache = function () {
      return k(Ue(this.hy), PA);
    };
    x.prototype.getDispatchInfo = function () {
      return k(Ve(this.hy), l);
    };
    x.prototype.addCollisionObject = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === c ? We(e, a) : void 0 === d ? Xe(e, a, c) : Ye(e, a, c, d);
    };
    x.prototype.removeCollisionObject = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ze(c, a);
    };
    x.prototype.getBroadphase = function () {
      return k($e(this.hy), QA);
    };
    x.prototype.convexSweepTest = function (a, c, d, e, g) {
      var n = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      af(n, a, c, d, e, g);
    };
    x.prototype.contactPairTest = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      bf(e, a, c, d);
    };
    x.prototype.contactTest = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      cf(d, a, c);
    };
    x.prototype.updateSingleAabb = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      df(c, a);
    };
    x.prototype.setDebugDrawer = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ef(c, a);
    };
    x.prototype.getDebugDrawer = function () {
      return k(ff(this.hy), RA);
    };
    x.prototype.debugDrawWorld = function () {
      gf(this.hy);
    };
    x.prototype.debugDrawObject = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      hf(e, a, c, d);
    };
    x.prototype.addAction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      jf(c, a);
    };
    x.prototype.removeAction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      kf(c, a);
    };
    x.prototype.getSolverInfo = function () {
      return k(lf(this.hy), v);
    };
    x.prototype.setInternalTickCallback = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === c ? mf(e, a) : void 0 === d ? nf(e, a, c) : of(e, a, c, d);
    };
    x.prototype.__destroy__ = function () {
      pf(this.hy);
    };
    function cB() {
      throw "cannot construct a btConvexShape, no constructor in IDL";
    }
    cB.prototype = Object.create(m.prototype);
    cB.prototype.constructor = cB;
    cB.prototype.iy = cB;
    cB.jy = {};
    b.btConvexShape = cB;
    cB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      qf(c, a);
    };
    cB.prototype.getLocalScaling = function () {
      return k(rf(this.hy), p);
    };
    cB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      sf(d, a, c);
    };
    cB.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      tf(c, a);
    };
    cB.prototype.getMargin = function () {
      return uf(this.hy);
    };
    cB.prototype.__destroy__ = function () {
      vf(this.hy);
    };
    function OA() {
      throw "cannot construct a btDispatcher, no constructor in IDL";
    }
    OA.prototype = Object.create(f.prototype);
    OA.prototype.constructor = OA;
    OA.prototype.iy = OA;
    OA.jy = {};
    b.btDispatcher = OA;
    OA.prototype.getNumManifolds = function () {
      return wf(this.hy);
    };
    OA.prototype.getManifoldByIndexInternal = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(xf(c, a), dB);
    };
    OA.prototype.__destroy__ = function () {
      yf(this.hy);
    };
    function eB(a, c, d, e, g) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      this.hy =
        void 0 === e
          ? zf(a, c, d)
          : void 0 === g
          ? _emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_4(
              a,
              c,
              d,
              e
            )
          : Af(a, c, d, e, g);
      h(eB)[this.hy] = this;
    }
    eB.prototype = Object.create(TA.prototype);
    eB.prototype.constructor = eB;
    eB.prototype.iy = eB;
    eB.jy = {};
    b.btGeneric6DofConstraint = eB;
    eB.prototype.setLinearLowerLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Bf(c, a);
    };
    eB.prototype.setLinearUpperLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Cf(c, a);
    };
    eB.prototype.setAngularLowerLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Df(c, a);
    };
    eB.prototype.setAngularUpperLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ef(c, a);
    };
    eB.prototype.getFrameOffsetA = function () {
      return k(Ff(this.hy), r);
    };
    eB.prototype.enableFeedback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Gf(c, a);
    };
    eB.prototype.getBreakingImpulseThreshold = function () {
      return Hf(this.hy);
    };
    eB.prototype.setBreakingImpulseThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      If(c, a);
    };
    eB.prototype.getParam = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return Jf(d, a, c);
    };
    eB.prototype.setParam = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Kf(e, a, c, d);
    };
    eB.prototype.__destroy__ = function () {
      Lf(this.hy);
    };
    function fB() {
      throw "cannot construct a btStridingMeshInterface, no constructor in IDL";
    }
    fB.prototype = Object.create(f.prototype);
    fB.prototype.constructor = fB;
    fB.prototype.iy = fB;
    fB.jy = {};
    b.btStridingMeshInterface = fB;
    fB.prototype.setScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Mf(c, a);
    };
    fB.prototype.__destroy__ = function () {
      Nf(this.hy);
    };
    function gB() {
      throw "cannot construct a btMotionState, no constructor in IDL";
    }
    gB.prototype = Object.create(f.prototype);
    gB.prototype.constructor = gB;
    gB.prototype.iy = gB;
    gB.jy = {};
    b.btMotionState = gB;
    gB.prototype.getWorldTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Of(c, a);
    };
    gB.prototype.setWorldTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pf(c, a);
    };
    gB.prototype.__destroy__ = function () {
      Qf(this.hy);
    };
    function y() {
      throw "cannot construct a ConvexResultCallback, no constructor in IDL";
    }
    y.prototype = Object.create(f.prototype);
    y.prototype.constructor = y;
    y.prototype.iy = y;
    y.jy = {};
    b.ConvexResultCallback = y;
    y.prototype.hasHit = function () {
      return !!Rf(this.hy);
    };
    y.prototype.get_m_collisionFilterGroup = y.prototype.ky = function () {
      return Sf(this.hy);
    };
    y.prototype.set_m_collisionFilterGroup = y.prototype.my = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Tf(c, a);
    };
    Object.defineProperty(y.prototype, "m_collisionFilterGroup", {
      get: y.prototype.ky,
      set: y.prototype.my,
    });
    y.prototype.get_m_collisionFilterMask = y.prototype.ly = function () {
      return Uf(this.hy);
    };
    y.prototype.set_m_collisionFilterMask = y.prototype.ny = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Vf(c, a);
    };
    Object.defineProperty(y.prototype, "m_collisionFilterMask", {
      get: y.prototype.ly,
      set: y.prototype.ny,
    });
    y.prototype.get_m_closestHitFraction = y.prototype.oy = function () {
      return Wf(this.hy);
    };
    y.prototype.set_m_closestHitFraction = y.prototype.py = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Xf(c, a);
    };
    Object.defineProperty(y.prototype, "m_closestHitFraction", {
      get: y.prototype.oy,
      set: y.prototype.py,
    });
    y.prototype.__destroy__ = function () {
      Yf(this.hy);
    };
    function hB() {
      throw "cannot construct a ContactResultCallback, no constructor in IDL";
    }
    hB.prototype = Object.create(f.prototype);
    hB.prototype.constructor = hB;
    hB.prototype.iy = hB;
    hB.jy = {};
    b.ContactResultCallback = hB;
    hB.prototype.addSingleResult = function (a, c, d, e, g, n, F) {
      var aa = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      n && "object" === typeof n && (n = n.hy);
      F && "object" === typeof F && (F = F.hy);
      return Zf(aa, a, c, d, e, g, n, F);
    };
    hB.prototype.__destroy__ = function () {
      $f(this.hy);
    };
    function iB() {
      throw "cannot construct a btSoftBodySolver, no constructor in IDL";
    }
    iB.prototype = Object.create(f.prototype);
    iB.prototype.constructor = iB;
    iB.prototype.iy = iB;
    iB.jy = {};
    b.btSoftBodySolver = iB;
    iB.prototype.__destroy__ = function () {
      ag(this.hy);
    };
    function z() {
      throw "cannot construct a RayResultCallback, no constructor in IDL";
    }
    z.prototype = Object.create(f.prototype);
    z.prototype.constructor = z;
    z.prototype.iy = z;
    z.jy = {};
    b.RayResultCallback = z;
    z.prototype.hasHit = function () {
      return !!bg(this.hy);
    };
    z.prototype.get_m_collisionFilterGroup = z.prototype.ky = function () {
      return cg(this.hy);
    };
    z.prototype.set_m_collisionFilterGroup = z.prototype.my = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      dg(c, a);
    };
    Object.defineProperty(z.prototype, "m_collisionFilterGroup", {
      get: z.prototype.ky,
      set: z.prototype.my,
    });
    z.prototype.get_m_collisionFilterMask = z.prototype.ly = function () {
      return eg(this.hy);
    };
    z.prototype.set_m_collisionFilterMask = z.prototype.ny = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      fg(c, a);
    };
    Object.defineProperty(z.prototype, "m_collisionFilterMask", {
      get: z.prototype.ly,
      set: z.prototype.ny,
    });
    z.prototype.get_m_closestHitFraction = z.prototype.oy = function () {
      return gg(this.hy);
    };
    z.prototype.set_m_closestHitFraction = z.prototype.py = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      hg(c, a);
    };
    Object.defineProperty(z.prototype, "m_closestHitFraction", {
      get: z.prototype.oy,
      set: z.prototype.py,
    });
    z.prototype.get_m_collisionObject = z.prototype.qy = function () {
      return k(ig(this.hy), q);
    };
    z.prototype.set_m_collisionObject = z.prototype.xy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      jg(c, a);
    };
    Object.defineProperty(z.prototype, "m_collisionObject", {
      get: z.prototype.qy,
      set: z.prototype.xy,
    });
    z.prototype.__destroy__ = function () {
      kg(this.hy);
    };
    function jB() {
      throw "cannot construct a btMatrix3x3, no constructor in IDL";
    }
    jB.prototype = Object.create(f.prototype);
    jB.prototype.constructor = jB;
    jB.prototype.iy = jB;
    jB.jy = {};
    b.btMatrix3x3 = jB;
    jB.prototype.setEulerZYX = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      lg(e, a, c, d);
    };
    jB.prototype.getRotation = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      mg(c, a);
    };
    jB.prototype.getRow = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(ng(c, a), p);
    };
    jB.prototype.__destroy__ = function () {
      og(this.hy);
    };
    function kB() {
      throw "cannot construct a btScalarArray, no constructor in IDL";
    }
    kB.prototype = Object.create(f.prototype);
    kB.prototype.constructor = kB;
    kB.prototype.iy = kB;
    kB.jy = {};
    b.btScalarArray = kB;
    kB.prototype.size = kB.prototype.size = function () {
      return pg(this.hy);
    };
    kB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return qg(c, a);
    };
    kB.prototype.__destroy__ = function () {
      rg(this.hy);
    };
    function A() {
      throw "cannot construct a Material, no constructor in IDL";
    }
    A.prototype = Object.create(f.prototype);
    A.prototype.constructor = A;
    A.prototype.iy = A;
    A.jy = {};
    b.Material = A;
    A.prototype.get_m_kLST = A.prototype.vA = function () {
      return sg(this.hy);
    };
    A.prototype.set_m_kLST = A.prototype.bD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      tg(c, a);
    };
    Object.defineProperty(A.prototype, "m_kLST", {
      get: A.prototype.vA,
      set: A.prototype.bD,
    });
    A.prototype.get_m_kAST = A.prototype.uA = function () {
      return ug(this.hy);
    };
    A.prototype.set_m_kAST = A.prototype.aD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      vg(c, a);
    };
    Object.defineProperty(A.prototype, "m_kAST", {
      get: A.prototype.uA,
      set: A.prototype.aD,
    });
    A.prototype.get_m_kVST = A.prototype.wA = function () {
      return wg(this.hy);
    };
    A.prototype.set_m_kVST = A.prototype.cD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      xg(c, a);
    };
    Object.defineProperty(A.prototype, "m_kVST", {
      get: A.prototype.wA,
      set: A.prototype.cD,
    });
    A.prototype.get_m_flags = A.prototype.cA = function () {
      return yg(this.hy);
    };
    A.prototype.set_m_flags = A.prototype.JC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      zg(c, a);
    };
    Object.defineProperty(A.prototype, "m_flags", {
      get: A.prototype.cA,
      set: A.prototype.JC,
    });
    A.prototype.__destroy__ = function () {
      Ag(this.hy);
    };
    function l() {
      throw "cannot construct a btDispatcherInfo, no constructor in IDL";
    }
    l.prototype = Object.create(f.prototype);
    l.prototype.constructor = l;
    l.prototype.iy = l;
    l.jy = {};
    b.btDispatcherInfo = l;
    l.prototype.get_m_timeStep = l.prototype.jB = function () {
      return Bg(this.hy);
    };
    l.prototype.set_m_timeStep = l.prototype.QD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Cg(c, a);
    };
    Object.defineProperty(l.prototype, "m_timeStep", {
      get: l.prototype.jB,
      set: l.prototype.QD,
    });
    l.prototype.get_m_stepCount = l.prototype.aB = function () {
      return Dg(this.hy);
    };
    l.prototype.set_m_stepCount = l.prototype.HD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Eg(c, a);
    };
    Object.defineProperty(l.prototype, "m_stepCount", {
      get: l.prototype.aB,
      set: l.prototype.HD,
    });
    l.prototype.get_m_dispatchFunc = l.prototype.Wz = function () {
      return Fg(this.hy);
    };
    l.prototype.set_m_dispatchFunc = l.prototype.CC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Gg(c, a);
    };
    Object.defineProperty(l.prototype, "m_dispatchFunc", {
      get: l.prototype.Wz,
      set: l.prototype.CC,
    });
    l.prototype.get_m_timeOfImpact = l.prototype.iB = function () {
      return Hg(this.hy);
    };
    l.prototype.set_m_timeOfImpact = l.prototype.PD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ig(c, a);
    };
    Object.defineProperty(l.prototype, "m_timeOfImpact", {
      get: l.prototype.iB,
      set: l.prototype.PD,
    });
    l.prototype.get_m_useContinuous = l.prototype.lB = function () {
      return !!Jg(this.hy);
    };
    l.prototype.set_m_useContinuous = l.prototype.SD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Kg(c, a);
    };
    Object.defineProperty(l.prototype, "m_useContinuous", {
      get: l.prototype.lB,
      set: l.prototype.SD,
    });
    l.prototype.get_m_enableSatConvex = l.prototype.$z = function () {
      return !!Lg(this.hy);
    };
    l.prototype.set_m_enableSatConvex = l.prototype.GC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Mg(c, a);
    };
    Object.defineProperty(l.prototype, "m_enableSatConvex", {
      get: l.prototype.$z,
      set: l.prototype.GC,
    });
    l.prototype.get_m_enableSPU = l.prototype.Zz = function () {
      return !!Ng(this.hy);
    };
    l.prototype.set_m_enableSPU = l.prototype.FC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Og(c, a);
    };
    Object.defineProperty(l.prototype, "m_enableSPU", {
      get: l.prototype.Zz,
      set: l.prototype.FC,
    });
    l.prototype.get_m_useEpa = l.prototype.nB = function () {
      return !!Pg(this.hy);
    };
    l.prototype.set_m_useEpa = l.prototype.UD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Qg(c, a);
    };
    Object.defineProperty(l.prototype, "m_useEpa", {
      get: l.prototype.nB,
      set: l.prototype.UD,
    });
    l.prototype.get_m_allowedCcdPenetration = l.prototype.zz = function () {
      return Rg(this.hy);
    };
    l.prototype.set_m_allowedCcdPenetration = l.prototype.fC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Sg(c, a);
    };
    Object.defineProperty(l.prototype, "m_allowedCcdPenetration", {
      get: l.prototype.zz,
      set: l.prototype.fC,
    });
    l.prototype.get_m_useConvexConservativeDistanceUtil = l.prototype.mB = function () {
      return !!Tg(this.hy);
    };
    l.prototype.set_m_useConvexConservativeDistanceUtil = l.prototype.TD = function (
      a
    ) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ug(c, a);
    };
    Object.defineProperty(l.prototype, "m_useConvexConservativeDistanceUtil", {
      get: l.prototype.mB,
      set: l.prototype.TD,
    });
    l.prototype.get_m_convexConservativeDistanceThreshold = l.prototype.Rz = function () {
      return Vg(this.hy);
    };
    l.prototype.set_m_convexConservativeDistanceThreshold = l.prototype.xC = function (
      a
    ) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wg(c, a);
    };
    Object.defineProperty(
      l.prototype,
      "m_convexConservativeDistanceThreshold",
      { get: l.prototype.Rz, set: l.prototype.xC }
    );
    l.prototype.__destroy__ = function () {
      Xg(this.hy);
    };
    function B() {
      throw "cannot construct a btWheelInfoConstructionInfo, no constructor in IDL";
    }
    B.prototype = Object.create(f.prototype);
    B.prototype.constructor = B;
    B.prototype.iy = B;
    B.jy = {};
    b.btWheelInfoConstructionInfo = B;
    B.prototype.get_m_chassisConnectionCS = B.prototype.Lz = function () {
      return k(Yg(this.hy), p);
    };
    B.prototype.set_m_chassisConnectionCS = B.prototype.rC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Zg(c, a);
    };
    Object.defineProperty(B.prototype, "m_chassisConnectionCS", {
      get: B.prototype.Lz,
      set: B.prototype.rC,
    });
    B.prototype.get_m_wheelDirectionCS = B.prototype.Ly = function () {
      return k($g(this.hy), p);
    };
    B.prototype.set_m_wheelDirectionCS = B.prototype.Uy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ah(c, a);
    };
    Object.defineProperty(B.prototype, "m_wheelDirectionCS", {
      get: B.prototype.Ly,
      set: B.prototype.Uy,
    });
    B.prototype.get_m_wheelAxleCS = B.prototype.Ky = function () {
      return k(bh(this.hy), p);
    };
    B.prototype.set_m_wheelAxleCS = B.prototype.Ty = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ch(c, a);
    };
    Object.defineProperty(B.prototype, "m_wheelAxleCS", {
      get: B.prototype.Ky,
      set: B.prototype.Ty,
    });
    B.prototype.get_m_suspensionRestLength = B.prototype.fB = function () {
      return dh(this.hy);
    };
    B.prototype.set_m_suspensionRestLength = B.prototype.MD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      eh(c, a);
    };
    Object.defineProperty(B.prototype, "m_suspensionRestLength", {
      get: B.prototype.fB,
      set: B.prototype.MD,
    });
    B.prototype.get_m_maxSuspensionTravelCm = B.prototype.vy = function () {
      return fh(this.hy);
    };
    B.prototype.set_m_maxSuspensionTravelCm = B.prototype.Cy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      gh(c, a);
    };
    Object.defineProperty(B.prototype, "m_maxSuspensionTravelCm", {
      get: B.prototype.vy,
      set: B.prototype.Cy,
    });
    B.prototype.get_m_wheelRadius = B.prototype.tB = function () {
      return hh(this.hy);
    };
    B.prototype.set_m_wheelRadius = B.prototype.$D = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ih(c, a);
    };
    Object.defineProperty(B.prototype, "m_wheelRadius", {
      get: B.prototype.tB,
      set: B.prototype.$D,
    });
    B.prototype.get_m_suspensionStiffness = B.prototype.wy = function () {
      return jh(this.hy);
    };
    B.prototype.set_m_suspensionStiffness = B.prototype.Dy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      kh(c, a);
    };
    Object.defineProperty(B.prototype, "m_suspensionStiffness", {
      get: B.prototype.wy,
      set: B.prototype.Dy,
    });
    B.prototype.get_m_wheelsDampingCompression = B.prototype.My = function () {
      return lh(this.hy);
    };
    B.prototype.set_m_wheelsDampingCompression = B.prototype.Vy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      mh(c, a);
    };
    Object.defineProperty(B.prototype, "m_wheelsDampingCompression", {
      get: B.prototype.My,
      set: B.prototype.Vy,
    });
    B.prototype.get_m_wheelsDampingRelaxation = B.prototype.Ny = function () {
      return nh(this.hy);
    };
    B.prototype.set_m_wheelsDampingRelaxation = B.prototype.Wy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      oh(c, a);
    };
    Object.defineProperty(B.prototype, "m_wheelsDampingRelaxation", {
      get: B.prototype.Ny,
      set: B.prototype.Wy,
    });
    B.prototype.get_m_frictionSlip = B.prototype.ry = function () {
      return ph(this.hy);
    };
    B.prototype.set_m_frictionSlip = B.prototype.yy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      qh(c, a);
    };
    Object.defineProperty(B.prototype, "m_frictionSlip", {
      get: B.prototype.ry,
      set: B.prototype.yy,
    });
    B.prototype.get_m_maxSuspensionForce = B.prototype.uy = function () {
      return rh(this.hy);
    };
    B.prototype.set_m_maxSuspensionForce = B.prototype.By = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      sh(c, a);
    };
    Object.defineProperty(B.prototype, "m_maxSuspensionForce", {
      get: B.prototype.uy,
      set: B.prototype.By,
    });
    B.prototype.get_m_bIsFrontWheel = B.prototype.Fy = function () {
      return !!th(this.hy);
    };
    B.prototype.set_m_bIsFrontWheel = B.prototype.Oy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      uh(c, a);
    };
    Object.defineProperty(B.prototype, "m_bIsFrontWheel", {
      get: B.prototype.Fy,
      set: B.prototype.Oy,
    });
    B.prototype.__destroy__ = function () {
      vh(this.hy);
    };
    function lB(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = void 0 === c ? wh(a) : xh(a, c);
      h(lB)[this.hy] = this;
    }
    lB.prototype = Object.create(cB.prototype);
    lB.prototype.constructor = lB;
    lB.prototype.iy = lB;
    lB.jy = {};
    b.btConvexTriangleMeshShape = lB;
    lB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yh(c, a);
    };
    lB.prototype.getLocalScaling = function () {
      return k(zh(this.hy), p);
    };
    lB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Ah(d, a, c);
    };
    lB.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Bh(c, a);
    };
    lB.prototype.getMargin = function () {
      return Ch(this.hy);
    };
    lB.prototype.__destroy__ = function () {
      Dh(this.hy);
    };
    function QA() {
      throw "cannot construct a btBroadphaseInterface, no constructor in IDL";
    }
    QA.prototype = Object.create(f.prototype);
    QA.prototype.constructor = QA;
    QA.prototype.iy = QA;
    QA.jy = {};
    b.btBroadphaseInterface = QA;
    QA.prototype.getOverlappingPairCache = function () {
      return k(Eh(this.hy), PA);
    };
    QA.prototype.__destroy__ = function () {
      Fh(this.hy);
    };
    function C(a, c, d, e) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      this.hy = void 0 === e ? Gh(a, c, d) : Hh(a, c, d, e);
      h(C)[this.hy] = this;
    }
    C.prototype = Object.create(f.prototype);
    C.prototype.constructor = C;
    C.prototype.iy = C;
    C.jy = {};
    b.btRigidBodyConstructionInfo = C;
    C.prototype.get_m_linearDamping = C.prototype.xA = function () {
      return Ih(this.hy);
    };
    C.prototype.set_m_linearDamping = C.prototype.dD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Jh(c, a);
    };
    Object.defineProperty(C.prototype, "m_linearDamping", {
      get: C.prototype.xA,
      set: C.prototype.dD,
    });
    C.prototype.get_m_angularDamping = C.prototype.Bz = function () {
      return Kh(this.hy);
    };
    C.prototype.set_m_angularDamping = C.prototype.hC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Lh(c, a);
    };
    Object.defineProperty(C.prototype, "m_angularDamping", {
      get: C.prototype.Bz,
      set: C.prototype.hC,
    });
    C.prototype.get_m_friction = C.prototype.dA = function () {
      return Mh(this.hy);
    };
    C.prototype.set_m_friction = C.prototype.KC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Nh(c, a);
    };
    Object.defineProperty(C.prototype, "m_friction", {
      get: C.prototype.dA,
      set: C.prototype.KC,
    });
    C.prototype.get_m_rollingFriction = C.prototype.TA = function () {
      return Oh(this.hy);
    };
    C.prototype.set_m_rollingFriction = C.prototype.zD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ph(c, a);
    };
    Object.defineProperty(C.prototype, "m_rollingFriction", {
      get: C.prototype.TA,
      set: C.prototype.zD,
    });
    C.prototype.get_m_restitution = C.prototype.RA = function () {
      return Qh(this.hy);
    };
    C.prototype.set_m_restitution = C.prototype.xD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Rh(c, a);
    };
    Object.defineProperty(C.prototype, "m_restitution", {
      get: C.prototype.RA,
      set: C.prototype.xD,
    });
    C.prototype.get_m_linearSleepingThreshold = C.prototype.yA = function () {
      return Sh(this.hy);
    };
    C.prototype.set_m_linearSleepingThreshold = C.prototype.eD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Th(c, a);
    };
    Object.defineProperty(C.prototype, "m_linearSleepingThreshold", {
      get: C.prototype.yA,
      set: C.prototype.eD,
    });
    C.prototype.get_m_angularSleepingThreshold = C.prototype.Cz = function () {
      return Uh(this.hy);
    };
    C.prototype.set_m_angularSleepingThreshold = C.prototype.iC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Vh(c, a);
    };
    Object.defineProperty(C.prototype, "m_angularSleepingThreshold", {
      get: C.prototype.Cz,
      set: C.prototype.iC,
    });
    C.prototype.get_m_additionalDamping = C.prototype.wz = function () {
      return !!Wh(this.hy);
    };
    C.prototype.set_m_additionalDamping = C.prototype.cC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Xh(c, a);
    };
    Object.defineProperty(C.prototype, "m_additionalDamping", {
      get: C.prototype.wz,
      set: C.prototype.cC,
    });
    C.prototype.get_m_additionalDampingFactor = C.prototype.xz = function () {
      return Yh(this.hy);
    };
    C.prototype.set_m_additionalDampingFactor = C.prototype.dC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Zh(c, a);
    };
    Object.defineProperty(C.prototype, "m_additionalDampingFactor", {
      get: C.prototype.xz,
      set: C.prototype.dC,
    });
    C.prototype.get_m_additionalLinearDampingThresholdSqr = C.prototype.yz = function () {
      return $h(this.hy);
    };
    C.prototype.set_m_additionalLinearDampingThresholdSqr = C.prototype.eC = function (
      a
    ) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ai(c, a);
    };
    Object.defineProperty(
      C.prototype,
      "m_additionalLinearDampingThresholdSqr",
      { get: C.prototype.yz, set: C.prototype.eC }
    );
    C.prototype.get_m_additionalAngularDampingThresholdSqr = C.prototype.vz = function () {
      return bi(this.hy);
    };
    C.prototype.set_m_additionalAngularDampingThresholdSqr = C.prototype.bC = function (
      a
    ) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ci(c, a);
    };
    Object.defineProperty(
      C.prototype,
      "m_additionalAngularDampingThresholdSqr",
      { get: C.prototype.vz, set: C.prototype.bC }
    );
    C.prototype.get_m_additionalAngularDampingFactor = C.prototype.uz = function () {
      return di(this.hy);
    };
    C.prototype.set_m_additionalAngularDampingFactor = C.prototype.aC = function (
      a
    ) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ei(c, a);
    };
    Object.defineProperty(C.prototype, "m_additionalAngularDampingFactor", {
      get: C.prototype.uz,
      set: C.prototype.aC,
    });
    C.prototype.__destroy__ = function () {
      fi(this.hy);
    };
    function mB() {
      throw "cannot construct a btCollisionConfiguration, no constructor in IDL";
    }
    mB.prototype = Object.create(f.prototype);
    mB.prototype.constructor = mB;
    mB.prototype.iy = mB;
    mB.jy = {};
    b.btCollisionConfiguration = mB;
    mB.prototype.__destroy__ = function () {
      gi(this.hy);
    };
    function dB() {
      this.hy = hi();
      h(dB)[this.hy] = this;
    }
    dB.prototype = Object.create(f.prototype);
    dB.prototype.constructor = dB;
    dB.prototype.iy = dB;
    dB.jy = {};
    b.btPersistentManifold = dB;
    dB.prototype.getBody0 = function () {
      return k(ii(this.hy), q);
    };
    dB.prototype.getBody1 = function () {
      return k(ji(this.hy), q);
    };
    dB.prototype.getNumContacts = function () {
      return ki(this.hy);
    };
    dB.prototype.getContactPoint = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(li(c, a), D);
    };
    dB.prototype.__destroy__ = function () {
      mi(this.hy);
    };
    function nB(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = void 0 === a ? ni() : oi(a);
      h(nB)[this.hy] = this;
    }
    nB.prototype = Object.create(m.prototype);
    nB.prototype.constructor = nB;
    nB.prototype.iy = nB;
    nB.jy = {};
    b.btCompoundShape = nB;
    nB.prototype.addChildShape = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      pi(d, a, c);
    };
    nB.prototype.removeChildShape = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      qi(c, a);
    };
    nB.prototype.removeChildShapeByIndex = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ri(c, a);
    };
    nB.prototype.getNumChildShapes = function () {
      return si(this.hy);
    };
    nB.prototype.getChildShape = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(ti(c, a), m);
    };
    nB.prototype.updateChildTransform = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === d ? ui(e, a, c) : vi(e, a, c, d);
    };
    nB.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      wi(c, a);
    };
    nB.prototype.getMargin = function () {
      return xi(this.hy);
    };
    nB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yi(c, a);
    };
    nB.prototype.getLocalScaling = function () {
      return k(zi(this.hy), p);
    };
    nB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Ai(d, a, c);
    };
    nB.prototype.__destroy__ = function () {
      Bi(this.hy);
    };
    function E(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = Ci(a, c);
      h(E)[this.hy] = this;
    }
    E.prototype = Object.create(y.prototype);
    E.prototype.constructor = E;
    E.prototype.iy = E;
    E.jy = {};
    b.ClosestConvexResultCallback = E;
    E.prototype.hasHit = function () {
      return !!Di(this.hy);
    };
    E.prototype.get_m_convexFromWorld = E.prototype.Sz = function () {
      return k(Ei(this.hy), p);
    };
    E.prototype.set_m_convexFromWorld = E.prototype.yC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Fi(c, a);
    };
    Object.defineProperty(E.prototype, "m_convexFromWorld", {
      get: E.prototype.Sz,
      set: E.prototype.yC,
    });
    E.prototype.get_m_convexToWorld = E.prototype.Tz = function () {
      return k(Gi(this.hy), p);
    };
    E.prototype.set_m_convexToWorld = E.prototype.zC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Hi(c, a);
    };
    Object.defineProperty(E.prototype, "m_convexToWorld", {
      get: E.prototype.Tz,
      set: E.prototype.zC,
    });
    E.prototype.get_m_hitNormalWorld = E.prototype.sy = function () {
      return k(Ii(this.hy), p);
    };
    E.prototype.set_m_hitNormalWorld = E.prototype.zy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ji(c, a);
    };
    Object.defineProperty(E.prototype, "m_hitNormalWorld", {
      get: E.prototype.sy,
      set: E.prototype.zy,
    });
    E.prototype.get_m_hitPointWorld = E.prototype.ty = function () {
      return k(Ki(this.hy), p);
    };
    E.prototype.set_m_hitPointWorld = E.prototype.Ay = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Li(c, a);
    };
    Object.defineProperty(E.prototype, "m_hitPointWorld", {
      get: E.prototype.ty,
      set: E.prototype.Ay,
    });
    E.prototype.get_m_collisionFilterGroup = E.prototype.ky = function () {
      return Mi(this.hy);
    };
    E.prototype.set_m_collisionFilterGroup = E.prototype.my = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ni(c, a);
    };
    Object.defineProperty(E.prototype, "m_collisionFilterGroup", {
      get: E.prototype.ky,
      set: E.prototype.my,
    });
    E.prototype.get_m_collisionFilterMask = E.prototype.ly = function () {
      return Oi(this.hy);
    };
    E.prototype.set_m_collisionFilterMask = E.prototype.ny = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pi(c, a);
    };
    Object.defineProperty(E.prototype, "m_collisionFilterMask", {
      get: E.prototype.ly,
      set: E.prototype.ny,
    });
    E.prototype.get_m_closestHitFraction = E.prototype.oy = function () {
      return Qi(this.hy);
    };
    E.prototype.set_m_closestHitFraction = E.prototype.py = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ri(c, a);
    };
    Object.defineProperty(E.prototype, "m_closestHitFraction", {
      get: E.prototype.oy,
      set: E.prototype.py,
    });
    E.prototype.__destroy__ = function () {
      Si(this.hy);
    };
    function G(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = Ti(a, c);
      h(G)[this.hy] = this;
    }
    G.prototype = Object.create(z.prototype);
    G.prototype.constructor = G;
    G.prototype.iy = G;
    G.jy = {};
    b.AllHitsRayResultCallback = G;
    G.prototype.hasHit = function () {
      return !!Ui(this.hy);
    };
    G.prototype.get_m_collisionObjects = G.prototype.Oz = function () {
      return k(Vi(this.hy), oB);
    };
    G.prototype.set_m_collisionObjects = G.prototype.uC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wi(c, a);
    };
    Object.defineProperty(G.prototype, "m_collisionObjects", {
      get: G.prototype.Oz,
      set: G.prototype.uC,
    });
    G.prototype.get_m_rayFromWorld = G.prototype.Iy = function () {
      return k(Xi(this.hy), p);
    };
    G.prototype.set_m_rayFromWorld = G.prototype.Ry = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Yi(c, a);
    };
    Object.defineProperty(G.prototype, "m_rayFromWorld", {
      get: G.prototype.Iy,
      set: G.prototype.Ry,
    });
    G.prototype.get_m_rayToWorld = G.prototype.Jy = function () {
      return k(Zi(this.hy), p);
    };
    G.prototype.set_m_rayToWorld = G.prototype.Sy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      $i(c, a);
    };
    Object.defineProperty(G.prototype, "m_rayToWorld", {
      get: G.prototype.Jy,
      set: G.prototype.Sy,
    });
    G.prototype.get_m_hitNormalWorld = G.prototype.sy = function () {
      return k(aj(this.hy), pB);
    };
    G.prototype.set_m_hitNormalWorld = G.prototype.zy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      bj(c, a);
    };
    Object.defineProperty(G.prototype, "m_hitNormalWorld", {
      get: G.prototype.sy,
      set: G.prototype.zy,
    });
    G.prototype.get_m_hitPointWorld = G.prototype.ty = function () {
      return k(cj(this.hy), pB);
    };
    G.prototype.set_m_hitPointWorld = G.prototype.Ay = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      dj(c, a);
    };
    Object.defineProperty(G.prototype, "m_hitPointWorld", {
      get: G.prototype.ty,
      set: G.prototype.Ay,
    });
    G.prototype.get_m_hitFractions = G.prototype.kA = function () {
      return k(ej(this.hy), kB);
    };
    G.prototype.set_m_hitFractions = G.prototype.RC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      fj(c, a);
    };
    Object.defineProperty(G.prototype, "m_hitFractions", {
      get: G.prototype.kA,
      set: G.prototype.RC,
    });
    G.prototype.get_m_collisionFilterGroup = G.prototype.ky = function () {
      return gj(this.hy);
    };
    G.prototype.set_m_collisionFilterGroup = G.prototype.my = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      hj(c, a);
    };
    Object.defineProperty(G.prototype, "m_collisionFilterGroup", {
      get: G.prototype.ky,
      set: G.prototype.my,
    });
    G.prototype.get_m_collisionFilterMask = G.prototype.ly = function () {
      return ij(this.hy);
    };
    G.prototype.set_m_collisionFilterMask = G.prototype.ny = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      jj(c, a);
    };
    Object.defineProperty(G.prototype, "m_collisionFilterMask", {
      get: G.prototype.ly,
      set: G.prototype.ny,
    });
    G.prototype.get_m_closestHitFraction = G.prototype.oy = function () {
      return kj(this.hy);
    };
    G.prototype.set_m_closestHitFraction = G.prototype.py = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      lj(c, a);
    };
    Object.defineProperty(G.prototype, "m_closestHitFraction", {
      get: G.prototype.oy,
      set: G.prototype.py,
    });
    G.prototype.get_m_collisionObject = G.prototype.qy = function () {
      return k(mj(this.hy), q);
    };
    G.prototype.set_m_collisionObject = G.prototype.xy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      nj(c, a);
    };
    Object.defineProperty(G.prototype, "m_collisionObject", {
      get: G.prototype.qy,
      set: G.prototype.xy,
    });
    G.prototype.__destroy__ = function () {
      oj(this.hy);
    };
    function qB() {
      throw "cannot construct a tMaterialArray, no constructor in IDL";
    }
    qB.prototype = Object.create(f.prototype);
    qB.prototype.constructor = qB;
    qB.prototype.iy = qB;
    qB.jy = {};
    b.tMaterialArray = qB;
    qB.prototype.size = qB.prototype.size = function () {
      return pj(this.hy);
    };
    qB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(qj(c, a), A);
    };
    qB.prototype.__destroy__ = function () {
      rj(this.hy);
    };
    function rB(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = sj(a);
      h(rB)[this.hy] = this;
    }
    rB.prototype = Object.create($A.prototype);
    rB.prototype.constructor = rB;
    rB.prototype.iy = rB;
    rB.jy = {};
    b.btDefaultVehicleRaycaster = rB;
    rB.prototype.castRay = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      tj(e, a, c, d);
    };
    rB.prototype.__destroy__ = function () {
      uj(this.hy);
    };
    function sB() {
      this.hy = vj();
      h(sB)[this.hy] = this;
    }
    sB.prototype = Object.create(UA.prototype);
    sB.prototype.constructor = sB;
    sB.prototype.iy = sB;
    sB.jy = {};
    b.btEmptyShape = sB;
    sB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      wj(c, a);
    };
    sB.prototype.getLocalScaling = function () {
      return k(xj(this.hy), p);
    };
    sB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      yj(d, a, c);
    };
    sB.prototype.__destroy__ = function () {
      zj(this.hy);
    };
    function H() {
      this.hy = Aj();
      h(H)[this.hy] = this;
    }
    H.prototype = Object.create(f.prototype);
    H.prototype.constructor = H;
    H.prototype.iy = H;
    H.jy = {};
    b.btConstraintSetting = H;
    H.prototype.get_m_tau = H.prototype.hB = function () {
      return Bj(this.hy);
    };
    H.prototype.set_m_tau = H.prototype.OD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Cj(c, a);
    };
    Object.defineProperty(H.prototype, "m_tau", {
      get: H.prototype.hB,
      set: H.prototype.OD,
    });
    H.prototype.get_m_damping = H.prototype.Uz = function () {
      return Dj(this.hy);
    };
    H.prototype.set_m_damping = H.prototype.AC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ej(c, a);
    };
    Object.defineProperty(H.prototype, "m_damping", {
      get: H.prototype.Uz,
      set: H.prototype.AC,
    });
    H.prototype.get_m_impulseClamp = H.prototype.qA = function () {
      return Fj(this.hy);
    };
    H.prototype.set_m_impulseClamp = H.prototype.XC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Gj(c, a);
    };
    Object.defineProperty(H.prototype, "m_impulseClamp", {
      get: H.prototype.qA,
      set: H.prototype.XC,
    });
    H.prototype.__destroy__ = function () {
      Hj(this.hy);
    };
    function tB() {
      throw "cannot construct a LocalShapeInfo, no constructor in IDL";
    }
    tB.prototype = Object.create(f.prototype);
    tB.prototype.constructor = tB;
    tB.prototype.iy = tB;
    tB.jy = {};
    b.LocalShapeInfo = tB;
    tB.prototype.get_m_shapePart = tB.prototype.WA = function () {
      return Ij(this.hy);
    };
    tB.prototype.set_m_shapePart = tB.prototype.CD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Jj(c, a);
    };
    Object.defineProperty(tB.prototype, "m_shapePart", {
      get: tB.prototype.WA,
      set: tB.prototype.CD,
    });
    tB.prototype.get_m_triangleIndex = tB.prototype.kB = function () {
      return Kj(this.hy);
    };
    tB.prototype.set_m_triangleIndex = tB.prototype.RD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Lj(c, a);
    };
    Object.defineProperty(tB.prototype, "m_triangleIndex", {
      get: tB.prototype.kB,
      set: tB.prototype.RD,
    });
    tB.prototype.__destroy__ = function () {
      Mj(this.hy);
    };
    function I(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = Nj(a);
      h(I)[this.hy] = this;
    }
    I.prototype = Object.create(q.prototype);
    I.prototype.constructor = I;
    I.prototype.iy = I;
    I.jy = {};
    b.btRigidBody = I;
    I.prototype.getCenterOfMassTransform = function () {
      return k(Oj(this.hy), r);
    };
    I.prototype.setCenterOfMassTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pj(c, a);
    };
    I.prototype.setSleepingThresholds = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Qj(d, a, c);
    };
    I.prototype.getLinearDamping = function () {
      return Rj(this.hy);
    };
    I.prototype.getAngularDamping = function () {
      return Sj(this.hy);
    };
    I.prototype.setDamping = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Tj(d, a, c);
    };
    I.prototype.setMassProps = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Uj(d, a, c);
    };
    I.prototype.getLinearFactor = function () {
      return k(Vj(this.hy), p);
    };
    I.prototype.setLinearFactor = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wj(c, a);
    };
    I.prototype.applyTorque = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Xj(c, a);
    };
    I.prototype.applyLocalTorque = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Yj(c, a);
    };
    I.prototype.applyForce = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Zj(d, a, c);
    };
    I.prototype.applyCentralForce = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ak(c, a);
    };
    I.prototype.applyCentralLocalForce = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      bk(c, a);
    };
    I.prototype.applyTorqueImpulse = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ck(c, a);
    };
    I.prototype.applyImpulse = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      dk(d, a, c);
    };
    I.prototype.applyCentralImpulse = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ek(c, a);
    };
    I.prototype.updateInertiaTensor = function () {
      fk(this.hy);
    };
    I.prototype.getLinearVelocity = function () {
      return k(gk(this.hy), p);
    };
    I.prototype.getAngularVelocity = function () {
      return k(hk(this.hy), p);
    };
    I.prototype.setLinearVelocity = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ik(c, a);
    };
    I.prototype.setAngularVelocity = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      jk(c, a);
    };
    I.prototype.getMotionState = function () {
      return k(kk(this.hy), gB);
    };
    I.prototype.setMotionState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      lk(c, a);
    };
    I.prototype.getAngularFactor = function () {
      return k(mk(this.hy), p);
    };
    I.prototype.setAngularFactor = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      nk(c, a);
    };
    I.prototype.upcast = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(ok(c, a), I);
    };
    I.prototype.getAabb = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      pk(d, a, c);
    };
    I.prototype.applyGravity = function () {
      qk(this.hy);
    };
    I.prototype.getGravity = function () {
      return k(rk(this.hy), p);
    };
    I.prototype.setGravity = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      sk(c, a);
    };
    I.prototype.getBroadphaseProxy = function () {
      return k(tk(this.hy), t);
    };
    I.prototype.clearForces = function () {
      uk(this.hy);
    };
    I.prototype.setAnisotropicFriction = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      vk(d, a, c);
    };
    I.prototype.getCollisionShape = function () {
      return k(wk(this.hy), m);
    };
    I.prototype.setContactProcessingThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      xk(c, a);
    };
    I.prototype.setActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yk(c, a);
    };
    I.prototype.forceActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      zk(c, a);
    };
    I.prototype.activate = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      void 0 === a ? Ak(c) : Bk(c, a);
    };
    I.prototype.isActive = function () {
      return !!Ck(this.hy);
    };
    I.prototype.isKinematicObject = function () {
      return !!Dk(this.hy);
    };
    I.prototype.isStaticObject = function () {
      return !!Ek(this.hy);
    };
    I.prototype.isStaticOrKinematicObject = function () {
      return !!Fk(this.hy);
    };
    I.prototype.getRestitution = function () {
      return Gk(this.hy);
    };
    I.prototype.getFriction = function () {
      return Hk(this.hy);
    };
    I.prototype.getRollingFriction = function () {
      return Ik(this.hy);
    };
    I.prototype.setRestitution = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Jk(c, a);
    };
    I.prototype.setFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Kk(c, a);
    };
    I.prototype.setRollingFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Lk(c, a);
    };
    I.prototype.getWorldTransform = function () {
      return k(Mk(this.hy), r);
    };
    I.prototype.getCollisionFlags = function () {
      return Nk(this.hy);
    };
    I.prototype.setCollisionFlags = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ok(c, a);
    };
    I.prototype.setWorldTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pk(c, a);
    };
    I.prototype.setCollisionShape = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Qk(c, a);
    };
    I.prototype.setCcdMotionThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Rk(c, a);
    };
    I.prototype.setCcdSweptSphereRadius = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Sk(c, a);
    };
    I.prototype.getUserIndex = function () {
      return Tk(this.hy);
    };
    I.prototype.setUserIndex = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Uk(c, a);
    };
    I.prototype.getUserPointer = function () {
      return k(Vk(this.hy), SA);
    };
    I.prototype.setUserPointer = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wk(c, a);
    };
    I.prototype.getBroadphaseHandle = function () {
      return k(Xk(this.hy), t);
    };
    I.prototype.__destroy__ = function () {
      Yk(this.hy);
    };
    function uB() {
      throw "cannot construct a btIndexedMeshArray, no constructor in IDL";
    }
    uB.prototype = Object.create(f.prototype);
    uB.prototype.constructor = uB;
    uB.prototype.iy = uB;
    uB.jy = {};
    b.btIndexedMeshArray = uB;
    uB.prototype.size = uB.prototype.size = function () {
      return Zk(this.hy);
    };
    uB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k($k(c, a), vB);
    };
    uB.prototype.__destroy__ = function () {
      al(this.hy);
    };
    function wB() {
      this.hy = bl();
      h(wB)[this.hy] = this;
    }
    wB.prototype = Object.create(f.prototype);
    wB.prototype.constructor = wB;
    wB.prototype.iy = wB;
    wB.jy = {};
    b.btDbvtBroadphase = wB;
    wB.prototype.__destroy__ = function () {
      cl(this.hy);
    };
    function xB(a, c, d, e, g, n, F, aa, ta) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      n && "object" === typeof n && (n = n.hy);
      F && "object" === typeof F && (F = F.hy);
      aa && "object" === typeof aa && (aa = aa.hy);
      ta && "object" === typeof ta && (ta = ta.hy);
      this.hy = dl(a, c, d, e, g, n, F, aa, ta);
      h(xB)[this.hy] = this;
    }
    xB.prototype = Object.create(UA.prototype);
    xB.prototype.constructor = xB;
    xB.prototype.iy = xB;
    xB.jy = {};
    b.btHeightfieldTerrainShape = xB;
    xB.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      el(c, a);
    };
    xB.prototype.getMargin = function () {
      return fl(this.hy);
    };
    xB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      gl(c, a);
    };
    xB.prototype.getLocalScaling = function () {
      return k(hl(this.hy), p);
    };
    xB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      il(d, a, c);
    };
    xB.prototype.__destroy__ = function () {
      jl(this.hy);
    };
    function yB() {
      this.hy = kl();
      h(yB)[this.hy] = this;
    }
    yB.prototype = Object.create(iB.prototype);
    yB.prototype.constructor = yB;
    yB.prototype.iy = yB;
    yB.jy = {};
    b.btDefaultSoftBodySolver = yB;
    yB.prototype.__destroy__ = function () {
      ll(this.hy);
    };
    function zB(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = ml(a);
      h(zB)[this.hy] = this;
    }
    zB.prototype = Object.create(OA.prototype);
    zB.prototype.constructor = zB;
    zB.prototype.iy = zB;
    zB.jy = {};
    b.btCollisionDispatcher = zB;
    zB.prototype.getNumManifolds = function () {
      return nl(this.hy);
    };
    zB.prototype.getManifoldByIndexInternal = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(ol(c, a), dB);
    };
    zB.prototype.__destroy__ = function () {
      pl(this.hy);
    };
    function AB(a, c, d, e, g) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      this.hy =
        void 0 === d
          ? ql(a, c)
          : void 0 === e
          ? rl(a, c, d)
          : void 0 === g
          ? sl(a, c, d, e)
          : tl(a, c, d, e, g);
      h(AB)[this.hy] = this;
    }
    AB.prototype = Object.create(f.prototype);
    AB.prototype.constructor = AB;
    AB.prototype.iy = AB;
    AB.jy = {};
    b.btAxisSweep3 = AB;
    AB.prototype.__destroy__ = function () {
      ul(this.hy);
    };
    function SA() {
      throw "cannot construct a VoidPtr, no constructor in IDL";
    }
    SA.prototype = Object.create(f.prototype);
    SA.prototype.constructor = SA;
    SA.prototype.iy = SA;
    SA.jy = {};
    b.VoidPtr = SA;
    SA.prototype.__destroy__ = function () {
      vl(this.hy);
    };
    function J() {
      this.hy = wl();
      h(J)[this.hy] = this;
    }
    J.prototype = Object.create(f.prototype);
    J.prototype.constructor = J;
    J.prototype.iy = J;
    J.jy = {};
    b.btSoftBodyWorldInfo = J;
    J.prototype.get_air_density = J.prototype.Yy = function () {
      return xl(this.hy);
    };
    J.prototype.set_air_density = J.prototype.FB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yl(c, a);
    };
    Object.defineProperty(J.prototype, "air_density", {
      get: J.prototype.Yy,
      set: J.prototype.FB,
    });
    J.prototype.get_water_density = J.prototype.CB = function () {
      return zl(this.hy);
    };
    J.prototype.set_water_density = J.prototype.iE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Al(c, a);
    };
    Object.defineProperty(J.prototype, "water_density", {
      get: J.prototype.CB,
      set: J.prototype.iE,
    });
    J.prototype.get_water_offset = J.prototype.EB = function () {
      return Bl(this.hy);
    };
    J.prototype.set_water_offset = J.prototype.kE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Cl(c, a);
    };
    Object.defineProperty(J.prototype, "water_offset", {
      get: J.prototype.EB,
      set: J.prototype.kE,
    });
    J.prototype.get_m_maxDisplacement = J.prototype.EA = function () {
      return Dl(this.hy);
    };
    J.prototype.set_m_maxDisplacement = J.prototype.kD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      El(c, a);
    };
    Object.defineProperty(J.prototype, "m_maxDisplacement", {
      get: J.prototype.EA,
      set: J.prototype.kD,
    });
    J.prototype.get_water_normal = J.prototype.DB = function () {
      return k(Fl(this.hy), p);
    };
    J.prototype.set_water_normal = J.prototype.jE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Gl(c, a);
    };
    Object.defineProperty(J.prototype, "water_normal", {
      get: J.prototype.DB,
      set: J.prototype.jE,
    });
    J.prototype.get_m_broadphase = J.prototype.Gz = function () {
      return k(Hl(this.hy), QA);
    };
    J.prototype.set_m_broadphase = J.prototype.mC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Il(c, a);
    };
    Object.defineProperty(J.prototype, "m_broadphase", {
      get: J.prototype.Gz,
      set: J.prototype.mC,
    });
    J.prototype.get_m_dispatcher = J.prototype.Xz = function () {
      return k(Jl(this.hy), OA);
    };
    J.prototype.set_m_dispatcher = J.prototype.DC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Kl(c, a);
    };
    Object.defineProperty(J.prototype, "m_dispatcher", {
      get: J.prototype.Xz,
      set: J.prototype.DC,
    });
    J.prototype.get_m_gravity = J.prototype.fA = function () {
      return k(Ll(this.hy), p);
    };
    J.prototype.set_m_gravity = J.prototype.MC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ml(c, a);
    };
    Object.defineProperty(J.prototype, "m_gravity", {
      get: J.prototype.fA,
      set: J.prototype.MC,
    });
    J.prototype.__destroy__ = function () {
      Nl(this.hy);
    };
    function BB(a, c, d, e) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      this.hy =
        void 0 === d
          ? Ol(a, c)
          : void 0 === e
          ? _emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_3(
              a,
              c,
              d
            )
          : Pl(a, c, d, e);
      h(BB)[this.hy] = this;
    }
    BB.prototype = Object.create(TA.prototype);
    BB.prototype.constructor = BB;
    BB.prototype.iy = BB;
    BB.jy = {};
    b.btConeTwistConstraint = BB;
    BB.prototype.setLimit = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Ql(d, a, c);
    };
    BB.prototype.setAngularOnly = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Rl(c, a);
    };
    BB.prototype.setDamping = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Sl(c, a);
    };
    BB.prototype.enableMotor = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Tl(c, a);
    };
    BB.prototype.setMaxMotorImpulse = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ul(c, a);
    };
    BB.prototype.setMaxMotorImpulseNormalized = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Vl(c, a);
    };
    BB.prototype.setMotorTarget = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wl(c, a);
    };
    BB.prototype.setMotorTargetInConstraintSpace = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Xl(c, a);
    };
    BB.prototype.enableFeedback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Yl(c, a);
    };
    BB.prototype.getBreakingImpulseThreshold = function () {
      return Zl(this.hy);
    };
    BB.prototype.setBreakingImpulseThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      $l(c, a);
    };
    BB.prototype.getParam = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return am(d, a, c);
    };
    BB.prototype.setParam = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      bm(e, a, c, d);
    };
    BB.prototype.__destroy__ = function () {
      cm(this.hy);
    };
    function CB(a, c, d, e, g, n, F) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      n && "object" === typeof n && (n = n.hy);
      F && "object" === typeof F && (F = F.hy);
      this.hy =
        void 0 === d
          ? dm(a, c)
          : void 0 === e
          ? em(a, c, d)
          : void 0 === g
          ? fm(a, c, d, e)
          : void 0 === n
          ? gm(a, c, d, e, g)
          : void 0 === F
          ? hm(a, c, d, e, g, n)
          : im(a, c, d, e, g, n, F);
      h(CB)[this.hy] = this;
    }
    CB.prototype = Object.create(TA.prototype);
    CB.prototype.constructor = CB;
    CB.prototype.iy = CB;
    CB.jy = {};
    b.btHingeConstraint = CB;
    CB.prototype.setLimit = function (a, c, d, e, g) {
      var n = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      void 0 === g ? jm(n, a, c, d, e) : km(n, a, c, d, e, g);
    };
    CB.prototype.enableAngularMotor = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      lm(e, a, c, d);
    };
    CB.prototype.setAngularOnly = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      mm(c, a);
    };
    CB.prototype.enableMotor = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      nm(c, a);
    };
    CB.prototype.setMaxMotorImpulse = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      om(c, a);
    };
    CB.prototype.setMotorTarget = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      pm(d, a, c);
    };
    CB.prototype.enableFeedback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      qm(c, a);
    };
    CB.prototype.getBreakingImpulseThreshold = function () {
      return rm(this.hy);
    };
    CB.prototype.setBreakingImpulseThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      sm(c, a);
    };
    CB.prototype.getParam = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return tm(d, a, c);
    };
    CB.prototype.setParam = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      um(e, a, c, d);
    };
    CB.prototype.__destroy__ = function () {
      wm(this.hy);
    };
    function DB(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = xm(a, c);
      h(DB)[this.hy] = this;
    }
    DB.prototype = Object.create(YA.prototype);
    DB.prototype.constructor = DB;
    DB.prototype.iy = DB;
    DB.jy = {};
    b.btConeShapeZ = DB;
    DB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ym(c, a);
    };
    DB.prototype.getLocalScaling = function () {
      return k(zm(this.hy), p);
    };
    DB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Am(d, a, c);
    };
    DB.prototype.__destroy__ = function () {
      Bm(this.hy);
    };
    function EB(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = Cm(a, c);
      h(EB)[this.hy] = this;
    }
    EB.prototype = Object.create(YA.prototype);
    EB.prototype.constructor = EB;
    EB.prototype.iy = EB;
    EB.jy = {};
    b.btConeShapeX = EB;
    EB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Dm(c, a);
    };
    EB.prototype.getLocalScaling = function () {
      return k(Em(this.hy), p);
    };
    EB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Fm(d, a, c);
    };
    EB.prototype.__destroy__ = function () {
      Gm(this.hy);
    };
    function FB(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = void 0 === a ? Hm() : void 0 === c ? Im(a) : Jm(a, c);
      h(FB)[this.hy] = this;
    }
    FB.prototype = Object.create(fB.prototype);
    FB.prototype.constructor = FB;
    FB.prototype.iy = FB;
    FB.jy = {};
    b.btTriangleMesh = FB;
    FB.prototype.addTriangle = function (a, c, d, e) {
      var g = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      void 0 === e ? Km(g, a, c, d) : Lm(g, a, c, d, e);
    };
    FB.prototype.findOrAddVertex = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return Mm(d, a, c);
    };
    FB.prototype.addIndex = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Nm(c, a);
    };
    FB.prototype.getIndexedMeshArray = function () {
      return k(Om(this.hy), uB);
    };
    FB.prototype.setScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pm(c, a);
    };
    FB.prototype.__destroy__ = function () {
      Qm(this.hy);
    };
    function GB(a, c) {
      IA();
      "object" == typeof a && (a = MA(a));
      c && "object" === typeof c && (c = c.hy);
      this.hy = void 0 === a ? Rm() : void 0 === c ? Sm(a) : Tm(a, c);
      h(GB)[this.hy] = this;
    }
    GB.prototype = Object.create(m.prototype);
    GB.prototype.constructor = GB;
    GB.prototype.iy = GB;
    GB.jy = {};
    b.btConvexHullShape = GB;
    GB.prototype.addPoint = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      void 0 === c ? Um(d, a) : Vm(d, a, c);
    };
    GB.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wm(c, a);
    };
    GB.prototype.getMargin = function () {
      return Xm(this.hy);
    };
    GB.prototype.getNumVertices = function () {
      return Ym(this.hy);
    };
    GB.prototype.initializePolyhedralFeatures = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return !!Zm(c, a);
    };
    GB.prototype.recalcLocalAabb = function () {
      $m(this.hy);
    };
    GB.prototype.getConvexPolyhedron = function () {
      return k(an(this.hy), HB);
    };
    GB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      bn(c, a);
    };
    GB.prototype.getLocalScaling = function () {
      return k(cn(this.hy), p);
    };
    GB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      dn(d, a, c);
    };
    GB.prototype.__destroy__ = function () {
      en(this.hy);
    };
    function K() {
      this.hy = fn();
      h(K)[this.hy] = this;
    }
    K.prototype = Object.create(f.prototype);
    K.prototype.constructor = K;
    K.prototype.iy = K;
    K.jy = {};
    b.btVehicleTuning = K;
    K.prototype.get_m_suspensionStiffness = K.prototype.wy = function () {
      return gn(this.hy);
    };
    K.prototype.set_m_suspensionStiffness = K.prototype.Dy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      hn(c, a);
    };
    Object.defineProperty(K.prototype, "m_suspensionStiffness", {
      get: K.prototype.wy,
      set: K.prototype.Dy,
    });
    K.prototype.get_m_suspensionCompression = K.prototype.bB = function () {
      return jn(this.hy);
    };
    K.prototype.set_m_suspensionCompression = K.prototype.ID = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      kn(c, a);
    };
    Object.defineProperty(K.prototype, "m_suspensionCompression", {
      get: K.prototype.bB,
      set: K.prototype.ID,
    });
    K.prototype.get_m_suspensionDamping = K.prototype.cB = function () {
      return ln(this.hy);
    };
    K.prototype.set_m_suspensionDamping = K.prototype.JD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      mn(c, a);
    };
    Object.defineProperty(K.prototype, "m_suspensionDamping", {
      get: K.prototype.cB,
      set: K.prototype.JD,
    });
    K.prototype.get_m_maxSuspensionTravelCm = K.prototype.vy = function () {
      return nn(this.hy);
    };
    K.prototype.set_m_maxSuspensionTravelCm = K.prototype.Cy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      on(c, a);
    };
    Object.defineProperty(K.prototype, "m_maxSuspensionTravelCm", {
      get: K.prototype.vy,
      set: K.prototype.Cy,
    });
    K.prototype.get_m_frictionSlip = K.prototype.ry = function () {
      return pn(this.hy);
    };
    K.prototype.set_m_frictionSlip = K.prototype.yy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      qn(c, a);
    };
    Object.defineProperty(K.prototype, "m_frictionSlip", {
      get: K.prototype.ry,
      set: K.prototype.yy,
    });
    K.prototype.get_m_maxSuspensionForce = K.prototype.uy = function () {
      return rn(this.hy);
    };
    K.prototype.set_m_maxSuspensionForce = K.prototype.By = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      sn(c, a);
    };
    Object.defineProperty(K.prototype, "m_maxSuspensionForce", {
      get: K.prototype.uy,
      set: K.prototype.By,
    });
    function IB() {
      throw "cannot construct a btCollisionObjectWrapper, no constructor in IDL";
    }
    IB.prototype = Object.create(f.prototype);
    IB.prototype.constructor = IB;
    IB.prototype.iy = IB;
    IB.jy = {};
    b.btCollisionObjectWrapper = IB;
    IB.prototype.getWorldTransform = function () {
      return k(tn(this.hy), r);
    };
    IB.prototype.getCollisionObject = function () {
      return k(un(this.hy), q);
    };
    IB.prototype.getCollisionShape = function () {
      return k(vn(this.hy), m);
    };
    function JB(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = wn(a);
      h(JB)[this.hy] = this;
    }
    JB.prototype = Object.create(f.prototype);
    JB.prototype.constructor = JB;
    JB.prototype.iy = JB;
    JB.jy = {};
    b.btShapeHull = JB;
    JB.prototype.buildHull = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return !!xn(c, a);
    };
    JB.prototype.numVertices = function () {
      return yn(this.hy);
    };
    JB.prototype.getVertexPointer = function () {
      return k(zn(this.hy), p);
    };
    JB.prototype.__destroy__ = function () {
      An(this.hy);
    };
    function KB(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = void 0 === a ? Bn() : void 0 === c ? Cn(a) : Dn(a, c);
      h(KB)[this.hy] = this;
    }
    KB.prototype = Object.create(gB.prototype);
    KB.prototype.constructor = KB;
    KB.prototype.iy = KB;
    KB.jy = {};
    b.btDefaultMotionState = KB;
    KB.prototype.getWorldTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      En(c, a);
    };
    KB.prototype.setWorldTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Fn(c, a);
    };
    KB.prototype.get_m_graphicsWorldTrans = KB.prototype.eA = function () {
      return k(Gn(this.hy), r);
    };
    KB.prototype.set_m_graphicsWorldTrans = KB.prototype.LC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Hn(c, a);
    };
    Object.defineProperty(KB.prototype, "m_graphicsWorldTrans", {
      get: KB.prototype.eA,
      set: KB.prototype.LC,
    });
    KB.prototype.__destroy__ = function () {
      In(this.hy);
    };
    function L(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = Jn(a);
      h(L)[this.hy] = this;
    }
    L.prototype = Object.create(f.prototype);
    L.prototype.constructor = L;
    L.prototype.iy = L;
    L.jy = {};
    b.btWheelInfo = L;
    L.prototype.getSuspensionRestLength = function () {
      return Kn(this.hy);
    };
    L.prototype.updateWheel = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Ln(d, a, c);
    };
    L.prototype.get_m_suspensionStiffness = L.prototype.wy = function () {
      return Mn(this.hy);
    };
    L.prototype.set_m_suspensionStiffness = L.prototype.Dy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Nn(c, a);
    };
    Object.defineProperty(L.prototype, "m_suspensionStiffness", {
      get: L.prototype.wy,
      set: L.prototype.Dy,
    });
    L.prototype.get_m_frictionSlip = L.prototype.ry = function () {
      return On(this.hy);
    };
    L.prototype.set_m_frictionSlip = L.prototype.yy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pn(c, a);
    };
    Object.defineProperty(L.prototype, "m_frictionSlip", {
      get: L.prototype.ry,
      set: L.prototype.yy,
    });
    L.prototype.get_m_engineForce = L.prototype.aA = function () {
      return Qn(this.hy);
    };
    L.prototype.set_m_engineForce = L.prototype.HC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Rn(c, a);
    };
    Object.defineProperty(L.prototype, "m_engineForce", {
      get: L.prototype.aA,
      set: L.prototype.HC,
    });
    L.prototype.get_m_rollInfluence = L.prototype.SA = function () {
      return Sn(this.hy);
    };
    L.prototype.set_m_rollInfluence = L.prototype.yD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Tn(c, a);
    };
    Object.defineProperty(L.prototype, "m_rollInfluence", {
      get: L.prototype.SA,
      set: L.prototype.yD,
    });
    L.prototype.get_m_suspensionRestLength1 = L.prototype.gB = function () {
      return Un(this.hy);
    };
    L.prototype.set_m_suspensionRestLength1 = L.prototype.ND = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Vn(c, a);
    };
    Object.defineProperty(L.prototype, "m_suspensionRestLength1", {
      get: L.prototype.gB,
      set: L.prototype.ND,
    });
    L.prototype.get_m_wheelsRadius = L.prototype.uB = function () {
      return Wn(this.hy);
    };
    L.prototype.set_m_wheelsRadius = L.prototype.aE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Xn(c, a);
    };
    Object.defineProperty(L.prototype, "m_wheelsRadius", {
      get: L.prototype.uB,
      set: L.prototype.aE,
    });
    L.prototype.get_m_wheelsDampingCompression = L.prototype.My = function () {
      return Yn(this.hy);
    };
    L.prototype.set_m_wheelsDampingCompression = L.prototype.Vy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Zn(c, a);
    };
    Object.defineProperty(L.prototype, "m_wheelsDampingCompression", {
      get: L.prototype.My,
      set: L.prototype.Vy,
    });
    L.prototype.get_m_wheelsDampingRelaxation = L.prototype.Ny = function () {
      return $n(this.hy);
    };
    L.prototype.set_m_wheelsDampingRelaxation = L.prototype.Wy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ao(c, a);
    };
    Object.defineProperty(L.prototype, "m_wheelsDampingRelaxation", {
      get: L.prototype.Ny,
      set: L.prototype.Wy,
    });
    L.prototype.get_m_steering = L.prototype.$A = function () {
      return bo(this.hy);
    };
    L.prototype.set_m_steering = L.prototype.GD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      co(c, a);
    };
    Object.defineProperty(L.prototype, "m_steering", {
      get: L.prototype.$A,
      set: L.prototype.GD,
    });
    L.prototype.get_m_maxSuspensionForce = L.prototype.uy = function () {
      return eo(this.hy);
    };
    L.prototype.set_m_maxSuspensionForce = L.prototype.By = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      fo(c, a);
    };
    Object.defineProperty(L.prototype, "m_maxSuspensionForce", {
      get: L.prototype.uy,
      set: L.prototype.By,
    });
    L.prototype.get_m_maxSuspensionTravelCm = L.prototype.vy = function () {
      return go(this.hy);
    };
    L.prototype.set_m_maxSuspensionTravelCm = L.prototype.Cy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ho(c, a);
    };
    Object.defineProperty(L.prototype, "m_maxSuspensionTravelCm", {
      get: L.prototype.vy,
      set: L.prototype.Cy,
    });
    L.prototype.get_m_wheelsSuspensionForce = L.prototype.vB = function () {
      return io(this.hy);
    };
    L.prototype.set_m_wheelsSuspensionForce = L.prototype.bE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      jo(c, a);
    };
    Object.defineProperty(L.prototype, "m_wheelsSuspensionForce", {
      get: L.prototype.vB,
      set: L.prototype.bE,
    });
    L.prototype.get_m_bIsFrontWheel = L.prototype.Fy = function () {
      return !!ko(this.hy);
    };
    L.prototype.set_m_bIsFrontWheel = L.prototype.Oy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      lo(c, a);
    };
    Object.defineProperty(L.prototype, "m_bIsFrontWheel", {
      get: L.prototype.Fy,
      set: L.prototype.Oy,
    });
    L.prototype.get_m_raycastInfo = L.prototype.QA = function () {
      return k(mo(this.hy), M);
    };
    L.prototype.set_m_raycastInfo = L.prototype.wD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      no(c, a);
    };
    Object.defineProperty(L.prototype, "m_raycastInfo", {
      get: L.prototype.QA,
      set: L.prototype.wD,
    });
    L.prototype.get_m_chassisConnectionPointCS = L.prototype.Mz = function () {
      return k(oo(this.hy), p);
    };
    L.prototype.set_m_chassisConnectionPointCS = L.prototype.sC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      po(c, a);
    };
    Object.defineProperty(L.prototype, "m_chassisConnectionPointCS", {
      get: L.prototype.Mz,
      set: L.prototype.sC,
    });
    L.prototype.get_m_worldTransform = L.prototype.wB = function () {
      return k(qo(this.hy), r);
    };
    L.prototype.set_m_worldTransform = L.prototype.cE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ro(c, a);
    };
    Object.defineProperty(L.prototype, "m_worldTransform", {
      get: L.prototype.wB,
      set: L.prototype.cE,
    });
    L.prototype.get_m_wheelDirectionCS = L.prototype.Ly = function () {
      return k(so(this.hy), p);
    };
    L.prototype.set_m_wheelDirectionCS = L.prototype.Uy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      to(c, a);
    };
    Object.defineProperty(L.prototype, "m_wheelDirectionCS", {
      get: L.prototype.Ly,
      set: L.prototype.Uy,
    });
    L.prototype.get_m_wheelAxleCS = L.prototype.Ky = function () {
      return k(uo(this.hy), p);
    };
    L.prototype.set_m_wheelAxleCS = L.prototype.Ty = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      vo(c, a);
    };
    Object.defineProperty(L.prototype, "m_wheelAxleCS", {
      get: L.prototype.Ky,
      set: L.prototype.Ty,
    });
    L.prototype.get_m_rotation = L.prototype.UA = function () {
      return wo(this.hy);
    };
    L.prototype.set_m_rotation = L.prototype.AD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      xo(c, a);
    };
    Object.defineProperty(L.prototype, "m_rotation", {
      get: L.prototype.UA,
      set: L.prototype.AD,
    });
    L.prototype.get_m_deltaRotation = L.prototype.Vz = function () {
      return yo(this.hy);
    };
    L.prototype.set_m_deltaRotation = L.prototype.BC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      zo(c, a);
    };
    Object.defineProperty(L.prototype, "m_deltaRotation", {
      get: L.prototype.Vz,
      set: L.prototype.BC,
    });
    L.prototype.get_m_brake = L.prototype.Fz = function () {
      return Ao(this.hy);
    };
    L.prototype.set_m_brake = L.prototype.lC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Bo(c, a);
    };
    Object.defineProperty(L.prototype, "m_brake", {
      get: L.prototype.Fz,
      set: L.prototype.lC,
    });
    L.prototype.get_m_clippedInvContactDotSuspension = L.prototype.Nz = function () {
      return Co(this.hy);
    };
    L.prototype.set_m_clippedInvContactDotSuspension = L.prototype.tC = function (
      a
    ) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Do(c, a);
    };
    Object.defineProperty(L.prototype, "m_clippedInvContactDotSuspension", {
      get: L.prototype.Nz,
      set: L.prototype.tC,
    });
    L.prototype.get_m_suspensionRelativeVelocity = L.prototype.eB = function () {
      return Eo(this.hy);
    };
    L.prototype.set_m_suspensionRelativeVelocity = L.prototype.LD = function (
      a
    ) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Fo(c, a);
    };
    Object.defineProperty(L.prototype, "m_suspensionRelativeVelocity", {
      get: L.prototype.eB,
      set: L.prototype.LD,
    });
    L.prototype.get_m_skidInfo = L.prototype.XA = function () {
      return Go(this.hy);
    };
    L.prototype.set_m_skidInfo = L.prototype.DD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ho(c, a);
    };
    Object.defineProperty(L.prototype, "m_skidInfo", {
      get: L.prototype.XA,
      set: L.prototype.DD,
    });
    L.prototype.__destroy__ = function () {
      Io(this.hy);
    };
    function N(a, c, d, e) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      this.hy =
        void 0 === a
          ? Jo()
          : void 0 === c
          ? _emscripten_bind_btVector4_btVector4_1(a)
          : void 0 === d
          ? _emscripten_bind_btVector4_btVector4_2(a, c)
          : void 0 === e
          ? _emscripten_bind_btVector4_btVector4_3(a, c, d)
          : Ko(a, c, d, e);
      h(N)[this.hy] = this;
    }
    N.prototype = Object.create(p.prototype);
    N.prototype.constructor = N;
    N.prototype.iy = N;
    N.jy = {};
    b.btVector4 = N;
    N.prototype.w = function () {
      return Lo(this.hy);
    };
    N.prototype.setValue = function (a, c, d, e) {
      var g = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      Mo(g, a, c, d, e);
    };
    N.prototype.length = N.prototype.length = function () {
      return No(this.hy);
    };
    N.prototype.x = N.prototype.x = function () {
      return Oo(this.hy);
    };
    N.prototype.y = N.prototype.y = function () {
      return Po(this.hy);
    };
    N.prototype.z = N.prototype.z = function () {
      return Qo(this.hy);
    };
    N.prototype.setX = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ro(c, a);
    };
    N.prototype.setY = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      So(c, a);
    };
    N.prototype.setZ = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      To(c, a);
    };
    N.prototype.normalize = N.prototype.normalize = function () {
      Uo(this.hy);
    };
    N.prototype.rotate = N.prototype.rotate = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return k(Vo(d, a, c), p);
    };
    N.prototype.dot = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return Wo(c, a);
    };
    N.prototype.op_mul = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Xo(c, a), p);
    };
    N.prototype.op_add = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Yo(c, a), p);
    };
    N.prototype.op_sub = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Zo(c, a), p);
    };
    N.prototype.__destroy__ = function () {
      $o(this.hy);
    };
    function LB() {
      this.hy = ap();
      h(LB)[this.hy] = this;
    }
    LB.prototype = Object.create(f.prototype);
    LB.prototype.constructor = LB;
    LB.prototype.iy = LB;
    LB.jy = {};
    b.btDefaultCollisionConstructionInfo = LB;
    LB.prototype.__destroy__ = function () {
      bp(this.hy);
    };
    function O() {
      throw "cannot construct a Anchor, no constructor in IDL";
    }
    O.prototype = Object.create(f.prototype);
    O.prototype.constructor = O;
    O.prototype.iy = O;
    O.jy = {};
    b.Anchor = O;
    O.prototype.get_m_node = O.prototype.FA = function () {
      return k(cp(this.hy), Node);
    };
    O.prototype.set_m_node = O.prototype.lD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      dp(c, a);
    };
    Object.defineProperty(O.prototype, "m_node", {
      get: O.prototype.FA,
      set: O.prototype.lD,
    });
    O.prototype.get_m_local = O.prototype.zA = function () {
      return k(ep(this.hy), p);
    };
    O.prototype.set_m_local = O.prototype.fD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      fp(c, a);
    };
    Object.defineProperty(O.prototype, "m_local", {
      get: O.prototype.zA,
      set: O.prototype.fD,
    });
    O.prototype.get_m_body = O.prototype.Ez = function () {
      return k(gp(this.hy), I);
    };
    O.prototype.set_m_body = O.prototype.kC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      hp(c, a);
    };
    Object.defineProperty(O.prototype, "m_body", {
      get: O.prototype.Ez,
      set: O.prototype.kC,
    });
    O.prototype.get_m_influence = O.prototype.sA = function () {
      return ip(this.hy);
    };
    O.prototype.set_m_influence = O.prototype.ZC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      jp(c, a);
    };
    Object.defineProperty(O.prototype, "m_influence", {
      get: O.prototype.sA,
      set: O.prototype.ZC,
    });
    O.prototype.get_m_c0 = O.prototype.Hz = function () {
      return k(kp(this.hy), jB);
    };
    O.prototype.set_m_c0 = O.prototype.nC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      lp(c, a);
    };
    Object.defineProperty(O.prototype, "m_c0", {
      get: O.prototype.Hz,
      set: O.prototype.nC,
    });
    O.prototype.get_m_c1 = O.prototype.Iz = function () {
      return k(mp(this.hy), p);
    };
    O.prototype.set_m_c1 = O.prototype.oC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      np(c, a);
    };
    Object.defineProperty(O.prototype, "m_c1", {
      get: O.prototype.Iz,
      set: O.prototype.oC,
    });
    O.prototype.get_m_c2 = O.prototype.Jz = function () {
      return op(this.hy);
    };
    O.prototype.set_m_c2 = O.prototype.pC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      pp(c, a);
    };
    Object.defineProperty(O.prototype, "m_c2", {
      get: O.prototype.Jz,
      set: O.prototype.pC,
    });
    O.prototype.__destroy__ = function () {
      qp(this.hy);
    };
    function P() {
      throw "cannot construct a btVehicleRaycasterResult, no constructor in IDL";
    }
    P.prototype = Object.create(f.prototype);
    P.prototype.constructor = P;
    P.prototype.iy = P;
    P.jy = {};
    b.btVehicleRaycasterResult = P;
    P.prototype.get_m_hitPointInWorld = P.prototype.nA = function () {
      return k(rp(this.hy), p);
    };
    P.prototype.set_m_hitPointInWorld = P.prototype.UC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      sp(c, a);
    };
    Object.defineProperty(P.prototype, "m_hitPointInWorld", {
      get: P.prototype.nA,
      set: P.prototype.UC,
    });
    P.prototype.get_m_hitNormalInWorld = P.prototype.lA = function () {
      return k(tp(this.hy), p);
    };
    P.prototype.set_m_hitNormalInWorld = P.prototype.SC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      up(c, a);
    };
    Object.defineProperty(P.prototype, "m_hitNormalInWorld", {
      get: P.prototype.lA,
      set: P.prototype.SC,
    });
    P.prototype.get_m_distFraction = P.prototype.Yz = function () {
      return vp(this.hy);
    };
    P.prototype.set_m_distFraction = P.prototype.EC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      wp(c, a);
    };
    Object.defineProperty(P.prototype, "m_distFraction", {
      get: P.prototype.Yz,
      set: P.prototype.EC,
    });
    P.prototype.__destroy__ = function () {
      xp(this.hy);
    };
    function pB() {
      throw "cannot construct a btVector3Array, no constructor in IDL";
    }
    pB.prototype = Object.create(f.prototype);
    pB.prototype.constructor = pB;
    pB.prototype.iy = pB;
    pB.jy = {};
    b.btVector3Array = pB;
    pB.prototype.size = pB.prototype.size = function () {
      return yp(this.hy);
    };
    pB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(zp(c, a), p);
    };
    pB.prototype.__destroy__ = function () {
      Ap(this.hy);
    };
    function MB() {
      throw "cannot construct a btConstraintSolver, no constructor in IDL";
    }
    MB.prototype = Object.create(f.prototype);
    MB.prototype.constructor = MB;
    MB.prototype.iy = MB;
    MB.jy = {};
    b.btConstraintSolver = MB;
    MB.prototype.__destroy__ = function () {
      Bp(this.hy);
    };
    function Q(a, c, d) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      this.hy = Cp(a, c, d);
      h(Q)[this.hy] = this;
    }
    Q.prototype = Object.create(ZA.prototype);
    Q.prototype.constructor = Q;
    Q.prototype.iy = Q;
    Q.jy = {};
    b.btRaycastVehicle = Q;
    Q.prototype.applyEngineForce = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Dp(d, a, c);
    };
    Q.prototype.setSteeringValue = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Ep(d, a, c);
    };
    Q.prototype.getWheelTransformWS = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Fp(c, a), r);
    };
    Q.prototype.updateWheelTransform = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Gp(d, a, c);
    };
    Q.prototype.addWheel = function (a, c, d, e, g, n, F) {
      var aa = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      n && "object" === typeof n && (n = n.hy);
      F && "object" === typeof F && (F = F.hy);
      return k(Hp(aa, a, c, d, e, g, n, F), L);
    };
    Q.prototype.getNumWheels = function () {
      return Ip(this.hy);
    };
    Q.prototype.getRigidBody = function () {
      return k(Jp(this.hy), I);
    };
    Q.prototype.getWheelInfo = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Kp(c, a), L);
    };
    Q.prototype.setBrake = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Lp(d, a, c);
    };
    Q.prototype.setCoordinateSystem = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Mp(e, a, c, d);
    };
    Q.prototype.getCurrentSpeedKmHour = function () {
      return Np(this.hy);
    };
    Q.prototype.getChassisWorldTransform = function () {
      return k(Op(this.hy), r);
    };
    Q.prototype.rayCast = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return Pp(c, a);
    };
    Q.prototype.updateVehicle = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Qp(c, a);
    };
    Q.prototype.resetSuspension = function () {
      Rp(this.hy);
    };
    Q.prototype.getSteeringValue = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return Sp(c, a);
    };
    Q.prototype.updateWheelTransformsWS = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      void 0 === c ? Tp(d, a) : Up(d, a, c);
    };
    Q.prototype.setPitchControl = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Vp(c, a);
    };
    Q.prototype.updateSuspension = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wp(c, a);
    };
    Q.prototype.updateFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Xp(c, a);
    };
    Q.prototype.getRightAxis = function () {
      return Yp(this.hy);
    };
    Q.prototype.getUpAxis = function () {
      return Zp(this.hy);
    };
    Q.prototype.getForwardAxis = function () {
      return $p(this.hy);
    };
    Q.prototype.getForwardVector = function () {
      return k(aq(this.hy), p);
    };
    Q.prototype.getUserConstraintType = function () {
      return bq(this.hy);
    };
    Q.prototype.setUserConstraintType = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      cq(c, a);
    };
    Q.prototype.setUserConstraintId = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      dq(c, a);
    };
    Q.prototype.getUserConstraintId = function () {
      return eq(this.hy);
    };
    Q.prototype.updateAction = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      fq(d, a, c);
    };
    Q.prototype.__destroy__ = function () {
      gq(this.hy);
    };
    function NB(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = hq(a);
      h(NB)[this.hy] = this;
    }
    NB.prototype = Object.create(bB.prototype);
    NB.prototype.constructor = NB;
    NB.prototype.iy = NB;
    NB.jy = {};
    b.btCylinderShapeX = NB;
    NB.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      iq(c, a);
    };
    NB.prototype.getMargin = function () {
      return jq(this.hy);
    };
    NB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      kq(c, a);
    };
    NB.prototype.getLocalScaling = function () {
      return k(lq(this.hy), p);
    };
    NB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      mq(d, a, c);
    };
    NB.prototype.__destroy__ = function () {
      nq(this.hy);
    };
    function OB(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = oq(a);
      h(OB)[this.hy] = this;
    }
    OB.prototype = Object.create(bB.prototype);
    OB.prototype.constructor = OB;
    OB.prototype.iy = OB;
    OB.jy = {};
    b.btCylinderShapeZ = OB;
    OB.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      pq(c, a);
    };
    OB.prototype.getMargin = function () {
      return qq(this.hy);
    };
    OB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      rq(c, a);
    };
    OB.prototype.getLocalScaling = function () {
      return k(sq(this.hy), p);
    };
    OB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      tq(d, a, c);
    };
    OB.prototype.__destroy__ = function () {
      uq(this.hy);
    };
    function HB() {
      throw "cannot construct a btConvexPolyhedron, no constructor in IDL";
    }
    HB.prototype = Object.create(f.prototype);
    HB.prototype.constructor = HB;
    HB.prototype.iy = HB;
    HB.jy = {};
    b.btConvexPolyhedron = HB;
    HB.prototype.get_m_vertices = HB.prototype.qB = function () {
      return k(vq(this.hy), pB);
    };
    HB.prototype.set_m_vertices = HB.prototype.XD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      wq(c, a);
    };
    Object.defineProperty(HB.prototype, "m_vertices", {
      get: HB.prototype.qB,
      set: HB.prototype.XD,
    });
    HB.prototype.get_m_faces = HB.prototype.Gy = function () {
      return k(xq(this.hy), PB);
    };
    HB.prototype.set_m_faces = HB.prototype.Py = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yq(c, a);
    };
    Object.defineProperty(HB.prototype, "m_faces", {
      get: HB.prototype.Gy,
      set: HB.prototype.Py,
    });
    HB.prototype.__destroy__ = function () {
      zq(this.hy);
    };
    function QB() {
      this.hy = Aq();
      h(QB)[this.hy] = this;
    }
    QB.prototype = Object.create(f.prototype);
    QB.prototype.constructor = QB;
    QB.prototype.iy = QB;
    QB.jy = {};
    b.btSequentialImpulseConstraintSolver = QB;
    QB.prototype.__destroy__ = function () {
      Bq(this.hy);
    };
    function RB() {
      throw "cannot construct a tAnchorArray, no constructor in IDL";
    }
    RB.prototype = Object.create(f.prototype);
    RB.prototype.constructor = RB;
    RB.prototype.iy = RB;
    RB.jy = {};
    b.tAnchorArray = RB;
    RB.prototype.size = RB.prototype.size = function () {
      return Cq(this.hy);
    };
    RB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Dq(c, a), O);
    };
    RB.prototype.clear = RB.prototype.clear = function () {
      Eq(this.hy);
    };
    RB.prototype.push_back = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Fq(c, a);
    };
    RB.prototype.pop_back = function () {
      Gq(this.hy);
    };
    RB.prototype.__destroy__ = function () {
      Hq(this.hy);
    };
    function M() {
      throw "cannot construct a RaycastInfo, no constructor in IDL";
    }
    M.prototype = Object.create(f.prototype);
    M.prototype.constructor = M;
    M.prototype.iy = M;
    M.jy = {};
    b.RaycastInfo = M;
    M.prototype.get_m_contactNormalWS = M.prototype.Pz = function () {
      return k(Iq(this.hy), p);
    };
    M.prototype.set_m_contactNormalWS = M.prototype.vC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Jq(c, a);
    };
    Object.defineProperty(M.prototype, "m_contactNormalWS", {
      get: M.prototype.Pz,
      set: M.prototype.vC,
    });
    M.prototype.get_m_contactPointWS = M.prototype.Qz = function () {
      return k(Kq(this.hy), p);
    };
    M.prototype.set_m_contactPointWS = M.prototype.wC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Lq(c, a);
    };
    Object.defineProperty(M.prototype, "m_contactPointWS", {
      get: M.prototype.Qz,
      set: M.prototype.wC,
    });
    M.prototype.get_m_suspensionLength = M.prototype.dB = function () {
      return Mq(this.hy);
    };
    M.prototype.set_m_suspensionLength = M.prototype.KD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Nq(c, a);
    };
    Object.defineProperty(M.prototype, "m_suspensionLength", {
      get: M.prototype.dB,
      set: M.prototype.KD,
    });
    M.prototype.get_m_hardPointWS = M.prototype.hA = function () {
      return k(Oq(this.hy), p);
    };
    M.prototype.set_m_hardPointWS = M.prototype.OC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pq(c, a);
    };
    Object.defineProperty(M.prototype, "m_hardPointWS", {
      get: M.prototype.hA,
      set: M.prototype.OC,
    });
    M.prototype.get_m_wheelDirectionWS = M.prototype.sB = function () {
      return k(Qq(this.hy), p);
    };
    M.prototype.set_m_wheelDirectionWS = M.prototype.ZD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Rq(c, a);
    };
    Object.defineProperty(M.prototype, "m_wheelDirectionWS", {
      get: M.prototype.sB,
      set: M.prototype.ZD,
    });
    M.prototype.get_m_wheelAxleWS = M.prototype.rB = function () {
      return k(Sq(this.hy), p);
    };
    M.prototype.set_m_wheelAxleWS = M.prototype.YD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Tq(c, a);
    };
    Object.defineProperty(M.prototype, "m_wheelAxleWS", {
      get: M.prototype.rB,
      set: M.prototype.YD,
    });
    M.prototype.get_m_isInContact = M.prototype.tA = function () {
      return !!Uq(this.hy);
    };
    M.prototype.set_m_isInContact = M.prototype.$C = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Vq(c, a);
    };
    Object.defineProperty(M.prototype, "m_isInContact", {
      get: M.prototype.tA,
      set: M.prototype.$C,
    });
    M.prototype.get_m_groundObject = M.prototype.gA = function () {
      return Wq(this.hy);
    };
    M.prototype.set_m_groundObject = M.prototype.NC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Xq(c, a);
    };
    Object.defineProperty(M.prototype, "m_groundObject", {
      get: M.prototype.gA,
      set: M.prototype.NC,
    });
    M.prototype.__destroy__ = function () {
      Yq(this.hy);
    };
    function SB(a, c, d) {
      IA();
      a && "object" === typeof a && (a = a.hy);
      "object" == typeof c && (c = MA(c));
      d && "object" === typeof d && (d = d.hy);
      this.hy = Zq(a, c, d);
      h(SB)[this.hy] = this;
    }
    SB.prototype = Object.create(m.prototype);
    SB.prototype.constructor = SB;
    SB.prototype.iy = SB;
    SB.jy = {};
    b.btMultiSphereShape = SB;
    SB.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      $q(c, a);
    };
    SB.prototype.getLocalScaling = function () {
      return k(ar(this.hy), p);
    };
    SB.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      br(d, a, c);
    };
    SB.prototype.__destroy__ = function () {
      cr(this.hy);
    };
    function R(a, c, d, e) {
      IA();
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      "object" == typeof e && (e = MA(e));
      this.hy = dr(a, c, d, e);
      h(R)[this.hy] = this;
    }
    R.prototype = Object.create(q.prototype);
    R.prototype.constructor = R;
    R.prototype.iy = R;
    R.jy = {};
    b.btSoftBody = R;
    R.prototype.checkLink = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return !!er(d, a, c);
    };
    R.prototype.checkFace = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      return !!fr(e, a, c, d);
    };
    R.prototype.appendMaterial = function () {
      return k(gr(this.hy), A);
    };
    R.prototype.appendNode = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      hr(d, a, c);
    };
    R.prototype.appendLink = function (a, c, d, e) {
      var g = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      ir(g, a, c, d, e);
    };
    R.prototype.appendFace = function (a, c, d, e) {
      var g = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      jr(g, a, c, d, e);
    };
    R.prototype.appendTetra = function (a, c, d, e, g) {
      var n = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      kr(n, a, c, d, e, g);
    };
    R.prototype.appendAnchor = function (a, c, d, e) {
      var g = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      lr(g, a, c, d, e);
    };
    R.prototype.addForce = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      void 0 === c ? mr(d, a) : nr(d, a, c);
    };
    R.prototype.addAeroForceToNode = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      or(d, a, c);
    };
    R.prototype.getTotalMass = function () {
      return pr(this.hy);
    };
    R.prototype.setTotalMass = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      qr(d, a, c);
    };
    R.prototype.setMass = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      rr(d, a, c);
    };
    R.prototype.transform = R.prototype.transform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      sr(c, a);
    };
    R.prototype.translate = R.prototype.translate = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      tr(c, a);
    };
    R.prototype.rotate = R.prototype.rotate = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ur(c, a);
    };
    R.prototype.scale = R.prototype.scale = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      vr(c, a);
    };
    R.prototype.generateClusters = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return void 0 === c ? wr(d, a) : xr(d, a, c);
    };
    R.prototype.generateBendingConstraints = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return yr(d, a, c);
    };
    R.prototype.upcast = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(zr(c, a), R);
    };
    R.prototype.setAnisotropicFriction = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Ar(d, a, c);
    };
    R.prototype.getCollisionShape = function () {
      return k(Br(this.hy), m);
    };
    R.prototype.setContactProcessingThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Cr(c, a);
    };
    R.prototype.setActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Dr(c, a);
    };
    R.prototype.forceActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Er(c, a);
    };
    R.prototype.activate = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      void 0 === a ? Fr(c) : Gr(c, a);
    };
    R.prototype.isActive = function () {
      return !!Hr(this.hy);
    };
    R.prototype.isKinematicObject = function () {
      return !!Ir(this.hy);
    };
    R.prototype.isStaticObject = function () {
      return !!Jr(this.hy);
    };
    R.prototype.isStaticOrKinematicObject = function () {
      return !!Kr(this.hy);
    };
    R.prototype.getRestitution = function () {
      return Lr(this.hy);
    };
    R.prototype.getFriction = function () {
      return Mr(this.hy);
    };
    R.prototype.getRollingFriction = function () {
      return Nr(this.hy);
    };
    R.prototype.setRestitution = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Or(c, a);
    };
    R.prototype.setFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pr(c, a);
    };
    R.prototype.setRollingFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Qr(c, a);
    };
    R.prototype.getWorldTransform = function () {
      return k(Rr(this.hy), r);
    };
    R.prototype.getCollisionFlags = function () {
      return Sr(this.hy);
    };
    R.prototype.setCollisionFlags = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Tr(c, a);
    };
    R.prototype.setWorldTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ur(c, a);
    };
    R.prototype.setCollisionShape = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Vr(c, a);
    };
    R.prototype.setCcdMotionThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wr(c, a);
    };
    R.prototype.setCcdSweptSphereRadius = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Xr(c, a);
    };
    R.prototype.getUserIndex = function () {
      return Yr(this.hy);
    };
    R.prototype.setUserIndex = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Zr(c, a);
    };
    R.prototype.getUserPointer = function () {
      return k($r(this.hy), SA);
    };
    R.prototype.setUserPointer = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      as(c, a);
    };
    R.prototype.getBroadphaseHandle = function () {
      return k(bs(this.hy), t);
    };
    R.prototype.get_m_cfg = R.prototype.Kz = function () {
      return k(cs(this.hy), S);
    };
    R.prototype.set_m_cfg = R.prototype.qC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ds(c, a);
    };
    Object.defineProperty(R.prototype, "m_cfg", {
      get: R.prototype.Kz,
      set: R.prototype.qC,
    });
    R.prototype.get_m_nodes = R.prototype.GA = function () {
      return k(es(this.hy), TB);
    };
    R.prototype.set_m_nodes = R.prototype.mD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      gs(c, a);
    };
    Object.defineProperty(R.prototype, "m_nodes", {
      get: R.prototype.GA,
      set: R.prototype.mD,
    });
    R.prototype.get_m_faces = R.prototype.Gy = function () {
      return k(hs(this.hy), UB);
    };
    R.prototype.set_m_faces = R.prototype.Py = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      is(c, a);
    };
    Object.defineProperty(R.prototype, "m_faces", {
      get: R.prototype.Gy,
      set: R.prototype.Py,
    });
    R.prototype.get_m_materials = R.prototype.DA = function () {
      return k(js(this.hy), qB);
    };
    R.prototype.set_m_materials = R.prototype.jD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ks(c, a);
    };
    Object.defineProperty(R.prototype, "m_materials", {
      get: R.prototype.DA,
      set: R.prototype.jD,
    });
    R.prototype.get_m_anchors = R.prototype.Az = function () {
      return k(ls(this.hy), RB);
    };
    R.prototype.set_m_anchors = R.prototype.gC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ms(c, a);
    };
    Object.defineProperty(R.prototype, "m_anchors", {
      get: R.prototype.Az,
      set: R.prototype.gC,
    });
    R.prototype.__destroy__ = function () {
      ns(this.hy);
    };
    function VB() {
      throw "cannot construct a btIntArray, no constructor in IDL";
    }
    VB.prototype = Object.create(f.prototype);
    VB.prototype.constructor = VB;
    VB.prototype.iy = VB;
    VB.jy = {};
    b.btIntArray = VB;
    VB.prototype.size = VB.prototype.size = function () {
      return ps(this.hy);
    };
    VB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return qs(c, a);
    };
    VB.prototype.__destroy__ = function () {
      rs(this.hy);
    };
    function S() {
      throw "cannot construct a Config, no constructor in IDL";
    }
    S.prototype = Object.create(f.prototype);
    S.prototype.constructor = S;
    S.prototype.iy = S;
    S.jy = {};
    b.Config = S;
    S.prototype.get_kVCF = S.prototype.sz = function () {
      return ss(this.hy);
    };
    S.prototype.set_kVCF = S.prototype.$B = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ts(c, a);
    };
    Object.defineProperty(S.prototype, "kVCF", {
      get: S.prototype.sz,
      set: S.prototype.$B,
    });
    S.prototype.get_kDP = S.prototype.fz = function () {
      return us(this.hy);
    };
    S.prototype.set_kDP = S.prototype.NB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      vs(c, a);
    };
    Object.defineProperty(S.prototype, "kDP", {
      get: S.prototype.fz,
      set: S.prototype.NB,
    });
    S.prototype.get_kDG = S.prototype.ez = function () {
      return xs(this.hy);
    };
    S.prototype.set_kDG = S.prototype.MB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ys(c, a);
    };
    Object.defineProperty(S.prototype, "kDG", {
      get: S.prototype.ez,
      set: S.prototype.MB,
    });
    S.prototype.get_kLF = S.prototype.hz = function () {
      return zs(this.hy);
    };
    S.prototype.set_kLF = S.prototype.PB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      As(c, a);
    };
    Object.defineProperty(S.prototype, "kLF", {
      get: S.prototype.hz,
      set: S.prototype.PB,
    });
    S.prototype.get_kPR = S.prototype.jz = function () {
      return Bs(this.hy);
    };
    S.prototype.set_kPR = S.prototype.RB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Cs(c, a);
    };
    Object.defineProperty(S.prototype, "kPR", {
      get: S.prototype.jz,
      set: S.prototype.RB,
    });
    S.prototype.get_kVC = S.prototype.rz = function () {
      return Ds(this.hy);
    };
    S.prototype.set_kVC = S.prototype.ZB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Es(c, a);
    };
    Object.defineProperty(S.prototype, "kVC", {
      get: S.prototype.rz,
      set: S.prototype.ZB,
    });
    S.prototype.get_kDF = S.prototype.dz = function () {
      return Fs(this.hy);
    };
    S.prototype.set_kDF = S.prototype.LB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Gs(c, a);
    };
    Object.defineProperty(S.prototype, "kDF", {
      get: S.prototype.dz,
      set: S.prototype.LB,
    });
    S.prototype.get_kMT = S.prototype.iz = function () {
      return Hs(this.hy);
    };
    S.prototype.set_kMT = S.prototype.QB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Is(c, a);
    };
    Object.defineProperty(S.prototype, "kMT", {
      get: S.prototype.iz,
      set: S.prototype.QB,
    });
    S.prototype.get_kCHR = S.prototype.cz = function () {
      return Js(this.hy);
    };
    S.prototype.set_kCHR = S.prototype.KB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ks(c, a);
    };
    Object.defineProperty(S.prototype, "kCHR", {
      get: S.prototype.cz,
      set: S.prototype.KB,
    });
    S.prototype.get_kKHR = S.prototype.gz = function () {
      return Ls(this.hy);
    };
    S.prototype.set_kKHR = S.prototype.OB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ms(c, a);
    };
    Object.defineProperty(S.prototype, "kKHR", {
      get: S.prototype.gz,
      set: S.prototype.OB,
    });
    S.prototype.get_kSHR = S.prototype.kz = function () {
      return Ns(this.hy);
    };
    S.prototype.set_kSHR = S.prototype.SB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Os(c, a);
    };
    Object.defineProperty(S.prototype, "kSHR", {
      get: S.prototype.kz,
      set: S.prototype.SB,
    });
    S.prototype.get_kAHR = S.prototype.bz = function () {
      return Ps(this.hy);
    };
    S.prototype.set_kAHR = S.prototype.JB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Qs(c, a);
    };
    Object.defineProperty(S.prototype, "kAHR", {
      get: S.prototype.bz,
      set: S.prototype.JB,
    });
    S.prototype.get_kSRHR_CL = S.prototype.nz = function () {
      return Rs(this.hy);
    };
    S.prototype.set_kSRHR_CL = S.prototype.VB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ss(c, a);
    };
    Object.defineProperty(S.prototype, "kSRHR_CL", {
      get: S.prototype.nz,
      set: S.prototype.VB,
    });
    S.prototype.get_kSKHR_CL = S.prototype.lz = function () {
      return Ts(this.hy);
    };
    S.prototype.set_kSKHR_CL = S.prototype.TB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Us(c, a);
    };
    Object.defineProperty(S.prototype, "kSKHR_CL", {
      get: S.prototype.lz,
      set: S.prototype.TB,
    });
    S.prototype.get_kSSHR_CL = S.prototype.pz = function () {
      return Vs(this.hy);
    };
    S.prototype.set_kSSHR_CL = S.prototype.XB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ws(c, a);
    };
    Object.defineProperty(S.prototype, "kSSHR_CL", {
      get: S.prototype.pz,
      set: S.prototype.XB,
    });
    S.prototype.get_kSR_SPLT_CL = S.prototype.oz = function () {
      return Xs(this.hy);
    };
    S.prototype.set_kSR_SPLT_CL = S.prototype.WB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ys(c, a);
    };
    Object.defineProperty(S.prototype, "kSR_SPLT_CL", {
      get: S.prototype.oz,
      set: S.prototype.WB,
    });
    S.prototype.get_kSK_SPLT_CL = S.prototype.mz = function () {
      return Zs(this.hy);
    };
    S.prototype.set_kSK_SPLT_CL = S.prototype.UB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      $s(c, a);
    };
    Object.defineProperty(S.prototype, "kSK_SPLT_CL", {
      get: S.prototype.mz,
      set: S.prototype.UB,
    });
    S.prototype.get_kSS_SPLT_CL = S.prototype.qz = function () {
      return at(this.hy);
    };
    S.prototype.set_kSS_SPLT_CL = S.prototype.YB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      bt(c, a);
    };
    Object.defineProperty(S.prototype, "kSS_SPLT_CL", {
      get: S.prototype.qz,
      set: S.prototype.YB,
    });
    S.prototype.get_maxvolume = S.prototype.yB = function () {
      return ct(this.hy);
    };
    S.prototype.set_maxvolume = S.prototype.eE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      dt(c, a);
    };
    Object.defineProperty(S.prototype, "maxvolume", {
      get: S.prototype.yB,
      set: S.prototype.eE,
    });
    S.prototype.get_timescale = S.prototype.AB = function () {
      return et(this.hy);
    };
    S.prototype.set_timescale = S.prototype.gE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ft(c, a);
    };
    Object.defineProperty(S.prototype, "timescale", {
      get: S.prototype.AB,
      set: S.prototype.gE,
    });
    S.prototype.get_viterations = S.prototype.BB = function () {
      return gt(this.hy);
    };
    S.prototype.set_viterations = S.prototype.hE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ht(c, a);
    };
    Object.defineProperty(S.prototype, "viterations", {
      get: S.prototype.BB,
      set: S.prototype.hE,
    });
    S.prototype.get_piterations = S.prototype.zB = function () {
      return it(this.hy);
    };
    S.prototype.set_piterations = S.prototype.fE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      jt(c, a);
    };
    Object.defineProperty(S.prototype, "piterations", {
      get: S.prototype.zB,
      set: S.prototype.fE,
    });
    S.prototype.get_diterations = S.prototype.az = function () {
      return kt(this.hy);
    };
    S.prototype.set_diterations = S.prototype.IB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      lt(c, a);
    };
    Object.defineProperty(S.prototype, "diterations", {
      get: S.prototype.az,
      set: S.prototype.IB,
    });
    S.prototype.get_citerations = S.prototype.Zy = function () {
      return mt(this.hy);
    };
    S.prototype.set_citerations = S.prototype.GB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      nt(c, a);
    };
    Object.defineProperty(S.prototype, "citerations", {
      get: S.prototype.Zy,
      set: S.prototype.GB,
    });
    S.prototype.get_collisions = S.prototype.$y = function () {
      return ot(this.hy);
    };
    S.prototype.set_collisions = S.prototype.HB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      pt(c, a);
    };
    Object.defineProperty(S.prototype, "collisions", {
      get: S.prototype.$y,
      set: S.prototype.HB,
    });
    S.prototype.__destroy__ = function () {
      qt(this.hy);
    };
    function Node() {
      throw "cannot construct a Node, no constructor in IDL";
    }
    Node.prototype = Object.create(f.prototype);
    Node.prototype.constructor = Node;
    Node.prototype.iy = Node;
    Node.jy = {};
    b.Node = Node;
    Node.prototype.get_m_x = Node.prototype.xB = function () {
      return k(rt(this.hy), p);
    };
    Node.prototype.set_m_x = Node.prototype.dE = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      st(c, a);
    };
    Object.defineProperty(Node.prototype, "m_x", {
      get: Node.prototype.xB,
      set: Node.prototype.dE,
    });
    Node.prototype.get_m_q = Node.prototype.OA = function () {
      return k(tt(this.hy), p);
    };
    Node.prototype.set_m_q = Node.prototype.uD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ut(c, a);
    };
    Object.defineProperty(Node.prototype, "m_q", {
      get: Node.prototype.OA,
      set: Node.prototype.uD,
    });
    Node.prototype.get_m_v = Node.prototype.pB = function () {
      return k(vt(this.hy), p);
    };
    Node.prototype.set_m_v = Node.prototype.WD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      wt(c, a);
    };
    Object.defineProperty(Node.prototype, "m_v", {
      get: Node.prototype.pB,
      set: Node.prototype.WD,
    });
    Node.prototype.get_m_f = Node.prototype.bA = function () {
      return k(xt(this.hy), p);
    };
    Node.prototype.set_m_f = Node.prototype.IC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yt(c, a);
    };
    Object.defineProperty(Node.prototype, "m_f", {
      get: Node.prototype.bA,
      set: Node.prototype.IC,
    });
    Node.prototype.get_m_n = Node.prototype.Hy = function () {
      return k(zt(this.hy), p);
    };
    Node.prototype.set_m_n = Node.prototype.Qy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      At(c, a);
    };
    Object.defineProperty(Node.prototype, "m_n", {
      get: Node.prototype.Hy,
      set: Node.prototype.Qy,
    });
    Node.prototype.get_m_im = Node.prototype.pA = function () {
      return Bt(this.hy);
    };
    Node.prototype.set_m_im = Node.prototype.WC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ct(c, a);
    };
    Object.defineProperty(Node.prototype, "m_im", {
      get: Node.prototype.pA,
      set: Node.prototype.WC,
    });
    Node.prototype.get_m_area = Node.prototype.Dz = function () {
      return Dt(this.hy);
    };
    Node.prototype.set_m_area = Node.prototype.jC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Et(c, a);
    };
    Object.defineProperty(Node.prototype, "m_area", {
      get: Node.prototype.Dz,
      set: Node.prototype.jC,
    });
    Node.prototype.__destroy__ = function () {
      Ft(this.hy);
    };
    function WB() {
      this.hy = Gt();
      h(WB)[this.hy] = this;
    }
    WB.prototype = Object.create(f.prototype);
    WB.prototype.constructor = WB;
    WB.prototype.iy = WB;
    WB.jy = {};
    b.btGhostPairCallback = WB;
    WB.prototype.__destroy__ = function () {
      Ht(this.hy);
    };
    function XB() {
      throw "cannot construct a btOverlappingPairCallback, no constructor in IDL";
    }
    XB.prototype = Object.create(f.prototype);
    XB.prototype.constructor = XB;
    XB.prototype.iy = XB;
    XB.jy = {};
    b.btOverlappingPairCallback = XB;
    XB.prototype.__destroy__ = function () {
      It(this.hy);
    };
    function T(a, c, d, e) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      this.hy = void 0 === e ? Jt(a, c, d) : Kt(a, c, d, e);
      h(T)[this.hy] = this;
    }
    T.prototype = Object.create(ZA.prototype);
    T.prototype.constructor = T;
    T.prototype.iy = T;
    T.jy = {};
    b.btKinematicCharacterController = T;
    T.prototype.setUpAxis = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Lt(c, a);
    };
    T.prototype.setWalkDirection = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Mt(c, a);
    };
    T.prototype.setVelocityForTimeInterval = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Nt(d, a, c);
    };
    T.prototype.warp = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ot(c, a);
    };
    T.prototype.preStep = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pt(c, a);
    };
    T.prototype.playerStep = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Qt(d, a, c);
    };
    T.prototype.setFallSpeed = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Rt(c, a);
    };
    T.prototype.setJumpSpeed = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      St(c, a);
    };
    T.prototype.setMaxJumpHeight = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Tt(c, a);
    };
    T.prototype.canJump = function () {
      return !!Ut(this.hy);
    };
    T.prototype.jump = function () {
      Vt(this.hy);
    };
    T.prototype.setGravity = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wt(c, a);
    };
    T.prototype.getGravity = function () {
      return Xt(this.hy);
    };
    T.prototype.setMaxSlope = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Yt(c, a);
    };
    T.prototype.getMaxSlope = function () {
      return Zt(this.hy);
    };
    T.prototype.getGhostObject = function () {
      return k($t(this.hy), U);
    };
    T.prototype.setUseGhostSweepTest = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      au(c, a);
    };
    T.prototype.onGround = function () {
      return !!bu(this.hy);
    };
    T.prototype.setUpInterpolate = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      cu(c, a);
    };
    T.prototype.updateAction = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      du(d, a, c);
    };
    T.prototype.__destroy__ = function () {
      eu(this.hy);
    };
    function YB() {
      throw "cannot construct a btSoftBodyArray, no constructor in IDL";
    }
    YB.prototype = Object.create(f.prototype);
    YB.prototype.constructor = YB;
    YB.prototype.iy = YB;
    YB.jy = {};
    b.btSoftBodyArray = YB;
    YB.prototype.size = YB.prototype.size = function () {
      return fu(this.hy);
    };
    YB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(gu(c, a), R);
    };
    YB.prototype.__destroy__ = function () {
      hu(this.hy);
    };
    function PB() {
      throw "cannot construct a btFaceArray, no constructor in IDL";
    }
    PB.prototype = Object.create(f.prototype);
    PB.prototype.constructor = PB;
    PB.prototype.iy = PB;
    PB.jy = {};
    b.btFaceArray = PB;
    PB.prototype.size = PB.prototype.size = function () {
      return iu(this.hy);
    };
    PB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(ju(c, a), ZB);
    };
    PB.prototype.__destroy__ = function () {
      ku(this.hy);
    };
    function $B(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = lu(a, c);
      h($B)[this.hy] = this;
    }
    $B.prototype = Object.create(UA.prototype);
    $B.prototype.constructor = $B;
    $B.prototype.iy = $B;
    $B.jy = {};
    b.btStaticPlaneShape = $B;
    $B.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      mu(c, a);
    };
    $B.prototype.getLocalScaling = function () {
      return k(nu(this.hy), p);
    };
    $B.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      ou(d, a, c);
    };
    $B.prototype.__destroy__ = function () {
      pu(this.hy);
    };
    function PA() {
      throw "cannot construct a btOverlappingPairCache, no constructor in IDL";
    }
    PA.prototype = Object.create(f.prototype);
    PA.prototype.constructor = PA;
    PA.prototype.iy = PA;
    PA.jy = {};
    b.btOverlappingPairCache = PA;
    PA.prototype.setInternalGhostPairCallback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      qu(c, a);
    };
    PA.prototype.getNumOverlappingPairs = function () {
      return ru(this.hy);
    };
    PA.prototype.__destroy__ = function () {
      su(this.hy);
    };
    function vB() {
      throw "cannot construct a btIndexedMesh, no constructor in IDL";
    }
    vB.prototype = Object.create(f.prototype);
    vB.prototype.constructor = vB;
    vB.prototype.iy = vB;
    vB.jy = {};
    b.btIndexedMesh = vB;
    vB.prototype.get_m_numTriangles = vB.prototype.KA = function () {
      return tu(this.hy);
    };
    vB.prototype.set_m_numTriangles = vB.prototype.qD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      uu(c, a);
    };
    Object.defineProperty(vB.prototype, "m_numTriangles", {
      get: vB.prototype.KA,
      set: vB.prototype.qD,
    });
    vB.prototype.__destroy__ = function () {
      vu(this.hy);
    };
    function V(a, c, d, e, g) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      this.hy = wu(a, c, d, e, g);
      h(V)[this.hy] = this;
    }
    V.prototype = Object.create(x.prototype);
    V.prototype.constructor = V;
    V.prototype.iy = V;
    V.jy = {};
    b.btSoftRigidDynamicsWorld = V;
    V.prototype.addSoftBody = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      xu(e, a, c, d);
    };
    V.prototype.removeSoftBody = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yu(c, a);
    };
    V.prototype.removeCollisionObject = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      zu(c, a);
    };
    V.prototype.getWorldInfo = function () {
      return k(Au(this.hy), J);
    };
    V.prototype.getSoftBodyArray = function () {
      return k(Bu(this.hy), YB);
    };
    V.prototype.getDispatcher = function () {
      return k(Cu(this.hy), OA);
    };
    V.prototype.rayTest = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Du(e, a, c, d);
    };
    V.prototype.getPairCache = function () {
      return k(Eu(this.hy), PA);
    };
    V.prototype.getDispatchInfo = function () {
      return k(Fu(this.hy), l);
    };
    V.prototype.addCollisionObject = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === c ? Gu(e, a) : void 0 === d ? Hu(e, a, c) : Iu(e, a, c, d);
    };
    V.prototype.getBroadphase = function () {
      return k(Ju(this.hy), QA);
    };
    V.prototype.convexSweepTest = function (a, c, d, e, g) {
      var n = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      Ku(n, a, c, d, e, g);
    };
    V.prototype.contactPairTest = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Lu(e, a, c, d);
    };
    V.prototype.contactTest = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Mu(d, a, c);
    };
    V.prototype.updateSingleAabb = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Nu(c, a);
    };
    V.prototype.setDebugDrawer = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ou(c, a);
    };
    V.prototype.getDebugDrawer = function () {
      return k(Pu(this.hy), RA);
    };
    V.prototype.debugDrawWorld = function () {
      Qu(this.hy);
    };
    V.prototype.debugDrawObject = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Ru(e, a, c, d);
    };
    V.prototype.setGravity = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Su(c, a);
    };
    V.prototype.getGravity = function () {
      return k(Tu(this.hy), p);
    };
    V.prototype.addRigidBody = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === c
        ? Uu(e, a)
        : void 0 === d
        ? _emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_2(e, a, c)
        : Vu(e, a, c, d);
    };
    V.prototype.removeRigidBody = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wu(c, a);
    };
    V.prototype.addConstraint = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      void 0 === c ? Xu(d, a) : Yu(d, a, c);
    };
    V.prototype.removeConstraint = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Zu(c, a);
    };
    V.prototype.stepSimulation = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      return void 0 === c
        ? $u(e, a)
        : void 0 === d
        ? av(e, a, c)
        : bv(e, a, c, d);
    };
    V.prototype.setContactAddedCallback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      cv(c, a);
    };
    V.prototype.setContactProcessedCallback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      dv(c, a);
    };
    V.prototype.setContactDestroyedCallback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ev(c, a);
    };
    V.prototype.addAction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      fv(c, a);
    };
    V.prototype.removeAction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      gv(c, a);
    };
    V.prototype.getSolverInfo = function () {
      return k(hv(this.hy), v);
    };
    V.prototype.setInternalTickCallback = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      void 0 === c ? iv(e, a) : void 0 === d ? jv(e, a, c) : kv(e, a, c, d);
    };
    V.prototype.__destroy__ = function () {
      lv(this.hy);
    };
    function aC(a, c, d, e) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      this.hy = mv(a, c, d, e);
      h(aC)[this.hy] = this;
    }
    aC.prototype = Object.create(TA.prototype);
    aC.prototype.constructor = aC;
    aC.prototype.iy = aC;
    aC.jy = {};
    b.btFixedConstraint = aC;
    aC.prototype.enableFeedback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      nv(c, a);
    };
    aC.prototype.getBreakingImpulseThreshold = function () {
      return ov(this.hy);
    };
    aC.prototype.setBreakingImpulseThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      pv(c, a);
    };
    aC.prototype.getParam = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return qv(d, a, c);
    };
    aC.prototype.setParam = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      rv(e, a, c, d);
    };
    aC.prototype.__destroy__ = function () {
      sv(this.hy);
    };
    function r(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy =
        void 0 === a
          ? tv()
          : void 0 === c
          ? _emscripten_bind_btTransform_btTransform_1(a)
          : uv(a, c);
      h(r)[this.hy] = this;
    }
    r.prototype = Object.create(f.prototype);
    r.prototype.constructor = r;
    r.prototype.iy = r;
    r.jy = {};
    b.btTransform = r;
    r.prototype.setIdentity = function () {
      vv(this.hy);
    };
    r.prototype.setOrigin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      wv(c, a);
    };
    r.prototype.setRotation = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      xv(c, a);
    };
    r.prototype.getOrigin = function () {
      return k(yv(this.hy), p);
    };
    r.prototype.getRotation = function () {
      return k(zv(this.hy), W);
    };
    r.prototype.getBasis = function () {
      return k(Av(this.hy), jB);
    };
    r.prototype.setFromOpenGLMatrix = function (a) {
      var c = this.hy;
      IA();
      "object" == typeof a && (a = MA(a));
      Bv(c, a);
    };
    r.prototype.inverse = r.prototype.inverse = function () {
      return k(Cv(this.hy), r);
    };
    r.prototype.op_mul = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Dv(c, a), r);
    };
    r.prototype.__destroy__ = function () {
      Ev(this.hy);
    };
    function X(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = Fv(a, c);
      h(X)[this.hy] = this;
    }
    X.prototype = Object.create(z.prototype);
    X.prototype.constructor = X;
    X.prototype.iy = X;
    X.jy = {};
    b.ClosestRayResultCallback = X;
    X.prototype.hasHit = function () {
      return !!Gv(this.hy);
    };
    X.prototype.get_m_rayFromWorld = X.prototype.Iy = function () {
      return k(Hv(this.hy), p);
    };
    X.prototype.set_m_rayFromWorld = X.prototype.Ry = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Iv(c, a);
    };
    Object.defineProperty(X.prototype, "m_rayFromWorld", {
      get: X.prototype.Iy,
      set: X.prototype.Ry,
    });
    X.prototype.get_m_rayToWorld = X.prototype.Jy = function () {
      return k(Jv(this.hy), p);
    };
    X.prototype.set_m_rayToWorld = X.prototype.Sy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Kv(c, a);
    };
    Object.defineProperty(X.prototype, "m_rayToWorld", {
      get: X.prototype.Jy,
      set: X.prototype.Sy,
    });
    X.prototype.get_m_hitNormalWorld = X.prototype.sy = function () {
      return k(Lv(this.hy), p);
    };
    X.prototype.set_m_hitNormalWorld = X.prototype.zy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Mv(c, a);
    };
    Object.defineProperty(X.prototype, "m_hitNormalWorld", {
      get: X.prototype.sy,
      set: X.prototype.zy,
    });
    X.prototype.get_m_hitPointWorld = X.prototype.ty = function () {
      return k(Nv(this.hy), p);
    };
    X.prototype.set_m_hitPointWorld = X.prototype.Ay = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ov(c, a);
    };
    Object.defineProperty(X.prototype, "m_hitPointWorld", {
      get: X.prototype.ty,
      set: X.prototype.Ay,
    });
    X.prototype.get_m_collisionFilterGroup = X.prototype.ky = function () {
      return Pv(this.hy);
    };
    X.prototype.set_m_collisionFilterGroup = X.prototype.my = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Qv(c, a);
    };
    Object.defineProperty(X.prototype, "m_collisionFilterGroup", {
      get: X.prototype.ky,
      set: X.prototype.my,
    });
    X.prototype.get_m_collisionFilterMask = X.prototype.ly = function () {
      return Rv(this.hy);
    };
    X.prototype.set_m_collisionFilterMask = X.prototype.ny = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Sv(c, a);
    };
    Object.defineProperty(X.prototype, "m_collisionFilterMask", {
      get: X.prototype.ly,
      set: X.prototype.ny,
    });
    X.prototype.get_m_closestHitFraction = X.prototype.oy = function () {
      return Tv(this.hy);
    };
    X.prototype.set_m_closestHitFraction = X.prototype.py = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Uv(c, a);
    };
    Object.defineProperty(X.prototype, "m_closestHitFraction", {
      get: X.prototype.oy,
      set: X.prototype.py,
    });
    X.prototype.get_m_collisionObject = X.prototype.qy = function () {
      return k(Vv(this.hy), q);
    };
    X.prototype.set_m_collisionObject = X.prototype.xy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Wv(c, a);
    };
    Object.defineProperty(X.prototype, "m_collisionObject", {
      get: X.prototype.qy,
      set: X.prototype.xy,
    });
    X.prototype.__destroy__ = function () {
      Xv(this.hy);
    };
    function bC(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = void 0 === a ? Yv() : Zv(a);
      h(bC)[this.hy] = this;
    }
    bC.prototype = Object.create(WA.prototype);
    bC.prototype.constructor = bC;
    bC.prototype.iy = bC;
    bC.jy = {};
    b.btSoftBodyRigidBodyCollisionConfiguration = bC;
    bC.prototype.__destroy__ = function () {
      $v(this.hy);
    };
    function cC() {
      this.hy = aw();
      h(cC)[this.hy] = this;
    }
    cC.prototype = Object.create(hB.prototype);
    cC.prototype.constructor = cC;
    cC.prototype.iy = cC;
    cC.jy = {};
    b.ConcreteContactResultCallback = cC;
    cC.prototype.addSingleResult = function (a, c, d, e, g, n, F) {
      var aa = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      n && "object" === typeof n && (n = n.hy);
      F && "object" === typeof F && (F = F.hy);
      return bw(aa, a, c, d, e, g, n, F);
    };
    cC.prototype.__destroy__ = function () {
      cw(this.hy);
    };
    function dC(a, c, d) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      this.hy = void 0 === d ? dw(a, c) : ew(a, c, d);
      h(dC)[this.hy] = this;
    }
    dC.prototype = Object.create(XA.prototype);
    dC.prototype.constructor = dC;
    dC.prototype.iy = dC;
    dC.jy = {};
    b.btBvhTriangleMeshShape = dC;
    dC.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      fw(c, a);
    };
    dC.prototype.getLocalScaling = function () {
      return k(gw(this.hy), p);
    };
    dC.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      hw(d, a, c);
    };
    dC.prototype.__destroy__ = function () {
      iw(this.hy);
    };
    function oB() {
      throw "cannot construct a btConstCollisionObjectArray, no constructor in IDL";
    }
    oB.prototype = Object.create(f.prototype);
    oB.prototype.constructor = oB;
    oB.prototype.iy = oB;
    oB.jy = {};
    b.btConstCollisionObjectArray = oB;
    oB.prototype.size = oB.prototype.size = function () {
      return jw(this.hy);
    };
    oB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(kw(c, a), q);
    };
    oB.prototype.__destroy__ = function () {
      lw(this.hy);
    };
    function eC(a, c, d, e, g) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      this.hy =
        void 0 === e
          ? mw(a, c, d)
          : void 0 === g
          ? _emscripten_bind_btSliderConstraint_btSliderConstraint_4(a, c, d, e)
          : nw(a, c, d, e, g);
      h(eC)[this.hy] = this;
    }
    eC.prototype = Object.create(TA.prototype);
    eC.prototype.constructor = eC;
    eC.prototype.iy = eC;
    eC.jy = {};
    b.btSliderConstraint = eC;
    eC.prototype.setLowerLinLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ow(c, a);
    };
    eC.prototype.setUpperLinLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      pw(c, a);
    };
    eC.prototype.setLowerAngLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      qw(c, a);
    };
    eC.prototype.setUpperAngLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      rw(c, a);
    };
    eC.prototype.enableFeedback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      sw(c, a);
    };
    eC.prototype.getBreakingImpulseThreshold = function () {
      return tw(this.hy);
    };
    eC.prototype.setBreakingImpulseThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      uw(c, a);
    };
    eC.prototype.getParam = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return vw(d, a, c);
    };
    eC.prototype.setParam = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      ww(e, a, c, d);
    };
    eC.prototype.__destroy__ = function () {
      xw(this.hy);
    };
    function U() {
      this.hy = yw();
      h(U)[this.hy] = this;
    }
    U.prototype = Object.create(w.prototype);
    U.prototype.constructor = U;
    U.prototype.iy = U;
    U.jy = {};
    b.btPairCachingGhostObject = U;
    U.prototype.setAnisotropicFriction = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      zw(d, a, c);
    };
    U.prototype.getCollisionShape = function () {
      return k(Aw(this.hy), m);
    };
    U.prototype.setContactProcessingThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Bw(c, a);
    };
    U.prototype.setActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Cw(c, a);
    };
    U.prototype.forceActivationState = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Dw(c, a);
    };
    U.prototype.activate = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      void 0 === a ? Ew(c) : Fw(c, a);
    };
    U.prototype.isActive = function () {
      return !!Gw(this.hy);
    };
    U.prototype.isKinematicObject = function () {
      return !!Hw(this.hy);
    };
    U.prototype.isStaticObject = function () {
      return !!Iw(this.hy);
    };
    U.prototype.isStaticOrKinematicObject = function () {
      return !!Jw(this.hy);
    };
    U.prototype.getRestitution = function () {
      return Kw(this.hy);
    };
    U.prototype.getFriction = function () {
      return Lw(this.hy);
    };
    U.prototype.getRollingFriction = function () {
      return Mw(this.hy);
    };
    U.prototype.setRestitution = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Nw(c, a);
    };
    U.prototype.setFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ow(c, a);
    };
    U.prototype.setRollingFriction = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pw(c, a);
    };
    U.prototype.getWorldTransform = function () {
      return k(Qw(this.hy), r);
    };
    U.prototype.getCollisionFlags = function () {
      return Rw(this.hy);
    };
    U.prototype.setCollisionFlags = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Sw(c, a);
    };
    U.prototype.setWorldTransform = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Tw(c, a);
    };
    U.prototype.setCollisionShape = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Uw(c, a);
    };
    U.prototype.setCcdMotionThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Vw(c, a);
    };
    U.prototype.setCcdSweptSphereRadius = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ww(c, a);
    };
    U.prototype.getUserIndex = function () {
      return Xw(this.hy);
    };
    U.prototype.setUserIndex = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Yw(c, a);
    };
    U.prototype.getUserPointer = function () {
      return k(Zw(this.hy), SA);
    };
    U.prototype.setUserPointer = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      $w(c, a);
    };
    U.prototype.getBroadphaseHandle = function () {
      return k(ax(this.hy), t);
    };
    U.prototype.getNumOverlappingObjects = function () {
      return bx(this.hy);
    };
    U.prototype.getOverlappingObject = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(cx(c, a), q);
    };
    U.prototype.__destroy__ = function () {
      dx(this.hy);
    };
    function D() {
      throw "cannot construct a btManifoldPoint, no constructor in IDL";
    }
    D.prototype = Object.create(f.prototype);
    D.prototype.constructor = D;
    D.prototype.iy = D;
    D.jy = {};
    b.btManifoldPoint = D;
    D.prototype.getPositionWorldOnA = function () {
      return k(ex(this.hy), p);
    };
    D.prototype.getPositionWorldOnB = function () {
      return k(fx(this.hy), p);
    };
    D.prototype.getAppliedImpulse = function () {
      return gx(this.hy);
    };
    D.prototype.getDistance = function () {
      return hx(this.hy);
    };
    D.prototype.get_m_localPointA = D.prototype.AA = function () {
      return k(ix(this.hy), p);
    };
    D.prototype.set_m_localPointA = D.prototype.gD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      jx(c, a);
    };
    Object.defineProperty(D.prototype, "m_localPointA", {
      get: D.prototype.AA,
      set: D.prototype.gD,
    });
    D.prototype.get_m_localPointB = D.prototype.BA = function () {
      return k(kx(this.hy), p);
    };
    D.prototype.set_m_localPointB = D.prototype.hD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      lx(c, a);
    };
    Object.defineProperty(D.prototype, "m_localPointB", {
      get: D.prototype.BA,
      set: D.prototype.hD,
    });
    D.prototype.get_m_positionWorldOnB = D.prototype.NA = function () {
      return k(mx(this.hy), p);
    };
    D.prototype.set_m_positionWorldOnB = D.prototype.tD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      nx(c, a);
    };
    Object.defineProperty(D.prototype, "m_positionWorldOnB", {
      get: D.prototype.NA,
      set: D.prototype.tD,
    });
    D.prototype.get_m_positionWorldOnA = D.prototype.MA = function () {
      return k(ox(this.hy), p);
    };
    D.prototype.set_m_positionWorldOnA = D.prototype.sD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      px(c, a);
    };
    Object.defineProperty(D.prototype, "m_positionWorldOnA", {
      get: D.prototype.MA,
      set: D.prototype.sD,
    });
    D.prototype.get_m_normalWorldOnB = D.prototype.IA = function () {
      return k(qx(this.hy), p);
    };
    D.prototype.set_m_normalWorldOnB = D.prototype.oD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      rx(c, a);
    };
    Object.defineProperty(D.prototype, "m_normalWorldOnB", {
      get: D.prototype.IA,
      set: D.prototype.oD,
    });
    D.prototype.get_m_userPersistentData = D.prototype.oB = function () {
      return sx(this.hy);
    };
    D.prototype.set_m_userPersistentData = D.prototype.VD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      tx(c, a);
    };
    Object.defineProperty(D.prototype, "m_userPersistentData", {
      get: D.prototype.oB,
      set: D.prototype.VD,
    });
    D.prototype.__destroy__ = function () {
      ux(this.hy);
    };
    function fC(a, c, d, e) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      this.hy =
        void 0 === d
          ? vx(a, c)
          : void 0 === e
          ? _emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_3(
              a,
              c,
              d
            )
          : wx(a, c, d, e);
      h(fC)[this.hy] = this;
    }
    fC.prototype = Object.create(TA.prototype);
    fC.prototype.constructor = fC;
    fC.prototype.iy = fC;
    fC.jy = {};
    b.btPoint2PointConstraint = fC;
    fC.prototype.setPivotA = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      xx(c, a);
    };
    fC.prototype.setPivotB = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yx(c, a);
    };
    fC.prototype.getPivotInA = function () {
      return k(zx(this.hy), p);
    };
    fC.prototype.getPivotInB = function () {
      return k(Ax(this.hy), p);
    };
    fC.prototype.enableFeedback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Bx(c, a);
    };
    fC.prototype.getBreakingImpulseThreshold = function () {
      return Cx(this.hy);
    };
    fC.prototype.setBreakingImpulseThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Dx(c, a);
    };
    fC.prototype.getParam = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return Ex(d, a, c);
    };
    fC.prototype.setParam = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Fx(e, a, c, d);
    };
    fC.prototype.get_m_setting = fC.prototype.VA = function () {
      return k(Gx(this.hy), H);
    };
    fC.prototype.set_m_setting = fC.prototype.BD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Hx(c, a);
    };
    Object.defineProperty(fC.prototype, "m_setting", {
      get: fC.prototype.VA,
      set: fC.prototype.BD,
    });
    fC.prototype.__destroy__ = function () {
      Ix(this.hy);
    };
    function gC() {
      this.hy = Jx();
      h(gC)[this.hy] = this;
    }
    gC.prototype = Object.create(f.prototype);
    gC.prototype.constructor = gC;
    gC.prototype.iy = gC;
    gC.jy = {};
    b.btSoftBodyHelpers = gC;
    gC.prototype.CreateRope = function (a, c, d, e, g) {
      var n = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      return k(Kx(n, a, c, d, e, g), R);
    };
    gC.prototype.CreatePatch = function (a, c, d, e, g, n, F, aa, ta) {
      var Rb = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      n && "object" === typeof n && (n = n.hy);
      F && "object" === typeof F && (F = F.hy);
      aa && "object" === typeof aa && (aa = aa.hy);
      ta && "object" === typeof ta && (ta = ta.hy);
      return k(Lx(Rb, a, c, d, e, g, n, F, aa, ta), R);
    };
    gC.prototype.CreatePatchUV = function (a, c, d, e, g, n, F, aa, ta, Rb) {
      var nC = this.hy;
      IA();
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      n && "object" === typeof n && (n = n.hy);
      F && "object" === typeof F && (F = F.hy);
      aa && "object" === typeof aa && (aa = aa.hy);
      ta && "object" === typeof ta && (ta = ta.hy);
      "object" == typeof Rb && (Rb = MA(Rb));
      return k(Mx(nC, a, c, d, e, g, n, F, aa, ta, Rb), R);
    };
    gC.prototype.CreateEllipsoid = function (a, c, d, e) {
      var g = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      return k(Nx(g, a, c, d, e), R);
    };
    gC.prototype.CreateFromTriMesh = function (a, c, d, e, g) {
      var n = this.hy;
      IA();
      a && "object" === typeof a && (a = a.hy);
      "object" == typeof c && (c = MA(c));
      if ("object" == typeof d && "object" === typeof d) {
        var F = JA(d, Aa);
        KA(d, Aa, F);
        d = F;
      }
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      return k(Ox(n, a, c, d, e, g), R);
    };
    gC.prototype.CreateFromConvexHull = function (a, c, d, e) {
      var g = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      return k(Px(g, a, c, d, e), R);
    };
    gC.prototype.__destroy__ = function () {
      Qx(this.hy);
    };
    function t() {
      throw "cannot construct a btBroadphaseProxy, no constructor in IDL";
    }
    t.prototype = Object.create(f.prototype);
    t.prototype.constructor = t;
    t.prototype.iy = t;
    t.jy = {};
    b.btBroadphaseProxy = t;
    t.prototype.get_m_collisionFilterGroup = t.prototype.ky = function () {
      return Rx(this.hy);
    };
    t.prototype.set_m_collisionFilterGroup = t.prototype.my = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Sx(c, a);
    };
    Object.defineProperty(t.prototype, "m_collisionFilterGroup", {
      get: t.prototype.ky,
      set: t.prototype.my,
    });
    t.prototype.get_m_collisionFilterMask = t.prototype.ly = function () {
      return Tx(this.hy);
    };
    t.prototype.set_m_collisionFilterMask = t.prototype.ny = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ux(c, a);
    };
    Object.defineProperty(t.prototype, "m_collisionFilterMask", {
      get: t.prototype.ly,
      set: t.prototype.ny,
    });
    t.prototype.__destroy__ = function () {
      Vx(this.hy);
    };
    function TB() {
      throw "cannot construct a tNodeArray, no constructor in IDL";
    }
    TB.prototype = Object.create(f.prototype);
    TB.prototype.constructor = TB;
    TB.prototype.iy = TB;
    TB.jy = {};
    b.tNodeArray = TB;
    TB.prototype.size = TB.prototype.size = function () {
      return Wx(this.hy);
    };
    TB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Xx(c, a), Node);
    };
    TB.prototype.__destroy__ = function () {
      Yx(this.hy);
    };
    function hC(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = Zx(a);
      h(hC)[this.hy] = this;
    }
    hC.prototype = Object.create(m.prototype);
    hC.prototype.constructor = hC;
    hC.prototype.iy = hC;
    hC.jy = {};
    b.btBoxShape = hC;
    hC.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      $x(c, a);
    };
    hC.prototype.getMargin = function () {
      return ay(this.hy);
    };
    hC.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      by(c, a);
    };
    hC.prototype.getLocalScaling = function () {
      return k(cy(this.hy), p);
    };
    hC.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      dy(d, a, c);
    };
    hC.prototype.__destroy__ = function () {
      ey(this.hy);
    };
    function ZB() {
      throw "cannot construct a btFace, no constructor in IDL";
    }
    ZB.prototype = Object.create(f.prototype);
    ZB.prototype.constructor = ZB;
    ZB.prototype.iy = ZB;
    ZB.jy = {};
    b.btFace = ZB;
    ZB.prototype.get_m_indices = ZB.prototype.rA = function () {
      return k(fy(this.hy), VB);
    };
    ZB.prototype.set_m_indices = ZB.prototype.YC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      gy(c, a);
    };
    Object.defineProperty(ZB.prototype, "m_indices", {
      get: ZB.prototype.rA,
      set: ZB.prototype.YC,
    });
    ZB.prototype.get_m_plane = ZB.prototype.LA = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return hy(c, a);
    };
    ZB.prototype.set_m_plane = ZB.prototype.rD = function (a, c) {
      var d = this.hy;
      IA();
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      iy(d, a, c);
    };
    Object.defineProperty(ZB.prototype, "m_plane", {
      get: ZB.prototype.LA,
      set: ZB.prototype.rD,
    });
    ZB.prototype.__destroy__ = function () {
      jy(this.hy);
    };
    function iC() {
      this.hy = ky();
      h(iC)[this.hy] = this;
    }
    iC.prototype = Object.create(RA.prototype);
    iC.prototype.constructor = iC;
    iC.prototype.iy = iC;
    iC.jy = {};
    b.DebugDrawer = iC;
    iC.prototype.drawLine = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      ly(e, a, c, d);
    };
    iC.prototype.drawContactPoint = function (a, c, d, e, g) {
      var n = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      my(n, a, c, d, e, g);
    };
    iC.prototype.reportErrorWarning = function (a) {
      var c = this.hy;
      IA();
      a = a && "object" === typeof a ? a.hy : LA(a);
      ny(c, a);
    };
    iC.prototype.draw3dText = function (a, c) {
      var d = this.hy;
      IA();
      a && "object" === typeof a && (a = a.hy);
      c = c && "object" === typeof c ? c.hy : LA(c);
      oy(d, a, c);
    };
    iC.prototype.setDebugMode = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      py(c, a);
    };
    iC.prototype.getDebugMode = function () {
      return qy(this.hy);
    };
    iC.prototype.__destroy__ = function () {
      ry(this.hy);
    };
    function jC(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = sy(a, c);
      h(jC)[this.hy] = this;
    }
    jC.prototype = Object.create(VA.prototype);
    jC.prototype.constructor = jC;
    jC.prototype.iy = jC;
    jC.jy = {};
    b.btCapsuleShapeX = jC;
    jC.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      ty(c, a);
    };
    jC.prototype.getMargin = function () {
      return uy(this.hy);
    };
    jC.prototype.getUpAxis = function () {
      return vy(this.hy);
    };
    jC.prototype.getRadius = function () {
      return wy(this.hy);
    };
    jC.prototype.getHalfHeight = function () {
      return xy(this.hy);
    };
    jC.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      yy(c, a);
    };
    jC.prototype.getLocalScaling = function () {
      return k(zy(this.hy), p);
    };
    jC.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Ay(d, a, c);
    };
    jC.prototype.__destroy__ = function () {
      By(this.hy);
    };
    function W(a, c, d, e) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      this.hy = Cy(a, c, d, e);
      h(W)[this.hy] = this;
    }
    W.prototype = Object.create(aB.prototype);
    W.prototype.constructor = W;
    W.prototype.iy = W;
    W.jy = {};
    b.btQuaternion = W;
    W.prototype.setValue = function (a, c, d, e) {
      var g = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      Dy(g, a, c, d, e);
    };
    W.prototype.setEulerZYX = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Ey(e, a, c, d);
    };
    W.prototype.setRotation = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Fy(d, a, c);
    };
    W.prototype.normalize = W.prototype.normalize = function () {
      Gy(this.hy);
    };
    W.prototype.length2 = function () {
      return Hy(this.hy);
    };
    W.prototype.length = W.prototype.length = function () {
      return Iy(this.hy);
    };
    W.prototype.dot = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return Jy(c, a);
    };
    W.prototype.normalized = function () {
      return k(Ky(this.hy), W);
    };
    W.prototype.getAxis = function () {
      return k(Ly(this.hy), p);
    };
    W.prototype.inverse = W.prototype.inverse = function () {
      return k(My(this.hy), W);
    };
    W.prototype.getAngle = function () {
      return Ny(this.hy);
    };
    W.prototype.getAngleShortestPath = function () {
      return Oy(this.hy);
    };
    W.prototype.angle = W.prototype.angle = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return Py(c, a);
    };
    W.prototype.angleShortestPath = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return Qy(c, a);
    };
    W.prototype.op_add = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Ry(c, a), W);
    };
    W.prototype.op_sub = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Sy(c, a), W);
    };
    W.prototype.op_mul = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Ty(c, a), W);
    };
    W.prototype.op_mulq = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Uy(c, a), W);
    };
    W.prototype.op_div = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Vy(c, a), W);
    };
    W.prototype.x = W.prototype.x = function () {
      return Wy(this.hy);
    };
    W.prototype.y = W.prototype.y = function () {
      return Xy(this.hy);
    };
    W.prototype.z = W.prototype.z = function () {
      return Yy(this.hy);
    };
    W.prototype.w = function () {
      return Zy(this.hy);
    };
    W.prototype.setX = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      $y(c, a);
    };
    W.prototype.setY = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      az(c, a);
    };
    W.prototype.setZ = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      bz(c, a);
    };
    W.prototype.setW = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      cz(c, a);
    };
    W.prototype.__destroy__ = function () {
      dz(this.hy);
    };
    function kC(a, c) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      this.hy = ez(a, c);
      h(kC)[this.hy] = this;
    }
    kC.prototype = Object.create(VA.prototype);
    kC.prototype.constructor = kC;
    kC.prototype.iy = kC;
    kC.jy = {};
    b.btCapsuleShapeZ = kC;
    kC.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      fz(c, a);
    };
    kC.prototype.getMargin = function () {
      return gz(this.hy);
    };
    kC.prototype.getUpAxis = function () {
      return hz(this.hy);
    };
    kC.prototype.getRadius = function () {
      return iz(this.hy);
    };
    kC.prototype.getHalfHeight = function () {
      return jz(this.hy);
    };
    kC.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      kz(c, a);
    };
    kC.prototype.getLocalScaling = function () {
      return k(lz(this.hy), p);
    };
    kC.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      mz(d, a, c);
    };
    kC.prototype.__destroy__ = function () {
      nz(this.hy);
    };
    function v() {
      throw "cannot construct a btContactSolverInfo, no constructor in IDL";
    }
    v.prototype = Object.create(f.prototype);
    v.prototype.constructor = v;
    v.prototype.iy = v;
    v.jy = {};
    b.btContactSolverInfo = v;
    v.prototype.get_m_splitImpulse = v.prototype.YA = function () {
      return !!oz(this.hy);
    };
    v.prototype.set_m_splitImpulse = v.prototype.ED = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      pz(c, a);
    };
    Object.defineProperty(v.prototype, "m_splitImpulse", {
      get: v.prototype.YA,
      set: v.prototype.ED,
    });
    v.prototype.get_m_splitImpulsePenetrationThreshold = v.prototype.ZA = function () {
      return qz(this.hy);
    };
    v.prototype.set_m_splitImpulsePenetrationThreshold = v.prototype.FD = function (
      a
    ) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      rz(c, a);
    };
    Object.defineProperty(v.prototype, "m_splitImpulsePenetrationThreshold", {
      get: v.prototype.ZA,
      set: v.prototype.FD,
    });
    v.prototype.get_m_numIterations = v.prototype.JA = function () {
      return sz(this.hy);
    };
    v.prototype.set_m_numIterations = v.prototype.pD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      tz(c, a);
    };
    Object.defineProperty(v.prototype, "m_numIterations", {
      get: v.prototype.JA,
      set: v.prototype.pD,
    });
    v.prototype.__destroy__ = function () {
      uz(this.hy);
    };
    function lC(a, c, d, e, g) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      this.hy =
        void 0 === e
          ? vz(a, c, d)
          : void 0 === g
          ? _emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_4(
              a,
              c,
              d,
              e
            )
          : wz(a, c, d, e, g);
      h(lC)[this.hy] = this;
    }
    lC.prototype = Object.create(eB.prototype);
    lC.prototype.constructor = lC;
    lC.prototype.iy = lC;
    lC.jy = {};
    b.btGeneric6DofSpringConstraint = lC;
    lC.prototype.enableSpring = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      xz(d, a, c);
    };
    lC.prototype.setStiffness = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      yz(d, a, c);
    };
    lC.prototype.setDamping = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      zz(d, a, c);
    };
    lC.prototype.setEquilibriumPoint = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      void 0 === a ? Az(d) : void 0 === c ? Bz(d, a) : Cz(d, a, c);
    };
    lC.prototype.setLinearLowerLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Dz(c, a);
    };
    lC.prototype.setLinearUpperLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Ez(c, a);
    };
    lC.prototype.setAngularLowerLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Fz(c, a);
    };
    lC.prototype.setAngularUpperLimit = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Gz(c, a);
    };
    lC.prototype.getFrameOffsetA = function () {
      return k(Hz(this.hy), r);
    };
    lC.prototype.enableFeedback = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Iz(c, a);
    };
    lC.prototype.getBreakingImpulseThreshold = function () {
      return Jz(this.hy);
    };
    lC.prototype.setBreakingImpulseThreshold = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Kz(c, a);
    };
    lC.prototype.getParam = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      return Lz(d, a, c);
    };
    lC.prototype.setParam = function (a, c, d) {
      var e = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      Mz(e, a, c, d);
    };
    lC.prototype.__destroy__ = function () {
      Nz(this.hy);
    };
    function mC(a) {
      a && "object" === typeof a && (a = a.hy);
      this.hy = Oz(a);
      h(mC)[this.hy] = this;
    }
    mC.prototype = Object.create(m.prototype);
    mC.prototype.constructor = mC;
    mC.prototype.iy = mC;
    mC.jy = {};
    b.btSphereShape = mC;
    mC.prototype.setMargin = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Pz(c, a);
    };
    mC.prototype.getMargin = function () {
      return Qz(this.hy);
    };
    mC.prototype.setLocalScaling = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Rz(c, a);
    };
    mC.prototype.getLocalScaling = function () {
      return k(Sz(this.hy), p);
    };
    mC.prototype.calculateLocalInertia = function (a, c) {
      var d = this.hy;
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Tz(d, a, c);
    };
    mC.prototype.__destroy__ = function () {
      Uz(this.hy);
    };
    function Y() {
      throw "cannot construct a Face, no constructor in IDL";
    }
    Y.prototype = Object.create(f.prototype);
    Y.prototype.constructor = Y;
    Y.prototype.iy = Y;
    Y.jy = {};
    b.Face = Y;
    Y.prototype.get_m_n = Y.prototype.Hy = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(Vz(c, a), Node);
    };
    Y.prototype.set_m_n = Y.prototype.Qy = function (a, c) {
      var d = this.hy;
      IA();
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      Wz(d, a, c);
    };
    Object.defineProperty(Y.prototype, "m_n", {
      get: Y.prototype.Hy,
      set: Y.prototype.Qy,
    });
    Y.prototype.get_m_normal = Y.prototype.HA = function () {
      return k(Xz(this.hy), p);
    };
    Y.prototype.set_m_normal = Y.prototype.nD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      Yz(c, a);
    };
    Object.defineProperty(Y.prototype, "m_normal", {
      get: Y.prototype.HA,
      set: Y.prototype.nD,
    });
    Y.prototype.get_m_ra = Y.prototype.PA = function () {
      return Zz(this.hy);
    };
    Y.prototype.set_m_ra = Y.prototype.vD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      $z(c, a);
    };
    Object.defineProperty(Y.prototype, "m_ra", {
      get: Y.prototype.PA,
      set: Y.prototype.vD,
    });
    Y.prototype.__destroy__ = function () {
      aA(this.hy);
    };
    function UB() {
      throw "cannot construct a tFaceArray, no constructor in IDL";
    }
    UB.prototype = Object.create(f.prototype);
    UB.prototype.constructor = UB;
    UB.prototype.iy = UB;
    UB.jy = {};
    b.tFaceArray = UB;
    UB.prototype.size = UB.prototype.size = function () {
      return bA(this.hy);
    };
    UB.prototype.at = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      return k(cA(c, a), Y);
    };
    UB.prototype.__destroy__ = function () {
      dA(this.hy);
    };
    function Z(a, c, d, e, g) {
      a && "object" === typeof a && (a = a.hy);
      c && "object" === typeof c && (c = c.hy);
      d && "object" === typeof d && (d = d.hy);
      e && "object" === typeof e && (e = e.hy);
      g && "object" === typeof g && (g = g.hy);
      this.hy = eA(a, c, d, e, g);
      h(Z)[this.hy] = this;
    }
    Z.prototype = Object.create(f.prototype);
    Z.prototype.constructor = Z;
    Z.prototype.iy = Z;
    Z.jy = {};
    b.LocalConvexResult = Z;
    Z.prototype.get_m_hitCollisionObject = Z.prototype.iA = function () {
      return k(fA(this.hy), q);
    };
    Z.prototype.set_m_hitCollisionObject = Z.prototype.PC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      gA(c, a);
    };
    Object.defineProperty(Z.prototype, "m_hitCollisionObject", {
      get: Z.prototype.iA,
      set: Z.prototype.PC,
    });
    Z.prototype.get_m_localShapeInfo = Z.prototype.CA = function () {
      return k(hA(this.hy), tB);
    };
    Z.prototype.set_m_localShapeInfo = Z.prototype.iD = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      iA(c, a);
    };
    Object.defineProperty(Z.prototype, "m_localShapeInfo", {
      get: Z.prototype.CA,
      set: Z.prototype.iD,
    });
    Z.prototype.get_m_hitNormalLocal = Z.prototype.mA = function () {
      return k(jA(this.hy), p);
    };
    Z.prototype.set_m_hitNormalLocal = Z.prototype.TC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      kA(c, a);
    };
    Object.defineProperty(Z.prototype, "m_hitNormalLocal", {
      get: Z.prototype.mA,
      set: Z.prototype.TC,
    });
    Z.prototype.get_m_hitPointLocal = Z.prototype.oA = function () {
      return k(lA(this.hy), p);
    };
    Z.prototype.set_m_hitPointLocal = Z.prototype.VC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      mA(c, a);
    };
    Object.defineProperty(Z.prototype, "m_hitPointLocal", {
      get: Z.prototype.oA,
      set: Z.prototype.VC,
    });
    Z.prototype.get_m_hitFraction = Z.prototype.jA = function () {
      return nA(this.hy);
    };
    Z.prototype.set_m_hitFraction = Z.prototype.QC = function (a) {
      var c = this.hy;
      a && "object" === typeof a && (a = a.hy);
      oA(c, a);
    };
    Object.defineProperty(Z.prototype, "m_hitFraction", {
      get: Z.prototype.jA,
      set: Z.prototype.QC,
    });
    Z.prototype.__destroy__ = function () {
      pA(this.hy);
    };
    (function () {
      function a() {
        b.BT_CONSTRAINT_ERP = qA();
        b.BT_CONSTRAINT_STOP_ERP = rA();
        b.BT_CONSTRAINT_CFM = sA();
        b.BT_CONSTRAINT_STOP_CFM = tA();
        b.PHY_FLOAT = uA();
        b.PHY_DOUBLE = vA();
        b.PHY_INTEGER = wA();
        b.PHY_SHORT = xA();
        b.PHY_FIXEDPOINT88 = yA();
        b.PHY_UCHAR = zA();
      }
      Ka ? a() : Ia.unshift(a);
    })();
    Ammo = b;

    return Ammo.ready;
  };
})();

export default Ammo;
