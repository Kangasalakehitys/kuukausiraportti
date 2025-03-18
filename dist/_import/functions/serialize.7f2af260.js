export const serialize = {

    serialize(svg) {
      svg = svg.cloneNode(true);
      const fragment = window.location.href + "#";
      const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT);
      while (walker.nextNode()) {
        for (const attr of walker.currentNode.attributes) {
          if (attr.value.includes(fragment)) {
            attr.value = attr.value.replace(fragment, "#");
          }
        }
      }
      svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
      svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
      const serializer = new window.XMLSerializer;
      const string = serializer.serializeToString(svg);
      return new Blob([string], {type: "image/svg+xml"});
    }
}
