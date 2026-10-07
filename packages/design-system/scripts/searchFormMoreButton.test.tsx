// @vitest-environment happy-dom

import { afterEach, describe, expect, test } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Providers from "../src/components/Providers";
import { SearchForm } from "../src/components/search-form/SearchFormComponent";
import SearchFormClient from "../src/components/search-form/SearchForm.client";
import { pagefindResult2searchResult } from "../src/components/search-form/SearchFormPagefind.client";

// More hits than fit on one page, so the form - rendered with an `action`, the
// way the header's search modal renders it - shows the "view all results"
// button with the total hit count instead of the inline pagination.
const totalResults = 12;
const noResultsTerm = "nothing";

// Pagefind only exists inside a built site, so the client is driven with a
// deterministic engine here.
class SearchFormTest extends SearchFormClient {
  static identifier = "dsa.search-form.test";

  async loadEngine() {
    return async (term) =>
      term === noResultsTerm
        ? []
        : Array.from({ length: totalResults }, (_, index) => () => ({
            title: `Result ${index + 1}`,
            url: `/result-${index + 1}`,
          }));
  }
}

// Pubsub delivers asynchronously, and both the engine and the search behind
// `dsa.search.search` resolve in microtasks, so hand control back to the event
// loop before asserting.
const settle = () => {
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(resolve, 0);
  return promise;
};

const search = async (term) => {
  const loaded = Promise.withResolvers();
  window._ks.radio.once("dsa.search.loaded", loaded.resolve);
  window._ks.radio.emit("dsa.search.search", { term });
  await loaded.promise;
};

let unmount = () => {};

afterEach(() => unmount());

const mount = async () => {
  // `canBeCloned` in the design system's defaults merge asks `postMessage`
  // whether a value survives structured cloning. Browsers reject functions
  // with a DataCloneError, happy-dom does not, and the merge would then try to
  // clone the button's `renderLabel` callback.
  window.postMessage = (value) => structuredClone(value);

  const host = document.createElement("div");
  document.body.append(host);
  host.innerHTML = renderToStaticMarkup(
    createElement(
      Providers,
      null,
      createElement(SearchForm, {
        component: "dsa.search-form.test",
        action: "#",
      })
    )
  );

  const element = host.querySelector("form");
  // `Component.onDisconnect` pushes onto the element's own cleanup list, which
  // the custom element upgrade would normally have created.
  element._ks = { d: [] };
  new SearchFormTest(element);
  // Every form listens to the global radio, so an instance has to be torn down
  // before the next test mounts its own.
  unmount = () => {
    element._ks.d.forEach((cleanUp) => cleanUp());
    host.remove();
  };

  await settle();

  return {
    moreButton: element.querySelector(".dsa-search-form__nav .c-button"),
    input: element.querySelector(".dsa-search-bar__input input"),
  };
};

describe("SearchForm more button", () => {
  test("hides the button when the term is cleared", async () => {
    const { moreButton, input } = await mount();

    await search("hubert");
    expect(moreButton.hasAttribute("hidden")).toBe(false);
    expect(moreButton.textContent).toContain(String(totalResults));

    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await settle();
    expect(moreButton.hasAttribute("hidden")).toBe(true);
  });

  test("hides the button when a term has no results", async () => {
    const { moreButton } = await mount();

    await search("hubert");
    expect(moreButton.hasAttribute("hidden")).toBe(false);

    await search(noResultsTerm);
    expect(moreButton.hasAttribute("hidden")).toBe(true);
  });
});

// A pagefind hit as `pagefindResult2searchResult` receives it: the crawled file
// as `url`, the page's public address as `meta.url`, and one sub-result per
// heading anchor. Pagefind builds the page's excerpt from its best-matching
// region and the excerpt of the section holding that region from the same
// region, so a section hit can repeat the page hit's text.
const pagefindHit = (overrides) => ({
  url: "/pagefind/produkte/a1500.html",
  excerpt: "Der <mark>A1500</mark> ist ein Leistungsverstärker",
  meta: { url: "/produkte/a1500", title: "A1500 - Amp up your process" },
  sub_results: [],
  ...overrides,
});

describe("pagefindResult2searchResult", () => {
  test("hides a section hit repeating the page hit's excerpt", () => {
    const mapped = pagefindResult2searchResult(
      pagefindHit({
        sub_results: [
          {
            url: "/pagefind/produkte/a1500.html#a1500-systeme",
            title: "A1500-Systeme",
            // The same text as the page's excerpt, highlighted elsewhere.
            excerpt: "Der A1500 ist ein <mark>Leistungsverstärker</mark>",
          },
        ],
      })
    );

    expect(mapped.subResults).toEqual([]);
    // Only the repetition is hidden, the page-level hit itself stays.
    expect(mapped.excerpt).toBe(
      "Der <mark>A1500</mark> ist ein Leistungsverstärker"
    );
  });

  test("keeps a section hit whose excerpt is its own", () => {
    const mapped = pagefindResult2searchResult(
      pagefindHit({
        sub_results: [
          {
            url: "/pagefind/produkte/a1500.html#technische-daten",
            title: "Technische Daten",
            excerpt: "Leistung <mark>300 W</mark> an 4 Ohm",
          },
        ],
      })
    );

    expect(mapped.subResults.map(({ title }) => title)).toEqual([
      "Technische Daten",
    ]);
    expect(mapped.subResults[0].url).toBe(
      "/produkte/a1500#technische-daten"
    );
  });

  test("still hides the page's own root sub-result", () => {
    const mapped = pagefindResult2searchResult(
      pagefindHit({
        sub_results: [
          {
            // Pagefind's root sub-result: the crawled file, titled like the page.
            url: "/pagefind/produkte/a1500.html",
            title: "A1500 - Amp up your process",
            excerpt: "Der <mark>A1500</mark> ist ein Leistungsverstärker",
          },
          {
            url: "/pagefind/produkte/a1500.html#technische-daten",
            title: "Technische Daten",
            excerpt: "Leistung <mark>300 W</mark> an 4 Ohm",
          },
        ],
      })
    );

    expect(mapped.subResults.map(({ title }) => title)).toEqual([
      "Technische Daten",
    ]);
  });
});
