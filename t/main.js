const test = require('tape');
const jsdom = require('jsdom');
const JSDOM = jsdom.JSDOM;
/* I do knot the proper way to handle module on node shoot... */
const rexpath = require('../dist-development/index-node.js');
//console.log("rexpath:", rexpath);

const dom = new JSDOM(`
<html>
  <div class='apple apple200'>
    <span id='spanx'>hello apple.</span>
    <ul id='ulx'>
      <li id='orange100'>Orange100</li>
      <li id='apple200'>Apple200</li>
      <li id='pine300'>
        <a href='pine-300'>Pine300</a>
      </li>
      <li id='other'>
        other<a>dummy</a>
      </li>
    </ul>
  </div>
</html>
`);
const window = dom.window;
const document = window.document;

rexpath.init(window);

test('main', t=>{
  rexpath.use_xpath();

  t.plan(4);
  let ar_li, ar_li_len;

  ar_li = document.rexpath_all("//li");
  ar_li_len = ar_li.length;
  t.equal(ar_li_len, 4);

  ar_li = document.rexpath_all(['and', "//li", ["@~", "id", /2\d+/]]);
  ar_li_len = ar_li.length;
  t.equal(ar_li_len, 1);

  ar_li = document.rexpath_all(['and', "//li", ["~", /2\d+/]]);
  ar_li_len = ar_li.length;
  t.equal(ar_li_len, 1);

  ar_li = document.rexpath_all(['and'
                                ,"//div"
                                ,["or"
                                  ,".//li[@id='pine300']"
                                  ,".//li[@id='other']"]
                                ,"./a"
                               ]);
  ar_li_len = ar_li.length;
  t.equal(ar_li_len, 2);

});

test('css mode.', t=>{
  rexpath.use_css_selector();

  t.plan(2);
  let ar_li, ar_li_len;

  ar_li = document.rexpath_all("li");
  ar_li_len = ar_li.length;
  t.equal(ar_li_len, 4);

  ar_li = document.rexpath_all(['and'
                                ,"div"
                                ,["or"
                                  ,"li#pine300"
                                  ,"li#other"]
                                ,":scope > a"
                               ]);
  ar_li_len = ar_li.length;
  t.equal(ar_li_len, 2);

});
