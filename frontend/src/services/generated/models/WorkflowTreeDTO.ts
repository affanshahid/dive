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
  NodeDTOObject,
  NodeDTOObjectFromJSON,
  NodeDTOObjectFromJSONTyped,
  NodeDTOObjectToJSON,
  PortDTO,
  PortDTOFromJSON,
  PortDTOFromJSONTyped,
  PortDTOToJSON,
} from './';

/**
 *
 * @export
 * @interface WorkflowTreeDTO
 */
export interface WorkflowTreeDTO {
  /**
   *
   * @type {Array<NodeDTOObject>}
   * @memberof WorkflowTreeDTO
   */
  nodes: Array<NodeDTOObject>;
  /**
   *
   * @type {Array<PortDTO>}
   * @memberof WorkflowTreeDTO
   */
  ports: Array<PortDTO>;
  /**
   *
   * @type {string}
   * @memberof WorkflowTreeDTO
   */
  root: string;
}

export function WorkflowTreeDTOFromJSON(json: any): WorkflowTreeDTO {
  return WorkflowTreeDTOFromJSONTyped(json, false);
}

export function WorkflowTreeDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): WorkflowTreeDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    nodes: (json['nodes'] as Array<any>).map(NodeDTOObjectFromJSON),
    ports: (json['ports'] as Array<any>).map(PortDTOFromJSON),
    root: json['root'],
  };
}

export function WorkflowTreeDTOToJSON(value?: WorkflowTreeDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    nodes: (value.nodes as Array<any>).map(NodeDTOObjectToJSON),
    ports: (value.ports as Array<any>).map(PortDTOToJSON),
    root: value.root,
  };
}
