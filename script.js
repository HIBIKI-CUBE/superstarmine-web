onload = () => {
  const card_container = document.getElementsByClassName("card-container");
  const main_section_title = document.getElementsByClassName("main-section_title");
  const scroll_offset = [0, 0];
  const auto_scroll = [true, true];
  const distance = [1, 1]
  const time = [80, 100]
  let timer = [];

  for (let i = 0; i < card_container.length; i++) {
    card_container[i].onmouseover = () => auto_scroll[i] = false;
    card_container[i].ontouchend = () => auto_scroll[i] = false;
  }

  for (let i = 0; i < card_container.length; i++) {
    main_section_title[i].onclick = () => {
      auto_scroll[i] = true;
      scroll_offset[i] = card_container[i].scrollLeft;
    }
    main_section_title[i].ontouchend = () => {
      auto_scroll[i] = true;
      scroll_offset[i] = card_container[i].scrollLeft;
    }
    auto_scroller();
  }

  function auto_scroller() {
    for (let i = 0; i < card_container.length; i++) {
      timer[i] = setInterval(() => {
        if (auto_scroll[i]) {
          let before_scroll = card_container[i].scrollLeft;
          card_container[i].scrollTo({ left: scroll_offset[i] += distance[i], behavior: 'smooth' });
          if (card_container[i].scrollLeft == before_scroll) {
            if (card_container[i].scrollLeft == 0) {
              distance[i] = 1;
              time[i] = 100;
            } else {
              distance[i] = -100;
              time[i] = 1;
            }
            card_container[i].scrollTo({ left: scroll_offset[i] += distance[i], behavior: 'smooth' });
          }
        } else {
          clearInterval(timer[i]);
        }
      }, time[i]);
    }
  }

  auto_scroller();
}