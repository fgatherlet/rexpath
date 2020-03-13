# Rexpath is xpath(or css-selector) with regex.

With this package, you can query dom tree with xpath and regex(regular expression).

You can use **css-selector** instead of xpath, if you want.

With xpath(or css-selector), we already can query dom but cannot use regex.!
You may want to query dom which attribute(like `class`, `href`) match a regex(like `/bo.+k/`, `/(fa[vb]o[rl]ite)/`).

You can do it. like:

```js
/* all div which class match /(cool|awesome)-cafe/ or id match /number-\\d+/ */
var elements = document.rexpath_all(
  ['and', '//div', ['or', ['@~', 'class', /(cool|awesome)-cafe/]
                        , ['@~', 'id', /number-\d+/]]] );
elements.forEach((element)=>{
  /* a tag which text() matches /hotel/ */
  var a = element.rexpath( ['and', './/a', ['~', /hotel/]]);
  console.log('find a tag:', a);
}
```

If you want to use css-selector instead of xpath.

```js
window.rexpath.use_css_selector();
var element = document.rexpath(['and', 'div > span'
                                     , ['or', ['and', 'table.some-class'
                                                    , ['@~', 'id', /ban.n.\s+app.e/i]]
                                            , 'div.some-class#some-id']
                                     , 'a.book']);
```

## Start with unpkg

- [one file example.](https://unpkg.com/rexpath/example/unpkg.html)

- [one file exampl. css-selector version.](https://unpkg.com/rexpath/example/unpkg-css-selector.html)

## Start with webpack.

Install.

```sh
$ npm install rexpath
```

Use this like.

```js
import rexpath from 'rexpath';
rexpath.init(window); /* inject method to HTMLElement, HTMLDocument. */

function find_it() {
    /* all div which `class` match awesome-.. or `id` match awesome */
    var div = document.rexpath(
      ["and", "//div"
            , ["or", ["@~", "class", /awesome-[ck]lass/],
                     ["@~", "id", /awesome/]]] );
    /* all a-tag children of div. which text() match cool... */ 
    var a = div.rexpath( ["and", ".//a", ["~", /cool.+title/]] );                                                    
    return a;
}
```

## Start (or try) with chrome devtools console.

```js
const element_script = document.createElement('script');
element_script.src = 'https://unpkg.com/rexpath';
document.head.appendChild(element_script);
```

## API

### `(HTMLElement|HTMLDocument)#rexpath(query)`

Find a element.

### `(HTMLElement|HTMLDocument)#rexpath_all(query)`

Find all elements.

### `(Array|String)#rexpath_compile()`

Compile query.

### `window.rexpath#use_css_selector()`

change to use css-selecrtor instead of xpath.

### `window.rexpath#use_xpath()`

back to use xpath instead of css-selector.

## Query

### definition.

- query ::= xpath | clause
- clause ::= and-clause | or-clause | attribute-match-clause | text-match-clause
- and-clause ::= ["and", query,,,]
- or-clause ::= ["or", query,,,]
- attribute-match-clause ::= ["@~", attribute, regex]
- text-match-clause ::= ["~", regex]

### meaning.

##### xpath

xpath string. like

- `"//div"`
- `".//a[ contains(text(), 'aaa') ]"`

##### and-clause
query `and` mached dom. like

- `["and", "//div", ["~", /this .+ is awesome/i]]`

##### or-clause
query `or` mached dom. like

- `["or", ["@~", "class", /red|blue/],  ["@~", "id", /red|blue/]]`

##### attribute-match-clause
clause to query dom which attribute match regex.

##### text-match-clause
clause to query dom which textContent match regex.

##### attribute
string. attribute like

- `"href"`
- `"class"`

##### regex
RegExp object. like

- `/hello\d+/`
- `/world/i`
- `RegExp("abc", "i")`


## You can use not `xpath` but `css-selector` if you want...

`XPath` feels superior in my opinion. But you can use `css-selector`if you want.

```
import rexpath from 'rexpath';
rexpath.init(winmdow);
rexpath.use_css_selector();
/* css-selector mode */
document.rexpath(['or', "//div/a"
                      , "//div/span/a"]);


rexpath.use_xpath();
/* back to xpath mode */
document.rexpath(["or", ":scope > div > a"
                      , ":scope > div > span > a "]);

```


## Examples

### Compose xpath.

```js
document.rexpath( ['and', '//div[ @class="test" ]'
                        , ['or', "./span", "./table"]
                        , './/a'] );
```

### RegEx

```js
// attribute match
document.rexpath(
  ['and', '//*', ['@~', 'class', /(novel|music|movie)/]]);

// text() match
document.rexpath_all(
  ['and', '//a', ['~', /social\s+network\s+\d+/]] );
```




