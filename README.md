# Rexpath is xpath with regex.

With this package, you can query dom tree with xpath and regex(regular expression).

With xpath, we already can query dom but cannot use regex.
You may want to query dom which attribute(like `class`, `href`) match a regex(like `/bo.+k/`, `/(fa[vb]o[rl]ite)/`).

You can do it. like:

```js
/* all div which class match /(cool|awesome)-cafe/ or id match /number-\\d+/ */
var elements = document.rexpath_all(
  ['and', '//div', ['or', ['@~', 'class', '(cool|awesome)-cafe']
                        , ['@~', 'id', 'number-\\d+']]] );
elements.forEach((element)=>{
  /* a tag which text() matches /hotel/ */
  var a = element.rexpath( ['and', './/a', ['~', 'hotel']]);
  console.log('find a tag:', a);
}
```

## Start with unpkg

[one file example.](https://unpkg.com/rexpath/example/unpkg.html)

## Start with webpack.

Install.

```sh
$ npm install rexpath
```

Use this like.

```js
import rexpath from 'rexpath';
rexpath.init(); /* inject method to HTMLElement, HTMLDocument. */

function find_it() {
    /* all div which `class` match awesome-.. or `id` match awesome */
    var div = document.rexpath(
      ["and", "//div"
            , ["or", ["@~", "class", "awesome-[ck]lass"],
                     ["@~", "id", "awesome"]]] );
    /* all a-tag children of div. which text() match cool... */ 
    var a = div.rexpath( ["and", ".//a", ["~", "cool.+title"]] );                                                    
    return a;
}
```

## Start (or try) with chrome devtools console.

```js
const element_script = document.createElement('script');
element_script.src = 'https://unpkg.com/rexpath/dist/index-web.js';
document.head.appendChild(element_script);
```

## API

### `(HTMLElement|HTMLDocument)#rexpath(query)`

Find a element.

### `(HTMLElement|HTMLDocument)#rexpath_all(query)`

Find all elements.

## Query

definition.

```text
query = string | list
list = and-clause | or-clause | attribute-match-clause | text-match-clause
and-clause = ["and", query,,,]
or-clause = ["or", query,,,]
attribute-match-clause = ["@~", attribute, regex]
text-match-clause = ["~", regex]
```

meaning.

```text
string : xpath. like "//div", ".//a[ contains(text(), 'aaa') ]"
and-clause : query `and` mached dom. like ["and", "//div", ["~", "this .+ is awesome"]]
or-clause : query `or` mached dom. like ["or", ["@~", "class", "red|blue"], ["@~", "id", "red|blue"]]
attribute-match-clause : query dom which text match 
attribute: string. attribute like "href", "class"
regex: string. regular expression.
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
  ['and', '//*', ['@~', 'class', '(novel|music|movie)']]);

// text() match
document.rexpath_all(
  ['and', '//a', ['~', 'social\\s+network\\s+\\d+']] );
```


