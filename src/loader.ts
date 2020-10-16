const defaultStyles: any = {
  border: "none !important",
  height: "100vh",
  width: "100vw",
  display: "block !important",
  visibility: "visible",
  background: "none transparent",
  opacity: 1,
};

interface IData {
  value: string;
}

interface IWidget {
  config: IData | null;
  iframe: HTMLIFrameElement | null;
  init: (config: IData) => void;
  setupListeners: () => void;
  createIframe: () => void;
  handleMessage: (event: MessageEvent) => void;
}

const Widget: IWidget = {
  iframe: null,
  config: null,
  init: function (config: IData) {
    this.config = config;
    this.createIframe();
  },

  createIframe: function () {
    this.iframe = document.createElement("iframe");
    let styles = "";
    for (let key in defaultStyles) {
      styles += key + ": " + defaultStyles[key] + ";";
    }
    this.iframe.setAttribute("style", styles);
    this.iframe.src = "http://localhost:9000";
    this.iframe.referrerPolicy = "origin";
    document.body.appendChild(this.iframe);
    this.setupListeners();
  },

  setupListeners: function () {
    window.addEventListener("message", this.handleMessage.bind(this));
  },
  
  handleMessage: function (e) {
    e.preventDefault();
    if (!e.data || typeof e.data !== "string") return;
    let data = JSON.parse(e.data);
    switch (data.action) {
      case "init": {
        if (this.iframe) {
          this.iframe.contentWindow?.postMessage(
            JSON.stringify(this.config),
            "*"
          );
        }
        break;
      }
      default:
        break;
    }
  },
};

export default Widget;
