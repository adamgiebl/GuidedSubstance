class Link extends HTMLElement {
  listener() {
    console.log(this.getAttribute("to"));
    window.router.routeTo(this.getAttribute("to"), this.getAttribute("item"));
  }
  constructor() {
    super();
    this.addEventListener("click", this.listener);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.listener);
  }
}

customElements.define("hyper-link", Link);

const clearContent = () => {
  document.querySelector("#content").innerHTML = "";
};

export const createRoutes = (config) => {
  const loadContent = (id, name) => {
    name ? config[id](name) : config[id]();
  };

  const routeTo = (id, name) => {
    document.title = name ? `${id}/${name}` : id;
    clearContent();
    loadContent(id, name);
    window.history.pushState({ id }, `${id}`, ``);
  };

  window.addEventListener("popstate", (event) => {
    loadContent(event.state.id);
  });

  window.router = { routeTo };

  return routeTo;
};
