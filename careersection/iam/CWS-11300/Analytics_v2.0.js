// Version 2019-02-22 : GA360 & AT Internet v1.2.js From Nicolas AUCHER
// Version 2022-10-19 : Mario Alva -> Add CNIL EXEMPT for AT-Internet and use page.send() 
//                      Imply the updating of SmartTag code  
// No TK but AT/GA
// Javascript Viewer, Beautifier and Formatter: https://www.danstools.com/javascript-beautify/
//
/* AT Internet SmartTag Core Proprietary Code */
(function() {
    var dfltPluginCfg = {
        "sourceFile": "download",
        "info": true
		};
    var dfltGlobalCfg = {
        "site": 551845,
        "log": "",
        "logSSL": "",
        "domain": "xiti.com",
        "collectDomain": "logc406.xiti.com",
        "collectDomainSSL": "logs1406.xiti.com",
        "userIdOrigin": "server",
        "pixelPath": "/hit.xiti",
        "disableCookie": false,
        "disableStorage": false,
        "cookieSecure": false,
        "cookieDomain": "",
        "preview": false,
        "plgs": ["Clicks", "ClientSideUserId", "ContextVariables", "Page", "Campaigns", "IdentifiedVisitor", "Events", "InternalSearch", "OnSiteAds", "Privacy", "RichMedia", "Offline", "Ecommerce", "MvTesting"],
        "lazyLoadingPath": "",
        "documentLevel": "document",
        "redirect": false,
        "activateCallbacks": true,
        "medium": "",
        "ignoreEmptyChapterValue": true,
        "base64Storage": false,
        "sendHitWhenOptOut": true,
        "forceHttp": false,
        "requestMethod": "GET",
        "maxHitSize": 2000,
        "urlPropertyAuto": false,
        "urlPropertyQueryString": false,
        "sameSiteStrict": false
    };
    (function(a) {
        a.ATInternet = a.ATInternet || {};
        a.ATInternet.Tracker = a.ATInternet.Tracker || {};
        a.ATInternet.Tracker.Plugins = a.ATInternet.Tracker.Plugins || {}
    })(window);
    var Utils = function() {
        function a(h) {
            var b = typeof h;
            if ("object" !== b || null === h) return "string" === b && (h = '"' + h + '"'), String(h);
            var f, g, c = [],
                d = h.constructor === Array;
            for (f in h) h.hasOwnProperty(f) && (g = h[f], b = typeof g, "function" !== b && "undefined" !== b && ("string" === b ? g = '"' + g.replace(/[^\\]"/g, '\\"') + '"' : "object" === b && null !== g && (g = a(g)), c.push((d ? "" : '"' + f + '":') + String(g))));
            return (d ? "[" : "{") + String(c) + (d ? "]" : "}")
        }

        function e(a) {
            return null === a ? "" : (a + "").replace(c, "")
        }

        function k(a) {
            var m, f = null;
            return (a = e(a + "")) &&
                !e(a.replace(b, function(a, h, b, c) {
                    m && h && (f = 0);
                    if (0 === f) return a;
                    m = b || h;
                    f += !c - !b;
                    return ""
                })) ? Function("return " + a)() : null
        }
        var d = this,
            b = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g,
            c = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g");
        d.isLocalStorageAvailable = function() {
            try {
                var a = localStorage;
                a.setItem("__storage_test__", "__storage_test__");
                a.removeItem("__storage_test__");
                return !0
            } catch (b) {
                return !1
            }
        };
        d.isBeaconMethodAvailable = function() {
            return window.navigator && "function" === typeof window.navigator.sendBeacon
        };
        d.Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(a) {
                var b = "",
                    f, g, c, n, q, l, e = 0;
                for (a = d.Base64._utf8_encode(a); e < a.length;) f = a.charCodeAt(e++), g = a.charCodeAt(e++), c = a.charCodeAt(e++), n = f >> 2, f = (f & 3) << 4 | g >> 4, q = (g & 15) << 2 | c >> 6, l = c & 63, isNaN(g) ? q = l = 64 : isNaN(c) && (l = 64), b = b + this._keyStr.charAt(n) + this._keyStr.charAt(f) + this._keyStr.charAt(q) + this._keyStr.charAt(l);
                return b
            },
            decode: function(a) {
                var b = "",
                    f, g, c, n, q, l = 0;
                for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < a.length;) f = this._keyStr.indexOf(a.charAt(l++)), g = this._keyStr.indexOf(a.charAt(l++)), n = this._keyStr.indexOf(a.charAt(l++)), q = this._keyStr.indexOf(a.charAt(l++)), f = f << 2 | g >> 4, g = (g & 15) << 4 | n >> 2, c = (n & 3) << 6 | q, b += String.fromCharCode(f), 64 != n && (b += String.fromCharCode(g)), 64 != q && (b += String.fromCharCode(c));
                return b = d.Base64._utf8_decode(b)
            },
            _utf8_encode: function(a) {
                a = a.replace(/\r\n/g, "\n");
                for (var b = "", f = 0; f <
                    a.length; f++) {
                    var g = a.charCodeAt(f);
                    128 > g ? b += String.fromCharCode(g) : (127 < g && 2048 > g ? b += String.fromCharCode(g >> 6 | 192) : (b += String.fromCharCode(g >> 12 | 224), b += String.fromCharCode(g >> 6 & 63 | 128)), b += String.fromCharCode(g & 63 | 128))
                }
                return b
            },
            _utf8_decode: function(a) {
                for (var b = "", f = 0, g, c, d; f < a.length;) g = a.charCodeAt(f), 128 > g ? (b += String.fromCharCode(g), f++) : 191 < g && 224 > g ? (c = a.charCodeAt(f + 1), b += String.fromCharCode((g & 31) << 6 | c & 63), f += 2) : (c = a.charCodeAt(f + 1), d = a.charCodeAt(f + 2), b += String.fromCharCode((g & 15) << 12 |
                    (c & 63) << 6 | d & 63), f += 3);
                return b
            }
        };
        d.loadScript = function(a, b) {
            var f;
            b = b || function() {};
            f = document.createElement("script");
            f.type = "text/javascript";
            f.src = a.url;
            f.async = !1;
            f.defer = !1;
            f.onload = f.onreadystatechange = function(a) {
                a = a || window.event;
                if ("load" === a.type || /loaded|complete/.test(f.readyState) && (!document.documentMode || 9 > document.documentMode)) f.onload = f.onreadystatechange = f.onerror = null, b(null, a)
            };
            f.onerror = function(a) {
                f.onload = f.onreadystatechange = f.onerror = null;
                b({
                    msg: "script not loaded",
                    event: a
                })
            };
            var g = document.head || document.getElementsByTagName("head")[0];
            g.insertBefore(f, g.lastChild)
        };
        d.cloneSimpleObject = function(a, b) {
            if ("object" !== typeof a || null === a || a instanceof Date) return a;
            var f = new a.constructor,
                g;
            for (g in a) a.hasOwnProperty(g) && (void 0 === g || b && void 0 === a[g] || (f[g] = d.cloneSimpleObject(a[g])));
            return f
        };
        d.isEmptyObject = function(a) {
            for (var b in a)
                if (a.hasOwnProperty(b)) return !1;
            return !0
        };
        d.isObject = function(a) {
            return null !== a && "object" === typeof a && !(a instanceof Array)
        };
        d.ATVALUE = "_ATVALUE";
        d.ATPREFIX = "_ATPREFIX";
        d.object2Flatten = function(a, b, f, g, c) {
            var n = {},
                q = "",
                l = "",
                e = [],
                r = "",
                t = 0,
                u;
            for (u in a)
                if (a.hasOwnProperty(u))
                    if (n = d.splitProtocolAndKey(u, c), q = n.prefix || g || "", l = (b ? b + "_" : "") + n.key, d.isObject(a[u])) d.object2Flatten(a[u], l, f, q, c);
                    else {
                        e = l.split("_");
                        r = "";
                        for (t = 0; t < e.length; t++) n = d.splitProtocolAndKey(e[t], c), q = n.prefix || q, r += n.key + (t < e.length - 1 ? "_" : "");
                        l = r || l;
                        f[l] = f[l] || {};
                        f[l][d.ATVALUE] = a[u];
                        f[l][d.ATPREFIX] = q
                    }
        };
        d.flatten2Object = function(a, b, f) {
            b = b.split("_");
            var g, c;
            for (c = 0; c <
                b.length - 1; c++) g = b[c], a[g] || (a[g] = {}), a = a[g];
            if (a.hasOwnProperty(d.ATVALUE)) {
                g = a[d.ATVALUE];
                var n = a[d.ATPREFIX];
                delete a[d.ATVALUE];
                delete a[d.ATPREFIX];
                a.$ = {};
                a.$[d.ATVALUE] = g;
                a.$[d.ATPREFIX] = n
            }
            f = d.cloneSimpleObject(f);
            a[b[c]] ? a[b[c]].$ = f : a[b[c]] = f
        };
        d.getFormattedObject = function(a) {
            var b = {},
                f, g;
            for (g in a) a.hasOwnProperty(g) && (a[g].hasOwnProperty(d.ATVALUE) ? (f = a[g][d.ATPREFIX] ? a[g][d.ATPREFIX] + ":" + g : g, b[f] = a[g][d.ATVALUE]) : b[g] = d.getFormattedObject(a[g]));
            return b
        };
        d.completeFstLevelObj = function(a,
            b, f) {
            if (a) {
                if (b)
                    for (var g in b) !b.hasOwnProperty(g) || a[g] && !f || (a[g] = b[g])
            } else a = b;
            return a
        };
        d.getObjectKeys = function(a) {
            var b = [],
                f;
            for (f in a) a.hasOwnProperty(f) && b.push(f);
            return b
        };
        d.objectToLowercase = function(a) {
            var b = {},
                f;
            for (f in a) a.hasOwnProperty(f) && (d.isObject(a[f]) ? b[f.toLowerCase()] = d.objectToLowercase(a[f]) : b[f.toLowerCase()] = a[f]);
            return b
        };
        d.splitProtocolAndKey = function(a, b) {
            var f, g;
            2 > a.length || ":" !== a[1] ? (f = "", g = a) : 4 > a.length || ":" !== a[3] ? (f = a.substring(0, 1), g = a.substring(2, a.length)) :
                (f = a.substring(0, 3), g = a.substring(4, a.length));
            b && (f = f.toLowerCase(), g = g.toLowerCase());
            return {
                prefix: f,
                key: g
            }
        };
        d.jsonSerialize = function(b) {
            try {
                return "undefined" !== typeof JSON && JSON.stringify ? JSON.stringify(b) : a(b)
            } catch (c) {
                return null
            }
        };
        d.jsonParse = function(a) {
            try {
                return "undefined" !== typeof JSON && JSON.parse ? JSON.parse(a + "") : k(a)
            } catch (b) {
                return null
            }
        };
        d.trim = function(a) {
            try {
                return String.prototype.trim ? a.trim() : a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            } catch (b) {
                return a
            }
        };
        d.arrayIndexOf =
            function(a, b) {
                if (Array.prototype.indexOf) {
                    var c = -1;
                    "undefined" !== typeof a.indexOf(b) && (c = a.indexOf(b));
                    return c
                }
                return function(a) {
                    if (null == this) throw new TypeError;
                    var b = Object(this),
                        h = b.length >>> 0;
                    if (0 === h) return -1;
                    var c = 0;
                    1 < arguments.length && (c = Number(arguments[1]), c != c ? c = 0 : 0 != c && Infinity != c && -Infinity != c && (c = (0 < c || -1) * Math.floor(Math.abs(c))));
                    if (c >= h) return -1;
                    for (c = 0 <= c ? c : Math.max(h - Math.abs(c), 0); c < h; c++)
                        if (c in b && b[c] === a) return c;
                    return -1
                }.apply(a, [b])
            };
        d.uuid = function() {
            function a(g) {
                var h =
                    Math.random();
                try {
                    c && (h = b.getRandomValues(new Uint32Array(1))[0] / Math.pow(2, 32))
                } catch (d) {}
                return Math.floor((9 * h + 1) * Math.pow(10, g - 1))
            }
            var b = window.crypto || window.msCrypto,
                c = null !== b && "object" === typeof b;
            return {
                v4: function() {
                    try {
                        if (c) return ([1E7] + -1E3 + -4E3 + -8E3 + -1E11).replace(/[018]/g, function(a) {
                            return (a ^ b.getRandomValues(new Uint32Array(1))[0] & 15 >> a / 4).toString(16)
                        })
                    } catch (a) {}
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                        var b = 16 * Math.random() | 0;
                        return ("x" === a ? b : b & 3 |
                            8).toString(16)
                    })
                },
                num: function(b) {
                    var c = new Date,
                        f = function(a) {
                            a -= 100 * Math.floor(a / 100);
                            return 10 > a ? "0" + a : String(a)
                        };
                    return f(c.getHours()) + "" + f(c.getMinutes()) + "" + f(c.getSeconds()) + "" + a(b - 6)
                }
            }
        };
        d.isPreview = function() {
            return window.navigator && "preview" === window.navigator.loadPurpose
        };
        d.isPrerender = function(a) {
            var b, c = !1,
                g = ["webkit", "ms"];
            if ("prerender" === document.visibilityState) b = "visibilitychange";
            else
                for (var e = 0; e < g.length; e++) "prerender" === document[g[e] + "VisibilityState"] && (b = g[e] + "visibilitychange");
            if ("undefined" !== typeof b) {
                var n = function(c) {
                    a(c);
                    d.removeEvtListener(document, b, n)
                };
                d.addEvtListener(document, b, n);
                c = !0
            }
            return c
        };
        d.addEvtListener = function(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
        };
        d.removeEvtListener = function(a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
        };
        d.hashcode = function(a) {
            var b = 0;
            if (0 === a.length) return b;
            for (var c = 0; c < a.length; c++) var g = a.charCodeAt(c),
                b = (b << 5) - b + g,
                b = b | 0;
            return b
        };
        d.setLocation = function(a) {
            var b = a.location;
            a = window[a.target] || window;
            b && (a.location.href = b)
        };
        d.dispatchCallbackEvent = function(a) {
            var b;
            if ("function" === typeof window.Event) b = new Event("ATCallbackEvent");
            else try {
                b = document.createEvent("Event"), b.initEvent && b.initEvent("ATCallbackEvent", !0, !0)
            } catch (c) {}
            b && "function" === typeof document.dispatchEvent && (b.name = a, document.dispatchEvent(b))
        };
        d.addCallbackEvent = function(a) {
            d.addEvtListener(document, "ATCallbackEvent", a)
        };
        d.removeCallbackEvent = function(a) {
            d.removeEvent("ATCallbackEvent",
                a)
        };
        (function() {
            function a(b, c) {
                c = c || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var g;
                try {
                    g = document.createEvent("CustomEvent"), g.initCustomEvent(b, c.bubbles, c.cancelable, c.detail)
                } catch (h) {}
                return g
            }
            "function" === typeof window.CustomEvent ? window.ATCustomEvent = window.CustomEvent : ("function" === typeof window.Event && (a.prototype = window.Event.prototype), window.ATCustomEvent = a)
        })();
        d.addEvent = function(a, b, c, g) {
            d[a] = new ATCustomEvent(a, {
                detail: {
                    name: b,
                    id: c
                }
            });
            d.addEvtListener(document, a, g)
        };
        d.removeEvent =
            function(a, b) {
                d.removeEvtListener(document, a, b)
            };
        d.dispatchEvent = function(a, b) {
            d[a] = d[a] || new ATCustomEvent(a, {
                detail: {
                    name: b,
                    id: -1
                }
            });
            try {
                document.dispatchEvent(d[a])
            } catch (c) {}
        };
        d.privacy = new function() {
            function a(b, c) {
                var g = [],
                    f, h;
                f = {};
                for (var l = 0; l < b.length; l++) {
                    f = {};
                    d.object2Flatten(b[l], null, f, null, !0);
                    for (var m in f) f.hasOwnProperty(m) && -1 === d.arrayIndexOf(c, m) && delete f[m];
                    if (!d.isEmptyObject(f)) {
                        h = {};
                        for (var e in f) f.hasOwnProperty(e) && d.flatten2Object(h, e, f[e]);
                        f = d.getFormattedObject(h);
                        g.push(f)
                    }
                }
                return g
            }

            function b(a, c, g) {
                1 < a.length ? ("undefined" === typeof c[a[0]] && (c[a[0]] = {}), b(a.slice(1, a.length), c[a[0]], g)) : c[a[0]] = g
            }

            function c(a, b, g, h, l) {
                var d = h ? h : {};
                if (!a || "object" !== typeof a || a instanceof Array)
                    if ("undefined" !== typeof a && 0 <= g.indexOf(l) || "undefined" === typeof g) d[l] = a;
                    else
                        for (b = 0; b < g.length; b++) {
                            if (l && 0 === l.indexOf(g[b])) {
                                d[l] = a;
                                break
                            }
                        } else
                            for (var m in a) a.hasOwnProperty(m) && c(a[m], b, g, d, (l ? l + b : "") + m);
                if (void 0 === h) return d
            }

            function g(a, g, h) {
                for (var l = [], e = 0; e < a.length; e++) {
                    var v;
                    v = c(a[e], h, g);
                    var n = h,
                        s = {},
                        q = void 0;
                    for (q in v)
                        if (v.hasOwnProperty(q)) {
                            var p = q.split(n);
                            b(p, s, v[q])
                        }
                    v = s;
                    d.isEmptyObject(v) || l.push(v)
                }
                return l
            }

            function e(a, b) {
                var c = "",
                    g = {
                        key: "",
                        flattenedProperty: ""
                    };
                switch (!0) {
                    case 0 === a.indexOf("stc_"):
                        c = "stc_";
                        break;
                    case 0 === a.indexOf("stc/"):
                        c = "stc/";
                        break;
                    case 0 === a.indexOf("events_"):
                        c = "events_";
                        break;
                    case 0 === a.indexOf("context_"):
                        c = "context_";
                        break;
                    default:
                        g.key = a
                }
                if (c) {
                    var f = c.substring(0, c.length - 1);
                    g.key = f;
                    0 > b.indexOf(f) && (g.flattenedProperty = a.substring(c.length))
                }
                return g
            }

            function n(a) {
                for (var b = [], c = {}, g = 0; g < a.length; g++)
                    if ("string" === typeof a[g]) {
                        var f = {};
                        if (-1 < a[g].indexOf("#")) {
                            var h = a[g].split("#");
                            h[0] === s && (f = e(h[1], a))
                        } else f = e(a[g], a);
                        f.key && 0 > b.indexOf(f.key) && b.push(f.key);
                        f.flattenedProperty && (c[f.key] = (c[f.key] || []).concat(f.flattenedProperty))
                    } else
                        for (var l in a[g]) a[g].hasOwnProperty(l) && (0 > b.indexOf(l) && b.push(l), 0 > a.indexOf(l) && (c[l] = (c[l] || []).concat(a[g][l])));
                return {
                    keys: b,
                    values: c
                }
            }
            var q = this,
                l = {
                    storageParams: null,
                    bufferParams: null
                },
                s = "";
            q.CONSENTNO =
                "Consent-NO";
            q.ALL = "*";
            q.testStorageParam = function(a, b) {
                var c;
                if (l.storageParams instanceof Array) {
                    for (var g, f = l.storageParams.length - 1; 0 <= f; f--)
                        if (g = l.storageParams[f], "string" === typeof g) {
                            if (g === a || g === q.ALL) return {
                                toSetInStorage: !0
                            }
                        } else {
                            a: {
                                c = a;
                                var h = b,
                                    d = void 0,
                                    m = void 0;
                                for (m in g)
                                    if (g.hasOwnProperty(m) && c === m) {
                                        if (!h) {
                                            c = !0;
                                            break a
                                        }
                                        d = [];
                                        g[m] instanceof Array ? d = g[m] : d.push(g[m]);
                                        for (var e = 0; e < d.length; e++)
                                            if (d[e] === h) {
                                                c = !0;
                                                break a
                                            }
                                    }
                                c = !1
                            }
                            if (c) return {
                                toSetInStorage: !0
                            }
                        }
                    return {
                        toSetInStorage: !1
                    }
                }
                return {
                    toSetInStorage: !0
                }
            };
            q.processStorageParams = function(a, b, c) {
                if (c) {
                    c = c();
                    var g = n(l.storageParams);
                    if (g.keys[0] !== q.ALL)
                        for (var f in c)
                            if (c.hasOwnProperty(f) && void 0 !== c[f])
                                if (-1 === d.arrayIndexOf(g.keys, f)) a && a(f);
                                else if (d.isObject(c[f])) {
                        var h = f,
                            m = c[f].val,
                            e = g.values[f],
                            s = a,
                            p = b;
                        if ("undefined" !== typeof e) {
                            var k = [];
                            e instanceof Array ? k = e : k.push(e);
                            e = void 0;
                            for (e in m) m.hasOwnProperty(e) && -1 === d.arrayIndexOf(k, e) && s && s([h, e]);
                            s && p && d.isEmptyObject(p(h)) && s(h)
                        }
                    }
                }
            };
            q.testBufferParam = function(b, c) {
                var f, m;
                if (l.bufferParams instanceof Array) {
                    f = n(l.bufferParams);
                    for (m = 0; m < f.keys.length; m++)
                        if (f.keys[m] === b || f.keys[m] === q.ALL)
                            if (f.values.hasOwnProperty(f.keys[m])) {
                                var e = {};
                                e[f.keys[m]] = f.values[f.keys[m]];
                                a: {
                                    f = b;
                                    m = c;
                                    if (d.isObject(e)) {
                                        var v = void 0,
                                            s = [],
                                            p = !1,
                                            k = v = v = void 0;
                                        for (k in e)
                                            if (e.hasOwnProperty(k) && f === k && (v = m, "string" === typeof v && (v = d.jsonParse(v) || v), "object" === typeof v)) {
                                                v instanceof Array ? (s = v, p = !0) : s.push(v);
                                                v = "stc" === f ? g(s, e[k], "/") : "events" === f || "context" === f ? g(s, e[k], "_") : a(s, e[k]);
                                                0 === v.length ? (f = !1, m = void 0) : (v = p ?
                                                    v : v[0], f = !0, m = d.jsonSerialize(v));
                                                break a
                                            }
                                    }
                                    f = !1;
                                    m = void 0
                                }
                                if (f) return {
                                    toSetInBuffer: !0,
                                    value: m
                                };
                                break
                            } else return {
                                toSetInBuffer: !0,
                                value: c
                            };
                    return {
                        toSetInBuffer: !1
                    }
                }
                return {
                    toSetInBuffer: !0,
                    value: c
                }
            };
            q.processBufferParams = function(b, c, f) {
                if (c) {
                    c = c();
                    var m = n(l.bufferParams);
                    if (m.keys[0] !== q.ALL)
                        for (var e in c)
                            if (c.hasOwnProperty(e))
                                if (-1 === d.arrayIndexOf(m.keys, e)) b && b(e);
                                else {
                                    var v = e,
                                        s = c[e],
                                        p = m.values[e],
                                        k = b,
                                        x = f;
                                    if ("undefined" !== typeof p && "undefined" !== typeof s) {
                                        var A = [],
                                            y = s._value,
                                            G = [],
                                            I = !1,
                                            F = void 0,
                                            F = void 0;
                                        p instanceof Array ? A = p : A.push(p);
                                        "string" === typeof y && (y = d.jsonParse(y) || y);
                                        "object" === typeof y && (y instanceof Array ? (G = y, I = !0) : G.push(y), F = "stc" === v ? g(G, A, "/") : "events" === v || "context" === v ? g(G, A, "_") : a(G, A), 0 === F.length ? k && k(v) : (F = I ? F : F[0], x && x(v, d.jsonSerialize(F), s._options)))
                                    }
                                }
                }
            };
            q.setMode = function(a) {
                s = a
            };
            q.setParameters = function(a) {
                l = a
            };
            q.getParameters = function() {
                return l
            };
            q.resetParameters = function() {
                l = {
                    storageParams: null,
                    bufferParams: null
                }
            }
        };
        d.optedOut = null;
        d.addOptOutEvent = function(a,
            b) {
            d.addEvent("ATOptOutEvent", "clientsideuserid", a, b)
        };
        d.removeOptOutEvent = function(a) {
            d.removeEvent("ATOptOutEvent", a)
        };
        d.dispatchOptOutEvent = function(a) {
            d.optedOut = a;
            d.dispatchEvent("ATOptOutEvent", "clientsideuserid")
        };
        d.userOptedOut = function() {
            d.dispatchOptOutEvent(!0)
        };
        d.userOptedIn = function() {
            d.dispatchOptOutEvent(!1)
        };
        d.isOptedOut = function() {
            if (null === d.optedOut) {
                var a;
                a: {
                    a = null;
                    d.isLocalStorageAvailable() && (a = localStorage.getItem("atuserid"));
                    if (null === a) {
                        var b = /(?:^| )atuserid=([^;]+)/.exec(document.cookie);
                        null !== b && (a = b[1])
                    }
                    if (null !== a) try {
                        a = decodeURIComponent(a)
                    } catch (c) {}
                    if (a && (a = d.jsonParse(a) || d.jsonParse(d.Base64.decode(a)), null !== a)) {
                        a = "OPT-OUT" === a.val;
                        break a
                    }
                    a = !1
                }
                d.optedOut = a
            }
            return !!d.optedOut
        };
        d.consentReceived = function(a) {
            d.consent = !!a
        };
        d.consent = !0;
        d.isTabOpeningAction = function(a) {
            var b = !1;
            a || (a = window.event);
            a && (a.ctrlKey || a.shiftKey || a.metaKey || a.button && 1 === a.button) && (b = !0);
            return b
        };
        d.CLICKS_REDIRECTION = "redirection";
        d.CLICKS_FORM = "form";
        d.CLICKS_MAILTO = "mailto"
    };
    ATInternet.Utils = new Utils;
    var BuildManager = function(a) {
            var e = this,
                k = 0,
                d = 0,
                b = ["dz"],
                c = "",
                h = function(a, b, c, g, f, h, d) {
                    a = "&" + a + "=";
                    return {
                        param: a,
                        paramSize: a.length,
                        str: b,
                        strSize: b.length,
                        truncate: c,
                        multihit: g,
                        separator: f || "",
                        encode: h,
                        last: d
                    }
                },
                m = function(a, b) {
                    var c = "",
                        g = 0,
                        f = 0,
                        h = 0,
                        g = -1,
                        d = null,
                        m = null,
                        e;
                    for (e in a) a.hasOwnProperty(e) && (d = a[e]) && (g = b - f, d.last && null !== m ? m[e] = d : d.strSize + d.paramSize <= g ? (c += d.param + d.str, f += d.paramSize + d.strSize) : (m = m || {}, m[e] = d, d.truncate && (h = g - d.paramSize, d.separator && (g = d.str.substring(0, g), g = d.encode ?
                        g.lastIndexOf(encodeURIComponent(d.separator)) : g.lastIndexOf(d.separator), 0 < g && (h = g)), c += d.param + d.str.substring(0, h), f += d.paramSize + d.str.substring(0, h).length, m[e].str = d.str.substring(h, d.strSize), m[e].strSize = m[e].str.length)));
                    return [c, m]
                },
                f = function(c, g, f) {
                    var e = "",
                        t = function(c) {
                            if (c === {}) return [];
                            var g = [],
                                f;
                            f = {};
                            var l = !1,
                                t = void 0,
                                n, p, s, k, q, u, w, C, H = "",
                                B;
                            for (B in c)
                                if (c.hasOwnProperty(B))
                                    if (u = q = k = s = !1, n = c[B]._value, p = c[B]._options || {}, "boolean" === typeof p.encode && (s = p.encode), "function" === typeof n &&
                                        (n = n()), n = n instanceof Array ? n.join(p.separator || ",") : "object" === typeof n ? ATInternet.Utils.jsonSerialize(n) : "undefined" === typeof n ? "undefined" : n.toString(), s && (n = encodeURIComponent(n)), -1 < ATInternet.Utils.arrayIndexOf(b, B) ? k = !0 : "boolean" === typeof p.truncate && (k = p.truncate), "boolean" === typeof p.multihit && (q = p.multihit), "boolean" === typeof p.last && (u = p.last), n = h(B, n, k, q, p.separator, s, u), q) d -= n.paramSize + n.strSize, H += n.param + n.str;
                                    else if (u) n.paramSize + n.strSize > d && (n.str = n.str.substring(0, d - n.paramSize),
                                n.strSize = n.str.length), w = B, C = n;
                            else if (f[B] = n, f[B].paramSize + f[B].strSize > d && !f[B].truncate) {
                                a.emit("Tracker:Hit:Build:Error", {
                                    lvl: "ERROR",
                                    msg: 'Too long parameter: "' + f[B].param + '"',
                                    details: {
                                        value: f[B].str
                                    }
                                });
                                l = !0;
                                t = B;
                                break
                            }
                            w && (f[w] = C);
                            f = [f, l, t, H];
                            c = f[0];
                            l = f[1];
                            e = f[3];
                            l && (f = f[2], c = c[f], c.str = c.str.substring(0, d - c.paramSize), c.strSize = c.str.length, l = {}, l.mherr = h("mherr", "1", !1, !1, "", !1, !1), l[f] = c, c = l);
                            c = m(c, d);
                            if (null === c[1]) g = c[0];
                            else
                                for (g.push(c[0]); null !== c[1];) c = m(c[1], d), g.push(c[0]);
                            return g
                        },
                        n = "";
                    a.buffer.presentInFilters(g, "hitType") || (g = a.buffer.addInFilters(g, "hitType", ["page"]));
                    g = a.buffer.addInFilters(g, "hitType", ["all"]);
                    var p, k;
                    if (ATInternet.Utils.isObject(c)) {
                        g = a.buffer.addInFilters(g, "permanent", !0);
                        g = a.buffer.get(g, !0);
                        for (p in c) c.hasOwnProperty(p) && (n = {}, c[p] && "object" === typeof c[p] && c[p].hasOwnProperty("_value") ? (k = c[p]._value, c[p].hasOwnProperty("_options") && (n = c[p]._options)) : k = c[p], k = ATInternet.Utils.privacy.testBufferParam(p, k), k.toSetInBuffer && (g[p] = {
                            _value: k.value,
                            _options: n
                        }));
                        n = t(g)
                    } else
                        for (p in g = a.buffer.get(g, !0), n = t(g), g) g.hasOwnProperty(p) && (g[p]._options && g[p]._options.permanent || a.buffer.del(p));
                    f && f(n, e)
                };
            e.getCollectDomain = function() {
                var b = "",
                    b = a.getConfig("logSSL") || a.getConfig("log"),
                    c = a.getConfig("domain");
                return b = b && c ? b + "." + c : a.getConfig("collectDomainSSL") || a.getConfig("collectDomain")
            };
            var g = function(b) {
                    var c = "",
                        g = a.getConfig("baseURL");
                    if (g) c = g;
                    else {
                        var g = e.getCollectDomain(),
                            f = a.getConfig("pixelPath"),
                            f = f || "/";
                        "/" !== f.charAt(0) && (f = "/" +
                            f);
                        g && (c = (a.getConfig("forceHttp") ? "http://" : "https://") + g + f)
                    }
                    g = a.getConfig("site");
                    c && g ? b && b(null, c + "?s=" + g) : b && b({
                        message: "Config error"
                    })
                },
                p = function(a, b, c) {
                    g(function(g, h) {
                        g ? c && c(g) : (d = k - (h.length + 27), f(a, b, function(a, b) {
                            var g = [],
                                f = ATInternet.Utils.uuid().num(13);
                            if (a instanceof Array)
                                for (var d = 1; d <= a.length; d++) g.push(h + b + "&mh=" + d + "-" + a.length + "-" + f + a[d - 1]);
                            else g.push(h + b + a);
                            c && c(null, g)
                        }))
                    })
                },
                n = function(b, c, g, f, h, d, m) {
                    return function() {
                        return function(e) {
                            a.emit(b, {
                                lvl: h,
                                details: {
                                    hit: c,
                                    method: g,
                                    event: e,
                                    isMultiHit: d,
                                    elementType: m
                                }
                            });
                            f && f()
                        }
                    }()
                };
            e.send = function(b, c, g, f, h) {
                p(b, c, function(b, c) {
                    if (b) a.emit("Tracker:Hit:Build:Error", {
                        lvl: "ERROR",
                        msg: b.message,
                        details: {}
                    }), g && g();
                    else
                        for (var d = 0; d < c.length; d++) e.sendUrl(c[d], g, f, h)
                })
            };
            k = Math.max(a.getConfig("maxHitSize") || 0, 2E3);
            d = Math.max(a.getConfig("maxHitSize") || 0, 2E3);
            c = a.getConfig("requestMethod");
            e.sendUrl = function(b, g, f, h) {
                var d = -1 < b.indexOf("&mh=");
                f = f || c;
                ATInternet.Utils.isOptedOut() && !a.getConfig("sendHitWhenOptOut") ? n("Tracker:Hit:Sent:NoTrack",
                    b, f, g, "INFO", d, h)() : "POST" === f && ATInternet.Utils.isBeaconMethodAvailable() ? (h = "Tracker:Hit:Sent:Error", f = "ERROR", window.navigator.sendBeacon(b, null) && (h = "Tracker:Hit:Sent:Ok", f = "INFO"), n(h, b, "POST", g, f, d, "")()) : (f = new Image, f.onload = n("Tracker:Hit:Sent:Ok", b, "GET", g, "INFO", d, h), f.onerror = n("Tracker:Hit:Sent:Error", b, "GET", g, "ERROR", d, h), f.src = b)
            }
        },
        TriggersManager = function() {
            function a(a, c, h) {
                for (var d = [], f = 0; f < a.length; f++) a[f].callback(c, h), a[f].singleUse || d.push(a[f]);
                return d
            }

            function e(a, c, h,
                d) {
                var f = a.shift();
                if ("*" === f) return c["*"] = c["*"] || [], c["*"].push({
                    callback: h,
                    singleUse: d
                }), c["*"].length - 1;
                if (0 === a.length) return e([f, "*"], c, h, d);
                c["*"] = c["*"] || [];
                c[f] = c[f] || {};
                return e(a, c[f], h, d)
            }

            function k(b, c, d, e) {
                var f = c.shift();
                "*" !== f && (0 === c.length ? k(b, [f, "*"], d, e) : d[f] && (d[f]["*"] = a(d[f]["*"], b, e), k(b, c, d[f], e)))
            }
            var d = {};
            this.on = function(a, c, h) {
                h = h || !1;
                return e(a.split(":"), d, c, h)
            };
            this.emit = function(b, c) {
                d["*"] && (d["*"] = a(d["*"], b, c));
                k(b, b.split(":"), d, c)
            }
        },
        PluginsManager = function(a) {
            var e = {},
                k = {},
                d = 0,
                b = {},
                c = 0,
                h = function(a) {
                    var b = !1;
                    e[a] && (b = !0);
                    return b
                },
                m = this.unload = function(b) {
                    h(b) ? (e[b] = void 0, a.emit("Tracker:Plugin:Unload:" + b + ":Ok", {
                        lvl: "INFO"
                    })) : a.emit("Tracker:Plugin:Unload:" + b + ":Error", {
                        lvl: "ERROR",
                        msg: "not a known plugin"
                    });
                    return a
                },
                f = this.load = function(b, c) {
                    "function" === typeof c ? "undefined" === typeof a.getConfig.plgAllowed || 0 === a.getConfig.plgAllowed.length || -1 < a.getConfig.plgAllowed.indexOf(b) ? (e[b] = new c(a), k[b] && h(b) && (k[b] = !1, d--, h(b + "_ll") && m(b + "_ll"), 0 === d && a.emit("Tracker:Plugin:Lazyload:File:Complete", {
                        lvl: "INFO",
                        msg: "LazyLoading triggers are finished"
                    })), a.emit("Tracker:Plugin:Load:" + b + ":Ok", {
                        lvl: "INFO"
                    })) : a.emit("Tracker:Plugin:Load:" + b + ":Error", {
                        lvl: "ERROR",
                        msg: "Plugin not allowed",
                        details: {}
                    }) : a.emit("Tracker:Plugin:Load:" + b + ":Error", {
                        lvl: "ERROR",
                        msg: "not a function",
                        details: {
                            obj: c
                        }
                    });
                    return a
                },
                g = this.isLazyloading = function(a) {
                    return a ? !0 === k[a] : 0 !== d
                },
                p = function(a) {
                    return !h(a) && !g(a) && h(a + "_ll")
                },
                n = function(b) {
                    k[b] = !0;
                    d++;
                    ATInternet.Utils.loadScript({
                        url: a.getConfig("lazyLoadingPath") + b + ".js"
                    })
                },
                q = function(a) {
                    return p(a) ? (n(a), !0) : !1
                },
                l = function(a) {
                    b[a] ? b[a] ++ : b[a] = 1;
                    c++
                },
                s = function(a, b, c, g) {
                    var f = null;
                    b = b.split(".");
                    h(a) && e[a][b[0]] && (f = 1 < b.length && e[a][b[0]][b[1]] ? e[a][b[0]][b[1]].apply(e[a], c) : e[a][b[0]].apply(e[a], c));
                    g && g(f)
                },
                r = function(g, f, d, h) {
                    l(g);
                    a.onTrigger("Tracker:Plugin:Load:" + g + ":Ok", function() {
                        s(g, f, d, function(f) {
                            b[g] --;
                            c--;
                            0 === c && a.emit("Tracker:Plugin:Lazyload:Exec:Complete", {
                                lvl: "INFO",
                                msg: "All exec waiting for lazyloading are done"
                            });
                            h && h(f)
                        })
                    }, !0)
                },
                t = function(a) {
                    for (var b = {
                            mcount: 0,
                            plugins: {}
                        }, c = 0; c < a.length; c++) e.hasOwnProperty(a[c]) || (b.mcount++, b.plugins[a[c]] = !0);
                    return b
                };
            this.isExecWaitingLazyloading = function() {
                return 0 !== c
            };
            a.exec = this.exec = function(a, b, c, f) {
                p(a) ? (r(a, b, c, f), n(a)) : g(a) ? r(a, b, c, f) : s(a, b, c, f)
            };
            this.waitForDependencies = function(b, c) {
                var g = t(b);
                if (0 === g.mcount) a.emit("Tracker:Plugin:Dependencies:Loaded", {
                    lvl: "INFO",
                    details: {
                        dependencies: b
                    }
                }), c();
                else
                    for (var f in g.plugins) g.plugins.hasOwnProperty(f) && (a.emit("Tracker:Plugin:Dependencies:Error", {
                        lvl: "WARNING",
                        msg: "Missing plugin " + f
                    }), a.onTrigger("Tracker:Plugin:Load:" + f, function(a, b) {
                        var f = a.split(":"),
                            d = f[3];
                        "Ok" === f[4] && (g.plugins[d] = !1, g.mcount--, 0 === g.mcount && c())
                    }, !0), q(f))
            };
            this.init = function() {
                for (var a in ATInternet.Tracker.pluginProtos) ATInternet.Tracker.pluginProtos.hasOwnProperty(a) && f(a, ATInternet.Tracker.pluginProtos[a])
            }
        },
        CallbacksManager = function(a) {
            var e = this,
                k = {},
                d = function(b) {
                    if (b.name) {
                        var c = !0,
                            d = a.getConfig("callbacks");
                        "undefined" !== typeof d && (d.include instanceof Array &&
                            -1 === ATInternet.Utils.arrayIndexOf(d.include, b.name) && (c = !1), d.exclude instanceof Array && -1 !== ATInternet.Utils.arrayIndexOf(d.exclude, b.name) && (c = !1));
                        ATInternet.Callbacks && ATInternet.Callbacks.hasOwnProperty(b.name) && (d = {}, d[b.name] = {
                            "function": ATInternet.Callbacks[b.name]
                        }, c && e.load(b.name, d[b.name]["function"]), ATInternet.Tracker.callbackProtos[b.name] || (ATInternet.Tracker.callbackProtos[b.name] = d[b.name]))
                    }
                };
            e.load = function(b, c) {
                "function" === typeof c ? (new c(a), a.emit("Tracker:Callback:Load:" +
                    b + ":Ok", {
                        lvl: "INFO",
                        details: {
                            obj: c
                        }
                    })) : a.emit("Tracker:Callback:Load:" + b + ":Error", {
                    lvl: "ERROR",
                    msg: "not a function",
                    details: {
                        obj: c
                    }
                });
                return a
            };
            e.init = function() {
                if (a.getConfig("activateCallbacks")) {
                    var b = a.getConfig("callbacks");
                    if ("undefined" !== typeof b && b.include instanceof Array)
                        for (var c = 0; c < b.include.length; c++) ATInternet.Callbacks && ATInternet.Callbacks.hasOwnProperty(b.include[c]) && (k[b.include[c]] = {
                                "function": ATInternet.Callbacks[b.include[c]]
                            }, ATInternet.Tracker.callbackProtos[b.include[c]] ||
                            (ATInternet.Tracker.callbackProtos[b.include[c]] = k[b.include[c]]));
                    else
                        for (c in ATInternet.Callbacks) ATInternet.Callbacks.hasOwnProperty(c) && (k[c] = {
                            "function": ATInternet.Callbacks[c]
                        }, ATInternet.Tracker.callbackProtos[c] || (ATInternet.Tracker.callbackProtos[c] = k[c]));
                    if ("undefined" !== typeof b && b.exclude instanceof Array)
                        for (c = 0; c < b.exclude.length; c++) delete k[b.exclude[c]];
                    for (var h in k) k.hasOwnProperty(h) && k[h] && e.load(h, k[h]["function"]);
                    ATInternet.Utils.addCallbackEvent(d)
                }
            };
            e.removeCallbackEvent =
                function() {
                    ATInternet.Utils.removeCallbackEvent(d)
                }
        },
        BufferManager = function(a) {
            var e = this,
                k = {};
            e.set = function(a, b, d) {
                b = ATInternet.Utils.privacy.testBufferParam(a, b);
                b.toSetInBuffer && (d = d || {}, d.hitType = d.hitType || ["page"], k[a] = {
                    _value: b.value,
                    _options: d
                })
            };
            var d = function(a, b, d) {
                    return (a = ATInternet.Utils.cloneSimpleObject(a[b])) && !d ? a._value : a
                },
                b = function h(a, b) {
                    if (!(a && b instanceof Array && a instanceof Array)) return [];
                    if (0 === a.length) return b;
                    var g = a[0],
                        d, e = [],
                        q = ATInternet.Utils.cloneSimpleObject(a);
                    q.shift();
                    for (var l = 0; l < b.length; l++)
                        if ("object" !== typeof g[1]) k[b[l]] && k[b[l]]._options[g[0]] === g[1] && e.push(b[l]);
                        else {
                            d = g[1].length;
                            for (var s = 0; s < d; s++)
                                if (k[b[l]] && k[b[l]]._options[g[0]] instanceof Array && 0 <= ATInternet.Utils.arrayIndexOf(k[b[l]]._options[g[0]], g[1][s])) {
                                    e.push(b[l]);
                                    break
                                }
                        }
                    return h(q, e)
                };
            e.get = function(a, e) {
                var f = {};
                if ("string" === typeof a) f = d(k, a, e);
                else
                    for (var g = b(a, ATInternet.Utils.getObjectKeys(k)), p = 0; p < g.length; p++) f[g[p]] = d(k, g[p], e);
                return f
            };
            e.presentInFilters = function(a,
                b) {
                return a && 0 !== a.length ? a[0][0] === b ? !0 : e.presentInFilters(a.slice(1), b) : !1
            };
            e.addInFilters = function(a, b, f, g) {
                if (!a || 0 === a.length) return g ? [] : [
                    [b, f]
                ];
                var d = a[0][0],
                    n = a[0][1];
                d === b && (n instanceof Array && -1 === ATInternet.Utils.arrayIndexOf(n, f[0]) && n.push(f[0]), g = !0);
                return [
                    [d, n]
                ].concat(e.addInFilters(a.slice(1), b, f, g))
            };
            e.del = function(a) {
                k[a] = void 0
            };
            e.clear = function() {
                k = {}
            }
        },
        PropertiesManager = function(a) {
            var e = this,
                k = {};
            e.setProp = function(a, b, c) {
                "undefined" !== typeof a && (k[a] = {
                    value: b,
                    persistent: !!c
                })
            };
            e.setProps = function(a, b) {
                if (ATInternet.Utils.isObject(a))
                    for (var c in a) a.hasOwnProperty(c) && e.setProp(c, a[c], b)
            };
            e.delProp = function(d, b) {
                "undefined" !== typeof k[d] && delete k[d];
                !b && a.delParam(d.toLowerCase())
            };
            e.delProps = function(a) {
                for (var b in k) k.hasOwnProperty(b) && e.delProp(b, a)
            };
            e.getProp = function(a) {
                k = k || {};
                return k[a]
            };
            e.getProps = function() {
                return k
            }
        },
        Tag = function(a, e, k) {
            e = e || {};
            var d = this;
            d.version = "5.29.3";
            var b = ATInternet.Utils.cloneSimpleObject(e);
            d.triggers = new TriggersManager(d);
            d.emit =
                d.triggers.emit;
            d.onTrigger = d.triggers.on;
            var c = ATInternet.Utils.cloneSimpleObject(dfltGlobalCfg) || {},
                h;
            for (h in a) a.hasOwnProperty(h) && (c[h] = a[h]);
            d.getConfig = function(a) {
                return c[a]
            };
            d.setConfig = function(a, b, h) {
                void 0 !== c[a] && h || (d.emit("Tracker:Config:Set:" + a, {
                    lvl: "INFO",
                    details: {
                        bef: c[a],
                        aft: b
                    }
                }), c[a] = b)
            };
            d.configPlugin = function(a, b, h) {
                c[a] = c[a] || {};
                for (var e in b) b.hasOwnProperty(e) && void 0 === c[a][e] && (c[a][e] = b[e]);
                h && (h(c[a]), d.onTrigger("Tracker:Config:Set:" + a, function(a, b) {
                    h(b.details.aft)
                }));
                return c[a]
            };
            d.getAllContext = function() {
                return b
            };
            d.getContext = function(a) {
                return b[a]
            };
            d.setContext = function(a, c) {
                d.emit("Tracker:Context:Set:" + a, {
                    lvl: "INFO",
                    details: {
                        bef: b[a],
                        aft: c
                    }
                });
                b[a] = c
            };
            d.delContext = function(a, c) {
                d.emit("Tracker:Context:Deleted:" + a + ":" + c, {
                    lvl: "INFO",
                    details: {
                        key1: a,
                        key2: c
                    }
                });
                if (a) b.hasOwnProperty(a) && (c ? b[a] && b[a].hasOwnProperty(c) && (b[a][c] = void 0) : b[a] = void 0);
                else if (c)
                    for (var h in b) b.hasOwnProperty(h) && b[h] && b[h].hasOwnProperty(c) && (b[h][c] = void 0)
            };
            d.plugins = new PluginsManager(d);
            d.buffer = new BufferManager(d);
            d.setParam = d.buffer.set;
            d.getParams = function(a) {
                return d.buffer.get(a, !1)
            };
            d.getParam = d.buffer.get;
            d.delParam = d.buffer.del;
            d.builder = new BuildManager(d);
            d.sendUrl = d.builder.sendUrl;
            d.callbacks = new CallbacksManager(d);
            d.properties = new PropertiesManager(d);
            d.setProp = d.properties.setProp;
            d.setProps = d.properties.setProps;
            d.delProp = d.properties.delProp;
            d.delProps = d.properties.delProps;
            d.getProp = d.properties.getProp;
            d.getProps = d.properties.getProps;
            d.sendHit = function(a, b, c,
                h, e) {
                var l = d.getProps(),
                    m, k;
                for (k in l) l.hasOwnProperty(k) && (m = l[k].value, l[k].persistent ? d.setParam(k.toLowerCase(), m, {
                    permanent: !0,
                    hitType: ["all"],
                    encode: !0
                }) : (ATInternet.Utils.isObject(a) ? a[k.toLowerCase()] = {
                    _value: m,
                    _options: {
                        hitType: ["all"],
                        encode: !0
                    }
                } : d.setParam(k.toLowerCase(), m, {
                    hitType: ["all"],
                    encode: !0
                }), d.delProp(k, !0)));
                d.builder.send(a, b, c, h, e)
            };
            ATInternet.Utils.privacy.resetParameters();
            d.setParam("ts", function() {
                return (new Date).getTime()
            }, {
                permanent: !0,
                hitType: ["all"]
            });
            (d.getConfig("disableCookie") ||
                d.getConfig("disableStorage")) && d.setParam("idclient", ATInternet.Utils.privacy.CONSENTNO, {
                permanent: !0,
                hitType: ["all"]
            });
            d.getConfig("medium") && d.setParam("medium", d.getConfig("medium"), {
                permanent: !0,
                hitType: ["all"]
            });
            if (d.getConfig("urlPropertyAuto") && "undefined" !== typeof window && "undefined" !== typeof window.location) {
                h = (d.getConfig("urlPropertyQueryString") ? window.location.href : window.location.protocol + "//" + window.location.host + window.location.pathname).replace(/[<>]/g, "").substring(0, 1600).replace(/&/g,
                    "$").replace(/#/g, "\u00b5");
                var m = d.getContext("page") || {};
                m.url = window.encodeURIComponent(h);
                d.setContext("page", m);
                d.setParam("page_url", h, {
                    permanent: !0,
                    hitType: "page click publisher selfPromotion onSiteAdsClick onSiteAdsImpression InternalSearch mvtesting richmedia".split(" ")
                })
            }
            d.plugins.init();
            d.callbacks.init();
            d.emit("Tracker:Ready", {
                lvl: "INFO",
                msg: "Tracker initialized",
                details: {
                    tracker: d,
                    args: {
                        config: a,
                        context: e,
                        callback: k
                    }
                }
            });
            k && k(d);
            ATInternet.Tracker.instances.push(d)
        };
    ATInternet.Tracker.Tag = Tag;
    ATInternet.Tracker.instances = [];
    ATInternet.Tracker.pluginProtos = {};
    ATInternet.Tracker.addPlugin = function(a, e) {
        e = e || ATInternet.Tracker.Plugins[a];
        if (!ATInternet.Tracker.pluginProtos[a]) {
            ATInternet.Tracker.pluginProtos[a] = e;
            for (var k = 0; k < ATInternet.Tracker.instances.length; k++) ATInternet.Tracker.instances[k].plugins.load(a, e)
        }
    };
    ATInternet.Tracker.delPlugin = function(a) {
        if (ATInternet.Tracker.pluginProtos[a]) {
            ATInternet.Tracker.pluginProtos[a] = void 0;
            for (var e = 0; e < ATInternet.Tracker.instances.length; e++) ATInternet.Tracker.instances[e].plugins.unload(a)
        }
    };
    ATInternet.Tracker.callbackProtos = {};
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {
        "storageMode": "cookie"
    };
    ATInternet.Tracker.Plugins.Storage = function(a) {
        var e = this,
            k = {},
            d = !1,
            b = null;
        a.configPlugin("Storage", dfltPluginCfg || {}, function(a) {
            k = a;
            "localStorage" === k.storageMode && (d = ATInternet.Utils.isLocalStorageAvailable())
        });
        var c = {},
            h = function(b) {
                return a.getConfig("base64Storage") ? ATInternet.Utils.Base64.encode(b) : encodeURIComponent(b)
            },
            m = function(b) {
                return a.getConfig("base64Storage") ? ATInternet.Utils.Base64.decode(b) : decodeURIComponent(b)
            },
            f = function() {
                this.getData = function(a) {
                    var b = null;
                    (a = RegExp("(?:^| )" +
                        a + "=([^;]+)").exec(document.cookie) || null) && (b = m(a[1]));
                    return b
                };
                this.setData = function(b) {
                    var c = !1;
                    if (b.name && "string" === typeof b.name) {
                        var d = b.options || {},
                            f = d.end || {},
                            e = d.domain || a.getConfig("cookieDomain"),
                            g = d.secure || a.getConfig("cookieSecure"),
                            k = d.samesite || a.getConfig("sameSiteStrict"),
                            l = ATInternet.Utils.jsonSerialize(b),
                            l = b.name + "=" + h(l),
                            l = l + (d.path && "string" === typeof d.path ? ";path=" + d.path : ""),
                            l = l + (e && "string" === typeof e ? ";domain=" + e : "") + (g && "boolean" === typeof g ? ";secure" : ""),
                            l = l + (k && "boolean" ===
                                typeof k ? ";samesite=strict" : "");
                        "function" === typeof f.toUTCString ? l += ";expires=" + f.toUTCString() : "number" === typeof f && (l += ";max-age=" + f.toString());
                        document.cookie = l;
                        this.getData(b.name) && (c = !0)
                    }
                    return c
                }
            };
        b = d ? new function() {
            var a = function(a) {
                    var b = +new Date,
                        c = !1,
                        d;
                    a.options && ("undefined" !== typeof a.options.expires ? d = a.options.expires : (a = a.options.end || {}, "function" === typeof a.getTime ? d = a.getTime() : "number" === typeof a && (d = b + 1E3 * a)));
                    "number" === typeof d && b >= d && (c = !0);
                    return {
                        itemToDelete: c,
                        timestamp: d
                    }
                },
                b = function(a) {
                    var b = !1;
                    try {
                        localStorage.removeItem(a), b = !0
                    } catch (c) {}
                    return b
                };
            this.getData = function(c) {
                var d = null,
                    f = localStorage.getItem(c);
                if (f) {
                    var f = m(f),
                        e = ATInternet.Utils.jsonParse(f);
                    e && "object" === typeof e ? a(e).itemToDelete && b(c) || (delete e.options.expires, d = ATInternet.Utils.jsonSerialize(e)) : d = f
                }
                return d
            };
            this.setData = function(c) {
                var d = !1;
                if (c.name && "string" === typeof c.name) {
                    var f = a(c);
                    "number" === typeof f.timestamp && (c.options.expires = f.timestamp);
                    var e = ATInternet.Utils.jsonSerialize(c);
                    if (f.itemToDelete) d =
                        b(c.name);
                    else try {
                        localStorage.setItem(c.name, h(e)), d = !0
                    } catch (g) {}
                }
                return d
            }
        } : new f;
        var g = function(c, d) {
                var f = !1;
                c && "object" === typeof c && (d || ATInternet.Utils.consent && !a.getConfig("disableCookie") && !a.getConfig("disableStorage")) && (f = b.setData(c));
                return f
            },
            p = function(a, b, c) {
                a = {
                    name: a,
                    val: b
                };
                c && c.session && "number" === typeof c.session && (c.end = c.session);
                a.options = c || {};
                return a
            },
            n = function(c) {
                var d = null,
                    f = null;
                a.getConfig("disableCookie") || a.getConfig("disableStorage") || !c || "string" !== typeof c || (f =
                    b.getData(c));
                (c = f) && (d = ATInternet.Utils.jsonParse(c));
                return d
            },
            q = function(a, b) {
                var c = ATInternet.Utils.cloneSimpleObject(a);
                return g(c, b) ? ATInternet.Utils.jsonParse(ATInternet.Utils.jsonSerialize(a)) : null
            },
            l = function(a, b, d) {
                if (!d && c[a]) d = c[a];
                else if (d = n(a)) d.options = d.options || {}, d.options.session && "number" === typeof d.options.session && (d.options.end = d.options.session, q(d, !1)), c[a] = d;
                return d ? b ? (a = null, !d || "object" !== typeof d.val || d.val instanceof Array || void 0 === d.val[b] || (a = d.val[b]), a) : d.val :
                    null
            },
            s = function(a, b, d, f, e) {
                if (b) {
                    if (e = n(a)) !e || "object" !== typeof e.val || e.val instanceof Array ? e = null : "undefined" === typeof d ? delete e.val[b] : e.val[b] = d, e && (e = q(e, f))
                } else e = e || {}, e = p(a, d, e), e = q(e, f);
                return e ? (c[a] = e, e.val) : null
            },
            r = function(a, b) {
                if (b) s(a, b, void 0, !0, null);
                else {
                    c[a] = void 0;
                    var d = p(a, "", {
                        end: new Date("Thu, 01 Jan 1970 00:00:00 UTC"),
                        path: "/"
                    });
                    g(d, !0)
                }
            };
        a.storage = {};
        a.storage.getAll = function() {
            return c
        };
        a.storage.get = e.get = function(a, b) {
            b = !!b;
            return a instanceof Array ? l(a[0], a[1], b) :
                l(a, "", b)
        };
        a.storage.getPrivate = e.getPrivate = function(b, c) {
            b instanceof Array ? b[0] += a.getConfig("site") : b += a.getConfig("site");
            return e.get(b, c)
        };
        a.storage.set = e.set = function(a, b, c, d) {
            var f;
            a instanceof Array ? (f = a[0], a = a[1], c = null) : (f = a, a = null);
            return ATInternet.Utils.privacy.testStorageParam(f, a).toSetInStorage || d ? s(f, a, b, d, c) : null
        };
        a.storage.setPrivate = e.setPrivate = function(b, c, d) {
            b instanceof Array ? b[0] += a.getConfig("site") : b += a.getConfig("site");
            return e.set(b, c, d)
        };
        a.storage.del = e.del = function(a) {
            a instanceof
            Array ? r(a[0], a[1]) : r(a, "")
        };
        a.storage.delPrivate = e.delPrivate = function(b) {
            b instanceof Array ? b[0] += a.getConfig("site") : b += a.getConfig("site");
            e.del(b)
        };
        a.storage.cacheInvalidation = e.cacheInvalidation = function() {
            c = {}
        }
    };
    ATInternet.Tracker.addPlugin("Storage");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Utils = function(a) {
        var e = this,
            k = {};
        a.utils = {};
        a.utils.getQueryStringValue = e.getQueryStringValue = function(a, c) {
            var d = ATInternet.Utils.hashcode(c).toString();
            if (!k[d]) {
                k[d] = {};
                for (var e = RegExp("[&#?]{1}([^&=#?]*)=([^&#]*)?", "g"), f = e.exec(c); null !== f;) k[d][f[1]] = f[2], f = e.exec(c)
            }
            return k[d].hasOwnProperty(a) ? k[d][a] : null
        };
        a.utils.manageChapters = e.manageChapters = function(b, c, d) {
            var e = "";
            if (b)
                for (var f = a.getConfig("ignoreEmptyChapterValue"), g = "", k = 1; k < parseInt(d, 10) + 1; k++) g = b[c +
                    k] || "", e = f ? e + (g ? g + "::" : "") : e + (b.hasOwnProperty(c + k) ? g + "::" : "");
            return e
        };
        a.utils.getDocumentLevel = e.getDocumentLevel = function() {
            var b = a.getConfig("documentLevel");
            if (b) {
                if (0 > b.indexOf(".")) return window[b] || document;
                b = b.split(".");
                return window[b[0]][b[1]] || document
            }
            return document
        };
        a.utils.getLocation = e.getLocation = function() {
            return e.getDocumentLevel().location.href
        };
        a.utils.getHostName = e.getHostName = function() {
            return e.getDocumentLevel().location.hostname
        };
        a.dispatchIndex = {};
        a.dispatchStack = [];
        a.dispatchEventFor = {};
        var d = 0;
        a.dispatchSubscribe = function(b) {
            return a.dispatchIndex[b] ? !1 : (a.dispatchStack.push(b), a.dispatchIndex[b] = !0)
        };
        a.dispatchSubscribed = function(b) {
            return !0 === a.dispatchIndex[b]
        };
        a.addSpecificDispatchEventFor = function(b) {
            return a.dispatchEventFor[b] ? !1 : (a.dispatchEventFor[b] = !0, d++, !0)
        };
        a.processSpecificDispatchEventFor = function(b) {
            a.dispatchEventFor[b] && (a.dispatchEventFor[b] = !1, d--, 0 === d && (a.dispatchEventFor = {}, a.emit("Tracker:Plugin:SpecificEvent:Exec:Complete", {
                lvl: "INFO"
            })))
        };
        a.dispatch = function(b, c) {
            var e = function() {
                    for (var d = "", e = null; 0 < a.dispatchStack.length;) d = a.dispatchStack.pop(), 0 === a.dispatchStack.length && (e = b), a[d].onDispatch(e, c);
                    a.dispatchIndex = {};
                    a.delContext(void 0, "customObject")
                },
                k = function() {
                    if (a.plugins.isExecWaitingLazyloading()) a.onTrigger("Tracker:Plugin:Lazyload:Exec:Complete", function() {
                        e()
                    }, !0);
                    else e()
                };
            if (0 === d) k();
            else a.onTrigger("Tracker:Plugin:SpecificEvent:Exec:Complete", function() {
                k()
            }, !0)
        };
        a.dispatchRedirect = function(b) {
            var c = !0,
                d = "",
                e =
                null;
            b && (!ATInternet.Utils.isTabOpeningAction(b.event) && b.elem && a.plugins.exec("TechClicks", "manageClick", [b.elem], function(a) {
                c = a.preservePropagation;
                d = a.elementType
            }), e = b.callback);
            a.dispatch(e, d);
            return c
        };
        a.manageSend = function(b) {
            if (!ATInternet.Utils.isPreview() || a.getConfig("preview")) ATInternet.Utils.isPrerender(function(a) {
                b(a)
            }) || b()
        };
        a.processTagObject = function(b, c, d) {
            if ((b = a.getParam(b, !0)) && b._options.permanent) {
                for (var e = !1, f = b._options.hitType || [], g = 0; g < f.length; g++)
                    if (-1 !== ATInternet.Utils.arrayIndexOf(c.concat("all"),
                            f[g])) {
                        e = !0;
                        break
                    }
                e && (d = ATInternet.Utils.completeFstLevelObj(b._value || {}, d, !0))
            }
            return d
        };
        a.processContextObjectAndSendHit = function(b, c, d, e) {
            var f = {
                    hitType: c.hitType,
                    encode: c.encode,
                    separator: c.separator,
                    truncate: c.truncate
                },
                g = a.getParam(b, !0);
            if (g) {
                for (var k = !1, n = g._options.hitType || [], q = 0; q < n.length; q++)
                    if (-1 !== ATInternet.Utils.arrayIndexOf(c.hitType.concat("all"), n[q])) {
                        k = !0;
                        break
                    }
                k ? (k = ATInternet.Utils.cloneSimpleObject(g), k._value = ATInternet.Utils.completeFstLevelObj(k._value || {}, d, !0), a.setParam(b,
                    k._value, f), a.manageSend(function() {
                    a.sendHit(null, [
                        ["hitType", c.hitType]
                    ], e, c.requestMethod, c.elementType)
                }), g._options.permanent && a.setParam(b, g._value, g._options)) : (a.setParam(b, d, f), a.manageSend(function() {
                    a.sendHit(null, [
                        ["hitType", c.hitType]
                    ], e, c.requestMethod, c.elementType)
                }), a.setParam(b, g._value, g._options))
            } else a.setParam(b, d, f), a.manageSend(function() {
                a.sendHit(null, [
                    ["hitType", c.hitType]
                ], e, c.requestMethod, c.elementType)
            })
        }
    };
    ATInternet.Tracker.addPlugin("Utils");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "clicksAutoManagementEnabled": true,
        "clicksAutoManagementTimeout": 500
    };
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.TechClicks = function(a) {
        var e = this,
            k = ["Tracker:Hit:Sent:Ok", "Tracker:Hit:Sent:Error", "Tracker:Hit:Sent:NoTrack"],
            d, b, c = !1;
        a.configPlugin("TechClicks", dfltPluginCfg || {}, function(a) {
            d = a.clicksAutoManagementEnabled;
            b = a.clicksAutoManagementTimeout
        });
        var h = function(a) {
                c = !1;
                switch (a.target) {
                    case "_top":
                        window.top.location.href = a.url;
                        break;
                    case "_parent":
                        window.parent.location.href = a.url;
                        break;
                    default:
                        window.location.href = a.url
                }
            },
            m = function(a) {
                a.mailto ? e.timeout = setTimeout(function() {
                    window.location.href =
                        a.mailto
                }, a.timeout) : a.form ? e.timeout = setTimeout(function() {
                    a.form.submit()
                }, a.timeout) : a.url && (e.timeout = setTimeout(function() {
                    h({
                        url: a.url,
                        target: a.target
                    })
                }, a.timeout))
            },
            f = function(b) {
                for (var c = 0; c < k.length; c++) a.onTrigger(k[c], function(a, c) {
                    b && b(c)
                })
            },
            g = function(a) {
                for (var d, g = "_self"; a;) {
                    if (a.href && 0 === a.href.indexOf("http")) {
                        d = a.href.split('"').join('\\"');
                        g = a.target ? a.target : g;
                        break
                    }
                    a = a.parentNode
                }
                d && !c && (c = !0, f(function(a) {
                    a.details.isMultiHit || a.details.elementType !== ATInternet.Utils.CLICKS_REDIRECTION ||
                        (e.timeout && clearTimeout(e.timeout), h({
                            url: d,
                            target: g
                        }))
                }), m({
                    url: d,
                    target: g,
                    timeout: b
                }))
            },
            p = function(a) {
                for (var c = a; c && "FORM" !== c.nodeName;) c = c.parentNode;
                c && (f(function(a) {
                    a.details.isMultiHit || a.details.elementType !== ATInternet.Utils.CLICKS_FORM || (e.timeout && clearTimeout(e.timeout), c.submit())
                }), m({
                    form: c,
                    timeout: b
                }))
            },
            n = function(a) {
                for (var c = a; c && !(c.href && 0 <= c.href.indexOf("mailto:"));) c = c.parentNode;
                c && (f(function(a) {
                    a.details.isMultiHit || a.details.elementType !== ATInternet.Utils.CLICKS_MAILTO ||
                        (e.timeout && clearTimeout(e.timeout), window.location.href = c.href)
                }), m({
                    mailto: c.href,
                    timeout: b
                }))
            },
            q = function(a) {
                for (var b = a; b;) {
                    if (b.href) {
                        if (0 <= b.href.indexOf("mailto:")) return ATInternet.Utils.CLICKS_MAILTO;
                        if (0 === b.href.indexOf("http")) return ATInternet.Utils.CLICKS_REDIRECTION
                    } else if ("FORM" === b.nodeName) {
                        var c = a;
                        a = !1;
                        c && (b = c.tagName || "", b = b.toLowerCase(), "form" === b ? a = !0 : (c = c.getAttribute("type") || "", c = c.toLowerCase(), "button" === b ? "reset" !== c && "button" !== c && (a = !0) : "input" === b && "submit" === c && (a = !0)));
                        if (a) return ATInternet.Utils.CLICKS_FORM;
                        break
                    }
                    b = b.parentNode
                }
                return ""
            };
        e.isFormSubmit = function(a) {
            for (; a;) {
                if ("FORM" === a.nodeName) return !0;
                a = a.parentNode
            }
            return !1
        };
        a.techClicks = {};
        a.techClicks.manageClick = e.manageClick = function(a, b) {
            var c = !0,
                f = "";
            if (d && a) {
                var e;
                a: {
                    for (f = a; f;) {
                        if ("function" === typeof f.getAttribute && ("_blank" === f.getAttribute("target") || "no" === f.getAttribute("data-atclickmanagement"))) {
                            e = !0;
                            break a
                        }
                        f = f.parentNode
                    }
                    f = a;
                    e = window.location.href;
                    for (var h; f;) {
                        if ((h = f.href) && 0 <= h.indexOf("#") &&
                            e.substring(0, 0 <= e.indexOf("#") ? e.indexOf("#") : e.length) === h.substring(0, h.indexOf("#"))) {
                            e = !0;
                            break a
                        }
                        f = f.parentNode
                    }
                    e = !1
                }
                f = q(a);
                if (!e && f) {
                    switch (f) {
                        case ATInternet.Utils.CLICKS_MAILTO:
                            n(a);
                            c = !1;
                            break;
                        case ATInternet.Utils.CLICKS_FORM:
                            p(a);
                            c = !1;
                            break;
                        case ATInternet.Utils.CLICKS_REDIRECTION:
                            g(a), c = !1
                    }
                    b && (e = b.defaultPrevented, "function" === typeof b.isDefaultPrevented && (e = b.isDefaultPrevented()), e || b.preventDefault && b.preventDefault())
                }
            }
            return {
                preservePropagation: c,
                elementType: f
            }
        };
        a.techClicks.deactivateAutoManagement =
            function() {
                d = !1
            }
    };
    ATInternet.Tracker.addPlugin("TechClicks");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "requestMethod": "POST"
    };
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Clicks = function(a) {
        var e = {};
        a.configPlugin("Clicks", dfltPluginCfg || {}, function(a) {
            e = a
        });
        var k = function(a) {
                var b = "";
                switch (a) {
                    case "exit":
                        b = "S";
                        break;
                    case "download":
                        b = "T";
                        break;
                    case "action":
                        b = "A";
                        break;
                    case "navigation":
                        b = "N"
                }
                return b
            },
            d = function(b) {
                return a.utils.manageChapters(b, "chapter", 3) + (b.name ? b.name : "")
            },
            b = function(b, h) {
                var m = {
                    p: d(b),
                    click: k(b.type) || ""
                };
                "undefined" !== typeof b.level2 && (m.s2 = b.level2);
                var f = ["click"],
                    g = a.getContext("page") || {};
                m.pclick = d(g);
                "undefined" !==
                typeof g.level2 && (m.s2click = g.level2);
                if (g = b.customObject) g = a.processTagObject("stc", f, g), m.stc = {
                    _value: ATInternet.Utils.jsonSerialize(g),
                    _options: {
                        hitType: f,
                        encode: !0,
                        separator: ",",
                        truncate: !0
                    }
                };
                a.sendHit(m, [
                    ["hitType", f]
                ], b.callback, e.requestMethod, h)
            };
        a.click = {};
        a.clickListener = {};
        a.click.send = function(c) {
            c = c || {};
            var d = !0,
                m = "";
            !c.elem || "POST" === e.requestMethod && ATInternet.Utils.isBeaconMethodAvailable() || ATInternet.Utils.isTabOpeningAction(c.event) || (m = a.techClicks.manageClick(c.elem), d = m.preservePropagation,
                m = m.elementType);
            b(c, m);
            return d
        };
        a.clickListener.send = function(c) {
            c = c || {};
            if (c.elem) {
                var d = "click",
                    m = "";
                a.plugins.exec("TechClicks", "isFormSubmit", [c.elem], function(a) {
                    d = a ? "submit" : "click"
                });
                ATInternet.Utils.addEvtListener(c.elem, d, function(f) {
                    "POST" === e.requestMethod && ATInternet.Utils.isBeaconMethodAvailable() || ATInternet.Utils.isTabOpeningAction(f) || (m = a.techClicks.manageClick(c.elem, f).elementType);
                    b(c, m)
                })
            }
        };
        a.click.set = function(b) {
            b = b || {};
            a.dispatchSubscribe("click");
            a.setContext("click", {
                name: d(b),
                level2: b.level2 || "",
                customObject: b.customObject
            });
            a.setParam("click", k(b.type) || "", {
                hitType: ["click"]
            })
        };
        a.click.onDispatch = function(b, h) {
            var m = ["click"],
                f = a.getContext("click") || {},
                g = a.getContext("page") || {};
            a.setParam("pclick", d(g), {
                hitType: m
            });
            a.setParam("s2click", g.level2 || "", {
                hitType: m
            });
            a.setParam("p", f.name, {
                hitType: m
            });
            "undefined" !== typeof f.level2 && a.setParam("s2", f.level2, {
                hitType: m
            });
            (f = f.customObject) ? a.processContextObjectAndSendHit("stc", {
                hitType: m,
                encode: !0,
                separator: ",",
                truncate: !0,
                requestMethod: e.requestMethod,
                elementType: h
            }, f, b): a.manageSend(function() {
                a.sendHit(null, [
                    ["hitType", m]
                ], b, e.requestMethod, h)
            });
            a.delContext("click")
        }
    };
    ATInternet.Tracker.addPlugin("Clicks");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "clientSideMode": "always",
        "userIdCookieDuration": 397,
        "userIdExpirationMode": "fixed",
        "optOut": "OPT-OUT",
        "userIdStorageName": "atuserid",
        "userIdHitName": "idclient",
        "itpCompliant": false,
        "baseDomain": ""
    };
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.ClientSideUserId = function(a) {
        var e = {},
            k = !1,
            d = !1,
            b = null,
            c = -1;
        a.configPlugin("ClientSideUserId", dfltPluginCfg || {}, function(a) {
            e = a
        });
        var h = function() {
                var b = e.baseDomain;
                if (!b) {
                    var c = a.getConfig("cookieDomain");
                    c && (b = c, "." === b.charAt(0) && (b = b.substring(1, b.length)))
                }
                var c = a.builder.getCollectDomain(),
                    g = a.utils.getHostName();
                return !!(b && c && g && -1 !== c.indexOf(b) && -1 !== g.indexOf(b))
            },
            m = function() {
                b = {
                    contextUserId: void 0,
                    storageUserId: null,
                    finalUserId: null,
                    isFromTrackerContext: !1,
                    forceStorage: !1,
                    optout: {
                        isOptedout: !1,
                        fromStorage: !1
                    }
                }
            },
            f = function() {
                if ("relative" === e.userIdExpirationMode || "fixed" === e.userIdExpirationMode && null === b.storageUserId || b.isFromTrackerContext) {
                    var c = new Date;
                    c.setTime(c.getTime() + 864E5 * e.userIdCookieDuration);
                    a.storage.set(e.userIdStorageName, b.finalUserId, {
                        end: c,
                        path: "/"
                    }, b.forceStorage);
                    ATInternet.Utils.consent && !b.isFromTrackerContext && b.finalUserId !== a.storage.get(e.userIdStorageName, !0) && a.setParam(e.userIdHitName, b.finalUserId + "-NO", {
                        multihit: !0,
                        permanent: !0,
                        hitType: ["all"]
                    })
                }
            },
            g = function() {
                a.setParam(e.userIdHitName, b.finalUserId, {
                    multihit: !0,
                    permanent: !0,
                    hitType: ["all"]
                });
                f()
            },
            p = function() {
                m();
                var c = !1;
                null === ATInternet.Utils.optedOut ? a.storage.get(e.userIdStorageName, !0) === e.optOut ? c = ATInternet.Utils.optedOut = !0 : ATInternet.Utils.optedOut = !1 : !1 === ATInternet.Utils.optedOut && (a.getParam(e.userIdHitName) === e.optOut && a.delParam(e.userIdHitName), a.storage.get(e.userIdStorageName, !0) === e.optOut && a.storage.del(e.userIdStorageName));
                b.optout.isOptedout =
                    ATInternet.Utils.optedOut;
                b.optout.fromStorage = c;
                b.contextUserId = a.getContext("userIdentifier");
                b.storageUserId = a.storage.get("atuserid", !0);
                c = !1;
                if ("required" === e.clientSideMode) {
                    var f = "";
                    window.navigator && (f = window.navigator.userAgent);
                    if (/Safari/.test(f) && !/Chrome/.test(f) || /iPhone|iPod|iPad/.test(f)) c = !0
                } else "always" === e.clientSideMode && (c = !0);
                d = c;
                c = !1;
                if (!a.getConfig("forceHttp") && e.itpCompliant && "undefined" === typeof b.contextUserId && !b.optout.isOptedout) switch (e.clientSideMode) {
                    case "never":
                        c =
                            h();
                        break;
                    case "always":
                    case "required":
                        d && null !== b.storageUserId || (c = h())
                }(k = c) || !d && !b.optout.isOptedout && "undefined" === typeof b.contextUserId ? a.setConfig("userIdOrigin", "server") : (a.setConfig("userIdOrigin", "client"), b.isFromTrackerContext = !1, b.forceStorage = !1, b.optout.isOptedout ? (b.finalUserId = e.optOut, b.isFromTrackerContext = !b.optout.fromStorage, b.forceStorage = !0) : a.getConfig("disableCookie") || a.getConfig("disableStorage") ? (b.finalUserId = a.getParam(e.userIdHitName), b.isFromTrackerContext = !0) :
                    "undefined" !== typeof b.contextUserId ? (b.finalUserId = b.contextUserId, b.isFromTrackerContext = !0) : b.finalUserId = null !== b.storageUserId ? b.storageUserId : ATInternet.Utils.uuid().v4(), g())
            },
            n = function(a) {
                a && (a = a.detail) && "clientsideuserid" === a.name && a.id === c && p()
            };
        (function() {
            a.plugins.waitForDependencies(["Storage", "Utils"], function() {
                var a = ATInternet.Utils.uuid();
                c = parseInt(a.num(8));
                ATInternet.Utils.removeOptOutEvent(n);
                ATInternet.Utils.addOptOutEvent(c, n);
                p()
            })
        })();
        a.clientSideUserId = {};
        a.clientSideUserId.set =
            function(a) {
                b.optout.isOptedout || (b.finalUserId = a, b.isFromTrackerContext = !0, b.forceStorage = !1, g())
            };
        a.clientSideUserId.store = function() {
            b.finalUserId = a.getParam(e.userIdHitName) || b.finalUserId;
            null !== b.finalUserId && b.finalUserId !== ATInternet.Utils.privacy.CONSENTNO && b.finalUserId !== b.storageUserId && (b.isFromTrackerContext = !0, b.forceStorage = !0, f())
        };
        a.clientSideUserId.get = function() {
            b.finalUserId = a.getParam(e.userIdHitName) || b.finalUserId;
            return b.finalUserId
        };
        a.clientSideUserId.clear = function() {
            m();
            a.delParam(e.userIdHitName);
            a.storage.del(e.userIdStorageName)
        }
    };
    ATInternet.Tracker.addPlugin("ClientSideUserId");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "domainAttribution": true
    };
    var dfltGlobalCfg = {
        "redirectionLifetime": 30
    };
    ATInternet.Tracker.Plugins.ContextVariables = function(a) {
        var e = "",
            k = null,
            d, b = "",
            c = "",
            h = {};
        a.configPlugin("ContextVariables", dfltPluginCfg || {}, function(a) {
            h = a
        });
        a.setConfig("redirectionLifetime", dfltGlobalCfg.redirectionLifetime, !0);
        var m = function(b, c) {
                var g = null;
                a.plugins.exec("Storage", b, c, function(a) {
                    g = a
                });
                return g
            },
            f = function() {
                a.setParam("vtag", a.version, {
                    permanent: !0,
                    hitType: ["all"]
                })
            },
            g = function() {
                a.setParam("ptag", "js", {
                    permanent: !0,
                    hitType: ["all"]
                })
            },
            p = function() {
                var b = "";
                try {
                    b += window.screen.width +
                        "x" + window.screen.height + "x" + window.screen.pixelDepth + "x" + window.screen.colorDepth
                } catch (c) {}
                a.setParam("r", b, {
                    permanent: !0,
                    hitType: ["all"]
                })
            },
            n = function() {
                var b = "";
                window.innerWidth ? b += window.innerWidth + "x" + window.innerHeight : document.body && document.body.offsetWidth && (b += document.body.offsetWidth + "x" + document.body.offsetHeight);
                a.setParam("re", b, {
                    permanent: !0,
                    hitType: ["all"]
                })
            },
            q = function() {
                window.navigator && a.setParam("lng", window.navigator.language || window.navigator.userLanguage, {
                    permanent: !0,
                    hitType: ["all"]
                })
            },
            l = function() {
                var b = ATInternet.Utils.uuid().num(13);
                a.setParam("idp", b, {
                    permanent: !0,
                    hitType: ["page", "clickzone"]
                })
            },
            s = function() {
                window.navigator && a.setParam("jv", window.navigator.javaEnabled() ? "1" : "0", {
                    hitType: ["page"]
                })
            },
            r = function() {
                a.setParam("hl", function() {
                    var a = new Date;
                    return a.getHours() + "x" + a.getMinutes() + "x" + a.getSeconds()
                }, {
                    permanent: !0,
                    hitType: ["all"]
                })
            },
            t = function(a) {
                (a = d ? d : "acc_dir" === e ? "" : null !== e ? e : "acc_dir" === k ? "" : k ? k : a ? a.referrer : "") && (a = a.replace(/[<>]/g, "").substring(0,
                    1600).replace(/&/g, "$"));
                return a
            },
            u = function() {
                var b = a.utils.getDocumentLevel();
                a.setParam("ref", t(b), {
                    permanent: !0,
                    last: !0,
                    hitType: ["page", "ecommerce", "avinsights", "events"]
                })
            },
            w = function() {
                b = "set" + (h.domainAttribution ? "" : "Private");
                c = "get" + (h.domainAttribution ? "" : "Private");
                var t = a.utils.getLocation();
                e = a.utils.getQueryStringValue("xtref", t);
                void 0 === e && (e = "");
                d = a.getContext("forcedReferer");
                if (a.getConfig("redirect")) {
                    var t = a.utils.getDocumentLevel(),
                        t = d ? d : null !== e ? e : t ? t.referrer : "acc_dir",
                        w;
                    if (w = t) {
                        w = {
                            path: "/",
                            end: a.getConfig("redirectionLifetime")
                        };
                        var D = m(c, ["atredir"]);
                        null !== D ? w = "object" === typeof D && !(D instanceof Array) : (m(b, ["atredir", {}, w]), w = !0)
                    }
                    w && m(b, [
                        ["atredir", "ref"], t
                    ])
                } else k = m(c, [
                    ["atredir", "ref"]
                ]), m("del", [
                    ["atredir", "ref"]
                ]), f(), g(), p(), n(), r(), q(), l(), s(), u();
                a.emit("ContextVariables:Ready", {
                    lvl: "INFO"
                })
            };
        a.contextVariables = {};
        a.contextVariables.params = {};
        a.contextVariables.params.vtag = f;
        a.contextVariables.params.ptag = g;
        a.contextVariables.params.r = p;
        a.contextVariables.params.re =
            n;
        a.contextVariables.params.lng = q;
        a.contextVariables.params.idp = l;
        a.contextVariables.params.jv = s;
        a.contextVariables.params.hl = r;
        a.contextVariables.params.ref = u;
        a.contextVariables.setAll = w;
        a.plugins.waitForDependencies(["Storage", "Utils"], w)
    };
    ATInternet.Tracker.addPlugin("ContextVariables");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Page = function(a) {
        var e = ["pageId", "chapterLabel", "update"],
            k = ["pid", "pchap", "pidt"],
            d = ["page", "site"],
            b = ["f", "x"],
            c = function(b) {
                return a.utils.manageChapters(b, "chapter", 3) + (b.name ? b.name : "")
            },
            h = function(a, b, c) {
                b ? a = b : a || "undefined" === typeof c || (a = c);
                return a
            },
            m = function(a, b, c) {
                b.hasOwnProperty(c) && (a[c] = h(a[c], b[c], void 0))
            },
            f = function(c, g, f) {
                if (g)
                    for (var e = 0; e < d.length; e++)
                        if (g.hasOwnProperty(d[e]) && g[d[e]])
                            for (var h in g[d[e]]) g[d[e]].hasOwnProperty(h) && (f ? c[b[e] + h] = g[d[e]][h] :
                                a.setParam(b[e] + h, g[d[e]][h]))
            },
            g = function(b, c, d) {
                if (c) {
                    var g = a.utils.manageChapters(c, "chapter", 3);
                    g && (c.chapterLabel = g.replace(/::$/gi, ""));
                    for (g = 0; g < k.length; g++) c.hasOwnProperty(e[g]) && (d ? b[k[g]] = c[e[g]] : a.setParam(k[g], c[e[g]]))
                }
            },
            p = function(b, c, d) {
                if (c && c.keywords instanceof Array) {
                    var g = c.keywords.length;
                    if (0 < g) {
                        for (var f = "", e = 0; e < g; e++) f += "[" + c.keywords[e] + "]" + (e < g - 1 ? "|" : "");
                        d ? b.tag = f : a.setParam("tag", f)
                    }
                }
            },
            n = function(b, c, d) {
                if (c) {
                    var g, f = function(a) {
                        return a ? a : "0"
                    };
                    g = "" + (f(c.category1) + "-");
                    g += f(c.category2) + "-";
                    g += f(c.category3);
                    d ? b.ptype = g : a.setParam("ptype", g)
                }
            },
            q = function(b, c, g) {
                if (c)
                    for (var d in c) c.hasOwnProperty(d) && "undefined" !== typeof c[d] && (g ? b[d] = c[d] : a.setParam(d, c[d]))
            };
        a.customVars = {};
        a.customVars.set = function(b) {
            var c = a.getContext("page") || {},
                d = c.customVars;
            if (d) {
                if (b)
                    for (var g in b) b.hasOwnProperty(g) && (d[g] = ATInternet.Utils.completeFstLevelObj(d[g], b[g], !0))
            } else d = b;
            c.customVars = d;
            a.setContext("page", c)
        };
        a.dynamicLabel = {};
        a.dynamicLabel.set = function(b) {
            var c = a.getContext("page") || {};
            c.dynamicLabel = ATInternet.Utils.completeFstLevelObj(c.dynamicLabel, b, !0);
            a.setContext("page", c)
        };
        a.tags = {};
        a.tags.set = function(b) {
            var c = a.getContext("page") || {};
            c.tags = ATInternet.Utils.completeFstLevelObj(c.tags, b, !0);
            a.setContext("page", c)
        };
        a.customTreeStructure = {};
        a.customTreeStructure.set = function(b) {
            var c = a.getContext("page") || {};
            c.customTreeStructure = ATInternet.Utils.completeFstLevelObj(c.customTreeStructure, b, !0);
            a.setContext("page", c)
        };
        a.page = {};
        a.page.reset = function() {
            a.delContext("page")
        };
        a.page.set = function(b) {
            b = b || {};
            a.dispatchSubscribe("page");
            var c = a.getContext("page") || {};
            c.name = h(c.name, b.name, "");
            "undefined" !== typeof b.level2 && (c.level2 = b.level2);
            m(c, b, "chapter1");
            m(c, b, "chapter2");
            m(c, b, "chapter3");
            c.customObject = ATInternet.Utils.completeFstLevelObj(c.customObject, b.customObject, !0);
            a.setContext("page", c)
        };
        a.page.send = function(b) {
            b = b || {};
            var d = !0,
                e = "",
                k = {
                    p: c(b)
                };
            "undefined" !== typeof b.level2 && (k.s2 = b.level2);
            var u = b.customObject;
            if (u) {
                var w = ["page"],
                    u = a.processTagObject("stc",
                        w, u);
                k.stc = {
                    _value: ATInternet.Utils.jsonSerialize(u),
                    _options: {
                        hitType: w,
                        encode: !0,
                        separator: ",",
                        truncate: !0
                    }
                }
            }
            u = a.getContext("page") || {};
            u.vrn && (k.vrn = u.vrn, a.delContext("page", "vrn"));
            w = a.getContext("InternalSearch") || {};
            "undefined" !== typeof w.keyword && (k.mc = ATInternet.Utils.cloneSimpleObject(w.keyword), "undefined" !== typeof w.resultPageNumber && (k.np = ATInternet.Utils.cloneSimpleObject(w.resultPageNumber)), a.delContext("InternalSearch"));
            ATInternet.Utils.isPreview() && a.getConfig("preview") && (k.pvw =
                1);
            f(k, b.customVars, !0);
            g(k, b.dynamicLabel, !0);
            p(k, b.tags, !0);
            n(k, b.customTreeStructure, !0);
            w = a.getContext("campaigns") || {};
            q(k, w, !0);
            a.delContext("campaigns");
            !ATInternet.Utils.isTabOpeningAction(b.event) && b.elem && (w = a.techClicks.manageClick(b.elem), d = w.preservePropagation, e = w.elementType);
            a.manageSend(function() {
                a.sendHit(k, null, b.callback, null, e)
            });
            u.name = h(u.name, b.name, "");
            "undefined" !== typeof b.level2 && (u.level2 = b.level2);
            m(u, b, "chapter1");
            m(u, b, "chapter2");
            m(u, b, "chapter3");
            a.setContext("page",
                u);
            return d
        };
        a.page.onDispatch = function(b, d) {
            var e = a.getContext("page") || {},
                h = a.getContext("InternalSearch") || {};
            a.setParam("p", c(e));
            "undefined" !== typeof e.level2 && a.setParam("s2", e.level2);
            e.vrn && (a.setParam("vrn", e.vrn), a.delContext("page", "vrn"));
            "undefined" !== typeof h.keyword && (a.setParam("mc", ATInternet.Utils.cloneSimpleObject(h.keyword)), "undefined" !== typeof h.resultPageNumber && a.setParam("np", ATInternet.Utils.cloneSimpleObject(h.resultPageNumber)), a.delContext("InternalSearch"));
            ATInternet.Utils.isPreview() &&
                a.getConfig("preview") && a.setParam("pvw", 1);
            f(null, e.customVars, !1);
            g(null, e.dynamicLabel, !1);
            p(null, e.tags, !1);
            n(null, e.customTreeStructure, !1);
            h = a.getContext("campaigns") || {};
            q(null, h, !1);
            a.delContext("campaigns");
            var k = ["page"];
            (e = e.customObject) ? a.processContextObjectAndSendHit("stc", {
                hitType: k,
                encode: !0,
                separator: ",",
                truncate: !0,
                elementType: d
            }, e, b): a.manageSend(function() {
                a.sendHit(null, [
                    ["hitType", k]
                ], b, null, d)
            })
        }
    };
    ATInternet.Tracker.addPlugin("Page");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "lifetime": 30,
        "lastPersistence": true,
        "domainAttribution": true,
        "enableUTMTracking": true,
        "UTMParameters": ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"],
        "querystringPrefix": "at_"
    };
    var dfltGlobalCfg = {
        "visitLifetime": 30,
        "redirectionLifetime": 30
    };
    ATInternet.Tracker.Plugins.Campaigns = function(a) {
        a.setConfig("visitLifetime", dfltGlobalCfg.visitLifetime, !0);
        a.setConfig("redirectionLifetime", dfltGlobalCfg.redirectionLifetime, !0);
        var e = {},
            k, d;
        a.configPlugin("Campaigns", dfltPluginCfg || {}, function(a) {
            e = a
        });
        var b, c, h, m, f, g, p, n, q, l, s, r, t, u, w, C = function() {
                var b = function(a) {
                        var b = "";
                        a && (b = isNaN(a) && -1 === a.search(/^\[(.*?)\]$/g) && -1 === a.search(/^\d+\[(.*?)\]$/g) ? "[" + a + "]" : a);
                        return b
                    },
                    c = function(a) {
                        var b = a; - 1 !== a.search(/[-]/g) && -1 === a.search(/^\[(.*?)\]$/g) &&
                            (b = "[" + a + "]");
                        return b
                    },
                    g = function(a) {
                        for (;
                            "-" === a.charAt(a.length - 1);) a = a.substring(0, a.length - 1);
                        return a
                    };
                this.SponsoredLinks = function() {
                    var f = {
                            google: "goo",
                            yahoo: "ysm",
                            miva: "miv",
                            orange: "wan",
                            msn: "msn",
                            mirago: "mir",
                            sklik: "skl",
                            adfox: "adf",
                            etarget: "etg",
                            yandex: "yan",
                            ebay: "eba",
                            searchalliance: "sal",
                            bing: "bin",
                            naver: "nav",
                            baidu: "bdu",
                            qwant: "qwt",
                            waze: "waz",
                            amazon: "amz"
                        },
                        d = {
                            search: "s",
                            content: "c"
                        };
                    this.atMedium = "sl";
                    this.atTerm = this.atNetwork = this.atVariant = this.atCreation = this.atPlatform = this.atCampaign =
                        "";
                    this.format = function() {
                        var a = "sec",
                            h = b(this.atCampaign),
                            e = f[this.atPlatform] || c(this.atPlatform),
                            l = b(this.atCreation),
                            m = b(this.atVariant),
                            n = d[this.atNetwork] || c(this.atNetwork),
                            t = b(this.atTerm);
                        return g(a + ("-" + h + "-" + e + "-" + l + "-" + m + "-" + n + "-" + t))
                    };
                    this.setProperties = function(b) {
                        var c = a.utils.getQueryStringValue(e.querystringPrefix + "source", b) || "";
                        this.atCampaign = a.utils.getQueryStringValue(e.querystringPrefix + "campaign", b) || "";
                        this.atPlatform = a.utils.getQueryStringValue(e.querystringPrefix + "platform",
                            b) || "";
                        this.atCreation = a.utils.getQueryStringValue(e.querystringPrefix + "creation", b) || "";
                        this.atVariant = a.utils.getQueryStringValue(e.querystringPrefix + "variant", b) || "";
                        this.atNetwork = a.utils.getQueryStringValue(e.querystringPrefix + "network", b) || "";
                        this.atTerm = a.utils.getQueryStringValue(e.querystringPrefix + "term", b) || "";
                        a.setContext("campaigns_events", {
                            $: c,
                            medium: this.atMedium,
                            campaign: this.atCampaign,
                            platform: this.atPlatform,
                            creation: this.atCreation,
                            variant: this.atVariant,
                            network: this.atNetwork,
                            term: this.atTerm
                        })
                    }
                };
                this.Email = function() {
                    var f = {
                        acquisition: "erec",
                        retention: "epr",
                        promotion: "es"
                    };
                    this.atMedium = "email";
                    this.atSendTime = this.atRecipientList = this.atRecipientId = this.atLink = this.atSendDate = this.atCreation = this.atCampaign = this.atEmailtype = "";
                    this.format = function() {
                        var a = f[this.atEmailtype] || f.promotion,
                            d = b(this.atCampaign),
                            h = b(this.atCreation),
                            e = c(this.atSendDate),
                            l = b(this.atLink),
                            m = c(this.atRecipientId) + (this.atRecipientList ? "@" + c(this.atRecipientList) : ""),
                            n = c(this.atSendTime);
                        return g(a +
                            ("-" + d + "-" + h + "-" + e + "-" + l + "-" + m + "-" + n))
                    };
                    this.setProperties = function(b) {
                        var c = a.utils.getQueryStringValue(e.querystringPrefix + "source", b) || "";
                        this.atEmailtype = a.utils.getQueryStringValue(e.querystringPrefix + "emailtype", b) || "";
                        this.atCampaign = a.utils.getQueryStringValue(e.querystringPrefix + "campaign", b) || "";
                        this.atCreation = a.utils.getQueryStringValue(e.querystringPrefix + "creation", b) || "";
                        this.atSendDate = a.utils.getQueryStringValue(e.querystringPrefix + "send_date", b) || "";
                        this.atLink = a.utils.getQueryStringValue(e.querystringPrefix +
                            "link", b) || "";
                        this.atRecipientId = a.utils.getQueryStringValue(e.querystringPrefix + "recipient_id", b) || "";
                        this.atRecipientList = a.utils.getQueryStringValue(e.querystringPrefix + "recipient_list", b) || "";
                        this.atSendTime = a.utils.getQueryStringValue(e.querystringPrefix + "send_time", b) || "";
                        a.setContext("campaigns_events", {
                            $: c,
                            medium: this.atMedium,
                            emailtype: this.atEmailtype,
                            campaign: this.atCampaign,
                            creation: this.atCreation,
                            send_date: this.atSendDate,
                            link: this.atLink,
                            recipient_id: this.atRecipientId,
                            recipient_list: this.atRecipientList,
                            send_time: this.atSendTime
                        })
                    }
                };
                this.Affiliate = function() {
                    this.atMedium = "affiliate";
                    this.atVariant = this.atCreation = this.atFormat = this.atIdentifier = this.atType = this.atCampaign = "";
                    this.format = function() {
                        var a = "al",
                            c = b(this.atCampaign),
                            f = b(this.atType),
                            d = b(this.atIdentifier),
                            h = b(this.atFormat),
                            e = b(this.atCreation),
                            l = b(this.atVariant);
                        return g(a + ("-" + c + "-" + f + "-" + d + "-" + h + "-" + e + "-" + l))
                    };
                    this.setProperties = function(b) {
                        var c = a.utils.getQueryStringValue(e.querystringPrefix + "source", b) || "";
                        this.atCampaign = a.utils.getQueryStringValue(e.querystringPrefix +
                            "campaign", b) || "";
                        this.atType = a.utils.getQueryStringValue(e.querystringPrefix + "type", b) || "";
                        this.atIdentifier = a.utils.getQueryStringValue(e.querystringPrefix + "identifier", b) || "";
                        this.atFormat = a.utils.getQueryStringValue(e.querystringPrefix + "format", b) || "";
                        this.atCreation = a.utils.getQueryStringValue(e.querystringPrefix + "creation", b) || "";
                        this.atVariant = a.utils.getQueryStringValue(e.querystringPrefix + "variant", b) || "";
                        a.setContext("campaigns_events", {
                            $: c,
                            medium: this.atMedium,
                            campaign: this.atCampaign,
                            type: this.atType,
                            identifier: this.atIdentifier,
                            format: this.atFormat,
                            creation: this.atCreation,
                            variant: this.atVariant
                        })
                    }
                };
                this.Display = function() {
                    this.atMedium = "display";
                    this.atDetailPlacement = this.atGeneralPlacement = this.atChannel = this.atFormat = this.atVariant = this.atCreation = this.atCampaign = "";
                    this.format = function() {
                        var a = "ad",
                            c = b(this.atCampaign),
                            f = b(this.atCreation),
                            d = b(this.atVariant),
                            h = b(this.atFormat),
                            e = b(this.atChannel),
                            l = b(this.atGeneralPlacement),
                            m = b(this.atDetailPlacement);
                        return g(a + ("-" +
                            c + "-" + f + "-" + d + "-" + h + "-" + e + "-" + l + "-" + m))
                    };
                    this.setProperties = function(b) {
                        var c = a.utils.getQueryStringValue(e.querystringPrefix + "source", b) || "";
                        this.atCampaign = a.utils.getQueryStringValue(e.querystringPrefix + "campaign", b) || "";
                        this.atCreation = a.utils.getQueryStringValue(e.querystringPrefix + "creation", b) || "";
                        this.atVariant = a.utils.getQueryStringValue(e.querystringPrefix + "variant", b) || "";
                        this.atFormat = a.utils.getQueryStringValue(e.querystringPrefix + "format", b) || "";
                        this.atChannel = a.utils.getQueryStringValue(e.querystringPrefix +
                            "channel", b) || "";
                        this.atGeneralPlacement = a.utils.getQueryStringValue(e.querystringPrefix + "general_placement", b) || "";
                        this.atDetailPlacement = a.utils.getQueryStringValue(e.querystringPrefix + "detail_placement", b) || "";
                        a.setContext("campaigns_events", {
                            $: c,
                            medium: this.atMedium,
                            campaign: this.atCampaign,
                            creation: this.atCreation,
                            variant: this.atVariant,
                            format: this.atFormat,
                            channel: this.atChannel,
                            general_placement: this.atGeneralPlacement,
                            detail_placement: this.atDetailPlacement
                        })
                    }
                };
                this.Custom = function() {
                    this.atCustom4 =
                        this.atCustom3 = this.atCustom2 = this.atCustom1 = this.atCampaign = this.atMedium = "";
                    this.format = function() {
                        var a = "";
                        /\d+$/.test(this.atMedium) && (a = /\d+$/.exec(this.atMedium)[0]);
                        var a = "cs" + a,
                            c = b(this.atCampaign),
                            f = b(this.atCustom1),
                            d = b(this.atCustom2),
                            h = b(this.atCustom3),
                            e = b(this.atCustom4);
                        return g(a + ("-" + c + "-" + f + "-" + d + "-" + h + "-" + e))
                    };
                    this.setProperties = function(b) {
                        var c = a.utils.getQueryStringValue(e.querystringPrefix + "source", b) || "";
                        this.atMedium = a.utils.getQueryStringValue(e.querystringPrefix + "medium",
                            b) || "";
                        this.atCampaign = a.utils.getQueryStringValue(e.querystringPrefix + "campaign", b) || "";
                        this.atCustom1 = a.utils.getQueryStringValue(e.querystringPrefix + "custom1", b) || "";
                        this.atCustom2 = a.utils.getQueryStringValue(e.querystringPrefix + "custom2", b) || "";
                        this.atCustom3 = a.utils.getQueryStringValue(e.querystringPrefix + "custom3", b) || "";
                        this.atCustom4 = a.utils.getQueryStringValue(e.querystringPrefix + "custom4", b) || "";
                        a.setContext("campaigns_events", {
                            $: c,
                            medium: this.atMedium,
                            campaign: this.atCampaign,
                            custom1: this.atCustom1,
                            custom2: this.atCustom2,
                            custom3: this.atCustom3,
                            custom4: this.atCustom4
                        })
                    }
                };
                this.CustomNdf = function() {
                    function b(a, c) {
                        for (var g = {}, f = RegExp("[&#?]{1}([^&=#?]*)=([^&#]*)?", "g"), d = f.exec(c); null !== d;) d[1] !== a + "source" && 0 === d[1].indexOf(a) ? g["src_" + d[1].substring(a.length)] = d[2] : d[1] === a + "source" && (g.src = d[2]), d = f.exec(c);
                        return g
                    }
                    this.format = function() {};
                    this.setProperties = function(c) {
                        a.setProps(b(e.querystringPrefix, c), !0)
                    }
                };
                this.medium = {
                    sl: this.SponsoredLinks,
                    email: this.Email,
                    affiliate: this.Affiliate,
                    display: this.Display
                }
            },
            v = function(b, c) {
                var g = a.getContext("campaigns") || {};
                g[b] = c;
                a.setContext("campaigns", g)
            },
            D = function() {
                var b = a.utils.getLocation(),
                    c = function() {
                        for (var c = e.UTMParameters, g, f = 0; f < c.length; f++)(g = a.utils.getQueryStringValue(c[f], b)) && v(c[f], g)
                    };
                (function() {
                    var c = a.utils.getQueryStringValue(e.querystringPrefix + "medium", b);
                    if (c && !s) {
                        var g = new C,
                            c = "function" === typeof g.medium[c] ? new g.medium[c] : 0 === c.indexOf("custom") ? new g.Custom : new g.CustomNdf;
                        c.setProperties(b);
                        p = c.format()
                    } else p =
                        a.utils.getQueryStringValue("xtor", b);
                    n = a.utils.getQueryStringValue("xtdt", b);
                    q = a.utils.getQueryStringValue("xts", b)
                })();
                e.enableUTMTracking && c()
            },
            E = function(b, c) {
                var g = a.storage[d](b);
                if (null !== g) return "object" === typeof g && !(g instanceof Array);
                a.storage[k](b, {}, c);
                return !0
            };
        (function() {
            a.plugins.waitForDependencies(["Storage", "Utils"], function() {
                k = "set" + (e.domainAttribution ? "" : "Private");
                d = "get" + (e.domainAttribution ? "" : "Private");
                b = a.storage[d](["atredir", "gopc"]);
                c = a.storage[d](["atredir", "gopc_err"]);
                h = a.storage[d](["atredir", "camp"]);
                a.storage.del(["atredir", "gopc"]);
                a.storage.del(["atredir", "gopc_err"]);
                a.storage.del(["atredir", "camp"]);
                m = a.storage[d](["atsession", "histo_camp"]);
                f = a.storage[d](["atreman", "camp"]);
                g = a.storage[d](["atreman", "date"]);
                l = a.getContext("forcedCampaign");
                s = a.getContext("forcedCampaignV2");
                a: {
                    var z = s;
                    if (z) {
                        var x = "",
                            A;
                        for (A in z) z.hasOwnProperty(A) && (x += "&" + e.querystringPrefix + A + "=" + z[A]);
                        if (z = a.utils.getQueryStringValue(e.querystringPrefix + "medium", x)) {
                            A = new C;
                            z = "function" ===
                                typeof A.medium[z] ? new A.medium[z] : 0 === z.indexOf("custom") ? new A.Custom : new A.CustomNdf;
                            z.setProperties(x);
                            r = z.format();
                            break a
                        }
                    }
                    r = void 0
                }
                D();
                t = !!a.getConfig("redirect");
                u = !!(p && n && q);
                w = !1;
                u && (x = (new Date).getTime() / 6E4, w = !t && q !== a.getConfig("site") || 0 > x - n || x - n >= a.getConfig("visitLifetime"));
                x = r || l || h || p;
                t && x && E("atredir", {
                    path: "/",
                    end: a.getConfig("redirectionLifetime")
                }) && (a.storage[k](["atredir", "camp"], x), z = x = !1, l || r || (h ? (x = b, z = c) : (x = u, z = w)), a.storage[k](["atredir", "gopc"], x), a.storage[k](["atredir",
                    "gopc_err"
                ], z));
                !t && f && (v("xtor", f), x = (new Date).getTime() / 36E5, x = Math.floor(x - g), v("roinbh", 0 <= x ? x : 0));
                t || (x = null, x = h ? b ? r || l || x : r || l || h : u ? r || l : r || l || p || x, m && m instanceof Array && -1 < m.indexOf(x) && (x = null), x && v("xto", x));
                if (!t && !l && !r) {
                    var y;
                    h ? c && (y = h) : w && (y = p);
                    y && v("pgt", y)
                }
                if (!t && (y = h ? r || l || h : r || l || p || null) && !(!l && !r && !h && u && w || !l && !r && h && b && c)) {
                    if ((!m || m instanceof Array && 0 > m.indexOf(y)) && E("atsession", {
                            path: "/",
                            session: 60 * a.getConfig("visitLifetime")
                        })) a.storage[k](["atsession", "histo_camp"], m &&
                        m.push(y) ? m : [y]);
                    f && !e.lastPersistence || !E("atreman", {
                        path: "/",
                        session: 86400 * e.lifetime
                    }) || (a.storage[k](["atreman", "camp"], y), a.storage[k](["atreman", "date"], (new Date).getTime() / 36E5))
                }
                a.emit("Campaigns:process:done", {
                    lvl: "INFO"
                })
            })
        })()
    };
    ATInternet.Tracker.addPlugin("Campaigns");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "lifetime": 182,
        "domainAttribution": true
    };
    var dfltGlobalCfg = {
        "redirectionLifetime": 30
    };
    ATInternet.Tracker.Plugins.IdentifiedVisitor = function(a) {
        var e = null,
            k = null,
            d = null,
            b = null,
            c = "",
            h = "",
            m = null,
            f = null,
            g = "",
            p = "",
            n = "",
            q = {};
        a.configPlugin("IdentifiedVisitor", dfltPluginCfg || {}, function(a) {
            q = a
        });
        a.setConfig("redirectionLifetime", dfltGlobalCfg.redirectionLifetime, !0);
        var l = function(b, c) {
                var g = null;
                a.plugins.exec("Storage", b, c, function(a) {
                    g = a
                });
                return g
            },
            s = function(a, b) {
                var c = l(p, [a, !0]);
                if (null !== c) return "object" === typeof c && !(c instanceof Array);
                l(g, [a, {}, b]);
                return !0
            },
            r = function(a, b) {
                s("atidvisitor", {
                    path: "/",
                    session: 86400 * q.lifetime
                }) && l(g, [
                    ["atidvisitor", a], b
                ])
            },
            t = function(b, c, g) {
                a.setParam(b, c, {
                    hitType: ["all"],
                    permanent: !0
                });
                g && r(b, c)
            },
            u = function() {
                var a = function(a, b) {
                        /-/.test(b) ? (a.category = b.split("-")[0], a.id = b.split("-")[1]) : a.id = b
                    },
                    b = {
                        category: "",
                        id: ""
                    };
                a(b, h || f);
                var g = {
                    category: "",
                    id: ""
                };
                a(g, c || m);
                g.id ? (g.category && t("ac", g.category, !0), t("at", g.id, !0)) : e && (t("at", e, !1), d && t("ac", d, !1));
                b.id ? (b.category && t("ac", b.category, !0), t("an", b.id, !0)) : k && t("anc", d + "-" + k, !1)
            };
        a.plugins.waitForDependencies(["Storage",
            "Utils"
        ], function() {
            g = q.domainAttribution ? "set" : "setPrivate";
            p = q.domainAttribution ? "get" : "getPrivate";
            n = q.domainAttribution ? "del" : "delPrivate";
            var t = a.utils.getLocation();
            c = a.utils.getQueryStringValue("xtat", t);
            h = a.utils.getQueryStringValue("xtan", t);
            a.getConfig("redirect") ? (c || h) && s("atredir", {
                path: "/",
                end: a.getConfig("redirectionLifetime")
            }) && (h && l(g, [
                ["atredir", "an"], h
            ]), c && l(g, [
                ["atredir", "at"], c
            ])) : (m = l(p, [
                    ["atredir", "at"]
                ]), f = l(p, [
                    ["atredir", "an"]
                ]), l(n, [
                    ["atredir", "at"]
                ]), l(n, [
                    ["atredir", "an"]
                ]),
                e = l(p, [
                    ["atidvisitor", "at"]
                ]), k = l(p, [
                    ["atidvisitor", "an"]
                ]), d = l(p, [
                    ["atidvisitor", "ac"]
                ]), b = l(p, [
                    ["atidvisitor", "vrn"]
                ]), u(), t = "-" + a.getConfig("site") + "-", RegExp(t).test(b) || (b = (b || "") + t, r("vrn", b), t = a.getContext("page") || {}, t.vrn = 1, a.setContext("page", t)));
            a.emit("IdentifiedVisitor:Ready", {
                lvl: "INFO",
                details: {
                    storageRedirectTextual: m,
                    storageRedirectNumeric: f,
                    storageTextual: e,
                    storageNumeric: k,
                    storageCategory: d,
                    storageVrn: b
                }
            })
        });
        a.identifiedVisitor = {};
        a.identifiedVisitor.set = function(a) {
            a = a || {};
            var b =
                a.id;
            a = a.category;
            "number" === typeof b ? t("an", b.toString(), !0) : "string" === typeof b && t("at", b, !0);
            "undefined" !== typeof a && t("ac", a, !0)
        };
        a.identifiedVisitor.unset = function() {
            for (var b = ["an", "at", "ac"], c = 0; c < b.length; c++) l(n, [
                ["atidvisitor", b[c]]
            ]), a.delParam(b[c]);
            a.delParam("anc")
        }
    };
    ATInternet.Tracker.addPlugin("IdentifiedVisitor");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Events = function(a) {
        var e = function(a) {
            var d = {};
            a = ATInternet.Utils.cloneSimpleObject(a);
            ATInternet.Utils.object2Flatten(a, null, d, null, !0);
            a = {};
            for (var b in d) d.hasOwnProperty(b) && ATInternet.Utils.flatten2Object(a, b, d[b]);
            return ATInternet.Utils.getFormattedObject(a)
        };
        a.events = {};
        a.events.send = function(k, d, b) {
            b = b || {};
            b.origin = "events";
            var c = d;
            ATInternet.Utils.isObject(d) && (c = e(d));
            a.event.send(k, c, b)
        };
        a.events.add = function(k, d) {
            var b = d;
            ATInternet.Utils.isObject(d) && (b = e(d));
            for (var c = a.getContext("events") || [], h = !1, m = 0; m < c.length; m++)
                if (typeof c[m].hasOwnProperty(k)) {
                    h = !0;
                    break
                }
            h ? a.event.add(k, b, "events") : a.event.set(k, b, null, "events")
        };
        a.events.onDispatch = function(e, d) {
            a.event.onDispatch(e, d, "events")
        }
    };
    ATInternet.Tracker.addPlugin("Events");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "hitParameter": "col",
        "hitValue": "2"
    };
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.EventRoot = function(a) {
        var e = {},
            k = function(a) {
                for (var b = [], c, d = 0; d < a.length; d++)
                    for (var e in a[d]) a[d].hasOwnProperty(e) && (c = ATInternet.Utils.isObject(a[d][e]) ? ATInternet.Utils.objectToLowercase(a[d][e]) : a[d][e], b.push({
                        name: e.toLowerCase(),
                        data: c
                    }));
                return ATInternet.Utils.jsonSerialize(b)
            },
            d = function(b, c) {
                var g = c || "event";
                a.setParam("events", k(b), {
                    hitType: [g],
                    encode: !0,
                    truncate: !0,
                    separator: ","
                })
            },
            b = function(b, c) {
                var g = "",
                    d = {},
                    e = {};
                if ("undefined" !== typeof b) {
                    d = {};
                    b.name &&
                        (d.$ = b.name);
                    for (var e = a.getConfig("ignoreEmptyChapterValue"), h = "", l = "", k = 1; 3 >= k; k++)
                        if (l = "chapter" + k, h = b[l] || "", e && h || !e && b.hasOwnProperty(l)) d[l] = h;
                    b.url && (d.url = b.url);
                    e = {};
                    "string" === typeof b.level2 ? (h = ATInternet.Utils.trim(b.level2), 0 < h.length && (isNaN(h) ? e.level2 = h : e.level2_id = Number(h))) : "number" === typeof b.level2 && (e.level2_id = b.level2)
                }
                h = {};
                ATInternet.Utils.isEmptyObject(d) || (h.page = d);
                ATInternet.Utils.isEmptyObject(e) || (h.site = e);
                "undefined" !== typeof c && (h.src = c);
                ATInternet.Utils.isEmptyObject(h) ||
                    (g = ATInternet.Utils.jsonSerialize([{
                        data: h
                    }]));
                return g
            },
            c = function(c, d, g) {
                g = g || "event";
                c = b(c, d);
                "" !== c && a.setParam("context", c, {
                    truncate: !0,
                    hitType: [g],
                    encode: !0
                })
            },
            h = function(a, b) {
                return a instanceof Array && b instanceof Array ? a.concat(b) : ATInternet.Utils.isObject(a) && ATInternet.Utils.isObject(b) ? ATInternet.Utils.completeFstLevelObj(a, b, !0) : b
            };
        a.event = {};
        a.event.reset = function(b) {
            b = b || "event";
            a.getContext(b);
            a.delContext(b)
        };
        a.event.send = function(c, d, g) {
            var h = !0,
                n = "",
                q = "event";
            g && g.origin && (q = g.origin);
            var l = {};
            l[c] = d;
            var s = {};
            s[e.hitParameter] = {
                _value: e.hitValue,
                _options: {
                    multihit: !0
                }
            };
            c = a.getContext("page");
            d = a.getContext("campaigns_events");
            if ("undefined" !== typeof c || "undefined" !== typeof d) s.context = {
                _value: b(c, d),
                _options: {
                    truncate: !0,
                    encode: !0
                }
            };
            s.events = {
                _value: k([l]),
                _options: {
                    encode: !0,
                    truncate: !0,
                    separator: ","
                }
            };
            ATInternet.Utils.isPreview() && a.getConfig("preview") && (s.pvw = 1);
            g && !ATInternet.Utils.isTabOpeningAction(g.event) && g.elem && (l = a.techClicks.manageClick(g.elem), h = l.preservePropagation,
                n = l.elementType);
            a.manageSend(function() {
                var b;
                g && (b = g.callback);
                a.sendHit(s, [
                    ["hitType", [q]]
                ], b, null, n)
            });
            return h
        };
        a.event.set = function(b, c, g, d) {
            d = d || "event";
            a.setParam(e.hitParameter, e.hitValue, {
                multihit: !0,
                hitType: [d]
            });
            a.dispatchSubscribe(d);
            for (var n = a.getContext(d) || [], k = !1, l = 0; l < n.length; l++) n[l][b] && (k = !0, g ? ATInternet.Utils.isObject(n[l][b]) && (n[l][b][g] = h(n[l][b][g], c)) : n[l][b] = h(n[l][b], c));
            k || (k = {}, g ? (k[b] = {}, k[b][g] = c) : k[b] = c, n.push(k));
            a.setContext(d, n)
        };
        a.event.add = function(b, c, g) {
            g =
                g || "event";
            var d = a.getContext(g) || [],
                e = {};
            e[b] = c;
            d.push(e);
            a.setContext(g, d)
        };
        a.event.onDispatch = function(b, f, g) {
            var e = g || "event";
            g = a.getContext("page");
            var h = a.getContext("campaigns_events");
            "undefined" === typeof g && "undefined" === typeof h || c(g, h, e);
            g = a.getContext(e);
            "undefined" !== typeof g && d(g, e);
            a.delContext(e);
            ATInternet.Utils.isPreview() && a.getConfig("preview") && a.setParam("pvw", 1, {
                hitType: [e]
            });
            a.manageSend(function() {
                a.sendHit(null, [
                    ["hitType", [e]]
                ], b, null, f)
            })
        };
        (function() {
            a.plugins.waitForDependencies(["Utils"],
                function() {
                    a.configPlugin("EventRoot", dfltPluginCfg || {}, function(a) {
                        e = a
                    })
                })
        })()
    };
    ATInternet.Tracker.addPlugin("EventRoot");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "urlKeyword": "",
        "urlResultPageNumber": "",
        "urlResultPosition": ""
    };
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.InternalSearch = function(a) {
        var e = {};
        a.configPlugin("InternalSearch", dfltPluginCfg || {}, function(a) {
            e = a
        });
        a.internalSearch = {};
        a.internalSearch.set = function(e) {
            e = e || {};
            var d = {},
                b = d,
                c = e;
            c.hasOwnProperty("keyword") && (b.keyword = c.keyword);
            b = d;
            e.hasOwnProperty("resultPageNumber") && (b.resultPageNumber = e.resultPageNumber);
            e = a.getContext("InternalSearch") || {};
            d = ATInternet.Utils.completeFstLevelObj(d, e);
            "undefined" === typeof d.resultPageNumber && (d.resultPageNumber = "1");
            a.setContext("InternalSearch",
                d)
        };
        a.internalSearch.send = function(e) {
            e = e || {};
            var d = !0,
                b = "";
            !ATInternet.Utils.isTabOpeningAction(e.event) && e.elem && (b = a.techClicks.manageClick(e.elem), d = b.preservePropagation, b = b.elementType);
            var c = {
                np: "undefined" !== typeof e.resultPageNumber ? e.resultPageNumber : "1",
                click: "IS"
            };
            e.hasOwnProperty("keyword") && (c.mc = e.keyword);
            e.hasOwnProperty("resultPosition") && (c.mcrg = e.resultPosition);
            var h = a.getContext("page") || {};
            h.level2 && (c.s2 = h.level2);
            a.sendHit(c, [
                    ["hitType", ["InternalSearch"]]
                ], e.callback, null,
                b);
            return d
        };
        a.plugins.waitForDependencies(["Utils"], function() {
            var k;
            if (e.urlKeyword) {
                var d = document.location.href;
                k = {};
                var b = a.utils.getQueryStringValue(e.urlKeyword, d);
                b && (k.keyword = b);
                e.urlResultPageNumber && (b = a.utils.getQueryStringValue(e.urlResultPageNumber, d), k.resultPageNumber = b || "1")
            }
            k && a.setContext("InternalSearch", k);
            a.emit("InternalSearch:Ready", {
                lvl: "INFO",
                details: {
                    config: {
                        urlKeyword: e.urlKeyword,
                        urlResultPageNumber: e.urlResultPageNumber
                    },
                    url: d,
                    data: k
                }
            })
        })
    };
    ATInternet.Tracker.addPlugin("InternalSearch");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.OnSiteAds = function(a) {
        var e = this,
            k = "",
            d = function(b) {
                return a.utils.manageChapters(b, "chapter", 3) + (b.name ? b.name : "")
            },
            b = function(a, b) {
                return a && a[b] ? a[b] : ""
            },
            c = function(a, c) {
                var d = b(a, c);
                if (d) {
                    var f = b(a, "prefix");
                    if (d.campaignId) {
                        var f = f || "PUB",
                            e = b(d, "campaignId"),
                            h = b(d, "creation"),
                            k = b(d, "variant"),
                            t = b(d, "format"),
                            m = b(d, "generalPlacement"),
                            w = b(d, "detailedPlacement"),
                            C = b(d, "advertiserId"),
                            d = b(d, "url");
                        return f + "-" + e + "-" + h + "-" + k + "-" + t + "-" + m + "-" + w + "-" + C + "-" + d
                    }
                    if (d.adId) return f =
                        f || "INT", e = b(d, "adId"), h = b(d, "format"), d = b(d, "productId"), f + "-" + e + "-" + h + "||" + d
                }
                return ""
            },
            h = function(b, d) {
                b = b || {};
                var f = ["onSiteAdsImpression"],
                    e = {};
                e.ati = {
                    _value: c(b, "impression"),
                    _options: {
                        hitType: f,
                        truncate: !0
                    }
                };
                e.type = "AT";
                ATInternet.Utils.isPreview() && a.getConfig("preview") && (e.pvw = 1);
                var h = b.customObject;
                h && (h = a.processTagObject("stc", f, h), e.stc = {
                    _value: ATInternet.Utils.jsonSerialize(h),
                    _options: {
                        hitType: f,
                        encode: !0,
                        separator: ",",
                        truncate: !0
                    }
                });
                a.manageSend(function() {
                    a.sendHit(e, [
                        ["hitType",
                            f
                        ]
                    ], b.callback, null, d)
                })
            },
            m = function(b, c) {
                var d = a.buffer.get("ati", !0) || {};
                d._value = "string" === typeof d._value ? [d._value] : d._value || [];
                d._options = d._options || {
                    truncate: !0,
                    hitType: [c, "page"]
                };
                d._value.push(b);
                a.buffer.set("ati", d._value, d._options)
            },
            f = function(b, d) {
                b = b || {};
                b.click ? a.setParam("atc", c(b, "click"), {
                    truncate: !0,
                    hitType: [d, "page"]
                }) : b.impression && a.setParam("ati", c(b, "impression"), {
                    truncate: !0,
                    hitType: [d, "page"]
                });
                if (b.customObject) {
                    a.setContext("onsiteads", {
                        customObject: b.customObject
                    });
                    var f = a.getContext("page") || {};
                    f.customObject = ATInternet.Utils.completeFstLevelObj(f.customObject, b.customObject, !1);
                    a.setContext("page", f)
                }
                a.dispatchSubscribe("onSiteAds")
            };
        a.selfPromotion = {};
        a.publisher = {};
        a.publisher.set = function(a) {
            f(a, "publisher")
        };
        a.selfPromotion.set = function(a) {
            f(a, "selfPromotion")
        };
        a.publisher.add = function(b) {
            m(c(b, "impression"), "publisher");
            a.dispatchSubscribe("onSiteAds")
        };
        a.selfPromotion.add = function(b) {
            m(c(b, "impression"), "selfPromotion");
            a.dispatchSubscribe("onSiteAds")
        };
        e.advertEvent = function(b) {
            b = b || {};
            var f = !0,
                e = "";
            !ATInternet.Utils.isTabOpeningAction(b.event) && b.elem && (e = a.techClicks.manageClick(b.elem), f = e.preservePropagation, e = e.elementType);
            if (b.click) {
                b = b || {};
                var k = ["onSiteAdsClick"],
                    l = a.getContext("page") || {},
                    m = {};
                m.atc = {
                    _value: c(b, "click"),
                    _options: {
                        truncate: !0
                    }
                };
                m.type = "AT";
                m.patc = d(l);
                m.s2atc = l.level2 || "";
                if (l = b.customObject) l = a.processTagObject("stc", k, l), m.stc = {
                    _value: ATInternet.Utils.jsonSerialize(l),
                    _options: {
                        hitType: k,
                        encode: !0,
                        separator: ",",
                        truncate: !0
                    }
                };
                a.sendHit(m, [
                    ["hitType", k]
                ], b.callback, null, e)
            } else b.impression && h(b, e);
            return f
        };
        a.publisher.send = function(a) {
            return e.advertEvent(a)
        };
        a.selfPromotion.send = function(a) {
            return e.advertEvent(a)
        };
        a.onSiteAds = {};
        a.onSiteAds.onDispatch = function(b, c) {
            if (!a.dispatchSubscribed("page")) {
                a.setParam("type", "AT", {
                    hitType: ["publisher", "selfPromotion"]
                });
                var f = a.getContext("page") || {};
                a.getParam("atc") && (a.setParam("patc", d(f), {
                    hitType: ["publisher", "selfPromotion"]
                }), a.setParam("s2atc", f.level2 || "", {
                    hitType: ["publisher",
                        "selfPromotion"
                    ]
                }));
                ATInternet.Utils.isPreview() && a.getConfig("preview") && a.setParam("pvw", 1);
                var e = ["publisher", "selfPromotion"];
                (f = (a.getContext("onsiteads") || {}).customObject) ? a.processContextObjectAndSendHit("stc", {
                    hitType: e,
                    encode: !0,
                    separator: ",",
                    truncate: !0,
                    elementType: c
                }, f, b): a.manageSend(function() {
                    a.sendHit(null, [
                        ["hitType", e]
                    ], b, null, c)
                })
            }
        };
        a.plugins.waitForDependencies(["Utils", "TechClicks"], function() {
            k = document.location.href;
            var b = a.utils.getQueryStringValue("xtatc", k);
            b && a.setParam("atc",
                b, {
                    hitType: ["publisher", "selfPromotion", "page"]
                });
            a.emit("OnSiteAds:Ready", {
                lvl: "INFO",
                details: {
                    href: k
                }
            })
        })
    };
    ATInternet.Tracker.addPlugin("OnSiteAds");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "authorityStorageName": "atauthority",
        "authorities": {
            "default": {
                "name": "default",
                "optin": {
                    "name": "optin",
                    "storageDuration": 397,
                    "trackerSettings": {
                        "disableStorage": false,
                        "disableCookie": false
                    },
                    "add": {
                        "buffer": {
                            "visitorConsent": {
                                "param": "vc",
                                "value": true
                            },
                            "visitorMode": {
                                "param": "vm",
                                "value": "optin"
                            }
                        }
                    },
                    "include": {
                        "storage": "*",
                        "buffer": "*"
                    }
                },
                "optout": {
                    "name": "optout",
                    "storageDuration": 397,
                    "trackerSettings": {
                        "disableStorage": false,
                        "disableCookie": false
                    },
                    "add": {
                        "buffer": {
                            "visitorConsent": {
                                "param": "vc",
                                "value": false
                            },
                            "visitorMode": {
                                "param": "vm",
                                "value": "optout"
                            }
                        }
                    },
                    "include": {
                        "storage": ["atuserid", "atauthority"],
                        "buffer": ["s", "idclient", "ts", "vc", "vm", "click", "type", "olt", "cn", "mh"]
                    }
                },
                "no-consent": {
                    "name": "no-consent",
                    "storageDuration": 0,
                    "trackerSettings": {
                        "disableStorage": true,
                        "disableCookie": true
                    },
                    "add": {
                        "buffer": {
                            "visitorConsent": {
                                "param": "vc",
                                "value": false
                            },
                            "visitorMode": {
                                "param": "vm",
                                "value": "no-consent"
                            },
                            "idclient": {
                                "param": "idclient",
                                "value": "Consent-NO"
                            }
                        }
                    },
                    "include": {
                        "storage": [],
                        "buffer": ["s", "idclient", "ts", "vc", "vm", "click", "type", "olt", "cn", "mh"]
                    }
                },
                "random": {
                    "name": "random",
                    "storageDuration": 0,
                    "trackerSettings": {
                        "disableStorage": false,
                        "disableCookie": false
                    },
                    "add": {
                        "buffer": {
                            "visitorConsent": {
                                "param": "vc",
                                "value": false
                            },
                            "visitorMode": {
                                "param": "vm",
                                "value": "before-consent"
                            }
                        }
                    },
                    "include": {
                        "storage": [],
                        "buffer": ["s", "idclient", "p", "vtag", "ptag", "ts", "vc", "vm", "ref", "xto", "click", "type", "olt", "cn", "mh"]
                    }
                }
            },
            "cnil": {
                "name": "cnil",
                "exempt": {
                    "name": "exempt",
                    "storageDuration": 397,
                    "trackerSettings": {
                        "disableStorage": false,
                        "disableCookie": false
                    },
                    "add": {
                        "buffer": {
                            "visitorConsent": {
                                "param": "vc",
                                "value": false
                            },
                            "visitorMode": {
                                "param": "vm",
                                "value": "exempt"
                            }
                        }
                    },
                    "include": {
                        "storage": ["atuserid", "atauthority"],
                        "buffer": ["s", "idclient", "p", "vtag", "ptag", "ts", "vc", "vm", "click", "type", "olt", "cn", "mh", "ref", "pclick", "s2click"]
                    }
                }
            }
        },
        "parametersToInclude": []
    };
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Privacy = function(a) {
        var e = function(d) {
                function b() {
                    if (q && l) {
                        var b = new Date;
                        b.setTime(b.getTime() + 864E5 * l.storageDuration);
                        a.storage.set(r.authorityStorageName, {
                            authority_name: q.name,
                            visitor_mode: l.name
                        }, {
                            end: b,
                            path: "/"
                        })
                    }
                }

                function c(c) {
                    l && (0 < l.storageDuration ? c ? b() : (c = a.storage.get(r.authorityStorageName, !0), null === c ? b() : "object" === typeof c && (c.authority_name === q.name && c.visitor_mode === l.name || b())) : a.storage.del(r.authorityStorageName))
                }

                function e() {
                    ATInternet.Utils.privacy.processStorageParams(function(b) {
                            a.storage.del(b)
                        },
                        function(b) {
                            return a.storage.get(b, !0) || a.storage.getPrivate(b, !0)
                        },
                        function() {
                            return a.storage.getAll()
                        }, n.getVisitorMode().name)
                }

                function k() {
                    ATInternet.Utils.privacy.processBufferParams(function(b) {
                        a.delParam(b)
                    }, function() {
                        return a.getParams([])
                    }, function(b, c, d) {
                        a.setParam(b, c, d)
                    }, n.getVisitorMode().name)
                }

                function f(a, b, c) {
                    if (l && l.include) {
                        l.include[b] instanceof Array ? a instanceof Array ? l.include[b] = l.include[b].concat(a) : a && l.include[b].push(a) : l.include[b] !== ATInternet.Utils.privacy.ALL && (a instanceof Array ? l.include[b] = a : a && (l.include[b] = [a]));
                        a = s;
                        var d = b + "Params",
                            g = l.include[b];
                        b = [];
                        for (var f = {}, e = 0; e < g.length; e++)
                            if ("object" === typeof g[e])
                                for (var h in g[e]) g[e].hasOwnProperty(h) && (f[h] = (f[h] || []).concat(g[e][h]));
                            else b.push(g[e]);
                        for (var k in f) f.hasOwnProperty(k) && (h = {}, h[k] = f[k], b.push(h));
                        a[d] = b;
                        ATInternet.Utils.privacy.setParameters(s);
                        c && c()
                    }
                }

                function g(b, d, g, f) {
                    if (r.authorities && r.authorities[b] && r.authorities[b][d]) {
                        g && a.clientSideUserId.clear();
                        f && n.setVisitorOptin();
                        q = r.authorities[b];
                        l = q[d];
                        ATInternet.Utils.privacy.setMode(d);
                        if (l)
                            for (var v in l.trackerSettings) l.trackerSettings.hasOwnProperty(v) && a.setConfig(v, l.trackerSettings[v]);
                        if (l && l.add)
                            for (var D in l.add.buffer) l.add.buffer.hasOwnProperty(D) && a.setParam(l.add.buffer[D].param, l.add.buffer[D].value, {
                                multihit: !0,
                                permanent: !0,
                                hitType: ["all"]
                            });
                        if (l && l.include) {
                            for (var E in l.include) l.include.hasOwnProperty(E) && (b = l.include[E] instanceof Array ? l.include[E] : [l.include[E]], s[E + "Params"] = b);
                            ATInternet.Utils.privacy.setParameters(s);
                            c(!1)
                        }
                        0 < r.parametersToInclude.length && (n.extendIncludeStorage(r.parametersToInclude), n.extendIncludeBuffer(r.parametersToInclude));
                        e();
                        k();
                        p()
                    }
                }

                function p() {
                    for (var b = s.bufferParams, c = b.length, d = 0; d < c; d++) {
                        var g = b[d];
                        if (g === ATInternet.Utils.privacy.ALL) {
                            a.contextVariables.setAll();
                            break
                        }(g = a.contextVariables.params[g]) && g()
                    }
                }
                var n = this,
                    q = null,
                    l = null,
                    s = {
                        storageParams: [],
                        bufferParams: []
                    },
                    r = d;
                n.setVisitorOptout = function() {
                    ATInternet.Utils.consentReceived(!0);
                    g("default", "optout", !1, !1);
                    ATInternet.Utils.userOptedOut()
                };
                n.setVisitorOptin = function() {
                    ATInternet.Utils.consentReceived(!0);
                    a.clientSideUserId.store();
                    g("default", "optin", !1, !1);
                    ATInternet.Utils.userOptedIn()
                };
                n.setVisitorRandomID = function() {
                    ATInternet.Utils.consentReceived(!1);
                    g("default", "random", !1, !1);
                    ATInternet.Utils.userOptedIn()
                };
                n.setVisitorMode = function(a, b, c) {
                    var d = !0;
                    "cnil" === a && "exempt" === b ? d = !1 : "boolean" === typeof c && (d = c);
                    d && q && l && (d = a !== q.name || b !== l.name);
                    g(a, b, d, !0)
                };
                n.getAuthority = function() {
                    return q
                };
                n.getVisitorMode = function() {
                    return l
                };
                n.addAuthority = function(a) {
                    a && "object" === typeof a && (r.authorities = r.authorities || {}, r.authorities[a.name] = a)
                };
                n.extendIncludeStorage = function(a) {
                    f(a, "storage", e)
                };
                n.extendIncludeBuffer = function(a) {
                    f(a, "buffer", k);
                    p()
                };
                n.updateStorageDuration = function(a) {
                    l && (l.storageDuration = a, c(!0))
                };
                (function() {
                    var b = a.storage.get([r.authorityStorageName, "authority_name"], !0),
                        c = a.storage.get([r.authorityStorageName, "visitor_mode"], !0);
                    b && c && ("default" === b ? "optin" === c ? n.setVisitorOptin() : "optout" === c ? n.setVisitorOptout() :
                        "random" === c ? n.setVisitorRandomID() : n.setVisitorMode(b, c) : n.setVisitorMode(b, c))
                })()
            },
            k = null;
        a.privacy = {
            setVisitorOptout: function() {},
            setVisitorOptin: function() {},
            setVisitorRandomID: function() {},
            setVisitorMode: function() {},
            getAuthority: function() {},
            getVisitorMode: function() {},
            addAuthority: function() {},
            extendIncludeStorage: function() {},
            extendIncludeBuffer: function() {},
            updateStorageDuration: function() {}
        };
        (function() {
            a.plugins.waitForDependencies(["Storage", "Utils", "ClientSideUserId", "ContextVariables"],
                function() {
                    var d = null;
                    a.configPlugin("Privacy", dfltPluginCfg || {}, function(a) {
                        d = ATInternet.Utils.cloneSimpleObject(a)
                    });
                    null !== d && (k = new e(d), a.privacy.setVisitorOptout = k.setVisitorOptout, a.privacy.setVisitorOptin = k.setVisitorOptin, a.privacy.setVisitorRandomID = k.setVisitorRandomID, a.privacy.setVisitorMode = k.setVisitorMode, a.privacy.getAuthority = k.getAuthority, a.privacy.getVisitorMode = k.getVisitorMode, a.privacy.addAuthority = k.addAuthority, a.privacy.extendIncludeStorage = k.extendIncludeStorage, a.privacy.extendIncludeBuffer =
                        k.extendIncludeBuffer, a.privacy.updateStorageDuration = k.updateStorageDuration)
                })
        })()
    };
    ATInternet.Tracker.addPlugin("Privacy");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.RichMedia = function(a) {
        var e = function(a, b) {
                var c = parseInt(a, 10);
                return c ? Math.max(c, b) : 0
            },
            k = new function() {
                this.media = function() {
                    this.type = void 0;
                    this.plyr = 0;
                    this.clnk = this.s2 = void 0;
                    this.p = "";
                    this.m9 = this.m6 = this.m5 = this.m1 = this.rfsh = this.buf = this.a = void 0
                };
                this.mediaAll = {};
                this.setMediaValue = function(a, b, c, d) {
                    "undefined" !== typeof d && (this.mediaAll[a] = this.mediaAll[a] || {}, this.mediaAll[a][b] = this.mediaAll[a][b] || new this.media, this.mediaAll[a][b][c] = d)
                };
                this.getMediaValue =
                    function(a, b, c) {
                        if (this.mediaAll[a] && this.mediaAll[a][b]) return this.mediaAll[a][b][c]
                    };
                this.removePlayer = function(a) {
                    this.mediaAll[a] = {}
                };
                this.removeAll = function() {
                    this.mediaAll = {}
                }
            },
            d = new function() {
                this.timeout = {};
                this.setTimeout = function(b, c, d) {
                    this.timeout[b] = this.timeout[b] || {};
                    this.timeout[b][c] && window.clearTimeout(this.timeout[b][c]);
                    this.timeout[b][c] = window.setTimeout(function() {
                        a.richMedia.send({
                            action: "refresh",
                            playerId: b,
                            mediaLabel: c
                        })
                    }, 1E3 * d)
                };
                this.setTimeoutObject = function(b, c, d) {
                    this.timeout[b] =
                        this.timeout[b] || {};
                    if ("undefined" === typeof this.timeout[b][c]) {
                        var f = [],
                            h;
                        for (h in d) d.hasOwnProperty(h) && f.push({
                            delay: e(h, 0),
                            refresh: e(d[h], 5)
                        });
                        f.sort(function(a, b) {
                            return a.delay < b.delay ? -1 : a.delay > b.delay ? 1 : 0
                        });
                        this.timeout[b][c] = {
                            refreshTab: f,
                            backupRefreshTab: ATInternet.Utils.cloneSimpleObject(f),
                            delayConfiguration: {}
                        }
                    }
                    d = this.timeout[b][c];
                    if (0 < d.refreshTab.length && (f = d.refreshTab[0].delay, h = d.refreshTab[0].refresh, "number" === typeof f && "number" === typeof h && 0 < h)) {
                        d.delayConfiguration[f] = d.delayConfiguration[f] || {};
                        var m = void 0;
                        "undefined" !== typeof d.refreshTab[1] && (m = d.refreshTab[1].delay);
                        var r = 0;
                        "undefined" === typeof m ? r = 1 : "number" === typeof d.delayConfiguration[f].number ? r = "refresh" === k.getMediaValue(b, c, "a") ? Math.max(d.delayConfiguration[f].number - 1, 0) : d.delayConfiguration[f].number : "number" === typeof m && (r = Math.floor(60 * (m - f) / h) - 1);
                        d.delayConfiguration[f].number = r;
                        d.delayConfiguration[f].timeout && window.clearTimeout(d.delayConfiguration[f].timeout);
                        0 < r ? d.delayConfiguration[f].timeout = window.setTimeout(function() {
                            a.richMedia.send({
                                action: "refresh",
                                playerId: b,
                                mediaLabel: c
                            })
                        }, 1E3 * h) : (d.delayConfiguration[f].number = void 0, d.delayConfiguration[f].timeout = void 0, d.refreshTab.splice(0, 1), window.setTimeout(function() {
                            a.richMedia.send({
                                action: "refresh",
                                playerId: b,
                                mediaLabel: c
                            })
                        }, 1E3 * h));
                        this.timeout[b][c] = d
                    }
                };
                this.clearTimeout = function(a, b, c) {
                    this.timeout[a] = this.timeout[a] || {};
                    var d = this.timeout[a][b];
                    if ("object" === typeof d) {
                        if ("object" === typeof d.delayConfiguration) {
                            var f, e;
                            for (e in d.delayConfiguration) d.delayConfiguration.hasOwnProperty(e) && (f =
                                d.delayConfiguration[e].number, "undefined" !== typeof f && 0 < f && (d.delayConfiguration[e].timeout && window.clearTimeout(d.delayConfiguration[e].timeout), d.delayConfiguration[e].timeout = void 0));
                            c && (d.refreshTab = ATInternet.Utils.cloneSimpleObject(d.backupRefreshTab));
                            this.timeout[a][b] = d
                        }
                    } else d && window.clearTimeout(d)
                };
                this.removePlayer = function(b) {
                    for (var c in this.timeout[b])
                        if (this.timeout[b].hasOwnProperty(c)) {
                            this.clearTimeout(b, c, !1);
                            var d = k.getMediaValue(b, c, "a");
                            "undefined" !== typeof this.timeout[b][c] &&
                                "stop" !== d && a.richMedia.send({
                                    action: "stop",
                                    playerId: b,
                                    mediaLabel: c
                                })
                        }
                    this.timeout[b] = {}
                };
                this.removeAll = function() {
                    for (var a in this.timeout) this.timeout.hasOwnProperty(a) && this.removePlayer(a);
                    this.timeout = {}
                }
            },
            b = function(b, c, d) {
                return a.utils.manageChapters(b, c, 3) + (b[d] ? b[d] : "")
            },
            c = function(a, b, c, d) {
                var f = a[b];
                "boolean" === typeof a[b] && (f = a[b] ? d : c);
                return f
            },
            h = function(a) {
                var b = 0;
                /^(\-|\+)?([0-9]+)$/.test(a) && (b = Number(a));
                return b
            },
            m = function(a, b, c, d, f) {
                b = k.getMediaValue(b, c, d);
                "undefined" !== typeof b &&
                    (a[d] = f ? encodeURIComponent(b) : b)
            },
            f = function(a, b, c) {
                "undefined" !== typeof c && (a[b] = c)
            };
        a.richMedia = {};
        a.richMedia.add = function(a) {
            a = a || {};
            var d = h(a.playerId),
                f = b(a, "mediaTheme", "mediaLabel"),
                e = c(a, "isEmbedded", "int", "ext");
            k.setMediaValue(d, f, "plyr", d);
            k.setMediaValue(d, f, "type", a.mediaType);
            k.setMediaValue(d, f, "s2", a.mediaLevel2);
            k.setMediaValue(d, f, "p", f);
            k.setMediaValue(d, f, "clnk", a.linkedContent || a.previousMedia);
            k.setMediaValue(d, f, "a", a.action);
            k.setMediaValue(d, f, "rfsh", a.refreshDuration);
            k.setMediaValue(d,
                f, "m1", a.duration);
            k.setMediaValue(d, f, "m5", e);
            k.setMediaValue(d, f, "m6", a.broadcastMode);
            k.setMediaValue(d, f, "m9", a.webdomain)
        };
        a.richMedia.send = function(g) {
            g = g || {};
            var p = h(g.playerId),
                n = b(g, "mediaTheme", "mediaLabel"),
                q = g.action;
            k.setMediaValue(p, n, "a", q);
            var l = {
                plyr: p,
                p: n
            };
            m(l, p, n, "a", !1);
            m(l, p, n, "type", !1);
            m(l, p, n, "s2", !1);
            m(l, p, n, "m1", !1);
            m(l, p, n, "m5", !1);
            m(l, p, n, "m6", !1);
            if ("play" === q || "info" === q) {
                g = c(g, "isBuffering", "0", "1");
                var s = a.getContext("page") || {},
                    r = b(s, "chapter", "name") || void 0,
                    s = s.level2 ||
                    void 0;
                f(l, "buf", g);
                f(l, "prich", r);
                f(l, "s2rich", s);
                m(l, p, n, "clnk", !1);
                m(l, p, n, "m9", !0)
            }
            a.sendHit(l, [
                ["hitType", ["richmedia"]]
            ], null, null, null);
            "pause" === q ? d.clearTimeout(p, n, !1) : "stop" === q && d.clearTimeout(p, n, !0);
            if ("play" === q || "refresh" === q) q = k.getMediaValue(p, n, "rfsh"), "object" === typeof q && null !== q ? d.setTimeoutObject(p, n, q) : (q = e(q, 5), 0 !== q && d.setTimeout(p, n, q))
        };
        a.richMedia.remove = function(a) {
            d.removePlayer(a);
            k.removePlayer(a)
        };
        a.richMedia.removeAll = function() {
            d.removeAll();
            k.removeAll()
        }
    };
    window.ATInternet.Tracker.addPlugin("RichMedia");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "storageCapacity": 1,
        "storageMode": "required",
        "timeout": 500
    };
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Offline = function(a) {
        function e(b, g, q, l) {
            if (window.navigator && window.navigator.onLine) {
                var s = h();
                if (0 < s.length) {
                    var r = s.shift();
                    c({
                        hits: s
                    });
                    d || (a.onTrigger("Tracker:Hit:Sent:Ok", function(a, c) {
                        b && c.details.hit === b || e(b, g, q, l)
                    }, !1), a.onTrigger("Tracker:Hit:Sent:Error", function(a, c) {
                        b && c.details.hit === b || e(b, g, q, l)
                    }, !1), d = !0);
                    a.sendUrl(r, null, "GET", l)
                } else b && (a.utils.getQueryStringValue("a", b) ? setTimeout(function() {
                    a.sendUrl(b, null, null, null)
                }, k.timeout) : a.sendUrl(b, g, q, l))
            } else b &&
                (f(m(b)), g && g())
        }
        var k = {},
            d = !1;
        a.configPlugin("Offline", dfltPluginCfg || {}, function(a) {
            k = a
        });
        var b = function() {
                var a = localStorage.getItem("ATOffline"),
                    b = {
                        hits: [],
                        length: 0
                    };
                if (a) {
                    var c = ATInternet.Utils.jsonParse(a) || {
                        hits: []
                    };
                    b.hits = c.hits;
                    b.length = a.length
                }
                return b
            },
            c = function(a) {
                try {
                    localStorage.setItem("ATOffline", ATInternet.Utils.jsonSerialize(a))
                } catch (b) {}
            },
            h = function() {
                return b().hits
            },
            m = function(a) {
                if (a) {
                    a = a.split(/&ref=\.*/i);
                    var b = "&cn=offline&olt=" + String(Math.floor((new Date).getTime() / 1E3));
                    a = a[0] + b + (a[1] ? "&ref=" + a[1] : "")
                }
                return a
            },
            f = function(a) {
                var g = b(),
                    d = a.length,
                    f = !0;
                if (4 * ((g.length || 11) + d) > 1048576 * k.storageCapacity) {
                    var f = !1,
                        e = g.hits.shift();
                    if ("undefined" !== typeof e)
                        for (var f = !0, h = e.length; h < d;)
                            if (e = g.hits.shift(), "undefined" !== typeof e) h += e.length;
                            else {
                                f = !1;
                                break
                            }
                }
                f && (g.hits.push(a), c({
                    hits: g.hits
                }))
            },
            g = function(b) {
                a.builder.sendUrl = function(a, c, g, d) {
                    b || window.navigator && !window.navigator.onLine ? (f(m(a)), c && c()) : e(a, c, g, d)
                }
            };
        a.offline = {};
        a.offline.getLength = function() {
            return 4 *
                b().length
        };
        a.offline.remove = function() {
            c({
                hits: []
            })
        };
        a.offline.get = h;
        a.offline.send = function() {
            e(null, null, "GET")
        };
        a.plugins.waitForDependencies(["Utils"], function() {
            var b = ATInternet.Utils.isLocalStorageAvailable(),
                c;
            window.navigator && (c = window.navigator.onLine);
            b && "undefined" !== typeof c && ("required" === k.storageMode ? g(!1) : "always" === k.storageMode && g(!0));
            a.emit("Offline:Ready", {
                lvl: "INFO",
                details: {
                    isLocalStorageAvailable: b,
                    storageMode: k.storageMode,
                    isOnline: c
                }
            })
        })
    };
    window.ATInternet.Tracker.addPlugin("Offline");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Ecommerce = function(a) {
        var e = null,
            k = null,
            d = {
                "new": "new"
            };
        a.ecommerce = {
            cartAwaitingPayment: {},
            displayProduct: {},
            displayPageProduct: {},
            addProduct: {},
            removeProduct: {},
            displayCart: {},
            updateCart: {},
            deliveryCheckout: {},
            paymentCheckout: {},
            transactionConfirmation: {}
        };
        a.ecommerce.reset = function() {
            a.event.reset("ecommerce")
        };
        a.ecommerce.cartAwaitingPayment.cart = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.cart = b;
                    b = ATInternet.Utils.uuid();
                    c.cart.version = b.v4().split("-")[0];
                    k.updateProductAwaitingPayment(c.cart);
                    a.event.set("cart.awaiting_payment", c.cart, "cart", "ecommerce")
                }
            }
        };
        a.ecommerce.cartAwaitingPayment.products = {
            set: function(a) {
                if (a instanceof Array) {
                    a = e.arrayObjectKeysFromLegacyToNewFormat(a);
                    var c = k.getObjectValueFromType("cart.awaiting_payment", "cart"),
                        d = {};
                    c.id && (d.id = c.id);
                    c.version && (d.version = c.version);
                    k.setProductAwaitingPayment(a, d)
                }
            }
        };
        a.ecommerce.cartAwaitingPayment.shipping = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b =
                        e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.shipping = b;
                    a.event.set("cart.awaiting_payment", c.shipping, "shipping", "ecommerce")
                }
            }
        };
        a.ecommerce.cartAwaitingPayment.payment = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.payment = b;
                    a.event.set("cart.awaiting_payment", c.payment, "payment", "ecommerce")
                }
            }
        };
        a.ecommerce.cartAwaitingPayment.transaction = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.transaction =
                        b;
                    a.event.set("cart.awaiting_payment", c.transaction, "transaction", "ecommerce")
                }
            }
        };
        a.ecommerce.displayProduct.products = {
            set: function(a) {
                a instanceof Array && (a = e.arrayObjectKeysFromLegacyToNewFormat(a), k.setProductDisplay(a))
            }
        };
        a.ecommerce.displayPageProduct.products = {
            set: function(a) {
                a instanceof Array && (a = e.arrayObjectKeysFromLegacyToNewFormat(a), k.setProductPageDisplay(a))
            }
        };
        a.ecommerce.addProduct.cart = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.cart = b;
                    a.event.set("product.add_to_cart", c.cart, "cart", "ecommerce");
                    k.updateCartCreation(c.cart)
                }
            }
        };
        a.ecommerce.addProduct.products = {
            set: function(a) {
                if (a instanceof Array) {
                    a = e.arrayObjectKeysFromLegacyToNewFormat(a);
                    for (var c = !1, d = k.getObjectValueFromType("product.add_to_cart", "cart").id, d = k.initCartWithId(d), m = 0; m < a.length; m++) d.currency = a[m].currency, d.turnovertaxincluded += (Number(a[m].pricetaxincluded) || 0) * (Number(a[m].quantity) || 0), d.turnovertaxfree += (Number(a[m].pricetaxfree) || 0) * (Number(a[m].quantity) ||
                        0), d.quantity += Number(a[m].quantity) || 0, d.nbdistinctproduct += 1, Boolean(Number(a[m].cartcreation)) && (c = !0);
                    m = {};
                    d.id && (m.id = d.id);
                    k.setProductAddToCart(a, m);
                    c && k.setCartCreation(d)
                }
            }
        };
        a.ecommerce.removeProduct.cart = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.cart = b;
                    a.event.set("product.remove_from_cart", c.cart, "cart", "ecommerce")
                }
            }
        };
        a.ecommerce.removeProduct.products = {
            set: function(a) {
                if (a instanceof Array) {
                    a = e.arrayObjectKeysFromLegacyToNewFormat(a);
                    var c = {};
                    c.id = k.getObjectValueFromType("product.remove_from_cart", "cart").id;
                    var d = {};
                    c.id && (d.id = c.id);
                    k.setProductRemoveFromCart(a, d)
                }
            }
        };
        a.ecommerce.displayCart.cart = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.cart = b;
                    a.event.set("cart.display", c.cart, "cart", "ecommerce")
                }
            }
        };
        a.ecommerce.displayCart.products = {
            set: function(a) {}
        };
        a.ecommerce.updateCart.cart = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.cart = b;
                    a.event.set("cart.update", c.cart, "cart", "ecommerce")
                }
            }
        };
        a.ecommerce.deliveryCheckout.cart = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.cart = b;
                    a.event.set("cart.delivery", c.cart, "cart", "ecommerce")
                }
            }
        };
        a.ecommerce.deliveryCheckout.shipping = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.shipping = b;
                    a.event.set("cart.delivery", c.shipping, "shipping", "ecommerce")
                }
            }
        };
        a.ecommerce.paymentCheckout.cart = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.cart = b;
                    a.event.set("cart.payment", c.cart, "cart", "ecommerce")
                }
            }
        };
        a.ecommerce.paymentCheckout.shipping = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.shipping = b;
                    a.event.set("cart.payment", c.shipping, "shipping", "ecommerce")
                }
            }
        };
        a.ecommerce.transactionConfirmation.cart = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.cart = b;
                    a.event.set("transaction.confirmation", c.cart, "cart", "ecommerce");
                    k.updateProductPurchased(null, c.cart)
                }
            }
        };
        a.ecommerce.transactionConfirmation.discount = {
            set: function(b) {
                if (b instanceof Array) {
                    var c = {
                        transaction: {}
                    };
                    c.transaction.promocode = b;
                    a.event.set("transaction.confirmation", c.transaction, "transaction", "ecommerce")
                }
            }
        };
        a.ecommerce.transactionConfirmation.transaction = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.transaction =
                        b;
                    a.event.set("transaction.confirmation", c.transaction, "transaction", "ecommerce");
                    k.updateProductPurchased(c.transaction, null)
                }
            }
        };
        a.ecommerce.transactionConfirmation.shipping = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.shipping = b;
                    a.event.set("transaction.confirmation", c.shipping, "shipping", "ecommerce")
                }
            }
        };
        a.ecommerce.transactionConfirmation.payment = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {};
                    c.payment = b;
                    a.event.set("transaction.confirmation", c.payment, "payment", "ecommerce")
                }
            }
        };
        a.ecommerce.transactionConfirmation.customer = {
            set: function(b) {
                if (ATInternet.Utils.isObject(b)) {
                    b = e.objectKeysFromLegacyToNewFormat(b);
                    var c = {
                        transaction: {}
                    };
                    c.transaction.firstpurchase = b[d["new"]];
                    a.event.set("transaction.confirmation", c.transaction, "transaction", "ecommerce")
                }
            }
        };
        a.ecommerce.transactionConfirmation.products = {
            set: function(a) {
                if (a instanceof Array) {
                    a = e.arrayObjectKeysFromLegacyToNewFormat(a);
                    for (var c = [], d = k.getObjectValueFromType("transaction.confirmation", "cart"), m = k.getObjectValueFromType("transaction.confirmation", "transaction"), f = 0; f < a.length; f++) c.push(a[f]);
                    k.setProductPurchased(c, m, d)
                }
            }
        };
        e = new function() {
            this.objectKeysFromLegacyToNewFormat = function(a) {
                var c = {},
                    d, e;
                for (e in a) a.hasOwnProperty(e) && (d = e.toLowerCase(), d = "name" === d ? "$" : d, c[d] = a[e]);
                return c
            };
            this.arrayObjectKeysFromLegacyToNewFormat = function(a) {
                for (var c = [], d = 0; d < a.length; d++) c.push(e.objectKeysFromLegacyToNewFormat(a[d]));
                return c
            }
        };
        k = new function() {
            this.initCartWithId = function(a) {
                var c = {};
                c.id = a;
                c.currency = "";
                c.turnovertaxincluded = 0;
                c.turnovertaxfree = 0;
                c.quantity = 0;
                c.nbdistinctproduct = 0;
                return c
            };
            this.getObjectValueFromType = function(b, c) {
                for (var d, e = {}, f = a.getContext("ecommerce") || [], g = 0; g < f.length; g++)
                    if (d = f[g][b] || {}, d[c]) {
                        e = d[c];
                        break
                    }
                return e
            };
            this.setEventFromProductsAndCart = function(b, c, d) {
                c = c || [];
                for (var e = {}, f = 0; f < c.length; f++) 0 === f ? (a.event.set(b, c[f], "product", "ecommerce"), d && 0 !== Object.keys(d).length &&
                    a.event.set(b, d, "cart", "ecommerce")) : (e.product = c[f], d && 0 !== Object.keys(d).length && (e.cart = d), a.event.add(b, e, "ecommerce")), e = {}
            };
            this.setProductAwaitingPayment = function(a, c) {
                this.setEventFromProductsAndCart("product.awaiting_payment", a, c)
            };
            this.updateProductAwaitingPayment = function(b) {
                var c = b ? b.id : "";
                b = b ? b.version : "";
                if (c && b)
                    for (var d, e = a.getContext("ecommerce") || [], f = 0; f < e.length; f++)
                        if (d = e[f]["product.awaiting_payment"]) d.cart = {}, d.cart.id = c, d.cart.version = b, e[f]["product.awaiting_payment"] = d
            };
            this.setProductDisplay = function(a) {
                this.setEventFromProductsAndCart("product.display", a, null)
            };
            this.setProductPageDisplay = function(a) {
                this.setEventFromProductsAndCart("product.page_display", a, null)
            };
            this.setProductAddToCart = function(a, c) {
                this.setEventFromProductsAndCart("product.add_to_cart", a, c)
            };
            this.setProductRemoveFromCart = function(a, c) {
                this.setEventFromProductsAndCart("product.remove_from_cart", a, c)
            };
            this.setCartCreation = function(b) {
                var c = {};
                c.cart = b;
                a.event.set("cart.creation", c, null, "ecommerce")
            };
            this.updateCartCreation = function(b) {
                if (b = b ? b.id : "")
                    for (var c, d = a.getContext("ecommerce") || [], e = 0; e < d.length; e++)(c = d[e]["cart.creation"]) && c.cart && (c.cart.id = b, d[e]["cart.creation"] = c)
            };
            this.setProductPurchased = function(b, c, d) {
                b = b || [];
                c = c ? c.id : "";
                d = d ? d.id : "";
                for (var e = {}, f = 0; f < b.length; f++) e.transaction = {}, e.transaction.id = c, e.cart = {}, e.cart.id = d, e.product = b[f], 0 === f ? a.event.set("product.purchased", e, null, "ecommerce") : a.event.add("product.purchased", e, "ecommerce"), e = {}
            };
            this.updateProductPurchased =
                function(b, c) {
                    for (var d = b ? b.id : "", e = c ? c.id : "", f, g = a.getContext("ecommerce") || [], p = 0; p < g.length; p++)
                        if (f = g[p]["product.purchased"]) d && f.transaction ? f.transaction.id = d : e && f.cart && (f.cart.id = e), g[p]["product.purchased"] = f
                }
        };
        a.ecommerce.onDispatch = function(b, c) {
            a.event.onDispatch(b, c, "ecommerce")
        }
    };
    ATInternet.Tracker.addPlugin("Ecommerce");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.MvTesting = function(a) {
        var e = 0,
            k = function(a, b) {
                var d = "";
                a.hasOwnProperty(b) && (d = a[b], d = void 0 === d ? "" : d + "");
                return d
            },
            d = function(a) {
                return "object" === typeof a && !(a instanceof Array)
            },
            b = function(b) {
                return a.utils.manageChapters(b, "chapter", 3) + (b.name ? b.name : "")
            };
        a.mvTesting = {};
        a.mvTesting.set = function(b) {
            if (d(b) && !ATInternet.Utils.isEmptyObject(b)) {
                a.dispatchSubscribe("mvTesting");
                var e = k(b, "test"),
                    m = k(b, "waveId");
                b = k(b, "creation");
                a.setParam("abmvc", e + "-" + m + "-" + b, {
                    hitType: ["mvtesting"]
                })
            }
        };
        a.mvTesting.add = function(b) {
            if (d(b) && !ATInternet.Utils.isEmptyObject(b)) {
                a.dispatchSubscribe("mvTesting");
                var h = k(b, "variable");
                b = k(b, "version");
                e++;
                a.setParam("abmv" + e, h + "-" + b, {
                    hitType: ["mvtesting"]
                })
            }
        };
        a.mvTesting.onDispatch = function(c) {
            var d = a.getContext("page") || {};
            a.setParam("p", b(d), {
                hitType: ["mvtesting"]
            });
            "undefined" !== typeof d.level2 && a.setParam("s2", d.level2, {
                hitType: ["mvtesting"]
            });
            a.setParam("type", "mvt", {
                hitType: ["mvtesting"]
            });
            a.sendHit(null, [
                ["hitType", ["mvtesting"]]
            ], c, null, null)
        }
    };
    window.ATInternet.Tracker.addPlugin("MvTesting");
}).call(window);
if (typeof window.ATInternet.onTrackerLoad === 'function') {
    window.ATInternet.onTrackerLoad();
}
/* End of AT Internet Proprietary Code */

