
<section class="hidden w-full h-smscreen md:h-screen bg-pink-600/30 fixed top-0 left-0">
    <button on:click={handleMenuVisible} class="hidden md:block px-2 py-0.5 bg-zinc-200/40 hover:bg-zinc-200/70 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70 backdrop-blur- focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full absolute top-1 left-[45%] z-1">
      <i transition:slide class="icon icon-ic_fluent_re_order_dots_vertical_20_regular flex text-2xl"/>
    </button>
    <!-- <Carousel.Previous class="absolute top-2/4 left-4" />
    <Carousel.Next class="absolute top-2/4 right-0" /> -->
    {#if prevPage !== 0}
      <a href={`#${prevPage}`} on:click={()=> currentPageNumber-- } class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none">
        <section class="w-full h-full bg-amber-50050">
          <!-- prev: {prevPage} -->
        </section>
      </a>
    {/if}

    {#if isMenuVisible}
      <section transition:slide class="w-full h-full bg-green-500/50">
        where {currentPageNumber}
      </section>
    {/if}

    {#if nextPage <= listOfImages.length}
      <a href={`#${nextPage}`} on:click={()=> currentPageNumber++ } class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none">
        <section class="w-full h-full bg-amber-50050">
          <!-- next: {nextPage} -->
        </section>
      </a>
    {/if}
  </section>