<script lang="ts">
  // import type { PageData } from './$types';
  // export let data: PageData;
  import { flyAndScale, getRandomColor, removeNumbers, shuffle, titleCase, userId, cookUsername, removeWhitespace } from "$lib/utils";
  import dgData from "$lib/dgData.json";
  import Avatar from 'svelte-boring-avatars';

  import { Drawer } from 'vaul-svelte';
  import Metahead from "$lib/components/Metahead.svelte";
  import { fade, fly, slide } from "svelte/transition";
  import ThemeBtn from "$lib/components/ThemeBtn.svelte";
  import * as Card from "$lib/components/ui/card";
  import { metainfo } from "$lib/config";
  import ItemCardThree from "$lib/components/ItemCardThree.svelte";
  import Image from "$lib/components/Image.svelte";
  import CopyBtn from "$lib/components/CopyBtn.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import YoursTcitrogg from "$lib/components/YoursTcitrogg.svelte";
  import { toast } from "svelte-sonner";
  import { page } from "$app/stores";

  const cookRandomNumber = (pos: number) => Number(Math.random().toString()[pos])

  let whoiam = $page.url.searchParams.get("who")

  const joyboy = {
    name: "tcitrogg",
    // name: "Akagami Acaski",
    username: "rogge",
    fav_suffix: "el",
    icon: "ic_fluent_lasso_20_filled",
    invites: cookRandomNumber(3),
    level: cookRandomNumber(4)
  }

  let metaTitle = `Your Library`

  const cookUserProfile = ()=> {
    let userInfo = {
      name: `${cookUsername()}`,
      username: userId(),
      fav_suffix: userId().slice(0,3),
      icon: "ic_fluent_person_20_regular",
      invites: cookRandomNumber(5),
      level: cookRandomNumber(6),
      isPremium: false
    }
    if (!(whoiam === undefined || whoiam === null || whoiam === "joyboy")) {
      userInfo.name = whoiam
      userInfo.username = removeWhitespace(whoiam)
      userInfo.fav_suffix = shuffle(["hashira", "otaku", "kaizoku", "yonko", "senpai", "san", "dono", "sama", "kun", "chan", "uchiha", "bankai", "mana", "haki", "ki"])[0]
      // metaTitle = `${titleCase(userInfo.name.split(" ")[0])}'s Library`
    }
    return userInfo
  }
  
  let user = whoiam === "joyboy"
    ? joyboy
    : cookUserProfile()
  
  const handleLogout = ()=>{
    // alert(`(*) Switching Accounts`)
    whoiam = null
    toast("Switching Accounts...")
    user = cookUserProfile()
  }

  let userInviteMessage = `[${metainfo.short_name}] ${metainfo.avatar_prefix}${user.username}.${user.fav_suffix}: I levelled up to *${metainfo.levelling_prefix}${user.level}* Read with me on ${metainfo.title}, ${metainfo.caption}
  @ ${metainfo.url}`
  
  $: avatar_colors = user.username == metainfo.creator_shortname ? metainfo.color_band : Array.from({ length: 3 }, () => getRandomColor())

  $: isAboutDialogMinimised = false
  const handleAboutDialog = ()=>{
    isAboutDialogMinimised = !isAboutDialogMinimised
  }

</script>

<!-- This should be reactive and change the title
  for the page when the changes are made -->
<Metahead
  title={metaTitle}
  description={`${titleCase(user.name)}'s Library'`}
/>

<Nav/>

