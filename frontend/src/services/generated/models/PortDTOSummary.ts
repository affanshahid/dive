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
 * @interface PortDTOSummary
 */
export interface PortDTOSummary {
  /**
   *
   * @type {string}
   * @memberof PortDTOSummary
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof PortDTOSummary
   */
  label: string;
  /**
   *
   * @type {Array<string>}
   * @memberof PortDTOSummary
   */
  connections: Array<string>;
  /**
   *
   * @type {string}
   * @memberof PortDTOSummary
   */
  node: string;
}

export function PortDTOSummaryFromJSON(json: any): PortDTOSummary {
  return PortDTOSummaryFromJSONTyped(json, false);
}

export function PortDTOSummaryFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PortDTOSummary {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    label: json['label'],
    connections: json['connections'],
    node: json['node'],
  };
}

export function PortDTOSummaryToJSON(value?: PortDTOSummary | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    label: value.label,
    connections: value.connections,
    node: value.node,
  };
}
