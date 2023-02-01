import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPRest } from "@pnp/sp";
import { IWeb } from "@pnp/sp/webs";
export interface IKnowledgeBaseProps {
	webUrl: string;
	context: WebPartContext;
	Web: IWeb;
	sp: SPRest;
}
