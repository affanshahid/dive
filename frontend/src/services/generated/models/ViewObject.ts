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
/**
 *
 * @export
 * @interface ViewObject
 */
export interface ViewObject {
  /**
   *
   * @type {string}
   * @memberof ViewObject
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof ViewObject
   */
  label?: string;
  /**
   *
   * @type {string}
   * @memberof ViewObject
   */
  dataClass?: string;
}

export function ViewObjectFromJSON(json: any): ViewObject {
  return ViewObjectFromJSONTyped(json, false);
}

export function ViewObjectFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ViewObject {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, 'id') ? undefined : json['id'],
    label: !exists(json, 'label') ? undefined : json['label'],
    dataClass: !exists(json, 'dataClass') ? undefined : json['dataClass'],
  };
}

export function ViewObjectToJSON(value?: ViewObject | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    label: value.label,
    dataClass: value.dataClass,
  };
}