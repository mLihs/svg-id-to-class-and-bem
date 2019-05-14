// This SVGO plugin converts the `id` attribute on elements into a `class` attributes.
// The value of the class atribute can be BEM based or the initial value.
// In any case the it will be clean up the names and remove special charkter


'use strict';

exports.type = 'perItem';

exports.active = true;

exports.description = 'convert id attribute to class, using the same value';

var group = new Array();
var defs = new Array();


function getParrent(elm){
  var parent = new Array();
  group.forEach(function(e) {
    if (e.name == elm) {
      parent = e.parent
    }
  })
  return parent;
}

exports.fn = function(item) {
  
  // {name: 'group b', parrent:[group]}
  // {name: 'layer B ', parrent:[group]}
  // {name: 'layer A ', parrent:[group]}
  // {name: 'layer C', parrent:[group, group b ]}
  // group
  //    group b
  //      layer C
  //    layer B
  //    layer A

  function cleanName (str){
    str = str.match(/[^\/]+$/g)[0];
    str = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '_').toLowerCase()
    return str
  }

  if (item.isElem('defs')) {
   
    var itemChilds = item.content;
    itemChilds.forEach(function(e) {
      var id = e.attrs.id.value;
      if (!defs.includes(id)) {
        defs.push(id);
      }
    })
    console.log(defs)
  }
  
  
  if (item.isElem() && item.hasAttr('id') && !item.isElem('mask')) {
      var id = item.attrs.id.value;
      if (!defs.includes(id)) {
        var parent = getParrent(id);

        if (item.isElem('g') && item.hasAttr('id') ){
          id = item.attrs.id.value
          var parent = getParrent(id)
          var myParent = new Array(id);
          myParent = parent.concat(myParent)

          var itemChilds = item.content;
          itemChilds.forEach(function(e) {
            if (e.elem != 'mask' && e.hasAttr('id')) {
              group.push({name: e.attrs.id.value, parent: myParent})
            }
          });
          
        }
        
        var myId = cleanName(id);
        if (parent.length > 0) {
          var prefix = '';
          parent.forEach(function(e, index) {
            prefix += cleanName(e) + '__';
          })
          myId = prefix + id;
        }

        item.addAttr({
          name: 'class',
          value: myId,
          prefix: '',
          local: 'class'
        })

        item.removeAttr('id');
     }
  }
}