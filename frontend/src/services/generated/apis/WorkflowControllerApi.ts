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

import * as runtime from "../runtime";
import {
  CreateWorkflowDTO,
  CreateWorkflowDTOFromJSON,
  CreateWorkflowDTOToJSON,
  UpdateWorkflowDTO,
  UpdateWorkflowDTOFromJSON,
  UpdateWorkflowDTOToJSON,
  WorkflowDTO,
  WorkflowDTOFromJSON,
  WorkflowDTOToJSON,
} from "../models";

export interface CreateUsingPOSTRequest {
  dto: CreateWorkflowDTO;
}

export interface DeleteUsingDELETERequest {
  id: string;
}

export interface FindByIdUsingGETRequest {
  id: string;
}

export interface UpdateUsingPATCHRequest {
  id: string;
  dto: UpdateWorkflowDTO;
}

/**
 *
 */
export class WorkflowControllerApi extends runtime.BaseAPI {
  /**
   * create
   */
  async createUsingPOSTRaw(
    requestParameters: CreateUsingPOSTRequest
  ): Promise<runtime.ApiResponse<WorkflowDTO>> {
    if (requestParameters.dto === null || requestParameters.dto === undefined) {
      throw new runtime.RequiredError(
        "dto",
        "Required parameter requestParameters.dto was null or undefined when calling createUsingPOST."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/api/workflows`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: CreateWorkflowDTOToJSON(requestParameters.dto),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      WorkflowDTOFromJSON(jsonValue)
    );
  }

  /**
   * create
   */
  async createUsingPOST(
    requestParameters: CreateUsingPOSTRequest
  ): Promise<WorkflowDTO> {
    const response = await this.createUsingPOSTRaw(requestParameters);
    return await response.value();
  }

  /**
   * delete
   */
  async deleteUsingDELETERaw(
    requestParameters: DeleteUsingDELETERequest
  ): Promise<runtime.ApiResponse<WorkflowDTO>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling deleteUsingDELETE."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/api/workflows/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      WorkflowDTOFromJSON(jsonValue)
    );
  }

  /**
   * delete
   */
  async deleteUsingDELETE(
    requestParameters: DeleteUsingDELETERequest
  ): Promise<WorkflowDTO> {
    const response = await this.deleteUsingDELETERaw(requestParameters);
    return await response.value();
  }

  /**
   * findAll
   */
  async findAllUsingGETRaw(): Promise<runtime.ApiResponse<Array<WorkflowDTO>>> {
    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/api/workflows`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(WorkflowDTOFromJSON)
    );
  }

  /**
   * findAll
   */
  async findAllUsingGET(): Promise<Array<WorkflowDTO>> {
    const response = await this.findAllUsingGETRaw();
    return await response.value();
  }

  /**
   * findById
   */
  async findByIdUsingGETRaw(
    requestParameters: FindByIdUsingGETRequest
  ): Promise<runtime.ApiResponse<WorkflowDTO>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling findByIdUsingGET."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/api/workflows/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      WorkflowDTOFromJSON(jsonValue)
    );
  }

  /**
   * findById
   */
  async findByIdUsingGET(
    requestParameters: FindByIdUsingGETRequest
  ): Promise<WorkflowDTO> {
    const response = await this.findByIdUsingGETRaw(requestParameters);
    return await response.value();
  }

  /**
   * update
   */
  async updateUsingPATCHRaw(
    requestParameters: UpdateUsingPATCHRequest
  ): Promise<runtime.ApiResponse<WorkflowDTO>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling updateUsingPATCH."
      );
    }

    if (requestParameters.dto === null || requestParameters.dto === undefined) {
      throw new runtime.RequiredError(
        "dto",
        "Required parameter requestParameters.dto was null or undefined when calling updateUsingPATCH."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/api/workflows/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "PATCH",
      headers: headerParameters,
      query: queryParameters,
      body: UpdateWorkflowDTOToJSON(requestParameters.dto),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      WorkflowDTOFromJSON(jsonValue)
    );
  }

  /**
   * update
   */
  async updateUsingPATCH(
    requestParameters: UpdateUsingPATCHRequest
  ): Promise<WorkflowDTO> {
    const response = await this.updateUsingPATCHRaw(requestParameters);
    return await response.value();
  }
}
