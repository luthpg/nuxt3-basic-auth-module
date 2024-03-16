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

export default defineEventHandler((event) => {
  const { node } = event;

  const { pairs = { admin: "passAdmin" }, whiteList = [] } =
    useRuntimeConfig().basicAuth || {};

  const url = getRequestURL(event).toString();

  if (
    whiteList
      .map((listItem) => {
        listItem = listItem.replace(/\\/g, "/");
        return new RegExp(listItem, "i");
      })
      .some((regex) => regex.test(url))
  )
    return;

  const { username, password } = getBasicAuthInputs(event);
  if (
    !username ||
    !password ||
    !pairs[username] ||
    pairs[username] !== password
  ) {
    node.res.statusCode = 401;
    node.res.setHeader(
      "WWW-Authenticate",
      'Basic realm="Authentication Required"'
    );
    node.res.end("Unauthorized");
  }
});
