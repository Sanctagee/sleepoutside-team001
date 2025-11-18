// Dados mock de alerts
const mockAlerts = [
  {
    message: "🎉 Special Offer! Get 20% off on all tents this weekend!",
    background: "#4CAF50",
    color: "white",
  },
  {
    message: "🚚 Free shipping on orders over $100!",
    background: "#2196F3",
    color: "white",
  },
];

export default class Alert {
  constructor() {
    this.alerts = [];
  }

  async init() {
    try {
      // Primeiro tentar carregar do arquivo
      const response = await fetch("../json/alert.json");

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          this.alerts = await response.json();
          console.log("✅ Loaded alerts from JSON file");
        } else {
          throw new Error("Alert file is not JSON");
        }
      } else {
        throw new Error("Alert file not found");
      }
    } catch (error) {
      console.log("📝 Using mock alerts:", error.message);
      // Fallback para dados mock
      this.alerts = mockAlerts;
    }

    // Renderizar se houver alerts
    if (this.alerts && this.alerts.length > 0) {
      this.renderAlerts();
    }
  }

  renderAlerts() {
    const alertSection = document.createElement("section");
    alertSection.className = "alert-list";

    this.alerts.forEach((alert) => {
      const alertElement = document.createElement("p");
      alertElement.textContent = alert.message;
      alertElement.style.backgroundColor = alert.background;
      alertElement.style.color = alert.color;
      alertElement.style.padding = "1rem";
      alertElement.style.margin = "0.5rem 0";
      alertElement.style.borderRadius = "4px";
      alertElement.style.textAlign = "center";
      alertElement.style.fontWeight = "bold";

      alertSection.appendChild(alertElement);
    });

    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(alertSection);
    }

    console.log(`✅ Displayed ${this.alerts.length} alert(s)`);
  }
}
