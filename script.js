(() => {
  "use strict";
  const config = window.PORTFOLIO_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);

  // Theme toggle
  const themeButton = $("#theme-toggle");
  const updateThemeButton = () => {
    const isDark = document.documentElement.dataset.theme !== "light";
    $(".theme-icon").textContent = isDark ? "☼" : "☾";
    $(".theme-label").textContent = isDark ? "Light mode" : "Dark mode";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  };
  updateThemeButton();
  themeButton.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("ronesh-theme", next); } catch (_) {}
    updateThemeButton();
  });

  // Mobile navigation
  const menuButton = $("#menu-toggle");
  const nav = $("#nav-links");
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }));

  // Footer links: only show socials that have actually been configured.
  const socialContainer = $("#social-links");
  const socialSvg = {
    github: '<path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.31-3.75-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.77 1.93 3.65 1.47.1-.72.4-1.21.72-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
    linkedin: '<path d="M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h3v12H3zM10 9h3v1.7c.5-1 1.6-2 3.5-2 3 0 4.5 1.9 4.5 5.3V21h-3v-6.2c0-1.8-.6-3-2.2-3-1.7 0-2.8 1.2-2.8 3.3V21h-3z"/>',
    facebook: '<path d="M13.5 21v-8h2.8l.4-3.1h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.8v8z"/>',
    youtube: '<path d="M22 7.2a2.8 2.8 0 0 0-2-2C18.3 4.7 12 4.7 12 4.7s-6.3 0-8 .5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.5 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.5 8 .5 8 .5s6.3 0 8-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.8 29 29 0 0 0-.5-4.8ZM9.8 15.5v-7l6 3.5z"/>',
    x: '<path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3L12 14.8 6.6 21H3.5l7.3-8.4L3 3h6.5l4.4 5.8Zm-1.1 16h1.7L8.4 4.9H6.6Z"/>'
  };
  const socialNames = {github:"GitHub",instagram:"Instagram",linkedin:"LinkedIn",facebook:"Facebook",youtube:"YouTube",x:"X"};
  socialContainer.innerHTML = "";
  Object.entries(config.socialLinks || {}).forEach(([key, url]) => {
    if (!url || !/^https:\/\/(?!$)/i.test(url) || !socialSvg[key]) return;
    const link = document.createElement("a");
    link.className = "social-link";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", socialNames[key] + " (opens in a new tab)");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = socialSvg[key];
    link.appendChild(svg);
    socialContainer.appendChild(link);
  });
  const email = config.email || "maharjanronesh7@gmail.com";
  $("#contact-email-link").href = "mailto:" + email;
  $("#contact-email-text").textContent = email;
  $("#current-year").textContent = new Date().getFullYear();

  // Age: never embed the birth date in public source. Requires optional Worker.
  const ageValue = $("#age-value"), ageCaption = $("#age-caption"), ageNote = $("#age-note");
  if (config.ageEndpoint) {
    fetch(config.ageEndpoint, {headers: {"Accept":"application/json"}})
      .then(r => { if (!r.ok) throw new Error("Age service unavailable"); return r.json(); })
      .then(data => {
        if (Number.isInteger(data.age) && data.age >= 0 && data.age < 130) {
          ageValue.textContent = String(data.age);
          ageCaption.textContent = "years old";
          ageNote.textContent = "Age is calculated by a private server endpoint; date of birth is not published in this website's code.";
        } else throw new Error("Invalid age response");
      })
      .catch(() => { ageValue.textContent = "Curious"; ageCaption.textContent = "Always learning"; ageNote.textContent = "Age service isn't configured or is temporarily unavailable."; });
  }

  // Education progress is an estimate only when a real start date is supplied.
  const edu = config.education || {};
  const status = $("#education-status"), bar = $("#education-progress"), caption = $("#education-caption");
  if (edu.semesterStartDate && /^\d{4}-\d{2}-\d{2}$/.test(edu.semesterStartDate) && Number(edu.semesterDurationMonths) > 0) {
    const start = new Date(edu.semesterStartDate + "T00:00:00");
    const end = new Date(start);
    end.setMonth(end.getMonth() + Number(edu.semesterDurationMonths));
    const now = new Date();
    const pct = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
    status.textContent = (edu.currentSemester || "Current semester") + " at " + (edu.institution || "your institution");
    bar.style.width = pct.toFixed(1) + "%";
    caption.textContent = pct >= 100 ? "Estimated semester duration has passed — update your semester details." : Math.round(pct) + "% of the configured semester duration elapsed (estimate).";
  } else {
    status.textContent = (edu.currentSemester || "Current semester") + " · " + (edu.institution || "institution not specified");
    bar.style.width = "8%";
    caption.textContent = "Add the actual semester start date in config.js to show an estimated progress bar.";
  }

  // Contact form: explicit failure if provider has not been configured.
  const form = $("#contact-form"), formStatus = $("#form-status"), submitButton = form.querySelector("button[type=submit]");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (form.querySelector('[name="_gotcha"]').value) return;
    if (!config.formspreeEndpoint || !/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(config.formspreeEndpoint)) {
      formStatus.textContent = "Not sent yet: configure your Formspree endpoint in config.js first. You can still email me using the email link above.";
      formStatus.classList.add("error");
      return;
    }
    const original = submitButton.querySelector(".submit-label").textContent;
    submitButton.disabled = true;
    submitButton.querySelector(".submit-label").textContent = "Sending…";
    formStatus.classList.remove("error", "success");
    formStatus.textContent = "Sending your message…";
    try {
      const data = new FormData(form);
      data.delete("_gotcha");
      const response = await fetch(config.formspreeEndpoint, {method:"POST", body:data, headers:{"Accept":"application/json"}});
      if (!response.ok) throw new Error("Message could not be delivered. Please try the email link instead.");
      form.reset();
      formStatus.textContent = "Message submitted. Please note: delivery depends on your Formspree form being verified and configured correctly.";
      formStatus.classList.add("success");
    } catch (err) {
      formStatus.textContent = err.message || "Something went wrong. Please use the email link above.";
      formStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.querySelector(".submit-label").textContent = original;
    }
  });

  // Gentle reveal animation, with reduced-motion support.
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealTargets = document.querySelectorAll(".section-heading, .about-copy, .stat-card, .skill-card, .project-card, .timeline-item, .education-config, .contact-form, .contact-details");
    revealTargets.forEach(el => el.classList.add("reveal"));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
    }), {threshold:0.12});
    revealTargets.forEach(el => observer.observe(el));
  }
})();
