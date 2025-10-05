(function trackUserActivity() {
  function getTimestamp() {
    return new Date().toISOString();
  }

  function getElementType(el) {
    if (!el) return "unknown";
    const tag = el.tagName?.toLowerCase() || "unknown";
    if (tag === "img") return "image";
    if (tag === "select") return "dropdown";
    if (tag === "button") return "button";
    if (tag === "input") return `${el.type || "input"} field`;
    if (tag === "a") return "link";
    if (tag === "textarea") return "text area";
    if (el.isContentEditable) return "editable text";
    if (["p", "span", "div"].includes(tag)) return "text";
    return tag;
  }

  document.addEventListener("click", (e) => {
    const info = {
      timestamp: getTimestamp(),
      type_of_event: "click",
      event_object: getElementType(e.target),
      element_details: e.target.outerHTML.slice(0, 100) + "..."
    };
    console.log(info);
  });

  function logPageView(reason = "page_load") {
    const info = {
      timestamp: getTimestamp(),
      type_of_event: "view",
      event_object: "document",
      reason
    };
    console.log(info);
  }

  window.addEventListener("load", () => logPageView("page_load"));

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) logPageView("tab_focus");
  });
})();

