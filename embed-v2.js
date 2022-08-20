(() => {
  const sourceURL = new URL(document.currentScript.src);
  const params = sourceURL.searchParams;
  const target = new URL(params.get("target"));
  const type = params.get("type") || 'code';
  const style = params.get("style");
  const styleClassName = `hljs-style-${style.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const lightStyles = ['default', 'a11y-light', 'arduino-light', 'ascetic', 'atom-one-light', 'brown-paper', 'color-brewer', 'docco', 'foundation', 'github', 'googlecode', 'gradient-light', 'grayscale', 'idea', 'intellij-light', 'isbl-editor-light', 'kimbie-light', 'lightfair', 'magula', 'mono-blue', 'nnfx-light', 'panda-syntax-light', 'paraiso-light', 'purebasic', 'qtcreator-light', 'routeros', 'school-book', 'stackoverflow-light', 'tokyo-night-light', 'vs', 'xcode', 'base16/atelier-cave-light', 'base16/atelier-dune-light', 'base16/atelier-estuary-light', 'base16/atelier-forest-light', 'base16/atelier-heath-light', 'base16/atelier-lakeside-light', 'base16/atelier-plateau-light', 'base16/atelier-savanna-light', 'base16/atelier-seaside-light', 'base16/atelier-sulphurpool-light', 'base16/brush-trees', 'base16/classic-light', 'base16/cupcake', 'base16/cupertino', 'base16/default-light', 'base16/dirtysea', 'base16/edge-light', 'base16/equilibrium-gray-light', 'base16/equilibrium-light', 'base16/fruit-soda', 'base16/github', 'base16/google-light', 'base16/grayscale-light', 'base16/gruvbox-light-hard', 'base16/gruvbox-light-medium', 'base16/gruvbox-light-soft', 'base16/harmonic16-light', 'base16/heetch-light', 'base16/horizon-light', 'base16/humanoid-light', 'base16/ia-light', 'base16/material-lighter', 'base16/mexico-light', 'base16/one-light', 'base16/papercolor-light', 'base16/ros-pine-dawn', 'base16/sagelight', 'base16/shapeshifter', 'base16/silk-light', 'base16/solar-flare-light', 'base16/solarized-light', 'base16/summerfruit-light', 'base16/synth-midnight-terminal-light', 'base16/tomorrow', 'base16/unikitty-light', 'base16/windows-10-light', 'base16/windows-95-light', 'base16/windows-high-contrast-light', 'base16/windows-nt-light'];
  const isDarkStyle = !lightStyles.includes(style) && type === 'code';
  const showBorder = params.get("showBorder") === "on";
  const showLineNumbers = params.get("showLineNumbers") === "on";
  const showFileMeta = params.get("showFileMeta") === "on";
  const showFullPath = params.get("showFullPath") === "on";
  const showCopy = params.get("showCopy") === "on";
  const fetchFromJsDelivr = params.get("fetchFromJsDelivr") === "on";
  const lineSplit = target.hash.split("-");
  const startLine = target.hash !== "" && lineSplit[0].replace("#L", "") || -1;
  const endLine = target.hash !== "" && lineSplit.length > 1 && lineSplit[1].replace("L", "") || startLine;
  const tabSize = target.searchParams.get("ts") || 8;
  const pathSplit = target.pathname.split("/");
  const user = pathSplit[1];
  const repository = pathSplit[2];
  const branch = pathSplit[4];
  const fileFullPath = pathSplit.slice(5, pathSplit.length).join("/");
  const fileExtension = fileFullPath.split('.').length > 1 ? fileFullPath.split('.').pop() : 'txt';
  const fileURL = target.href;
  const serviceProvider = sourceURL.origin;
  const rawFileURL = fetchFromJsDelivr
    ? `https://cdn.jsdelivr.net/gh/${user}/${repository}@${branch}/${fileFullPath}`
    : `https://raw.githubusercontent.com/${user}/${repository}/${branch}/${fileFullPath}`;

  const containerId = Math.random().toString(36).substring(2);
  document.currentScript.insertAdjacentHTML(
    'afterend',
    `

<style>
  .lds-ring {
    margin: 2rem auto;
    position: relative;
    width: 60px;
    height: 60px
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 48px;
    height: 48px;
    margin: 6px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #888 transparent transparent transparent
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -.45s
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -.3s
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -.15s
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg)
    }

    100% {
      transform: rotate(360deg)
    }
  }
</style>

<style>
  .emgithub-file {
    border-radius: 6px;
    overflow: hidden;
    margin: 1em 0;
  }

  .emgithub-file-light {
    border: 1px solid #ccc;
  }

  .emgithub-file-dark {
    border: 1px solid #555;
  }


  .emgithub-file .file-meta {
    padding: 10px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }

  .emgithub-file .file-meta-light {
    color: #586069;
    background-color: #f7f7f7;
    border-top: 1px solid #ccc;
  }

  .emgithub-file .file-meta-dark {
    color: #f7f7f7;
    background-color: #586069;
    border-top: 1px solid #555;
  }

  .emgithub-file .file-meta a {
    font-weight: 600;
    text-decoration: none;
    border: 0;
  }

  .emgithub-file .file-meta-light a {
    color: #666;
  }

  .emgithub-file .file-meta-dark a {
    color: #fff;
  }

  /* hide content for small device */
  @media (max-width: 575.98px) {
    .emgithub-file .hide-in-phone {
      display: none;
    }
  }

  .emgithub-file .code-area {
    position: relative;
  }

  .emgithub-file .copy-btn {
    display: none;
    border-radius: 3px;
    font: bold 13px monospace;
    text-decoration: none;
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 0.4rem;
    padding: 0.3rem;
  }

  .emgithub-file:hover .copy-btn {
    display: block;
  }

  .emgithub-file .copy-btn-light {
    color: #586069;
    background-color: #f7f7f7;
    border: 1px solid #ccc;
  }

  .emgithub-file .copy-btn-dark {
    color: #f7f7f7;
    background-color: #586069;
    border: 1px solid #555;
  }

  .emgithub-file .copy-btn-light:hover {
    color: #f7f7f7;
    background-color: #586069;
  }

  .emgithub-file .copy-btn-dark:hover {
    color: #586069;
    background-color: #f7f7f7;
  }

  .emgithub-file .copy-btn-light:active {
    /* darken #586069 by 20% https://www.cssfontstack.com/oldsites/hexcolortool/ */
    background-color: #252d36;
  }

  .emgithub-file .copy-btn-dark:active {
    /* darken #f7f7f7 by 20% */
    background-color: #c4c4c4;
  }

  .emgithub-file pre {
    margin: 0;
    padding: 0;
    tab-size: ${tabSize};
  }

  .emgithub-file .hljs-ln-numbers {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    text-align: right;
    color: #aaa;
    vertical-align: top;
  }

  .emgithub-file td.hljs-ln-numbers {
    padding-right: 1rem;
  }

  .emgithub-file td.hljs-ln-line {
    line-height: 21px;
    font-size: 12px;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    border: 0;
  }

  .emgithub-file table.hljs-ln {
    border: 0;
    margin: 0;
  }

  .emgithub-file pre code.hljs {
    padding: 0.8em;
  }

  .emgithub-file .hide-line-numbers .hljs-ln-numbers {
    display: none;
  }

  .emgithub-file .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .emgithub-file .markdown-body {
      padding: 15px;
    }
  }
</style>


<div id="${containerId}" class="emgithub-container">
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>

  <div class="emgithub-file emgithub-file-${isDarkStyle ? 'dark' : 'light'}"
    style="display:none;${showBorder ? '' : 'border:0'}">
    <div class="file-data ${styleClassName}">
      ${type === 'code' ? `<div class="code-area">
        ${showCopy ? `<a class="copy-btn copy-btn-${isDarkStyle ? 'dark' : 'light'}" href="javascript:void(0)">Copy</a>`
        : ''}
        <pre><code class="${fileExtension} ${showLineNumbers ? '' : 'hide-line-numbers'}"></code></pre>
      </div>`: ''}

      ${type === 'markdown' || type === 'ipynb' ? `
      <div class="html-area markdown-body"></div>` : ''}

    </div>

    ${showFileMeta ? `<div class="file-meta file-meta-${isDarkStyle ? 'dark' : 'light'}"
      style="${showBorder ? '' : 'border:0'}">
      <a target="_blank" href="${rawFileURL}" style="float:right">view raw</a>
      <a target="_blank" href="${fileURL}">${showFullPath ? fileFullPath : pathSplit[pathSplit.length - 1]}</a>
      delivered <span class="hide-in-phone">with ❤ </span>by <a target="_blank" href="${serviceProvider}">emgithub</a>
    </div>`: ''
    }

  </div>

</div>

`);


  const promises = [];
  const fetchFile = fetch(rawFileURL).then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      return Promise.reject(`${response.status}\nFailed to download ${rawFileURL}`);
    }
  });
  promises.push(fetchFile);


  // Loading the external libraries
  const HLJSURL = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/highlight.min.js";
  const HLJSNumURL = "https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.8.0/dist/highlightjs-line-numbers.min.js";
  // Always use hljs-num even if showLineNumbers is false for a consistent display
  // hljs-num should be loaded only after hljs is loaded
  const loadHLJSNum = (typeof hljs != "undefined" && typeof hljs.highlightElement != "undefined" ? Promise.resolve() : loadScript(HLJSURL))
    .then(() => (typeof hljs.lineNumbersBlock != "undefined" ? Promise.resolve() : loadScript(HLJSNumURL)));
  const loadHLJSStyle = fetch(`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/${style}.min.css`)
    .then((response) => response.text())
    .then((text) => {
      const styleElement = document.createElement('style');
      styleElement.textContent = scopeCss(text, '.' + styleClassName);
      document.head.appendChild(styleElement);
    });

  promises.push(loadHLJSNum);
  promises.push(loadHLJSStyle);

  if (type === 'markdown' || type === 'ipynb') {
    const loadMarked = typeof marked != "undefined" ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/npm/marked@4.0.18/marked.min.js');
    const loadMarkdownStyle = fetch('https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@5.1.0/github-markdown-light.min.css')
      .then((response) => response.text())
      .then((text) => {
        const styleElement = document.createElement('style');
        styleElement.textContent = text;
        document.head.appendChild(styleElement);
      });
    promises.push(loadMarked);
    promises.push(loadMarkdownStyle);

    if (type === 'ipynb') {
      const loadAnsiUp = typeof AnsiUp != "undefined" ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/gh/drudru/ansi_up@5.1.0/ansi_up.min.js');
      const loadNotebookjs = Promise.all([loadMarked, loadAnsiUp])
        .then(() => (typeof nb != "undefined" ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/gh/jsvine/notebookjs@0.6.7/notebook.min.js')))
        .then(() => {
          nb.markdown = marked.parse;
          nb.ansi = new AnsiUp().ansi_to_html;
        });
      promises.push(loadNotebookjs);
    }
  }

  // Do the happy embedding
  Promise.allSettled(promises).then((result) => {
    const targetDiv = document.getElementById(containerId);
    const fetchSuccess = result[0].status === "fulfilled";

    if (type === 'code') {
      let codeText;
      if (fetchSuccess) {
        codeText = result[0].value;
        if (codeText[codeText.length - 1] === "\n") {
          // First remove the ending newline
          codeText = codeText.slice(0, -1);
        }
        if (startLine > 0) {
          codeTextSplit = codeText.split("\n");
          codeText = codeTextSplit.slice(startLine - 1, endLine).join("\n");
        }
        // Then add the newline back
        codeText = codeText + "\n";
      } else {
        codeText = result[0].reason;
      }

      const codeTag = targetDiv.querySelector("code");
      codeTag.textContent = codeText;

      if (showCopy) {
        targetDiv.querySelector(".copy-btn").addEventListener('click', function (e) {
          e.preventDefault();
          e.cancelBubble = true;
          copyTextToClipboard(codeText);
        });
      }

      hljs.highlightElement(codeTag);
      hljs.lineNumbersBlock(codeTag, {
        singleLine: true,
        startFrom: (startLine > 0 && fetchSuccess) ? Number.parseInt(startLine) : 1
      });

    } else if (type === 'markdown') {
      targetDiv.querySelector(".html-area").innerHTML = fetchSuccess ? marked.parse(result[0].value) : result[0].reason;
      // TODO: relative path of files (img, etc...)
    } else if (type === 'ipynb') {
      try {
        if (fetchSuccess) {
          const notebook = nb.parse(JSON.parse(result[0].value));
          const rendered = notebook.render();
          targetDiv.querySelector(".html-area").appendChild(rendered);
        } else {
          throw result[0].reason;
        }
      } catch (error) {
        // catch either the file downloading error or notebook parsing error
        targetDiv.querySelector(".html-area").innerText = error.toString();
      }
    }

    if (type === 'markdown' || type === 'ipynb') {
      targetDiv.querySelectorAll("code").forEach(codeTag => {
        hljs.highlightElement(codeTag);
      });
    }

    targetDiv.querySelector(".lds-ring").style.display = "none";
    targetDiv.querySelector(".emgithub-file").style.display = "block";
  });

})();



function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed"; //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('fallbackCopyTextToClipboard: Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);
}

function scopeCss(styleText, scopeSelector) {
  // Limit the scope of css by prepending a selector in each rule
  // based on https://stackoverflow.com/questions/3326494/parsing-css-in-javascript-jquery

  const doc = document.implementation.createHTMLDocument("");
  const styleElement = document.createElement("style");
  styleElement.textContent = styleText;
  doc.head.appendChild(styleElement);

  const rules = [];
  for (const rule of styleElement.sheet.cssRules) {
    if (rule.constructor.name === 'CSSStyleRule') {
      const cssText = rule.cssText;
      const delimiterIndex = cssText.indexOf('{');
      const cssSelector = cssText.slice(0, delimiterIndex);
      const cssBody = cssText.slice(delimiterIndex);
      const cssSelectorPrepended = cssSelector.split(',').map(s => `${scopeSelector} ${s.trim()}`).join(',');
      rules.push(`${cssSelectorPrepended} ${cssBody}`);
    } else if (rule.constructor.name === 'CSSMediaRule') {
      throw "NotImplementedError";
    } else {
      throw "NotImplementedError";
    }
  }
  return rules.join('\n');
}