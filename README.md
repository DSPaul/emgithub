# Embed Like Gist

https://emgithub.com/

Embed a file from Github repository just like [Github Gist](https://gist.github.com/). Unlike other websites that do similar work, EmGithub.com is a static site hosted on Github Pages. Fetching target files and highlighting are done on your browser.


Related post: https://blog.yusanshi.com/2019-12-17-emgithub/

## Get started

There are two ways to use the service.

Supposed you want to embed the file `https://github.com/pytorch/pytorch/blob/master/torch/nn/cpp.py`. The first way is to visit https://emgithub.com/ and paste the URL. The other is to simply add "em" before "github.com". For this `cpp.py` file, you edit URL into `https://emgithub.com/pytorch/pytorch/blob/master/torch/nn/cpp.py`, then press Enter.

![](https://img.yusanshi.com/upload/20200301135039426771.gif)

## TODO

- [x] Support more styles
- [x] Check input
- [x] Show spinner while loading
- [x] Add metadata
- [x] Line count
- [x] Remember options using localStorage
- [ ] Different styles in one page
- [ ] Code slice

PR is always welcomed.

## Credits
- [Highlight.js](https://github.com/highlightjs/highlight.js/) - Javascript syntax highlighter;
- [highlightjs-line-numbers.js](https://github.com/wcoder/highlightjs-line-numbers.js) - Highlight.js line numbers plugin;
- [PostScribe](https://github.com/krux/postscribe) - Asynchronously write javascript;
- Icons made by [Vectors Market](https://www.flaticon.com/authors/vectors-market) and [Dave Gandy](https://www.flaticon.com/authors/dave-gandy) from [www.flaticon.com](https://www.flaticon.com/);
- Loading animation by [Loading.io](https://loading.io/);
- CSS style based on [GitHub syntax theme generators](https://github.com/primer/github-syntax-theme-generator);
- [GitHub Corners](https://github.com/tholman/github-corners).