/* Cookie Handling Code*/
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + escape(value) + expires + "; path=/; secure";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
/*MAAH 20221019 Warning: Verify if this is the right way to get the consent status*/
if (
	('rh-analytic-consent')!=='')  createCookie('rh-analytic-consent',gup('rh-analytic-consent'),30);

function getAnalyticsGDPRStatus()
 {
    //if(readCookie("Cookie-Accept") == null){return true} else if(readCookie("Cookie-Accept").match(/^(1|2)$/)){ return true} else {return false}
    if(readCookie('rh-analytic-consent') !== 'false') return true;  
    else return false;
}

/*URL Parameter Reader*/
function gup(name, url) {
    if (!url) url = decodeURIComponent(location.href);
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? "" : results[1];
}

function getJobDetailCountry() {
    var list = document.getElementsByTagName("span");
    for (i = 0; i < list.length; i++) {
        if (typeof list[i].innerHTML != null && (list[i].innerHTML.match(/Primary Location|Lieu Principal|Prim.*rer Standort|Ubicaci.*n principal/i))) {
            try {
                tmp_location = list[i + 4].innerHTML;
                if (tmp_location.match(/organi.a.i.n/i)) {
                    tmp_location = list[i + 3].innerHTML
                }
                return tmp_location.match(/France/i) ? "FR" : tmp_location
            } catch (err) {
                return 'Unable to retrieve location';
            }
        }
    }
}

