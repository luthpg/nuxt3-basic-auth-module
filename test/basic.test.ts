import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, createPage } from "@nuxt/test-utils/e2e";
import BasicAuth from "../src/module";

describe("Basic認証テスト", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
    browser: true,
    nuxtConfig: {
      modules: [BasicAuth],
      runtimeConfig: {
        basicAuth: {
          pairs: {
            admin: "admin",
          },
          whiteList: ["/global/*"],
        },
      },
    },
  });

  it("正常系：Basic認証付きページ（非ホワイトリスト）", async () => {
    const page = await createPage("/", {
      httpCredentials: {
        username: "admin",
        password: "admin",
      },
    });

    const selector = await page.locator("div", {
      hasText: "Nuxt Basic Auth Module",
    });
    const count = await selector.count();
    expect(count).not.toBe(0);
  });

  it("正常系：Basic認証なしページ（ホワイトリスト-親階層）", async () => {
    const page = await createPage("/global");

    const selector = await page.locator("div", {
      hasText: "Nuxt Basic Auth Module",
    });
    const count = await selector.count();
    expect(count).not.toBe(0);
  });

  it("正常系：Basic認証なしページ（ホワイトリスト-子階層）", async () => {
    const page = await createPage("/global/child");

    const selector = await page.locator("div", {
      hasText: "Nuxt Basic Auth Module",
    });
    const count = await selector.count();
    expect(count).not.toBe(0);
  });

  it("異常系：Basic認証付きページ｜認証情報なし（非ホワイトリスト）", async () => {
    const page = await createPage("/");

    const selector = await page.locator("div", {
      hasText: "Nuxt Basic Auth Module",
    });
    const count = await selector.count();
    expect(count).toBe(0);
  });

  it("異常系：Basic認証付きページ｜認証情報誤り（非ホワイトリスト）", async () => {
    const page = await createPage("/", {
      httpCredentials: {
        username: "admin",
        password: "invalid-password",
      },
    });

    const selector = await page.locator("div", {
      hasText: "Nuxt Basic Auth Module",
    });
    const count = await selector.count();
    expect(count).toBe(0);
  });
});
