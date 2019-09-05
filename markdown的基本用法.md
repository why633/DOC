# 0. 概述
#### 兼容 HTML
1. 只有一些 HTML 区块元素――比如 `<div>`、`<table>`、`<pre>`、`<p>` 等标签，必须在前后加上空行与其它内容区隔开，还要求它们的开始标签与结尾标签不能用制表符或空格来缩进。
2. HTML 的区段（行内）标签如 `<span>`、`<cite>`、`<del>` 可以在 Markdown 的段落、列表或是标题里随意使用。
#### 特殊字符自动转换
- Markdown 让你可以自然地书写字符，需要转换的由它来处理好了。
# 1. 普通段落

普通段落<br>


普通段落
# 2. b标题
# 最高标题
最高标题
===

##第二标题
第二标题
---

### 第三标题
#### 第四标题
##### 第五标题
###### 第六标题

# 3. 区块引用
## 这是一个文本区块引用
> 这是一个标题
> 
>> 1. 这是第一行列表项。
>> 2. 这是第二行列表项。
> 
> 给出一些例子代码：
> 
>     1.return shell_exec("echo $input | $markdown_script");
>     2.if is a little girl

## 这是一个代码区块引用，前面必须缩进4个单位（1个tab）

    var a = 0;
        b = 1;
    
    b = a;
    console.log(b); // 输出0
    
    <div>title</div>
   


<pre><code>这是一个代码区块。
这是一个代码区块。
</code></pre>

## 链接
这是一个链接[百度](http://www.baidu.com/ "这是个title")

## bash
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#### 1. 连接到本地资源用相对路径
See my [About](/about/) page for details.
#### 2. 多个链接的使用
I get 10 times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].

  [1]: http://google.com/        "Google"
  [2]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"

# 4. 列表（列表标识符后面需要1个空格，最多4个空格）
## 无序列表
- green
- apple

+ green 
+ apple

* green 
* apple

<ul>
<li>green</li>
<li>apple</li>
</ul>

## 有序列表
#### 如果中间空一行，会给里面每个li标签里的内容添加一个p标签，形成下面效果；以下子项目至少需要缩进3个单位才会实现，默认一个tab就可以了
1. green
    1. red
        1. aaa
        2. bbb
    2. blue
2. apple

3. green
4. apple

#### 如果中间空两行，会形成两个列表分别展示
1.   green
2.   apple


3. green
4. apple

#### 如果线面序号乱序，会以第一个数字开始依次升序
3. green
2. apple
6. green
4. apple

<ol>
<li>green</li>
<li>apple</li>
</ol>

#### 列表项目可以包含多个段落，每个项目下的段落都必须缩进 4 个空格或是 1 个制表符：
1. This is a list item with two paragraphs. Lorem ipsum dolor
   sit amet, consectetuer adipiscing elit. Aliquam hendrerit
   mi posuere lectus.

   Vestibulum enim wisi, viverra nec, fringilla in, laoreet
   vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
   sit amet velit.

2. Suspendisse id sem consectetuer libero luctus adipiscing.


* This is a list item with two paragraphs.

  This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

* Another item in the same list.

# 5. 分割线

### 分割线表达1：“---”

---

### 分割线表达2：“***”
***

### 分割线表达2：“___”
___

# 6. 强调（被 * 或 _ 包围的字词会被转成用 <em> 标签包围，用两个 * 或 _ 包起来的话，则会被转成 <strong>）
*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

# 7. 代码
#### 普通
`code code`
#### 如果要在代码区段内插入反引号
``code (`) code``
#### 代码区段内的开始或结尾插入反引号，需要在开始和结束多加一个空格
A single backtick in a code span: `` ` ``

A backtick-delimited string in a code span: `` `foo` ``

# 8. 图片（多个图片的话和多个链接的表达方式一样）
![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")

# 9. 网址

1. 网址：<http://example.com/>
2. 邮箱：<1156743527@qq.com>
3. 转移使用反斜杠`` `\` `` \*literal asterisks\*