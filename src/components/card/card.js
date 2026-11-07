export function Card({
    variant = "default",
    title = "",
    description = "",
    image = "",
    action = "",
    children = ""
} = {}) {

    return `
        <article class="kinex-card kinex-card--${variant}">

            ${
                image
                ? `
                <div class="kinex-card__media">
                    <img 
                        src="${image}" 
                        alt="${title}"
                    />
                </div>
                `
                : ""
            }


            ${
                title
                ? `
                <h3 class="kinex-card__title">
                    ${title}
                </h3>
                `
                : ""
            }


            ${
                description
                ? `
                <p class="kinex-card__description">
                    ${description}
                </p>
                `
                : ""
            }


            ${children}


            ${
                action
                ? `
                <button class="kinex-card__action">
                    ${action.trim()}
                    ${
                        variant === "default"
                        ? '<span class="kinex-card__action-arrow" aria-hidden="true">→</span>'
                        : ""
                    }
                </button>
                `
                : ""
            }

        </article>
    `;
}