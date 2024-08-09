import { exportedForTesting, getFromUrl } from "../src/index";

const { getDomain_ } = exportedForTesting;

describe("Domain function", () => {
    it("should return the right top-level domains", () => {
        expect(getDomain_("https://www.google.com")).toEqual("google.com");
        expect(getDomain_("http://google.com/foo/bar?param=value")).toEqual("google.com");
        expect(getDomain_("https://www.google.co.uk")).toEqual("google.co.uk");
        expect(getDomain_("https://www.microsoft.com")).toEqual("microsoft.com");
        expect(getDomain_("https://www.wikipedia.org")).toEqual("wikipedia.org");
        expect(getDomain_("https://www.amazon.co.jp")).toEqual("amazon.co.jp");
        expect(getDomain_("https://www.google.co.in")).toEqual("google.co.in");
        expect(getDomain_("https://www.bbc.co.uk")).toEqual("bbc.co.uk");
        expect(getDomain_("http://localhost")).toEqual("localhost");
        expect(getDomain_("bbc.co.uk")).toEqual("bbc.co.uk");
        expect(getDomain_('')).toEqual(null);
        expect(getDomain_(null as any)).toEqual(null);
    });
});

describe("URL Method", () => {
    it("should parse a URL", () => {
        expect(getFromUrl(new URL("https://dailydrop.com/")).source).toEqual("(direct)");
        expect(getFromUrl(new URL("https://dailydrop.com/")).medium).toEqual("(none)");
        expect(getFromUrl(new URL("https://dailydrop.com/")).campaign).toEqual("(not set)");

        expect(getFromUrl(new URL("https://dailydrop.com/credit-cards?")).source).toEqual("(direct)");
        expect(getFromUrl(new URL("https://dailydrop.com/credit-cards?")).medium).toEqual("(none)");
        expect(getFromUrl(new URL("https://dailydrop.com/credit-cards?")).campaign).toEqual("(not set)");

        expect(getFromUrl(new URL("https://dailydrop.com/credit-cards?utm_source=kara-and-nate&utm_medium=youtube&utm_campaign=test")).source).toEqual("kara-and-nate");
        expect(getFromUrl(new URL("https://dailydrop.com/credit-cards?utm_source=kara-and-nate&utm_medium=youtube&utm_campaign=test")).medium).toEqual("youtube");
        expect(getFromUrl(new URL("https://dailydrop.com/credit-cards?utm_source=kara-and-nate&utm_medium=youtube&utm_campaign=test")).campaign).toEqual("test");
    })
})