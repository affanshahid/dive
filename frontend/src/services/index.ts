import {
  Configuration,
  DesignerControllerApi,
  WorkflowControllerApi,
} from "./generated";

const conf = new Configuration({ basePath: window.location.origin });

export const designerService = new DesignerControllerApi(conf);
export const workflowsService = new WorkflowControllerApi(conf);
