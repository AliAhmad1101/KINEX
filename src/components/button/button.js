console.log("KINEX button loaded");

export function Button(selector, options = {}) {

    const button = document.querySelector(selector);

    if (!button) {
        console.error("KINEX Button: Element not found");
        return;
    }


    const {
        variant = "primary"
    } = options;


    button.classList.add(
        "kinex-button",
        `kinex-${variant}`
    );


    if (variant === "disabled") {
        button.disabled = true;
    }
    console.log("Button function executed");

}