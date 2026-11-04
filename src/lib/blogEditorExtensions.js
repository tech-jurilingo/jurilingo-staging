import { Mark, Node } from "@tiptap/core";

// Lightweight local extensions avoid introducing new runtime dependencies.
export const BlogLink = Mark.create({
  name: "link",
  inclusive: false,
  addAttributes() {
    return {
      href: { default: null, parseHTML: element => element.getAttribute("href") },
      target: { default: "_blank", parseHTML: element => element.getAttribute("target") || "_blank" },
      rel: { default: "noopener noreferrer", parseHTML: element => element.getAttribute("rel") || "noopener noreferrer" },
    };
  },
  parseHTML() { return [{ tag: "a[href]" }]; },
  renderHTML({ HTMLAttributes }) {
    return ["a", { ...HTMLAttributes, target: "_blank", rel: "noopener noreferrer" }, 0];
  },
});

export const BlogImage = Node.create({
  name: "image",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: "" },
      title: { default: null },
    };
  },
  parseHTML() { return [{ tag: "img[src]" }]; },
  renderHTML({ HTMLAttributes }) {
    return ["img", { ...HTMLAttributes, class: "blog-content-image" }];
  },
});
