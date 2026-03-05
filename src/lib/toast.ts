// Toast notification utility to replace sonner
// This creates a simple toast system that works without external dependencies

type ToastType = "success" | "error" | "info";

interface ToastOptions {
  duration?: number;
}

class ToastManager {
  private container: HTMLDivElement | null = null;

  private ensureContainer() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private show(message: string, type: ToastType, options: ToastOptions = {}) {
    const container = this.ensureContainer();
    const duration = options.duration || 3000;

    const toast = document.createElement("div");
    toast.style.cssText = `
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
      max-width: 300px;
      word-wrap: break-word;
    `;

    const colors = {
      success: "background: #10b981; color: white;",
      error: "background: #ef4444; color: white;",
      info: "background: #3b82f6; color: white;",
    };

    toast.style.cssText += colors[type];
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease-in";
      setTimeout(() => {
        container.removeChild(toast);
      }, 300);
    }, duration);
  }

  success(message: string, options?: ToastOptions) {
    this.show(message, "success", options);
  }

  error(message: string, options?: ToastOptions) {
    this.show(message, "error", options);
  }

  info(message: string, options?: ToastOptions) {
    this.show(message, "info", options);
  }
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

export const toast = new ToastManager();
