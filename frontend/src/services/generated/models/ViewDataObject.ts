/* tslint:disable */
/* eslint-disable */
/**
 * Dive API
 * DIVE api documentation
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
  ViewObject,
  ViewObjectFromJSON,
  ViewObjectFromJSONTyped,
  ViewObjectToJSON,
} from './';

/**
 *
 * @export
 * @interface ViewDataObject
 */
export interface ViewDataObject {
  /**
   *
   * @type {ViewObject}
   * @memberof ViewDataObject
   */
  view?: ViewObject;
  /**
   *
   * @type {object}
   * @memberof ViewDataObject
   */
  data?: object;
}

export function ViewDataObjectFromJSON(json: any): ViewDataObject {
  return ViewDataObjectFromJSONTyped(json, false);
}

export function ViewDataObjectFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ViewDataObject {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    view: !exists(json, 'view') ? undefined : ViewObjectFromJSON(json['view']),
    data: !exists(json, 'data') ? undefined : json['data'],
  };
}

export function ViewDataObjectToJSON(value?: ViewDataObject | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    view: ViewObjectToJSON(value.view),
    data: value.data,
  };
}