<section transition:slide={{duration:300}} class="w-full h-smscreen md:h-screen lg:px-10 md:px-4 md:py-2 flex relative gap-8">
  <section class="w-full lg:w-8/12 h-full overflow-y-auto flex flex-col gap-4 md:gap-5 snap snap-y snap-mandatory px-3 md:p-1 md:pt-3">

    <!-- Account -->
    <section class="w-full md:bg-zinc-100 md:dark:bg-zinc-900/60 rounded-lg py-5 md:p-4 flex justify-between items-center">
      <section class="flex items-center gap-3 md:py-3 px4">
        <section class="rounded-full relative bg-green-400">
          <!-- name={`${metainfo.avatar_prefix}${user.username}`} -->
          <Avatar
            name={`${metainfo.avatar_prefix}${user.name}`}
            size={55}
            square={false}
            colors={avatar_colors}
            variant={"beam"}
          />
          {#if whoiam === "joyboy"}
            <i class="icon icon-ic_fluent_circle_off_20_filled flex text-xl absolute -bottom-2 -right-1 rounded-full bg-zinc-50/70 dark:bg-zinc-950/70 md:bg-zinc-100/70 md:dark:bg-zinc-900/70 backdrop-blur-sm p-1 text-main"/>
          {:else if user.isPremium}
            <i class="icon icon-ic_fluent_checkmark_starburst_20_filled flex text-xl absolute -bottom-2 -right-1 rounded-full bg-zinc-50/70 dark:bg-zinc-950/70 md:bg-zinc-100/70 md:dark:bg-zinc-900/70 backdrop-blur-sm p-1 text-main"/>
          {/if}
        </section>
    
        <section class="flex flex-col -space-y-0.5">
          <h3 class="font-medium text-xl flex">
            <span>{user.name}</span>
            <span class="opacity-40">.{user.fav_suffix}</span>
          </h3>
          <h2 class="text-base text-main flex space-x-0">
            <span class="opacity-20">{metainfo.avatar_prefix}</span>
            <span class="font-semibold">{user.username}</span>
          </h2>
        </section>
      </section>

      <section class="">
        <button on:click={() => alert(`Level: ${user.level}`)} class="py-1 px-3 rounded-full hover:bg-zinc-200hover:bg-zinc-30080dark:hover:bg-zinc-800 dark:hover:bg-zinc-70080 ring-2 ring-transparent focus:ring-main/50 focus:outline-none flex items-center">

          <p class="flex">
            <span>{metainfo.levelling_prefix}</span>
            <span class="font-semibold text-2xl py-1px-3bg-main rounded-lg text-main">{user.level}</span>
          </p>
        </button>
      </section>
    
      <!-- <section class="w-full px-5">
        <hr class="border-zinc-200 dark:border-zinc-800 rounded-full">
      </section> -->
    </section>

    <!-- Sm-screen Readlist -->
    <section class="w-full rounded-lg bg-zinc-100dark:bg-zinc-900/60 flex lg:hidden flex-col gap-3">
      <section class="w-full flex items-center justify-between">
        <h3 class="gap-1 flex items-center">
          <i class="icon icon-ic_fluent_collections_20_regular flex text-2xl md:text-3xl"/>
          <span class="font-medium md:text-lg">Readlist</span>
        </h3>
        
        <a href={`#`} on:click={()=>toast("Coming Soon!")} title="Show all history" class="focus:ring-2 focus:outline-none focus:ring-main/70 relative rounded-lg opacity-70 hover:opacity-95 text-sm">
        + Show all</a>
      </section>

      <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 md:px-0">
        <section class="flex flex-nowrap gap-2 md:gap-3 snap-x snap-mandatory">
          {#each shuffle(dgData.books).slice(0, 10) as eachItem}
            <section class="inline-block w-24 lg:w-52">
              <a href={`/m/ts-${eachItem.id}`} title={`${eachItem.title}`} class="w-full h-full focus:ring-2 focus:outline-none focus:ring-main/70 flex flex-col gap-1 relative overflow-hidden rounded-lg">
                <section class={`w-full h-28 lg:h-60 overflow-hidden rounded-lg relative flex flex-col bg-zinc-100 dark:bg-zinc-900`}>
                  <Image
                    src={eachItem.thumbnail}
                  />
                    <!-- layout="constrained" -->
                </section>
                <h4 class="w-full text-sm text-ellipsis line-clamp-1">{eachItem.title}</h4>
              </a>
            </section>
          {:else}
            <section class="rounded-lg w-32 lg:w-60 h-36 lg:h-60 bg-zinc-300 dark:bg-zinc-700"/>
          {/each}
        </section>
      </section>
    </section>

    <!-- Downloads, Favourites, Liked Books & Data saver mode -->
    <section class="w-full md:bg-zinc-100 md:dark:bg-zinc-900/60 rounded-lg md:p-4 flex flex-col gap-2 justify-between">
      <!-- <a href='#' class="py-2 px-3 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-900 md:hover:bg-zinc-300 md:dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
        <i class="icon icon-ic_fluent_collections_20_regular flex text-2xl md:text-3xl"/>
        <p class="text-">Readlist</p>
      </a> -->
      <a href='#' on:click={()=>toast("Coming Soon!")} class="py-2 px-3 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-900 md:hover:bg-zinc-300 md:dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
        <i class="icon icon-ic_fluent_arrow_download_20_regular flex text-2xl md:text-3xl"/>
        <p class="text-">Downloads</p>
      </a>
      <a href='#' on:click={()=>toast("Coming Soon!")} class="py-2 px-3 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-900 md:hover:bg-zinc-300 md:dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
        <i class="icon icon-ic_fluent_star_20_regular flex text-2xl md:text-3xl"/>
        <p class="text-">Favourites</p>
      </a>
      <a href='#' on:click={()=>toast("Coming Soon!")} class="py-2 px-3 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-900 md:hover:bg-zinc-300 md:dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
        <i class="icon icon-ic_fluent_heart_circle_20_regular flex text-2xl md:text-3xl"/>
        <p class="text-">Liked Books</p>
      </a>
      <a href='#' on:click={()=>toast("Coming Soon!")} class="py-2 px-3 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-900 md:hover:bg-zinc-300 md:dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
        <i class="icon icon-ic_fluent_lightbulb_20_regular flex text-2xl md:text-3xl"/>
        <p class="text-">Data saver Mode</p>
      </a>
    </section>

    <!-- Sm-screen History -->
    <section class="w-full rounded-lg bg-zinc-100dark:bg-zinc-900/60 flex lg:hidden flex-col gap-3 my-5">
      <section class="w-full flex items-center justify-between">
        <h3 class="gap-1 flex items-center">
          <i class="icon icon-ic_fluent_history_20_regular flex text-2xl md:text-3xl"/>
          <span class="font-medium md:text-lg">History</span>
        </h3>
        
        <a href={`#`} on:click={()=>toast("Coming Soon!")} title="Show all history" class="focus:ring-2 focus:outline-none focus:ring-main/70 relative rounded-lg opacity-70 hover:opacity-95 text-sm">
        + Show all</a>
      </section>

      <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 md:px-0">
        <section class="flex flex-nowrap gap-2 md:gap-3 snap-x snap-mandatory">
          {#each shuffle(dgData.books).slice(0, 10) as eachItem}
            <section class="inline-block w-24 lg:w-52">
              <a href={`/m/ts-${eachItem.id}`} title={`${eachItem.title}`} class="w-full h-full focus:ring-2 focus:outline-none focus:ring-main/70 flex flex-col gap-1 relative overflow-hidden rounded-lg">
                <section class={`w-full h-28 lg:h-60 overflow-hidden rounded-lg relative flex flex-col bg-zinc-100 dark:bg-zinc-900`}>
                  <Image
                    src={eachItem.thumbnail}
                  />
                    <!-- layout="constrained" -->
                </section>
                <h4 class="w-full text-sm text-ellipsis line-clamp-1">{eachItem.title}</h4>
              </a>
            </section>
          {:else}
            <section class="rounded-lg w-32 lg:w-60 h-36 lg:h-60 bg-zinc-300 dark:bg-zinc-700"/>
          {/each}
        </section>
      </section>
    </section>

    <!-- Go premium! -->
    <a href='#' on:click={()=>toast("Coming Soon!")} class="py-2 px-3 md:px-6 flex items-center hover:bg-zinc-300dark:hover:bg-zinc-800 bg-main/90 text-zinc-50 hover:bg-main  focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
      <i class="icon icon-ic_fluent_premium_20_filled flex text-2xl md:text-3xl"/>
      <p class="font-semibold">Go Premium!</p>
    </a>
    
    <!-- Invite friends -->
    <section class="w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/60 flex flex-col gap-2 md:p-4">
      <!-- <section class="py-2 px-3 md:px-6 flex items-center"> -->
      <CopyBtn content={userInviteMessage} style="w-full py-2 px-3 rounded-lg ring-2 ring-transparent focus:ring-main/50 focus:outline-none flex items-center gap-4 hover:bg-zinc-300 dark:hover:bg-zinc-800" classes="" iconSize="2xl md:text-3xl">
        <p class="text-">Invite friends</p>
      </CopyBtn>
      <!-- </section> -->

      <!-- ProgressBar -->
      <section class="w-full rounded-lg bg-zinc-200 dark:bg-zinc-900 p-3 flex items-center justify-between gap-3">
        <section class="flex flex-col items-center">
          <i class="icon icon-ic_fluent_leaf_one_20_filled flex text-xl"/>
          <p class="text-xs whitespace-nowrap">{metainfo.levelling_prefix}{user.level-1}</p>
        </section>
        
        <section class="w-full flex flex-col items-center justify-center pt-2 gap-2">
          <section class="w-full rounded-full bg-zinc-300 h-1">
            {#if user.invites !== 0}
              <section class="bg-main ring-2 ring-main/20 py-0.5 rounded-full" style="width: {user.invites}0%;"/>
            {/if}
          </section>

          <p class="text-xs whitespace-nowrap flex">
            <span class="font-semibold">{user.invites}</span>
            <span>/10</span>
          </p>
        </section>
        <!-- <progress value="1" max="10" class="rounded-full bg-slate-500"/> -->

        <section class="flex flex-col items-center">
          <i class="icon icon-ic_fluent_leaf_two_20_filled flex text-xl"/>
          <p class="text-xs whitespace-nowrap">{metainfo.levelling_prefix}{user.level+1}</p>
        </section>
      </section>

      <CopyBtn content={userInviteMessage} icon="ic_fluent_link_20_regular" style="w-full py-2 px-3 rounded-lg ring-2 ring-transparent focus:ring-main/50 focus:outline-none flex items-center gap-4 hover:bg-zinc-300 dark:hover:bg-zinc-800" classes="" iconSize="xl text-2xl">
        <p class="text-sm">Click to copy link and share with friends</p>
      </CopyBtn>
    </section>

    <!-- Logout -->
    <a href="/lib" on:click={handleLogout} class="py-2 px-3 md:px-6 flex items-center bg-zinc200 hover:bg-zinc-300/80 dark:bg-zinc800 dark:hover:bg-zinc-700/80 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
      <i class="icon icon-ic_fluent_arrow_exit_20_regular flex text-2xl md:text-3xl"/>
      <p class="">Logout</p>
    </a>
    
    <!-- Help & Feedback, Theme, About -->
    <section class="w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/60 flex flex-col gap-2 p-1 md:p-4">
      <a href='#' on:click={()=>toast("Coming Soon!")} class="py-2 px-2 flex items-center hover:bg-zinc-300 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
        <i class="icon icon-ic_fluent_comment_20_regular flex text-2xl md:text-3xl"/>
        <p class="text-">Help & Feedback</p>
      </a>

      <ThemeBtn style="md:hidden py-2 px-1 flex items-center ring-2 ring-transparent focus:ring-main/50 focus:outline-none rounded-lg gap-4 hover:bg-zinc-300 dark:hover:bg-zinc-800" bg={""} iconSize={"2xl md:text-3xl"}>
        <p class="text-">Theme</p>
      </ThemeBtn>

      <button on:click={handleAboutDialog} class="w-full py-2 px-2 lg:flex hidden items-center hover:bg-zinc-300 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
        <i class="icon icon-ic_fluent_info_20_regular flex text-2xl md:text-3xl"/>
        <p class="text-">About the app</p>
      </button>
      <Drawer.Root>
        <Drawer.Trigger>
          <button class="w-full py-2 px-2 flex lg:hidden items-center hover:bg-zinc-300 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
            <i class="icon icon-ic_fluent_info_20_regular flex text-2xl md:text-3xl"/>
            <p class="text-">About the app</p>
          </button>
        </Drawer.Trigger>
          <Drawer.Overlay class="fixed inset-0 bg-zinc-950/40 z-[70]" />
          <Drawer.Portal>
            <Drawer.Content class="w-full h-96 fixed flex flex-col bottom-0 left-0 p-1 z-[70]">
              <section class="w-full h-full bg-zinc-100 dark:bg-zinc-900 shadow-md rounded-t-lg p-3 pb-5 flex flex-col gap-4 justify-between overflow-y-auto">
                <section class="flex items-center gap-2">
                  <Logo width="w-10"/>
                  <h1 class="text-xl font-semibold">
                    {metainfo.title}
                  </h1>
                </section>

                <section class="flex flex-col">
                  <table class="table-auto border-separate border-spacing-y-3">
                    <!-- <thead>
                      <th>Details</th>
                      <th>Info</th>
                    </thead> -->
                    <tbody class="">
                      <tr class="">
                        <td class="opacity-50 pr-2.5">Version:</td>
                        <td class="">{metainfo.version}</td>
                      </tr>
                      <tr class="flex-1 align-top ">
                        <td class="opacity-50 pr-2.5">Caption:</td>
                        <td class="">{metainfo.caption}</td>
                      </tr>
                      <tr class="">
                        <td class="opacity-50 pr-2.5">By:</td>
                        <td class="">{metainfo.organisation}</td>
                      </tr>
                      <tr class="">
                        <td class="opacity-50 pr-2.5">Handle:</td>
                        <td class="">{metainfo.handle}</td>
                      </tr>
                      <tr class="flex-1 align-top">
                        <td class="opacity-50 pr-2.5">Accounts:</td>
                        <td class="flex flex-col gap-1">
                          {#each metainfo.contact as item}
                            <!-- <ul> -->
                              <li><a href={item.link} class="py-0.5">{item.title}/{metainfo.handle}</a></li>
                            <!-- </ul> -->
                          {/each}
                        </td>
                      </tr>
                      <tr class="flex-1 align-top">
                        <td class="opacity-50 pr-2.5">Support {metainfo.title}:</td>
                        <td class="flex flex-col gap-1">
                          <CopyBtn classes="flex item-center gap-1" style="" icon="ic_fluent_copy_20_regular" content={metainfo.support.eth_addr}><span>ETH Address</span></CopyBtn>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                <!-- yours Tcitrogg -->
                <YoursTcitrogg/>
              
                <!-- <section class="w-full px-5">
                  <hr class="border-zinc-200 dark:border-zinc-800 rounded-full">
                </section> -->
              </section>
            </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </section>

    <!-- yours Tcitrogg -->
    <section class="w-full py-10">
      <YoursTcitrogg/>
    </section>
  </section>

  <!-- Lg-screen Side cards -->
  <section class="hidden lg:flex sticky top-0 md:w-4/12 h-full p-1 flex-col gap-4 justify-center">
    <!-- Readlist -->
    <section class="w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/60 flex flex-col gap-2">
      <section class="w-full flex items-center justify-between px-4 pt-3">
        <h3 class="gap-1 flex items-center">
          <i class="icon icon-ic_fluent_collections_20_regular flex text-2xl md:text-3xl"/>
          <span class="font-medium md:text-lg">Readlist</span>
        </h3>
        
        <a href={`#`} on:click={()=>toast("Coming Soon!")} title="Show all history" class="focus:ring-2 focus:outline-none focus:ring-main/70 relative rounded-lg opacity-70 hover:opacity-95 text-sm">
        + Show all</a>
      </section>

      <section class="w-full flex flex-col gap-1 px-1 py-1">
        {#each shuffle(dgData.books).slice(0,4) as eachBook, index}
          <a href={`/m/ts-${eachBook.id}`} class="">
            <section class="w-full hover:bg-main/10 border-bborder-b-main-green/5 flex divide-xdivide-zinc-300dark:divide-zinc-700 gap-1 rounded-lg px-3 py-2">
              <section class="w-12 h-12 bg-gradient-to-br from-slate-700 to-amber-500 overflow-hidden rounded-lg">
                <img src="{eachBook.thumbnail}" alt="" class="z-0 w-full h-full object-cover"/>
              </section>
              <article class="flex items-center pl-3">{eachBook.title}</article>
            </section>
          </a>
        {/each}
      </section>
    </section>

    <!-- History Yours truly-->
    <section class="w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/60 flex flex-col gap-2">
      <section class="w-full flex items-center justify-between px-4 pt-3">
        <h3 class="gap-1 flex items-center">
          <i class="icon icon-ic_fluent_history_20_regular flex text-2xl md:text-3xl"/>
          <span class="font-medium md:text-lg">History</span>
        </h3>
        
        <a href={`#`} on:click={()=>toast("Coming Soon!")} title="Show all history" class="focus:ring-2 focus:outline-none focus:ring-main/70 relative rounded-lg opacity-70 hover:opacity-95 text-sm">
        + Show all</a>
      </section>

      <section class="w-full flex flex-col gap-1 px-1 py-1">
        {#each shuffle(dgData.books).slice(4,7) as eachBook, index}
          <a href={`/m/ts-${eachBook.id}`} class="">
            <section class="w-full hover:bg-main/10 border-bborder-b-main-green/5 flex divide-xdivide-zinc-300dark:divide-zinc-700 gap-1 rounded-lg px-3 py-2">
              <section class="w-12 h-12 bg-gradient-to-br from-slate-700 to-amber-500 overflow-hidden rounded-lg">
                <img src="{eachBook.thumbnail}" alt="" class="z-0 w-full h-full object-cover"/>
              </section>
              <article class="flex items-center pl-3">{eachBook.title}</article>
            </section>
          </a>
        {/each}
      </section>
    </section>
  </section>

  <!-- Lg-screen dialog -->
  {#if isAboutDialogMinimised}
    <section class="w-full h-full fixed top-0 right-0 hidden lg:block">
      <!-- dialog overlay -->
      <section on:click={handleAboutDialog} aria-placeholder="overlay" class="fixed inset-0 bg-zinc-950/40 z-[70]"/>
      <section transition:flyAndScale={{x: 3}} class="w-4/12 ml-auto h-full bg-zinc-100 dark:bg-zinc-900 shadow-md rounded-l-xl p-3 pb-5 flex flex-col gap-4 justify-between overflow-y-auto relative z-[70]">
        <section class="flex items-center gap-2">
          <Logo width="w-10"/>
          <h1 class="text-xl font-semibold">
            {metainfo.title}
          </h1>
        </section>
  
        <section class="flex flex-col">
          <table class="table-auto border-separate border-spacing-y-3">
            <!-- <thead>
              <th>Details</th>
              <th>Info</th>
            </thead> -->
            <tbody class="">
              <tr class="">
                <td class="opacity-50 pr-2.5">Version:</td>
                <td class="">{metainfo.version}</td>
              </tr>
              <tr class="flex-1 align-top ">
                <td class="opacity-50 pr-2.5">Caption:</td>
                <td class="">{metainfo.caption}</td>
              </tr>
              <tr class="">
                <td class="opacity-50 pr-2.5">By:</td>
                <td class="">{metainfo.organisation}</td>
              </tr>
              <tr class="">
                <td class="opacity-50 pr-2.5">Handle:</td>
                <td class="">{metainfo.handle}</td>
              </tr>
              <tr class="flex-1 align-top">
                <td class="opacity-50 pr-2.5">Accounts:</td>
                <td class="flex flex-col gap-1">
                  {#each metainfo.contact as item}
                    <!-- <ul> -->
                      <li><a href={item.link} class="py-0.5">{item.title}/{metainfo.handle}</a></li>
                    <!-- </ul> -->
                  {/each}
                </td>
              </tr>
              <tr class="flex-1 align-top">
                <td class="opacity-50 pr-2.5">Support {metainfo.title}:</td>
                <td class="flex flex-col gap-1">
                  <CopyBtn classes="flex item-center gap-1" style="" icon="ic_fluent_copy_20_regular" content={metainfo.support.eth_addr}><span>ETH Address</span></CopyBtn>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
  
        <!-- yours Tcitrogg -->
        <YoursTcitrogg/>
      
        <!-- <section class="w-full px-5">
          <hr class="border-zinc-200 dark:border-zinc-800 rounded-full">
        </section> -->
      </section>
    </section>
  {/if}
</section>
