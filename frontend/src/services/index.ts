import autoBind from "auto-bind";
import {
  Configuration,
  DesignerControllerApi,
  WorkflowControllerApi,
} from "./generated";

const conf = new Configuration({ basePath: window.location.origin });

export const designerService = autoBind(new DesignerControllerApi(conf));
export const workflowsService = autoBind(new WorkflowControllerApi(conf));
