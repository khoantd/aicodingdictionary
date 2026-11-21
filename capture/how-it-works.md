# How it works

Deep mode: what the site's JavaScript is made of and what its start page did while we watched.

## Its JavaScript

Analysed 26 script(s) from https://www.aicodingdictionary.com/: 25 module(s), 36 endpoint(s), 2 route(s), bundled with esbuild/tsc.

Evidence ev_90f4d1be8468e14b9d469653a8420384c6d17bb3721410128ce6aa887b27a7d6.

```json
{
  "api_operations": [],
  "app_kind": "unknown",
  "bundlers": [
    "esbuild",
    "tsc"
  ],
  "edges": [
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/fast-deep-equal/index.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/fast-deep-equal/index.js@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/fast-deep-equal/index.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#t.exports@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/levenshtein-edit-distance/index.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/levenshtein-edit-distance/index.js@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/levenshtein-edit-distance/index.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#t.exports@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/propose/propose.js",
      "kind": "requires",
      "to": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/levenshtein-edit-distance/index.js"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/propose/propose.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/propose/propose.js@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/propose/propose.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#t.exports@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#<anonymous@1>@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#e.prototype._sampleCurveDerivativeX@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#e.prototype._sampleCurveX@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#e.prototype._sampleCurveY@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#e.prototype._solveCurveX@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#e.prototype.set@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#e.prototype.solve@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#e.prototype.solveSimple@1"
    },
    {
      "from": "bundle-module:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#../node_modules/timing-function/lib/UnitBezier.js",
      "kind": "defines",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#e@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#D:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#D.addEventListener(change)@350"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#I:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#I.addEventListener(change)@586"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#c:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#c.addEventListener(change)@326"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#g:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#g.addEventListener(change)@95"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#h:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#h.addEventListener(change)@758"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#l:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#l.addEventListener(change)@563"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#n:load",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#n.addEventListener(load)@475"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#o:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#o.addEventListener(change)@52"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#o:error",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#o.addEventListener(error)@235"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#o:message",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#o.addEventListener(message)@235"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#s:load",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#s.addEventListener(load)@475"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#t:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#this.listener@753"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#this.blendMode:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#this.blendMode.addEventListener(change)@45"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#this:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#this.addEventListener(change)@45"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#u:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#u.addEventListener(change)@74"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#v:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#v.addEventListener(change)@219"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#x:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js#x.addEventListener(change)@235"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/08x4ypcaobge2.js#u:abort",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/08x4ypcaobge2.js#u.addEventListener(abort)@2"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/08x4ypcaobge2.js#window:pagehide",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/08x4ypcaobge2.js#window.addEventListener(pagehide)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/08x4ypcaobge2.js#window:pageshow",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/08x4ypcaobge2.js#window.addEventListener(pageshow)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js#screen.orientation:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js#p.current.orientationHandler@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js#window:orientationchange",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js#p.current.orientationHandler@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js#window:resize",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js#u@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js#window:scroll",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js#o@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#c:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#e@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#c:error",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#c.onerror@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#r:abort",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#n@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#u:resize",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#w@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#u:scroll",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#e@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#v:error",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#v.addEventListener(error)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#v:load",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#v.addEventListener(load)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#window:load",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#window.addEventListener(load)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#window:popstate",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#u@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#window:resize",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#h@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#window:resize",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js#i@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1-8l96h322f0e.js#window:mousemove",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1-8l96h322f0e.js#i@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1-8l96h322f0e.js#window:touchmove",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1-8l96h322f0e.js#t@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#document:keydown",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#e@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#e:scroll",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#v@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#screen.orientation:change",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#p.current.orientationHandler@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#window:orientationchange",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#p.current.orientationHandler@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#window:resize",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#c@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#window:scroll",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#o@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#window:storage",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js#window.addEventListener(storage)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/19jnqtj4vja-y.js#M:openchange",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/19jnqtj4vja-y.js#e@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/19jnqtj4vja-y.js#et:openchange",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/19jnqtj4vja-y.js#i@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/19jnqtj4vja-y.js#u:abort",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/19jnqtj4vja-y.js#u.addEventListener(abort)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1g5lp-6s-qqw-.js#o:ce",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1g5lp-6s-qqw-.js#y@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1l5l7y8pxj76i.js#a:error",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1l5l7y8pxj76i.js#h@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1l5l7y8pxj76i.js#a:load",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1l5l7y8pxj76i.js#o@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/1l5l7y8pxj76i.js#l:paint",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/1l5l7y8pxj76i.js#l.onpaint@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#t:statechange",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#t.addEventListener(statechange)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#window:error",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#window.addEventListener(error)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#window:unhandledrejection",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js#window.addEventListener(unhandledrejection)@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/2ur02zw8ws_vi.js#L.events:close",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2ur02zw8ws_vi.js#e@1"
    },
    {
      "from": "event:www.aicodingdictionary.com/_next/static/immutable/chunks/2ur02zw8ws_vi.js#R.events:itemhover",
      "kind": "handled-by",
      "to": "fn:www.aicodingdictionary.com/_next/static/immutable/chunks/2ur02zw8ws_vi.js#
```

## Ten seconds of it

Watched https://www.aicodingdictionary.com/ for 10000ms: 0 request outline(s), 1 console entr(y/ies).

Evidence ev_97802b1f41573219327990119283086cddf7720642d29de05b66ce1b2f8e50b5.

