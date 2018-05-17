/*! angular-google-maps 2.0.19 2015-03-28
 *  AngularJS directives for Google Maps
 *  git: https://github.com/angular-ui/angular-google-maps.git
 */
! function (a, b, c) {
    "use strict";
    (function () {
        b.module("uiGmapgoogle-maps.providers", []), b.module("uiGmapgoogle-maps.wrapped", []), b.module("uiGmapgoogle-maps.extensions", ["uiGmapgoogle-maps.wrapped", "uiGmapgoogle-maps.providers"]), b.module("uiGmapgoogle-maps.directives.api.utils", ["uiGmapgoogle-maps.extensions"]), b.module("uiGmapgoogle-maps.directives.api.managers", []), b.module("uiGmapgoogle-maps.directives.api.options", ["uiGmapgoogle-maps.directives.api.utils"]), b.module("uiGmapgoogle-maps.directives.api.options.builders", []), b.module("uiGmapgoogle-maps.directives.api.models.child", ["uiGmapgoogle-maps.directives.api.utils", "uiGmapgoogle-maps.directives.api.options", "uiGmapgoogle-maps.directives.api.options.builders"]), b.module("uiGmapgoogle-maps.directives.api.models.parent", ["uiGmapgoogle-maps.directives.api.managers", "uiGmapgoogle-maps.directives.api.models.child", "uiGmapgoogle-maps.providers"]), b.module("uiGmapgoogle-maps.directives.api", ["uiGmapgoogle-maps.directives.api.models.parent"]), b.module("uiGmapgoogle-maps", ["uiGmapgoogle-maps.directives.api", "uiGmapgoogle-maps.providers"])
    }).call(this),
    function () {
        b.module("uiGmapgoogle-maps.providers").factory("uiGmapMapScriptLoader", ["$q", "uiGmapuuid",
            function (c, d) {
                var e, f, g, h;
                return h = void 0, e = function (a) {
                    return a.china ? "http://maps.google.cn/maps/api/js?" : "https://maps.googleapis.com/maps/api/js?"
                }, f = function (a) {
                    var b, c;
                    return b = _.map(a, function (a, b) {
                        return b + "=" + a
                    }), h && document.getElementById(h).remove(), b = b.join("&"), c = document.createElement("script"), c.id = h = "ui_gmap_map_load_" + d.generate(), c.type = "text/javascript", c.src = e(a) + b, document.body.appendChild(c)
                }, g = function () {
                    return b.isDefined(a.google) && b.isDefined(a.google.maps)
                }, {
                    load: function (b) {
                        var d, e;
                        return d = c.defer(), g() ? (d.resolve(a.google.maps), d.promise) : (e = b.callback = "onGoogleMapsReady" + Math.round(1e3 * Math.random()), a[e] = function () {
                            a[e] = null, d.resolve(a.google.maps)
                        }, a.navigator.connection && a.Connection && a.navigator.connection.type === a.Connection.NONE ? document.addEventListener("online", function () {
                            return g() ? void 0 : f(b)
                        }) : f(b), d.promise)
                    }
                }
            }]).provider("uiGmapGoogleMapApi", function () {
            return this.options = {
                china: !1,
                v: "3.17",
                libraries: "",
                language: "en",
                sensor: "false"
            }, this.configure = function (a) {
                b.extend(this.options, a)
            }, this.$get = ["uiGmapMapScriptLoader",
                function (a) {
                    return function (b) {
                        return b.load(a.options)
                    }
                }(this)], this
        })
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.extensions").service("uiGmapExtendGWin", function () {
            return {
                init: _.once(function () {
                    return google || ("undefined" != typeof google && null !== google ? google.maps : void 0) || null != google.maps.InfoWindow ? (google.maps.InfoWindow.prototype._open = google.maps.InfoWindow.prototype.open, google.maps.InfoWindow.prototype._close = google.maps.InfoWindow.prototype.close, google.maps.InfoWindow.prototype._isOpen = !1, google.maps.InfoWindow.prototype.open = function (a, b, c) {
                        null == c && (this._isOpen = !0, this._open(a, b, !0))
                    }, google.maps.InfoWindow.prototype.close = function (a) {
                        null == a && (this._isOpen = !1, this._close(!0))
                    }, google.maps.InfoWindow.prototype.isOpen = function (a) {
                        return null == a && (a = void 0), null == a ? this._isOpen : this._isOpen = a
                    }, a.InfoBox && (a.InfoBox.prototype._open = a.InfoBox.prototype.open, a.InfoBox.prototype._close = a.InfoBox.prototype.close, a.InfoBox.prototype._isOpen = !1, a.InfoBox.prototype.open = function (a, b) {
                        this._isOpen = !0, this._open(a, b)
                    }, a.InfoBox.prototype.close = function () {
                        this._isOpen = !1, this._close()
                    }, a.InfoBox.prototype.isOpen = function (a) {
                        return null == a && (a = void 0), null == a ? this._isOpen : this._isOpen = a
                    }), a.MarkerLabel_ ? a.MarkerLabel_.prototype.setContent = function () {
                        var a;
                        a = this.marker_.get("labelContent"), a && !_.isEqual(this.oldContent, a) && ("undefined" == typeof (null != a ? a.nodeType : void 0) ? (this.labelDiv_.innerHTML = a, this.eventDiv_.innerHTML = this.labelDiv_.innerHTML, this.oldContent = a) : (this.labelDiv_.innerHTML = "", this.labelDiv_.appendChild(a), a = a.cloneNode(!0), this.labelDiv_.innerHTML = "", this.eventDiv_.appendChild(a), this.oldContent = a))
                    } : void 0) : void 0
                })
            }
        })
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.extensions").service("uiGmapLodash", function () {
            return this.intersectionObjects = function (a, b, c) {
                var d;
                return null == c && (c = void 0), d = _.map(a, function () {
                    return function (a) {
                        return _.find(b, function (b) {
                            return null != c ? c(a, b) : _.isEqual(a, b)
                        })
                    }
                }(this)), _.filter(d, function (a) {
                    return null != a
                })
            }, this.containsObject = _.includeObject = function (a, b, c) {
                return null == c && (c = void 0), null === a ? !1 : _.any(a, function () {
                    return function (a) {
                        return null != c ? c(a, b) : _.isEqual(a, b)
                    }
                }(this))
            }, this.differenceObjects = function (a, b, c) {
                return null == c && (c = void 0), _.filter(a, function (a) {
                    return function (d) {
                        return !a.containsObject(b, d, c)
                    }
                }(this))
            }, this.withoutObjects = this.differenceObjects, this.indexOfObject = function (a, b, c, d) {
                var e, f;
                if (null == a) return -1;
                if (e = 0, f = a.length, d) {
                    if ("number" != typeof d) return e = _.sortedIndex(a, b), a[e] === b ? e : -1;
                    e = 0 > d ? Math.max(0, f + d) : d
                }
                for (; f > e;) {
                    if (null != c) {
                        if (c(a[e], b)) return e
                    } else if (_.isEqual(a[e], b)) return e;
                    e++
                }
                return -1
            }, this.isNullOrUndefined = function (a) {
                return _.isNull(a || _.isUndefined(a))
            }, this
        })
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.extensions").factory("uiGmapString", function () {
            return function (a) {
                return this.contains = function (b, c) {
                    return -1 !== a.indexOf(b, c)
                }, this
            }
        })
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmap_sync", [
            function () {
                return {
                    fakePromise: function () {
                        var a;
                        return a = void 0, {
                            then: function (b) {
                                return a = b
                            },
                            resolve: function () {
                                return a.apply(void 0, arguments)
                            }
                        }
                    }
                }
            }]).service("uiGmap_async", ["$timeout", "uiGmapPromise", "uiGmapLogger", "$q", "uiGmapDataStructures", "uiGmapGmapUtil",
            function (a, c, d, e, f, g) {
                var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
                return y = c.promiseTypes, r = c.isInProgress, x = c.promiseStatus, h = c.ExposedPromise, j = c.SniffedPromise, s = function (a, b) {
                    var c;
                    return c = a.promise(), c.promiseType = a.promiseType, c.$$state && d.debug("promiseType: " + c.promiseType + ", state: " + x(c.$$state.status)), c.cancelCb = b, c
                }, o = function (a, b) {
                    return a.promiseType === y.create && b.promiseType !== y["delete"] && b.promiseType !== y.init ? (d.debug("lastPromise.promiseType " + b.promiseType + ", newPromiseType: " + a.promiseType + ", SKIPPED MUST COME AFTER DELETE ONLY"), !0) : !1
                }, w = function (a, b, c) {
                    var e;
                    return b.promiseType === y["delete"] && c.promiseType !== y["delete"] && null != c.cancelCb && _.isFunction(c.cancelCb) && r(c) && (d.debug("promiseType: " + b.promiseType + ", CANCELING LAST PROMISE type: " + c.promiseType), c.cancelCb("cancel safe"), e = a.peek(), null != e && r(e)) ? e.hasOwnProperty("cancelCb") && _.isFunction(e.cancelCb) ? (d.debug("promiseType: " + e.promiseType + ", CANCELING FIRST PROMISE type: " + e.promiseType), e.cancelCb("cancel safe")) : d.warn("first promise was not cancelable") : void 0
                }, i = function (a, b, c) {
                    var d, e;
                    if (a.existingPieces) {
                        if (d = _.last(a.existingPieces._content), o(b, d)) return;
                        return w(a.existingPieces, b, d), e = h(d["finally"](function () {
                            return s(b, c)
                        })), e.cancelCb = c, e.promiseType = b.promiseType, a.existingPieces.enqueue(e), d["finally"](function () {
                            return a.existingPieces.dequeue()
                        })
                    }
                    return a.existingPieces = new f.Queue, a.existingPieces.enqueue(s(b, c))
                }, u = function (a, b, c, e, f) {
                    var g;
                    return null == c && (c = ""), g = function (a) {
                        return d.debug(a + ": " + a), null != e && _.isFunction(e) ? e(a) : void 0
                    }, i(a, j(f, b), g)
                }, m = 80, q = {
                    value: null
                }, z = function (a, b, c) {
                    var d;
                    try {
                        return a.apply(b, c)
                    } catch (e) {
                        return d = e, q.value = d, q
                    }
                }, t = function (a, b, c, e) {
                    var f, g;
                    return g = z(a, b, e), g === q && (f = "error within chunking iterator: " + q.value, d.error(f), c.reject(f)), "cancel safe" === g ? !1 : !0
                }, l = function (a, b, c) {
                    var d, e;
                    return d = a === b, e = b[c], d ? e : a[e]
                }, k = function (a, c, d, e) {
                    var f;
                    return b.isArray(a) ? f = a : (f = c ? c : Object.keys(_.omit(a, ["length", "forEach", "map"])), c = f), null == e && (e = d), b.isArray(f) && (void 0 === f || (null != f ? f.length : void 0) <= 0) && e !== d ? d() : e(f, c)
                }, n = function (c, d, e, f, g, h, i, j) {
                    return k(c, j, function (j, k) {
                        var m, o, p, q;
                        for (m = d && d < j.length ? d : j.length, o = i, p = !0; p && m-- && o < (j ? j.length : o + 1);) q = l(c, j, o), p = b.isFunction(q) ? !0 : t(f, void 0, h, [q, o]), ++o;
                        if (j) {
                            if (!(p && o < j.length)) return h.resolve();
                            if (i = o, d) return null != g && _.isFunction(g) && t(g, void 0, h, []), a(function () {
                                return n(c, d, e, f, g, h, i, k)
                            }, e, !1)
                        }
                    })
                }, p = function (a, b, e, f, g, h, i) {
                    var j, l, o;
                    return null == e && (e = m), null == g && (g = 0), null == h && (h = 1), o = void 0, l = c.defer(), o = l.promise, h ? k(a, i, function () {
                        return l.resolve(), o
                    }, function (c, d) {
                        return n(a, e, h, b, f, l, g, d), o
                    }) : (j = "pause (delay) must be set from _async!", d.error(j), l.reject(j), o)
                }, v = function (a, b, d, e, f, g, h) {
                    var i;
                    return i = [], k(a, h, function () {
                        return c.resolve(i)
                    }, function (c, h) {
                        return p(a, function (a) {
                            return i.push(b(a))
                        }, d, e, f, g, h).then(function () {
                            return i
                        })
                    })
                }, {
                    each: p,
                    map: v,
                    managePromiseQueue: u,
                    promiseLock: u,
                    defaultChunkSize: m,
                    chunkSizeFrom: function (a, b) {
                        return null == b && (b = void 0), _.isNumber(a) && (b = a), (g.isFalse(a) || a === !1) && (b = !1), b
                    }
                }
            }])
    }.call(this),
    function () {
        var a = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
        b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapBaseObject", function () {
            var b, c;
            return c = ["extended", "included"], b = function () {
                function b() {}
                return b.extend = function (b) {
                    var d, e, f;
                    for (d in b) f = b[d], a.call(c, d) < 0 && (this[d] = f);
                    return null != (e = b.extended) && e.apply(this), this
                }, b.include = function (b) {
                    var d, e, f;
                    for (d in b) f = b[d], a.call(c, d) < 0 && (this.prototype[d] = f);
                    return null != (e = b.included) && e.apply(this), this
                }, b
            }()
        })
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChildEvents", function () {
            return {
                onChildCreation: function () {}
            }
        })
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapCtrlHandle", ["$q",
            function (a) {
                var b;
                return b = {
                    handle: function (c) {
                        return c.$on("$destroy", function () {
                            return b.handle(c)
                        }), c.deferred = a.defer(), {
                            getScope: function () {
                                return c
                            }
                        }
                    },
                    mapPromise: function (a, b) {
                        var c;
                        return c = b.getScope(), c.deferred.promise.then(function (b) {
                            return a.map = b
                        }), c.deferred.promise
                    }
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapEventsHelper", ["uiGmapLogger",
            function () {
                var a, c;
                return c = function (a) {
                    return b.isDefined(a.events) && null != a.events && b.isObject(a.events)
                }, a = function (a, b) {
                    return c(a) ? a : c(b) ? b : void 0
                }, {
                    setEvents: function (c, d, e, f) {
                        var g;
                        return g = a(d, e), null != g ? _.compact(_.map(g.events, function (a, h) {
                            var i;
                            return f && (i = _(f).contains(h)), g.events.hasOwnProperty(h) && b.isFunction(g.events[h]) && !i ? google.maps.event.addListener(c, h, function () {
                                return d.$evalAsync || (d.$evalAsync = function () {}), d.$evalAsync(a.apply(d, [c, h, e, arguments]))
                            }) : void 0
                        })) : void 0
                    },
                    removeEvents: function (a) {
                        return a ? a.forEach(function (a) {
                            return a ? google.maps.event.removeListener(a) : void 0
                        }) : void 0
                    }
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapFitHelper", ["uiGmapLogger", "uiGmap_async",
            function () {
                return {
                    fit: function (a, b) {
                        var c, d;
                        return b && a && a.length > 0 && (c = new google.maps.LatLngBounds, d = !1, a.forEach(function () {
                            return function (a) {
                                return a ? (d || (d = !0), c.extend(a.getPosition())) : void 0
                            }
                        }(this)), d) ? b.fitBounds(c) : void 0
                    }
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapGmapUtil", ["uiGmapLogger", "$compile",
            function (a, c) {
                var d, e, f, g, h, i;
                return e = function (a, b, c) {
                    return a === b || -1 !== c.indexOf(a)
                }, d = function (a) {
                    return e(a, !1, ["false", "FALSE", 0, "n", "N", "no", "NO"])
                }, g = function (a) {
                    return Array.isArray(a) && 2 === a.length ? a[1] : b.isDefined(a.type) && "Point" === a.type ? a.coordinates[1] : a.latitude
                }, h = function (a) {
                    return Array.isArray(a) && 2 === a.length ? a[0] : b.isDefined(a.type) && "Point" === a.type ? a.coordinates[0] : a.longitude
                }, f = function (a) {
                    return a ? Array.isArray(a) && 2 === a.length ? new google.maps.LatLng(a[1], a[0]) : b.isDefined(a.type) && "Point" === a.type ? new google.maps.LatLng(a.coordinates[1], a.coordinates[0]) : new google.maps.LatLng(a.latitude, a.longitude) : void 0
                }, i = function (a) {
                    if (b.isUndefined(a)) return !1;
                    if (_.isArray(a)) {
                        if (2 === a.length) return !0
                    } else if (null != a && (null != a ? a.type : void 0) && "Point" === a.type && _.isArray(a.coordinates) && 2 === a.coordinates.length) return !0;
                    return a && b.isDefined((null != a ? a.latitude : void 0) && b.isDefined(null != a ? a.longitude : void 0)) ? !0 : !1
                }, {
                    setCoordsFromEvent: function (a, c) {
                        return a ? (Array.isArray(a) && 2 === a.length ? (a[1] = c.lat(), a[0] = c.lng()) : b.isDefined(a.type) && "Point" === a.type ? (a.coordinates[1] = c.lat(), a.coordinates[0] = c.lng()) : (a.latitude = c.lat(), a.longitude = c.lng()), a) : void 0
                    },
                    getLabelPositionPoint: function (a) {
                        var b, c;
                        return void 0 === a ? void 0 : (a = /^([-\d\.]+)\s([-\d\.]+)$/.exec(a), b = parseFloat(a[1]), c = parseFloat(a[2]), null != b && null != c ? new google.maps.Point(b, c) : void 0)
                    },
                    createWindowOptions: function (d, e, g, h) {
                        var i;
                        return null != g && null != h && null != c ? (i = b.extend({}, h, {
                            content: this.buildContent(e, h, g),
                            position: null != h.position ? h.position : b.isObject(d) ? d.getPosition() : f(e.coords)
                        }), null != d && null == (null != i ? i.pixelOffset : void 0) && (null == i.boxClass || (i.pixelOffset = {
                            height: 0,
                            width: -2
                        })), i) : h ? h : (a.error("infoWindow defaults not defined"), g ? void 0 : a.error("infoWindow content not defined"))
                    },
                    buildContent: function (a, b, d) {
                        var e, f;
                        return null != b.content ? f = b.content : null != c ? (d = d.replace(/^\s+|\s+$/g, ""), e = "" === d ? "" : c(d)(a), e.length > 0 && (f = e[0])) : f = d, f
                    },
                    defaultDelay: 50,
                    isTrue: function (a) {
                        return e(a, !0, ["true", "TRUE", 1, "y", "Y", "yes", "YES"])
                    },
                    isFalse: d,
                    isFalsy: function (a) {
                        return e(a, !1, [void 0, null]) || d(a)
                    },
                    getCoords: f,
                    validateCoords: i,
                    equalCoords: function (a, b) {
                        return g(a) === g(b) && h(a) === h(b)
                    },
                    validatePath: function (a) {
                        var c, d, e, f;
                        if (d = 0, b.isUndefined(a.type)) {
                            if (!Array.isArray(a) || a.length < 2) return !1;
                            for (; d < a.length;) {
                                if (!(b.isDefined(a[d].latitude) && b.isDefined(a[d].longitude) || "function" == typeof a[d].lat && "function" == typeof a[d].lng)) return !1;
                                d++
                            }
                            return !0
                        }
                        if (b.isUndefined(a.coordinates)) return !1;
                        if ("Polygon" === a.type) {
                            if (a.coordinates[0].length < 4) return !1;
                            c = a.coordinates[0]
                        } else if ("MultiPolygon" === a.type) {
                            if (f = {
                                max: 0,
                                index: 0
                            }, _.forEach(a.coordinates, function (a, b) {
                                return a[0].length > this.max ? (this.max = a[0].length, this.index = b) : void 0
                            }, f), e = a.coordinates[f.index], c = e[0], c.length < 4) return !1
                        } else {
                            if ("LineString" !== a.type) return !1;
                            if (a.coordinates.length < 2) return !1;
                            c = a.coordinates
                        }
                        for (; d < c.length;) {
                            if (2 !== c[d].length) return !1;
                            d++
                        }
                        return !0
                    },
                    convertPathPoints: function (a) {
                        var c, d, e, f, g;
                        if (d = 0, f = new google.maps.MVCArray, b.isUndefined(a.type))
                            for (; d < a.length;) b.isDefined(a[d].latitude) && b.isDefined(a[d].longitude) ? e = new google.maps.LatLng(a[d].latitude, a[d].longitude) : "function" == typeof a[d].lat && "function" == typeof a[d].lng && (e = a[d]), f.push(e), d++;
                        else
                            for ("Polygon" === a.type ? c = a.coordinates[0] : "MultiPolygon" === a.type ? (g = {
                                max: 0,
                                index: 0
                            }, _.forEach(a.coordinates, function (a, b) {
                                return a[0].length > this.max ? (this.max = a[0].length, this.index = b) : void 0
                            }, g), c = a.coordinates[g.index][0]) : "LineString" === a.type && (c = a.coordinates); d < c.length;) f.push(new google.maps.LatLng(c[d][1], c[d][0])), d++;
                        return f
                    },
                    extendMapBounds: function (a, b) {
                        var c, d;
                        for (c = new google.maps.LatLngBounds, d = 0; d < b.length;) c.extend(b.getAt(d)), d++;
                        return a.fitBounds(c)
                    },
                    getPath: function (a, b) {
                        var c;
                        return null != b && _.isString(b) ? (c = a, _.each(b.split("."), function (a) {
                            return c ? c = c[a] : void 0
                        }), c) : b
                    },
                    validateBoundPoints: function (a) {
                        return b.isUndefined(a.sw.latitude) || b.isUndefined(a.sw.longitude) || b.isUndefined(a.ne.latitude) || b.isUndefined(a.ne.longitude) ? !1 : !0
                    },
                    convertBoundPoints: function (a) {
                        var b;
                        return b = new google.maps.LatLngBounds(new google.maps.LatLng(a.sw.latitude, a.sw.longitude), new google.maps.LatLng(a.ne.latitude, a.ne.longitude))
                    },
                    fitMapBounds: function (a, b) {
                        return a.fitBounds(b)
                    }
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapIsReady", ["$q", "$timeout",
            function (a, b) {
                var c, d, e;
                return c = 0, e = [], d = function () {
                    return a.all(e)
                }, {
                    spawn: function () {
                        var b;
                        return b = a.defer(), e.push(b.promise), c += 1, {
                            instance: c,
                            deferred: b
                        }
                    },
                    promises: d,
                    instances: function () {
                        return c
                    },
                    promise: function (e) {
                        var f, g;
                        return null == e && (e = 1), f = a.defer(), g = function () {
                            return b(function () {
                                return c !== e ? g() : f.resolve(d())
                            })
                        }, g(), f.promise
                    },
                    reset: function () {
                        return c = 0, e.length = 0
                    }
                }
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapLinked", ["uiGmapBaseObject",
            function (b) {
                var c;
                return c = function (b) {
                    function c(a, b, c, d) {
                        this.scope = a, this.element = b, this.attrs = c, this.ctrls = d
                    }
                    return a(c, b), c
                }(b)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapLogger", ["$log",
            function (a) {
                var b, c, d, e;
                return b = {
                    log: 1,
                    info: 2,
                    debug: 3,
                    warn: 4,
                    error: 5,
                    none: 6
                }, e = function (a, b, c) {
                    return a >= b ? c() : void 0
                }, d = function (b, c) {
                    return null != a ? a[b](c) : console[b](c)
                }, new(c = function () {
                    function c() {
                        var a;
                        this.doLog = !0, a = {}, ["log", "info", "debug", "warn", "error"].forEach(function (c) {
                            return function (f) {
                                return a[f] = function (a) {
                                    return c.doLog ? e(b[f], c.currentLevel, function () {
                                        return d(f, a)
                                    }) : void 0
                                }
                            }
                        }(this)), this.LEVELS = b, this.currentLevel = b.error, this.log = a.log, this.info = a.info, this.debug = a.debug, this.warn = a.warn, this.error = a.error
                    }
                    return c.prototype.spawn = function () {
                        return new c
                    }, c.prototype.setLog = function (b) {
                        return a = b
                    }, c
                }())
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapModelKey", ["uiGmapBaseObject", "uiGmapGmapUtil", "uiGmapPromise", "$q", "$timeout",
            function (d, e) {
                var f;
                return f = function (d) {
                    function f(b) {
                        this.scope = b, this.modelsLength = a(this.modelsLength, this), this.updateChild = a(this.updateChild, this), this.destroy = a(this.destroy, this), this.onDestroy = a(this.onDestroy, this), this.setChildScope = a(this.setChildScope, this), this.getChanges = a(this.getChanges, this), this.getProp = a(this.getProp, this), this.setIdKey = a(this.setIdKey, this), this.modelKeyComparison = a(this.modelKeyComparison, this), f.__super__.constructor.call(this), this["interface"] = {}, this["interface"].scopeKeys = [], this.defaultIdKey = "id", this.idKey = void 0
                    }
                    return c(f, d), f.prototype.evalModelHandle = function (a, b) {
                        return null != a && null != b ? "self" === b ? a : (_.isFunction(b) && (b = b()), e.getPath(a, b)) : void 0
                    }, f.prototype.modelKeyComparison = function (a, b) {
                        var c, d, f;
                        if (c = _.contains(this["interface"].scopeKeys, "coords"), (c && null != this.scope.coords || !c) && (f = this.scope), null == f) throw "No scope set!";
                        return c && (d = e.equalCoords(this.evalModelHandle(a, f.coords), this.evalModelHandle(b, f.coords)), !d) ? d : d = _.every(_.without(this["interface"].scopeKeys, "coords"), function (c) {
                            return function (d) {
                                return c.evalModelHandle(a, f[d]) === c.evalModelHandle(b, f[d])
                            }
                        }(this))
                    }, f.prototype.setIdKey = function (a) {
                        return this.idKey = null != a.idKey ? a.idKey : this.defaultIdKey
                    }, f.prototype.setVal = function (a, b, c) {
                        var d;
                        return d = this.modelOrKey(a, b), d = c, a
                    }, f.prototype.modelOrKey = function (a, b) {
                        return null != b ? "self" !== b ? e.getPath(a, b) : a : void 0
                    }, f.prototype.getProp = function (a, b) {
                        return this.modelOrKey(b, a)
                    }, f.prototype.getChanges = function (a, b, c) {
                        var d, e, f;
                        c && (b = _.pick(b, c), a = _.pick(a, c)), e = {}, f = {}, d = {};
                        for (f in a) b && b[f] === a[f] || (_.isArray(a[f]) ? e[f] = a[f] : _.isObject(a[f]) ? (d = this.getChanges(a[f], b ? b[f] : null), _.isEmpty(d) || (e[f] = d)) : e[f] = a[f]);
                        return e
                    }, f.prototype.scopeOrModelVal = function (a, b, c, d) {
                        var e, f, g, h;
                        return null == d && (d = !1), e = function (a, b, c) {
                            return null == c && (c = !1), c ? {
                                isScope: a,
                                value: b
                            } : b
                        }, h = b[a], _.isFunction(h) ? e(!0, h(c), d) : _.isObject(h) ? e(!0, h, d) : _.isString(h) ? (f = h, g = f ? "self" === f ? c : c[f] : c[a], _.isFunction(g) ? e(!1, g(), d) : e(!1, g, d)) : e(!0, h, d)
                    }, f.prototype.setChildScope = function (a, b, c) {
                        return _.each(a, function (a) {
                            return function (d) {
                                var e, f;
                                return e = a.scopeOrModelVal(d, b, c, !0), null != (null != e ? e.value : void 0) && (f = e.value, f !== b[d]) ? b[d] = f : void 0
                            }
                        }(this)), b.model = c
                    }, f.prototype.onDestroy = function () {}, f.prototype.destroy = function (a) {
                        var b;
                        return null == a && (a = !1), null == this.scope || (null != (b = this.scope) ? b.$$destroyed : void 0) || !this.needToManualDestroy && !a ? this.clean() : this.scope.$destroy()
                    }, f.prototype.updateChild = function (a, b) {
                        return null == b[this.idKey] ? void this.$log.error("Model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.") : a.updateModel(b)
                    }, f.prototype.modelsLength = function (a) {
                        var c, d;
                        return null == a && (a = void 0), c = 0, d = a ? a : this.scope.models, null == d ? c : c = b.isArray(d) || null != d.length ? d.length : Object.keys(d).length
                    }, f
                }(d)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapModelsWatcher", ["uiGmapLogger", "uiGmap_async", "$q", "uiGmapPromise",
            function (a, b, c, d) {
                return {
                    didQueueInitPromise: function (a, c) {
                        return 0 === c.models.length ? (b.promiseLock(a, d.promiseTypes.init, null, null, function () {
                            return function () {
                                return d.resolve()
                            }
                        }(this)), !0) : !1
                    },
                    figureOutState: function (b, c, d, e) {
                        var f, g, h, i, j;
                        return f = [], h = {}, i = [], j = [], c.models.forEach(function (c) {
                            var g;
                            return null == c[b] ? a.error(" id missing for model #{m.toString()},\ncan not use do comparison/insertion") : (h[c[b]] = {}, null == d.get(c[b]) ? f.push(c) : (g = d.get(c[b]), e(c, g.clonedModel) ? void 0 : j.push({
                                model: c,
                                child: g
                            })))
                        }), g = d.values(), g.forEach(function (c) {
                            var d;
                            return null == c ? void a.error("child undefined in ModelsWatcher.") : null == c.model ? void a.error("child.model undefined in ModelsWatcher.") : (d = c.model[b], null == h[d] ? i.push(c) : void 0)
                        }), {
                            adds: f,
                            removals: i,
                            updates: j
                        }
                    }
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapPromise", ["$q", "$timeout", "uiGmapLogger",
            function (a, b, c) {
                var d, e, f, g, h, i, j, k, l, m, n;
                return l = {
                    create: "create",
                    update: "update",
                    "delete": "delete",
                    init: "init"
                }, k = {
                    IN_PROGRESS: 0,
                    RESOLVED: 1,
                    REJECTED: 2
                }, n = function () {
                    var a;
                    return a = {}, a["" + k.IN_PROGRESS] = "in-progress", a["" + k.RESOLVED] = "resolved", a["" + k.REJECTED] = "rejected", a
                }(), g = function (a) {
                    return a.$$state ? a.$$state.status === k.IN_PROGRESS : a.hasOwnProperty("$$v") ? void 0 : !0
                }, h = function (a) {
                    return a.$$state ? a.$$state.status === k.RESOLVED : a.hasOwnProperty("$$v") ? !0 : void 0
                }, j = function (a) {
                    return n[a] || "done w error"
                }, d = function (b) {
                    var c, d, e;
                    return c = a.defer(), d = a.all([b, c.promise]), e = a.defer(), b.then(c.resolve, function () {}, function (a) {
                        return c.notify(a), e.notify(a)
                    }), d.then(function (a) {
                        return e.resolve(a[0] || a[1])
                    }, function (a) {
                        return e.reject(a)
                    }), e.promise.cancel = function (a) {
                        return null == a && (a = "canceled"), c.reject(a)
                    }, e.promise.notify = function (a) {
                        return null == a && (a = "cancel safe"), e.notify(a), b.hasOwnProperty("notify") ? b.notify(a) : void 0
                    }, null != b.promiseType && (e.promise.promiseType = b.promiseType), e.promise
                }, e = function (a, b) {
                    return {
                        promise: a,
                        promiseType: b
                    }
                }, f = function () {
                    return a.defer()
                }, m = function () {
                    var b;
                    return b = a.defer(), b.resolve.apply(void 0, arguments), b.promise
                }, i = function (d) {
                    var e;
                    return _.isFunction(d) ? (e = a.defer(), b(function () {
                        var a;
                        return a = d(), e.resolve(a)
                    }), e.promise) : void c.error("uiGmapPromise.promise() only accepts functions")
                }, {
                    defer: f,
                    promise: i,
                    resolve: m,
                    promiseTypes: l,
                    isInProgress: g,
                    isResolved: h,
                    promiseStatus: j,
                    ExposedPromise: d,
                    SniffedPromise: e
                }
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        };
        b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropMap", function () {
            var b;
            return b = function () {
                function b() {
                    this.removeAll = a(this.removeAll, this), this.slice = a(this.slice, this), this.push = a(this.push, this), this.keys = a(this.keys, this), this.values = a(this.values, this), this.remove = a(this.remove, this), this.put = a(this.put, this), this.stateChanged = a(this.stateChanged, this), this.get = a(this.get, this), this.length = 0, this.dict = {}, this.didValsStateChange = !1, this.didKeysStateChange = !1, this.allVals = [], this.allKeys = []
                }
                return b.prototype.get = function (a) {
                    return this.dict[a]
                }, b.prototype.stateChanged = function () {
                    return this.didValsStateChange = !0, this.didKeysStateChange = !0
                }, b.prototype.put = function (a, b) {
                    return null == this.get(a) && this.length++, this.stateChanged(), this.dict[a] = b
                }, b.prototype.remove = function (a, b) {
                    var c;
                    return null == b && (b = !1), b && !this.get(a) ? void 0 : (c = this.dict[a], delete this.dict[a], this.length--, this.stateChanged(), c)
                }, b.prototype.valuesOrKeys = function (a) {
                    var b, c;
                    return null == a && (a = "Keys"), this["did" + a + "StateChange"] ? (c = [], b = [], _.each(this.dict, function (a, d) {
                        return c.push(a), b.push(d)
                    }), this.didKeysStateChange = !1, this.didValsStateChange = !1, this.allVals = c, this.allKeys = b, this["all" + a]) : this["all" + a]
                }, b.prototype.values = function () {
                    return this.valuesOrKeys("Vals")
                }, b.prototype.keys = function () {
                    return this.valuesOrKeys()
                }, b.prototype.push = function (a, b) {
                    return null == b && (b = "key"), this.put(a[b], a)
                }, b.prototype.slice = function () {
                    return this.keys().map(function (a) {
                        return function (b) {
                            return a.remove(b)
                        }
                    }(this))
                }, b.prototype.removeAll = function () {
                    return this.slice()
                }, b.prototype.each = function (a) {
                    return _.each(this.dict, function (b) {
                        return a(b)
                    })
                }, b.prototype.map = function (a) {
                    return _.map(this.dict, function (b) {
                        return a(b)
                    })
                }, b
            }()
        })
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropertyAction", ["uiGmapLogger",
            function () {
                var a;
                return a = function (a) {
                    return this.setIfChange = function (b, c) {
                        var d;
                        return d = this.exp, _.isEqual(c, b) ? void 0 : a(d, b)
                    }, this.sic = this.setIfChange, this
                }
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        };
        b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapClustererMarkerManager", ["uiGmapLogger", "uiGmapFitHelper", "uiGmapPropMap",
            function (c, d, e) {
                var f;
                return f = function () {
                    function f(b, d, g, h) {
                        null == d && (d = {}), this.opt_options = null != g ? g : {}, this.opt_events = h, this.checkSync = a(this.checkSync, this), this.getGMarkers = a(this.getGMarkers, this), this.fit = a(this.fit, this), this.destroy = a(this.destroy, this), this.clear = a(this.clear, this), this.draw = a(this.draw, this), this.removeMany = a(this.removeMany, this), this.remove = a(this.remove, this), this.addMany = a(this.addMany, this), this.update = a(this.update, this), this.add = a(this.add, this), this.type = f.type, this.clusterer = new NgMapMarkerClusterer(b, d, this.opt_options), this.propMapGMarkers = new e, this.attachEvents(this.opt_events, "opt_events"), this.clusterer.setIgnoreHidden(!0), this.noDrawOnSingleAddRemoves = !0, c.info(this)
                    }
                    return f.type = "ClustererMarkerManager", f.prototype.checkKey = function (a) {
                        var b;
                        return null == a.key ? (b = "gMarker.key undefined and it is REQUIRED!!", c.error(b)) : void 0
                    }, f.prototype.add = function (a) {
                        return this.checkKey(a), this.clusterer.addMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.put(a.key, a), this.checkSync()
                    }, f.prototype.update = function (a) {
                        return this.remove(a), this.add(a)
                    }, f.prototype.addMany = function (a) {
                        return a.forEach(function (a) {
                            return function (b) {
                                return a.add(b)
                            }
                        }(this))
                    }, f.prototype.remove = function (a) {
                        var b;
                        return this.checkKey(a), b = this.propMapGMarkers.get(a.key), b && (this.clusterer.removeMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.remove(a.key)), this.checkSync()
                    }, f.prototype.removeMany = function (a) {
                        return a.forEach(function (a) {
                            return function (b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, f.prototype.draw = function () {
                        return this.clusterer.repaint()
                    }, f.prototype.clear = function () {
                        return this.removeMany(this.getGMarkers()), this.clusterer.repaint()
                    }, f.prototype.attachEvents = function (a, d) {
                        var e, f, g;
                        if (b.isDefined(a) && null != a && b.isObject(a)) {
                            g = [];
                            for (f in a) e = a[f], a.hasOwnProperty(f) && b.isFunction(a[f]) ? (c.info(d + ": Attaching event: " + f + " to clusterer"), g.push(google.maps.event.addListener(this.clusterer, f, a[f]))) : g.push(void 0);
                            return g
                        }
                    }, f.prototype.clearEvents = function (a, d) {
                        var e, f, g;
                        if (b.isDefined(a) && null != a && b.isObject(a)) {
                            g = [];
                            for (f in a) e = a[f], a.hasOwnProperty(f) && b.isFunction(a[f]) ? (c.info(d + ": Clearing event: " + f + " to clusterer"), g.push(google.maps.event.clearListeners(this.clusterer, f))) : g.push(void 0);
                            return g
                        }
                    }, f.prototype.destroy = function () {
                        return this.clearEvents(this.opt_events, "opt_events"), this.clear()
                    }, f.prototype.fit = function () {
                        return d.fit(this.getGMarkers(), this.clusterer.getMap())
                    }, f.prototype.getGMarkers = function () {
                        return this.clusterer.getMarkers().values()
                    }, f.prototype.checkSync = function () {}, f
                }()
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        };
        b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapMarkerManager", ["uiGmapLogger", "uiGmapFitHelper", "uiGmapPropMap",
            function (b, c, d) {
                var e;
                return e = function () {
                    function e(c) {
                        this.getGMarkers = a(this.getGMarkers, this), this.fit = a(this.fit, this), this.handleOptDraw = a(this.handleOptDraw, this), this.clear = a(this.clear, this), this.draw = a(this.draw, this), this.removeMany = a(this.removeMany, this), this.remove = a(this.remove, this), this.addMany = a(this.addMany, this), this.update = a(this.update, this), this.add = a(this.add, this), this.type = e.type, this.gMap = c, this.gMarkers = new d, this.$log = b, this.$log.info(this)
                    }
                    return e.type = "MarkerManager", e.prototype.add = function (a, c) {
                        var d, e;
                        if (null == c && (c = !0), null == a.key) throw e = "gMarker.key undefined and it is REQUIRED!!", b.error(e), e;
                        return d = this.gMarkers.get(a.key), d ? void 0 : (this.handleOptDraw(a, c, !0), this.gMarkers.put(a.key, a))
                    }, e.prototype.update = function (a, b) {
                        return null == b && (b = !0), this.remove(a, b), this.add(a, b)
                    }, e.prototype.addMany = function (a) {
                        return a.forEach(function (a) {
                            return function (b) {
                                return a.add(b)
                            }
                        }(this))
                    }, e.prototype.remove = function (a, b) {
                        return null == b && (b = !0), this.handleOptDraw(a, b, !1), this.gMarkers.get(a.key) ? this.gMarkers.remove(a.key) : void 0
                    }, e.prototype.removeMany = function (a) {
                        return a.forEach(function (a) {
                            return function (b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, e.prototype.draw = function () {
                        var a;
                        return a = [], this.gMarkers.each(function (b) {
                            return function (c) {
                                return c.isDrawn ? void 0 : c.doAdd ? (c.setMap(b.gMap), c.isDrawn = !0) : a.push(c)
                            }
                        }(this)), a.forEach(function (a) {
                            return function (b) {
                                return b.isDrawn = !1, a.remove(b, !0)
                            }
                        }(this))
                    }, e.prototype.clear = function () {
                        return this.gMarkers.each(function (a) {
                            return a.setMap(null)
                        }), delete this.gMarkers, this.gMarkers = new d
                    }, e.prototype.handleOptDraw = function (a, b, c) {
                        return b === !0 ? (a.setMap(c ? this.gMap : null), a.isDrawn = !0) : (a.isDrawn = !1, a.doAdd = c)
                    }, e.prototype.fit = function () {
                        return c.fit(this.getGMarkers(), this.gMap)
                    }, e.prototype.getGMarkers = function () {
                        return this.gMarkers.values()
                    }, e
                }()
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").factory("uiGmapadd-events", ["$timeout",
            function (a) {
                var c, d;
                return c = function (b, c, d) {
                    return google.maps.event.addListener(b, c, function () {
                        return d.apply(this, arguments), a(function () {}, !0)
                    })
                }, d = function (a, d, e) {
                    var f;
                    return e ? c(a, d, e) : (f = [], b.forEach(d, function (b, d) {
                        return f.push(c(a, d, b))
                    }), function () {
                        return b.forEach(f, function (a) {
                            return google.maps.event.removeListener(a)
                        }), f = null
                    })
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").factory("uiGmaparray-sync", ["uiGmapadd-events",
            function (a) {
                return function (c, d, e, f) {
                    var g, h, i, j, k, l, m, n, o;
                    return j = !1, n = d.$eval(e), d["static"] || (k = {
                            set_at: function (a) {
                                var b;
                                if (!j && (b = c.getAt(a))) return b.lng && b.lat ? (n[a].latitude = b.lat(), n[a].longitude = b.lng()) : n[a] = b
                            },
                            insert_at: function (a) {
                                var b;
                                if (!j && (b = c.getAt(a))) return b.lng && b.lat ? n.splice(a, 0, {
                                    latitude: b.lat(),
                                    longitude: b.lng()
                                }) : n.splice(a, 0, b)
                            },
                            remove_at: function (a) {
                                return j ? void 0 : n.splice(a, 1)
                            }
                        }, "Polygon" === n.type ? g = n.coordinates[0] : "LineString" === n.type && (g = n.coordinates), h = {
                            set_at: function (a) {
                                var b;
                                if (!j && (b = c.getAt(a), b && b.lng && b.lat)) return g[a][1] = b.lat(), g[a][0] = b.lng()
                            },
                            insert_at: function (a) {
                                var b;
                                if (!j && (b = c.getAt(a), b && b.lng && b.lat)) return g.splice(a, 0, [b.lng(), b.lat()])
                            },
                            remove_at: function (a) {
                                return j ? void 0 : g.splice(a, 1)
                            }
                        }, m = a(c, b.isUndefined(n.type) ? k : h)), l = function (a) {
                            var b, d, e, g, h, i, k, l;
                            if (j = !0, i = c, b = !1, a) {
                                for (d = 0, k = i.getLength(), g = a.length, e = Math.min(k, g), h = void 0; e > d;) l = i.getAt(d), h = a[d], "function" == typeof h.equals ? h.equals(l) || (i.setAt(d, h), b = !0) : (l.lat() !== h.latitude || l.lng() !== h.longitude) && (i.setAt(d, new google.maps.LatLng(h.latitude, h.longitude)), b = !0), d++;
                                for (; g > d;) h = a[d], i.push("function" == typeof h.lat && "function" == typeof h.lng ? h : new google.maps.LatLng(h.latitude, h.longitude)), b = !0, d++;
                                for (; k > d;) i.pop(), b = !0, d++
                            }
                            return j = !1, b ? f(i) : void 0
                        }, i = function (a) {
                            var b, d, e, g, h, i, k, l, m;
                            if (j = !0, k = c, d = !1, a) {
                                for ("Polygon" === n.type ? b = a.coordinates[0] : "LineString" === n.type && (b = a.coordinates), e = 0, l = k.getLength(), h = b.length, g = Math.min(l, h), i = void 0; g > e;) m = k.getAt(e), i = b[e], (m.lat() !== i[1] || m.lng() !== i[0]) && (k.setAt(e, new google.maps.LatLng(i[1], i[0])),
                                    d = !0), e++;
                                for (; h > e;) i = b[e], k.push(new google.maps.LatLng(i[1], i[0])), d = !0, e++;
                                for (; l > e;) k.pop(), d = !0, e++
                            }
                            return j = !1, d ? f(k) : void 0
                        }, d["static"] || (o = b.isUndefined(n.type) ? d.$watchCollection(e, l) : d.$watch(e, i, !0)),
                        function () {
                            return m && (m(), m = null), o ? (o(), o = null) : void 0
                        }
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChromeFixes", ["$timeout",
            function (a) {
                return {
                    maybeRepaint: function (b) {
                        return b ? (b.style.opacity = .9, a(function () {
                            return b.style.opacity = 1
                        })) : void 0
                    }
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").service("uiGmapObjectIterators", function () {
            var a, b, c, d;
            return a = ["length", "forEach", "map"], b = [], c = function (b) {
                return b.forEach = function (c) {
                    return _.each(_.omit(b, a), function (a) {
                        return _.isFunction(a) ? void 0 : c(a)
                    })
                }, b
            }, b.push(c), d = function (b) {
                return b.map = function (c) {
                    return _.map(_.omit(b, a), function (a) {
                        return _.isFunction(a) ? void 0 : c(a)
                    })
                }, b
            }, b.push(d), {
                slapMap: d,
                slapForEach: c,
                slapAll: function (a) {
                    return b.forEach(function (b) {
                        return b(a)
                    }), a
                }
            }
        })
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.options.builders").service("uiGmapCommonOptionsBuilder", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapModelKey",
            function (d, e, f) {
                var g;
                return g = function (d) {
                    function f() {
                        return this.watchProps = a(this.watchProps, this), this.buildOpts = a(this.buildOpts, this), f.__super__.constructor.apply(this, arguments)
                    }
                    return c(f, d), f.prototype.props = ["clickable", "draggable", "editable", "visible", {
                        prop: "stroke",
                        isColl: !0
                    }], f.prototype.getCorrectModel = function (a) {
                        return b.isDefined(null != a ? a.model : void 0) ? a.model : a
                    }, f.prototype.buildOpts = function (a, c, d) {
                        var f, g, h;
                        return null == a && (a = {}), null == d && (d = {}), this.scope ? this.map ? (f = this.getCorrectModel(this.scope), h = this.scopeOrModelVal("stroke", this.scope, f), g = b.extend(a, this.DEFAULTS, {
                            map: this.map,
                            strokeColor: null != h ? h.color : void 0,
                            strokeOpacity: null != h ? h.opacity : void 0,
                            strokeWeight: null != h ? h.weight : void 0
                        }), b.forEach(b.extend(d, {
                            clickable: !0,
                            draggable: !1,
                            editable: !1,
                            "static": !1,
                            fit: !1,
                            visible: !0,
                            zIndex: 0,
                            icons: []
                        }), function (a) {
                            return function (d, e) {
                                var h;
                                return h = c ? c[e] : a.scopeOrModelVal(e, a.scope, f), g[e] = b.isUndefined(h) ? d : f[e]
                            }
                        }(this)), g["static"] && (g.editable = !1), g) : void e.error("this.map not defined in CommonOptionsBuilder can not buildOpts") : void e.error("this.scope not defined in CommonOptionsBuilder can not buildOpts")
                    }, f.prototype.watchProps = function (a) {
                        return null == a && (a = this.props), a.forEach(function (a) {
                            return function (b) {
                                return null != a.attrs[b] || null != a.attrs[null != b ? b.prop : void 0] ? (null != b ? b.isColl : void 0) ? a.scope.$watchCollection(b.prop, a.setMyOptions) : a.scope.$watch(b, a.setMyOptions) : void 0
                            }
                        }(this))
                    }, f
                }(f)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.options.builders").factory("uiGmapPolylineOptionsBuilder", ["uiGmapCommonOptionsBuilder",
            function (b) {
                var c;
                return c = function (b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function (a, b) {
                        return c.__super__.buildOpts.call(this, {
                            path: a
                        }, b, {
                            geodesic: !1
                        })
                    }, c
                }(b)
            }]).factory("uiGmapShapeOptionsBuilder", ["uiGmapCommonOptionsBuilder",
            function (c) {
                var d;
                return d = function (c) {
                    function d() {
                        return d.__super__.constructor.apply(this, arguments)
                    }
                    return a(d, c), d.prototype.buildOpts = function (a, c, e) {
                        var f, g;
                        return g = this.getCorrectModel(this.scope), f = c ? c.fill : this.scopeOrModelVal("fill", this.scope, g), a = b.extend(a, {
                            fillColor: null != f ? f.color : void 0,
                            fillOpacity: null != f ? f.opacity : void 0
                        }), d.__super__.buildOpts.call(this, a, c, e)
                    }, d
                }(c)
            }]).factory("uiGmapPolygonOptionsBuilder", ["uiGmapShapeOptionsBuilder",
            function (b) {
                var c;
                return c = function (b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function (a, b) {
                        return c.__super__.buildOpts.call(this, {
                            path: a
                        }, b, {
                            geodesic: !1
                        })
                    }, c
                }(b)
            }]).factory("uiGmapRectangleOptionsBuilder", ["uiGmapShapeOptionsBuilder",
            function (b) {
                var c;
                return c = function (b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function (a, b) {
                        return c.__super__.buildOpts.call(this, {
                            bounds: a
                        }, b)
                    }, c
                }(b)
            }]).factory("uiGmapCircleOptionsBuilder", ["uiGmapShapeOptionsBuilder",
            function (b) {
                var c;
                return c = function (b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function (a, b, d) {
                        return c.__super__.buildOpts.call(this, {
                            center: a,
                            radius: b
                        }, d)
                    }, c
                }(b)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.options").service("uiGmapMarkerOptions", ["uiGmapLogger", "uiGmapGmapUtil",
            function (a, c) {
                return _.extend(c, {
                    createOptions: function (a, d, e, f) {
                        var g;
                        return null == e && (e = {}), g = b.extend({}, e, {
                            position: null != e.position ? e.position : c.getCoords(a),
                            visible: null != e.visible ? e.visible : c.validateCoords(a)
                        }), (null != e.icon || null != d) && (g = b.extend(g, {
                            icon: null != e.icon ? e.icon : d
                        })), null != f && (g.map = f), g
                    },
                    isLabel: function (a) {
                        return null == a ? !1 : null != a.labelContent || null != a.labelAnchor || null != a.labelClass || null != a.labelStyle || null != a.labelVisible
                    }
                })
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapBasePolyChildModel", ["uiGmapLogger", "$timeout", "uiGmaparray-sync", "uiGmapGmapUtil", "uiGmapEventsHelper",
            function (d, e, f, g, h) {
                return function (d, e) {
                    var i;
                    return i = function (d) {
                        function i(c, d, g, i, j) {
                            var k;
                            this.scope = c, this.attrs = d, this.map = g, this.defaults = i, this.model = j, this.clean = a(this.clean, this), this.clonedModel = _.clone(this.model, !0), this.isDragging = !1, this.internalEvents = {
                                dragend: function (a) {
                                    return function () {
                                        return _.defer(function () {
                                            return a.isDragging = !1
                                        })
                                    }
                                }(this),
                                dragstart: function (a) {
                                    return function () {
                                        return a.isDragging = !0
                                    }
                                }(this)
                            }, k = function (a) {
                                return function () {
                                    var c, d;
                                    if (!a.isDragging) return d = a.convertPathPoints(a.scope.path), null != a.gObject && a.clean(), null != a.scope.model && (c = a.scope), d.length > 0 && (a.gObject = e(a.buildOpts(d, c))), a.gObject ? (a.scope.fit && a.extendMapBounds(map, d), f(a.gObject.getPath(), a.scope, "path", function (b) {
                                        return a.scope.fit ? a.extendMapBounds(map, b) : void 0
                                    }), b.isDefined(a.scope.events) && b.isObject(a.scope.events) && (a.listeners = a.model ? h.setEvents(a.gObject, a.scope, a.model) : h.setEvents(a.gObject, a.scope, a.scope)), a.internalListeners = a.model ? h.setEvents(a.gObject, {
                                        events: a.internalEvents
                                    }, a.model) : h.setEvents(a.gObject, {
                                        events: a.internalEvents
                                    }, a.scope)) : void 0
                                }
                            }(this), k(), this.scope.$watch("path", function (a) {
                                return function (b, c) {
                                    return _.isEqual(b, c) && a.gObject ? void 0 : k()
                                }
                            }(this), !0), !this.scope["static"] && b.isDefined(this.scope.editable) && this.scope.$watch("editable", function (a) {
                                return function (b, c) {
                                    var d;
                                    return b !== c ? (b = !a.isFalse(b), null != (d = a.gObject) ? d.setEditable(b) : void 0) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.draggable) && this.scope.$watch("draggable", function (a) {
                                return function (b, c) {
                                    var d;
                                    return b !== c ? (b = !a.isFalse(b), null != (d = a.gObject) ? d.setDraggable(b) : void 0) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.visible) && this.scope.$watch("visible", function (a) {
                                return function (b, c) {
                                    var d;
                                    return b !== c && (b = !a.isFalse(b)), null != (d = a.gObject) ? d.setVisible(b) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.geodesic) && this.scope.$watch("geodesic", function (a) {
                                return function (b, c) {
                                    var d;
                                    return b !== c ? (b = !a.isFalse(b), null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.stroke) && b.isDefined(this.scope.stroke.weight) && this.scope.$watch("stroke.weight", function (a) {
                                return function (b, c) {
                                    var d;
                                    return b !== c && null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.stroke) && b.isDefined(this.scope.stroke.color) && this.scope.$watch("stroke.color", function (a) {
                                return function (b, c) {
                                    var d;
                                    return b !== c && null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.stroke) && b.isDefined(this.scope.stroke.opacity) && this.scope.$watch("stroke.opacity", function (a) {
                                return function (b, c) {
                                    var d;
                                    return b !== c && null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.icons) && this.scope.$watch("icons", function (a) {
                                return function (b, c) {
                                    var d;
                                    return b !== c && null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), this.scope.$on("$destroy", function (a) {
                                return function () {
                                    return a.clean(), a.scope = null
                                }
                            }(this)), b.isDefined(this.scope.fill) && b.isDefined(this.scope.fill.color) && this.scope.$watch("fill.color", function (a) {
                                return function (b, c) {
                                    return b !== c ? a.gObject.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this)), b.isDefined(this.scope.fill) && b.isDefined(this.scope.fill.opacity) && this.scope.$watch("fill.opacity", function (a) {
                                return function (b, c) {
                                    return b !== c ? a.gObject.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this)), b.isDefined(this.scope.zIndex) && this.scope.$watch("zIndex", function (a) {
                                return function (b, c) {
                                    return b !== c ? a.gObject.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this))
                        }
                        return c(i, d), i.include(g), i.prototype.clean = function () {
                            var a;
                            return h.removeEvents(this.listeners), h.removeEvents(this.internalListeners), null != (a = this.gObject) && a.setMap(null), this.gObject = null
                        }, i
                    }(d)
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapDrawFreeHandChildModel", ["uiGmapLogger", "$q",
            function (a, b) {
                var c, d;
                return c = function (a, b, c) {
                    var d, e;
                    return e = new google.maps.Polyline({
                        map: a,
                        clickable: !1
                    }), d = google.maps.event.addListener(a, "mousemove", function (a) {
                        return e.getPath().push(a.latLng)
                    }), void google.maps.event.addListenerOnce(a, "mouseup", function () {
                        var f;
                        return google.maps.event.removeListener(d), f = e.getPath(), e.setMap(null), b.push(new google.maps.Polygon({
                            map: a,
                            path: f
                        })), e = null, google.maps.event.clearListeners(a.getDiv(), "mousedown"), c()
                    })
                }, d = function (d, e) {
                    var f, g;
                    return this.map = d, e || (e = {
                        draggable: !0,
                        zoomControl: !0,
                        scrollwheel: !0,
                        disableDoubleClickZoom: !0
                    }), g = function (a) {
                        return function () {
                            var b;
                            return null != (b = a.deferred) && b.resolve(), _.defer(function () {
                                return a.map.setOptions(_.extend(a.oldOptions, e))
                            })
                        }
                    }(this), f = function (b) {
                        return function () {
                            return a.info("disabling map move"), b.oldOptions = map.getOptions(), b.oldOptions.center = map.getCenter(), b.map.setOptions({
                                draggable: !1,
                                zoomControl: !1,
                                scrollwheel: !1,
                                disableDoubleClickZoom: !1
                            })
                        }
                    }(this), this.engage = function (d) {
                        return function (e) {
                            return d.polys = e, d.deferred = b.defer(), f(), a.info("DrawFreeHandChildModel is engaged (drawing)."), google.maps.event.addDomListener(d.map.getDiv(), "mousedown", function () {
                                return c(d.map, d.polys, g)
                            }), d.deferred.promise
                        }
                    }(this), this
                }
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapMarkerChildModel", ["uiGmapModelKey", "uiGmapGmapUtil", "uiGmapLogger", "uiGmapEventsHelper", "uiGmapPropertyAction", "uiGmapMarkerOptions", "uiGmapIMarker", "uiGmapMarkerManager", "uiGmapPromise",
            function (b, d, e, f, g, h, i, j, k) {
                var l;
                return l = function (b) {
                    function l(b, c, d, f, h, i, j, n, o, p) {
                        var q;
                        this.model = c, this.keys = d, this.gMap = f, this.defaults = h, this.doClick = i, this.gManager = j, this.doDrawSelf = null != n ? n : !0, this.trackModel = null != o ? o : !0, this.needRedraw = null != p ? p : !1, this.internalEvents = a(this.internalEvents, this), this.setLabelOptions = a(this.setLabelOptions, this), this.setOptions = a(this.setOptions, this), this.setIcon = a(this.setIcon, this), this.setCoords = a(this.setCoords, this), this.isNotValid = a(this.isNotValid, this), this.maybeSetScopeValue = a(this.maybeSetScopeValue, this), this.createMarker = a(this.createMarker, this), this.setMyScope = a(this.setMyScope, this), this.updateModel = a(this.updateModel, this), this.handleModelChanges = a(this.handleModelChanges, this), this.destroy = a(this.destroy, this), this.clonedModel = _.extend({}, this.model), this.deferred = k.defer(), _.each(this.keys, function (a) {
                            return function (b, c) {
                                return a[c + "Key"] = _.isFunction(a.keys[c]) ? a.keys[c]() : a.keys[c]
                            }
                        }(this)), this.idKey = this.idKeyKey || "id", null != this.model[this.idKey] && (this.id = this.model[this.idKey]), l.__super__.constructor.call(this, b), this.scope.getGMarker = function (a) {
                            return function () {
                                return a.gObject
                            }
                        }(this), this.firstTime = !0, this.trackModel ? (this.scope.model = this.model, this.scope.$watch("model", function (a) {
                            return function (b, c) {
                                return b !== c ? a.handleModelChanges(b, c) : void 0
                            }
                        }(this), !0)) : (q = new g(function (a) {
                            return function (c) {
                                return a.firstTime ? void 0 : a.setMyScope(c, b)
                            }
                        }(this), !1), _.each(this.keys, function (a, c) {
                            return b.$watch(c, q.sic, !0)
                        })), this.scope.$on("$destroy", function (a) {
                            return function () {
                                return m(a)
                            }
                        }(this)), this.createMarker(this.model), e.info(this)
                    }
                    var m;
                    return c(l, b), l.include(d), l.include(f), l.include(h), m = function (a) {
                        return null != (null != a ? a.gObject : void 0) && (a.removeEvents(a.externalListeners), a.removeEvents(a.internalListeners), null != a ? a.gObject : void 0) ? (a.removeFromManager && a.gManager.remove(a.gObject), a.gObject.setMap(null), a.gObject = null) : void 0
                    }, l.prototype.destroy = function (a) {
                        return null == a && (a = !0), this.removeFromManager = a, this.scope.$destroy()
                    }, l.prototype.handleModelChanges = function (a, b) {
                        var c, d, e;
                        return c = this.getChanges(a, b, i.keys), this.firstTime ? void 0 : (d = 0, e = _.keys(c).length, _.each(c, function (c) {
                            return function (f, g) {
                                var h;
                                return d += 1, h = e === d, c.setMyScope(g, a, b, !1, !0, h), c.needRedraw = !0
                            }
                        }(this)))
                    }, l.prototype.updateModel = function (a) {
                        return this.clonedModel = _.extend({}, a), this.setMyScope("all", a, this.model)
                    }, l.prototype.renderGMarker = function (a, b) {
                        var c;
                        if (null == a && (a = !0), c = this.getProp(this.coordsKey, this.model), null != c) {
                            if (!this.validateCoords(c)) return void e.debug("MarkerChild does not have coords yet. They may be defined later.");
                            if (null != b && b(), a && this.gObject) return this.gManager.add(this.gObject)
                        } else if (a && this.gObject) return this.gManager.remove(this.gObject)
                    }, l.prototype.setMyScope = function (a, b, c, d, e) {
                        var f;
                        switch (null == c && (c = void 0), null == d && (d = !1), null == e && (e = !0), null == b ? b = this.model : this.model = b, this.gObject || (this.setOptions(this.scope, e), f = !0), a) {
                        case "all":
                            return _.each(this.keys, function (a) {
                                return function (f, g) {
                                    return a.setMyScope(g, b, c, d, e)
                                }
                            }(this));
                        case "icon":
                            return this.maybeSetScopeValue("icon", b, c, this.iconKey, this.evalModelHandle, d, this.setIcon, e);
                        case "coords":
                            return this.maybeSetScopeValue("coords", b, c, this.coordsKey, this.evalModelHandle, d, this.setCoords, e);
                        case "options":
                            if (!f) return this.createMarker(b, c, d, e)
                        }
                    }, l.prototype.createMarker = function (a, b, c, d) {
                        return null == b && (b = void 0), null == c && (c = !1), null == d && (d = !0), this.maybeSetScopeValue("options", a, b, this.optionsKey, this.evalModelHandle, c, this.setOptions, d), this.firstTime = !1
                    }, l.prototype.maybeSetScopeValue = function (a, b, c, d, e, f, g, h) {
                        return null == g && (g = void 0), null == h && (h = !0), null != g ? g(this.scope, h) : void 0
                    }, l.doDrawSelf && doDraw && l.gManager.draw(), l.prototype.isNotValid = function (a, b) {
                        var c, d;
                        return null == b && (b = !0), d = b ? void 0 === this.gObject : !1, c = this.trackModel ? !1 : a.$id !== this.scope.$id, c || d
                    }, l.prototype.setCoords = function (a, b) {
                        return null == b && (b = !0), this.isNotValid(a) || null == this.gObject ? void 0 : this.renderGMarker(b, function (a) {
                            return function () {
                                var b, c, d;
                                return c = a.getProp(a.coordsKey, a.model), b = a.getCoords(c), d = a.gObject.getPosition(), null == d || null == b || b.lng() !== d.lng() || b.lat() !== d.lat() ? (a.gObject.setPosition(b), a.gObject.setVisible(a.validateCoords(c))) : void 0
                            }
                        }(this))
                    }, l.prototype.setIcon = function (a, b) {
                        return null == b && (b = !0), this.isNotValid(a) || null == this.gObject ? void 0 : this.renderGMarker(b, function (a) {
                            return function () {
                                var b, c, d;
                                return d = a.gObject.getIcon(), c = a.getProp(a.iconKey, a.model), d !== c ? (a.gObject.setIcon(c), b = a.getProp(a.coordsKey, a.model), a.gObject.setPosition(a.getCoords(b)), a.gObject.setVisible(a.validateCoords(b))) : void 0
                            }
                        }(this))
                    }, l.prototype.setOptions = function (a, b) {
                        var c;
                        if (null == b && (b = !0), !this.isNotValid(a, !1)) {
                            if (this.renderGMarker(b, function (a) {
                                return function () {
                                    var b, c, d;
                                    return c = a.getProp(a.coordsKey, a.model), d = a.getProp(a.iconKey, a.model), b = a.getProp(a.optionsKey, a.model), a.opts = a.createOptions(c, d, b), a.isLabel(a.gObject) !== a.isLabel(a.opts) && null != a.gObject && (a.gManager.remove(a.gObject), a.gObject = void 0), null != a.gObject && a.gObject.setOptions(a.setLabelOptions(a.opts)), a.gObject || (a.gObject = a.isLabel(a.opts) ? new MarkerWithLabel(a.setLabelOptions(a.opts)) : new google.maps.Marker(a.opts), _.extend(a.gObject, {
                                        model: a.model
                                    })), a.externalListeners && a.removeEvents(a.externalListeners), a.internalListeners && a.removeEvents(a.internalListeners), a.externalListeners = a.setEvents(a.gObject, a.scope, a.model, ["dragend"]), a.internalListeners = a.setEvents(a.gObject, {
                                        events: a.internalEvents(),
                                        $evalAsync: function () {}
                                    }, a.model), null != a.id ? a.gObject.key = a.id : void 0
                                }
                            }(this)), this.gObject && (this.gObject.getMap() || this.gManager.type !== j.type)) this.deferred.resolve(this.gObject);
                            else {
                                if (!this.gObject) return this.deferred.reject("gObject is null");
                                (null != (c = this.gObject) ? c.getMap() : 0) && this.gManager.type === j.type || (e.debug("gObject has no map yet"), this.deferred.resolve(this.gObject))
                            }
                            return this.model[this.fitKey] ? this.gManager.fit() : void 0
                        }
                    }, l.prototype.setLabelOptions = function (a) {
                        return a.labelAnchor = this.getLabelPositionPoint(a.labelAnchor), a
                    }, l.prototype.internalEvents = function () {
                        return {
                            dragend: function (a) {
                                return function (b, c, d, e) {
                                    var f, g, h;
                                    return g = a.trackModel ? a.scope.model : a.model, h = a.setCoordsFromEvent(a.modelOrKey(g, a.coordsKey), a.gObject.getPosition()), g = a.setVal(d, a.coordsKey, h), f = a.scope.events, null != (null != f ? f.dragend : void 0) && f.dragend(b, c, g, e), a.scope.$apply()
                                }
                            }(this),
                            click: function (a) {
                                return function (b, c, d, e) {
                                    var f;
                                    return f = _.isFunction(a.clickKey) ? a.clickKey : a.getProp(a.clickKey, a.model), a.doClick && null != f ? a.scope.$evalAsync(f(b, c, a.model, e)) : void 0
                                }
                            }(this)
                        }
                    }, l
                }(b)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygonChildModel", ["uiGmapBasePolyChildModel", "uiGmapPolygonOptionsBuilder",
            function (b, c) {
                var d, e, f;
                return f = function (a) {
                    return new google.maps.Polygon(a)
                }, e = new b(c, f), d = function (b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c
                }(e)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolylineChildModel", ["uiGmapBasePolyChildModel", "uiGmapPolylineOptionsBuilder",
            function (b, c) {
                var d, e, f;
                return f = function (a) {
                    return new google.maps.Polyline(a)
                }, e = b(c, f), d = function (b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c
                }(e)
            }])
    }.call(this),
    function () {
        var c = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            d = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var d in b) e.call(b, d) && (a[d] = b[d]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            e = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapWindowChildModel", ["uiGmapBaseObject", "uiGmapGmapUtil", "uiGmapLogger", "$compile", "$http", "$templateCache", "uiGmapChromeFixes", "uiGmapEventsHelper",
            function (e, f, g, h, i, j, k, l) {
                var m;
                return m = function (e) {
                    function m(a, b, d, e, f, h, i, j, k) {
                        var l;
                        this.model = a, this.scope = b, this.opts = d, this.isIconVisibleOnClick = e, this.mapCtrl = f, this.markerScope = h, this.element = i, this.needToManualDestroy = null != j ? j : !1, this.markerIsVisibleAfterWindowClose = null != k ? k : !0, this.updateModel = c(this.updateModel, this), this.destroy = c(this.destroy, this), this.remove = c(this.remove, this), this.getLatestPosition = c(this.getLatestPosition, this), this.hideWindow = c(this.hideWindow, this), this.showWindow = c(this.showWindow, this), this.handleClick = c(this.handleClick, this), this.watchOptions = c(this.watchOptions, this), this.watchCoords = c(this.watchCoords, this), this.createGWin = c(this.createGWin, this), this.watchElement = c(this.watchElement, this), this.watchAndDoShow = c(this.watchAndDoShow, this), this.doShow = c(this.doShow, this), this.clonedModel = _.clone(this.model, !0), this.getGmarker = function () {
                            var a, b;
                            return null != (null != (a = this.markerScope) ? a.getGMarker : void 0) && null != (b = this.markerScope) ? b.getGMarker() : void 0
                        }, this.listeners = [], this.createGWin(), l = this.getGmarker(), null != l && l.setClickable(!0), this.watchElement(), this.watchOptions(), this.watchCoords(), this.watchAndDoShow(), this.scope.$on("$destroy", function (a) {
                            return function () {
                                return a.destroy()
                            }
                        }(this)), g.info(this)
                    }
                    return d(m, e), m.include(f), m.include(l), m.prototype.doShow = function (a) {
                        return this.scope.show === !0 || a ? this.showWindow() : this.hideWindow()
                    }, m.prototype.watchAndDoShow = function () {
                        return null != this.model.show && (this.scope.show = this.model.show), this.scope.$watch("show", this.doShow, !0), this.doShow()
                    }, m.prototype.watchElement = function () {
                        return this.scope.$watch(function (a) {
                            return function () {
                                var b, c;
                                if (a.element || a.html) return a.html !== a.element.html() && a.gObject ? (null != (b = a.opts) && (b.content = void 0), c = a.gObject.isOpen(), a.remove(), a.createGWin(c)) : void 0
                            }
                        }(this))
                    }, m.prototype.createGWin = function (b) {
                        var c, d, e, f, g;
                        return null == b && (b = !1), e = this.getGmarker(), d = {}, null != this.opts && (this.scope.coords && (this.opts.position = this.getCoords(this.scope.coords)), d = this.opts), this.element && (this.html = _.isObject(this.element) ? this.element.html() : this.element), c = this.scope.options ? this.scope.options : d, this.opts = this.createWindowOptions(e, this.markerScope || this.scope, this.html, c), null != this.opts ? (this.gObject || (this.gObject = this.opts.boxClass && a.InfoBox && "function" == typeof a.InfoBox ? new a.InfoBox(this.opts) : new google.maps.InfoWindow(this.opts), this.listeners.push(google.maps.event.addListener(this.gObject, "domready", function () {
                            return k.maybeRepaint(this.content)
                        })), this.listeners.push(google.maps.event.addListener(this.gObject, "closeclick", function (a) {
                            return function () {
                                return e && (e.setAnimation(a.oldMarkerAnimation), a.markerIsVisibleAfterWindowClose && _.delay(function () {
                                    return e.setVisible(!1), e.setVisible(a.markerIsVisibleAfterWindowClose)
                                }, 250)), a.gObject.close(), a.model.show = !1, null != a.scope.closeClick ? a.scope.$evalAsync(a.scope.closeClick()) : a.scope.$evalAsync()
                            }
                        }(this)))), this.gObject.setContent(this.opts.content), this.handleClick((null != (f = this.scope) && null != (g = f.options) ? g.forceClick : void 0) || b), this.doShow(this.gObject.isOpen())) : void 0
                    }, m.prototype.watchCoords = function () {
                        var a;
                        return a = null != this.markerScope ? this.markerScope : this.scope, a.$watch("coords", function (a) {
                            return function (b, c) {
                                var d;
                                if (b !== c) {
                                    if (null == b) a.hideWindow();
                                    else if (!a.validateCoords(b)) return void g.error("WindowChildMarker cannot render marker as scope.coords as no position on marker: " + JSON.stringify(a.model));
                                    if (d = a.getCoords(b), a.gObject.setPosition(d), a.opts) return a.opts.position = d
                                }
                            }
                        }(this), !0)
                    }, m.prototype.watchOptions = function () {
                        return this.scope.$watch("options", function (a) {
                            return function (b, c) {
                                if (b !== c && (a.opts = b, null != a.gObject)) {
                                    if (a.gObject.setOptions(a.opts), null != a.opts.visible && a.opts.visible) return a.showWindow();
                                    if (null != a.opts.visible) return a.hideWindow()
                                }
                            }
                        }(this), !0)
                    }, m.prototype.handleClick = function (a) {
                        var b, c;
                        if (null != this.gObject) return c = this.getGmarker(), b = function (a) {
                            return function () {
                                return null == a.gObject && a.createGWin(), a.showWindow(), null != c ? (a.initialMarkerVisibility = c.getVisible(), a.oldMarkerAnimation = c.getAnimation(), c.setVisible(a.isIconVisibleOnClick)) : void 0
                            }
                        }(this), a && b(), c ? this.listeners = this.listeners.concat(this.setEvents(c, {
                            events: {
                                click: b
                            }
                        }, this.model)) : void 0
                    }, m.prototype.showWindow = function () {
                        var a, c, d;
                        return null != this.gObject ? (c = function (a) {
                            return function () {
                                var b, c, d;
                                if (!a.gObject.isOpen()) {
                                    if (c = a.getGmarker(), null != a.gObject && null != a.gObject.getPosition && (d = a.gObject.getPosition()), c && (d = c.getPosition()), !d) return;
                                    if (a.gObject.open(a.mapCtrl, c), b = a.gObject.isOpen(), a.model.show !== b) return a.model.show = b
                                }
                            }
                        }(this), this.scope.templateUrl ? i.get(this.scope.templateUrl, {
                            cache: j
                        }).then(function (a) {
                            return function (d) {
                                var e, f;
                                return f = a.scope.$new(), b.isDefined(a.scope.templateParameter) && (f.parameter = a.scope.templateParameter), e = h(d.data)(f), a.gObject.setContent(e[0]), c()
                            }
                        }(this)) : this.scope.template ? (d = this.scope.$new(), b.isDefined(this.scope.templateParameter) && (d.parameter = this.scope.templateParameter), a = h(this.scope.template)(d), this.gObject.setContent(a[0]), c()) : c()) : void 0
                    }, m.prototype.hideWindow = function () {
                        return null != this.gObject && this.gObject.isOpen() ? this.gObject.close() : void 0
                    }, m.prototype.getLatestPosition = function (a) {
                        var b;
                        return b = this.getGmarker(), null == this.gObject || null == b || a ? a ? this.gObject.setPosition(a) : void 0 : this.gObject.setPosition(b.getPosition())
                    }, m.prototype.remove = function () {
                        return this.hideWindow(), this.removeEvents(this.listeners), this.listeners.length = 0, delete this.gObject, delete this.opts
                    }, m.prototype.destroy = function (a) {
                        var b;
                        return null == a && (a = !1), this.remove(), null == this.scope || (null != (b = this.scope) ? b.$$destroyed : void 0) || !this.needToManualDestroy && !a ? void 0 : this.scope.$destroy()
                    }, m.prototype.updateModel = function (a) {
                        return this.clonedModel = _.extend({}, a), _.extend(this.model, this.clonedModel)
                    }, m
                }(e)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapBasePolysParentModel", ["$timeout", "uiGmapLogger", "uiGmapModelKey", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmap_async", "uiGmapPromise",
            function (d, e, f, g, h, i, j) {
                return function (d, k, l) {
                    var m;
                    return m = function (f) {
                        function m(b, c, f, g, i) {
                            this.element = c, this.attrs = f, this.gMap = g, this.defaults = i, this.createChild = a(this.createChild, this), this.pieceMeal = a(this.pieceMeal, this), this.createAllNew = a(this.createAllNew, this), this.watchIdKey = a(this.watchIdKey, this), this.createChildScopes = a(this.createChildScopes, this), this.watchDestroy = a(this.watchDestroy, this), this.onDestroy = a(this.onDestroy, this), this.rebuildAll = a(this.rebuildAll, this), this.doINeedToWipe = a(this.doINeedToWipe, this), this.watchModels = a(this.watchModels, this), m.__super__.constructor.call(this, b), this["interface"] = d, this.$log = e, this.plurals = new h, _.each(d.scopeKeys, function (a) {
                                return function (b) {
                                    return a[b + "Key"] = void 0
                                }
                            }(this)), this.models = void 0, this.firstTime = !0, this.$log.info(this), this.createChildScopes()
                        }
                        return c(m, f), m.include(g), m.prototype.watchModels = function (a) {
                            return a.$watchCollection("models", function (b) {
                                return function (c, d) {
                                    return c !== d ? b.doINeedToWipe(c) || a.doRebuildAll ? b.rebuildAll(a, !0, !0) : b.createChildScopes(!1) : void 0
                                }
                            }(this))
                        }, m.prototype.doINeedToWipe = function (a) {
                            var b;
                            return b = null != a ? 0 === a.length : !0, this.plurals.length > 0 && b
                        }, m.prototype.rebuildAll = function (a, b, c) {
                            return this.onDestroy(c).then(function (a) {
                                return function () {
                                    return b ? a.createChildScopes() : void 0
                                }
                            }(this))
                        }, m.prototype.onDestroy = function () {
                            return m.__super__.onDestroy.call(this, this.scope), i.promiseLock(this, j.promiseTypes["delete"], void 0, void 0, function (a) {
                                return function () {
                                    return i.each(a.plurals.values(), function (a) {
                                        return a.destroy(!0)
                                    }, i.chunkSizeFrom(a.scope.cleanchunk, !1)).then(function () {
                                        var b;
                                        return null != (b = a.plurals) ? b.removeAll() : void 0
                                    })
                                }
                            }(this))
                        }, m.prototype.watchDestroy = function (a) {
                            return a.$on("$destroy", function (b) {
                                return function () {
                                    return b.rebuildAll(a, !1, !0)
                                }
                            }(this))
                        }, m.prototype.createChildScopes = function (a) {
                            return null == a && (a = !0), b.isUndefined(this.scope.models) ? void this.$log.error("No models to create " + l + "s from! I Need direct models!") : null != this.gMap && null != this.scope.models ? (this.watchIdKey(this.scope), a ? this.createAllNew(this.scope, !1) : this.pieceMeal(this.scope, !1)) : void 0
                        }, m.prototype.watchIdKey = function (a) {
                            return this.setIdKey(a), a.$watch("idKey", function (b) {
                                return function (c, d) {
                                    return c !== d && null == c ? (b.idKey = c, b.rebuildAll(a, !0, !0)) : void 0
                                }
                            }(this))
                        }, m.prototype.createAllNew = function (a, b) {
                            var c;
                            return null == b && (b = !1), this.models = a.models, this.firstTime && (this.watchModels(a), this.watchDestroy(a)), this.didQueueInitPromise(this, a) ? void 0 : (c = null, i.promiseLock(this, j.promiseTypes.create, "createAllNew", function (a) {
                                return c = a
                            }, function (b) {
                                return function () {
                                    return i.each(a.models, function (a) {
                                        var d;
                                        return d = b.createChild(a, b.gMap), c && (e.debug("createNew should fall through safely"), d.isEnabled = !1), c
                                    }, i.chunkSizeFrom(a.chunk)).then(function () {
                                        return b.firstTime = !1
                                    })
                                }
                            }(this)))
                        }, m.prototype.pieceMeal = function (a, b) {
                            var c, d;
                            return null == b && (b = !0), a.$$destroyed ? void 0 : (c = null, d = null, this.models = a.models, null != a && this.modelsLength() && this.plurals.length ? i.promiseLock(this, j.promiseTypes.update, "pieceMeal", function (a) {
                                return c = a
                            }, function (b) {
                                return function () {
                                    return j.promise(function () {
                                        return b.figureOutState(b.idKey, a, b.plurals, b.modelKeyComparison)
                                    }).then(function (f) {
                                        return d = f, d.updates.length && e.info("polygons updates: " + d.updates.length + " will be missed"), i.each(d.removals, function (a) {
                                            return null != a ? (a.destroy(), b.plurals.remove(a.model[b.idKey]), c) : void 0
                                        }, i.chunkSizeFrom(a.chunk))
                                    }).then(function () {
                                        return i.each(d.adds, function (a) {
                                            return c && e.debug("pieceMeal should fall through safely"), b.createChild(a, b.gMap), c
                                        }, i.chunkSizeFrom(a.chunk))
                                    })
                                }
                            }(this)) : (this.inProgress = !1, this.rebuildAll(this.scope, !0, !0)))
                        }, m.prototype.createChild = function (a, b) {
                            var c, e;
                            return e = this.scope.$new(!1), this.setChildScope(d.scopeKeys, e, a), e.$watch("model", function (a) {
                                return function (b, c) {
                                    return b !== c ? a.setChildScope(e, b) : void 0
                                }
                            }(this), !0), e["static"] = this.scope["static"], c = new k(e, this.attrs, b, this.defaults, a), null == a[this.idKey] ? void this.$log.error(l + " model has no id to assign a child to.\nThis is required for performance. Please assign id,\nor redirect id to a different key.") : (this.plurals.put(a[this.idKey], c), c)
                        }, m
                    }(f)
                }
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapCircleParentModel", ["uiGmapLogger", "$timeout", "uiGmapGmapUtil", "uiGmapEventsHelper", "uiGmapCircleOptionsBuilder",
            function (c, d, e, f, g) {
                var h;
                return h = function (d) {
                    function g(a, d, f, g, h) {
                        var i, j, k;
                        this.attrs = f, this.map = g, this.DEFAULTS = h, this.scope = a, k = null, i = function (a) {
                            return function () {
                                return k = null, null != a.listeners ? (a.removeEvents(a.listeners), a.listeners = void 0) : void 0
                            }
                        }(this), j = new google.maps.Circle(this.buildOpts(e.getCoords(a.center), a.radius)), this.setMyOptions = function (b) {
                            return function (c, d) {
                                return _.isEqual(c, d) ? void 0 : j.setOptions(b.buildOpts(e.getCoords(a.center), a.radius))
                            }
                        }(this), this.props = this.props.concat([{
                            prop: "center",
                            isColl: !0
                        }, {
                            prop: "fill",
                            isColl: !0
                        }, "radius", "zIndex"]), this.watchProps(), i(), this.listeners = this.setEvents(j, a, a, ["radius_changed"]), null != this.listeners && this.listeners.push(google.maps.event.addListener(j, "radius_changed", function () {
                            var c, d;
                            return c = j.getRadius(), c !== k ? (k = c, d = function () {
                                var b, d;
                                return c !== a.radius && (a.radius = c), (null != (b = a.events) ? b.radius_changed : void 0) && _.isFunction(null != (d = a.events) ? d.radius_changed : void 0) ? a.events.radius_changed(j, "radius_changed", a, arguments) : void 0
                            }, b.mock ? d() : a.$evalAsync(function () {
                                return d()
                            })) : void 0
                        })), null != this.listeners && this.listeners.push(google.maps.event.addListener(j, "center_changed", function () {
                            return a.$evalAsync(function () {
                                return b.isDefined(a.center.type) ? (a.center.coordinates[1] = j.getCenter().lat(), a.center.coordinates[0] = j.getCenter().lng()) : (a.center.latitude = j.getCenter().lat(), a.center.longitude = j.getCenter().lng())
                            })
                        })), a.$on("$destroy", function () {
                            return function () {
                                return i(), j.setMap(null)
                            }
                        }(this)), c.info(this)
                    }
                    return a(g, d), g.include(e), g.include(f), g
                }(g)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapDrawingManagerParentModel", ["uiGmapLogger", "$timeout", "uiGmapBaseObject", "uiGmapEventsHelper",
            function (b, c, d, e) {
                var f;
                return f = function (b) {
                    function c(a, b, c, d) {
                        var e, f;
                        this.scope = a, this.attrs = c, this.map = d, e = new google.maps.drawing.DrawingManager(this.scope.options), e.setMap(this.map), f = void 0, null != this.scope.control && (this.scope.control.getDrawingManager = function () {
                            return e
                        }), !this.scope["static"] && this.scope.options && this.scope.$watch("options", function (a) {
                            return null != e ? e.setOptions(a) : void 0
                        }, !0), null != this.scope.events && (f = this.setEvents(e, this.scope, this.scope), this.scope.$watch("events", function (a) {
                            return function (b, c) {
                                return _.isEqual(b, c) ? void 0 : (null != f && a.removeEvents(f), f = a.setEvents(e, a.scope, a.scope))
                            }
                        }(this))), this.scope.$on("$destroy", function (a) {
                            return function () {
                                return null != f && a.removeEvents(f), e.setMap(null), e = null
                            }
                        }(this))
                    }
                    return a(c, b), c.include(e), c
                }(d)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIMarkerParentModel", ["uiGmapModelKey", "uiGmapLogger",
            function (d, e) {
                var f;
                return f = function (d) {
                    function f(c, d, g, h) {
                        if (this.scope = c, this.element = d, this.attrs = g, this.map = h, this.onWatch = a(this.onWatch, this), this.watch = a(this.watch, this), this.validateScope = a(this.validateScope, this), f.__super__.constructor.call(this, this.scope), this.$log = e, !this.validateScope(this.scope)) throw new String("Unable to construct IMarkerParentModel due to invalid scope");
                        this.doClick = b.isDefined(this.attrs.click), null != this.scope.options && (this.DEFAULTS = this.scope.options), this.watch("coords", this.scope), this.watch("icon", this.scope), this.watch("options", this.scope), this.scope.$on("$destroy", function (a) {
                            return function () {
                                return a.onDestroy(a.scope)
                            }
                        }(this))
                    }
                    return c(f, d), f.prototype.DEFAULTS = {}, f.prototype.validateScope = function (a) {
                        var b;
                        return null == a ? (this.$log.error(this.constructor.name + ": invalid scope used"), !1) : (b = null != a.coords, b ? b : (this.$log.error(this.constructor.name + ": no valid coords attribute found"), !1))
                    }, f.prototype.watch = function (a, b, c) {
                        return null == c && (c = !0), b.$watch(a, function (c) {
                            return function (d, e) {
                                return _.isEqual(d, e) ? void 0 : c.onWatch(a, b, d, e)
                            }
                        }(this), c)
                    }, f.prototype.onWatch = function () {}, f
                }(d)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIWindowParentModel", ["uiGmapModelKey", "uiGmapGmapUtil", "uiGmapLogger",
            function (b, c, d) {
                var e;
                return e = function (b) {
                    function e(a, b, c, f, g, h, i, j) {
                        e.__super__.constructor.call(this, a), this.$log = d, this.$timeout = g, this.$compile = h, this.$http = i, this.$templateCache = j, this.DEFAULTS = {}, null != a.options && (this.DEFAULTS = a.options)
                    }
                    return a(e, b), e.include(c), e.prototype.getItem = function (a, b, c) {
                        return "models" === b ? a[b][c] : a[b].get(c)
                    }, e
                }(b)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapLayerParentModel", ["uiGmapBaseObject", "uiGmapLogger", "$timeout",
            function (d, e) {
                var f;
                return f = function (d) {
                    function f(c, d, f, g, h, i) {
                        return this.scope = c, this.element = d, this.attrs = f, this.gMap = g, this.onLayerCreated = null != h ? h : void 0, this.$log = null != i ? i : e, this.createGoogleLayer = a(this.createGoogleLayer, this), null == this.attrs.type ? void this.$log.info("type attribute for the layer directive is mandatory. Layer creation aborted!!") : (this.createGoogleLayer(), this.doShow = !0, b.isDefined(this.attrs.show) && (this.doShow = this.scope.show), this.doShow && null != this.gMap && this.gObject.setMap(this.gMap), this.scope.$watch("show", function (a) {
                            return function (b, c) {
                                return b !== c ? (a.doShow = b, a.gObject.setMap(b ? a.gMap : null)) : void 0
                            }
                        }(this), !0), this.scope.$watch("options", function (a) {
                            return function (b, c) {
                                return b !== c ? (a.gObject.setMap(null), a.gObject = null, a.createGoogleLayer()) : void 0
                            }
                        }(this), !0), void this.scope.$on("$destroy", function (a) {
                            return function () {
                                return a.gObject.setMap(null)
                            }
                        }(this)))
                    }
                    return c(f, d), f.prototype.createGoogleLayer = function () {
                        var a;
                        return this.gObject = null == this.attrs.options ? void 0 === this.attrs.namespace ? new google.maps[this.attrs.type] : new google.maps[this.attrs.namespace][this.attrs.type] : void 0 === this.attrs.namespace ? new google.maps[this.attrs.type](this.scope.options) : new google.maps[this.attrs.namespace][this.attrs.type](this.scope.options), null != this.gObject && null != this.onLayerCreated && "function" == typeof (a = this.onLayerCreated(this.scope, this.gObject)) ? a(this.gObject) : void 0
                    }, f
                }(d)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMapTypeParentModel", ["uiGmapBaseObject", "uiGmapLogger",
            function (d, e) {
                var f;
                return f = function (d) {
                    function f(c, d, f, g, h) {
                        return this.scope = c, this.element = d, this.attrs = f, this.gMap = g, this.$log = null != h ? h : e, this.hideOverlay = a(this.hideOverlay, this), this.showOverlay = a(this.showOverlay, this), this.refreshMapType = a(this.refreshMapType, this), this.createMapType = a(this.createMapType, this), null == this.attrs.options ? void this.$log.info("options attribute for the map-type directive is mandatory. Map type creation aborted!!") : (this.id = this.gMap.overlayMapTypesCount = this.gMap.overlayMapTypesCount + 1 || 0, this.doShow = !0, this.createMapType(), b.isDefined(this.attrs.show) && (this.doShow = this.scope.show), this.doShow && null != this.gMap && this.showOverlay(), this.scope.$watch("show", function (a) {
                            return function (b, c) {
                                return b !== c ? (a.doShow = b, b ? a.showOverlay() : a.hideOverlay()) : void 0
                            }
                        }(this), !0), this.scope.$watch("options", function (a) {
                            return function (b, c) {
                                return _.isEqual(b, c) ? void 0 : a.refreshMapType()
                            }
                        }(this), !0), b.isDefined(this.attrs.refresh) && this.scope.$watch("refresh", function (a) {
                            return function (b, c) {
                                return _.isEqual(b, c) ? void 0 : a.refreshMapType()
                            }
                        }(this), !0), void this.scope.$on("$destroy", function (a) {
                            return function () {
                                return a.hideOverlay(), a.mapType = null
                            }
                        }(this)))
                    }
                    return c(f, d), f.prototype.createMapType = function () {
                        if (null != this.scope.options.getTile) this.mapType = this.scope.options;
                        else {
                            if (null == this.scope.options.getTileUrl) return void this.$log.info("options should provide either getTile or getTileUrl methods. Map type creation aborted!!");
                            this.mapType = new google.maps.ImageMapType(this.scope.options)
                        }
                        return this.attrs.id && this.scope.id && (this.gMap.mapTypes.set(this.scope.id, this.mapType), b.isDefined(this.attrs.show) || (this.doShow = !1)), this.mapType.layerId = this.id
                    }, f.prototype.refreshMapType = function () {
                        return this.hideOverlay(), this.mapType = null, this.createMapType(), this.doShow && null != this.gMap ? this.showOverlay() : void 0
                    }, f.prototype.showOverlay = function () {
                        return this.gMap.overlayMapTypes.push(this.mapType)
                    }, f.prototype.hideOverlay = function () {
                        var a;
                        return a = !1, this.gMap.overlayMapTypes.forEach(function (b) {
                            return function (c, d) {
                                a || c.layerId !== b.id || (a = !0, b.gMap.overlayMapTypes.removeAt(d))
                            }
                        }(this))
                    }, f
                }(d)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMarkersParentModel", ["uiGmapIMarkerParentModel", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmapMarkerChildModel", "uiGmap_async", "uiGmapClustererMarkerManager", "uiGmapMarkerManager", "$timeout", "uiGmapIMarker", "uiGmapPromise", "uiGmapGmapUtil", "uiGmapLogger",
            function (d, e, f, g, h, i, j, k, l, m, n) {
                var o, p;
                return p = function (a, b) {
                    return b.plurals = new f, b.scope.plurals = b.plurals, b
                }, o = function (d) {
                    function k(b, c, d, e) {
                        this.onDestroy = a(this.onDestroy, this), this.newChildMarker = a(this.newChildMarker, this), this.pieceMeal = a(this.pieceMeal, this), this.rebuildAll = a(this.rebuildAll, this), this.createAllNew = a(this.createAllNew, this), this.createChildScopes = a(this.createChildScopes, this), this.validateScope = a(this.validateScope, this), this.onWatch = a(this.onWatch, this);
                        var g;
                        k.__super__.constructor.call(this, b, c, d, e), this["interface"] = l, g = this, p(new f, this), this.scope.pluralsUpdate = {
                            updateCtr: 0
                        }, this.$log.info(this), this.doRebuildAll = null != this.scope.doRebuildAll ? this.scope.doRebuildAll : !1, this.setIdKey(this.scope), this.scope.$watch("doRebuildAll", function (a) {
                            return function (b, c) {
                                return b !== c ? a.doRebuildAll = b : void 0
                            }
                        }(this)), this.modelsLength() || (this.modelsRendered = !1), this.scope.$watch("models", function (a) {
                            return function (b, c) {
                                if (!_.isEqual(b, c) || !a.modelsRendered) {
                                    if (0 === b.length && 0 === c.length) return;
                                    return a.modelsRendered = !0, a.onWatch("models", a.scope, b, c)
                                }
                            }
                        }(this), !this.isTrue(d.modelsbyref)), this.watch("doCluster", this.scope), this.watch("clusterOptions", this.scope), this.watch("clusterEvents", this.scope), this.watch("fit", this.scope), this.watch("idKey", this.scope), this.gManager = void 0, this.createAllNew(this.scope)
                    }
                    return c(k, d), k.include(n), k.include(e), k.prototype.onWatch = function (a, b, c, d) {
                        return "idKey" === a && c !== d && (this.idKey = c), this.doRebuildAll || "doCluster" === a ? this.rebuildAll(b) : this.pieceMeal(b)
                    }, k.prototype.validateScope = function (a) {
                        var c;
                        return c = b.isUndefined(a.models) || void 0 === a.models, c && this.$log.error(this.constructor.name + ": no valid models attribute found"), k.__super__.validateScope.call(this, a) || c
                    }, k.prototype.createChildScopes = function (a) {
                        return null != this.gMap && null != this.scope.models ? a ? this.createAllNew(this.scope, !1) : this.pieceMeal(this.scope, !1) : void 0
                    }, k.prototype.createAllNew = function (a) {
                        var c, d, e, f, g;
                        return null != this.gManager && (this.gManager.clear(), delete this.gManager), a.doCluster ? (a.clusterEvents && (g = this, this.origClusterEvents ? b.extend(a.clusterEvents, this.origClusterEvents) : this.origClusterEvents = {
                            click: null != (d = a.clusterEvents) ? d.click : void 0,
                            mouseout: null != (e = a.clusterEvents) ? e.mouseout : void 0,
                            mouseover: null != (f = a.clusterEvents) ? f.mouseover : void 0
                        }, b.extend(a.clusterEvents, {
                            click: function (a) {
                                return g.maybeExecMappedEvent(a, "click")
                            },
                            mouseout: function (a) {
                                return g.maybeExecMappedEvent(a, "mouseout")
                            },
                            mouseover: function (a) {
                                return g.maybeExecMappedEvent(a, "mouseover")
                            }
                        })), this.gManager = new i(this.map, void 0, a.clusterOptions, a.clusterEvents)) : this.gManager = new j(this.map), this.didQueueInitPromise(this, a) ? void 0 : (c = null, h.promiseLock(this, m.promiseTypes.create, "createAllNew", function (a) {
                            return c = a
                        }, function (b) {
                            return function () {
                                return h.each(a.models, function (d) {
                                    return b.newChildMarker(d, a), c
                                }, h.chunkSizeFrom(a.chunk)).then(function () {
                                    return b.modelsRendered = !0, a.fit && b.gManager.fit(), b.gManager.draw(), b.scope.pluralsUpdate.updateCtr += 1
                                }, h.chunkSizeFrom(a.chunk))
                            }
                        }(this)))
                    }, k.prototype.rebuildAll = function (a) {
                        var b;
                        if (a.doRebuild || void 0 === a.doRebuild) return (null != (b = this.scope.plurals) ? b.length : void 0) ? this.onDestroy(a).then(function (b) {
                            return function () {
                                return b.createAllNew(a)
                            }
                        }(this)) : this.createAllNew(a)
                    }, k.prototype.pieceMeal = function (a) {
                        var b, c;
                        if (!a.$$destroyed) return b = null, c = null, this.modelsLength() && this.scope.plurals.length ? h.promiseLock(this, m.promiseTypes.update, "pieceMeal", function (a) {
                            return b = a
                        }, function (d) {
                            return function () {
                                return m.promise(function () {
                                    return d.figureOutState(d.idKey, a, d.scope.plurals, d.modelKeyComparison)
                                }).then(function (e) {
                                    return c = e, h.each(c.removals, function (a) {
                                        return null != a ? (null != a.destroy && a.destroy(), d.scope.plurals.remove(a.id), b) : void 0
                                    }, h.chunkSizeFrom(a.chunk))
                                }).then(function () {
                                    return h.each(c.adds, function (c) {
                                        return d.newChildMarker(c, a), b
                                    }, h.chunkSizeFrom(a.chunk))
                                }).then(function () {
                                    return h.each(c.updates, function (a) {
                                        return d.updateChild(a.child, a.model), b
                                    }, h.chunkSizeFrom(a.chunk))
                                }).then(function () {
                                    return (c.adds.length > 0 || c.removals.length > 0 || c.updates.length > 0) && (a.plurals = d.scope.plurals, a.fit && d.gManager.fit(), d.gManager.draw()), d.scope.pluralsUpdate.updateCtr += 1
                                })
                            }
                        }(this)) : (this.inProgress = !1, this.rebuildAll(a))
                    }, k.prototype.newChildMarker = function (a, b) {
                        var c, d, e, f;
                        return null == a[this.idKey] ? void this.$log.error("Marker model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.") : (this.$log.info("child", c, "markers", this.scope.plurals), d = b.$new(!0), d.events = b.events, f = {}, l.scopeKeys.forEach(function (a) {
                            return f[a] = b[a]
                        }), c = new g(d, a, f, this.map, this.DEFAULTS, this.doClick, this.gManager, e = !1), this.scope.plurals.put(a[this.idKey], c), c)
                    }, k.prototype.onDestroy = function (a) {
                        return k.__super__.onDestroy.call(this, a), h.promiseLock(this, m.promiseTypes["delete"], void 0, void 0, function (a) {
                            return function () {
                                return h.each(a.scope.plurals.values(), function (a) {
                                    return null != a ? a.destroy(!1) : void 0
                                }, h.chunkSizeFrom(a.scope.cleanchunk, !1)).then(function () {
                                    return null != a.gManager && a.gManager.clear(), a.plurals.removeAll(), a.plurals !== a.scope.plurals && console.error("plurals out of sync for MarkersParentModel"), a.scope.pluralsUpdate.updateCtr += 1
                                })
                            }
                        }(this))
                    }, k.prototype.maybeExecMappedEvent = function (a, b) {
                        var c, d;
                        return _.isFunction(null != (d = this.scope.clusterEvents) ? d[b] : void 0) && (c = this.mapClusterToPlurals(a), this.origClusterEvents[b]) ? this.origClusterEvents[b](c.cluster, c.mapped) : void 0
                    }, k.prototype.mapClusterToPlurals = function (a) {
                        var b;
                        return b = a.getMarkers().map(function (a) {
                            return function (b) {
                                return a.scope.plurals.get(b.key).model
                            }
                        }(this)), {
                            cluster: a,
                            mapped: b
                        }
                    }, k.prototype.getItem = function (a, b, c) {
                        return "models" === b ? a[b][c] : a[b].get(c)
                    }, k
                }(d)
            }])
    }.call(this),
    function () {
        ["Polygon", "Polyline"].forEach(function (a) {
            return b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmap" + a + "sParentModel", ["uiGmapBasePolysParentModel", "uiGmap" + a + "ChildModel", "uiGmapI" + a,
                function (b, c, d) {
                    return b(d, c, a)
                }])
        })
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapRectangleParentModel", ["uiGmapLogger", "uiGmapGmapUtil", "uiGmapEventsHelper", "uiGmapRectangleOptionsBuilder",
            function (b, c, d, e) {
                var f;
                return f = function (e) {
                    function f(a, c, d, e, f) {
                        var g, h, i, j, k, l, m, n, o, p, q;
                        this.scope = a, this.attrs = d, this.map = e, this.DEFAULTS = f, g = void 0, j = !1, o = [], n = void 0, k = function (a) {
                            return function () {
                                return a.isTrue(a.attrs.fit) ? a.fitMapBounds(a.map, g) : void 0
                            }
                        }(this), i = function (a) {
                            return function () {
                                var c, d, e;
                                return null != a.scope.bounds && null != (null != (c = a.scope.bounds) ? c.sw : void 0) && null != (null != (d = a.scope.bounds) ? d.ne : void 0) && a.validateBoundPoints(a.scope.bounds) ? (g = a.convertBoundPoints(a.scope.bounds), b.info("new new bounds created: " + JSON.stringify(g))) : null != a.scope.bounds.getNorthEast && null != a.scope.bounds.getSouthWest ? g = a.scope.bounds : null != a.scope.bounds ? b.error("Invalid bounds for newValue: " + JSON.stringify(null != (e = a.scope) ? e.bounds : void 0)) : void 0
                            }
                        }(this), i(), l = new google.maps.Rectangle(this.buildOpts(g)), b.info("gObject (rectangle) created: " + l), p = !1, q = function (a) {
                            return function () {
                                var b, c, d;
                                return b = l.getBounds(), c = b.getNorthEast(), d = b.getSouthWest(), p ? void 0 : a.scope.$evalAsync(function (a) {
                                    return null != a.bounds && null != a.bounds.sw && null != a.bounds.ne && (a.bounds.ne = {
                                        latitude: c.lat(),
                                        longitude: c.lng()
                                    }, a.bounds.sw = {
                                        latitude: d.lat(),
                                        longitude: d.lng()
                                    }), null != a.bounds.getNorthEast && null != a.bounds.getSouthWest ? a.bounds = b : void 0
                                })
                            }
                        }(this), m = function (a) {
                            return function () {
                                return k(), a.removeEvents(o), o.push(google.maps.event.addListener(l, "dragstart", function () {
                                    return j = !0
                                })), o.push(google.maps.event.addListener(l, "dragend", function () {
                                    return j = !1, q()
                                })), o.push(google.maps.event.addListener(l, "bounds_changed", function () {
                                    return j ? void 0 : q()
                                }))
                            }
                        }(this), h = function (a) {
                            return function () {
                                return a.removeEvents(o), null != n && a.removeEvents(n), l.setMap(null)
                            }
                        }(this), null != g && m(), this.scope.$watch("bounds", function (a, b) {
                            var c;
                            if (!(_.isEqual(a, b) && null != g || j)) return p = !0, null == a ? void h() : (null == g ? c = !0 : k(), i(), l.setBounds(g), p = !1, c && null != g ? m() : void 0)
                        }, !0), this.setMyOptions = function (a) {
                            return function (b, c) {
                                return _.isEqual(b, c) || null == g || null == b ? void 0 : l.setOptions(a.buildOpts(g))
                            }
                        }(this), this.props.push("bounds"), this.watchProps(this.props), null != this.attrs.events && (n = this.setEvents(l, this.scope, this.scope), this.scope.$watch("events", function (a) {
                            return function (b, c) {
                                return _.isEqual(b, c) ? void 0 : (null != n && a.removeEvents(n), n = a.setEvents(l, a.scope, a.scope))
                            }
                        }(this))), this.scope.$on("$destroy", function () {
                            return function () {
                                return h()
                            }
                        }(this)), b.info(this)
                    }
                    return a(f, e), f.include(c), f.include(d), f
                }(e)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapSearchBoxParentModel", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapEventsHelper", "$timeout", "$http", "$templateCache",
            function (d, e, f) {
                var g;
                return g = function (d) {
                    function g(c, d, f, g, h, i, j) {
                        var k;
                        return this.scope = c, this.element = d, this.attrs = f, this.gMap = g, this.ctrlPosition = h, this.template = i, this.$log = null != j ? j : e, this.setVisibility = a(this.setVisibility, this), this.getBounds = a(this.getBounds, this), this.setBounds = a(this.setBounds, this), this.createSearchBox = a(this.createSearchBox, this), this.addToParentDiv = a(this.addToParentDiv, this), this.addAsMapControl = a(this.addAsMapControl, this), this.init = a(this.init, this), null == this.attrs.template ? void this.$log.error("template attribute for the search-box directive is mandatory. Places Search Box creation aborted!!") : (b.isUndefined(this.scope.options) && (this.scope.options = {}, this.scope.options.visible = !0), b.isUndefined(this.scope.options.visible) && (this.scope.options.visible = !0), b.isUndefined(this.scope.options.autocomplete) && (this.scope.options.autocomplete = !1), this.visible = this.scope.options.visible, this.autocomplete = this.scope.options.autocomplete, k = b.element("<div></div>"), k.append(this.template), this.input = k.find("input")[0], void this.init())
                    }
                    return c(g, d), g.include(f), g.prototype.init = function () {
                        return this.createSearchBox(), this.scope.$watch("options", function (a) {
                            return function (c) {
                                return b.isObject(c) && (null != c.bounds && a.setBounds(c.bounds), null != c.visible && a.visible !== c.visible) ? a.setVisibility(c.visible) : void 0
                            }
                        }(this), !0), null != this.attrs.parentdiv ? this.addToParentDiv() : this.addAsMapControl(), this.listener = this.autocomplete ? google.maps.event.addListener(this.gObject, "place_changed", function (a) {
                            return function () {
                                return a.places = a.gObject.getPlace()
                            }
                        }(this)) : google.maps.event.addListener(this.gObject, "places_changed", function (a) {
                            return function () {
                                return a.places = a.gObject.getPlaces()
                            }
                        }(this)), this.listeners = this.setEvents(this.gObject, this.scope, this.scope), this.$log.info(this), this.scope.$on("$destroy", function (a) {
                            return function () {
                                return a.gObject = null
                            }
                        }(this))
                    }, g.prototype.addAsMapControl = function () {
                        return this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].push(this.input)
                    }, g.prototype.addToParentDiv = function () {
                        return this.parentDiv = b.element(document.getElementById(this.scope.parentdiv)), this.parentDiv.append(this.input)
                    }, g.prototype.createSearchBox = function () {
                        return this.gObject = this.autocomplete ? new google.maps.places.Autocomplete(this.input, this.scope.options) : new google.maps.places.SearchBox(this.input, this.scope.options)
                    }, g.prototype.setBounds = function (a) {
                        if (b.isUndefined(a.isEmpty)) this.$log.error("Error: SearchBoxParentModel setBounds. Bounds not an instance of LatLngBounds.");
                        else if (a.isEmpty() === !1 && null != this.gObject) return this.gObject.setBounds(a)
                    }, g.prototype.getBounds = function () {
                        return this.gObject.getBounds()
                    }, g.prototype.setVisibility = function (a) {
                        return null != this.attrs.parentdiv ? a === !1 ? this.parentDiv.addClass("ng-hide") : this.parentDiv.removeClass("ng-hide") : a === !1 ? this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].clear() : this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].push(this.input), this.visible = a
                    }, g
                }(d)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapWindowsParentModel", ["uiGmapIWindowParentModel", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmapWindowChildModel", "uiGmapLinked", "uiGmap_async", "uiGmapLogger", "$timeout", "$compile", "$http", "$templateCache", "$interpolate", "uiGmapPromise", "uiGmapIWindow", "uiGmapGmapUtil",
            function (d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
                var s;
                return s = function (d) {
                    function s(b, c, d, e, g, i) {
                        this.gMap = g, this.markersScope = i, this.modelKeyComparison = a(this.modelKeyComparison, this), this.interpolateContent = a(this.interpolateContent, this), this.setChildScope = a(this.setChildScope, this), this.createWindow = a(this.createWindow, this), this.setContentKeys = a(this.setContentKeys, this), this.pieceMeal = a(this.pieceMeal, this), this.createAllNew = a(this.createAllNew, this), this.watchIdKey = a(this.watchIdKey, this), this.createChildScopes = a(this.createChildScopes, this), this.watchOurScope = a(this.watchOurScope, this), this.watchDestroy = a(this.watchDestroy, this), this.onDestroy = a(this.onDestroy, this), this.rebuildAll = a(this.rebuildAll, this), this.doINeedToWipe = a(this.doINeedToWipe, this), this.watchModels = a(this.watchModels, this), this.go = a(this.go, this), s.__super__.constructor.call(this, b, c, d, e, k, l, m, n), this["interface"] = q, this.plurals = new f, _.each(q.scopeKeys, function (a) {
                            return function (b) {
                                return a[b + "Key"] = void 0
                            }
                        }(this)), this.linked = new h(b, c, d, e), this.contentKeys = void 0, this.isIconVisibleOnClick = void 0, this.firstTime = !0, this.firstWatchModels = !0, this.$log.info(self), this.parentScope = void 0, this.go(b)
                    }
                    return c(s, d), s.include(e), s.prototype.go = function (a) {
                        return this.watchOurScope(a), this.doRebuildAll = null != this.scope.doRebuildAll ? this.scope.doRebuildAll : !1, a.$watch("doRebuildAll", function (a) {
                            return function (b, c) {
                                return b !== c ? a.doRebuildAll = b : void 0
                            }
                        }(this)), this.createChildScopes()
                    }, s.prototype.watchModels = function (a) {
                        var b;
                        return b = null != this.markersScope ? "pluralsUpdate" : "models", a.$watch(b, function (b) {
                            return function (c, d) {
                                var e;
                                return !_.isEqual(c, d) || b.firstWatchModels ? (b.firstWatchModels = !1, b.doRebuildAll || b.doINeedToWipe(a.models) ? b.rebuildAll(a, !0, !0) : (e = 0 === b.plurals.length, null != b.existingPieces ? _.last(b.existingPieces._content).then(function () {
                                    return b.createChildScopes(e)
                                }) : b.createChildScopes(e))) : void 0
                            }
                        }(this), !0)
                    }, s.prototype.doINeedToWipe = function (a) {
                        var b;
                        return b = null != a ? 0 === a.length : !0, this.plurals.length > 0 && b
                    }, s.prototype.rebuildAll = function (a, b, c) {
                        return this.onDestroy(c).then(function (a) {
                            return function () {
                                return b ? a.createChildScopes() : void 0
                            }
                        }(this))
                    }, s.prototype.onDestroy = function () {
                        return s.__super__.onDestroy.call(this, this.scope), i.promiseLock(this, p.promiseTypes["delete"], void 0, void 0, function (a) {
                            return function () {
                                return i.each(a.plurals.values(), function (a) {
                                    return a.destroy()
                                }, i.chunkSizeFrom(a.scope.cleanchunk, !1)).then(function () {
                                    var b;
                                    return null != (b = a.plurals) ? b.removeAll() : void 0
                                })
                            }
                        }(this))
                    }, s.prototype.watchDestroy = function (a) {
                        return a.$on("$destroy", function (b) {
                            return function () {
                                return b.firstWatchModels = !0, b.firstTime = !0, b.rebuildAll(a, !1, !0)
                            }
                        }(this))
                    }, s.prototype.watchOurScope = function (a) {
                        return _.each(q.scopeKeys, function (b) {
                            return function (c) {
                                var d;
                                return d = c + "Key", b[d] = "function" == typeof a[c] ? a[c]() : a[c]
                            }
                        }(this))
                    }, s.prototype.createChildScopes = function (a) {
                        var c, d, e;
                        return null == a && (a = !0), this.isIconVisibleOnClick = !0, b.isDefined(this.linked.attrs.isiconvisibleonclick) && (this.isIconVisibleOnClick = this.linked.scope.isIconVisibleOnClick), c = b.isUndefined(this.linked.scope.models), !c || void 0 !== this.markersScope && void 0 !== (null != (d = this.markersScope) ? d.plurals : void 0) && void 0 !== (null != (e = this.markersScope) ? e.models : void 0) ? null != this.gMap ? null != this.linked.scope.models ? (this.watchIdKey(this.linked.scope), a ? this.createAllNew(this.linked.scope, !1) : this.pieceMeal(this.linked.scope, !1)) : (this.parentScope = this.markersScope, this.watchIdKey(this.parentScope), a ? this.createAllNew(this.markersScope, !0, "plurals", !1) : this.pieceMeal(this.markersScope, !0, "plurals", !1)) : void 0 : void this.$log.error("No models to create windows from! Need direct models or models derived from markers!")
                    }, s.prototype.watchIdKey = function (a) {
                        return this.setIdKey(a), a.$watch("idKey", function (b) {
                            return function (c, d) {
                                return c !== d && null == c ? (b.idKey = c, b.rebuildAll(a, !0, !0)) : void 0
                            }
                        }(this))
                    }, s.prototype.createAllNew = function (a, b, c, d) {
                        var e;
                        return null == c && (c = "models"), null == d && (d = !1), this.firstTime && (this.watchModels(a), this.watchDestroy(a)), this.setContentKeys(a.models), this.didQueueInitPromise(this, a) ? void 0 : (e = null, i.promiseLock(this, p.promiseTypes.create, "createAllNew", function (a) {
                            return e = a
                        }, function (d) {
                            return function () {
                                return i.each(a.models, function (f) {
                                    var g, h;
                                    return g = b && null != (h = d.getItem(a, c, f[d.idKey])) ? h.gObject : void 0, e || (!g && d.markersScope && j.error("Unable to get gMarker from markersScope!"), d.createWindow(f, g, d.gMap)), e
                                }, i.chunkSizeFrom(a.chunk)).then(function () {
                                    return d.firstTime = !1
                                })
                            }
                        }(this)))
                    }, s.prototype.pieceMeal = function (a, b, c, d) {
                        var e, f;
                        return null == c && (c = "models"), null == d && (d = !0), a.$$destroyed ? void 0 : (e = null, f = null, null != a && this.modelsLength() && this.plurals.length ? i.promiseLock(this, p.promiseTypes.update, "pieceMeal", function (a) {
                            return e = a
                        }, function (b) {
                            return function () {
                                return p.promise(function () {
                                    return b.figureOutState(b.idKey, a, b.plurals, b.modelKeyComparison)
                                }).then(function (c) {
                                    return f = c, i.each(f.removals, function (a) {
                                        return null != a ? (b.plurals.remove(a.id), null != a.destroy && a.destroy(!0), e) : void 0
                                    }, i.chunkSizeFrom(a.chunk))
                                }).then(function () {
                                    return i.each(f.adds, function (d) {
                                        var f, g;
                                        if (f = null != (g = b.getItem(a, c, d[b.idKey])) ? g.gObject : void 0, !f) throw "Gmarker undefined";
                                        return b.createWindow(d, f, b.gMap), e
                                    })
                                }).then(function () {
                                    return i.each(f.updates, function (a) {
                                        return b.updateChild(a.child, a.model), e
                                    }, i.chunkSizeFrom(a.chunk))
                                })
                            }
                        }(this)) : (j.debug("pieceMeal: rebuildAll"), this.rebuildAll(this.scope, !0, !0)))
                    }, s.prototype.setContentKeys = function (a) {
                        return this.modelsLength(a) ? this.contentKeys = Object.keys(a[0]) : void 0
                    }, s.prototype.createWindow = function (a, b, c) {
                        var d, e, f, h, i, j;
                        return e = this.linked.scope.$new(!1), this.setChildScope(e, a), e.$watch("model", function (a) {
                            return function (b, c) {
                                return b !== c ? a.setChildScope(e, b) : void 0
                            }
                        }(this), !0), f = {
                            html: function (b) {
                                return function () {
                                    return b.interpolateContent(b.linked.element.html(), a)
                                }
                            }(this)
                        }, this.DEFAULTS = this.scopeOrModelVal(this.optionsKey, this.scope, a) || {}, h = this.createWindowOptions(b, e, f.html(), this.DEFAULTS), d = new g(a, e, h, this.isIconVisibleOnClick, c, null != (i = this.markersScope) && null != (j = i.plurals.get(a[this.idKey])) ? j.scope : void 0, f, !1, !0), null == a[this.idKey] ? void this.$log.error("Window model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.") : (this.plurals.put(a[this.idKey], d), d)
                    }, s.prototype.setChildScope = function (a, b) {
                        return _.each(q.scopeKeys, function (c) {
                            return function (d) {
                                var e, f;
                                return e = d + "Key", f = "self" === c[e] ? b : b[c[e]], f !== a[d] ? a[d] = f : void 0
                            }
                        }(this)), a.model = b
                    }, s.prototype.interpolateContent = function (a, b) {
                        var c, d, e, f, g, h;
                        if (void 0 !== this.contentKeys && 0 !== this.contentKeys.length) {
                            for (c = o(a), e = {}, h = this.contentKeys, d = 0, g = h.length; g > d; d++) f = h[d], e[f] = b[f];
                            return c(e)
                        }
                    }, s.prototype.modelKeyComparison = function (a, b) {
                        var c, d;
                        if (d = null != this.scope.coords ? this.scope : this.parentScope, null == d) throw "No scope or parentScope set!";
                        return (c = r.equalCoords(this.evalModelHandle(a, d.coords), this.evalModelHandle(b, d.coords))) ? c = _.every(_.without(this["interface"].scopeKeys, "coords"), function (c) {
                            return function (e) {
                                return c.evalModelHandle(a, d[e]) === c.evalModelHandle(b, d[e])
                            }
                        }(this)) : c
                    }, s
                }(d)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapCircle", ["uiGmapICircle", "uiGmapCircleParentModel",
            function (a, b) {
                return _.extend(a, {
                    link: function (a, c, d, e) {
                        return e.getScope().deferred.promise.then(function () {
                            return function (e) {
                                return new b(a, c, d, e)
                            }
                        }(this))
                    }
                })
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapControl", ["uiGmapIControl", "$http", "$templateCache", "$compile", "$controller", "uiGmapGoogleMapApi",
            function (d, e, f, g, h, i) {
                var j;
                return j = function (j) {
                    function k() {
                        this.link = a(this.link, this), k.__super__.constructor.call(this)
                    }
                    return c(k, j), k.prototype.link = function (a, c, j, k) {
                        return i.then(function (c) {
                            return function (i) {
                                var j, l;
                                return b.isUndefined(a.template) ? void c.$log.error("mapControl: could not find a valid template property") : (j = b.isDefined(a.index && !isNaN(parseInt(a.index))) ? parseInt(a.index) : void 0, l = b.isDefined(a.position) ? a.position.toUpperCase().replace(/-/g, "_") : "TOP_CENTER", i.ControlPosition[l] ? d.mapPromise(a, k).then(function (d) {
                                    var i, k;
                                    return i = void 0, k = b.element("<div></div>"), e.get(a.template, {
                                        cache: f
                                    }).success(function (c) {
                                        var d, e;
                                        return e = a.$new(), k.append(c), b.isDefined(a.controller) && (d = h(a.controller, {
                                            $scope: e
                                        }), k.children().data("$ngControllerController", d)), i = g(k.children())(e), j ? i[0].index = j : void 0
                                    }).error(function () {
                                        return c.$log.error("mapControl: template could not be found")
                                    }).then(function () {
                                        return d.controls[google.maps.ControlPosition[l]].push(i[0])
                                    })
                                }) : void c.$log.error("mapControl: invalid position property"))
                            }
                        }(this))
                    }, k
                }(d)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api").service("uiGmapDragZoom", ["uiGmapCtrlHandle", "uiGmapPropertyAction",
            function (a, b) {
                return {
                    restrict: "EMA",
                    transclude: !0,
                    template: '<div class="angular-google-map-dragzoom" ng-transclude style="display: none"></div>',
                    require: "^uiGmapGoogleMap",
                    scope: {
                        keyboardkey: "=",
                        options: "=",
                        spec: "="
                    },
                    controller: ["$scope", "$element",
                        function (b, c) {
                            return b.ctrlType = "uiGmapDragZoom", _.extend(this, a.handle(b, c))
                        }],
                    link: function (c, d, e, f) {
                        return a.mapPromise(c, f).then(function (a) {
                            var d, e, f;
                            return d = function (b) {
                                return a.enableKeyDragZoom(b), c.spec ? c.spec.enableKeyDragZoom(b) : void 0
                            }, e = new b(function (a, b) {
                                return b ? d({
                                    key: b
                                }) : d()
                            }), f = new b(function (a, b) {
                                return b ? d(b) : void 0
                            }), c.$watch("keyboardkey", e.sic), e.sic(c.keyboardkey), c.$watch("options", f.sic), f.sic(c.options)
                        })
                    }
                }
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapDrawingManager", ["uiGmapIDrawingManager", "uiGmapDrawingManagerParentModel",
            function (a, b) {
                return _.extend(a, {
                    link: function (a, c, d, e) {
                        return e.getScope().deferred.promise.then(function (e) {
                            return new b(a, c, d, e)
                        })
                    }
                })
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapApiFreeDrawPolygons", ["uiGmapLogger", "uiGmapBaseObject", "uiGmapCtrlHandle", "uiGmapDrawFreeHandChildModel", "uiGmapLodash",
            function (b, d, e, f, g) {
                var h;
                return h = function (d) {
                    function h() {
                        return this.link = a(this.link, this), h.__super__.constructor.apply(this, arguments)
                    }
                    return c(h, d), h.include(e), h.prototype.restrict = "EMA", h.prototype.replace = !0, h.prototype.require = "^uiGmapGoogleMap", h.prototype.scope = {
                        polygons: "=",
                        draw: "=",
                        revertmapoptions: "="
                    }, h.prototype.link = function (a, c, d, e) {
                        return this.mapPromise(a, e).then(function () {
                            return function (c) {
                                var d, e;
                                return a.polygons ? _.isArray(a.polygons) ? (d = new f(c, a.revertmapoptions), e = void 0, a.draw = function () {
                                    return "function" == typeof e && e(), d.engage(a.polygons).then(function () {
                                        var b;
                                        return b = !0, e = a.$watchCollection("polygons", function (a, c) {
                                            var d;
                                            return b || a === c ? void(b = !1) : (d = g.differenceObjects(c, a), d.forEach(function (a) {
                                                return a.setMap(null)
                                            }))
                                        })
                                    })
                                }) : b.error("Free Draw Polygons must be of type Array!") : b.error("No polygons to bind to!")
                            }
                        }(this))
                    }, h
                }(d)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api").service("uiGmapICircle", [
            function () {
                var a;
                return a = {}, {
                    restrict: "EA",
                    replace: !0,
                    require: "^uiGmapGoogleMap",
                    scope: {
                        center: "=center",
                        radius: "=radius",
                        stroke: "=stroke",
                        fill: "=fill",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        geodesic: "=",
                        icons: "=icons",
                        visible: "=",
                        events: "=",
                        zIndex: "=zindex"
                    }
                }
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIControl", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle",
            function (b, c, d) {
                var e;
                return e = function (b) {
                    function e() {
                        this.restrict = "EA", this.replace = !0, this.require = "^uiGmapGoogleMap", this.scope = {
                            template: "@template",
                            position: "@position",
                            controller: "@controller",
                            index: "@index"
                        }, this.$log = c
                    }
                    return a(e, b), e.extend(d), e.prototype.link = function () {
                        throw new Exception("Not implemented!!")
                    }, e
                }(b)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api").service("uiGmapIDrawingManager", [
            function () {
                return {
                    restrict: "EA",
                    replace: !0,
                    require: "^uiGmapGoogleMap",
                    scope: {
                        "static": "@",
                        control: "=",
                        options: "=",
                        events: "="
                    }
                }
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIMarker", ["uiGmapBaseObject", "uiGmapCtrlHandle",
            function (b, c) {
                var d;
                return d = function (b) {
                    function d() {
                        this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.replace = !0, this.scope = _.extend(this.scope || {}, d.scope)
                    }
                    return a(d, b), d.scope = {
                        coords: "=coords",
                        icon: "=icon",
                        click: "&click",
                        options: "=options",
                        events: "=events",
                        fit: "=fit",
                        idKey: "=idkey",
                        control: "=control"
                    }, d.scopeKeys = _.keys(d.scope), d.keys = d.scopeKeys, d.extend(c), d
                }(b)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIPolygon", ["uiGmapGmapUtil", "uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle",
            function (b, c, d, e) {
                var f;
                return f = function (c) {
                    function f() {}
                    return a(f, c), f.scope = {
                        path: "=path",
                        stroke: "=stroke",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        geodesic: "=",
                        fill: "=",
                        icons: "=icons",
                        visible: "=",
                        "static": "=",
                        events: "=",
                        zIndex: "=zindex",
                        fit: "=",
                        control: "=control"
                    }, f.scopeKeys = _.keys(f.scope), f.include(b), f.extend(e), f.prototype.restrict = "EMA", f.prototype.replace = !0, f.prototype.require = "^uiGmapGoogleMap", f.prototype.scope = f.scope, f.prototype.DEFAULTS = {}, f.prototype.$log = d, f
                }(c)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIPolyline", ["uiGmapGmapUtil", "uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle",
            function (b, c, d, e) {
                var f;
                return f = function (c) {
                    function f() {}
                    return a(f, c), f.scope = {
                        path: "=",
                        stroke: "=",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        geodesic: "=",
                        icons: "=",
                        visible: "=",
                        "static": "=",
                        fit: "=",
                        events: "=",
                        zIndex: "=zindex"
                    }, f.scopeKeys = _.keys(f.scope), f.include(b), f.extend(e), f.prototype.restrict = "EMA", f.prototype.replace = !0, f.prototype.require = "^uiGmapGoogleMap", f.prototype.scope = f.scope, f.prototype.DEFAULTS = {}, f.prototype.$log = d, f
                }(c)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api").service("uiGmapIRectangle", [
            function () {
                var a;
                return a = {}, {
                    restrict: "EMA",
                    require: "^uiGmapGoogleMap",
                    replace: !0,
                    scope: {
                        bounds: "=",
                        stroke: "=",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        fill: "=",
                        visible: "=",
                        events: "="
                    }
                }
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIWindow", ["uiGmapBaseObject", "uiGmapChildEvents", "uiGmapCtrlHandle",
            function (b, c, d) {
                var e;
                return e = function (b) {
                    function e() {
                        this.restrict = "EMA", this.template = void 0, this.transclude = !0, this.priority = -100, this.require = "^uiGmapGoogleMap", this.replace = !0, this.scope = _.extend(this.scope || {}, e.scope)
                    }
                    return a(e, b), e.scope = {
                        coords: "=coords",
                        template: "=template",
                        templateUrl: "=templateurl",
                        templateParameter: "=templateparameter",
                        isIconVisibleOnClick: "=isiconvisibleonclick",
                        closeClick: "&closeclick",
                        options: "=options",
                        control: "=control",
                        show: "=show"
                    }, e.scopeKeys = _.keys(e.scope), e.include(c), e.extend(d), e
                }(b)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            d = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var d in b) e.call(b, d) && (a[d] = b[d]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            e = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMap", ["$timeout", "$q", "uiGmapLogger", "uiGmapGmapUtil", "uiGmapBaseObject", "uiGmapCtrlHandle", "uiGmapIsReady", "uiGmapuuid", "uiGmapExtendGWin", "uiGmapExtendMarkerClusterer", "uiGmapGoogleMapsUtilV3", "uiGmapGoogleMapApi", "uiGmapEventsHelper",
            function (e, f, g, h, i, j, k, l, m, n, o, p, q) {
                var r, s, t;
                return r = void 0, t = [o, m, n], s = function (f) {
                    function i() {
                        this.link = a(this.link, this);
                        var b, c;
                        b = function (a) {
                            var b, c;
                            return c = void 0, a.$on("$destroy", function () {
                                return k.reset()
                            }), b = j.handle(a), a.ctrlType = "Map", a.deferred.promise.then(function () {
                                return t.forEach(function (a) {
                                    return a.init()
                                })
                            }), b.getMap = function () {
                                return a.map
                            }, c = _.extend(this, b)
                        }, this.controller = ["$scope", b], c = this
                    }
                    return d(i, f), i.include(h), i.prototype.restrict = "EMA", i.prototype.transclude = !0, i.prototype.replace = !1, i.prototype.template = '<div class="angular-google-map"><div class="angular-google-map-container"></div><div ng-transclude style="display: none"></div></div>', i.prototype.scope = {
                        center: "=",
                        zoom: "=",
                        dragging: "=",
                        control: "=",
                        options: "=",
                        events: "=",
                        eventOpts: "=",
                        styles: "=",
                        bounds: "=",
                        update: "="
                    }, i.prototype.link = function (a, d, f) {
                        var h, i;
                        return h = [], a.$on("$destroy", function () {
                            return q.removeEvents(h)
                        }), a.idleAndZoomChanged = !1, null == a.center ? void(i = a.$watch("center", function (b) {
                            return function () {
                                return a.center ? (i(), b.link(a, d, f)) : void 0
                            }
                        }(this))) : p.then(function (i) {
                            return function (j) {
                                var m, n, o, p, s, t, u, v, w, x, y, z, A, B, C, D, E;
                                if (r = {
                                    mapTypeId: j.MapTypeId.ROADMAP
                                }, B = k.spawn(), z = function () {
                                    return B.deferred.resolve({
                                        instance: B.instance,
                                        map: m
                                    })
                                }, !i.validateCoords(a.center)) return void g.error("angular-google-maps: could not find a valid center property");
                                if (!b.isDefined(a.zoom)) return void g.error("angular-google-maps: map zoom property not set");
                                if (s = b.element(d), s.addClass("angular-google-map"), x = {
                                    options: {}
                                }, f.options && (x.options = a.options), f.styles && (x.styles = a.styles), f.type && (C = f.type.toUpperCase(), google.maps.MapTypeId.hasOwnProperty(C) ? x.mapTypeId = google.maps.MapTypeId[f.type.toUpperCase()] : g.error("angular-google-maps: invalid map type '" + f.type + "'")), v = b.extend({}, r, x, {
                                    center: i.getCoords(a.center),
                                    zoom: a.zoom,
                                    bounds: a.bounds
                                }), m = new google.maps.Map(s.find("div")[1], v), m.uiGmap_id = l.generate(), p = !1, h.push(google.maps.event.addListenerOnce(m, "idle", function () {
                                    return a.deferred.resolve(m), z()
                                })), o = f.events && null != (null != (y = a.events) ? y.blacklist : void 0) ? a.events.blacklist : [], _.isString(o) && (o = [o]), w = function (b, c, d) {
                                    return _.contains(o, b) ? void 0 : (d && d(), h.push(google.maps.event.addListener(m, b, function () {
                                        var b;
                                        return (null != (b = a.update) ? b.lazy : void 0) ? void 0 : c()
                                    })))
                                }, _.contains(o, "all") || (w("dragstart", function () {
                                    return p = !0, a.$evalAsync(function (a) {
                                        return null != a.dragging ? a.dragging = p : void 0
                                    })
                                }), w("dragend", function () {
                                    return p = !1, a.$evalAsync(function (a) {
                                        return null != a.dragging ? a.dragging = p : void 0
                                    })
                                }), D = function (c, d) {
                                    if (null == c && (c = m.center), null == d && (d = a), !_.contains(o, "center"))
                                        if (b.isDefined(d.center.type)) {
                                            if (d.center.coordinates[1] !== c.lat() && (d.center.coordinates[1] = c.lat()), d.center.coordinates[0] !== c.lng()) return d.center.coordinates[0] = c.lng()
                                        } else if (d.center.latitude !== c.lat() && (d.center.latitude = c.lat()), d.center.longitude !== c.lng()) return d.center.longitude = c.lng()
                                }, A = !1, w("idle", function () {
                                    var b, d, e;
                                    return b = m.getBounds(), d = b.getNorthEast(), e = b.getSouthWest(), A = !0, a.$evalAsync(function (b) {
                                        return D(), null === b.bounds || b.bounds === c || void 0 === b.bounds || _.contains(o, "bounds") || (b.bounds.northeast = {
                                            latitude: d.lat(),
                                            longitude: d.lng()
                                        }, b.bounds.southwest = {
                                            latitude: e.lat(),
                                            longitude: e.lng()
                                        }), _.contains(o, "zoom") || (b.zoom = m.zoom, a.idleAndZoomChanged = !a.idleAndZoomChanged), A = !1
                                    })
                                })), b.isDefined(a.events) && null !== a.events && b.isObject(a.events)) {
                                    u = function (b) {
                                        return function () {
                                            return a.events[b].apply(a, [m, b, arguments])
                                        }
                                    }, n = [];
                                    for (t in a.events) a.events.hasOwnProperty(t) && b.isFunction(a.events[t]) && n.push(google.maps.event.addListener(m, t, u(t)));
                                    h.concat(n)
                                }
                                return m.getOptions = function () {
                                    return v
                                }, a.map = m, null != f.control && null != a.control && (a.control.refresh = function (a) {
                                    var b, c, d;
                                    if (null != m) return null != ("undefined" != typeof google && null !== google && null != (c = google.maps) && null != (d = c.event) ? d.trigger : void 0) && null != m && google.maps.event.trigger(m, "resize"), null != (null != a ? a.latitude : void 0) && null != (null != a ? a.longitude : void 0) ? (b = i.getCoords(a), i.isTrue(f.pan) ? m.panTo(b) : m.setCenter(b)) : void 0
                                }, a.control.getGMap = function () {
                                    return m
                                }, a.control.getMapOptions = function () {
                                    return v
                                }, a.control.getCustomEventListeners = function () {
                                    return n
                                }, a.control.removeEvents = function (a) {
                                    return q.removeEvents(a)
                                }), a.$watch("center", function (b, c) {
                                    var d, e;
                                    if (b !== c && !A && (d = i.getCoords(a.center), d.lat() !== m.center.lat() || d.lng() !== m.center.lng())) return e = !0, p || (i.validateCoords(b) || g.error("Invalid center for newValue: " + JSON.stringify(b)), i.isTrue(f.pan) && a.zoom === m.zoom ? m.panTo(d) : m.setCenter(d)), e = !1
                                }, !0), E = null, a.$watch("zoom", function (b, c) {
                                    var d, f, g;
                                    if (null != b && !_.isEqual(b, c) && (null != m ? m.getZoom() : void 0) !== (null != a ? a.zoom : void 0) && !A) return g = !0, null != E && e.cancel(E), E = e(function () {
                                        return m.setZoom(b), g = !1
                                    }, (null != (d = a.eventOpts) && null != (f = d.debounce) ? f.zoomMs : void 0) + 20, !1)
                                }), a.$watch("bounds", function (a, b) {
                                    var c, d, e, f, h, i, j;
                                    if (a !== b) return null == (null != a && null != (e = a.northeast) ? e.latitude : void 0) || null == (null != a && null != (f = a.northeast) ? f.longitude : void 0) || null == (null != a && null != (h = a.southwest) ? h.latitude : void 0) || null == (null != a && null != (i = a.southwest) ? i.longitude : void 0) ? void g.error("Invalid map bounds for new value: " + JSON.stringify(a)) : (d = new google.maps.LatLng(a.northeast.latitude, a.northeast.longitude), j = new google.maps.LatLng(a.southwest.latitude, a.southwest.longitude), c = new google.maps.LatLngBounds(j, d), m.fitBounds(c))
                                }), ["options", "styles"].forEach(function (b) {
                                    return a.$watch(b, function (a, b) {
                                        var c;
                                        return c = this.exp, _.isEqual(a, b) ? void 0 : ("options" === c ? x.options = a : x.options[c] = a, null != m ? m.setOptions(x) : void 0)
                                    }, !0)
                                })
                            }
                        }(this))
                    }, i
                }(i)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarker", ["uiGmapIMarker", "uiGmapMarkerChildModel", "uiGmapMarkerManager", "uiGmapLogger",
            function (b, d, e, f) {
                var g;
                return g = function (g) {
                    function h() {
                        this.link = a(this.link, this), h.__super__.constructor.call(this), this.template = '<span class="angular-google-map-marker" ng-transclude></span>', f.info(this)
                    }
                    return c(h, g), h.prototype.controller = ["$scope", "$element",
                        function (a, c) {
                            return a.ctrlType = "Marker", _.extend(this, b.handle(a, c))
                        }], h.prototype.link = function (a, c, f, g) {
                        var h;
                        return h = b.mapPromise(a, g), h.then(function () {
                            return function (c) {
                                var f, g, h, i, j, k;
                                return h = new e(c), i = _.object(b.keys, b.keys), j = new d(a, a, i, c, {}, f = !0, h, g = !1, k = !1), j.deferred.promise.then(function (b) {
                                    return a.deferred.resolve(b)
                                }), null != a.control ? a.control.getGMarkers = h.getGMarkers : void 0
                            }
                        }(this)), a.$on("$destroy", function () {
                            return function () {
                                var a;
                                return "undefined" != typeof a && null !== a && a.clear(), a = null
                            }
                        }(this))
                    }, h
                }(b)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                function d() {
                    this.constructor = a
                }
                for (var e in b) c.call(b, e) && (a[e] = b[e]);
                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
            },
            c = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarkers", ["uiGmapIMarker", "uiGmapPlural", "uiGmapMarkersParentModel", "uiGmap_sync", "uiGmapLogger",
            function (b, c, d, e, f) {
                var g;
                return g = function (e) {
                    function g() {
                        g.__super__.constructor.call(this), this.template = '<span class="angular-google-map-markers" ng-transclude></span>', c.extend(this, {
                            doCluster: "=docluster",
                            clusterOptions: "=clusteroptions",
                            clusterEvents: "=clusterevents",
                            modelsByRef: "=modelsbyref"
                        }), f.info(this)
                    }
                    return a(g, e), g.prototype.controller = ["$scope", "$element",
                        function (a, c) {
                            return a.ctrlType = "Markers", _.extend(this, b.handle(a, c))
                        }], g.prototype.link = function (a, e, f, g) {
                        var h, i;
                        return h = void 0, i = function () {
                            return a.deferred.resolve()
                        }, b.mapPromise(a, g).then(function (b) {
                            var j;
                            return j = g.getScope(), j.$watch("idleAndZoomChanged", function () {
                                return _.defer(h.gManager.draw)
                            }), h = new d(a, e, f, b), c.link(a, h), null != a.control && (a.control.getGMarkers = function () {
                                var a;
                                return null != (a = h.gManager) ? a.getGMarkers() : void 0
                            }, a.control.getChildMarkers = function () {
                                return h.plurals
                            }), _.last(h.existingPieces._content).then(function () {
                                return i()
                            })
                        })
                    }, g
                }(b)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api").service("uiGmapPlural", [
            function () {
                var a;
                return a = function (a, b) {
                    return null != a.control ? (a.control.updateModels = function (c) {
                        return a.models = c, b.createChildScopes(!1)
                    }, a.control.newModels = function (c) {
                        return a.models = c, b.rebuildAll(a, !0, !0)
                    }, a.control.clean = function () {
                        return b.rebuildAll(a, !1, !0)
                    }, a.control.getPlurals = function () {
                        return b.plurals
                    }, a.control.getManager = function () {
                        return b.gManager
                    }, a.control.hasManager = function () {
                        return null != b.gManager == !0
                    }, a.control.managerDraw = function () {
                        var b;
                        return a.control.hasManager() && null != (b = a.control.getManager()) ? b.draw() : void 0
                    }) : void 0
                }, {
                    extend: function (a, b) {
                        return _.extend(a.scope || {}, b || {}, {
                            idKey: "=idkey",
                            doRebuildAll: "=dorebuildall",
                            models: "=models",
                            chunk: "=chunk",
                            cleanchunk: "=cleanchunk",
                            control: "=control"
                        })
                    },
                    link: function (b, c) {
                        return a(b, c)
                    }
                }
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygon", ["uiGmapIPolygon", "$timeout", "uiGmaparray-sync", "uiGmapPolygonChildModel",
            function (b, d, e, f) {
                var g;
                return g = function (d) {
                    function e() {
                        return this.link = a(this.link, this), e.__super__.constructor.apply(this, arguments)
                    }
                    return c(e, d), e.prototype.link = function (a, c, d, e) {
                        var g, h;
                        return g = [], h = b.mapPromise(a, e), null != a.control && (a.control.getInstance = this, a.control.polygons = g, a.control.promise = h), h.then(function (b) {
                            return function (c) {
                                return g.push(new f(a, d, c, b.DEFAULTS))
                            }
                        }(this))
                    }, e
                }(b)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygons", ["uiGmapIPolygon", "$timeout", "uiGmaparray-sync", "uiGmapPolygonsParentModel", "uiGmapPlural",
            function (d, e, f, g, h) {
                var i;
                return i = function (d) {
                    function e() {
                        this.link = a(this.link, this), e.__super__.constructor.call(this), h.extend(this), this.$log.info(this)
                    }
                    return c(e, d), e.prototype.link = function (a, c, d, e) {
                        return e.getScope().deferred.promise.then(function (e) {
                            return function (f) {
                                return (b.isUndefined(a.path) || null === a.path) && e.$log.warn("polygons: no valid path attribute found"), a.models || e.$log.warn("polygons: no models found to create from"), h.link(a, new g(a, c, d, f, e.DEFAULTS))
                            }
                        }(this))
                    }, e
                }(d)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolyline", ["uiGmapIPolyline", "$timeout", "uiGmaparray-sync", "uiGmapPolylineChildModel",
            function (d, e, f, g) {
                var h;
                return h = function (e) {
                    function f() {
                        return this.link = a(this.link, this), f.__super__.constructor.apply(this, arguments)
                    }
                    return c(f, e), f.prototype.link = function (a, c, e, f) {
                        return d.mapPromise(a, f).then(function (c) {
                            return function (d) {
                                return (b.isUndefined(a.path) || null === a.path || !c.validatePath(a.path)) && c.$log.warn("polyline: no valid path attribute found"), new g(a, e, d, c.DEFAULTS)
                            }
                        }(this))
                    }, f
                }(d)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolylines", ["uiGmapIPolyline", "$timeout", "uiGmaparray-sync", "uiGmapPolylinesParentModel", "uiGmapPlural",
            function (d, e, f, g, h) {
                var i;
                return i = function (d) {
                    function e() {
                        this.link = a(this.link, this), e.__super__.constructor.call(this), h.extend(this), this.$log.info(this)
                    }
                    return c(e, d), e.prototype.link = function (a, c, d, e) {
                        return e.getScope().deferred.promise.then(function (e) {
                            return function (f) {
                                return (b.isUndefined(a.path) || null === a.path) && e.$log.warn("polylines: no valid path attribute found"), a.models || e.$log.warn("polylines: no models found to create from"), h.link(a, new g(a, c, d, f, e.DEFAULTS))
                            }
                        }(this))
                    }, e
                }(d)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapRectangle", ["uiGmapLogger", "uiGmapGmapUtil", "uiGmapIRectangle", "uiGmapRectangleParentModel",
            function (a, b, c, d) {
                return _.extend(c, {
                    link: function (a, b, c, e) {
                        return e.getScope().deferred.promise.then(function () {
                            return function (e) {
                                return new d(a, b, c, e)
                            }
                        }(this))
                    }
                })
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapWindow", ["uiGmapIWindow", "uiGmapGmapUtil", "uiGmapWindowChildModel", "uiGmapLodash", "uiGmapLogger",
            function (d, e, f, g, h) {
                var i;
                return i = function (i) {
                    function j() {
                        this.link = a(this.link, this), j.__super__.constructor.call(this), this.require = ["^uiGmapGoogleMap", "^?uiGmapMarker"], this.template = '<span class="angular-google-maps-window" ng-transclude></span>', h.debug(this), this.childWindows = []
                    }
                    return c(j, i), j.include(e), j.prototype.link = function (a, c, e, f) {
                        var g, h;
                        return g = f.length > 1 && null != f[1] ? f[1] : void 0, h = null != g ? g.getScope() : void 0, this.mapPromise = d.mapPromise(a, f[0]), this.mapPromise.then(function (d) {
                            return function (f) {
                                var i;
                                return i = !0, b.isDefined(e.isiconvisibleonclick) && (i = a.isIconVisibleOnClick), g ? h.deferred.promise.then(function () {
                                    return d.init(a, c, i, f, h)
                                }) : void d.init(a, c, i, f)
                            }
                        }(this))
                    }, j.prototype.init = function (a, b, c, d, e) {
                        var h, i, j, k, l;
                        return i = null != a.options ? a.options : {}, k = null != a && this.validateCoords(a.coords), null != (null != e ? e.getGMarker : void 0) && (j = e.getGMarker()), l = k ? this.createWindowOptions(j, a, b.html(), i) : i, null != d && (h = new f({}, a, l, c, d, e, b), this.childWindows.push(h), a.$on("$destroy", function (a) {
                            return function () {
                                return a.childWindows = g.withoutObjects(a.childWindows, [h], function (a, b) {
                                    return a.scope.$id === b.scope.$id
                                }), a.childWindows.length = 0
                            }
                        }(this))), null != a.control && (a.control.getGWindows = function (a) {
                            return function () {
                                return a.childWindows.map(function (a) {
                                    return a.gObject
                                })
                            }
                        }(this), a.control.getChildWindows = function (a) {
                            return function () {
                                return a.childWindows
                            }
                        }(this), a.control.getPlurals = a.control.getChildWindows, a.control.showWindow = function (a) {
                            return function () {
                                return a.childWindows.map(function (a) {
                                    return a.showWindow()
                                })
                            }
                        }(this), a.control.hideWindow = function (a) {
                            return function () {
                                return a.childWindows.map(function (a) {
                                    return a.hideWindow()
                                })
                            }
                        }(this)), null != this.onChildCreation && null != h ? this.onChildCreation(h) : void 0
                    }, j
                }(d)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            c = function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            d = {}.hasOwnProperty;
        b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapWindows", ["uiGmapIWindow", "uiGmapPlural", "uiGmapWindowsParentModel", "uiGmapPromise", "uiGmapLogger",
            function (b, d, e, f, g) {
                var h;
                return h = function (b) {
                    function h() {
                        this.init = a(this.init, this), this.link = a(this.link, this), h.__super__.constructor.call(this), this.require = ["^uiGmapGoogleMap", "^?uiGmapMarkers"], this.template = '<span class="angular-google-maps-windows" ng-transclude></span>', d.extend(this), g.debug(this)
                    }
                    return c(h, b), h.prototype.link = function (a, b, c, d) {
                        var e, g, h;
                        return e = d[0].getScope(), g = d.length > 1 && null != d[1] ? d[1] : void 0, h = null != g ? g.getScope() : void 0, e.deferred.promise.then(function (e) {
                            return function (g) {
                                var i, j;
                                return i = (null != h && null != (j = h.deferred) ? j.promise : void 0) || f.resolve(), i.then(function () {
                                    var f, i;
                                    return f = null != (i = e.parentModel) ? i.existingPieces : void 0, f ? f.then(function () {
                                        return e.init(a, b, c, d, g, h)
                                    }) : e.init(a, b, c, d, g, h)
                                })
                            }
                        }(this))
                    }, h.prototype.init = function (a, b, c, f, g, h) {
                        var i;
                        return i = new e(a, b, c, f, g, h), d.link(a, i), null != a.control ? (a.control.getGWindows = function () {
                            return function () {
                                return i.plurals.map(function (a) {
                                    return a.gObject
                                })
                            }
                        }(this), a.control.getChildWindows = function () {
                            return function () {
                                return i.plurals
                            }
                        }(this)) : void 0
                    }, h
                }(b)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapGoogleMap", ["uiGmapMap",
            function (a) {
                return new a
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapMarker", ["$timeout", "uiGmapMarker",
            function (a, b) {
                return new b(a)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapMarkers", ["$timeout", "uiGmapMarkers",
            function (a, b) {
                return new b(a)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapPolygon", ["uiGmapPolygon",
            function (a) {
                return new a
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapCircle", ["uiGmapCircle",
            function (a) {
                return a
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapPolyline", ["uiGmapPolyline",
            function (a) {
                return new a
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapPolylines", ["uiGmapPolylines",
            function (a) {
                return new a
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapRectangle", ["uiGmapLogger", "uiGmapRectangle",
            function (a, b) {
                return b
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapWindow", ["$timeout", "$compile", "$http", "$templateCache", "uiGmapWindow",
            function (a, b, c, d, e) {
                return new e(a, b, c, d)
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapWindows", ["$timeout", "$compile", "$http", "$templateCache", "$interpolate", "uiGmapWindows",
            function (a, b, c, d, e, f) {
                return new f(a, b, c, d, e)
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        };
        b.module("uiGmapgoogle-maps").directive("uiGmapLayer", ["$timeout", "uiGmapLogger", "uiGmapLayerParentModel",
            function (b, c, d) {
                var e;
                return new(e = function () {
                    function b() {
                        this.link = a(this.link, this), this.$log = c, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = "<span class='angular-google-map-layer' ng-transclude></span>", this.replace = !0, this.scope = {
                            show: "=show",
                            type: "=type",
                            namespace: "=namespace",
                            options: "=options",
                            onCreated: "&oncreated"
                        }
                    }
                    return b.prototype.link = function (a, b, c, e) {
                        return e.getScope().deferred.promise.then(function () {
                            return function (e) {
                                return null != a.onCreated ? new d(a, b, c, e, a.onCreated) : new d(a, b, c, e)
                            }
                        }(this))
                    }, b
                }())
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapMapControl", ["uiGmapControl",
            function (a) {
                return new a
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapDragZoom", ["uiGmapDragZoom",
            function (a) {
                return a
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapDrawingManager", ["uiGmapDrawingManager",
            function (a) {
                return a
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapFreeDrawPolygons", ["uiGmapApiFreeDrawPolygons",
            function (a) {
                return new a
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        };
        b.module("uiGmapgoogle-maps").directive("uiGmapMapType", ["$timeout", "uiGmapLogger", "uiGmapMapTypeParentModel",
            function (b, c, d) {
                var e;
                return new(e = function () {
                    function b() {
                        this.link = a(this.link, this), this.$log = c, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = '<span class="angular-google-map-layer" ng-transclude></span>', this.replace = !0, this.scope = {
                            show: "=show",
                            options: "=options",
                            refresh: "=refresh",
                            id: "@"
                        }
                    }
                    return b.prototype.link = function (a, b, c, e) {
                        return e.getScope().deferred.promise.then(function () {
                            return function (e) {
                                return new d(a, b, c, e)
                            }
                        }(this))
                    }, b
                }())
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapPolygons", ["uiGmapPolygons",
            function (a) {
                return new a
            }])
    }.call(this),
    function () {
        var a = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        };
        b.module("uiGmapgoogle-maps").directive("uiGmapSearchBox", ["uiGmapGoogleMapApi", "uiGmapLogger", "uiGmapSearchBoxParentModel", "$http", "$templateCache", "$compile",
            function (c, d, e, f, g, h) {
                var i;
                return new(i = function () {
                    function i() {
                        this.link = a(this.link, this), this.$log = d, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = "<span class='angular-google-map-search' ng-transclude></span>", this.replace = !0, this.scope = {
                            template: "=template",
                            events: "=events",
                            position: "=?position",
                            options: "=?options",
                            parentdiv: "=?parentdiv",
                            ngModel: "=?"
                        }
                    }
                    return i.prototype.require = "ngModel", i.prototype.link = function (a, d, i, j) {
                        return c.then(function (c) {
                            return function (k) {
                                return f.get(a.template, {
                                    cache: g
                                }).success(function (f) {
                                    return b.isUndefined(a.events) ? void c.$log.error("searchBox: the events property is required") : j.getScope().deferred.promise.then(function (g) {
                                        var j;
                                        return j = b.isDefined(a.position) ? a.position.toUpperCase().replace(/-/g, "_") : "TOP_LEFT", k.ControlPosition[j] ? new e(a, d, i, g, j, h(f)(a)) : void c.$log.error("searchBox: invalid position property")
                                    })
                                })
                            }
                        }(this))
                    }, i
                }())
            }])
    }.call(this),
    function () {
        b.module("uiGmapgoogle-maps").directive("uiGmapShow", ["$animate", "uiGmapLogger",
            function (a, c) {
                return {
                    scope: {
                        uiGmapShow: "=",
                        uiGmapAfterShow: "&",
                        uiGmapAfterHide: "&"
                    },
                    link: function (d, e) {
                        var f, g, h;
                        return f = function (b, c) {
                            return a[b](e, "ng-hide").then(function () {
                                return c()
                            })
                        }, g = function (b, c) {
                            return a[b](e, "ng-hide", c)
                        }, h = function (a, d) {
                            return b.version.major > 1 ? c.error("uiGmapShow is not supported for Angular Major greater than 1.\nYour Major is " + b.version.major + '"') : 1 === b.version.major && b.version.minor < 3 ? g(a, d) : f(a, d)
                        }, d.$watch("uiGmapShow", function (a) {
                            return a && h("removeClass", d.uiGmapAfterShow), a ? void 0 : h("addClass", d.uiGmapAfterHide)
                        })
                    }
                }
            }])
    }.call(this), b.module("uiGmapgoogle-maps.wrapped").service("uiGmapuuid", function () {
        function a() {}
        return a.generate = function () {
            var b = a._gri,
                c = a._ha;
            return c(b(32), 8) + "-" + c(b(16), 4) + "-" + c(16384 | b(12), 4) + "-" + c(32768 | b(14), 4) + "-" + c(b(48), 12)
        }, a._gri = function (a) {
            return 0 > a ? 0 / 0 : 30 >= a ? 0 | Math.random() * (1 << a) : 53 >= a ? (0 | 1073741824 * Math.random()) + 1073741824 * (0 | Math.random() * (1 << a - 30)) : 0 / 0
        }, a._ha = function (a, b) {
            for (var c = a.toString(16), d = b - c.length, e = "0"; d > 0; d >>>= 1, e += e) 1 & d && (c = e + c);
            return c
        }, a
    }), b.module("uiGmapgoogle-maps.wrapped").service("uiGmapGoogleMapsUtilV3", function () {
        return {
            init: _.once(function () {
                function b(a) {
                    a = a || {}, google.maps.OverlayView.apply(this, arguments), this.content_ = a.content || "", this.disableAutoPan_ = a.disableAutoPan || !1, this.maxWidth_ = a.maxWidth || 0, this.pixelOffset_ = a.pixelOffset || new google.maps.Size(0, 0), this.position_ = a.position || new google.maps.LatLng(0, 0), this.zIndex_ = a.zIndex || null, this.boxClass_ = a.boxClass || "infoBox", this.boxStyle_ = a.boxStyle || {}, this.closeBoxMargin_ = a.closeBoxMargin || "2px", this.closeBoxURL_ = a.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif", "" === a.closeBoxURL && (this.closeBoxURL_ = ""), this.infoBoxClearance_ = a.infoBoxClearance || new google.maps.Size(1, 1), "undefined" == typeof a.visible && (a.visible = "undefined" == typeof a.isHidden ? !0 : !a.isHidden), this.isHidden_ = !a.visible, this.alignBottom_ = a.alignBottom || !1, this.pane_ = a.pane || "floatPane", this.enableEventPropagation_ = a.enableEventPropagation || !1, this.div_ = null, this.closeListener_ = null, this.moveListener_ = null, this.contextListener_ = null, this.eventListeners_ = null, this.fixedWidthSet_ = null
                }

                function d(a, b) {
                    a.getMarkerClusterer().extend(d, google.maps.OverlayView), this.cluster_ = a, this.className_ = a.getMarkerClusterer().getClusterClass(), this.styles_ = b, this.center_ = null, this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(a.getMap())
                }

                function e(a) {
                    this.markerClusterer_ = a, this.map_ = a.getMap(), this.gridSize_ = a.getGridSize(), this.minClusterSize_ = a.getMinimumClusterSize(), this.averageCenter_ = a.getAverageCenter(), this.markers_ = [], this.center_ = null, this.bounds_ = null, this.clusterIcon_ = new d(this, a.getStyles())
                }

                function f(a, b, d) {
                    this.extend(f, google.maps.OverlayView), b = b || [], d = d || {}, this.markers_ = [], this.clusters_ = [], this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1, this.gridSize_ = d.gridSize || 60, this.minClusterSize_ = d.minimumClusterSize || 2, this.maxZoom_ = d.maxZoom || null, this.styles_ = d.styles || [], this.title_ = d.title || "", this.zoomOnClick_ = !0, d.zoomOnClick !== c && (this.zoomOnClick_ = d.zoomOnClick), this.averageCenter_ = !1, d.averageCenter !== c && (this.averageCenter_ = d.averageCenter), this.ignoreHidden_ = !1, d.ignoreHidden !== c && (this.ignoreHidden_ = d.ignoreHidden), this.enableRetinaIcons_ = !1, d.enableRetinaIcons !== c && (this.enableRetinaIcons_ = d.enableRetinaIcons), this.imagePath_ = d.imagePath || f.IMAGE_PATH, this.imageExtension_ = d.imageExtension || f.IMAGE_EXTENSION, this.imageSizes_ = d.imageSizes || f.IMAGE_SIZES, this.calculator_ = d.calculator || f.CALCULATOR, this.batchSize_ = d.batchSize || f.BATCH_SIZE, this.batchSizeIE_ = d.batchSizeIE || f.BATCH_SIZE_IE, this.clusterClass_ = d.clusterClass || "cluster", -1 !== navigator.userAgent.toLowerCase().indexOf("msie") && (this.batchSize_ = this.batchSizeIE_),
                    this.setupStyles_(), this.addMarkers(b, !0), this.setMap(a)
                }

                function g(a, b) {
                    function c() {}
                    c.prototype = b.prototype, a.superClass_ = b.prototype, a.prototype = new c, a.prototype.constructor = a
                }

                function h(a, b) {
                    this.marker_ = a, this.handCursorURL_ = a.handCursorURL, this.labelDiv_ = document.createElement("div"), this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;", this.eventDiv_ = document.createElement("div"), this.eventDiv_.style.cssText = this.labelDiv_.style.cssText, this.eventDiv_.setAttribute("onselectstart", "return false;"), this.eventDiv_.setAttribute("ondragstart", "return false;"), this.crossDiv_ = h.getSharedCross(b)
                }

                function i(a) {
                    a = a || {}, a.labelContent = a.labelContent || "", a.labelAnchor = a.labelAnchor || new google.maps.Point(0, 0), a.labelClass = a.labelClass || "markerLabels", a.labelStyle = a.labelStyle || {}, a.labelInBackground = a.labelInBackground || !1, "undefined" == typeof a.labelVisible && (a.labelVisible = !0), "undefined" == typeof a.raiseOnDrag && (a.raiseOnDrag = !0), "undefined" == typeof a.clickable && (a.clickable = !0), "undefined" == typeof a.draggable && (a.draggable = !1), "undefined" == typeof a.optimized && (a.optimized = !1), a.crossImage = a.crossImage || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png", a.handCursor = a.handCursor || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur", a.optimized = !1, this.label = new h(this, a.crossImage, a.handCursor), google.maps.Marker.apply(this, arguments)
                }
                b.prototype = new google.maps.OverlayView, b.prototype.createInfoBoxDiv_ = function () {
                    var a, b, c, d = this,
                        e = function (a) {
                            a.cancelBubble = !0, a.stopPropagation && a.stopPropagation()
                        },
                        f = function (a) {
                            a.returnValue = !1, a.preventDefault && a.preventDefault(), d.enableEventPropagation_ || e(a)
                        };
                    if (!this.div_) {
                        if (this.div_ = document.createElement("div"), this.setBoxStyle_(), "undefined" == typeof this.content_.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + this.content_ : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(this.content_)), this.getPanes()[this.pane_].appendChild(this.div_), this.addClickHandler_(), this.div_.style.width ? this.fixedWidthSet_ = !0 : 0 !== this.maxWidth_ && this.div_.offsetWidth > this.maxWidth_ ? (this.div_.style.width = this.maxWidth_, this.div_.style.overflow = "auto", this.fixedWidthSet_ = !0) : (c = this.getBoxWidths_(), this.div_.style.width = this.div_.offsetWidth - c.left - c.right + "px", this.fixedWidthSet_ = !1), this.panBox_(this.disableAutoPan_), !this.enableEventPropagation_) {
                            for (this.eventListeners_ = [], b = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"], a = 0; a < b.length; a++) this.eventListeners_.push(google.maps.event.addDomListener(this.div_, b[a], e));
                            this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function () {
                                this.style.cursor = "default"
                            }))
                        }
                        this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", f), google.maps.event.trigger(this, "domready")
                    }
                }, b.prototype.getCloseBoxImg_ = function () {
                    var a = "";
                    return "" !== this.closeBoxURL_ && (a = "<img", a += " src='" + this.closeBoxURL_ + "'", a += " align=right", a += " style='", a += " position: relative;", a += " cursor: pointer;", a += " margin: " + this.closeBoxMargin_ + ";", a += "'>"), a
                }, b.prototype.addClickHandler_ = function () {
                    var a;
                    "" !== this.closeBoxURL_ ? (a = this.div_.firstChild, this.closeListener_ = google.maps.event.addDomListener(a, "click", this.getCloseClickHandler_())) : this.closeListener_ = null
                }, b.prototype.getCloseClickHandler_ = function () {
                    var a = this;
                    return function (b) {
                        b.cancelBubble = !0, b.stopPropagation && b.stopPropagation(), google.maps.event.trigger(a, "closeclick"), a.close()
                    }
                }, b.prototype.panBox_ = function (a) {
                    var b, c, d = 0,
                        e = 0;
                    if (!a && (b = this.getMap(), b instanceof google.maps.Map)) {
                        b.getBounds().contains(this.position_) || b.setCenter(this.position_), c = b.getBounds();
                        var f = b.getDiv(),
                            g = f.offsetWidth,
                            h = f.offsetHeight,
                            i = this.pixelOffset_.width,
                            j = this.pixelOffset_.height,
                            k = this.div_.offsetWidth,
                            l = this.div_.offsetHeight,
                            m = this.infoBoxClearance_.width,
                            n = this.infoBoxClearance_.height,
                            o = this.getProjection().fromLatLngToContainerPixel(this.position_);
                        if (o.x < -i + m ? d = o.x + i - m : o.x + k + i + m > g && (d = o.x + k + i + m - g), this.alignBottom_ ? o.y < -j + n + l ? e = o.y + j - n - l : o.y + j + n > h && (e = o.y + j + n - h) : o.y < -j + n ? e = o.y + j - n : o.y + l + j + n > h && (e = o.y + l + j + n - h), 0 !== d || 0 !== e) {
                            {
                                b.getCenter()
                            }
                            b.panBy(d, e)
                        }
                    }
                }, b.prototype.setBoxStyle_ = function () {
                    var a, b;
                    if (this.div_) {
                        this.div_.className = this.boxClass_, this.div_.style.cssText = "", b = this.boxStyle_;
                        for (a in b) b.hasOwnProperty(a) && (this.div_.style[a] = b[a]);
                        this.div_.style.WebkitTransform = "translateZ(0)", "undefined" != typeof this.div_.style.opacity && "" !== this.div_.style.opacity && (this.div_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 100 * this.div_.style.opacity + ')"', this.div_.style.filter = "alpha(opacity=" + 100 * this.div_.style.opacity + ")"), this.div_.style.position = "absolute", this.div_.style.visibility = "hidden", null !== this.zIndex_ && (this.div_.style.zIndex = this.zIndex_)
                    }
                }, b.prototype.getBoxWidths_ = function () {
                    var a, b = {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        },
                        c = this.div_;
                    return document.defaultView && document.defaultView.getComputedStyle ? (a = c.ownerDocument.defaultView.getComputedStyle(c, ""), a && (b.top = parseInt(a.borderTopWidth, 10) || 0, b.bottom = parseInt(a.borderBottomWidth, 10) || 0, b.left = parseInt(a.borderLeftWidth, 10) || 0, b.right = parseInt(a.borderRightWidth, 10) || 0)) : document.documentElement.currentStyle && c.currentStyle && (b.top = parseInt(c.currentStyle.borderTopWidth, 10) || 0, b.bottom = parseInt(c.currentStyle.borderBottomWidth, 10) || 0, b.left = parseInt(c.currentStyle.borderLeftWidth, 10) || 0, b.right = parseInt(c.currentStyle.borderRightWidth, 10) || 0), b
                }, b.prototype.onRemove = function () {
                    this.div_ && (this.div_.parentNode.removeChild(this.div_), this.div_ = null)
                }, b.prototype.draw = function () {
                    this.createInfoBoxDiv_();
                    var a = this.getProjection().fromLatLngToDivPixel(this.position_);
                    this.div_.style.left = a.x + this.pixelOffset_.width + "px", this.alignBottom_ ? this.div_.style.bottom = -(a.y + this.pixelOffset_.height) + "px" : this.div_.style.top = a.y + this.pixelOffset_.height + "px", this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible"
                }, b.prototype.setOptions = function (a) {
                    "undefined" != typeof a.boxClass && (this.boxClass_ = a.boxClass, this.setBoxStyle_()), "undefined" != typeof a.boxStyle && (this.boxStyle_ = a.boxStyle, this.setBoxStyle_()), "undefined" != typeof a.content && this.setContent(a.content), "undefined" != typeof a.disableAutoPan && (this.disableAutoPan_ = a.disableAutoPan), "undefined" != typeof a.maxWidth && (this.maxWidth_ = a.maxWidth), "undefined" != typeof a.pixelOffset && (this.pixelOffset_ = a.pixelOffset), "undefined" != typeof a.alignBottom && (this.alignBottom_ = a.alignBottom), "undefined" != typeof a.position && this.setPosition(a.position), "undefined" != typeof a.zIndex && this.setZIndex(a.zIndex), "undefined" != typeof a.closeBoxMargin && (this.closeBoxMargin_ = a.closeBoxMargin), "undefined" != typeof a.closeBoxURL && (this.closeBoxURL_ = a.closeBoxURL), "undefined" != typeof a.infoBoxClearance && (this.infoBoxClearance_ = a.infoBoxClearance), "undefined" != typeof a.isHidden && (this.isHidden_ = a.isHidden), "undefined" != typeof a.visible && (this.isHidden_ = !a.visible), "undefined" != typeof a.enableEventPropagation && (this.enableEventPropagation_ = a.enableEventPropagation), this.div_ && this.draw()
                }, b.prototype.setContent = function (a) {
                    this.content_ = a, this.div_ && (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.fixedWidthSet_ || (this.div_.style.width = ""), "undefined" == typeof a.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + a : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(a)), this.fixedWidthSet_ || (this.div_.style.width = this.div_.offsetWidth + "px", "undefined" == typeof a.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + a : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(a))), this.addClickHandler_()), google.maps.event.trigger(this, "content_changed")
                }, b.prototype.setPosition = function (a) {
                    this.position_ = a, this.div_ && this.draw(), google.maps.event.trigger(this, "position_changed")
                }, b.prototype.setZIndex = function (a) {
                    this.zIndex_ = a, this.div_ && (this.div_.style.zIndex = a), google.maps.event.trigger(this, "zindex_changed")
                }, b.prototype.setVisible = function (a) {
                    this.isHidden_ = !a, this.div_ && (this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible")
                }, b.prototype.getContent = function () {
                    return this.content_
                }, b.prototype.getPosition = function () {
                    return this.position_
                }, b.prototype.getZIndex = function () {
                    return this.zIndex_
                }, b.prototype.getVisible = function () {
                    var a;
                    return a = "undefined" == typeof this.getMap() || null === this.getMap() ? !1 : !this.isHidden_
                }, b.prototype.show = function () {
                    this.isHidden_ = !1, this.div_ && (this.div_.style.visibility = "visible")
                }, b.prototype.hide = function () {
                    this.isHidden_ = !0, this.div_ && (this.div_.style.visibility = "hidden")
                }, b.prototype.open = function (a, b) {
                    var c = this;
                    b && (this.position_ = b.getPosition(), this.moveListener_ = google.maps.event.addListener(b, "position_changed", function () {
                        c.setPosition(this.getPosition())
                    })), this.setMap(a), this.div_ && this.panBox_()
                }, b.prototype.close = function () {
                    var a;
                    if (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.eventListeners_) {
                        for (a = 0; a < this.eventListeners_.length; a++) google.maps.event.removeListener(this.eventListeners_[a]);
                        this.eventListeners_ = null
                    }
                    this.moveListener_ && (google.maps.event.removeListener(this.moveListener_), this.moveListener_ = null), this.contextListener_ && (google.maps.event.removeListener(this.contextListener_), this.contextListener_ = null), this.setMap(null)
                },
                function () {
                    function b(a, b) {
                        var c = this,
                            d = new google.maps.OverlayView;
                        d.onAdd = function () {
                            c.init_(a, b)
                        }, d.draw = function () {}, d.onRemove = function () {}, d.setMap(a), this.prjov_ = d
                    }
                    var c = function (a) {
                            var b;
                            switch (a) {
                            case "thin":
                                b = "2px";
                                break;
                            case "medium":
                                b = "4px";
                                break;
                            case "thick":
                                b = "6px";
                                break;
                            default:
                                b = a
                            }
                            return b
                        },
                        d = function (a) {
                            var b, d = {};
                            if (document.defaultView && document.defaultView.getComputedStyle) {
                                if (b = a.ownerDocument.defaultView.getComputedStyle(a, "")) return d.top = parseInt(b.borderTopWidth, 10) || 0, d.bottom = parseInt(b.borderBottomWidth, 10) || 0, d.left = parseInt(b.borderLeftWidth, 10) || 0, d.right = parseInt(b.borderRightWidth, 10) || 0, d
                            } else if (document.documentElement.currentStyle && a.currentStyle) return d.top = parseInt(c(a.currentStyle.borderTopWidth), 10) || 0, d.bottom = parseInt(c(a.currentStyle.borderBottomWidth), 10) || 0, d.left = parseInt(c(a.currentStyle.borderLeftWidth), 10) || 0, d.right = parseInt(c(a.currentStyle.borderRightWidth), 10) || 0, d;
                            return d.top = parseInt(a.style["border-top-width"], 10) || 0, d.bottom = parseInt(a.style["border-bottom-width"], 10) || 0, d.left = parseInt(a.style["border-left-width"], 10) || 0, d.right = parseInt(a.style["border-right-width"], 10) || 0, d
                        },
                        e = {
                            x: 0,
                            y: 0
                        },
                        f = function () {
                            e.x = "undefined" != typeof document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft, e.y = "undefined" != typeof document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
                        };
                    f();
                    var g = function (b) {
                            var c = 0,
                                d = 0;
                            return b = b || a.event, "undefined" != typeof b.pageX ? (c = b.pageX, d = b.pageY) : "undefined" != typeof b.clientX && (c = b.clientX + e.x, d = b.clientY + e.y), {
                                left: c,
                                top: d
                            }
                        },
                        h = function (b) {
                            for (var c = b.offsetLeft, d = b.offsetTop, e = b.offsetParent; null !== e;) {
                                e !== document.body && e !== document.documentElement && (c -= e.scrollLeft, d -= e.scrollTop);
                                var f = e,
                                    g = f.offsetLeft,
                                    h = f.offsetTop;
                                if (!g && !h && a.getComputedStyle) {
                                    var i = document.defaultView.getComputedStyle(f, null).MozTransform || document.defaultView.getComputedStyle(f, null).WebkitTransform;
                                    if (i && "string" == typeof i) {
                                        var j = i.split(",");
                                        g += parseInt(j[4], 10) || 0, h += parseInt(j[5], 10) || 0
                                    }
                                }
                                c += g, d += h, e = e.offsetParent
                            }
                            return {
                                left: c,
                                top: d
                            }
                        },
                        i = function (a, b) {
                            if (a && b)
                                for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                            return a
                        },
                        j = function (a, b) {
                            "undefined" != typeof b && (a.style.opacity = b), "undefined" != typeof a.style.opacity && "" !== a.style.opacity && (a.style.filter = "alpha(opacity=" + 100 * a.style.opacity + ")")
                        };
                    b.prototype.init_ = function (b, c) {
                        var e, g = this;
                        for (this.map_ = b, c = c || {}, this.key_ = c.key || "shift", this.key_ = this.key_.toLowerCase(), this.borderWidths_ = d(this.map_.getDiv()), this.veilDiv_ = [], e = 0; 4 > e; e++) this.veilDiv_[e] = document.createElement("div"), this.veilDiv_[e].onselectstart = function () {
                            return !1
                        }, i(this.veilDiv_[e].style, {
                            backgroundColor: "gray",
                            opacity: .25,
                            cursor: "crosshair"
                        }), i(this.veilDiv_[e].style, c.paneStyle), i(this.veilDiv_[e].style, c.veilStyle), i(this.veilDiv_[e].style, {
                            position: "absolute",
                            overflow: "hidden",
                            display: "none"
                        }), "shift" === this.key_ && (this.veilDiv_[e].style.MozUserSelect = "none"), j(this.veilDiv_[e]), "transparent" === this.veilDiv_[e].style.backgroundColor && (this.veilDiv_[e].style.backgroundColor = "white", j(this.veilDiv_[e], 0)), this.map_.getDiv().appendChild(this.veilDiv_[e]);
                        this.noZoom_ = c.noZoom || !1, this.visualEnabled_ = c.visualEnabled || !1, this.visualClass_ = c.visualClass || "", this.visualPosition_ = c.visualPosition || google.maps.ControlPosition.LEFT_TOP, this.visualPositionOffset_ = c.visualPositionOffset || new google.maps.Size(35, 0), this.visualPositionIndex_ = c.visualPositionIndex || null, this.visualSprite_ = c.visualSprite || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png", this.visualSize_ = c.visualSize || new google.maps.Size(20, 20), this.visualTips_ = c.visualTips || {}, this.visualTips_.off = this.visualTips_.off || "Turn on drag zoom mode", this.visualTips_.on = this.visualTips_.on || "Turn off drag zoom mode", this.boxDiv_ = document.createElement("div"), i(this.boxDiv_.style, {
                            border: "4px solid #736AFF"
                        }), i(this.boxDiv_.style, c.boxStyle), i(this.boxDiv_.style, {
                            position: "absolute",
                            display: "none"
                        }), j(this.boxDiv_), this.map_.getDiv().appendChild(this.boxDiv_), this.boxBorderWidths_ = d(this.boxDiv_), this.listeners_ = [google.maps.event.addDomListener(document, "keydown", function (a) {
                            g.onKeyDown_(a)
                        }), google.maps.event.addDomListener(document, "keyup", function (a) {
                            g.onKeyUp_(a)
                        }), google.maps.event.addDomListener(this.veilDiv_[0], "mousedown", function (a) {
                            g.onMouseDown_(a)
                        }), google.maps.event.addDomListener(this.veilDiv_[1], "mousedown", function (a) {
                            g.onMouseDown_(a)
                        }), google.maps.event.addDomListener(this.veilDiv_[2], "mousedown", function (a) {
                            g.onMouseDown_(a)
                        }), google.maps.event.addDomListener(this.veilDiv_[3], "mousedown", function (a) {
                            g.onMouseDown_(a)
                        }), google.maps.event.addDomListener(document, "mousedown", function (a) {
                            g.onMouseDownDocument_(a)
                        }), google.maps.event.addDomListener(document, "mousemove", function (a) {
                            g.onMouseMove_(a)
                        }), google.maps.event.addDomListener(document, "mouseup", function (a) {
                            g.onMouseUp_(a)
                        }), google.maps.event.addDomListener(a, "scroll", f)], this.hotKeyDown_ = !1, this.mouseDown_ = !1, this.dragging_ = !1, this.startPt_ = null, this.endPt_ = null, this.mapWidth_ = null, this.mapHeight_ = null, this.mousePosn_ = null, this.mapPosn_ = null, this.visualEnabled_ && (this.buttonDiv_ = this.initControl_(this.visualPositionOffset_), null !== this.visualPositionIndex_ && (this.buttonDiv_.index = this.visualPositionIndex_), this.map_.controls[this.visualPosition_].push(this.buttonDiv_), this.controlIndex_ = this.map_.controls[this.visualPosition_].length - 1)
                    }, b.prototype.initControl_ = function (a) {
                        var b, c, d = this;
                        return b = document.createElement("div"), b.className = this.visualClass_, b.style.position = "relative", b.style.overflow = "hidden", b.style.height = this.visualSize_.height + "px", b.style.width = this.visualSize_.width + "px", b.title = this.visualTips_.off, c = document.createElement("img"), c.src = this.visualSprite_, c.style.position = "absolute", c.style.left = -(2 * this.visualSize_.width) + "px", c.style.top = "0px", b.appendChild(c), b.onclick = function (a) {
                            d.hotKeyDown_ = !d.hotKeyDown_, d.hotKeyDown_ ? (d.buttonDiv_.firstChild.style.left = -(0 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.on, d.activatedByControl_ = !0, google.maps.event.trigger(d, "activate")) : (d.buttonDiv_.firstChild.style.left = -(2 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.off, google.maps.event.trigger(d, "deactivate")), d.onMouseMove_(a)
                        }, b.onmouseover = function () {
                            d.buttonDiv_.firstChild.style.left = -(1 * d.visualSize_.width) + "px"
                        }, b.onmouseout = function () {
                            d.hotKeyDown_ ? (d.buttonDiv_.firstChild.style.left = -(0 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.on) : (d.buttonDiv_.firstChild.style.left = -(2 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.off)
                        }, b.ondragstart = function () {
                            return !1
                        }, i(b.style, {
                            cursor: "pointer",
                            marginTop: a.height + "px",
                            marginLeft: a.width + "px"
                        }), b
                    }, b.prototype.isHotKeyDown_ = function (b) {
                        var c;
                        if (b = b || a.event, c = b.shiftKey && "shift" === this.key_ || b.altKey && "alt" === this.key_ || b.ctrlKey && "ctrl" === this.key_, !c) switch (b.keyCode) {
                        case 16:
                            "shift" === this.key_ && (c = !0);
                            break;
                        case 17:
                            "ctrl" === this.key_ && (c = !0);
                            break;
                        case 18:
                            "alt" === this.key_ && (c = !0)
                        }
                        return c
                    }, b.prototype.isMouseOnMap_ = function () {
                        var a = this.mousePosn_;
                        if (a) {
                            var b = this.mapPosn_,
                                c = this.map_.getDiv();
                            return a.left > b.left && a.left < b.left + c.offsetWidth && a.top > b.top && a.top < b.top + c.offsetHeight
                        }
                        return !1
                    }, b.prototype.setVeilVisibility_ = function () {
                        var a;
                        if (this.map_ && this.hotKeyDown_ && this.isMouseOnMap_()) {
                            var b = this.map_.getDiv();
                            if (this.mapWidth_ = b.offsetWidth - (this.borderWidths_.left + this.borderWidths_.right), this.mapHeight_ = b.offsetHeight - (this.borderWidths_.top + this.borderWidths_.bottom), this.activatedByControl_) {
                                var c = parseInt(this.buttonDiv_.style.left, 10) + this.visualPositionOffset_.width,
                                    d = parseInt(this.buttonDiv_.style.top, 10) + this.visualPositionOffset_.height,
                                    e = this.visualSize_.width,
                                    f = this.visualSize_.height;
                                for (this.veilDiv_[0].style.top = "0px", this.veilDiv_[0].style.left = "0px", this.veilDiv_[0].style.width = c + "px", this.veilDiv_[0].style.height = this.mapHeight_ + "px", this.veilDiv_[1].style.top = "0px", this.veilDiv_[1].style.left = c + e + "px", this.veilDiv_[1].style.width = this.mapWidth_ - (c + e) + "px", this.veilDiv_[1].style.height = this.mapHeight_ + "px", this.veilDiv_[2].style.top = "0px", this.veilDiv_[2].style.left = c + "px", this.veilDiv_[2].style.width = e + "px", this.veilDiv_[2].style.height = d + "px", this.veilDiv_[3].style.top = d + f + "px", this.veilDiv_[3].style.left = c + "px", this.veilDiv_[3].style.width = e + "px", this.veilDiv_[3].style.height = this.mapHeight_ - (d + f) + "px", a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "block"
                            } else {
                                for (this.veilDiv_[0].style.left = "0px", this.veilDiv_[0].style.top = "0px", this.veilDiv_[0].style.width = this.mapWidth_ + "px", this.veilDiv_[0].style.height = this.mapHeight_ + "px", a = 1; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.width = "0px", this.veilDiv_[a].style.height = "0px";
                                for (a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "block"
                            }
                        } else
                            for (a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "none"
                    }, b.prototype.onKeyDown_ = function (a) {
                        this.map_ && !this.hotKeyDown_ && this.isHotKeyDown_(a) && (this.mapPosn_ = h(this.map_.getDiv()), this.hotKeyDown_ = !0, this.activatedByControl_ = !1, this.setVeilVisibility_(), google.maps.event.trigger(this, "activate"))
                    }, b.prototype.getMousePoint_ = function (a) {
                        var b = g(a),
                            c = new google.maps.Point;
                        return c.x = b.left - this.mapPosn_.left - this.borderWidths_.left, c.y = b.top - this.mapPosn_.top - this.borderWidths_.top, c.x = Math.min(c.x, this.mapWidth_), c.y = Math.min(c.y, this.mapHeight_), c.x = Math.max(c.x, 0), c.y = Math.max(c.y, 0), c
                    }, b.prototype.onMouseDown_ = function (a) {
                        if (this.map_ && this.hotKeyDown_) {
                            this.mapPosn_ = h(this.map_.getDiv()), this.dragging_ = !0, this.startPt_ = this.endPt_ = this.getMousePoint_(a), this.boxDiv_.style.width = this.boxDiv_.style.height = "0px";
                            var b = this.prjov_.getProjection(),
                                c = b.fromContainerPixelToLatLng(this.startPt_);
                            google.maps.event.trigger(this, "dragstart", c)
                        }
                    }, b.prototype.onMouseDownDocument_ = function () {
                        this.mouseDown_ = !0
                    }, b.prototype.onMouseMove_ = function (a) {
                        if (this.mousePosn_ = g(a), this.dragging_) {
                            this.endPt_ = this.getMousePoint_(a);
                            var b = Math.min(this.startPt_.x, this.endPt_.x),
                                c = Math.min(this.startPt_.y, this.endPt_.y),
                                d = Math.abs(this.startPt_.x - this.endPt_.x),
                                e = Math.abs(this.startPt_.y - this.endPt_.y),
                                f = Math.max(0, d - (this.boxBorderWidths_.left + this.boxBorderWidths_.right)),
                                i = Math.max(0, e - (this.boxBorderWidths_.top + this.boxBorderWidths_.bottom));
                            this.veilDiv_[0].style.top = "0px", this.veilDiv_[0].style.left = "0px", this.veilDiv_[0].style.width = b + "px", this.veilDiv_[0].style.height = this.mapHeight_ + "px", this.veilDiv_[1].style.top = "0px", this.veilDiv_[1].style.left = b + d + "px", this.veilDiv_[1].style.width = this.mapWidth_ - (b + d) + "px", this.veilDiv_[1].style.height = this.mapHeight_ + "px", this.veilDiv_[2].style.top = "0px", this.veilDiv_[2].style.left = b + "px", this.veilDiv_[2].style.width = d + "px", this.veilDiv_[2].style.height = c + "px", this.veilDiv_[3].style.top = c + e + "px", this.veilDiv_[3].style.left = b + "px", this.veilDiv_[3].style.width = d + "px", this.veilDiv_[3].style.height = this.mapHeight_ - (c + e) + "px", this.boxDiv_.style.top = c + "px", this.boxDiv_.style.left = b + "px", this.boxDiv_.style.width = f + "px", this.boxDiv_.style.height = i + "px", this.boxDiv_.style.display = "block", google.maps.event.trigger(this, "drag", new google.maps.Point(b, c + e), new google.maps.Point(b + d, c), this.prjov_.getProjection())
                        } else this.mouseDown_ || (this.mapPosn_ = h(this.map_.getDiv()), this.setVeilVisibility_())
                    }, b.prototype.onMouseUp_ = function (a) {
                        var b, c = this;
                        if (this.mouseDown_ = !1, this.dragging_) {
                            if (this.getMousePoint_(a).x === this.startPt_.x && this.getMousePoint_(a).y === this.startPt_.y) return void this.onKeyUp_(a);
                            var d = Math.min(this.startPt_.x, this.endPt_.x),
                                e = Math.min(this.startPt_.y, this.endPt_.y),
                                f = Math.abs(this.startPt_.x - this.endPt_.x),
                                g = Math.abs(this.startPt_.y - this.endPt_.y),
                                h = !0;
                            h && (d += this.borderWidths_.left, e += this.borderWidths_.top);
                            var i = this.prjov_.getProjection(),
                                j = i.fromContainerPixelToLatLng(new google.maps.Point(d, e + g)),
                                k = i.fromContainerPixelToLatLng(new google.maps.Point(d + f, e)),
                                l = new google.maps.LatLngBounds(j, k);
                            if (this.noZoom_) this.boxDiv_.style.display = "none";
                            else {
                                b = this.map_.getZoom(), this.map_.fitBounds(l), this.map_.getZoom() < b && this.map_.setZoom(b);
                                var m = i.fromLatLngToContainerPixel(j),
                                    n = i.fromLatLngToContainerPixel(k);
                                h && (m.x -= this.borderWidths_.left, m.y -= this.borderWidths_.top, n.x -= this.borderWidths_.left, n.y -= this.borderWidths_.top), this.boxDiv_.style.left = m.x + "px", this.boxDiv_.style.top = n.y + "px", this.boxDiv_.style.width = Math.abs(n.x - m.x) - (this.boxBorderWidths_.left + this.boxBorderWidths_.right) + "px", this.boxDiv_.style.height = Math.abs(n.y - m.y) - (this.boxBorderWidths_.top + this.boxBorderWidths_.bottom) + "px", setTimeout(function () {
                                    c.boxDiv_.style.display = "none"
                                }, 1e3)
                            }
                            this.dragging_ = !1, this.onMouseMove_(a), google.maps.event.trigger(this, "dragend", l), this.isHotKeyDown_(a) || this.onKeyUp_(a)
                        }
                    }, b.prototype.onKeyUp_ = function () {
                        var a, b, c, d, e, f, g, h, i = null;
                        if (this.map_ && this.hotKeyDown_) {
                            for (this.hotKeyDown_ = !1, this.dragging_ && (this.boxDiv_.style.display = "none", this.dragging_ = !1, b = Math.min(this.startPt_.x, this.endPt_.x), c = Math.min(this.startPt_.y, this.endPt_.y), d = Math.abs(this.startPt_.x - this.endPt_.x), e = Math.abs(this.startPt_.y - this.endPt_.y), f = this.prjov_.getProjection(), g = f.fromContainerPixelToLatLng(new google.maps.Point(b, c + e)), h = f.fromContainerPixelToLatLng(new google.maps.Point(b + d, c)), i = new google.maps.LatLngBounds(g, h)), a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "none";
                            this.visualEnabled_ && (this.buttonDiv_.firstChild.style.left = -(2 * this.visualSize_.width) + "px", this.buttonDiv_.title = this.visualTips_.off, this.buttonDiv_.style.display = ""), google.maps.event.trigger(this, "deactivate", i)
                        }
                    }, google.maps.Map.prototype.enableKeyDragZoom = function (a) {
                        this.dragZoom_ = new b(this, a)
                    }, google.maps.Map.prototype.disableKeyDragZoom = function () {
                        var a, b = this.dragZoom_;
                        if (b) {
                            for (a = 0; a < b.listeners_.length; ++a) google.maps.event.removeListener(b.listeners_[a]);
                            for (this.getDiv().removeChild(b.boxDiv_), a = 0; a < b.veilDiv_.length; a++) this.getDiv().removeChild(b.veilDiv_[a]);
                            b.visualEnabled_ && this.controls[b.visualPosition_].removeAt(b.controlIndex_), b.prjov_.setMap(null), this.dragZoom_ = null
                        }
                    }, google.maps.Map.prototype.keyDragZoomEnabled = function () {
                        return null !== this.dragZoom_
                    }, google.maps.Map.prototype.getDragZoomObject = function () {
                        return this.dragZoom_
                    }
                }(), d.prototype.onAdd = function () {
                    var a, b, c = this;
                    this.div_ = document.createElement("div"), this.div_.className = this.className_, this.visible_ && this.show(), this.getPanes().overlayMouseTarget.appendChild(this.div_), this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function () {
                        b = a
                    }), google.maps.event.addDomListener(this.div_, "mousedown", function () {
                        a = !0, b = !1
                    }), google.maps.event.addDomListener(this.div_, "click", function (d) {
                        if (a = !1, !b) {
                            var e, f, g = c.cluster_.getMarkerClusterer();
                            google.maps.event.trigger(g, "click", c.cluster_), google.maps.event.trigger(g, "clusterclick", c.cluster_), g.getZoomOnClick() && (f = g.getMaxZoom(), e = c.cluster_.getBounds(), g.getMap().fitBounds(e), setTimeout(function () {
                                g.getMap().fitBounds(e), null !== f && g.getMap().getZoom() > f && g.getMap().setZoom(f + 1)
                            }, 100)), d.cancelBubble = !0, d.stopPropagation && d.stopPropagation()
                        }
                    }), google.maps.event.addDomListener(this.div_, "mouseover", function () {
                        var a = c.cluster_.getMarkerClusterer();
                        google.maps.event.trigger(a, "mouseover", c.cluster_)
                    }), google.maps.event.addDomListener(this.div_, "mouseout", function () {
                        var a = c.cluster_.getMarkerClusterer();
                        google.maps.event.trigger(a, "mouseout", c.cluster_)
                    })
                }, d.prototype.onRemove = function () {
                    this.div_ && this.div_.parentNode && (this.hide(), google.maps.event.removeListener(this.boundsChangedListener_), google.maps.event.clearInstanceListeners(this.div_), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
                }, d.prototype.draw = function () {
                    if (this.visible_) {
                        var a = this.getPosFromLatLng_(this.center_);
                        this.div_.style.top = a.y + "px", this.div_.style.left = a.x + "px"
                    }
                }, d.prototype.hide = function () {
                    this.div_ && (this.div_.style.display = "none"), this.visible_ = !1
                }, d.prototype.show = function () {
                    if (this.div_) {
                        var a = "",
                            b = this.backgroundPosition_.split(" "),
                            c = parseInt(b[0].trim(), 10),
                            d = parseInt(b[1].trim(), 10),
                            e = this.getPosFromLatLng_(this.center_);
                        this.div_.style.cssText = this.createCss(e), a = "<img src='" + this.url_ + "' style='position: absolute; top: " + d + "px; left: " + c + "px; ", this.cluster_.getMarkerClusterer().enableRetinaIcons_ || (a += "clip: rect(" + -1 * d + "px, " + (-1 * c + this.width_) + "px, " + (-1 * d + this.height_) + "px, " + -1 * c + "px);"), a += "'>", this.div_.innerHTML = a + "<div style='position: absolute;top: " + this.anchorText_[0] + "px;left: " + this.anchorText_[1] + "px;color: " + this.textColor_ + ";font-size: " + this.textSize_ + "px;font-family: " + this.fontFamily_ + ";font-weight: " + this.fontWeight_ + ";font-style: " + this.fontStyle_ + ";text-decoration: " + this.textDecoration_ + ";text-align: center;width: " + this.width_ + "px;line-height:" + this.height_ + "px;'>" + this.sums_.text + "</div>", this.div_.title = "undefined" == typeof this.sums_.title || "" === this.sums_.title ? this.cluster_.getMarkerClusterer().getTitle() : this.sums_.title, this.div_.style.display = ""
                    }
                    this.visible_ = !0
                }, d.prototype.useStyle = function (a) {
                    this.sums_ = a;
                    var b = Math.max(0, a.index - 1);
                    b = Math.min(this.styles_.length - 1, b);
                    var c = this.styles_[b];
                    this.url_ = c.url, this.height_ = c.height, this.width_ = c.width, this.anchorText_ = c.anchorText || [0, 0], this.anchorIcon_ = c.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)], this.textColor_ = c.textColor || "black", this.textSize_ = c.textSize || 11, this.textDecoration_ = c.textDecoration || "none", this.fontWeight_ = c.fontWeight || "bold", this.fontStyle_ = c.fontStyle || "normal", this.fontFamily_ = c.fontFamily || "Arial,sans-serif", this.backgroundPosition_ = c.backgroundPosition || "0 0"
                }, d.prototype.setCenter = function (a) {
                    this.center_ = a
                }, d.prototype.createCss = function (a) {
                    var b = [];
                    return b.push("cursor: pointer;"), b.push("position: absolute; top: " + a.y + "px; left: " + a.x + "px;"), b.push("width: " + this.width_ + "px; height: " + this.height_ + "px;"), b.join("")
                }, d.prototype.getPosFromLatLng_ = function (a) {
                    var b = this.getProjection().fromLatLngToDivPixel(a);
                    return b.x -= this.anchorIcon_[1], b.y -= this.anchorIcon_[0], b.x = parseInt(b.x, 10), b.y = parseInt(b.y, 10), b
                }, e.prototype.getSize = function () {
                    return this.markers_.length
                }, e.prototype.getMarkers = function () {
                    return this.markers_
                }, e.prototype.getCenter = function () {
                    return this.center_
                }, e.prototype.getMap = function () {
                    return this.map_
                }, e.prototype.getMarkerClusterer = function () {
                    return this.markerClusterer_
                }, e.prototype.getBounds = function () {
                    var a, b = new google.maps.LatLngBounds(this.center_, this.center_),
                        c = this.getMarkers();
                    for (a = 0; a < c.length; a++) b.extend(c[a].getPosition());
                    return b
                }, e.prototype.remove = function () {
                    this.clusterIcon_.setMap(null), this.markers_ = [], delete this.markers_
                }, e.prototype.addMarker = function (a) {
                    var b, c, d;
                    if (this.isMarkerAlreadyAdded_(a)) return !1;
                    if (this.center_) {
                        if (this.averageCenter_) {
                            var e = this.markers_.length + 1,
                                f = (this.center_.lat() * (e - 1) + a.getPosition().lat()) / e,
                                g = (this.center_.lng() * (e - 1) + a.getPosition().lng()) / e;
                            this.center_ = new google.maps.LatLng(f, g), this.calculateBounds_()
                        }
                    } else this.center_ = a.getPosition(), this.calculateBounds_(); if (a.isAdded = !0, this.markers_.push(a), c = this.markers_.length, d = this.markerClusterer_.getMaxZoom(), null !== d && this.map_.getZoom() > d) a.getMap() !== this.map_ && a.setMap(this.map_);
                    else if (c < this.minClusterSize_) a.getMap() !== this.map_ && a.setMap(this.map_);
                    else if (c === this.minClusterSize_)
                        for (b = 0; c > b; b++) this.markers_[b].setMap(null);
                    else a.setMap(null);
                    return this.updateIcon_(), !0
                }, e.prototype.isMarkerInClusterBounds = function (a) {
                    return this.bounds_.contains(a.getPosition())
                }, e.prototype.calculateBounds_ = function () {
                    var a = new google.maps.LatLngBounds(this.center_, this.center_);
                    this.bounds_ = this.markerClusterer_.getExtendedBounds(a)
                }, e.prototype.updateIcon_ = function () {
                    var a = this.markers_.length,
                        b = this.markerClusterer_.getMaxZoom();
                    if (null !== b && this.map_.getZoom() > b) return void this.clusterIcon_.hide();
                    if (a < this.minClusterSize_) return void this.clusterIcon_.hide();
                    var c = this.markerClusterer_.getStyles().length,
                        d = this.markerClusterer_.getCalculator()(this.markers_, c);
                    this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.useStyle(d), this.clusterIcon_.show()
                }, e.prototype.isMarkerAlreadyAdded_ = function (a) {
                    var b;
                    if (this.markers_.indexOf) return -1 !== this.markers_.indexOf(a);
                    for (b = 0; b < this.markers_.length; b++)
                        if (a === this.markers_[b]) return !0;
                    return !1
                }, f.prototype.onAdd = function () {
                    var a = this;
                    this.activeMap_ = this.getMap(), this.ready_ = !0, this.repaint(), this.listeners_ = [google.maps.event.addListener(this.getMap(), "zoom_changed", function () {
                        a.resetViewport_(!1), (this.getZoom() === (this.get("minZoom") || 0) || this.getZoom() === this.get("maxZoom")) && google.maps.event.trigger(this, "idle")
                    }), google.maps.event.addListener(this.getMap(), "idle", function () {
                        a.redraw_()
                    })]
                }, f.prototype.onRemove = function () {
                    var a;
                    for (a = 0; a < this.markers_.length; a++) this.markers_[a].getMap() !== this.activeMap_ && this.markers_[a].setMap(this.activeMap_);
                    for (a = 0; a < this.clusters_.length; a++) this.clusters_[a].remove();
                    for (this.clusters_ = [], a = 0; a < this.listeners_.length; a++) google.maps.event.removeListener(this.listeners_[a]);
                    this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1
                }, f.prototype.draw = function () {}, f.prototype.setupStyles_ = function () {
                    var a, b;
                    if (!(this.styles_.length > 0))
                        for (a = 0; a < this.imageSizes_.length; a++) b = this.imageSizes_[a], this.styles_.push({
                            url: this.imagePath_ + (a + 1) + "." + this.imageExtension_,
                            height: b,
                            width: b
                        })
                }, f.prototype.fitMapToMarkers = function () {
                    var a, b = this.getMarkers(),
                        c = new google.maps.LatLngBounds;
                    for (a = 0; a < b.length; a++) c.extend(b[a].getPosition());
                    this.getMap().fitBounds(c)
                }, f.prototype.getGridSize = function () {
                    return this.gridSize_
                }, f.prototype.setGridSize = function (a) {
                    this.gridSize_ = a
                }, f.prototype.getMinimumClusterSize = function () {
                    return this.minClusterSize_
                }, f.prototype.setMinimumClusterSize = function (a) {
                    this.minClusterSize_ = a
                }, f.prototype.getMaxZoom = function () {
                    return this.maxZoom_
                }, f.prototype.setMaxZoom = function (a) {
                    this.maxZoom_ = a
                }, f.prototype.getStyles = function () {
                    return this.styles_
                }, f.prototype.setStyles = function (a) {
                    this.styles_ = a
                }, f.prototype.getTitle = function () {
                    return this.title_
                }, f.prototype.setTitle = function (a) {
                    this.title_ = a
                }, f.prototype.getZoomOnClick = function () {
                    return this.zoomOnClick_
                }, f.prototype.setZoomOnClick = function (a) {
                    this.zoomOnClick_ = a
                }, f.prototype.getAverageCenter = function () {
                    return this.averageCenter_
                }, f.prototype.setAverageCenter = function (a) {
                    this.averageCenter_ = a
                }, f.prototype.getIgnoreHidden = function () {
                    return this.ignoreHidden_
                }, f.prototype.setIgnoreHidden = function (a) {
                    this.ignoreHidden_ = a
                }, f.prototype.getEnableRetinaIcons = function () {
                    return this.enableRetinaIcons_;

                }, f.prototype.setEnableRetinaIcons = function (a) {
                    this.enableRetinaIcons_ = a
                }, f.prototype.getImageExtension = function () {
                    return this.imageExtension_
                }, f.prototype.setImageExtension = function (a) {
                    this.imageExtension_ = a
                }, f.prototype.getImagePath = function () {
                    return this.imagePath_
                }, f.prototype.setImagePath = function (a) {
                    this.imagePath_ = a
                }, f.prototype.getImageSizes = function () {
                    return this.imageSizes_
                }, f.prototype.setImageSizes = function (a) {
                    this.imageSizes_ = a
                }, f.prototype.getCalculator = function () {
                    return this.calculator_
                }, f.prototype.setCalculator = function (a) {
                    this.calculator_ = a
                }, f.prototype.getBatchSizeIE = function () {
                    return this.batchSizeIE_
                }, f.prototype.setBatchSizeIE = function (a) {
                    this.batchSizeIE_ = a
                }, f.prototype.getClusterClass = function () {
                    return this.clusterClass_
                }, f.prototype.setClusterClass = function (a) {
                    this.clusterClass_ = a
                }, f.prototype.getMarkers = function () {
                    return this.markers_
                }, f.prototype.getTotalMarkers = function () {
                    return this.markers_.length
                }, f.prototype.getClusters = function () {
                    return this.clusters_
                }, f.prototype.getTotalClusters = function () {
                    return this.clusters_.length
                }, f.prototype.addMarker = function (a, b) {
                    this.pushMarkerTo_(a), b || this.redraw_()
                }, f.prototype.addMarkers = function (a, b) {
                    var c;
                    for (c in a) a.hasOwnProperty(c) && this.pushMarkerTo_(a[c]);
                    b || this.redraw_()
                }, f.prototype.pushMarkerTo_ = function (a) {
                    if (a.getDraggable()) {
                        var b = this;
                        google.maps.event.addListener(a, "dragend", function () {
                            b.ready_ && (this.isAdded = !1, b.repaint())
                        })
                    }
                    a.isAdded = !1, this.markers_.push(a)
                }, f.prototype.removeMarker = function (a, b) {
                    var c = this.removeMarker_(a);
                    return !b && c && this.repaint(), c
                }, f.prototype.removeMarkers = function (a, b) {
                    var c, d, e = !1;
                    for (c = 0; c < a.length; c++) d = this.removeMarker_(a[c]), e = e || d;
                    return !b && e && this.repaint(), e
                }, f.prototype.removeMarker_ = function (a) {
                    var b, c = -1;
                    if (this.markers_.indexOf) c = this.markers_.indexOf(a);
                    else
                        for (b = 0; b < this.markers_.length; b++)
                            if (a === this.markers_[b]) {
                                c = b;
                                break
                            } return -1 === c ? !1 : (a.setMap(null), this.markers_.splice(c, 1), !0)
                }, f.prototype.clearMarkers = function () {
                    this.resetViewport_(!0), this.markers_ = []
                }, f.prototype.repaint = function () {
                    var a = this.clusters_.slice();
                    this.clusters_ = [], this.resetViewport_(!1), this.redraw_(), setTimeout(function () {
                        var b;
                        for (b = 0; b < a.length; b++) a[b].remove()
                    }, 0)
                }, f.prototype.getExtendedBounds = function (a) {
                    var b = this.getProjection(),
                        c = new google.maps.LatLng(a.getNorthEast().lat(), a.getNorthEast().lng()),
                        d = new google.maps.LatLng(a.getSouthWest().lat(), a.getSouthWest().lng()),
                        e = b.fromLatLngToDivPixel(c);
                    e.x += this.gridSize_, e.y -= this.gridSize_;
                    var f = b.fromLatLngToDivPixel(d);
                    f.x -= this.gridSize_, f.y += this.gridSize_;
                    var g = b.fromDivPixelToLatLng(e),
                        h = b.fromDivPixelToLatLng(f);
                    return a.extend(g), a.extend(h), a
                }, f.prototype.redraw_ = function () {
                    this.createClusters_(0)
                }, f.prototype.resetViewport_ = function (a) {
                    var b, c;
                    for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].remove();
                    for (this.clusters_ = [], b = 0; b < this.markers_.length; b++) c = this.markers_[b], c.isAdded = !1, a && c.setMap(null)
                }, f.prototype.distanceBetweenPoints_ = function (a, b) {
                    var c = 6371,
                        d = (b.lat() - a.lat()) * Math.PI / 180,
                        e = (b.lng() - a.lng()) * Math.PI / 180,
                        f = Math.sin(d / 2) * Math.sin(d / 2) + Math.cos(a.lat() * Math.PI / 180) * Math.cos(b.lat() * Math.PI / 180) * Math.sin(e / 2) * Math.sin(e / 2),
                        g = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)),
                        h = c * g;
                    return h
                }, f.prototype.isMarkerInBounds_ = function (a, b) {
                    return b.contains(a.getPosition())
                }, f.prototype.addToClosestCluster_ = function (a) {
                    var b, c, d, f, g = 4e4,
                        h = null;
                    for (b = 0; b < this.clusters_.length; b++) d = this.clusters_[b], f = d.getCenter(), f && (c = this.distanceBetweenPoints_(f, a.getPosition()), g > c && (g = c, h = d));
                    h && h.isMarkerInClusterBounds(a) ? h.addMarker(a) : (d = new e(this), d.addMarker(a), this.clusters_.push(d))
                }, f.prototype.createClusters_ = function (a) {
                    var b, c, d, e = this;
                    if (this.ready_) {
                        0 === a && (google.maps.event.trigger(this, "clusteringbegin", this), "undefined" != typeof this.timerRefStatic && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), d = this.getMap().getZoom() > 3 ? new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
                        var f = this.getExtendedBounds(d),
                            g = Math.min(a + this.batchSize_, this.markers_.length);
                        for (b = a; g > b; b++) c = this.markers_[b], !c.isAdded && this.isMarkerInBounds_(c, f) && (!this.ignoreHidden_ || this.ignoreHidden_ && c.getVisible()) && this.addToClosestCluster_(c);
                        g < this.markers_.length ? this.timerRefStatic = setTimeout(function () {
                            e.createClusters_(g)
                        }, 0) : (delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this))
                    }
                }, f.prototype.extend = function (a, b) {
                    return function (a) {
                        var b;
                        for (b in a.prototype) this.prototype[b] = a.prototype[b];
                        return this
                    }.apply(a, [b])
                }, f.CALCULATOR = function (a, b) {
                    for (var c = 0, d = "", e = a.length.toString(), f = e; 0 !== f;) f = parseInt(f / 10, 10), c++;
                    return c = Math.min(c, b), {
                        text: e,
                        index: c,
                        title: d
                    }
                }, f.BATCH_SIZE = 2e3, f.BATCH_SIZE_IE = 500, f.IMAGE_PATH = "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/images/m", f.IMAGE_EXTENSION = "png", f.IMAGE_SIZES = [53, 56, 66, 78, 90], g(h, google.maps.OverlayView), h.getSharedCross = function (a) {
                    var b;
                    return "undefined" == typeof h.getSharedCross.crossDiv && (b = document.createElement("img"), b.style.cssText = "position: absolute; z-index: 1000002; display: none;", b.style.marginLeft = "-8px", b.style.marginTop = "-9px", b.src = a, h.getSharedCross.crossDiv = b), h.getSharedCross.crossDiv
                }, h.prototype.onAdd = function () {
                    var a, b, c, d, e, f, g, i = this,
                        j = !1,
                        k = !1,
                        l = 20,
                        m = "url(" + this.handCursorURL_ + ")",
                        n = function (a) {
                            a.preventDefault && a.preventDefault(), a.cancelBubble = !0, a.stopPropagation && a.stopPropagation()
                        },
                        o = function () {
                            i.marker_.setAnimation(null)
                        };
                    this.getPanes().overlayImage.appendChild(this.labelDiv_), this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_), "undefined" == typeof h.getSharedCross.processed && (this.getPanes().overlayImage.appendChild(this.crossDiv_), h.getSharedCross.processed = !0), this.listeners_ = [google.maps.event.addDomListener(this.eventDiv_, "mouseover", function (a) {
                        (i.marker_.getDraggable() || i.marker_.getClickable()) && (this.style.cursor = "pointer", google.maps.event.trigger(i.marker_, "mouseover", a))
                    }), google.maps.event.addDomListener(this.eventDiv_, "mouseout", function (a) {
                        !i.marker_.getDraggable() && !i.marker_.getClickable() || k || (this.style.cursor = i.marker_.getCursor(), google.maps.event.trigger(i.marker_, "mouseout", a))
                    }), google.maps.event.addDomListener(this.eventDiv_, "mousedown", function (a) {
                        k = !1, i.marker_.getDraggable() && (j = !0, this.style.cursor = m), (i.marker_.getDraggable() || i.marker_.getClickable()) && (google.maps.event.trigger(i.marker_, "mousedown", a), n(a))
                    }), google.maps.event.addDomListener(document, "mouseup", function (b) {
                        var c;
                        if (j && (j = !1, i.eventDiv_.style.cursor = "pointer", google.maps.event.trigger(i.marker_, "mouseup", b)), k) {
                            if (e) {
                                c = i.getProjection().fromLatLngToDivPixel(i.marker_.getPosition()), c.y += l, i.marker_.setPosition(i.getProjection().fromDivPixelToLatLng(c));
                                try {
                                    i.marker_.setAnimation(google.maps.Animation.BOUNCE), setTimeout(o, 1406)
                                } catch (f) {}
                            }
                            i.crossDiv_.style.display = "none", i.marker_.setZIndex(a), d = !0, k = !1, b.latLng = i.marker_.getPosition(), google.maps.event.trigger(i.marker_, "dragend", b)
                        }
                    }), google.maps.event.addListener(i.marker_.getMap(), "mousemove", function (d) {
                        var h;
                        j && (k ? (d.latLng = new google.maps.LatLng(d.latLng.lat() - b, d.latLng.lng() - c), h = i.getProjection().fromLatLngToDivPixel(d.latLng), e && (i.crossDiv_.style.left = h.x + "px", i.crossDiv_.style.top = h.y + "px", i.crossDiv_.style.display = "", h.y -= l), i.marker_.setPosition(i.getProjection().fromDivPixelToLatLng(h)), e && (i.eventDiv_.style.top = h.y + l + "px"), google.maps.event.trigger(i.marker_, "drag", d)) : (b = d.latLng.lat() - i.marker_.getPosition().lat(), c = d.latLng.lng() - i.marker_.getPosition().lng(), a = i.marker_.getZIndex(), f = i.marker_.getPosition(), g = i.marker_.getMap().getCenter(), e = i.marker_.get("raiseOnDrag"), k = !0, i.marker_.setZIndex(1e6), d.latLng = i.marker_.getPosition(), google.maps.event.trigger(i.marker_, "dragstart", d)))
                    }), google.maps.event.addDomListener(document, "keydown", function (a) {
                        k && 27 === a.keyCode && (e = !1, i.marker_.setPosition(f), i.marker_.getMap().setCenter(g), google.maps.event.trigger(document, "mouseup", a))
                    }), google.maps.event.addDomListener(this.eventDiv_, "click", function (a) {
                        (i.marker_.getDraggable() || i.marker_.getClickable()) && (d ? d = !1 : (google.maps.event.trigger(i.marker_, "click", a), n(a)))
                    }), google.maps.event.addDomListener(this.eventDiv_, "dblclick", function (a) {
                        (i.marker_.getDraggable() || i.marker_.getClickable()) && (google.maps.event.trigger(i.marker_, "dblclick", a), n(a))
                    }), google.maps.event.addListener(this.marker_, "dragstart", function () {
                        k || (e = this.get("raiseOnDrag"))
                    }), google.maps.event.addListener(this.marker_, "drag", function () {
                        k || e && (i.setPosition(l), i.labelDiv_.style.zIndex = 1e6 + (this.get("labelInBackground") ? -1 : 1))
                    }), google.maps.event.addListener(this.marker_, "dragend", function () {
                        k || e && i.setPosition(0)
                    }), google.maps.event.addListener(this.marker_, "position_changed", function () {
                        i.setPosition()
                    }), google.maps.event.addListener(this.marker_, "zindex_changed", function () {
                        i.setZIndex()
                    }), google.maps.event.addListener(this.marker_, "visible_changed", function () {
                        i.setVisible()
                    }), google.maps.event.addListener(this.marker_, "labelvisible_changed", function () {
                        i.setVisible()
                    }), google.maps.event.addListener(this.marker_, "title_changed", function () {
                        i.setTitle()
                    }), google.maps.event.addListener(this.marker_, "labelcontent_changed", function () {
                        i.setContent()
                    }), google.maps.event.addListener(this.marker_, "labelanchor_changed", function () {
                        i.setAnchor()
                    }), google.maps.event.addListener(this.marker_, "labelclass_changed", function () {
                        i.setStyles()
                    }), google.maps.event.addListener(this.marker_, "labelstyle_changed", function () {
                        i.setStyles()
                    })]
                }, h.prototype.onRemove = function () {
                    var a;
                    for (this.labelDiv_.parentNode.removeChild(this.labelDiv_), this.eventDiv_.parentNode.removeChild(this.eventDiv_), a = 0; a < this.listeners_.length; a++) google.maps.event.removeListener(this.listeners_[a])
                }, h.prototype.draw = function () {
                    this.setContent(), this.setTitle(), this.setStyles()
                }, h.prototype.setContent = function () {
                    var a = this.marker_.get("labelContent");
                    "undefined" == typeof a.nodeType ? (this.labelDiv_.innerHTML = a, this.eventDiv_.innerHTML = this.labelDiv_.innerHTML) : (this.labelDiv_.innerHTML = "", this.labelDiv_.appendChild(a), a = a.cloneNode(!0), this.eventDiv_.innerHTML = "", this.eventDiv_.appendChild(a))
                }, h.prototype.setTitle = function () {
                    this.eventDiv_.title = this.marker_.getTitle() || ""
                }, h.prototype.setStyles = function () {
                    var a, b;
                    this.labelDiv_.className = this.marker_.get("labelClass"), this.eventDiv_.className = this.labelDiv_.className, this.labelDiv_.style.cssText = "", this.eventDiv_.style.cssText = "", b = this.marker_.get("labelStyle");
                    for (a in b) b.hasOwnProperty(a) && (this.labelDiv_.style[a] = b[a], this.eventDiv_.style[a] = b[a]);
                    this.setMandatoryStyles()
                }, h.prototype.setMandatoryStyles = function () {
                    this.labelDiv_.style.position = "absolute", this.labelDiv_.style.overflow = "hidden", "undefined" != typeof this.labelDiv_.style.opacity && "" !== this.labelDiv_.style.opacity && (this.labelDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=' + 100 * this.labelDiv_.style.opacity + ')"', this.labelDiv_.style.filter = "alpha(opacity=" + 100 * this.labelDiv_.style.opacity + ")"), this.eventDiv_.style.position = this.labelDiv_.style.position, this.eventDiv_.style.overflow = this.labelDiv_.style.overflow, this.eventDiv_.style.opacity = .01, this.eventDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"', this.eventDiv_.style.filter = "alpha(opacity=1)", this.setAnchor(), this.setPosition(), this.setVisible()
                }, h.prototype.setAnchor = function () {
                    var a = this.marker_.get("labelAnchor");
                    this.labelDiv_.style.marginLeft = -a.x + "px", this.labelDiv_.style.marginTop = -a.y + "px", this.eventDiv_.style.marginLeft = -a.x + "px", this.eventDiv_.style.marginTop = -a.y + "px"
                }, h.prototype.setPosition = function (a) {
                    var b = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
                    "undefined" == typeof a && (a = 0), this.labelDiv_.style.left = Math.round(b.x) + "px", this.labelDiv_.style.top = Math.round(b.y - a) + "px", this.eventDiv_.style.left = this.labelDiv_.style.left, this.eventDiv_.style.top = this.labelDiv_.style.top, this.setZIndex()
                }, h.prototype.setZIndex = function () {
                    var a = this.marker_.get("labelInBackground") ? -1 : 1;
                    "undefined" == typeof this.marker_.getZIndex() ? (this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + a, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex) : (this.labelDiv_.style.zIndex = this.marker_.getZIndex() + a, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex)
                }, h.prototype.setVisible = function () {
                    this.labelDiv_.style.display = this.marker_.get("labelVisible") && this.marker_.getVisible() ? "block" : "none", this.eventDiv_.style.display = this.labelDiv_.style.display
                }, g(i, google.maps.Marker), i.prototype.setMap = function (a) {
                    google.maps.Marker.prototype.setMap.apply(this, arguments), this.label.setMap(a)
                }, a.InfoBox = b, a.Cluster = e, a.ClusterIcon = d, a.MarkerClusterer = f, a.MarkerLabel_ = h, a.MarkerWithLabel = i
            })
        }
    }),
    function (a) {
        function b(d) {
            if (c[d]) return c[d].exports;
            var e = c[d] = {
                exports: {},
                id: d,
                loaded: !1
            };
            return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
        }
        var c = {};
        return b.m = a, b.c = c, b.p = "", b(0)
    }([
        function (a, c, d) {
            b.module("uiGmapgoogle-maps.wrapped").service("uiGmapDataStructures", function () {
                return {
                    Graph: d(1).Graph,
                    Queue: d(1).Queue
                }
            })
        },
        function (a, b, c) {
            (function () {
                a.exports = {
                    Graph: c(2),
                    Heap: c(3),
                    LinkedList: c(4),
                    Map: c(5),
                    Queue: c(6),
                    RedBlackTree: c(7),
                    Trie: c(8)
                }
            }).call(this)
        },
        function (a) {
            (function () {
                var b, c = {}.hasOwnProperty;
                b = function () {
                    function a() {
                        this._nodes = {}, this.nodeSize = 0, this.edgeSize = 0
                    }
                    return a.prototype.addNode = function (a) {
                        return this._nodes[a] ? void 0 : (this.nodeSize++, this._nodes[a] = {
                            _outEdges: {},
                            _inEdges: {}
                        })
                    }, a.prototype.getNode = function (a) {
                        return this._nodes[a]
                    }, a.prototype.removeNode = function (a) {
                        var b, d, e, f, g;
                        if (d = this._nodes[a]) {
                            f = d._outEdges;
                            for (e in f) c.call(f, e) && this.removeEdge(a, e);
                            g = d._inEdges;
                            for (b in g) c.call(g, b) && this.removeEdge(b, a);
                            return this.nodeSize--, delete this._nodes[a], d
                        }
                    }, a.prototype.addEdge = function (a, b, c) {
                        var d, e, f;
                        return null == c && (c = 1), !this.getEdge(a, b) && (e = this._nodes[a], f = this._nodes[b], e && f) ? (d = {
                            weight: c
                        }, e._outEdges[b] = d, f._inEdges[a] = d, this.edgeSize++, d) : void 0
                    }, a.prototype.getEdge = function (a, b) {
                        var c, d;
                        return c = this._nodes[a], d = this._nodes[b], c && d ? c._outEdges[b] : void 0
                    }, a.prototype.removeEdge = function (a, b) {
                        var c, d, e;
                        return d = this._nodes[a], e = this._nodes[b], (c = this.getEdge(a, b)) ? (delete d._outEdges[b], delete e._inEdges[a], this.edgeSize--, c) : void 0
                    }, a.prototype.getInEdgesOf = function (a) {
                        var b, d, e, f;
                        e = this._nodes[a], d = [], f = null != e ? e._inEdges : void 0;
                        for (b in f) c.call(f, b) && d.push(this.getEdge(b, a));
                        return d
                    }, a.prototype.getOutEdgesOf = function (a) {
                        var b, d, e, f;
                        b = this._nodes[a], d = [], f = null != b ? b._outEdges : void 0;
                        for (e in f) c.call(f, e) && d.push(this.getEdge(a, e));
                        return d
                    }, a.prototype.getAllEdgesOf = function (a) {
                        var b, c, d, e, f, g, h;
                        if (c = this.getInEdgesOf(a), d = this.getOutEdgesOf(a), 0 === c.length) return d;
                        for (e = this.getEdge(a, a), b = f = 0, g = c.length; g >= 0 ? g > f : f > g; b = g >= 0 ? ++f : --f)
                            if (c[b] === e) {
                                h = [c[c.length - 1], c[b]], c[b] = h[0], c[c.length - 1] = h[1], c.pop();
                                break
                            }
                        return c.concat(d)
                    }, a.prototype.forEachNode = function (a) {
                        var b, d, e;
                        e = this._nodes;
                        for (b in e) c.call(e, b) && (d = e[b], a(d, b))
                    }, a.prototype.forEachEdge = function (a) {
                        var b, d, e, f, g, h;
                        g = this._nodes;
                        for (d in g)
                            if (c.call(g, d)) {
                                e = g[d], h = e._outEdges;
                                for (f in h) c.call(h, f) && (b = h[f], a(b))
                            }
                    }, a
                }(), a.exports = b
            }).call(this)
        },
        function (a) {
            (function () {
                var b, c, d, e;
                b = function () {
                    function a(a) {
                        var b, c, d, e, f, g;
                        for (null == a && (a = []), this._data = [void 0], d = 0, f = a.length; f > d; d++) c = a[d], null != c && this._data.push(c);
                        if (this._data.length > 1)
                            for (b = e = 2, g = this._data.length; g >= 2 ? g > e : e > g; b = g >= 2 ? ++e : --e) this._upHeap(b);
                        this.size = this._data.length - 1
                    }
                    return a.prototype.add = function (a) {
                        return null != a ? (this._data.push(a), this._upHeap(this._data.length - 1), this.size++, a) : void 0
                    }, a.prototype.removeMin = function () {
                        var a;
                        if (1 !== this._data.length) return this.size--, 2 === this._data.length ? this._data.pop() : (a = this._data[1], this._data[1] = this._data.pop(), this._downHeap(), a)
                    }, a.prototype.peekMin = function () {
                        return this._data[1]
                    }, a.prototype._upHeap = function (a) {
                        var b, c;
                        for (b = this._data[a]; this._data[a] < this._data[d(a)] && a > 1;) c = [this._data[d(a)], this._data[a]], this._data[a] = c[0], this._data[d(a)] = c[1], a = d(a)
                    }, a.prototype._downHeap = function () {
                        var a, b, d;
                        for (a = 1; c(a < this._data.length) && (b = c(a), b < this._data.length - 1 && this._data[e(a)] < this._data[b] && (b = e(a)), this._data[b] < this._data[a]);) d = [this._data[a], this._data[b]], this._data[b] = d[0], this._data[a] = d[1], a = b
                    }, a
                }(), d = function (a) {
                    return a >> 1
                }, c = function (a) {
                    return a << 1
                }, e = function (a) {
                    return (a << 1) + 1
                }, a.exports = b
            }).call(this)
        },
        function (a) {
            (function () {
                var b;
                b = function () {
                    function a(a) {
                        var b, c, d;
                        for (null == a && (a = []), this.head = {
                            prev: void 0,
                            value: void 0,
                            next: void 0
                        }, this.tail = {
                            prev: void 0,
                            value: void 0,
                            next: void 0
                        }, this.size = 0, c = 0, d = a.length; d > c; c++) b = a[c], this.add(b)
                    }
                    return a.prototype.at = function (a) {
                        var b, c, d, e, f;
                        if (-this.size <= a && a < this.size) {
                            if (a = this._adjust(a), 2 * a < this.size)
                                for (b = this.head, c = d = 1; a >= d; c = d += 1) b = b.next;
                            else
                                for (b = this.tail, c = e = 1, f = this.size - a - 1; f >= e; c = e += 1) b = b.prev;
                            return b
                        }
                    }, a.prototype.add = function (a, b) {
                        var c, d, e, f, g;
                        return null == b && (b = this.size), -this.size <= b && b <= this.size ? (d = {
                            value: a
                        }, b = this._adjust(b), 0 === this.size ? this.head = d : 0 === b ? (e = [d, this.head, d], this.head.prev = e[0], d.next = e[1], this.head = e[2]) : (c = this.at(b - 1), f = [c.next, d, d, c], d.next = f[0], null != (g = c.next) ? g.prev = f[1] : void 0, c.next = f[2], d.prev = f[3]), b === this.size && (this.tail = d), this.size++, a) : void 0
                    }, a.prototype.removeAt = function (a) {
                        var b, c, d;
                        return null == a && (a = this.size - 1), -this.size <= a && a < this.size && 0 !== this.size ? (a = this._adjust(a), 1 === this.size ? (c = this.head.value, this.head.value = this.tail.value = void 0) : 0 === a ? (c = this.head.value, this.head = this.head.next, this.head.prev = void 0) : (b = this.at(a), c = b.value, b.prev.next = b.next, null != (d = b.next) && (d.prev = b.prev), a === this.size - 1 && (this.tail = b.prev)), this.size--, c) : void 0
                    }, a.prototype.remove = function (a) {
                        var b;
                        if (null != a) {
                            for (b = this.head; b && b.value !== a;) b = b.next;
                            if (b) return 1 === this.size ? this.head.value = this.tail.value = void 0 : b === this.head ? (this.head = this.head.next, this.head.prev = void 0) : b === this.tail ? (this.tail = this.tail.prev, this.tail.next = void 0) : (b.prev.next = b.next, b.next.prev = b.prev), this.size--, a
                        }
                    }, a.prototype.indexOf = function (a, b) {
                        var c, d;
                        if (null == b && (b = 0), null == this.head.value && !this.head.next || b >= this.size) return -1;
                        for (b = Math.max(0, this._adjust(b)), c = this.at(b), d = b; c && c.value !== a;) c = c.next, d++;
                        return d === this.size ? -1 : d
                    }, a.prototype._adjust = function (a) {
                        return 0 > a ? this.size + a : a
                    }, a
                }(), a.exports = b
            }).call(this)
        },
        function (a) {
            (function () {
                var b, c, d, e, f = {}.hasOwnProperty;
                c = "_mapId_", b = function () {
                    function a(b) {
                        var c, d;
                        this._content = {}, this._itemId = 0, this._id = a._newMapId(), this.size = 0;
                        for (c in b) f.call(b, c) && (d = b[c], this.set(c, d))
                    }
                    return a._mapIdTracker = 0, a._newMapId = function () {
                        return this._mapIdTracker++
                    }, a.prototype.hash = function (a, b) {
                        var f, g;
                        return null == b && (b = !1), g = d(a), e(a) ? (f = c + this._id, b && !a[f] && (a[f] = this._itemId++), f + "_" + a[f]) : g + "_" + a
                    }, a.prototype.set = function (a, b) {
                        return this.has(a) || this.size++, this._content[this.hash(a, !0)] = [b, a], b
                    }, a.prototype.get = function (a) {
                        var b;
                        return null != (b = this._content[this.hash(a)]) ? b[0] : void 0
                    }, a.prototype.has = function (a) {
                        return this.hash(a) in this._content
                    }, a.prototype["delete"] = function (a) {
                        var b;
                        return b = this.hash(a), b in this._content ? (delete this._content[b], e(a) && delete a[c + this._id], this.size--, !0) : !1
                    }, a.prototype.forEach = function (a) {
                        var b, c, d;
                        d = this._content;
                        for (b in d) f.call(d, b) && (c = d[b], a(c[1], c[0]))
                    }, a
                }(), e = function (a) {
                    var b, c, e, f, g;
                    for (b = ["Boolean", "Number", "String", "Undefined", "Null", "RegExp", "Function"], e = d(a), f = 0, g = b.length; g > f; f++)
                        if (c = b[f], e === c) return !1;
                    return !0
                }, d = function (a) {
                    return Object.prototype.toString.apply(a).match(/\[object (.+)\]/)[1]
                }, a.exports = b
            }).call(this)
        },
        function (a) {
            (function () {
                var b;
                b = function () {
                    function a(a) {
                        null == a && (a = []), this._content = a, this._dequeueIndex = 0, this.size = this._content.length
                    }
                    return a.prototype.enqueue = function (a) {
                        return this.size++, this._content.push(a), a
                    }, a.prototype.dequeue = function () {
                        var a;
                        if (0 !== this.size) return this.size--, a = this._content[this._dequeueIndex], this._dequeueIndex++, 2 * this._dequeueIndex > this._content.length && (this._content = this._content.slice(this._dequeueIndex), this._dequeueIndex = 0), a
                    }, a.prototype.peek = function () {
                        return this._content[this._dequeueIndex]
                    }, a
                }(), a.exports = b
            }).call(this)
        },
        function (a) {
            (function () {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p;
                c = 0, d = 1, e = 2, h = 3, f = 1, b = 2, g = function () {
                    function a(a) {
                        var b, c, d;
                        for (null == a && (a = []), this._root, this.size = 0, c = 0, d = a.length; d > c; c++) b = a[c], null != b && this.add(b)
                    }
                    return a.prototype.add = function (a) {
                        var g, l, m, n;
                        if (null != a) {
                            if (this.size++, m = {
                                value: a,
                                _color: f
                            }, this._root) {
                                if (l = i(this._root, function (b) {
                                    return a === b.value ? c : a < b.value ? b._left ? d : (m._parent = b, b._left = m, h) : b._right ? e : (m._parent = b, b._right = m, h)
                                }), null != l) return
                            } else this._root = m;
                            for (g = m;;) {
                                if (g === this._root) {
                                    g._color = b;
                                    break
                                }
                                if (g._parent._color === b) break; {
                                    if ((null != (n = p(g)) ? n._color : void 0) !== f) {
                                        !k(g) && k(g._parent) ? (this._rotateLeft(g._parent), g = g._left) : k(g) && !k(g._parent) && (this._rotateRight(g._parent), g = g._right), g._parent._color = b, j(g)._color = f, k(g) ? this._rotateRight(j(g)) : this._rotateLeft(j(g));
                                        break
                                    }
                                    g._parent._color = b, p(g)._color = b, j(g)._color = f, g = j(g)
                                }
                            }
                            return a
                        }
                    }, a.prototype.has = function (a) {
                        var b;
                        return b = i(this._root, function (b) {
                            return a === b.value ? c : a < b.value ? d : e
                        }), b ? !0 : !1
                    }, a.prototype.peekMin = function () {
                        var a;
                        return null != (a = n(this._root)) ? a.value : void 0
                    }, a.prototype.peekMax = function () {
                        var a;
                        return null != (a = m(this._root)) ? a.value : void 0
                    }, a.prototype.remove = function (a) {
                        var b;
                        return (b = i(this._root, function (b) {
                            return a === b.value ? c : a < b.value ? d : e
                        })) ? (this._removeNode(this._root, b), this.size--, a) : void 0
                    }, a.prototype.removeMin = function () {
                        var a, b;
                        return (a = n(this._root)) ? (b = a.value, this._removeNode(this._root, a), b) : void 0
                    }, a.prototype.removeMax = function () {
                        var a, b;
                        return (a = m(this._root)) ? (b = a.value, this._removeNode(this._root, a), b) : void 0
                    }, a.prototype._removeNode = function (a, c) {
                        var d, e, g, h, i, j, m, p, q, r;
                        if (c._left && c._right && (e = n(c._right), c.value = e.value, c = e), e = c._left || c._right, e || (e = {
                            color: b,
                            _right: void 0,
                            _left: void 0,
                            isLeaf: !0
                        }), e._parent = c._parent, null != (g = c._parent) && (g[l(c)] = e), c._color === b)
                            if (e._color === f) e._color = b, e._parent || (this._root = e);
                            else
                                for (;;) {
                                    if (!e._parent) {
                                        this._root = e.isLeaf ? void 0 : e;
                                        break
                                    }
                                    if (d = o(e), (null != d ? d._color : void 0) === f && (e._parent._color = f, d._color = b, k(e) ? this._rotateLeft(e._parent) : this._rotateRight(e._parent)), d = o(e), e._parent._color !== b || d && (d._color !== b || d._left && d._left._color !== b || d._right && d._right._color !== b)) {
                                        if (!(e._parent._color !== f || d && (d._color !== b || d._left && (null != (h = d._left) ? h._color : void 0) !== b || d._right && (null != (i = d._right) ? i._color : void 0) !== b))) {
                                            null != d && (d._color = f), e._parent._color = b;
                                            break
                                        }
                                        if ((null != d ? d._color : void 0) === b) {
                                            !k(e) || d._right && d._right._color !== b || (null != (j = d._left) ? j._color : void 0) !== f ? k(e) || d._left && d._left._color !== b || (null != (p = d._right) ? p._color : void 0) !== f || (d._color = f, null != (q = d._right) && (q._color = b), this._rotateLeft(d)) : (d._color = f, null != (m = d._left) && (m._color = b), this._rotateRight(d));
                                            break
                                        }
                                        d = o(e), d._color = e._parent._color, k(e) ? (d._right._color = b, this._rotateRight(e._parent)) : (d._left._color = b, this._rotateLeft(e._parent))
                                    } else null != d && (d._color = f), e.isLeaf && (e._parent[l(e)] = void 0), e = e._parent
                                }
                            return e.isLeaf && null != (r = e._parent) ? r[l(e)] = void 0 : void 0
                    }, a.prototype._rotateLeft = function (a) {
                        var b, c;
                        return null != (b = a._parent) && (b[l(a)] = a._right), a._right._parent = a._parent, a._parent = a._right, a._right = a._right._left, a._parent._left = a, null != (c = a._right) && (c._parent = a), null == a._parent._parent ? this._root = a._parent : void 0
                    }, a.prototype._rotateRight = function (a) {
                        var b, c;
                        return null != (b = a._parent) && (b[l(a)] = a._left), a._left._parent = a._parent, a._parent = a._left, a._left = a._left._right, a._parent._right = a, null != (c = a._left) && (c._parent = a), null == a._parent._parent ? this._root = a._parent : void 0
                    }, a
                }(), k = function (a) {
                    return a === a._parent._left
                }, l = function (a) {
                    return k(a) ? "_left" : "_right"
                }, i = function (a, b) {
                    var f, g, i;
                    for (g = a, i = void 0; g;) {
                        if (f = b(g), f === c) {
                            i = g;
                            break
                        }
                        if (f === d) g = g._left;
                        else if (f === e) g = g._right;
                        else if (f === h) break
                    }
                    return i
                }, n = function (a) {
                    return i(a, function (a) {
                        return a._left ? d : c
                    })
                }, m = function (a) {
                    return i(a, function (a) {
                        return a._right ? e : c
                    })
                }, j = function (a) {
                    var b;
                    return null != (b = a._parent) ? b._parent : void 0
                }, p = function (a) {
                    return j(a) ? k(a._parent) ? j(a)._right : j(a)._left : void 0
                }, o = function (a) {
                    return k(a) ? a._parent._right : a._parent._left
                }, a.exports = g
            }).call(this)
        },
        function (a, b, c) {
            (function () {
                var b, d, e, f, g = {}.hasOwnProperty;
                b = c(6), e = "end", d = function () {
                    function a(a) {
                        var b, c, d;
                        for (null == a && (a = []), this._root = {}, this.size = 0, c = 0, d = a.length; d > c; c++) b = a[c], this.add(b)
                    }
                    return a.prototype.add = function (a) {
                        var b, c, d, f;
                        if (null != a) {
                            for (this.size++, b = this._root, d = 0, f = a.length; f > d; d++) c = a[d], null == b[c] && (b[c] = {}), b = b[c];
                            return b[e] = !0, a
                        }
                    }, a.prototype.has = function (a) {
                        var b, c, d, f;
                        if (null == a) return !1;
                        for (b = this._root, d = 0, f = a.length; f > d; d++) {
                            if (c = a[d], null == b[c]) return !1;
                            b = b[c]
                        }
                        return b[e] ? !0 : !1
                    }, a.prototype.longestPrefixOf = function (a) {
                        var b, c, d, e, f;
                        if (null == a) return "";
                        for (b = this._root, d = "", e = 0, f = a.length; f > e && (c = a[e], null != b[c]); e++) d += c, b = b[c];
                        return d
                    }, a.prototype.wordsWithPrefix = function (a) {
                        var c, d, f, h, i, j, k, l, m, n;
                        if (null == a) return [];
                        for (null != a || (a = ""), k = [], d = this._root, l = 0, m = a.length; m > l; l++)
                            if (f = a[l], d = d[f], null == d) return [];
                        for (i = new b, i.enqueue([d, ""]); 0 !== i.size;) {
                            n = i.dequeue(), h = n[0], c = n[1], h[e] && k.push(a + c);
                            for (f in h) g.call(h, f) && (j = h[f], i.enqueue([j, c + f]))
                        }
                        return k
                    }, a.prototype.remove = function (a) {
                        var b, c, d, g, h, i, j, k;
                        if (null != a) {
                            for (b = this._root, g = [], h = 0, j = a.length; j > h; h++) {
                                if (d = a[h], null == b[d]) return;
                                b = b[d], g.push([d, b])
                            }
                            if (b[e]) {
                                if (this.size--, delete b[e], f(b, 1)) return a;
                                for (c = i = k = g.length - 1;
                                    (1 >= k ? 1 >= i : i >= 1) && !f(g[c][1], 1); c = 1 >= k ? ++i : --i) delete g[c - 1][1][g[c][0]];
                                return f(this._root[g[0][0]], 1) || delete this._root[g[0][0]], a
                            }
                        }
                    }, a
                }(), f = function (a, b) {
                    var c, d;
                    if (0 === b) return !0;
                    d = 0;
                    for (c in a)
                        if (g.call(a, c) && (d++, d >= b)) return !0;
                    return !1
                }, a.exports = d
            }).call(this)
        }]), b.module("uiGmapgoogle-maps.extensions").service("uiGmapExtendMarkerClusterer", ["uiGmapLodash", "uiGmapPropMap",
        function (b, c) {
            return {
                init: _.once(function () {
                    (function () {
                        var d = {}.hasOwnProperty,
                            e = function (a, b) {
                                function c() {
                                    this.constructor = a
                                }
                                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                            };
                        a.NgMapCluster = function (a) {
                            function d(a) {
                                d.__super__.constructor.call(this, a), this.markers_ = new c
                            }
                            return e(d, a), d.prototype.addMarker = function (a) {
                                var b, c;
                                if (this.isMarkerAlreadyAdded_(a)) {
                                    var d = this.markers_.get(a.key);
                                    if (d.getPosition().lat() == a.getPosition().lat() && d.getPosition().lon() == a.getPosition().lon()) return !1
                                }
                                if (this.center_) {
                                    if (this.averageCenter_) {
                                        var e = this.markers_.length + 1,
                                            f = (this.center_.lat() * (e - 1) + a.getPosition().lat()) / e,
                                            g = (this.center_.lng() * (e - 1) + a.getPosition().lng()) / e;
                                        this.center_ = new google.maps.LatLng(f, g), this.calculateBounds_()
                                    }
                                } else this.center_ = a.getPosition(), this.calculateBounds_();
                                return a.isAdded = !0, this.markers_.push(a), b = this.markers_.length, c = this.markerClusterer_.getMaxZoom(), null !== c && this.map_.getZoom() > c ? a.getMap() !== this.map_ && a.setMap(this.map_) : b < this.minClusterSize_ ? a.getMap() !== this.map_ && a.setMap(this.map_) : b === this.minClusterSize_ ? this.markers_.each(function (a) {
                                    a.setMap(null)
                                }) : a.setMap(null), !0
                            }, d.prototype.isMarkerAlreadyAdded_ = function (a) {
                                return b.isNullOrUndefined(this.markers_.get(a.key))
                            }, d.prototype.getBounds = function () {
                                var a = new google.maps.LatLngBounds(this.center_, this.center_);
                                return this.getMarkers().each(function (b) {
                                    a.extend(b.getPosition())
                                }), a
                            }, d.prototype.remove = function () {
                                this.clusterIcon_.setMap(null), this.markers_ = new c, delete this.markers_
                            }, d
                        }(Cluster), a.NgMapMarkerClusterer = function (a) {
                            function b(a, d, e) {
                                b.__super__.constructor.call(this, a, d, e), this.markers_ = new c
                            }
                            return e(b, a), b.prototype.clearMarkers = function () {
                                this.resetViewport_(!0), this.markers_ = new c
                            }, b.prototype.removeMarker_ = function (a) {
                                return this.markers_.get(a.key) ? (a.setMap(null), this.markers_.remove(a.key), !0) : !1
                            }, b.prototype.createClusters_ = function (a) {
                                var b, c, d, e = this;
                                if (this.ready_) {
                                    0 === a && (google.maps.event.trigger(this, "clusteringbegin", this), "undefined" != typeof this.timerRefStatic && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), d = this.getMap().getZoom() > 3 ? new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
                                    var f = this.getExtendedBounds(d),
                                        g = Math.min(a + this.batchSize_, this.markers_.length),
                                        h = this.markers_.values();
                                    for (b = a; g > b; b++) c = h[b], !c.isAdded && this.isMarkerInBounds_(c, f) && (!this.ignoreHidden_ || this.ignoreHidden_ && c.getVisible()) && this.addToClosestCluster_(c);
                                    if (g < this.markers_.length) this.timerRefStatic = setTimeout(function () {
                                        e.createClusters_(g)
                                    }, 0);
                                    else {
                                        for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].updateIcon_();
                                        delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this)
                                    }
                                }
                            }, b.prototype.addToClosestCluster_ = function (a) {
                                var b, c, d, e, f = 4e4,
                                    g = null;
                                for (b = 0; b < this.clusters_.length; b++) d = this.clusters_[b], e = d.getCenter(), e && (c = this.distanceBetweenPoints_(e, a.getPosition()), f > c && (f = c, g = d));
                                g && g.isMarkerInClusterBounds(a) ? g.addMarker(a) : (d = new NgMapCluster(this), d.addMarker(a), this.clusters_.push(d))
                            }, b.prototype.redraw_ = function () {
                                this.createClusters_(0)
                            }, b.prototype.resetViewport_ = function (a) {
                                var b;
                                for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].remove();
                                this.clusters_ = [], this.markers_.each(function (b) {
                                    b.isAdded = !1, a && b.setMap(null)
                                })
                            }, b.prototype.extend = function (a, b) {
                                return function (a) {
                                    var b;
                                    for (b in a.prototype) "constructor" !== b && (this.prototype[b] = a.prototype[b]);
                                    return this
                                }.apply(a, [b])
                            }, ClusterIcon.prototype.show = function () {
                                if (this.div_) {
                                    var a = "",
                                        b = this.backgroundPosition_.split(" "),
                                        c = parseInt(b[0].trim(), 10),
                                        d = parseInt(b[1].trim(), 10),
                                        e = this.getPosFromLatLng_(this.center_);
                                    this.div_.style.cssText = this.createCss(e), a = "<img src='" + this.url_ + "' style='position: absolute; top: " + d + "px; left: " + c + "px; ", a += this.cluster_.getMarkerClusterer().enableRetinaIcons_ ? "width: " + this.width_ + "px;height: " + this.height_ + "px;" : "clip: rect(" + -1 * d + "px, " + (-1 * c + this.width_) + "px, " + (-1 * d + this.height_) + "px, " + -1 * c + "px);", a += "'>", this.div_.innerHTML = a + "<div style='position: absolute;top: " + this.anchorText_[0] + "px;left: " + this.anchorText_[1] + "px;color: " + this.textColor_ + ";font-size: " + this.textSize_ + "px;font-family: " + this.fontFamily_ + ";font-weight: " + this.fontWeight_ + ";font-style: " + this.fontStyle_ + ";text-decoration: " + this.textDecoration_ + ";text-align: center;width: " + this.width_ + "px;line-height:" + this.height_ + "px;'>" + this.sums_.text + "</div>", this.div_.title = "undefined" == typeof this.sums_.title || "" === this.sums_.title ? this.cluster_.getMarkerClusterer().getTitle() : this.sums_.title, this.div_.style.display = ""
                                }
                                this.visible_ = !0
                            }, b
                        }(MarkerClusterer)
                    }).call(this)
                })
            }
        }])
}(window, angular);