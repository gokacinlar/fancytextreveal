import FancyRevealText from "../src/app";

describe("FancyRevealText", () => {
    let targetElement: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = '<h1 id="text"></h1>';
        targetElement = document.getElementById("text")!;
    });

    test("Should display full text immediately if animate is false", () => {
        const instance = new FancyRevealText(targetElement, {
            text: "Static Text",
            animate: false
        });

        instance.init();
        expect(targetElement.textContent).toBe("Static Text");
    });

    test("Should start with empty content if animate is true", () => {
        const instance = new FancyRevealText(targetElement, {
            text: "Animated",
            animate: true,
            animationDuration: 2000,
            animationDelay: 100
        });

        instance.init();
        expect(targetElement.textContent).toBe("");
    });

    test("Should animate text after delay", async () => {
        jest.useFakeTimers();

        const instance = new FancyRevealText(targetElement, {
            text: "Hey!",
            animate: true,
            animationDuration: 300,
            animationDelay: 500
        });

        instance.init();

        jest.advanceTimersByTime(500);
        expect(targetElement.textContent).toBe("");

        jest.advanceTimersByTime(300);
        expect(targetElement.textContent).toBe("Hey!");

        jest.useRealTimers();
    });
});
