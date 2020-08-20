/* tslint:disable */
/* eslint-disable */
/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
  WorkflowTreeDTO,
  WorkflowTreeDTOFromJSON,
  WorkflowTreeDTOFromJSONTyped,
  WorkflowTreeDTOToJSON,
} from './';

/**
 *
 * @export
 * @interface UpdateWorkflowDTO
 */
export interface UpdateWorkflowDTO {
  /**
   *
   * @type {string}
   * @memberof UpdateWorkflowDTO
   */
  name?: string;
  /**
   *
   * @type {WorkflowTreeDTO}
   * @memberof UpdateWorkflowDTO
   */
  tree?: WorkflowTreeDTO;
}

export function UpdateWorkflowDTOFromJSON(json: any): UpdateWorkflowDTO {
  return UpdateWorkflowDTOFromJSONTyped(json, false);
}

export function UpdateWorkflowDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): UpdateWorkflowDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, 'name') ? undefined : json['name'],
    tree: !exists(json, 'tree')
      ? undefined
      : WorkflowTreeDTOFromJSON(json['tree']),
  };
}

export function UpdateWorkflowDTOToJSON(value?: UpdateWorkflowDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    tree: WorkflowTreeDTOToJSON(value.tree),
  };
}
