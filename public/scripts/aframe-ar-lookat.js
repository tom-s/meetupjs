!(function(t) {
  function e(n) {
    if (o[n]) return o[n].exports
    var i = (o[n] = { exports: {}, id: n, loaded: !1 })
    return t[n].call(i.exports, i, i.exports, e), (i.loaded = !0), i.exports
  }
  var o = {}
  return (e.m = t), (e.c = o), (e.p = ''), e(0)
})([
  function(t, e) {
    var o = AFRAME.utils.debug,
      n = AFRAME.utils.coordinates,
      i = o('components:look-at:warn'),
      r = n.isCoordinate || n.isCoordinates
    delete AFRAME.components['look-at'],
      AFRAME.registerComponent('look-at', {
        schema: {
          default: '',
          parse: function(t) {
            return r(t) || 'object' == typeof t ? n.parse(t) : t
          },
          stringify: function(t) {
            return 'object' == typeof t ? n.stringify(t) : t
          }
        },
        init: function() {
          ;(this.target3D = null), (this.vector = new THREE.Vector3())
        },
        update: function() {
          var t,
            e = this,
            o = e.data,
            n = e.el.object3D
          return !o || ('object' == typeof o && !Object.keys(o).length)
            ? e.remove()
            : 'object' == typeof o
              ? n.lookAt(new THREE.Vector3(o.x, o.y, o.z))
              : ((t = e.el.sceneEl.querySelector(o)),
                t
                  ? t.hasLoaded
                    ? e.beginTracking(t)
                    : t.addEventListener('loaded', function() {
                        e.beginTracking(t)
                      })
                  : void i(
                      '"' + o + '" does not point to a valid entity to look-at'
                    ))
        },
        tick: function(t) {
          var e,
            o = this.target3D,
            n = this.el.object3D,
            i = this.vector
          o &&
            ((e = n.parent.worldToLocal(o.getWorldPosition())),
            this.el.getObject3D('camera')
              ? i.subVectors(n.position, e).add(n.position)
              : (i = e),
            n.lookAt(i))
        },
        beginTracking: function(t) {
          this.target3D = t.object3D
        }
      })
  }
])
