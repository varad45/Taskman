const sections = document.querySelectorAll(".scroll-section");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".benefitCard");
        cards.forEach((card, cardIndex) => {
          const svg = card.querySelector(".svg");
          const title = card.querySelector(".title");
          const text = card.querySelector(".text");
          const baseDelay = cardIndex * 400;
          setTimeout(() => svg.classList.add("visible"), baseDelay);
          setTimeout(() => title.classList.add("visible"), baseDelay + 150);
          setTimeout(() => text.classList.add("visible"), baseDelay + 300);
        });

        const bar = entry.target.querySelector(".whyBar");
        const ellipse = entry.target.querySelector(".whyEllipse");
        setTimeout(() => bar.classList.add("visible"), 0);
        setTimeout(() => ellipse.classList.add("visible"), 100);

        const whyCards = entry.target.querySelectorAll(".whyCard");
        whyCards.forEach((card, cardIndex) => {
          const baseDelay = cardIndex * 300 + 700;
          setTimeout(() => card.classList.add("visible"), baseDelay);
          setTimeout(() => card.classList.add("visible"), baseDelay + 150);
        });
        const textElements = entry.target.querySelectorAll(".why-description");
        const learnMoreArrow = document.querySelector(".arrow-icon");
        textElements.forEach((text, textIndex) => {
          const baseDelay = textIndex * 300 + 700;
          setTimeout(() => text.classList.add("visible"), baseDelay);
          setTimeout(() => text.classList.add("visible"), baseDelay + 150);
          setTimeout(
            () => learnMoreArrow.classList.add("visible"),
            baseDelay + 450,
          );
        });
        const finalShape = entry.target.querySelector(".final-shape");

        const finalInput = entry.target.querySelector(".final-email");
        setTimeout(() => finalShape.classList.add("visible"), 400);
        setTimeout(() => finalInput.classList.add("visible"), 400);

        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  },
);

sections.forEach((section) => observer.observe(section));

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("couponForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // console.log(e.target.companyEmail.value);
    const email = e.target.companyEmail.value;

    try {
      const res = await fetch("http://localhost:3000/api/send-coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        form.reset(); // clears inputs
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  });
});
