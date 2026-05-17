gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Executa assim que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  const preloaderText = document.querySelector(".preloader-text");
  const preloader = document.getElementById("preloader");
  const textos = document.querySelectorAll(".textoAnimado");
  
  let count = 0;

  // 1. SIMULAÇÃO DO CONTADOR DO PRELOADER
  const interval = setInterval(() => {
    // Se a página já carregou completamente, vai direto para 100
    if (document.readyState === "complete") {
      count = 100;
    } else {
      count += Math.random() * 0.01;
    }

    if (count >= 100) {
      count = 100;
      clearInterval(interval);
      
      // Quando o contador chega a 100, chamamos a função que dispara a transição de saída e a entrada do site
      iniciarAnimacoesSubsequentes();
    }

    preloaderText.textContent = `${Math.floor(count)}%`;
  }, 40);

  // 2. SEQUÊNCIA DE ANIMAÇÕES
  function iniciarAnimacoesSubsequentes() {
    const tl = gsap.timeline({
      onComplete: () => {
        preloader.remove();
        ScrollTrigger.refresh();
      }
    });

    tl.to(preloader, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    tl.add(() => {
      textos.forEach((texto) => {
        const split = new SplitText(texto, { types: "lines, words, chars" });

        gsap.from(split.chars, {
          filter: "blur(20px)",
          opacity: 0,
          duration: 0.6,
          stagger: {
            each: 0.09,
            from: "random",
          },
          scrollTrigger: {
            trigger: ".hero",
            start: "top 80%",
            toggleActions: "play none restart none",
          },
        });
      });
    }, "-=0.9");
  }
});
