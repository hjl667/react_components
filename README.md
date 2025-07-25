# 前端coding题目

## undefined

console.log(JSON.stringify(users, null, 2)), 后面两个参数null, 2, 第二个参数表示的是哪些

attributes应该被跳过，null的话表示的就是不跳过任何的值，2表示输出string的格式，2表示每一层缩进2个空格。

js默认是按照字符串排序，如果指定要按照字符串排序，要用a.localeCompare(b)

如果需要在object解构中继续解构，可以写{ userId, user: { email } }

js里面的object, 如果要更新的键值是一个动态的变量的话，需要用[id]括起来，不然会按照字面来解析。typescript里面类似的定义也是一样的[name]:string。

空值合并运算符，defaultValue ?? items[0].value， 当左侧值为null或者undefined的时候，返回右侧值，不然，返回左侧值。

html的div里面不能直接渲染object, 不然会报错。

---

## undefined

在js的class里面，如果定义了一般的函数的话，this的定义的动态的，是在调用的时候绑定的，

如果是在调用的时候先提取的方法，拿到方法的引用，然后再去调用这个方法的话，就会失去this绑定，this会是undefined。

还有一种情况是在setInterval里面调用某个object的方法，这种情况下，setInterval能拿到的知识这个方法的引用，这个时候，this是undefined，或者说是window object。所以这种情况下，应该把需要传进setInterval的函数做成箭头函数，或者可以去bind。

但是箭头函数就没有这个问题，因为箭头函数的this在定义的时候就确定了。

所以在event handler里面都会用箭头函数。

另外一种scope的题目就是var, let之间的scope区别。

---

## undefined

基础考察内容是用reduce把一个list of objects以另外一种方式来group by, 也可能是用map。reduce的三个参数是acc, value, index, 常常第二个参数会解构掉。

这种类型的题目类似于创建数据透视表，比如说给一个关于users的list, 然后让统计关于dept纬度的信息，比如说员工数量，工资平均数等等。

如果用ts来写的话，reduce初始值是一个object, 这种情况下需要用断言的方式来定义这个object的类型。

同时这个object的类型定义，因为可能会有很多未知但是同一个性质的key，可以写[userId: string]: GroupedUser.

最后在print结果的时候，因为可能是nested object, 所以如果是直接console.log的话，nested部分的内容会没有办法打印出来，这种情况下需要先JSON.stringify, stringify有三个参数。

因为这个场景下不需要删除，所以object和用map的性能是差不多的。object的底层实现也是hash table, 所以查找的性能也是o1。但是删除的性能object会差很多。所以一般不会用delete obj.a这个操作。

数据massage还可能用到find和findIndex,  some和very，这两个api返回的都是boolean。

flatmap可以让数据扁平化，就是先执行map(), 然后再flat(),每一次flat就是降低一次嵌套。

js的数组去重操作可以用set： const uniqueSkills = [...new Set(allSkills)];

如果一下子链式操作了很多个步骤，会产生很多中间结果，在时间和空间上都比较浪费，

可以lazy包装一下，在数据量比较大的时候性能就很好，比如说需要过滤符合条件的三个元素的情况。用的是es6推出的generator, function*

deep clone object因为是nested structure, 所以可以用recursive的写法。

有一个edge case是type of null 是 obj， 所以在检查不是obj之前，要先先查=== null。

typeof不能够区分object和array，所以需要用instanceof Array来判断。

在索引obj的适应，因为T可能没有字符串的索引，所以要先把obj断言成为any

---

## undefined

debounce和throttle

debouce是为了方式用户高频触发某一个操作，导致多个api calls，造成资源浪费。

throttle节流是确保用户的高频操作会按照指定的delay时间，来确保在delay时间之内，不会执行。

debounce又分为两种，普通的版本，和立即执行的版本。普通的版本实现的效果是用户最后一次触发行为的delay时间后进行操作。

立即执行版本是第一次触发的时候会立即执行。后面就确保最后一次触发的delay时间后执行，

