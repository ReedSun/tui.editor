import encode from 'mdurl/encode';
import decode from 'mdurl/decode';
import { decodeHTML } from 'entities';

export const ENTITY = '&(?:#x[a-f0-9]{1,6}|#[0-9]{1,7}|[a-z][a-z0-9]{1,31});';
const C_BACKSLASH = 92;
const reBackslashOrAmp = /[\\&]/;
export const ESCAPABLE = '[!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]';
const reEntityOrEscapedChar = new RegExp(`\\\\${ESCAPABLE}|${ENTITY}`, 'gi');
const XMLSPECIAL = '[&<>"]';
const reXmlSpecial = new RegExp(XMLSPECIAL, 'g');

const unescapeChar = function(s: string) {
  if (s.charCodeAt(0) === C_BACKSLASH) {
    return s.charAt(1);
  }
  return decodeHTML(s);
};

// Replace entities and backslash escapes with literal characters.
export function unescapeString(s: string) {
  if (reBackslashOrAmp.test(s)) {
    return s.replace(reEntityOrEscapedChar, unescapeChar);
  }
  return s;
}

export function normalizeURI(uri: string) {
  try {
    return encode(decode(uri));
  } catch (err) {
    return uri;
  }
}

function replaceUnsafeChar(s: string) {
  switch (s) {
    case '&':
      return '&amp;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    case '"':
      return '&quot;';
    default:
      return s;
  }
}

export function escapeXml(s: string) {
  if (reXmlSpecial.test(s)) {
    return s.replace(reXmlSpecial, replaceUnsafeChar);
  }
  return s;
}

export function repeat(str: string, count: number): string {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(str);
  }
  return arr.join('');
}