!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.SlimSelect = t())
    : (e.SlimSelect = t());
})(window, function() {
  return ((s = {}),
  (n.m = i = [
    function(e, t, i) {
      "use strict";
      function s(e, t) {
        t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
        var i = document.createEvent("CustomEvent");
        return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
      }
      var n;
      (t.__esModule = !0),
        (t.hasClassInTree = function(e, t) {
          function s(e, t) {
            return t && e && e.classList && e.classList.contains(t) ? e : null;
          }
          return (
            s(e, t) ||
            (function e(t, i) {
              return t && t !== document
                ? s(t, i)
                  ? t
                  : e(t.parentNode, i)
                : null;
            })(e, t)
          );
        }),
        (t.ensureElementInView = function(e, t) {
          var i = e.scrollTop + e.offsetTop,
            s = i + e.clientHeight,
            n = t.offsetTop,
            a = n + t.clientHeight;
          n < i ? (e.scrollTop -= i - n) : s < a && (e.scrollTop += a - s);
        }),
        (t.putContent = function(e, t, i) {
          var s = e.offsetHeight,
            n = e.getBoundingClientRect(),
            a = i ? n.top : n.top - s,
            o = i ? n.bottom : n.bottom + s;
          return a <= 0
            ? "below"
            : o >= window.innerHeight
            ? "above"
            : i
            ? t
            : "below";
        }),
        (t.debounce = function(n, a, o) {
          var l;
          return (
            void 0 === a && (a = 100),
            void 0 === o && (o = !1),
            function() {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              var i = self,
                s = o && !l;
              clearTimeout(l),
                (l = setTimeout(function() {
                  (l = null), o || n.apply(i, e);
                }, a)),
                s && n.apply(i, e);
            }
          );
        }),
        (t.isValueInArrayOfObjects = function(e, t, i) {
          if (!Array.isArray(e)) return e[t] === i;
          for (var s = 0, n = e; s < n.length; s++) {
            var a = n[s];
            if (a && a[t] && a[t] === i) return !0;
          }
          return !1;
        }),
        (t.highlight = function(e, t, i) {
          var s = e,
            n = new RegExp("(" + t.trim() + ")(?![^<]*>[^<>]*</)", "i");
          if (!e.match(n)) return e;
          var a = e.match(n).index,
            o = a + e.match(n)[0].toString().length,
            l = e.substring(a, o);
          return (s = s.replace(n, '<mark class="' + i + '">' + l + "</mark>"));
        }),
        "function" != typeof (n = window).CustomEvent &&
          ((s.prototype = n.Event.prototype), (n.CustomEvent = s));
    },
    function(e, t, i) {
      "use strict";
      t.__esModule = !0;
      var s =
        ((n.prototype.newOption = function(e) {
          return {
            id: e.id ? e.id : String(Math.floor(1e8 * Math.random())),
            value: e.value ? e.value : "",
            text: e.text ? e.text : "",
            innerHTML: e.innerHTML ? e.innerHTML : "",
            selected: !!e.selected && e.selected,
            display: void 0 === e.display || e.display,
            disabled: !!e.disabled && e.disabled,
            placeholder: !!e.placeholder && e.placeholder,
            class: e.class ? e.class : void 0,
            data: e.data ? e.data : {}
          };
        }),
        (n.prototype.add = function(e) {
          this.data.push({
            id: String(Math.floor(1e8 * Math.random())),
            value: e.value,
            text: e.text,
            innerHTML: "",
            selected: !1,
            display: !0,
            disabled: !1,
            placeholder: !1,
            class: void 0,
            data: {}
          });
        }),
        (n.prototype.parseSelectData = function() {
          this.data = [];
          for (
            var e = 0, t = this.main.select.element.childNodes;
            e < t.length;
            e++
          ) {
            var i = t[e];
            if ("OPTGROUP" === i.nodeName) {
              for (
                var s = { label: i.label, options: [] },
                  n = 0,
                  a = i.childNodes;
                n < a.length;
                n++
              ) {
                var o = a[n];
                if ("OPTION" === o.nodeName) {
                  var l = this.pullOptionData(o);
                  s.options.push(l),
                    l.placeholder &&
                      "" !== l.text.trim() &&
                      (this.main.config.placeholderText = l.text);
                }
              }
              this.data.push(s);
            } else
              "OPTION" === i.nodeName &&
                ((l = this.pullOptionData(i)),
                this.data.push(l),
                l.placeholder &&
                  "" !== l.text.trim() &&
                  (this.main.config.placeholderText = l.text));
          }
        }),
        (n.prototype.pullOptionData = function(e) {
          return {
            id:
              (!!e.dataset && e.dataset.id) ||
              String(Math.floor(1e8 * Math.random())),
            value: e.value,
            text: e.text,
            innerHTML: e.innerHTML,
            selected: e.selected,
            disabled: e.disabled,
            placeholder: "true" === e.dataset.placeholder,
            class: e.className,
            style: e.style.cssText,
            data: e.dataset
          };
        }),
        (n.prototype.setSelectedFromSelect = function() {
          if (this.main.config.isMultiple) {
            for (
              var e = [], t = 0, i = this.main.select.element.options;
              t < i.length;
              t++
            ) {
              var s = i[t];
              if (s.selected) {
                var n = this.getObjectFromData(s.value, "value");
                n && n.id && e.push(n.id);
              }
            }
            this.setSelected(e, "id");
          } else {
            var a = this.main.select.element;
            if (-1 !== a.selectedIndex) {
              var o = a.options[a.selectedIndex].value;
              this.setSelected(o, "value");
            }
          }
        }),
        (n.prototype.setSelected = function(e, t) {
          void 0 === t && (t = "id");
          for (var i = 0, s = this.data; i < s.length; i++) {
            var n = s[i];
            if (n.hasOwnProperty("label")) {
              if (n.hasOwnProperty("options")) {
                var a = n.options;
                if (a)
                  for (var o = 0, l = a; o < l.length; o++) {
                    var r = l[o];
                    r.placeholder ||
                      (r.selected = this.shouldBeSelected(r, e, t));
                  }
              }
            } else n.selected = this.shouldBeSelected(n, e, t);
          }
        }),
        (n.prototype.shouldBeSelected = function(e, t, i) {
          if ((void 0 === i && (i = "id"), Array.isArray(t)))
            for (var s = 0, n = t; s < n.length; s++) {
              var a = n[s];
              if (i in e && String(e[i]) === String(a)) return !0;
            }
          else if (i in e && String(e[i]) === String(t)) return !0;
          return !1;
        }),
        (n.prototype.getSelected = function() {
          for (
            var e = { text: "", placeholder: this.main.config.placeholderText },
              t = [],
              i = 0,
              s = this.data;
            i < s.length;
            i++
          ) {
            var n = s[i];
            if (n.hasOwnProperty("label")) {
              if (n.hasOwnProperty("options")) {
                var a = n.options;
                if (a)
                  for (var o = 0, l = a; o < l.length; o++) {
                    var r = l[o];
                    r.selected &&
                      (this.main.config.isMultiple ? t.push(r) : (e = r));
                  }
              }
            } else
              n.selected && (this.main.config.isMultiple ? t.push(n) : (e = n));
          }
          return this.main.config.isMultiple ? t : e;
        }),
        (n.prototype.addToSelected = function(e, t) {
          if ((void 0 === t && (t = "id"), this.main.config.isMultiple)) {
            var i = [],
              s = this.getSelected();
            if (Array.isArray(s))
              for (var n = 0, a = s; n < a.length; n++) {
                var o = a[n];
                i.push(o[t]);
              }
            i.push(e), this.setSelected(i, t);
          }
        }),
        (n.prototype.removeFromSelected = function(e, t) {
          if ((void 0 === t && (t = "id"), this.main.config.isMultiple)) {
            for (var i = [], s = 0, n = this.getSelected(); s < n.length; s++) {
              var a = n[s];
              String(a[t]) !== String(e) && i.push(a[t]);
            }
            this.setSelected(i, t);
          }
        }),
        (n.prototype.onDataChange = function() {
          this.main.onChange &&
            this.isOnChangeEnabled &&
            this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())));
        }),
        (n.prototype.getObjectFromData = function(e, t) {
          void 0 === t && (t = "id");
          for (var i = 0, s = this.data; i < s.length; i++) {
            var n = s[i];
            if (t in n && String(n[t]) === String(e)) return n;
            if (n.hasOwnProperty("options")) {
              var a = n;
              if (a.options)
                for (var o = 0, l = a.options; o < l.length; o++) {
                  var r = l[o];
                  if (String(r[t]) === String(e)) return r;
                }
            }
          }
          return null;
        }),
        (n.prototype.search = function(n) {
          if ("" !== (this.searchValue = n).trim()) {
            var a = this.main.config.searchFilter,
              e = this.data.slice(0);
            n = n.trim();
            var t = e.map(function(e) {
              if (e.hasOwnProperty("options")) {
                var t = e,
                  i = [];
                if (
                  (t.options &&
                    (i = t.options.filter(function(e) {
                      return a(e, n);
                    })),
                  0 !== i.length)
                ) {
                  var s = Object.assign({}, t);
                  return (s.options = i), s;
                }
              }
              return e.hasOwnProperty("text") && a(e, n) ? e : null;
            });
            this.filtered = t.filter(function(e) {
              return e;
            });
          } else this.filtered = null;
        }),
        n);
      function n(e) {
        (this.contentOpen = !1),
          (this.contentPosition = "below"),
          (this.isOnChangeEnabled = !0),
          (this.main = e.main),
          (this.searchValue = ""),
          (this.data = []),
          (this.filtered = null),
          this.parseSelectData(),
          this.setSelectedFromSelect();
      }
      function r(e) {
        return (
          void 0 !== e.text ||
          (console.error(
            "Data object option must have at least have a text value. Check object: " +
              JSON.stringify(e)
          ),
          !1)
        );
      }
      (t.Data = s),
        (t.validateData = function(e) {
          if (!e) return console.error("Data must be an array of objects"), !1;
          for (var t = 0, i = 0, s = e; i < s.length; i++) {
            var n = s[i];
            if (n.hasOwnProperty("label")) {
              if (n.hasOwnProperty("options")) {
                var a = n.options;
                if (a)
                  for (var o = 0, l = a; o < l.length; o++) {
                    r(l[o]) || t++;
                  }
              }
            } else r(n) || t++;
          }
          return 0 === t;
        }),
        (t.validateOption = r);
    },
    function(e, t, i) {
      "use strict";
      t.__esModule = !0;
      var s = i(3),
        n = i(4),
        a = i(5),
        o = i(1),
        l = i(0),
        r =
          ((c.prototype.validate = function(e) {
            var t =
              "string" == typeof e.select
                ? document.querySelector(e.select)
                : e.select;
            if (!t) throw new Error("Could not find select element");
            if ("SELECT" !== t.tagName)
              throw new Error("Element isnt of type select");
            return t;
          }),
          (c.prototype.selected = function() {
            if (this.config.isMultiple) {
              for (
                var e = [], t = 0, i = (n = this.data.getSelected());
                t < i.length;
                t++
              ) {
                var s = i[t];
                e.push(s.value);
              }
              return e;
            }
            var n;
            return (n = this.data.getSelected()) ? n.value : "";
          }),
          (c.prototype.set = function(e, t, i, s) {
            void 0 === t && (t = "value"),
              void 0 === i && (i = !0),
              void 0 === s && (s = !0),
              this.config.isMultiple && !Array.isArray(e)
                ? this.data.addToSelected(e, t)
                : this.data.setSelected(e, t),
              this.select.setValue(),
              this.data.onDataChange(),
              this.render(),
              i && this.close();
          }),
          (c.prototype.setSelected = function(e, t, i, s) {
            void 0 === t && (t = "value"),
              void 0 === i && (i = !0),
              void 0 === s && (s = !0),
              this.set(e, t, i, s);
          }),
          (c.prototype.setData = function(e) {
            if (o.validateData(e)) {
              var t = JSON.parse(JSON.stringify(e)),
                i = this.data.getSelected();
              if (this.config.isAjax && i)
                if (this.config.isMultiple)
                  for (var s = 0, n = i.reverse(); s < n.length; s++) {
                    var a = n[s];
                    t.unshift(a);
                  }
                else
                  t.unshift(this.data.getSelected()),
                    t.unshift({ text: "", placeholder: !0 });
              this.select.create(t),
                this.data.parseSelectData(),
                this.data.setSelectedFromSelect();
            } else
              console.error(
                "Validation problem on: #" + this.select.element.id
              );
          }),
          (c.prototype.addData = function(e) {
            o.validateData([e])
              ? (this.data.add(this.data.newOption(e)),
                this.select.create(this.data.data),
                this.data.parseSelectData(),
                this.data.setSelectedFromSelect(),
                this.render())
              : console.error(
                  "Validation problem on: #" + this.select.element.id
                );
          }),
          (c.prototype.open = function() {
            var e = this;
            if (this.config.isEnabled && !this.data.contentOpen) {
              if (
                (this.beforeOpen && this.beforeOpen(),
                this.config.isMultiple && this.slim.multiSelected
                  ? this.slim.multiSelected.plus.classList.add("ss-cross")
                  : this.slim.singleSelected &&
                    (this.slim.singleSelected.arrowIcon.arrow.classList.remove(
                      "arrow-down"
                    ),
                    this.slim.singleSelected.arrowIcon.arrow.classList.add(
                      "arrow-up"
                    )),
                this.slim[
                  this.config.isMultiple ? "multiSelected" : "singleSelected"
                ].container.classList.add(
                  "above" === this.data.contentPosition
                    ? this.config.openAbove
                    : this.config.openBelow
                ),
                this.config.addToBody)
              ) {
                var t = this.slim.container.getBoundingClientRect();
                (this.slim.content.style.top =
                  t.top + t.height + window.scrollY + "px"),
                  (this.slim.content.style.left =
                    t.left + window.scrollX + "px"),
                  (this.slim.content.style.width = t.width + "px");
              }
              if (
                (this.slim.content.classList.add(this.config.open),
                "up" === this.config.showContent.toLowerCase()
                  ? this.moveContentAbove()
                  : "down" === this.config.showContent.toLowerCase()
                  ? this.moveContentBelow()
                  : "above" ===
                    l.putContent(
                      this.slim.content,
                      this.data.contentPosition,
                      this.data.contentOpen
                    )
                  ? this.moveContentAbove()
                  : this.moveContentBelow(),
                !this.config.isMultiple)
              ) {
                var i = this.data.getSelected();
                if (i) {
                  var s = i.id,
                    n = this.slim.list.querySelector('[data-id="' + s + '"]');
                  n && l.ensureElementInView(this.slim.list, n);
                }
              }
              setTimeout(function() {
                (e.data.contentOpen = !0),
                  e.config.searchFocus && e.slim.search.input.focus(),
                  e.afterOpen && e.afterOpen();
              }, this.config.timeoutDelay);
            }
          }),
          (c.prototype.close = function() {
            var e = this;
            this.data.contentOpen &&
              (this.beforeClose && this.beforeClose(),
              this.config.isMultiple && this.slim.multiSelected
                ? (this.slim.multiSelected.container.classList.remove(
                    this.config.openAbove
                  ),
                  this.slim.multiSelected.container.classList.remove(
                    this.config.openBelow
                  ),
                  this.slim.multiSelected.plus.classList.remove("ss-cross"))
                : this.slim.singleSelected &&
                  (this.slim.singleSelected.container.classList.remove(
                    this.config.openAbove
                  ),
                  this.slim.singleSelected.container.classList.remove(
                    this.config.openBelow
                  ),
                  this.slim.singleSelected.arrowIcon.arrow.classList.add(
                    "arrow-down"
                  ),
                  this.slim.singleSelected.arrowIcon.arrow.classList.remove(
                    "arrow-up"
                  )),
              this.slim.content.classList.remove(this.config.open),
              (this.data.contentOpen = !1),
              this.search(""),
              setTimeout(function() {
                e.slim.content.removeAttribute("style"),
                  (e.data.contentPosition = "below"),
                  e.config.isMultiple && e.slim.multiSelected
                    ? (e.slim.multiSelected.container.classList.remove(
                        e.config.openAbove
                      ),
                      e.slim.multiSelected.container.classList.remove(
                        e.config.openBelow
                      ))
                    : e.slim.singleSelected &&
                      (e.slim.singleSelected.container.classList.remove(
                        e.config.openAbove
                      ),
                      e.slim.singleSelected.container.classList.remove(
                        e.config.openBelow
                      )),
                  e.slim.search.input.blur(),
                  e.afterClose && e.afterClose();
              }, this.config.timeoutDelay));
          }),
          (c.prototype.moveContentAbove = function() {
            var e = 0;
            this.config.isMultiple && this.slim.multiSelected
              ? (e = this.slim.multiSelected.container.offsetHeight)
              : this.slim.singleSelected &&
                (e = this.slim.singleSelected.container.offsetHeight);
            var t = e + this.slim.content.offsetHeight - 1;
            (this.slim.content.style.margin = "-" + t + "px 0 0 0"),
              (this.slim.content.style.height = t - e + 1 + "px"),
              (this.slim.content.style.transformOrigin = "center bottom"),
              (this.data.contentPosition = "above"),
              this.config.isMultiple && this.slim.multiSelected
                ? (this.slim.multiSelected.container.classList.remove(
                    this.config.openBelow
                  ),
                  this.slim.multiSelected.container.classList.add(
                    this.config.openAbove
                  ))
                : this.slim.singleSelected &&
                  (this.slim.singleSelected.container.classList.remove(
                    this.config.openBelow
                  ),
                  this.slim.singleSelected.container.classList.add(
                    this.config.openAbove
                  ));
          }),
          (c.prototype.moveContentBelow = function() {
            (this.data.contentPosition = "below"),
              this.config.isMultiple && this.slim.multiSelected
                ? (this.slim.multiSelected.container.classList.remove(
                    this.config.openAbove
                  ),
                  this.slim.multiSelected.container.classList.add(
                    this.config.openBelow
                  ))
                : this.slim.singleSelected &&
                  (this.slim.singleSelected.container.classList.remove(
                    this.config.openAbove
                  ),
                  this.slim.singleSelected.container.classList.add(
                    this.config.openBelow
                  ));
          }),
          (c.prototype.enable = function() {
            (this.config.isEnabled = !0),
              this.config.isMultiple && this.slim.multiSelected
                ? this.slim.multiSelected.container.classList.remove(
                    this.config.disabled
                  )
                : this.slim.singleSelected &&
                  this.slim.singleSelected.container.classList.remove(
                    this.config.disabled
                  ),
              (this.select.triggerMutationObserver = !1),
              (this.select.element.disabled = !1),
              (this.slim.search.input.disabled = !1),
              (this.select.triggerMutationObserver = !0);
          }),
          (c.prototype.disable = function() {
            (this.config.isEnabled = !1),
              this.config.isMultiple && this.slim.multiSelected
                ? this.slim.multiSelected.container.classList.add(
                    this.config.disabled
                  )
                : this.slim.singleSelected &&
                  this.slim.singleSelected.container.classList.add(
                    this.config.disabled
                  ),
              (this.select.triggerMutationObserver = !1),
              (this.select.element.disabled = !0),
              (this.slim.search.input.disabled = !0),
              (this.select.triggerMutationObserver = !0);
          }),
          (c.prototype.search = function(t) {
            if (this.data.searchValue !== t)
              if (((this.slim.search.input.value = t), this.config.isAjax)) {
                var i = this;
                (this.config.isSearching = !0),
                  this.render(),
                  this.ajax &&
                    this.ajax(t, function(e) {
                      (i.config.isSearching = !1),
                        Array.isArray(e)
                          ? (e.unshift({ text: "", placeholder: !0 }),
                            i.setData(e),
                            i.data.search(t),
                            i.render())
                          : "string" == typeof e
                          ? i.slim.options(e)
                          : i.render();
                    });
              } else this.data.search(t), this.render();
          }),
          (c.prototype.setSearchText = function(e) {
            this.config.searchText = e;
          }),
          (c.prototype.render = function() {
            this.config.isMultiple
              ? this.slim.values()
              : (this.slim.placeholder(), this.slim.deselect()),
              this.slim.options();
          }),
          (c.prototype.destroy = function(e) {
            void 0 === e && (e = null);
            var t = e
                ? document.querySelector("." + e + ".ss-main")
                : this.slim.container,
              i = e
                ? document.querySelector("[data-ssid=" + e + "]")
                : this.select.element;
            if (
              t &&
              i &&
              ((i.style.display = ""),
              delete i.dataset.ssid,
              (i.slim = null),
              t.parentElement && t.parentElement.removeChild(t),
              this.config.addToBody)
            ) {
              var s = e
                ? document.querySelector("." + e + ".ss-content")
                : this.slim.content;
              if (!s) return;
              document.body.removeChild(s);
            }
          }),
          c);
      function c(e) {
        var t = this;
        (this.ajax = null),
          (this.addable = null),
          (this.beforeOnChange = null),
          (this.onChange = null),
          (this.beforeOpen = null),
          (this.afterOpen = null),
          (this.beforeClose = null),
          (this.afterClose = null);
        var i = this.validate(e);
        i.dataset.ssid && this.destroy(i.dataset.ssid),
          e.ajax && (this.ajax = e.ajax),
          e.addable && (this.addable = e.addable),
          (this.config = new s.Config({
            select: i,
            isAjax: !!e.ajax,
            showSearch: e.showSearch,
            searchPlaceholder: e.searchPlaceholder,
            searchText: e.searchText,
            searchingText: e.searchingText,
            searchFocus: e.searchFocus,
            searchHighlight: e.searchHighlight,
            searchFilter: e.searchFilter,
            closeOnSelect: e.closeOnSelect,
            showContent: e.showContent,
            placeholderText: e.placeholder,
            allowDeselect: e.allowDeselect,
            allowDeselectOption: e.allowDeselectOption,
            hideSelectedOption: e.hideSelectedOption,
            deselectLabel: e.deselectLabel,
            isEnabled: e.isEnabled,
            valuesUseText: e.valuesUseText,
            showOptionTooltips: e.showOptionTooltips,
            selectByGroup: e.selectByGroup,
            limit: e.limit,
            timeoutDelay: e.timeoutDelay,
            addToBody: e.addToBody
          })),
          (this.select = new n.Select({ select: i, main: this })),
          (this.data = new o.Data({ main: this })),
          (this.slim = new a.Slim({ main: this })),
          this.select.element.parentNode &&
            this.select.element.parentNode.insertBefore(
              this.slim.container,
              this.select.element.nextSibling
            ),
          e.data ? this.setData(e.data) : this.render(),
          document.addEventListener("click", function(e) {
            e.target && !l.hasClassInTree(e.target, t.config.id) && t.close();
          }),
          "auto" === this.config.showContent &&
            window.addEventListener(
              "scroll",
              l.debounce(function(e) {
                t.data.contentOpen &&
                  ("above" ===
                  l.putContent(
                    t.slim.content,
                    t.data.contentPosition,
                    t.data.contentOpen
                  )
                    ? t.moveContentAbove()
                    : t.moveContentBelow());
              }),
              !1
            ),
          e.beforeOnChange && (this.beforeOnChange = e.beforeOnChange),
          e.onChange && (this.onChange = e.onChange),
          e.beforeOpen && (this.beforeOpen = e.beforeOpen),
          e.afterOpen && (this.afterOpen = e.afterOpen),
          e.beforeClose && (this.beforeClose = e.beforeClose),
          e.afterClose && (this.afterClose = e.afterClose),
          this.config.isEnabled || this.disable();
      }
      t.default = r;
    },
    function(e, t, i) {
      "use strict";
      t.__esModule = !0;
      var s =
        ((n.prototype.searchFilter = function(e, t) {
          return -1 !== e.text.toLowerCase().indexOf(t.toLowerCase());
        }),
        n);
      function n(e) {
        (this.id = ""),
          (this.isMultiple = !1),
          (this.isAjax = !1),
          (this.isSearching = !1),
          (this.showSearch = !0),
          (this.searchFocus = !0),
          (this.searchHighlight = !1),
          (this.closeOnSelect = !0),
          (this.showContent = "auto"),
          (this.searchPlaceholder = "Search"),
          (this.searchText = "No Results"),
          (this.searchingText = "Searching..."),
          (this.placeholderText = "Select Value"),
          (this.allowDeselect = !1),
          (this.allowDeselectOption = !1),
          (this.hideSelectedOption = !1),
          (this.deselectLabel = "x"),
          (this.isEnabled = !0),
          (this.valuesUseText = !1),
          (this.showOptionTooltips = !1),
          (this.selectByGroup = !1),
          (this.limit = 0),
          (this.timeoutDelay = 200),
          (this.addToBody = !1),
          (this.main = "ss-main"),
          (this.singleSelected = "ss-single-selected"),
          (this.arrow = "ss-arrow"),
          (this.multiSelected = "ss-multi-selected"),
          (this.add = "ss-add"),
          (this.plus = "ss-plus"),
          (this.values = "ss-values"),
          (this.value = "ss-value"),
          (this.valueText = "ss-value-text"),
          (this.valueDelete = "ss-value-delete"),
          (this.content = "ss-content"),
          (this.open = "ss-open"),
          (this.openAbove = "ss-open-above"),
          (this.openBelow = "ss-open-below"),
          (this.search = "ss-search"),
          (this.searchHighlighter = "ss-search-highlight"),
          (this.addable = "ss-addable"),
          (this.list = "ss-list"),
          (this.optgroup = "ss-optgroup"),
          (this.optgroupLabel = "ss-optgroup-label"),
          (this.optgroupLabelSelectable = "ss-optgroup-label-selectable"),
          (this.option = "ss-option"),
          (this.optionSelected = "ss-option-selected"),
          (this.highlighted = "ss-highlighted"),
          (this.disabled = "ss-disabled"),
          (this.hide = "ss-hide"),
          (this.id = "ss-" + Math.floor(1e5 * Math.random())),
          (this.style = e.select.style.cssText),
          (this.class = e.select.className.split(" ")),
          (this.isMultiple = e.select.multiple),
          (this.isAjax = e.isAjax),
          (this.showSearch = !1 !== e.showSearch),
          (this.searchFocus = !1 !== e.searchFocus),
          (this.searchHighlight = !0 === e.searchHighlight),
          (this.closeOnSelect = !1 !== e.closeOnSelect),
          e.showContent && (this.showContent = e.showContent),
          (this.isEnabled = !1 !== e.isEnabled),
          e.searchPlaceholder && (this.searchPlaceholder = e.searchPlaceholder),
          e.searchText && (this.searchText = e.searchText),
          e.searchingText && (this.searchingText = e.searchingText),
          e.placeholderText && (this.placeholderText = e.placeholderText),
          (this.allowDeselect = !0 === e.allowDeselect),
          (this.allowDeselectOption = !0 === e.allowDeselectOption),
          (this.hideSelectedOption = !0 === e.hideSelectedOption),
          e.deselectLabel && (this.deselectLabel = e.deselectLabel),
          e.valuesUseText && (this.valuesUseText = e.valuesUseText),
          e.showOptionTooltips &&
            (this.showOptionTooltips = e.showOptionTooltips),
          e.selectByGroup && (this.selectByGroup = e.selectByGroup),
          e.limit && (this.limit = e.limit),
          e.searchFilter && (this.searchFilter = e.searchFilter),
          null != e.timeoutDelay && (this.timeoutDelay = e.timeoutDelay),
          (this.addToBody = !0 === e.addToBody);
      }
      t.Config = s;
    },
    function(e, t, i) {
      "use strict";
      t.__esModule = !0;
      var s =
        ((n.prototype.setValue = function() {
          if (this.main.data.getSelected()) {
            if (this.main.config.isMultiple)
              for (
                var e = this.main.data.getSelected(),
                  t = 0,
                  i = this.element.options;
                t < i.length;
                t++
              ) {
                var s = i[t];
                s.selected = !1;
                for (var n = 0, a = e; n < a.length; n++)
                  a[n].value === s.value && (s.selected = !0);
              }
            else
              (e = this.main.data.getSelected()),
                (this.element.value = e ? e.value : "");
            (this.main.data.isOnChangeEnabled = !1),
              this.element.dispatchEvent(
                new CustomEvent("change", { bubbles: !0 })
              ),
              (this.main.data.isOnChangeEnabled = !0);
          }
        }),
        (n.prototype.addAttributes = function() {
          (this.element.tabIndex = -1),
            (this.element.style.display = "none"),
            (this.element.dataset.ssid = this.main.config.id);
        }),
        (n.prototype.addEventListeners = function() {
          var t = this;
          this.element.addEventListener("change", function(e) {
            t.main.data.setSelectedFromSelect(), t.main.render();
          });
        }),
        (n.prototype.addMutationObserver = function() {
          var t = this;
          this.main.config.isAjax ||
            ((this.mutationObserver = new MutationObserver(function(e) {
              t.triggerMutationObserver &&
                (t.main.data.parseSelectData(),
                t.main.data.setSelectedFromSelect(),
                t.main.render(),
                e.forEach(function(e) {
                  "class" === e.attributeName &&
                    t.main.slim.updateContainerDivClass(t.main.slim.container);
                }));
            })),
            this.observeMutationObserver());
        }),
        (n.prototype.observeMutationObserver = function() {
          this.mutationObserver &&
            this.mutationObserver.observe(this.element, {
              attributes: !0,
              childList: !0,
              characterData: !0
            });
        }),
        (n.prototype.disconnectMutationObserver = function() {
          this.mutationObserver && this.mutationObserver.disconnect();
        }),
        (n.prototype.create = function(e) {
          this.element.innerHTML = "";
          for (var t = 0, i = e; t < i.length; t++) {
            var s = i[t];
            if (s.hasOwnProperty("options")) {
              var n = s,
                a = document.createElement("optgroup");
              if (((a.label = n.label), n.options))
                for (var o = 0, l = n.options; o < l.length; o++) {
                  var r = l[o];
                  a.appendChild(this.createOption(r));
                }
              this.element.appendChild(a);
            } else this.element.appendChild(this.createOption(s));
          }
        }),
        (n.prototype.createOption = function(t) {
          var i = document.createElement("option");
          return (
            (i.value = t.value || t.text),
            (i.innerHTML = t.innerHTML || t.text),
            t.selected && (i.selected = t.selected),
            t.disabled && (i.disabled = !0),
            t.placeholder && i.setAttribute("data-placeholder", "true"),
            t.class &&
              t.class.split(" ").forEach(function(e) {
                i.classList.add(e);
              }),
            t.data &&
              "object" == typeof t.data &&
              Object.keys(t.data).forEach(function(e) {
                i.setAttribute("data-" + e, t.data[e]);
              }),
            i
          );
        }),
        n);
      function n(e) {
        (this.triggerMutationObserver = !0),
          (this.element = e.select),
          (this.main = e.main),
          this.element.disabled && (this.main.config.isEnabled = !1),
          this.addAttributes(),
          this.addEventListeners(),
          (this.mutationObserver = null),
          this.addMutationObserver(),
          (this.element.slim = e.main);
      }
      t.Select = s;
    },
    function(e, t, i) {
      "use strict";
      t.__esModule = !0;
      var a = i(0),
        o = i(1),
        s =
          ((n.prototype.containerDiv = function() {
            var e = document.createElement("div");
            return (
              (e.style.cssText = this.main.config.style),
              this.updateContainerDivClass(e),
              e
            );
          }),
          (n.prototype.updateContainerDivClass = function(e) {
            (this.main.config.class = this.main.select.element.className.split(
              " "
            )),
              (e.className = ""),
              e.classList.add(this.main.config.id),
              e.classList.add(this.main.config.main);
            for (var t = 0, i = this.main.config.class; t < i.length; t++) {
              var s = i[t];
              "" !== s.trim() && e.classList.add(s);
            }
          }),
          (n.prototype.singleSelectedDiv = function() {
            var t = this,
              e = document.createElement("div");
            e.classList.add(this.main.config.singleSelected);
            var i = document.createElement("span");
            i.classList.add("placeholder"), e.appendChild(i);
            var s = document.createElement("span");
            (s.innerHTML = this.main.config.deselectLabel),
              s.classList.add("ss-deselect"),
              (s.onclick = function(e) {
                e.stopPropagation(), t.main.config.isEnabled && t.main.set("");
              }),
              e.appendChild(s);
            var n = document.createElement("span");
            n.classList.add(this.main.config.arrow);
            var a = document.createElement("span");
            return (
              a.classList.add("arrow-down"),
              n.appendChild(a),
              e.appendChild(n),
              (e.onclick = function() {
                t.main.config.isEnabled &&
                  (t.main.data.contentOpen ? t.main.close() : t.main.open());
              }),
              {
                container: e,
                placeholder: i,
                deselect: s,
                arrowIcon: { container: n, arrow: a }
              }
            );
          }),
          (n.prototype.placeholder = function() {
            var e = this.main.data.getSelected();
            if (null === e || (e && e.placeholder)) {
              var t = document.createElement("span");
              t.classList.add(this.main.config.disabled),
                (t.innerHTML = this.main.config.placeholderText),
                this.singleSelected &&
                  (this.singleSelected.placeholder.innerHTML = t.outerHTML);
            } else {
              var i = "";
              e &&
                (i =
                  e.innerHTML && !0 !== this.main.config.valuesUseText
                    ? e.innerHTML
                    : e.text),
                this.singleSelected &&
                  (this.singleSelected.placeholder.innerHTML = e ? i : "");
            }
          }),
          (n.prototype.deselect = function() {
            if (this.singleSelected) {
              if (!this.main.config.allowDeselect)
                return void this.singleSelected.deselect.classList.add(
                  "ss-hide"
                );
              "" === this.main.selected()
                ? this.singleSelected.deselect.classList.add("ss-hide")
                : this.singleSelected.deselect.classList.remove("ss-hide");
            }
          }),
          (n.prototype.multiSelectedDiv = function() {
            var t = this,
              e = document.createElement("div");
            e.classList.add(this.main.config.multiSelected);
            var i = document.createElement("div");
            i.classList.add(this.main.config.values), e.appendChild(i);
            var s = document.createElement("div");
            s.classList.add(this.main.config.add);
            var n = document.createElement("span");
            return (
              n.classList.add(this.main.config.plus),
              (n.onclick = function(e) {
                t.main.data.contentOpen &&
                  (t.main.close(), e.stopPropagation());
              }),
              s.appendChild(n),
              e.appendChild(s),
              (e.onclick = function(e) {
                t.main.config.isEnabled &&
                  (e.target.classList.contains(t.main.config.valueDelete) ||
                    (t.main.data.contentOpen ? t.main.close() : t.main.open()));
              }),
              { container: e, values: i, add: s, plus: n }
            );
          }),
          (n.prototype.values = function() {
            if (this.multiSelected) {
              for (
                var e,
                  t = this.multiSelected.values.childNodes,
                  i = this.main.data.getSelected(),
                  s = [],
                  n = 0,
                  a = t;
                n < a.length;
                n++
              ) {
                var o = a[n];
                e = !0;
                for (var l = 0, r = i; l < r.length; l++) {
                  var c = r[l];
                  String(c.id) === String(o.dataset.id) && (e = !1);
                }
                e && s.push(o);
              }
              for (var d = 0, h = s; d < h.length; d++) {
                var u = h[d];
                u.classList.add("ss-out"),
                  this.multiSelected.values.removeChild(u);
              }
              for (
                t = this.multiSelected.values.childNodes, c = 0;
                c < i.length;
                c++
              ) {
                e = !1;
                for (var p = 0, m = t; p < m.length; p++)
                  (o = m[p]),
                    String(i[c].id) === String(o.dataset.id) && (e = !0);
                e ||
                  (0 !== t.length && HTMLElement.prototype.insertAdjacentElement
                    ? 0 === c
                      ? this.multiSelected.values.insertBefore(
                          this.valueDiv(i[c]),
                          t[c]
                        )
                      : t[c - 1].insertAdjacentElement(
                          "afterend",
                          this.valueDiv(i[c])
                        )
                    : this.multiSelected.values.appendChild(
                        this.valueDiv(i[c])
                      ));
              }
              if (0 === i.length) {
                var f = document.createElement("span");
                f.classList.add(this.main.config.disabled),
                  (f.innerHTML = this.main.config.placeholderText),
                  (this.multiSelected.values.innerHTML = f.outerHTML);
              }
            }
          }),
          (n.prototype.valueDiv = function(a) {
            var o = this,
              e = document.createElement("div");
            e.classList.add(this.main.config.value), (e.dataset.id = a.id);
            var t = document.createElement("span");
            t.classList.add(this.main.config.valueText),
              (t.innerHTML =
                a.innerHTML && !0 !== this.main.config.valuesUseText
                  ? a.innerHTML
                  : a.text),
              e.appendChild(t);
            var i = document.createElement("span");
            return (
              i.classList.add(this.main.config.valueDelete),
              (i.innerHTML = this.main.config.deselectLabel),
              (i.onclick = function(e) {
                e.preventDefault(), e.stopPropagation();
                var t = !1;
                if (o.main.config.isEnabled) {
                  if (
                    (o.main.beforeOnChange || (t = !0), o.main.beforeOnChange)
                  ) {
                    for (
                      var i = o.main.data.getSelected(),
                        s = JSON.parse(JSON.stringify(i)),
                        n = 0;
                      n < s.length;
                      n++
                    )
                      s[n].id === a.id && s.splice(n, 1);
                    !1 !== o.main.beforeOnChange(s) && (t = !0);
                  }
                  t &&
                    (o.main.data.removeFromSelected(a.id, "id"),
                    o.main.render(),
                    o.main.select.setValue(),
                    o.main.data.onDataChange());
                }
              }),
              e.appendChild(i),
              e
            );
          }),
          (n.prototype.contentDiv = function() {
            var e = document.createElement("div");
            return e.classList.add(this.main.config.content), e;
          }),
          (n.prototype.searchDiv = function() {
            var n = this,
              e = document.createElement("div"),
              s = document.createElement("input"),
              a = document.createElement("div");
            e.classList.add(this.main.config.search);
            var t = { container: e, input: s };
            return (
              this.main.config.showSearch ||
                (e.classList.add(this.main.config.hide), (s.readOnly = !0)),
              (s.type = "search"),
              (s.placeholder = this.main.config.searchPlaceholder),
              (s.tabIndex = 0),
              s.setAttribute("aria-label", this.main.config.searchPlaceholder),
              s.setAttribute("autocapitalize", "off"),
              s.setAttribute("autocomplete", "off"),
              s.setAttribute("autocorrect", "off"),
              (s.onclick = function(e) {
                setTimeout(function() {
                  "" === e.target.value && n.main.search("");
                }, 10);
              }),
              (s.onkeydown = function(e) {
                "ArrowUp" === e.key
                  ? (n.main.open(), n.highlightUp(), e.preventDefault())
                  : "ArrowDown" === e.key
                  ? (n.main.open(), n.highlightDown(), e.preventDefault())
                  : "Tab" === e.key
                  ? n.main.data.contentOpen
                    ? n.main.close()
                    : setTimeout(function() {
                        n.main.close();
                      }, n.main.config.timeoutDelay)
                  : "Enter" === e.key && e.preventDefault();
              }),
              (s.onkeyup = function(e) {
                var t = e.target;
                if ("Enter" === e.key) {
                  if (n.main.addable && e.ctrlKey)
                    return (
                      a.click(), e.preventDefault(), void e.stopPropagation()
                    );
                  var i = n.list.querySelector("." + n.main.config.highlighted);
                  i && i.click();
                } else
                  "ArrowUp" === e.key ||
                    "ArrowDown" === e.key ||
                    ("Escape" === e.key
                      ? n.main.close()
                      : n.main.config.showSearch && n.main.data.contentOpen
                      ? n.main.search(t.value)
                      : (s.value = ""));
                e.preventDefault(), e.stopPropagation();
              }),
              (s.onfocus = function() {
                n.main.open();
              }),
              e.appendChild(s),
              this.main.addable &&
                (a.classList.add(this.main.config.addable),
                (a.innerHTML = "+"),
                (a.onclick = function(e) {
                  if (n.main.addable) {
                    e.preventDefault(), e.stopPropagation();
                    var t = n.search.input.value;
                    if ("" === t.trim()) return void n.search.input.focus();
                    var i = n.main.addable(t),
                      s = "";
                    if (!i) return;
                    "object" == typeof i
                      ? o.validateOption(i) &&
                        (n.main.addData(i), (s = i.value ? i.value : i.text))
                      : (n.main.addData(
                          n.main.data.newOption({ text: i, value: i })
                        ),
                        (s = i)),
                      n.main.search(""),
                      setTimeout(function() {
                        n.main.set(s, "value", !1, !1);
                      }, 100),
                      n.main.config.closeOnSelect &&
                        setTimeout(function() {
                          n.main.close();
                        }, 100);
                  }
                }),
                e.appendChild(a),
                (t.addable = a)),
              t
            );
          }),
          (n.prototype.highlightUp = function() {
            var e = this.list.querySelector("." + this.main.config.highlighted),
              t = null;
            if (e)
              for (
                t = e.previousSibling;
                null !== t && t.classList.contains(this.main.config.disabled);

              )
                t = t.previousSibling;
            else {
              var i = this.list.querySelectorAll(
                "." +
                  this.main.config.option +
                  ":not(." +
                  this.main.config.disabled +
                  ")"
              );
              t = i[i.length - 1];
            }
            if (
              (t &&
                t.classList.contains(this.main.config.optgroupLabel) &&
                (t = null),
              null === t)
            ) {
              var s = e.parentNode;
              if (
                s.classList.contains(this.main.config.optgroup) &&
                s.previousSibling
              ) {
                var n = s.previousSibling.querySelectorAll(
                  "." +
                    this.main.config.option +
                    ":not(." +
                    this.main.config.disabled +
                    ")"
                );
                n.length && (t = n[n.length - 1]);
              }
            }
            t &&
              (e && e.classList.remove(this.main.config.highlighted),
              t.classList.add(this.main.config.highlighted),
              a.ensureElementInView(this.list, t));
          }),
          (n.prototype.highlightDown = function() {
            var e = this.list.querySelector("." + this.main.config.highlighted),
              t = null;
            if (e)
              for (
                t = e.nextSibling;
                null !== t && t.classList.contains(this.main.config.disabled);

              )
                t = t.nextSibling;
            else
              t = this.list.querySelector(
                "." +
                  this.main.config.option +
                  ":not(." +
                  this.main.config.disabled +
                  ")"
              );
            if (null === t && null !== e) {
              var i = e.parentNode;
              i.classList.contains(this.main.config.optgroup) &&
                i.nextSibling &&
                (t = i.nextSibling.querySelector(
                  "." +
                    this.main.config.option +
                    ":not(." +
                    this.main.config.disabled +
                    ")"
                ));
            }
            t &&
              (e && e.classList.remove(this.main.config.highlighted),
              t.classList.add(this.main.config.highlighted),
              a.ensureElementInView(this.list, t));
          }),
          (n.prototype.listDiv = function() {
            var e = document.createElement("div");
            return e.classList.add(this.main.config.list), e;
          }),
          (n.prototype.options = function(e) {
            void 0 === e && (e = "");
            var t,
              i = this.main.data.filtered || this.main.data.data;
            if ((this.list.innerHTML = "") !== e)
              return (
                (t = document.createElement("div")).classList.add(
                  this.main.config.option
                ),
                t.classList.add(this.main.config.disabled),
                (t.innerHTML = e),
                void this.list.appendChild(t)
              );
            if (this.main.config.isAjax && this.main.config.isSearching)
              return (
                (t = document.createElement("div")).classList.add(
                  this.main.config.option
                ),
                t.classList.add(this.main.config.disabled),
                (t.innerHTML = this.main.config.searchingText),
                void this.list.appendChild(t)
              );
            if (0 === i.length) {
              var s = document.createElement("div");
              return (
                s.classList.add(this.main.config.option),
                s.classList.add(this.main.config.disabled),
                (s.innerHTML = this.main.config.searchText),
                void this.list.appendChild(s)
              );
            }
            for (
              var n = function(e) {
                  if (e.hasOwnProperty("label")) {
                    var t = e,
                      n = document.createElement("div");
                    n.classList.add(c.main.config.optgroup);
                    var i = document.createElement("div");
                    i.classList.add(c.main.config.optgroupLabel),
                      c.main.config.selectByGroup &&
                        c.main.config.isMultiple &&
                        i.classList.add(c.main.config.optgroupLabelSelectable),
                      (i.innerHTML = t.label),
                      n.appendChild(i);
                    var s = t.options;
                    if (s) {
                      for (var a = 0, o = s; a < o.length; a++) {
                        var l = o[a];
                        n.appendChild(c.option(l));
                      }
                      if (
                        c.main.config.selectByGroup &&
                        c.main.config.isMultiple
                      ) {
                        var r = c;
                        i.addEventListener("click", function(e) {
                          e.preventDefault(), e.stopPropagation();
                          for (var t = 0, i = n.children; t < i.length; t++) {
                            var s = i[t];
                            -1 !== s.className.indexOf(r.main.config.option) &&
                              s.click();
                          }
                        });
                      }
                    }
                    c.list.appendChild(n);
                  } else c.list.appendChild(c.option(e));
                },
                c = this,
                a = 0,
                o = i;
              a < o.length;
              a++
            )
              n(o[a]);
          }),
          (n.prototype.option = function(r) {
            if (r.placeholder) {
              var e = document.createElement("div");
              return (
                e.classList.add(this.main.config.option),
                e.classList.add(this.main.config.hide),
                e
              );
            }
            var t = document.createElement("div");
            t.classList.add(this.main.config.option),
              r.class &&
                r.class.split(" ").forEach(function(e) {
                  t.classList.add(e);
                }),
              r.style && (t.style.cssText = r.style);
            var c = this.main.data.getSelected();
            (t.dataset.id = r.id),
              this.main.config.searchHighlight &&
              this.main.slim &&
              r.innerHTML &&
              "" !== this.main.slim.search.input.value.trim()
                ? (t.innerHTML = a.highlight(
                    r.innerHTML,
                    this.main.slim.search.input.value,
                    this.main.config.searchHighlighter
                  ))
                : r.innerHTML && (t.innerHTML = r.innerHTML),
              this.main.config.showOptionTooltips &&
                t.textContent &&
                t.setAttribute("title", t.textContent);
            var d = this;
            t.addEventListener("click", function(e) {
              e.preventDefault(), e.stopPropagation();
              var t = this.dataset.id;
              if (!0 === r.selected && d.main.config.allowDeselectOption) {
                var i = !1;
                if (
                  ((d.main.beforeOnChange && d.main.config.isMultiple) ||
                    (i = !0),
                  d.main.beforeOnChange && d.main.config.isMultiple)
                ) {
                  for (
                    var s = d.main.data.getSelected(),
                      n = JSON.parse(JSON.stringify(s)),
                      a = 0;
                    a < n.length;
                    a++
                  )
                    n[a].id === t && n.splice(a, 1);
                  !1 !== d.main.beforeOnChange(n) && (i = !0);
                }
                i &&
                  (d.main.config.isMultiple
                    ? (d.main.data.removeFromSelected(t, "id"),
                      d.main.render(),
                      d.main.select.setValue(),
                      d.main.data.onDataChange())
                    : d.main.set(""));
              } else {
                if (r.disabled || r.selected) return;
                if (
                  d.main.config.limit &&
                  Array.isArray(c) &&
                  d.main.config.limit <= c.length
                )
                  return;
                if (d.main.beforeOnChange) {
                  var o = void 0,
                    l = JSON.parse(
                      JSON.stringify(d.main.data.getObjectFromData(t))
                    );
                  (l.selected = !0),
                    d.main.config.isMultiple
                      ? (o = JSON.parse(JSON.stringify(c))).push(l)
                      : (o = JSON.parse(JSON.stringify(l))),
                    !1 !== d.main.beforeOnChange(o) &&
                      d.main.set(t, "id", d.main.config.closeOnSelect);
                } else d.main.set(t, "id", d.main.config.closeOnSelect);
              }
            });
            var i = c && a.isValueInArrayOfObjects(c, "id", r.id);
            return (
              (r.disabled || i) &&
                ((t.onclick = null),
                d.main.config.allowDeselectOption ||
                  t.classList.add(this.main.config.disabled),
                d.main.config.hideSelectedOption &&
                  t.classList.add(this.main.config.hide)),
              i
                ? t.classList.add(this.main.config.optionSelected)
                : t.classList.remove(this.main.config.optionSelected),
              t
            );
          }),
          n);
      function n(e) {
        (this.main = e.main),
          (this.container = this.containerDiv()),
          (this.content = this.contentDiv()),
          (this.search = this.searchDiv()),
          (this.list = this.listDiv()),
          this.options(),
          (this.singleSelected = null),
          (this.multiSelected = null),
          this.main.config.isMultiple
            ? ((this.multiSelected = this.multiSelectedDiv()),
              this.multiSelected &&
                this.container.appendChild(this.multiSelected.container))
            : ((this.singleSelected = this.singleSelectedDiv()),
              this.container.appendChild(this.singleSelected.container)),
          this.main.config.addToBody
            ? (this.content.classList.add(this.main.config.id),
              document.body.appendChild(this.content))
            : this.container.appendChild(this.content),
          this.content.appendChild(this.search.container),
          this.content.appendChild(this.list);
      }
      t.Slim = s;
    }
  ]),
  (n.c = s),
  (n.d = function(e, t, i) {
    n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
  }),
  (n.r = function(e) {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
  (n.t = function(t, e) {
    if ((1 & e && (t = n(t)), 8 & e)) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var i = Object.create(null);
    if (
      (n.r(i),
      Object.defineProperty(i, "default", { enumerable: !0, value: t }),
      2 & e && "string" != typeof t)
    )
      for (var s in t)
        n.d(
          i,
          s,
          function(e) {
            return t[e];
          }.bind(null, s)
        );
    return i;
  }),
  (n.n = function(e) {
    var t =
      e && e.__esModule
        ? function() {
            return e.default;
          }
        : function() {
            return e;
          };
    return n.d(t, "a", t), t;
  }),
  (n.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }),
  (n.p = ""),
  n((n.s = 2))).default;
  function n(e) {
    if (s[e]) return s[e].exports;
    var t = (s[e] = { i: e, l: !1, exports: {} });
    return i[e].call(t.exports, t, t.exports, n), (t.l = !0), t.exports;
  }
  var i, s;
});
