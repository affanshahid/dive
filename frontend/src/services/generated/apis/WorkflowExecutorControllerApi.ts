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

import * as runtime from '../runtime';
import {
  ViewDataObject,
  ViewDataObjectFromJSON,
  ViewDataObjectToJSON,
} from '../models';

export interface RunRequest {
  workflowId: string;
}

/**
 *
 */
export class WorkflowExecutorControllerApi extends runtime.BaseAPI {
  /**
   */
  async runRaw(
    requestParameters: RunRequest
  ): Promise<runtime.ApiResponse<Array<ViewDataObject>>> {
    if (
      requestParameters.workflowId === null ||
      requestParameters.workflowId === undefined
    ) {
      throw new runtime.RequiredError(
        'workflowId',
        'Required parameter requestParameters.workflowId was null or undefined when calling run.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/api/workflow-executor/run/{workflowId}`.replace(
        `{${'workflowId'}}`,
        encodeURIComponent(String(requestParameters.workflowId))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(ViewDataObjectFromJSON)
    );
  }

  /**
   */
  async run(requestParameters: RunRequest): Promise<Array<ViewDataObject>> {
    const response = await this.runRaw(requestParameters);
    return await response.value();
  }
}