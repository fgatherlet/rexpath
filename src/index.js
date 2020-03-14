var rexpath = {};

rexpath.init = function(window/*, conf={mode: "xpath"}*/) {
  /* inject global `rexpath`. may be bad manner. */
  window.rexpath = rexpath;
  /* for node.js unit test... there may be other proper way.. */
  rexpath.window = window;
  var document = rexpath.window.document;
  var HTMLDocument = rexpath.window.HTMLDocument;
  var HTMLElement = rexpath.window.HTMLElement;
  var XPathResult = rexpath.window.XPathResult;

  ///* inject xpath to element */
  //HTMLDocument.prototype.rexpath_raw_find_all = function(q) {
  //  var xp = document.evaluate(q, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  //  var ar = new Array(xp.snapshotLength);
  //  for (var i=0; i<xp.snapshotLength; i++) {
  //    ar[i] = xp.snapshotItem(i);
  //  }
  //  return ar;
  //};
  // if (conf.mode == 'css') {
  //   HTMLDocument.prototype.rexpath_raw_find_all = function(q) {
  //     var self = this;
  //     try {
  //       var ar = self.querySelectorAll(q) || [];
  //       return ar;
  //     } catch (e) {
  //       console.log(`querySelectorAll error. self:${self} e:${e}`);
  //       return [];
  //     }
  //   };
  // }
  /* inject rexpath to element */
  HTMLDocument.prototype.rexpath = function(q) {
    var from_node = this;
    return rexpath.rexpath_internal(q, from_node, false);
  };
  HTMLDocument.prototype.rexpath_all = function(q) {
    var from_node = this;
    return rexpath.rexpath_internal(q, from_node, true);
  };
  // Sync method from html-document to html-element.
  ['rexpath_raw_find_all'
   ,'rexpath'
   ,'rexpath_all'].forEach(method=>{
      HTMLElement.prototype[method] = HTMLDocument.prototype[method];
    });

  /* compiler */
  Function.prototype.rexpath_compile = function (cont=rexpath.rexpath_return) {
    // already compiled function.
    return this;
  };
  String.prototype.rexpath_compile = function (cont=rexpath.rexpath_return) {
    // string is xpath.
    var q = this;
    return function(node, env) {
      if (!env.allp && env.foundp) { return; }
      var found = node.rexpath_raw_find_all(q);
      var found_len = found.length;
      for (var i=0; i<found_len; i++) {
        var xnode = found[i];
        cont(xnode, env);
      }
    };
  };
  Array.prototype.rexpath_compile = function (cont=rexpath.rexpath_return){
    // array(list) is dispatched with head.
    var q = this;
    var head = q[0];
    if (! head) {
      throw 'rexpath_compile cannot accept blank array.';
    }

    if (head == '@~') {
      return rexpath.rexpath_compile_regex_attribute(q, cont);
    } else if (head == '~') {
      return rexpath.rexpath_compile_regex_text(q, cont);
    } else if (head == 'and') {
      return rexpath.rexpath_compile_and(q, cont);
    } else if (head == 'or') {
      return rexpath.rexpath_compile_or(q, cont);
    }
  };
  this.use_xpath();
};

/* inject rexpat_raw_find_all. as xpath or querySelector */
rexpath.use_xpath = function() {
  var document = rexpath.window.document;
  var HTMLDocument = rexpath.window.HTMLDocument;
  var HTMLElement = rexpath.window.HTMLElement;
  var XPathResult = rexpath.window.XPathResult;

  HTMLElement.prototype.rexpath_raw_find_all =
    HTMLDocument.prototype.rexpath_raw_find_all =
    function(q) {
      var xp = document.evaluate(q, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var ar = new Array(xp.snapshotLength);
      for (var i=0; i<xp.snapshotLength; i++) {
        ar[i] = xp.snapshotItem(i);
      }
      return ar;
    };
};
rexpath.use_css_selector = function() {
  var document = rexpath.window.document;
  var HTMLDocument = rexpath.window.HTMLDocument;
  var HTMLElement = rexpath.window.HTMLElement;
  var XPathResult = rexpath.window.XPathResult;

  HTMLElement.prototype.rexpath_raw_find_all =
    HTMLDocument.prototype.rexpath_raw_find_all =
    function(q) {
      var self = this;
      try {
        var ar = self.querySelectorAll(q) || [];
        return ar;
      } catch (e) {
        console.log(`querySelectorAll error. self:${self} e:${e}`);
        return [];
      }
    };
};

/* top level continuation */
rexpath.rexpath_return = function(node, env) {
  if (!env.allp && env.foundp) { return; }
  env.foundp = true;
  env.found = env.found || new Map;
  env.found.set(node, true);
};
rexpath.rexpath_compile_regex_attribute = function(q, cont) {
  const attribute_key = q[1];
  const regex = q[2]; /* RegExp Object. */
  //const casesensitivep = q[3];
  if (!attribute_key || !regex) {
    throw 'rexpath_compile_regex_attribute accept blank input.';
  }
  //const regex2 = casesensitivep ? RegExp(regex) : RegExp(regex, "i");

  return function(node, env) {
    if (!env.allp && env.foundp) { return; }
    const attribute_value = node.getAttribute(attribute_key);
    if (!attribute_value) { return; }
    const match = attribute_value.match(regex);
    if (match) {
      cont(node, env);
    }
  };
};
rexpath.rexpath_compile_regex_text = function(q, cont) {
  const regex = q[1];
  //const casesensitivep = q[2];
  if (!regex) {
    throw 'rexpath_compile_regex_text accept blank input.';
  }
  //const regex2 = casesensitivep ? RegExp(regex) : RegExp(regex, "i");
  return function(node, env) {
    if (!env.allp && env.foundp) { return; }
    const text_value = node.textContent;
    if (!text_value) { return; }
    const match = text_value.match(regex);
    if (match) {
      cont(node, env);
    }
  };
};
rexpath.rexpath_compile_and = function(q, cont) {
  let xcont = cont;
  const qlen = q.length;
  for(var i = qlen - 1; 1 <= i; i--) {
    const qpart = q[i];
    xcont = qpart.rexpath_compile(xcont);
  }
  return xcont;
};
rexpath.rexpath_compile_or = function(q, cont) {
  const qlen = q.length;
  const or_branch = q.slice(1).map( qpart=>qpart.rexpath_compile(cont) );
  const or_branch_len = qlen - 1;
  return function(node, env) {
    if (!env.allp && env.foundp) {return;}
    for (var i = 0; i <= or_branch_len-1; i++) {
      (or_branch[i])(node, env);
    }
  };
};
/* driver */
rexpath.rexpath_internal = function(q, from_node, allp=false) {
  var aout = q.rexpath_compile(rexpath.rexpath_return);
  var env = {};
  env.allp = allp;

  aout(from_node, env);

  if (! env.foundp) { return; }
  var found_array = Array.from(env.found.keys()) || [];

  if (allp) {
    return found_array;
  } else {
    return found_array[0];
  }
};

export default rexpath;
