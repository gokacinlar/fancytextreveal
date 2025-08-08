import type { TargetText, Options } from "types";
import "./scss/index.scss";

class FancyTextReveal {
    text: TargetText;
    animate: boolean;
    animationDuration: number;
    animationDelay: number;

    private targetElement: HTMLElement;
    private static readonly DEFAULT_VALUES = {
        text: "Lorem Ipsum",
        animate: true,
        animationDuration: 2500,
        animationDelay: 1000
    } as const;

    constructor(targetElement: HTMLElement, options: Partial<Options> = {}) {
        if (!(targetElement instanceof HTMLElement)) {
            throw new Error("targetElement must be an HTMLElement.");
        }

        this.targetElement = targetElement;

        const {
            text = FancyTextReveal.DEFAULT_VALUES.text,
            animate = FancyTextReveal.DEFAULT_VALUES.animate,
            animationDuration = FancyTextReveal.DEFAULT_VALUES.animationDuration,
            animationDelay = FancyTextReveal.DEFAULT_VALUES.animationDelay
        } = options;

        this.text = text;
        this.animate = animate;
        this.animationDuration = Math.max(animationDuration, 1000);
        this.animationDelay = Math.max(animationDelay, 1000);
    }

    private type(text: TargetText): void {
        if (typeof text !== "string") {
            console.error("Input must be a string.");
            return;
        }

        this.targetElement.textContent = "";
        const speed = this.animationDuration / text.length;

        try {
            for (let i = 0; i < text.length; i++) {
                setTimeout(() => {
                    const charSpan = document.createElement("span") as HTMLSpanElement;
                    charSpan.textContent = text.charAt(i);
                    charSpan.className = "applyAnim";

                    this.targetElement.appendChild(charSpan);
                    charSpan.classList.remove("applyAnim");
                }, speed * i);
            }
        } catch (error: unknown) {
            console.error("Error while typing text:", error);
        }
    }

    private animateText(target: TargetText): void {
        this.type(target);
    }

    public init(): void {
        if (this.animate) {
            this.animateText(this.text);
        } else {
            this.targetElement.textContent = this.text;
        }
    }
}

export default FancyTextReveal;