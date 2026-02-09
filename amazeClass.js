//


//NPM : node package Manager it enables to reuse our own code in other project, used code build by other developers and lastly share our own solution
// NPM can be called package, module or Dependencies



// lodash is a popular utility library that gives you easier array handling.
// it has a function called flattenDeep this function flatten every array,no matter how nested it is 

const _ = require("lodash")

const item = [1, [2, [3, [4]]]]

const newItem = _.flattenDeep(item)
console.log(newItem)