var tmp_fr_flux = '';

function testFlux(testCriteria) {
    if (testCriteria.match(/\/careersection\/(1|m1|2|m2|ag1|axadisclaimertonotuse|iam|candidature_spontanee)\//)) {
        /* GLOBAL CASE */
        if (readCookie("sys_cSource") == null) {
            if (document.referrer.match(/(jobs\.axa|thirtythreestaging)\.co\.uk/) || testCriteria.match(/CWS-11321/) || testCriteria.match(/AXA_src(=|%3D)UK/)) {
                createCookie("sys_cSource", "UK_Global")
                return "UK_Global"
            } else if (document.referrer.match(/recrutement\.axa\.fr/)) {
                createCookie("sys_cSource", "FR")
                return "FR"
            } else if (testCriteria.match(/UNS-11580/)) {
                createCookie("sys_cSource", "FR")
                tmp_fr_flux = "1_fr1"
                return "FR"
            } else if (testCriteria.match(/CWS-11300/)) {
                createCookie("sys_cSource", "FR")
                tmp_fr_flux = "1_fr3"
                return "FR"
            } else if (typeof sessionTimeoutUrl_ != "undefined" && sessionTimeoutUrl_.match(/\/careersection\/(1_fr1|1_fr2|1_fr3)\//)) {
                if (testCriteria.match(/\/careersection\/1_fr1\//)) {
                    tmp_fr_flux = "1_fr1"
                } else if (testCriteria.match(/\/careersection\/1_fr2\//)) {
                    tmp_fr_flux = "1_fr2"
                } else {
                    tmp_fr_flux = "1_fr3"
                }
                return "FR"
            } else if (location.pathname.match(/jobdetail.ftl/)) {
                createCookie("sys_cSource", getJobDetailCountry() + "_Global")
                return readCookie("sys_cSource")
            } else {
                createCookie("sys_cSource", "unknown")
                return "unknown"
            }
        } else if (readCookie("sys_cSource") == "UK_Global") {
            return "UK_Global"
        } else if (location.pathname.match(/jobdetail.ftl/)) {
            createCookie("sys_cSource", getJobDetailCountry() + "_Global")
            return readCookie("sys_cSource")
        } else if (testCriteria.match(/UNS-11580/)) {
            createCookie("sys_cSource", "FR")
            tmp_fr_flux = "1_fr1"
            return "FR"
        } else if (testCriteria.match(/CWS-11300/)) {
            createCookie("sys_cSource", "FR")
            tmp_fr_flux = "1_fr3"
            return "FR"
        } else {
            return readCookie("sys_cSource")
        }
    } else if (testCriteria.match(/\/careersection\/(1_fr1|1_fr2|1_fr3|candidature_spontanee)\//)) {
        if (testCriteria.match(/\/careersection\/(1_fr1|candidature_spontanee)\//)) {
            tmp_fr_flux = "1_fr1"
        } else if (testCriteria.match(/\/careersection\/1_fr2\//)) {
            tmp_fr_flux = "1_fr2"
        } else {
            tmp_fr_flux = "1_fr3"
        }
        return "FR"
    } else if (testCriteria.match(/\/careersection\/(1_bis|m1_bis|2_bis|m2_bis)\//)) {
        return "US"
    }
    return ""
}

function getTrackingStatus() {
    testCriteria1 = testFlux(location.pathname + location.search);
    if (testCriteria1) {
        return testCriteria1
    } else if (document.getElementsByClassName("headersection")[0] != null) {
        return testFlux(document.getElementsByClassName("headersection")[0].innerHTML);
    }
    return ""
}

/*MAAH 20221019 start*/
function SendPage2ATIntOld(pEnvironment,pPageName,pJSONCD,pJSONPD)
{
var ATconfig = new Object();
ATconfig.site = '572363'; 
if (pEnvironment === 'production') ATconfig.site ='551845';
ATconfig.secure = true;
var tag = new ATInternet.Tracker.Tag(ATconfig);
tag.page.set({ name: pPageName,
               level2: '2'
             });
tag.customVars.set({
             site: {
                     "1": pJSONCD.D1,
                     "6": pJSONCD.D6,
                     "7": pJSONCD.D7
                   },
             page: {
                      "1": pJSONPD.D1,
                      "2": pJSONPD.D2
                   }
});
tag.dispatch();
}
function SendPage2ATInt(pEnvironment,pPageName,pJSONCD,pJSONPD)
{
var ATconfig = new Object();
ATconfig.site = '572363'; 
if (pEnvironment === 'production') ATconfig.site ='551845';
ATconfig.secure = true;
var ATTag = new ATInternet.Tracker.Tag(ATconfig);
ATTag.privacy.setVisitorOptin();
ATTag.page.send({
                 name:tracking_pageName,
                 level2:'2',
                 customObject:{"env_work":pEnvironment,
                               "full_url":location.hostname+location.pathname,  
                               "visit_number_by_site":pJSONCD.D1,
                               "application_job_id": pJSONCD.D6,
                               "application_job_label": pJSONCD.D7,
                               "job_id":pJSONPD.D1,
                               "job_label":pJSONPD.D2,
							  }
			});


}
function SendPageCNILEXEMPT2ATInt(pEnvironment,pPageName)
{
var ATconfig = new Object();
ATconfig.site = '572363'; 
if (pEnvironment === 'production') ATconfig.site ='551845';
ATconfig.secure = true;
var ATTag = new ATInternet.Tracker.Tag(ATconfig);

 ATTag.privacy.setVisitorMode('cnil', 'exempt');
 ATTag.privacy.extendIncludeBuffer(["s2","xtor","xto"]); 
 ATTag.privacy.extendIncludeBuffer({'stc':['env_work','hit_type','full_url']});
 ATTag.page.send({name:pPageName,
                level2:'2',
                customObject: {env_work:pEnvironment,
                              full_url:location.hostname+location.pathname  }}
               );
}
var environment='non-prod';
if (location.host == 'axa.taleo.net' || location.host == 'jobs.axa') environment='production';
/*MAAH 20221019 end*/



			   

tmp_TrackingStatus = getTrackingStatus();
if (tmp_TrackingStatus.match(/^(FR|FR_Global|UK_Global)$/)) {

    var tracking_pageName = '';
    var tracking_pageNameSuffix = '';
    var tracking_siteLocation = '';
    var tracking_jobID = '';
    var tracking_jobTitle = '';
    var tracking_step_number = '';
    var tracking_step_title = '';
    var tracking_eraseATCookieFlag = false;
    var tracking_confirmPageFlag = false;
    tmpNewPNRegexArray = [
        ["(jobs.axa|axa.taleo.net)\/careersection\/.*\/moresearch", "/JobsSearch"],
        ["(jobs.axa|axa.taleo.net)\/careersection\/.*\/jobdetail", "/JobDescription"],
        ["(jobs.axa|axa.taleo.net)\/careersection\/.*\/joblist", "/Job_List"],
        ["(jobs.axa|axa.taleo.net)\/careersection\/.*\/mysubmissions", "/MyJobApplications"],
        ["accessmanagement\/login\.jsf", "/Login_Forgot_Password_Username"],
        ["accessmanagement\/forgotPasswordAccessCode\.jsf", "/ForgottenPwd/StepX"],
        ["careersection.*privacyagreement\/statementBeforeAuthentification\.jsf", "/AccountCreation/Step2_Form"],
        ["careersection.*accessmanagement\/changeQuestionsAnswers\.jsf", "/AccountCreation/Step3_SecurityQuestion"],
        ["careersection.*application\.jss", "/ApplicationFlow"],
        ["careersection.*candidateacquisition/flow\.jsf", "/ApplicationFlow"],
        ["careersection\.*/profile.(jss|ftl)", "/ApplicationFlow"],
        ["accessmanagement\/forgotUsername\.jsf", "/ForgottenID/FullForm"]
    ]

    tmpUKFRPNArray = [
        ["/JobsSearch", "Formulaire_Recherche"],
        ["/JobDescription", "Description_Poste"],
        ["/Job_List", "Liste_Postes"],
        ["/MyJobApplications", "Mes_Candidatures"],
        ["/Login_Forgot_Password_Username", "Login_Forgot_Password_Username"],
        ["/ForgottenPwd/StepX", "Oubli_MotDePasse::StepX"],
        ["/AccountCreation/Step2_Form", "Creation_Compte::2_Formulaire"],
        ["/AccountCreation/Step3_SecurityQuestion", "Creation_Compte::3_Question_Securite"],
        ["/ApplicationFlow", "Application_Flow"],
        ["/ForgottenID/FullForm", "Oubli_Identifiant::Formulaire_Complet"],
        ["/Connexion", "Connexion"],
        ["/AccountCreation/Step1_PrivacyAgreement", "Creation_Compte::1_Accord_Confidentialite"],
        ["/ForgottenID/QuickForm", "Oubli_Identifiant::Formulaire_Rapide"],
        ["/ForgottenPwd/Form", "Oubli_MotDePasse::Formulaire"],
        ["/Connexion/unknown", "Connexion::unknown"]
    ]

    function getNewPageName(strPN) {
        newsStrPN = strPN.toLowerCase();
        for (i = 0; i < tmpNewPNRegexArray.length; i++) {
            if (tmpNewPNRegexArray[i][0] != "" && newsStrPN.match(tmpNewPNRegexArray[i][0].toLowerCase())) {
                return tmpNewPNRegexArray[i][1]
            }
        }
        return ""
    }

    function getNewPageNameFR(strPN) {
        for (i = 0; i < tmpUKFRPNArray.length; i++) {
            if (tmpUKFRPNArray[i][0] != "" && strPN.match(tmpUKFRPNArray[i][0])) {
                return tmpUKFRPNArray[i][1]
            }
        }
        return ""
    }

    /* tracking_pageName */
    tracking_pageName = getNewPageName(location.href);
    if (tracking_pageName == "") {
        tracking_pageName = "/Unknown/" + location.href;
    }

    /* Get Title (confirmation message or step detail) */
    tracking_titleTag = document.getElementsByTagName("title")[0] != null ? document.getElementsByTagName("title")[0].innerHTML : "";

    if (tracking_pageName == "/Login_Forgot_Password_Username") {
        switch (tracking_titleTag) {
            case "Login":
            case "Connexion":
                tracking_pageName = "/Connexion"
                break;
            case "Privacy Agreement":
            case "Accord de confidentialit" + String.fromCharCode(0xE9):
                tracking_pageName = "/AccountCreation/Step1_PrivacyAgreement"
                break;
            case "Laissez-vous guider":
            case "Forgotten User Name":
                tracking_pageName = "/ForgottenID/QuickForm";
                break;
            case "Vous avez oubli" + String.fromCharCode(0xE9) + " votre mot de passe ?":
            case "Forgot Your Password?":
                tracking_pageName = "/ForgottenPwd/Form";
                break;
            default:
                tracking_pageName = "/Connexion/unknown"
        }
    }

    /* ga_jobID & ga_jobTitle */
    if (tracking_pageName == "/ApplicationFlow") {
        /* Get Step Title, Step Number, Step Title Prefix */
        tracking_step_title = document.getElementsByTagName("head")[0] != null ? document.getElementsByTagName("head")[0].title : "";
        tracking_step_number = document.getElementsByClassName("flowstatus")[0] != null ? document.getElementsByClassName("flowstatus")[0].innerHTML : "";

        /* Get Title (confirmation message) */
        tracking_titleClass = document.getElementsByClassName("title")[0] != null ? document.getElementsByClassName("title")[0].innerHTML : "";
    }
    if (tmp_TrackingStatus == "FR") {
        function getFluxTaleo() {
            switch (tmp_fr_flux) {
                case "1_fr2":
                    /* CsNo=10261 */
                    tmp_flux = "Flux_Candidature_Simple";
                    break;
                case "1_fr3":
                    /* CsNo=10263 */
                    tmp_flux = "Flux_Candidature_Spontan" + String.fromCharCode(0xE9) + "e_FicheM" + String.fromCharCode(0xE9) + "tier";
                    break;
                case "1_fr1":
                    /* CsNo=10240 */
                    if (document.getElementsByClassName("infojob")[0] != null && document.getElementsByClassName("infojob")[0].innerHTML == "Candidature spontan" + String.fromCharCode(0xE9) + "e") {
                        tmp_flux = "Flux_Candidature_Spontan" + String.fromCharCode(0xE9) + "e_Global";
                    } else {
                        tmp_flux = "Flux_Candidature_Complet";
                    }
                    break;
                default:
                    tmp_flux = readCookie("sys_j_flux");
                    break;
            }
            if (tmp_flux == "") {
                tmp_flux = "Flux_Candidature_Inconnu";
            }
            createCookie("sys_j_flux", tmp_flux)
            return tmp_flux
        }

        /* Get Job Label + ID and store it in a cookie */
        tracking_job_label = document.getElementsByClassName("jobnamelink")[0] != null ? document.getElementsByClassName("jobnamelink")[0].innerHTML : "";
        tracking_step_title_prefix = document.getElementsByClassName("infojob")[0] != null ? document.getElementsByClassName("infojob")[0].innerHTML : "";

        if (tracking_pageName == "/ApplicationFlow") {
            if (tracking_titleClass != "" && tracking_titleClass.indexOf("Merci pour votre candidature") != -1) {
                tracking_pageName = "Taleo::" + readCookie("sys_j_flux") + "::Confirmation";
                tracking_jobTitle = readCookie("sys_j_title");
                tracking_jobID = readCookie("sys_j_id");
                tracking_eraseATCookieFlag = true;
                tracking_confirmPageFlag = true;
            } else {
                /* Get Job Detail */
                if (tracking_job_label) {
                    tracking_job_label_table = tracking_job_label.split("Num" + String.fromCharCode(0xE9) + "ro de l'emploi : ");
                    if (tracking_job_label_table.length == 2) {
                        tracking_jobTitle = tracking_job_label_table[0].substring(0, tracking_job_label_table[0].length - 1);
                        tracking_jobID = tracking_job_label_table[1].substring(0, tracking_job_label_table[1].length - 1)
                    } else {
                        tracking_jobTitle = 'Unable to retrieve job Title';
                        tracking_jobID = 'Unable to retrieve job ID';
                    }
                }

                /* Get Flux */
                tracking_flux = getFluxTaleo();

                /* Change Job Details depending on Flux */
                if (tracking_flux == "Flux_Candidature_Spontan" + String.fromCharCode(0xE9) + "e_Global") {
                    tracking_jobTitle = "Candidature Spontan" + String.fromCharCode(0xE9) + "e";
                    tracking_jobID = "Candidature Spontan" + String.fromCharCode(0xE9) + "e";
                } else if (tracking_flux == "Flux_Candidature_Spontan" + String.fromCharCode(0xE9) + "e_FicheM" + String.fromCharCode(0xE9) + "tier") {
                    tracking_jobTitle = "Candidature Spontan" + String.fromCharCode(0xE9) + "e : " + tracking_jobTitle;
                    tracking_jobID = "Candidature Spontan" + String.fromCharCode(0xE9) + "e : " + tracking_jobID;
                }

                /* Set Job Details Cookies */
                createCookie("sys_j_id", tracking_jobID);
                createCookie("sys_j_title", tracking_jobTitle);

                /* Get Step Number */
                if (tracking_step_number.indexOf(" sur ") != -1) {
                    tracking_step_number = tracking_step_number.split(" sur")[0];
                } else if (tracking_step_number.indexOf("/") != -1) {
                    tracking_step_number = tracking_step_number.split("/")[0];
                } else {
                    tracking_step_number = "";
                }

                /* Build Final Page Name */
                tracking_pageName = "Taleo::" + tracking_flux + "::" + (tracking_step_number == "" ? "" : tracking_step_number + "_") + tracking_step_title;
            }
        } else {
            tracking_pageName = "Taleo::" + getNewPageNameFR(tracking_pageName);
        }
        /*MAAH 20221019:  CONSENT TRUE*/
		if(getAnalyticsGDPRStatus()){
			/* Start of AT Internet Code */
              console.log('Tag AT-Internet:SendPage2ATInt');			                    
             SendPage2ATInt(environment,
               tracking_pageName,
			   {'D1':'FR',
			    'D6':(tracking_confirmPageFlag ? tracking_jobID : ''),
			    'D7':(tracking_confirmPageFlag ? tracking_jobTitle : ''),
			   },
               {'D1':tracking_jobID,
			    'D2':tracking_jobTitle}
			   );
            /* End of AT Internet Code */

			/* GA 360 custom code */
			(function(i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] || function() {
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * new Date();
				a = s.createElement(o), m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a, m)
			})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
                    console.log('Tag GA: FIRST');
                    /*
			ga('create', 'UA-7554485-1', 'auto', 'frtracker');
			ga('frtracker.set', 'anonymizeIp', true);
			ga('frtracker.set', 'dimension1', 'FR');
			ga('frtracker.set', 'dimension2', tracking_jobID);
			ga('frtracker.set', 'dimension3', tracking_jobTitle);
			ga('frtracker.send', 'pageview', '/' + tracking_pageName.replace(/::/g, "/"));
			*/
		}
		else /*MAAH 20221019 CNIL EXEMPT */
 		{
 		console.log('Tag AT-Internet:SendPageCNILEXEMPT2ATInt');
     		SendPageCNILEXEMPT2ATInt(environment,tracking_pageName); /*MAAH 20221019*/
		}
    } else {
        /* Get Job Label + ID and store it in a cookie */
        tracking_job_label = document.getElementsByClassName("metalink2")[0] != null ? document.getElementsByClassName("metalink2")[0].innerHTML : "";

        if (tracking_pageName == "/ApplicationFlow") {
            if (tracking_titleClass != "" && tracking_titleClass.match(/YOUR APPLICATION HAS BEEN SUCCESSFULLY SUBMITTED|Process completed|Candidature termin.e|Merci pour votre candidature/)) {
                tracking_pageName += "/Confirmation";
                tracking_jobTitle = readCookie("sys_j_title");
                tracking_jobID = readCookie("sys_j_id");
                tracking_step_number = "Last";
                tracking_step_title = "Successfull Application";
                tracking_eraseATCookieFlag = true;
                tracking_confirmPageFlag = true;
            } else {
                /* Get Job Detail */
                if (tracking_job_label) {
                    tracking_job_label_table1 = tracking_job_label.split(">");
                    if (tracking_job_label_table1.length >= 2) {
                        tracking_job_label = tracking_job_label_table1[1];
                        tracking_job_label_table2 = tracking_job_label.split("<");
                        if (tracking_job_label_table2.length >= 2) {
                            tracking_job_label = tracking_job_label_table2[0];
                            if (tracking_job_label.indexOf("Job Number: ") != -1)
                                tracking_job_label_table3 = tracking_job_label.split("Job Number: ");
                            else {
                                tracking_job_label_table3 = tracking_job_label.split("Num" + String.fromCharCode(0xE9) + "ro de l'emploi : ");
                            }
                            if (tracking_job_label_table3.length == 2) {
                                tracking_jobTitle = tracking_job_label_table3[0].substring(0, tracking_job_label_table3[0].length - 1);
                                tracking_jobID = tracking_job_label_table3[1].substring(0, tracking_job_label_table3[1].length - 1)
                            } else {
                                tracking_jobTitle = 'Unable to retrieve job Title';
                                tracking_jobID = 'Unable to retrieve job ID';
                            }
                        }
                    }
                } else {
                    tracking_jobTitle = 'Speculative Application';
                    tracking_jobID = 'Speculative Application';
                }

                /* Set Job Details Cookies */
                createCookie("sys_j_id", tracking_jobID);
                createCookie("sys_j_title", tracking_jobTitle);

                /* Get Step Number */
                if (tracking_step_number.indexOf(" out of ") != -1) {
                    tracking_step_number = tracking_step_number.split(" out of")[0];
                } else if (tracking_step_number.indexOf("/") != -1) {
                    tracking_step_number = tracking_step_number.split("/")[0];
                } else if (tracking_step_number.indexOf(" sur ") != -1) {
                    tracking_step_number = tracking_step_number.split(" sur")[0];
                } else if (tracking_step_title == "Privacy Agreement") {
                    tracking_step_number = "0";
                } else {
                    tracking_step_number = "";
                }

                /* Build Final Page Name */
                tracking_pageName += "/" + (tracking_step_number == "" ? "" : tracking_step_number + "_") + tracking_step_title;
            }
        }
        if (tmp_TrackingStatus == "UK_Global") 
		{
		   if (getAnalyticsGDPRStatus())
           {			   
            /* GA 360 custom code */
            var ga_accountID = 'UA-10749932-9';
            (function(i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
                                console.log('Tag GA: MEDIUM');
                                /*
            ga('create', ga_accountID, 'auto', 'uktracker', {allowLinker: true});
            ga('uktracker.set', 'anonymizeIp', true);
            ga('uktracker.set', 'dimension17', tracking_jobTitle);
            ga('uktracker.set', 'dimension18', tracking_jobID);
            ga('uktracker.set', 'dimension19', tracking_step_number);
            ga('uktracker.set', 'dimension20', tracking_step_title);
            ga('uktracker.send', 'pageview', '/Taleo' + tracking_pageName);
            */
            /* End of GA 360 custom code */
		   }
		   
        } else if ( tmp_TrackingStatus == "FR_Global") 
		{
	    	if (getAnalyticsGDPRStatus() )
		    {	
            if (tracking_pageName.indexOf("/ApplicationFlow") != -1) {
                tracking_pageName = "Taleo::Global" + tracking_pageName.replace(/\//g, "::").replace("ApplicationFlow", "Flux");
            } else {
                tracking_pageName = "Taleo::Global::" + getNewPageNameFR(tracking_pageName);
            }
            
			/* Start of AT Internet Code */
			console.log('Tag AT-Internet:SendPage2ATInt(2)');
             SendPage2ATInt(environment,
               tracking_pageName,
			   {'D1':'FR',
			    'D6':(tracking_confirmPageFlag ? tracking_jobID : ''),
			    'D7':(tracking_confirmPageFlag ? tracking_jobTitle : ''),
			   },
               {'D1':tracking_jobID,
			    'D2':tracking_jobTitle}
			   );
            /* End of AT Internet Code */

            /* GA 360 custom code */
            (function(i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

                    console.log('Tag GA: LAST');
             /*
            ga('create', 'UA-7554485-1', 'auto', 'frtracker');
            ga('frtracker.set', 'anonymizeIp', true);
            ga('frtracker.set', 'dimension1', 'FR');
            ga('frtracker.set', 'dimension2', tracking_jobID);
            ga('frtracker.set', 'dimension3', tracking_jobTitle);
            ga('frtracker.send', 'pageview', '/' + tracking_pageName.replace(/::/g, "/"));
		*/	
			}
    		else /*MAAH 20221019 CNIL EXEMPT */
 	     	{
                console.log('Tag AT-Internet:SendPageCNILEXEMPT2ATInt(2)');
     	    	SendPageCNILEXEMPT2ATInt(environment,tracking_pageName); /*MAAH 20221019*/
		 }

        }
    }
    if (tracking_eraseATCookieFlag) {
        eraseCookie("sys_j_title");
        eraseCookie("sys_j_id");
        eraseCookie("sys_j_flux");
        eraseCookie("sys_cSource");
    }
}
//-->
