function ValidateForm(e) {
    function t(e, t) {
        return e.parent().find(".error_text-mail").remove(), o = $("<span>", {"class": "error_text"}), o.text(t), e.parent().append(o), e.addClass("error"), !1
    }

    function i(e) {
        e.parent().find(".error_text").remove(), e.removeClass("error")
    }

    var o, s = e.form, n = e.button, r = s.find("input, textarea"), l = s.find(".js-name"), a = s.find(".js-email"), c = s.find(".js-text"), h = s.find(".js-field"), u = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    r.keyup(function () {
        "" == $(this).val() ? ($(this).removeClass("change"), $(this).parent().find("label").removeClass("is-active")) : ($(this).addClass("change"), $(this).parent().find("label").addClass("is-active"))
    }), r.blur(function () {
        $(this).removeClass("change")
    }), a.blur(function () {
        if (u.test($(this).val()))i($(this)), $(this).parent().find(".error_text-mail").remove(); else {
            $(this).addClass("error");
            var e = $("<span>", {"class": "error_text-mail"});
            e.text("Проверьте правильность введенного email"), a.parent().append(e), $(this).parent().find(".error_text").remove()
        }
    }), a.keyup(function () {
        i($(this))
    }), l.keyup(function () {
        i($(this))
    }), c.keyup(function () {
        i($(this))
    }), h.keyup(function () {
        i($(this))
    }), n.click(function () {
        return "" == l.val() && t(l, "Фамилия, имя, отчество"), "" != a.val() && u.test(a.val()) || t(a, "Не указана электронная почта"), "" == c.val() && t(c, "Наберите сообщение — суть вашего вопроса или обращения"), "" == h.val() && t(h, "Незаполненое поле"), !1
    })
}
function text_placeholder(e) {
    var t = $(".js-text-placeholder");
    t.click(function () {
        $(this).addClass("is-hide"), e.focus()
    }), e.focus(function () {
        $(this).parent().find(".js-text-placeholder").addClass("is-hide")
    }).blur(function () {
        "" == $(this).val() && $(this).parent().find(".f-label").removeClass("is-hide")
    })
}
function drop_menu() {
    $(".js-menu li").hover(function () {
        clearTimeout($.data(this, "timer")), $(".js-dropMenu", this).stop(!0, !0).slideDown(200)
    }, function () {
        $.data(this, "timer", setTimeout($.proxy(function () {
            $(".js-dropMenu", this).stop(!0, !0).slideUp(200)
        }, this), 100))
    })
}
function Tabs(e) {
    var t = e.delay, i = e.content, o = e.activeBlock, s = e.tabs, n = e.customData;
    $(i).hide(), $(o).show(), $(s).click(function () {
        $(s).removeClass("is-active"), $(this).addClass("is-active"), $(i).hide();
        var e = $(this).attr(n);
        return $(e).fadeIn(t), !1
    })
}
function inputBigger(e) {
    e.width();
    e.focus(function () {
        $(this).addClass("is-wider")
    }), e.blur(function () {
        $(this).removeClass("is-wider")
    })
}
function accordion() {
    var e = $(".university-spec__list > li");
    e.click(function () {
        $(this).hasClass("is-active") || e.removeClass("is-active"), $(this).toggleClass("is-active"), $(this).next().is(":visible") || $(".university-spec__items").slideUp(300), $(this).next().hasClass("university-spec__items") && $(this).next().slideToggle(300)
    })
}
function DropDown(e) {
    function t() {
        return o(), !1
    }

    function i(e) {
        var t = $(e.target).closest(r).length;
        t || n()
    }

    function o() {
        a ? n() : s()
    }

    function s() {
        r.addClass("is-open"), l.slideDown(200), $(document).on("click", i), a = !0
    }

    function n() {
        r.removeClass("is-open"), l.slideUp(200), $(document).off("click", i), a = !1
    }

    var r = e.elem, l = e.dropdown;
    r.on("click", t);
    var a = !1
}
!function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function (e) {
    "use strict";
    function t(e) {
        if (e instanceof Date)return e;
        if (String(e).match(r))return String(e).match(/^[0-9]*$/) && (e = Number(e)), String(e).match(/\-/) && (e = String(e).replace(/\-/g, "/")), new Date(e);
        throw new Error("Couldn't cast `" + e + "` to a date object.")
    }

    function i(e) {
        return function (t) {
            var i = t.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (i)for (var s = 0, n = i.length; n > s; ++s) {
                var r = i[s].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), a = new RegExp(r[0]), c = r[1] || "", h = r[3] || "", u = null;
                r = r[2], l.hasOwnProperty(r) && (u = l[r], u = Number(e[u])), null !== u && ("!" === c && (u = o(h, u)), "" === c && 10 > u && (u = "0" + u.toString()), t = t.replace(a, u.toString()))
            }
            return t = t.replace(/%%/, "%")
        }
    }

    function o(e, t) {
        var i = "s", o = "";
        return e && (e = e.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === e.length ? i = e[0] : (o = e[0], i = e[1])), 1 === Math.abs(t) ? o : i
    }

    var s = 100, n = [], r = [];
    r.push(/^[0-9]*$/.source), r.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), r.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), r = new RegExp(r.join("|"));
    var l = {
        Y: "years",
        m: "months",
        w: "weeks",
        d: "days",
        D: "totalDays",
        H: "hours",
        M: "minutes",
        S: "seconds"
    }, a = function (t, i, o) {
        this.el = t, this.$el = e(t), this.interval = null, this.offset = {}, this.instanceNumber = n.length, n.push(this), this.$el.data("countdown-instance", this.instanceNumber), o && (this.$el.on("update.countdown", o), this.$el.on("stoped.countdown", o), this.$el.on("finish.countdown", o)), this.setFinalDate(i), this.start()
    };
    e.extend(a.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var e = this;
            this.update(), this.interval = setInterval(function () {
                e.update.call(e)
            }, s)
        }, stop: function () {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        }, pause: function () {
            this.stop.call(this)
        }, resume: function () {
            this.start.call(this)
        }, remove: function () {
            this.stop(), n[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        }, setFinalDate: function (e) {
            this.finalDate = t(e)
        }, update: function () {
            return 0 === this.$el.closest("html").length ? void this.remove() : (this.totalSecsLeft = this.finalDate.getTime() - (new Date).getTime(), this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3), this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
                years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
            }, void(0 === this.totalSecsLeft ? (this.stop(), this.dispatchEvent("finish")) : this.dispatchEvent("update")))
        }, dispatchEvent: function (t) {
            var o = e.Event(t + ".countdown");
            o.finalDate = this.finalDate, o.offset = e.extend({}, this.offset), o.strftime = i(this.offset), this.$el.trigger(o)
        }
    }), e.fn.countdown = function () {
        var t = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var i = e(this).data("countdown-instance");
            if (void 0 !== i) {
                var o = n[i], s = t[0];
                a.prototype.hasOwnProperty(s) ? o[s].apply(o, t.slice(1)) : null === String(s).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (o.setFinalDate.call(o, s), o.start()) : e.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, s))
            } else new a(this, t[0], t[1])
        })
    }
}), function (e) {
    e.fn.customScrollbar = function (t, i) {
        var o = {
            skin: void 0,
            hScroll: !0,
            vScroll: !0,
            updateOnWindowResize: !1,
            animationSpeed: 300,
            onCustomScroll: void 0,
            swipeSpeed: 1,
            wheelSpeed: 40,
            fixedThumbWidth: void 0,
            fixedThumbHeight: void 0
        }, s = function (t, i) {
            this.$element = e(t), this.options = i, this.addScrollableClass(), this.addSkinClass(), this.addScrollBarComponents(), this.options.vScroll && (this.vScrollbar = new n(this, new l)), this.options.hScroll && (this.hScrollbar = new n(this, new r)), this.$element.data("scrollable", this), this.initKeyboardScrolling(), this.bindEvents()
        };
        s.prototype = {
            addScrollableClass: function () {
                this.$element.hasClass("scrollable") || (this.scrollableAdded = !0, this.$element.addClass("scrollable"))
            }, removeScrollableClass: function () {
                this.scrollableAdded && this.$element.removeClass("scrollable")
            }, addSkinClass: function () {
                "string" != typeof this.options.skin || this.$element.hasClass(this.options.skin) || (this.skinClassAdded = !0, this.$element.addClass(this.options.skin))
            }, removeSkinClass: function () {
                this.skinClassAdded && this.$element.removeClass(this.options.skin)
            }, addScrollBarComponents: function () {
                this.assignViewPort(), 0 == this.$viewPort.length && (this.$element.wrapInner('<div class="viewport" />'), this.assignViewPort(), this.viewPortAdded = !0), this.assignOverview(), 0 == this.$overview.length && (this.$viewPort.wrapInner('<div class="overview" />'), this.assignOverview(), this.overviewAdded = !0), this.addScrollBar("vertical", "prepend"), this.addScrollBar("horizontal", "append")
            }, removeScrollbarComponents: function () {
                this.removeScrollbar("vertical"), this.removeScrollbar("horizontal"), this.overviewAdded && this.$element.unwrap(), this.viewPortAdded && this.$element.unwrap()
            }, removeScrollbar: function (e) {
                this[e + "ScrollbarAdded"] && this.$element.find(".scroll-bar." + e).remove()
            }, assignViewPort: function () {
                this.$viewPort = this.$element.find(".viewport")
            }, assignOverview: function () {
                this.$overview = this.$viewPort.find(".overview")
            }, addScrollBar: function (e, t) {
                0 == this.$element.find(".scroll-bar." + e).length && (this.$element[t]("<div class='scroll-bar " + e + "'><div class='thumb'></div></div>"), this[e + "ScrollbarAdded"] = !0)
            }, resize: function (e) {
                this.vScrollbar && this.vScrollbar.resize(e), this.hScrollbar && this.hScrollbar.resize(e)
            }, scrollTo: function (e) {
                this.vScrollbar && this.vScrollbar.scrollToElement(e), this.hScrollbar && this.hScrollbar.scrollToElement(e)
            }, scrollToXY: function (e, t) {
                this.scrollToX(e), this.scrollToY(t)
            }, scrollToX: function (e) {
                this.hScrollbar && this.hScrollbar.scrollOverviewTo(e, !0)
            }, scrollToY: function (e) {
                this.vScrollbar && this.vScrollbar.scrollOverviewTo(e, !0)
            }, remove: function () {
                this.removeScrollableClass(), this.removeSkinClass(), this.removeScrollbarComponents(), this.$element.data("scrollable", null), this.removeKeyboardScrolling(), this.vScrollbar && this.vScrollbar.remove(), this.hScrollbar && this.hScrollbar.remove()
            }, setAnimationSpeed: function (e) {
                this.options.animationSpeed = e
            }, isInside: function (t, i) {
                var o = e(t), s = e(i), n = o.offset(), r = s.offset();
                return n.top >= r.top && n.left >= r.left && n.top + o.height() <= r.top + s.height() && n.left + o.width() <= r.left + s.width()
            }, initKeyboardScrolling: function () {
                var e = this;
                this.elementKeydown = function (t) {
                    document.activeElement === e.$element[0] && (e.vScrollbar && e.vScrollbar.keyScroll(t), e.hScrollbar && e.hScrollbar.keyScroll(t))
                }, this.$element.attr("tabindex", "-1").keydown(this.elementKeydown)
            }, removeKeyboardScrolling: function () {
                this.$element.removeAttr("tabindex").unbind("keydown", this.elementKeydown)
            }, bindEvents: function () {
                this.options.onCustomScroll && this.$element.on("customScroll", this.options.onCustomScroll)
            }
        };
        var n = function (e, t) {
            this.scrollable = e, this.sizing = t, this.$scrollBar = this.sizing.scrollBar(this.scrollable.$element), this.$thumb = this.$scrollBar.find(".thumb"), this.setScrollPosition(0, 0), this.resize(), this.initMouseMoveScrolling(), this.initMouseWheelScrolling(), this.initTouchScrolling(), this.initMouseClickScrolling(), this.initWindowResize()
        };
        n.prototype = {
            resize: function (e) {
                this.scrollable.$viewPort.height(this.scrollable.$element.height()), this.sizing.size(this.scrollable.$viewPort, this.sizing.size(this.scrollable.$element)), this.viewPortSize = this.sizing.size(this.scrollable.$viewPort), this.overviewSize = this.sizing.size(this.scrollable.$overview), this.ratio = this.viewPortSize / this.overviewSize, this.sizing.size(this.$scrollBar, this.viewPortSize), this.thumbSize = this.calculateThumbSize(), this.sizing.size(this.$thumb, this.thumbSize), this.maxThumbPosition = this.calculateMaxThumbPosition(), this.maxOverviewPosition = this.calculateMaxOverviewPosition(), this.enabled = this.overviewSize > this.viewPortSize, void 0 === this.scrollPercent && (this.scrollPercent = 0), this.enabled ? this.rescroll(e) : this.setScrollPosition(0, 0), this.$scrollBar.toggle(this.enabled)
            }, calculateThumbSize: function () {
                var e, t = this.sizing.fixedThumbSize(this.scrollable.options);
                return e = t ? t : this.ratio * this.viewPortSize, Math.max(e, this.sizing.minSize(this.$thumb))
            }, initMouseMoveScrolling: function () {
                var t = this;
                this.$thumb.mousedown(function (e) {
                    t.enabled && t.startMouseMoveScrolling(e)
                }), this.documentMouseup = function (e) {
                    t.stopMouseMoveScrolling(e)
                }, e(document).mouseup(this.documentMouseup), this.documentMousemove = function (e) {
                    t.mouseMoveScroll(e)
                }, e(document).mousemove(this.documentMousemove), this.$thumb.click(function (e) {
                    e.stopPropagation()
                })
            }, removeMouseMoveScrolling: function () {
                this.$thumb.unbind(), e(document).unbind("mouseup", this.documentMouseup), e(document).unbind("mousemove", this.documentMousemove)
            }, initMouseWheelScrolling: function () {
                var e = this;
                this.scrollable.$element.mousewheel(function (t, i, o, s) {
                    e.enabled && e.mouseWheelScroll(o, s) && (t.stopPropagation(), t.preventDefault())
                })
            }, removeMouseWheelScrolling: function () {
                this.scrollable.$element.unbind("mousewheel")
            }, initTouchScrolling: function () {
                if (document.addEventListener) {
                    var e = this;
                    this.elementTouchstart = function (t) {
                        e.enabled && e.startTouchScrolling(t)
                    }, this.scrollable.$element[0].addEventListener("touchstart", this.elementTouchstart), this.documentTouchmove = function (t) {
                        e.touchScroll(t)
                    }, document.addEventListener("touchmove", this.documentTouchmove), this.elementTouchend = function (t) {
                        e.stopTouchScrolling(t)
                    }, this.scrollable.$element[0].addEventListener("touchend", this.elementTouchend)
                }
            }, removeTouchScrolling: function () {
                document.addEventListener && (this.scrollable.$element[0].removeEventListener("touchstart", this.elementTouchstart), document.removeEventListener("touchmove", this.documentTouchmove), this.scrollable.$element[0].removeEventListener("touchend", this.elementTouchend))
            }, initMouseClickScrolling: function () {
                var e = this;
                this.scrollBarClick = function (t) {
                    e.mouseClickScroll(t)
                }, this.$scrollBar.click(this.scrollBarClick)
            }, removeMouseClickScrolling: function () {
                this.$scrollBar.unbind("click", this.scrollBarClick)
            }, initWindowResize: function () {
                if (this.scrollable.options.updateOnWindowResize) {
                    var t = this;
                    this.windowResize = function () {
                        t.resize()
                    }, e(window).resize(this.windowResize)
                }
            }, removeWindowResize: function () {
                e(window).unbind("resize", this.windowResize)
            }, isKeyScrolling: function (e) {
                return null != this.keyScrollDelta(e)
            }, keyScrollDelta: function (e) {
                for (var t in this.sizing.scrollingKeys)if (t == e)return this.sizing.scrollingKeys[e](this.viewPortSize);
                return null
            }, startMouseMoveScrolling: function (t) {
                this.mouseMoveScrolling = !0, e("html").addClass("not-selectable"), this.setUnselectable(e("html"), "on"), this.setScrollEvent(t)
            }, stopMouseMoveScrolling: function () {
                this.mouseMoveScrolling = !1, e("html").removeClass("not-selectable"), this.setUnselectable(e("html"), null)
            }, setUnselectable: function (e, t) {
                e.attr("unselectable") != t && (e.attr("unselectable", t), e.find(":not(input)").attr("unselectable", t))
            }, mouseMoveScroll: function (e) {
                if (this.mouseMoveScrolling) {
                    var t = this.sizing.mouseDelta(this.scrollEvent, e);
                    this.scrollThumbBy(t), this.setScrollEvent(e)
                }
            }, startTouchScrolling: function (e) {
                e.touches && 1 == e.touches.length && (this.setScrollEvent(e.touches[0]), this.touchScrolling = !0, e.stopPropagation())
            }, touchScroll: function (e) {
                if (this.touchScrolling && e.touches && 1 == e.touches.length) {
                    var t = -this.sizing.mouseDelta(this.scrollEvent, e.touches[0]) * this.scrollable.options.swipeSpeed, i = this.scrollOverviewBy(t);
                    i && (e.stopPropagation(), e.preventDefault(), this.setScrollEvent(e.touches[0]))
                }
            }, stopTouchScrolling: function (e) {
                this.touchScrolling = !1, e.stopPropagation()
            }, mouseWheelScroll: function (e, t) {
                var i = -this.sizing.wheelDelta(e, t) * this.scrollable.options.wheelSpeed;
                return 0 != i ? this.scrollOverviewBy(i) : void 0
            }, mouseClickScroll: function (e) {
                var t = this.viewPortSize - 20;
                e["page" + this.sizing.scrollAxis()] < this.$thumb.offset()[this.sizing.offsetComponent()] && (t = -t), this.scrollOverviewBy(t)
            }, keyScroll: function (e) {
                var t = e.which;
                this.enabled && this.isKeyScrolling(t) && this.scrollOverviewBy(this.keyScrollDelta(t)) && e.preventDefault()
            }, scrollThumbBy: function (e) {
                var t = this.thumbPosition();
                t += e, t = this.positionOrMax(t, this.maxThumbPosition);
                var i = this.scrollPercent;
                this.scrollPercent = t / this.maxThumbPosition;
                var o = t * this.maxOverviewPosition / this.maxThumbPosition;
                return this.setScrollPosition(o, t), i != this.scrollPercent ? (this.triggerCustomScroll(i), !0) : !1
            }, thumbPosition: function () {
                return this.$thumb.position()[this.sizing.offsetComponent()]
            }, scrollOverviewBy: function (e) {
                var t = this.overviewPosition() + e;
                return this.scrollOverviewTo(t, !1)
            }, overviewPosition: function () {
                return -this.scrollable.$overview.position()[this.sizing.offsetComponent()]
            }, scrollOverviewTo: function (e, t) {
                e = this.positionOrMax(e, this.maxOverviewPosition);
                var i = this.scrollPercent;
                this.scrollPercent = e / this.maxOverviewPosition;
                var o = this.scrollPercent * this.maxThumbPosition;
                return t ? this.setScrollPositionWithAnimation(e, o) : this.setScrollPosition(e, o), i != this.scrollPercent ? (this.triggerCustomScroll(i), !0) : !1
            }, positionOrMax: function (e, t) {
                return 0 > e ? 0 : e > t ? t : e
            }, triggerCustomScroll: function (e) {
                this.scrollable.$element.trigger("customScroll", {
                    scrollAxis: this.sizing.scrollAxis(),
                    direction: this.sizing.scrollDirection(e, this.scrollPercent),
                    scrollPercent: 100 * this.scrollPercent
                })
            }, rescroll: function (e) {
                if (e) {
                    var t = this.positionOrMax(this.overviewPosition(), this.maxOverviewPosition);
                    this.scrollPercent = t / this.maxOverviewPosition;
                    var i = this.scrollPercent * this.maxThumbPosition;
                    this.setScrollPosition(t, i)
                } else {
                    var i = this.scrollPercent * this.maxThumbPosition, t = this.scrollPercent * this.maxOverviewPosition;
                    this.setScrollPosition(t, i)
                }
            }, setScrollPosition: function (e, t) {
                this.$thumb.css(this.sizing.offsetComponent(), t + "px"), this.scrollable.$overview.css(this.sizing.offsetComponent(), -e + "px")
            }, setScrollPositionWithAnimation: function (e, t) {
                var i = {}, o = {};
                i[this.sizing.offsetComponent()] = t + "px", this.$thumb.animate(i, this.scrollable.options.animationSpeed), o[this.sizing.offsetComponent()] = -e + "px", this.scrollable.$overview.animate(o, this.scrollable.options.animationSpeed)
            }, calculateMaxThumbPosition: function () {
                return this.sizing.size(this.$scrollBar) - this.thumbSize
            }, calculateMaxOverviewPosition: function () {
                return this.sizing.size(this.scrollable.$overview) - this.sizing.size(this.scrollable.$viewPort)
            }, setScrollEvent: function (e) {
                var t = "page" + this.sizing.scrollAxis();
                this.scrollEvent && this.scrollEvent[t] == e[t] || (this.scrollEvent = {pageX: e.pageX, pageY: e.pageY})
            }, scrollToElement: function (t) {
                var i = e(t);
                if (this.sizing.isInside(i, this.scrollable.$overview) && !this.sizing.isInside(i, this.scrollable.$viewPort)) {
                    {
                        var o = i.offset(), s = this.scrollable.$overview.offset();
                        this.scrollable.$viewPort.offset()
                    }
                    this.scrollOverviewTo(o[this.sizing.offsetComponent()] - s[this.sizing.offsetComponent()], !0)
                }
            }, remove: function () {
                this.removeMouseMoveScrolling(), this.removeMouseWheelScrolling(), this.removeTouchScrolling(), this.removeMouseClickScrolling(), this.removeWindowResize()
            }
        };
        var r = function () {
        };
        r.prototype = {
            size: function (e, t) {
                return t ? e.width(t) : e.width()
            }, minSize: function (e) {
                return parseInt(e.css("min-width")) || 0
            }, fixedThumbSize: function (e) {
                return e.fixedThumbWidth
            }, scrollBar: function (e) {
                return e.find(".scroll-bar.horizontal")
            }, mouseDelta: function (e, t) {
                return t.pageX - e.pageX
            }, offsetComponent: function () {
                return "left"
            }, wheelDelta: function (e) {
                return e
            }, scrollAxis: function () {
                return "X"
            }, scrollDirection: function (e, t) {
                return t > e ? "right" : "left"
            }, scrollingKeys: {
                37: function () {
                    return -10
                }, 39: function () {
                    return 10
                }
            }, isInside: function (t, i) {
                var o = e(t), s = e(i), n = o.offset(), r = s.offset();
                return n.left >= r.left && n.left + o.width() <= r.left + s.width()
            }
        };
        var l = function () {
        };
        return l.prototype = {
            size: function (e, t) {
                return t ? e.height(t) : e.height()
            }, minSize: function (e) {
                return parseInt(e.css("min-height")) || 0
            }, fixedThumbSize: function (e) {
                return e.fixedThumbHeight
            }, scrollBar: function (e) {
                return e.find(".scroll-bar.vertical")
            }, mouseDelta: function (e, t) {
                return t.pageY - e.pageY
            }, offsetComponent: function () {
                return "top"
            }, wheelDelta: function (e, t) {
                return t
            }, scrollAxis: function () {
                return "Y"
            }, scrollDirection: function (e, t) {
                return t > e ? "down" : "up"
            }, scrollingKeys: {
                38: function () {
                    return -10
                }, 40: function () {
                    return 10
                }, 33: function (e) {
                    return -(e - 20)
                }, 34: function (e) {
                    return e - 20
                }
            }, isInside: function (t, i) {
                var o = e(t), s = e(i), n = o.offset(), r = s.offset();
                return n.top >= r.top && n.top + o.height() <= r.top + s.height()
            }
        }, this.each(function () {
            if (void 0 == t && (t = o), "string" == typeof t) {
                var n = e(this).data("scrollable");
                n && n[t](i)
            } else {
                if ("object" != typeof t)throw"Invalid type of options";
                t = e.extend(o, t), new s(e(this), t)
            }
        })
    }
}(jQuery), function (e) {
    function t(t) {
        var i = t || window.event, o = [].slice.call(arguments, 1), s = 0, n = 0, r = 0;
        return t = e.event.fix(i), t.type = "mousewheel", i.wheelDelta && (s = i.wheelDelta / 120), i.detail && (s = -i.detail / 3), r = s, void 0 !== i.axis && i.axis === i.HORIZONTAL_AXIS && (r = 0, n = s), void 0 !== i.wheelDeltaY && (r = i.wheelDeltaY / 120), void 0 !== i.wheelDeltaX && (n = i.wheelDeltaX / 120), o.unshift(t, s, n, r), (e.event.dispatch || e.event.handle).apply(this, o)
    }

    var i = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks)for (var o = i.length; o;)e.event.fixHooks[i[--o]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener)for (var e = i.length; e;)this.addEventListener(i[--e], t, !1); else this.onmousewheel = t
        }, teardown: function () {
            if (this.removeEventListener)for (var e = i.length; e;)this.removeEventListener(i[--e], t, !1); else this.onmousewheel = null
        }
    }, e.fn.extend({
        mousewheel: function (e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        }, unmousewheel: function (e) {
            return this.unbind("mousewheel", e)
        }
    })
}(jQuery), function (e) {
    "use strict";
    e(document).on("cycle-bootstrap", function (e, t, i) {
        "carousel" === t.fx && (i.getSlideIndex = function (e) {
            var t = this.opts()._carouselWrap.children(), i = t.index(e);
            return i % t.length
        }, i.next = function () {
            var e = t.reverse ? -1 : 1;
            t.allowWrap === !1 && t.currSlide + e > t.slideCount - t.carouselVisible || (t.API.advanceSlide(e), t.API.trigger("cycle-next", [t]).log("cycle-next"))
        })
    }), e.fn.cycle.transitions.carousel = {
        preInit: function (t) {
            t.hideNonActive = !1, t.container.on("cycle-destroyed", e.proxy(this.onDestroy, t.API)), t.API.stopTransition = this.stopTransition;
            for (var i = 0; t.startingSlide > i; i++)t.container.append(t.slides[0])
        }, postInit: function (t) {
            var i, o, s, n, r = t.carouselVertical;
            t.carouselVisible && t.carouselVisible > t.slideCount && (t.carouselVisible = t.slideCount - 1);
            var l = t.carouselVisible || t.slides.length, a = {
                display: r ? "block" : "inline-block",
                position: "static"
            };
            if (t.container.css({
                    position: "relative",
                    overflow: "hidden"
                }), t.slides.css(a), t._currSlide = t.currSlide, n = e('<div class="cycle-carousel-wrap"></div>').prependTo(t.container).css({
                    margin: 0,
                    padding: 0,
                    top: 0,
                    left: 0,
                    position: "absolute"
                }).append(t.slides), t._carouselWrap = n, r || n.css("white-space", "nowrap"), t.allowWrap !== !1) {
                for (o = 0; (void 0 === t.carouselVisible ? 2 : 1) > o; o++) {
                    for (i = 0; t.slideCount > i; i++)n.append(t.slides[i].cloneNode(!0));
                    for (i = t.slideCount; i--;)n.prepend(t.slides[i].cloneNode(!0))
                }
                n.find(".cycle-slide-active").removeClass("cycle-slide-active"), t.slides.eq(t.startingSlide).addClass("cycle-slide-active")
            }
            t.pager && t.allowWrap === !1 && (s = t.slideCount - l, e(t.pager).children().filter(":gt(" + s + ")").hide()), t._nextBoundry = t.slideCount - t.carouselVisible, this.prepareDimensions(t)
        }, prepareDimensions: function (t) {
            var i, o, s, n, r = t.carouselVertical, l = t.carouselVisible || t.slides.length;
            if (t.carouselFluid && t.carouselVisible ? t._carouselResizeThrottle || this.fluidSlides(t) : t.carouselVisible && t.carouselSlideDimension ? (i = l * t.carouselSlideDimension, t.container[r ? "height" : "width"](i)) : t.carouselVisible && (i = l * e(t.slides[0])[r ? "outerHeight" : "outerWidth"](!0), t.container[r ? "height" : "width"](i)), o = t.carouselOffset || 0, t.allowWrap !== !1)if (t.carouselSlideDimension)o -= (t.slideCount + t.currSlide) * t.carouselSlideDimension; else for (s = t._carouselWrap.children(), n = 0; t.slideCount + t.currSlide > n; n++)o -= e(s[n])[r ? "outerHeight" : "outerWidth"](!0);
            t._carouselWrap.css(r ? "top" : "left", o)
        }, fluidSlides: function (t) {
            function i() {
                clearTimeout(s), s = setTimeout(o, 20)
            }

            function o() {
                t._carouselWrap.stop(!1, !0);
                var e = t.container.width() / t.carouselVisible;
                e = Math.ceil(e - r), t._carouselWrap.children().width(e), t._sentinel && t._sentinel.width(e), l(t)
            }

            var s, n = t.slides.eq(0), r = n.outerWidth() - n.width(), l = this.prepareDimensions;
            e(window).on("resize", i), t._carouselResizeThrottle = i, o()
        }, transition: function (t, i, o, s, n) {
            var r, l = {}, a = t.nextSlide - t.currSlide, c = t.carouselVertical, h = t.speed;
            if (t.allowWrap === !1) {
                s = a > 0;
                var u = t._currSlide, d = t.slideCount - t.carouselVisible;
                a > 0 && t.nextSlide > d && u == d ? a = 0 : a > 0 && t.nextSlide > d ? a = t.nextSlide - u - (t.nextSlide - d) : 0 > a && t.currSlide > d && t.nextSlide > d ? a = 0 : 0 > a && t.currSlide > d ? a += t.currSlide - d : u = t.currSlide, r = this.getScroll(t, c, u, a), t.API.opts()._currSlide = t.nextSlide > d ? d : t.nextSlide
            } else s && 0 === t.nextSlide ? (r = this.getDim(t, t.currSlide, c), n = this.genCallback(t, s, c, n)) : s || t.nextSlide != t.slideCount - 1 ? r = this.getScroll(t, c, t.currSlide, a) : (r = this.getDim(t, t.currSlide, c), n = this.genCallback(t, s, c, n));
            l[c ? "top" : "left"] = s ? "-=" + r : "+=" + r, t.throttleSpeed && (h = r / e(t.slides[0])[c ? "height" : "width"]() * t.speed), t._carouselWrap.animate(l, h, t.easing, n)
        }, getDim: function (t, i, o) {
            var s = e(t.slides[i]);
            return s[o ? "outerHeight" : "outerWidth"](!0)
        }, getScroll: function (e, t, i, o) {
            var s, n = 0;
            if (o > 0)for (s = i; i + o > s; s++)n += this.getDim(e, s, t); else for (s = i; s > i + o; s--)n += this.getDim(e, s, t);
            return n
        }, genCallback: function (t, i, o, s) {
            return function () {
                var i = e(t.slides[t.nextSlide]).position(), n = 0 - i[o ? "top" : "left"] + (t.carouselOffset || 0);
                t._carouselWrap.css(t.carouselVertical ? "top" : "left", n), s()
            }
        }, stopTransition: function () {
            var e = this.opts();
            e.slides.stop(!1, !0), e._carouselWrap.stop(!1, !0)
        }, onDestroy: function () {
            var t = this.opts();
            t._carouselResizeThrottle && e(window).off("resize", t._carouselResizeThrottle), t.slides.prependTo(t.container), t._carouselWrap.remove()
        }
    }
}(jQuery), function (e) {
    var t = {
        type: "html",
        content: "",
        url: "",
        ajax: {},
        ajax_request: null,
        closeOnEsc: !0,
        closeOnOverlayClick: !0,
        clone: !1,
        overlay: {
            block: void 0,
            tpl: '<div class="arcticmodal-overlay"></div>',
            css: {backgroundColor: "#efefef", opacity: .95}
        },
        container: {
            block: void 0,
            tpl: '<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>'
        },
        wrap: void 0,
        body: void 0,
        errors: {
            tpl: '<div class="arcticmodal-error arcticmodal-close"></div>',
            autoclose_delay: 2e3,
            ajax_unsuccessful_load: "Error"
        },
        openEffect: {type: "fade", speed: 400},
        closeEffect: {type: "fade", speed: 400},
        beforeOpen: e.noop,
        afterOpen: e.noop,
        beforeClose: e.noop,
        afterClose: e.noop,
        afterLoading: e.noop,
        afterLoadingOnShow: e.noop,
        errorLoading: e.noop
    }, i = 0, o = e([]), s = {
        isEventOut: function (t, i) {
            var o = !0;
            return e(t).each(function () {
                e(i.target).get(0) == e(this).get(0) && (o = !1), 0 == e(i.target).closest("HTML", e(this).get(0)).length && (o = !1)
            }), o
        }
    }, n = {
        getParentEl: function (t) {
            var i = e(t);
            return i.data("arcticmodal") ? i : (i = e(t).closest(".arcticmodal-container").data("arcticmodalParentEl"), i ? i : !1)
        }, transition: function (t, i, o, s) {
            switch (s = void 0 == s ? e.noop : s, o.type) {
                case"fade":
                    "show" == i ? t.fadeIn(o.speed, s) : t.fadeOut(o.speed, s);
                    break;
                case"none":
                    "show" == i ? t.show() : t.hide(), s()
            }
        }, prepare_body: function (t, i) {
            e(".arcticmodal-close", t.body).unbind("click.arcticmodal").bind("click.arcticmodal", function () {
                return i.arcticmodal("close"), !1
            })
        }, init_el: function (t, l) {
            var a = t.data("arcticmodal");
            if (!a) {
                if (a = l, i++, a.modalID = i, a.overlay.block = e(a.overlay.tpl), a.overlay.block.css(a.overlay.css), a.container.block = e(a.container.tpl), a.body = e(".arcticmodal-container_i2", a.container.block), l.clone ? a.body.html(t.clone(!0)) : (t.before('<div id="arcticmodalReserve' + a.modalID + '" style="display: none" />'), a.body.html(t)), n.prepare_body(a, t), a.closeOnOverlayClick && a.overlay.block.add(a.container.block).click(function (i) {
                        s.isEventOut(e(">*", a.body), i) && t.arcticmodal("close")
                    }), a.container.block.data("arcticmodalParentEl", t), t.data("arcticmodal", a), o = e.merge(o, t), e.proxy(r.show, t)(), "html" == a.type)return t;
                if (void 0 != a.ajax.beforeSend) {
                    var c = a.ajax.beforeSend;
                    delete a.ajax.beforeSend
                }
                if (void 0 != a.ajax.success) {
                    var h = a.ajax.success;
                    delete a.ajax.success
                }
                if (void 0 != a.ajax.error) {
                    var u = a.ajax.error;
                    delete a.ajax.error
                }
                var d = e.extend(!0, {
                    url: a.url, beforeSend: function () {
                        void 0 == c ? a.body.html('<div class="arcticmodal-loading" />') : c(a, t)
                    }, success: function (e) {
                        t.trigger("afterLoading"), a.afterLoading(a, t, e), void 0 == h ? a.body.html(e) : h(a, t, e), n.prepare_body(a, t), t.trigger("afterLoadingOnShow"), a.afterLoadingOnShow(a, t, e)
                    }, error: function () {
                        t.trigger("errorLoading"), a.errorLoading(a, t), void 0 == u ? (a.body.html(a.errors.tpl), e(".arcticmodal-error", a.body).html(a.errors.ajax_unsuccessful_load), e(".arcticmodal-close", a.body).click(function () {
                            return t.arcticmodal("close"), !1
                        }), a.errors.autoclose_delay && setTimeout(function () {
                            t.arcticmodal("close")
                        }, a.errors.autoclose_delay)) : u(a, t)
                    }
                }, a.ajax);
                a.ajax_request = e.ajax(d), t.data("arcticmodal", a)
            }
        }, init: function (i) {
            if (i = e.extend(!0, {}, t, i), !e.isFunction(this))return this.each(function () {
                n.init_el(e(this), e.extend(!0, {}, i))
            });
            if (void 0 == i)return void e.error("jquery.arcticmodal: Uncorrect parameters");
            if ("" == i.type)return void e.error('jquery.arcticmodal: Don\'t set parameter "type"');
            switch (i.type) {
                case"html":
                    if ("" == i.content)return void e.error('jquery.arcticmodal: Don\'t set parameter "content"');
                    var o = i.content;
                    return i.content = "", n.init_el(e(o), i);
                case"ajax":
                    return "" == i.url ? void e.error('jquery.arcticmodal: Don\'t set parameter "url"') : n.init_el(e("<div />"), i)
            }
        }
    }, r = {
        show: function () {
            var t = n.getParentEl(this);
            if (t === !1)return void e.error("jquery.arcticmodal: Uncorrect call");
            var i = t.data("arcticmodal");
            return i.overlay.block.hide(), i.container.block.hide(), e("BODY").append(i.overlay.block), e("BODY").append(i.container.block), i.beforeOpen(i, t), t.trigger("beforeOpen"), o.not(t).each(function () {
                var t = e(this).data("arcticmodal");
                t.overlay.block.hide()
            }), n.transition(i.overlay.block, "show", o.length > 1 ? {type: "none"} : i.openEffect), n.transition(i.container.block, "show", o.length > 1 ? {type: "none"} : i.openEffect, function () {
                i.afterOpen(i, t), t.trigger("afterOpen")
            }), t
        }, close: function () {
            return e.isFunction(this) ? void o.each(function () {
                e(this).arcticmodal("close")
            }) : this.each(function () {
                var t = n.getParentEl(this);
                if (t === !1)return void e.error("jquery.arcticmodal: Uncorrect call");
                var i = t.data("arcticmodal");
                i.beforeClose(i, t) !== !1 && (t.trigger("beforeClose"), o.not(t).last().each(function () {
                    var t = e(this).data("arcticmodal");
                    t.overlay.block.show()
                }), n.transition(i.overlay.block, "hide", o.length > 1 ? {type: "none"} : i.closeEffect), n.transition(i.container.block, "hide", o.length > 1 ? {type: "none"} : i.closeEffect, function () {
                    i.afterClose(i, t), t.trigger("afterClose"), i.clone || e("#arcticmodalReserve" + i.modalID).replaceWith(i.body.find(">*")), i.overlay.block.remove(), i.container.block.remove(), t.data("arcticmodal", null), e(".arcticmodal-container").length || (i.wrap.data("arcticmodalOverflow") && i.wrap.css("overflow", i.wrap.data("arcticmodalOverflow")), i.wrap.css("marginRight", 0))
                }), "ajax" == i.type && i.ajax_request.abort(), o = o.not(t))
            })
        }, setDefault: function (i) {
            e.extend(!0, t, i)
        }
    };
    e(function () {
        t.wrap = e(document.all && !document.querySelector ? "html" : "body")
    }), e(document).bind("keyup.arcticmodal", function (e) {
        var t = o.last();
        if (t.length) {
            var i = t.data("arcticmodal");
            i.closeOnEsc && 27 === e.keyCode && t.arcticmodal("close")
        }
    }), e.arcticmodal = e.fn.arcticmodal = function (t) {
        return r[t] ? r[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("jquery.arcticmodal: Method " + t + " does not exist") : n.init.apply(this, arguments)
    }
}(jQuery), $(function () {
    $(".js-univer-counter").countdown("2014/11/18", function (e) {
        $(this).html(e.strftime("<span>%D</span><span>%H</span><span>%M</span><span>%S</span>"))
    });
    new Tabs({
        content: ".js-h-phone",
        activeBlock: ".js-au",
        tabs: ".js-phone-switch",
        customData: "data-tab",
        delay: 500
    }), new Tabs({
        content: ".js-reviews-content",
        activeBlock: ".js-reviews-1",
        tabs: ".js-reviews-cycle li",
        customData: "data-tab",
        delay: 500
    }), new Tabs({
        content: ".js-services-stage",
        activeBlock: ".js-stage-1",
        tabs: ".js-pack-tabs li",
        customData: "data-tab",
        delay: 500
    }), new Tabs({
        content: ".js-maps",
        activeBlock: ".js-map-ua",
        tabs: ".js-maps-switch li",
        customData: "data-tab",
        delay: 500
    }), new Tabs({
        content: ".js-univer-desc",
        activeBlock: ".js-univer-1",
        tabs: ".js-univer-switch li",
        customData: "data-tab",
        delay: 500
    }), new ValidateForm({
        form: $(".js-apply-form"),
        button: $(".js-validate")
    }), new ValidateForm({form: $(".banner-form"), button: $(".js-validate_2")});
    $(window).scroll(function () {
        $(this).scrollTop() > 115 ? $(".js-menu-fixed").addClass("b-menu_fixed") : $(".js-menu-fixed").removeClass("b-menu_fixed")
    }), new DropDown({
        elem: $(".js-showCallback-bl"),
        dropdown: $(".callback-bl")
    }), $(".js-question").click(function () {
        return $(".js-question-form").arcticmodal(), !1
    }), $(".js-question-tnx").click(function () {
        return $(".js-question-form-tnx").arcticmodal(), !1
    }), $(".js-order").click(function () {
        return $(".js-order-form").arcticmodal(), !1
    }), $(".js-order-tnx").click(function () {
        return $(".js-order-form-tnx").arcticmodal(), !1
    }), drop_menu(), inputBigger($(".js-input-wider")), accordion(), text_placeholder($(".js-text")), $(".js-scrollbar").customScrollbar(), $(".hw-text").hover(function () {
        var e = $(this).attr("data-hw");
        $(e).toggleClass("is-active")
    })
});
$(function () {
    $('ul.tabs').on('click', 'li:not(.current)', function () {
        $(this).addClass('current').siblings().removeClass('current').parents('div.section').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();
    })
})