```json
{
  "accessibility": null,
  "console": {
    "count": 1,
    "entries": [
      {
        "level": "warning",
        "source": "javascript"
      }
    ],
    "has_text": false
  },
  "dom": {
    "attribute_names": [
      "aria-hidden",
      "as",
      "async",
      "blocking",
      "charset",
      "class",
      "content",
      "crossorigin",
      "d",
      "data-disable-auto-track",
      "data-event-endpoint",
      "data-external",
      "data-nscript",
      "data-precedence",
      "data-sdkn",
      "data-sdkv",
      "data-session-endpoint",
      "data-theme",
      "data-view-endpoint",
      "defer",
      "dir",
      "fetchpriority",
      "fill",
      "hidden",
      "href",
      "id",
      "lang",
      "name",
      "nomodule",
      "property",
      "rel",
      "sizes",
      "src",
      "stroke",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-width",
      "style",
      "target",
      "type",
      "viewbox"
    ],
    "elements_by_name": {
      "a": 5,
      "article": 2,
      "body": 1,
      "dd": 144,
      "div": 149,
      "dl": 14,
      "dt": 144,
      "h1": 3,
      "h2": 14,
      "head": 1,
      "html": 1,
      "link": 12,
      "main": 1,
      "meta": 31,
      "next-route-announcer": 1,
      "p": 6,
      "path": 6,
      "script": 52,
      "section": 14,
      "span": 1,
      "svg": 2,
      "template": 1,
      "title": 1
    },
    "text_nodes": 348,
    "total_nodes": 968,
    "truncated": false
  },
  "dropped_events": 0,
  "frame_origins": [
    "https://www.aicodingdictionary.com"
  ],
  "network": {
    "request_count": 0,
    "requests": []
  },
  "origin": "https://www.aicodingdictionary.com/",
  "resources": [
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/turbopack-3h_ctkfaeun7f.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/0m924y3joub6h.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3avdk6ew_2rz4.js"
    },
    {
      "mime_type": "text/css",
      "type": "Stylesheet",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/435wermyueh-6.css"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3n6t_5pgbbise.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/2ur02zw8ws_vi.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/2jzgmxpbpjlba.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/440qq30y1lkdc.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/08x4ypcaobge2.js"
    },
    {
      "mime_type": "text/css",
      "type": "Stylesheet",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/0pfxyft55vvik.css"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1g5lp-6s-qqw-.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3pm_kl7s0jh8n.js"
    },
    {
      "mime_type": "font/woff2",
      "type": "Font",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/media/ServerMono_Regular-s.p.3svvteyy0qp2u.woff2"
    },
    {
      "mime_type": "text/css",
      "type": "Stylesheet",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1itc7r4yf_-ao.css"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1qjif3r7x7df4.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/ee73edb21143a49f/script.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1l5l7y8pxj76i.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3p0cl8hh3y0xf.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/19jnqtj4vja-y.js"
    },
    {
      "mime_type": "text/css",
      "type": "Stylesheet",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1v0arsbhbinah.css"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3daz1_4hpulr0.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3e43k9h925809.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/2yr0i-1km6l8o.js"
    },
    {
      "mime_type": "application/manifest+json",
      "type": "Manifest",
      "url": "https://www.aicodingdictionary.com/manifest.webmanifest"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1-8l96h322f0e.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/34lek8wnqat0s.js"
    }
  ],
  "scripts": [
    {
      "length": 11199,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/turbopack-3h_ctkfaeun7f.js"
    },
    {
      "length": 3181,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/2yr0i-1km6l8o.js"
    },
    {
      "length": 177304,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/08x4ypcaobge2.js"
    },
    {
      "length": 57,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/"
    },
    {
      "length": 254890,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/34lek8wnqat0s.js"
    },
    {
      "length": 20227,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/0koiwprb89ghz.js"
    },
    {
      "length": 14260,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/0m924y3joub6h.js"
    },
    {
      "length": 876,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3pm_kl7s0jh8n.js"
    },
    {
      "length": 70263,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/0pn0knnmxxi5m.js"
    },
    {
      "length": 1079,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/2jzgmxpbpjlba.js"
    },
    {
      "length": 28829,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1qjif3r7x7df4.js"
    },
    {
      "length": 3757,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3avdk6ew_2rz4.js"
    },
    {
      "length": 377263,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1l5l7y8pxj76i.js"
    },
    {
      "length": 25402,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1g5lp-6s-qqw-.js"
    },
    {
      "length": 355871,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3daz1_4hpulr0.js"
    },
    {
      "length": 268884,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/2ur02zw8ws_vi.js"
    },
    {
      "length": 529669,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3e43k9h925809.js"
    },
    {
      "length": 72208,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/19jnqtj4vja-y.js"
    },
    {
      "length": 41985,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1-8l96h322f0e.js"
    },
    {
      "length": 42198,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/1191c2wtnm3c2.js"
    },
    {
      "length": 70828,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3n6t_5pgbbise.js"
    },
    {
      "length": 81161,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/2pjji_9d0kky8.js"
    },
    {
      "length": 4518,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/ee73edb21143a49f/script.js"
    },
    {
      "length": 271617,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/03rzr-9g-h6iu.js"
    },
    {
      "length": 673205,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/3p0cl8hh3y0xf.js"
    },
    {
      "length": 908,
      "source_map_url": null,
      "url": "https://www.aicodingdictionary.com/_next/static/immutable/chunks/440qq30y1lkdc.js"
    }
  ],
  "scripts_truncated": false,
  "secret_redactions": 0,
  "storage_keys": null,
  "watch_ms": 10000,
  "websockets": {
    "connections": [],
    "frames": []
  }
}
```
