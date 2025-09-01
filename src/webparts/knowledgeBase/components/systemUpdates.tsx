import * as React from "react";
import "../knowledgeBase.css";
import { escape } from "@microsoft/sp-lodash-subset";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { SPRest } from "@pnp/sp";
import ReactHtmlParser from "react-html-parser";

export interface ISystemUpdatesProps {
	sp: SPRest;
	isArabic: boolean;
	isLoader: any;
	formatDate: any;
}
export default class SystemUpdates extends React.Component<
	ISystemUpdatesProps,
	{ content: any }
> {
	constructor(props) {
		super(props);
		this.state = { content: [] };
	}
	public componentDidMount(): void {
		this.getContent();
	}
	getContent = async () => {
		this.props.isLoader(true);
		var content = await this.props.sp.web.lists
			.getByTitle("KnowledgeBase")
			.items.filter(`ContentType eq 'Knowledge - System Updates'`)();
		this.setState({ content: content }, () => {
			this.props.isLoader(false);
		});
	};
	public render(): React.ReactElement<ISystemUpdatesProps> {
		return (
			<div className="guideBook">
				<h2 className="tabContentTitle Resources" data-trans-systemUpdates>
				تحديثات النظام
				</h2>
				<div className="ctx-block Listing-wrapper">
					{this.state.content.length &&
						this.state.content.map((el, i) => {
							return [
								<div className="updateSectioncol-12 mb-5">
									<div className="dateTitleWrapper d-flex align-items-center mb-4">
										<span className="dateTitle">
											{this.props.formatDate(el.Date1)}
										</span>
										<span className="dateTitleLine"></span>
									</div>
									<div className="updateContent">
										{ReactHtmlParser(
											this.props.isArabic ? el.BodyAR : el.BodyEN
										)}
									</div>
								</div>,
							];
						})}
				</div>
			</div>
		);
	}
}