这两种debounce的适用场景不同，普通版本适合search场景，用户在停止输入之后再去search，立即执行的debounce适合点击like button的场景，在第一次点击的时候就执行，同时确保delay时间内的后续操作不会重复触发操作。

throttle的操作适合resize这样会被连续触发的操作，保证无论在某个时间段内触发了多少次resize操作，不会一直触发resize, 而是只会delay时间，才触发一次。

debouce的throttle返回的都是防抖和节流后的函数。返回的函数要能够访问到debounce和throttle函数里面的变量，才能够控制delay, 这里用到的就是闭包的原理。debounce维护的是timer, throttle维护的是lastTime。

如果传进来需要throttle和debounce的函数是箭头函数的话，在执行的时候就不需要绑定this。

throttle也可以分两个版本，在interval开始的时候执行，和结束的时候执行，可以在代码里面通过一个flag来控制。

高级版本的throttle用timer来确保最后一次调用能够执行，这在滚动到最终位置、窗口调整到最终大小的场景下是必要的。

---

## undefined

*No content*

---

### undefined

promisify util是一个很常见的promise的题目，以前在没有promise的时候，常用的方式是让用户传一个callback function进来，这个callback function的签名是固定的，（data, error）, 如果有error的话是一个逻辑，如果没有的话是另一个逻辑。

promisify的意思就是要实现相同的效果，但是需要return一个promise。所以其实就是要把成功的数据，resolve出去，这样用户就可以通过.then()接受到，然后处理对应的数据，失败的error通过reject传出去，用户通过.catch处理。

所以用户在promisify的版本的函数的时候，是不会传一个callback function进去的

但是原版函数又需要接收一个callback function, promisify的版本里面需要创造一个callback function传进去，这个callback function就是如果有err的话就reject(err), 不然的话就resolve(message)，这样用户才能通过.then(), 和.catch（）接收到本来应该传给callback function的参数，然后在.then()和.catch()的主题部分来对data或者error进行后续处理。

do a thing这个题目是一个基础版本，升级版本的问题就是写一个general的promisify util。这个函数要return一个返回promise的函数，所以最外面的return是func(...args)

---

### undefined

promisify， 原先是一个异步的函数，选在需要封装一层变成return a promise.

以前老的写法是对于异步函数来说，传一个callback function进去，在异步处理结束，获得结果之后，就会执行这个callback function。

new Promise()是最基础和灵活的方式，需要自定义怎么resolve和reject, 如果是简单的情况，可以直接Promise.resolve()和Promise.reject()。

手动实现Promise.allSettled。 这个method 会等待所有的promise都完成, 是promise的一个静态方法。返回的是一个promise, promise resolve的结果是所有promisese的结果的array, array里面的元素是一个object, 有status 和 value两个attribute。所以.allSettled是从来不会失败的。

Promise.all()是只有全部成功才会返回成功，如果有一个失败了，就会返回失败。

手动实现promise.allSettled可以基于promise.all来实现，可以把所有的promise都封装成永远都不会reject的promise。

也可以自己实现一个计数器，不借助all settle来写。这个题目有一个edge case, 就是当传入的array里面包含不是promise的一般值，在这种情况下，可以包一层Promise.resolve()来保证在调用.then()函数的时候不报错。

promise的实际应用：通过promise来调用第一个api，拿到结果之后，延迟3秒，再调用第二个api。

还可能考察promise和setTimeout一起来考察代码执行顺序。

---

## undefined

一般的accordion的题目考察的传一个array of object进来，这种情况下一般object里面会有value, title还有contents, contents里面可以定义成React.ReactNode, 这样的话就能够更灵活的接收一个component来作为内容。这样会很灵活，因为ReactNode是一个联合类型，可以接受string在内的很多类型。

accordion是可以有一个container div来控制样式的，不应该用React.Fragment

同时accordion有手风琴和非手风琴版本。手风琴版本要控制一次只能有一个card能够展开。

一般来说会用一个set来控制openSections, 往openSections的set里面来添加唯一的key来作为是否展开的标识。

