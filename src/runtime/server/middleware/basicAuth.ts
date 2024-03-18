import {
  defineEventHandler,
  getRequestURL,
  getHeader,
  type H3Event,
  type EventHandlerRequest,
} from "h3";
import { useRuntimeConfig } from "#imports";

const getBasicAuthInputs = (event: H3Event<EventHandlerRequest>) => {
  const _authorization = getHeader(event, "Authorization");
  const authorization: string = Array.isArray(_authorization)
    ? _authorization[0]
    : _authorization;
  const base64Credentials = authorization?.replace("Basic ", "");

  if (base64Credentials) {
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");
    return { username, password };
  } else {
    return {};
  }
};

const convertPathWildcardToRegexText = (path: string) =>
  path
    .replace(/\\/g, "/")
    .replace(/\?/g, ".")
    .replace(/\*/g, ".*")
    .replace(/\//g, "/*");

const isMatchPath = (
  event: H3Event<EventHandlerRequest>,
  ...searchKeys: string[]
) => {
  const { pathname } = getRequestURL(event);
  const regExpArray = searchKeys.map((searchKey) => {
    searchKey = convertPathWildcardToRegexText(searchKey);
    return new RegExp(searchKey);
  });
  return regExpArray.some((regex) => regex.test(pathname));
};

export default defineEventHandler((event) => {
  const { node } = event;

  const {
    productionDomains = [],
    pairs = { admin: "admin" },
    whiteList = [],
    realm = "Authentication Required",
  } = useRuntimeConfig().basicAuth || {};

  const host = getHeader(event, "host") || "";

  if (productionDomains.some((domain) => host.endsWith(domain))) {
    return;
  }

  if (isMatchPath(event, ...whiteList)) {
    return;
  }

  const { username, password } = getBasicAuthInputs(event);
  if (
    !username ||
    !password ||
    !pairs[username] ||
    pairs[username] !== password
  ) {
    node.res.statusCode = 401;
    node.res.setHeader("WWW-Authenticate", `Basic realm="${realm}"`);
    node.res.end("Unauthorized");
  }
});
