import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPRest } from "@pnp/sp";
import { IWeb } from "@pnp/sp/webs";

export interface IAllTasksProps {
  webURL: string;
	context: WebPartContext;
	roles: string;
  description: string;
  Web: IWeb;
  sp: SPRest;
  relativeUrl: any;
}