可以用^来作为箭头icon, 然后用className的conditional rendering来控制箭头是否旋转。

可以用["accordion-icon", isExpanded && "accordion-icon-rotated"].filter(Boolean).join(" ")来控制className, filter(Boolean)能够筛掉falsy的值。

控制contents是否展开，除了使用conditional rendering之外，还可以使用hidden属性来控制，这样的accessibility更好。

可以用transform: rotate(180deg)来控制旋转。

如果icon的tag用span的话，那么默认是inline, inline是不能够设置长度宽度的，不会独占一行，但是宽度由内容来决定，所以需要设置成display: inline-block来设置长度宽度。

onClick这样的event handler里面应该传的是一个返回函数的函数，而不是在event发生的时候执行的函数，这样的话相当于给react一个函数，让react在事件发生的每一次都去执行，给react一个函数的reference, 如果直接就会在渲染的时候就直接执行这个handler函数了，这也是为什么要用箭头函数，不然会失去this语境。

除了基本的accordion, 还可以写成collapse和collapseItem的复合组件的模式。这个复合模式支持用户自定义chidren 作为accordion展开的内容。用context来传递组件的状态信息。

---

## undefined

需要进行注释的地方：functional component用react.fc来注释，需要传的props定义一个interface

其他的functions像java一样正常注释

- React.ReactNode 是 React 中的一个类型定义，它表示可以在 React 组件中渲染的所有可能类型的总集合。

React.MouseEvent和MouseEvent是两个types

- 类型断言应该谨慎使用，因为它绕过了 TypeScript 的类型检查，可能导致运行时错误

- typescript type checkers in go

- never表示永远不会发生，可以用于详尽性检查，不能给never类型的变量赋值。throw error的函数把返回类型定义为never, useState的默认值写成[]会推断成never[] type

interface和union types

一个object 的类型定义，还可以写成 [userId: string]: GroupedUser;这样，如果会有同一个性质但是不同value的key的话

：表示的是类型的声明，比如说声明返回值的类型，输入值的类型等等

as表示的是类型断言，用于在你比typescript更知道变量类型的时候，或者说typescript无法推断出正确的变量类型的时候，比如说用在把空对象初始为特定的值，比如在使用reduce的时候。

如果函数需要支持不同类型的array,这个时候就会用到范型<T>的注释

比如说const paginate = <T>(array: T[])要有<T>才能够在后面使用T

ReadOnly<>这个tag表示的是传进来的参数类型是在component内部不能够修改的，不然ts编译会报错。

---

## undefined

css的布局

body和html元素可能会有默认的margin和padding, 需要自己去掉。

除了styled components之外还有headless components, 这种本身是没有任何styles的，比如说radix ui, shed/cn就是建立在radix ui的基础上的。

如果用的是第三方的components, 比如mui, arco design，里面可能会有一些内置的styling, 直接组件上面style可能会不生效，必须要找到组件的classname然后再用传统的css通过classname加上styles

如果想要parent component不因为child component的原因而被撑大，需要在parent component上面加上min-height: 0px的attribute。

**position**: fixed定位是相对于viewport, absolute定位是相对于距离最近的以定位的父元素。如果找不到的话，就会相对于html元素。

postcss is what babel is to javascript, 负责解决css的兼容性问题，

css的命名可以采用bem的格式，block, element 和modifier, 比如说 accordion, accordion-item, accordion-item-title, 按照层级来逐渐添加修饰。

修饰的部分用--来连接，比如说--active

className里面的空格是隔开了独立的css类名，可以里面的任意一个类名来定义风格

条件式className有两种主要的写法，className={[].join(" ")}, 或者可以{`xxxx ${isOpen&&xxxxx}`}, className如果是用了``的话也要用{}, 如果是""就不需要{}。

用css来设置宽度的时候，来实现比如说100%的宽度，如果里面还有元素，那么还需要让里层的元素也是100%的宽度，不然的话，里面的元素不会自动变宽，还会保持原来的宽度。

