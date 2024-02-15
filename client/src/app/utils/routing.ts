import { compile as pathToRegexp } from 'path-to-regexp';
import { urlJoin } from 'url-join-ts';
import { AnyRouteDef } from '../const/app-routes';

/**
 * Defines parameters for building a route URL, allowing type-safe specification of
 * path parameters according to the route definition.
 *
 * @template T - A type extending `AnyRouteDef`, ensuring the route and pathParams align.
 */

export interface BuildRouteUrlParams<T extends AnyRouteDef> {
  route: T;
  pathParams: Record<keyof T['pathParams'], string>;
  includeBase?: boolean;
}
/**
 * Constructs a URL for a given route definition and path parameters. Optionally includes the base URL.
 * This utility function facilitates creating dynamic URLs for navigation and linking within the application.
 *
 * @template T - Extends `AnyRouteDef` to ensure compatibility with app route definitions.
 * @param {BuildRouteUrlParams<T>} params - The parameters needed to build the route URL.
 * @returns {string} The constructed URL, either relative or absolute depending on `includeBase`.
 *
 * @example
 * const userProfileUrl = buildRouteUrl({
 *   route: APP_ROUTES.USER_PROFILE,
 *   pathParams: { userId: '42' },
 *   includeBase: true
 * });
 * // Returns "http://localhost:3000/user/42" if includeBase is true, or "/user/42" if false.
 */
export const buildRouteUrl = <T extends AnyRouteDef>(
  params: BuildRouteUrlParams<T>
): string => {
  const { route, pathParams, includeBase } = params;
  const parsePath = pathToRegexp(route.path);
  const parsedPath = parsePath(pathParams || {});
  const searchParams = new URLSearchParams();

  const relativePath = `${parsedPath}?${searchParams.toString()}`;

  if (includeBase) {
    return urlJoin(window.location.origin, relativePath);
  }
  return relativePath;
};
