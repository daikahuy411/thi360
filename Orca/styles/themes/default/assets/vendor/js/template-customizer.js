!(function (t, e) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var a = e();
        for (var n in a) ("object" == typeof exports ? exports : t)[n] = a[n];
    }
})(self, function () {
    return (function () {
        "use strict";
        var t = {
                7621: function (t, e, a) {
                    var n = a(8081),
                        i = a.n(n),
                        o = a(3645),
                        s = a.n(o),
                        l = a(1667),
                        r = a.n(l),
                        c = new URL(a(6468), a.b),
                        m = s()(i()),
                        u = r()(c);
                    m.push([
                        t.id,
                        '#template-customizer{font-family:"Open Sans",BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol" !important;font-size:inherit !important;position:fixed;top:0;right:0;height:100%;z-index:99999999;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;width:400px;background:#fff;-webkit-box-shadow:0 4px 18px 0 rgba(58,53,65,.14);box-shadow:0 4px 18px 0 rgba(58,53,65,.14);-webkit-transition:all .2s ease-in;-o-transition:all .2s ease-in;transition:all .2s ease-in;-webkit-transform:translateX(420px);-ms-transform:translateX(420px);transform:translateX(420px)}.dark-style #template-customizer{-webkit-box-shadow:0 4px 18px 0 rgba(19,17,32,.2);box-shadow:0 4px 18px 0 rgba(19,17,32,.2)}#template-customizer h5{position:relative;font-size:11px}#template-customizer>h5{flex:0 0 auto}#template-customizer .disabled{color:#d1d2d3 !important}#template-customizer .form-label{font-size:.9375rem}#template-customizer .form-check-label{font-size:.8125rem}#template-customizer .template-customizer-t-panel_header{font-size:1.125rem}#template-customizer.template-customizer-open{-webkit-transition-delay:.1s;-o-transition-delay:.1s;transition-delay:.1s;-webkit-transform:none !important;-ms-transform:none !important;transform:none !important}#template-customizer.template-customizer-open .custom-option.checked{color:var(--bs-primary);border-width:2px}#template-customizer.template-customizer-open .custom-option.checked .custom-option-content{border:none}#template-customizer.template-customizer-open .custom-option .custom-option-content{border:1px solid rgba(0,0,0,0)}#template-customizer .template-customizer-header a:hover{color:inherit !important}#template-customizer .template-customizer-open-btn{position:absolute;top:180px;left:0;z-index:-1;display:block;width:42px;height:42px;border-top-left-radius:15%;border-bottom-left-radius:15%;background:var(--bs-primary);color:#fff !important;text-align:center;font-size:18px !important;line-height:42px;opacity:1;-webkit-transition:all .1s linear .2s;-o-transition:all .1s linear .2s;transition:all .1s linear .2s;-webkit-transform:translateX(-62px);-ms-transform:translateX(-62px);transform:translateX(-62px)}@media(max-width: 991.98px){#template-customizer .template-customizer-open-btn{top:145px}}.dark-style #template-customizer .template-customizer-open-btn{background:var(--bs-primary)}#template-customizer .template-customizer-open-btn::before{content:"";width:22px;height:22px;display:block;background-size:100% 100%;position:absolute;background-image:url(' +
                            u +
                            ');margin:10px}.customizer-hide #template-customizer .template-customizer-open-btn{display:none}[dir=rtl] #template-customizer .template-customizer-open-btn{border-radius:0;border-top-right-radius:15%;border-bottom-right-radius:15%}[dir=rtl] #template-customizer .template-customizer-open-btn::before{margin-left:-2px}#template-customizer.template-customizer-open .template-customizer-open-btn{opacity:0;-webkit-transition-delay:0s;-o-transition-delay:0s;transition-delay:0s;-webkit-transform:none !important;-ms-transform:none !important;transform:none !important}#template-customizer .template-customizer-inner{position:relative;overflow:auto;-webkit-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto;opacity:1;-webkit-transition:opacity .2s;-o-transition:opacity .2s;transition:opacity .2s}#template-customizer .template-customizer-inner>div:first-child>hr:first-of-type{display:none !important}#template-customizer .template-customizer-inner>div:first-child>h5:first-of-type{padding-top:0 !important}#template-customizer .template-customizer-themes-inner{position:relative;opacity:1;-webkit-transition:opacity .2s;-o-transition:opacity .2s;transition:opacity .2s}#template-customizer .template-customizer-theme-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;align-items:center;-ms-flex-align:center;-webkit-box-flex:1;-ms-flex:1 1 100%;flex:1 1 100%;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:10px;padding:0 24px;width:100%;cursor:pointer}#template-customizer .template-customizer-theme-item input{position:absolute;z-index:-1;opacity:0}#template-customizer .template-customizer-theme-item input~span{opacity:.25;-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s}#template-customizer .template-customizer-theme-item .template-customizer-theme-checkmark{display:inline-block;width:6px;height:12px;border-right:1px solid;border-bottom:1px solid;opacity:0;-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}[dir=rtl] #template-customizer .template-customizer-theme-item .template-customizer-theme-checkmark{border-right:none;border-left:1px solid;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}#template-customizer .template-customizer-theme-item input:checked:not([disabled])~span,#template-customizer .template-customizer-theme-item:hover input:not([disabled])~span{opacity:1}#template-customizer .template-customizer-theme-item input:checked:not([disabled])~span .template-customizer-theme-checkmark{opacity:1}#template-customizer .template-customizer-theme-colors span{display:block;margin:0 1px;width:10px;height:10px;border-radius:50%;-webkit-box-shadow:0 0 0 1px rgba(0,0,0,.1) inset;box-shadow:0 0 0 1px rgba(0,0,0,.1) inset}#template-customizer.template-customizer-loading .template-customizer-inner,#template-customizer.template-customizer-loading-theme .template-customizer-themes-inner{opacity:.2}#template-customizer.template-customizer-loading .template-customizer-inner::after,#template-customizer.template-customizer-loading-theme .template-customizer-themes-inner::after{content:"";position:absolute;top:0;right:0;bottom:0;left:0;z-index:999;display:block}@media(max-width: 1200px){#template-customizer{display:none;visibility:hidden !important}}@media(max-width: 575.98px){#template-customizer{width:300px;-webkit-transform:translateX(320px);-ms-transform:translateX(320px);transform:translateX(320px)}}.layout-menu-100vh #template-customizer{height:100vh}[dir=rtl] #template-customizer{right:auto;left:0;-webkit-transform:translateX(-420px);-ms-transform:translateX(-420px);transform:translateX(-420px)}[dir=rtl] #template-customizer .template-customizer-open-btn{right:0;left:auto;-webkit-transform:translateX(62px);-ms-transform:translateX(62px);transform:translateX(62px)}[dir=rtl] #template-customizer .template-customizer-close-btn{right:auto;left:0}#template-customizer .template-customizer-layouts-options[disabled]{opacity:.5;pointer-events:none}[dir=rtl] .template-customizer-t-style_switch_light{padding-right:0 !important}',
                        "",
                    ]),
                        (e.Z = m);
                },
                3645: function (t) {
                    t.exports = function (t) {
                        var e = [];
                        return (
                            (e.toString = function () {
                                return this.map(function (e) {
                                    var a = "",
                                        n = void 0 !== e[5];
                                    return (
                                        e[4] && (a += "@supports (".concat(e[4], ") {")),
                                        e[2] && (a += "@media ".concat(e[2], " {")),
                                        n && (a += "@layer".concat(e[5].length > 0 ? " ".concat(e[5]) : "", " {")),
                                        (a += t(e)),
                                        n && (a += "}"),
                                        e[2] && (a += "}"),
                                        e[4] && (a += "}"),
                                        a
                                    );
                                }).join("");
                            }),
                            (e.i = function (t, a, n, i, o) {
                                "string" == typeof t && (t = [[null, t, void 0]]);
                                var s = {};
                                if (n)
                                    for (var l = 0; l < this.length; l++) {
                                        var r = this[l][0];
                                        null != r && (s[r] = !0);
                                    }
                                for (var c = 0; c < t.length; c++) {
                                    var m = [].concat(t[c]);
                                    (n && s[m[0]]) ||
                                        (void 0 !== o && (void 0 === m[5] || (m[1] = "@layer".concat(m[5].length > 0 ? " ".concat(m[5]) : "", " {").concat(m[1], "}")), (m[5] = o)),
                                        a && (m[2] ? ((m[1] = "@media ".concat(m[2], " {").concat(m[1], "}")), (m[2] = a)) : (m[2] = a)),
                                        i && (m[4] ? ((m[1] = "@supports (".concat(m[4], ") {").concat(m[1], "}")), (m[4] = i)) : (m[4] = "".concat(i))),
                                        e.push(m));
                                }
                            }),
                            e
                        );
                    };
                },
                1667: function (t) {
                    t.exports = function (t, e) {
                        return (
                            e || (e = {}),
                            t
                                ? ((t = String(t.__esModule ? t.default : t)),
                                  /^['"].*['"]$/.test(t) && (t = t.slice(1, -1)),
                                  e.hash && (t += e.hash),
                                  /["'() \t\n]|(%20)/.test(t) || e.needQuotes ? '"'.concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : t)
                                : t
                        );
                    };
                },
                8081: function (t) {
                    t.exports = function (t) {
                        return t[1];
                    };
                },
                3379: function (t) {
                    var e = [];
                    function a(t) {
                        for (var a = -1, n = 0; n < e.length; n++)
                            if (e[n].identifier === t) {
                                a = n;
                                break;
                            }
                        return a;
                    }
                    function n(t, n) {
                        for (var o = {}, s = [], l = 0; l < t.length; l++) {
                            var r = t[l],
                                c = n.base ? r[0] + n.base : r[0],
                                m = o[c] || 0,
                                u = "".concat(c, " ").concat(m);
                            o[c] = m + 1;
                            var d = a(u),
                                p = { css: r[1], media: r[2], sourceMap: r[3], supports: r[4], layer: r[5] };
                            if (-1 !== d) e[d].references++, e[d].updater(p);
                            else {
                                var h = i(p, n);
                                (n.byIndex = l), e.splice(l, 0, { identifier: u, updater: h, references: 1 });
                            }
                            s.push(u);
                        }
                        return s;
                    }
                    function i(t, e) {
                        var a = e.domAPI(e);
                        return (
                            a.update(t),
                            function (e) {
                                if (e) {
                                    if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap && e.supports === t.supports && e.layer === t.layer) return;
                                    a.update((t = e));
                                } else a.remove();
                            }
                        );
                    }
                    t.exports = function (t, i) {
                        var o = n((t = t || []), (i = i || {}));
                        return function (t) {
                            t = t || [];
                            for (var s = 0; s < o.length; s++) {
                                var l = a(o[s]);
                                e[l].references--;
                            }
                            for (var r = n(t, i), c = 0; c < o.length; c++) {
                                var m = a(o[c]);
                                0 === e[m].references && (e[m].updater(), e.splice(m, 1));
                            }
                            o = r;
                        };
                    };
                },
                569: function (t) {
                    var e = {};
                    t.exports = function (t, a) {
                        var n = (function (t) {
                            if (void 0 === e[t]) {
                                var a = document.querySelector(t);
                                if (window.HTMLIFrameElement && a instanceof window.HTMLIFrameElement)
                                    try {
                                        a = a.contentDocument.head;
                                    } catch (t) {
                                        a = null;
                                    }
                                e[t] = a;
                            }
                            return e[t];
                        })(t);
                        if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                        n.appendChild(a);
                    };
                },
                9216: function (t) {
                    t.exports = function (t) {
                        var e = document.createElement("style");
                        return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
                    };
                },
                3565: function (t, e, a) {
                    t.exports = function (t) {
                        var e = a.nc;
                        e && t.setAttribute("nonce", e);
                    };
                },
                7795: function (t) {
                    t.exports = function (t) {
                        if ("undefined" == typeof document) return { update: function () {}, remove: function () {} };
                        var e = t.insertStyleElement(t);
                        return {
                            update: function (a) {
                                !(function (t, e, a) {
                                    var n = "";
                                    a.supports && (n += "@supports (".concat(a.supports, ") {")), a.media && (n += "@media ".concat(a.media, " {"));
                                    var i = void 0 !== a.layer;
                                    i && (n += "@layer".concat(a.layer.length > 0 ? " ".concat(a.layer) : "", " {")), (n += a.css), i && (n += "}"), a.media && (n += "}"), a.supports && (n += "}");
                                    var o = a.sourceMap;
                                    o && "undefined" != typeof btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */")), e.styleTagTransform(n, t, e.options);
                                })(e, t, a);
                            },
                            remove: function () {
                                !(function (t) {
                                    if (null === t.parentNode) return !1;
                                    t.parentNode.removeChild(t);
                                })(e);
                            },
                        };
                    };
                },
                4589: function (t) {
                    t.exports = function (t, e) {
                        if (e.styleSheet) e.styleSheet.cssText = t;
                        else {
                            for (; e.firstChild; ) e.removeChild(e.firstChild);
                            e.appendChild(document.createTextNode(t));
                        }
                    };
                },
                6468: function (t) {
                    t.exports =
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABClJREFUaEPtmY1RFEEQhbsjUCIQIhAiUCNQIxAiECIQIxAiECIAIpAMhAiECIQI2vquZqnZvp6fhb3SK5mqq6Ju92b69bzXf6is+dI1t1+eAfztG5z1BsxsU0S+ici2iPB3vm5E5EpEDlSVv2dZswFIxv8UkZcNy+5EZGcuEHMCOBeR951uvVDVD53vVl+bE8DvDu8Pxtyo6ta/BsByg1R15Bwzqz5/LJgn34CZwfnPInI4BUB6/1hV0cSjVxcAM4PbcBZjL0XklIPN7Is3fLCkdQPpPYw/VNXj5IhPIvJWRIhSl6p60ULWBGBm30Vk123EwRxCuIzWkkjNrCZywith10ewE1Xdq4GoAjCz/RTXW44Ynt+LyBEfT43kYfbj86J3w5Q32DNcRQDpwF+dkQXDMey8xem0L3TEqB4g3PZWad8agBMRgZPeu96D1/C2Zbh3X0p80Op1xxloztN48bMQQNoc7+eLEuAoPSPiIDY4Ooo+E6ixeNXM+D3GERz2U3CIqMstLJUgJQDe+7eq6mub0NYEkLAKwEHkiBQDCZtddZCZ8d6r7JDwFkoARklHRPZUFVDVZWbwGuNrC4EfdOzFrRABh3Wnqhv+d70AEBLGFROPmeHlnM81G69UdSd6IUuM0GgUVn1uqWmg5EmMfBeEyB7Pe3txBkY+rGT8j0J+WXq/BgDkUCaqLgEAnwcRog0veMIqFAAwCy2wnw+bI2GaGboBgF9k5N0o0rUSGUb4eO0BeO9j/GYhkSHMHMTIqwGARX6p6a+nlPBl8kZuXMD9j6pKfF9aZuaFOdJCEL5D4eYb9wCYVCanrBmGyii/tIq+SLj/HQBCaM5bLzwfPqdQ6FpVHyra4IbuVbXaY7dETC2ESPNNWiIOi69CcdgSMXsh4tNSUiklMgwmC0aNd08Y5WAES6HHehM4gu97wyhBgWpgqXsrASglprDy7CwhehMZOSbK6JMSma+Fio1KltCmlBIj7gfZOGx8ppQSXrhzFnOhJ/31BDkjFHRvOd09x0mRBA9SFgxUgHpQg0q0t5ymPMlL+EnldFTfDA0NAmf+OTQ0X0sRouf7NNkYGhrOYNrxtIaGg83MNzVDSe3LXLhP7O/yrCsCz1zlWTpjWkuZAOBpX3yVnLqI1yLCOKU6qMrmP7SSrUEw54XF4WBIK5FxCMOr3lVsfGqNSmPzBXUnJTIX1jyVBq9wO6UObOpgC5GjO98vFKnTdQMZXxEsWZlDiCZMIxAbNxQOqlpVZtobejBaZNoBnRDzMFpkxvTQOD36BlrcySZuI6p1ACB6LU3wWuf5581+oHfD1vi89bz3nFUC8Nm7ZlP3nKkFbM4bWPt/MSFwklprYItwt6cmvpWJ2IVcQBCz6bLysSCv3SaANCiTsnaNRrNRqMXVVT1/BrAqz/buu/Y38Ad3KC5PARej0QAAAABJRU5ErkJggg==";
                },
            },
            e = {};
        function a(n) {
            var i = e[n];
            if (void 0 !== i) return i.exports;
            var o = (e[n] = { id: n, exports: {} });
            return t[n](o, o.exports, a), o.exports;
        }
        (a.m = t),
            (a.n = function (t) {
                var e =
                    t && t.__esModule
                        ? function () {
                              return t.default;
                          }
                        : function () {
                              return t;
                          };
                return a.d(e, { a: e }), e;
            }),
            (a.d = function (t, e) {
                for (var n in e) a.o(e, n) && !a.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
            }),
            (a.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (a.r = function (t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
            }),
            (a.b = document.baseURI || self.location.href),
            (a.nc = void 0);
        var n = {};
        return (
            (function () {
                a.r(n),
                    a.d(n, {
                        TemplateCustomizer: function () {
                            return O;
                        },
                    });
                var t = a(3379),
                    e = a.n(t),
                    i = a(7795),
                    o = a.n(i),
                    s = a(569),
                    l = a.n(s),
                    r = a(3565),
                    c = a.n(r),
                    m = a(9216),
                    u = a.n(m),
                    d = a(4589),
                    p = a.n(d),
                    h = a(7621),
                    y = {};
                function f(t) {
                    return (
                        (f =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function (t) {
                                      return typeof t;
                                  }
                                : function (t) {
                                      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                                  }),
                        f(t)
                    );
                }
                function v(t, e) {
                    for (var a = 0; a < e.length; a++) {
                        var n = e[a];
                        (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, b(n.key), n);
                    }
                }
                function b(t) {
                    var e = (function (t, e) {
                        if ("object" !== f(t) || null === t) return t;
                        var a = t[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var n = a.call(t, "string");
                            if ("object" !== f(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return String(t);
                    })(t);
                    return "symbol" === f(e) ? e : String(e);
                }
                (y.styleTagTransform = p()), (y.setAttributes = c()), (y.insert = l().bind(null, "head")), (y.domAPI = o()), (y.insertStyleElement = u()), e()(h.Z, y), h.Z && h.Z.locals && h.Z.locals;
                var g,
                    _ = ["rtl", "style", "headerType", "contentLayout", "layoutCollapsed", "showDropdownOnHover", "layoutNavbarOptions", "layoutFooterFixed", "themes"],
                    x = ["light", "dark", "system"],
                    S = ["sticky", "static", "hidden"],
                    z = document.documentElement.classList;
                g = z.contains("layout-navbar-fixed") ? "sticky" : z.contains("layout-navbar-hidden") ? "hidden" : "static";
                var w = document.getElementsByTagName("HTML")[0].getAttribute("data-theme") || 0,
                    k = z.contains("dark-style") ? "dark" : "light",
                    C = "rtl" === document.documentElement.getAttribute("dir"),
                    T = !!z.contains("layout-menu-collapsed"),
                    N = g,
                    L = z.contains("layout-wide") ? "wide" : "compact",
                    E = !!z.contains("layout-footer-fixed"),
                    A = z.contains("layout-menu-offcanvas") ? "static-offcanvas" : z.contains("layout-menu-fixed") ? "fixed" : z.contains("layout-menu-fixed-offcanvas") ? "fixed-offcanvas" : "static",
                    O = (function () {
                        function t(e) {
                            var a = e.cssPath,
                                n = e.themesPath,
                                i = e.cssFilenamePattern,
                                o = e.displayCustomizer,
                                s = e.controls,
                                l = e.defaultTextDir,
                                r = e.defaultHeaderType,
                                c = e.defaultContentLayout,
                                m = e.defaultMenuCollapsed,
                                u = e.defaultShowDropdownOnHover,
                                d = e.defaultNavbarType,
                                p = e.defaultFooterFixed,
                                h = e.styles,
                                y = e.navbarOptions,
                                f = e.defaultStyle,
                                v = e.availableContentLayouts,
                                b = e.availableDirections,
                                g = e.availableStyles,
                                z = e.availableThemes,
                                O = e.availableLayouts,
                                R = e.availableHeaderTypes,
                                F = e.availableNavbarOptions,
                                I = e.defaultTheme,
                                D = e.pathResolver,
                                P = e.onSettingsChange,
                                q = e.lang;
                            if (
                                ((function (t, e) {
                                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                                })(this, t),
                                !this._ssr)
                            ) {
                                if (!window.Helpers) throw new Error("window.Helpers required.");
                                if (
                                    ((this.settings = {}),
                                    (this.settings.cssPath = a),
                                    (this.settings.themesPath = n),
                                    (this.settings.cssFilenamePattern = i || "%name%.css"),
                                    (this.settings.displayCustomizer = void 0 === o || o),
                                    (this.settings.controls = s || _),
                                    (this.settings.defaultTextDir = "rtl" === l || C),
                                    (this.settings.defaultHeaderType = r || A),
                                    (this.settings.defaultMenuCollapsed = void 0 !== m ? m : T),
                                    (this.settings.defaultContentLayout = void 0 !== c ? c : L),
                                    (this.settings.defaultShowDropdownOnHover = void 0 === u || u),
                                    (this.settings.defaultNavbarType = void 0 !== d ? d : N),
                                    (this.settings.defaultFooterFixed = void 0 !== p ? p : E),
                                    (this.settings.availableDirections = b || t.DIRECTIONS),
                                    (this.settings.availableStyles = g || t.STYLES),
                                    (this.settings.availableThemes = z || t.THEMES),
                                    (this.settings.availableHeaderTypes = R || t.HEADER_TYPES),
                                    (this.settings.availableContentLayouts = v || t.CONTENT),
                                    (this.settings.availableLayouts = O || t.LAYOUTS),
                                    (this.settings.availableNavbarOptions = F || t.NAVBAR_OPTIONS),
                                    (this.settings.defaultTheme = this._getDefaultTheme(void 0 !== I ? I : w)),
                                    (this.settings.styles = h || x),
                                    (this.settings.navbarOptions = y || S),
                                    (this.settings.defaultStyle = f || k),
                                    (this.settings.lang = q || "en"),
                                    (this.pathResolver =
                                        D ||
                                        function (t) {
                                            return t;
                                        }),
                                    this.settings.styles.length < 2)
                                ) {
                                    var H = this.settings.controls.indexOf("style");
                                    -1 !== H && (this.settings.controls = this.settings.controls.slice(0, H).concat(this.settings.controls.slice(H + 1)));
                                }
                                (this.settings.onSettingsChange = "function" == typeof P ? P : function () {}),
                                    this._loadSettings(),
                                    (this._listeners = []),
                                    (this._controls = {}),
                                    this._initDirection(),
                                    this._initStyle(),
                                    this._initTheme(),
                                    this.setLayoutType(this.settings.headerType, !1),
                                    this.setContentLayout(this.settings.contentLayout, !1),
                                    this.setDropdownOnHover(this.settings.showDropdownOnHover, !1),
                                    this.setLayoutNavbarOption(this.settings.layoutNavbarOptions, !1),
                                    this.setLayoutFooterFixed(this.settings.layoutFooterFixed, !1),
                                    this._setup();
                            }
                        }
                        var e, a;
                        return (
                            (e = t),
                            (a = [
                                {
                                    key: "setRtl",
                                    value: function (t) {
                                        this._hasControls("rtl") && (this._setSetting("Rtl", String(t)), window.location.reload());
                                    },
                                },
                                {
                                    key: "setContentLayout",
                                    value: function (t) {
                                        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                                        this._hasControls("contentLayout") &&
                                            ((this.settings.contentLayout = t), e && this._setSetting("contentLayout", t), window.Helpers.setContentLayout(t), e && this.settings.onSettingsChange.call(this, this.settings));
                                    },
                                },
                                {
                                    key: "setStyle",
                                    value: function (t) {
                                        this._setSetting("Style", t), window.location.reload();
                                    },
                                },
                                {
                                    key: "setTheme",
                                    value: function (t) {
                                        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                                            a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                                        if (this._hasControls("themes")) {
                                            var n = this._getThemeByName(t);
                                            if (n) {
                                                (this.settings.theme = n), e && this._setSetting("Theme", t);
                                                var i,
                                                    o,
                                                    s,
                                                    l = this.pathResolver(this.settings.themesPath + this.settings.cssFilenamePattern.replace("%name%", t + ("light" !== this.settings.style ? "-".concat(this.settings.style) : "")));
                                                this._loadStylesheets(
                                                    ((i = {}),
                                                    (o = l),
                                                    (s = document.querySelector(".template-customizer-theme-css")),
                                                    (o = b(o)) in i ? Object.defineProperty(i, o, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : (i[o] = s),
                                                    i),
                                                    a || function () {}
                                                ),
                                                    e && this.settings.onSettingsChange.call(this, this.settings);
                                            }
                                        }
                                    },
                                },
                                {
                                    key: "setLayoutType",
                                    value: function (t) {
                                        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                                        if (this._hasControls("headerType") && ("static" === t || "static-offcanvas" === t || "fixed" === t || "fixed-offcanvas" === t)) {
                                            (this.settings.headerType = t),
                                                e && this._setSetting("LayoutType", t),
                                                window.Helpers.setPosition("fixed" === t || "fixed-offcanvas" === t, "static-offcanvas" === t || "fixed-offcanvas" === t),
                                                e && this.settings.onSettingsChange.call(this, this.settings);
                                            var a = window.Helpers.menuPsScroll,
                                                n = window.PerfectScrollbar;
                                            "fixed" === this.settings.headerType || "fixed-offcanvas" === this.settings.headerType
                                                ? n && a && (window.Helpers.menuPsScroll.destroy(), (a = new n(document.querySelector(".menu-inner"), { suppressScrollX: !0, wheelPropagation: !1 })), (window.Helpers.menuPsScroll = a))
                                                : a && window.Helpers.menuPsScroll.destroy();
                                        }
                                    },
                                },
                                {
                                    key: "setDropdownOnHover",
                                    value: function (t) {
                                        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                                        if (this._hasControls("showDropdownOnHover")) {
                                            if (((this.settings.showDropdownOnHover = t), e && this._setSetting("ShowDropdownOnHover", t), window.Helpers.mainMenu)) {
                                                window.Helpers.mainMenu.destroy(), (config.showDropdownOnHover = t);
                                                var a = window.Menu;
                                                window.Helpers.mainMenu = new a(document.getElementById("layout-menu"), { orientation: "horizontal", closeChildren: !0, showDropdownOnHover: config.showDropdownOnHover });
                                            }
                                            e && this.settings.onSettingsChange.call(this, this.settings);
                                        }
                                    },
                                },
                                {
                                    key: "setLayoutNavbarOption",
                                    value: function (t) {
                                        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                                        this._hasControls("layoutNavbarOptions") &&
                                            ((this.settings.layoutNavbarOptions = t), e && this._setSetting("FixedNavbarOption", t), window.Helpers.setNavbar(t), e && this.settings.onSettingsChange.call(this, this.settings));
                                    },
                                },
                                {
                                    key: "setLayoutFooterFixed",
                                    value: function (t) {
                                        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                                        (this.settings.layoutFooterFixed = t), e && this._setSetting("FixedFooter", t), window.Helpers.setFooterFixed(t), e && this.settings.onSettingsChange.call(this, this.settings);
                                    },
                                },
                                {
                                    key: "setLang",
                                    value: function (e) {
                                        var a = this,
                                            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                                        if (e !== this.settings.lang || n) {
                                            if (!t.LANGUAGES[e]) throw new Error('Language "'.concat(e, '" not found!'));
                                            var i = t.LANGUAGES[e];
                                            [
                                                "panel_header",
                                                "panel_sub_header",
                                                "theming_header",
                                                "style_label",
                                                "style_switch_light",
                                                "style_switch_dark",
                                                "layout_header",
                                                "layout_label",
                                                "layout_header_label",
                                                "content_label",
                                                "layout_static",
                                                "layout_offcanvas",
                                                "layout_fixed",
                                                "layout_fixed_offcanvas",
                                                "layout_dd_open_label",
                                                "layout_navbar_label",
                                                "layout_footer_label",
                                                "misc_header",
                                                "theme_label",
                                                "direction_label",
                                            ].forEach(function (t) {
                                                var e = a.container.querySelector(".template-customizer-t-".concat(t));
                                                e && (e.textContent = i[t]);
                                            });
                                            for (var o = i.themes || {}, s = this.container.querySelectorAll(".template-customizer-theme-item") || [], l = 0, r = s.length; l < r; l++) {
                                                var c = s[l].querySelector('input[type="radio"]').value;
                                                s[l].querySelector(".template-customizer-theme-name").textContent = o[c] || this._getThemeByName(c).title;
                                            }
                                            this.settings.lang = e;
                                        }
                                    },
                                },
                                {
                                    key: "update",
                                    value: function () {
                                        if (!this._ssr) {
                                            var t = !!document.querySelector(".layout-navbar"),
                                                e = !!document.querySelector(".layout-menu"),
                                                a = !!document.querySelector(".layout-menu-horizontal.menu, .layout-menu-horizontal .menu"),
                                                n = (document.querySelector(".layout-wrapper.layout-navbar-full"), !!document.querySelector(".content-footer"));
                                            this._controls.showDropdownOnHover &&
                                                (e
                                                    ? (this._controls.showDropdownOnHover.setAttribute("disabled", "disabled"), this._controls.showDropdownOnHover.classList.add("disabled"))
                                                    : (this._controls.showDropdownOnHover.removeAttribute("disabled"), this._controls.showDropdownOnHover.classList.remove("disabled"))),
                                                this._controls.layoutNavbarOptions &&
                                                    (t
                                                        ? (this._controls.layoutNavbarOptions.removeAttribute("disabled"), this._controls.layoutNavbarOptionsW.classList.remove("disabled"))
                                                        : (this._controls.layoutNavbarOptions.setAttribute("disabled", "disabled"), this._controls.layoutNavbarOptionsW.classList.add("disabled")),
                                                    a && t && "fixed" === this.settings.headerType && (this._controls.layoutNavbarOptions.setAttribute("disabled", "disabled"), this._controls.layoutNavbarOptionsW.classList.add("disabled"))),
                                                this._controls.layoutFooterFixed &&
                                                    (n
                                                        ? (this._controls.layoutFooterFixed.removeAttribute("disabled"), this._controls.layoutFooterFixedW.classList.remove("disabled"))
                                                        : (this._controls.layoutFooterFixed.setAttribute("disabled", "disabled"), this._controls.layoutFooterFixedW.classList.add("disabled"))),
                                                this._controls.headerType && (e || a ? this._controls.headerType.removeAttribute("disabled") : this._controls.headerType.setAttribute("disabled", "disabled"));
                                        }
                                    },
                                },
                                {
                                    key: "clearLocalStorage",
                                    value: function () {
                                        if (!this._ssr) {
                                            var t = this._getLayoutName();
                                            ["Theme", "Style", "LayoutCollapsed", "FixedNavbarOption", "LayoutType", "contentLayout", "Rtl"].forEach(function (e) {
                                                var a = "templateCustomizer-".concat(t, "--").concat(e);
                                                localStorage.removeItem(a);
                                            }),
                                                this._showResetBtnNotification(!1);
                                        }
                                    },
                                },
                                {
                                    key: "destroy",
                                    value: function () {
                                        this._ssr || (this._cleanup(), (this.settings = null), this.container.parentNode.removeChild(this.container), (this.container = null));
                                    },
                                },
                                {
                                    key: "_loadSettings",
                                    value: function () {
                                        var t,
                                            e,
                                            a = this._getSetting("Rtl"),
                                            n = this._getSetting("Style"),
                                            i = this._getSetting("Theme"),
                                            o = this._getSetting("contentLayout"),
                                            s = this._getSetting("LayoutCollapsed"),
                                            l = this._getSetting("ShowDropdownOnHover"),
                                            r = this._getSetting("FixedNavbarOption"),
                                            c = this._getSetting("FixedFooter"),
                                            m = this._getSetting("LayoutType");
                                        "" !== a || "" !== n || "" !== i || "" !== o || "" !== s || "" !== r || "" !== m ? this._showResetBtnNotification(!0) : this._showResetBtnNotification(!1),
                                            (t = "" !== m && -1 !== ["static", "static-offcanvas", "fixed", "fixed-offcanvas"].indexOf(m) ? m : this.settings.defaultHeaderType),
                                            (this.settings.headerType = t),
                                            (this.settings.rtl = "" !== a ? "true" === a : this.settings.defaultTextDir),
                                            (this.settings.stylesOpt = -1 !== this.settings.styles.indexOf(n) ? n : this.settings.defaultStyle),
                                            "system" === this.settings.stylesOpt
                                                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                                                    ? ((this.settings.style = "dark"), (document.cookie = "style=dark"))
                                                    : ((this.settings.style = "light"), (document.cookie = "style=light"))
                                                : ((document.cookie = "style=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;"), (this.settings.style = -1 !== this.settings.styles.indexOf(n) ? n : this.settings.defaultStyle)),
                                            -1 === this.settings.styles.indexOf(this.settings.style) && (this.settings.style = this.settings.styles[0]),
                                            (this.settings.contentLayout = "" !== o ? o : this.settings.defaultContentLayout),
                                            (this.settings.layoutCollapsed = "" !== s ? "true" === s : this.settings.defaultMenuCollapsed),
                                            (this.settings.showDropdownOnHover = "" !== l ? "true" === l : this.settings.defaultShowDropdownOnHover),
                                            (e = "" !== r && -1 !== ["static", "sticky", "hidden"].indexOf(r) ? r : this.settings.defaultNavbarType),
                                            (this.settings.layoutNavbarOptions = e),
                                            (this.settings.layoutFooterFixed = "" !== c ? "true" === c : this.settings.defaultFooterFixed),
                                            (this.settings.theme = this._getThemeByName(this._getSetting("Theme"), !0)),
                                            this._hasControls("rtl") || (this.settings.rtl = "rtl" === document.documentElement.getAttribute("dir")),
                                            this._hasControls("style") || (this.settings.style = z.contains("dark-style") ? "dark" : "light"),
                                            this._hasControls("contentLayout") || (this.settings.contentLayout = null),
                                            this._hasControls("headerType") || (this.settings.headerType = null),
                                            this._hasControls("layoutCollapsed") || (this.settings.layoutCollapsed = null),
                                            this._hasControls("layoutNavbarOptions") || (this.settings.layoutNavbarOptions = null),
                                            this._hasControls("themes") || (this.settings.theme = null);
                                    },
                                },
                                {
                                    key: "_setup",
                                    value: function () {
                                        var t = this,
                                            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document;
                                        this._cleanup(),
                                            (this.container = this._getElementFromString(
                                                '<div id="template-customizer" class="invert-bg-white"> <a href="javascript:void(0)" class="template-customizer-open-btn" tabindex="-1"></a> <div class="p-4 m-0 lh-1 border-bottom template-customizer-header position-relative py-3"> <h4 class="template-customizer-t-panel_header mb-2"></h4> <p class="template-customizer-t-panel_sub_header mb-0"></p> <div class="d-flex align-items-center gap-2 position-absolute end-0 top-0 mt-4 me-3"> <a href="javascript:void(0)" class="template-customizer-reset-btn text-body" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Reset Customizer"><i class="mdi mdi-cached mdi-20px"></i><span class="badge rounded-pill bg-danger badge-dot badge-notifications d-none"></span></a> <a href="javascript:void(0)" class="template-customizer-close-btn fw-light text-body" tabindex="-1"> <i class="mdi mdi-close mdi-20px"></i> </a> </div> </div> <div class="template-customizer-inner pt-4"> <div class="template-customizer-theming"> <h5 class="m-0 px-4 py-4 lh-1 d-block"> <span class="template-customizer-t-theming_header bg-label-primary rounded-1 py-1 px-2 fs-big"></span> </h5> <div class="m-0 px-4 pb-3 pt-1 template-customizer-style w-100"> <label for="customizerStyle" class="form-label d-block template-customizer-t-style_label"></label> <div class="row px-1 template-customizer-styles-options"></div> </div> <div class="m-0 px-4 pt-3 template-customizer-themes w-100"> <label for="customizerTheme" class="form-label template-customizer-t-theme_label"></label> <div class="row px-1 template-customizer-themes-options"></div> </div> </div> <div class="template-customizer-layout"> <hr class="m-0 px-4 my-4"/> <h5 class="m-0 px-4 pb-4 pt-2 d-block"> <span class="template-customizer-t-layout_header bg-label-primary rounded-1 py-1 px-2 fs-big"></span> </h5> <div class="m-0 px-4 pb-3 d-block template-customizer-layouts"> <label for="customizerStyle" class="form-label d-block template-customizer-t-layout_label"></label> <div class="row px-1 template-customizer-layouts-options"> </div> </div> <div class="m-0 px-4 pb-3 template-customizer-headerOptions w-100"> <label for="customizerHeader" class="form-label template-customizer-t-layout_header_label"></label> <div class="row px-1 template-customizer-header-options"></div> </div> <div class="m-0 px-4 pb-3 template-customizer-layoutNavbarOptions w-100"> <label for="customizerNavbar" class="form-label template-customizer-t-layout_navbar_label"></label> <div class="row px-1 template-customizer-navbar-options"></div> </div> <div class="m-0 px-4 pb-3 template-customizer-content w-100"> <label for="customizerContent" class="form-label template-customizer-t-content_label"></label> <div class="row px-1 template-customizer-content-options"></div> </div> <div class="m-0 px-4 pb-3 template-customizer-directions w-100"> <label for="customizerDirection" class="form-label template-customizer-t-direction_label"></label> <div class="row px-1 template-customizer-directions-options"></div> </div> </div> </div> </div> '
                                            ));
                                        var a = this.container;
                                        this.settings.displayCustomizer ? a.setAttribute("style", "visibility: visible") : a.setAttribute("style", "visibility: hidden");
                                        var n = this.container.querySelector(".template-customizer-open-btn"),
                                            i = function () {
                                                t.container.classList.add("template-customizer-open"),
                                                    t.update(),
                                                    t._updateInterval && clearInterval(t._updateInterval),
                                                    (t._updateInterval = setInterval(function () {
                                                        t.update();
                                                    }, 500));
                                            };
                                        n.addEventListener("click", i), this._listeners.push([n, "click", i]);
                                        var o = this.container.querySelector(".template-customizer-reset-btn"),
                                            s = function () {
                                                t.clearLocalStorage(), window.location.reload();
                                            };
                                        o.addEventListener("click", s), this._listeners.push([o, "click", s]);
                                        var l = this.container.querySelector(".template-customizer-close-btn"),
                                            r = function () {
                                                t.container.classList.remove("template-customizer-open"), t._updateInterval && (clearInterval(t._updateInterval), (t._updateInterval = null));
                                            };
                                        l.addEventListener("click", r), this._listeners.push([l, "click", r]);
                                        var c = this.container.querySelector(".template-customizer-style");
                                        if (this._hasControls("style")) {
                                            var m = c.querySelector(".template-customizer-styles-options");
                                            this.settings.availableStyles.forEach(function (e) {
                                                var a = t._getElementFromString(
                                                    '<div class="col-4 px-2">\n            <div class="form-check custom-option custom-option-icon">\n              <label class="form-check-label custom-option-content p-0" for="styleRadio'
                                                        .concat(e.name, '">\n                <span class="custom-option-body mb-0">\n                  <img src="')
                                                        .concat(assetsPath, "img/customizer/")
                                                        .concat(e.name)
                                                        .concat(
                                                            z.contains("dark-style") ? "-dark" : "",
                                                            '.svg" alt="Style" class="img-fluid scaleX-n1-rtl" />\n                </span>\n                <input\n                  name="customRadioIcon"\n                  class="form-check-input d-none"\n                  type="radio"\n                  value="'
                                                        )
                                                        .concat(e.name, '"\n                  id="styleRadio')
                                                        .concat(e.name, '" />\n              </label>\n            </div>\n            <label class="form-check-label small" for="themeRadios')
                                                        .concat(e.name, '">')
                                                        .concat(e.title, "</label>\n          </div>")
                                                );
                                                m.appendChild(a);
                                            }),
                                                m.querySelector('input[value="'.concat(this.settings.stylesOpt, '"]')).setAttribute("checked", "checked");
                                            var u = function (e) {
                                                t._loadingState(!0),
                                                    t.setStyle(e.target.value, !0, function () {
                                                        t._loadingState(!1);
                                                    });
                                            };
                                            m.addEventListener("change", u), this._listeners.push([m, "change", u]);
                                        } else c.parentNode.removeChild(c);
                                        var d = this.container.querySelector(".template-customizer-themes");
                                        if (this._hasControls("themes")) {
                                            var p = d.querySelector(".template-customizer-themes-options");
                                            this.settings.availableThemes.forEach(function (e) {
                                                var a;
                                                a = "theme-semi-dark" === e.name ? "semi-dark" : "theme-bordered" === e.name ? "border" : "default";
                                                var n = t._getElementFromString(
                                                    '<div class="col-4 px-2">\n          <div class="form-check custom-option custom-option-icon">\n            <label class="form-check-label custom-option-content p-0" for="themeRadios'
                                                        .concat(e.name, '">\n              <span class="custom-option-body mb-0">\n                <img src="')
                                                        .concat(assetsPath, "img/customizer/")
                                                        .concat(a)
                                                        .concat(
                                                            z.contains("dark-style") ? "-dark" : "",
                                                            '.svg" alt="Themes" class="img-fluid scaleX-n1-rtl" />\n              </span>\n              <input\n                class="form-check-input d-none"\n                type="radio"\n                name="themeRadios"\n                id="themeRadios'
                                                        )
                                                        .concat(e.name, '"\n                value="')
                                                        .concat(e.name, '" />\n            </label>\n            </div>\n            <label class="form-check-label small" for="themeRadios')
                                                        .concat(e.name, '">')
                                                        .concat(e.title, "</label>\n        </div>")
                                                );
                                                p.appendChild(n);
                                            }),
                                                p.querySelector('input[value="'.concat(this.settings.theme.name, '"]')).setAttribute("checked", "checked");
                                            var h = function (e) {
                                                (t._loading = !0),
                                                    t._loadingState(!0, !0),
                                                    t.setTheme(e.target.value, !0, function () {
                                                        (t._loading = !1), t._loadingState(!1, !0);
                                                    });
                                            };
                                            p.addEventListener("change", h), this._listeners.push([p, "change", h]);
                                        } else d.parentNode.removeChild(d);
                                        var y = this.container.querySelector(".template-customizer-theming");
                                        this._hasControls("style") || this._hasControls("themes") || y.parentNode.removeChild(y);
                                        var f = this.container.querySelector(".template-customizer-layout");
                                        if (this._hasControls("rtl headerType contentLayout layoutCollapsed layoutNavbarOptions", !0)) {
                                            var v = this.container.querySelector(".template-customizer-directions");
                                            if (this._hasControls("rtl") && rtlSupport) {
                                                var b = v.querySelector(".template-customizer-directions-options");
                                                this.settings.availableDirections.forEach(function (e) {
                                                    var a = t._getElementFromString(
                                                        '<div class="col-4 px-2">\n              <div class="form-check custom-option custom-option-icon">\n                <label class="form-check-label custom-option-content p-0" for="directionRadio'
                                                            .concat(e.name, '">\n                  <span class="custom-option-body mb-0">\n                    <img src="')
                                                            .concat(assetsPath, "img/customizer/")
                                                            .concat(e.name)
                                                            .concat(
                                                                z.contains("dark-style") ? "-dark" : "",
                                                                '.svg" alt="Directions" class="img-fluid" />\n                  </span>\n                  <input\n                    name=directionRadioIcon"\n                    class="form-check-input d-none"\n                    type="radio"\n                    value="'
                                                            )
                                                            .concat(e.name, '"\n                    id="directionRadio')
                                                            .concat(e.name, '" />\n                </label>\n              </div>\n              <label class="form-check-label small" for="directionRadios')
                                                            .concat(e.name, '">')
                                                            .concat(e.title, "</label>\n            </div>")
                                                    );
                                                    b.appendChild(a);
                                                }),
                                                    b.querySelector('input[value="'.concat(this.settings.rtl ? "rtl" : "ltr", '"]')).setAttribute("checked", "checked");
                                                var g = function (e) {
                                                    t._loadingState(!0),
                                                        t.setRtl("rtl" === e.target.value, !0, function () {
                                                            t._loadingState(!1);
                                                        });
                                                };
                                                b.addEventListener("change", g), this._listeners.push([b, "change", g]);
                                            } else v.parentNode.removeChild(v);
                                            var _ = this.container.querySelector(".template-customizer-headerOptions"),
                                                x = document.documentElement.getAttribute("data-template").split("-");
                                            if (this._hasControls("headerType")) {
                                                var S = _.querySelector(".template-customizer-header-options");
                                                setTimeout(function () {
                                                    x.includes("vertical") && _.parentNode.removeChild(_);
                                                }, 100),
                                                    this.settings.availableHeaderTypes.forEach(function (e) {
                                                        var a = t._getElementFromString(
                                                            '<div class="col-4 px-2">\n                <div class="form-check custom-option custom-option-icon">\n                  <label class="form-check-label custom-option-content p-0" for="headerRadio'
                                                                .concat(e.name, '">\n                    <span class="custom-option-body mb-0">\n                      <img src="')
                                                                .concat(assetsPath, "img/customizer/horizontal-")
                                                                .concat(e.name)
                                                                .concat(
                                                                    z.contains("dark-style") ? "-dark" : "",
                                                                    '.svg" alt="Header Types" class="img-fluid scaleX-n1-rtl" />\n                    </span>\n                    <input\n                      name=headerRadioIcon"\n                      class="form-check-input d-none"\n                      type="radio"\n                      value="'
                                                                )
                                                                .concat(e.name, '"\n                      id="headerRadio')
                                                                .concat(e.name, '" />\n                  </label>\n                </div>\n                <label class="form-check-label small" for="headerRadios')
                                                                .concat(e.name, '">')
                                                                .concat(e.title, "</label>\n              </div>")
                                                        );
                                                        S.appendChild(a);
                                                    }),
                                                    S.querySelector('input[value="'.concat(this.settings.headerType, '"]')).setAttribute("checked", "checked");
                                                var w = function (e) {
                                                    t.setLayoutType(e.target.value);
                                                };
                                                S.addEventListener("change", w), this._listeners.push([S, "change", w]);
                                            } else _.parentNode.removeChild(_);
                                            var k = this.container.querySelector(".template-customizer-content");
                                            if (this._hasControls("contentLayout")) {
                                                var C = k.querySelector(".template-customizer-content-options");
                                                this.settings.availableContentLayouts.forEach(function (e) {
                                                    var a = t._getElementFromString(
                                                        '<div class="col-4 px-2">\n              <div class="form-check custom-option custom-option-icon">\n                <label class="form-check-label custom-option-content p-0" for="contentRadio'
                                                            .concat(e.name, '">\n                  <span class="custom-option-body mb-0">\n                    <img src="')
                                                            .concat(assetsPath, "img/customizer/")
                                                            .concat(e.name)
                                                            .concat(
                                                                z.contains("dark-style") ? "-dark" : "",
                                                                '.svg" alt="content type" class="img-fluid scaleX-n1-rtl" />\n                  </span>\n                  <input\n                    name=contentRadioIcon"\n                    class="form-check-input d-none"\n                    type="radio"\n                    value="'
                                                            )
                                                            .concat(e.name, '"\n                    id="contentRadio')
                                                            .concat(e.name, '" />\n                </label>\n              </div>\n              <label class="form-check-label small" for="contentRadios')
                                                            .concat(e.name, '">')
                                                            .concat(e.title, "</label>\n            </div>")
                                                    );
                                                    C.appendChild(a);
                                                }),
                                                    C.querySelector('input[value="'.concat(this.settings.contentLayout, '"]')).setAttribute("checked", "checked");
                                                var T = function (e) {
                                                    (t._loading = !0),
                                                        t._loadingState(!0, !0),
                                                        t.setContentLayout(e.target.value, !0, function () {
                                                            (t._loading = !1), t._loadingState(!1, !0);
                                                        });
                                                };
                                                C.addEventListener("change", T), this._listeners.push([C, "change", T]);
                                            } else k.parentNode.removeChild(k);
                                            var N = this.container.querySelector(".template-customizer-layouts");
                                            if (this._hasControls("layoutCollapsed")) {
                                                setTimeout(function () {
                                                    document.querySelector(".layout-menu-horizontal") && N.parentNode.removeChild(N);
                                                }, 100);
                                                var L = N.querySelector(".template-customizer-layouts-options");
                                                this.settings.availableLayouts.forEach(function (e) {
                                                    var a = t._getElementFromString(
                                                        '<div class="col-4 px-2">\n          <div class="form-check custom-option custom-option-icon">\n            <label class="form-check-label custom-option-content p-0" for="layoutsRadios'
                                                            .concat(e.name, '">\n              <span class="custom-option-body mb-0">\n              <img src="')
                                                            .concat(assetsPath, "img/customizer/")
                                                            .concat(e.name)
                                                            .concat(
                                                                z.contains("dark-style") ? "-dark" : "",
                                                                '.svg" alt="Layout Collapsed/Expanded" class="img-fluid scaleX-n1-rtl" />\n              </span>\n              <input\n              class="form-check-input d-none"\n                type="radio"\n                name="layoutsRadios"\n                id="layoutsRadios'
                                                            )
                                                            .concat(e.name, '"\n                value="')
                                                            .concat(e.name, '" />\n            </label>\n            </div>\n            <label class="form-check-label small" for="layoutsRadios')
                                                            .concat(e.name, '">')
                                                            .concat(e.title, "</label>\n            </div>")
                                                    );
                                                    L.appendChild(a);
                                                }),
                                                    L.querySelector('input[value="'.concat(this.settings.layoutCollapsed ? "collapsed" : "expanded", '"]')).setAttribute("checked", "checked");
                                                var E = function (e) {
                                                    window.Helpers.setCollapsed("collapsed" === e.target.value, !0), t._setSetting("LayoutCollapsed", "collapsed" === e.target.value);
                                                };
                                                L.addEventListener("change", E), this._listeners.push([L, "change", E]);
                                            } else N.parentNode.removeChild(N);
                                            var A = this.container.querySelector(".template-customizer-layoutNavbarOptions");
                                            if (this._hasControls("layoutNavbarOptions")) {
                                                setTimeout(function () {
                                                    x.includes("horizontal") && A.parentNode.removeChild(A);
                                                }, 100);
                                                var O = A.querySelector(".template-customizer-navbar-options");
                                                this.settings.availableNavbarOptions.forEach(function (e) {
                                                    var a = t._getElementFromString(
                                                        '<div class="col-4 px-2">\n          <div class="form-check custom-option custom-option-icon">\n            <label class="form-check-label custom-option-content p-0" for="navbarOptionRadios'
                                                            .concat(e.name, '">\n              <span class="custom-option-body mb-0">\n                <img src="')
                                                            .concat(assetsPath, "img/customizer/")
                                                            .concat(e.name)
                                                            .concat(
                                                                z.contains("dark-style") ? "-dark" : "",
                                                                '.svg" alt="Navbar Type" class="img-fluid scaleX-n1-rtl" />\n              </span>\n              <input\n                class="form-check-input d-none"\n                type="radio"\n                name="navbarOptionRadios"\n                id="navbarOptionRadios'
                                                            )
                                                            .concat(e.name, '"\n                value="')
                                                            .concat(e.name, '" />\n            </label>\n            </div>\n            <label class="form-check-label small" for="navbarOptionRadios')
                                                            .concat(e.name, '">')
                                                            .concat(e.title, "</label>\n        </div>")
                                                    );
                                                    O.appendChild(a);
                                                }),
                                                    O.querySelector('input[value="'.concat(this.settings.layoutNavbarOptions, '"]')).setAttribute("checked", "checked");
                                                var R = function (e) {
                                                    (t._loading = !0),
                                                        t._loadingState(!0, !0),
                                                        t.setLayoutNavbarOption(e.target.value, !0, function () {
                                                            (t._loading = !1), t._loadingState(!1, !0);
                                                        });
                                                };
                                                O.addEventListener("change", R), this._listeners.push([O, "change", R]);
                                            } else A.parentNode.removeChild(A);
                                        } else f.parentNode.removeChild(f);
                                        setTimeout(function () {
                                            document.querySelector(".menu-vertical")
                                                ? t._hasControls("rtl contentLayout layoutCollapsed layoutNavbarOptions", !0) || f.parentNode.removeChild(f)
                                                : document.querySelector(".menu-horizontal") && (t._hasControls("rtl contentLayout headerType", !0) || f.parentNode.removeChild(f));
                                        }, 100),
                                            this.setLang(this.settings.lang, !0),
                                            e === document
                                                ? e.body
                                                    ? e.body.appendChild(this.container)
                                                    : window.addEventListener("DOMContentLoaded", function () {
                                                          return e.body.appendChild(t.container);
                                                      })
                                                : e.appendChild(this.container);
                                    },
                                },
                                {
                                    key: "_initDirection",
                                    value: function () {
                                        this._hasControls("rtl") && document.documentElement.setAttribute("dir", this.settings.rtl ? "rtl" : "ltr");
                                    },
                                },
                                {
                                    key: "_initStyle",
                                    value: function () {
                                        if (this._hasControls("style")) {
                                            var t = this.settings.style;
                                            this._insertStylesheet(
                                                "template-customizer-core-css",
                                                this.pathResolver(this.settings.cssPath + this.settings.cssFilenamePattern.replace("%name%", "core".concat("light" !== t ? "-".concat(t) : "")))
                                            ),
                                                ("light" === t ? ["dark-style"] : ["light-style"]).forEach(function (t) {
                                                    document.documentElement.classList.remove(t);
                                                }),
                                                document.documentElement.classList.add("".concat(t, "-style"));
                                        }
                                    },
                                },
                                {
                                    key: "_initTheme",
                                    value: function () {
                                        if (this._hasControls("themes"))
                                            this._insertStylesheet(
                                                "template-customizer-theme-css",
                                                this.pathResolver(
                                                    this.settings.themesPath + this.settings.cssFilenamePattern.replace("%name%", this.settings.theme.name + ("light" !== this.settings.style ? "-".concat(this.settings.style) : ""))
                                                )
                                            );
                                        else {
                                            var t = this._getSetting("Theme");
                                            this._insertStylesheet(
                                                "template-customizer-theme-css",
                                                this.pathResolver(
                                                    this.settings.themesPath + this.settings.cssFilenamePattern.replace("%name%", t || "theme-default" + ("light" !== this.settings.style ? "-".concat(this.settings.style) : ""))
                                                )
                                            );
                                        }
                                    },
                                },
                                {
                                    key: "_insertStylesheet",
                                    value: function (t, e) {
                                        var a = document.querySelector(".".concat(t));
                                        if ("number" == typeof document.documentMode && document.documentMode < 11) {
                                            if (!a) return;
                                            if (e === a.getAttribute("href")) return;
                                            var n = document.createElement("link");
                                            n.setAttribute("rel", "stylesheet"), n.setAttribute("type", "text/css"), (n.className = t), n.setAttribute("href", e), a.parentNode.insertBefore(n, a.nextSibling);
                                        } else document.write('<link rel="stylesheet" type="text/css" href="'.concat(e, '" class="').concat(t, '">'));
                                        a.parentNode.removeChild(a);
                                    },
                                },
                                {
                                    key: "_loadStylesheets",
                                    value: function (t, e) {
                                        var a = Object.keys(t),
                                            n = a.length,
                                            i = 0;
                                        function o(t, e, a) {
                                            var n = document.createElement("link");
                                            n.setAttribute("href", t), n.setAttribute("rel", "stylesheet"), n.setAttribute("type", "text/css"), (n.className = e.className);
                                            var i,
                                                o = "sheet" in n ? "sheet" : "styleSheet",
                                                s = "sheet" in n ? "cssRules" : "rules",
                                                l = setTimeout(function () {
                                                    clearInterval(i), clearTimeout(l), e.parentNode.removeChild(n), a(!1, t);
                                                }, 15e3);
                                            (i = setInterval(function () {
                                                try {
                                                    n[o] && n[o][s].length && (clearInterval(i), clearTimeout(l), e.parentNode.removeChild(e), a(!0));
                                                } catch (t) {}
                                            }, 10)),
                                                e.parentNode.insertBefore(n, e.nextSibling);
                                        }
                                        for (var s = 0; s < a.length; s++) o(a[s], t[a[s]], void ((i += 1) >= n && e()));
                                    },
                                },
                                {
                                    key: "_loadingState",
                                    value: function (t, e) {
                                        this.container.classList[t ? "add" : "remove"]("template-customizer-loading".concat(e ? "-theme" : ""));
                                    },
                                },
                                {
                                    key: "_getElementFromString",
                                    value: function (t) {
                                        var e = document.createElement("div");
                                        return (e.innerHTML = t), e.firstChild;
                                    },
                                },
                                {
                                    key: "_getSetting",
                                    value: function (t) {
                                        var e = null,
                                            a = this._getLayoutName();
                                        try {
                                            e = localStorage.getItem("templateCustomizer-".concat(a, "--").concat(t));
                                        } catch (t) {}
                                        return String(e || "");
                                    },
                                },
                                {
                                    key: "_showResetBtnNotification",
                                    value: function () {
                                        var t = this,
                                            e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                                        setTimeout(function () {
                                            var a = t.container.querySelector(".template-customizer-reset-btn .badge");
                                            e ? a.classList.remove("d-none") : a.classList.add("d-none");
                                        }, 200);
                                    },
                                },
                                {
                                    key: "_setSetting",
                                    value: function (t, e) {
                                        var a = this._getLayoutName();
                                        try {
                                            localStorage.setItem("templateCustomizer-".concat(a, "--").concat(t), String(e)), this._showResetBtnNotification();
                                        } catch (t) {}
                                    },
                                },
                                {
                                    key: "_getLayoutName",
                                    value: function () {
                                        return document.getElementsByTagName("HTML")[0].getAttribute("data-template");
                                    },
                                },
                                {
                                    key: "_removeListeners",
                                    value: function () {
                                        for (var t = 0, e = this._listeners.length; t < e; t++) this._listeners[t][0].removeEventListener(this._listeners[t][1], this._listeners[t][2]);
                                    },
                                },
                                {
                                    key: "_cleanup",
                                    value: function () {
                                        this._removeListeners(), (this._listeners = []), (this._controls = {}), this._updateInterval && (clearInterval(this._updateInterval), (this._updateInterval = null));
                                    },
                                },
                                {
                                    key: "_ssr",
                                    get: function () {
                                        return "undefined" == typeof window;
                                    },
                                },
                                {
                                    key: "_hasControls",
                                    value: function (t) {
                                        var e = this,
                                            a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                                        return t.split(" ").reduce(function (t, n) {
                                            return -1 !== e.settings.controls.indexOf(n) ? (a || !1 !== t) && (t = !0) : (a && !0 === t) || (t = !1), t;
                                        }, null);
                                    },
                                },
                                {
                                    key: "_getDefaultTheme",
                                    value: function (t) {
                                        var e;
                                        if (!(e = "string" == typeof t ? this._getThemeByName(t, !1) : this.settings.availableThemes[t])) throw new Error('Theme ID "'.concat(t, '" not found!'));
                                        return e;
                                    },
                                },
                                {
                                    key: "_getThemeByName",
                                    value: function (t) {
                                        for (var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], a = this.settings.availableThemes, n = 0, i = a.length; n < i; n++) if (a[n].name === t) return a[n];
                                        return e ? this.settings.defaultTheme : null;
                                    },
                                },
                            ]),
                            a && v(e.prototype, a),
                            Object.defineProperty(e, "prototype", { writable: !1 }),
                            t
                        );
                    })();
                (O.STYLES = [
                    { name: "light", title: "Light" },
                    { name: "dark", title: "Dark" },
                    { name: "system", title: "System" },
                ]),
                    (O.THEMES = [
                        { name: "theme-default", title: "Default" },
                        { name: "theme-bordered", title: "Bordered" },
                        { name: "theme-semi-dark", title: "Semi Dark" },
                    ]),
                    (O.LAYOUTS = [
                        { name: "expanded", title: "Expanded" },
                        { name: "collapsed", title: "Collapsed" },
                    ]),
                    (O.NAVBAR_OPTIONS = [
                        { name: "sticky", title: "Sticky" },
                        { name: "static", title: "Static" },
                        { name: "hidden", title: "Hidden" },
                    ]),
                    (O.HEADER_TYPES = [
                        { name: "fixed", title: "Fixed" },
                        { name: "static", title: "Static" },
                    ]),
                    (O.CONTENT = [
                        { name: "compact", title: "Compact" },
                        { name: "wide", title: "Wide" },
                    ]),
                    (O.DIRECTIONS = [
                        { name: "ltr", title: "Left to Right" },
                        { name: "rtl", title: "Right to Left" },
                    ]),
                    (O.LANGUAGES = {
                        en: {
                            panel_header: "Template Customizer",
                            panel_sub_header: "Customize and preview in real time",
                            theming_header: "Theming",
                            style_label: "Style (Mode)",
                            theme_label: "Themes",
                            layout_header: "Layout",
                            layout_label: "Menu (Navigation)",
                            layout_header_label: "Header Types",
                            content_label: "Content",
                            layout_navbar_label: "Navbar Type",
                            direction_label: "Direction",
                        },
                        fr: {
                            panel_header: "Modèle De Personnalisation",
                            panel_sub_header: "Personnalisez et prévisualisez en temps réel",
                            theming_header: "Thématisation",
                            style_label: "Style (Mode)",
                            theme_label: "Thèmes",
                            layout_header: "Disposition",
                            layout_label: "Menu (Navigation)",
                            layout_header_label: "Types d'en-tête",
                            content_label: "Contenu",
                            layout_navbar_label: "Type de barre de navigation",
                            direction_label: "Direction",
                        },
                        de: {
                            panel_header: "Vorlagen-Anpasser",
                            panel_sub_header: "Anpassen und Vorschau in Echtzeit",
                            theming_header: "Themen",
                            style_label: "Stil (Modus)",
                            theme_label: "Themen",
                            layout_header: "Layout",
                            layout_label: "Menü (Navigation)",
                            layout_header_label: "Header-Typen",
                            content_label: "Inhalt",
                            layout_navbar_label: "Art der Navigationsleiste",
                            direction_label: "Richtung",
                        },
                        pt: {
                            panel_header: "Personalizador De Modelo",
                            panel_sub_header: "Personalize e visualize em tempo real",
                            theming_header: "Temas",
                            style_label: "Estilo (Modo)",
                            theme_label: "Temas",
                            layout_header: "Esquema",
                            layout_label: "Menu (Navegação)",
                            layout_header_label: "Tipos de cabeçalho",
                            content_label: "Contente",
                            layout_navbar_label: "Tipo de barra de navegação",
                            direction_label: "Direção",
                        },
                    });
            })(),
            n
        );
    })();
});