在定义shadow和border颜色的时候，可以用opacity来控制，rgba()有四个参数，前面三个控制颜色，最后一个控制opacity, 0，0，0是白色，255， 255，255是黑色。

box-shadow的第一个参数是水平偏移，一般这个参数是0, 第二个参数是垂直偏移，第三个参数是blur radius, 是模糊半径，值越大，阴影约模糊。最后一个参数是阴影的颜色。

transform这个css属性能够移动元素的位置。translateX和translateY表示移动元素，translateY的negative value表示向上移动。

transition属性的第一个参数表示过渡效果适用的范围，all表示所有的操作, 第二个参数表示过渡时间，第三个参数表示过渡函数

css变量如果定义在选择器里面，它的作用域就是当前元素，及其子元素。如果是定义在body{}里面，那么就是全局可用的变量。

css里面的grid布局，子元素会成为grid里面的items。一般来说，可以只定义grid在列的方向的比例，用grid-template-columns来定义，可以定义固定宽度，或者也可以用fr为单位来分配比例，如果是同样的比例，可以写repeat(4,1fr)。

如果需要定义某个元素占多少个位置，可以用grid-columns: span 2来定义。

clsx是classnames的简称，一般会封装一个这样的utility function。来在一个array of classNames里面来筛掉false values, 然后再拼接。

---

## undefined

比如说根据pokemon id来拿pokemon card的这样一个使用场景。

第一个要写的版本就是用fetch然后promise解析，拿到api的response再展示出来。

第二个版本就是要处理loading和error的两个state, 可以把这两个state传进card component里面，让card component根据states来展示不同的ui

最后的版本就是要解决race condition的情况，

在useEffect里面设置一个ignore的boolean value, 然后如果ignore是true的话，就不要去setState, 如果是false才setState, 在useEffect的return statement里面来把ignore设置成true。

闭包的原因，async fetch的function还是能够访问到ignore 这个变量，当目前api response的结果拿到的时候，

如果这个时候已经有新的data先拿到了， 并且设置的新的state的话，就说明发生了re-render, useEffect的返回逻辑已经执行，所以ignore就是true了，这个stale的数据就不会被设置。

然后还可以把这部分fetch的逻辑封装成一个useQuery, 要接受一个ur，返回data, isLoading和erro三个结果。

---

## undefined

基础版本就是从api拿数据，或者是mock数据，然后渲染在一个table里面。

<hr>是一个水平分割线，在写table的结构的时候，需要有thead和tbody。thead里面是tr,和th, tbody里面是tr和td(table data)，每一th需要有一个unique key, 每一个tbody的tr里面要有一个unique key。

升级版本就是需要实现前端的pagination。一般的实现方式就是会写一个paginate的函数，接受data, pageSize, page, 返回的是totalPages, 和page。 这样当data变化，pageSize，page变化的时候都会重新计算。

第二个follow up就是需要实现sorting，在写这个功能的时候可以让th是一个button。类似于paginate, 需要有一个sort的函数，返回的是sortedData，接受的是sortField, sortDirection，data。

第三个follow up是让table component变得reusable, 能够接受任意类型的数据，同时能够根据用户提供的comparator进行排序。如果是js的话，变动不大，但是ts的话，类型定义会有很多讲究。定义输入类型的时候需要用到泛型T，同时每一个table data必须有一个id, 所以需要写成<T extends {id: number}>

---

## undefined

一个复杂的form里面，会有很多的input fields 和 error messages, 一般是用一个formData object来存input, 一个errors object来存error。

每一个input field都是一个html input element或者select element, 都会有type, name，value这些属性，还会有placeholder。

用一个handleChange函数来处理所有form输入的validation, handleChange会接收一个React.ChangeEvent，这是一个event object, 从这里面来deconstruct出有change的input的是哪一个field。

const {name, value} = e.target。 validateField的函数里面会接受value和fieldName, 然后用if 或者switch来决定处理哪一个input field。在onBlur的处理函数里面也需要validateField，然后设置error。

不同的input field可以有一样的className, 这样可以一起设置style。

---

