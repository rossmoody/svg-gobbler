(function() {
  var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

  window.URL = (window.URL || window.webkitURL);

  var body = document.body,
      emptySvg;

  var prefix = {
    xmlns: "http://www.w3.org/2000/xmlns/",
    xlink: "http://www.w3.org/1999/xlink",
    svg: "http://www.w3.org/2000/svg"
  };

  initialize();

  function initialize() {
    var documents = [window.document],
        SVGSources = [];
        iframes = document.querySelectorAll("iframe"),
        objects = document.querySelectorAll("object");

    // add empty svg element
    var emptySvg = window.document.createElementNS(prefix.svg, 'svg');
    window.document.body.appendChild(emptySvg);
    var emptySvgDeclarationComputed = getComputedStyle(emptySvg);

    [].forEach.call(iframes, function(el) {
      try {
        if (el.contentDocument) {
          documents.push(el.contentDocument);
        }
      } catch(err) {
        console.log(err);
      }
    });

    [].forEach.call(objects, function(el) {
      try {
        if (el.contentDocument) {
          documents.push(el.contentDocument);
        }
      } catch(err) {
        console.log(err)
      }
    });

    documents.forEach(function(doc) {
      var newSources = getSources(doc, emptySvgDeclarationComputed);
      // because of prototype on NYT pages
      for (var i = 0; i < newSources.length; i++) {
        SVGSources.push(newSources[i]);
      }
    });
    if (SVGSources.length > 1) {
      createPopover(SVGSources);
    } else if (SVGSources.length > 0) {
      download(SVGSources[0]);
    } else {
      alert("The Crowbar couldn’t find any SVG nodes.");
    }

  }

  function createPopover(sources) {
    cleanup();

    sources.forEach(function(s1) {
      sources.forEach(function(s2) {
        if (s1 !== s2) {
          if ((Math.abs(s1.top - s2.top) < 38) && (Math.abs(s1.left - s2.left) < 38)) {
            s2.top += 38;
            s2.left += 38;
          }
        }
      });
    });

    var buttonsContainer = document.createElement("div");
    body.appendChild(buttonsContainer);

    buttonsContainer.setAttribute("class", "svg-crowbar");
    buttonsContainer.style["z-index"] = 1e7;
    buttonsContainer.style["position"] = "absolute";
    buttonsContainer.style["top"] = 0;
    buttonsContainer.style["left"] = 0;



    var background = document.createElement("div");
    body.appendChild(background);

    background.setAttribute("class", "svg-crowbar");
    background.style["background"] = "rgba(255, 255, 255, 0.7)";
    background.style["position"] = "fixed";
    background.style["left"] = 0;
    background.style["top"] = 0;
    background.style["width"] = "100%";
    background.style["height"] = "100%";

    sources.forEach(function(d, i) {
      var buttonWrapper = document.createElement("div");
      buttonsContainer.appendChild(buttonWrapper);
      buttonWrapper.setAttribute("class", "svg-crowbar");
      buttonWrapper.style["position"] = "absolute";
      buttonWrapper.style["top"] = (d.top + document.body.scrollTop) + "px";
      buttonWrapper.style["left"] = (document.body.scrollLeft + d.left) + "px";
      buttonWrapper.style["padding"] = "4px";
      buttonWrapper.style["border-radius"] = "3px";
      buttonWrapper.style["color"] = "white";
      buttonWrapper.style["text-align"] = "center";
      buttonWrapper.style["font-family"] = "'Helvetica Neue'";
      buttonWrapper.style["background"] = "rgba(0, 0, 0, 0.8)";
      buttonWrapper.style["box-shadow"] = "0px 4px 18px rgba(0, 0, 0, 0.4)";
      buttonWrapper.style["cursor"] = "move";
      buttonWrapper.textContent =  "SVG #" + i + ": " + (d.id ? "#" + d.id : "") + (d.class ? "." + d.class : "");

      var button = document.createElement("button");
      buttonWrapper.appendChild(button);
      button.setAttribute("data-source-id", i);
      button.style["width"] = "150px";
      button.style["font-size"] = "12px";
      button.style["line-height"] = "1.4em";
      button.style["margin"] = "5px 0 0 0";
      button.textContent = "Download";

      button.onclick = function(el) {
        // console.log(el, d, i, sources)
        download(d);
      };

    });

  }

  function cleanup() {
    var crowbarElements = document.querySelectorAll(".svg-crowbar");

    [].forEach.call(crowbarElements, function(el) {
      el.parentNode.removeChild(el);
    });
  }


  function getSources(doc, emptySvgDeclarationComputed) {
    var svgInfo = [],
        svgs = doc.querySelectorAll("svg");

    [].forEach.call(svgs, function (svg) {

      svg.setAttribute("version", "1.1");

      // removing attributes so they aren't doubled up
      svg.removeAttribute("xmlns");
      svg.removeAttribute("xlink");

      // These are needed for the svg
      if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
        svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
      }

      if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
        svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
      }

      setInlineStyles(svg, emptySvgDeclarationComputed);

      var source = (new XMLSerializer()).serializeToString(svg);
      var rect = svg.getBoundingClientRect();
      svgInfo.push({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        class: svg.getAttribute("class"),
        id: svg.getAttribute("id"),
        name: svg.getAttribute("name"),
        childElementCount: svg.childElementCount,
        source: [doctype + source]
      });
    });
    return svgInfo;
  }

  function download(source) {
    var filename = "untitled";

    if (source.name) {
      filename = source.name;
    } else if (source.id) {
      filename = source.id;
    } else if (source.class) {
      filename = source.class;
    } else if (window.document.title) {
      filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    }

    var url = window.URL.createObjectURL(new Blob(source.source, { "type" : "text\/xml" }));

    var a = document.createElement("a");
    body.appendChild(a);
    a.setAttribute("class", "svg-crowbar");
    a.setAttribute("download", filename + ".svg");
    a.setAttribute("href", url);
    a.style["display"] = "none";
    a.click();

    setTimeout(function() {
      window.URL.revokeObjectURL(url);
    }, 10);
  }


  function setInlineStyles(svg, emptySvgDeclarationComputed) {

    function explicitlySetStyle (element) {
      var cSSStyleDeclarationComputed = getComputedStyle(element);
      var i, len, key, value;
      var computedStyleStr = "";
      for (i=0, len=cSSStyleDeclarationComputed.length; i<len; i++) {
        key=cSSStyleDeclarationComputed[i];
        value=cSSStyleDeclarationComputed.getPropertyValue(key);
        if (value!==emptySvgDeclarationComputed.getPropertyValue(key)) {
          computedStyleStr+=key+":"+value+";";
        }
      }
      element.setAttribute('style', computedStyleStr);
    }
    function traverse(obj){
      var tree = [];
      tree.push(obj);
      visit(obj);
      function visit(node) {
        if (node && node.hasChildNodes()) {
          var child = node.firstChild;
          while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT'){
              tree.push(child);
              visit(child);
            }
            child = child.nextSibling;
          }
        }
      }
      return tree;
    }
    // hardcode computed css styles inside svg
    var allElements = traverse(svg);
    var i = allElements.length;
    while (i--){
      explicitlySetStyle(allElements[i]);
    }
  }


})();